"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function Cart() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    updateQuantity(id, quantity)
  }

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id)
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  const handleCheckout = () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      toast({
        title: "Order placed",
        description: "Your order has been successfully placed!",
      })
    }, 2000)
  }

  // Calculate shipping cost (free over $100)
  const shippingCost = total >= 100 ? 0 : 12
  
  // Calculate tax (assuming 8.5%)
  const taxRate = 0.085
  const tax = total * taxRate
  
  // Calculate grand total
  const grandTotal = total + shippingCost + tax

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <motion.div 
            className="text-center py-16 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mb-6 flex justify-center">
              <ShoppingBag size={64} className="text-grey" />
            </div>
            <h2 className="text-2xl font-heading mb-4">Your cart is empty</h2>
            <p className="text-grey mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              href="/products" 
              className="btn inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-gold transition-colors"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <motion.div 
              className="lg:col-span-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="space-y-6">
                {items.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className="flex gap-6 border-b border-gray-200 pb-6"
                    variants={itemVariants}
                  >
                    <div className="w-24 h-24 relative flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <button 
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-grey hover:text-black transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="flex items-center text-sm text-grey mb-4 space-x-2">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.size && item.color && <span>|</span>}
                        {item.color && <span>Color: {item.color}</span>}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex border border-gray-300 h-9">
                          <button 
                            className="w-9 flex items-center justify-center"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button 
                            className="w-9 flex items-center justify-center"
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Order Summary */}
            <motion.div 
              className="bg-gray-50 p-6 rounded-lg h-fit sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-heading mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-grey">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-grey">Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-grey">Tax (8.5%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full btn flex items-center justify-center gap-2 bg-black text-white py-3 px-6 hover:bg-gold transition-colors disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>Proceed to Checkout</>
                  )}
                </button>
                
                <Link 
                  href="/products" 
                  className="w-full block text-center py-3 px-6 text-black hover:text-gold transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <div className="mt-6 text-sm text-grey">
                <p className="mb-2">We accept:</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded">Visa</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded">Mastercard</span>
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded">PayPal</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
