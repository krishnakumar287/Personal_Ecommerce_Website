import Checkout from "@/components/checkout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout - Minimal Luxe",
}

export default function CheckoutPage() {
  return (
    <main className="pt-20">
      <Checkout />
    </main>
  )
}
