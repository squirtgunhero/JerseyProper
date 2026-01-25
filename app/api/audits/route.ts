import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { fetchPage } from '@/lib/fetch'
import { extractContent } from '@/lib/extract'
import { scoreExtraction, formatModuleScores } from '@/lib/score'
import { analyzeQuery } from '@/lib/query'

const CreateAuditSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  query: z.string().optional().nullable(),
})

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

    // Create audit record
    const audit = await prisma.audit.create({
      data: {
        url,
        query: query || null,
        status: 'processing',
      },
    })

    try {
      // Fetch page
      const fetchResult = await fetchPage(url)
      
      if (fetchResult.statusCode !== 200) {
        throw new Error(`Failed to fetch page: HTTP ${fetchResult.statusCode}`)
      }

      // Extract content
      const extraction = extractContent(fetchResult)

      // Store extraction
      await prisma.pageExtract.create({
        data: {
          auditId: audit.id,
          fetchType: extraction.fetchType,
          title: extraction.title,
          description: extraction.description,
          canonical: extraction.canonical,
          h1: extraction.h1,
          headings: extraction.headings,
          mainText: extraction.mainText,
          topText: extraction.topText,
          wordCount: extraction.wordCount,
          listsCount: extraction.listsCount,
          tablesCount: extraction.tablesCount,
          internalLinksCount: extraction.internalLinksCount,
          externalLinksCount: extraction.externalLinksCount,
          externalLinks: extraction.externalLinks,
          jsonLd: extraction.jsonLd,
          robotsMeta: extraction.robotsMeta,
          responseHeaders: extraction.responseHeaders,
          linkDensity: extraction.linkDensity,
          sentenceStats: extraction.sentenceStats,
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
          moduleScores: formatModuleScores(scoring.modules),
          ruleResults: scoring.allRules,
          queryFitScore: queryAnalysis?.queryFitScore || null,
          answerDraft: queryAnalysis?.answerDraft || null,
          suggestedFaqs: queryAnalysis?.suggestedFaqs || null,
        },
      })

      return NextResponse.json({
        id: updatedAudit.id,
        url: updatedAudit.url,
        status: updatedAudit.status,
        overallScore: updatedAudit.overallScore,
      })

    } catch (error) {
      // Update audit with error
      await prisma.audit.update({
        where: { id: audit.id },
        data: {
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      })

      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Audit failed' },
        { status: 500 }
      )
    }

  } catch (error) {
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
