import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Building2, Users, Award, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const supporters = [
  {
    id: 1,
    name: "株式会社テックイノベーション",
    type: "プラチナスポンサー",
    logo: "/placeholder.svg?height=80&width=200&text=TechInnovation",
    description: "学生の技術力向上を支援し、次世代のエンジニア育成に貢献しています。",
    supportType: "financial",
    amount: "年間100万円",
    since: "2022年4月",
  },
  {
    id: 2,
    name: "一般社団法人学生支援機構",
    type: "ゴールドスポンサー",
    logo: "/placeholder.svg?height=80&width=200&text=StudentSupport",
    description: "全国の学生団体の活動を支援し、学生の社会参画を促進しています。",
    supportType: "financial",
    amount: "年間50万円",
    since: "2021年10月",
  },
  {
    id: 3,
    name: "株式会社メディアパートナーズ",
    type: "メディアパートナー",
    logo: "/placeholder.svg?height=80&width=200&text=MediaPartners",
    description: "学生の声を社会に届けるメディア支援を行っています。",
    supportType: "media",
    amount: "番組制作支援",
    since: "2023年1月",
  },
  {
    id: 4,
    name: "NPO法人ユースエンパワーメント",
    type: "協力団体",
    logo: "/placeholder.svg?height=80&width=200&text=YouthEmpowerment",
    description: "若者の社会参画と能力開発を支援する非営利団体です。",
    supportType: "collaboration",
    amount: "プログラム連携",
    since: "2022年8月",
  },
  {
    id: 5,
    name: "株式会社キャリアサポート",
    type: "シルバースポンサー",
    logo: "/placeholder.svg?height=80&width=200&text=CareerSupport",
    description: "学生のキャリア形成と就職活動を支援しています。",
    supportType: "financial",
    amount: "年間30万円",
    since: "2023年4月",
  },
  {
    id: 6,
    name: "個人支援者の皆様",
    type: "個人サポーター",
    logo: "/placeholder.svg?height=80&width=200&text=Individual",
    description: "多くの個人の方々からもご支援をいただいています。",
    supportType: "individual",
    amount: "月額1,000円〜",
    since: "2021年設立時より",
  },
]

const supportTypes = {
  financial: {
    icon: Building2,
    label: "資金支援",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  media: {
    icon: Award,
    label: "メディア支援",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
  collaboration: {
    icon: Users,
    label: "協力・連携",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  individual: {
    icon: Heart,
    label: "個人支援",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  },
}

export default function SupportersPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Supporters"
        title="ご支援者様"
        description="UNIONの活動を支えてくださる皆様をご紹介します"
        primaryAction={{
          text: "ご寄付について",
          href: "/join/donate",
        }}
        secondaryAction={{
          text: "お問い合わせ",
          href: "/contact",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 感謝のメッセージ */}
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-full mb-8 shadow-xl">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">心より感謝申し上げます</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              学生団体連合UNIONの活動は、多くの企業様、団体様、個人の皆様のご支援により成り立っています。
              皆様のご支援により、全国の学生の声を社会に届け、より良い社会の実現に向けて活動を続けることができています。
            </p>
          </AnimatedSection>

          {/* 支援統計 */}
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">支援の規模</h3>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <AnimatedSection animation="fadeInUp" delay={100}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">12</div>
                <div className="text-gray-600 dark:text-gray-300">企業・団体</div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={200}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">150+</div>
                <div className="text-gray-600 dark:text-gray-300">個人サポーター</div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={300}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">3年</div>
                <div className="text-gray-600 dark:text-gray-300">継続支援期間</div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fadeInUp" delay={400}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">1200+</div>
                <div className="text-gray-600 dark:text-gray-300">支援を受けた学生</div>
              </div>
            </AnimatedSection>
          </div>

          {/* 支援者一覧 */}
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">ご支援者様一覧</h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {supporters.map((supporter, index) => {
              const SupportIcon = supportTypes[supporter.supportType as keyof typeof supportTypes].icon
              const supportColor = supportTypes[supporter.supportType as keyof typeof supportTypes].color
              const supportLabel = supportTypes[supporter.supportType as keyof typeof supportTypes].label

              return (
                <AnimatedSection key={supporter.id} animation="fadeInUp" delay={index * 100}>
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{supporter.name}</h4>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge className={supportColor}>
                            <SupportIcon className="h-3 w-3 mr-1" />
                            {supportLabel}
                          </Badge>
                          <Badge variant="outline">{supporter.type}</Badge>
                        </div>
                      </div>
                      <Image
                        src={supporter.logo || "/placeholder.svg"}
                        alt={`${supporter.name}のロゴ`}
                        width={100}
                        height={40}
                        className="ml-4"
                      />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{supporter.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">支援内容:</span>
                        <div className="text-gray-600 dark:text-gray-300">{supporter.amount}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 dark:text-white">支援開始:</span>
                        <div className="text-gray-600 dark:text-gray-300">{supporter.since}</div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>

          {/* 支援のお願い */}
          <AnimatedSection animation="fadeInUp">
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-white text-center">
              <h3 className="text-3xl font-bold mb-6">UNIONの活動を支援しませんか？</h3>
              <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                学生の声を社会に届け、より良い未来を創造するために、皆様のご支援をお待ちしています。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/join/donate"
                  className="inline-flex items-center bg-white text-[#066ff2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  ご寄付について
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors duration-300 border border-white/30"
                >
                  お問い合わせ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
} 