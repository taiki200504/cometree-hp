#!/usr/bin/env node

/**
 * Notion詳細診断スクリプト
 * 使用方法: node scripts/notion-detailed-diagnosis.js
 */

const { Client } = require('@notionhq/client')
require('dotenv').config({ path: '.env.local' })

async function notionDetailedDiagnosis() {
  console.log('🔍 Notion詳細診断を開始...')

  const notionToken = process.env.NOTION_TOKEN
  
  if (!notionToken) {
    console.error('❌ NOTION_TOKEN が設定されていません')
    return
  }

  console.log(`📊 使用中のトークン: ${notionToken.substring(0, 20)}...`)

  const notion = new Client({ auth: notionToken })

  // データベースIDの配列
  const databases = [
    { name: 'ニュース', id: process.env.NOTION_NEWS_DB_ID },
    { name: 'イベント', id: process.env.NOTION_EVENTS_DB_ID },
    { name: '掲示板', id: process.env.NOTION_BOARD_DB_ID },
    { name: '加盟団体', id: process.env.NOTION_ORGANIZATIONS_DB_ID },
    { name: '提携団体', id: process.env.NOTION_PARTNERS_DB_ID },
    { name: '運営メンバー', id: process.env.NOTION_MEMBERS_DB_ID },
    { name: 'サポーター', id: process.env.NOTION_SUPPORTERS_DB_ID }
  ]

  console.log('\n🔗 インテグレーション基本テスト...')
  
  try {
    // 簡単なAPIコールでインテグレーション自体の動作確認
    console.log('インテグレーション認証テスト中...')
    
    // まず、存在しないIDでテストして期待されるエラーを確認
    try {
      await notion.databases.retrieve({ database_id: '00000000-0000-0000-0000-000000000000' })
    } catch (error) {
      if (error.code === 'object_not_found') {
        console.log('✅ インテグレーション認証は正常に動作しています')
      } else if (error.code === 'unauthorized') {
        console.log('❌ インテグレーションの認証に失敗しています')
        console.log('   トークンが無効か、インテグレーションが正しく設定されていません')
        return
      }
    }

    console.log('\n📊 各データベースの詳細テスト...')
    
    for (const db of databases) {
      if (!db.id) {
        console.log(`⚠️  ${db.name}: データベースIDが設定されていません`)
        continue
      }

      const formattedId = db.id.includes('-') ? db.id : 
        db.id.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5')

      console.log(`\n🔍 ${db.name} の診断:`)
      console.log(`   ID: ${formattedId}`)

      try {
        // データベース情報を取得
        const database = await notion.databases.retrieve({
          database_id: formattedId
        })

        console.log(`   ✅ アクセス成功`)
        console.log(`   📄 タイトル: ${database.title[0]?.plain_text || 'タイトルなし'}`)
        console.log(`   🕒 作成日: ${database.created_time}`)
        console.log(`   ✏️  最終更新: ${database.last_edited_time}`)

        // プロパティ情報も表示
        const propertyCount = Object.keys(database.properties).length
        console.log(`   🏷️  プロパティ数: ${propertyCount}`)

        // 実際にクエリを試してみる
        try {
          const queryResult = await notion.databases.query({
            database_id: formattedId,
            page_size: 1
          })
          console.log(`   📊 クエリ成功: ${queryResult.results.length}件のページが見つかりました`)
        } catch (queryError) {
          console.log(`   ⚠️  クエリエラー: ${queryError.message}`)
        }

      } catch (error) {
        console.log(`   ❌ アクセス失敗: ${error.code} - ${error.message}`)
        
        if (error.code === 'object_not_found') {
          console.log(`   💡 解決方法:`)
          console.log(`      1. Notionで「${db.name}」データベースを開く`)
          console.log(`      2. 右上の「Share」ボタンをクリック`)
          console.log(`      3. インテグレーション「UNION HP CMS」を追加`)
          console.log(`      4. 権限を「Can edit」に設定`)
        } else if (error.code === 'unauthorized') {
          console.log(`   💡 トークンまたは権限の問題です`)
        }
      }
    }

    console.log('\n📋 診断完了')
    console.log('\n次のステップ:')
    console.log('1. ❌が表示されたデータベースを個別に共有設定')
    console.log('2. すべて✅になったら管理画面でテスト')
    console.log('3. http://localhost:3001/admin で動作確認')

  } catch (error) {
    console.error('❌ 予期しないエラー:', error)
  }
}

// スクリプト実行
if (require.main === module) {
  notionDetailedDiagnosis()
}

module.exports = { notionDetailedDiagnosis }