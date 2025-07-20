import Header from "@/components/header"
import Footer from "@/components/footer"
import ModernHero from "@/components/modern-hero"

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ModernHero
        subtitle="Privacy Policy"
        title="プライバシーポリシー"
        description="学生団体連合UNIONにおける個人情報の取り扱いについて"
        backgroundPattern={false}
      />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 p-6 rounded-2xl mb-8">
            <p className="text-sm text-blue-700 mb-2">最終更新日：2025年1月6日</p>
            <p className="text-blue-700">
              学生団体連合UNION（以下「当団体」）は、ユーザーの個人情報の保護を重要視し、
              個人情報保護法を遵守して適切に取り扱います。
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. 個人情報の定義</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              本プライバシーポリシーにおいて「個人情報」とは、個人情報保護法第2条第1項に定義される個人情報、
              すなわち生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により
              特定の個人を識別することができるもの（他の情報と容易に照合することができ、
              それにより特定の個人を識別することができることとなるものを含む）を指します。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 収集する個人情報</h2>
            <p className="text-gray-700 leading-relaxed mb-4">当団体では、以下の個人情報を収集する場合があります：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>氏名、メールアドレス、電話番号</li>
              <li>所属大学・学年・学部</li>
              <li>学生団体名・役職</li>
              <li>お問い合わせ内容</li>
              <li>イベント参加履歴</li>
              <li>Webサイトの利用状況（Cookieを含む）</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. 個人情報の利用目的</h2>
            <p className="text-gray-700 leading-relaxed mb-4">収集した個人情報は、以下の目的で利用いたします：</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>サービスの提供・運営</li>
              <li>お問い合わせへの対応</li>
              <li>イベントの案内・運営</li>
              <li>メディア出演の調整</li>
              <li>統計データの作成（個人を特定できない形式）</li>
              <li>サービス改善のための分析</li>
              <li>重要なお知らせの配信</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 個人情報の第三者提供</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              当団体は、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません：
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
              <li>
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. 個人情報の管理</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              当団体は、個人情報の正確性を保ち、これを安全に管理いたします。
              個人情報への不正アクセス、紛失、破壊、改ざん、漏洩などを防ぐため、 必要かつ適切な安全管理措置を講じます。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Cookieについて</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              当団体のWebサイトでは、サービス向上のためCookieを使用する場合があります。
              Cookieの使用を希望されない場合は、ブラウザの設定でCookieを無効にすることができますが、
              一部のサービスが正常に機能しない可能性があります。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. 個人情報の開示・訂正・削除</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ユーザーは、当団体が保有する自己の個人情報について、開示、訂正、削除を求めることができます。
              ご希望の場合は、下記のお問い合わせ先までご連絡ください。
              本人確認を行った上で、合理的な期間内に対応いたします。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              当団体は、法令の変更や事業内容の変更等に伴い、本プライバシーポリシーを変更する場合があります。
              変更後のプライバシーポリシーは、当Webサイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. お問い合わせ</h2>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-gray-700 leading-relaxed mb-4">
                個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください：
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>学生団体連合UNION</strong>
                </p>
                <p>メール：gakusei.union226@gmail.com</p>
                <p>受付時間：平日 10:00-18:00（土日祝日除く）</p>
              </div>
            </div>
          </section>

          <div className="bg-blue-50 p-6 rounded-2xl">
            <p className="text-blue-700 text-sm">本プライバシーポリシーは、2025年1月6日より施行いたします。</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
