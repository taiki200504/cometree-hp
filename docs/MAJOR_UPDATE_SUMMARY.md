# HP大幅修正・変更 - 実施内容サマリー

新しいサイトマップ計画に基づいて、HPを大幅に修正・変更しました。

---

## 実施内容

### 1. リダイレクト設定

以下の古いページを新しいサイトマップにリダイレクト：

- ✅ `/services` → `/for-corporate` または `/for-students`（タブパラメータに応じて）
- ✅ `/join` → `/for-students`
- ✅ `/for-students/benefits` → `/for-students`（UNIMATEとUNIONの両方を選択できる）

### 2. ヘッダー・フッターの更新

- ✅ **Header**: 「参加する」ボタンのリンクを `/join` → `/for-students` に更新
- ✅ **Footer**: 新しいサイトマップ構造に合わせてリンクを更新

### 3. ページの更新

- ✅ `/contact` - デザインシステムを適用し、学生向けと法人向けの導線を明確化
- ✅ `/about` - 古いリンク（`/join`）を `/for-students` に更新
- ✅ `/about/initiatives` - 古いリンク（`/services`、`/join`、`/community`）を新しいページに更新

### 4. コンポーネントの更新

- ✅ **HomePurposeCards**: 目的別カードのリンクを新しいサイトマップに更新
- ✅ **HomeFinalCta**: 最終CTAのリンクを新しいサイトマップに更新
- ✅ **HomeFaq**: タブラベルを「企業向け」→「法人向け」に更新

---

## 新しいサイトマップ構造

```
/
├── /                          トップ
├── /for-students              学生向けトップ
│   ├── /for-students/unimate                 UNIMATEサービス紹介（個人）
│   │   ├── /for-students/unimate/benefits    登録学生のメリット
│   │   └── /for-students/unimate/join        学生登録
│   ├── /for-students/union                   UNIONサービス紹介（団体）
│   │   ├── /for-students/union/benefits      登録団体のメリット
│   │   └── /for-students/union/join          団体登録
│   └── /for-students/faq                     学生向けFAQ
├── /for-corporate              法人向けトップ
│   ├── /for-corporate/service                 法人向けサービス紹介
│   ├── /for-corporate/benefits                法人のメリット
│   ├── /for-corporate/plan                    プラン
│   ├── /for-corporate/case                    事例
│   ├── /for-corporate/flow                    導入フロー
│   ├── /for-corporate/projects                案件募集
│   ├── /for-corporate/events                  イベント連携
│   ├── /for-corporate/contact                 相談・お問い合わせ
│   └── /for-corporate/faq                     法人向けFAQ
├── /events                      UNION主催イベント
├── /media                       メディア「ワカモノ」
├── /about                       運営会社について
├── /contact                     お問い合わせ（汎用）
├── /login                       ログイン
├── /terms                       利用規約
└── /privacy                     プライバシーポリシー
```

---

## リダイレクト設定

以下のページは自動的に新しいページにリダイレクトされます：

- `/services` → `/for-corporate` または `/for-students`
- `/join` → `/for-students`
- `/for-students/benefits` → `/for-students`

---

## デザイン・トンマナ統一

すべてのページで以下を統一：

- ✅ UNIONデザインシステム（`union-section`、`union-container`、`union-card` など）
- ✅ `ModernHero` コンポーネント（`variant="minimal"`）
- ✅ カラーパレット（`#066ff2`、`#ec4faf`）
- ✅ タイポグラフィ・余白・カードスタイル

---

## 注意事項

- **既存ページ**: `/community`、`/board` などのページは新しいサイトマップには含まれていませんが、削除はしていません。必要に応じてリダイレクトを設定してください。
- **リンク更新**: 一部のページ（特に `/about` 配下のサブページ）で古いリンクが残っている可能性があります。必要に応じて確認・更新してください。
- **データ**: FAQ、事例、テンプレートなどは仮データでUIを完成させています。後からAPIやCMSに差し替え可能です。

---

以上がHP大幅修正・変更の実施内容です。
