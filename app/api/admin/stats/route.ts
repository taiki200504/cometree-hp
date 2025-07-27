import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Important: Use service_role_key for admin-level access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    // Correctly count rows from existing tables
    const [
      { count: newsCount },
      { count: eventsCount },
      { count: usersCount },
      { count: organizationsCount },
      { count: partnersCount },
      // 'members' table does not exist, so we count from 'users' as a proxy or return 0
      // Let's assume 'members' refers to 'users' for now.
      { count: membersCount }, 
      // 'board_posts' table does not exist, return 0
      // 'page_views' table does not exist, return 0
    ] = await Promise.all([
      supabase.from('news').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('organizations').select('*', { count: 'exact', head: true }),
      supabase.from('partners').select('*', { count: 'exact', head: true }),
      // Assuming 'members' are the 'users' in the users table
      supabase.from('users').select('*', { count: 'exact', head: true }),
    ]);

    // Count board_posts and page_views
    const [
      { count: boardPostsCount },
      { count: viewsCount }
    ] = await Promise.all([
      supabase.from('board_posts').select('*', { count: 'exact', head: true }),
      // For now, we'll use board_posts view_count as a proxy for page views
      supabase.from('board_posts').select('view_count', { count: 'exact', head: true })
    ]);

    return NextResponse.json({
      news: newsCount ?? 0,
      events: eventsCount ?? 0,
      users: usersCount ?? 0,
      organizations: organizationsCount ?? 0,
      partners: partnersCount ?? 0,
      members: membersCount ?? 0, // Using users count for members
      boardPosts: boardPostsCount,
      views: viewsCount,
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
      boardPosts: 0,
      views: 0,
      error: `Failed to load stats: ${errorMessage}` // Add a specific error message
    }, { status: 500 });
  }
}