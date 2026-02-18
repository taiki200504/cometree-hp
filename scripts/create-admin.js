#!/usr/bin/env node

/**
 * UNION HP 管理者アカウント作成スクリプト
 * 使用方法:
 *   環境変数: ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/create-admin.js
 *   対話入力: node scripts/create-admin.js
 */

const { createClient } = require('@supabase/supabase-js')
const readline = require('readline')
require('dotenv').config({ path: '.env.local' })

function ask(rl, message) {
  return new Promise((resolve) => {
    rl.question(message, (answer) => resolve((answer || '').trim()))
  })
}

async function createAdminUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase環境変数が設定されていません')
    console.error('NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY を設定してください')
    process.exit(1)
  }

  let adminEmail = process.env.ADMIN_EMAIL
  let adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    if (!adminEmail) adminEmail = await ask(rl, '管理者メールアドレス: ')
    if (!adminPassword) adminPassword = await ask(rl, '管理者パスワード: ')
    rl.close()
    if (!adminEmail || !adminPassword) {
      console.error('❌ メールアドレスとパスワードは必須です')
      process.exit(1)
    }
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🔧 管理者アカウントを作成中...')

    // 1. 既存のユーザーを確認
    const { data: existingUser, error: checkError } = await supabase.auth.admin.listUsers()
    
    if (checkError) {
      console.error('❌ ユーザー確認に失敗:', checkError.message)
      process.exit(1)
    }

    let targetUser = existingUser.users.find(user => user.email === adminEmail)

    if (!targetUser) {
      // 新しいユーザーを作成
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      })

      if (authError) {
        console.error('❌ 認証ユーザーの作成に失敗:', authError.message)
        process.exit(1)
      }

      targetUser = authData.user
      console.log('✅ 認証ユーザーを作成しました:', targetUser.id)
    } else {
      console.log('✅ 既存のユーザーが見つかりました:', targetUser.id)
    }

    // 2. usersテーブルに管理者権限を設定（001: full_name あり / 007: id, email, role のみ）
    let roleError = await supabase.from('users').upsert({
      id: targetUser.id,
      email: adminEmail,
      full_name: 'UNION Administrator',
      role: 'admin',
    }).then((r) => r.error)
    if (roleError) {
      roleError = (await supabase.from('users').upsert({
        id: targetUser.id,
        email: adminEmail,
        role: 'admin',
      })).error
    }

    if (roleError) {
      console.error('❌ 管理者権限の設定に失敗:', roleError.message)
      process.exit(1)
    }

    console.log('✅ 管理者権限を設定しました')

    // 3. 確認
    const { data: userData, error: checkError2 } = await supabase
      .from('users')
      .select('*')
      .eq('id', targetUser.id)
      .single()

    if (checkError2) {
      console.error('❌ ユーザー確認に失敗:', checkError2.message)
      process.exit(1)
    }

    console.log('🎉 管理者アカウントの作成が完了しました！')
    console.log('')
    console.log('📋 管理者情報:')
    console.log(`   メールアドレス: ${userData.email}`)
    console.log(`   パスワード: ${adminPassword}`)
    console.log(`   ユーザーID: ${userData.id}`)
    console.log(`   権限: ${userData.role}`)
    console.log('')
    console.log('⚠️  本運用環境では必ずパスワードを変更してください')

  } catch (error) {
    console.error('❌ 予期しないエラーが発生しました:', error.message)
    process.exit(1)
  }
}

// スクリプト実行
if (require.main === module) {
  createAdminUser()
}

module.exports = { createAdminUser } 