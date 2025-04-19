"use client"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock reviews data
const reviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    rating: 5,
    date: "2023-12-15",
    title: "Excellent quality and perfect fit!",
    comment:
      "I absolutely love this product! The material is high quality and the fit is perfect. I've received many compliments when wearing it. Definitely worth the price and I'm considering buying it in other colors as well.",
    helpful: 24,
    notHelpful: 2,
    verified: true,
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
    },
    rating: 4,
    date: "2023-11-28",
    title: "Great product with minor issues",
    comment:
      "Overall, I'm satisfied with my purchase. The quality is good and it looks exactly as pictured. The only reason I'm giving 4 stars instead of 5 is because the sizing runs a bit large. I would recommend ordering a size down from your usual size.",
    helpful: 15,
    notHelpful: 3,
    verified: true,
  },
  {
    id: 3,
    user: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ER",
    },
    rating: 3,
    date: "2023-10-10",
    title: "Decent but not exceptional",
    comment:
      "The product is okay for the price. The material isn't as soft as I expected, and the color is slightly different from what's shown in the pictures. It's comfortable enough for everyday wear, but I wouldn't say it's exceptional.",
    helpful: 8,
    notHelpful: 5,
    verified: true,
  },
  {
    id: 4,
    user: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DW",
    },
    rating: 5,
    date: "2023-09-22",
    title: "Exceeded my expectations!",
    comment:
      "This product exceeded all my expectations! The quality is outstanding, and it's even more beautiful in person than in the photos. The delivery was also faster than expected. I'm extremely satisfied with my purchase and would highly recommend it to anyone considering buying it.",
    helpful: 32,
    notHelpful: 1,
    verified: true,
  },
  {
    id: 5,
    user: {
      name: "Jessica Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JB",
    },
    rating: 2,
    date: "2023-08-15",
    title: "Disappointed with the quality",
    comment:
      "I was really looking forward to receiving this item, but I'm quite disappointed with the quality. The material feels cheap and the stitching started coming apart after just a few wears. For the price, I expected much better quality. Would not recommend.",
    helpful: 12,
    notHelpful: 8,
    verified: false,
  },
]

// Calculate rating statistics
const calculateRatingStats = () => {
  const total = reviews.length
  const ratingCounts = [0, 0, 0, 0, 0] // 1-5 stars

  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++
  })

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / total

  const percentages = ratingCounts.map((count) => (count / total) * 100)

  return {
    average: averageRating,
    total,
    counts: ratingCounts,
    percentages,
  }
}

interface ProductReviewsProps {
  productId: number
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [filter, setFilter] = useState("all")
  const [sort, setSort] = useState("recent")
  const [helpfulClicked, setHelpfulClicked] = useState<Record<number, string>>({})

  const stats = calculateRatingStats()

  // Filter reviews based on selected filter
  const filteredReviews =
    filter === "all" ? reviews : reviews.filter((review) => review.rating === Number.parseInt(filter))

  // Sort reviews based on selected sort option
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sort === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sort === "helpful") {
      return b.helpful - a.helpful
    } else if (sort === "highest") {
      return b.rating - a.rating
    } else if (sort === "lowest") {
      return a.rating - b.rating
    }
    return 0
  })

  const handleHelpful = (reviewId: number, type: "helpful" | "notHelpful") => {
    if (helpfulClicked[reviewId]) return

    setHelpfulClicked((prev) => ({
      ...prev,
      [reviewId]: type,
    }))
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div>
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-bold">{stats.average.toFixed(1)}</div>
          <div className="flex items-center mt-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(stats.average) ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
          </div>
          <div className="text-sm text-gray-500 mt-2">{stats.total} reviews</div>
        </div>

        <div className="col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <div className="flex items-center w-16">
                <span className="text-sm font-medium mr-2">{rating}</span>
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              </div>
              <Progress value={stats.percentages[rating - 1]} className="h-2 flex-1 mx-2" />
              <div className="w-12 text-right text-sm text-gray-500">{stats.counts[rating - 1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            All Reviews
          </Button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              variant={filter === rating.toString() ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(rating.toString())}
              className="flex items-center"
            >
              {rating} <Star className="h-3 w-3 ml-1 fill-current" />
            </Button>
          ))}
        </div>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <div key={review.id} className="border-b pb-8">
              <div className="flex items-start">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                  <AvatarFallback>{review.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{review.user.name}</div>
                      <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      {review.verified && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                  <div className="flex items-center text-sm">
                    <div className="mr-4">Was this review helpful?</div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`mr-2 ${helpfulClicked[review.id] === "helpful" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                      onClick={() => handleHelpful(review.id, "helpful")}
                      disabled={!!helpfulClicked[review.id]}
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Yes ({helpfulClicked[review.id] === "helpful" ? review.helpful + 1 : review.helpful})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={helpfulClicked[review.id] === "notHelpful" ? "bg-gray-100 dark:bg-gray-800" : ""}
                      onClick={() => handleHelpful(review.id, "notHelpful")}
                      disabled={!!helpfulClicked[review.id]}
                    >
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      No ({helpfulClicked[review.id] === "notHelpful" ? review.notHelpful + 1 : review.notHelpful})
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews match your current filter.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedReviews.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="sm" className="mx-1">
            Previous
          </Button>
          <Button variant="outline" size="sm" className="mx-1 bg-gray-100 dark:bg-gray-800">
            1
          </Button>
          <Button variant="outline" size="sm" className="mx-1">
            2
          </Button>
          <Button variant="outline" size="sm" className="mx-1">
            3
          </Button>
          <Button variant="outline" size="sm" className="mx-1">
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
