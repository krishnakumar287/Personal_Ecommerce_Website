"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Grid, List, SlidersHorizontal, Search, ChevronDown } from "lucide-react"
import ProductCard from "@/components/product-card"
import ProductFilters from "@/components/product-filters"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"
import HeroSlideshow from "@/components/ui/HeroSlideshow"

// Import DelayedContent dynamically with no SSR to avoid window is not defined errors
const DelayedContent = dynamic(
  () => import("@/components/delayed-content").then((mod) => mod.DelayedContent),
  { ssr: false }
)

const products = [
  {
    id: "1",
    name: "Silk Blouse",
    price: 285,
    originalPrice: 320,
    image: "/placeholder.svg?height=500&width=400",
    category: "Women's",
    isNew: true,
    rating: 4.8,
    reviews: 124,
    colors: ["white", "black", "navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Cashmere Coat",
    price: 650,
    image: "/placeholder.svg?height=500&width=400",
    category: "Outerwear",
    rating: 4.9,
    reviews: 89,
    colors: ["camel", "black", "grey"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "3",
    name: "Leather Handbag",
    price: 420,
    image: "/placeholder.svg?height=500&width=400",
    category: "Accessories",
    rating: 4.7,
    reviews: 156,
    colors: ["brown", "black", "tan"],
    sizes: ["One Size"],
  },
  {
    id: "4",
    name: "Wool Trousers",
    price: 195,
    originalPrice: 240,
    image: "/placeholder.svg?height=500&width=400",
    category: "Men's",
    rating: 4.6,
    reviews: 78,
    colors: ["navy", "charcoal", "khaki"],
    sizes: ["30", "32", "34", "36", "38"],
  },
  {
    id: "5",
    name: "Pearl Necklace",
    price: 340,
    image: "/placeholder.svg?height=500&width=400",
    category: "Jewelry",
    rating: 4.8,
    reviews: 92,
    colors: ["white", "cream"],
    sizes: ['16"', '18"', '20"'],
  },
  {
    id: "6",
    name: "Silk Scarf",
    price: 125,
    image: "/placeholder.svg?height=500&width=400",
    category: "Accessories",
    rating: 4.5,
    reviews: 67,
    colors: ["floral", "geometric", "solid"],
    sizes: ["90x90cm"],
  },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState(products)

  useEffect(() => {
    const filtered = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Keep original order for featured
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, sortBy])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      } as any,
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  }

  return (
    <main className="pt-20 min-h-screen">
      <DelayedContent
        minimumLoadingTime={800}
        artificialDelay={200}
        animation="fade"
      >
      {/* Hero Slideshow Section */}
      <HeroSlideshow />

      {/* Search and Controls */}
      <motion.section
        className="py-8 bg-white border-b"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-grey pointer-events-none"
                  size={16}
                />
              </div>

              {/* View Mode */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 transition-colors ${
                    viewMode === "grid" ? "bg-black text-white" : "bg-white text-grey hover:bg-gray-50"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 transition-colors ${
                    viewMode === "list" ? "bg-black text-white" : "bg-white text-grey hover:bg-gray-50"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
              >
                <SlidersHorizontal size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.aside
                className="lg:w-1/4 w-full lg:relative fixed inset-0 z-40 lg:z-auto"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="lg:sticky lg:top-24">
                  <ProductFilters onClose={() => setShowFilters(false)} />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              className="mb-6 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-grey">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </motion.div>

            <motion.div
              className={`grid gap-8 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                className="px-8 py-4 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Products
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
      </DelayedContent>
    </main>
  )
}
