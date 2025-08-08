"use client"

import { NotificationProvider } from '@/components/ui/notification-system'
import { Toaster } from '@/components/ui/toaster'
import ErrorBoundary from '@/components/ui/error-boundary'
import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminGuard from '@/components/admin/AdminGuard'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === '/admin/login'

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          {!isLogin && <AdminTopbar />}
          <main className={`min-w-0 ${!isLogin ? 'pt-14' : ''}`}>
            <div className="mx-auto max-w-screen-lg px-4 md:px-6 lg:px-8 py-4 md:py-6">
              {isLogin ? (
                children
              ) : (
                <AdminGuard>
                  {children}
                </AdminGuard>
              )}
            </div>
          </main>
          <Toaster />
        </div>
      </NotificationProvider>
    </ErrorBoundary>
  )
} 