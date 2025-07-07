"use client"

import React from "react"

export default function CategoriesHeroSlideshow() {
  return (
    <section className="relative py-16 md:py-20 bg-black text-white overflow-hidden shadow-md">
      <div className="absolute inset-0">
        <img
          src="/categories.jpg"
          alt="Categories Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20 shadow"
          style={{ zIndex: 1 }}
          loading="eager"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8">Categories</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Explore our carefully curated collections, each telling its own story of elegance and sophistication
          </p>
        </div>
      </div>
    </section>
  )
}
