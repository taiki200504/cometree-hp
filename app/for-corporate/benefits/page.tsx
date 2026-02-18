import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Users, Target, TrendingUp, CheckCircle, ArrowRight, Briefcase, Heart, Zap } from "lucide-react"
import Link from "next/link"

export default function CorporateBenefitsPage() {
  const benefits = [
    {
      icon: Users,
      title: "優秀な人材との出会い",
      description: "学生団体で活動する意欲的な学生と直接つながることができます。従来の就活サイトでは出会えない、実践経験豊富な学生とマッチングします。",
      details: [
        "学生団体経験者限定のマッチング",
        "実践的な経験とスキルを持つ人材",
        "即戦力として活躍できる学生",
        "マッチング成功率85%",
      ],
    },
    {
      icon: Target,
      title: "Z世代へのリーチ",
      description: "メディア・イベント協賛を通じて、Z世代への効果的なマーケティングを実現します。学生に響くブランディング戦略をサポートします。",
      details: [
        "ポッドキャスト・SNSでの広報",
        "学生向けイベントでのブランディング",
        "Z世代への効果的なリーチ",
        "企業認知度の向上",
      ],
    },
    {
      icon: TrendingUp,
      title: "CSR・社会貢献",
      description: "学生団体との共創プロジェクトを通じて、企業のCSR活動と学生の学習機会創出を両立します。",
      details: [
        "社会貢献活動の実現",
        "学生の学習機会創出",
        "企業のCSR活動として評価",
        "持続可能な関係構築",
      ],
    },
    {
      icon: Briefcase,
      title: "採用コストの削減",
      description: "従来の採用活動と比較して、効率的な人材確保が可能です。",
      details: [
        "効率的なマッチング",
        "適切な人材との出会い",
        "採用コストの削減",
        "採用期間の短縮",
      ],
    },
    {
      icon: Heart,
      title: "ブランドイメージの向上",
      description: "学生支援活動を通じて、企業のブランドイメージが向上します。",
      details: [
        "学生支援企業としての認知",
        "ブランドイメージの向上",
        "ESG経営の実現",
        "ステークホルダーからの評価",
      ],
    },
    {
      icon: Zap,
      title: "迅速な対応",
      description: "申し込みから面談まで、最短1週間で実現。スピーディーな対応が可能です。",
      details: [
        "迅速なマッチング",
        "柔軟なスケジュール調整",
        "専任担当によるサポート",
        "継続的なフォローアップ",
      ],
    },
  ]

  const useCases = [
    {
      title: "採用活動",
      description: "優秀な学生人材を確保したい",
      services: ["人材マッチング", "案件募集"],
    },
    {
      title: "ブランディング",
      description: "Z世代へのブランディングを強化したい",
      services: ["イベント連携", "メディア協賛"],
    },
    {
      title: "CSR活動",
      description: "社会貢献活動を実施したい",
      services: ["共創プロジェクト", "イベント協賛"],
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Benefits"
        title="法人のメリット"
        description="UNIONを利用することで、企業が得られる価値をご紹介します。採用・広報・CSRなど、様々なニーズに対応します。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="What you get"
              title="企業が得られること"
              description="UNIONを利用することで、企業が得られる6つのメリットです。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="union-card">
                  <div className="w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-[#066ff2]" />
                  </div>
                  <h3 className="union-heading-card mb-2">{benefit.title}</h3>
                  <p className="union-body text-sm mb-4">{benefit.description}</p>
                  <ul className="space-y-2">
                    {benefit.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-xs text-[var(--union-text-muted)]">
                        <CheckCircle className="h-3 w-3 text-[#066ff2] flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 用途別の活用例 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container">
            <SectionHeading
              label="Use Cases"
              title="用途別の活用例"
              description="企業の目的に応じた活用方法をご紹介します。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="union-card">
                  <h3 className="union-heading-card mb-2">{useCase.title}</h3>
                  <p className="union-body text-sm mb-4">{useCase.description}</p>
                  <div className="space-y-1">
                    {useCase.services.map((service) => (
                      <span key={service} className="inline-block px-2 py-1 rounded text-xs font-medium bg-[#066ff2]/10 text-[#066ff2] mr-2 mb-2">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/for-corporate/contact" className="union-btn-primary">
                相談する
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
