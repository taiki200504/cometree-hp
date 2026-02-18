import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Target,
  Megaphone,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Handshake,
  Star,
} from "lucide-react"

const partnershipBenefits = [
  {
    icon: Handshake,
    title: "優先的な対応",
    description: "何か頼みたい時の優先的な対応をいたします",
    color: "text-blue-600",
  },
  {
    icon: Users,
    title: "クライアント関係構築",
    description: "学生との直接的な関係構築をサポート",
    color: "text-green-600",
  },
  {
    icon: Award,
    title: "学生支援の証明",
    description: "学生支援の枠組みに加わっていることの証明",
    color: "text-purple-600",
  },
  {
    icon: Star,
    title: "スムーズな提携",
    description: "学生団体との提携がスムーズに進む環境",
    color: "text-orange-600",
  },
]

const collaborationTypes = [
  {
    icon: Megaphone,
    title: "メディア・広報連携",
    description: "ポッドキャスト番組への出演、学生向けコンテンツ制作での協力",
  },
  {
    icon: Users,
    title: "人材採用支援",
    description: "インターン募集、新卒採用での学生コミュニティへのアプローチ",
  },
  {
    icon: Target,
    title: "商品・サービス開発",
    description: "学生向け商品・サービスの共同開発、マーケティング調査",
  },
  {
    icon: Award,
    title: "CSR・社会貢献",
    description: "学生の社会参画支援、教育プログラムでの連携",
  },
]

const partnerCompanies = [
  {
    name: "株式会社テックイノベーション",
    industry: "IT・テクノロジー",
    collaboration: "エンジニア育成プログラム",
    logo: "/images/partners/tech-innovation.png",
  },
  {
    name: "一般社団法人学生支援機構",
    industry: "教育・非営利",
    collaboration: "学生団体運営支援",
    logo: "/images/partners/student-support.png",
  },
  {
    name: "株式会社メディアパートナーズ",
    industry: "メディア・広告",
    collaboration: "番組制作・配信支援",
    logo: "/images/partners/media-partners.png",
  },
  {
    name: "株式会社キャリアサポート",
    industry: "人材・キャリア",
    collaboration: "就職活動支援",
    logo: "/images/partners/career-support.png",
  },
]

export default function CorporateJoinPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <ModernHero
          title="主体的な学生をプレイヤーとして抜擢しませんか"
          subtitle="企業提携・協賛・案件登録"
          description="ポテンシャル人材となる学生・学生団体にすぐつながる。案件情報の登録・Discordアクセス・イベント委託をご用意しています。"
          primaryAction={{
            text: "お問い合わせ・案件登録",
            href: "/contact",
          }}
          secondaryAction={{
            text: "提携企業一覧",
            href: "/community/partners",
          }}
          variant="gradient"
        />

        <div className="container mx-auto px-4 py-20">
          {/* 有料会員の特典 */}
          <AnimatedSection className="mb-16">
            <div className="rounded-2xl border border-[#066ff2]/30 bg-[#066ff2]/5 dark:bg-[#066ff2]/10 p-8">
              <h2 className="text-2xl font-bold mb-4">有料会員となった企業が得られること</h2>
              <ul className="space-y-2 text-muted-foreground mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  案件情報を学生に流せる
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  Discordで学生と交流できる
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">案件登録・Discordアクセス・イベント委託はお問い合わせからご相談ください。</p>
            </div>
          </AnimatedSection>

          {/* 提携企業のメリット */}
          <AnimatedSection className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">提携企業のメリット</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                学生団体連合UNIONとの提携により、企業様に提供する価値
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipBenefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <benefit.icon className={`h-8 w-8 ${benefit.color} mx-auto mb-4`} />
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>

          {/* 連携内容 */}
          <AnimatedSection className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">連携内容</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                多様な連携方法で、学生と企業の架け橋となります
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collaborationTypes.map((type, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <type.icon className="h-8 w-8 text-[#066ff2]" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{type.title}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>

          {/* 提携企業一覧 */}
          <AnimatedSection className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">提携企業一覧</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                既に多くの企業様にご支援いただいています
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerCompanies.map((company, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">{company.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{company.industry}</p>
                    <p className="text-xs text-muted-foreground">{company.collaboration}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA セクション */}
          <AnimatedSection>
            <div className="text-center bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">一緒に学生の未来を支援しませんか？</h3>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                提携企業として、学生の成長と社会への貢献を支援する仲間を募集しています。
                包括的なパートナーシップを通じて、次世代のリーダーを育成しましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-[#066ff2] hover:bg-gray-100"
                  asChild
                >
                  <a href="/contact">
                    お問い合わせ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#066ff2]"
                  asChild
                >
                  <a href="/community/partners">
                    提携企業一覧を見る
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
}
