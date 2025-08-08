"use client"

import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminHelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="運用ガイド" trail={[{ label: '管理' }, { label: '運用ガイド' }]} />
      <div className="p-4 md:p-8">
        <div className="prose max-w-none">
          <h2>UNION 管理の基本</h2>
          <p>この管理画面は、UNIONの運営メンバーがニュース、イベント、メンバー、加盟団体などを管理するためのものです。</p>
          <h3>主な操作</h3>
          <ul>
            <li>ダッシュボード: 主要統計と各管理画面への導線</li>
            <li>ニュース管理: 記事の作成・編集・公開管理</li>
            <li>イベント管理: イベントの登録・編集・公開管理</li>
            <li>メンバー管理: 運営メンバー（コア/顧問/スタッフ）の追加・編集</li>
            <li>加盟団体管理: 団体情報の編集と専用コンテンツ管理</li>
            <li>支援者/提携企業管理: 支援・提携情報の整理</li>
            <li>掲示板管理: 掲示板投稿の作成・編集・削除</li>
            <li>ポッドキャスト管理: 番組/エピソード/外部リンクの管理</li>
          </ul>
          <h3>画像アップロード</h3>
          <p>画像はSupabase Storageの<code>images</code>バケットに保存されます。各フォームの「画像をアップロード」から登録できます。</p>
          <h3>権限</h3>
          <p>管理者はUNION運営メンバーのみです。ログイン後は追加の再ログインを求めません。</p>
        </div>
      </div>
    </div>
  )
}
