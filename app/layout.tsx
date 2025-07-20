import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { FavoritesProvider } from "@/context/favorites-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "学生団体連合UNION公式サイト | 学生の声を社会に響かせる",
  description:
    "学生の声を社会に響かせる。Slack参加・メディア出演・団体加盟など多様な支援を実施。全国85の学生団体、1200名の学生が参加するコミュニティ。",
  keywords: "学生団体, UNION, ポッドキャスト, 学生支援, コミュニティ, Slack, メディア出演, 協賛",
  authors: [{ name: "学生団体連合UNION" }],
  creator: "学生団体連合UNION",
  publisher: "学生団体連合UNION",
  openGraph: {
    title: "学生団体連合UNION公式サイト",
    description: "学生の声を社会に響かせる。Slack参加・メディア出演・団体加盟など多様な支援を実施。",
    url: "https://union-hp.vercel.app",
    siteName: "学生団体連合UNION",
    images: [
      {
        url: "https://union-hp.vercel.app/images/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "学生団体連合UNION",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "学生団体連合UNION公式サイト",
    description: "学生の声を社会に響かせる。Slack参加・メディア出演・団体加盟など多様な支援を実施。",
    images: ["https://union-hp.vercel.app/images/ogp.jpg"],
    creator: "@UNION_gakusei26",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://union-hp.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <meta name="theme-color" content="#066ff2" />
        <meta name="google-site-verification" content="1s8j1z01g_G6djWRT6GnRRXiGbfw4n6sIJA0-vvGHUk" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-7W2ZE4GST3"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7W2ZE4GST3');
          `,
        }} />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}