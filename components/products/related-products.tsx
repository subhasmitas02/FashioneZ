"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

// Mock data for related products
const relatedProducts = [
  {
    id: 101,
    name: "Classic Fit Oxford Shirt",
    brand: "Fashionista",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.6,
    reviews: 98,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
  },
  {
    id: 102,
    name: "Slim Fit Stretch Shirt",
    brand: "UrbanEdge",
    price: 54.99,
    originalPrice: 69.99,
    discount: 21,
    rating: 4.4,
    reviews: 76,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
  },
  {
    id: 103,
    name: "Casual Linen Shirt",
    brand: "Fashionista",
    price: 49.99,
    originalPrice: 64.99,
    discount: 23,
    rating: 4.3,
    reviews: 65,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
  },
  {
    id: 104,
    name: "Printed Cotton Shirt",
    brand: "DenimLife",
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    rating: 4.2,
    reviews: 54,
    image: "/placeholder.svg?height=400&width=300",
    category: "men",
  },
]

interface RelatedProductsProps {
  productId: number
}

export default function RelatedProducts({ productId }: RelatedProductsProps) {
  const [wishlist, setWishlist] = useState<number[]>([])
  const { toast } = useToast()

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
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
    >
      {relatedProducts.map((product) => (
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
