"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Minus, Plus, Share2, ShoppingBag, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import QRCode from "qrcode.react"

// Mock product data - in a real app, this would come from an API
const getProductById = (id: number) => {
  return {
    id,
    name: "Premium Cotton Comfort Fit Shirt",
    brand: "Fashionista",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.5,
    reviews: 128,
    description:
      "This premium cotton shirt offers both comfort and style. Perfect for casual and semi-formal occasions, it features a modern cut with attention to detail in every stitch.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    colors: [
      { name: "White", value: "#FFFFFF", inStock: true },
      { name: "Black", value: "#000000", inStock: true },
      { name: "Navy Blue", value: "#000080", inStock: true },
      { name: "Light Blue", value: "#ADD8E6", inStock: false },
    ],
    sizes: [
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "XXL", inStock: false },
    ],
    material: "100% Cotton",
    care: "Machine wash cold, tumble dry low",
    features: [
      "Premium quality fabric",
      "Comfortable fit",
      "Durable construction",
      "Versatile styling options",
      "Easy care instructions",
    ],
    deliveryTime: "3-5 business days",
    inStock: true,
    sku: "FS-" + id + "-PCF",
    category: "men",
    isNew: true,
  }
}

interface ProductDetailsProps {
  productId: number
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const product = getProductById(productId)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name)
  const [quantity, setQuantity] = useState(1)
  const [pincode, setPincode] = useState("")
  const [isCheckingDelivery, setIsCheckingDelivery] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState<string | null>(null)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { toast } = useToast()

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName)
  }

  const handleSizeSelect = (sizeName: string) => {
    setSelectedSize(sizeName)
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const checkDelivery = () => {
    if (pincode.length !== 5) {
      toast({
        title: "Invalid PIN code",
        description: "Please enter a valid 5-digit PIN code.",
        variant: "destructive",
      })
      return
    }

    setIsCheckingDelivery(true)

    // Simulate API call
    setTimeout(() => {
      setIsCheckingDelivery(false)
      setDeliveryInfo(`Delivery available to ${pincode}. Estimated delivery in ${product.deliveryTime}.`)
    }, 1500)
  }

  const addToCart = () => {
    toast({
      title: "Added to bag",
      description: `${product.name} (${selectedSize}, ${selectedColor}) has been added to your bag.`,
    })
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted
        ? "The item has been removed from your wishlist."
        : "The item has been added to your wishlist.",
    })
  }

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} from Fashionista!`,
        url: window.location.href,
      })
    } else {
      toast({
        title: "Share",
        description: "Copy link: " + window.location.href,
      })
    }
  }

  // Generate QR code data
  const qrCodeData = JSON.stringify({
    product: product.name,
    brand: product.brand,
    price: product.price,
    material: product.material,
    sku: product.sku,
    shippingTime: product.deliveryTime,
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-md overflow-hidden w-20 h-20 flex-shrink-0 border-2 ${
                selectedImage === index ? "border-pink-500" : "border-transparent"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.name} - View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{product.brand}</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center text-yellow-500 mr-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "stroke-current fill-none"}`}
                  />
                ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-2xl font-bold">${product.price}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-gray-500 line-through text-lg ml-2">${product.originalPrice}</span>
              <span className="ml-2 text-sm font-medium text-green-600">({product.discount}% OFF)</span>
            </>
          )}
        </div>

        <div className="space-y-4">
          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium mb-3">Color: {selectedColor}</h3>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => color.inStock && handleColorSelect(color.name)}
                  className={`w-10 h-10 rounded-full relative ${
                    !color.inStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  } ${selectedColor === color.name ? "ring-2 ring-pink-500 ring-offset-2" : ""}`}
                  disabled={!color.inStock}
                  title={color.name}
                >
                  <span className="absolute inset-0 rounded-full" style={{ backgroundColor: color.value }}></span>
                  {!color.inStock && (
                    <span className="absolute inset-0 flex items-center justify-center text-red-500 font-bold text-xs">
                      X
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Size: {selectedSize}</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="h-auto p-0 text-sm">
                    Size Guide
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Size Guide</DialogTitle>
                    <DialogDescription>Find your perfect fit with our size chart.</DialogDescription>
                  </DialogHeader>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                          <th className="border p-2 text-left">Size</th>
                          <th className="border p-2 text-left">Chest (in)</th>
                          <th className="border p-2 text-left">Waist (in)</th>
                          <th className="border p-2 text-left">Length (in)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2">S</td>
                          <td className="border p-2">36-38</td>
                          <td className="border p-2">30-32</td>
                          <td className="border p-2">28</td>
                        </tr>
                        <tr>
                          <td className="border p-2">M</td>
                          <td className="border p-2">38-40</td>
                          <td className="border p-2">32-34</td>
                          <td className="border p-2">29</td>
                        </tr>
                        <tr>
                          <td className="border p-2">L</td>
                          <td className="border p-2">40-42</td>
                          <td className="border p-2">34-36</td>
                          <td className="border p-2">30</td>
                        </tr>
                        <tr>
                          <td className="border p-2">XL</td>
                          <td className="border p-2">42-44</td>
                          <td className="border p-2">36-38</td>
                          <td className="border p-2">31</td>
                        </tr>
                        <tr>
                          <td className="border p-2">XXL</td>
                          <td className="border p-2">44-46</td>
                          <td className="border p-2">38-40</td>
                          <td className="border p-2">32</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => size.inStock && handleSizeSelect(size.name)}
                  className={`h-10 min-w-10 px-3 rounded border text-sm font-medium ${
                    !size.inStock
                      ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
                      : selectedSize === size.name
                        ? "bg-pink-100 border-pink-500 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
                        : "hover:border-gray-400"
                  }`}
                  disabled={!size.inStock}
                >
                  {size.name}
                  {!size.inStock && <span className="block text-xs text-red-500">Out of stock</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity} className="h-10 w-10">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Delivery Check */}
          <div>
            <h3 className="text-sm font-medium mb-3">Check Delivery Availability</h3>
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Enter PIN code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                className="w-40 mr-2"
              />
              <Button variant="outline" onClick={checkDelivery} disabled={isCheckingDelivery || pincode.length !== 5}>
                {isCheckingDelivery ? "Checking..." : "Check"}
              </Button>
            </div>
            {deliveryInfo && (
              <p className="text-sm text-green-600 mt-2 flex items-center">
                <Truck className="h-4 w-4 mr-1" /> {deliveryInfo}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white flex-1" onClick={addToCart}>
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Bag
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`flex-1 ${isWishlisted ? "text-pink-600" : ""}`}
              onClick={toggleWishlist}
            >
              <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
              {isWishlisted ? "Wishlisted" : "Wishlist"}
            </Button>
          </div>
        </div>

        {/* Product QR Code */}
        <div className="border-t pt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                View Product QR Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Product QR Code</DialogTitle>
                <DialogDescription>Scan this QR code to quickly access product information.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center p-4">
                <QRCode value={qrCodeData} size={200} />
                <Button className="mt-4" onClick={() => {}}>
                  Download QR Code
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Product Meta */}
        <div className="border-t pt-4 space-y-2 text-sm">
          <div className="flex">
            <span className="font-medium w-24">SKU:</span>
            <span>{product.sku}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-24">Category:</span>
            <span className="capitalize">{product.category}</span>
          </div>
          <div className="flex">
            <span className="font-medium w-24">Material:</span>
            <span>{product.material}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-24">Share:</span>
            <Button variant="ghost" size="sm" className="h-8 p-0" onClick={shareProduct}>
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
