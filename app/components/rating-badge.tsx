import React from "react"

import { Badge } from "@/components/ui/badge"

interface RatingBadgeProps {
  rating: string
  isProctoringScore?: boolean
}

export function RatingBadge({ rating, isProctoringScore }: RatingBadgeProps) {
  const getBadgeColor = (rating: string) => {
    if (isProctoringScore) {
      const score = parseInt(rating.split(":")[1].trim(), 10)
      if (score <= 50) return "bg-red-500 hover:bg-red-600"
      if (score > 50 && score <= 75) return "bg-yellow-500 hover:bg-yellow-600"
      return "bg-green-500 hover:bg-green-600"
    }

    const lowerRating = rating.toLowerCase()
    if (
      lowerRating.includes("highly experienced") ||
      lowerRating.includes("excellent") ||
      lowerRating.includes("good") ||
      lowerRating.includes("strong")
    )
      return "bg-green-500"

    if (
      lowerRating.includes("not experienced") ||
      lowerRating.includes("poor") ||
      lowerRating.includes("below") ||
      lowerRating.includes("weak")
    )
      return "bg-red-500"

    if (
      lowerRating.includes("experienced") ||
      lowerRating.includes("above average") ||
      lowerRating.includes("good") ||
      lowerRating.includes("strong")
    )
      return "bg-blue-500"
    return "bg-gray-400" // Light blue for neutral ratings
  }

  return (
    <Badge className={`${getBadgeColor(rating)} text-white`}>{rating}</Badge>
  )
}
