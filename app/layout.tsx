import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Outfit } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { AuthProvider } from "@/contexts/auth-context"
import Navigation from "@/components/navigation"
import PageTransition from "@/components/page-transition"
import NoSSR from "@/components/no-ssr"
import { Toaster } from "@/components/ui/toaster"

// Primary heading font (for h1, h2, h3)
const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display"
})

// Body and UI text font
const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit"
})

export const metadata: Metadata = {
  title: "Minimal Luxe - Premium Fashion & Lifestyle",
  description: "Curated collection of premium fashion and lifestyle pieces",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${outfit.variable}`}>
      <body className={outfit.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navigation />
              <NoSSR>
                <PageTransition minimumLoadingTime={800} artificialDelay={200}>
                  {children}
                </PageTransition>
              </NoSSR>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
