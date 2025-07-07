"use client"

import { useEffect, useState, type ReactNode } from "react"

interface NoSSRProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * A component that ensures its children are only rendered on the client side
 * Use this to wrap components that use browser-specific APIs like 'window'
 */
const NoSSR = ({ children, fallback = null }: NoSSRProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return fallback
  }

  return <>{children}</>
}

export default NoSSR
