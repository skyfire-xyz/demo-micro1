"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

import { formatDate } from "@/app/util"

import { useSkyfireAPIClient } from "../skyfire-sdk/context/context"
import dummyReports from "./dummy_reports.json"
import { CreateInterviewRequest, InterviewItem, InterviewReport } from "./type"

interface Micro1ContextType {
  interviewList: InterviewItem[]
  reportList: InterviewReport[]
  loading: boolean
  error: string | null
  selectedComp: InterviewItem | null
  createInterview: (interview: CreateInterviewRequest) => Promise<void>
  sendInvites: (
    interviewId: string,
    candidates: { name: string; email: string }[]
  ) => Promise<void>
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

  useEffect(() => {
    if (!client) return
    const fetchInterviews = async () => {
      try {
        const response = await client.get("/proxy/micro1/interviews")
        setInterviewList(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch interviews")
        setLoading(false)
      }
    }

    const fetchInterviewReports = async () => {
      try {
        // Fetch real reports
        const response = await client.get(`/proxy/micro1/interview/reports`)
        let reports = response.data.data

        // Add dummy reports
        reports = [...reports, ...dummyReports]

        setReportList(reports)

        // Update interviewList with numberOfReports
        setInterviewList((prevInterviews) => {
          const reportCounts = reports.reduce(
            (acc: { [key: string]: number }, report: InterviewReport) => {
              acc[report.interview_id] = (acc[report.interview_id] || 0) + 1
              return acc
            },
            {}
          )

          return prevInterviews.map((interview) => ({
            ...interview,
            numberOfReports: reportCounts[interview.interview_id] || 0,
          }))
        })

        setLoading(false)
      } catch (err) {
        setError("Failed to fetch interview reports")
        setLoading(false)
      }
    }

    fetchInterviews().then(() => fetchInterviewReports())
  }, [client])

  const createInterview = async (interview: CreateInterviewRequest) => {
    try {
      if (!client) return
      const response = await client.post("/proxy/micro1/interview", interview)

      if (response.data) {
        toast(`You have successfully create a new interview`)
        setInterviewList((prev) => [
          {
            ...interview,
            interview_id: response.data.data.interview_id,
            interview_url: response.data.data.interview_url,
            date_created: formatDate(new Date()),
            date_modified: null,
            status: "active",
            isNew: true,
            numberOfReports: 0,
          },
          ...prev,
        ])
      }
    } catch (err) {
      setError("Failed to create interview")
    }
  }

  const sendInvites = async (
    interviewId: string,
    candidates: { name: string; email: string }[]
  ) => {
    try {
      if (!client) return
      const response = await client.post("/proxy/micro1/interview/invite", {
        interview_id: interviewId,
        candidates: candidates,
      })

      if (response.data) {
        // You might want to update the state or perform some action after successful invite
        toast("You have successfully sent the invites")
      }
    } catch (err) {
      setError("Failed to send invites")
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
        sendInvites,
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
