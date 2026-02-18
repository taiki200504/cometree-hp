import { NextRequest, NextResponse } from 'next/server'
import { notionSiteManager } from '@/lib/notion-management'

export async function GET() {
  try {
    const analytics = await notionSiteManager.getContentAnalytics()
    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to get analytics' },
      { status: 500 }
    )
  }
}