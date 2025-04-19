"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingBag, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import AdminSidebar from "@/components/admin/admin-sidebar"
import SalesChart from "@/components/admin/sales-chart"
import RecentOrders from "@/components/admin/recent-orders"
import TopProducts from "@/components/admin/top-products"

export default function AdminDashboard() {
  const [period, setPeriod] = useState("weekly")

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950 mt-16 md:mt-20">
      <AdminSidebar />

      <main className="flex-1 p-6 overflow-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Welcome back, Admin! Here's what's happening with your store today.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">Download Reports</Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <div className="flex items-center pt-1 text-sm text-green-600">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  <span>+20.1% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <div className="flex items-center pt-1 text-sm text-green-600">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  <span>+12.2% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Products</CardTitle>
                <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <div className="flex items-center pt-1 text-sm text-green-600">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  <span>+4.3% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <div className="flex items-center pt-1 text-sm text-red-600">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  <span>-2.5% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-7 mt-6">
            <Card className="md:col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sales Overview</CardTitle>
                    <CardDescription>View your store's sales performance over time</CardDescription>
                  </div>
                  <Tabs defaultValue={period} onValueChange={setPeriod}>
                    <TabsList>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                <SalesChart period={period} />
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Your best performing products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <TopProducts />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
