import { NextRequest, NextResponse } from 'next/server'

// TODO: 認証・権限チェックの雛形
function checkAuth(request: NextRequest) {
  // ここで管理者/団体/ゲストの認証・権限を判定
  return true
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // TODO: 掲示板一覧取得
  return NextResponse.json({ data: [] })
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // TODO: 掲示板新規作成
  return NextResponse.json({ success: true })
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // TODO: 掲示板更新
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // TODO: 掲示板削除
  return NextResponse.json({ success: true })
} 