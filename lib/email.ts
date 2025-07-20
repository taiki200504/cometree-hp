import { Resend } from 'resend'
import { createServerSupabaseClient } from './supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export type EmailTemplate = 
  | 'news_update'
  | 'event_update'
  | 'board_update'
  | 'welcome'
  | 'password_reset'
  | 'organization_approved'

export type EmailData = {
  to: string
  subject: string
  template: EmailTemplate
  data: Record<string, any>
}

// メール配信
export async function sendEmail(emailData: EmailData): Promise<void> {
  try {
    const { to, subject, template, data } = emailData
    
    const html = generateEmailHTML(template, data)
    
    await resend.emails.send({
      from: 'Union <noreply@union-hp.com>',
      to: [to],
      subject,
      html
    })
  } catch (error) {
    console.error('Email sending failed:', error)
    throw new Error('Failed to send email')
  }
}

// 一括メール配信
export async function sendBulkEmail(
  emails: string[],
  subject: string,
  template: EmailTemplate,
  data: Record<string, any>
): Promise<void> {
  try {
    const html = generateEmailHTML(template, data)
    
    await resend.emails.send({
      from: 'Union <noreply@union-hp.com>',
      to: emails,
      subject,
      html
    })
  } catch (error) {
    console.error('Bulk email sending failed:', error)
    throw new Error('Failed to send bulk email')
  }
}

// ニュース更新時のメール配信
export async function sendNewsUpdateEmail(newsData: {
  title: string
  excerpt: string
  url: string
}): Promise<void> {
  const supabase = createServerSupabaseClient()
  
  // ニュース配信を希望する購読者を取得
  const { data: subscribers } = await supabase
    .from('email_subscribers')
    .select('email, name')
    .eq('status', 'active')
    .eq('preferences->news', true)
  
  if (!subscribers || subscribers.length === 0) {
    return
  }
  
  const emails = subscribers.map(sub => sub.email)
  
  await sendBulkEmail(
    emails,
    `【Union】新しいニュース: ${newsData.title}`,
    'news_update',
    {
      title: newsData.title,
      excerpt: newsData.excerpt,
      url: newsData.url,
      subscriberCount: subscribers.length
    }
  )
}

// イベント更新時のメール配信
export async function sendEventUpdateEmail(eventData: {
  title: string
  description: string
  startDate: string
  url: string
}): Promise<void> {
  const supabase = createServerSupabaseClient()
  
  // イベント配信を希望する購読者を取得
  const { data: subscribers } = await supabase
    .from('email_subscribers')
    .select('email, name')
    .eq('status', 'active')
    .eq('preferences->events', true)
  
  if (!subscribers || subscribers.length === 0) {
    return
  }
  
  const emails = subscribers.map(sub => sub.email)
  
  await sendBulkEmail(
    emails,
    `【Union】新しいイベント: ${eventData.title}`,
    'event_update',
    {
      title: eventData.title,
      description: eventData.description,
      startDate: eventData.startDate,
      url: eventData.url,
      subscriberCount: subscribers.length
    }
  )
}

// 掲示板更新時のメール配信
export async function sendBoardUpdateEmail(boardData: {
  title: string
  content: string
  url: string
}): Promise<void> {
  const supabase = createServerSupabaseClient()
  
  // 掲示板更新配信を希望する購読者を取得
  const { data: subscribers } = await supabase
    .from('email_subscribers')
    .select('email, name')
    .eq('status', 'active')
    .eq('preferences->board_updates', true)
  
  if (!subscribers || subscribers.length === 0) {
    return
  }
  
  const emails = subscribers.map(sub => sub.email)
  
  await sendBulkEmail(
    emails,
    `【Union】掲示板更新: ${boardData.title}`,
    'board_update',
    {
      title: boardData.title,
      content: boardData.content,
      url: boardData.url,
      subscriberCount: subscribers.length
    }
  )
}

// メールテンプレート生成
function generateEmailHTML(template: EmailTemplate, data: Record<string, any>): string {
  const baseStyles = `
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
      .content { padding: 20px; background: #f9fafb; }
      .footer { background: #6b7280; color: white; padding: 20px; text-align: center; font-size: 12px; }
      .button { display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; }
      .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
    </style>
  `
  
  const header = `
    <div class="header">
      <h1>Union</h1>
      <p>学生団体支援プラットフォーム</p>
    </div>
  `
  
  const footer = `
    <div class="footer">
      <p>このメールはUnionから送信されました</p>
      <p>配信停止は<a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe">こちら</a></p>
    </div>
  `
  
  let content = ''
  
  switch (template) {
    case 'news_update':
      content = `
        <div class="content">
          <h2>新しいニュースが公開されました</h2>
          <div class="highlight">
            <h3>${data.title}</h3>
            <p>${data.excerpt}</p>
          </div>
          <p><a href="${data.url}" class="button">詳細を見る</a></p>
          <p>このニュースは${data.subscriberCount}名の購読者に配信されました。</p>
        </div>
      `
      break
      
    case 'event_update':
      content = `
        <div class="content">
          <h2>新しいイベントが公開されました</h2>
          <div class="highlight">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <p><strong>開催日:</strong> ${data.startDate}</p>
          </div>
          <p><a href="${data.url}" class="button">詳細を見る</a></p>
          <p>このイベントは${data.subscriberCount}名の購読者に配信されました。</p>
        </div>
      `
      break
      
    case 'board_update':
      content = `
        <div class="content">
          <h2>掲示板に新しい投稿があります</h2>
          <div class="highlight">
            <h3>${data.title}</h3>
            <p>${data.content.substring(0, 200)}...</p>
          </div>
          <p><a href="${data.url}" class="button">詳細を見る</a></p>
          <p>この投稿は${data.subscriberCount}名の購読者に配信されました。</p>
        </div>
      `
      break
      
    case 'welcome':
      content = `
        <div class="content">
          <h2>Unionへようこそ！</h2>
          <p>${data.name}様、Unionへのご登録ありがとうございます。</p>
          <p>Unionでは、学生団体の活動を支援する様々なサービスを提供しています。</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}" class="button">サイトを見る</a></p>
        </div>
      `
      break
      
    case 'password_reset':
      content = `
        <div class="content">
          <h2>パスワードリセット</h2>
          <p>パスワードリセットのリクエストを受け付けました。</p>
          <p><a href="${data.resetUrl}" class="button">パスワードをリセット</a></p>
          <p>このリンクは24時間有効です。</p>
        </div>
      `
      break
      
    case 'organization_approved':
      content = `
        <div class="content">
          <h2>組織登録が承認されました</h2>
          <p>${data.organizationName}様、組織登録の承認が完了しました。</p>
          <p>加盟団体専用ポータルにアクセスできるようになりました。</p>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/community/portal" class="button">ポータルにアクセス</a></p>
        </div>
      `
      break
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${baseStyles}
    </head>
    <body>
      ${header}
      ${content}
      ${footer}
    </body>
    </html>
  `
}

// 購読者登録
export async function subscribeToEmail(
  email: string,
  name?: string,
  organization?: string,
  preferences?: {
    news: boolean
    events: boolean
    board_updates: boolean
  }
): Promise<void> {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase
    .from('email_subscribers')
    .upsert({
      email,
      name,
      organization,
      preferences: preferences || {
        news: true,
        events: true,
        board_updates: true
      },
      status: 'active'
    })
  
  if (error) {
    throw new Error('Failed to subscribe to email')
  }
}

// 購読解除
export async function unsubscribeFromEmail(email: string): Promise<void> {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase
    .from('email_subscribers')
    .update({ status: 'unsubscribed' })
    .eq('email', email)
  
  if (error) {
    throw new Error('Failed to unsubscribe from email')
  }
} 