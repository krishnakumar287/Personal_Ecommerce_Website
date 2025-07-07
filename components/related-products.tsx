"use client"

import { motion } from "framer-motion"
import ProductCard from "@/components/product-card"

// Mock related products data
const relatedProducts = [
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
];

export default function RelatedProducts() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="section-padding bg-off-white">
      <div className="container mx-auto">
        <h2 className="text-h2 font-bold text-center mb-12 font-heading section-title">
          You May Also Like
        </h2>
        
        <motion.div 
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
