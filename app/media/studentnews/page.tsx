import type { Metadata } from "next"
import Link from "next/link"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Mic, Play, ArrowRight, CheckCircle, Users, Calendar, Mail, ExternalLink, AlertTriangle, Info } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "UNION Weekly News | UNION 学生団体連合",
  description: "学生の「今」を、学生の「声」で届けるUNION Weekly News。あなたの学生団体の活動を全国に発信しませんか？",
}

export default function StudentNewsPage() {
  const benefits = [
    {
      title: "露出機会の創出",
      description: "TikTok、Instagram、YouTubeなど複数のプラットフォームであなたの団体の活動を紹介します。これにより、より多くの学生や関係者にリーチすることができます。",
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "プロフェッショナルな制作",
      description: "学生アナウンサーによるナレーションと専門チームによる動画編集で、あなたの団体の活動をプロフェッショナルに紹介します。",
      icon: <Mic className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "ネットワーク拡大",
      description: "UNION加盟団体や視聴者との繋がりを作ることで、新たな協力関係やプロジェクトの可能性が広がります。",
      icon: <Users className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "活動の記録",
      description: "あなたの団体の活動がアーカイブとして残り、将来の活動や新メンバー募集の際の資料として活用することができます。",
      icon: <Calendar className="h-6 w-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const platforms = [
    {
      name: "TikTok",
      logo: "🎵",
      description: "縦型動画で最大リーチを実現",
      color: "bg-pink-500",
    },
    {
      name: "Instagram Reels",
      logo: "📷",
      description: "視覚的な魅力でエンゲージメント向上",
      color: "bg-purple-500",
    },
    {
      name: "YouTube Shorts",
      logo: "▶️",
      description: "検索機能で継続的な露出を確保",
      color: "bg-red-500",
    },
  ]

  const processSteps = [
    {
      step: "1",
      title: "フォーム投稿",
      description: "ニュース内容をフォームから投稿",
      icon: <Mail className="h-6 w-6" />,
    },
    {
      step: "2",
      title: "UNION審査",
      description: "内容確認・編集・制作準備",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      step: "3",
      title: "SNS配信",
      description: "1〜2週間後に各種SNSで配信",
      icon: <ExternalLink className="h-6 w-6" />,
    },
  ]

  const faqs = [
    {
      question: "どのような内容のニュースを投稿できますか？",
      answer: "イベント開催情報、活動成果、プロジェクト紹介、メンバー募集など、学生団体の活動に関する情報であれば投稿可能です。",
    },
    {
      question: "非加盟団体でも投稿できますか？",
      answer: "はい、非加盟団体の方も専用フォームから投稿いただけます。ただし、掲載については審査があります。",
    },
    {
      question: "投稿してからどのくらいで配信されますか？",
      answer: "基本的に1週間程度で収集から完成、翌週には配信完了の高速サイクルで運用しています。",
    },
    {
      question: "動画の著作権はどうなりますか？",
      answer: "UNIONが制作した番組及びUNIONが作成するコンテンツの著作権は学生団体UNIONに帰属します。",
    },
    {
      question: "UNION加盟団体になるにはどうすればいいですか？",
      answer: "UNIONのウェブサイトから加盟申請が可能です。加盟費・維持費は一切頂いておりません。",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <ModernHero
        subtitle="UNION Weekly News"
        title="学生の「今」を、学生の「声」で届ける"
        description="あなたの学生団体の活動を全国に発信しませんか？"
        primaryAction={{
          text: "ニュースを投稿する",
          href: "https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform?usp=sf_link",
        }}
        secondaryAction={{
          text: "メディア事業に戻る",
          href: "/media",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* プロジェクト概要 */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50">
                プロジェクト概要
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">プロジェクト概要</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                UNION加盟団体を中心に、毎週3〜5件の活動ニュースを収集し、アナウンサー志望の学生がナレーション収録。
                動画編集を経て、縦型ショート動画として配信する定期情報発信プロジェクトです。
              </p>
            </div>
          </AnimatedSection>

          {/* 配信サンプル */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">配信サンプル</h3>
              <p className="text-gray-600 mb-8">UNIONが制作する縦型ショート動画のサンプルをご覧ください</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">🎵</div>
                    <CardTitle className="text-lg">TikTok サンプル</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">縦型動画で最大リーチ</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <CardTitle className="text-lg">Instagram Reels サンプル</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">視覚的な魅力でエンゲージメント向上</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">▶️</div>
                    <CardTitle className="text-lg">YouTube Shorts サンプル</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600">検索機能で継続的な露出</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>

          {/* 配信プラットフォーム */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">配信プラットフォーム</h3>
              <p className="text-gray-600 mb-8">縦型動画で最大リーチを実現します</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {platforms.map((platform, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${platform.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <span className="text-2xl">{platform.logo}</span>
                      </div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600">{platform.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 参加メリット */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">参加メリット</h3>
              <p className="text-gray-600 mb-8">学生団体がUNION Weekly Newsに参加するメリット</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                        <div className={benefit.color}>{benefit.icon}</div>
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 掲載の流れ */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">掲載の流れ</h3>
              <p className="text-gray-600 mb-8">フォームからニュースを投稿いただいた後、UNION側で審査を行い、1〜2週間程度で各種SNSに投稿いたします。</p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {processSteps.map((step, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                    <CardHeader className="text-center">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                        {step.step}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 重要なお知らせ */}
          <AnimatedSection>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mb-16">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-4">⚠️重要なお知らせ</h3>
                  <div className="space-y-4 text-yellow-700">
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">📢</span>
                      <div>
                        <strong>加盟団体を優先して紹介いたします</strong>
                        <p className="text-sm mt-1">ニュース紹介は<strong>UNION加盟団体を優先</strong>して行います。より確実な掲載をご希望の場合は、ぜひUNIONへの加盟をご検討ください。</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">💬</span>
                      <div>
                        <strong>加盟手続きについて</strong>
                        <p className="text-sm mt-1">UNION加盟をご希望の場合は、公式LINEから「加盟希望」とお伝えください。加盟費・維持費は一切かかりません。</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-lg">🔗</span>
                      <div>
                        <strong>UNION公式LINEはこちら</strong>
                        <p className="text-sm mt-1">公式LINEアカウント</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ニュース投稿CTA */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ニュースを投稿する</h3>
              <p className="text-gray-600 mb-8">あなたの学生団体の活動をUNION Weekly Newsで紹介しませんか？</p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform?usp=sf_link">
                  ニュースを投稿する
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>

          {/* よくある質問 */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">よくある質問</h3>
              <p className="text-gray-600 mb-8">UNION Weekly Newsについてよくある質問と回答</p>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-start space-x-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 最終CTA */}
          <AnimatedSection>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">あなたの団体の活動を全国に発信しませんか？</h3>
              <p className="text-gray-600 mb-8">
                UNION Weekly Newsで、学生団体の活動をより多くの人に届けましょう。<br />
                今すぐニュースを投稿して、あなたの団体の認知度を高めましょう。
              </p>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform?usp=sf_link">
                  今すぐニュースを投稿する
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
} 