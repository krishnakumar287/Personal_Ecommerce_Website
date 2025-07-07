import ProductDetail from "@/components/product-detail"
import RelatedProducts from "@/components/related-products"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"
import type { Metadata } from "next"

// Import DelayedContent dynamically with no SSR to avoid window is not defined errors
const DelayedContent = dynamic(
  () => import("@/components/delayed-content").then((mod) => mod.DelayedContent),
  { ssr: false }
)

export const metadata: Metadata = {
  title: "Product Details - Minimal Luxe",
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="pt-20">
      <DelayedContent
        minimumLoadingTime={1000}
        artificialDelay={300}
        animation="fade"
      >
        <ProductDetail productId={params.id} />
        <RelatedProducts />
        <Footer />
      </DelayedContent>
    </main>
  )
}
