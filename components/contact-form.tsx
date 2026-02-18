"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorText, setErrorText] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    setErrorText("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus("error")
        setErrorText(data.error || "送信に失敗しました")
        return
      }
      setStatus("success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch {
      setStatus("error")
      setErrorText("送信に失敗しました")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <div>
        <Label htmlFor="contact-name">お名前 *</Label>
        <Input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          className="mt-1"
          placeholder="山田 太郎"
        />
      </div>
      <div>
        <Label htmlFor="contact-email">メールアドレス *</Label>
        <Input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          maxLength={255}
          className="mt-1"
          placeholder="example@email.com"
        />
      </div>
      <div>
        <Label htmlFor="contact-subject">件名</Label>
        <Input
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={200}
          className="mt-1"
          placeholder="お問い合わせの件名"
        />
      </div>
      <div>
        <Label htmlFor="contact-message">お問い合わせ内容 *</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          minLength={5}
          maxLength={5000}
          rows={6}
          className="mt-1"
          placeholder="5文字以上でご記入ください"
        />
      </div>
      {status === "success" && (
        <p className="text-green-600 dark:text-green-400 text-sm">送信しました。内容を確認のうえ、ご連絡いたします。</p>
      )}
      {status === "error" && (
        <p className="text-red-600 dark:text-red-400 text-sm">{errorText}</p>
      )}
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "送信中..." : "送信する"}
      </Button>
    </form>
  )
}
