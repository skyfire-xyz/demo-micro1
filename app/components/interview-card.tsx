import { useMemo, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Code,
  ExternalLink,
  Eye,
  Globe,
  Plus,
  User,
  X,
} from "lucide-react"

import { useMicro1, useReports } from "@/lib/micro1/context"
import { InterviewItem, InterviewReport } from "@/lib/micro1/type"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useMediaQuery } from "../hooks/use-media-query"
import { languageCodesMap } from "../lang-code"
import InterviewReportCard from "./interview-report"

const CANDIDATES_PER_PAGE = 5

interface InterviewCardProps extends InterviewItem {
  hideDummy?: boolean
}

export default function InterviewCard({
  interview_name,
  interview_url,
  skills,
  interview_language,
  is_proctoring_required,
  is_coding_round_required,
  date_created,
  interview_id,
  hideDummy,
}: InterviewCardProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const reports = useReports()
  const { sendInvites } = useMicro1()
  const [selectedCandidate, setSelectedCandidate] =
    useState<InterviewReport | null>(null)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [candidates, setCandidates] = useState<
    { name: string; email: string }[]
  >([])
  const [newCandidate, setNewCandidate] = useState({ name: "", email: "" })
  const [currentPage, setCurrentPage] = useState(1)

  const reportCandidates = useMemo(() => {
    return reports.filter((report) => {
      const interviewMatch = report.interview_id === interview_id
      const dummyMatch = hideDummy ? !report.dummy : true
      return interviewMatch && dummyMatch
    })
  }, [reports, interview_id, hideDummy])

  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * CANDIDATES_PER_PAGE
    return reportCandidates.slice(startIndex, startIndex + CANDIDATES_PER_PAGE)
  }, [reportCandidates, currentPage])

  const totalPages = Math.ceil(reportCandidates.length / CANDIDATES_PER_PAGE)

  const fullLanguageName =
    languageCodesMap[interview_language] || interview_language

  const handleAddCandidate = () => {
    if (newCandidate.name && newCandidate.email) {
      setCandidates([...candidates, newCandidate])
      setNewCandidate({ name: "", email: "" })
    }
  }

  const handleRemoveCandidate = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index))
  }

  const handleSendInvites = async () => {
    await sendInvites(interview_id, candidates)
    setIsInviteDialogOpen(false)
    setCandidates([])
  }

  const handleTestInterview = () => {
    window.open(interview_url, "_blank", "noopener,noreferrer")
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  return (
    <Card className="flex flex-col h-full overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <CardHeader className="bg-background/80 backdrop-blur-sm">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {interview_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow bg-background/60 backdrop-blur-sm">
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Required Skills:</h3>
          <ul className="list-disc list-inside">
            {skills.map((skill, index) => (
              <li key={index} className="text-sm text-foreground/80">
                {skill.name} - {skill.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge
            variant="outline"
            className="flex items-center bg-blue-100 text-blue-800 border-blue-300"
          >
            <Globe className="h-3 w-3 mr-1" />
            {fullLanguageName}
          </Badge>
          {is_proctoring_required && (
            <Badge
              variant="secondary"
              className="flex items-center bg-purple-100 text-purple-800 border-purple-300"
            >
              <Eye className="h-3 w-3 mr-1" />
              Proctored
            </Badge>
          )}
          {is_coding_round_required && (
            <Badge
              variant="secondary"
              className="flex items-center bg-green-100 text-green-800 border-green-300"
            >
              <Code className="h-3 w-3 mr-1" />
              Coding
            </Badge>
          )}
        </div>
        <p className="text-xs text-foreground/70">
          Created: {new Date(date_created).toLocaleDateString()}
        </p>

        {reportCandidates.length > 0 && (
          <Card className="mb-4 overflow-x-auto mt-4">
            <CardHeader>
              <h3 className="text-sm font-medium mb-2">Available Reports</h3>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Soft Skills</TableHead>
                    {reportCandidates[0].technical_skills_evaluation.map(
                      (skill, index) => (
                        <TableHead key={index}>Skill: {skill.skill}</TableHead>
                      )
                    )}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCandidates.map((candidate, index) => (
                    <TableRow key={index}>
                      <TableCell>{candidate.candidate_name}</TableCell>
                      <TableCell>
                        {
                          candidate.soft_skills_evaluation[0].ai_evaluation
                            .rating
                        }
                      </TableCell>
                      {candidate.technical_skills_evaluation.map(
                        (skill, skillIndex) => (
                          <TableCell key={skillIndex}>
                            {skill.ai_evaluation.rating}
                          </TableCell>
                        )
                      )}
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedCandidate(candidate)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                {candidate.candidate_name} - Detailed Report
                              </DialogTitle>
                            </DialogHeader>
                            {selectedCandidate && (
                              <InterviewReportCard
                                report={selectedCandidate}
                                defaultOpen={isDesktop ? true : false}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {totalPages > 1 && (
                <div className="flex items-center justify-end space-x-2 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2 bg-background/80 backdrop-blur-sm">
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex-1">
              <User className="h-4 w-4 mr-2" />
              Invite Candidates
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Invite Candidates</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCandidate.name}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newCandidate.email}
                  onChange={(e) =>
                    setNewCandidate({ ...newCandidate, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <Button onClick={handleAddCandidate} className="ml-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Candidate
              </Button>
              {candidates.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Candidates to invite:</h4>
                  <ul className="space-y-2">
                    {candidates.map((candidate, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {candidate.name} ({candidate.email})
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCandidate(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                onClick={handleSendInvites}
                disabled={candidates.length === 0}
              >
                Send Invites
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-background/80 hover:bg-background/90"
          onClick={handleTestInterview}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Test Interview
        </Button>
      </CardFooter>
    </Card>
  )
}
