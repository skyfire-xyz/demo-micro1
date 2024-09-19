import { Clipboard, Code, Eye, Globe } from "lucide-react"

import { InterviewItem } from "@/lib/micro1/type"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { languageCodesMap } from "../lang-code"

interface Skill {
  name: string
  description: string
}

export default function InterviewCard({
  interview_name,
  invite_url,
  skills,
  interview_language,
  is_proctoring_required,
  is_coding_round_required,
  date_created,
}: InterviewItem) {
  const fullLanguageName =
    languageCodesMap[interview_language] || interview_language

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
      </CardContent>
      <CardFooter className="flex justify-between gap-2 bg-background/80 backdrop-blur-sm">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-background/80 hover:bg-background/90"
          onClick={() => navigator.clipboard.writeText(invite_url)}
        >
          <Clipboard className="h-4 w-4 mr-2" />
          Copy URL
        </Button>
        <Button
          onClick={() => {
            window.open(invite_url, "_blank")
          }}
          size="sm"
          className="flex-1"
        >
          Start Interview
        </Button>
      </CardFooter>
    </Card>
  )
}
