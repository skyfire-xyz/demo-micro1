"use client"

import React from "react"

import { useReports } from "@/lib/micro1/context"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import InterviewReportCard from "./interview-report"

export default function InterviewReportsCarousel() {
  const reports = useReports()
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Recent Reports</h1>
      <Carousel className="w-full  mx-auto">
        <CarouselContent>
          {reports.map((report) => {
            return (
              <CarouselItem key={report.report_id}>
                <div className="bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground p-6 rounded-lg shadow-lg mb-6">
                  <InterviewReportCard report={report} />
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
