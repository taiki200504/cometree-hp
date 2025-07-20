"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"
import { Users, Briefcase, Target, Heart, Zap, CheckCircle, ArrowRight, Star } from "lucide-react"
import Link from "next/link"

export default function MatchingDetail() {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-[#066ff2]" />,
      title: "厳選された学生人材",
      description: "学生団体で実際に活動している、実践経験豊富な学生のみが登録",
    },
    {
      icon: <Heart className="h-8 w-8 text-[#ec4faf]" />,
      title: "マッチング精度の高さ",
      description: "企業の求める人材像と学生の希望を詳細にマッチング",
    },
    {
      icon: <Zap className="h-8 w-8 text-[#f59e0b]" />,
      title: "迅速な対応",
      description: "申し込みから面談まで、最短1週間で実現",
    },
  ]

  const services = [
    {
      title: "学生向けサービス",
      description: "学生団体で活動する学生のキャリア形成をサポート",
      features: [
        "企業との直接マッチング機会",
        "インターンシップ・就職支援",
        "キャリアアドバイザーによるサポート",
        "学生団体経験者限定の特典",
      ],
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "企業向けサービス",
      description: "優秀な学生人材との出会いを提供",
      features: [
        "学生団体経験者との直接マッチング",
        "企業ニーズに合わせた人材紹介",
        "インターンシップ・採用支援",
        "長期的な関係構築サポート",
      ],
      icon: <Briefcase className="h-6 w-6" />,
    },
  ]

  const stats = [
    { number: "500+", label: "登録学生", icon: <Users className="h-6 w-6" /> },
    { number: "100+", label: "提携企業", icon: <Briefcase className="h-6 w-6" /> },
    { number: "85%", label: "マッチング成功率", icon: <Target className="h-6 w-6" /> },
    { number: "1週間", label: "平均マッチング期間", icon: <Zap className="h-6 w-6" /> },
  ]

  const process = [
    {
      step: "1",
      title: "登録・プロフィール作成",
      description: "学生団体での活動経験や希望条件を詳細に登録",
    },
    {
      step: "2",
      title: "マッチング・提案",
      description: "AIと専門スタッフが最適なマッチングを提案",
    },
    {
      step: "3",
      title: "面談・調整",
      description: "企業との面談日程調整と事前準備をサポート",
    },
    {
      step: "4",
      title: "フォローアップ",
      description: "マッチング後の継続的なサポートと関係構築",
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Matching Business"
        title="マッチング事業"
        description="学生団体で活動する優秀な学生と企業をつなぎ、新しいキャリアの可能性を創造します"
        primaryAction={{
          text: "UNION Match",
          href: "https://union-match-lp.vercel.app/",
        }}
        secondaryAction={{
          text: "お問い合わせ",
          href: "/contact",
        }}
      />

      {/* 事業概要 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">事業概要</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              学生団体で活動する意欲的な学生と、優秀な人材を求める企業をつなぐマッチングプラットフォームです。
              従来の就活サイトでは出会えない、実践経験豊富な学生との出会いを提供します。
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 統計情報 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">マッチング事業の実績</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 100}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* サービス内容 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">サービス内容</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* マッチングプロセス */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">マッチングプロセス</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <AnimatedSection key={index} animation="fadeInUp" delay={index * 200}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* UNION Match 特別セクション */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-pink-50 dark:from-blue-900/20 dark:to-pink-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-lg border border-blue-100 dark:border-blue-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <AnimatedSection animation="fadeInLeft">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white text-sm font-medium mb-6">
                  <Star className="w-4 h-4 mr-2" />
                  注目サービス
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">UNION Match</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  学生と企業が繋がる、新しいマッチングプラットフォームです。学生団体で活動する意欲的な学生と、
                  優秀な人材を求める企業をつなぎます。従来の就活サイトでは出会えない、実践経験豊富な学生との出会いを提供します。
                </p>
                <a
                  href="https://union-match-lp.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-[#066ff2] to-[#ec4faf] text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  詳しく見る
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </AnimatedSection>
              <AnimatedSection animation="fadeInRight" delay={200}>
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-pink-100 dark:from-blue-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Briefcase className="h-24 w-24 text-[#066ff2] mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 font-medium">UNION Match</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">マッチングプラットフォーム</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-[#066ff2] to-[#ec4faf]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">新しいキャリアの可能性を見つけませんか？</h2>
            <p className="text-xl text-white/90 mb-8">
              学生団体での経験を活かした新しいキャリアの扉を開きましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://union-match-lp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#066ff2] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300"
              >
                UNION Match
              </a>
              <Link
                href="/contact"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors duration-300"
              >
                お問い合わせ
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  )
} 