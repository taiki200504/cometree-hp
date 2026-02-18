import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { ContactForm } from "@/components/contact-form"
import FAQ from "@/components/faq"
import { Mail, MapPin, Clock, Users, Building, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const faqItems = [
    {
      question: "お問い合わせの返信にはどのくらい時間がかかりますか？",
      answer: "通常、営業日2-3日以内にご返信いたします。お急ぎの場合は、メールにその旨をご記載ください。",
    },
    {
      question: "学生団体の加盟に条件はありますか？",
      answer:
        "2名以上の学生で構成された団体であれば、活動内容や規模は問いません。営利目的でない学生主体の活動であることが条件です。",
    },
    {
      question: "企業として学生団体と連携したいのですが、どのような形がありますか？",
      answer:
        "イベント協賛、インターンシップ提供、共創プロジェクト、メディア協賛など、様々な形での連携が可能です。詳しくはお問い合わせください。",
    },
    {
      question: "メディア出演の条件はありますか？",
      answer: "学生であれば個人・団体問わず出演可能です。活動内容や思いを共有していただける方を歓迎しています。",
    },
    {
      question: "UNIONの活動に参加するのに費用はかかりますか？",
      answer: "UNIONへの参加・加盟は完全無料です。学生の活動支援が目的のため、費用は一切かかりません。",
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Contact Us"
        title="お問い合わせ"
        description="UNIONに関するご質問・ご相談はお気軽にどうぞ"
        variant="minimal"
      />

      {/* お問い合わせ方法 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="How to contact"
              title="お問い合わせ方法"
              description="目的に応じて適切なお問い合わせ方法をお選びください"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* 学生向けお問い合わせ */}
              <div className="union-card border-2 border-[#066ff2]/20">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-[#066ff2]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-[#066ff2]" />
                  </div>
                  <h3 className="union-heading-card">学生・学生団体の方</h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="border-l-4 border-[#066ff2] pl-4">
                    <h4 className="font-semibold text-[var(--union-text)] mb-2">加盟・参加に関するお問い合わせ</h4>
                    <p className="union-body text-sm mb-3">
                      学生団体としてUNIONに加盟したい、個人として参加したいなど、参加に関するご質問はこちらから。
                    </p>
                    <Link href="/for-students" className="union-link text-sm font-medium inline-flex items-center gap-1">
                      学生向けページへ
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* 企業向けお問い合わせ */}
              <div className="union-card border-2 border-[#ec4faf]/20">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-[#ec4faf]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Building className="h-6 w-6 text-[#ec4faf]" />
                  </div>
                  <h3 className="union-heading-card">法人の方</h3>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="border-l-4 border-[#ec4faf] pl-4">
                    <h4 className="font-semibold text-[var(--union-text)] mb-2">提携・協賛に関するお問い合わせ</h4>
                    <p className="union-body text-sm mb-3">
                      人材紹介、イベント協賛、メディア協賛など、法人向けサービスに関するご相談はこちらから。
                    </p>
                    <Link href="/for-corporate/contact" className="union-link text-sm font-medium inline-flex items-center gap-1">
                      法人向けお問い合わせへ
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* サイト内フォーム */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Form"
              title="お問い合わせフォーム"
              description="以下のフォームからもお問い合わせいただけます"
            />
            <ContactForm />
          </div>
        </section>
      </AnimatedSection>

      {/* 連絡先情報 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Contact Information"
              title="連絡先情報"
              description="メールアドレスやお問い合わせ先をご案内します"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="union-card text-center">
                <Mail className="h-8 w-8 text-[#066ff2] mx-auto mb-4" />
                <h3 className="union-heading-card mb-2">メール</h3>
                <a href="mailto:gakusei.union226@gmail.com" className="union-link">
                  gakusei.union226@gmail.com
                </a>
              </div>
              <div className="union-card text-center">
                <Clock className="h-8 w-8 text-[#066ff2] mx-auto mb-4" />
                <h3 className="union-heading-card mb-2">対応時間</h3>
                <p className="union-body text-sm">平日 10:00 - 18:00</p>
              </div>
              <div className="union-card text-center">
                <MapPin className="h-8 w-8 text-[#066ff2] mx-auto mb-4" />
                <h3 className="union-heading-card mb-2">所在地</h3>
                <p className="union-body text-sm">東京都内</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="FAQ"
              title="よくある質問"
              description="お問い合わせ前にご確認ください"
            />
            <FAQ items={faqItems} />
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
