import type { Metadata } from "next"
import Link from "next/link"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Mic, Users, Handshake, Play, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "事業内容 | UNION 学生団体連合",
  description: "UNIONはMedia・Community・Matchの3つの事業ドメインで学生の挑戦を後押しします。",
}

export default function InitiativesPage() {
  const businessDomains = [
    {
      id: "media",
      title: "Media事業",
      icon: <Mic className="h-12 w-12 text-[#066ff2]" />,
      description: "学生の声を社会に届けるメディアプラットフォーム",
      color: "blue",
      services: [
        {
          name: "Podcast 4番組",
          details: "ユニラジ / ここみゆの夢ぐらし / ジェネポリ / キャリアみっけ隊",
          metric: "合計再生：30万回（2025年6月時点）",
        },
        {
          name: "UNION Weekly News（縦型動画）",
          details: "週3〜5本、TikTok・Reels・Shortsで配信",
          metric: "学生アナウンサー育成プログラム併設",
        },
        {
          name: "UNION掲示板",
          details: "学生団体向けの情報をすべて集約",
          metric: "メンバー募集からイベント情報まで投稿可能",
        },
      ],
    },
    {
      id: "community",
      title: "Community事業",
      icon: <Users className="h-12 w-12 text-[#ec4faf]" />,
      description: "学生同士をつなぐコミュニティプラットフォーム",
      color: "pink",
      services: [
        {
          name: "学生Slackコミュニティ",
          details: "全国の学生が参加するオンラインコミュニティ",
          metric: "1,000メンバー",
        },
        {
          name: "UNION Media Guild",
          details: "月例オンライン講座＋教材ライブラリ",
          metric: "クリエイター育成プログラム",
        },
        {
          name: "学生団体連合コミュニティ",
          details: "団体間の連携と情報共有を促進",
          metric: "全国50団体が加盟",
        },
      ],
    },
    {
      id: "match",
      title: "Match事業",
      icon: <Handshake className="h-12 w-12 text-[#f59e0b]" />,
      description: "学生・団体と企業をつなぐマッチングサービス",
      color: "amber",
      services: [
        {
          name: "UNION Match（β版）",
          details: "学生・団体と企業のマッチングプラットフォーム",
          metric: "2025年内に20件のコラボ案件創出を目標",
        },
      ],
    },
  ]

  const businessCycle = [
    {
      step: "伝える",
      description: "Mediaで学生の活動や声を発信",
      icon: <Mic className="h-8 w-8" />,
    },
    {
      step: "集う",
      description: "Communityで仲間とつながり成長",
      icon: <Users className="h-8 w-8" />,
    },
    {
      step: "つながる",
      description: "Matchで企業や社会と連携",
      icon: <Handshake className="h-8 w-8" />,
    },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-50 dark:bg-blue-900/20",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-[#066ff2]",
          iconBg: "bg-blue-100 dark:bg-blue-900/30",
        }
      case "pink":
        return {
          bg: "bg-pink-50 dark:bg-pink-900/20",
          border: "border-pink-200 dark:border-pink-800",
          text: "text-[#ec4faf]",
          iconBg: "bg-pink-100 dark:bg-pink-900/30",
        }
      case "amber":
        return {
          bg: "bg-amber-50 dark:bg-amber-900/20",
          border: "border-amber-200 dark:border-amber-800",
          text: "text-[#f59e0b]",
          iconBg: "bg-amber-100 dark:bg-amber-900/30",
        }
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-800",
          border: "border-gray-200 dark:border-gray-700",
          text: "text-gray-600",
          iconBg: "bg-gray-100 dark:bg-gray-700",
        }
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <ModernHero
        subtitle="Our Initiatives"
        title="事業内容"
        description="UNIONの3大事業ドメインで学生の挑戦を後押しします"
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 事業概要 */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">UNIONの3大事業</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                UNIONはMedia・Community・Matchの3つの事業ドメインで学生の挑戦を後押しします。
              </p>
            </div>
          </AnimatedSection>

          {/* 事業ドメイン */}
          <div className="space-y-16 mb-20">
            {businessDomains.map((domain, index) => {
              const colorClasses = getColorClasses(domain.color)
              return (
                <AnimatedSection key={domain.id} delay={index * 0.2}>
                  <div className={`${colorClasses.bg} ${colorClasses.border} border rounded-2xl p-8 md:p-12`}>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                      <div className="flex-shrink-0">
                        <div className={`${colorClasses.iconBg} rounded-2xl p-6 flex items-center justify-center`}>
                          {domain.icon}
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className={`text-3xl font-bold ${colorClasses.text} mb-4`}>
                          {index + 1}. {domain.title}
                        </h3>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{domain.description}</p>

                        <div className="space-y-4">
                          {domain.services.map((service, serviceIndex) => (
                            <div key={serviceIndex} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{service.name}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{service.details}</p>
                                  <p className={`text-sm font-medium ${colorClasses.text}`}>{service.metric}</p>
                                </div>
                                <Link
                                  href={domain.id === "media" ? "/media" : domain.id === "community" ? "/community" : "/about/matching-detail"}
                                  className={`h-5 w-5 ${colorClasses.text} ml-4 flex-shrink-0 hover:scale-110 transition-transform`}
                                >
                                  <Play className="h-5 w-5" />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* 事業詳細ページへのCTAボタン */}
                        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <Link
                            href={domain.id === "media" ? "/media" : domain.id === "community" ? "/community" : "/about/matching-detail"}
                            className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                              domain.id === "media" 
                                ? "bg-[#066ff2] hover:bg-blue-600 text-white" 
                                : domain.id === "community" 
                                ? "bg-[#ec4faf] hover:bg-pink-600 text-white" 
                                : "bg-[#f59e0b] hover:bg-amber-600 text-white"
                            }`}
                          >
                            {domain.id === "media" ? "メディア事業を見る" : domain.id === "community" ? "コミュニティ事業を見る" : "マッチング事業を見る"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>

          {/* 事業サイクル */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">事業の連携サイクル</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                これら3事業は連携しており、「伝える」→「集う」→「つながる」のサイクルで学生の可能性を最大化します。
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {businessCycle.map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <div className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.step}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{step.description}</p>
                    
                    {/* 各ステップへの詳細リンク */}
                    <Link
                      href={index === 0 ? "/media" : index === 1 ? "/community" : "/about/matching-detail"}
                      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        index === 0 
                          ? "bg-[#066ff2] hover:bg-blue-600 text-white" 
                          : index === 1 
                          ? "bg-[#ec4faf] hover:bg-pink-600 text-white" 
                          : "bg-[#f59e0b] hover:bg-amber-600 text-white"
                      }`}
                    >
                      {index === 0 ? "メディア事業" : index === 1 ? "コミュニティ事業" : "マッチング事業"}を見る
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>

                  {index < businessCycle.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* KPI セクション */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-6">数字で見るUNION</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">50万</div>
                  <div className="text-sm opacity-90">Media再生数</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">1,000人</div>
                  <div className="text-sm opacity-90">Community</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">20案件</div>
                  <div className="text-sm opacity-90">Match実績</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">¥1M</div>
                  <div className="text-sm opacity-90">Donation</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 各事業への直接リンク */}
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">各事業の詳細ページ</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Link
                  href="/media"
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-[#066ff2] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Mic className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">メディア事業</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">ポッドキャスト・動画・掲示板</p>
                  <div className="inline-flex items-center text-[#066ff2] text-sm font-medium group-hover:translate-x-1 transition-transform">
                    詳細を見る
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>

                <Link
                  href="/community"
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-[#ec4faf] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">コミュニティ事業</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Slack・Guild・団体連合</p>
                  <div className="inline-flex items-center text-[#ec4faf] text-sm font-medium group-hover:translate-x-1 transition-transform">
                    詳細を見る
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>

                <Link
                  href="/about/matching-detail"
                  className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
                >
                  <div className="w-12 h-12 bg-[#f59e0b] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Handshake className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">マッチング事業</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">学生・団体・企業マッチング</p>
                  <div className="inline-flex items-center text-[#f59e0b] text-sm font-medium group-hover:translate-x-1 transition-transform">
                    詳細を見る
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection delay={0.3}>
            <div className="text-center mt-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">UNIONの事業に参加しませんか？</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
                >
                  参加する
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center border-2 border-[#066ff2] text-[#066ff2] dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-[#066ff2] hover:text-white transition-colors duration-200"
                >
                  サービス詳細
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
    </main>

      <Footer />
    </div>
  )
}
