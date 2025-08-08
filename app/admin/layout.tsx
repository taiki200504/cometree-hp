"use client"

import { NotificationProvider } from '@/components/ui/notification-system'
import { Toaster } from '@/components/ui/toaster'
import ErrorBoundary from '@/components/ui/error-boundary'
import AdminTopbar from '@/components/admin/AdminTopbar'
import AdminContainer from '@/components/admin/AdminContainer'
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
            <AdminContainer className="py-4 md:py-6">
              {isLogin ? (
                children
              ) : (
                <AdminGuard>
                  {children}
                </AdminGuard>
              )}
            </AdminContainer>
          </main>
          <Toaster />
        </div>
      </NotificationProvider>
    </ErrorBoundary>
  )
} 