"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Box, Home, LogOut, Menu, Package, Settings, ShoppingBag, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Inventory",
    href: "/admin/inventory",
    icon: Box,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-20 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-pink-600">Admin Panel</h2>
                <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-pink-600 ${
                      pathname === link.href
                        ? "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.title}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t">
              <Button variant="ghost" className="w-full justify-start text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30 mt-16 md:mt-20">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-900 border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-pink-600">Admin Panel</h2>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-pink-600 ${
                    pathname === link.href
                      ? "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Content Offset for Desktop */}
      <div className="hidden md:block md:pl-64" />
    </>
  )
}
