"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag, Heart, User, Search, Menu } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import SearchModal from "./search-modal"
import MobileMenu from "./mobile-menu"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { items } = useCart()
  const { items: wishlistItems } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-black">
              Minimal Luxe
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-black hover:text-gold transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search size={20} />
              </button>

              <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingBag size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>

              <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User size={20} />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} navItems={navItems} />
    </>
  )
}
