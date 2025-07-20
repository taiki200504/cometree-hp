import { NextRequest, NextResponse } from 'next/server'
import { EventCMS } from '@/lib/cms'
import { requireAdmin, logAccess } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as any
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const search = searchParams.get('search')
    const upcoming = searchParams.get('upcoming') === 'true'
    
    const events = await EventCMS.getEvents({
      status,
      category,
      limit,
      offset,
      search,
      upcoming
    })
    
    const responseTime = Date.now() - startTime
    
    // アクセスログを記録
    await logAccess(null, '/api/cms/events', 'GET', 200, responseTime)
    
    return NextResponse.json(events)
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    // エラーログを記録
    await logAccess(null, '/api/cms/events', 'GET', 500, responseTime)
    
    console.error('Events fetch error:', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // 管理者権限チェック
    const user = await requireAdmin()
    
    const data = await request.json()
    
    const event = await EventCMS.createEvent({
      ...data,
      organizer_id: user.id
    })
    
    const responseTime = Date.now() - startTime
    
    // アクセスログを記録
    await logAccess(user.id, '/api/cms/events', 'POST', 201, responseTime)
    
    return NextResponse.json(event, { status: 201 })
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    // エラーログを記録
    await logAccess(null, '/api/cms/events', 'POST', 500, responseTime)
    
    console.error('Event creation error:', error)
    
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
} 