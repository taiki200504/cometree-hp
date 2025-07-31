import { createAdminSupabaseClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    await requireAdmin(request)
    const supabase = createAdminSupabaseClient()

    // Get total organizations
    const { count: totalOrganizations } = await supabase
      .from('organizations')
      .select('*', { count: 'exact', head: true })

    // Get active organizations
    const { count: activeOrganizations } = await supabase
      .from('organizations')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // Get verified organizations
    const { count: verifiedOrganizations } = await supabase
      .from('organizations')
      .select('*', { count: 'exact', head: true })
      .in('verification_level', ['verified', 'premium'])

    // Get total members
    const { data: memberCounts } = await supabase
      .from('organizations')
      .select('member_count')

    const totalMembers = memberCounts?.reduce((sum, org) => sum + (org.member_count || 0), 0) || 0

    // Get pending applications
    const { count: pendingApplications } = await supabase
      .from('organization_applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')

    // Get approved events
    const { count: approvedEvents } = await supabase
      .from('organization_events')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')

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
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
} 