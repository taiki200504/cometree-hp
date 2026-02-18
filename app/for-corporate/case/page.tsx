import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Building2, Users, Target, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CorporateCasePage() {
  const cases = [
    {
      title: "インターンシップ採用",
      company: "IT企業（仮）",
      industry: "IT・テクノロジー",
      description: "学生団体で活動する意欲的な学生をインターンとして採用。3ヶ月のインターンシップ後、内定を獲得。実践的な経験を持つ学生が即戦力として活躍しています。",
      results: [
        "採用成功率80%",
        "満足度95%",
        "即戦力として活躍",
      ],
      icon: Users,
    },
    {
      title: "イベント協賛",
      company: "メディア企業（仮）",
      industry: "メディア・広告",
      description: "学生向けイベントに協賛し、Z世代へのブランディングを実現。SNSでのリーチ数は10万を超え、企業認知度が向上しました。",
      results: [
        "リーチ数10万+",
        "参加者満足度90%",
        "企業認知度向上",
      ],
      icon: TrendingUp,
    },
    {
      title: "共創プロジェクト",
      company: "製造業（仮）",
      industry: "製造・ものづくり",
      description: "学生団体とのコラボレーションプロジェクトを実施。企業の課題解決と学生の学習機会を両立し、新たな価値を創造しました。",
      results: [
        "プロジェクト成功率100%",
        "学生満足度95%",
        "新たな価値創造",
      ],
      icon: Target,
    },
    {
      title: "メディア協賛",
      company: "広告代理店（仮）",
      industry: "広告・マーケティング",
      description: "ポッドキャスト番組への協賛を通じて、Z世代への効果的なマーケティングを実現。リスナーからの反響も大きく、ブランドイメージが向上しました。",
      results: [
        "リスナー数5万+",
        "ブランドイメージ向上",
        "効果的なリーチ",
      ],
      icon: Building2,
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Case Studies"
        title="導入事例"
        description="UNIONを利用している企業の導入事例をご紹介します。採用・広報・CSRなど、様々なニーズに対応した実績があります。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Success Stories"
              title="導入事例"
              description="企業様の成功事例をご紹介します。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {cases.map((caseItem) => (
                <div key={caseItem.title} className="union-card">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center shrink-0">
                      <caseItem.icon className="h-6 w-6 text-[#066ff2]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="union-heading-card mb-1">{caseItem.title}</h3>
                      <p className="union-body text-xs mb-1 text-[var(--union-text-muted)]">{caseItem.company}</p>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-[var(--union-section-bg)] text-[var(--union-text-muted)]">
                        {caseItem.industry}
                      </span>
                    </div>
                  </div>
                  <p className="union-body text-sm mb-4">{caseItem.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--union-text-muted)] mb-2">成果：</p>
                    {caseItem.results.map((result) => (
                      <div key={result} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                        <span className="text-[var(--union-text)]">{result}</span>
                      </div>
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

      {/* 導入企業の声 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container">
            <SectionHeading
              label="Testimonials"
              title="導入企業の声"
              description="実際にUNIONをご利用いただいている企業様からの声です。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  quote: "学生団体で活動する学生は、実践的な経験とスキルを持っており、即戦力として活躍してくれています。",
                  author: "IT企業 人事担当者",
                },
                {
                  quote: "Z世代へのリーチが効果的で、ブランディングにも大きく貢献しています。",
                  author: "メディア企業 マーケティング担当者",
                },
              ].map((testimonial, index) => (
                <div key={index} className="union-card">
                  <p className="union-body mb-4 italic">"{testimonial.quote}"</p>
                  <p className="text-sm font-semibold text-[var(--union-text-muted)]">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
