# Supabase認証設定ガイド

## 招待メールのリダイレクト先設定

### 1. Supabase管理画面での設定
1. Supabaseプロジェクトにアクセス
2. Authentication → Settings → Auth Settings
3. 「Site URL」を設定：
   ```
   https://gakusei-union-ixqzfk678-union-022b7003.vercel.app
   ```
4. 「Redirect URLs」に以下を追加：
   ```
   https://gakusei-union-ixqzfk678-union-022b7003.vercel.app/admin/signup
   https://gakusei-union-ixqzfk678-union-022b7003.vercel.app/admin/reset-password
   ```

### 2. 招待メール送信時の設定
招待メールを送信する際は、以下のURLを指定：
```
https://gakusei-union-ixqzfk678-union-022b7003.vercel.app/admin/signup
```

### 3. パスワードリセットメール送信時の設定
パスワードリセットメールを送信する際は、以下のURLを指定：
```
https://gakusei-union-ixqzfk678-union-022b7003.vercel.app/admin/reset-password
```

## 認証フロー

### 新規ユーザー（招待メール）
1. Supabase管理画面で「Invite user」
2. メールアドレスを入力して招待メール送信
3. メール内の「Accept the invite」をクリック
4. `/admin/signup` に遷移
5. パスワードを設定してアカウント作成完了

### 既存ユーザー（パスワードリセット）
1. ログイン画面で「パスワードを忘れた方はこちら」
2. メールアドレスを入力してリセットメール送信
3. メール内のリンクをクリック
4. `/admin/reset-password` に遷移
5. 新しいパスワードを設定

## 注意事項
- 本番環境では必ずHTTPSのURLを使用
- ローカル開発時は `http://localhost:3000` を使用
- リダイレクトURLは正確に設定する必要がある 