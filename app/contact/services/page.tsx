import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { FileText, Users, Calendar, Mic, Building, Award, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: <Mic className="h-8 w-8" />,
      title: "ポッドキャスト出演",
      description: "学生団体の活動や代表者をポッドキャストで紹介",
      features: ["活動内容の詳細紹介", "代表者インタビュー", "全国への情報発信", "録音・編集サポート"],
      price: "無料",
      duration: "60分程度",
      applicationUrl: "/contact/services/podcast",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "イベント共催・後援",
      description: "学生団体主催イベントの共催・後援サポート",
      features: ["イベント企画サポート", "広報・宣伝支援", "参加者募集支援", "運営ノウハウ提供"],
      price: "要相談",
      duration: "イベントによる",
      applicationUrl: "/contact/services/event",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "記事掲載・取材",
      description: "学生団体ニュースでの記事掲載・取材",
      features: ["活動記事の執筆・掲載", "インタビュー記事作成", "写真撮影サポート", "SNSでの拡散支援"],
      price: "無料",
      duration: "取材1-2時間",
      applicationUrl: "/contact/services/article",
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "企業連携サポート",
      description: "学生団体と企業のマッチング・連携支援",
      features: ["企業とのマッチング", "提案書作成支援", "交渉サポート", "契約書類の確認"],
      price: "成果報酬制",
      duration: "1-3ヶ月",
      applicationUrl: "/contact/services/corporate",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "研修・ワークショップ",
      description: "学生団体向けの研修・ワークショップ開催",
      features: ["リーダーシップ研修", "組織運営ワークショップ", "資金調達セミナー", "プレゼンテーション研修"],
      price: "1回3万円〜",
      duration: "2-4時間",
      applicationUrl: "/contact/services/training",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "コンサルティング",
      description: "学生団体の組織運営・事業開発コンサルティング",
      features: ["組織診断・改善提案", "事業計画策定支援", "マーケティング戦略", "継続的なメンタリング"],
      price: "月額5万円〜",
      duration: "3-6ヶ月",
      applicationUrl: "/contact/services/consulting",
    },
  ]

  const applicationProcess = [
    {
      step: "1",
      title: "サービス選択",
      description: "ご希望のサービスを選択し、申込フォームにアクセス",
    },
    {
      step: "2",
      title: "申込フォーム記入",
      description: "必要事項を記入し、申込フォームを送信",
    },
    {
      step: "3",
      title: "内容確認・調整",
      description: "担当者より連絡し、詳細内容を確認・調整",
    },
    {
      step: "4",
      title: "サービス実施",
      description: "スケジュール調整後、サービスを実施",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main className="pt-16">
        <PageHeader
          title="提供サービス申し込み一覧"
          description="学生団体連合UNIONが提供する各種サービスの申し込みページです"
          breadcrumbs={[
            { label: "ホーム", href: "/" },
            { label: "お問い合わせ", href: "/contact" },
            { label: "提供サービス申し込み一覧", href: "/contact/services" },
          ]}
        />

        {/* サービス一覧 */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">提供サービス</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                学生団体の皆様にご利用いただける各種サービスをご紹介します
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <AnimatedSection key={index}>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="text-[#066ff2] mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">サービス内容：</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                            <div className="w-1.5 h-1.5 bg-[#066ff2] rounded-full mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">料金：</span>
                        <span className="text-sm font-bold text-[#066ff2]">{service.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">所要時間：</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{service.duration}</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={service.applicationUrl}
                        className="w-full bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center justify-center"
                      >
                        申し込む
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 申込プロセス */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">申込プロセス</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">サービス申込から実施までの流れ</p>
            </AnimatedSection>

            <div className="space-y-8">
              {applicationProcess.map((process, index) => (
                <AnimatedSection key={index}>
                  <div className="flex items-start bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white rounded-full flex items-center justify-center text-xl font-bold mr-6 flex-shrink-0">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{process.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{process.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* 注意事項 */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">ご利用にあたっての注意事項</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    サービスの提供は、学生団体連合UNION加盟団体を優先いたします
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    申込内容によっては、お断りする場合がございます
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    料金が発生するサービスは、事前にお見積もりをご提示いたします
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                    スケジュールの都合により、ご希望に添えない場合がございます
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* お問い合わせ */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">ご不明な点がございましたら</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                サービスに関するご質問やご相談がございましたら、 お気軽にお問い合わせください。
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
      </main>

      <Footer />
    </div>
  )
}
