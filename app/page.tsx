import { LogOut } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Welcome back, {recruiter.name}!
              </h1>
              <p className="text-lg sm:text-xl opacity-90">
                Ready to find your next top talent?
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 sm:mt-0 self-start sm:self-auto bg-white text-blue-600 hover:bg-blue-700 hover:text-white transition-colors duration-300"
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            <Card className="bg-white/10 text-white">
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-2">
                  Company Information
                </h2>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="font-medium">Company:</dt>
                    <dd>{company.name}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Industry:</dt>
                    <dd>{company.industry}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Employees:</dt>
                    <dd>{company.employees}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Location:</dt>
                    <dd>{company.location}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card className="bg-white/10 text-white">
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-2">Your Profile</h2>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={recruiter.avatar} alt={recruiter.name} />
                    <AvatarFallback className="text-blue-700">
                      {recruiter.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{recruiter.name}</p>
                    <p className="text-sm opacity-80">{recruiter.role}</p>
                    <p className="text-sm opacity-80">{recruiter.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gray-50">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <InterviewReports />
          </div>
          <div>
            <InterviewGrid />
          </div>
        </section>
      </main>
    </div>
  )
}
