"use client"

import React from "react"
import { motion } from "framer-motion"

const heroSlides = [
  {
    image: "/Men.jpg",
    title: "Men's Collection",
    subtitle: "Discover premium men's fashion for the modern gentleman."
  },
  {
    image: "/Woman.jpg",
    title: "Women's Collection",
    subtitle: "Elegant styles crafted for the discerning woman."
  },
  {
    image: "/Shoes.jpg",
    title: "Shoes",
    subtitle: "Step up your style with our exclusive shoe range."
  },
  {
    image: "/watch.webp",
    title: "Watches",
    subtitle: "Timeless pieces for every occasion."
  },
  {
    image: "/phone.webp",
    title: "Accessories",
    subtitle: "Complete your look with our curated accessories."
  },
]

export default function HeroSlideshow() {
  const [current, setCurrent] = React.useState(0)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, 4000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [current])

  return (
    <motion.section
      className="relative py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0">
        <motion.img
          key={heroSlides[current].image}
          src={heroSlides[current].image}
          alt={heroSlides[current].title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroSlides[current].title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {heroSlides[current].subtitle}
          </motion.p>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border border-gold/60 ${current === idx ? 'bg-gold' : 'bg-white/30'} transition-colors`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-gold/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 bg-gold/20 rounded-full"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </motion.section>
  )
}
