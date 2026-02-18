import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Briefcase, FileText, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CorporateProjectsPage() {
  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Projects"
        title="案件募集"
        description="インターン・業務委託などの案件を学生に案内できます。"
        primaryAction={{ text: "案件掲載申請", href: "/for-corporate/projects/submit" }}
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Recruitment"
              title="案件募集について"
              description="学生向けの案件情報を掲載し、マッチングをサポートします。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Link
                href="/for-corporate/projects/templates"
                className="union-card group hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <FileText className="h-8 w-8 text-[#066ff2] mb-4" />
                <h3 className="union-heading-card mb-2">募集テンプレート集</h3>
                <p className="union-body text-sm mb-4">効果的な案件募集文のテンプレートをご用意しています。</p>
                <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                  見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/for-corporate/projects/submit"
                className="union-card group hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <Briefcase className="h-8 w-8 text-[#066ff2] mb-4" />
                <h3 className="union-heading-card mb-2">案件掲載申請</h3>
                <p className="union-body text-sm mb-4">案件情報を掲載するための申請フォームです。</p>
                <span className="union-link text-sm font-medium inline-flex items-center gap-1">
                  申請する
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/for-corporate/projects/guide"
                className="union-card group hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
              >
                <BookOpen className="h-8 w-8 text-[#066ff2] mb-4" />
                <h3 className="union-heading-card mb-2">募集の作り方ガイド</h3>
                <p className="union-body text-sm mb-4">効果的な案件募集文の書き方とNG例をご紹介します。</p>
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
