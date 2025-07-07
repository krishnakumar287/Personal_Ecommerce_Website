"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: { href: string; label: string }[]
}

export default function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-xl"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Menu</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-6">
                {navItems.map((item, i) => (
                  <motion.div key={item.href} custom={i} variants={itemVariants} initial="closed" animate="open">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-xl font-medium hover:text-gold transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-12 pt-8 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="space-y-4">
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="block text-grey hover:text-black transition-colors"
                  >
                    My Account
                  </Link>
                  <Link href="/orders" onClick={onClose} className="block text-grey hover:text-black transition-colors">
                    Order History
                  </Link>
                  <Link
                    href="/support"
                    onClick={onClose}
                    className="block text-grey hover:text-black transition-colors"
                  >
                    Support
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
