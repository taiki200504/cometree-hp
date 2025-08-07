import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  
  const supabase = createAdminClient()
  
  try {
    // Count all tables safely
    const [
      { count: newsCount },
      { count: eventsCount },
      { count: usersCount },
      { count: organizationsCount },
      { count: partnersCount },
      { count: membersCount },
      { count: supportersCount },
      { count: boardPostsCount }
    ] = await Promise.all([
      supabase.from('news').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('organizations').select('*', { count: 'exact', head: true }),
      supabase.from('partners').select('*', { count: 'exact', head: true }),
      supabase.from('members').select('*', { count: 'exact', head: true }),
      supabase.from('supporters').select('*', { count: 'exact', head: true }),
      supabase.from('board_posts').select('*', { count: 'exact', head: true })
    ]);

    // Calculate total views from board_posts
    const { data: boardPosts } = await supabase
      .from('board_posts')
      .select('view_count')
    
    const totalViews = boardPosts?.reduce((sum: number, post: { view_count: number; }) => sum + (post.view_count || 0), 0) || 0

    return NextResponse.json({
      news: newsCount ?? 0,
      events: eventsCount ?? 0,
      users: usersCount ?? 0,
      organizations: organizationsCount ?? 0,
      partners: partnersCount ?? 0,
      members: membersCount ?? 0,
      supporters: supportersCount ?? 0,
      boardPosts: boardPostsCount ?? 0,
      views: totalViews,
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error fetching stats';
    return NextResponse.json({
      news: 0,
      events: 0,
      users: 0,
      organizations: 0,
      partners: 0,
      members: 0,
      supporters: 0,
      boardPosts: 0,
      views: 0,
      error: `Failed to load stats: ${errorMessage}`
    }, { status: 500 });
  }
}