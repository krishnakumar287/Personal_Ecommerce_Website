"use client"

import { motion } from "framer-motion"
import ProductCard from "./product-card"

export default function FeaturedProducts() {
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
    },
    {
      id: "2",
      name: "Cashmere Coat",
      price: 650,
      image: "/placeholder.svg?height=500&width=400",
      category: "Outerwear",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: "3",
      name: "Leather Handbag",
      price: 420,
      image: "/placeholder.svg?height=500&width=400",
      category: "Accessories",
      rating: 4.7,
      reviews: 156,
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
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="py-24 px-4 bg-off-white">
      <div className="container mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Featured Products
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gold" />
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
