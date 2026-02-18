import { redirect } from "next/navigation"

/** 重複解消: 学生向け紹介は /for-students に集約 */
export default function AboutStudentsRedirect() {
  redirect("/for-students")
}
