import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Target,
  Handshake,
  Megaphone,
  Calendar,
  Award,
  CheckCircle,
  ArrowRight,
  Heart,
  Globe,
} from "lucide-react"
import { useStats } from "@/hooks/use-stats"

const benefits = [
  {
    icon: Megaphone,
    title: "メディア露出機会",
    description: "ポッドキャスト出演や各種メディアでの団体紹介機会を提供します。",
  },
  {
    icon: Users,
    title: "ネットワーキング",
    description: "全国85の加盟団体との交流・連携機会を得られます。",
  },
  {
    icon: Target,
    title: "活動支援",
    description: "イベント企画支援、広報支援、資金調達のアドバイスを受けられます。",
  },
  {
    icon: Calendar,
    title: "限定イベント",
    description: "加盟団体限定の研修会やネットワーキングイベントに参加できます。",
  },
  {
    icon: Award,
    title: "認定証発行",
    description: "UNION加盟団体としての認定証を発行し、信頼性を向上させます。",
  },
  {
    icon: Globe,
    title: "情報共有",
    description: "他団体の成功事例や最新の学生団体運営ノウハウを共有します。",
  },
]

const requirements = [
  "学生が主体となって運営されている団体であること",
  "継続的な活動実績があること（設立から6ヶ月以上）",
  "明確な活動目的と社会貢献性があること",
  "UNIONの理念に共感し、協力的な関係を築けること",
  "年1回以上のUNION主催イベントへの参加が可能であること",
]

const process = [
  {
    step: 1,
    title: "申込フォーム送信",
    description: "下記のフォームから基本情報と活動内容をお送りください。",
  },
  {
    step: 2,
    title: "書類審査",
    description: "提出いただいた情報を基に、加盟要件を満たしているか審査します。",
  },
  {
    step: 3,
    title: "面談・説明会",
    description: "オンライン面談でより詳しい活動内容をお聞きし、UNIONについて説明します。",
  },
  {
    step: 4,
    title: "加盟決定・契約",
    description: "審査通過後、加盟契約を締結し、正式に加盟団体となります。",
  },
]

const faq = [
  {
    question: "加盟に費用はかかりますか？",
    answer:
      "基本的な加盟費用は無料です。ただし、一部の有料プログラムやイベントについては別途費用が発生する場合があります。",
  },
  {
    question: "どのような団体が加盟していますか？",
    answer:
      "学術系、文化系、社会貢献系、起業系など様々な分野の学生団体が加盟しています。規模も数名から数百名まで多様です。",
  },
  {
    question: "加盟後の義務はありますか？",
    answer:
      "年1回の活動報告と、UNION主催の主要イベントへの参加をお願いしています。その他、可能な範囲での相互協力をお願いします。",
  },
  {
    question: "退会は可能ですか？",
    answer: "はい、いつでも退会可能です。事前に事務局までご連絡いただければ、手続きを進めさせていただきます。",
  },
]

export default function OrganizationJoinPage() {
  const { stats, loading } = useStats()
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

    <ModernHero
        subtitle="Join as Organization"
      title="団体として加盟"
        description="学生団体連合UNIONに加盟して、全国の学生団体とつながりませんか？"
        primaryAction={{
          text: "加盟申請",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV-0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link",
        }}
        secondaryAction={{
          text: "詳細を確認",
          href: "#benefits",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 概要セクション */}
          <AnimatedSection animation="fadeInUp" className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-full mb-8 shadow-xl">
              <Handshake className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">一緒に学生の声を社会に届けませんか？</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              学生団体連合UNIONは、全国85の学生団体、1200名の学生が参加するコミュニティです。
              あなたの団体も加盟して、より大きな社会的インパクトを創出しませんか？
            </p>
          </AnimatedSection>

          {/* 統計情報 */}
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">コミュニティの規模</h3>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <AnimatedSection animation="fadeInUp" delay={100}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{loading ? "..." : stats?.organizationCount || 0}</div>
                <div className="text-gray-600 dark:text-gray-300">加盟団体</div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{loading ? "..." : `${stats?.memberCount || 0}+`}</div>
                <div className="text-gray-600 dark:text-gray-300">参加学生</div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={300}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{loading ? "..." : stats?.prefectureCount || 0}</div>
                <div className="text-gray-600 dark:text-gray-300">都道府県</div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={400}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">3年</div>
                <div className="text-gray-600 dark:text-gray-300">平均活動歴</div>
              </div>
            </AnimatedSection>
          </div>

          {/* 加盟メリット */}
          <AnimatedSection animation="fadeInUp" className="mb-20" id="benefits">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">加盟のメリット</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-xl flex items-center justify-center mb-6">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{benefit.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </AnimatedSection>

          {/* 加盟要件 */}
          <AnimatedSection animation="fadeInUp" className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">加盟要件</h3>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="space-y-6">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-lg">{requirement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 加盟プロセス */}
          <AnimatedSection animation="fadeInUp" className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">加盟プロセス</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                      {step.step}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{step.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* FAQ */}
          <AnimatedSection animation="fadeInUp" className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">よくある質問</h3>
            <div className="max-w-4xl mx-auto space-y-6">
              {faq.map((item, index) => (
                <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{item.question}</h4>
                    <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection animation="fadeInUp">
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
              <h3 className="text-3xl font-bold mb-6">今すぐ加盟しませんか？</h3>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                全国の学生団体とつながり、あなたの活動を次のレベルに引き上げましょう。
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV-0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                加盟申請する
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
}
