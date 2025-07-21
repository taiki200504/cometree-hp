#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🚀 UNION管理画面セットアップ開始...\n')

// 環境変数ファイルの作成
const envContent = `# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth設定
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# その他の設定
NODE_ENV=development
`

const envPath = path.join(process.cwd(), '.env.local')

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent)
  console.log('✅ .env.local ファイルを作成しました')
  console.log('⚠️  環境変数を実際の値に設定してください\n')
} else {
  console.log('ℹ️  .env.local ファイルは既に存在します\n')
}

// 必要なディレクトリの作成
const dirs = [
  'public/uploads',
  'logs'
]

dirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir)
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
    console.log(`✅ ${dir} ディレクトリを作成しました`)
  }
})

console.log('\n📋 セットアップ手順:')
console.log('1. Supabaseプロジェクトを作成')
console.log('2. .env.local の環境変数を設定')
console.log('3. supabase/migrations/001_initial_schema.sql を実行')
console.log('4. Storageバケット "media" を作成')
console.log('5. 管理者ユーザーを作成')
console.log('6. pnpm install で依存関係をインストール')
console.log('7. pnpm dev で開発サーバーを起動\n')

console.log('🎉 セットアップ完了！')
console.log('詳細は README.md を参照してください') 