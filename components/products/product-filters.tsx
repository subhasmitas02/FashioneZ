"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ProductFiltersProps {
  category: string
}

export default function ProductFilters({ category }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([])

  const brands = ["Fashionista", "Elegance", "UrbanEdge", "DenimLife", "ActiveLife", "LuxeStyle", "KidsFun"]

  const sizes = category === "kids" ? ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"] : ["XS", "S", "M", "L", "XL", "XXL"]

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#00FF00" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Pink", value: "#FFC0CB" },
    { name: "Purple", value: "#800080" },
  ]

  const discounts = ["10% and above", "20% and above", "30% and above", "40% and above", "50% and above"]

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const toggleDiscount = (discount: string) => {
    setSelectedDiscounts((prev) => (prev.includes(discount) ? prev.filter((d) => d !== discount) : [...prev, discount]))
  }

  const clearAllFilters = () => {
    setPriceRange([0, 1000])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedDiscounts([])
  }

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedDiscounts.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 1000

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-xs">
            Clear All <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["price", "brand", "size"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 1000]} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <div
                  key={size}
                  className={`flex items-center justify-center h-9 rounded border cursor-pointer text-sm transition-colors ${
                    selectedSizes.includes(size)
                      ? "bg-pink-100 border-pink-500 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
                      : "hover:border-gray-400"
                  }`}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <div
                  key={color.name}
                  className="flex flex-col items-center space-y-1"
                  onClick={() => toggleColor(color.name)}
                >
                  <div
                    className={`h-8 w-8 rounded-full cursor-pointer ${
                      selectedColors.includes(color.name) ? "ring-2 ring-pink-500 ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs">{color.name}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="discount">
          <AccordionTrigger>Discount</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {discounts.map((discount) => (
                <div key={discount} className="flex items-center space-x-2">
                  <Checkbox
                    id={`discount-${discount}`}
                    checked={selectedDiscounts.includes(discount)}
                    onCheckedChange={() => toggleDiscount(discount)}
                  />
                  <Label htmlFor={`discount-${discount}`} className="text-sm cursor-pointer">
                    {discount}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
