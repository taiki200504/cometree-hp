# UNION 公式サイト - 管理画面

## 🚀 本運用開始手順

### 1. 環境準備

#### 1.1 依存関係インストール
```bash
pnpm install
```

#### 1.2 環境変数設定
`.env.local` ファイルを作成し、以下を設定：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Vercel設定
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# メール設定
RESEND_API_KEY=your_resend_api_key

# サイト設定
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id
NEXT_PUBLIC_GA4_PROPERTY_ID=your_ga4_property_id

# Google Search Console
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_site_verification

# Google Analytics Service Account
GOOGLE_APPLICATION_CREDENTIALS_JSON=your_service_account_json
```

### 2. Supabase設定

#### 2.1 プロジェクト作成
1. [Supabase](https://supabase.com) にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトURLとAPIキーを取得

#### 2.2 データベーススキーマ適用
1. SupabaseダッシュボードでSQLエディタを開く
2. `supabase/migrations/001_initial_schema.sql` の内容を実行
3. `supabase/migrations/002_board_posts_integration.sql` の内容を実行

#### 2.3 Storage設定
1. Supabaseダッシュボードで「Storage」を開く
2. `images` バケットを作成
3. 以下のポリシーを設定：

```sql
-- 画像アップロード用ポリシー
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 画像表示用ポリシー
CREATE POLICY "Allow public viewing" ON storage.objects
FOR SELECT USING (true);
```

### 3. 初期管理者ユーザー作成

#### 3.1 認証設定
1. Supabaseダッシュボードで「Authentication」を開く
2. 「Settings」→「Auth Providers」でメール認証を有効化
3. 管理者用メールアドレスでサインアップ

#### 3.2 管理者権限付与
SQLエディタで以下を実行：

```sql
-- 管理者ユーザーを作成（メールアドレスを変更）
INSERT INTO public.users (id, email, full_name, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@union.example.com'),
  'admin@union.example.com',
  '管理者',
  'admin'
);
```

### 4. 開発環境起動

```bash
# 開発サーバー起動
pnpm dev
```

### 5. 本番環境デプロイ

#### 5.1 自動デプロイ
```bash
# デプロイスクリプト実行
./scripts/deploy.sh
```

#### 5.2 手動デプロイ
1. [Vercel](https://vercel.com) でプロジェクトをインポート
2. 環境変数を設定
3. デプロイ実行

#### 5.3 ドメイン設定
1. カスタムドメインを設定
2. SSL証明書を有効化

## 📋 機能一覧

### ✅ 実装済み機能
- **ニュース管理**: CRUD + 画像アップロード + プレビュー
- **イベント管理**: CRUD + 画像アップロード + プレビュー
- **掲示板管理**: CRUD + 画像アップロード + プレビュー
- **加盟団体管理**: CRUD + 一括操作
- **提携団体管理**: CRUD + 一括操作
- **運営メンバー管理**: CRUD + 一括操作
- **アクセス解析**: 詳細分析 + エクスポート
- **通知システム**: リアルタイム通知
- **バックアップ機能**: 完全バックアップ + 復元
- **エクスポート機能**: CSV/JSON形式

### 🔧 技術スタック
- **フロントエンド**: Next.js 15, React 19, TypeScript
- **UI/UX**: Tailwind CSS, shadcn/ui
- **バックエンド**: Supabase (Database + Storage + Auth)
- **画像処理**: Supabase Storage
- **認証**: Supabase Auth
- **監視**: Sentry
- **分析**: Google Analytics 4

## 🚨 本運用時の注意事項

### セキュリティ
- 本番環境では強力なパスワードを使用
- 定期的なセキュリティアップデート
- アクセスログの監視
- 定期的なバックアップ実行

### パフォーマンス
- 画像は適切なサイズにリサイズ
- 大量データの場合はページネーション使用
- 定期的なデータベース最適化
- CDNの活用

### 運用
- 定期的なセキュリティアップデート
- バックアップの自動化
- 監視システムの導入
- エラーアラートの設定

## 📞 サポート

問題が発生した場合は、以下を確認してください：

1. 環境変数の設定
2. Supabaseの接続状態
3. ブラウザのコンソールエラー
4. ネットワーク接続
5. Sentryでのエラーログ

## 🔄 更新履歴

- **v1.0.0**: 本運用リリース
  - Next.js 15対応
  - パフォーマンス最適化
  - セキュリティ強化
  - 監視システム導入
  - 自動デプロイ対応 