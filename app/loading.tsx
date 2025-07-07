"use client"

import { motion } from "framer-motion"
import { useLoadingDelay } from "@/hooks/use-loading-delay"

export default function RootLoading() {
  // Use loading delay hook to ensure a minimum display time
  const { isLoading } = useLoadingDelay({
    minimumLoadingTime: 1200
  })

  // Logo text animation
  const logoLetters = "MINIMAL LUXE".split("")
  
  return (
    <div className="fixed inset-0 bg-off-white z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative mb-12">
          {/* Logo animation with each letter animated separately */}
          <div className="flex justify-center items-center font-heading text-3xl font-bold overflow-hidden">
            {logoLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.05,
                  ease: [0.215, 0.61, 0.355, 1]
                }}
                className={letter === " " ? "w-3" : ""}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          {/* Animated gold line under the logo */}
          <motion.div 
            className="absolute -bottom-6 left-1/2 h-[2px] bg-gold"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "60px", x: "-50%" }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Loading indicator with pulsing dots */}
        <div className="flex items-center justify-center space-x-3 mt-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8] 
              }}
              transition={{
                duration: 1.5,
                delay: 0.4 + index * 0.2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-gold"
            />
          ))}
        </div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute w-1 h-16 bg-gold/20 left-1/4 bottom-1/4"
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 1, duration: 0.8 }}
        />
        
        <motion.div
          className="absolute w-1 h-24 bg-gold/20 right-1/4 top-1/4"
          initial={{ height: 0 }}
          animate={{ height: 120 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />
      </motion.div>
    </div>
  )
}
