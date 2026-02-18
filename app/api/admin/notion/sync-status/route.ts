import { NextRequest, NextResponse } from 'next/server'
import { notionSiteManager } from '@/lib/notion-management'

export async function GET() {
  try {
    const status = await notionSiteManager.getSyncStatus()
    return NextResponse.json(status)
  } catch (error) {
    console.error('Sync status error:', error)
    return NextResponse.json(
      { error: 'Failed to get sync status' },
      { status: 500 }
    )
  }
}