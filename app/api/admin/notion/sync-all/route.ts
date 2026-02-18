import { NextRequest, NextResponse } from 'next/server'
import { notionSiteManager } from '@/lib/notion-management'

export async function POST() {
  try {
    const result = await notionSiteManager.syncAllContent()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Sync all error:', error)
    return NextResponse.json(
      { error: 'Failed to sync all content' },
      { status: 500 }
    )
  }
}