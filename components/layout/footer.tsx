import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Online Shopping */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Online Shopping</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/men" className="hover:text-pink-600 transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/products/women" className="hover:text-pink-600 transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/products/kids" className="hover:text-pink-600 transition-colors">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="/products/home-living" className="hover:text-pink-600 transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/products/beauty" className="hover:text-pink-600 transition-colors">
                  Beauty
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="hover:text-pink-600 transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact-us" className="hover:text-pink-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-pink-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="hover:text-pink-600 transition-colors">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link href="/track-orders" className="hover:text-pink-600 transition-colors">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-pink-600 transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-pink-600 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-pink-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-pink-600 shrink-0 mt-0.5" />
                <span>123 Fashion Street, Style City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-pink-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-pink-600" />
                <span>support@fashionista.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* App and Payment */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Experience Fashionista App</h3>
            <div className="flex space-x-2 mb-6">
              <a href="#" className="block">
                <img src="/placeholder.svg?height=40&width=120" alt="Get it on Google Play" className="h-10" />
              </a>
              <a href="#" className="block">
                <img src="/placeholder.svg?height=40&width=120" alt="Download on App Store" className="h-10" />
              </a>
            </div>
            <h3 className="text-lg font-semibold mb-4">We Accept</h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-white p-2 rounded shadow-sm">
                <img src="/placeholder.svg?height=30&width=40" alt="Visa" className="h-6" />
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <img src="/placeholder.svg?height=30&width=40" alt="Mastercard" className="h-6" />
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <img src="/placeholder.svg?height=30&width=40" alt="PayPal" className="h-6" />
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <img src="/placeholder.svg?height=30&width=40" alt="Apple Pay" className="h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Fashionista. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
