import React from 'react';
import '../styles/Home.css';

"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Heart, Play, ArrowUp, Instagram, Facebook, Twitter } from "lucide-react"

export default function MinimalLuxeHome() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  const products = [
    {
      id: 1,
      name: "Elegant Silk Dress",
      price: "$129.00",
      image: "/placeholder.svg?height=500&width=400",
      images: [
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
      ],
      description: "Luxurious silk dress with timeless elegance",
    },
    {
      id: 2,
      name: "Tailored Wool Blazer",
      price: "$199.00",
      image: "/placeholder.svg?height=500&width=400",
      images: [
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
      ],
      description: "Perfectly tailored blazer for the modern professional",
    },
    {
      id: 3,
      name: "Cashmere Sweater",
      price: "$159.00",
      image: "/placeholder.svg?height=500&width=400",
      images: [
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
      ],
      description: "Ultra-soft cashmere for ultimate comfort",
    },
    {
      id: 4,
      name: "Leather Handbag",
      price: "$249.00",
      image: "/placeholder.svg?height=500&width=400",
      images: [
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
        "/placeholder.svg?height=500&width=400",
      ],
      description: "Handcrafted leather bag with minimalist design",
    },
  ]

  const testimonials = [
    {
      text: "Absolutely stunning product quality and attention to detail.",
      author: "Maya R.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      text: "Feels like luxury, looks like art. I love every piece!",
      author: "Arjun S.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      text: "The craftsmanship is unparalleled. Worth every penny.",
      author: "Sofia L.",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const categories = [
    { name: "Minimalist", link: "/shop?category=minimalist" },
    { name: "Sustainable", link: "/shop?category=sustainable" },
    { name: "Limited Edition", link: "/shop?category=limited" },
  ]

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setShowBackToTop(scrolled)
      setHeaderScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll(".scroll-reveal")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const toggleWishlist = (productId) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Sticky Header */}
      <header className={`sticky-header ${headerScrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold" style={{ fontFamily: "Playfair Display" }}>
            Minimal Luxe
          </h1>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection("featured")} className="hover:text-[var(--gold)] transition-colors">
              Shop
            </button>
            <button onClick={() => scrollToSection("story")} className="hover:text-[var(--gold)] transition-colors">
              Story
            </button>
            <button
              onClick={() => scrollToSection("categories")}
              className="hover:text-[var(--gold)] transition-colors"
            >
              Collections
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/placeholder.svg?height=1080&width=1920)" }}
        />
        <div className="hero-overlay" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 scroll-reveal">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "Playfair Display" }}>
            Redefine Luxury
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">Where timeless design meets modern craftsmanship.</p>
          <button
            style={{ background: "var(--gold)", color: "var(--black)", padding: "0.75rem 2rem", fontSize: "1.125rem", borderRadius: "0.375rem", border: "none", cursor: "pointer" }}
            onClick={() => scrollToSection("featured")}
          >
            Shop Collection
          </button>
        </div>

        <div className="scroll-indicator">
          <ChevronDown
            className="w-8 h-8 text-white cursor-pointer hover:text-[var(--gold)] transition-colors"
            onClick={() => scrollToSection("featured")}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-20 px-4 max-w-7xl mx-auto scroll-reveal">
        <h2 className="text-4xl md:text-5xl text-left mb-16 relative">
          Featured Collection
          <div className="absolute bottom-0 left-0 w-20 h-1 bg-[var(--gold)] mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="product-card border-0 shadow-lg bg-white">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                  loading="lazy"
                />
                <div className="product-overlay">
                  {/* Dialog replaced with a simple modal trigger */}
                  <button style={{ background: "#fff", color: "#1C1C1E", padding: "0.5rem 1rem", borderRadius: "0.375rem", border: "none", cursor: "pointer", marginRight: "0.5rem" }} onClick={() => setSelectedProduct(product)}>
                    Quick View
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-current text-red-500" : ""}`} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-[var(--gold)] text-lg font-medium">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="Craftsmanship"
                className="w-full h-96 object-cover rounded-lg"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button
                  style={{ background: "#fff", color: "#1C1C1E", padding: "0.75rem 2rem", fontSize: "1.125rem", borderRadius: "0.375rem", border: "none", cursor: "pointer" }}
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Our Story
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold relative mb-6">
                The Art of Craftsmanship
                <div className="absolute bottom-0 left-0 w-20 h-1 bg-[var(--gold)] mt-4"></div>
              </h2>
              <p className="text-lg text-[var(--grey)] leading-relaxed">
                Each piece is hand-crafted using sustainable methods and timeless materials. Minimal Luxe represents a journey — not just through fashion, but through form and feeling.
              </p>
              <p className="text-lg text-[var(--grey)] leading-relaxed">
                Our artisans bring decades of experience to every stitch, every cut, every detail. This is luxury redefined for the conscious consumer.
              </p>
              <button
                style={{ borderColor: "var(--gold)", color: "var(--gold)", padding: "0.5rem 1.5rem", fontSize: "1rem", borderRadius: "0.375rem", border: "2px solid var(--gold)", background: "transparent", cursor: "pointer" }}
                onClick={() => scrollToSection("story")}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 px-4 max-w-7xl mx-auto scroll-reveal">
        <h2 className="text-4xl md:text-5xl text-left mb-16 relative">
          Shop by Mood
          <div className="absolute bottom-0 left-0 w-20 h-1 bg-[var(--gold)] mt-4"></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 border-0 shadow-lg cursor-pointer overflow-hidden"
              onClick={() => (window.location.href = category.link)}
            >
              <div className="h-full flex items-center justify-center">
                <h3 className="text-2xl font-semibold text-center">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white scroll-reveal">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl text-left mb-16 relative">
            What Our Customers Say
            <div className="absolute bottom-0 left-0 w-20 h-1 bg-[var(--gold)] mt-4"></div>
          </h2>

          <div className="testimonial-carousel relative">
            <div className="testimonial space-y-6">
              <div className="flex justify-center mb-6">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].author}
                  className="w-16 h-16 rounded-full object-cover grayscale"
                />
              </div>
              <p className="text-xl md:text-2xl italic text-[var(--grey)] leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              <p className="text-lg font-medium">– {testimonials[currentTestimonial].author}</p>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-[var(--gold)]" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20 px-4 bg-[var(--black)] text-white scroll-reveal">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">Stay in the Know</h2>
          <p className="text-xl">Join for 10% off your first order</p>
          <p className="text-[var(--grey)]">Join 10,000+ minimal luxe lovers</p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-3 rounded bg-white text-[var(--black)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
              aria-label="Email address for newsletter subscription"
            />
            <button
              type="submit"
              className="bg-[var(--gold)] text-[var(--black)] hover:bg-white hover:text-[var(--black)] px-8 py-3"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--off-white)] py-16 px-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-[var(--grey)]">
                <li>
                  <a href="/about" className="hover:text-[var(--gold)] transition-colors">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="/sustainability" className="hover:text-[var(--gold)] transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:text-[var(--gold)] transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Customer Care</h3>
              <ul className="space-y-2 text-[var(--grey)]">
                <li>
                  <a href="/shipping" className="hover:text-[var(--gold)] transition-colors">
                    Shipping & Returns
                  </a>
                </li>
                <li>
                  <a href="/size-guide" className="hover:text-[var(--gold)] transition-colors">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-[var(--gold)] transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-[var(--grey)]">
                <li>
                  <a href="/privacy" className="hover:text-[var(--gold)] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-[var(--gold)] transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/cookies" className="hover:text-[var(--gold)] transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[var(--grey)] hover:text-[var(--gold)] transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-[var(--grey)] hover:text-[var(--gold)] transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-[var(--grey)] hover:text-[var(--gold)] transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center text-[var(--grey)]">
            <p>&copy; 2025 Minimal Luxe. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${showBackToTop ? "show" : ""} bg-[var(--gold)] text-[var(--black)] hover:bg-[var(--black)] hover:text-[var(--gold)] rounded-full w-12 h-12 p-0`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </>
  )
}
