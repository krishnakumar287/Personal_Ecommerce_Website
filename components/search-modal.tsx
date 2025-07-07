"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { useState, useEffect } from "react"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")

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

  const mockResults = [
    { id: 1, name: "Silk Blouse", category: "Women's", price: "$285" },
    { id: 2, name: "Cashmere Coat", category: "Outerwear", price: "$650" },
    { id: 3, name: "Leather Handbag", category: "Accessories", price: "$420" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute top-0 left-0 right-0 bg-white p-6"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Search size={24} className="text-grey" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-2xl font-light outline-none"
                  autoFocus
                />
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={24} />
                </button>
              </div>

              {query && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-grey">Search Results</h3>
                  {mockResults
                    .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
                      >
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-grey">{item.category}</p>
                        </div>
                        <span className="font-semibold">{item.price}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
