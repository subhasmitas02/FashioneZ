"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Mock cart data
const initialCartItems = [
  {
    id: 1,
    name: "Premium Cotton Comfort Fit Shirt",
    brand: "Fashionista",
    color: "White",
    size: "M",
    price: 49.99,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=90",
  },
  {
    id: 2,
    name: "Casual Denim Jeans",
    brand: "DenimLife",
    color: "Blue",
    size: "32",
    price: 59.99,
    quantity: 2,
    image: "/placeholder.svg?height=120&width=90",
  },
  {
    id: 3,
    name: "Sports Running Shoes",
    brand: "ActiveLife",
    color: "Black",
    size: "9",
    price: 89.99,
    quantity: 1,
    image: "/placeholder.svg?height=120&width=90",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discount, setDiscount] = useState(0)
  const { toast } = useToast()

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const applyPromoCode = () => {
    if (!promoCode) return

    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false)

      if (promoCode.toUpperCase() === "SAVE20") {
        const subtotal = calculateSubtotal()
        const discountAmount = subtotal * 0.2
        setDiscount(discountAmount)

        toast({
          title: "Promo code applied",
          description: "20% discount has been applied to your order.",
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired.",
          variant: "destructive",
        })
      }
    }, 1000)
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const shipping = subtotal > 0 ? 5.99 : 0
    return subtotal + shipping - discount
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
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full md:w-2/3">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl font-bold mb-6">Shopping Bag ({cartItems.length})</h1>
          </motion.div>

          {cartItems.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Product</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id} className="group">
                      <TableCell>
                        <div className="h-24 w-20 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{item.brand}</p>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <span>Size: {item.size}</span>
                            <span className="mx-2">|</span>
                            <span>Color: {item.color}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 text-center"
            >
              <div className="flex flex-col items-center justify-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your bag is empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Looks like you haven&apos;t added any items to your bag yet.
                </p>
                <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white">
                  <Link href="/products/all">Continue Shopping</Link>
                </Button>
              </div>
            </motion.div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/products/all">Continue Shopping</Link>
              </Button>
              <Button variant="ghost" onClick={() => setCartItems([])}>
                Clear Cart
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/3"
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span>${calculateSubtotal() > 0 ? "5.99" : "0.00"}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>

                <div className="pt-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode} disabled={isApplyingPromo || !promoCode}>
                      {isApplyingPromo ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-green-600 text-sm mt-2">Promo code SAVE20 applied successfully!</p>
                  )}
                </div>

                <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white mt-6" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  Secure checkout powered by Stripe
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
