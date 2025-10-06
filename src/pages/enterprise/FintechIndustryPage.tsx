import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Shield, DollarSign, FileCheck, CreditCard, TrendingUp, Lock, AlertTriangle, BarChart, Users } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";
import { FeatureGrid } from "../../components/ui/FeatureGrid";
import { StatsGrid } from "../../components/ui/StatsGrid";
import { TestimonialCard } from "../../components/ui/TestimonialCard";
import { CallToAction } from "../../components/ui/CallToAction";

const saasMetrics = [
  { title: "Compliance Rate", value: "100%", description: "Regulatory compliance maintained" },
  { title: "Processing Speed", value: "85%", description: "Faster transaction processing" },
  { title: "Risk Reduction", value: "75%", description: "Decrease in compliance risks" },
  { title: "Cost Savings", value: "60%", description: "Operational cost reduction" }
];

const useCases = [
  {
    title: "Compliance Automation",
    description: "Automated KYC/AML processes and regulatory reporting with real-time monitoring and risk assessment.",
    icon: Shield,
    features: ["KYC automation", "AML monitoring", "Regulatory reporting", "Risk assessment"]
  },
  {
    title: "Payment Processing",
    description: "Streamlined payment workflows with fraud detection, transaction monitoring, and automated reconciliation.",
    icon: CreditCard,
    features: ["Fraud detection", "Transaction monitoring", "Payment routing", "Reconciliation"]
  },
  {
    title: "Risk Management",
    description: "AI-powered risk scoring and decision automation with continuous monitoring and alerting.",
    icon: AlertTriangle,
    features: ["Risk scoring", "Decision automation", "Continuous monitoring", "Alert management"]
  },
  {
    title: "Customer Onboarding",
    description: "Secure and compliant customer onboarding with identity verification and account setup automation.",
    icon: Users,
    features: ["Identity verification", "Account setup", "Document processing", "Compliance checks"]
  },
  {
    title: "Financial Reporting",
    description: "Automated financial reporting and analytics with real-time dashboards and regulatory compliance.",
    icon: BarChart,
    features: ["Automated reporting", "Real-time analytics", "Compliance tracking", "Performance metrics"]
  },
  {
    title: "Transaction Monitoring",
    description: "Continuous transaction monitoring with anomaly detection and automated investigation workflows.",
    icon: TrendingUp,
    features: ["Anomaly detection", "Investigation workflows", "Pattern recognition", "Alert prioritization"]
  }
];

const complianceStandards = [
  { name: "PCI DSS", status: "Level 1", description: "Payment Card Industry Data Security Standard" },
  { name: "SOC 2 Type II", status: "Certified", description: "Security, availability, and confidentiality" },
  { name: "ISO 27001", status: "Certified", description: "Information security management" },
  { name: "GDPR", status: "Compliant", description: "General Data Protection Regulation" },
  { name: "CCPA", status: "Compliant", description: "California Consumer Privacy Act" },
  { name: "SOX", status: "Compliant", description: "Sarbanes-Oxley Act compliance" }
];

const stats = [
  { label: "Fintech Companies", value: 200, suffix: "+" },
  { label: "Average Growth", value: 80, suffix: "%" },
  { label: "Compliance Rate", value: 100, suffix: "%" },
  { label: "Risk Reduction", value: 75, suffix: "%" }
];

const caseStudy = {
  title: "Digital Bank Achieves 100% Regulatory Compliance with 90% Automation",
  company: "NeoBank Financial",
  challenge: "Manual compliance processes creating bottlenecks and regulatory risks in a fast-growing digital bank",
  solution: "Comprehensive automation of KYC, AML, and regulatory reporting with real-time monitoring",
  results: [
    { metric: "Compliance Automation", value: "90%", description: "Of regulatory processes automated" },
    { metric: "Processing Time", value: "-85%", description: "Faster compliance checks" },
    { metric: "Risk Detection", value: "+95%", description: "Improvement in risk identification" },
    { metric: "Operational Costs", value: "-60%", description: "Reduction in compliance costs" }
  ]
};

const testimonial = {
  name: "David Kim",
  role: "Chief Compliance Officer",
  company: "NeoBank Financial",
  quote: "The automation platform has been crucial to our regulatory success. We've maintained 100% compliance while scaling 10x faster than traditional banks. The real-time monitoring gives us confidence in every transaction.",
  avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  rating: 5
};

export default function FintechIndustryPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Fintech Solutions"
        description="Secure, compliant automation for financial services and fintech companies with enterprise-grade security and regulatory compliance."
        variant="dark"
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-green-400" />
            <span>Bank-Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-green-400" />
            <span>Regulatory Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck size={16} className="text-green-400" />
            <span>Audit Ready</span>
          </div>
        </div>
      </PageHeader>

      <ContentSection
        title="Fintech Automation Solutions"
        description="From compliance to payments, automate critical financial processes with enterprise-grade security and regulatory compliance."
        variant="default"
      >
        <FeatureGrid features={useCases} columns={3} />
      </ContentSection>

      <ContentSection
        title="Built for Financial Compliance"
        description="Our platform meets the highest security and compliance standards required by financial institutions worldwide."
        variant="gray"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {complianceStandards.map((standard, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield size={20} className="text-green-600" />
              </div>
              <h3 className="font-bold text-monks-black mb-1">{standard.name}</h3>
              <div className="text-sm text-green-600 font-medium mb-2">{standard.status}</div>
              <p className="text-xs text-monks-gray">{standard.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Fintech Success Metrics"
        description="Our solutions are designed to impact the key performance indicators that drive fintech success."
        variant="default"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {saasMetrics.map((metric, i) => (
            <div key={i} className="bg-monks-light-gray rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={24} className="text-monks-accent" />
              </div>
              <div className="text-3xl font-bold text-monks-accent mb-2">{metric.value}</div>
              <h3 className="font-semibold text-monks-black mb-2">{metric.title}</h3>
              <p className="text-sm text-monks-gray">{metric.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Featured Success Story"
        variant="gray"
      >
        <div className="bg-gradient-to-br from-monks-accent/5 to-monks-accent/10 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl text-monks-accent font-semibold">{caseStudy.title}</h3>
            <p className="text-monks-gray mt-2">{caseStudy.company}</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-monks-black mb-2">Challenge</h4>
                <p className="text-monks-gray">{caseStudy.challenge}</p>
              </div>
              <div>
                <h4 className="font-semibold text-monks-black mb-2">Solution</h4>
                <p className="text-monks-gray">{caseStudy.solution}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {caseStudy.results.map((result, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-monks-accent mb-2">{result.value}</div>
                  <div className="font-medium text-monks-black mb-1">{result.metric}</div>
                  <div className="text-xs text-monks-gray">{result.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/case-studies/fintech-compliance-automation"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Read Full Case Study
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Trusted by Fintech Leaders"
        variant="default"
      >
        <div className="max-w-3xl mx-auto">
          <TestimonialCard {...testimonial} />
        </div>
      </ContentSection>

      <ContentSection variant="gray">
        <StatsGrid stats={stats} columns={4} />
      </ContentSection>

      <CallToAction
        title="Secure Your Fintech Operations"
        description="Join 200+ fintech companies trusting Findawise with their automation and compliance needs."
        buttons={[
          { label: "Book Fintech Pilot", href: "/automation/pilot", variant: "primary" },
          { label: "View Security Details", href: "/trust/security", variant: "outline" }
        ]}
        variant="dark"
      />
    </div>
  );
}