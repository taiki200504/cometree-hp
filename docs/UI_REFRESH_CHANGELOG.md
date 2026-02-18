# 公開サイトUI刷新 - 変更点一覧

協会/会員制組織向けの「目的別導線・信頼要素・迷わないナビ」を軸に、見た目・情報設計・導線を改善しました。ルーティングと既存機能は維持しています。

---

## 1. 共通UI

### Header（`components/header.tsx`）
- **変更内容**
  - 右上に主CTAボタン「**参加する**」を追加（`/join` へのリンク）。デスクトップは `sm` 以上で表示、モバイルはドロワー上部に同じCTAを配置。
  - 既存のドロップダウンナビ（ホーム／学生向け／企業向け／コミュニティ／参加する／お知らせ／お問い合わせ）は維持。
- **ファイル**  
  `components/header.tsx`（修正）

### Footer（`components/footer.tsx`）
- **変更内容**
  - カテゴリ別リンクに再構成：**学生向け**・**企業向け**・**コミュニティ**・**参加する**・**お知らせ・お問い合わせ**・**UNIONについて**の6カテゴリ。各カテゴリ見出し＋リンク一覧。
  - 下部にロゴ・短文説明・SNSアイコンを1行で配置。
  - 法人情報エリア：©表記＋**プライバシーポリシー**（`/privacy`）・**ブランドガイドライン**（`/brand`）。
  - 管理者ログイン用リンクは従来どおりフッター内に控えめに配置。
- **ファイル**  
  `components/footer.tsx`（全面書き換え）

### デザインシステム
- 既存の `app/globals.css` 内の **UNION デザインシステム**（`--union-*`、`.union-section` / `.union-container` / `.union-heading-section` / `.union-card` / `.union-btn-primary` / `.union-btn-secondary` / `.union-link` など）をそのまま利用。
- タイポ・余白・カード・ボタンはこのシステムに合わせて統一。

---

## 2. トップページ（`/`）

### 構成
- **ヒーロー**  
  「学生×社会をつなぐ。」の一言価値＋短文説明＋メイン画像。  
  その直下に **目的別導線カード4つ**（学生／企業／団体／支援者）を配置し、それぞれ `/for-students`・`/services?tab=corporate`・`/join/organization`・`/join/donate` へ誘導。
- **セクションA（提供価値）**  
  3つの価値（つなぐ／信頼のプラットフォーム／共に成長する）をアイコン＋短文で表示。
- **セクションB（信頼の数字）**  
  既存の `StatsSection`（加盟団体数・メンバー数・提携企業数・メディア数）をそのまま使用。
- **セクションC（提携・支援者ロゴ）**  
  既存の `PartnerLogoCarousel` をそのまま使用（APIまたは仮データでロゴ表示）。
- **セクションD（お知らせ・イベント・メディア）**  
  新規コンポーネント `HomeNewsEventsMedia`。お知らせ（`/api/news`）・イベント・メディアの3カードで導線。假データ可。
- **セクションE（FAQ）**  
  新規コンポーネント `HomeFaq`。企業向け／学生向けのタブ切り替え＋アコーディオン（仮QA）。
- **最終CTA**  
  新規コンポーネント `HomeFinalCta`。  
  「参加する（学生・団体）」→`/join`、「相談する（企業）」→`/contact`、「加盟する（団体）」→`/join/organization`。

### 新規・修正ファイル
- `app/page.tsx` …… 上記構成で全面書き換え。
- `components/sections/SectionHeading.tsx` …… 新規（ラベル・見出し・説明の共通ブロック）。
- `components/sections/HomePurposeCards.tsx` …… 新規（4つの目的別カード）。
- `components/sections/HomeValueProps.tsx` …… 新規（価値3項目）。
- `components/sections/HomeFaq.tsx` …… 新規（FAQタブ＋アコーディオン）。
- `components/sections/HomeFinalCta.tsx` …… 新規（最終CTA 3本）。
- `components/sections/HomeNewsEventsMedia.tsx` …… 新規（お知らせ・イベント・メディアカード）。
- `components/sections/index.ts` …… 新規（セクションコンポーネントのエクスポート）。

---

## 3. 学生向けトップ（`/for-students`）

- **ヒーロー**  
  「登録学生には限定メリット」を伝える説明＋主CTA「コミュニティに参加」、副CTA「登録のメリット」→`/for-students/benefits`。
- **参加メリットの導線**  
  青背景の帯で「参加すると何が得られる？」＋「登録のメリットを見る」ボタン（`/for-students/benefits`）。
- **ユニメイト紹介カード**  
  1枚のカードでユニメイト（UNION Match）を説明し、`/for-students/unimate` へリンク。
- **活動事例（ユースケース）カード**  
  「仲間とつながる」「キャリアに触れる」「発信する」の3カードで、該当ページへ導線。
- **ナビカード**  
  既存リンク（ユニメイト／UNION紹介／イベント／学生向けサービス）をカード化。
- **CTA**  
  「コミュニティに参加する」→`/join`。

**ファイル**  
`app/for-students/page.tsx`（全面書き換え）

---

## 4. 企業向け（`/services?tab=corporate`）

- **ファーストビュー**  
  ModernHeroの説明文を「採用・広報・CSRなど企業のニーズに応じたプラン」を前面にした文言に変更。
- **企業タブ時のみ表示ブロック**  
  青系背景の短い説明＋「相談する（お問い合わせ）」CTA（`/contact`）をタブの直下に追加。
- **タブUI**  
  学生向け／企業向けの切り替えを、枠線をやや太く・パディングを増やして視認性を向上。フォーカスリング対応。
- 既存のサービスカード・料金の目安・CTAは維持。

**ファイル**  
`app/services/page.tsx`（修正）

---

## 5. コミュニティ（`/community`）

- **ヒーロー**  
  主CTA「加盟団体一覧」、副CTA「提携企業一覧」に変更（導線を明確化）。
- **レイアウト**  
  `union-container`・`union-section`・`union-card` で統一。
- **セクション構成**
  - 数字（加盟団体・参加学生・提携企業・都道府県）をカード表示。
  - **加盟団体一覧／提携企業一覧**を大きなカード2枚で説明＋リンク。
  - **参加の方法**：Slack・Discord・**加盟団体専用ポータル**を3カードで整理。Slackは「学生限定・無料」、ポータルは「加盟団体向け・申請承認後」と文言で用途を明示。
- **CTA**  
  加盟申請フォーム（外部）＋「企業の提携・協賛」→`/join/corporate`。

**ファイル**  
`app/community/page.tsx`（全面書き換え）

---

## 6. About（`/about`）

- **ラッパー・余白**  
  `pt-16`・`union-section`・`union-container` を適用し、他ページと余白・幅を統一。
- **ヒーロー**  
  description を「理念・組織概要・事業内容・支援者など、信頼の基盤となる情報をご紹介します」に変更。
- 既存の Purpose / Mission / Vision / Values / Culture / 主な事業 / 実績 / CTA のブロック構成とリンク先は変更せず、コンテナのみ共通化。

**ファイル**  
`app/about/page.tsx`（修正：ラッパー・ヒーロー文言のみ）

---

## 7. スタイル・アクセシビリティ

- **トーン**  
  クリーン・信頼感を優先。角丸は既存の `--union-radius` / `--union-radius-lg` を継続使用。
- **CTA**  
  主CTA（`union-btn-primary`）・副CTA（`union-btn-secondary`）の2階層で統一。
- **カード**  
  ニュース・イベント・メディア・加盟団体などは `union-card` で統一。
- **モバイル**  
  ヘッダーはハンバーガー＋主CTA「参加する」をドロワー内に固定。
- **アクセシビリティ**  
  既存のフォーカスリング（`focus-visible:ring-2` 等）を維持。ボタン・タブに `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--union-primary)]` を追加している箇所あり。

---

## 8. ルーティング・データ

- **ルーティング**  
  既存パスは一切変更していません（`/`・`/for-students`・`/services`・`/community`・`/join`・`/news`・`/contact`・`/about` およびフッター記載のサブパス）。
- **データ**  
  お知らせは既存 `/api/news` を使用。FAQ・イベント・メディア一覧などは仮データまたはAPI未実装の場合は空表示／文言のみでUIのみ完成。後から差し替え可能な構成にしています。

---

## 9. 受け入れ条件への対応

| 条件 | 対応内容 |
|------|----------|
| トップで「学生/企業/団体/支援者」の導線が押しやすい | ヒーロー直下に4つの目的別カードを配置し、各リンクを明確に設置。 |
| 信頼要素（数字/ロゴ/FAQ/組織情報）が分かる | 数字（StatsSection）、ロゴ（PartnerLogoCarousel）、FAQ（HomeFaq）、Aboutの理念・組織を維持・強調。 |
| ヘッダー/フッターが整理され迷わない | ヘッダーに主CTA「参加する」を追加。フッターを6カテゴリ＋法人・規約・SNSに整理。 |
| 主要ページの冒頭で価値が伝わる | 学生向け：メリット＋登録のメリット導線。企業向け：メリット＋相談CTA。コミュニティ：加盟／提携一覧の導線。About：信頼情報の紹介文言。 |

---

以上が今回のUI刷新における変更点一覧です。
