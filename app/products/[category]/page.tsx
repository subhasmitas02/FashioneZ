import { Suspense } from "react"
import ProductList from "@/components/products/product-list"
import ProductFilters from "@/components/products/product-filters"
import ProductSort from "@/components/products/product-sort"
import { Skeleton } from "@/components/ui/skeleton"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = params.category

  const categoryTitles: Record<string, string> = {
    men: "Men's Fashion",
    women: "Women's Fashion",
    kids: "Kids' Fashion",
    "home-living": "Home & Living",
    beauty: "Beauty Products",
  }

  const title = categoryTitles[category] || "Products"

  return (
    <main className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="w-full md:w-1/4 lg:w-1/5 sticky top-24">
          <ProductFilters category={category} />
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold">{title}</h1>
            <ProductSort />
          </div>
          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList category={category} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[3/4] w-full rounded-lg" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}
