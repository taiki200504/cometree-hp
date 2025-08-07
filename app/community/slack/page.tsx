"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import { MessageSquare, Users, Hash, Bell, Shield, Zap, CheckCircle, ExternalLink } from "lucide-react"

export default function SlackCommunity() {
  const [activeTab, setActiveTab] = useState("overview")

  // モックSlackチャンネルデータ
  const channels = [
    {
      id: 1,
      name: "general",
      description: "全体的な情報共有・雑談",
      members: 856,
      category: "一般",
      isPublic: true,
    },
    {
      id: 2,
      name: "event-info",
      description: "イベント情報の共有",
      members: 743,
      category: "情報",
      isPublic: true,
    },
    {
      id: 3,
      name: "startup-talk",
      description: "起業・スタートアップに関する議論",
      members: 324,
      category: "専門",
      isPublic: true,
    },
    {
      id: 4,
      name: "international",
      description: "国際交流・留学情報",
      members: 287,
      category: "専門",
      isPublic: true,
    },
    {
      id: 5,
      name: "tech-dev",
      description: "プログラミング・技術開発",
      members: 412,
      category: "専門",
      isPublic: true,
    },
    {
      id: 6,
      name: "volunteer",
      description: "ボランティア活動の情報交換",
      members: 198,
      category: "専門",
      isPublic: true,
    },
    {
      id: 7,
      name: "career-support",
      description: "就活・キャリア相談",
      members: 567,
      category: "サポート",
      isPublic: true,
    },
    {
      id: 8,
      name: "random",
      description: "雑談・趣味の話題",
      members: 623,
      category: "一般",
      isPublic: true,
    },
  ]

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "リアルタイム交流",
      description: "全国の学生とリアルタイムでコミュニケーションを取ることができます。",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <Hash className="h-8 w-8" />,
      title: "専門チャンネル",
      description: "起業、技術、国際交流など、興味のある分野別にチャンネルが分かれています。",
      color: "from-green-400 to-green-600",
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "イベント通知",
      description: "学生団体のイベントや勉強会の情報をいち早く受け取れます。",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "安全な環境",
      description: "学生限定のコミュニティで、安心して交流できる環境を提供しています。",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "情報共有",
      description: "勉強会の資料や有益な情報を簡単に共有・検索できます。",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "ネットワーキング",
      description: "同じ志を持つ学生や先輩とのネットワークを築くことができます。",
      color: "from-teal-400 to-teal-600",
    },
  ]

  const rules = [
    {
      title: "学生限定",
      description: "現役の大学生・大学院生・専門学校生のみが参加できます。",
    },
    {
      title: "実名推奨",
      description: "信頼関係構築のため、実名またはそれに近い名前での参加を推奨しています。",
    },
    {
      title: "建設的な議論",
      description: "批判的ではなく建設的な意見交換を心がけてください。",
    },
    {
      title: "スパム禁止",
      description: "宣伝目的の投稿や関係のない内容の投稿は禁止です。",
    },
    {
      title: "プライバシー尊重",
      description: "他のメンバーの個人情報やプライバシーを尊重してください。",
    },
    {
      title: "適切なチャンネル利用",
      description: "投稿内容に適したチャンネルを選んで投稿してください。",
    },
  ]

  const stats = [
    { label: "総メンバー数", value: "1,200+", icon: <Users className="h-6 w-6" /> },
    { label: "アクティブチャンネル", value: "25+", icon: <Hash className="h-6 w-6" /> },
    { label: "月間メッセージ数", value: "8,500+", icon: <MessageSquare className="h-6 w-6" /> },
    { label: "参加大学数", value: "150+", icon: <CheckCircle className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="UNION Slack Community"
        title="Slackコミュニティ"
        description="全国の学生が集まるUNIONのSlackコミュニティ。学生限定の安全な環境で情報交換や交流を行えます。"
        primaryAction={{
          text: "今すぐ参加する",
          href: "https://join.slack.com/t/union-finschool/shared_invite/zt-2s6iy0dj5-ttUUdbA2MrY2XJf~cou81A",
        }}
        secondaryAction={{
          text: "詳細を見る",
          href: "#details",
        }}
      />

      {/* 統計情報 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-[#066ff2]">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 機能紹介 */}
      <section className="py-16" id="details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#066ff2] dark:text-blue-400 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">コミュニティの特徴</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">UNIONのSlackコミュニティが提供する6つの主要機能</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br ${feature.color} p-4 rounded-xl w-fit mb-6`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* タブナビゲーション */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "overview"
                    ? "bg-[#066ff2] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                チャンネル一覧
              </button>
              <button
                onClick={() => setActiveTab("rules")}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === "rules"
                    ? "bg-[#066ff2] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                利用ルール
              </button>
            </div>
          </div>

          {/* チャンネル一覧タブ */}
          {activeTab === "overview" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">主要チャンネル</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  目的別に整理されたチャンネルで効率的な情報交換が可能です
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <h4 className="font-bold text-gray-900 dark:text-white font-mono">#{channel.name}</h4>
                      <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                        {channel.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                      {channel.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Users className="h-4 w-4 mr-1" />
                      {channel.members}名が参加中
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 利用ルールタブ */}
          {activeTab === "rules" && (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">コミュニティルール</h3>
                <p className="text-gray-600 dark:text-gray-300">安全で建設的なコミュニティ運営のための基本ルール</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rules.map((rule, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-[#066ff2]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{rule.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{rule.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-yellow-600 mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">違反報告について</h4>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
                      ルール違反や不適切な行為を発見した場合は、管理者（@admin）までご連絡ください。
                      匿名での報告も可能です。皆様のご協力により、安全なコミュニティを維持しています。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 参加CTA */}
      <section className="py-16 bg-gradient-to-br from-[#066ff2] to-[#ec4faf]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <MessageSquare className="h-16 w-16 text-white mx-auto mb-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">今すぐコミュニティに参加しよう</h2>
          <p className="text-xl text-white/90 mb-8">
            全国1,200人以上の学生と一緒に
            <br />
            新しい挑戦を始めませんか？
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://join.slack.com/t/union-finschool/shared_invite/zt-2s6iy0dj5-ttUUdbA2MrY2XJf~cou81A"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#066ff2] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
            >
              <ExternalLink className="mr-3 h-6 w-6" />
              Slackに参加する
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#066ff2] transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
            >
              質問・相談する
            </a>
          </div>
          <p className="text-white/70 text-sm mt-6">※ 参加には学生証明が必要です。詳細は参加後にご案内いたします。</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
