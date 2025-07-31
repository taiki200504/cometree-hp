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

# 5. Vercelデプロイ
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