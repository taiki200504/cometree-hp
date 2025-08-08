"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  MessageSquare,
  Building,
  Handshake,
  Heart,
  BarChart3,
  Settings,
  BookOpen
} from 'lucide-react'

const menu = [
  { href: '/admin/dashboard', label: 'ダッシュボード', Icon: LayoutDashboard },
  { href: '/admin/members', label: 'メンバー管理', Icon: Users },
  { href: '/admin/news', label: 'ニュース管理', Icon: FileText },
  { href: '/admin/events', label: 'イベント管理', Icon: Calendar },
  { href: '/admin/board', label: '掲示板管理', Icon: MessageSquare },
  { href: '/admin/organizations', label: '加盟団体管理', Icon: Building },
  { href: '/admin/partners', label: '提携企業管理', Icon: Handshake },
  { href: '/admin/supporters', label: '支援者管理', Icon: Heart },
  { href: '/admin/stats', label: '統計・分析', Icon: BarChart3 },
  { href: '/admin/settings', label: 'システム設定', Icon: Settings },
  { href: '/admin/help', label: '運用ガイド', Icon: BookOpen },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r bg-white">
      <div className="h-16 flex items-center px-4 border-b">
        <Link href="/admin/dashboard" className="font-semibold text-lg">
          UNION 管理
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menu.map(({ href, label, Icon }) => {
            const active = pathname === href || pathname?.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${active ? 'bg-gray-100 font-medium' : 'text-gray-700'}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-3 text-xs text-gray-500 border-t">
        © UNION
      </div>
    </aside>
  )
}
