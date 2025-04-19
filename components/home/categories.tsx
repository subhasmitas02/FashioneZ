"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Men",
    image: "/placeholder.svg?height=300&width=300",
    link: "/products/men",
  },
  {
    id: 2,
    name: "Women",
    image: "/placeholder.svg?height=300&width=300",
    link: "/products/women",
  },
  {
    id: 3,
    name: "Kids",
    image: "/placeholder.svg?height=300&width=300",
    link: "/products/kids",
  },
  {
    id: 4,
    name: "Home & Living",
    image: "/placeholder.svg?height=300&width=300",
    link: "/products/home-living",
  },
  {
    id: 5,
    name: "Beauty",
    image: "/placeholder.svg?height=300&width=300",
    link: "/products/beauty",
  },
]

export default function Categories() {
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
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of products across different categories to find exactly what you're looking for.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={item}>
              <Link href={category.link} className="block group">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="aspect-square bg-gray-200 dark:bg-gray-800">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
