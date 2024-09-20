import { LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import InterviewGrid from "./components/interview-grid"
import InterviewReports from "./components/interview-reports"

export default function IndexPage() {
  const company = {
    name: "Demo TechRecruit Solutions",
    industry: "Technology",
    employees: "500-1000",
    location: "San Francisco, CA",
  }

  const recruiter = {
    name: "Demo Recruiter",
    role: "Senior Technical Recruiter",
    email: "demo.recruiter@xxxxx.com",
    avatar: "/placeholder-avatar.jpg",
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="bg-gradient-to-r from-primary to-primary-foreground text-primary-foreground p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {recruiter.name}!
        </h1>
        <p className="text-lg opacity-90">
          Ready to find your next top talent?
        </p>
        <Button
          variant="outline"
          className="mt-3 bg-white text-primary hover:bg-primary hover:text-white transition-colors duration-300"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-semibold">Company Name:</dt>
              <dd>{company.name}</dd>
              <dt className="font-semibold">Industry:</dt>
              <dd>{company.industry}</dd>
              <dt className="font-semibold">Employees:</dt>
              <dd>{company.employees}</dd>
              <dt className="font-semibold">Location:</dt>
              <dd>{company.location}</dd>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={recruiter.avatar} alt={recruiter.name} />
              <AvatarFallback>
                {recruiter.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{recruiter.name}</h3>
              <p className="text-sm text-muted-foreground">{recruiter.role}</p>
              <p className="text-sm">{recruiter.email}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <InterviewReports />
      <InterviewGrid />
    </section>
  )
}
