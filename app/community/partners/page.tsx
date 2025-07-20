"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import { Search, Filter, Building, MapPin, Calendar, ExternalLink, Users } from "lucide-react"
import Link from "next/link"

export default function Partners() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [selectedSize, setSelectedSize] = useState("すべて")

  // モック提携企業データ
  const partners = [
    {
      id: 1,
      name: "株式会社サイバーエージェント",
      description:
        "インターネット広告事業、ゲーム事業、メディア事業を展開するIT企業。学生向けインターンシップや技術セミナーを積極的に開催。",
      category: "IT・テクノロジー",
      size: "大企業",
      region: "東京都",
      employeeCount: "5,000名以上",
      establishedYear: 1998,
      services: ["インターンシップ", "技術セミナー", "キャリア相談", "プロジェクト参加"],
      website: "https://www.cyberagent.co.jp",
      partnershipYear: 2022,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "株式会社メルカリ",
      description:
        "フリマアプリ「メルカリ」を運営するEC・フィンテック企業。循環型社会の実現を目指し、学生の社会課題解決プロジェクトを支援。",
      category: "EC・フィンテック",
      size: "大企業",
      region: "東京都",
      employeeCount: "1,000-5,000名",
      establishedYear: 2013,
      services: ["プロジェクト支援", "メンタリング", "資金提供", "事業開発支援"],
      website: "https://about.mercari.com",
      partnershipYear: 2023,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "株式会社DeNA",
      description:
        "ゲーム事業、ライブストリーミング事業、ヘルスケア事業を展開。学生エンジニアの育成とキャリア支援に力を入れている。",
      category: "ゲーム・エンターテイメント",
      size: "大企業",
      region: "東京都",
      employeeCount: "1,000-5,000名",
      establishedYear: 1999,
      services: ["エンジニア育成", "ハッカソン", "インターンシップ", "技術指導"],
      website: "https://dena.com",
      partnershipYear: 2022,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "楽天グループ株式会社",
      description:
        "EC、フィンテック、モバイル事業を展開する総合インターネットサービス企業。グローバル人材の育成を支援。",
      category: "EC・フィンテック",
      size: "大企業",
      region: "東京都",
      employeeCount: "5,000名以上",
      establishedYear: 1997,
      services: ["グローバル研修", "語学支援", "海外インターン", "起業支援"],
      website: "https://corp.rakuten.co.jp",
      partnershipYear: 2021,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "株式会社リクルート",
      description: "人材サービス、メディア事業を展開。学生のキャリア形成と就職活動を総合的にサポート。",
      category: "人材・メディア",
      size: "大企業",
      region: "東京都",
      employeeCount: "5,000名以上",
      establishedYear: 1960,
      services: ["キャリア相談", "就活支援", "業界セミナー", "面接対策"],
      website: "https://www.recruit.co.jp",
      partnershipYear: 2020,
      logo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "ソフトバンク株式会社",
      description: "通信事業、IT事業を展開。AI・IoT分野での学生プロジェクト支援と技術教育を提供。",
      category: "通信・IT",
      size: "大企業",
      region: "東京都",
      employeeCount: "5,000名以上",
      establishedYear: 1981,
      services: ["AI教育", "IoTプロジェクト", "技術研修", "起業支援"],
      website: "https://www.softbank.jp",
      partnershipYear: 2023,
      logo: "/placeholder.svg?height=80&width=80",
    },
  ]

  const categories = [
    "すべて",
    "IT・テクノロジー",
    "EC・フィンテック",
    "ゲーム・エンターテイメント",
    "人材・メディア",
    "通信・IT",
    "コンサルティング",
    "金融",
    "製造業",
  ]

  const sizes = ["すべて", "スタートアップ", "中小企業", "大企業"]

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      searchTerm === "" ||
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "すべて" || partner.category === selectedCategory
    const matchesSize = selectedSize === "すべて" || partner.size === selectedSize
    return matchesSearch && matchesCategory && matchesSize
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Partner Companies"
        title="提携企業一覧"
        description="UNIONと提携している企業をご紹介します。学生の成長を支援し、共に未来を創造するパートナー企業です。"
        primaryCTA={{
          text: "提携申請する",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSdUR_v_l38b0abzhnaEqsA58zRjeS6z72s0SSwb4OWoZouZ6g/viewform?usp=sf_link",
        }}
        secondaryCTA={{
          text: "コミュニティに戻る",
          href: "/community",
        }}
      />

      {/* 検索・フィルター */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 検索バー */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="企業名・事業内容で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              {/* カテゴリーフィルター */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* 企業規模フィルター */}
              <div>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#066ff2] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Filter className="h-4 w-4 mr-2" />
                {filteredPartners.length}社の企業が見つかりました
              </div>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("すべて")
                  setSelectedSize("すべて")
                }}
                className="text-sm text-[#066ff2] hover:text-[#ec4faf] font-medium"
              >
                フィルターをリセット
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 企業一覧 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <Building className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="text-right">
                      <span className="bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-400 px-3 py-1 rounded-full text-xs font-medium">
                        {partner.category}
                      </span>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{partner.size}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{partner.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{partner.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      {partner.region}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-2" />
                      {partner.employeeCount}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      {partner.establishedYear}年設立・{partner.partnershipYear}年提携開始
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">提供サービス</h4>
                    <div className="flex flex-wrap gap-1">
                      {partner.services.slice(0, 3).map((service, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {service}
                        </span>
                      ))}
                      {partner.services.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">+{partner.services.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link href="/contact" className="text-[#066ff2] hover:text-[#ec4faf] text-sm font-medium">
                      連携について相談
                    </Link>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
                該当する企業が見つかりませんでした
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">検索条件を変更してもう一度お試しください。</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("すべて")
                  setSelectedSize("すべて")
                }}
                className="bg-[#066ff2] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                すべての企業を表示
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
