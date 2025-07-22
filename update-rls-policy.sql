-- 既存のポリシーを削除します。
-- ポリシーが存在しない場合にエラーにならないように IF EXISTS をつけます。
DROP POLICY IF EXISTS "Users can view own data" ON public.users;

-- 新しいポリシーを作成します。
-- ユーザーが自分自身のレコードに対してすべての操作（SELECT, INSERT, UPDATE, DELETE）を
-- 許可するポリシーです。
-- これにより、サインイン時のレコード更新や、将来的なプロフィール更新などが可能になります。
CREATE POLICY "Users can manage their own data" 
ON public.users 
FOR ALL 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
