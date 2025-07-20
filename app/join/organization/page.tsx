export const dynamic = "force-dynamic";

import dynamic from "next/dynamic"

const OrganizationJoinClient = dynamic(
  () => import("./OrganizationJoinClient").then(mod => mod.default),
  { ssr: false }
)

export default function Page() {
  return <OrganizationJoinClient />
}
