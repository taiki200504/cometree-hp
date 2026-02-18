import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Users, Calendar, Briefcase, Handshake, CheckCircle, ArrowRight, ExternalLink, Target, Zap } from "lucide-react"
import Link from "next/link"

export default function CorporateServicePage() {
  const services = [
    {
      icon: Users,
      title: "人材マッチング",
      brief: "学生団体で活動する意欲的な学生とのマッチング。",
      description: "学生団体で実際に活動している、実践経験豊富な学生のみが登録。企業の求める人材像と学生の希望を詳細にマッチングします。",
      features: [
        "学生団体経験者限定のマッチング",
        "インターン・採用支援",
        "関係構築サポート",
        "マッチング成功率85%",
      ],
      link: "https://union-match-lp.vercel.app/",
      external: true,
      stats: [
        { label: "登録学生", value: "500+" },
        { label: "提携企業", value: "100+" },
        { label: "マッチング成功率", value: "85%" },
      ],
    },
    {
      icon: Briefcase,
      title: "案件募集",
      brief: "インターン・業務委託などの案件を学生に案内。",
      description: "インターンシップや業務委託などの案件を学生に案内できます。学生団体で活動する意欲的な学生に直接リーチできます。",
      features: [
        "案件掲載",
        "学生への案内",
        "応募管理",
        "マッチングサポート",
      ],
      link: "/for-corporate/projects",
      external: false,
    },
    {
      icon: Calendar,
      title: "イベント連携",
      brief: "学生向けイベントの共同開催や協賛。",
      description: "学生向けイベントの共同開催や協賛を通じて、Z世代にリーチします。イベント出展協賛、登壇協賛、共同開催など、様々な形で連携可能です。",
      features: [
        "イベント出展協賛（¥30,000〜）",
        "登壇・プレゼン協賛（¥50,000〜）",
        "共同開催（応相談）",
        "企画サポート",
      ],
      link: "/for-corporate/events",
      external: false,
    },
    {
      icon: Handshake,
      title: "共創プロジェクト",
      brief: "学生団体とのコラボレーションプロジェクト。",
      description: "学生団体とのコラボレーションプロジェクトをコーディネートします。企業の課題解決と学生の学習機会を両立し、新たな価値を創造します。",
      features: [
        "企画・設計",
        "学生チームマッチング",
        "進行管理",
        "成果発表サポート",
      ],
      link: "/for-corporate/contact",
      external: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Services"
        title="法人向けサービス紹介"
        description="採用・広報・CSRなど、企業のニーズに応じたサービスをご用意しています。"
        primaryAction={{ text: "相談する", href: "/for-corporate/contact" }}
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="What we offer"
              title="提供サービス"
              description="企業の成長をサポートする4つのサービスです。"
            />
            <div className="grid grid-cols-1 gap-8 mb-10">
              {services.map((service) => (
                <div key={service.title} className="union-card">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-[#066ff2]/10 flex items-center justify-center mb-4 md:mb-0">
                        <service.icon className="h-8 w-8 text-[#066ff2]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="union-heading-card text-xl mb-2">{service.title}</h3>
                      <p className="union-body mb-4">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-[var(--union-text-muted)]">
                            <CheckCircle className="h-4 w-4 text-[#066ff2] flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {service.stats && (
                        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-[var(--union-section-bg)] rounded-lg">
                          {service.stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                              <div className="text-2xl font-bold text-[#066ff2] mb-1">{stat.value}</div>
                              <div className="text-xs text-[var(--union-text-muted)]">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {service.external ? (
                        <a
                          href={service.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="union-link inline-flex items-center gap-1 text-sm font-medium"
                        >
                          詳細を見る（外部サイト）
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : (
                        <Link href={service.link} className="union-link inline-flex items-center gap-1 text-sm font-medium">
                          詳細を見る
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/for-corporate/contact" className="union-btn-primary">
                相談する（お問い合わせ）
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* サービス選定のポイント */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container">
            <SectionHeading
              label="How to choose"
              title="サービス選定のポイント"
              description="企業の目的に応じて最適なサービスを選ぶことができます。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "採用・人材確保",
                  description: "優秀な学生人材を確保したい場合は「人材マッチング」や「案件募集」がおすすめです。",
                  services: ["人材マッチング", "案件募集"],
                },
                {
                  icon: Zap,
                  title: "ブランディング・広報",
                  description: "Z世代へのブランディングや認知度向上には「イベント連携」や「メディア協賛」が効果的です。",
                  services: ["イベント連携", "メディア協賛"],
                },
                {
                  icon: Handshake,
                  title: "CSR・社会貢献",
                  description: "社会貢献活動やCSRの一環として「共創プロジェクト」を実施できます。",
                  services: ["共創プロジェクト"],
                },
              ].map((point) => (
                <div key={point.title} className="union-card">
                  <div className="w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center mb-4">
                    <point.icon className="h-6 w-6 text-[#066ff2]" />
                  </div>
                  <h3 className="union-heading-card mb-2">{point.title}</h3>
                  <p className="union-body text-sm mb-4">{point.description}</p>
                  <div className="space-y-1">
                    {point.services.map((service) => (
                      <span key={service} className="inline-block px-2 py-1 rounded text-xs font-medium bg-[var(--union-section-bg)] text-[var(--union-text-muted)] mr-2">
                        {service}
                      </span>
                    ))}
                  </div>
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
