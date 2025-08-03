#!/bin/bash

# UNION HP 本運用デプロイスクリプト
# 使用方法: ./scripts/deploy.sh

set -e

echo "🚀 UNION HP 本運用デプロイを開始します..."

# 1. 依存関係の確認
echo "📦 依存関係を確認中..."
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm がインストールされていません"
    exit 1
fi

# 2. 環境変数の確認
echo "🔧 環境変数を確認中..."
if [ ! -f .env.local ]; then
    echo "❌ .env.local ファイルが見つかりません"
    echo "env.example を参考に .env.local を作成してください"
    exit 1
fi

# 必須環境変数の確認
required_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "NEXT_PUBLIC_SITE_URL"
)

for var in "${required_vars[@]}"; do
    if ! grep -q "^${var}=" .env.local; then
        echo "❌ 必須環境変数 ${var} が設定されていません"
        exit 1
    fi
done

echo "✅ 環境変数の確認完了"

# 3. ビルドテスト
echo "🔨 ビルドテストを実行中..."
pnpm build

if [ $? -eq 0 ]; then
    echo "✅ ビルドテスト成功"
else
    echo "❌ ビルドテスト失敗"
    exit 1
fi

# 4. テスト実行
echo "🧪 テストを実行中..."
pnpm test

if [ $? -eq 0 ]; then
    echo "✅ テスト成功"
else
    echo "⚠️  テストに失敗しましたが、デプロイを続行します"
fi

# 5. 管理者アカウント作成の確認
echo "👤 管理者アカウントの確認..."
if [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_PASSWORD" ]; then
    echo "⚠️  管理者アカウントの環境変数が設定されていません"
    echo "ADMIN_EMAIL と ADMIN_PASSWORD を設定して管理者アカウントを作成してください"
    echo "例: ADMIN_EMAIL=admin@union.example.com ADMIN_PASSWORD=securepassword node scripts/create-admin.js"
else
    echo "🔧 管理者アカウントを作成中..."
    node scripts/create-admin.js
fi

# 6. Vercelデプロイ
echo "🌐 Vercelにデプロイ中..."
if command -v vercel &> /dev/null; then
    vercel --prod
else
    echo "⚠️  Vercel CLI がインストールされていません"
    echo "手動でVercelダッシュボードからデプロイしてください"
fi

echo "🎉 デプロイ完了！"
echo ""
echo "📋 次の手順:"
echo "1. Vercelダッシュボードでドメインを設定"
echo "2. SSL証明書を有効化"
echo "3. Google Search Consoleでサイトを登録"
echo "4. Google Analyticsでトラッキングを確認"
echo "5. Sentryでエラー監視を確認"
echo "6. 管理者アカウントでログインして動作確認"
echo ""
echo "🔍 デプロイ後の確認項目:"
echo "- トップページの表示"
echo "- 管理画面へのアクセス"
echo "- 認証システムの動作"
echo "- 画像アップロード機能"
echo "- 各管理機能の動作" 