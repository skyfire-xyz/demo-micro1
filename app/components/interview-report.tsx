import React from "react"
import { Download, Play } from "lucide-react"

import { InterviewReport } from "@/lib/micro1/type"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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

import { RatingBadge } from "./rating-badge"

interface InterviewReportCardProps {
  report: InterviewReport
  defaultOpen?: boolean
}

export default function InterviewReportCard({
  report,
  defaultOpen = false,
}: InterviewReportCardProps) {
  const isDummy = report.dummy === true

  const technicalSkillsSummary =
    report.technical_skills_evaluation[0]?.ai_evaluation.rating ||
    "Not available"
  const softSkillsSummary =
    report.soft_skills_evaluation[0]?.ai_evaluation.rating || "Not available"

  const accordionValues = [
    "technical-skills",
    "soft-skills",
    "custom-questions",
  ]

  return (
    <Card className="overflow-hidden border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold mb-1 text-primary">
              {report.candidate_name} - {report.interview_name}
            </CardTitle>
            <CardDescription className="text-base text-primary/70">
              {report.candidate_email_id}
            </CardDescription>
          </div>
          <RatingBadge
            rating={`Proctoring Score: ${report.proctoring_score}`}
            isProctoringScore={true}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground mb-4">
          Report Date: {new Date(report.report_date).toLocaleString()}
        </p>
        <div className="mb-6 p-4 pt-3 bg-primary/5 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-primary">
            Evaluation Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="font-semibold text-primary mb-1">
                Technical Skills
              </div>
              <RatingBadge rating={technicalSkillsSummary} />
            </div>
            <div>
              <div className="font-semibold text-primary mb-1">Soft Skills</div>
              <RatingBadge rating={softSkillsSummary} />
            </div>
            {report.custom_question_evaluation.map((question, index) => (
              <div key={index}>
                <div className="font-semibold text-primary mb-1">
                  Custom: {question.question_text}
                </div>
                <RatingBadge rating={question.ai_evaluation.rating} />
              </div>
            ))}
          </div>
        </div>
        <Accordion
          type="multiple"
          defaultValue={defaultOpen ? accordionValues : []}
          className="w-full"
        >
          <AccordionItem value="technical-skills" className="border-b-0">
            <AccordionTrigger className="hover:no-underline hover:bg-primary/5 rounded-lg px-4 py-2">
              Technical Skills Evaluation
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <ScrollArea className="h-[200px] w-full rounded-md border border-primary/20 p-4">
                {report.technical_skills_evaluation.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="mb-4 pb-4 border-b border-primary/10 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-primary">
                        {skill.skill}
                      </h4>
                      <RatingBadge rating={skill.ai_evaluation.rating} />
                    </div>
                    <p className="text-sm mt-1">
                      {skill.ai_evaluation.feedback}
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="soft-skills" className="border-b-0">
            <AccordionTrigger className="hover:no-underline hover:bg-primary/5 rounded-lg px-4 py-2">
              Soft Skills Evaluation
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <ScrollArea className="h-[200px] w-full rounded-md border border-primary/20 p-4">
                {report.soft_skills_evaluation.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="mb-4 pb-4 border-b border-primary/10 last:border-b-0"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-primary">
                        {skill.skill}
                      </h4>
                      <RatingBadge rating={skill.ai_evaluation.rating} />
                    </div>
                    <p className="text-sm mt-1">
                      {skill.ai_evaluation.feedback}
                    </p>
                  </div>
                ))}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="custom-questions" className="border-b-0">
            <AccordionTrigger className="hover:no-underline hover:bg-primary/5 rounded-lg px-4 py-2">
              Custom Questions
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <ScrollArea className="h-[200px] w-full rounded-md border border-primary/20 p-4">
                {report.custom_question_evaluation.map(
                  (question, questionIndex) => (
                    <div
                      key={questionIndex}
                      className="mb-4 pb-4 border-b border-primary/10 last:border-b-0"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-primary">
                          {question.question_text}
                        </h4>
                        <RatingBadge rating={question.ai_evaluation.rating} />
                      </div>
                      <p className="text-sm italic mt-1 text-primary/70">
                        &quot;{question.answer_text}&quot;
                      </p>
                      <p className="text-sm mt-2">
                        {question.ai_evaluation.feedback}
                      </p>
                    </div>
                  )
                )}
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between bg-primary/5 p-6">
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
                  className="bg-white hover:bg-primary hover:text-white transition-colors"
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
                  className="bg-white hover:bg-primary hover:text-white transition-colors"
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
