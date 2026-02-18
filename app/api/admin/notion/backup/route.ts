import { NextRequest, NextResponse } from 'next/server'
import { notionSiteManager } from '@/lib/notion-management'

export async function POST() {
  try {
    const backup = await notionSiteManager.createBackup()
    
    if (!backup) {
      return NextResponse.json(
        { error: 'Backup is disabled' },
        { status: 400 }
      )
    }

    const backupJson = JSON.stringify(backup, null, 2)
    const blob = new Blob([backupJson], { type: 'application/json' })
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="notion-backup-${new Date().toISOString().split('T')[0]}.json"`
      }
    })
  } catch (error) {
    console.error('Backup error:', error)
    return NextResponse.json(
      { error: 'Failed to create backup' },
      { status: 500 }
    )
  }
}