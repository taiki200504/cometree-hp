# サイトマップ（現状）

## 公開サイト（一般向け）

```
/
├── /                    トップ
├── /for-students        学生向けトップ
│   ├── /for-students/unimate     ユニメイト紹介
│   └── /for-students/benefits     登録学生のメリット
├── /services            サービス（?tab=student | ?tab=corporate）
├── /about               UNIONについて（理念・組織概要）
│   ├── /about/union     学生団体連合紹介
│   ├── /about/members   運営メンバー
│   ├── /about/initiatives  事業内容
│   ├── /about/supporters   ご支援者様
│   ├── /about/community    （サブ）
│   ├── /about/media        （サブ）
│   ├── /about/students     （サブ）
│   └── /about/matching-detail （サブ）
├── /community           コミュニティ概要
│   ├── /community/organizations   加盟団体一覧
│   │   └── /community/organizations/[id]  団体詳細
│   ├── /community/partners        提携企業一覧
│   ├── /community/slack           Slack
│   ├── /community/discord         Discord
│   ├── /community/guild           （ギルド）
│   └── /community/portal/login    加盟団体専用ログイン
├── /join                参加のご案内
│   ├── /join/organization   団体として加盟
│   ├── /join/corporate      企業として提携
│   ├── /join/staff          運営メンバーになる
│   └── /join/donate         ご寄付
├── /news                お知らせ一覧
│   └── /news/[id]        お知らせ詳細
├── /events              イベント
├── /media               メディア・ポッドキャスト
│   ├── /media/podcast        ポッドキャスト一覧
│   │   ├── /media/podcast/career
│   │   ├── /media/podcast/cocomiyu
│   │   ├── /media/podcast/genepoli
│   │   └── /media/podcast/yuniraji
│   └── /media/studentnews    UNION Weekly News
├── /board               掲示板
│   ├── /board/[id]      掲示板詳細
│   └── /board/favorites お気に入り
├── /contact             お問い合わせ
│   └── /contact/services 提供サービス申し込み一覧
├── /locations           拠点情報
├── /favorites           お気に入り（共通）
├── /podcast             ポッドキャスト（旧ルート）
│   └── /podcast/[id]
├── /studentnews         学生団体ニュース（旧ルート）
├── /brand               ブランドガイドライン
├── /privacy             プライバシーポリシー
├── /lp/student-union    LP（学生連合）
└── /for-organizations   団体向け（別ツリー）
    ├── /for-organizations/basics
    └── /for-organizations/benefits
```

---

## 加盟団体専用ポータル（要ログイン）

```
/community/portal/
├── /community/portal/login   ログイン
├── /community/portal         ダッシュボード
├── /community/portal/profile プロフィール
├── /community/portal/documents  ドキュメント
├── /community/portal/events  イベント
├── /community/portal/cms     CMS
├── /community/portal/event-venue  会場
├── /community/portal/meeting-room 会議室
├── /community/portal/video-production 動画制作
└── /community/portal/links   リンク
```

---

## 管理画面（/admin）※要認証

```
/admin/
├── /admin/login   ログイン
├── /admin         ダッシュボード
├── /admin/dashboard
├── /admin/news    お知らせ管理
│   ├── create
│   └── [id]/edit
├── /admin/events  イベント管理
│   ├── create
│   └── [id]/edit
├── /admin/board   掲示板管理
│   ├── create
│   └── [id]/edit
├── /admin/organizations  加盟団体管理
│   ├── create
│   ├── dashboard
│   ├── [id]/edit
│   ├── [id]/content
│   └── [id]/news
├── /admin/partners  提携企業管理
│   ├── create
│   └── [id]/edit
├── /admin/members  メンバー管理
│   ├── create
│   └── [id]/edit
├── /admin/supporters  支援者管理
│   ├── create
│   └── [id]/edit
├── /admin/podcasts  ポッドキャスト管理
│   ├── episodes/create
│   └── external-links/create
├── /admin/stats   統計
├── /admin/analytics  分析
├── /admin/notion   Notion連携
├── /admin/portal/links
├── /admin/settings  設定
├── /admin/users
├── /admin/help
└── /admin/test
```

---

## 認証・その他

```
/auth/login    認証ログイン
/auth/signup   サインアップ
/sentry-example-page  Sentryデモ（開発用）
```

---

## ヘッダーから辿れる主なパス

| メニュー | パス |
|----------|------|
| ホーム | `/` |
| 学生向け | `/for-students` とドロップダウン |
| 企業向け | `/services?tab=corporate` とドロップダウン |
| コミュニティ | `/community` とドロップダウン |
| 参加する | `/join` とドロップダウン |
| お知らせ | `/news` |
| お問い合わせ | `/contact` |

## フッターから辿れる主なパス

学生向け / 企業向け / コミュニティ / 参加する / お知らせ / お問い合わせ / UNIONについて（/about）
