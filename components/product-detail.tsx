"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ShoppingBag, Heart, Share2, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"

// Define the product interface
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  gallery: string[];
  category: string;
  isNew?: boolean;
  rating: number;
  reviews: number;
  colors: string[];
  sizes?: string[];
  details: string[];
  sku: string;
  inStock: boolean;
}

// Mock data - in a real app, this would come from an API or CMS
const mockProductData: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Silk Blouse",
    price: 285,
    originalPrice: 320,
    description: "Luxurious silk blouse with a relaxed fit and subtle sheen. Features a classic collar and button-down front for timeless elegance.",
    image: "/placeholder.svg?height=600&width=500",
    gallery: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500&text=View+2",
      "/placeholder.svg?height=600&width=500&text=View+3",
      "/placeholder.svg?height=600&width=500&text=View+4",
    ],
    category: "Women's",
    isNew: true,
    rating: 4.8,
    reviews: 124,
    colors: ["White", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% Pure Silk",
      "Button-down front",
      "Regular fit",
      "Hand wash cold or dry clean",
      "Made in Italy"
    ],
    sku: "SB-2023-001",
    inStock: true
  },
  "2": {
    id: "2",
    name: "Cashmere Coat",
    price: 650,
    description: "Premium cashmere coat with a streamlined silhouette. This timeless piece offers exceptional warmth and luxurious softness.",
    image: "/placeholder.svg?height=600&width=500",
    gallery: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500&text=View+2",
      "/placeholder.svg?height=600&width=500&text=View+3",
    ],
    category: "Outerwear",
    rating: 4.9,
    reviews: 89,
    colors: ["Camel", "Black", "Grey"],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Pure Cashmere",
      "Double-breasted design",
      "Welt pockets",
      "Dry clean only",
      "Made in Scotland"
    ],
    sku: "CC-2023-002",
    inStock: true
  },
  "3": {
    id: "3",
    name: "Leather Handbag",
    price: 420,
    description: "Handcrafted leather handbag with sophisticated design. Features a spacious interior, internal pocket, and adjustable shoulder strap.",
    image: "/placeholder.svg?height=600&width=500",
    gallery: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500&text=View+2",
      "/placeholder.svg?height=600&width=500&text=View+3",
    ],
    category: "Accessories",
    rating: 4.7,
    reviews: 156,
    colors: ["Brown", "Black", "Tan"],
    details: [
      "Full-grain leather",
      "Cotton lining",
      "Interior zip pocket",
      "Magnetic closure",
      "Made in Italy"
    ],
    sku: "LH-2023-003",
    inStock: true
  }
};

// Default product for fallback
const defaultProduct = {
  id: "0",
  name: "Product Not Found",
  price: 0,
  description: "Sorry, this product could not be found.",
  image: "/placeholder.svg?height=600&width=500&text=Not+Found",
  gallery: ["/placeholder.svg?height=600&width=500&text=Not+Found"],
  category: "Unknown",
  rating: 0,
  reviews: 0,
  colors: [],
  sizes: [],
  details: [],
  sku: "N/A",
  inStock: false
};

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const [showShipping, setShowShipping] = useState(false);
  
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
  // Get product data based on ID, or fallback to default
  const product = mockProductData[productId as keyof typeof mockProductData] || defaultProduct;
  
  const handleAddToCart = () => {
    if (!product.inStock) {
      toast({
        title: "Out of stock",
        description: "Sorry, this product is currently out of stock.",
        variant: "destructive"
      });
      return;
    }
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Size required",
        description: "Please select a size before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Color required",
        description: "Please select a color before adding to cart.",
        variant: "destructive"
      });
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      color: selectedColor,
      size: selectedSize
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              <motion.img
                src={product.gallery[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.gallery.map((image: string, index: number) => (
                <button
                  key={index}
                  className={`w-20 h-24 flex-shrink-0 border-2 ${activeImage === index ? 'border-gold' : 'border-transparent'}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Product Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="text-grey font-body mb-2">{product.category}</p>
              <h1 className="text-h2 font-heading mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-grey">({product.reviews} reviews)</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-semibold text-black font-heading">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-grey line-through">${product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-sm mt-1 text-green-600">
                    Save ${product.originalPrice - product.price} ({Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%)
                  </p>
                )}
              </div>
              
              <p className="text-body font-body leading-relaxed mb-8">{product.description}</p>
            </div>
            
            {/* Color Options */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-3">
                <p className="font-medium">Color: {selectedColor}</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      className={`px-4 py-2 border ${selectedColor === color ? 'border-gold bg-gold/10' : 'border-gray-300'}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="font-medium">Size: {selectedSize}</p>
                  <button className="text-sm text-gold underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes && product.sizes.map((size: string) => (
                    <button
                      key={size}
                      className={`w-12 h-12 flex items-center justify-center border ${selectedSize === size ? 'border-gold bg-gold/10' : 'border-gray-300'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex border border-gray-300 w-36 h-12">
                <button 
                  className="w-12 flex items-center justify-center border-r border-gray-300"
                  onClick={decrementQuantity}
                >
                  <ChevronDown size={18} />
                </button>
                <div className="flex-1 flex items-center justify-center font-medium">
                  {quantity}
                </div>
                <button 
                  className="w-12 flex items-center justify-center border-l border-gray-300"
                  onClick={incrementQuantity}
                >
                  <ChevronUp size={18} />
                </button>
              </div>
              
              <button
                className="btn flex-1 h-12 bg-black text-white hover:bg-gold hover:text-black flex items-center justify-center gap-2 font-medium"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingBag size={18} />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button
                className="btn h-12 w-12 border border-gray-300 flex items-center justify-center"
                onClick={handleWishlistToggle}
              >
                <Heart 
                  size={18} 
                  className={isInWishlist(product.id) ? 'fill-gold text-gold' : ''} 
                />
              </button>
            </div>
            
            {/* SKU */}
            <p className="text-sm text-grey">SKU: {product.sku}</p>
            
            {/* Accordion Details */}
            <div className="border-t border-b border-gray-200 py-2">
              <button
                className="w-full py-3 flex items-center justify-between"
                onClick={() => setShowDetails(!showDetails)}
              >
                <span className="font-medium">Product Details</span>
                {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {showDetails && (
                <div className="pb-4 space-y-2">
                  <ul className="list-disc pl-5 text-body font-body space-y-1">
                    {product.details.map((detail: string, index: number) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="border-b border-gray-200 py-2">
              <button
                className="w-full py-3 flex items-center justify-between"
                onClick={() => setShowShipping(!showShipping)}
              >
                <span className="font-medium">Shipping & Returns</span>
                {showShipping ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {showShipping && (
                <div className="pb-4 space-y-3 text-body font-body">
                  <p>Free standard shipping on orders over $100</p>
                  <p>Express shipping available for an additional charge</p>
                  <p>Free returns within 30 days of delivery</p>
                </div>
              )}
            </div>
            
            {/* Share */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Share:</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gold hover:text-white transition-colors">
                <Share2 size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
