"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState, type ReactNode } from "react"
import { useLoadingDelay } from "@/hooks/use-loading-delay"

interface PageTransitionProps {
  children: ReactNode
  /**
   * Minimum time the loading state should be shown (ms)
   */
  minimumLoadingTime?: number
  /**
   * Additional delay to add to page transitions for smoother UX (ms)
   */
  artificialDelay?: number
}

export default function PageTransition({
  children,
  minimumLoadingTime = 800,
  artificialDelay = 200
}: PageTransitionProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [prevPathname, setPrevPathname] = useState(pathname)
  
  // Track if we're changing routes for first load vs subsequent navigations
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  
  const { isLoading, startLoading } = useLoadingDelay({
    initialState: false,
    minimumLoadingTime,
    artificialDelay
  })

  // Handle route changes
  useEffect(() => {
    if (isFirstLoad) {
      // First load - just mark it as done
      setIsFirstLoad(false)
      return
    }

    if (prevPathname !== pathname) {
      // Route changed - start loading
      startLoading()
      setPrevPathname(pathname)
    }
  }, [pathname, prevPathname, isFirstLoad, startLoading])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
