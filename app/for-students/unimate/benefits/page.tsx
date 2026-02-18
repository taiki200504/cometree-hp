import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Briefcase, Calendar, MessageCircle, CheckCircle, ArrowRight, Users, Target, Zap } from "lucide-react"
import Link from "next/link"

export default function UnimateBenefitsPage() {
  const benefits = [
    {
      icon: Briefcase,
      title: "個人向け案件情報",
      description: "インターン・業務委託など、学生に適した案件情報を案内します。企業との直接面談機会も提供します。",
      details: [
        "インターンシップ情報の優先案内",
        "業務委託案件の紹介",
        "企業との直接面談機会",
        "マッチング成功率85%",
      ],
    },
    {
      icon: Calendar,
      title: "イベント情報",
      description: "UNION・加盟団体のイベントにいち早くアクセスできます。学生限定イベントにも優先的にご案内します。",
      details: [
        "イベント情報の優先案内",
        "学生限定イベントへの参加",
        "企業イベントへの招待",
        "ネットワーキング機会",
      ],
    },
    {
      icon: MessageCircle,
      title: "Discordコミュニティ",
      description: "登録者同士の交流・情報共有。コミュニケーションツールとして利用できます。",
      details: [
        "登録者限定のDiscordコミュニティ",
        "情報交換・相談",
        "イベント告知・募集",
        "学生同士のネットワーキング",
      ],
    },
    {
      icon: CheckCircle,
      title: "キャリア相談",
      description: "1on1カウンセリングで、進路・キャリア形成を個別にサポートします。",
      details: [
        "1on1カウンセリング",
        "進路・キャリア相談",
        "就職活動サポート",
        "継続的なメンタリング",
      ],
    },
    {
      icon: Users,
      title: "学生団体経験者限定",
      description: "学生団体での活動経験がある学生を優先的にマッチングします。",
      details: [
        "学生団体経験者限定の特典",
        "実践的な経験を活かしたマッチング",
        "企業からの高い評価",
        "特別な機会へのアクセス",
      ],
    },
    {
      icon: Target,
      title: "マッチング精度の高さ",
      description: "企業の求める人材像と学生の希望を詳細にマッチングします。",
      details: [
        "詳細なマッチングアルゴリズム",
        "専門スタッフによるサポート",
        "適切な人材との出会い",
        "高いマッチング精度",
      ],
    },
  ]

  const stats = [
    { number: "500+", label: "登録学生" },
    { number: "100+", label: "提携企業" },
    { number: "85%", label: "マッチング成功率" },
    { number: "1週間", label: "平均マッチング期間" },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Benefits"
        title="登録学生のメリット"
        description="UNIMATEに登録している学生個人が得られることをまとめています。"
        variant="minimal"
      />

      {/* 統計情報 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="union-card text-center">
                  <div className="text-3xl font-bold text-[#066ff2] mb-2">{stat.number}</div>
                  <div className="union-body text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container">
            <SectionHeading
              label="What you get"
              title="登録すると得られること"
              description="学生個人向けの特典をご紹介します。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="union-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-[#066ff2]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="union-heading-card mb-2">{benefit.title}</h3>
                      <p className="union-body text-sm mb-3">{benefit.description}</p>
                      <ul className="space-y-1.5">
                        {benefit.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-xs text-[var(--union-text-muted)]">
                            <CheckCircle className="h-3 w-3 text-[#066ff2] flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/for-students/unimate/join" className="union-btn-primary">
                登録する
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
