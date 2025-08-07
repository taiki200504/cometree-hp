import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  
  const supabase = createAdminClient()
  
  const testSupporters = [
    {
      name: "株式会社サンプル",
      type: "企業",
      description: "学生団体の活動を支援し、社会貢献活動を推進する企業です。",
      support_type: "financial",
      amount: "100万円",
      since: "2024年1月",
      website_url: "https://example.com",
      contact_email: "contact@example.com",
      is_active: true,
      display_order: 1
    },
    {
      name: "メディアパートナー",
      type: "メディア",
      description: "学生の声を社会に届けるメディアとして、UNIONの活動をサポートしています。",
      support_type: "media",
      amount: "広告枠提供",
      since: "2024年3月",
      website_url: "https://media.example.com",
      contact_email: "info@media.example.com",
      is_active: true,
      display_order: 2
    },
    {
      name: "協力団体A",
      type: "NPO法人",
      description: "学生団体との連携を通じて、社会課題の解決に取り組んでいます。",
      support_type: "collaboration",
      amount: "協力・連携",
      since: "2024年2月",
      website_url: "https://npo.example.com",
      contact_email: "info@npo.example.com",
      is_active: true,
      display_order: 3
    },
    {
      name: "個人サポーター",
      type: "個人",
      description: "学生の活動を応援する個人サポーターです。",
      support_type: "individual",
      amount: "10万円",
      since: "2024年4月",
      contact_email: "supporter@example.com",
      is_active: true,
      display_order: 4
    }
  ]

  const dataToInsert = testSupporters.map(supporter => ({
    ...supporter,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }))

  const { data, error } = await supabase
    .from('supporters')
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