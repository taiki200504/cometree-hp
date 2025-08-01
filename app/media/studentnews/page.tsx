import type { Metadata } from "next"
import Link from "next/link"
import { ModernHero } from "@/components/modern-hero"
import { AnimatedSection } from "@/components/animated-section"
import { Mic, Play, ArrowRight, CheckCircle, Users, Calendar, Mail } from "lucide-react"
import Header from "@/components/header"


import Footer from "@/components/footer"

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
    },
    {
      title: "プロフェッショナルな制作",
      description: "学生アナウンサーによるナレーションと専門チームによる動画編集で、あなたの団体の活動をプロフェッショナルに紹介します。",
      icon: <Mic className="h-6 w-6" />,
    },
    {
      title: "ネットワーク拡大",
      description: "UNION加盟団体や視聴者との繋がりを作ることで、新たな協力関係やプロジェクトの可能性が広がります。",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "活動の記録",
      description: "あなたの団体の活動がアーカイブとして残り、将来の活動や新メンバー募集の際の資料として活用することができます。",
      icon: <Calendar className="h-6 w-6" />,
    },
  ]

  const platforms = [
    {
      name: "TikTok",
      logo: "🎵",
      description: "縦型動画で最大リーチを実現",
    },
    {
      name: "Instagram Reels",
      logo: "📷",
      description: "視覚的な魅力でエンゲージメント向上",
    },
    {
      name: "YouTube Shorts",
      logo: "▶️",
      description: "検索機能で継続的な露出を確保",
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <ModernHero
        subtitle="UNION Weekly News"
        title="学生の「今」を、学生の「声」で届ける"
        description="あなたの学生団体の活動を全国に発信しませんか？"
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* プロジェクト概要 */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">プロジェクト概要</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                UNION加盟団体を中心に、毎週3〜5件の活動ニュースを収集し、アナウンサー志望の学生がナレーション収録。
                動画編集を経て、縦型ショート動画として配信する定期情報発信プロジェクトです。
              </p>
            </div>
          </AnimatedSection>

          {/* 配信サンプル */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">配信サンプル</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                UNIONが制作する縦型ショート動画のサンプルをご覧ください
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <div className="text-4xl mb-4">🎵</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">TikTok サンプル</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">縦型動画で最大リーチ</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <div className="text-4xl mb-4">📷</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Instagram Reels サンプル</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">視覚的な魅力でエンゲージメント向上</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                  <div className="text-4xl mb-4">▶️</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">YouTube Shorts サンプル</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">検索機能で継続的な露出</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 配信プラットフォーム */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">配信プラットフォーム</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                縦型動画で最大リーチを実現します
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {platforms.map((platform, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-4xl mb-4">{platform.logo}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{platform.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{platform.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 参加メリット */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">参加メリット</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                学生団体がUNION Weekly Newsに参加するメリット
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-lg flex items-center justify-center mb-4 text-white">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 掲載の流れ */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">掲載の流れ</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                フォームからニュースを投稿いただいた後、UNION側で審査を行い、1〜2週間程度で各種SNSに投稿いたします。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                  <div className="w-16 h-16 bg-[#066ff2] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">フォーム投稿</h3>
                  <p className="text-gray-600 dark:text-gray-300">ニュース内容をフォームから投稿</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                  <div className="w-16 h-16 bg-[#ec4faf] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">UNION審査</h3>
                  <p className="text-gray-600 dark:text-gray-300">内容確認・編集・制作準備</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                  <div className="w-16 h-16 bg-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">SNS配信</h3>
                  <p className="text-gray-600 dark:text-gray-300">1〜2週間後に各種SNSで配信</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 重要なお知らせ */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl p-8 text-white mb-16">
              <h2 className="text-2xl font-bold mb-6">⚠️重要なお知らせ</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📢</div>
                  <div>
                    <p className="font-semibold mb-2">加盟団体を優先して紹介いたします</p>
                    <p className="text-sm opacity-90">ニュース紹介は<strong>UNION加盟団体を優先</strong>して行います。より確実な掲載をご希望の場合は、ぜひUNIONへの加盟をご検討ください。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💬</div>
                  <div>
                    <p className="font-semibold mb-2">加盟手続きについて</p>
                    <p className="text-sm opacity-90">UNION加盟をご希望の場合は、公式LINEから「加盟希望」とお伝えください。加盟費・維持費は一切かかりません。</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🔗</div>
                  <div>
                    <p className="font-semibold mb-2">UNION公式LINEはこちら</p>
                    <a href="#" className="text-sm underline opacity-90 hover:opacity-100">公式LINEアカウント</a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ニュース投稿セクション */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">ニュースを投稿する</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                あなたの学生団体の活動をUNION Weekly Newsで紹介しませんか？
              </p>
              <a
                href="https://v0-student-news-lp-creation.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200"
              >
                ニュースを投稿する
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </AnimatedSection>

          {/* よくある質問 */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">よくある質問</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
                UNION Weekly Newsについてよくある質問と回答
              </p>
              <div className="space-y-6 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* 最終CTA */}
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">あなたの団体の活動を全国に発信しませんか？</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                UNION Weekly Newsで、学生団体の活動をより多くの人に届けましょう。<br />
                今すぐニュースを投稿して、あなたの団体の認知度を高めましょう。
              </p>
              <a
                href="https://v0-student-news-lp-creation.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity duration-200"
              >
                今すぐニュースを投稿する
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  )
} 