import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Briefcase, Users, CheckCircle, Target, Zap, Heart, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function UnimatePage() {
  const features = [
    {
      icon: Target,
      title: "厳選された学生人材",
      description: "学生団体で実際に活動している、実践経験豊富な学生のみが登録。企業が求める人材とマッチングします。",
    },
    {
      icon: Briefcase,
      title: "個人向け案件情報",
      description: "インターン・業務委託など、学生に適した案件情報を案内します。企業との直接面談機会も提供します。",
    },
    {
      icon: Users,
      title: "企業とのマッチング",
      description: "学生団体で活動する意欲的な学生と、企業をマッチング。インターンシップ・就職支援を提供します。",
    },
    {
      icon: CheckCircle,
      title: "キャリアアドバイザー",
      description: "経験豊富なアドバイザーが、進路・キャリア形成を個別にサポートします。1on1カウンセリングで不安を解消します。",
    },
    {
      icon: Zap,
      title: "迅速な対応",
      description: "申し込みから面談まで、最短1週間で実現。スピーディーなマッチングで機会を逃しません。",
    },
    {
      icon: Heart,
      title: "学生団体経験者限定",
      description: "学生団体での活動経験がある学生のみが登録。実践的な経験とスキルを持つ人材と出会えます。",
    },
  ]

  const benefits = [
    {
      title: "企業との直接マッチング機会",
      description: "学生団体経験者限定のマッチングで、企業との直接面談機会を提供します。",
    },
    {
      title: "インターンシップ・就職支援",
      description: "企業のインターンシップや採用情報を優先的に案内。就職活動をサポートします。",
    },
    {
      title: "キャリアアドバイザーによるサポート",
      description: "経験豊富なアドバイザーが、進路選択やキャリア形成を個別にサポートします。",
    },
    {
      title: "学生団体経験者限定の特典",
      description: "学生団体での活動経験を活かした、特別なマッチング機会を提供します。",
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
        subtitle="UNIMATE"
        title="ユニメイト（個人）"
        description="学生個人向けのマッチングサービス。学生団体で活動する優秀な学生と企業をつなぎ、新しいキャリアの可能性を創造します。"
        primaryAction={{ text: "登録する", href: "/for-students/unimate/join" }}
        secondaryAction={{ text: "登録のメリット", href: "/for-students/unimate/benefits" }}
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

      {/* 特徴 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container">
            <SectionHeading
              label="Features"
              title="UNIMATEの特徴"
              description="学生個人が得られる価値をご紹介します。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="union-card">
                  <div className="w-12 h-12 rounded-xl bg-[#066ff2]/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-[#066ff2]" />
                  </div>
                  <h3 className="union-heading-card mb-2">{feature.title}</h3>
                  <p className="union-body text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 学生向けメリット */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Benefits"
              title="学生向けサービス"
              description="学生団体で活動する学生のキャリア形成をサポートします。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="union-card">
                  <h3 className="union-heading-card mb-2">{benefit.title}</h3>
                  <p className="union-body text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/for-students/unimate/benefits" className="union-link inline-flex items-center gap-1 font-medium">
                詳しく見る：登録のメリット
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* マッチングフロー */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container">
            <SectionHeading
              label="Process"
              title="マッチングの流れ"
              description="登録からマッチングまでの4ステップです。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "登録・プロフィール作成",
                  description: "学生団体での活動経験や希望条件を詳細に登録",
                },
                {
                  step: "2",
                  title: "マッチング・提案",
                  description: "AIと専門スタッフが最適なマッチングを提案",
                },
                {
                  step: "3",
                  title: "面談・調整",
                  description: "企業との面談日程調整と事前準備をサポート",
                },
                {
                  step: "4",
                  title: "フォローアップ",
                  description: "マッチング後の継続的なサポートと関係構築",
                },
              ].map((item) => (
                <div key={item.step} className="union-card text-center">
                  <div className="w-12 h-12 rounded-full bg-[#066ff2] text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="union-heading-card mb-2">{item.title}</h3>
                  <p className="union-body text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection>
        <section className="union-section bg-[#066ff2]">
          <div className="union-container text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              UNIMATEに登録して、キャリアの選択肢を広げませんか？
            </h2>
            <p className="text-white/90 text-sm mb-6 max-w-xl mx-auto">
              学生団体で活動する意欲的な学生と、企業をつなぐマッチングサービスです。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/for-students/unimate/join"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-[#066ff2] bg-white hover:bg-gray-50 transition-colors"
              >
                登録する
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="https://union-match-lp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white border-2 border-white/70 hover:bg-white/10 transition-colors"
              >
                UNION Match LPを見る
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
