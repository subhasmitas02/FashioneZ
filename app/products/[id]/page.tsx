import { Suspense } from "react"
import ProductDetails from "@/components/products/product-details"
import RelatedProducts from "@/components/products/related-products"
import ProductReviews from "@/components/products/product-reviews"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)

  return (
    <main className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productId={productId} />
      </Suspense>

      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3>Product Description</h3>
              <p>
                This premium quality product is designed with comfort and style in mind. Made from high-quality
                materials, it offers durability and a perfect fit for everyday wear. The unique design combines modern
                trends with classic elements, making it a versatile addition to your wardrobe.
              </p>
              <p>
                The fabric is soft to the touch, breathable, and easy to care for. It's perfect for all seasons and can
                be dressed up or down depending on the occasion. The attention to detail in the stitching and finishing
                ensures that this piece will remain a favorite in your collection for years to come.
              </p>
              <h3>Features</h3>
              <ul>
                <li>Premium quality fabric</li>
                <li>Comfortable fit</li>
                <li>Durable construction</li>
                <li>Versatile styling options</li>
                <li>Easy care instructions</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Material & Care</h3>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="font-medium w-32">Material</span>
                    <span>100% Cotton</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Care</span>
                    <span>Machine wash cold, tumble dry low</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Country</span>
                    <span>Imported</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="font-medium w-32">Fit</span>
                    <span>Regular fit</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Length</span>
                    <span>Standard</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Pattern</span>
                    <span>Solid</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Neck</span>
                    <span>Round neck</span>
                  </li>
                  <li className="flex">
                    <span className="font-medium w-32">Sleeve</span>
                    <span>Short sleeve</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <ProductReviews productId={productId} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <RelatedProducts productId={productId} />
      </div>
    </main>
  )
}

function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-20 h-20 rounded-md" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="pt-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
