"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import {
  Shield,
  FileText,
  Calendar,
  Users,
  MessageSquare,
  Download,
  Bell,
  Settings,
  BarChart3,
  Lock,
  ArrowRight,
  Radio,
  Building,
  Heart,
  Clock,
  ExternalLink,
  Mic,
  Users2,
  Briefcase,
  MapPin,
  Video,
  BookOpen,
} from "lucide-react"

const portalSections = [
  {
    title: "お知らせ・連絡事項",
    icon: Bell,
    description: "加盟団体向けの重要なお知らせや連絡事項を確認できます",
    items: [
      { title: "2024年度総会のご案内", date: "2024-01-15", type: "重要" },
      { title: "新規プログラム説明会開催", date: "2024-01-10", type: "お知らせ" },
      { title: "年末年始の事務局対応について", date: "2023-12-25", type: "連絡" },
    ],
  },
  {
    title: "資料・ドキュメント",
    icon: FileText,
    description: "加盟団体向けの各種資料やガイドラインをダウンロードできます",
    items: [
      { title: "加盟団体ガイドライン", type: "PDF", size: "2.3MB" },
      { title: "ブランドガイドライン", type: "PDF", size: "5.1MB" },
      { title: "イベント企画書テンプレート", type: "DOCX", size: "1.2MB" },
      { title: "報告書フォーマット", type: "XLSX", size: "0.8MB" },
    ],
  },
  {
    title: "イベント・プログラム",
    icon: Calendar,
    description: "加盟団体限定のイベントやプログラムに参加できます",
    items: [
      { title: "リーダーシップ研修", date: "2024-02-15", status: "募集中" },
      { title: "合同勉強会", date: "2024-02-28", status: "準備中" },
      { title: "ネットワーキングイベント", date: "2024-03-10", status: "企画中" },
    ],
  },
  // removed on request: 統計・レポート
]

// Fetched from API: /api/community/portal/links
const availableServices: any[] = []

const comingSoonServices = [
  {
    title: "会議室無料貸し出し",
    icon: Building,
    description: "UNION事務局の会議室を加盟団体に無料で貸し出します",
    status: "利用可能",
    color: "bg-green-500",
    href: "/community/portal/meeting-room",
  },
  {
    title: "イベント会場貸し出し",
    icon: MapPin,
    description: "大規模イベント用の会場を加盟団体に特別価格で貸し出します",
    status: "利用可能",
    color: "bg-red-500",
    href: "/community/portal/event-venue",
  },
  {
    title: "動画制作支援",
    icon: Video,
    description: "プロの動画制作チームによる活動紹介動画の制作支援",
    status: "利用可能",
    color: "bg-teal-500",
    href: "/community/portal/video-production",
  },
  {
    title: "専門研修プログラム",
    icon: BookOpen,
    description: "リーダーシップ、マーケティング、ファイナンス等の専門研修",
    status: "Coming Soon",
    color: "bg-cyan-500",
  },
]

const quickActions = [
  { title: "加盟団体限定フォーム", icon: MessageSquare, href: "https://union-information.notion.site/18b23f8602bf813fa179f9c2641c94c9?pvs=105" },
  { title: "資料ダウンロード", icon: Download, href: "/community/portal/documents" },
  { title: "イベント申込", icon: Calendar, href: "/community/portal/events" },
  { title: "プロフィール更新", icon: Settings, href: "/community/portal/profile" },
]

export default function PortalPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [links, setLinks] = useState<any[]>([])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/community/portal/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch('/api/community/portal/links')
        if (res.ok) {
          const data = await res.json()
          setLinks(data)
        }
      } catch (e) {
        // noop
      }
    }
    fetchLinks()
  }, [])

  const handleLogout = async () => {
    await logout()
  }

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank')
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
        subtitle="Member Portal"
        title="加盟団体専用ページ"
        description="加盟団体の皆様専用の情報とサービスをご利用いただけます。今後も加盟団体への支援を最優先にサービスを展開していきます。"
        primaryAction={{
          text: "ログアウト",
          href: "#",
          onClick: handleLogout,
        }}
        secondaryAction={{
          text: "お問い合わせ",
          href: "https://chlorinated-handspring-b13.notion.site/12be5094912580878799d04c56c963a6?pvs=105",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 認証状態の表示 */}
          <AnimatedSection animation="fadeInUp" className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
                    認証済み - ようこそ、{user.organization}様！
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    {user.email} としてログインしています。専用サービスをご利用いただけます。
                  </p>
                </div>
                <Button 
                  onClick={handleLogout}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                >
                  ログアウト
                </Button>
              </div>
            </div>
          </AnimatedSection>

          {/* 利用可能なサービス */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">利用可能なサービス</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dynamic links */}
              {/* The server provides title, url, description, badge, color. We map icons by category if needed. */}
              {(links.length ? links : availableServices).map((service: any, index: number) => {
                const Icon = service.icon
                return (
                  <AnimatedSection key={service.title} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${service.color ?? 'bg-blue-500'} rounded-xl flex items-center justify-center`}>
                          <ExternalLink className="h-6 w-6 text-white" />
                        </div>
                        {service.badge && (
                          <Badge className={`${service.color ?? 'bg-blue-500'} text-white`}>
                            {service.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                      {service.description && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{service.description}</p>
                      )}
                      <Button 
                        onClick={() => handleExternalLink(service.url)}
                        className="w-full bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white hover:opacity-90"
                      >
                        申請する
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </AnimatedSection>

          {/* Coming Soon サービス */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Coming Soon</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              加盟団体への支援を最優先に、新たなサービスを充実させていきます。以下のサービスを順次リリース予定です。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {comingSoonServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <AnimatedSection key={service.title} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-bl-lg">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {service.status}
                        </span>
                      </div>
                      <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
                      {service.href && (
                        <div className="mt-4">
                          <Button asChild className="w-full">
                            <Link href={service.href}>
                              利用する
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </AnimatedSection>

          {/* クイックアクション */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">クイックアクション</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon
                return (
                  <AnimatedSection key={action.title} animation="fadeInUp" delay={index * 100}>
                    <div 
                      className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center cursor-pointer"
                      onClick={() => handleExternalLink(action.href)}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{action.title}</h3>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </AnimatedSection>

          {/* メインコンテンツ */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">情報・資料</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {portalSections.map((section, index) => {
                const Icon = section.icon
                return (
                  <AnimatedSection key={section.title} animation="fadeInUp" delay={index * 200}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-xl flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{section.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{section.description}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                {"date" in item && <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>}
                                {"period" in item && <span className="text-xs text-gray-500 dark:text-gray-400">{item.period}</span>}
                                {"updated" in item && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400">更新: {item.updated}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {"type" in item && (
                                <Badge variant={item.type === "重要" ? "destructive" : "secondary"} className="text-xs">
                                  {item.type}
                                </Badge>
                              )}
                              {"status" in item && (
                                <Badge variant={item.status === "募集中" ? "default" : "secondary"} className="text-xs">
                                  {item.status}
                                </Badge>
                              )}
                              {"size" in item && <span className="text-xs text-gray-500 dark:text-gray-400">{item.size}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </AnimatedSection>

          {/* サポート情報 */}
          <AnimatedSection animation="fadeInUp">
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
              <h3 className="text-3xl font-bold mb-6">サポート・お問い合わせ</h3>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                加盟団体の皆様のサポート体制をご紹介します
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">お問い合わせ</h4>
                  <p className="opacity-90 mb-4">専用フォームからお気軽に</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                    onClick={() => handleExternalLink("https://chlorinated-handspring-b13.notion.site/12be5094912580878799d04c56c963a6?pvs=105")}
                  >
                    お問い合わせ
                  </Button>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">FAQ・ヘルプ</h4>
                  <p className="opacity-90 mb-4">よくある質問と回答</p>
                  <Button variant="outline" size="sm" disabled className="bg-white/10 border-white/30 text-white">
                    FAQを見る
                  </Button>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">セキュリティ</h4>
                  <p className="opacity-90 mb-4">セキュリティポリシー</p>
                  <Button variant="outline" size="sm" disabled className="bg-white/10 border-white/30 text-white">
                    詳細を見る
                  </Button>
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