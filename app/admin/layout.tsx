import { NotificationProvider } from '@/components/ui/notification-system'
import { Toaster } from '@/components/ui/toaster'
import ErrorBoundary from '@/components/ui/error-boundary'
import AdminTopbar from '@/components/admin/AdminTopbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <AdminTopbar />
          <main className="min-w-0 pt-14">
            {children}
          </main>
          <Toaster />
        </div>
      </NotificationProvider>
    </ErrorBoundary>
  )
} 