import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // TODO: ロール判定・認証処理
  return NextResponse.json({ role: 'guest', authenticated: false })
} 