import React from "react";
import { Shield, Lock, Eye, Server, FileCheck, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ContentSection } from "../components/ui/ContentSection";
import { FeatureGrid } from "../components/ui/FeatureGrid";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/Accordion";
import { StatsGrid } from "../components/ui/StatsGrid";

const securityFeatures = [
  {
    title: "Data Encryption",
    description: "End-to-end encryption for all data in transit and at rest using industry-standard AES-256 encryption",
    icon: Lock,
    features: ["AES-256 encryption", "TLS 1.3 for data in transit", "Encrypted database storage", "Key rotation"]
  },
  {
    title: "Access Controls",
    description: "Multi-factor authentication and role-based access controls with granular permissions",
    icon: Shield,
    features: ["SSO integration", "MFA required", "Granular permissions", "Session management"]
  },
  {
    title: "Monitoring & Auditing",
    description: "Comprehensive logging and real-time security monitoring with automated threat detection",
    icon: Eye,
    features: ["24/7 security monitoring", "Audit trails", "Anomaly detection", "Incident response"]
  },
  {
    title: "Infrastructure Security",
    description: "Enterprise-grade cloud infrastructure with isolated environments and security controls",
    icon: Server,
    features: ["SOC 2 Type II certified", "Regular penetration testing", "Isolated environments", "DDoS protection"]
  },
  {
    title: "Compliance Management",
    description: "Built-in compliance controls for GDPR, CCPA, HIPAA, and other regulatory requirements",
    icon: FileCheck,
    features: ["GDPR compliance", "CCPA ready", "HIPAA controls", "Audit reporting"]
  },
  {
    title: "Identity Management",
    description: "Advanced identity and access management with zero-trust security principles",
    icon: Users,
    features: ["Zero-trust architecture", "Identity verification", "Access reviews", "Privileged access management"]
  }
];

const certifications = [
  { name: "SOC 2 Type II", description: "Security, availability, and confidentiality", status: "Certified" },
  { name: "ISO 27001", description: "Information security management", status: "Certified" },
  { name: "GDPR", description: "Data protection and privacy", status: "Compliant" },
  { name: "CCPA", description: "California consumer privacy", status: "Compliant" },
  { name: "HIPAA", description: "Healthcare data protection", status: "Compliant" },
  { name: "PCI DSS", description: "Payment card industry security", status: "Level 1" }
];

const securityPractices = [
  {
    title: "Data Protection",
    content: "All customer data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3. We implement strict data retention policies and provide secure data deletion upon request. Our data centers are SOC 2 Type II certified with 24/7 physical security."
  },
  {
    title: "Access Management", 
    content: "Multi-factor authentication is required for all accounts. We implement role-based access controls with the principle of least privilege, ensuring users only have access to necessary resources. All access is logged and regularly reviewed."
  },
  {
    title: "Incident Response",
    content: "We maintain a comprehensive incident response plan with 24/7 monitoring and automated alerting. Our security team responds to incidents within 15 minutes of detection. All incidents are documented and reviewed for continuous improvement."
  },
  {
    title: "Vulnerability Management",
    content: "Regular security assessments, penetration testing, and vulnerability scans are conducted by third-party security firms. We maintain a responsible disclosure program and patch critical vulnerabilities within 24 hours."
  },
  {
    title: "Business Continuity",
    content: "Our platform is designed for high availability with automated failover, data replication, and disaster recovery procedures. We maintain 99.9% uptime SLA with comprehensive backup and recovery capabilities."
  }
];

const stats = [
  { label: "Security Incidents", value: 0, description: "Zero security breaches since inception" },
  { label: "Uptime SLA", value: 99.9, suffix: "%", description: "Guaranteed availability" },
  { label: "Response Time", value: 15, suffix: " min", description: "Average incident response" },
  { label: "Compliance Rate", value: 100, suffix: "%", description: "Audit success rate" }
];

export default function SecurityCenterPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Security Center"
        description="Enterprise-grade security and compliance built into every layer of our platform. Your data is protected with bank-level security controls."
        variant="dark"
      />

      <ContentSection
        title="Security by Design"
        description="Security isn't an afterthought—it's built into every component of our platform from the ground up."
        variant="default"
      >
        <FeatureGrid features={securityFeatures} columns={3} />
      </ContentSection>

      <ContentSection
        title="Certifications & Compliance"
        description="We maintain the highest industry standards and certifications to ensure your data is always protected."
        variant="gray"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-green-600" />
              </div>
              <h3 className="font-bold text-monks-black mb-2">{cert.name}</h3>
              <div className="text-sm text-green-600 font-medium mb-2">{cert.status}</div>
              <p className="text-sm text-monks-gray">{cert.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Security Practices"
        description="Detailed information about our security practices and procedures."
        variant="default"
      >
        <div className="max-w-4xl mx-auto">
          <Accordion type="single">
            {securityPractices.map((practice, i) => (
              <AccordionItem key={i} value={`practice-${i}`} className="bg-white">
                <AccordionTrigger>
                  <span className="text-left font-semibold text-monks-black">{practice.title}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-monks-gray leading-relaxed">{practice.content}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ContentSection>

      <ContentSection
        title="Security Metrics"
        description="Our commitment to security is measured and verified through continuous monitoring."
        variant="gray"
      >
        <StatsGrid stats={stats} columns={4} variant="cards" />
      </ContentSection>

      <ContentSection
        title="Security Resources"
        description="Access security documentation, compliance reports, and best practices."
        variant="default"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-monks-light-gray rounded-3xl p-8">
            <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <FileCheck size={20} className="text-monks-accent" />
            </div>
            <h3 className="text-xl font-bold text-monks-black mb-4">Security Documentation</h3>
            <p className="text-monks-gray mb-6">
              Comprehensive security documentation including architecture, controls, and procedures.
            </p>
            <button className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
              Download Docs
            </button>
          </div>
          
          <div className="bg-monks-light-gray rounded-3xl p-8">
            <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <Shield size={20} className="text-monks-accent" />
            </div>
            <h3 className="text-xl font-bold text-monks-black mb-4">Compliance Reports</h3>
            <p className="text-monks-gray mb-6">
              Access our latest SOC 2, ISO 27001, and other compliance audit reports.
            </p>
            <button className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
              View Reports
            </button>
          </div>
          
          <div className="bg-monks-light-gray rounded-3xl p-8">
            <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mb-6">
              <AlertTriangle size={20} className="text-monks-accent" />
            </div>
            <h3 className="text-xl font-bold text-monks-black mb-4">Security Best Practices</h3>
            <p className="text-monks-gray mb-6">
              Learn how to implement security best practices in your automation workflows.
            </p>
            <button className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
              Read Guide
            </button>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}