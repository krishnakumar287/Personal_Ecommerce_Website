export default function ProductGrid() {
  const products = [
    {
      id: 1,
      name: "Silk Blouse",
      price: "$285",
      image: "/placeholder.svg?height=500&width=400",
      category: "Women's",
    },
    {
      id: 2,
      name: "Cashmere Coat",
      price: "$650",
      image: "/placeholder.svg?height=500&width=400",
      category: "Outerwear",
    },
    {
      id: 3,
      name: "Leather Handbag",
      price: "$420",
      image: "/placeholder.svg?height=500&width=400",
      category: "Accessories",
    },
    {
      id: 4,
      name: "Wool Trousers",
      price: "$195",
      image: "/placeholder.svg?height=500&width=400",
      category: "Men's",
    },
    {
      id: 5,
      name: "Pearl Necklace",
      price: "$340",
      image: "/placeholder.svg?height=500&width=400",
      category: "Jewelry",
    },
    {
      id: 6,
      name: "Silk Scarf",
      price: "$125",
      image: "/placeholder.svg?height=500&width=400",
      category: "Accessories",
    },
  ]

  return (
    <section className="section-padding bg-off-white">
      <div className="container mx-auto px-8">
        <h2 className="section-title text-h2 font-bold text-center mb-16 font-heading">Featured Products</h2>
        <div className="products-grid grid-gap mb-12">
          {products.map((product) => (
            <div key={product.id} className="product-card group cursor-pointer">
              <div className="relative overflow-hidden mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {product.category}
                </div>
              </div>
              <div className="product-info">
                <h3 className="text-h3 font-medium mb-2 font-heading">{product.name}</h3>
                <p className="text-2xl font-semibold text-gold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button className="btn px-8 py-3 bg-transparent border border-black text-black hover:bg-gold hover:text-black transition-colors">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}
