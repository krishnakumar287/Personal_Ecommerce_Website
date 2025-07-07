import ProductDetail from "@/components/product-detail"
import RelatedProducts from "@/components/related-products"
import Footer from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Details - Minimal Luxe",
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="pt-20">
      <ProductDetail productId={params.id} />
      <RelatedProducts />
      <Footer />
    </main>
  )
}
