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
  
  const testMembers = [
    {
      name: "田中 太郎",
      email: "tanaka@union.example.com",
      position: "代表",
      university: "東京大学",
      profile: "学生団体連合UNIONの代表として、全国の学生の声を社会に届ける活動をリードしています。",
      is_representative: true,
      representative_message: "学生の力で社会を変える。それが私たちの使命です。",
      category: "core",
      tags: ["代表", "リーダーシップ", "社会貢献"],
      role: "representative"
    },
    {
      name: "佐藤 花子",
      email: "sato@union.example.com",
      position: "副代表",
      university: "早稲田大学",
      profile: "副代表として、組織運営とメンバー管理を担当しています。",
      is_representative: true,
      representative_message: "一人ひとりの学生の想いを大切に、共に成長していきたいと思います。",
      category: "core",
      tags: ["副代表", "運営", "メンバー管理"],
      role: "vice_representative"
    },
    {
      name: "山田 次郎",
      email: "yamada@union.example.com",
      position: "広報担当",
      university: "慶應義塾大学",
      profile: "広報活動を通じて、UNIONの活動を多くの方に知っていただくことを目指しています。",
      is_representative: false,
      category: "core",
      tags: ["広報", "コミュニケーション", "メディア"],
      role: "public_relations"
    },
    {
      name: "鈴木 美咲",
      email: "suzuki@union.example.com",
      position: "イベント企画",
      university: "京都大学",
      profile: "学生向けイベントの企画・運営を担当し、学生同士の交流を促進しています。",
      is_representative: false,
      category: "core",
      tags: ["イベント", "企画", "学生交流"],
      role: "event_planner"
    },
    {
      name: "高橋 教授",
      email: "takahashi@university.example.com",
      position: "顧問",
      university: "東京大学",
      profile: "学生団体の活動を長年サポートしてきた経験を活かし、UNIONの活動を支援しています。",
      is_representative: false,
      category: "advisor",
      tags: ["顧問", "教育", "アドバイザー"],
      role: "advisor"
    },
    {
      name: "伊藤 先生",
      email: "ito@university.example.com",
      position: "アドバイザー",
      university: "早稲田大学",
      profile: "社会起業やNPO活動の専門家として、UNIONの活動にアドバイスを提供しています。",
      is_representative: false,
      category: "advisor",
      tags: ["アドバイザー", "社会起業", "NPO"],
      role: "advisor"
    }
  ]

  const dataToInsert = testMembers.map(member => ({
    ...member,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }))

  const { data, error } = await supabase
    .from('members')
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