# 新しいサイトマップ実装 - 変更点一覧

新しいサイトマップ構造に基づいて、ページの作成・更新・ナビゲーションの変更を実施しました。

---

## 1. 新しいサイトマップ構造

```
/
├── /                          トップ
├── /for-students              学生向けトップ
│   ├── /for-students/unimate                 UNIMATEサービス紹介（個人）
│   │   ├── /for-students/unimate/benefits    登録学生のメリット
│   │   └── /for-students/unimate/join        学生登録（ログイン/登録導線）
│   ├── /for-students/union                   UNIONサービス紹介（団体）
│   │   ├── /for-students/union/benefits      登録団体のメリット
│   │   └── /for-students/union/join          団体登録（ログイン/登録導線）
│   └── /for-students/faq                     学生向けFAQ
├── /for-corporate              法人向けトップ（ログインなし）
│   ├── /for-corporate/service                 法人向けサービス紹介
│   ├── /for-corporate/benefits                法人のメリット
│   ├── /for-corporate/plan                    プラン
│   ├── /for-corporate/case                    事例
│   ├── /for-corporate/flow                    導入フロー
│   ├── /for-corporate/projects                案件募集
│   │   ├── /for-corporate/projects/templates  募集テンプレ集
│   │   ├── /for-corporate/projects/submit     案件掲載申請フォーム
│   │   └── /for-corporate/projects/guide      募集の作り方ガイド
│   ├── /for-corporate/events                  イベント連携
│   │   ├── /for-corporate/events/menu         共同開催メニュー
│   │   ├── /for-corporate/events/submit       イベント申請フォーム
│   │   └── /for-corporate/events/guide        企画の作り方ガイド
│   ├── /for-corporate/contact                 相談/問い合わせ（商談予約）
│   └── /for-corporate/faq                     法人向けFAQ
├── /events                      UNION主催イベント（公開）
├── /media                       メディア「ワカモノ」
├── /about                       運営会社について（理念・組織概要）
├── /login                       ログイン
├── /terms                       利用規約
└── /privacy                     プライバシーポリシー
```

---

## 2. 新規作成ページ

### `/for-students` 配下
- ✅ `app/for-students/page.tsx` - 学生向けトップ（UNIMATEとUNIONの両方を紹介）
- ✅ `app/for-students/unimate/page.tsx` - UNIMATEサービス紹介（個人）
- ✅ `app/for-students/unimate/benefits/page.tsx` - 登録学生のメリット
- ✅ `app/for-students/unimate/join/page.tsx` - 学生登録
- ✅ `app/for-students/union/page.tsx` - UNIONサービス紹介（団体）
- ✅ `app/for-students/union/benefits/page.tsx` - 登録団体のメリット
- ✅ `app/for-students/union/join/page.tsx` - 団体登録
- ✅ `app/for-students/faq/page.tsx` - 学生向けFAQ

### `/for-corporate` 配下
- ✅ `app/for-corporate/page.tsx` - 法人向けトップ
- ✅ `app/for-corporate/service/page.tsx` - 法人向けサービス紹介
- ✅ `app/for-corporate/benefits/page.tsx` - 法人のメリット
- ✅ `app/for-corporate/plan/page.tsx` - プラン
- ✅ `app/for-corporate/case/page.tsx` - 事例
- ✅ `app/for-corporate/flow/page.tsx` - 導入フロー
- ✅ `app/for-corporate/projects/page.tsx` - 案件募集一覧
- ✅ `app/for-corporate/projects/templates/page.tsx` - 募集テンプレート集
- ✅ `app/for-corporate/projects/submit/page.tsx` - 案件掲載申請フォーム
- ✅ `app/for-corporate/projects/guide/page.tsx` - 募集の作り方ガイド
- ✅ `app/for-corporate/events/page.tsx` - イベント連携
- ✅ `app/for-corporate/events/menu/page.tsx` - 共同開催メニュー
- ✅ `app/for-corporate/events/submit/page.tsx` - イベント申請フォーム
- ✅ `app/for-corporate/events/guide/page.tsx` - 企画の作り方ガイド
- ✅ `app/for-corporate/contact/page.tsx` - 相談・お問い合わせ
- ✅ `app/for-corporate/faq/page.tsx` - 法人向けFAQ

### その他
- ✅ `app/login/page.tsx` - ログイン（`/auth/login` の内容を `/login` に移植）
- ✅ `app/terms/page.tsx` - 利用規約（新規作成）
- ✅ `app/privacy/page.tsx` - プライバシーポリシー（デザインシステムに合わせて更新）

---

## 3. 更新ページ

### 既存ページの更新
- ✅ `app/events/page.tsx` - タイトルを「UNION主催イベント」に変更、デザインシステム適用
- ✅ `app/media/page.tsx` - タイトルを「メディア「ワカモノ」」に変更、デザインシステム適用
- ✅ `app/about/page.tsx` - タイトルを「運営会社について」に変更

### コンポーネントの更新
- ✅ `components/sections/HomePurposeCards.tsx` - 目的別カードのリンク先を更新（学生→`/for-students`、法人→`/for-corporate`、団体→`/for-students/union`）
- ✅ `components/sections/HomeFinalCta.tsx` - 最終CTAのリンク先を更新（学生→`/for-students/unimate/join`、法人→`/for-corporate/contact`、団体→`/for-students/union/join`）

---

## 4. ナビゲーション更新

### Header（`components/header.tsx`）
- **変更内容**
  - 「学生向け」ドロップダウン：学生向けトップ、UNIMATE（個人）、UNION（団体）、よくある質問
  - 「企業向け」→「法人向け」に変更し、ドロップダウンを法人向けトップ、サービス紹介、メリット、プラン、導入フロー、案件募集、イベント連携、相談・お問い合わせ、よくある質問に更新
  - 「コミュニティ」「参加する」を削除（新しいサイトマップには含まれない）
  - 「イベント」「メディア」「運営会社」を追加

### Footer（`components/footer.tsx`）
- **変更内容**
  - カテゴリを4つに再構成：
    - **学生向け**：学生向けトップ、UNIMATE（個人）、UNION（団体）、よくある質問
    - **法人向け**：法人向けトップ、サービス紹介、法人のメリット、プラン、相談・お問い合わせ
    - **その他**：UNION主催イベント、メディア「ワカモノ」、運営会社について
    - **規約・ポリシー**：利用規約、プライバシーポリシー

---

## 5. デザイン・トンマナ統一

- すべての新規・更新ページで **UNIONデザインシステム**（`union-section`、`union-container`、`union-card`、`union-btn-primary`、`union-heading-section` など）を適用
- `ModernHero` コンポーネントを統一使用（`variant="minimal"` で統一感を確保）
- カラーは既存の `#066ff2`（青）と `#ec4faf`（ピンク）を維持
- タイポグラフィ・余白・カードスタイルを統一

---

## 6. 残すべきキャッチコピー・要素

以下のキャッチコピーや要素は既存ページから維持・継承しています：

- **トップページ**：「学生×社会をつなぐ。」「学生も企業も、ここなら信頼できる。」
- **Aboutページ**：「学生から熱狂を生み出せる世界を作る」「学生の声を社会に響かせる」
- **メディア**：「学生の声を社会に届ける」というメッセージ
- **信頼要素**：数字KPI（StatsSection）、提携企業ロゴ（PartnerLogoCarousel）、FAQ

---

## 7. 注意事項

- **ルーティング**：既存の `/services`、`/community`、`/join` などのページは削除していませんが、ヘッダー・フッターからは新しいサイトマップに合わせてリンクを更新しています。必要に応じてリダイレクトを設定するか、既存ページを新しい構造に移行してください。
- **データ**：FAQ、事例、テンプレートなどは仮データでUIを完成させています。後からAPIやCMSに差し替え可能です。
- **フォーム**：案件掲載申請・イベント申請は外部フォーム（Googleフォーム）へのリンクまたはお問い合わせフォームへの導線を設置しています。

---

以上が新しいサイトマップ実装における変更点一覧です。
