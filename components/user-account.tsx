"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Package, Heart, CreditCard, User, Settings, LogOut } from "lucide-react"

export default function UserAccount() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock user data
  const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "/placeholder-user.jpg"
  }
  
  // Mock order data
  const orders = [
    {
      id: "ML-235789",
      date: "June 15, 2025",
      status: "Delivered",
      total: 420,
      items: [
        { name: "Silk Blouse", quantity: 1, price: 285 },
        { name: "Leather Handbag", quantity: 1, price: 135 }
      ]
    },
    {
      id: "ML-198342",
      date: "May 22, 2025",
      status: "Processing",
      total: 650,
      items: [
        { name: "Cashmere Coat", quantity: 1, price: 650 }
      ]
    }
  ]
  
  // Mock wishlist data
  const wishlistItems = [
    {
      id: "4",
      name: "Wool Trousers",
      price: 195,
      image: "/placeholder.svg?height=120&width=120"
    },
    {
      id: "7",
      name: "Linen Shirt",
      price: 145,
      image: "/placeholder.svg?height=120&width=120"
    }
  ]
  
  // Mock address data
  const addresses = [
    {
      id: "addr1",
      type: "Shipping",
      name: "Jane Smith",
      address: "123 Maple Street",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "United States",
      isDefault: true
    }
  ]
  
  // Mock payment methods
  const paymentMethods = [
    {
      id: "pay1",
      type: "Visa",
      last4: "4242",
      expiry: "06/26",
      isDefault: true
    }
  ]
  
  const handleLogout = () => {
    setIsLoading(true)
    
    // Simulate logout process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
    }, 1000)
  }
  
  const handleRemoveWishlistItem = (id: string, name: string) => {
    toast({
      title: "Item removed",
      description: `${name} has been removed from your wishlist.`,
    })
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User Profile Summary */}
          <motion.div 
            className="bg-gray-50 p-6 rounded-lg h-fit"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-medium text-lg">{user.name}</h2>
                <p className="text-sm text-grey">{user.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <a href="#orders" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                <Package size={18} />
                <span>Orders</span>
              </a>
              <a href="#wishlist" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                <Heart size={18} />
                <span>Wishlist</span>
              </a>
              <a href="#addresses" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                <CreditCard size={18} />
                <span>Addresses</span>
              </a>
              <a href="#payment" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                <User size={18} />
                <span>Payment Methods</span>
              </a>
              <a href="#settings" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md">
                <Settings size={18} />
                <span>Account Settings</span>
              </a>
              <button 
                onClick={handleLogout} 
                disabled={isLoading}
                className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md text-left"
              >
                <LogOut size={18} />
                <span>{isLoading ? "Logging out..." : "Logout"}</span>
              </button>
            </nav>
          </motion.div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              {/* Orders Tab */}
              <TabsContent value="orders">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-2xl font-heading mb-6">My Orders</h2>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Package size={48} className="mx-auto text-grey mb-4" />
                      <h3 className="text-xl font-heading mb-2">No orders yet</h3>
                      <p className="text-grey mb-4">You haven't placed any orders yet.</p>
                      <a href="/products" className="btn px-6 py-2 bg-black text-white hover:bg-gold transition-colors inline-block">
                        Start Shopping
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <motion.div 
                          key={order.id}
                          variants={itemVariants}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-200">
                            <div>
                              <span className="text-sm text-grey">Order</span>
                              <h3 className="font-medium">{order.id}</h3>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-grey">Date</span>
                              <p>{order.date}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-grey">Status</span>
                              <p className={order.status === "Delivered" ? "text-green-600" : "text-blue-600"}>
                                {order.status}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-grey">Total</span>
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="font-medium mb-3">Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                  <div>
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-grey ml-2">x{item.quantity}</span>
                                  </div>
                                  <div>${item.price.toFixed(2)}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
                            <button className="text-black hover:text-gold transition-colors">
                              View Order Details
                            </button>
                            <button className="btn px-6 py-2 bg-black text-white hover:bg-gold transition-colors">
                              Track Order
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </TabsContent>
              
              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-2xl font-heading mb-6">My Wishlist</h2>
                  
                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Heart size={48} className="mx-auto text-grey mb-4" />
                      <h3 className="text-xl font-heading mb-2">Your wishlist is empty</h3>
                      <p className="text-grey mb-4">Add items you love to your wishlist.</p>
                      <a href="/products" className="btn px-6 py-2 bg-black text-white hover:bg-gold transition-colors inline-block">
                        Browse Products
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {wishlistItems.map((item) => (
                        <motion.div 
                          key={item.id}
                          variants={itemVariants}
                          className="border border-gray-200 rounded-lg overflow-hidden flex"
                        >
                          <div className="w-24 h-24 bg-gray-100 relative">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-grey">${item.price.toFixed(2)}</p>
                            </div>
                            
                            <div className="flex gap-3 mt-3">
                              <button className="btn text-sm px-4 py-1 bg-black text-white hover:bg-gold transition-colors">
                                Add to Cart
                              </button>
                              <button 
                                onClick={() => handleRemoveWishlistItem(item.id, item.name)}
                                className="btn text-sm px-4 py-1 border border-gray-300 hover:border-red-500 hover:text-red-500 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </TabsContent>
              
              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-heading">My Addresses</h2>
                    <button className="btn px-4 py-2 border border-gray-300 hover:bg-gray-100 transition-colors">
                      Add New Address
                    </button>
                  </div>
                  
                  {addresses.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <h3 className="text-xl font-heading mb-2">No addresses saved</h3>
                      <p className="text-grey mb-4">Add your shipping and billing addresses.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((address) => (
                        <motion.div 
                          key={address.id}
                          variants={itemVariants}
                          className="border border-gray-200 rounded-lg p-4 relative"
                        >
                          {address.isDefault && (
                            <span className="absolute top-4 right-4 bg-gold text-black text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                          
                          <h3 className="font-medium mb-1">{address.type} Address</h3>
                          <div className="text-grey space-y-1 mb-4">
                            <p>{address.name}</p>
                            <p>{address.address}</p>
                            <p>{address.city}, {address.state} {address.zipCode}</p>
                            <p>{address.country}</p>
                          </div>
                          
                          <div className="flex gap-3">
                            <button className="text-black hover:text-gold transition-colors text-sm">
                              Edit
                            </button>
                            {!address.isDefault && (
                              <button className="text-black hover:text-gold transition-colors text-sm">
                                Set as Default
                              </button>
                            )}
                            <button className="text-red-500 hover:text-red-700 transition-colors text-sm">
                              Delete
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </TabsContent>
              
              {/* Payment Methods Tab */}
              <TabsContent value="payment">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-heading">Payment Methods</h2>
                    <button className="btn px-4 py-2 border border-gray-300 hover:bg-gray-100 transition-colors">
                      Add New Card
                    </button>
                  </div>
                  
                  {paymentMethods.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <CreditCard size={48} className="mx-auto text-grey mb-4" />
                      <h3 className="text-xl font-heading mb-2">No payment methods saved</h3>
                      <p className="text-grey mb-4">Add a payment method for faster checkout.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {paymentMethods.map((method) => (
                        <motion.div 
                          key={method.id}
                          variants={itemVariants}
                          className="border border-gray-200 rounded-lg p-4 relative"
                        >
                          {method.isDefault && (
                            <span className="absolute top-4 right-4 bg-gold text-black text-xs px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                          
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-medium">{method.type}</span>
                            <span className="text-grey">•••• {method.last4}</span>
                          </div>
                          
                          <p className="text-sm text-grey mb-4">Expires: {method.expiry}</p>
                          
                          <div className="flex gap-3">
                            {!method.isDefault && (
                              <button className="text-black hover:text-gold transition-colors text-sm">
                                Set as Default
                              </button>
                            )}
                            <button className="text-red-500 hover:text-red-700 transition-colors text-sm">
                              Remove
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </TabsContent>
              
              {/* Account Settings Tab */}
              <TabsContent value="settings">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-heading mb-6">Account Settings</h2>
                  
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-heading mb-4">Personal Information</h3>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block mb-1 text-sm font-medium">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              defaultValue="Jane"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block mb-1 text-sm font-medium">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              defaultValue="Smith"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="block mb-1 text-sm font-medium">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            defaultValue="jane.smith@example.com"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block mb-1 text-sm font-medium">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            defaultValue="(555) 123-4567"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                          />
                        </div>
                        <button className="btn px-4 py-2 bg-black text-white hover:bg-gold transition-colors">
                          Save Changes
                        </button>
                      </form>
                    </div>
                    
                    {/* Change Password */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-heading mb-4">Change Password</h3>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block mb-1 text-sm font-medium">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                          />
                        </div>
                        <div>
                          <label htmlFor="newPassword" className="block mb-1 text-sm font-medium">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                          />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-gold"
                          />
                        </div>
                        <button className="btn px-4 py-2 bg-black text-white hover:bg-gold transition-colors">
                          Update Password
                        </button>
                      </form>
                    </div>
                    
                    {/* Notification Preferences */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-heading mb-4">Notification Preferences</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Order Updates</h4>
                            <p className="text-sm text-grey">Receive updates about your orders</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 border border-gray-300 rounded-full">
                            <input
                              type="checkbox"
                              id="orderUpdates"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-gold"></span>
                            <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-all transform peer-checked:translate-x-6 border border-gray-300"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Promotions & Sales</h4>
                            <p className="text-sm text-grey">Receive special offers and promotions</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 border border-gray-300 rounded-full">
                            <input
                              type="checkbox"
                              id="promotions"
                              className="sr-only peer"
                              defaultChecked
                            />
                            <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-gold"></span>
                            <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-all transform peer-checked:translate-x-6 border border-gray-300"></span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">New Product Arrivals</h4>
                            <p className="text-sm text-grey">Be the first to know about new products</p>
                          </div>
                          <div className="relative inline-block w-12 h-6 border border-gray-300 rounded-full">
                            <input
                              type="checkbox"
                              id="newProducts"
                              className="sr-only peer"
                            />
                            <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-gold"></span>
                            <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full transition-all transform peer-checked:translate-x-6 border border-gray-300"></span>
                          </div>
                        </div>
                      </div>
                      <button className="btn px-4 py-2 bg-black text-white hover:bg-gold transition-colors mt-4">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}
