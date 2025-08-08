import { NotificationProvider } from '@/components/ui/notification-system'
import { Toaster } from '@/components/ui/toaster'
import ErrorBoundary from '@/components/ui/error-boundary'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 min-w-0">
              {children}
            </main>
          </div>
          <Toaster />
        </div>
      </NotificationProvider>
    </ErrorBoundary>
  )
} 