"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
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
      features: [
        "企業紹介、商品・サービス紹介投稿(1回)",
        "投稿デザイン・文面は基本的にUNION側で作成(事前確認あり)",
        "投稿後のリーチ・エンゲージメント報告",
      ],
    },
    {
      name: "タイトル協賛",
      price: "¥100,000〜",
      description: "イベントそのものに企業名を冠する形での協賛枠。ブランディングやPR効果が高い協賛形式。",
      features: [
        "イベント名に企業名を冠する(例:「○○株式会社Presents○○フェス」)",
        "各種媒体(チラシ、HP、SNS等)でのロゴ・社名の最上位掲載",
        "主催挨拶時などでの紹介、登壇・出展含む全特典",
      ],
    },
    {
      name: "企業主催",
      price: "¥50,000",
      description: "企業様主催でのイベント開催をサポートいたします。",
      features: ["イベント企画・運営サポート", "学生集客支援", "会場手配サポート"],
    },
  ]

  const snsPricing = [
    { name: "企業告知(フィード投稿)", price: "¥2,000" },
    { name: "企業告知(リール投稿)", price: "¥5,000" },
    { name: "イベント告知(フィード投稿)", price: "¥2,000" },
    { name: "イベント告知(リール投稿)", price: "¥5,000" },
  ]

  // UNION Matchの特徴
  const unionMatchFeatures = [
    {
      icon: <Target className="h-8 w-8 text-[#066ff2]" />,
      title: "厳選された学生人材",
      description: "学生団体で実際に活動している、実践経験豊富な学生のみが登録",
    },
    {
      icon: <Heart className="h-8 w-8 text-[#ec4faf]" />,
      title: "マッチング精度の高さ",
      description: "企業の求める人材像と学生の希望を詳細にマッチング",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#f59e0b]" />,
      title: "迅速な対応",
      description: "申し込みから面談まで、最短1週間で実現",
    },
  ]

  // 学生向け申請プロセス
  const applicationProcess = [
    {
      step: "1",
      title: "サービス選択",
      description: "利用したいサービスを選択",
    },
    {
      step: "2",
      title: "申請フォーム送信",
      description: "必要事項を入力して申請",
    },
    {
      step: "3",
      title: "承認・案内",
      description: "承認後、専用資料と日程をご案内",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Our Services"
        title="提供サービス"
        description="学生と企業、それぞれのニーズに応じた多様なサービスを提供しています"
        primaryAction={{
          text: "お問い合わせ",
          href: "/contact",
        }}
        secondaryAction={{
          text: "Slackに参加",
          href: "/community/slack",
        }}
      />

      {/* タブ切り替え */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-lg">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleTabChange("student")}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "student"
                      ? "bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  学生向けサービス
                </button>
                <button
                  onClick={() => handleTabChange("corporate")}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "corporate"
                      ? "bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white shadow-lg"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  企業向けサービス
                </button>
                  </div>
            </div>
          </div>

          {activeTab === "student" && (
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">学生向けサービス</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  UNIONは学生一人ひとりの挑戦を6つのサービスで支援します。すべて無料・申請制です。
                    </p>
                        </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {studentServices.map((service, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 flex-shrink-0">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{service.briefDescription}</p>
                        </div>
                        </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{service.description}</p>

                      <div className="mb-6">
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                          ))}
                    </ul>
                      </div>

                      <div className="mt-auto">
                        {service.isExternal ? (
                          <a
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-medium transition-colors duration-300"
                          >
                            詳細を見る
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        ) : (
                    <Link
                            href={service.link}
                            className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-medium transition-colors duration-300"
                    >
                            詳細を見る
                            <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* 申請プロセス */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">申請プロセス</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {applicationProcess.map((process, index) => (
                    <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white font-bold text-xl">{process.step}</span>
                  </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{process.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{process.description}</p>
                  </div>
                    </AnimatedSection>
                  ))}
                </div>
                  </div>
            </AnimatedSection>
          )}

          {activeTab === "corporate" && (
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">企業向けサービス</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  全国1,000人の学生と50団体と共創し、Z世代に響く未来をつくる。UNIONは学生コミュニティ発のストーリーテリングで、企業のブランド価値と採用力を底上げします。
                </p>
                        </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {corporateServices.map((service, index) => (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 flex-shrink-0">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">{service.briefDescription}</p>
                        </div>
                        </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{service.description}</p>

                      <div className="mb-6">
                        <ul className="space-y-2">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                          ))}
                    </ul>
                      </div>

                      <div className="mt-auto">
                        {service.isExternal ? (
                          <a
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-medium transition-colors duration-300"
                          >
                            詳細を見る
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        ) : (
                    <Link
                            href={service.link}
                            className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] font-medium transition-colors duration-300"
                    >
                            詳細を見る
                            <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* 料金表 */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">協賛料金表</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventPricing.map((item, index) => (
                    <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                        <div className="text-2xl font-bold text-[#066ff2] mb-2">{item.price}</div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                        <ul className="space-y-1">
                          {item.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-xs text-gray-500 dark:text-gray-400">
                              • {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              {/* SNS料金表 */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">SNS投稿料金</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {snsPricing.map((item, index) => (
                    <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                      <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
                        <div className="text-lg font-bold text-[#066ff2] mb-1">{item.price}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{item.name}</div>
                  </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
        </AnimatedSection>
          )}
        </div>
          </section>

      <Footer />
    </div>
  )
}
