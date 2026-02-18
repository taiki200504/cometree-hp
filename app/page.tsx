"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import StatsSection from "@/components/stats-section"
import { PartnerLogoCarousel } from "@/components/partner-logo-carousel"
import AnimatedSection from "@/components/animated-section"
import { SectionHeading } from "@/components/sections/SectionHeading"
import { HomePurposeCards } from "@/components/sections/HomePurposeCards"
import { HomeValueProps } from "@/components/sections/HomeValueProps"
import { HomeFaq } from "@/components/sections/HomeFaq"
import { HomeFinalCta } from "@/components/sections/HomeFinalCta"
import { HomeNewsEventsMedia } from "@/components/sections/HomeNewsEventsMedia"
import NextImage from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />

      {/* ヒーロー：一言価値 + 目的別導線カード（学生/企業/団体/支援者） */}
      <section className="relative overflow-hidden bg-[var(--union-section-bg)] border-b border-[var(--union-border)]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--union-section-bg)_0%,transparent_60%),linear-gradient(90deg,rgba(6,111,242,0.04)_0%,transparent_50%)] pointer-events-none" />
        <div className="union-container relative pt-14 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <p className="union-label mb-3">学生団体連合UNION</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.5rem] xl:text-5xl font-bold text-[var(--union-text)] leading-[1.25] tracking-tight mb-5">
                学生×社会を
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#066ff2] to-[#ec4faf] bg-clip-text text-transparent">つなぐ。</span>
              </h1>
              <p className="union-body-lg max-w-lg mx-auto lg:mx-0">
                全国の学生団体と学生をつなぎ、企業・行政とマッチングするプラットフォーム。学生も企業も、ここなら信頼できる。
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl ring-1 ring-[var(--union-border)]">
                <NextImage
                  src="/images/top-page-slide-1.png"
                  alt="学生団体連合UNION"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-br from-[#066ff2]/10 to-[#ec4faf]/10 blur-2xl" />
            </div>
          </div>
          <HomePurposeCards />
        </div>
      </section>

      {/* セクションA：UNIONが提供する価値（3つ） */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-alt)] border-y border-[var(--union-border)]">
          <div className="union-container">
            <SectionHeading
              label="Value"
              title="UNIONが提供する価値"
              description="学生と社会をつなぎ、信頼と成長を支えます。"
            />
            <HomeValueProps />
          </div>
        </section>
      </AnimatedSection>

      {/* セクションB：数字で見る（信頼KPI） */}
      <AnimatedSection>
        <StatsSection />
      </AnimatedSection>

      {/* セクションC：提携企業・支援者ロゴ */}
      <PartnerLogoCarousel />

      {/* セクションD：お知らせ・イベント・メディア */}
      <AnimatedSection>
        <HomeNewsEventsMedia />
      </AnimatedSection>

      {/* セクションE：よくある質問 */}
      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container">
            <SectionHeading
              label="FAQ"
              title="よくある質問"
              description="学生向け・法人向けに分けてお答えします。"
            />
            <HomeFaq />
          </div>
        </section>
      </AnimatedSection>

      {/* 最終CTA：学生「参加する」企業「相談する」団体「加盟する」 */}
      <AnimatedSection>
        <HomeFinalCta />
      </AnimatedSection>

      <Footer />
    </div>
  )
}
