import Cart from "@/components/cart"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shopping Cart - Minimal Luxe",
}

export default function CartPage() {
  return (
    <main className="pt-20">
      <Cart />
      <Footer />
    </main>
  )
}
