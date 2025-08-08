"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
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
  BookOpen,
  ChevronDown,
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

export default function AdminTopbar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-x-0 top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="h-14 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="font-semibold tracking-tight text-gray-900">
              UNION 管理
            </Link>
            <Separator orientation="vertical" className="h-6" />

            {/* Condensed primary links for lg+ */}
            <nav className="hidden lg:flex items-center gap-1">
              {menu.slice(0, 6).map(({ href, label, Icon }) => {
                const active = pathname === href || pathname?.startsWith(href + '/')
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 ${active ? 'bg-gray-100 font-medium' : 'text-gray-700'}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                )
              })}
              {/* More dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    その他
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {menu.slice(6).map(({ href, label, Icon }) => (
                    <DropdownMenuItem key={href} asChild>
                      <Link href={href} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/admin/help">
                <BookOpen className="h-4 w-4 mr-2" />
                運用ガイド
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm" className="gap-2">
                  すぐに作成
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/admin/members/create" className="flex items-center gap-2">
                    <Users className="h-4 w-4" /> メンバー
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/news/create" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> ニュース
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/events/create" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> イベント
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/organizations/create" className="flex items-center gap-2">
                    <Building className="h-4 w-4" /> 加盟団体
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Small screens: compact horizontal scrollable nav */}
      <div className="lg:hidden border-t bg-white">
        <div className="mx-auto max-w-screen-2xl px-2">
          <div className="flex overflow-x-auto no-scrollbar gap-1 py-2">
            {menu.map(({ href, label, Icon }) => {
              const active = pathname === href || pathname?.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`whitespace-nowrap px-3 py-1.5 text-sm rounded-md hover:bg-gray-100 transition-colors flex items-center gap-2 ${active ? 'bg-gray-100 font-medium' : 'text-gray-700'}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
