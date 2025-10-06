import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Shield, FileText, Users, Clock, Award, Activity, Stethoscope, Building2 } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";
import { FeatureGrid } from "../../components/ui/FeatureGrid";
import { StatsGrid } from "../../components/ui/StatsGrid";
import { TestimonialCard } from "../../components/ui/TestimonialCard";
import { CallToAction } from "../../components/ui/CallToAction";

const useCases = [
  {
    title: "Patient Onboarding",
    description: "Streamline patient registration and intake processes with HIPAA-compliant automation that reduces wait times and improves patient experience.",
    icon: Heart,
    features: ["Digital intake forms", "Insurance verification", "Appointment scheduling", "Medical history processing"]
  },
  {
    title: "Compliance Automation",
    description: "Automated compliance monitoring and reporting for healthcare regulations with real-time alerts and audit trails.",
    icon: Shield,
    features: ["HIPAA monitoring", "Audit trail generation", "Risk assessment", "Regulatory reporting"]
  },
  {
    title: "Medical Records Management",
    description: "Intelligent document processing and electronic health record updates with OCR and data validation.",
    icon: FileText,
    features: ["OCR processing", "Data validation", "EHR integration", "Document classification"]
  },
  {
    title: "Clinical Workflow Automation",
    description: "Streamline clinical processes from lab orders to treatment protocols with intelligent automation.",
    icon: Stethoscope,
    features: ["Lab order processing", "Treatment protocols", "Medication management", "Care coordination"]
  },
  {
    title: "Revenue Cycle Management",
    description: "Automate billing, claims processing, and revenue optimization with integrated financial workflows.",
    icon: Building2,
    features: ["Claims processing", "Billing automation", "Payment tracking", "Revenue analytics"]
  },
  {
    title: "Quality Assurance",
    description: "Automated quality monitoring and improvement processes to ensure the highest standards of care.",
    icon: Award,
    features: ["Quality metrics", "Performance monitoring", "Improvement tracking", "Compliance scoring"]
  }
];

const stats = [
  { label: "Healthcare Providers", value: 150, suffix: "+" },
  { label: "Patients Served", value: 1000000, suffix: "+" },
  { label: "Efficiency Improvement", value: 45, suffix: "%" },
  { label: "HIPAA Compliance Rate", value: 100, suffix: "%" }
];

const testimonial = {
  name: "Dr. Michael Chen",
  role: "Chief Medical Officer",
  company: "Regional Medical Center",
  quote: "Findawise has transformed our patient care delivery. The automation solutions have allowed our staff to focus more on patient care while ensuring we maintain the highest compliance standards.",
  avatar: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  rating: 5
};

export default function HealthcareIndustryPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Healthcare Solutions"
        description="HIPAA-compliant automation solutions designed to improve patient outcomes while maintaining the highest security and privacy standards."
        variant="dark"
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-green-400" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-green-400" />
            <span>SOC 2 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-green-400" />
            <span>FDA Validated</span>
          </div>
        </div>
      </PageHeader>

      <ContentSection
        title="Healthcare Automation Solutions"
        description="From patient care to administrative efficiency, our solutions are designed specifically for healthcare environments with strict compliance requirements."
        variant="default"
      >
        <FeatureGrid features={useCases} columns={3} />
      </ContentSection>

      <ContentSection
        title="Trusted by Healthcare Leaders"
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
        title="Transform Healthcare Operations"
        description="Join 150+ healthcare providers already improving patient care with secure, compliant automation."
        buttons={[
          { label: "Book HIPAA-Compliant Pilot", href: "/automation/pilot", variant: "primary" },
          { label: "View Compliance Details", href: "/trust/compliance", variant: "outline" }
        ]}
        variant="dark"
      />
    </div>
  );
}