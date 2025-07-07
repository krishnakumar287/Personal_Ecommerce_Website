"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown } from "lucide-react"
import { useState } from "react"

interface ProductFiltersProps {
  onClose?: () => void
}

export default function ProductFilters({ onClose }: ProductFiltersProps) {
  const [openSections, setOpenSections] = useState<string[]>(["category", "price", "size"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const filterSections = [
    {
      id: "category",
      title: "Category",
      options: [
        { label: "Women's Fashion", count: 156 },
        { label: "Men's Collection", count: 124 },
        { label: "Accessories", count: 89 },
        { label: "Footwear", count: 67 },
        { label: "Jewelry", count: 45 },
      ],
    },
    {
      id: "price",
      title: "Price Range",
      options: [
        { label: "Under $100", count: 45 },
        { label: "$100 - $250", count: 123 },
        { label: "$250 - $500", count: 89 },
        { label: "$500 - $1000", count: 67 },
        { label: "Over $1000", count: 23 },
      ],
    },
    {
      id: "size",
      title: "Size",
      options: [
        { label: "XS", count: 34 },
        { label: "S", count: 78 },
        { label: "M", count: 92 },
        { label: "L", count: 67 },
        { label: "XL", count: 45 },
        { label: "XXL", count: 23 },
      ],
    },
    {
      id: "color",
      title: "Color",
      options: [
        { label: "Black", count: 89, color: "#000000" },
        { label: "White", count: 76, color: "#FFFFFF" },
        { label: "Navy", count: 54, color: "#1E3A8A" },
        { label: "Beige", count: 43, color: "#F5F5DC" },
        { label: "Brown", count: 32, color: "#8B4513" },
      ],
    },
    {
      id: "brand",
      title: "Brand",
      options: [
        { label: "Minimal Luxe", count: 234 },
        { label: "Heritage Collection", count: 89 },
        { label: "Modern Classics", count: 67 },
        { label: "Artisan Series", count: 45 },
      ],
    },
  ]

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg lg:shadow-none"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Mobile Header */}
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <h3 className="text-xl font-semibold">Filters</h3>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block mb-6">
        <h3 className="text-xl font-semibold">Filter Products</h3>
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        {filterSections.map((section, index) => (
          <motion.div
            key={section.id}
            className="border-b border-gray-200 pb-6 last:border-b-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full text-left font-medium text-lg mb-4 hover:text-gold transition-colors"
            >
              {section.title}
              <motion.div
                animate={{ rotate: openSections.includes(section.id) ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>

            <AnimatePresence>
              {openSections.includes(section.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3"
                >
                  {section.options.map((option, optionIndex) => (
                    <motion.label
                      key={option.label}
                      className="flex items-center justify-between cursor-pointer group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: optionIndex * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold focus:ring-2"
                        />
                        <div className="ml-3 flex items-center">
                          {section.id === "color" && "color" in option && (
                            <div
                              className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                              style={{ backgroundColor: option.color }}
                            />
                          )}
                          <span className="text-sm group-hover:text-gold transition-colors">{option.label}</span>
                        </div>
                      </div>
                      <span className="text-xs text-grey">({option.count})</span>
                    </motion.label>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Clear Filters */}
      <motion.button
        className="w-full mt-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors rounded-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Clear All Filters
      </motion.button>
    </motion.div>
  )
}
