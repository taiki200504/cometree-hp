-- 依存テーブル（organization_members）が存在しない環境に備え、先に最低限の定義を用意
CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member','admin','leader')),
  is_active BOOLEAN DEFAULT TRUE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (organization_id, user_id)
);

-- 加盟団体専用コンテンツ管理テーブル
CREATE TABLE public.organization_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('news', 'event', 'document')),
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスの作成
CREATE INDEX idx_organization_content_organization_id ON public.organization_content(organization_id);
CREATE INDEX idx_organization_content_type ON public.organization_content(type);
CREATE INDEX idx_organization_content_status ON public.organization_content(status);
CREATE INDEX idx_organization_content_created_at ON public.organization_content(created_at);

-- RLSポリシーの設定
ALTER TABLE public.organization_content ENABLE ROW LEVEL SECURITY;

-- 組織メンバーは自分の組織のコンテンツのみアクセス可能
CREATE POLICY "Users can view their organization content" ON public.organization_content
    FOR SELECT USING (
        organization_id IN (
            SELECT id FROM public.organizations 
            WHERE id IN (
                SELECT organization_id FROM public.organization_members 
                WHERE user_id = auth.uid()
            )
        )
    );

-- 組織メンバーは自分の組織のコンテンツのみ作成可能
CREATE POLICY "Users can create content for their organization" ON public.organization_content
    FOR INSERT WITH CHECK (
        organization_id IN (
            SELECT id FROM public.organizations 
            WHERE id IN (
                SELECT organization_id FROM public.organization_members 
                WHERE user_id = auth.uid()
            )
        )
    );

-- 組織メンバーは自分の組織のコンテンツのみ更新可能
CREATE POLICY "Users can update their organization content" ON public.organization_content
    FOR UPDATE USING (
        organization_id IN (
            SELECT id FROM public.organizations 
            WHERE id IN (
                SELECT organization_id FROM public.organization_members 
                WHERE user_id = auth.uid()
            )
        )
    );

-- 組織メンバーは自分の組織のコンテンツのみ削除可能
CREATE POLICY "Users can delete their organization content" ON public.organization_content
    FOR DELETE USING (
        organization_id IN (
            SELECT id FROM public.organizations 
            WHERE id IN (
                SELECT organization_id FROM public.organization_members 
                WHERE user_id = auth.uid()
            )
        )
    );

-- 管理者は全てのコンテンツにアクセス可能
CREATE POLICY "Admins can manage all content" ON public.organization_content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 更新日時を自動更新するトリガー
CREATE OR REPLACE FUNCTION update_organization_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_organization_content_updated_at
    BEFORE UPDATE ON public.organization_content
    FOR EACH ROW
    EXECUTE FUNCTION update_organization_content_updated_at();
