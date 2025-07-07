import Cart from "@/components/cart"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"
import type { Metadata } from "next"

// Import DelayedContent dynamically with no SSR to avoid window is not defined errors
const DelayedContent = dynamic(
  () => import("@/components/delayed-content").then((mod) => mod.DelayedContent),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Shopping Cart - Minimal Luxe",
}

export default function CartPage() {
  return (
    <main className="pt-20">
      <DelayedContent
        minimumLoadingTime={800}
        artificialDelay={200}
        animation="slide"
      >
        <Cart />
        <Footer />
      </DelayedContent>
    </main>
  )
}
