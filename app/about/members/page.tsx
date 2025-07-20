import type { Metadata } from "next"
import Image from "next/image"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Users, Award, Heart, Lightbulb } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "運営メンバー紹介 | UNION 学生団体連合",
  description:
    "UNIONは多様なバックグラウンドを持つ学生メンバーで構成されています。情熱×専門性を武器に、学生の声を社会に届けます。",
}

export default function MembersPage() {
  const coreMembers = [
    {
      name: "三島大毅",
      position: "代表",
      university: "立教大学経済学部2年",
      profile: "地域創生からDAOまで幅広く挑戦。「学生発のムーブメントを世の中へ」が信条。",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      name: "高柳茉白",
      position: "副代表",
      university: "慶應義塾大学総合政策学部2年",
      profile: "偏見低減の研究者。UNIONではPJ統括を担当。",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      name: "肥後翔太",
      position: "法人営業部 部長",
      university: "東京大学経済学部1年",
      profile: "スタートアップ支援とスポンサー開拓を担当。",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      name: "吉田乃々香",
      position: "コンテンツ制作部 部長",
      university: "立教大学法学部2年",
      profile: "Podcast / 映像制作のプロデューサー。",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      name: "阪野侑希",
      position: "コミュニティマネジメント部 部長",
      university: "高校3年生",
      profile: "UNION内外のイベント企画からコミュニティの運営、エンゲージメント政策を統括。",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      name: "永野佑夏",
      position: "BO部 部長",
      university: "創価大学経営学部1年",
      profile: "人事や経理など、UNIONを裏から支える。",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const advisors = [
    {
      name: "設楽晴海",
      tags: ["プロジェクトマネジメント", "マーケティング", "商品開発", "教育"],
      expectation:
        "私自身も大学時代に、学生団体を立ち上げ、さまざまな方に恩を受けました。恩送りという形で、学生の皆さんのサポートをしていければと思います",
      career:
        "福島大学→化学 福島大学大学院→技術経営 →プロジェクトマネジメント、教育→プロジェクトマネジメント、林業、教育、商品開発、マーケティング",
      title: "地域プロジェクトマネージャー、LIT代表",
      hobbies: "読書、クレー射撃",
      photo: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "酒井裕",
      tags: ["スタートアップ支援", "企業法務"],
      expectation: "学生の間にできるチャレンジをどんどんしてください！できる限りのサポートをさせていただきます。",
      career:
        "一橋大学法科大学院卒業後、ビジネス系の弁護士としてキャリアをスタート。その後、法律の世界から飛び出し、大手機械部品メーカーや宇宙系スタートアップで経営企画・経営管理に携わる。現在はフリーランスの弁護士として活動する傍ら、教育分野での起業を目指して奮闘中！",
      title: "弁護士",
      hobbies: "おいしいごはん、南の島への旅行",
      photo: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "池田一貫",
      tags: ["法人ソリューション営業"],
      expectation:
        "論点整理、企画構想、運営改善などでお力になれたらと思います！もがきながら少しづつ構想を実現させ、価値あるものに変化させ作りあげていく貴重な経験を味わえたら楽しいと思います！",
      career:
        "学生時代：高校生向けオンライン教育事業、中学生向け海外高校入試向け教育事業、学生団体立ち上げ(イベント、講演会等)、家庭教師(個人契約) 社会人：本業：IT・通信企業 法人営業 副業：①ショート動画マーケティング企業 ②生成AI系企業 ③写真撮影",
      title: "企業ベンチャー役員",
      hobbies: "あったかい写真を撮ること、韓国文化に触れること、チョコプラの6秒クッキングと財津チャンネル",
      photo: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <ModernHero
        subtitle="Our Team"
        title="運営メンバー紹介"
        description="UNIONは多様なバックグラウンドを持つ学生メンバーで構成されています。情熱×専門性を武器に、学生の声を社会に届けます。"
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* コアチーム */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#066ff2] dark:text-blue-400 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800">
                <Users className="w-4 h-4 mr-2" />
                Core Team
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">コアチーム</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                UNIONの中核を担う学生メンバーたち
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {coreMembers.map((member, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 transform hover:scale-105">
                  <div className="relative h-64">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-sm opacity-90">{member.position}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#066ff2] dark:text-blue-400 font-medium mb-2">{member.university}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{member.profile}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 顧問・アドバイザー */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 text-[#ec4faf] dark:text-pink-400 text-sm font-medium mb-6 border border-pink-100 dark:border-pink-800">
                <Award className="w-4 h-4 mr-2" />
                Advisors
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">顧問・アドバイザー</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                UNIONの活動を支援してくださる経験豊富なアドバイザーの皆様
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {advisors.map((advisor, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <Image
                        src={advisor.photo || "/placeholder.svg"}
                        alt={advisor.name}
                        width={120}
                        height={120}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{advisor.name}</h3>
                      <p className="text-[#066ff2] dark:text-blue-400 font-medium mb-3">{advisor.title}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {advisor.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            <Heart className="w-4 h-4 mr-2 text-[#ec4faf]" />
                            学生団体に期待すること
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            {advisor.expectation}
                          </p>
                        </div>

                        <div>
                          <h4 className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            <Lightbulb className="w-4 h-4 mr-2 text-[#066ff2]" />
                            経歴・趣味
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
                            {advisor.career}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">趣味: {advisor.hobbies}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* 更新情報 */}
          <AnimatedSection>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ※メンバーは随時更新されます。最新情報はCMS連携で自動反映。
              </p>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
}
