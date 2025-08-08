"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { ArrowLeft, Plus, FileText } from 'lucide-react'

interface Props {
  title?: string
  trail?: { label: string, href?: string }[]
  createLink?: { href: string, label?: string }
}

export default function AdminHeader({ title, trail, createLink }: Props) {
  const router = useRouter()
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" /> 戻る
        </Button>
        <div>
          {title && <h1 className="text-base font-semibold">{title}</h1>}
          {trail && trail.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {trail.map((t, i) => (
                  <BreadcrumbItem key={i}>
                    {t.href ? (
                      <BreadcrumbLink asChild>
                        <Link href={t.href}>{t.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{t.label}</BreadcrumbPage>
                    )}
                    {i < trail.length - 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/help"><FileText className="h-4 w-4 mr-1"/>運用ガイド</Link>
        </Button>
        {createLink && (
          <Button asChild size="sm">
            <Link href={createLink.href}><Plus className="h-4 w-4 mr-1"/>{createLink.label ?? '新規作成'}</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
