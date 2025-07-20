import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .single()

    if (error) {
      console.error('Error fetching stats:', error)
      return NextResponse.json(
        { 
          organizationCount: 0,
          memberCount: 0,
          eventCount: 0,
          partnerCount: 0,
          prefectureCount: 0
        },
        { status: 200 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in stats API:', error)
    return NextResponse.json(
      { 
        organizationCount: 0,
        memberCount: 0,
        eventCount: 0,
        partnerCount: 0,
        prefectureCount: 0
      },
      { status: 200 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    // Check if user is authenticated and is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!userData || userData.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { organizationCount, memberCount, eventCount, partnerCount, prefectureCount } = body

    const { data, error } = await supabase
      .from('stats')
      .update({
        organization_count: organizationCount,
        member_count: memberCount,
        event_count: eventCount,
        partner_count: partnerCount,
        prefecture_count: prefectureCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', (await supabase.from('stats').select('id').single()).data?.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating stats:', error)
      return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in stats update API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 