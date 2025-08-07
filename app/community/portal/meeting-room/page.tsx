"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ModernHero from '@/components/modern-hero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { 
  Building, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  AlertCircle
} from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface MeetingRoom {
  id: string
  name: string
  capacity: number
  facilities: string[]
  status: 'available' | 'occupied' | 'maintenance'
}

interface Reservation {
  id: string
  roomId: string
  date: string
  startTime: string
  endTime: string
  purpose: string
  attendees: number
  organizationName: string
}

export default function MeetingRoomPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [showReservationForm, setShowReservationForm] = useState(false)
  const [reservations, setReservations] = useState<Reservation[]>([])

  // 会議室データ
  const meetingRooms: MeetingRoom[] = [
    {
      id: 'room-1',
      name: '会議室A',
      capacity: 8,
      facilities: ['プロジェクター', 'ホワイトボード', 'Wi-Fi'],
      status: 'available'
    },
    {
      id: 'room-2',
      name: '会議室B',
      capacity: 12,
      facilities: ['プロジェクター', 'ホワイトボード', 'Wi-Fi', '音響設備'],
      status: 'available'
    },
    {
      id: 'room-3',
      name: '会議室C',
      capacity: 20,
      facilities: ['プロジェクター', 'ホワイトボード', 'Wi-Fi', '音響設備', 'ビデオ会議システム'],
      status: 'maintenance'
    }
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push("/community/portal/login")
    }
  }, [user, loading, router])

  const handleReservation = async (formData: any) => {
    // 実際の実装ではAPIを呼び出して予約を作成
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      roomId: selectedRoom!,
      date: format(selectedDate!, 'yyyy-MM-dd'),
      startTime: formData.startTime,
      endTime: formData.endTime,
      purpose: formData.purpose,
      attendees: formData.attendees,
      organizationName: user?.user_metadata?.organization_name || 'UNION加盟団体'
    }

    setReservations([...reservations, newReservation])
    setShowReservationForm(false)
  }

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'occupied':
        return 'bg-red-100 text-red-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoomStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return '利用可能'
      case 'occupied':
        return '使用中'
      case 'maintenance':
        return 'メンテナンス中'
      default:
        return '不明'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#066ff2] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Meeting Room Reservation"
        title="会議室予約システム"
        description="UNION事務局の会議室を加盟団体に無料で貸し出します。事前予約制でご利用いただけます。"
        primaryAction={{
          text: "戻る",
          href: "/community/portal",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 利用可能な会議室 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              利用可能な会議室
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meetingRooms.map((room) => (
                <Card key={room.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Building className="h-5 w-5 text-[#066ff2]" />
                        <span>{room.name}</span>
                      </CardTitle>
                      <Badge className={getRoomStatusColor(room.status)}>
                        {getRoomStatusText(room.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>定員: {room.capacity}名</span>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">設備</h4>
                        <div className="flex flex-wrap gap-1">
                          {room.facilities.map((facility, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {room.status === 'available' && (
                        <Button
                          onClick={() => {
                            setSelectedRoom(room.id)
                            setShowReservationForm(true)
                          }}
                          className="w-full"
                        >
                          予約する
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 予約フォーム */}
          {showReservationForm && selectedRoom && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">会議室予約</h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleReservation({
                    startTime: formData.get('startTime'),
                    endTime: formData.get('endTime'),
                    purpose: formData.get('purpose'),
                    attendees: formData.get('attendees')
                  })
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">日付</label>
                      <input
                        type="date"
                        value={format(selectedDate!, 'yyyy-MM-dd')}
                        readOnly
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">開始時間</label>
                      <input
                        name="startTime"
                        type="time"
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">終了時間</label>
                      <input
                        name="endTime"
                        type="time"
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">利用目的</label>
                      <textarea
                        name="purpose"
                        required
                        rows={3}
                        className="w-full p-2 border rounded"
                        placeholder="会議の目的を入力してください"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">参加人数</label>
                      <input
                        name="attendees"
                        type="number"
                        min="1"
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowReservationForm(false)}
                      className="flex-1"
                    >
                      キャンセル
                    </Button>
                    <Button type="submit" className="flex-1">
                      予約確定
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 予約履歴 */}
          {reservations.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                予約履歴
              </h2>
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <Card key={reservation.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{meetingRooms.find(r => r.id === reservation.roomId)?.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {reservation.date} {reservation.startTime} - {reservation.endTime}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {reservation.purpose}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          予約済み
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
