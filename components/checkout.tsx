"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Footer from "@/components/footer"

export default function Checkout() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  
  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  })
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiryDate: "",
    cvv: ""
  })
  
  // Calculate shipping cost (free over $100)
  const shippingCost = total >= 100 ? 0 : 12
  
  // Calculate tax (assuming 8.5%)
  const taxRate = 0.085
  const tax = total * taxRate
  
  // Calculate grand total
  const grandTotal = total + shippingCost + tax
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
  }
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, validate the form data here
    setCurrentStep(2)
    window.scrollTo(0, 0)
  }
  
  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderComplete(true)
      clearCart()
      window.scrollTo(0, 0)
    }, 2000)
  }
  
  const handleBackToShopping = () => {
    router.push("/products")
  }
  
  // If no items in cart, redirect to cart page
  if (items.length === 0 && !orderComplete) {
    return (
      <>
        <section className="section-padding">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-heading mb-6">Checkout</h1>
            <p className="text-grey mb-8">Your cart is empty. Please add items before proceeding to checkout.</p>
            <button 
              onClick={() => router.push("/cart")}
              className="btn px-6 py-3 bg-black text-white hover:bg-gold transition-colors"
            >
              Return to Cart
            </button>
          </div>
        </section>
        <Footer />
      </>
    )
  }
  
  // Order complete screen
  if (orderComplete) {
    return (
      <>
        <section className="section-padding">
          <div className="container mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-heading mb-4">Thank You for Your Order!</h1>
              <p className="text-grey mb-8">
                Your order has been successfully placed. We've sent a confirmation email to your inbox.
              </p>
              
              <div className="border border-gray-200 rounded-lg p-6 mb-8">
                <h2 className="font-heading text-xl mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-grey">Order Number:</span>
                    <span className="font-medium">ML-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey">Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey">Total:</span>
                    <span className="font-medium">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleBackToShopping}
                className="btn px-8 py-3 bg-black text-white hover:bg-gold transition-colors"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
  
  return (
    <>
      <section className="section-padding">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-heading mb-8">Checkout</h1>
          
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between max-w-lg mx-auto">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-gold text-white' : 'bg-gray-200 text-grey'}`}>
                  1
                </div>
                <span className={currentStep >= 1 ? 'font-medium' : 'text-grey'}>Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-gold text-white' : 'bg-gray-200 text-grey'}`}>
                  2
                </div>
                <span className={currentStep >= 2 ? 'font-medium' : 'text-grey'}>Payment</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-gold text-white' : 'bg-gray-200 text-grey'}`}>
                  3
                </div>
                <span className={currentStep >= 3 ? 'font-medium' : 'text-grey'}>Confirmation</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-heading mb-6">Shipping Information</h2>
                  
                  <form onSubmit={handleSubmitShipping} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium">
                          First Name*
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block mb-2 text-sm font-medium">
                        Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="apartment" className="block mb-2 text-sm font-medium">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        id="apartment"
                        name="apartment"
                        value={shippingInfo.apartment}
                        onChange={handleShippingChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="city" className="block mb-2 text-sm font-medium">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block mb-2 text-sm font-medium">
                          State/Province*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block mb-2 text-sm font-medium">
                          ZIP Code*
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleShippingChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block mb-2 text-sm font-medium">
                        Country*
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleShippingChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Japan">Japan</option>
                      </select>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full btn py-3 bg-black text-white hover:bg-gold transition-colors"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-heading mb-6">Payment Information</h2>
                  
                  <form onSubmit={handleSubmitPayment} className="space-y-6">
                    <div>
                      <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium">
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="nameOnCard" className="block mb-2 text-sm font-medium">
                        Name on Card*
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        name="nameOnCard"
                        value={paymentInfo.nameOnCard}
                        onChange={handlePaymentChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expiryDate" className="block mb-2 text-sm font-medium">
                          Expiry Date*
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block mb-2 text-sm font-medium">
                          CVV*
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          required
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="btn py-3 px-6 border border-black text-black hover:bg-gray-100 transition-colors"
                      >
                        Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="btn py-3 px-6 bg-black text-white hover:bg-gold transition-colors flex-1 disabled:opacity-70"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Place Order"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-heading mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 relative flex-shrink-0">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        {(item.size || item.color) && (
                          <p className="text-xs text-grey">
                            {item.size && `Size: ${item.size}`} {item.color && `Color: ${item.color}`}
                          </p>
                        )}
                        <div className="flex justify-between text-sm mt-1">
                          <span>Qty: {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-grey">Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey">Shipping</span>
                    <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey">Tax (8.5%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
