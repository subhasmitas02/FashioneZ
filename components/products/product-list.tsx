"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

// Mock data for products - in a real app, this would come from an API
const allProducts = [
  {
    id: 1,
    name: "Slim Fit Cotton Shirt",
    brand: "Fashionista",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.5,
    reviews: 128,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#FFFFFF", "#000000", "#0000FF"],
    sizes: ["S", "M", "L", "XL"],
    category: "men",
    isNew: true,
  },
  {
    id: 2,
    name: "Floral Print Maxi Dress",
    brand: "Elegance",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.2,
    reviews: 95,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#FF0000", "#00FF00", "#0000FF"],
    sizes: ["S", "M", "L"],
    category: "women",
    isNew: false,
  },
  {
    id: 3,
    name: "Kids Cartoon Print T-Shirt",
    brand: "KidsFun",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    rating: 4.8,
    reviews: 67,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#FFFF00", "#FF00FF", "#00FFFF"],
    sizes: ["2-3Y", "4-5Y", "6-7Y"],
    category: "kids",
    isNew: true,
  },
  {
    id: 4,
    name: "Leather Jacket",
    brand: "UrbanEdge",
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    rating: 4.6,
    reviews: 203,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#000000", "#8B4513"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "men",
    isNew: false,
  },
  {
    id: 5,
    name: "Casual Denim Jeans",
    brand: "DenimLife",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.3,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#0000FF", "#000000", "#808080"],
    sizes: ["28", "30", "32", "34", "36"],
    category: "men",
    isNew: false,
  },
  {
    id: 6,
    name: "Summer Floral Blouse",
    brand: "Elegance",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    rating: 4.4,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#FFFFFF", "#FFC0CB", "#ADD8E6"],
    sizes: ["XS", "S", "M", "L"],
    category: "women",
    isNew: true,
  },
  {
    id: 7,
    name: "Sports Running Shoes",
    brand: "ActiveLife",
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.7,
    reviews: 215,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#000000", "#FF0000", "#FFFFFF"],
    sizes: ["7", "8", "9", "10", "11"],
    category: "men",
    isNew: false,
  },
  {
    id: 8,
    name: "Elegant Evening Gown",
    brand: "LuxeStyle",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.9,
    reviews: 78,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#FF0000", "#000000", "#0000FF"],
    sizes: ["S", "M", "L"],
    category: "women",
    isNew: true,
  },
  {
    id: 9,
    name: "Kids Denim Overalls",
    brand: "KidsFun",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    rating: 4.5,
    reviews: 56,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#0000FF", "#000000"],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    category: "kids",
    isNew: false,
  },
  {
    id: 10,
    name: "Wool Winter Coat",
    brand: "UrbanEdge",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.7,
    reviews: 112,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#000000", "#808080", "#8B4513"],
    sizes: ["S", "M", "L", "XL"],
    category: "women",
    isNew: true,
  },
  {
    id: 11,
    name: "Printed Casual T-Shirt",
    brand: "Fashionista",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    rating: 4.3,
    reviews: 87,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#FFFFFF", "#000000", "#FF0000", "#00FF00"],
    sizes: ["S", "M", "L", "XL"],
    category: "men",
    isNew: false,
  },
  {
    id: 12,
    name: "Kids Winter Boots",
    brand: "KidsFun",
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.6,
    reviews: 43,
    image: "/placeholder.svg?height=400&width=300",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
    colors: ["#000000", "#8B4513", "#FF0000"],
    sizes: ["4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    category: "kids",
    isNew: true,
  },
]

interface ProductListProps {
  category: string
}

export default function ProductList({ category }: ProductListProps) {
  const [wishlist, setWishlist] = useState<number[]>([])
  const { toast } = useToast()

  // Filter products by category
  const products = category === "all" ? allProducts : allProducts.filter((product) => product.category === category)

  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId))
      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist.",
      })
    } else {
      setWishlist([...wishlist, productId])
      toast({
        title: "Added to wishlist",
        description: "The item has been added to your wishlist.",
      })
    }
  }

  const addToCart = (productId: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    toast({
      title: "Added to bag",
      description: "The item has been added to your shopping bag.",
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={item} className="group">
          <Link href={`/products/${product.id}`} className="block">
            <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <div className="aspect-[3/4] relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-full mr-2"
                    onClick={(e) => addToCart(product.id, e)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Bag
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`bg-white/20 ${wishlist.includes(product.id) ? "text-pink-500" : ""}`}
                    onClick={(e) => toggleWishlist(product.id, e)}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center text-xs text-yellow-500 mb-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-current" : "stroke-current fill-none"}`}
                    />
                  ))}
                <span className="text-gray-600 dark:text-gray-400 ml-1">({product.reviews})</span>
              </div>
              <h3 className="font-medium text-sm">{product.brand}</h3>
              <h4 className="text-sm text-gray-700 dark:text-gray-300 truncate">{product.name}</h4>
              <div className="flex items-center mt-1">
                <span className="font-semibold">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-gray-500 line-through text-sm ml-2">${product.originalPrice}</span>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
