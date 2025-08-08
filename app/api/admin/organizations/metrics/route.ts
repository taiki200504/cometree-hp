import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Server DB configuration missing' }, { status: 500 })
    }
    const supabase = createAdminClient()

    // Get total organizations
    const { count: totalOrganizations } = await supabase
      .from('organizations')
      .select('*', { count: 'exact', head: true })

    // Get active organizations
    const { count: activeOrganizations } = await supabase
      .from('organizations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // Get verified organizations (if the column exists)
    let verifiedOrganizations = 0
    try {
      const { count } = await supabase
        .from('organizations')
        .select('*', { count: 'exact', head: true })
        .in('verification_level', ['verified', 'premium'])
      verifiedOrganizations = count || 0
    } catch (_) {
      verifiedOrganizations = 0
    }

    // Get total members
    const { data: memberCounts } = await supabase
      .from('organizations')
      .select('member_count')

    const totalMembers = memberCounts?.reduce((sum: number, org: { member_count: number; }) => sum + (org.member_count || 0), 0) || 0

    // Get pending applications (optional table)
    let pendingApplications = 0
    try {
      const { count } = await supabase
        .from('organization_applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
      pendingApplications = count || 0
    } catch (_) {
      pendingApplications = 0
    }

    // Get approved events (optional table)
    let approvedEvents = 0
    try {
      const { count } = await supabase
        .from('organization_events')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved')
      approvedEvents = count || 0
    } catch (_) {
      approvedEvents = 0
    }

    const metrics = {
      totalOrganizations: totalOrganizations || 0,
      activeOrganizations: activeOrganizations || 0,
      verifiedOrganizations: verifiedOrganizations || 0,
      totalMembers,
      pendingApplications: pendingApplications || 0,
      approvedEvents: approvedEvents || 0
    }

    return NextResponse.json({ metrics })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
} 