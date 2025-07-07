"use client"

import { useLoadingDelay } from "@/hooks/use-loading-delay"
import { motion } from "framer-motion"
import React from "react"

interface DelayedContentProps {
  /**
   * Content to display when loading is complete
   */
  children: React.ReactNode
  
  /**
   * Fallback loading component to show while loading
   */
  fallback?: React.ReactNode
  
  /**
   * Minimum time to display the loading state (ms)
   */
  minimumLoadingTime?: number
  
  /**
   * Artificial delay to add to loading for UX purposes (ms)
   */
  artificialDelay?: number
  
  /**
   * Whether to skip the loading state (for immediate rendering)
   */
  skipLoading?: boolean
  
  /**
   * Animation to apply when transitioning from loading to content
   */
  animation?: "fade" | "slide" | "scale" | "none"
}

/**
 * Component that delays showing content for a minimum time
 * Useful for preventing layout shifts and showing loading states consistently
 */
const DelayedContent: React.FC<DelayedContentProps> = ({
  children,
  fallback,
  minimumLoadingTime = 800,
  artificialDelay = 200,
  skipLoading = false,
  animation = "fade"
}) => {
  const { isLoading } = useLoadingDelay({
    minimumLoadingTime,
    artificialDelay,
    initialState: !skipLoading
  })
  
  // Animation variants
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4 } }
    },
    slide: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
    },
    none: {
      hidden: {},
      visible: {}
    }
  }
  
  if (isLoading) {
    return fallback || null
  }
  
  if (animation === "none") {
    return <>{children}</>
  }
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[animation] as any}
    >
      {children}
    </motion.div>
  )
}

export { DelayedContent }
export default DelayedContent
