import UserAccount from "@/components/user-account"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Account - Minimal Luxe",
}

export default function AccountPage() {
  return (
    <main className="pt-20">
      <UserAccount />
      <Footer />
    </main>
  )
}
