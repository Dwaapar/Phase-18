import React from "react";
import { FileCheck, Shield, Globe, Users } from "lucide-react";

const complianceAreas = [
  {
    title: "Data Privacy",
    description: "GDPR, CCPA, and other privacy regulations",
    icon: Shield,
    details: ["Data subject rights", "Consent management", "Privacy by design"]
  },
  {
    title: "Security Standards",
    description: "SOC 2, ISO 27001, and security frameworks",
    icon: FileCheck,
    details: ["Annual audits", "Continuous monitoring", "Third-party assessments"]
  },
  {
    title: "Industry Regulations",
    description: "Sector-specific compliance requirements",
    icon: Globe,
    details: ["Financial services", "Healthcare", "Government"]
  },
  {
    title: "Data Processing",
    description: "Transparent data handling and processing",
    icon: Users,
    details: ["Data mapping", "Processing records", "Impact assessments"]
  }
];

export default function CompliancePage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Compliance & Privacy</h1>
            <p className="text-xl text-white/80">
              Comprehensive compliance framework designed to meet global privacy and security standards.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Areas */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-monks-black mb-6">
              Compliance Framework
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Our comprehensive approach to compliance ensures your data is protected and regulations are met.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {complianceAreas.map((area, i) => {
              const Icon = area.icon;
              return (
                <div key={i} className="bg-monks-light-gray rounded-3xl p-8">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
                      <Icon size={24} className="text-monks-accent" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-monks-black">{area.title}</h3>
                      <p className="text-monks-gray">{area.description}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {area.details.map((detail, j) => (
                        <li key={j} className="flex items-center gap-3 text-monks-gray">
                          <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GDPR Section */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-monks-black mb-12 text-center">
              GDPR Compliance
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-monks-black mb-3">Data Subject Rights</h3>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Right to access personal data</li>
                  <li>• Right to rectification</li>
                  <li>• Right to erasure (right to be forgotten)</li>
                  <li>• Right to data portability</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-monks-black mb-3">Data Protection</h3>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Privacy by design and default</li>
                  <li>• Data minimization principles</li>
                  <li>• Consent management</li>
                  <li>• Breach notification procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DPA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-monks-black mb-6">
              Data Processing Agreement
            </h2>
            <p className="text-xl text-monks-gray mb-8">
              We provide a comprehensive Data Processing Agreement (DPA) that outlines our 
              commitment to protecting your data and meeting compliance requirements.
            </p>
            <div className="bg-monks-light-gray rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-monks-black mb-4">
                Request Our DPA
              </h3>
              <p className="text-monks-gray mb-6">
                Contact our legal team to receive a copy of our Data Processing Agreement 
                and discuss your specific compliance requirements.
              </p>
              <a
                href="mailto:legal@findawise.com"
                className="inline-flex items-center gap-2 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
              >
                Contact Legal Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}