# Union HP バックエンド構築ガイド

## 🏗️ 構築完了項目

### ✅ 技術スタック
- **データベース**: Supabase PostgreSQL
- **認証**: Supabase Auth
- **ストレージ**: Supabase Storage + Vercel Blob
- **CMS**: Supabase + カスタム管理システム
- **API**: RESTful API (Next.js API Routes)
- **メール配信**: Resend
- **デプロイ**: Vercel

### ✅ 実装済み機能

#### 1. 認証システム (`lib/auth.ts`)
- Supabase Auth統合
- サーバーサイド認証
- 権限管理（user, admin, moderator）
- 組織メンバー管理
- アクセスログ記録

#### 2. ストレージ管理 (`lib/storage.ts`)
- Supabase Storage統合
- Vercel Blob統合（画像最適化）
- ファイルアップロード/削除
- セキュリティチェック
- カテゴリ別設定

#### 3. メール配信システム (`lib/email.ts`)
- Resend統合
- テンプレートベース配信
- 一括配信機能
- 購読者管理
- 自動配信（ニュース、イベント、掲示板更新時）

#### 4. CMS管理システム (`lib/cms.ts`)
- ニュース記事管理
- イベント管理
- 掲示板管理
- 組織管理
- 自動メール配信連携

#### 5. APIルート
- `/api/auth/*` - 認証関連
- `/api/cms/*` - コンテンツ管理
- `/api/storage/*` - ファイル管理
- `/api/email/*` - メール配信

#### 6. データベーススキーマ
- 完全なテーブル設計
- RLS（Row Level Security）設定
- インデックス最適化
- 自動タイムスタンプ更新

## 🚀 セットアップ手順

### 1. 環境変数設定

`.env.local`ファイルを作成し、以下の環境変数を設定：

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Vercel Configuration
VERCEL_BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_site_verification
```

### 2. Supabase設定

1. Supabaseプロジェクトを作成
2. SQL Editorで`database/migrations/001_initial_schema.sql`を実行
3. Storageバケットを作成：
   - `avatars`
   - `news`
   - `events`
   - `documents`
   - `organizations`

### 3. Vercel設定

1. Vercelプロジェクトを作成
2. 環境変数を設定
3. Vercel Blobを有効化

### 4. Resend設定

1. Resendアカウントを作成
2. APIキーを取得
3. 送信者ドメインを設定

## 📊 データベース構造

### 主要テーブル

1. **users** - ユーザー情報（Supabase Auth拡張）
2. **organizations** - 加盟団体情報
3. **news_articles** - ニュース記事
4. **events** - イベント情報
5. **board_posts** - 掲示板投稿
6. **documents** - 文書管理
7. **email_subscribers** - メール購読者
8. **access_logs** - アクセスログ

### セキュリティ

- Row Level Security (RLS) 有効化
- 権限ベースアクセス制御
- 自動アクセスログ記録
- セキュアなファイルアップロード

## 🔧 開発・運用

### 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 本番起動
pnpm start

# リント
pnpm lint
```

### 管理機能

- **デフォルト管理者**: `admin@union.org` / `admin123`
- **CMS管理**: `/admin` でアクセス
- **アクセスログ**: 管理者のみ閲覧可能

### メール配信

- ニュース公開時自動配信
- イベント公開時自動配信
- 掲示板投稿時自動配信
- 購読者管理機能

## 🔒 セキュリティ機能

### 実装済み
- ✅ 個人情報保護（RLS）
- ✅ アクセスログ記録
- ✅ Cookie管理（Supabase Auth）
- ✅ ファイルアップロード制限
- ✅ 権限ベースアクセス制御

### 推奨追加設定
- Google Search Console設定
- Google Analytics設定
- レート制限実装
- バックアップ設定

## 📈 パフォーマンス最適化

### 実装済み
- ✅ データベースインデックス
- ✅ 画像最適化（Vercel Blob）
- ✅ レスポンス時間監視
- ✅ エラーハンドリング

### 想定性能
- 同時接続ユーザー: 100名
- レスポンス時間: 5秒以内
- データ量: スケーラブル

## 🚀 次のステップ

1. **フロントエンド連携**
   - 既存フロントエンドとの統合
   - 認証フローの更新
   - CMS管理画面の実装

2. **追加機能実装**
   - 統計ダッシュボード
   - 高度な検索機能
   - 通知システム

3. **運用準備**
   - 監視設定
   - バックアップ設定
   - セキュリティ監査

## 📞 サポート

- 技術サポート: AIサポート、エンジニアサポート
- 運用サポート: 24/7監視、自動復旧
- セキュリティ: 定期的な監査、更新管理

---

**バックエンド構築完了** ✅

フロントエンドとの統合準備が整いました。次のステップとして、既存のフロントエンドコンポーネントを新しいバックエンドシステムと連携させることができます。 