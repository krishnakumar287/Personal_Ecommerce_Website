"use client"

import { useState, useEffect } from "react"

interface UseLoadingDelayOptions {
  /**
   * Minimum time to show loading state in milliseconds
   */
  minimumLoadingTime?: number
  
  /**
   * Initial loading state
   */
  initialState?: boolean
  
  /**
   * Artificial delay to add to loading for UX purposes (in milliseconds)
   */
  artificialDelay?: number
  
  /**
   * Callback when loading completes
   */
  onLoadComplete?: () => void
}

/**
 * A hook to manage loading states with minimum display times and artificial delays
 * This helps prevent layout shifts and flickering for fast-loading content
 */
export function useLoadingDelay({
  minimumLoadingTime = 1000,
  initialState = true,
  artificialDelay = 0,
  onLoadComplete
}: UseLoadingDelayOptions = {}) {
  const [isLoading, setIsLoading] = useState<boolean>(initialState)
  const [hasContent, setHasContent] = useState<boolean>(!initialState)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  
  // Handle mounting status to avoid window references during SSR
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    // Skip effect during SSR
    if (!isMounted) return
    
    let loadingTimeout: NodeJS.Timeout
    let minimumTimeout: NodeJS.Timeout
    // Only access Date.now() in useEffect, which runs client-side
    let startTime = Date.now()
    
    // Function to handle loading completion
    const completeLoading = () => {
      const elapsedTime = Date.now() - startTime
      const remainingMinimumTime = Math.max(0, minimumLoadingTime - elapsedTime)
      
      minimumTimeout = setTimeout(() => {
        setIsLoading(false)
        onLoadComplete?.()
      }, remainingMinimumTime)
    }
    
    // If we start with initialState = true, simulate loading after artificialDelay
    if (initialState) {
      loadingTimeout = setTimeout(() => {
        setHasContent(true)
        completeLoading()
      }, artificialDelay)
    }
    
    return () => {
      clearTimeout(loadingTimeout)
      clearTimeout(minimumTimeout)
    }
  }, [initialState, minimumLoadingTime, artificialDelay, onLoadComplete, isMounted])

  // Function to manually mark loading as complete
  const completeLoading = () => {
    setHasContent(true)
    setIsLoading(false)
  }

  // Function to restart loading
  const startLoading = () => {
    setIsLoading(true)
    setHasContent(false)
  }

  return {
    isLoading,
    hasContent,
    completeLoading,
    startLoading
  }
}
