"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Categories() {
  const categories = [
    {
      title: "Women's Fashion",
      image: "/placeholder.svg?height=400&width=400",
      description: "Elegant pieces for the modern woman",
      href: "/products?category=womens",
    },
    {
      title: "Men's Collection",
      image: "/placeholder.svg?height=400&width=400",
      description: "Sophisticated styles for discerning gentlemen",
      href: "/products?category=mens",
    },
    {
      title: "Accessories",
      image: "/placeholder.svg?height=400&width=400",
      description: "Curated accessories to complete your look",
      href: "/products?category=accessories",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.h2
          className="text-h2 font-bold text-center mb-16 relative section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          Shop by Category
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gold" />
        </motion.h2>

        <motion.div
          className="categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={category.href} className="category-card group block">
                <div className="relative overflow-hidden mb-4">
                  <motion.img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-80 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-gold text-black px-6 py-2 font-medium">Shop Now</span>
                  </div>
                </div>
                <h3 className="text-h3 font-semibold mb-2 font-heading group-hover:text-gold transition-colors">
                  {category.title}
                </h3>
                <p className="text-grey font-body">{category.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
