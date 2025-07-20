"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, User, Tag, ArrowLeft, Share2, ExternalLink } from "lucide-react"

interface NewsItemDetailProps {
  params: {
    id: string
  }
}

// モック記事データを修正して、ID 11と12の記事を追加します

// モック記事データ（実際はAPIから取得）
const getNewsItem = (id: string) => {
  const newsItems = [
    {
      id: 1,
      title: "新たな加盟団体を迎えました",
      content: `
        <h2>新加盟団体のご紹介</h2>
        <p>この度、新たに5つの学生団体がUNIONに加盟いたしました。多様な分野で活動する団体が加わることで、より豊かなコミュニティを築いていきます。</p>
        
        <h3>新加盟団体一覧</h3>
        <ul>
          <li><strong>東京工業大学AI研究会：</strong>人工知能技術の研究と社会実装を目指す団体</li>
          <li><strong>一橋大学国際協力サークル：</strong>発展途上国支援活動を行う団体</li>
          <li><strong>筑波大学環境保護団体：</strong>持続可能な社会の実現を目指す環境活動団体</li>
          <li><strong>お茶の水女子大学起業サークル：</strong>女性起業家の育成を目指す団体</li>
          <li><strong>横浜国立大学ボランティア連合：</strong>地域密着型のボランティア活動を行う団体</li>
        </ul>
        
        <h3>今後の展開</h3>
        <p>新加盟団体の皆様には、UNIONの各種サービスをご利用いただけます：</p>
        <ul>
          <li>メディア出演機会の提供</li>
          <li>Slackコミュニティへの参加</li>
          <li>イベント告知支援</li>
          <li>1on1カウンセリング</li>
          <li>他団体との交流機会</li>
        </ul>
        
        <h3>コメント</h3>
        <p>UNION代表の三島大毅は「多様な分野で活動する優秀な学生団体が加わることで、UNIONコミュニティがさらに活性化することを期待しています。新加盟団体の皆様と共に、学生の声を社会に響かせていきたいと思います」とコメントしています。</p>
        
        <h3>お問い合わせ</h3>
        <p>新加盟団体に関するお問い合わせは、gakusei.union226@gmail.com までお気軽にご連絡ください。</p>
      `,
      date: "2025年1月15日",
      category: "お知らせ",
      author: "UNION運営事務局",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["加盟団体", "新メンバー", "コミュニティ", "学生団体"],
      views: 324,
    },
    {
      id: 2,
      title: "ユニラジ新シーズン開始のお知らせ",
      content: `
        <h2>ユニラジ新シーズンについて</h2>
        <p>人気ポッドキャスト番組「ユニラジ」の新シーズンが開始されました。今シーズンも多彩なゲストをお迎えして、学生の声をお届けします。</p>
        
        <h3>新シーズンの特徴</h3>
        <ul>
          <li><strong>より多様なゲスト：</strong>様々な分野で活躍する学生をゲストに迎えます</li>
          <li><strong>新コーナー追加：</strong>リスナーからの質問に答える新コーナーを開始</li>
          <li><strong>配信頻度向上：</strong>週1回から週2回配信に増加</li>
          <li><strong>ライブ配信：</strong>月1回のライブ配信を実施</li>
        </ul>
        
        <h3>配信スケジュール</h3>
        <p>新シーズンの配信スケジュールは以下の通りです：</p>
        <ul>
          <li>毎週火曜日：通常エピソード配信</li>
          <li>毎週金曜日：ショートエピソード配信</li>
          <li>毎月第3土曜日：ライブ配信（YouTube Live）</li>
        </ul>
        
        <h3>ゲスト出演について</h3>
        <p>ユニラジへのゲスト出演をご希望の方は、以下のフォームからお申し込みください。学生団体の活動や個人の挑戦について、ぜひお聞かせください。</p>
        
        <h3>視聴方法</h3>
        <p>ユニラジは以下のプラットフォームで配信しています：</p>
        <ul>
          <li>Spotify</li>
          <li>Apple Podcasts</li>
          <li>YouTube</li>
          <li>Google Podcasts</li>
        </ul>
      `,
      date: "2025年1月10日",
      category: "メディア",
      author: "ユニラジ制作チーム",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["ユニラジ", "ポッドキャスト", "新シーズン", "メディア"],
      views: 256,
    },
    {
      id: 3,
      title: "企業パートナーシップ拡大について",
      content: `
        <h2>パートナーシップ拡大の背景</h2>
        <p>UNIONの企業パートナーシップが拡大し、学生により多くの機会を提供できるようになりました。インターンシップやキャリア支援の充実を図ります。</p>
        
        <h3>新パートナー企業</h3>
        <p>今回新たに以下の企業様にパートナーとしてご参加いただきました：</p>
        <ul>
          <li><strong>株式会社テックイノベーション：</strong>AI・機械学習分野でのインターンシップ提供</li>
          <li><strong>グリーンエナジー株式会社：</strong>環境・エネルギー分野でのプロジェクト参加機会</li>
          <li><strong>株式会社クリエイティブソリューションズ：</strong>デザイン・マーケティング分野での実務経験</li>
          <li><strong>フューチャーファイナンス株式会社：</strong>金融・フィンテック分野でのキャリア支援</li>
        </ul>
        
        <h3>提供される機会</h3>
        <p>パートナー企業との連携により、以下の機会を学生に提供します：</p>
        <ul>
          <li>長期・短期インターンシップ</li>
          <li>業界セミナー・ワークショップ</li>
          <li>メンタリングプログラム</li>
          <li>キャリア相談会</li>
          <li>実際のプロジェクトへの参加</li>
        </ul>
        
        <h3>申込方法</h3>
        <p>各プログラムへの申込は、UNIONのSlackコミュニティまたは公式サイトから行えます。詳細な情報は随時更新いたします。</p>
        
        <h3>今後の展望</h3>
        <p>UNIONでは今後も企業パートナーシップの拡大を進め、学生により多様で質の高い機会を提供していきます。学生と企業をつなぐハブとしての役割を果たしていきたいと考えています。</p>
      `,
      date: "2025年1月5日",
      category: "パートナーシップ",
      author: "UNION事業開発チーム",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["パートナーシップ", "企業連携", "インターンシップ", "キャリア支援"],
      views: 189,
    },
    // 関連記事用に追加
    {
      id: 11,
      title: "学生団体合同イベント開催報告",
      content: `
        <h2>イベント開催報告</h2>
        <p>12月に開催された学生団体合同イベントの報告です。多くの学生が参加し、活発な交流が行われました。</p>
        
        <h3>イベント概要</h3>
        <p>12月15日に東京都内で開催された学生団体合同イベント「UNION FEST 2024」には、全国から30以上の学生団体と約500名の学生が参加しました。</p>
        
        <h3>主なプログラム</h3>
        <ul>
          <li><strong>基調講演：</strong>「Z世代が創る未来社会」</li>
          <li><strong>パネルディスカッション：</strong>「学生団体の社会的インパクト」</li>
          <li><strong>ワークショップ：</strong>「団体間コラボレーションの可能性」</li>
          <li><strong>交流会：</strong>学生団体同士のネットワーキング</li>
        </ul>
        
        <h3>参加者の声</h3>
        <p>「他大学の学生団体の活動を知ることができ、とても刺激になりました」（東京大学・3年）</p>
        <p>「同じ志を持つ仲間と出会えて、新しいプロジェクトのアイデアが生まれました」（早稲田大学・2年）</p>
        
        <h3>次回イベント</h3>
        <p>次回の合同イベントは2025年6月に開催予定です。詳細は決まり次第お知らせいたします。</p>
      `,
      date: "2024年12月20日",
      category: "イベント",
      author: "UNION運営事務局",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["イベント", "学生団体", "交流会", "報告"],
      views: 178,
    },
    {
      id: 12,
      title: "Slackコミュニティ参加者1000人突破",
      content: `
        <h2>Slackコミュニティ1000人達成</h2>
        <p>UNIONのSlackコミュニティの参加者が1000人を突破いたしました。学生同士の活発な交流に感謝いたします。</p>
        
        <h3>コミュニティの成長</h3>
        <p>2023年4月に開設したUNION Slackコミュニティは、1年半で1000人を超える参加者を迎えることができました。全国の大学から様々な分野の学生が集まり、日々活発な情報交換が行われています。</p>
        
        <h3>人気チャンネル</h3>
        <ul>
          <li><strong>#イベント告知：</strong>学生団体のイベント情報共有</li>
          <li><strong>#キャリア相談：</strong>就職・インターンに関する質問と回答</li>
          <li><strong>#プロジェクト募集：</strong>共同プロジェクトのメンバー募集</li>
          <li><strong>#技術相談：</strong>Web開発やデザインなどの技術的な質問</li>
        </ul>
        
        <h3>今後の展開</h3>
        <p>今後はより専門的なチャンネルの追加や、定期的なオンラインイベントの開催など、コミュニティの活性化を図っていきます。</p>
        
        <h3>参加方法</h3>
        <p>UNIONのSlackコミュニティは学生であれば誰でも参加できます。以下のリンクから参加申請が可能です。</p>
      `,
      date: "2024年12月15日",
      category: "コミュニティ",
      author: "UNION運営事務局",
      image: "/placeholder.svg?height=400&width=800",
      tags: ["Slack", "コミュニティ", "学生交流", "マイルストーン"],
      views: 203,
    },
  ]

  return newsItems.find((item) => item.id === Number.parseInt(id))
}

export default function NewsItemDetail({ params }: NewsItemDetailProps) {
  const item = getNewsItem(params.id)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* 戻るボタン */}
        <div className="mb-6">
          <Link
            href="/news"
            className="inline-flex items-center text-[#066ff2] hover:text-[#ec4faf] transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            ニュース一覧に戻る
          </Link>
        </div>

        {/* 記事ヘッダー */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
              {item.category}
            </span>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              {item.date}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <User className="h-4 w-4 mr-1" />
              {item.author}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  <Tag className="h-3 w-3 mr-1 inline" />#{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.views} views</span>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: item.title,
                      text: item.title,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert("URLをコピーしました")
                  }
                }}
                className="p-2 rounded-full bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200"
                title="シェア"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* メイン画像 */}
        <div className="aspect-video bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/30 dark:to-pink-900/30 rounded-2xl mb-8 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            記事画像
          </div>
        </div>

        {/* 記事本文 */}
        <article className="prose prose-lg max-w-none mb-12 dark:prose-invert">
          <div
            dangerouslySetInnerHTML={{ __html: item.content }}
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            style={{
              lineHeight: "1.8",
            }}
          />
        </article>

        {/* 記事フッター */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">お問い合わせ</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <User className="h-5 w-5 mr-2" />
                <span className="font-medium">{item.author}</span>
              </div>
              <a
                href="mailto:gakusei.union226@gmail.com"
                className="inline-flex items-center bg-[#066ff2] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                メールで問い合わせ
              </a>
            </div>
          </div>
        </footer>

        {/* 関連記事 */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">関連記事</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 関連記事のモックデータ */}
            {[11, 12].map((relatedId) => (
              <Link key={relatedId} href={`/news/${relatedId}`}>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg mb-4"></div>
                  <span className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-medium">
                    {relatedId === 11 ? "イベント" : "コミュニティ"}
                  </span>
                  <h4 className="font-semibold text-gray-900 dark:text-white mt-2 mb-2">
                    {relatedId === 11 ? "学生団体合同イベント開催報告" : "Slackコミュニティ参加者1000人突破"}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {relatedId === 11
                      ? "12月に開催された学生団体合同イベントの報告です。"
                      : "UNIONのSlackコミュニティの参加者が1000人を突破いたしました。"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
