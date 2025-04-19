import Hero from "@/components/home/hero"
import FeaturedProducts from "@/components/home/featured-products"
import Categories from "@/components/home/categories"
import Brands from "@/components/home/brands"
import Newsletter from "@/components/home/newsletter"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Brands />
      <Newsletter />
    </main>
  )
}
