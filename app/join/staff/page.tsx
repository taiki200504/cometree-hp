import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import {
  Briefcase,
  Video,
  Users,
  Code,
  TrendingUp,
  Clock,
  MapPin,
  Calendar,
  ExternalLink,
  CheckCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "運営メンバーになる | UNION 学生団体連合",
  description: "UNIONは「学生の声を社会に響かせる」仲間を募集しています。未経験歓迎・リモート可で柔軟に参加できます。",
}

export default function StaffPage() {
  const positions = [
    {
      department: "法人営業部",
      roles: [
        {
          title: "法人営業",
          description: "スポンサー提案、資料作成",
          timeCommitment: "3-5h",
          icon: <Briefcase className="h-6 w-6" />,
        },
        {
          title: "学生営業",
          description: "学生団体への営業活動",
          timeCommitment: "3-5h",
          icon: <Users className="h-6 w-6" />,
        },
      ],
      color: "blue",
    },
    {
      department: "コンテンツ制作部",
      roles: [
        {
          title: "プロデューサー",
          description: "番組企画・撮影・編集",
          timeCommitment: "5h~",
          icon: <Video className="h-6 w-6" />,
        },
        {
          title: "映像ディレクター",
          description: "映像制作の統括",
          timeCommitment: "5h~",
          icon: <Video className="h-6 w-6" />,
        },
        {
          title: "ライター",
          description: "記事執筆・編集",
          timeCommitment: "5h~",
          icon: <Video className="h-6 w-6" />,
        },
        {
          title: "Podcastパーソナリティ",
          description: "番組出演・進行",
          timeCommitment: "5h~",
          icon: <Video className="h-6 w-6" />,
        },
      ],
      color: "pink",
    },
    {
      department: "コミュニティ部",
      roles: [
        {
          title: "イベントプロデューサー",
          description: "Slack運営、ミートアップ企画",
          timeCommitment: "3h",
          icon: <Users className="h-6 w-6" />,
        },
        {
          title: "コミュニティマネージャー",
          description: "コミュニティ運営・管理",
          timeCommitment: "3h",
          icon: <Users className="h-6 w-6" />,
        },
      ],
      color: "green",
    },
    {
      department: "開発ユニット",
      roles: [
        {
          title: "Frontend",
          description: "サイト & CMS 開発",
          timeCommitment: "5h",
          icon: <Code className="h-6 w-6" />,
        },
        {
          title: "Backend",
          description: "サーバーサイド開発",
          timeCommitment: "5h",
          icon: <Code className="h-6 w-6" />,
        },
        {
          title: "UI/UX",
          description: "デザイン・ユーザビリティ",
          timeCommitment: "5h",
          icon: <Code className="h-6 w-6" />,
        },
      ],
      color: "purple",
    },
    {
      department: "マーケティングユニット",
      roles: [
        {
          title: "マーケター",
          description: "事業戦略・データ分析",
          timeCommitment: "2h",
          icon: <TrendingUp className="h-6 w-6" />,
        },
        {
          title: "SNSマーケ",
          description: "SNS運用・分析",
          timeCommitment: "2h",
          icon: <TrendingUp className="h-6 w-6" />,
        },
      ],
      color: "amber",
    },
  ]

  const workStyle = [
    {
      icon: <Calendar className="h-8 w-8 text-[#066ff2]" />,
      title: "毎週日曜 20:00-21:00",
      description: "オンライン定例会議",
    },
    {
      icon: <MapPin className="h-8 w-8 text-[#ec4faf]" />,
      title: "四半期ごとオフライン合宿",
      description: "任意参加・交通費補助あり",
    },
    {
      icon: <Clock className="h-8 w-8 text-[#066ff2]" />,
      title: "フレキシブルな働き方",
      description: "リモート可・時間調整可能",
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
      case "green":
        return {
          bg: "bg-green-50 dark:bg-green-900/20",
          border: "border-green-200 dark:border-green-800",
          text: "text-green-600",
          iconBg: "bg-green-100 dark:bg-green-900/30",
        }
      case "purple":
        return {
          bg: "bg-purple-50 dark:bg-purple-900/20",
          border: "border-purple-200 dark:border-purple-800",
          text: "text-purple-600",
          iconBg: "bg-purple-100 dark:bg-purple-900/30",
        }
      case "amber":
        return {
          bg: "bg-amber-50 dark:bg-amber-900/20",
          border: "border-amber-200 dark:border-amber-800",
          text: "text-amber-600",
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
        subtitle="Join Our Team"
        title="運営メンバー募集"
        description="UNIONは「学生の声を社会に響かせる」仲間を募集しています。未経験歓迎・リモート可で柔軟に参加できます。"
        primaryCTA={{
          text: "エントリーする",
          href: "https://lin.ee/CVuq44t",
        }}
        secondaryCTA={{
          text: "詳細を見る",
          href: "#positions",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 募集中ポジション */}
          <AnimatedSection id="positions">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">募集中ポジション</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                あなたのスキルと興味に合わせて、様々なポジションをご用意しています
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8 mb-20">
            {positions.map((dept, deptIndex) => {
              const colorClasses = getColorClasses(dept.color)
              return (
                <AnimatedSection key={dept.department} delay={deptIndex * 0.1}>
                  <div className={`${colorClasses.bg} ${colorClasses.border} border rounded-2xl p-8`}>
                    <h3 className={`text-2xl font-bold ${colorClasses.text} mb-6`}>{dept.department}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dept.roles.map((role, roleIndex) => (
                        <div key={role.title} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                          <div className={`${colorClasses.iconBg} rounded-lg p-3 w-fit mb-4`}>
                            <div className={colorClasses.text}>{role.icon}</div>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{role.title}</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{role.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${colorClasses.text}`}>週{role.timeCommitment}</span>
                            <Clock className={`h-4 w-4 ${colorClasses.text}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>

          {/* 活動形態 */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">活動形態</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                柔軟な働き方で、学業との両立も可能です
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {workStyle.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* エントリー方法 */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-6">エントリー方法</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold mb-2">公式LINEにメッセージ</h3>
                    <p className="text-blue-100">「○○（役職名）に興味があります」とメッセージを送るだけ</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold mb-2">面談</h3>
                    <p className="text-blue-100">オンラインで気軽に面談を行います</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold mb-2">メンバー参加</h3>
                    <p className="text-blue-100">面談後、正式にメンバーとして活動開始</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="https://lin.ee/CVuq44t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <ExternalLink className="mr-3 h-6 w-6" />
                  公式LINEでエントリー
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* 特典・メリット */}
          <AnimatedSection delay={0.3}>
            <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                メンバーの特典・メリット
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "実践的なスキルアップ機会",
                  "全国の学生とのネットワーク構築",
                  "企業との連携プロジェクト参加",
                  "メディア出演・発信の機会",
                  "リーダーシップ経験の獲得",
                  "就職活動での差別化要素",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
