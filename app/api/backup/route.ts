import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { type, tables } = await request.json()

    if (!type || !tables || !Array.isArray(tables)) {
      return NextResponse.json({ error: '無効なリクエストです' }, { status: 400 })
    }

    const backupData: Record<string, any[]> = {}
    const timestamp = new Date().toISOString()

    // 指定されたテーブルからデータを取得
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.error(`Error fetching ${table}:`, error)
        continue
      }

      backupData[table] = data || []
    }

    // バックアップメタデータ
    const backupMetadata = {
      timestamp,
      type,
      tables: Object.keys(backupData),
      totalRecords: Object.values(backupData).reduce((sum, records) => sum + records.length, 0),
      version: '1.0'
    }

    const fullBackup = {
      metadata: backupMetadata,
      data: backupData
    }

    // レスポンスを返す
    const filename = `backup_${type}_${timestamp.replace(/[:.]/g, '-')}.json`
    
    return new NextResponse(JSON.stringify(fullBackup, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })

  } catch (error) {
    console.error('Backup error:', error)
    return NextResponse.json({ error: 'バックアップの作成に失敗しました' }, { status: 500 })
  }
}

// バックアップの復元
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'バックアップファイルが選択されていません' }, { status: 400 })
    }

    // ファイルの内容を読み取り
    const fileContent = await file.text()
    const backup = JSON.parse(fileContent)

    // バックアップの検証
    if (!backup.metadata || !backup.data) {
      return NextResponse.json({ error: '無効なバックアップファイルです' }, { status: 400 })
    }

    const results: Record<string, { success: number; error: number }> = {}

    // 各テーブルのデータを復元
    for (const [tableName, records] of Object.entries(backup.data)) {
      if (!Array.isArray(records) || records.length === 0) {
        results[tableName] = { success: 0, error: 0 }
        continue
      }

      let successCount = 0
      let errorCount = 0

      // バッチ処理でデータを挿入
      const batchSize = 100
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize)
        
        const { error } = await supabase
          .from(tableName)
          .upsert(batch, { onConflict: 'id' })

        if (error) {
          console.error(`Error restoring ${tableName}:`, error)
          errorCount += batch.length
        } else {
          successCount += batch.length
        }
      }

      results[tableName] = { success: successCount, error: errorCount }
    }

    return NextResponse.json({
      success: true,
      message: 'バックアップの復元が完了しました',
      results
    })

  } catch (error) {
    console.error('Restore error:', error)
    return NextResponse.json({ error: 'バックアップの復元に失敗しました' }, { status: 500 })
  }
}

// バックアップの一覧取得
export async function GET() {
  try {
    // 実際の実装では、バックアップファイルの一覧を取得する
    // ここでは仮のデータを返す
    const backups = [
      {
        id: '1',
        name: 'Full Backup - 2024-01-15',
        type: 'full',
        timestamp: '2024-01-15T10:00:00Z',
        size: '2.5MB',
        tables: ['news', 'events', 'board_posts', 'organizations', 'partners', 'members']
      },
      {
        id: '2',
        name: 'News Backup - 2024-01-14',
        type: 'partial',
        timestamp: '2024-01-14T15:30:00Z',
        size: '500KB',
        tables: ['news']
      }
    ]

    return NextResponse.json({ backups })
  } catch (error) {
    console.error('Backup list error:', error)
    return NextResponse.json({ error: 'バックアップ一覧の取得に失敗しました' }, { status: 500 })
  }
} 