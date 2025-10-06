import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, GraduationCap, Users, BookOpen, Calendar, BarChart, Shield, School, Brain, Globe } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";
import { FeatureGrid } from "../../components/ui/FeatureGrid";
import { StatsGrid } from "../../components/ui/StatsGrid";
import { TestimonialCard } from "../../components/ui/TestimonialCard";
import { CallToAction } from "../../components/ui/CallToAction";

const useCases = [
  {
    title: "Student Enrollment",
    description: "Automate application processing, document verification, and enrollment workflows to reduce administrative burden and improve student experience.",
    icon: GraduationCap,
    features: ["Application processing", "Document verification", "Payment automation", "Communication workflows"]
  },
  {
    title: "Administrative Automation",
    description: "Streamline scheduling, grading, communication, and reporting tasks to free up educators for teaching.",
    icon: Users,
    features: ["Class scheduling", "Grade processing", "Parent communication", "Attendance tracking"]
  },
  {
    title: "Learning Management",
    description: "Automated course delivery, progress tracking, and performance analytics to enhance educational outcomes.",
    icon: BookOpen,
    features: ["Course automation", "Progress tracking", "Performance analytics", "Personalized learning paths"]
  },
  {
    title: "Campus Operations",
    description: "Optimize facility management, resource allocation, and campus services with intelligent automation.",
    icon: School,
    features: ["Facility booking", "Resource management", "Maintenance scheduling", "Security protocols"]
  },
  {
    title: "Student Support Services",
    description: "Enhance student success with automated support systems for academic and personal development.",
    icon: Brain,
    features: ["Academic advising", "Mental health support", "Career services", "Financial aid processing"]
  },
  {
    title: "Research Administration",
    description: "Streamline research processes from grant applications to publication management.",
    icon: Globe,
    features: ["Grant management", "Research compliance", "Publication tracking", "Collaboration tools"]
  }
];

const stats = [
  { label: "Educational Institutions", value: 250, suffix: "+" },
  { label: "Students Served", value: 500000, suffix: "+" },
  { label: "Efficiency Improvement", value: 35, suffix: "%" },
  { label: "System Reliability", value: 99.9, suffix: "%" }
];

const testimonial = {
  name: "Dr. Sarah Martinez",
  role: "Vice President of Student Affairs",
  company: "State University System",
  quote: "The automation platform has revolutionized how we serve our students. What used to take weeks now happens in days, and our staff can focus on what matters most - student success.",
  avatar: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  rating: 5
};

export default function EducationIndustryPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Education Solutions"
        description="Enhance learning experiences and streamline administrative processes with intelligent automation designed for educational institutions."
        variant="dark"
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-green-400" />
            <span>FERPA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-green-400" />
            <span>Student Privacy First</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-green-400" />
            <span>Education Focused</span>
          </div>
        </div>
      </PageHeader>

      <ContentSection
        title="Transform Educational Operations"
        description="From K-12 schools to universities, automate administrative tasks so educators can focus on what matters most—teaching and student success."
        variant="default"
      >
        <FeatureGrid features={useCases} columns={3} />
      </ContentSection>

      <ContentSection
        title="Trusted by Education Leaders"
        variant="gray"
      >
        <div className="max-w-3xl mx-auto">
          <TestimonialCard {...testimonial} />
        </div>
      </ContentSection>

      <ContentSection variant="gray">
        <StatsGrid stats={stats} columns={4} />
      </ContentSection>

      <CallToAction
        title="Modernize Your Educational Institution"
        description="Join 250+ educational institutions already transforming their operations with Findawise."
        buttons={[
          { label: "Book Education Pilot", href: "/automation/pilot", variant: "primary" },
          { label: "Contact Education Team", href: "/contact?type=education", variant: "outline" }
        ]}
        variant="dark"
      />
    </div>
  );
}