# UNION 公式サイト - 管理画面

## 🚀 運用開始手順

### 1. Supabase設定

#### 1.1 プロジェクト作成
1. [Supabase](https://supabase.com) にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトURLとAPIキーを取得

#### 1.2 環境変数設定
`.env.local` ファイルを作成し、以下を設定：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# その他の設定
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

#### 1.3 データベーススキーマ適用
1. SupabaseダッシュボードでSQLエディタを開く
2. `supabase/migrations/001_initial_schema.sql` の内容を実行

#### 1.4 Storage設定
1. Supabaseダッシュボードで「Storage」を開く
2. `media` バケットを作成
3. 以下のポリシーを設定：

```sql
-- 画像アップロード用ポリシー
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 画像表示用ポリシー
CREATE POLICY "Allow public viewing" ON storage.objects
FOR SELECT USING (true);
```

### 2. 初期管理者ユーザー作成

#### 2.1 認証設定
1. Supabaseダッシュボードで「Authentication」を開く
2. 「Settings」→「Auth Providers」でメール認証を有効化
3. 管理者用メールアドレスでサインアップ

#### 2.2 管理者権限付与
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

### 3. 開発環境起動

```bash
# 依存関係インストール
pnpm install

# 開発サーバー起動
pnpm dev
```

### 4. 本番環境デプロイ

#### 4.1 Vercel設定
1. [Vercel](https://vercel.com) でプロジェクトをインポート
2. 環境変数を設定
3. デプロイ実行

#### 4.2 ドメイン設定
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
- **フロントエンド**: Next.js 13, React, TypeScript
- **UI/UX**: Tailwind CSS, shadcn/ui
- **バックエンド**: Supabase (Database + Storage + Auth)
- **画像処理**: Supabase Storage
- **認証**: Supabase Auth

## 🚨 重要な注意事項

### セキュリティ
- 本番環境では強力なパスワードを使用
- 定期的なバックアップを実行
- アクセスログを監視

### パフォーマンス
- 画像は適切なサイズにリサイズ
- 大量データの場合はページネーション使用
- 定期的なデータベース最適化

### 運用
- 定期的なセキュリティアップデート
- バックアップの自動化
- 監視システムの導入

## 📞 サポート

問題が発生した場合は、以下を確認してください：

1. 環境変数の設定
2. Supabaseの接続状態
3. ブラウザのコンソールエラー
4. ネットワーク接続

## 🔄 更新履歴

- **v1.0.0**: 初期リリース
  - 基本CRUD機能
  - 画像アップロード
  - プレビュー機能
  - 一括操作
  - 通知システム
  - アクセス解析
  - バックアップ機能 