"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Eye, Truck, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for recent orders
const recentOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    amount: 149.99,
    status: "processing",
    date: new Date("2023-04-15"),
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    email: "michael@example.com",
    amount: 89.99,
    status: "shipped",
    date: new Date("2023-04-14"),
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Emily Rodriguez",
    email: "emily@example.com",
    amount: 199.99,
    status: "delivered",
    date: new Date("2023-04-13"),
    items: 4,
  },
  {
    id: "ORD-004",
    customer: "David Wilson",
    email: "david@example.com",
    amount: 59.99,
    status: "processing",
    date: new Date("2023-04-12"),
    items: 1,
  },
  {
    id: "ORD-005",
    customer: "Jessica Brown",
    email: "jessica@example.com",
    amount: 129.99,
    status: "shipped",
    date: new Date("2023-04-11"),
    items: 2,
  },
]

export default function RecentOrders() {
  const [orders, setOrders] = useState(recentOrders)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))

    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been marked as ${newStatus}.`,
    })
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                <div>
                  <div>{order.customer}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{order.email}</div>
                </div>
              </TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>${order.amount.toFixed(2)}</TableCell>
              <TableCell>{format(order.date, "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)} variant="outline">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => updateOrderStatus(order.id, "processing")}
                      disabled={order.status === "processing"}
                    >
                      Mark as Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => updateOrderStatus(order.id, "shipped")}
                      disabled={order.status === "shipped"}
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Mark as Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => updateOrderStatus(order.id, "delivered")}
                      disabled={order.status === "delivered"}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Delivered
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
