import { createAdminClient } from '@/lib/supabase/server'
import { z } from 'zod'

type CMSMode = 'supabase' | 'notion' | 'hybrid' | 'wordpress'

export interface SystemSettings {
  site?: {
    name?: string
    description?: string
    url?: string
    contactEmail?: string
  }
  cms?: {
    mode?: CMSMode
    useNotion?: boolean
  }
  [key: string]: any
}

export const CmsModeEnum = z.enum(['supabase', 'notion', 'hybrid', 'wordpress'])

export const SystemSettingsSchema = z.object({
  site: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    url: z.string().url().optional(),
    contactEmail: z.string().email().optional(),
  }).partial().optional(),
  cms: z.object({
    mode: CmsModeEnum.optional(),
    useNotion: z.boolean().optional(),
  }).partial().optional(),
}).passthrough()

export async function getSystemSettings(): Promise<SystemSettings> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('system_settings')
    .select('settings')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('[Settings] fetch error:', error)
    return {}
  }

  return (data?.settings as SystemSettings) || {}
}

export async function getCmsConfig() {
  const settings = await getSystemSettings()
  const envMode = (process.env.NEXT_PUBLIC_CMS_MODE as CMSMode) || 'supabase'
  const envUseNotion = process.env.NEXT_PUBLIC_USE_NOTION_FOR_CONTENT === 'true'

  const mode: CMSMode = settings?.cms?.mode || envMode
  const useNotion: boolean = (settings?.cms?.useNotion ?? envUseNotion) === true

  return { mode, useNotion }
}


