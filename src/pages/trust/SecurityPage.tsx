import React from "react";
import { Shield, Lock, Eye, Server } from "lucide-react";

const securityFeatures = [
  {
    title: "Data Encryption",
    description: "End-to-end encryption for all data in transit and at rest",
    icon: Lock,
    details: ["AES-256 encryption", "TLS 1.3 for data in transit", "Encrypted database storage"]
  },
  {
    title: "Access Controls",
    description: "Multi-factor authentication and role-based access",
    icon: Shield,
    details: ["SSO integration", "MFA required", "Granular permissions"]
  },
  {
    title: "Monitoring & Auditing",
    description: "Comprehensive logging and real-time security monitoring",
    icon: Eye,
    details: ["24/7 security monitoring", "Audit trails", "Anomaly detection"]
  },
  {
    title: "Infrastructure Security",
    description: "Enterprise-grade cloud infrastructure and security",
    icon: Server,
    details: ["SOC 2 Type II certified", "Regular penetration testing", "Isolated environments"]
  }
];

const certifications = [
  { name: "SOC 2 Type II", description: "Security, availability, and confidentiality" },
  { name: "ISO 27001", description: "Information security management" },
  { name: "GDPR", description: "Data protection and privacy" },
  { name: "CCPA", description: "California consumer privacy" }
];

export default function SecurityPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Enterprise Security</h1>
            <p className="text-xl text-white/80">
              Bank-grade security and compliance built into every layer of our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-monks-black mb-6">
              Security by Design
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Security isn't an afterthought—it's built into every component of our platform.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {securityFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-monks-light-gray rounded-3xl p-8">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
                      <Icon size={24} className="text-monks-accent" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-monks-black">{feature.title}</h3>
                      <p className="text-monks-gray">{feature.description}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {feature.details.map((detail, j) => (
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

      {/* Certifications */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-monks-black mb-6">
              Certifications & Compliance
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              We maintain the highest industry standards and certifications.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="text-monks-accent" />
                </div>
                <h3 className="font-bold text-monks-black mb-2">{cert.name}</h3>
                <p className="text-sm text-monks-gray">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-monks-black mb-12 text-center">
              Our Security Practices
            </h2>
            
            <div className="space-y-8">
              <div className="bg-monks-light-gray rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-monks-black mb-3">Data Protection</h3>
                <p className="text-monks-gray">
                  All customer data is encrypted at rest using AES-256 encryption and in transit using TLS 1.3. 
                  We implement strict data retention policies and provide secure data deletion upon request.
                </p>
              </div>
              
              <div className="bg-monks-light-gray rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-monks-black mb-3">Access Management</h3>
                <p className="text-monks-gray">
                  Multi-factor authentication is required for all accounts. We implement role-based access controls 
                  with the principle of least privilege, ensuring users only have access to necessary resources.
                </p>
              </div>
              
              <div className="bg-monks-light-gray rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-monks-black mb-3">Incident Response</h3>
                <p className="text-monks-gray">
                  We maintain a comprehensive incident response plan with 24/7 monitoring and automated alerting. 
                  Our security team responds to incidents within 15 minutes of detection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}