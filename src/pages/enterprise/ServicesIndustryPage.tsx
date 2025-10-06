import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Briefcase, Clock, DollarSign, Users, FileText, BarChart, Target, Zap, Building } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";
import { FeatureGrid } from "../../components/ui/FeatureGrid";
import { StatsGrid } from "../../components/ui/StatsGrid";
import { TestimonialCard } from "../../components/ui/TestimonialCard";
import { CallToAction } from "../../components/ui/CallToAction";

const useCases = [
  {
    title: "Client Onboarding",
    description: "Streamline new client setup, contract processing, and project initiation with intelligent automation that reduces time-to-value.",
    icon: Briefcase,
    features: ["Contract automation", "Project setup", "Team assignment", "Client portal creation"]
  },
  {
    title: "Project Management",
    description: "Automate project tracking, milestone reporting, and resource allocation for optimal delivery performance.",
    icon: Clock,
    features: ["Task automation", "Progress tracking", "Resource optimization", "Timeline management"]
  },
  {
    title: "Billing & Invoicing",
    description: "Automated time tracking, expense management, and invoice generation with integrated payment processing.",
    icon: DollarSign,
    features: ["Time tracking", "Expense automation", "Invoice generation", "Payment processing"]
  },
  {
    title: "Client Communication",
    description: "Automated client updates, report generation, and stakeholder communication workflows.",
    icon: Users,
    features: ["Status updates", "Report automation", "Meeting scheduling", "Feedback collection"]
  },
  {
    title: "Resource Management",
    description: "Optimize team allocation, skill matching, and capacity planning across all projects.",
    icon: Target,
    features: ["Capacity planning", "Skill matching", "Workload balancing", "Performance tracking"]
  },
  {
    title: "Business Development",
    description: "Automate lead qualification, proposal generation, and client acquisition processes.",
    icon: Zap,
    features: ["Lead scoring", "Proposal automation", "Pipeline management", "Follow-up sequences"]
  }
];

const stats = [
  { label: "Service Firms", value: 400, suffix: "+" },
  { label: "Productivity Gain", value: 50, suffix: "%" },
  { label: "Cost Reduction", value: 65, suffix: "%" },
  { label: "Client Satisfaction", value: 95, suffix: "%" }
];

const testimonial = {
  name: "Jennifer Walsh",
  role: "Managing Partner",
  company: "Strategic Consulting Group",
  quote: "Findawise has been a game-changer for our consulting practice. We've been able to take on 3x more clients while maintaining the same quality of service. The automation handles all the routine work so we can focus on strategy.",
  avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  rating: 5
};

export default function ServicesIndustryPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Professional Services"
        description="Scale your service delivery with intelligent automation for consulting, agencies, and professional firms of all sizes."
        variant="dark"
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Briefcase size={16} className="text-green-400" />
            <span>Service-Focused</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-green-400" />
            <span>Time Optimization</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-green-400" />
            <span>Profit Maximization</span>
          </div>
        </div>
      </PageHeader>

      <ContentSection
        title="Professional Services Automation"
        description="Focus on delivering exceptional value to clients while automation handles the operational complexity behind the scenes."
        variant="default"
      >
        <FeatureGrid features={useCases} columns={3} />
      </ContentSection>

      <ContentSection
        title="Trusted by Service Leaders"
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
        title="Scale Your Professional Services"
        description="Join 400+ professional service firms already growing with intelligent automation."
        buttons={[
          { label: "Book Services Pilot", href: "/automation/pilot", variant: "primary" },
          { label: "Explore Solutions", href: "/solutions?type=professional", variant: "outline" }
        ]}
        variant="dark"
      />
    </div>
  );
}