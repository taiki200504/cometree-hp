import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  
  const supabase = createAdminClient()
  
  const testNews = [
    {
      title: "UNION設立記念イベントを開催しました",
      content: "学生団体連合UNIONの設立を記念して、全国の学生団体代表者を集めたイベントを開催しました。多くの方々にご参加いただき、ありがとうございました。",
      is_published: true,
      published_at: new Date().toISOString(),
      view_count: 150
    },
    {
      title: "新しいメンバーが加入しました",
      content: "この度、新しいメンバーがUNIONに加入しました。より多くの学生の声を社会に届けるため、活動を拡大していきます。",
      is_published: true,
      published_at: new Date().toISOString(),
      view_count: 89
    },
    {
      title: "次回イベントのご案内",
      content: "来月開催予定の学生向けイベントについてご案内いたします。詳細は後日お知らせいたします。",
      is_published: false,
      published_at: null,
      view_count: 0
    },
    {
      title: "活動報告：2024年度上半期",
      content: "2024年度上半期の活動報告を公開いたします。多くの成果を上げることができました。",
      is_published: true,
      published_at: new Date().toISOString(),
      view_count: 234
    },
    {
      title: "協力団体との連携について",
      content: "新たな協力団体との連携が決定しました。より幅広い活動を展開していきます。",
      is_published: true,
      published_at: new Date().toISOString(),
      view_count: 67
    }
  ]

  const dataToInsert = testNews.map(news => ({
    ...news,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }))

  const { data, error } = await supabase
    .from('news')
    .insert(dataToInsert)
    .select()

  if (error) {
    console.error('Error inserting test data:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    message: 'テストデータが正常に追加されました。',
    count: data?.length || 0
  })
} 