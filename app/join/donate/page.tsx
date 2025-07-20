import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Heart, CreditCard, Users, Target, Gift, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DonatePage() {
  const donationOptions = [
    {
      amount: "1,000円",
      title: "サポーター",
      description: "学生の活動を応援",
      benefits: ["感謝のメッセージ", "活動報告書の送付"],
    },
    {
      amount: "3,000円",
      title: "アドバイザー",
      description: "継続的な支援",
      benefits: ["感謝のメッセージ", "活動報告書の送付", "年次報告会への招待"],
    },
    {
      amount: "5,000円",
      title: "パートナー",
      description: "積極的な支援",
      benefits: ["感謝のメッセージ", "活動報告書の送付", "年次報告会への招待", "限定イベントへの招待"],
    },
    {
      amount: "10,000円〜",
      title: "スペシャルサポーター",
      description: "特別な支援",
      benefits: [
        "感謝のメッセージ",
        "活動報告書の送付",
        "年次報告会への招待",
        "限定イベントへの招待",
        "個別面談の機会",
      ],
    },
  ]

  const usageAreas = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "学生支援活動",
      description: "学生団体の活動支援、イベント開催費用",
      percentage: "40%",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "プラットフォーム運営",
      description: "Webサイト、Slackコミュニティの運営費用",
      percentage: "30%",
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "教育プログラム",
      description: "研修、セミナー、ワークショップの開催",
      percentage: "20%",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "運営費",
      description: "事務局運営、人件費、その他必要経費",
      percentage: "10%",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Support Our Mission"
          title="ご寄付について"
        description="学生団体連合UNIONの活動を支援していただける皆様へ。あなたの支援が学生の未来を創ります。"
        primaryAction={{
          text: "オンラインで寄付する",
          href: "#donate",
        }}
        secondaryAction={{
          text: "お問い合わせ",
          href: "/contact",
        }}
        />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 寄付の意義 */}
          <section className="py-20 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl mb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <Heart className="h-16 w-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-6">あなたの支援が学生の未来を創ります</h2>
              <p className="text-xl text-white/90 leading-relaxed">
                学生団体連合UNIONは、全国の学生たちが夢に向かって挑戦し続けられる環境を提供しています。
                皆様からのご寄付は、学生たちの成長と社会貢献活動を直接支援し、 次世代のリーダー育成に大きく貢献します。
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* 寄付の使途 */}
        <section className="py-20">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">ご寄付の使途</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                皆様からのご寄付は以下の用途で大切に活用させていただきます
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {usageAreas.map((area, index) => (
                <AnimatedSection key={index}>
                  <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                    <div className="text-[#066ff2] mb-4 flex justify-center">{area.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{area.percentage}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{area.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{area.description}</p>
                  </div>
                </AnimatedSection>
              ))}
          </div>
        </section>

        {/* 寄付プラン */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">寄付プラン</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                ご支援いただく金額に応じて、様々な特典をご用意しています
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {donationOptions.map((option, index) => (
                <AnimatedSection key={index}>
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">{option.amount}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                      <p className="text-white/90">{option.description}</p>
                    </div>
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">特典：</h4>
                      <ul className="space-y-2">
                        {option.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 寄付方法 */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">寄付方法</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">以下の方法でご寄付いただけます</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                  <CreditCard className="h-12 w-12 text-[#066ff2] mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">オンライン寄付</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    クレジットカードやPayPalを使用して、 安全にオンラインでご寄付いただけます。
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      即座に処理完了
                    </li>
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      領収書の自動発行
                    </li>
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      継続寄付の設定可能
                    </li>
                  </ul>
                  <button className="w-full bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200">
                    オンラインで寄付する
                  </button>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                  <Users className="h-12 w-12 text-[#066ff2] mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">銀行振込</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    銀行振込でのご寄付も承っております。 詳細な振込先情報をお送りいたします。
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      振込先情報は、お問い合わせいただいた後に 個別にご連絡いたします。
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="block w-full text-center border-2 border-[#066ff2] text-[#066ff2] px-6 py-3 rounded-lg font-semibold hover:bg-[#066ff2] hover:text-white transition-all duration-200"
                  >
                    振込先を問い合わせる
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* 税制優遇について */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">税制優遇について</h2>
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  現在、税制優遇措置の適用に向けて準備を進めております。 詳細が決定次第、改めてご案内いたします。
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">※ 寄付金領収書は発行いたします。</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* お問い合わせ */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">ご不明な点がございましたら</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                寄付に関するご質問やご相談がございましたら、 お気軽にお問い合わせください。
              </p>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                お問い合わせ
              </Link>
            </AnimatedSection>
          </div>
        </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
