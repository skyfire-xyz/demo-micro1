"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

import { formatDate } from "@/app/util"

import { useSkyfireAPIClient } from "../skyfire-sdk/context/context"
import { CreateInterviewRequest, InterviewItem, InterviewReport } from "./type"

interface Micro1ContextType {
  interviewList: InterviewItem[]
  reportList: InterviewReport[]
  loading: boolean
  error: string | null
  selectedComp: InterviewItem | null
  createInterview: (interview: CreateInterviewRequest) => Promise<void>
}

const Micro1Context = createContext<Micro1ContextType | undefined>(undefined)

export const Micro1Provider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const client = useSkyfireAPIClient()
  const [interviewList, setInterviewList] = useState<InterviewItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedComp, setSelectedComp] = useState<InterviewItem | null>(null)
  const [reportList, setReportList] = useState<InterviewReport[]>([])

  //`/proxy/pricing-culture/api/data/dailycomps`
  useEffect(() => {
    if (!client) return
    const fetchInterviews = async () => {
      try {
        const response = await client.get("/proxy/micro1/interviews")

        setInterviewList(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch market comps")
        setLoading(false)
      }
    }

    const fetchInterviewReports = async () => {
      try {
        const response = await client.get(`/proxy/micro1/interview/reports`)
        setReportList(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch market comps")
        setLoading(false)
      }
    }

    fetchInterviews()
    fetchInterviewReports()
  }, [client])

  const createInterview = async (interview: CreateInterviewRequest) => {
    try {
      if (!client) return
      const response = await client.post("/proxy/micro1/interview", interview)

      if (response.data) {
        setInterviewList((prev) => [
          {
            ...interview,
            interview_id: response.data.data.interview_id,
            invite_url: response.data.data.invite_url,
            date_created: formatDate(new Date()),
            date_modified: null,
            status: "active",
            isNew: true,
          },
          ...interviewList,
        ])
      }
    } catch (err) {
      setError("Failed to create interview")
    }
  }

  return (
    <Micro1Context.Provider
      value={{
        interviewList,
        loading,
        error,
        selectedComp,
        reportList,
        createInterview,
      }}
    >
      {children}
    </Micro1Context.Provider>
  )
}

export const useMicro1 = () => {
  const context = useContext(Micro1Context)
  if (context === undefined) {
    throw new Error("useMicro1 must be used within a Micro1Provider")
  }
  return context
}

export const useInterviews = () => {
  const { interviewList } = useMicro1()
  return interviewList
}

export const useReports = () => {
  const { reportList } = useMicro1()
  return reportList
}
