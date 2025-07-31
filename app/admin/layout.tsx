import { NotificationProvider } from '@/components/ui/notification-system'
import { Toaster } from '@/components/ui/toaster'
import ErrorBoundary from '@/components/ui/error-boundary'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          {children}
          <Toaster />
        </div>
      </NotificationProvider>
    </ErrorBoundary>
  )
} 