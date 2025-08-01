"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { 
  Mic, 
  Play, 
  Newspaper, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Heart, 
  ArrowRight, 
  CheckCircle, 
  Search, 
  Filter, 
  ExternalLink, 
  Camera 
} from "lucide-react"
import Link from "next/link"

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "podcast" | "news" | "board">("overview")

  // メディア事業概要
  const features = [
    {
      title: "学生の声を社会に届ける",
      description: "学生団体の活動や成果を様々なメディアを通じて発信し、社会への認知向上を図ります。",
      icon: <Mic className="h-6 w-6" />,
    },
    {
      title: "メディア出演機会の創出",
      description: "学生団体メンバーがメディアに出演し、活動内容を発信する機会を提供します。",
      icon: <Play className="h-6 w-6" />,
    },
    {
      title: "広報支援",
      description: "イベントやプロジェクトの告知をSNSやメディアで発信し、集客をサポートします。",
      icon: <Newspaper className="h-6 w-6" />,
    },
  ]

  const stats = [
    { number: "4", label: "ポッドキャスト番組", icon: <Mic className="h-6 w-6" /> },
    { number: "200+", label: "総エピソード数", icon: <Play className="h-6 w-6" /> },
    { number: "25万", label: "月間インプレッション", icon: <TrendingUp className="h-6 w-6" /> },
    { number: "100+", label: "学生団体取材", icon: <Users className="h-6 w-6" /> },
  ]

  // ポッドキャスト番組データ
  const podcastShows = [
    {
      id: "yuniraji",
      name: "ユニラジ",
      description: "双子MCが学生団体の活動を深掘り取材する人気ポッドキャスト",
      stats: "120エピソード",
      color: "blue",
      icon: <Mic className="h-8 w-8 text-[#066ff2]" />,
      image: "/images/podcast/yuniraji.JPG",
      detailUrl: "/media/podcast/yuniraji",
      externalLinks: {
        youtube: "https://www.youtube.com/playlist?list=PLTtd12wBPw0TF7cUSGN_QSK56pnV4Ryld",
        spotify: "https://open.spotify.com/episode/06ZEBrT8NzRk02jSkcx2pl?si=04931c607b524a2f",
        apple: "https://podcasts.apple.com/jp/podcast/学生団体unionのユニラジ/id1773603325",
      },
    },
    {
      id: "cocomiyu",
      name: "ここみゆの夢ぐらし",
      description: "心と未来をつなぐ対話番組",
      stats: "80エピソード",
      color: "pink",
      icon: <Play className="h-8 w-8 text-[#ec4faf]" />,
      image: "/images/podcast/cocomiyu.jpg",
      detailUrl: "/media/podcast/cocomiyu",
      externalLinks: {
        youtube: "https://youtube.com/playlist?list=PLTtd12wBPw0S2FfzzPpQa9chH-P_O3j7q&si=AwpqWALvFiW206nV",
        spotify: "https://open.spotify.com/show/3Hhp09NBFgXh3fR5e3sLCn?si=11d7d1cbb6344d50",
        apple: "https://podcasts.apple.com/jp/podcast/ここみゆの夢ぐらし/id1806841907",
      },
    },
    {
      id: "genepoli",
      name: "ジェネポリ",
      description: "Z世代の政治・社会問題討論番組",
      stats: "60エピソード",
      color: "purple",
      icon: <Newspaper className="h-8 w-8 text-[#f59e0b]" />,
      image: "/images/podcast/genepoli.png",
      detailUrl: "/media/podcast/genepoli",
      externalLinks: {
        youtube: "https://www.youtube.com/playlist?list=PLTtd12wBPw0QxkWwZKDNVKnQRHn6D22OD",
        spotify: "https://open.spotify.com/show/51ymNzm9X9UnSevjnH7uOZ?si=ac400f16f51d4495",
        apple: null,
      },
    },
    {
      id: "career",
      name: "キャリアみっけ隊",
      description: "学生のキャリア形成を支援する専門番組",
      stats: "45エピソード",
      color: "green",
      icon: <TrendingUp className="h-8 w-8 text-[#10b981]" />,
      image: "/images/podcast/career.png",
      detailUrl: "/media/podcast/career",
      externalLinks: {
        youtube: null,
        spotify: null,
        apple: null,
      },
    },
  ]

  // 学生ニュースデータ
  const newsItems = [
    {
      id: 1,
      title: "東京大学起業サークル、新たなスタートアップを設立",
      excerpt: "東京大学起業サークルTNKのメンバーが、AI技術を活用した学習支援アプリを開発し、正式にスタートアップ企業を設立しました。",
      date: "2025年1月18日",
      category: "起業・ビジネス",
      type: "video",
    },
    {
      id: 2,
      title: "早稲田大学国際交流サークル、グローバル学生会議を開催",
      excerpt: "早稲田大学国際交流サークルが主催するグローバル学生会議が開催され、世界15カ国から100名以上の学生が参加しました。",
      date: "2025年1月15日",
      category: "国際交流",
      type: "podcast",
    },
    {
      id: 3,
      title: "慶應義塾大学ボランティア団体、地域清掃活動で表彰",
      excerpt: "慶應義塾大学のボランティア団体が継続的に行ってきた地域清掃活動が評価され、渋谷区から感謝状を授与されました。",
      date: "2025年1月12日",
      category: "ボランティア・社会貢献",
      type: "article",
    },
  ]

  const tabs = [
    { id: "overview", label: "概要", icon: <Newspaper className="h-4 w-4" /> },
    { id: "podcast", label: "ポッドキャスト", icon: <Mic className="h-4 w-4" /> },
    { id: "news", label: "学生ニュース", icon: <Camera className="h-4 w-4" /> },
    { id: "board", label: "掲示板", icon: <MessageSquare className="h-4 w-4" /> },
  ]

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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Media Business"
        title="メディア事業"
        description="学生の声を社会に届けるポッドキャスト番組を制作・配信し、Z世代のリアルな想いを発信しています"
        primaryAction={{
          text: "ニュース投稿",
          href: "https://v0-student-news-lp-creation.vercel.app/",
        }}
        secondaryAction={{
          text: "出演申請",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform?usp=sf_link",
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
              {/* 事業概要 */}
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">事業概要</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  学生団体の活動や学生の声を様々なメディアを通じて発信し、社会への認知向上と学生の成長を支援します。
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {features.map((feature, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* 統計情報 */}
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">メディア事業の規模</h2>
              </AnimatedSection>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
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

              {/* 制作番組 */}
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">制作番組</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  学生の声を様々な形式で発信する4つの番組を制作・配信しています
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {podcastShows.map((show, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image
                            src={show.image}
                            alt={show.name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{show.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{show.description}</p>
                          <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">
                            {show.stats}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={show.detailUrl}
                        className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-medium transition-colors duration-300"
                      >
                        詳細を見る
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* 学生団体ニュース */}
              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <h2 className="text-3xl font-bold mb-6">UNION Weekly News</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    学生の&quot;今&quot;を、学生の&quot;声&quot;で届けるUNION Weekly News。毎週3〜5件の活動ニュースを収集し、
                    縦型ショート動画としてTikTok、Instagram、YouTubeで配信しています。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/media/studentnews"
                      className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                    >
                      詳細を見る
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      href="/board"
                      className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
                    >
                      掲示板を見る
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </>
          )}

          {/* ポッドキャストタブ */}
          {activeTab === "podcast" && (
            <>
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">ポッドキャスト番組</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  学生の声を様々な形式で発信する4つの番組を制作・配信しています
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {podcastShows.map((show, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <Image
                            src={show.image}
                            alt={show.name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{show.name}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{show.description}</p>
                          <div className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">
                            {show.stats}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={show.detailUrl}
                        className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-medium transition-colors duration-300"
                      >
                        詳細を見る
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <h2 className="text-3xl font-bold mb-6">ポッドキャストに出演しませんか？</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    あなたの学生団体の活動や想いを、ポッドキャストを通じて全国の学生に届けませんか？
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform?usp=sf_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                    >
                      出演申請する
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                    <Link
                      href="/media/podcast"
                      className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
                    >
                      ポッドキャスト詳細を見る
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </>
          )}

          {/* 学生ニュースタブ */}
          {activeTab === "news" && (
            <>
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">UNION Weekly News</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  学生の&quot;今&quot;を、学生の&quot;声&quot;で届ける縦型ショート動画ニュース番組
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {newsItems.map((item, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-2 mb-4">
                        {getTypeIcon(item.type)}
                        <span className="text-sm text-gray-500 dark:text-gray-400">{getTypeLabel(item.type)}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{item.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{item.date}</span>
                        <span>{item.category}</span>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <h2 className="text-3xl font-bold mb-6">あなたの団体の活動を全国に発信しませんか？</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    UNION Weekly Newsで、学生団体の活動をTikTok、Instagram、YouTubeで紹介します。
                    毎週3〜5件の活動ニュースを収集し、縦型ショート動画として配信しています。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/media/studentnews"
                      className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                    >
                      詳細を見る
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      href="/board"
                      className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
                    >
                      掲示板を見る
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </>
          )}

          {/* 掲示板タブ */}
          {activeTab === "board" && (
            <>
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">掲示板</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  学生団体の活動やイベント情報を共有する掲示板です
                </p>
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp">
                <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                    <MessageSquare className="h-12 w-12" />
                  </div>
                  <h2 className="text-3xl font-bold mb-6">掲示板へようこそ</h2>
                  <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    学生団体の活動やイベント情報、お知らせなどを共有する掲示板です。
                    全国の学生団体メンバーと情報を共有し、新しいコラボレーションの機会を見つけましょう。
                  </p>
                  <Link
                    href="/board"
                    className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                  >
                    掲示板を見る
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