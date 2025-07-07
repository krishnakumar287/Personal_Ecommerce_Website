import Checkout from "@/components/checkout"
import dynamic from "next/dynamic"
import type { Metadata } from "next"

// Import DelayedContent dynamically with no SSR to avoid window is not defined errors
const DelayedContent = dynamic(
  () => import("@/components/delayed-content").then((mod) => mod.DelayedContent),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Checkout - Minimal Luxe",
}

export default function CheckoutPage() {
  return (
    <main className="pt-20">
      <DelayedContent
        minimumLoadingTime={1000}
        artificialDelay={300}
        animation="slide"
      >
        <Checkout />
      </DelayedContent>
    </main>
  )
}
