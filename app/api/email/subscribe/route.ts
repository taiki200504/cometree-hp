import { NextRequest, NextResponse } from 'next/server'
import { subscribeToEmail, logAccess } from '@/lib/email'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { email, name, organization, preferences } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // メール購読登録
    await subscribeToEmail(email, name, organization, preferences)
    
    const responseTime = Date.now() - startTime
    
    // アクセスログを記録
    await logAccess(null, '/api/email/subscribe', 'POST', 200, responseTime)
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to email updates'
    })
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    // エラーログを記録
    await logAccess(null, '/api/email/subscribe', 'POST', 500, responseTime)
    
    console.error('Email subscription error:', error)
    
    return NextResponse.json(
      { error: 'Failed to subscribe to email updates' },
      { status: 500 }
    )
  }
} 