"use client"

import { motion } from "framer-motion"
import CategoriesHeroSlideshow from "@/components/ui/CategoriesHeroSlideshow"
import { useState } from "react"
import Link from "next/link"
import Footer from "@/components/footer"

const categories = [
  {
    id: "womens",
    name: "Women's Fashion",
    description: "Elegant pieces for the modern woman",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 156,
    subcategories: ["Dresses", "Tops", "Bottoms", "Outerwear", "Shoes"],
    color: "from-rose-400 to-pink-600",
  },
  {
    id: "mens",
    name: "Men's Collection",
    description: "Sophisticated styles for discerning gentlemen",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 124,
    subcategories: ["Shirts", "Suits", "Casual", "Outerwear", "Accessories"],
    color: "from-blue-400 to-indigo-600",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Curated accessories to complete your look",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 89,
    subcategories: ["Bags", "Jewelry", "Watches", "Scarves", "Belts"],
    color: "from-amber-400 to-orange-600",
  },
  {
    id: "shoes",
    name: "Footwear",
    description: "Step into luxury with our premium shoe collection",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 67,
    subcategories: ["Heels", "Flats", "Sneakers", "Boots", "Sandals"],
    color: "from-emerald-400 to-teal-600",
  },
  {
    id: "jewelry",
    name: "Fine Jewelry",
    description: "Exquisite pieces that tell your story",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 45,
    subcategories: ["Necklaces", "Earrings", "Bracelets", "Rings", "Watches"],
    color: "from-purple-400 to-violet-600",
  },
  {
    id: "home",
    name: "Home & Lifestyle",
    description: "Elevate your living space with luxury essentials",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 78,
    subcategories: ["Decor", "Candles", "Textiles", "Art", "Furniture"],
    color: "from-slate-400 to-gray-600",
  },
]

export default function CategoriesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <CategoriesHeroSlideshow />

      {/* Categories Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group"
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <Link href={`/products?category=${category.id}`}>
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Image Container */}
                    <div className="relative h-80 overflow-hidden">
                      <motion.img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />

                      {/* Gradient Overlay */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
                      />

                      {/* Product Count Badge */}
                      <motion.div
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {category.productCount} items
                      </motion.div>

                      {/* Hover Content */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                      >
                        <motion.button
                          className="bg-white text-black px-8 py-3 rounded-full font-medium shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Explore Collection
                        </motion.button>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <motion.h3
                        className="text-2xl font-bold mb-2 group-hover:text-gold transition-colors"
                        layoutId={`title-${category.id}`}
                      >
                        {category.name}
                      </motion.h3>
                      <p className="text-grey mb-4">{category.description}</p>

                      {/* Subcategories */}
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                      >
                        {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                          <span key={sub} className="text-xs bg-gray-100 text-grey px-2 py-1 rounded-full">
                            {sub}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="text-xs text-gold">+{category.subcategories.length - 3} more</span>
                        )}
                      </motion.div>
                    </div>

                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 border-2 border-gold rounded-2xl opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Categories Carousel */}
      <motion.section
        className="py-24 bg-off-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trending Now
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gold" />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category, index) => (
              <motion.div
                key={category.id}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-64 rounded-xl overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.productCount} Products</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  )
}
