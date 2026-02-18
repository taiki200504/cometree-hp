import Header from "@/components/header"
import Footer from "@/components/footer"
import { ModernHero } from "@/components/modern-hero"
import AnimatedSection from "@/components/animated-section"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--union-section-alt)] dark:bg-gray-900 pt-16">
      <Header />
      <ModernHero
        subtitle="Terms of Service"
        title="利用規約"
        description="学生団体連合UNIONのサービス利用規約です。"
        variant="minimal"
      />

      <AnimatedSection>
        <section className="union-section bg-[var(--union-section-bg)]">
          <div className="union-container max-w-4xl">
            <div className="union-card prose prose-sm max-w-none">
              <div className="bg-[#066ff2]/10 p-6 rounded-lg mb-8">
                <p className="union-body text-sm mb-2">最終更新日：2025年1月25日</p>
                <p className="union-body">
                  学生団体連合UNION（以下「当団体」）は、本ウェブサイトおよび提供するサービス（以下「本サービス」）の利用規約を以下のとおり定めます。
                </p>
              </div>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第1条（適用）</h2>
                <p className="union-body mb-4">
                  本規約は、当団体が提供する本サービスの利用条件を定めるものです。登録ユーザーの皆さま（以下「ユーザー」）には、本規約に従って、本サービスをご利用いただきます。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第2条（利用登録）</h2>
                <p className="union-body mb-4">
                  本サービスの利用を希望する者は、当団体の定める方法によって利用登録を申請し、当団体がこれを承認することによって、利用登録が完了するものとします。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第3条（ユーザーIDおよびパスワードの管理）</h2>
                <p className="union-body mb-4">
                  ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第4条（利用料金および支払方法）</h2>
                <p className="union-body mb-4">
                  本サービスの利用料金は、当団体が別途定め、本ウェブサイトに表示するとおりとします。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第5条（禁止事項）</h2>
                <p className="union-body mb-4">ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
                <ul className="list-disc pl-6 space-y-2 union-body">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為</li>
                  <li>当団体、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                  <li>本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                  <li>その他、当団体が不適切と判断する行為</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第6条（本サービスの提供の停止等）</h2>
                <p className="union-body mb-4">
                  当団体は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                </p>
                <ul className="list-disc pl-6 space-y-2 union-body">
                  <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                  <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                  <li>その他、当団体が本サービスの提供が困難と判断した場合</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第7条（保証の否認および免責）</h2>
                <p className="union-body mb-4">
                  当団体は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第8条（サービス内容の変更等）</h2>
                <p className="union-body mb-4">
                  当団体は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第9条（利用規約の変更）</h2>
                <p className="union-body mb-4">
                  当団体は以下の場合には、ユーザーの個別の同意なく、本規約を変更することができるものとします。
                </p>
                <ul className="list-disc pl-6 space-y-2 union-body">
                  <li>本規約の変更がユーザーの一般の利益に適合するとき</li>
                  <li>本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第10条（個人情報の取扱い）</h2>
                <p className="union-body mb-4">
                  当団体は、本サービスの利用によって取得する個人情報については、当団体「プライバシーポリシー」に従い適切に取り扱うものとします。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第11条（通知または連絡）</h2>
                <p className="union-body mb-4">
                  ユーザーと当団体との間の通知または連絡は、当団体の定める方法によって行うものとします。当団体は、ユーザーから、当団体が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第12条（権利義務の譲渡の禁止）</h2>
                <p className="union-body mb-4">
                  ユーザーは、当団体の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
                </p>
              </section>

              <section className="mb-8">
                <h2 className="union-heading-section text-xl mb-4">第13条（準拠法・裁判管轄）</h2>
                <p className="union-body mb-4">
                  本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当団体の本店所在地を管轄する裁判所を専属的合意管轄とします。
                </p>
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
