"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import { Download, Palette, Type, ImageIcon } from "lucide-react"
import Image from "next/image"

export default function Brand() {
  const handleLogoDownload = () => {
    // 複数のロゴファイルをダウンロード
    const logoFiles = [
      { name: "union-logo-main.png", url: "/images/header-logo.png" },
      { name: "union-logo-dark.png", url: "/images/logo-for-dark.png" },
      { name: "union-icon.png", url: "/images/logo.icon.png" },
      { name: "union-footer-logo.png", url: "/images/footer-logo.png" },
    ]

    logoFiles.forEach((file) => {
      const link = document.createElement("a")
      link.href = file.url
      link.download = file.name
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }

  const handleColorDownload = () => {
    // カラーパレット情報をテキストファイルとしてダウンロード
    const colorData = `UNION ブランドカラーパレット

プライマリカラー:
- UNION Blue: #066ff2 (RGB: 6, 111, 242)
- UNION Pink: #ec4faf (RGB: 236, 79, 175)

セカンダリカラー:
- Dark Gray: #111827 (RGB: 17, 24, 39)
- Light Gray: #f3f4f6 (RGB: 243, 244, 246)

使用ガイドライン:
- メインブランドカラーとしてUNION BlueとUNION Pinkを使用
- グラデーションは Blue → Pink の方向で使用
- 背景色にはLight Gray、テキストにはDark Grayを使用
- 十分なコントラスト比を確保してアクセシビリティに配慮`

    const blob = new Blob([colorData], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "union-color-palette.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Brand Guidelines"
        title="UNIONブランドガイドライン"
        description="学生団体連合UNIONのブランドアイデンティティとデザインガイドラインをご紹介します。"
      />

      {/* ブランドコンセプト */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">ブランドコンセプト</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              UNIONのブランドは「学生の声を社会に響かせる」というミッションを体現し、
              若者の挑戦と成長を支援する温かみのあるデザインを目指しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Palette className="h-10 w-10 text-[#066ff2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">信頼性</h3>
              <p className="text-gray-600 dark:text-gray-300">学生と企業をつなぐ架け橋として、信頼できるパートナーであることを表現</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Type className="h-10 w-10 text-[#ec4faf]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">革新性</h3>
              <p className="text-gray-600 dark:text-gray-300">新しいアイデアと挑戦を支援し、社会に変化をもたらす革新的な存在</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ImageIcon className="h-10 w-10 text-[#066ff2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">親しみやすさ</h3>
              <p className="text-gray-600 dark:text-gray-300">学生にとって身近で親しみやすく、気軽に参加できる温かみのある存在</p>
            </div>
          </div>
        </div>
      </section>

      {/* ロゴガイドライン */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">ロゴガイドライン</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">UNIONのロゴの正しい使用方法をご案内します</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">メインロゴ</h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 mb-6 flex items-center justify-center">
                <Image
                  src="/images/header-logo.png"
                  alt="UNIONメインロゴ"
                  width={200}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• ヘッダーやメイン使用に適用</li>
                <li>• 最小サイズ：幅120px</li>
                <li>• 周囲に十分な余白を確保</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">シンボルマーク</h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-8 mb-6 flex items-center justify-center">
                <Image
                  src="/images/logo.icon.png"
                  alt="UNIONシンボルマーク"
                  width={100}
                  height={100}
                  className="h-24 w-auto"
                />
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• SNSアイコンやファビコンに使用</li>
                <li>• 最小サイズ：32px × 32px</li>
                <li>• 単色での使用も可能</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* カラーパレット */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">カラーパレット</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">UNIONブランドの公式カラー</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-full h-32 bg-[#066ff2] rounded-2xl mb-4 shadow-lg"></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">UNION Blue</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">#066ff2</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">RGB(6, 111, 242)</p>
            </div>
            <div className="text-center">
              <div className="w-full h-32 bg-[#ec4faf] rounded-2xl mb-4 shadow-lg"></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">UNION Pink</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">#ec4faf</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">RGB(236, 79, 175)</p>
            </div>
            <div className="text-center">
              <div className="w-full h-32 bg-gray-900 rounded-2xl mb-4 shadow-lg"></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Dark Gray</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">#111827</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">RGB(17, 24, 39)</p>
            </div>
            <div className="text-center">
              <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-4 shadow-lg border border-gray-200 dark:border-gray-600"></div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Light Gray</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">#f3f4f6</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">RGB(243, 244, 246)</p>
            </div>
          </div>
        </div>
      </section>

      {/* タイポグラフィ */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">タイポグラフィ</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">UNIONで使用するフォントファミリー</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">英語フォント</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Primary: Inter</p>
                  <p className="text-3xl font-bold" style={{ fontFamily: "Inter" }}>
                    UNION
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">見出し・本文に使用</p>
                  <p className="text-lg" style={{ fontFamily: "Inter" }}>
                    学生の声を社会に響かせる
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">日本語フォント</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Primary: Hiragino Sans / Noto Sans JP</p>
                  <p className="text-3xl font-bold">学生団体連合</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">見出し・本文に使用</p>
                  <p className="text-lg">学生の挑戦を支援し、社会との架け橋となります</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 使用例 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">使用例</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">ブランドガイドラインに沿った使用例</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">✅ 正しい使用例</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• ロゴの周囲に十分な余白を確保</li>
                <li>• 指定されたカラーパレットを使用</li>
                <li>• 最小サイズを守る</li>
                <li>• 背景とのコントラストを確保</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">❌ 避けるべき使用例</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• ロゴの変形や回転</li>
                <li>• 指定外の色での使用</li>
                <li>• 最小サイズ以下での使用</li>
                <li>• 読みにくい背景での使用</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ダウンロード */}
      <section className="py-24 bg-gradient-to-br from-[#066ff2] to-[#ec4faf]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">ブランドアセットのダウンロード</h2>
          <p className="text-xl text-white/90 mb-12">UNIONのロゴやブランドアセットをダウンロードしてご利用ください</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Download className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">ロゴパック</h3>
              <p className="text-white/90 mb-6">PNGフォーマットのロゴファイル</p>
              <button
                onClick={handleLogoDownload}
                className="bg-white text-[#066ff2] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                ダウンロード
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Palette className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">カラーパレット</h3>
              <p className="text-white/90 mb-6">ブランドカラーサンプル</p>
              <button
                onClick={handleColorDownload}
                className="bg-white text-[#ec4faf] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                ダウンロード
              </button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <p className="text-white/90 text-sm">
              ブランドアセットの使用に関してご質問がございましたら、
              <a href="mailto:gakusei.union226@gmail.com" className="text-white underline hover:no-underline">
                gakusei.union226@gmail.com
              </a>
              までお気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
