"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Users, Building, Handshake, MessageSquare, ExternalLink, ArrowRight, CheckCircle, Clock, Calendar, MapPin, Star, Globe, Heart } from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"
import { useStats } from "@/hooks/use-stats"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "organizations" | "partners" | "guild" | "slack" | "portal">("overview")
  const { stats, loading } = useStats()

  // 加盟団体データ
  const organizations = [
    {
      id: 1,
      name: "東京大学起業サークルTNK",
      description: "学生起業家の育成と支援を目的とした団体",
      category: "起業・ビジネス",
      region: "東京都",
      memberCount: 45,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "早稲田大学国際交流サークル",
      description: "国際交流を通じて多文化理解を深める活動",
      category: "国際交流",
      region: "東京都",
      memberCount: 78,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "慶應義塾大学ボランティア団体",
      description: "地域社会への貢献を目指すボランティア活動",
      category: "ボランティア・社会貢献",
      region: "東京都",
      memberCount: 62,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "明治大学メディア研究会",
      description: "映像制作、Webデザイン、SNS運用などメディア制作全般",
      category: "メディア・クリエイティブ",
      region: "東京都",
      memberCount: 34,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "立教大学環境保護団体",
      description: "持続可能な社会の実現を目指し、環境問題の啓発活動",
      category: "環境・エコロジー",
      region: "東京都",
      memberCount: 28,
      logo: "/placeholder.svg?height=80&width=80",
    },
  ]

  // 提携企業データ
  const partners = [
    {
      id: 1,
      name: "株式会社サイバーエージェント",
      description: "インターネット広告事業、ゲーム事業、メディア事業を展開",
      category: "IT・テクノロジー",
      size: "大企業",
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "株式会社メルカリ",
      description: "フリマアプリ「メルカリ」を運営するEC・フィンテック企業",
      category: "EC・フィンテック",
      size: "大企業",
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "株式会社DeNA",
      description: "ゲーム事業、ライブストリーミング事業、ヘルスケア事業を展開",
      category: "ゲーム・エンターテイメント",
      size: "大企業",
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "楽天グループ株式会社",
      description: "EC、フィンテック、モバイル事業を展開する総合インターネットサービス企業",
      category: "EC・フィンテック",
      size: "大企業",
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "株式会社リクルート",
      description: "人材サービス、メディア事業を展開",
      category: "人材・メディア",
      size: "大企業",
      logo: "/placeholder.svg?height=80&width=80",
    },
  ]

  // 参加形態データ
  const partnershipTypes = [
    {
      id: "member",
      title: "加盟団体",
      subtitle: "学生団体向け",
      description: "学生団体連合の加盟団体として連合サービス提供＋コミュニティサービス提供",
      icon: <Users className="h-12 w-12 text-[#066ff2]" />,
      borderColor: "border-[#066ff2]",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
      buttonColor: "bg-[#066ff2] hover:bg-blue-700",
      features: [
        "学生団体連合への正式加盟",
        "全てのコミュニティサービス利用",
        "イベント・プロジェクト参加権",
        "企業との連携機会提供",
        "広報・運営支援サービス",
      ],
      ctaText: "加盟申請する",
      ctaLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV-0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link",
    },
    {
      id: "partner",
      title: "提携団体/企業",
      subtitle: "学生主体企業・非ビジネス企業向け",
      description: "コミュニティサービスの提供、団体とのパートナーシップで今後のコラボレーションをスムーズにする",
      icon: <Handshake className="h-12 w-12 text-[#ec4faf]" />,
      borderColor: "border-[#ec4faf]",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      iconBgColor: "bg-pink-100 dark:bg-pink-900/30",
      buttonColor: "bg-[#ec4faf] hover:bg-pink-600",
      features: [
        "コミュニティサービス提供",
        "学生団体とのパートナーシップ構築",
        "コラボレーション機会の創出",
        "相互支援ネットワーク参加",
        "非営利活動の連携支援",
      ],
      ctaText: "提携申請する",
      ctaLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdUR_v_l38b0abzhnaEqsA58zRjeS6z72s0SSwb4OWoZouZ6g/viewform?usp=sf_link",
    },
    {
      id: "sponsor",
      title: "協賛企業",
      subtitle: "ビジネス連携企業向け",
      description: "UNIONのメディア or コミュニティにおいてシナジーが生まれることを売り込みに行く",
      icon: <Building className="h-12 w-12 text-[#f59e0b]" />,
      borderColor: "border-[#f59e0b]",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
      buttonColor: "bg-[#f59e0b] hover:bg-amber-600",
      features: [
        "メディア・コミュニティでのシナジー創出",
        "ビジネス連携機会の提供",
        "ブランディング・PR支援",
        "学生市場へのアプローチ支援",
        "採用・インターンシップ連携",
      ],
      ctaText: "協賛申請する",
      ctaLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdUR_v_l38b0abzhnaEqsA58zRjeS6z72s0SSwb4OWoZouZ6g/viewform?usp=sf_link",
    },
  ]

  const tabs = [
    { id: "overview", label: "概要", icon: <Users className="h-4 w-4" /> },
    { id: "organizations", label: "加盟団体", icon: <Building className="h-4 w-4" /> },
    { id: "partners", label: "パートナー", icon: <Handshake className="h-4 w-4" /> },
    { id: "guild", label: "ギルド", icon: <Star className="h-4 w-4" /> },
    { id: "slack", label: "Slack", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "portal", label: "加盟団体専用", icon: <Globe className="h-4 w-4" /> },
  ]

  const statsData = [
    { number: loading ? "..." : stats?.organizationCount || 0, label: "加盟団体", icon: <Users className="h-6 w-6" /> },
    { number: loading ? "..." : stats?.memberCount || 0, label: "参加学生", icon: <Heart className="h-6 w-6" /> },
    { number: loading ? "..." : stats?.partnerCount || 0, label: "提携企業", icon: <Building className="h-6 w-6" /> },
    { number: loading ? "..." : stats?.prefectureCount || 0, label: "都道府県", icon: <MapPin className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Community"
        title="コミュニティ"
        description="全国の学生団体と企業がつながる、日本最大級の学生コミュニティ"
        primaryAction={{
          text: "加盟申請",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV-0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link",
        }}
        secondaryAction={{
          text: "Slackに参加",
          href: "/community/slack",
        }}
      />

      {/* タブナビゲーション */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#066ff2] text-white shadow-lg"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* タブコンテンツ */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 概要タブ */}
          {activeTab === "overview" && (
            <>
              {/* 統計情報 */}
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">コミュニティの規模</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  全国の学生団体と企業が参加する、日本最大級の学生コミュニティ
            </p>
          </AnimatedSection>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {statsData.map((stat, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <div className="text-white">{stat.icon}</div>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                      <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          </AnimatedSection>
                ))}
              </div>

              {/* 参加形態 */}
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">参加形態</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  あなたの立場に応じた参加方法をご用意しています
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {partnershipTypes.map((type, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                    <div className={`bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border-2 ${type.borderColor} hover:shadow-xl transition-all duration-300`}>
                      <div className={`w-20 h-20 ${type.iconBgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        {type.icon}
                      </div>
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{type.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{type.subtitle}</p>
                        <p className="text-gray-600 dark:text-gray-300">{type.description}</p>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {type.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href={type.ctaLink}
                        target={type.ctaLink.startsWith('http') ? '_blank' : undefined}
                        rel={type.ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`w-full ${type.buttonColor} text-white py-3 px-6 rounded-xl font-semibold text-center block hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                        {type.ctaText}
                      </a>
              </div>
            </AnimatedSection>
                ))}
              </div>

              {/* CTA セクション */}
              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <h2 className="text-3xl font-bold mb-6">コミュニティに参加しませんか？</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    全国の学生団体と企業が参加するUNIONコミュニティで、新しい出会いと機会を見つけませんか？
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV-0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                    >
                      加盟申請する
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                <Link
                      href="/community/slack"
                      className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
                >
                      Slackに参加
                      <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                  </div>
              </div>
            </AnimatedSection>
            </>
          )}

          {/* 加盟団体タブ */}
          {activeTab === "organizations" && (
            <>
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">加盟団体一覧</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  全国85の学生団体がUNIONに加盟し、相互協力とコラボレーションを促進しています
            </p>
          </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {organizations.map((org, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                          <NextImage
                            src={org.logo}
                            alt={org.name}
                            width={64}
                            height={64}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{org.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{org.category}</p>
                        </div>
                  </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{org.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{org.region}</span>
                        <span>{org.memberCount}名</span>
                </div>
                    </div>
                  </AnimatedSection>
                  ))}
                </div>

              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <h2 className="text-3xl font-bold mb-6">あなたの団体も加盟しませんか？</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    学生団体連合UNIONに加盟して、全国の学生団体との連携や企業とのコラボレーション機会を獲得しましょう。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV-0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link"
                  target="_blank"
                  rel="noopener noreferrer"
                      className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                    >
                      加盟申請する
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                    <Link
                      href="/community/organizations"
                      className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
                    >
                      加盟団体一覧表を見る
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
          </div>
        </div>
      </AnimatedSection>
            </>
          )}

          {/* パートナータブ */}
          {activeTab === "partners" && (
            <>
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">パートナー企業</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  100以上の企業・団体がUNIONと提携し、学生の成長と社会貢献を支援しています
            </p>
          </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {partners.map((partner, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <NextImage
                            src={partner.logo}
                            alt={partner.name}
                            width={64}
                            height={64}
                            className="rounded-lg"
                  />
                </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{partner.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{partner.category}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{partner.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{partner.size}</span>
                    </div>
                    </div>
                  </AnimatedSection>
                ))}
                    </div>

              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <h2 className="text-3xl font-bold mb-6">パートナーシップを構築しませんか？</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    学生コミュニティとの連携を通じて、新しい価値を創造しませんか？
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdUR_v_l38b0abzhnaEqsA58zRjeS6z72s0SSwb4OWoZouZ6g/viewform?usp=sf_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                    >
                      提携申請する
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                    <Link
                      href="/community/partners"
                      className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
                    >
                      提携企業一覧表を見る
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </>
          )}

          {/* ギルドタブ */}
          {activeTab === "guild" && (
            <>
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">ギルド</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  専門分野ごとに集まる学生コミュニティ。同じ興味を持つ仲間と深い交流を楽しめます
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Star className="h-12 w-12" />
          </div>
                  <h2 className="text-3xl font-bold mb-6">ギルド機能について</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    専門分野ごとに集まる学生コミュニティ「ギルド」では、同じ興味を持つ仲間と深い交流を楽しめます。
                    起業、メディア、環境、国際交流など、様々な分野のギルドが活動しています。
                  </p>
                  <p className="text-lg opacity-80 mb-8">
                    現在開発中です。リリースをお楽しみに！
                  </p>
        </div>
      </AnimatedSection>
            </>
          )}

          {/* Slackタブ */}
          {activeTab === "slack" && (
            <>
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Slackコミュニティ</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  1200名以上の学生が参加するSlackコミュニティで、リアルタイムな交流を楽しめます
            </p>
          </AnimatedSection>

              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <MessageSquare className="h-12 w-12" />
                  </div>
                  <h2 className="text-3xl font-bold mb-6">Slackコミュニティへようこそ</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    全国の学生団体メンバーが集まるSlackコミュニティでは、イベント情報の共有、プロジェクトの相談、
                    学生同士の交流など、様々な活動を行っています。
                  </p>
            <Link
                    href="/community/slack"
                    className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Slackに参加する
                    <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
                </div>
              </AnimatedSection>
            </>
          )}

          {/* 加盟団体専用タブ */}
          {activeTab === "portal" && (
            <>
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">加盟団体専用ページ</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  加盟団体の皆様専用の情報とサービスをご利用いただけます
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Globe className="h-12 w-12" />
                  </div>
                  <h2 className="text-3xl font-bold mb-6">加盟団体専用ポータル</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    加盟団体専用のポータルサイトでは、お知らせ・連絡事項、資料・ドキュメント、
                    イベント・プログラム、統計・レポートなど、様々な情報をご利用いただけます。
                  </p>
            <Link
                    href="/community/portal"
                    className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
                    ポータルにアクセス
                    <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
                </div>
          </AnimatedSection>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
