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
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Star
} from 'lucide-react'
import { format } from 'date-fns'

interface EventVenue {
  id: string
  name: string
  capacity: number
  price: number
  facilities: string[]
  location: string
  status: 'available' | 'occupied' | 'maintenance'
  description: string
  images: string[]
}

interface VenueBooking {
  id: string
  venueId: string
  date: string
  startTime: string
  endTime: string
  eventName: string
  attendees: number
  organizationName: string
  totalCost: number
}

export default function EventVenuePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookings, setBookings] = useState<VenueBooking[]>([])

  // イベント会場データ
  const eventVenues: EventVenue[] = [
    {
      id: 'venue-1',
      name: 'UNIONホール',
      capacity: 200,
      price: 50000,
      facilities: ['プロジェクター', '音響設備', '照明設備', 'Wi-Fi', '駐車場'],
      location: '東京都渋谷区',
      status: 'available',
      description: '大規模イベントに最適な多目的ホール。音響・照明設備完備。',
      images: ['/images/venue-1.jpg']
    },
    {
      id: 'venue-2',
      name: 'コミュニティスペース',
      capacity: 50,
      price: 15000,
      facilities: ['プロジェクター', 'ホワイトボード', 'Wi-Fi'],
      location: '東京都新宿区',
      status: 'available',
      description: '中規模イベントに適したコミュニティスペース。',
      images: ['/images/venue-2.jpg']
    },
    {
      id: 'venue-3',
      name: '会議室セット',
      capacity: 100,
      price: 30000,
      facilities: ['プロジェクター', '音響設備', 'Wi-Fi', '会議室3室'],
      location: '東京都港区',
      status: 'maintenance',
      description: '複数の会議室を組み合わせたイベントスペース。',
      images: ['/images/venue-3.jpg']
    }
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push("/community/portal/login")
    }
  }, [user, loading, router])

  const handleBooking = async (formData: any) => {
    const venue = eventVenues.find(v => v.id === selectedVenue)
    if (!venue) return

    const startTime = new Date(`2024-01-01 ${formData.startTime}`)
    const endTime = new Date(`2024-01-01 ${formData.endTime}`)
    const hours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
    const totalCost = venue.price * hours

    const newBooking: VenueBooking = {
      id: `booking-${Date.now()}`,
      venueId: selectedVenue!,
      date: format(selectedDate!, 'yyyy-MM-dd'),
      startTime: formData.startTime,
      endTime: formData.endTime,
      eventName: formData.eventName,
      attendees: formData.attendees,
      organizationName: user?.user_metadata?.organization_name || 'UNION加盟団体',
      totalCost
    }

    setBookings([...bookings, newBooking])
    setShowBookingForm(false)
  }

  const getVenueStatusColor = (status: string) => {
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

  const getVenueStatusText = (status: string) => {
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
        subtitle="Event Venue Booking"
        title="イベント会場貸し出し"
        description="大規模イベント用の会場を加盟団体に特別価格で貸し出します。"
        primaryAction={{
          text: "戻る",
          href: "/community/portal",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 利用可能な会場 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              利用可能な会場
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventVenues.map((venue) => (
                <Card key={venue.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-[#066ff2]" />
                        <span>{venue.name}</span>
                      </CardTitle>
                      <Badge className={getVenueStatusColor(venue.status)}>
                        {getVenueStatusText(venue.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4" />
                          <span>定員: {venue.capacity}名</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <DollarSign className="h-4 w-4" />
                          <span>¥{venue.price.toLocaleString()}/時間</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">設備</h4>
                        <div className="flex flex-wrap gap-1">
                          {venue.facilities.map((facility, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {venue.description}
                      </p>

                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        {venue.location}
                      </div>

                      {venue.status === 'available' && (
                        <Button
                          onClick={() => {
                            setSelectedVenue(venue.id)
                            setShowBookingForm(true)
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
          {showBookingForm && selectedVenue && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">会場予約</h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleBooking({
                    startTime: formData.get('startTime'),
                    endTime: formData.get('endTime'),
                    eventName: formData.get('eventName'),
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
                      <label className="block text-sm font-medium mb-1">イベント名</label>
                      <input
                        name="eventName"
                        type="text"
                        required
                        className="w-full p-2 border rounded"
                        placeholder="イベント名を入力してください"
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
                      <label className="block text-sm font-medium mb-1">予想参加人数</label>
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
                      onClick={() => setShowBookingForm(false)}
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
          {bookings.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                予約履歴
              </h2>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{eventVenues.find(v => v.id === booking.venueId)?.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {booking.eventName}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {booking.date} {booking.startTime} - {booking.endTime}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            参加人数: {booking.attendees}名
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">
                            予約済み
                          </Badge>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                            ¥{booking.totalCost.toLocaleString()}
                          </p>
                        </div>
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
