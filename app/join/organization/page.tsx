import dynamic from "next/dynamic"

const OrganizationJoinClient = dynamic(() => import("./OrganizationJoinClient"), { ssr: false })

export default function Page() {
  return <OrganizationJoinClient />
}
