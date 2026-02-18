import { redirect } from "next/navigation"

/** 重複解消: コミュニティ紹介は /community に集約 */
export default function AboutCommunityRedirect() {
  redirect("/community")
}
