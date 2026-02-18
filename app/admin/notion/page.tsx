import { Metadata } from 'next'
import { NotionManagementDashboard } from '@/components/admin/NotionManagementDashboard'

export const metadata: Metadata = {
  title: 'Notion データベース管理 | UNION HP Admin',
  description: 'サイトコンテンツのNotion統合管理'
}

export default function NotionManagementPage() {
  return (
    <div className="container mx-auto py-6">
      <NotionManagementDashboard />
    </div>
  )
}