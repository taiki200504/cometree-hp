import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Mic, Calendar, Handshake, UsersRound, FileText, Users, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function UnionBenefitsPage() {
  const benefits = [
    {
      icon: Mic,
      title: "メディア発信支援",
      description: "ポッドキャスト出演やメディア掲載を通じて、団体の活動を多くの人に届けます。",
      details: [
        "ユニラジなどのポッドキャスト出演",
        "学生団体ニュースでの記事掲載",
        "SNSでの拡散支援",
        "録音・編集サポート",
      ],
    },
    {
      icon: Calendar,
      title: "イベント告知",
      description: "UNIONのメディアやコミュニティを通じて、イベント情報を広く告知できます。",
      details: [
        "イベント情報の告知",
        "SNSでの拡散",
        "参加者募集支援",
        "広報・宣伝支援",
      ],
    },
    {
      icon: Handshake,
      title: "他団体との連携",
      description: "全国の学生団体とつながり、共同イベントやプロジェクトを実現できます。",
      details: [
        "Slackコミュニティでの交流",
        "共同イベントの企画・運営",
        "プロジェクトのコラボレーション",
        "全国の学生団体とのネットワーキング",
      ],
    },
    {
      icon: UsersRound,
      title: "運営サポート",
      description: "団体運営に関する相談や、1on1カウンセリングを提供します。",
      details: [
        "1on1カウンセリング",
        "組織運営の相談",
        "事業計画策定支援",
        "継続的なメンタリング",
      ],
    },
    {
      icon: FileText,
      title: "記事掲載・取材",
      description: "学生団体ニュースでの記事掲載・取材。活動記事の執筆・掲載をサポートします。",
      details: [
        "活動記事の執筆・掲載",
        "インタビュー記事作成",
        "写真撮影サポート",
        "SNSでの拡散支援",
      ],
    },
    {
      icon: Users,
      title: "イベント共催・後援",
      description: "学生団体主催イベントの共催・後援サポート。イベント企画サポートを提供します。",
      details: [
        "イベント企画サポート",
        "広報・宣伝支援",
        "参加者募集支援",
        "運営ノウハウ提供",
      ],
    },
  ]

  const services = [
    {
      title: "ポッドキャスト出演",
      price: "無料",
      description: "学生団体の活動や代表者をポッドキャストで紹介",
    },
    {
      title: "イベント共催・後援",
      price: "要相談",
      description: "学生団体主催イベントの共催・後援サポート",
    },
    {
      title: "記事掲載・取材",
      price: "無料",
      description: "学生団体ニュースでの記事掲載・取材",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Benefits"
        title="登録団体のメリット"
        description="UNIONに登録している学生団体が得られることをまとめています。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="What you get"
              title="登録すると得られること"
              description="学生団体向けの特典をご紹介します。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="union-card">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#ec4faf]/10 flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-[#ec4faf]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="union-heading-card mb-2">{benefit.title}</h3>
                      <p className="union-body text-sm mb-3">{benefit.description}</p>
                      <ul className="space-y-1.5">
                        {benefit.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2 text-xs text-[var(--union-text-muted)]">
                            <CheckCircle className="h-3 w-3 text-[#ec4faf] flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 提供サービス */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container">
            <SectionHeading
              label="Services"
              title="提供サービス"
              description="学生団体の活動をサポートするサービスです。多くのサービスが無料で利用できます。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {services.map((service) => (
                <div key={service.title} className="union-card text-center">
                  <h3 className="union-heading-card mb-2">{service.title}</h3>
                  <div className="text-xl font-semibold text-[#ec4faf] mb-2">{service.price}</div>
                  <p className="union-body text-sm">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/for-students/union/join" className="union-btn-primary">
                団体登録
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
