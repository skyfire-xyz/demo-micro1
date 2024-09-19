import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CreateInterviewCardProps {
  onCreateClick: () => void
}

export default function CreateInterviewCard({
  onCreateClick,
}: CreateInterviewCardProps) {
  return (
    <Card
      className="flex items-center justify-center h-full bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 hover:from-primary/10 hover:via-secondary/10 hover:to-accent/10 transition-colors cursor-pointer"
      onClick={onCreateClick}
    >
      <CardContent className="flex flex-col items-center p-6">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full mb-4"
        >
          <Plus className="h-6 w-6" />
        </Button>
        <h3 className="text-lg font-semibold text-center">
          Create New Interview
        </h3>
      </CardContent>
    </Card>
  )
}
