"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import StatsSection from "@/components/stats-section"
import AnimatedSection from "@/components/animated-section"
import { ArrowRight, Users, Building, Star, CheckCircle, Handshake, Mic, Calendar, TrendingUp, Play, Camera, Newspaper, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // モック学生ニュースデータ
  const newsItems = [
    {
      id: 1,
      title: "東京大学起業サークル、新たなスタートアップを設立",
      excerpt:
        "東京大学起業サークルTNKのメンバーが、AI技術を活用した学習支援アプリを開発し、正式にスタートアップ企業を設立しました。既に複数の投資家から関心を集めており、今後の展開が注目されています。",
      date: "2025年1月18日",
      category: "起業・ビジネス",
      source: "東京大学起業サークルTNK",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["起業", "AI", "学習支援", "投資"],
      readTime: "3分",
      type: "video",
    },
    {
      id: 2,
      title: "早稲田大学国際交流サークル、グローバル学生会議を開催",
      excerpt:
        "早稲田大学国際交流サークルが主催するグローバル学生会議が開催され、世界15カ国から100名以上の学生が参加しました。気候変動や教育格差などの社会課題について活発な議論が交わされました。",
      date: "2025年1月15日",
      category: "国際交流",
      source: "早稲田大学国際交流サークル",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["国際交流", "会議", "気候変動", "教育"],
      readTime: "4分",
      type: "podcast",
    },
    {
      id: 3,
      title: "慶應義塾大学ボランティア団体、地域清掃活動で表彰",
      excerpt:
        "慶應義塾大学のボランティア団体が継続的に行ってきた地域清掃活動が評価され、渋谷区から感謝状を授与されました。3年間で延べ500名以上の学生が参加し、地域環境の改善に貢献しています。",
      date: "2025年1月12日",
      category: "ボランティア・社会貢献",
      source: "慶應義塾大学ボランティア団体",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["ボランティア", "清掃", "表彰", "地域貢献"],
      readTime: "2分",
      type: "article",
    },
  ]

  // 注目記事（最新3件）
  const featuredNews = newsItems.slice(0, 3)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />
      case "podcast":
        return <Mic className="h-4 w-4" />
      case "article":
        return <Newspaper className="h-4 w-4" />
      default:
        return <Newspaper className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "動画"
      case "podcast":
        return "ポッドキャスト"
      case "article":
        return "記事"
      default:
        return "記事"
    }
  }

  const slides = [
    {
      title: "学生団体の挑戦を、社会の力に。",
      subtitle: "全国の学生団体をつなぎ、共に成長する未来を創造します",
      image: "/images/top-page-slide-1.png",
      cta: "コミュニティに参加",
      ctaLink: "/join",
    },
    {
      title: "学生の声を、\n世界に届ける。",
      subtitle: "ポッドキャスト番組を通じて、Z世代のリアルな想いを発信",
      image: "/images/top-page-slide-2.jpg",
      cta: "メディア事業を見る",
      ctaLink: "/media",
    },
    {
      title: "企業と学生の、\n新しい出会い。",
      subtitle: "次世代を担う学生と企業をつなぐプラットフォーム",
      image: "/images/top-page-slide-3.jpg",
      cta: "サービスを見る",
      ctaLink: "/services",
    },
  ]

  useEffect(() => {
    setIsVisible(true)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* 背景装飾 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* テキストコンテンツ */}
            <AnimatedSection animation="fadeInLeft" className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#066ff2] dark:text-blue-400 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800">
                <Star className="w-4 h-4 mr-2" />
                学生団体連合UNION
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight whitespace-pre-line">
                {slides[currentSlide].title}
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={slides[currentSlide].ctaLink}
                  className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
                >
                  {slides[currentSlide].cta}
                </Link>
                <Link
                  href="/about"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-[#066ff2] dark:hover:border-blue-400 transition-all duration-300 text-center"
                >
                  UNIONについて
                </Link>
              </div>
            </AnimatedSection>

            {/* 画像コンテンツ */}
            <AnimatedSection animation="fadeInRight" delay={300}>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/30 dark:to-pink-900/30 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={slides[currentSlide].image || "/placeholder.svg"}
                    alt={slides[currentSlide].title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                {/* 装飾要素 */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#066ff2] to-[#ec4faf] rounded-2xl opacity-80"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-yellow-300 dark:bg-yellow-600 rounded-full opacity-60"></div>
              </div>
            </AnimatedSection>
          </div>

          {/* スライドインジケーター */}
          <div className="flex justify-center mt-12 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[#066ff2] w-8"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`スライド ${index + 1} に移動`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 統計セクション */}
      <AnimatedSection>
        <StatsSection />
      </AnimatedSection>

      {/* サービス紹介 */}
      <AnimatedSection>
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp" className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 text-[#ec4faf] dark:text-pink-400 text-sm font-medium mb-6 border border-pink-100 dark:border-pink-800">
                Our Services
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">提供サービス</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                学生と企業、それぞれのニーズに応じた多様なサービスを提供しています
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 学生向けサービス */}
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-[#066ff2]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">学生向けサービス</h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    学生団体の活動支援から個人のキャリア相談まで、学生の挑戦を全面的にサポートします。
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">ポッドキャスト番組出演機会</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">学生限定Slackコミュニティ</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">イベント告知・広報支援</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">1on1キャリアカウンセリング</span>
                    </div>
                  </div>

                  <Link
                    href="/services?tab=student"
                    className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-semibold transition-colors duration-300"
                  >
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>

              {/* 企業向けサービス */}
              <AnimatedSection animation="fadeInRight" delay={400}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mr-4">
                      <Building className="h-6 w-6 text-[#ec4faf]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">企業向けサービス</h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Z世代へのリーチから学生団体とのコラボレーションまで、企業の学生向け施策を支援します。
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">メディア・イベント協賛</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">学生団体との共創プロジェクト</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">優秀な学生人材の紹介</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">Z世代マーケティング支援</span>
                    </div>
                  </div>

              <Link
                    href="/services?tab=corporate"
                    className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-semibold transition-colors duration-300"
              >
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* メディア事業 */}
      <AnimatedSection>
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp" className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6 border border-purple-100 dark:border-purple-800">
                Media Business
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">メディア事業</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                学生の声を社会に届けるポッドキャスト番組を制作・配信しています
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "ユニラジ",
                  description: "学生のリアルな声が、社会を動かす。",
                  image: "/images/podcast/yuniraji.JPG",
                  link: "/media/podcast/yuniraji",
                  color: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
                  externalLinks: {
                    youtube: "https://www.youtube.com/playlist?list=PLTtd12wBPw0TF7cUSGN_QSK56pnV4Ryld",
                    spotify: "https://open.spotify.com/episode/06ZEBrT8NzRk02jSkcx2pl?si=04931c607b524a2f",
                    apple: "https://podcasts.apple.com/jp/podcast/学生団体unionのユニラジ/id1773603325",
                  },
                },
                {
                  name: "ここみゆの夢ぐらし",
                  description: "私たちのペースで社会を歩く",
                  image: "/images/podcast/cocomiyu.jpg",
                  link: "/media/podcast/cocomiyu",
                  color: "from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30",
                  externalLinks: {
                    youtube: "https://youtube.com/playlist?list=PLTtd12wBPw0S2FfzzPpQa9chH-P_O3j7q&si=AwpqWALvFiW206nV",
                    spotify: "https://open.spotify.com/show/3Hhp09NBFgXh3fR5e3sLCn?si=11d7d1cbb6344d50",
                    apple: "https://podcasts.apple.com/jp/podcast/ここみゆの夢ぐらし/id1806841907",
                  },
                },
                {
                  name: "ジェネポリ",
                  description: "政治って、私が作るんだ",
                  image: "/images/podcast/genepoli.png",
                  link: "/media/podcast/genepoli",
                  color: "from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30",
                  externalLinks: {
                    youtube: "https://www.youtube.com/playlist?list=PLTtd12wBPw0QxkWwZKDNVKnQRHn6D22OD",
                    spotify: "https://open.spotify.com/show/51ymNzm9X9UnSevjnH7uOZ?si=ac400f16f51d4495",
                    apple: null,
                  },
                },
                {
                  name: "キャリアみっけ隊",
                  description: 'キャリアは、"つくる"もの。',
                  image: "/images/podcast/career.png",
                  link: "/media/podcast/career",
                  color: "from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30",
                  externalLinks: {
                    youtube: null,
                    spotify: null,
                    apple: null,
                  },
                },
              ].map((program, index) => (
                <AnimatedSection key={program.name} animation="fadeInUp" delay={index * 100}>
                  <div
                    className={`bg-gradient-to-br ${program.color} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="aspect-square bg-white dark:bg-gray-800 rounded-xl mb-4 overflow-hidden">
                      <Image
                        src={program.image || "/placeholder.svg"}
                        alt={program.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{program.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
                    
                    {/* 外部リンク */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {program.externalLinks.youtube && (
                        <a
                          href={program.externalLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-300"
                        >
                          YouTube
                        </a>
                      )}
                      {program.externalLinks.spotify && (
                        <a
                          href={program.externalLinks.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-300"
                        >
                          Spotify
                        </a>
                      )}
                      {program.externalLinks.apple && (
                        <a
                          href={program.externalLinks.apple}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-300"
                        >
                          Apple
                        </a>
                      )}
                      {!program.externalLinks.youtube && !program.externalLinks.spotify && !program.externalLinks.apple && (
                        <span className="inline-flex items-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-lg text-xs">
                          準備中
                        </span>
                      )}
                    </div>
                    
                    <Link
                      href={program.link}
                      className="text-[#066ff2] hover:text-[#ec4faf] font-medium text-sm transition-colors duration-300"
                    >
                      詳細を見る →
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection animation="fadeInUp" delay={600} className="text-center mt-12">
              <Link
                href="/media"
                className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                全ての番組を見る
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* UNIONの3大事業 */}
      <AnimatedSection>
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp" className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white text-sm font-medium mb-6">
                UNION's Core Businesses
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">UNIONの3大事業</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                学生の成長と社会への貢献を支援する3つの柱となる事業をご紹介します
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* メディア事業 */}
              <AnimatedSection animation="fadeInUp" delay={200}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#ec4faf] to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                    <Mic className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">メディア事業</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    学生の声を社会に届けるポッドキャスト番組を制作・配信し、Z世代のリアルな想いを発信しています。
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#ec4faf] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">4つのポッドキャスト番組</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#ec4faf] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">学生団体ニュース番組</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#ec4faf] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">メディア出演機会の創出</span>
                    </li>
                  </ul>
                  <Link
                    href="/media"
                    className="inline-flex items-center bg-gradient-to-r from-[#ec4faf] to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>

              {/* コミュニティ事業 */}
              <AnimatedSection animation="fadeInUp" delay={400}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">コミュニティ事業</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    全国の学生団体をつなぎ、相互支援とコラボレーションを促進するコミュニティを運営しています。
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#066ff2] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">学生Slackコミュニティ（1200名以上）</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#066ff2] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">加盟団体85団体のネットワーク</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#066ff2] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">イベント・ワークショップ開催</span>
                    </li>
                  </ul>
                  <Link
                    href="/community"
                    className="inline-flex items-center bg-gradient-to-r from-[#066ff2] to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>

              {/* マッチング事業 */}
              <AnimatedSection animation="fadeInUp" delay={600}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <Handshake className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">マッチング事業</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    学生と企業をつなぎ、双方の成長と社会課題の解決を支援するマッチングサービスを提供しています。
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">企業との提携・協賛</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">インターン・採用支援</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300">プロジェクトマッチング</span>
                    </li>
                  </ul>
                  <Link
                    href="/about/matching-detail"
                    className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 注目ニュース */}
      <AnimatedSection>
        <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="fadeInUp" className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white text-sm font-medium mb-6">
                <TrendingUp className="h-4 w-4 mr-2" />
                注目ニュース
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">学生団体ニュース</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                全国の学生団体の挑戦と成果を、UNIONのアナウンサー部がお届けします
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredNews.map((item, index) => (
                <AnimatedSection key={item.id} animation="fadeInUp" delay={index * 200}>
                  <div
                    className={`${
                      index === 0 ? "md:col-span-2 md:row-span-2" : ""
                    } bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300`}
                  >
                    <div
                      className={`${index === 0 ? "aspect-video" : "aspect-video"} bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/30 dark:to-pink-900/30 relative`}
                    >
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                      </div>
                      {index === 0 && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">注目</span>
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full text-xs">
                          {getTypeIcon(item.type)}
                          <span>{getTypeLabel(item.type)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.readTime}</span>
                      </div>

                      <h3 className={`font-bold text-gray-900 dark:text-white mb-3 ${index === 0 ? "text-xl" : "text-lg"}`}>
                        {item.title}
                      </h3>

                      <p className={`text-gray-600 dark:text-gray-300 mb-4 ${index === 0 ? "text-base" : "text-sm"}`}>
                        {item.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">{item.source}</span>
                        </div>
                        <div className="flex gap-1">
                          {item.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection animation="fadeInUp" delay={600} className="text-center mt-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">UNIONのオウンドメディア</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    掲示板では、学生団体の最新情報やUNIONの活動をリアルタイムでお届けしています。
                    あなたの活動も掲載しませんか？
                  </p>
                </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/board"
                    className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    掲示板を見る
                  </Link>
                  <a
                    href="https://v0-student-news-lp-creation.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 border-2 border-[#066ff2]"
                  >
                    ニュース投稿フォーム
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* メルマガ登録セクション */}
      <AnimatedSection>
        <section className="py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white text-sm font-medium mb-6">
                <Mail className="h-4 w-4 mr-2" />
                メルマガ登録
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">最新情報をお届けします</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
                UNIONの最新情報やイベント情報をメールでお届けします。<br />
                学生団体の活動やポッドキャストの更新情報など、お見逃しなく！
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
                <iframe 
                  src="https://union-information.notion.site/ebd/22f23f8602bf8003baa8ce7d021f6786" 
                  width="100%" 
                  height="400" 
                  frameBorder="0" 
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA セクション */}
      <AnimatedSection>
        <section className="py-24 bg-gradient-to-br from-[#066ff2] to-[#ec4faf]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection animation="fadeInUp">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">一緒に未来を創りませんか？</h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                UNIONは学生の挑戦を応援し、企業と学生をつなぐプラットフォームです。
                <br />
                あなたも私たちのコミュニティの一員になって、社会にポジティブな変化をもたらしましょう。
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">学生・学生団体の方</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    同じ志を持つ仲間と出会い、あなたの活動を社会に発信しませんか？
                  </p>
              <Link
                href="/join"
                    className="bg-white text-[#066ff2] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300 inline-block"
              >
                    コミュニティに参加
              </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeInRight" delay={400}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">企業・団体の方</h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    次世代を担う学生との新しい出会いを通じて、共に成長しませんか？
                  </p>
              <Link
                href="/contact"
                    className="bg-white text-[#ec4faf] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300 inline-block"
              >
                お問い合わせ
              </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
