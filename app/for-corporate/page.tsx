import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Briefcase, Users, Handshake, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ForCorporatePage() {
  const services = [
    {
      icon: Users,
      title: "人材マッチング",
      description: "学生団体で活動する意欲的な学生とのマッチング。インターン・採用支援を提供します。",
      href: "/for-corporate/service",
    },
    {
      icon: Calendar,
      title: "イベント連携",
      description: "学生向けイベントの共同開催や協賛を通じて、Z世代にリーチします。",
      href: "/for-corporate/events",
    },
    {
      icon: Briefcase,
      title: "案件募集",
      description: "インターン・業務委託などの案件を学生に案内できます。",
      href: "/for-corporate/projects",
    },
    {
      icon: Handshake,
      title: "共創プロジェクト",
      description: "学生団体とのコラボレーションプロジェクトをコーディネートします。",
      href: "/for-corporate/service",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="For Corporations"
        title="法人向け"
        description="ポテンシャル人材となる学生・学生団体に、すぐつながる。採用・広報・CSRなど、企業のニーズに応じたプランをご用意しています。"
        primaryAction={{ text: "相談する", href: "/for-corporate/contact" }}
        secondaryAction={{ text: "サービス紹介", href: "/for-corporate/service" }}
        variant="minimal"
      />

      {/* サービス一覧 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Services"
              title="法人向けサービス"
              description="企業のニーズに応じたサービスをご用意しています。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="union-card group hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-[#066ff2]" />
                  </div>
                  <h3 className="union-heading-card mb-2">{service.title}</h3>
                  <p className="union-body text-sm mb-4">{service.description}</p>
                  <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                    詳しく見る
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* メリット・プラン・導入フローへの導線 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/for-corporate/benefits"
                className="union-card text-center hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <h3 className="union-heading-card mb-2">法人のメリット</h3>
                <p className="union-body text-sm mb-4">企業が得られる価値をご紹介します。</p>
                <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                  見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/for-corporate/plan"
                className="union-card text-center hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <h3 className="union-heading-card mb-2">プラン</h3>
                <p className="union-body text-sm mb-4">料金プランとサービス内容をご確認ください。</p>
                <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                  見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/for-corporate/flow"
                className="union-card text-center hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <h3 className="union-heading-card mb-2">導入フロー</h3>
                <p className="union-body text-sm mb-4">サービス導入までの流れをご案内します。</p>
                <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                  見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection>
        <section className="union-section bg-[#066ff2]">
          <div className="union-container text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              まずはお気軽にご相談ください
            </h2>
            <p className="text-white/90 text-sm mb-6 max-w-xl mx-auto">
              企業のニーズに合わせたプランをご提案します。お問い合わせ・相談予約は無料です。
            </p>
            <Link
              href="/for-corporate/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-[#066ff2] bg-white hover:bg-gray-50 transition-colors"
            >
              相談する（お問い合わせ）
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
