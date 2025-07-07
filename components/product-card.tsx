"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isNew?: boolean
  rating: number
  reviews: number
  colors?: string[]
  sizes?: string[]
}

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
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

  if (viewMode === "list") {
    return (
      <motion.div variants={itemVariants}>
        <Link href={`/products/${product.id}`}>
          <div
            className="product-card flex gap-6 bg-white p-6 rounded-lg shadow-lg transition-all duration-300 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden rounded-lg">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isNew && <span className="bg-gold text-black px-2 py-1 text-xs font-medium rounded">NEW</span>}
                {product.originalPrice && (
                  <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">SALE</span>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-sm mb-2">
                  <div className="flex items-center">
                    <Star size={12} className="fill-gold text-gold" />
                    <span className="ml-1 text-grey">{product.rating}</span>
                  </div>
                  <span className="text-grey">({product.reviews} reviews)</span>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-gold transition-colors">{product.name}</h3>

                <p className="text-grey mb-4">{product.category}</p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-grey line-through">${product.originalPrice}</span>
                  )}
                </div>

                {/* Colors */}
                {product.colors && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm text-grey">Colors:</span>
                    <div className="flex gap-1">
                      {product.colors.slice(0, 4).map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color === "white" ? "#FFFFFF" : color }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-2 px-4 font-medium hover:bg-gold hover:text-black transition-colors rounded"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingBag size={16} className="inline mr-2" />
                  Add to Cart
                </motion.button>

                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded transition-colors ${
                    isInWishlist(product.id)
                      ? "bg-gold text-black"
                      : "bg-gray-100 text-grey hover:bg-gold hover:text-black"
                  }`}
                >
                  <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div variants={itemVariants}>
      <Link href={`/products/${product.id}`}>
        <div
          className="product-card group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden mb-4 bg-gray-100 rounded-lg">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <span className="bg-gold text-black px-2 py-1 text-xs font-medium rounded">NEW</span>}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">SALE</span>
              )}
            </div>

            {/* Actions */}
            <motion.div
              className="absolute top-4 right-4 flex flex-col gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full transition-colors ${
                  isInWishlist(product.id) ? "bg-gold text-black" : "bg-white/90 text-black hover:bg-gold"
                }`}
              >
                <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>

              <button className="p-2 bg-white/90 text-black hover:bg-gold rounded-full transition-colors">
                <Eye size={16} />
              </button>
            </motion.div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="absolute bottom-4 left-4 right-4 bg-black text-white py-2 px-4 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-black rounded"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag size={16} className="inline mr-2" />
              Add to Cart
            </motion.button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1 text-sm">
              <div className="flex items-center">
                <Star size={12} className="fill-gold text-gold" />
                <span className="ml-1 text-grey">{product.rating}</span>
              </div>
              <span className="text-grey">({product.reviews})</span>
            </div>

            <h3 className="font-medium group-hover:text-gold transition-colors">{product.name}</h3>

            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-grey line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-sm text-grey">{product.category}</p>

            {/* Colors */}
            {product.colors && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-grey">Colors:</span>
                <div className="flex gap-1">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: color === "white" ? "#FFFFFF" : color }}
                    />
                  ))}
                  {product.colors.length > 3 && <span className="text-xs text-gold">+{product.colors.length - 3}</span>}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
