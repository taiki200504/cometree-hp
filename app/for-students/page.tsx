import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { Users, UsersRound, ArrowRight, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function ForStudentsPage() {
  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="For Students"
        title="学生向け"
        description="学生個人向けのUNIMATEと、学生団体向けのUNION。あなたに合ったサービスを選んでください。"
        variant="minimal"
      />

      {/* UNIMATE（個人）とUNION（団体）の紹介 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="Services"
              title="2つのサービス"
              description="学生個人向けのUNIMATEと、学生団体向けのUNIONをご用意しています。"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* UNIMATE（個人） */}
              <Link
                href="/for-students/unimate"
                className="union-card group hover:border-[#066ff2]/30 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#066ff2]/10 flex items-center justify-center mb-5">
                  <Users className="h-7 w-7 text-[#066ff2]" />
                </div>
                <h3 className="union-heading-card text-xl mb-3">UNIMATE（個人）</h3>
                <p className="union-body mb-4">
                  学生個人向けのマッチングサービス。インターン・就職機会、企業との直接面談、キャリアアドバイザーサポートを提供します。
                </p>
                <ul className="space-y-2 mb-6">
                  {["個人向け案件情報", "イベント情報", "Discordコミュニティ", "キャリア相談"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--union-text-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#066ff2] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="union-link inline-flex items-center gap-1 font-medium">
                  詳しく見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              {/* UNION（団体） */}
              <Link
                href="/for-students/union"
                className="union-card group hover:border-[#ec4faf]/30 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#ec4faf]/10 flex items-center justify-center mb-5">
                  <UsersRound className="h-7 w-7 text-[#ec4faf]" />
                </div>
                <h3 className="union-heading-card text-xl mb-3">UNION（団体）</h3>
                <p className="union-body mb-4">
                  学生団体向けのサービス。団体として加盟し、メディア発信・イベント告知・他団体との連携などの支援を受けられます。
                </p>
                <ul className="space-y-2 mb-6">
                  {["メディア発信支援", "イベント告知", "他団体との連携", "運営サポート"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[var(--union-text-muted)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ec4faf] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="union-link inline-flex items-center gap-1 font-medium">
                  詳しく見る
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQへの導線 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)]">
          <div className="union-container text-center">
            <Link
              href="/for-students/faq"
              className="union-card inline-block max-w-md hover:border-[var(--union-primary)]/30 hover:shadow-md transition-all"
            >
              <HelpCircle className="h-8 w-8 text-[var(--union-primary)] mx-auto mb-3" />
              <h3 className="union-heading-card mb-2">よくある質問</h3>
              <p className="union-body text-sm mb-4">
                学生向けサービスに関するよくある質問をまとめています。
              </p>
              <span className="union-link inline-flex items-center gap-1 font-medium">
                FAQを見る
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
