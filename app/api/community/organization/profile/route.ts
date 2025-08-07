import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: "ユーザーIDが必要です" }, { status: 400 })
    }

    // 加盟団体プロフィールを取得
    const { data: profile, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      return NextResponse.json({ error: "プロフィールが見つかりません" }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching organization profile:', error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...profileData } = body

    if (!userId) {
      return NextResponse.json({ error: "ユーザーIDが必要です" }, { status: 400 })
    }

    // 既存のプロフィールを確認
    const { data: existingProfile } = await supabase
      .from('organizations')
      .select('id')
      .eq('user_id', userId)
      .single()

    let result
    if (existingProfile) {
      // 既存プロフィールを更新
      const { data, error } = await supabase
        .from('organizations')
        .update({
          name: profileData.name,
          description: profileData.description,
          contact_email: profileData.email,
          contact_phone: profileData.phone,
          address: profileData.address,
          website_url: profileData.website,
          member_count: profileData.memberCount,
          established_date: profileData.establishedDate,
          category: profileData.category,
          status: profileData.status,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: "プロフィールの更新に失敗しました" }, { status: 500 })
      }

      result = data
    } else {
      // 新しいプロフィールを作成
      const { data, error } = await supabase
        .from('organizations')
        .insert({
          user_id: userId,
          name: profileData.name,
          description: profileData.description,
          contact_email: profileData.email,
          contact_phone: profileData.phone,
          address: profileData.address,
          website_url: profileData.website,
          member_count: profileData.memberCount,
          established_date: profileData.establishedDate,
          category: profileData.category,
          status: profileData.status
        })
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: "プロフィールの作成に失敗しました" }, { status: 500 })
      }

      result = data
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating organization profile:', error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
