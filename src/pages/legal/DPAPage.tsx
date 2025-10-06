import React from "react";
import { Download, Shield, FileCheck } from "lucide-react";

export default function DPAPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Data Processing Agreement</h1>
            <p className="text-xl text-white/80">
              Our commitment to protecting your data and ensuring compliance with privacy regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-display font-bold text-monks-black">What is a DPA?</h2>
              <p className="text-xl text-monks-gray leading-relaxed">
                A Data Processing Agreement (DPA) is a legal contract that outlines how personal data 
                is processed, stored, and protected when using our services. It ensures compliance 
                with GDPR, CCPA, and other privacy regulations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-monks-accent" />
                  <span className="text-monks-black">GDPR and CCPA compliant</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck size={20} className="text-monks-accent" />
                  <span className="text-monks-black">Legally binding agreement</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download size={20} className="text-monks-accent" />
                  <span className="text-monks-black">Available for enterprise customers</span>
                </div>
              </div>
            </div>
            
            <div className="bg-monks-light-gray rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-monks-black mb-6">DPA Coverage</h3>
              <ul className="space-y-3">
                {[
                  "Data processing purposes and legal basis",
                  "Categories of personal data processed",
                  "Data subject rights and procedures",
                  "Security measures and safeguards",
                  "Data retention and deletion policies",
                  "International data transfer provisions",
                  "Incident response and breach notification",
                  "Audit rights and compliance monitoring"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-monks-gray">
                    <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Provisions */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-monks-black mb-6">Key DPA Provisions</h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Our DPA includes comprehensive provisions to ensure your data is protected and 
              compliance requirements are met.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Data Processing",
                description: "Clear definition of processing purposes, legal basis, and data categories",
                icon: FileCheck
              },
              {
                title: "Security Measures",
                description: "Technical and organizational measures to protect personal data",
                icon: Shield
              },
              {
                title: "Data Subject Rights",
                description: "Procedures for handling access, rectification, and deletion requests",
                icon: FileCheck
              },
              {
                title: "Data Transfers",
                description: "Safeguards for international data transfers and adequacy decisions",
                icon: Shield
              },
              {
                title: "Breach Notification",
                description: "Incident response procedures and notification timelines",
                icon: FileCheck
              },
              {
                title: "Audit Rights",
                description: "Customer audit rights and compliance verification procedures",
                icon: Shield
              }
            ].map((provision, i) => {
              const Icon = provision.icon;
              return (
                <div key={i} className="bg-white rounded-3xl p-8">
                  <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mb-6">
                    <Icon size={24} className="text-monks-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-monks-black mb-4">{provision.title}</h3>
                  <p className="text-monks-gray">{provision.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Request DPA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-monks-light-gray rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-monks-black mb-6">Request Our DPA</h2>
            <p className="text-xl text-monks-gray mb-8">
              Enterprise customers can request a copy of our Data Processing Agreement. 
              Our legal team will work with you to ensure all your compliance requirements are met.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-2">Standard DPA</h3>
                <p className="text-sm text-monks-gray mb-4">
                  Our standard DPA covers most compliance requirements and is available immediately.
                </p>
                <button className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                  Download Standard DPA
                </button>
              </div>
              
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-2">Custom DPA</h3>
                <p className="text-sm text-monks-gray mb-4">
                  For specific requirements or custom terms, our legal team can work with you.
                </p>
                <button className="w-full border border-monks-black text-monks-black px-6 py-3 rounded-full font-medium hover:bg-monks-black hover:text-white transition-all duration-300">
                  Request Custom DPA
                </button>
              </div>
            </div>
            
            <p className="text-sm text-monks-gray">
              For questions about our DPA or data processing practices, contact our legal team at{" "}
              <a href="mailto:legal@findawise.com" className="text-monks-accent hover:underline">
                legal@findawise.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}