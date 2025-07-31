import Image from "next/image"
import Link from "next/link"
import { Target, Eye, Heart, Lightbulb, Users, Building2, Handshake, ArrowRight, Star, Zap, Globe, Mic, MessageCircle, Users2, TrendingUp, Award, Compass } from "lucide-react"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  const pmvv = [
    {
      icon: Target,
      title: "Purpose（存在意義）",
      content: "学生から熱狂を生み出せる世界を作る。今の日本社会は自分の行動で、国や社会を変えられると思うことができる若者が少ない。そんな社会の中で、学生団体は社会を動かすタネを秘めていると思う。しかし課題として、情報伝達手段がない。そこで我々UNIONが学生活動の『インフラ』(旗振り役・広告塔)として、学生のサポートを行うことで、『学生から変えようとする空気感・世界観を作り出す』未来を目指す。",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      icon: Eye,
      title: "Mission（使命）",
      content: "学生の声を社会に響かせる。学生団体連合UNIONは、このMissionを通して、学生・学生団体同士の連携を強化し、情報共有や共同イベントの開催、人材育成を促進します。また、学生・学生団体の影響力を集約し、イベントの告知や広報を我々のメディアを通して行うことで学生の声を多くの人に届けます。",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      icon: Heart,
      title: "Vision（展望）",
      content: "大ゴール(10年)：学生発のムーブメントが、世の中を動かす『時代』をつくる。中ゴール(5年)：学生の挑戦が、社会の中で当たり前に受け入れられる『文化』をつくる。小ゴール(1年)：学生同士がつながり、互いに影響を与え合う『場』をつくる。",
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
    },
    {
      icon: Lightbulb,
      title: "Values（価値観）",
      content: "Collaboration：学生団体同士の連携を深め、共に成長し合う環境を作ります。Impact：学生の声を広く届けることで、社会にポジティブな変化をもたらします。Synergy：活躍する若者や団体が集い「熱狂」が生まれる場所を創出する。",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "from-yellow-50 to-yellow-100",
    },
  ]

  const culture = {
    icon: Compass,
    title: "Culture（カルチャー）",
    content: "Getting out of your comfort zone。固定概念に囚われない発想で活動する。自分自身で仕事を作っていく姿勢が望ましい。自分たちは学生の「可能性」を信じ、「可能性」広げ、「可能性」を売る。",
    color: "from-green-500 to-green-600",
    bgColor: "from-green-50 to-green-100",
  }

  const coreBusinesses = [
    {
      icon: Mic,
      title: "メディア事業",
      description: "学生の声を社会に届けるポッドキャストやメディア発信",
      link: "/media",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: MessageCircle,
      title: "コミュニティ事業",
      description: "全国の学生団体をつなぐコミュニティ運営とネットワーク構築",
      link: "/community",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users2,
      title: "マッチング事業",
      description: "学生と企業・団体をつなぐマッチングサービス",
      link: "/about/matching-detail",
      color: "from-orange-500 to-orange-600",
    },
  ]

  const achievements = [
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "全国展開",
      description: "17都道府県に活動拠点を展開",
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: "メディア発信",
      description: "4つのポッドキャスト番組を制作・配信",
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "社会貢献",
      description: "年間30以上のイベントを主催・共催",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <ModernHero
        title="About UNION"
        subtitle="私たちについて"
        description="学生の声を社会に響かせる。学生団体連合UNIONについてご紹介します"
        backgroundImage="/images/logo.icon.png"
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* PMVV セクション - より目立つ配置 */}
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white text-lg font-semibold mb-8 shadow-lg">
                <Lightbulb className="h-5 w-5 mr-3" />
              私たちの理念
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                UNIONの
                <span className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] bg-clip-text text-transparent">5つの柱</span>
            </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                学生の成長と社会への貢献を支える、私たちの目的・使命・展望・価値観・カルチャー
              </p>
            </div>
        </AnimatedSection>

          {/* PMVV カード - より大きなサイズとインパクト */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {pmvv.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className={`bg-gradient-to-br ${item.bgColor} dark:from-gray-800 dark:to-gray-700 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 dark:border-gray-600 transform hover:scale-105`}>
                  <div className="flex items-center mb-8">
                    <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.color} rounded-3xl mr-8 shadow-xl`}>
                      <item.icon className="h-10 w-10 text-white" />
                </div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{item.content}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Culture セクション */}
          <AnimatedSection>
            <div className="mb-24">
              <div className={`bg-gradient-to-br ${culture.bgColor} dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 shadow-2xl border border-gray-100 dark:border-gray-600`}>
                <div className="flex items-center mb-8">
                  <div className={`flex items-center justify-center w-24 h-24 bg-gradient-to-r ${culture.color} rounded-3xl mr-8 shadow-xl`}>
                    <culture.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{culture.title}</h3>
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">{culture.content}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* 主な事業 */}
          <AnimatedSection>
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">主な事業</h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                学生団体の成長と社会への貢献を支援する三つの柱
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {coreBusinesses.map((business, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="text-center bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:scale-105">
                  <div className={`flex items-center justify-center w-24 h-24 bg-gradient-to-r ${business.color} rounded-3xl mx-auto mb-8 shadow-xl`}>
                    <business.icon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{business.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">{business.description}</p>
                  <Link
                    href={business.link}
                    className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <span>詳細を見る</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 実績・成果 */}
          <AnimatedSection>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-12 mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">UNIONの実績</h2>
                <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                  設立以来、学生団体の連携と成長を支援してきた成果をご紹介します
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <AnimatedSection key={index} delay={index * 0.2}>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        {achievement.icon}
                  </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{achievement.title}</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300">{achievement.description}</p>
                </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
        </AnimatedSection>

          {/* CTA セクション */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-3xl p-12 text-center text-white">
              <h2 className="text-5xl font-bold mb-8">一緒に未来を創りませんか？</h2>
              <p className="text-2xl opacity-90 mb-10 max-w-4xl mx-auto leading-relaxed">
                UNIONでは、学生の声を社会に響かせる仲間を募集しています。
                あなたも私たちと一緒に、学生から熱狂を生み出せる世界を創造しましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-[#066ff2] px-10 py-5 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
                >
                  <span>メンバー募集</span>
                  <ArrowRight className="h-6 w-6" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg border border-white/30"
                >
                  <span>お問い合わせ</span>
                  <ArrowRight className="h-6 w-6" />
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
