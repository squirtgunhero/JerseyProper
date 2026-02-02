import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/db'
import { fetchPage, FetchError } from '@/lib/fetch'
import { extractContent } from '@/lib/extract'
import { scoreExtraction, formatModuleScores } from '@/lib/score'
import { analyzeQuery } from '@/lib/query'
import { 
  checkAbuseLimits, 
  recordUsageEvent, 
  AbuseGuardError 
} from '@/lib/guards/abuse'
import { notifyAuditRun } from '@/lib/email'

const CreateAuditSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  query: z.string().optional().nullable(),
})

/**
 * Extract client IP from request headers.
 * Vercel provides the client IP in x-forwarded-for or x-real-ip headers.
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }
  
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }
  
  // Fallback for local development
  return '127.0.0.1'
}

// POST /api/audits - Create and run audit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = CreateAuditSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      )
    }

    const { url, query } = parsed.data
    const clientIP = getClientIP(request)

    // Check abuse limits BEFORE doing any work
    const limitCheck = await checkAbuseLimits({ ip: clientIP, url })
    
    if (!limitCheck.allowed) {
      const error = limitCheck.error!
      console.log(`[API] Request blocked: ${error.code} for IP hash ${limitCheck.ipHash.slice(0, 8)}...`)
      
      return NextResponse.json(
        { 
          code: error.code, 
          message: error.message 
        },
        { status: error.code === 'CONFIG_ERROR' ? 500 : 429 }
      )
    }

    // Record usage event BEFORE starting the audit
    // This prevents parallel requests from bypassing the limit
    await recordUsageEvent({
      ipHash: limitCheck.ipHash,
      domain: limitCheck.domain,
      path: limitCheck.path,
    })

    // Create audit record
    const audit = await prisma.audit.create({
      data: {
        url,
        query: query || null,
        status: 'processing',
      },
    })

    // Send email notification
    await notifyAuditRun(limitCheck.domain, url)

    // Update usage event with audit ID
    // (optional, but useful for debugging)
    await prisma.usageEvent.updateMany({
      where: {
        ipHash: limitCheck.ipHash,
        domain: limitCheck.domain,
        auditId: null,
      },
      data: {
        auditId: audit.id,
      },
    })

    try {
      // Fetch page with all guards (timeout, size limits, redirect limits)
      const fetchResult = await fetchPage(url)
      
      if (fetchResult.statusCode !== 200) {
        throw new Error(`Failed to fetch page: HTTP ${fetchResult.statusCode}`)
      }

      // Extract content (includes text truncation if needed)
      const extraction = extractContent(fetchResult)

      // Store extraction (cast arrays/objects to JSON for Prisma)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const toJson = (val: unknown) => JSON.parse(JSON.stringify(val)) as Prisma.InputJsonValue
      
      await prisma.pageExtract.create({
        data: {
          auditId: audit.id,
          fetchType: extraction.fetchType,
          title: extraction.title,
          description: extraction.description,
          canonical: extraction.canonical,
          h1: extraction.h1,
          headings: toJson(extraction.headings),
          mainText: extraction.mainText,
          topText: extraction.topText,
          wordCount: extraction.wordCount,
          listsCount: extraction.listsCount,
          tablesCount: extraction.tablesCount,
          internalLinksCount: extraction.internalLinksCount,
          externalLinksCount: extraction.externalLinksCount,
          externalLinks: toJson(extraction.externalLinks),
          jsonLd: toJson(extraction.jsonLd),
          robotsMeta: extraction.robotsMeta,
          responseHeaders: toJson(extraction.responseHeaders),
          linkDensity: extraction.linkDensity,
          sentenceStats: toJson(extraction.sentenceStats),
          warnings: extraction.warnings.length > 0 ? toJson(extraction.warnings) : Prisma.JsonNull,
        },
      })

      // Score extraction
      const scoring = scoreExtraction(extraction)

      // Query analysis if provided
      let queryAnalysis = null
      if (query) {
        queryAnalysis = analyzeQuery(query, extraction)
      }

      // Update audit with results
      const updatedAudit = await prisma.audit.update({
        where: { id: audit.id },
        data: {
          status: 'completed',
          overallScore: scoring.overallScore,
          moduleScores: toJson(formatModuleScores(scoring.modules)),
          ruleResults: toJson(scoring.allRules),
          queryFitScore: queryAnalysis?.queryFitScore ?? null,
          answerDraft: queryAnalysis?.answerDraft ?? null,
          suggestedFaqs: queryAnalysis?.suggestedFaqs ? toJson(queryAnalysis.suggestedFaqs) : Prisma.JsonNull,
        },
      })

      return NextResponse.json({
        id: updatedAudit.id,
        url: updatedAudit.url,
        status: updatedAudit.status,
        overallScore: updatedAudit.overallScore,
        warnings: extraction.warnings,
      })

    } catch (error) {
      // Handle specific error types
      let errorMessage = 'Unknown error'
      
      if (error instanceof FetchError) {
        console.log(`[API] Fetch error for ${url}: ${error.code} - ${error.message}`)
        errorMessage = error.message
      } else if (error instanceof Error) {
        errorMessage = error.message
      }

      // Update audit with error
      await prisma.audit.update({
        where: { id: audit.id },
        data: {
          status: 'failed',
          error: errorMessage,
        },
      })

      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      )
    }

  } catch (error) {
    // Handle abuse guard errors at the top level
    if (error instanceof AbuseGuardError) {
      return NextResponse.json(
        { code: error.code, message: error.message },
        { status: error.code === 'CONFIG_ERROR' ? 500 : 429 }
      )
    }

    console.error('Audit error:', error)
    return NextResponse.json(
      { error: 'Failed to create audit' },
      { status: 500 }
    )
  }
}

// GET /api/audits - List audits
export async function GET() {
  try {
    const audits = await prisma.audit.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: {
        id: true,
        url: true,
        query: true,
        createdAt: true,
        overallScore: true,
        status: true,
      },
    })

    return NextResponse.json(audits)
  } catch (error) {
    console.error('List audits error:', error)
    return NextResponse.json(
      { error: 'Failed to list audits' },
      { status: 500 }
    )
  }
}
