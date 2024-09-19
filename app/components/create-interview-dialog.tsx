import { useState } from "react"
import { PlusCircle, X } from "lucide-react"

import { useMicro1 } from "@/lib/micro1/context"
import { CreateInterviewRequest } from "@/lib/micro1/type"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface CreateInterviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateInterviewDialog({
  open,
  onOpenChange,
}: CreateInterviewDialogProps) {
  const { createInterview } = useMicro1()
  const [formData, setFormData] = useState<CreateInterviewRequest>({
    interview_name: "",
    employer_email_id: "",
    skills: [{ name: "", description: "" }],
    custom_questions: [""],
    interview_language: "en",
    can_change_interview_language: false,
    only_coding_round: false,
    is_coding_round_required: false,
    selected_coding_language: "python",
    is_proctoring_required: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createInterview(formData)
    onOpenChange(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (name: string) => (checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSkillChange =
    (index: number, field: "name" | "description") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSkills = [...formData.skills]
      newSkills[index][field] = e.target.value
      setFormData({ ...formData, skills: newSkills })
    }

  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, { name: "", description: "" }],
    })
  }

  const removeSkill = (index: number) => {
    const newSkills = formData.skills.filter((_, i) => i !== index)
    setFormData({ ...formData, skills: newSkills })
  }

  const handleCustomQuestionChange =
    (index: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newQuestions = [...formData.custom_questions]
      newQuestions[index] = e.target.value
      setFormData({ ...formData, custom_questions: newQuestions })
    }

  const addCustomQuestion = () => {
    setFormData({
      ...formData,
      custom_questions: [...formData.custom_questions, ""],
    })
  }

  const removeCustomQuestion = (index: number) => {
    const newQuestions = formData.custom_questions.filter((_, i) => i !== index)
    setFormData({ ...formData, custom_questions: newQuestions })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Interview</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="interview_name">Interview Name</Label>
            <Input
              id="interview_name"
              name="interview_name"
              value={formData.interview_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="employer_email_id">Employer Email ID</Label>
            <Input
              id="employer_email_id"
              name="employer_email_id"
              type="email"
              value={formData.employer_email_id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Skills</Label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <Input
                  placeholder="Skill name"
                  value={skill.name}
                  onChange={handleSkillChange(index, "name")}
                  required
                />
                <Input
                  placeholder="Description"
                  value={skill.description}
                  onChange={handleSkillChange(index, "description")}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkill(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addSkill}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Custom Questions</Label>
            {formData.custom_questions.map((question, index) => (
              <div key={index} className="flex space-x-2 items-start">
                <Textarea
                  placeholder="Enter custom question"
                  value={question}
                  onChange={handleCustomQuestionChange(index)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCustomQuestion(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addCustomQuestion}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Question
            </Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="interview_language">Interview Language</Label>
            <Select
              name="interview_language"
              value={formData.interview_language}
              onValueChange={handleSelectChange("interview_language")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="can_change_interview_language"
              checked={formData.can_change_interview_language}
              onCheckedChange={handleCheckboxChange(
                "can_change_interview_language"
              )}
            />
            <Label htmlFor="can_change_interview_language">
              Can Change Interview Language
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="only_coding_round"
              checked={formData.only_coding_round}
              onCheckedChange={handleCheckboxChange("only_coding_round")}
            />
            <Label htmlFor="only_coding_round">Only Coding Round</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_coding_round_required"
              checked={formData.is_coding_round_required}
              onCheckedChange={handleCheckboxChange("is_coding_round_required")}
            />
            <Label htmlFor="is_coding_round_required">
              Coding Round Required
            </Label>
          </div>
          {formData.is_coding_round_required && (
            <div className="space-y-2">
              <Label htmlFor="selected_coding_language">Coding Language</Label>
              <Select
                name="selected_coding_language"
                value={formData.selected_coding_language}
                onValueChange={handleSelectChange("selected_coding_language")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_proctoring_required"
              checked={formData.is_proctoring_required}
              onCheckedChange={handleCheckboxChange("is_proctoring_required")}
            />
            <Label htmlFor="is_proctoring_required">Proctoring Required</Label>
          </div>
          <DialogFooter>
            <Button type="submit">Create Interview</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
