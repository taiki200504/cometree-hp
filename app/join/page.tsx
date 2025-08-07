import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import FAQ from "@/components/faq"
import { Users, Building, Heart } from "lucide-react"

export default function JoinUs() {
  const faqItems = [
    {
      question: "個人でも加盟できますか？",
      answer:
        "Slackへの参加であれば個人からでも参加いただけますが、加盟については2名以上の学生団体を条件としております。UNIONは個人での活動や、これから何かを始めたい方も歓迎します。",
    },
    {
      question: "加盟に費用はかかりますか？",
      answer: "UNIONへの加盟は完全無料です。学生団体の活動を支援することが目的のため、費用は一切かかりません。",
    },
    {
      question: "どのような学生団体が加盟していますか？",
      answer:
        "起業サークル、ボランティア団体、文化系サークル、学術研究会など、様々な分野の学生団体が加盟しています。活動内容や規模は問いません。",
    },
    {
      question: "加盟後はどのような支援を受けられますか？",
      answer:
        "メディア出演の機会、イベント告知の支援、他団体との交流機会、Slackコミュニティでの情報交換、1on1カウンセリングなど、様々な支援を提供しています。",
    },
    {
      question: "企業として連携するメリットは何ですか？",
      answer:
        "Z世代の学生へのリーチ、優秀な学生人材との出会い、CSR活動の一環としての社会貢献、ブランディング効果などが期待できます。",
    },
  ]

  // モック連携コミュニティデータ
  const partnerCommunities = [
    { id: 1, name: "東京大学起業サークルTNK", logo: "/placeholder.svg?height=60&width=60" },
    { id: 2, name: "早稲田大学国際交流サークル", logo: "/placeholder.svg?height=60&width=60" },
    { id: 3, name: "慶應義塾大学ボランティア団体", logo: "/placeholder.svg?height=60&width=60" },
    { id: 4, name: "明治大学メディア研究会", logo: "/placeholder.svg?height=60&width=60" },
    { id: 5, name: "立教大学環境保護団体", logo: "/placeholder.svg?height=60&width=60" },
    { id: 6, name: "青山学院大学文化祭実行委員会", logo: "/placeholder.svg?height=60&width=60" },
    { id: 7, name: "サイバーエージェント", logo: "/placeholder.svg?height=60&width=60" },
    { id: 8, name: "メルカリ", logo: "/placeholder.svg?height=60&width=60" },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

    <ModernHero
        subtitle="Join UNION"
        title="参加方法"
        description="UNIONコミュニティに参加して、共に成長しませんか？学生団体として加盟するか、個人としてコミュニティに参加することができます。"
        primaryAction={{
          text: "今すぐ参加する",
          href: "https://join.slack.com/t/union-finschool/shared_invite/zt-2s6iy0dj5-ttUUdbA2MrY2XJf~cou81A",
        }}
        secondaryAction={{
          text: "詳細を見る",
          href: "#details",
        }}
      />

      {/* 参加方法セクション */}
      <section className="py-16" id="details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#066ff2] dark:text-blue-400 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800">
              How to Join
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">参加方法</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">あなたに合った参加方法を選んでください</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* 学生向け */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-sm p-8 border border-blue-100 dark:border-blue-800/30">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-[#066ff2]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">学生・学生団体</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-[#066ff2] pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">団体加盟申請</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    学生団体としてUNIONに正式加盟し、様々な支援を受けることができます。
                  </p>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSffY_V_buYyNzGK2gg5cWV0j0s_BMQqIjBi7ZucTdD_l2uEQ/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#066ff2] text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-300 inline-block"
                  >
                    加盟申請フォーム
                  </a>
                </div>

                <div className="border-l-4 border-[#066ff2] pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Slack参加</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    個人でも参加可能な学生限定Slackコミュニティで情報交換や交流ができます。
                  </p>
                  <a
                    href="https://join.slack.com/t/union-finschool/shared_invite/zt-2s6iy0dj5-ttUUdbA2MrY2XJf~cou81A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#066ff2] text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-300 inline-block"
                  >
                    Slackに参加
                  </a>
                </div>

                <div className="border-l-4 border-[#066ff2] pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Podcast出演</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    UNIONのポッドキャスト番組に出演して、あなたの活動を発信しませんか？
                  </p>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeOQutZeoIiVYSASMeWjbkzZFpd4VSzIliJjB2xsIVYAOU8LQ/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#066ff2] text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-300 inline-block"
                  >
                    出演申請
                  </a>
                </div>
              </div>
            </div>

            {/* 企業向け */}
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg shadow-sm p-8 border border-pink-100 dark:border-pink-800/30">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-[#ec4faf]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">企業・団体</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-[#ec4faf] pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">連携団体/企業申請</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    UNIONと連携し、学生の成長支援や人材育成に貢献しませんか？
                  </p>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdUR_v_l38b0abzhnaEqsA58zRjeS6z72s0SSwb4OWoZouZ6g/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#ec4faf] text-white px-4 py-2 rounded text-sm font-medium hover:bg-pink-600 transition-colors duration-300 inline-block"
                  >
                    連携申請フォーム
                  </a>
                </div>

                <div className="border-l-4 border-[#ec4faf] pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">協賛・スポンサーシップ</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    UNIONのメディアやイベントへの協賛を通じて、Z世代へのリーチを強化できます。
                  </p>
                  <a
                    href="/contact"
                    className="bg-[#ec4faf] text-white px-4 py-2 rounded text-sm font-medium hover:bg-pink-600 transition-colors duration-300 inline-block"
                  >
                    お問い合わせ
                  </a>
                </div>

                <div className="border-l-4 border-[#ec4faf] pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">学生団体との共創</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    学生団体とのコラボレーションプロジェクトをコーディネートします。
                  </p>
                  <a
                    href="/contact"
                    className="bg-[#ec4faf] text-white px-4 py-2 rounded text-sm font-medium hover:bg-pink-600 transition-colors duration-300 inline-block"
                  >
                    お問い合わせ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNION連携コミュニティ */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 dark:bg-pink-900/30 text-[#ec4faf] dark:text-pink-400 text-sm font-medium mb-6 border border-pink-100 dark:border-pink-800">
              Partner Community
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">UNION連携コミュニティ</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">UNIONと連携している学生団体・企業の一部をご紹介</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {partnerCommunities.map((community) => (
              <div key={community.id} className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">{community.name.slice(0, 2)}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 text-center">{community.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-[#066ff2] dark:text-blue-400 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800">
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">よくある質問</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              UNIONへの参加に関してよくいただ質問をまとめました
            </p>
          </div>

          <FAQ items={faqItems} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#066ff2] to-[#ec4faf]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Heart className="h-16 w-16 text-white mx-auto mb-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">一緒にUNIONを盛り上げませんか？</h2>
          <p className="text-xl text-white/90 mb-8">
            学生の声を社会に届ける活動に参加し、共に成長していく仲間を募集しています。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://join.slack.com/t/union-finschool/shared_invite/zt-2s6iy0dj5-ttUUdbA2MrY2XJf~cou81A"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#066ff2] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Slackに参加する
            </a>
            <a
              href="/contact"
              className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold border-2 border-white hover:bg-white hover:text-[#066ff2] transition-colors duration-300"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
