'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { format } from 'date-fns'
import { ExternalLink, RefreshCw } from 'lucide-react'
import Link from 'next/link'

type Article = {
  id: number
  notion_page_id: string
  title: string
  status: string
  published_at: string | null
  slug: string | null
}

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const fetchArticles = async () => {
    setIsFetching(true)
    const { data, error } = await supabase
      .from('news')
      .select('id, notion_page_id, title, status, published_at, slug')
      .order('published_at', { ascending: false })

    if (error) {
      toast({
        title: 'Error fetching articles',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      setArticles(data || [])
    }
    setIsFetching(false)
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleSync = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/sync-notion', { method: 'POST' })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Sync failed')
      }

      toast({
        title: 'Sync Successful',
        description: result.message,
      })
      // Refresh the list after sync
      await fetchArticles()

    } catch (error) {
      toast({
        title: 'Sync Error',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">News Management</h1>
          <p className="text-muted-foreground">Sync and view news articles from Notion.</p>
        </div>
        <Button onClick={handleSync} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Syncing...' : 'Sync with Notion'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Article List</CardTitle>
          <CardDescription>{articles.length} articles found.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Loading articles...</TableCell>
                </TableRow>
              ) : articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No articles found. Try syncing with Notion.</TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>
                      <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                        {article.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {article.published_at ? format(new Date(article.published_at), 'yyyy/MM/dd') : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`https://notion.so/${article.notion_page_id.replace(/-/g, '')}`} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Edit in Notion
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
