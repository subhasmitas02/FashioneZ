"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for featured products
const products = [
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
    isFeatured: true,
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
    isFeatured: true,
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
    isFeatured: true,
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
    isFeatured: true,
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
    isFeatured: true,
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
    isFeatured: true,
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
    isFeatured: true,
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
    isFeatured: true,
  },
]

const categories = ["All", "Men", "Women", "Kids"]

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category.toLowerCase() === activeCategory.toLowerCase())

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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of trending and popular products that are making waves in the fashion
            world.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-white dark:bg-gray-700 shadow-sm"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={item}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group"
            >
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
                      <Button size="sm" variant="secondary" className="w-full mr-2">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Bag
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/20">
                        <Heart className="h-4 w-4" />
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

        <div className="text-center mt-12">
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
