import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/audits/:id - Get audit by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params
    const { id } = resolvedParams

    const audit = await prisma.audit.findUnique({
      where: { id },
      include: {
        pageExtracts: true,
      },
    })

    if (!audit) {
      return NextResponse.json(
        { error: 'Audit not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(audit)
  } catch (error) {
    console.error('Get audit error:', error)
    return NextResponse.json(
      { error: 'Failed to get audit' },
      { status: 500 }
    )
  }
}
