"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import {
  Mic,
  Users,
  Bell,
  MessageSquare,
  Briefcase,
  Handshake,
  GraduationCap,
  Building,
  JapaneseYenIcon as Yen,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  Target,
  Zap,
  Megaphone,
  MessageCircle,
  Globe,
  BookOpen,
  Coffee,
  Lightbulb,
  Radio,
} from "lucide-react"
import Link from "next/link"

export default function Services() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"student" | "corporate">("student")

  // URLパラメータからタブを設定
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'student' || tab === 'corporate') {
      setActiveTab(tab)
    }
  }, [searchParams])

  // タブ変更時のURL更新
  const handleTabChange = (tab: "student" | "corporate") => {
    setActiveTab(tab)
    const url = new URL(window.location.href)
    url.searchParams.set('tab', tab)
    window.history.replaceState({}, '', url.toString())
  }

  // 学生向け情報・サービス
  const studentInfo = [
    {
      icon: Users,
      title: "UNIONメンバー募集",
      description: "学生団体の連携と成長を支援する活動に参加しませんか？",
      features: [
        "様々な学生団体との交流機会",
        "企業との連携プロジェクト参加",
        "リーダーシップスキルの向上",
        "全国の学生とのネットワーク構築",
      ],
      cta: "メンバー募集詳細",
      link: "/join",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      title: "掲示板コミュニティ",
      description: "学生同士で情報交換や相談ができるオンライン掲示板",
      features: ["学生団体の活動情報共有", "イベント・セミナー告知", "質問・相談の投稿", "お気に入り機能で情報管理"],
      cta: "掲示板を見る",
      link: "/board",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Heart,
      title: "UNION Match",
      description: "あなたにぴったりの学生団体や活動を見つけるマッチングサービス",
      features: [
        "興味・関心に基づくマッチング",
        "学生団体の詳細情報閲覧",
        "活動体験の申し込み",
        "メンバーとの直接連絡",
      ],
      cta: "マッチングを試す",
      link: "https://union-match-lp.vercel.app/",
      color: "from-pink-500 to-rose-600",
      isExternal: true,
    },
    {
      icon: Radio,
      title: "メディア＆コミュニティ",
      description: "ポッドキャストやSlackコミュニティで学生生活をより豊かに",
      features: ["ポッドキャスト番組の視聴", "Slackコミュニティ参加", "週刊ニュースレター購読", "学生向けイベント情報"],
      cta: "メディア一覧",
      link: "/media",
      color: "from-orange-500 to-red-600",
    },
  ]

  // 学生向けサービス（現在のサービス）
  const studentServices = [
    {
      icon: <GraduationCap className="h-8 w-8 text-[#066ff2]" />,
      title: "UNION Match",
      description:
        "学生と企業をつなぐマッチングプラットフォームで、インターンシップや就職機会を提供します。学生団体で活動する意欲的な学生と、優秀な人材を求める企業をマッチングし、新しいキャリアの可能性を広げます。",
      briefDescription: "企業とのマッチング機会を提供し、キャリア形成をサポート",
      link: "https://union-match-lp.vercel.app/",
      isExternal: true,
      isHighlight: true,
      features: [
        "学生団体経験者限定のマッチング",
        "企業との直接面談機会",
        "インターンシップ・就職支援",
        "キャリアアドバイザーによるサポート",
      ],
    },
    {
      icon: <Users className="h-8 w-8 text-[#ec4faf]" />,
      title: "学生オンリーSlack",
      description:
        "学生団体や学生限定のSlackコミュニティに参加して、情報交換や交流を深めましょう。全国の学生団体とつながり、ノウハウ共有や協力関係を築けます。",
      briefDescription: "全国の仲間1,000人とつながる場。チャンネル別で交流・質問・イベント告知。",
      link: "https://join.slack.com/t/union-finschool/shared_invite/zt-2s6iy0dj5-ttUUdbA2MrY2XJf~cou81A",
      features: ["全国の学生団体との交流", "運営ノウハウの共有", "イベント情報の交換", "相互支援ネットワーク"],
    },
    {
      icon: <Mic className="h-8 w-8 text-[#066ff2]" />,
      title: "Podcast出演",
      description:
        "UNIONのポッドキャスト番組に出演し、あなたの活動や思いを発信しませんか？学生団体の活動内容や成果を多くの人に知ってもらう絶好の機会です。",
      briefDescription: "あなたの活動をユニラジで発信。双子MCが深掘り取材。",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform",
      features: [
        "人気番組「ユニラジ」への出演",
        "経験豊富なMCによる取材",
        "活動の魅力を効果的に発信",
        "録音・編集はすべてお任せ",
      ],
    },
    {
      icon: <Bell className="h-8 w-8 text-[#066ff2]" />,
      title: "告知依頼",
      description:
        "イベントやプロジェクトの告知をUNIONのSNSやメディアで発信します。より多くの人にあなたの活動を知ってもらうための広報支援サービスです。",
      briefDescription: "イベント・クラファンをSNS / Slack / Podcastで拡散。",
      link: "https://forms.gle/9czvypxEcyi7BxS1A",
      features: ["SNSでの告知投稿", "Slackコミュニティでの拡散", "Podcast番組での紹介", "効果的な広報戦略"],
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-[#ec4faf]" />,
      title: "1on1カウンセリング",
      description:
        "学生団体の運営や活動に関する相談に、経験豊富なメンバーがアドバイスします。団体運営の課題解決から将来の方向性まで、幅広くサポートします。",
      briefDescription: "先輩メンターが進路・団体運営を個別相談。",
      link: "/contact",
      features: [
        "経験豊富な先輩メンターによる相談",
        "進路・キャリアに関するアドバイス",
        "団体運営の課題解決",
        "定期的なフォローアップ",
      ],
    },
    {
      icon: <Briefcase className="h-8 w-8 text-[#ec4faf]" />,
      title: "インターン紹介",
      description:
        "スタートアップ中心に案件を厳選。Slack内#intern-channelで案内。学生に適した条件のインターンシップ案件を紹介します。",
      briefDescription: "スタートアップ中心に案件を厳選。Slack内#intern-channelで案内。",
      link: "/services",
      features: ["厳選されたスタートアップ案件", "Slack内での情報共有", "学生に適した条件", "継続的な案件更新"],
    },
  ]

  const communityFeatures = [
    {
      icon: Globe,
      title: "全国ネットワーク",
      description: "全国の大学から1000人以上の学生が参加",
    },
    {
      icon: BookOpen,
      title: "学習支援",
      description: "勉強会や資格取得支援プログラム",
    },
    {
      icon: Coffee,
      title: "交流イベント",
      description: "オンライン・オフラインでの定期交流会",
    },
    {
      icon: Lightbulb,
      title: "アイデア共有",
      description: "新しいプロジェクトやアイデアの相談・実現",
    },
  ]

  const testimonials = [
    {
      name: "田中さん",
      university: "早稲田大学 3年",
      comment:
        "UNIONの掲示板で他大学の学生と交流でき、視野が広がりました。様々な活動情報も得られて、学生生活がより充実しています。",
      rating: 5,
    },
    {
      name: "佐藤さん",
      university: "慶應義塾大学 2年",
      comment:
        "UNION Matchで自分にぴったりの学生団体を見つけることができました。今では団体の中心メンバーとして活動しています。",
      rating: 5,
    },
    {
      name: "山田さん",
      university: "東京大学 4年",
      comment:
        "Slackコミュニティでは就活情報や業界研究の情報交換ができて、とても助かりました。同じ目標を持つ仲間とも出会えました。",
      rating: 5,
    },
  ]

  const corporateServices = [
    {
      icon: <GraduationCap className="h-8 w-8 text-[#066ff2]" />,
      title: "UNION Match",
      description:
        "優秀な学生人材とのマッチングサービス。学生団体で活動する意欲的な学生との出会いを提供します。従来の就活サイトでは出会えない、実践経験豊富な学生と直接つながることができます。",
      briefDescription: "優秀な学生人材とのマッチングサービス",
      link: "https://union-match-lp.vercel.app/",
      isExternal: true,
      isHighlight: true,
      features: [
        "学生団体経験者との直接マッチング",
        "企業ニーズに合わせた人材紹介",
        "インターンシップ・採用支援",
        "長期的な関係構築サポート",
      ],
      pricing: true,
    },
    {
      icon: <Briefcase className="h-8 w-8 text-[#066ff2]" />,
      title: "協賛相談",
      description:
        "UNIONのメディアやイベントへの協賛を通じて、Z世代へのリーチを強化します。学生に響くブランディング戦略で、効果的なマーケティングを実現します。",
      briefDescription: "メディアやイベントへの協賛機会を提供",
      link: "https://union-information.notion.site/1f223f8602bf80d58355c76d2fac2086?pvs=105",
      pricing: true,
      features: ["イベント協賛プラン", "SNS・メディア協賛", "学生向けブランディング", "効果測定レポート"],
    },
    {
      icon: <Handshake className="h-8 w-8 text-[#ec4faf]" />,
      title: "学生団体との共創プロジェクト",
      description:
        "学生団体とのコラボレーションプロジェクトをコーディネートします。企業の課題解決と学生の学習機会創出を両立する、Win-Winの関係を構築します。",
      briefDescription: "学生団体とのコラボレーション企画をサポート",
      link: "/contact",
      features: ["プロジェクト企画・設計", "学生チームのマッチング", "進行管理・サポート", "成果発表・評価"],
    },
    {
      icon: <Building className="h-8 w-8 text-[#ec4faf]" />,
      title: "学生団体への相談窓口",
      description:
        "企業と学生団体をつなぐ窓口として、様々な相談に対応します。採用、マーケティング、CSR活動など、企業のニーズに応じた学生団体との連携をサポートします。",
      briefDescription: "企業と学生団体をつなぐ相談窓口",
      link: "/contact",
      features: [
        "企業ニーズのヒアリング",
        "最適な学生団体のマッチング",
        "連携プロジェクトの提案",
        "継続的な関係構築支援",
      ],
    },
  ]

  // 料金表データ
  const eventPricing = [
    {
      name: "イベント出展協賛",
      price: "¥30,000〜",
      description:
        "学生向けイベントや交流会などにおいて、企業様のブース出展・資料配布・名刺交換などを可能とする協賛枠。",
      features: ["会場内ブース設置スペースの提供", "企業ロゴの掲載(パンフレットなど)", "学生との直接交流機会の提供"],
    },
    {
      name: "プレゼンテーション・登壇協賛",
      price: "¥50,000〜",
      description: "イベント内での企業紹介プレゼンやパネルディスカッションへの登壇など、登壇機会を提供する協賛枠。",
      features: [
        "5〜10分程度のプレゼン時間(内容応相談)",
        "タイムテーブル・パンフレット・Web上での紹介",
        "質疑応答やトークセッション参加権",
      ],
    },
    {
      name: "SNS投稿協賛",
      price: "¥5,000〜",
      description: "学生団体連合UNIONの公式SNS(Instagram、X (旧Twitter) など)を活用した、企業様に関する投稿枠。",
      features: ["Instagram投稿", "X (旧Twitter) 投稿", "ハッシュタグ付き投稿", "リポスト・リツイート対応"],
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        title={activeTab === "student" ? "学生向け情報・サービス" : "企業向けサービス"}
        subtitle={activeTab === "student" ? "For Students" : "For Corporations"}
        description={
          activeTab === "student"
            ? "UNIONが提供する学生向け情報・サービスで、あなたの学生生活をより豊かにしませんか？"
            : "UNIONの企業向けサービスで、優秀な学生人材との出会いを創出しませんか？"
        }
      />

      {/* タブ切り替え */}
      <div className="bg-gray-50 dark:bg-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 bg-white dark:bg-gray-700 rounded-lg p-1 max-w-md mx-auto">
            <button
              onClick={() => handleTabChange("student")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "student"
                  ? "bg-[#066ff2] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              学生向け
            </button>
            <button
              onClick={() => handleTabChange("corporate")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "corporate"
                  ? "bg-[#066ff2] text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              企業向け
            </button>
          </div>
        </div>
      </div>

      {activeTab === "student" ? (
        <main className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 学生向け情報 */}
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  UNIONで始める新しい学生生活
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  学生団体への参加から情報交換まで、あなたの成長をサポートする4つの情報・サービス
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {studentInfo.map((info, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                    <div className={`bg-gradient-to-r ${info.color} p-6`}>
                      <div className="flex items-center space-x-4 text-white">
                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg">
                          <info.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{info.title}</h3>
                          <p className="opacity-90">{info.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <ul className="space-y-3 mb-6">
                        {info.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-full" />
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={info.link}
                        target={info.isExternal ? "_blank" : undefined}
                        className={`inline-flex items-center space-x-2 bg-gradient-to-r ${info.color} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full justify-center`}
                      >
                        <span>{info.cta}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* UNIONコミュニティの特徴 */}
            <AnimatedSection>
              <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl p-8 mb-20 text-white">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">UNIONコミュニティの特徴</h2>
                  <p className="text-lg opacity-90 max-w-2xl mx-auto">
                    1000人以上の学生が参加するSlackコミュニティで、新しいつながりを見つけよう
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {communityFeatures.map((feature, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                        <feature.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm opacity-90">{feature.description}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Link
                    href="/community"
                    className="inline-flex items-center space-x-2 bg-white text-[#066ff2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <span>コミュニティに参加</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* 学生向けサービス */}
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  学生向けサービス
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  学生生活をより充実させるための具体的なサービスをご提供
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {studentServices.map((service, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{service.briefDescription}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>

                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={service.link}
                        target={service.isExternal ? "_blank" : undefined}
                        className="inline-flex items-center space-x-2 bg-[#066ff2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full justify-center"
                      >
                        <span>詳細を見る</span>
                        {service.isExternal ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* 学生の声 */}
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">学生の声</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  UNIONのサービスを利用している学生からの声をご紹介します
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {testimonials.map((testimonial, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 italic">{`"${testimonial.comment}"`}</p>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.university}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* CTA セクション */}
            <AnimatedSection>
              <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl p-8 text-center text-white">
                <Zap className="h-16 w-16 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">今すぐUNIONを始めよう！</h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  学生生活をより充実させる第一歩を踏み出しませんか？ UNIONのサービスは全て無料でご利用いただけます。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/board"
                    className="inline-flex items-center justify-center space-x-2 bg-white text-[#066ff2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>掲示板を見る</span>
                  </Link>
                  <Link
                    href="/join"
                    className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#066ff2] transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    <span>メンバー募集</span>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </main>
      ) : (
        // 企業向けサービスの既存コード
        <main className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  企業向けサービス
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  優秀な学生人材との出会いを創出し、企業の成長をサポートするサービスをご提供
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {corporateServices.map((service, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{service.briefDescription}</p>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>

                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={service.link}
                        target={service.isExternal ? "_blank" : undefined}
                        className="inline-flex items-center space-x-2 bg-[#066ff2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full justify-center"
                      >
                        <span>詳細を見る</span>
                        {service.isExternal ? <ExternalLink className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* 料金表 */}
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">料金表</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  イベント協賛やメディア掲載の料金プランをご紹介
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {eventPricing.map((plan, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-[#066ff2] mb-4">{plan.price}</div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* CTA セクション */}
            <AnimatedSection>
              <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl p-8 text-center text-white">
                <Handshake className="h-16 w-16 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-4">企業様との連携をお待ちしています</h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  優秀な学生人材との出会いを創出し、企業の成長をサポートいたします。
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-[#066ff2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <span>お問い合わせ</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </main>
      )}

      <Footer />
    </div>
  )
}
