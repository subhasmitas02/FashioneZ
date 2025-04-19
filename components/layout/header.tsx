"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Men", href: "/products/men" },
    { name: "Women", href: "/products/women" },
    { name: "Kids", href: "/products/kids" },
    { name: "Home & Living", href: "/products/home-living" },
    { name: "Beauty", href: "/products/beauty" },
    { name: "Studio", href: "/studio" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 shadow-md backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-pink-600"
            >
              Fashionista
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-pink-600",
                  pathname === link.href ? "text-pink-600" : "text-gray-700 dark:text-gray-200",
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative w-1/4 min-w-[200px]">
            <Input
              type="search"
              placeholder="Search for products, brands and more"
              className="pr-8 focus-visible:ring-pink-500"
            />
            <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="hidden md:flex flex-col items-center text-xs">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <Link href="/wishlist" className="hidden md:flex flex-col items-center text-xs">
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center text-xs">
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <span>Bag</span>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="p-4">
            <div className="relative mb-4">
              <Input
                type="search"
                placeholder="Search for products, brands and more"
                className="pr-8 focus-visible:ring-pink-500"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-pink-600 p-2",
                    pathname === link.href
                      ? "text-pink-600 bg-pink-50 dark:bg-pink-900/20 rounded"
                      : "text-gray-700 dark:text-gray-200",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t pt-2 mt-2">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 p-2 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center space-x-2 p-2 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  )
}
