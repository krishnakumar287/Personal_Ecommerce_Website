"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found - Minimal Luxe",
  description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-off-white px-4 py-24">
      <div className="container max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Error code */}
          <div className="relative">
            <motion.h1 
              className="font-heading text-[10rem] sm:text-[15rem] font-bold text-black/5"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              404
            </motion.h1>
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl sm:text-4xl text-black">
                Page Not Found
              </h2>
            </motion.div>
          </div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-grey text-lg max-w-xl mx-auto">
              The page you're looking for doesn't exist or has been moved.
              Please check the URL or navigate back to our homepage.
            </p>

            {/* Call to action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link 
                href="/"
                className="btn px-8 py-4 bg-black text-white font-medium hover:bg-gold hover:text-black transition-all duration-300"
              >
                Return to Homepage
              </Link>
              <Link 
                href="/products"
                className="flex items-center gap-2 px-8 py-4 border border-black text-black font-medium hover:border-gold hover:text-gold transition-all duration-300"
              >
                <span>Browse Products</span>
              </Link>
            </div>
          </motion.div>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12"
          >
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-grey hover:text-gold transition-colors duration-300"
            >
              <ArrowLeft size={16} />
              <span>Go Back</span>
            </button>
          </motion.div>

          {/* Decorative element */}
          <motion.div 
            className="w-20 h-1 bg-gold mx-auto mt-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
        </motion.div>
      </div>
    </main>
  )
}
