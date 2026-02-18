import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import Link from "next/link"

export default function StudentUnionIntroPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <ModernHero
        subtitle="Student Union"
        title="学生団体連合紹介"
        description="学生団体連合UNIONは、全国の学生団体をつなぎ、学生の声を社会に届ける組織です。"
      />
      <AnimatedSection className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose dark:prose-invert">
          <p>
            理念・事業内容の詳細は <Link href="/about">理念・組織概要</Link> をご覧ください。
            学生団体として加盟のメリットは <Link href="/for-organizations/benefits">登録団体のメリット</Link>、
            加盟の申し込みは <Link href="/join/organization">団体として加盟</Link> から行えます。
          </p>
          <p>
            <Link href="/lp/student-union" className="text-[#066ff2] hover:underline">学生団体連合LP（縦長ページ）</Link>
          </p>
        </div>
      </AnimatedSection>
      <Footer />
    </div>
  )
}
