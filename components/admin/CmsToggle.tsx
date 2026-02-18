'use client'

import { useState, useEffect } from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Database, Globe } from 'lucide-react'

export function CmsToggle() {
  const [useNotion, setUseNotion] = useState(false)
  const [cmsMode, setCmsMode] = useState<string>('supabase')

  useEffect(() => {
    // Try loading from admin settings API; fallback to env
    const controller = new AbortController()
    const load = async () => {
      try {
        const res = await fetch('/api/admin/settings', { signal: controller.signal })
        if (res.ok) {
          const data = await res.json()
          const s = data?.settings || {}
          const modeFromApi = s?.cms?.mode || s?.cmsMode
          const notionFlag = s?.cms?.useNotion ?? s?.useNotion
          if (typeof modeFromApi === 'string') setCmsMode(modeFromApi)
          if (typeof notionFlag === 'boolean') setUseNotion(notionFlag)
          if (typeof modeFromApi === 'undefined' && typeof notionFlag === 'undefined') {
            const envFlag = process.env.NEXT_PUBLIC_USE_NOTION_FOR_CONTENT === 'true'
            const envMode = process.env.NEXT_PUBLIC_CMS_MODE || 'supabase'
            setUseNotion(envFlag)
            setCmsMode(envMode)
          }
          return
        }
      } catch (_) {}
      const envFlag = process.env.NEXT_PUBLIC_USE_NOTION_FOR_CONTENT === 'true'
      const envMode = process.env.NEXT_PUBLIC_CMS_MODE || 'supabase'
      setUseNotion(envFlag)
      setCmsMode(envMode)
    }
    load()
    return () => controller.abort()
  }, [])

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          CMS Configuration
        </CardTitle>
        <CardDescription>
          Configure how content is managed in your UNION HP system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Mode Display */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Current Mode</p>
              <p className="text-sm text-muted-foreground">
                {cmsMode === 'hybrid' ? 'Hybrid (Notion + Supabase)' :
                 cmsMode === 'notion' ? 'Full Notion' :
                 cmsMode === 'wordpress' ? 'Full WordPress' : 'Full Supabase'}
              </p>
            </div>
          </div>
          <Badge variant={cmsMode === 'hybrid' ? 'default' : 'secondary'}>
            {cmsMode.charAt(0).toUpperCase() + cmsMode.slice(1)}
          </Badge>
        </div>

        {/* Configuration Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notion-toggle">Use Notion for Content</Label>
              <p className="text-sm text-muted-foreground">
                Enable Notion databases for better content management
              </p>
            </div>
            <Switch
              id="notion-toggle"
              checked={useNotion}
              onCheckedChange={setUseNotion}
              disabled // This is for display only in current implementation
            />
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">✅ With Notion (Hybrid Mode)</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Rich text editing</li>
              <li>• Collaborative editing</li>
              <li>• Better content organization</li>
              <li>• Mobile app access</li>
              <li>• Templates and workflows</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">⚡ Supabase Benefits</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Faster API responses</li>
              <li>• Real-time subscriptions</li>
              <li>• Complex queries</li>
              <li>• Built-in authentication</li>
              <li>• Row-level security</li>
            </ul>
          </div>
        </div>

        {/* Status Information */}
        {cmsMode === 'hybrid' && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Hybrid Mode Active
            </h4>
            <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <p><strong>Notion:</strong> News, Events, Board Posts, Organizations, Partners, Members</p>
              <p><strong>Supabase:</strong> Authentication, Analytics, Real-time features</p>
            </div>
          </div>
        )}

        {/* Configuration Note */}
        <div className="text-xs text-muted-foreground p-3 bg-muted rounded">
          <p><strong>Note:</strong> To change CMS mode, update environment variables and restart the application. 
          Authentication and analytics always use Supabase for optimal performance.</p>
        </div>
      </CardContent>
    </Card>
  )
}