"use client"

import { motion } from "framer-motion"

const brands = [
  { id: 1, name: "Nike", logo: "/placeholder.svg?height=60&width=120" },
  { id: 2, name: "Adidas", logo: "/placeholder.svg?height=60&width=120" },
  { id: 3, name: "Puma", logo: "/placeholder.svg?height=60&width=120" },
  { id: 4, name: "Levi's", logo: "/placeholder.svg?height=60&width=120" },
  { id: 5, name: "Zara", logo: "/placeholder.svg?height=60&width=120" },
  { id: 6, name: "H&M", logo: "/placeholder.svg?height=60&width=120" },
]

export default function Brands() {
  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-bold">Top Brands</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow"
            >
              <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="max-h-12" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
