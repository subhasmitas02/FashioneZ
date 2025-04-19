"use client"

import { Progress } from "@/components/ui/progress"

// Mock data for top products
const topProducts = [
  {
    id: 1,
    name: "Premium Cotton Comfort Fit Shirt",
    category: "Men's Clothing",
    sales: 245,
    revenue: 12225.55,
    growth: 15.2,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Casual Denim Jeans",
    category: "Men's Clothing",
    sales: 198,
    revenue: 11880.02,
    growth: 8.7,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Floral Print Maxi Dress",
    category: "Women's Clothing",
    sales: 187,
    revenue: 14959.13,
    growth: 12.3,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Sports Running Shoes",
    category: "Footwear",
    sales: 156,
    revenue: 14039.44,
    growth: 5.8,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Kids Cartoon Print T-Shirt",
    category: "Kids' Clothing",
    sales: 132,
    revenue: 3297.68,
    growth: 18.5,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function TopProducts() {
  // Calculate the maximum sales for progress bar scaling
  const maxSales = Math.max(...topProducts.map((product) => product.sales))

  return (
    <div className="space-y-6">
      {topProducts.map((product) => (
        <div key={product.id} className="flex items-center">
          <div className="h-10 w-10 rounded-md overflow-hidden mr-4 bg-gray-100 dark:bg-gray-800">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium truncate">{product.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex-1 mr-4">
                <Progress value={(product.sales / maxSales) * 100} className="h-2" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{product.sales} sold</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  ${product.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
