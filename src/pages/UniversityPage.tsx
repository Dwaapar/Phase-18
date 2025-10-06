import React from "react";
import { BookOpen, Users, Award, Calendar, Video, Download, ExternalLink, GraduationCap } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ContentSection } from "../components/ui/ContentSection";
import { FeatureGrid } from "../components/ui/FeatureGrid";
import { StatsGrid } from "../components/ui/StatsGrid";
import { Link } from "react-router-dom";

const learningPaths = [
  {
    title: "Automation Fundamentals",
    description: "Master the basics of business process automation with hands-on exercises and real-world examples",
    icon: BookOpen,
    features: ["10 modules", "5 hours content", "Hands-on labs", "Certificate included"]
  },
  {
    title: "AI Agent Development",
    description: "Learn to build, deploy, and manage AI agents for various business use cases",
    icon: Users,
    features: ["8 modules", "6 hours content", "Live coding sessions", "Project portfolio"]
  },
  {
    title: "Workflow Design Mastery",
    description: "Advanced workflow design patterns and optimization techniques for enterprise scale",
    icon: Award,
    features: ["12 modules", "8 hours content", "Case studies", "Expert mentorship"]
  }
];

const courses = [
  {
    title: "Introduction to Business Automation",
    instructor: "Sarah Chen",
    duration: "2 hours",
    level: "Beginner",
    rating: 4.9,
    students: 2500,
    description: "Learn the fundamentals of business process automation and how to identify automation opportunities in your organization."
  },
  {
    title: "Building Your First Workflow",
    instructor: "Marcus Rodriguez", 
    duration: "3 hours",
    level: "Beginner",
    rating: 4.8,
    students: 1800,
    description: "Step-by-step guide to creating, testing, and deploying your first automation workflow."
  },
  {
    title: "AI Agents for Customer Support",
    instructor: "Emily Watson",
    duration: "4 hours", 
    level: "Intermediate",
    rating: 4.9,
    students: 1200,
    description: "Design and deploy AI agents that can handle customer support inquiries with human-like intelligence."
  },
  {
    title: "Advanced Workflow Patterns",
    instructor: "David Kim",
    duration: "5 hours",
    level: "Advanced",
    rating: 4.7,
    students: 800,
    description: "Master complex workflow patterns including error handling, parallel processing, and conditional logic."
  },
  {
    title: "Enterprise Security & Compliance",
    instructor: "Lisa Thompson",
    duration: "3 hours",
    level: "Intermediate", 
    rating: 4.8,
    students: 950,
    description: "Implement security best practices and ensure compliance in your automation workflows."
  },
  {
    title: "ROI Measurement & Optimization",
    instructor: "Alex Johnson",
    duration: "2.5 hours",
    level: "Intermediate",
    rating: 4.6,
    students: 750,
    description: "Learn to measure and optimize the return on investment of your automation initiatives."
  }
];

const certifications = [
  {
    name: "Certified Automation Specialist",
    description: "Foundational certification covering automation principles and basic workflow design",
    duration: "20 hours",
    level: "Beginner",
    badge: "🥉"
  },
  {
    name: "Certified Workflow Architect", 
    description: "Advanced certification for designing complex, enterprise-grade automation workflows",
    duration: "40 hours",
    level: "Advanced",
    badge: "🥈"
  },
  {
    name: "Certified AI Agent Developer",
    description: "Specialized certification for building and deploying intelligent AI agents",
    duration: "35 hours", 
    level: "Advanced",
    badge: "🥇"
  }
];

const stats = [
  { label: "Students Enrolled", value: 25000, suffix: "+" },
  { label: "Courses Available", value: 150, suffix: "+" },
  { label: "Completion Rate", value: 87, suffix: "%" },
  { label: "Average Rating", value: 4.8, suffix: "/5" }
];

const upcomingWebinars = [
  {
    title: "Automation Trends 2025",
    date: "December 18, 2024",
    time: "2:00 PM PST",
    instructor: "Sarah Chen",
    attendees: 1200
  },
  {
    title: "Building Scalable Workflows",
    date: "December 22, 2024", 
    time: "10:00 AM PST",
    instructor: "Marcus Rodriguez",
    attendees: 800
  },
  {
    title: "AI Agent Best Practices",
    date: "January 5, 2025",
    time: "1:00 PM PST", 
    instructor: "Emily Watson",
    attendees: 950
  }
];

export default function UniversityPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Findawise University"
        description="Master automation with comprehensive courses, certifications, and hands-on training from industry experts."
        variant="dark"
      />

      <ContentSection
        title="Learning Paths"
        description="Structured learning journeys designed to take you from beginner to expert in automation and AI."
        variant="default"
      >
        <FeatureGrid features={learningPaths} columns={3} />
      </ContentSection>

      <ContentSection
        title="Featured Courses"
        description="Learn from industry experts with practical, hands-on courses designed for real-world application."
        variant="gray"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 hover:shadow-card transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="text-monks-black">{course.rating}</span>
                    <span className="text-monks-gray">({course.students})</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-monks-black">{course.title}</h3>
                  <p className="text-monks-gray">{course.description}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-monks-gray">
                  <span>By {course.instructor}</span>
                  <span>{course.duration}</span>
                </div>
                
                <button className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2">
                  <Video size={16} />
                  Start Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Professional Certifications"
        description="Validate your automation expertise with industry-recognized certifications."
        variant="default"
      >
        <div className="grid gap-8 md:grid-cols-3">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-monks-light-gray rounded-3xl p-8 text-center">
              <div className="text-6xl mb-6">{cert.badge}</div>
              <h3 className="text-xl font-bold text-monks-black mb-4">{cert.name}</h3>
              <p className="text-monks-gray mb-6">{cert.description}</p>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-monks-gray">Duration:</span>
                  <span className="text-monks-black">{cert.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-monks-gray">Level:</span>
                  <span className="text-monks-black">{cert.level}</span>
                </div>
              </div>
              <button className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                Start Certification
              </button>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Upcoming Webinars"
        description="Join live sessions with automation experts and get your questions answered."
        variant="gray"
      >
        <div className="space-y-6">
          {upcomingWebinars.map((webinar, i) => (
            <div key={i} className="bg-white rounded-3xl p-8">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-monks-black">{webinar.title}</h3>
                  <p className="text-monks-gray">with {webinar.instructor}</p>
                </div>
                
                <div className="space-y-1 text-center">
                  <div className="flex items-center justify-center gap-1 text-monks-black">
                    <Calendar size={16} />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="text-sm text-monks-gray">{webinar.time}</div>
                  <div className="text-sm text-monks-gray">{webinar.attendees} registered</div>
                </div>
                
                <div className="text-center">
                  <button className="bg-monks-accent text-white px-6 py-3 rounded-full font-medium hover:bg-monks-hover transition-all duration-300">
                    Register Free
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection variant="gray">
        <StatsGrid stats={stats} columns={4} />
      </ContentSection>

      <ContentSection
        title="Start Your Learning Journey"
        description="Join thousands of professionals already advancing their automation skills with Findawise University."
        variant="default"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-monks-light-gray rounded-3xl p-8">
            <GraduationCap size={48} className="text-monks-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-monks-black mb-4">Ready to Get Started?</h3>
            <p className="text-monks-gray mb-6">
              Create your free account and access our complete library of courses, tutorials, and certifications.
            </p>
            <button className="bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
              Start Learning Free
            </button>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}