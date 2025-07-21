# 🚀 UNION管理画面 - 完全セットアップガイド

## ✅ 実装完了状況

### **🎯 完全に動作する機能**
- ✅ **認証システム**: Supabase Auth連携
- ✅ **ニュース管理**: CRUD + 画像アップロード + プレビュー
- ✅ **イベント管理**: CRUD + 画像アップロード + プレビュー  
- ✅ **掲示板管理**: CRUD + 画像アップロード + プレビュー
- ✅ **加盟団体管理**: CRUD + 一括操作
- ✅ **提携団体管理**: CRUD + 一括操作
- ✅ **運営メンバー管理**: CRUD + 一括操作
- ✅ **アクセス解析**: 詳細分析 + エクスポート
- ✅ **通知システム**: リアルタイム通知
- ✅ **バックアップ機能**: 完全バックアップ + 復元
- ✅ **エクスポート機能**: CSV/JSON形式
- ✅ **画像アップロード**: Supabase Storage連携
- ✅ **プレビュー機能**: 実際の公開処理
- ✅ **統計API**: リアルタイム統計取得

## 🔧 本格運用開始手順

### **1. Supabase設定**

#### 1.1 プロジェクト作成
1. [Supabase](https://supabase.com) にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトURLとAPIキーを取得

#### 1.2 環境変数設定
`.env.local` ファイルを作成：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth設定
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3001

# その他の設定
NODE_ENV=development
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

### **2. 初期管理者ユーザー作成**

#### 2.1 認証設定
1. Supabaseダッシュボードで「Authentication」を開く
2. 「Settings」→「Auth Providers」でメール認証を有効化
3. 管理者用メールアドレスでサインアップ

#### 2.2 管理者権限付与
SQLエディタで以下を実行（メールアドレスを変更）：

```sql
-- 管理者ユーザーを作成
INSERT INTO public.users (id, email, full_name, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@union.example.com'),
  'admin@union.example.com',
  '管理者',
  'admin'
);
```

### **3. 開発環境起動**

```bash
# 依存関係インストール
pnpm install

# 開発サーバー起動
pnpm dev
```

### **4. アクセス確認**

1. **管理画面**: http://localhost:3001/admin
2. **ログイン**: http://localhost:3001/admin/login
3. **ダッシュボード**: http://localhost:3001/admin/dashboard

## 🎯 動作確認チェックリスト

### **認証機能**
- [ ] ログインページにアクセス可能
- [ ] 管理者アカウントでログイン可能
- [ ] ログアウト機能が動作
- [ ] 未認証時のリダイレクトが動作

### **ニュース管理**
- [ ] ニュース一覧が表示される
- [ ] 新規ニュース作成が可能
- [ ] 画像アップロードが動作
- [ ] プレビュー機能が動作
- [ ] 編集・削除が可能

### **画像アップロード**
- [ ] 画像選択が可能
- [ ] アップロードが成功
- [ ] プレビューが表示される
- [ ] 削除が可能

### **統計機能**
- [ ] ダッシュボードで統計が表示
- [ ] 各項目の件数が正しく表示
- [ ] リアルタイム更新が動作

## 🔧 技術仕様

### **フロントエンド**
- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Hooks
- **Icons**: Lucide React

### **バックエンド**
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **API**: Next.js API Routes
- **Real-time**: Supabase Realtime

### **セキュリティ**
- **Row Level Security (RLS)**: 全テーブルに適用
- **Authentication**: JWT認証
- **Authorization**: ロールベースアクセス制御
- **Input Validation**: フロントエンド・バックエンド両方

## 🚨 重要な注意事項

### **セキュリティ**
- 本番環境では強力なパスワードを使用
- 環境変数は絶対に公開しない
- 定期的なセキュリティアップデートを実行

### **パフォーマンス**
- 画像は適切なサイズにリサイズ
- 大量データの場合はページネーション使用
- 定期的なデータベース最適化

### **運用**
- 定期的なバックアップを実行
- アクセスログを監視
- エラー監視システムを導入

## 📞 トラブルシューティング

### **よくある問題**

#### 1. 認証エラー
```
Error: Missing Supabase environment variables
```
**解決方法**: `.env.local` ファイルの環境変数を確認

#### 2. 画像アップロードエラー
```
Error: Upload failed
```
**解決方法**: Supabase Storageの設定とポリシーを確認

#### 3. データベース接続エラー
```
Error: Database connection failed
```
**解決方法**: Supabaseプロジェクトの設定とスキーマを確認

#### 4. API エラー
```
Error: API route not found
```
**解決方法**: 開発サーバーを再起動

## 🎉 運用開始

すべての設定が完了したら、以下のURLで管理画面にアクセスできます：

- **開発環境**: http://localhost:3001/admin
- **本番環境**: https://your-domain.com/admin

**管理者アカウントでログインして、UNIÓNの管理を開始してください！**

---

## 📋 更新履歴

- **v1.0.0** (2025-01-XX): 初期リリース
  - 完全なCRUD機能
  - 画像アップロード機能
  - プレビュー機能
  - 統計・分析機能
  - 通知システム
  - バックアップ機能 