import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Privacy Policy"
        title="プライバシーポリシー"
        description="学生団体連合UNIONにおける個人情報の取り扱いについて"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-4xl">
            <div className="union-card prose prose-sm max-w-none">
              <div className="bg-[#066ff2]/10 p-6 rounded-lg mb-8">
                <p className="union-body text-sm mb-2">最終更新日：2025年1月25日</p>
                <p className="union-body">
                  学生団体連合UNION（以下「当団体」）は、ユーザーの個人情報の保護を重要視し、
                  個人情報保護法を遵守して適切に取り扱います。
                </p>
              </div>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">1. 個人情報の定義</h2>
                <p className="union-body mb-4">
                  本プライバシーポリシーにおいて「個人情報」とは、個人情報保護法第2条第1項に定義される個人情報、
                  すなわち生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により
                  特定の個人を識別することができるもの（他の情報と容易に照合することができ、
                  それにより特定の個人を識別することができることとなるものを含む）を指します。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">2. 収集する個人情報</h2>
                <p className="union-body mb-4">当団体では、以下の個人情報を収集する場合があります：</p>
                <ul className="list-disc pl-6 space-y-2 union-body">
                  <li>氏名、メールアドレス、電話番号</li>
                  <li>所属大学・学年・学部</li>
                  <li>学生団体名・役職</li>
                  <li>お問い合わせ内容</li>
                  <li>イベント参加履歴</li>
                  <li>Webサイトの利用状況（Cookieを含む）</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">3. 個人情報の利用目的</h2>
                <p className="union-body mb-4">当団体は、収集した個人情報を以下の目的で利用します：</p>
                <ul className="list-disc pl-6 space-y-2 union-body">
                  <li>本サービスの提供・運営のため</li>
                  <li>ユーザーからのお問い合わせに対応するため</li>
                  <li>イベントの案内・管理のため</li>
                  <li>マッチングサービスの提供のため</li>
                  <li>メールマガジン・お知らせの配信のため</li>
                  <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">4. 個人情報の第三者提供</h2>
                <p className="union-body mb-4">
                  当団体は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。
                </p>
                <ul className="list-disc pl-6 space-y-2 union-body">
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体または財産の保護のために必要がある場合</li>
                  <li>マッチングサービスの提供において、企業とのマッチングのために必要な場合（ユーザーの同意を得た場合に限る）</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">5. 個人情報の開示・訂正・削除</h2>
                <p className="union-body mb-4">
                  ユーザーは、当団体に対して、個人情報の開示・訂正・削除を請求することができます。請求方法については、お問い合わせフォームからご連絡ください。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">6. Cookie（クッキー）について</h2>
                <p className="union-body mb-4">
                  本サービスは、Cookieを使用することがあります。Cookieは、ウェブサイトがユーザーのコンピュータに識別子を保存する仕組みです。
                  ユーザーは、ブラウザの設定によりCookieの受け入れを拒否することができます。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">7. お問い合わせ窓口</h2>
                <p className="union-body mb-4">
                  本プライバシーポリシーに関するお問い合わせは、以下までご連絡ください。
                </p>
                <div className="union-card bg-[var(--union-section-bg)]">
                  <p className="union-body">
                    学生団体連合UNION<br />
                    メールアドレス：gakusei.union226@gmail.com
                  </p>
                </div>
              </section>

              <div className="mt-8 pt-6 border-t border-[var(--union-border)]">
                <p className="union-body text-sm">
                  以上
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  )
}
