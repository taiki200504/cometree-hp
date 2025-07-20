import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Target,
  Megaphone,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Heart,
  Globe,
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
        <PageHeader
          title="企業として提携・協賛"
          description="学生の成長と社会貢献を支援する提携企業として、包括的なパートナーシップを築きませんか？"
          breadcrumbs={[
            { label: "ホーム", href: "/" },
            { label: "参加する", href: "/join" },
            { label: "企業として提携", href: "/join/corporate" },
          ]}
        />

        <div className="container mx-auto px-4 py-12">
          {/* 概要セクション */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-full mb-6">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">次世代を担う学生と共に未来を創る</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              学生団体連合UNIONとの提携を通じて、全国1200名の学生とつながり、
              社会課題の解決と次世代人材の育成に貢献しませんか？
            </p>
          </div>

          {/* 提携企業のメリット */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">提携企業のメリット</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipBenefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                    <benefit.icon className={`h-8 w-8 ${benefit.color} mx-auto mb-4`} />
                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 連携内容 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">連携内容</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collaborationTypes.map((type, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
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
          </div>

          {/* 提携企業一覧 */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">提携企業一覧</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerCompanies.map((company, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-gray-400" />
                    </div>
                    <h4 className="font-semibold mb-2">{company.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{company.industry}</p>
                    <p className="text-xs text-muted-foreground">{company.collaboration}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA セクション */}
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
