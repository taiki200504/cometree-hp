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
  FileText,
  Download,
  File,
  Image,
  Video,
  Archive,
  Calendar,
  Users,
  Building,
  Shield,
  ExternalLink,
  Clock,
  Star,
} from "lucide-react"

const documentCategories = [
  {
    title: "ガイドライン・マニュアル",
    icon: FileText,
    description: "加盟団体運営に必要なガイドラインやマニュアル",
    documents: [
      {
        title: "加盟団体ガイドライン",
        description: "UNION加盟団体としての活動指針とルール",
        type: "PDF",
        size: "2.3MB",
        updated: "2024-01-15",
        priority: "重要",
        downloadUrl: "#",
      },
      {
        title: "ブランドガイドライン",
        description: "UNIONロゴやブランド要素の使用ガイドライン",
        type: "PDF",
        size: "5.1MB",
        updated: "2024-01-10",
        priority: "重要",
        downloadUrl: "#",
      },
      {
        title: "セキュリティポリシー",
        description: "情報セキュリティとプライバシー保護に関する方針",
        type: "PDF",
        size: "1.8MB",
        updated: "2023-12-20",
        priority: "重要",
        downloadUrl: "#",
      },
    ],
  },
  {
    title: "イベント・企画関連",
    icon: Calendar,
    description: "イベント企画や運営に必要な資料",
    documents: [
      {
        title: "イベント企画書テンプレート",
        description: "イベント企画時の標準フォーマット",
        type: "DOCX",
        size: "1.2MB",
        updated: "2024-01-05",
        priority: "推奨",
        downloadUrl: "#",
      },
      {
        title: "イベント運営チェックリスト",
        description: "イベント開催時のチェック項目一覧",
        type: "XLSX",
        size: "0.8MB",
        updated: "2023-12-15",
        priority: "推奨",
        downloadUrl: "#",
      },
      {
        title: "会場レイアウト例",
        description: "各種イベント会場のレイアウト例",
        type: "PDF",
        size: "3.2MB",
        updated: "2023-11-30",
        priority: "参考",
        downloadUrl: "#",
      },
    ],
  },
  {
    title: "報告・申請関連",
    icon: File,
    description: "活動報告や各種申請に必要なフォーマット",
    documents: [
      {
        title: "活動報告書フォーマット",
        description: "月次・年次活動報告の標準フォーマット",
        type: "XLSX",
        size: "0.8MB",
        updated: "2024-01-01",
        priority: "必須",
        downloadUrl: "#",
      },
      {
        title: "予算申請書テンプレート",
        description: "活動予算申請時の標準フォーマット",
        type: "DOCX",
        size: "1.5MB",
        updated: "2023-12-10",
        priority: "推奨",
        downloadUrl: "#",
      },
      {
        title: "成果報告書テンプレート",
        description: "プロジェクト成果報告の標準フォーマット",
        type: "DOCX",
        size: "1.1MB",
        updated: "2023-11-20",
        priority: "推奨",
        downloadUrl: "#",
      },
    ],
  },
  {
    title: "メディア・広報関連",
    icon: Image,
    description: "広報活動やメディア掲載に必要な素材",
    documents: [
      {
        title: "UNIONロゴ素材",
        description: "高解像度のUNIONロゴファイル一式",
        type: "ZIP",
        size: "15.2MB",
        updated: "2024-01-20",
        priority: "重要",
        downloadUrl: "#",
      },
      {
        title: "プレスリリーステンプレート",
        description: "メディア向けプレスリリースの標準フォーマット",
        type: "DOCX",
        size: "0.9MB",
        updated: "2023-12-05",
        priority: "推奨",
        downloadUrl: "#",
      },
      {
        title: "SNS投稿ガイドライン",
        description: "公式SNSでの投稿ルールとベストプラクティス",
        type: "PDF",
        size: "2.1MB",
        updated: "2023-11-15",
        priority: "推奨",
        downloadUrl: "#",
      },
    ],
  },
]

const recentDocuments = [
  {
    title: "2024年度活動計画書テンプレート",
    category: "企画・運営",
    updated: "2024-01-25",
    type: "DOCX",
    size: "1.8MB",
    isNew: true,
  },
  {
    title: "加盟団体向けセミナー資料",
    category: "研修・教育",
    updated: "2024-01-22",
    type: "PDF",
    size: "4.2MB",
    isNew: true,
  },
  {
    title: "イベント協賛企業リスト",
    category: "パートナー",
    updated: "2024-01-20",
    type: "XLSX",
    size: "0.6MB",
    isNew: false,
  },
]

export default function DocumentsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/community/portal/login")
    }
  }, [user, loading, router])

  const handleDownload = (url: string, title: string) => {
    // 実際の実装ではファイルダウンロード処理
    console.log(`Downloading: ${title}`)
    window.open(url, '_blank')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "重要":
        return "bg-red-500"
      case "必須":
        return "bg-orange-500"
      case "推奨":
        return "bg-blue-500"
      case "参考":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4" />
      case "DOCX":
        return <File className="h-4 w-4" />
      case "XLSX":
        return <File className="h-4 w-4" />
      case "ZIP":
        return <Archive className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
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
        title="資料・ドキュメント"
        description="加盟団体の皆様に必要な資料やドキュメントをダウンロードできます"
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
          {/* 最近の更新 */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">最近の更新</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentDocuments.map((doc, index) => (
                <AnimatedSection key={doc.title} animation="fadeInUp" delay={index * 100}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getFileIcon(doc.type)}
                        <span className="text-sm text-gray-500 dark:text-gray-400">{doc.type}</span>
                      </div>
                      {doc.isNew && (
                        <Badge className="bg-green-500 text-white text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          NEW
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{doc.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{doc.category}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>更新: {doc.updated}</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* カテゴリ別資料 */}
          <AnimatedSection animation="fadeInUp" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">カテゴリ別資料</h2>
            <div className="space-y-12">
              {documentCategories.map((category, categoryIndex) => {
                const Icon = category.icon
                return (
                  <AnimatedSection key={category.title} animation="fadeInUp" delay={categoryIndex * 200}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-xl flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {category.documents.map((doc, docIndex) => (
                          <div key={docIndex} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-2">
                                {getFileIcon(doc.type)}
                                <span className="text-sm text-gray-500 dark:text-gray-400">{doc.type}</span>
                              </div>
                              <Badge className={`${getPriorityColor(doc.priority)} text-white text-xs`}>
                                {doc.priority}
                              </Badge>
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{doc.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{doc.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                <span>更新: {doc.updated}</span>
                                <span className="mx-2">•</span>
                                <span>{doc.size}</span>
                              </div>
                              <Button
                                onClick={() => handleDownload(doc.downloadUrl, doc.title)}
                                size="sm"
                                className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white hover:opacity-90"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                ダウンロード
                              </Button>
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

          {/* 利用ガイドライン */}
          <AnimatedSection animation="fadeInUp">
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-6 text-center">資料利用ガイドライン</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">機密性</h4>
                  <p className="opacity-90 text-sm">
                    これらの資料は加盟団体限定です。外部への共有は禁止されています。
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">更新頻度</h4>
                  <p className="opacity-90 text-sm">
                    資料は定期的に更新されます。最新版をご確認ください。
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">サポート</h4>
                  <p className="opacity-90 text-sm">
                    資料についてご不明な点がございましたら、お気軽にお問い合わせください。
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