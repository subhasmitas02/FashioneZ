"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Mock data
const weeklyData = [
  { name: "Mon", sales: 4000, orders: 24 },
  { name: "Tue", sales: 3000, orders: 18 },
  { name: "Wed", sales: 5000, orders: 32 },
  { name: "Thu", sales: 2780, orders: 15 },
  { name: "Fri", sales: 1890, orders: 12 },
  { name: "Sat", sales: 6390, orders: 38 },
  { name: "Sun", sales: 3490, orders: 22 },
]

const monthlyData = [
  { name: "Jan", sales: 24000, orders: 145 },
  { name: "Feb", sales: 18000, orders: 110 },
  { name: "Mar", sales: 32000, orders: 187 },
  { name: "Apr", sales: 15000, orders: 92 },
  { name: "May", sales: 12000, orders: 73 },
  { name: "Jun", sales: 38000, orders: 210 },
  { name: "Jul", sales: 22000, orders: 149 },
  { name: "Aug", sales: 28000, orders: 165 },
  { name: "Sep", sales: 19000, orders: 118 },
  { name: "Oct", sales: 29000, orders: 173 },
  { name: "Nov", sales: 35000, orders: 198 },
  { name: "Dec", sales: 42000, orders: 245 },
]

const yearlyData = [
  { name: "2018", sales: 240000, orders: 1450 },
  { name: "2019", sales: 300000, orders: 1800 },
  { name: "2020", sales: 180000, orders: 1100 },
  { name: "2021", sales: 320000, orders: 1870 },
  { name: "2022", sales: 380000, orders: 2100 },
  { name: "2023", sales: 420000, orders: 2450 },
]

interface SalesChartProps {
  period: string
}

export default function SalesChart({ period }: SalesChartProps) {
  const [data, setData] = useState(weeklyData)
  const [chartWidth, setChartWidth] = useState(0)

  useEffect(() => {
    switch (period) {
      case "weekly":
        setData(weeklyData)
        break
      case "monthly":
        setData(monthlyData)
        break
      case "yearly":
        setData(yearlyData)
        break
      default:
        setData(weeklyData)
    }
  }, [period])

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickMargin={10} tickFormatter={(value) => `$${value}`} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickMargin={10} />
          <Tooltip
            formatter={(value, name) => {
              if (name === "sales") return [`$${value}`, "Sales"]
              return [value, "Orders"]
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            stroke="#ec4899"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Sales"
          />
          <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="Orders" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
