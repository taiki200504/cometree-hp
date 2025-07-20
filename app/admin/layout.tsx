import { NotificationProvider } from '@/components/ui/notification-system'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NotificationProvider>
      {children}
    </NotificationProvider>
  )
} 