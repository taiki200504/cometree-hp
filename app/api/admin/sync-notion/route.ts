
import { NextResponse, type NextRequest } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { Client } from '@notionhq/client';
import { createAdminClient } from '@/lib/supabase/server';

// Notionクライアントを初期化
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Supabaseの管理者クライアントを初期化
const supabaseAdmin = createAdminClient();

export async function POST(req: NextRequest) {
  try {
    // 1. 認証 (Cron Job or Admin Login)
    const secret = req.nextUrl.searchParams.get('secret');
    const cronHeader = req.headers.get('x-vercel-cron');
    const cronSecret = process.env.CRON_SECRET || process.env.NEXT_PUBLIC_CRON_SECRET;
    if (cronHeader === '1' || (secret && cronSecret && secret === cronSecret)) {
      // Cron Jobからのリクエスト
      console.log('[Sync Notion API] Authenticated via Cron Secret.');
    } else {
      // 手動実行（管理者ログイン）
      await requireAdmin(req);
      console.log('[Sync Notion API] Authenticated via Admin session.');
    }

    const notionDatabaseId = process.env.NOTION_NEWS_DATABASE_ID || process.env.NOTION_NEWS_DB_ID;
    if (!notionDatabaseId) {
      throw new Error('NOTION_NEWS_DATABASE_ID (or NOTION_NEWS_DB_ID) is not set in environment variables.');
    }

    // 2. Notionから公開済みの記事を取得
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'PublishedAt',
          direction: 'descending',
        },
      ],
    });

    if (response.results.length === 0) {
      return NextResponse.json({ message: 'No new articles to sync from Notion.' });
    }

    // 3. NotionのデータをSupabaseの形式に変換
    const articlesToSync = response.results.map((page: any) => {
      // Notionのプロパティから安全に値を取得する
      const title = page.properties.Name?.title[0]?.plain_text ?? 'Untitled';
      const slug = page.properties.Slug?.rich_text[0]?.plain_text ?? null;
      const summary = page.properties.Summary?.rich_text[0]?.plain_text ?? null;
      const publishedAt = page.properties.PublishedAt?.date?.start ?? new Date().toISOString();
      const status = page.properties.Status?.status?.name?.toLowerCase() ?? 'draft';
      const coverImageUrl = page.cover?.external?.url ?? page.cover?.file?.url ?? null;

      return {
        notion_page_id: page.id,
        title,
        slug,
        summary,
        published_at: publishedAt,
        status,
        cover_image_url: coverImageUrl,
        updated_at: new Date().toISOString(),
      };
    });

    // 4. Supabaseにデータをupsert
    const { data, error } = await supabaseAdmin
      .from('news')
      .upsert(articlesToSync, { onConflict: 'notion_page_id' });

    if (error) {
      console.error('Supabase upsert error:', error);
      throw new Error(`Failed to sync data to Supabase: ${error.message}`);
    }

    return NextResponse.json({
      message: `Sync successful. ${articlesToSync.length} articles were synced.`,
      syncedArticles: data,
    });

  } catch (error) {
    console.error('[Sync Notion API Error]', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    
    if (errorMessage === 'Admin access required' || errorMessage === 'Authentication required') {
      return new NextResponse(JSON.stringify({ message: errorMessage }), { status: 403 });
    }
    
    return new NextResponse(JSON.stringify({ message: `Sync failed: ${errorMessage}` }), { status: 500 });
  }
}
