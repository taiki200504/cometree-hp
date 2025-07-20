"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  ExternalLink,
  Star,
  TrendingUp,
  Award,
  BookOpen,
  Mic,
  Building,
  Heart,
} from "lucide-react"

const upcomingEvents = [
  {
    title: "リーダーシップ研修プログラム",
    description: "学生団体のリーダーを対象とした実践的なリーダーシップ研修",
    date: "2024-02-15",
    time: "13:00-17:00",
    location: "UNION事務局会議室",
    capacity: 20,
    registered: 15,
    status: "募集中",
    category: "研修",
    priority: "加盟団体優先",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSe_LKIbtn0IAsI-qafZJugn6XW7TGX20GSyamb8-4hjUXV1Uw/viewform?usp=sf_link",
  },
  {
    title: "合同勉強会",
    description: "加盟団体同士の情報交換とネットワーキング",
    date: "2024-02-28",
    time: "18:00-21:00",
    location: "オンライン（Zoom）",
    capacity: 50,
    registered: 30,
    status: "準備中",
    category: "ネットワーキング",
    priority: "加盟団体限定",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSe_LKIbtn0IAsI-qafZJugn6XW7TGX20GSyamb8-4hjUXV1Uw/viewform?usp=sf_link",
  },
  {
    title: "春のネットワーキングイベント",
    description: "新年度に向けた加盟団体の交流イベント",
    date: "2024-03-10",
    time: "14:00-18:00",
    location: "都内会議室",
    capacity: 100,
    registered: 45,
    status: "企画中",
    category: "イベント",
    priority: "加盟団体優先",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSe_LKIbtn0IAsI-qafZJugn6XW7TGX20GSyamb8-4hjUXV1Uw/viewform?usp=sf_link",
  },
]

const pastEvents = [
  {
    title: "2023年度総会",
    description: "2023年度の活動報告と2024年度の計画発表",
    date: "2023-12-20",
    participants: 85,
    category: "総会",
    status: "終了",
  },
  {
    title: "冬の合同勉強会",
    description: "年末の振り返りと来年度の計画共有",
    date: "2023-12-15",
    participants: 42,
    category: "勉強会",
    status: "終了",
  },
  {
    title: "メディア研修",
    description: "SNS活用とプレスリリース作成の実践研修",
    date: "2023-11-30",
    participants: 28,
    category: "研修",
    status: "終了",
  },
]

const eventCategories = [
  {
    title: "研修・教育",
    icon: BookOpen,
    description: "スキルアップと知識習得のための研修プログラム",
    color: "bg-blue-500",
  },
  {
    title: "ネットワーキング",
    icon: Users,
    description: "加盟団体同士の交流と情報交換",
    color: "bg-green-500",
  },
  {
    title: "イベント",
    icon: Calendar,
    description: "大規模な交流イベントや記念行事",
    color: "bg-purple-500",
  },
  {
    title: "総会・報告",
    icon: Award,
    description: "年次総会や活動報告会",
    color: "bg-orange-500",
  },
]

export default function EventsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/community/portal/login")
    }
  }, [user, loading, router])

  const handleEventRegistration = (link: string, title: string) => {
    window.open(link, '_blank')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "募集中":
        return "bg-green-500"
      case "準備中":
        return "bg-yellow-500"
      case "企画中":
        return "bg-blue-500"
      case "終了":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "研修":
        return "bg-blue-500"
      case "ネットワーキング":
        return "bg-green-500"
      case "イベント":
        return "bg-purple-500"
      case "総会":
        return "bg-orange-500"
      case "勉強会":
        return "bg-teal-500"
      default:
        return "bg-gray-500"
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
        subtitle="加盟団体専用"
        title="イベント・プログラム"
        description="加盟団体限定のイベントやプログラムに参加できます"
        primaryAction={{
          text: "ポータルに戻る",
          href: "/community/portal",
        }}
        secondaryAction={{
          text: "お問い合わせ",
          href: "https://chlorinated-handspring-b13.notion.site/12be5094912580878799d04c56c963a6?pvs=105",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* イベントカテゴリ */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">イベントカテゴリ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <AnimatedSection key={category.title} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                      <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{category.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </AnimatedSection>

          {/* 今後のイベント */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">今後のイベント</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <AnimatedSection key={event.title} animation="fadeInUp" delay={index * 200}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className={`${getCategoryColor(event.category)} text-white`}>
                        {event.category}
                      </Badge>
                      <Badge className={`${getStatusColor(event.status)} text-white`}>
                        {event.status}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date} {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="h-4 w-4" />
                        <span>定員: {event.capacity}名 / 申込: {event.registered}名</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                        <Star className="h-3 w-3 mr-1" />
                        {event.priority}
                      </Badge>
                      <Button
                        onClick={() => handleEventRegistration(event.link, event.title)}
                        className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white hover:opacity-90"
                      >
                        申し込む
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* 過去のイベント */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">過去のイベント</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <AnimatedSection key={event.title} animation="fadeInUp" delay={index * 100}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${getCategoryColor(event.category)} text-white`}>
                        {event.category}
                      </Badge>
                      <Badge className="bg-gray-500 text-white">
                        {event.status}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{event.date}</span>
                      <span>参加者: {event.participants}名</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* イベント参加のメリット */}
          <AnimatedSection animation="fadeInUp">
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-6 text-center">イベント参加のメリット</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">ネットワーキング</h4>
                  <p className="opacity-90 text-sm">
                    他団体との交流により、新しいアイデアやコラボレーションの機会を得られます。
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">スキルアップ</h4>
                  <p className="opacity-90 text-sm">
                    専門的な研修やワークショップで、団体運営に必要なスキルを習得できます。
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">サポート</h4>
                  <p className="opacity-90 text-sm">
                    UNION事務局や他団体からのサポートを受け、活動の質を向上させられます。
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
} 