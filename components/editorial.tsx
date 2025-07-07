export default function Editorial() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="editorial-content">
            <h2 className="section-title text-4xl font-bold mb-6">The Art of Timeless Style</h2>
            <p className="text-lg text-grey mb-6 leading-relaxed">
              Our philosophy centers on creating pieces that transcend seasonal trends. Each item in our collection is
              carefully selected for its exceptional quality, craftsmanship, and enduring appeal.
            </p>
            <p className="text-lg text-grey mb-8 leading-relaxed">
              From the finest fabrics to meticulous attention to detail, we believe that true luxury lies in the perfect
              balance of form and function.
            </p>
            <a href="#" className="inline-block text-gold font-medium hover:underline">
              Read Our Story →
            </a>
          </div>
          <div className="editorial-image">
            <img src="/placeholder.svg?height=600&width=500" alt="Editorial" className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
