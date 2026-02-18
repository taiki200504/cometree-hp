import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { ContactForm } from "@/components/contact-form"
import { Mail, Phone, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CorporateContactPage() {
  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Contact"
        title="相談・お問い合わせ"
        description="企業のニーズに合わせたプランをご提案します。お問い合わせ・相談予約は無料です。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-3xl">
            <SectionHeading
              label="Get in touch"
              title="お問い合わせ方法"
              description="以下の方法からお問い合わせ・相談予約が可能です。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="union-card text-center">
                <Mail className="h-8 w-8 text-[#066ff2] mx-auto mb-4" />
                <h3 className="union-heading-card mb-2">メール</h3>
                <p className="union-body text-sm mb-4">フォームからお問い合わせください。</p>
                <a href="mailto:gakusei.union226@gmail.com" className="union-link text-sm font-medium">
                  gakusei.union226@gmail.com
                </a>
              </div>
              <div className="union-card text-center">
                <Calendar className="h-8 w-8 text-[#066ff2] mx-auto mb-4" />
                <h3 className="union-heading-card mb-2">相談予約</h3>
                <p className="union-body text-sm mb-4">オンライン面談の予約が可能です。</p>
                <Link href="#form" className="union-link text-sm font-medium inline-flex items-center gap-1">
                  予約する
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="union-card text-center">
                <Phone className="h-8 w-8 text-[#066ff2] mx-auto mb-4" />
                <h3 className="union-heading-card mb-2">電話</h3>
                <p className="union-body text-sm mb-4">お急ぎの場合は電話でも対応可能です。</p>
                <p className="union-body text-sm">フォームからご希望をお知らせください。</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* お問い合わせフォーム */}
      <AnimatedSection>
        <section id="form" className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container max-w-2xl">
            <SectionHeading
              label="Form"
              title="お問い合わせフォーム"
              description="以下のフォームからお問い合わせ・相談予約が可能です。"
            />
            <ContactForm />
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
