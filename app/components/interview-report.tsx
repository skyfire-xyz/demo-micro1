import React from "react"
import { Download, Play } from "lucide-react"

import { InterviewReport } from "@/lib/micro1/type"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface InterviewReportCardProps {
  report: InterviewReport
}

export default function InterviewReportCard({
  report,
}: InterviewReportCardProps) {
  const isDummy = report.dummy === true

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold mb-1">
              {report.candidate_name} - {report.interview_name}
            </CardTitle>
            <CardDescription className="text-base">
              {report.candidate_email_id}
            </CardDescription>
          </div>
          <Badge
            variant={report.proctoring_score > 50 ? "destructive" : "secondary"}
          >
            Proctoring Score: {report.proctoring_score}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Report Date: {new Date(report.report_date).toLocaleString()}
        </p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="technical-skills">
            <AccordionTrigger>Technical Skills Evaluation</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {report.technical_skills_evaluation.map((skill, skillIndex) => (
                  <div key={skillIndex} className="mb-4">
                    <h4 className="font-semibold">{skill.skill}</h4>
                    <p className="text-sm">{skill.ai_evaluation.feedback}</p>
                    <Badge variant="outline" className="mt-2">
                      {skill.ai_evaluation.rating}
                    </Badge>
                  </div>
                ))}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="soft-skills">
            <AccordionTrigger>Soft Skills Evaluation</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {report.soft_skills_evaluation.map((skill, skillIndex) => (
                  <div key={skillIndex} className="mb-4">
                    <h4 className="font-semibold">{skill.skill}</h4>
                    <p className="text-sm">{skill.ai_evaluation.feedback}</p>
                    <Badge variant="outline" className="mt-2">
                      {skill.ai_evaluation.rating}
                    </Badge>
                  </div>
                ))}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="custom-questions">
            <AccordionTrigger>Custom Questions</AccordionTrigger>
            <AccordionContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {report.custom_question_evaluation.map(
                  (question, questionIndex) => (
                    <div key={questionIndex} className="mb-4">
                      <h4 className="font-semibold">
                        {question.question_text}
                      </h4>
                      <p className="text-sm italic">
                        &quot;{question.answer_text}&quot;
                      </p>
                      <p className="text-sm mt-2">
                        {question.ai_evaluation.feedback}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {question.ai_evaluation.rating}
                      </Badge>
                    </div>
                  )
                )}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  onClick={() => {
                    window.open(report.report_url)
                  }}
                  variant="outline"
                  disabled={isDummy}
                >
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </span>
            </TooltipTrigger>
            {isDummy && (
              <TooltipContent>
                <p>Download not available for dummy reports</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button
                  onClick={() => {
                    window.open(report.interview_recording_url)
                  }}
                  variant="outline"
                  disabled={isDummy}
                >
                  <Play className="mr-2 h-4 w-4" /> View Recording
                </Button>
              </span>
            </TooltipTrigger>
            {isDummy && (
              <TooltipContent>
                <p>Recording not available for dummy reports</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}
