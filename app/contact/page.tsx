import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import FAQ from "@/components/faq"
import { Mail, MapPin, Clock, ExternalLink, Users, Building } from "lucide-react"

export default function Contact() {
  const faqItems = [
    {
      question: "お問い合わせの返信にはどのくらい時間がかかりますか？",
      answer: "通常、営業日2-3日以内にご返信いたします。お急ぎの場合は、メールにその旨をご記載ください。",
    },
    {
      question: "学生団体の加盟に条件はありますか？",
      answer:
        "2名以上の学生で構成された団体であれば、活動内容や規模は問いません。営利目的でない学生主体の活動であることが条件です。",
    },
    {
      question: "企業として学生団体と連携したいのですが、どのような形がありますか？",
      answer:
        "イベント協賛、インターンシップ提供、共創プロジェクト、メディア協賛など、様々な形での連携が可能です。詳しくはお問い合わせください。",
    },
    {
      question: "メディア出演の条件はありますか？",
      answer: "学生であれば個人・団体問わず出演可能です。活動内容や思いを共有していただける方を歓迎しています。",
    },
    {
      question: "UNIONの活動に参加するのに費用はかかりますか？",
      answer: "UNIONへの参加・加盟は完全無料です。学生の活動支援が目的のため、費用は一切かかりません。",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Contact Us"
        title="お問い合わせ"
        description="UNIONに関するご質問・ご相談はお気軽にどうぞ"
      />

      {/* お問い合わせ方法 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">お問い合わせ方法</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              目的に応じて適切なお問い合わせ方法をお選びください
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* 学生向けお問い合わせ */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow-sm p-8 border-2 border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[#066ff2]" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">学生・学生団体の方</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-[#066ff2] pl-4 bg-white dark:bg-blue-800/20 p-3 rounded-r">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    加盟・参加に関するお問い合わせ
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                    団体加盟、Slack参加、メディア出演など、UNIONへの参加に関するご質問
                  </p>
                </div>

                <div className="border-l-4 border-[#066ff2] pl-4 bg-white dark:bg-blue-800/20 p-3 rounded-r">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">活動支援に関するお問い合わせ</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
                    イベント告知、1on1カウンセリング、他団体との連携など
                  </p>
                </div>

                <div className="border-l-4 border-[#066ff2] pl-4 bg-white dark:bg-blue-800/20 p-3 rounded-r">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">その他のお問い合わせ</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">上記以外のご質問・ご相談</p>
                </div>

                <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://union-information.notion.site/18b23f8602bf818ea077db770c798d8c?pvs=105"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#066ff2] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center justify-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      お問い合わせフォーム
                    </a>
                    <div className="text-center">
                      <span className="text-sm text-blue-600 dark:text-blue-400">または</span>
                    </div>
                    <a
                      href="mailto:gakusei.union226@gmail.com?subject=学生からのお問い合わせ"
                      className="inline-flex items-center border-2 border-[#066ff2] text-[#066ff2] px-4 py-2 rounded-lg hover:bg-[#066ff2] hover:text-white transition-colors duration-200 text-center justify-center"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      メールで問い合わせ
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 企業向けお問い合わせ */}
            <div className="bg-pink-50 dark:bg-pink-900/30 rounded-lg shadow-sm p-8 border-2 border-pink-200 dark:border-pink-700 hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-[#ec4faf]" />
                </div>
                <h3 className="text-2xl font-bold text-pink-800 dark:text-pink-200">企業・法人の方</h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-4 border-[#ec4faf] pl-4 bg-white dark:bg-pink-800/20 p-3 rounded-r">
                  <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">協賛・スポンサーシップ</h4>
                  <p className="text-pink-700 dark:text-pink-300 text-sm mb-3">
                    メディア協賛、イベントスポンサーシップに関するご相談
                  </p>
                </div>

                <div className="border-l-4 border-[#ec4faf] pl-4 bg-white dark:bg-pink-800/20 p-3 rounded-r">
                  <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">学生団体との連携</h4>
                  <p className="text-pink-700 dark:text-pink-300 text-sm mb-3">
                    共創プロジェクト、インターンシップ、採用に関するご相談
                  </p>
                </div>

                <div className="border-l-4 border-[#ec4faf] pl-4 bg-white dark:bg-pink-800/20 p-3 rounded-r">
                  <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">その他のお問い合わせ</h4>
                  <p className="text-pink-700 dark:text-pink-300 text-sm mb-3">上記以外のご質問・ご相談</p>
                </div>

                <div className="mt-6 p-4 bg-pink-100 dark:bg-pink-800/30 rounded-lg">
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://union-information.notion.site/1f223f8602bf80d58355c76d2fac2086?pvs=105"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#ec4faf] text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-200 text-center justify-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      お問い合わせフォーム
                    </a>
                    <div className="text-center">
                      <span className="text-sm text-pink-600 dark:text-pink-400">または</span>
                    </div>
                    <a
                      href="mailto:gakusei.union226@gmail.com?subject=法人からのお問い合わせ"
                      className="inline-flex items-center border-2 border-[#ec4faf] text-[#ec4faf] px-4 py-2 rounded-lg hover:bg-[#ec4faf] hover:text-white transition-colors duration-200 text-center justify-center"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      メールで問い合わせ
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 連絡先情報 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">連絡先情報</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">UNIONの基本情報</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* メールアドレス */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-[#066ff2]" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">メールアドレス</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">gakusei.union226@gmail.com</p>
            </div>

            {/* 対応時間 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-[#ec4faf]" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">対応時間</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                平日 10:00-18:00
                <br />
                （土日祝日除く）
              </p>
            </div>

            {/* 所在地 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-[#066ff2]" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">所在地</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                東京都内
                <br />
                （詳細はお問い合わせください）
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">よくあるご質問</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">お問い合わせの前にこちらもご確認ください</p>
          </div>

          <FAQ items={faqItems} />
        </div>
      </section>

      {/* お問い合わせCTA */}
      <section className="py-16 bg-gradient-to-br from-[#066ff2] to-[#ec4faf]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">まだ質問がありますか？</h2>
          <p className="text-xl text-white opacity-90 mb-8">お気軽にお問い合わせください。丁寧にお答えいたします。</p>
          <a
            href="mailto:gakusei.union226@gmail.com?subject=お問い合わせ"
            className="bg-white text-[#066ff2] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center"
          >
            <Mail className="mr-2 h-5 w-5" />
            メールでお問い合わせ
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
