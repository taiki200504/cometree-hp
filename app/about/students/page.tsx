import type { Metadata } from "next"
import Link from "next/link"
import {
  Users,
  MessageSquare,
  Heart,
  Radio,
  ArrowRight,
  Star,
  Zap,
  Globe,
  BookOpen,
  Coffee,
  Lightbulb,
  Target,
} from "lucide-react"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "学生の皆さんへ | UNION 学生団体連合",
  description:
    "UNIONが提供する学生向けサービスをご紹介。メンバー募集、掲示板、UNION Match、メディア＆コミュニティなど、学生生活を豊かにする様々な機会をご用意しています。",
}

export default function StudentsPage() {
  const services = [
    {
      icon: Users,
      title: "UNIONメンバー募集",
      description: "学生団体の連携と成長を支援する活動に参加しませんか？",
      features: [
        "様々な学生団体との交流機会",
        "企業との連携プロジェクト参加",
        "リーダーシップスキルの向上",
        "全国の学生とのネットワーク構築",
      ],
      cta: "メンバー募集詳細",
      link: "/join",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: MessageSquare,
      title: "掲示板コミュニティ",
      description: "学生同士で情報交換や相談ができるオンライン掲示板",
      features: ["学生団体の活動情報共有", "イベント・セミナー告知", "質問・相談の投稿", "お気に入り機能で情報管理"],
      cta: "掲示板を見る",
      link: "/board",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: Heart,
      title: "UNION Match",
      description: "あなたにぴったりの学生団体や活動を見つけるマッチングサービス",
      features: [
        "興味・関心に基づくマッチング",
        "学生団体の詳細情報閲覧",
        "活動体験の申し込み",
        "メンバーとの直接連絡",
      ],
      cta: "マッチングを試す",
      link: "/services#student",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: Radio,
      title: "メディア＆コミュニティ",
      description: "ポッドキャストやSlackコミュニティで学生生活をより豊かに",
      features: ["ポッドキャスト番組の視聴", "Slackコミュニティ参加", "週刊ニュースレター購読", "学生向けイベント情報"],
      cta: "メディア一覧",
      link: "/about/media",
      color: "from-orange-500 to-red-600",
    },
  ]

  const communityFeatures = [
    {
      icon: Globe,
      title: "全国ネットワーク",
      description: "全国の大学から1000人以上の学生が参加",
    },
    {
      icon: BookOpen,
      title: "学習支援",
      description: "勉強会や資格取得支援プログラム",
    },
    {
      icon: Coffee,
      title: "交流イベント",
      description: "オンライン・オフラインでの定期交流会",
    },
    {
      icon: Lightbulb,
      title: "アイデア共有",
      description: "新しいプロジェクトやアイデアの相談・実現",
    },
  ]

  const testimonials = [
    {
      name: "田中さん",
      university: "早稲田大学 3年",
      comment:
        "UNIONの掲示板で他大学の学生と交流でき、視野が広がりました。様々な活動情報も得られて、学生生活がより充実しています。",
      rating: 5,
    },
    {
      name: "佐藤さん",
      university: "慶應義塾大学 2年",
      comment:
        "UNION Matchで自分にぴったりの学生団体を見つけることができました。今では団体の中心メンバーとして活動しています。",
      rating: 5,
    },
    {
      name: "山田さん",
      university: "東京大学 4年",
      comment:
        "Slackコミュニティでは就活情報や業界研究の情報交換ができて、とても助かりました。同じ目標を持つ仲間とも出会えました。",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
    <ModernHero
        title="学生の皆さんへ"
        subtitle="For Students"
        description="UNIONが提供する学生向けサービスで、あなたの学生生活をより豊かにしませんか？"
        backgroundImage="/images/logo.icon.png"
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* サービス紹介 */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                UNIONで始める新しい学生生活
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                学生団体への参加から情報交換まで、あなたの成長をサポートする4つのサービス
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  <div className={`bg-gradient-to-r ${service.color} p-6`}>
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="opacity-90">{service.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-full" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={service.link}
                      className={`inline-flex items-center space-x-2 bg-gradient-to-r ${service.color} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity w-full justify-center`}
                    >
                      <span>{service.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Slackコミュニティの特徴 */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl p-8 mb-20 text-white">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">UNIONコミュニティの特徴</h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  1000人以上の学生が参加するSlackコミュニティで、新しいつながりを見つけよう
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityFeatures.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mx-auto mb-4">
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm opacity-90">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link
                  href="/community"
                  className="inline-flex items-center space-x-2 bg-white text-[#066ff2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <span>コミュニティに参加</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* 掲示板の使用例 */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">掲示板でできること</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                学生同士の情報交換や相談ができるオンライン掲示板の活用例
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <AnimatedSection delay={0.1}>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                  <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">イベント情報共有</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  「来週開催される○○大学の文化祭で、環境問題について議論するパネルディスカッションがあります。興味のある方はぜひ！」
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">質問・相談</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  「学生団体の運営で困っています。資金調達の方法について、経験のある方からアドバイスをいただけませんか？」
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">メンバー募集</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  「プログラミング学習会を一緒に運営してくれる仲間を募集中！初心者歓迎です。一緒に成長しましょう！」
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* 学生の声 */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">学生の声</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                UNIONのサービスを利用している学生からの声をご紹介します
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">{`&quot;${testimonial.comment}&quot;`}</p>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.university}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA セクション */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl p-8 text-center text-white">
              <Zap className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">今すぐUNIONを始めよう！</h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                学生生活をより充実させる第一歩を踏み出しませんか？ UNIONのサービスは全て無料でご利用いただけます。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/board"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-[#066ff2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>掲示板を見る</span>
                </Link>
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#066ff2] transition-colors"
                >
                  <Users className="h-4 w-4" />
                  <span>メンバー募集</span>
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
