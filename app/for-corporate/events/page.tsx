import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Calendar, FileText, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CorporateEventsPage() {
  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Events"
        title="イベント連携"
        description="学生向けイベントの共同開催や協賛を通じて、Z世代にリーチします。"
        primaryAction={{ text: "イベント申請", href: "/for-corporate/events/submit" }}
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Collaboration"
              title="イベント連携について"
              description="学生向けイベントの共同開催・協賛メニューをご用意しています。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Link
                href="/for-corporate/events/menu"
                className="union-card group hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <Calendar className="h-8 w-8 text-[#066ff2] mb-4" />
                <h3 className="union-heading-card mb-2">共同開催メニュー</h3>
                <p className="union-body text-sm mb-4">イベント共同開催のメニューと料金をご紹介します。</p>
                <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                  見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/for-corporate/events/submit"
                className="union-card group hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <FileText className="h-8 w-8 text-[#066ff2] mb-4" />
                <h3 className="union-heading-card mb-2">イベント申請</h3>
                <p className="union-body text-sm mb-4">イベント共同開催・協賛の申請フォームです。</p>
                <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                  申請する
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/for-corporate/events/guide"
                className="union-card group hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <BookOpen className="h-8 w-8 text-[#066ff2] mb-4" />
                <h3 className="union-heading-card mb-2">企画の作り方ガイド</h3>
                <p className="union-body text-sm mb-4">効果的なイベント企画の作り方をご紹介します。</p>
                <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                  見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
