"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react"

import { useInterviews } from "@/lib/micro1/context"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { languageCodesMap } from "../lang-code"
import CreateInterviewDialog from "./create-interview-dialog"
import InterviewCard from "./interview-card"

const ITEMS_PER_PAGE = 6

export default function InterviewGrid() {
  const interviews = useInterviews()
  const [currentPage, setCurrentPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [isCoding, setIsCoding] = useState(false)
  const [hasReports, setHasReports] = useState(false)

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const searchTermLower = searchTerm.toLowerCase()
      const keywordMatch =
        interview.interview_name.toLowerCase().includes(searchTermLower) ||
        interview.skills.some(
          (skill) =>
            skill.name.toLowerCase().includes(searchTermLower) ||
            skill.description.toLowerCase().includes(searchTermLower)
        )
      const languageMatch =
        selectedLanguage !== "all"
          ? interview.interview_language === selectedLanguage
          : true
      const codingMatch = isCoding ? interview.is_coding_round_required : true
      const reportsMatch = hasReports ? interview.numberOfReports > 0 : true
      return keywordMatch && languageMatch && codingMatch && reportsMatch
    })
  }, [interviews, searchTerm, selectedLanguage, isCoding, hasReports])
  const totalPages = Math.ceil(filteredInterviews.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentInterviews = filteredInterviews.slice(startIndex, endIndex)

  // Reset pagination when search or filter criteria change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedLanguage, isCoding, hasReports])

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const uniqueLanguages = useMemo(() => {
    const languageSet = new Set(
      interviews.map((interview) => interview.interview_language)
    )
    return Array.from(languageSet)
  }, [interviews])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Interviews</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Interview
        </Button>
      </div>
      <div className="mb-6 p-4 bg-background border rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center flex-grow max-w-sm">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <Input
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="font-medium">Filter:</Label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All languages</SelectItem>
                {uniqueLanguages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {languageCodesMap[lang] || lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="coding"
                checked={isCoding}
                onCheckedChange={(checked) => setIsCoding(checked as boolean)}
              />
              <Label htmlFor="coding" className="text-sm">
                Coding
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasReports"
                checked={hasReports}
                onCheckedChange={(checked) => setHasReports(checked as boolean)}
              />
              <Label htmlFor="hasReports" className="text-sm">
                Has reports
              </Label>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {currentInterviews.map((interview) => (
          <InterviewCard key={interview.interview_id} {...interview} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
      <CreateInterviewDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  )
}
