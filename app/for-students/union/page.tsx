import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { UsersRound, Mic, Calendar, Handshake, FileText, Users, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function UnionForStudentsPage() {
  const features = [
    {
      icon: Mic,
      title: "メディア発信支援",
      description: "ポッドキャスト出演やメディア掲載を通じて、団体の活動を多くの人に届けます。ユニラジなどの番組に出演できます。",
    },
    {
      icon: Calendar,
      title: "イベント告知",
      description: "UNIONのメディアやコミュニティを通じて、イベント情報を広く告知できます。SNSでの拡散支援も行います。",
    },
    {
      icon: Handshake,
      title: "他団体との連携",
      description: "全国の学生団体とつながり、共同イベントやプロジェクトを実現できます。Slackコミュニティで交流できます。",
    },
    {
      icon: UsersRound,
      title: "運営サポート",
      description: "団体運営に関する相談や、1on1カウンセリングを提供します。組織運営のノウハウを共有します。",
    },
    {
      icon: FileText,
      title: "記事掲載・取材",
      description: "学生団体ニュースでの記事掲載・取材。活動記事の執筆・掲載、インタビュー記事作成をサポートします。",
    },
    {
      icon: Users,
      title: "イベント共催・後援",
      description: "学生団体主催イベントの共催・後援サポート。イベント企画サポート、広報・宣伝支援を提供します。",
    },
  ]

  const services = [
    {
      title: "ポッドキャスト出演",
      description: "学生団体の活動や代表者をポッドキャストで紹介",
      features: ["活動内容の詳細紹介", "代表者インタビュー", "全国への情報発信", "録音・編集サポート"],
      price: "無料",
    },
    {
      title: "イベント共催・後援",
      description: "学生団体主催イベントの共催・後援サポート",
      features: ["イベント企画サポート", "広報・宣伝支援", "参加者募集支援", "運営ノウハウ提供"],
      price: "要相談",
    },
    {
      title: "記事掲載・取材",
      description: "学生団体ニュースでの記事掲載・取材",
      features: ["活動記事の執筆・掲載", "インタビュー記事作成", "写真撮影サポート", "SNSでの拡散支援"],
      price: "無料",
    },
    {
      title: "企業連携サポート",
      description: "学生団体と企業のマッチング・連携支援",
      features: ["企業とのマッチング", "提案書作成支援", "交渉サポート", "契約書類の確認"],
      price: "成果報酬制",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="UNION"
        title="UNION（団体）"
        description="学生団体向けのサービス。団体として加盟し、メディア発信・イベント告知・他団体との連携などの支援を受けられます。"
        primaryAction={{ text: "団体登録", href: "/for-students/union/join" }}
        secondaryAction={{ text: "登録のメリット", href: "/for-students/union/benefits" }}
        variant="minimal"
      />

      {/* 特徴 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Features"
              title="UNIONの特徴"
              description="学生団体が得られる価値をご紹介します。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="union-card">
                  <div className="w-12 h-12 rounded-xl bg-[#ec4faf]/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-[#ec4faf]" />
                  </div>
                  <h3 className="union-heading-card mb-2">{feature.title}</h3>
                  <p className="union-body text-sm">{feature.description}</p>
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
              description="学生団体の活動をサポートする多様なサービスをご用意しています。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {services.map((service) => (
                <div key={service.title} className="union-card">
                  <h3 className="union-heading-card mb-2">{service.title}</h3>
                  <p className="union-body text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[var(--union-text-muted)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ec4faf] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm font-semibold text-[#ec4faf]">料金：{service.price}</div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/for-students/union/benefits" className="union-link inline-flex items-center gap-1 font-medium">
                詳しく見る：登録のメリット
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* 加盟の流れ */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Process"
              title="加盟の流れ"
              description="学生団体としてUNIONに加盟する4ステップです。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "加盟申請",
                  description: "加盟申請フォームから団体情報を登録",
                },
                {
                  step: "2",
                  title: "審査",
                  description: "登録情報を確認し、審査を実施",
                },
                {
                  step: "3",
                  title: "承認",
                  description: "承認後、UNIONのサービスを利用可能に",
                },
                {
                  step: "4",
                  title: "活動開始",
                  description: "メディア発信・イベント告知などのサービスを利用",
                },
              ].map((item) => (
                <div key={item.step} className="union-card text-center">
                  <div className="w-12 h-12 rounded-full bg-[#ec4faf] text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
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
        <section className="union-section bg-gradient-to-br from-[#066ff2] to-[#ec4faf]">
          <div className="union-container text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              学生団体としてUNIONに加盟しませんか？
            </h2>
            <p className="text-white/90 text-sm mb-6 max-w-xl mx-auto">
              全国の学生団体とつながり、メディア発信・イベント告知・連携の機会を広げましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/for-students/union/join"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-[#066ff2] bg-white hover:bg-gray-50 transition-colors"
              >
                団体登録
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/for-students/union/benefits"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white border-2 border-white/70 hover:bg-white/10 transition-colors"
              >
                登録のメリットを見る
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
