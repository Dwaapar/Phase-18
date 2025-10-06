import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Shield, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { CodeBlock } from "../components/ui/CodeBlock";

const complianceTopics = [
  {
    title: "FTC Guidelines",
    description: "Understanding disclosure requirements for affiliate marketing",
    icon: Shield,
  },
  {
    title: "Disclosure Best Practices",
    description: "How to properly disclose affiliate relationships",
    icon: FileText,
  },
  {
    title: "Legal Requirements",
    description: "State and federal regulations for affiliate marketing",
    icon: AlertCircle,
  },
];

const disclosureExamples = {
  basic: `<!-- Basic Disclosure -->
<div class="affiliate-disclosure">
  <p><strong>Disclosure:</strong> This post contains affiliate links. If you click through and make a purchase, I may receive a commission at no additional cost to you.</p>
</div>`,
  
  detailed: `<!-- Detailed Disclosure -->
<div class="affiliate-disclosure" style="background: #f0f0f0; padding: 15px; margin: 20px 0; border-left: 4px solid #007cba;">
  <h4>Affiliate Disclosure</h4>
  <p>This post contains affiliate links, which means I may receive a small commission if you click through and make a purchase. This comes at no additional cost to you and helps support the creation of free content. I only recommend products and services I personally use and believe will add value to my readers.</p>
</div>`,
  
  social: `🔗 Affiliate Link Disclosure: This post contains affiliate links. I may earn a commission if you purchase through these links at no extra cost to you. I only recommend products I personally use and trust. #ad #affiliate`
};

export default function AffiliateCompliancePage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Affiliate Compliance Guide</h1>
            <p className="text-xl text-white/80">
              Stay compliant with FTC guidelines and legal requirements for affiliate marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {complianceTopics.map((topic, i) => {
              const Icon = topic.icon;
              return (
                <div key={i} className="bg-monks-light-gray rounded-3xl p-8 text-center">
                  <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon size={24} className="text-monks-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-monks-black mb-4">{topic.title}</h3>
                  <p className="text-monks-gray">{topic.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Requirements */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-monks-black mb-6">Key Compliance Requirements</h2>
              <p className="text-xl text-monks-gray">
                Essential guidelines every affiliate marketer must follow.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <CheckCircle size={24} className="text-green-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-monks-black mb-2">Clear and Conspicuous Disclosures</h3>
                    <p className="text-monks-gray">
                      All affiliate relationships must be disclosed clearly and prominently. Disclosures should be placed before affiliate links and written in plain language.
                    </p>
                  </div>
                </div>
                
                <div className="bg-monks-light-gray rounded-2xl p-6">
                  <h4 className="font-semibold text-monks-black mb-3">Requirements:</h4>
                  <ul className="space-y-2 text-monks-gray">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                      <span>Placed before affiliate links</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                      <span>Written in plain, understandable language</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                      <span>Visible without scrolling or clicking</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                      <span>Close to the affiliate links</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <CheckCircle size={24} className="text-green-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-monks-black mb-2">Honest Reviews and Recommendations</h3>
                    <p className="text-monks-gray">
                      All reviews and recommendations must be honest and based on actual experience. Misleading claims or false testimonials are prohibited.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <CheckCircle size={24} className="text-green-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-monks-black mb-2">Material Connection Disclosure</h3>
                    <p className="text-monks-gray">
                      Any material connection between the affiliate and the merchant must be disclosed, including financial relationships, free products, or other compensation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosure Examples */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-monks-black mb-12 text-center">
              Disclosure Examples
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-monks-black mb-4">Basic Disclosure</h3>
                <CodeBlock
                  code={disclosureExamples.basic}
                  language="html"
                  title="Simple affiliate disclosure"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-monks-black mb-4">Detailed Disclosure</h3>
                <CodeBlock
                  code={disclosureExamples.detailed}
                  language="html"
                  title="Comprehensive affiliate disclosure"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-monks-black mb-4">Social Media Disclosure</h3>
                <CodeBlock
                  code={disclosureExamples.social}
                  language="text"
                  title="Social media post disclosure"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-monks-black mb-12 text-center">
              Best Practices Checklist
            </h2>
            
            <div className="bg-white rounded-3xl p-8">
              <div className="space-y-4">
                {[
                  "Use clear, unambiguous language in disclosures",
                  "Place disclosures before affiliate links",
                  "Make disclosures visible without scrolling",
                  "Use consistent disclosure language across all content",
                  "Disclose on every page/post with affiliate links",
                  "Include disclosures in email marketing",
                  "Update disclosures when relationships change",
                  "Keep records of all affiliate relationships",
                  "Review and update disclosures regularly",
                  "Train team members on compliance requirements"
                ].map((practice, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-monks-light-gray rounded-2xl">
                    <CheckCircle size={20} className="text-green-500 mt-0.5" />
                    <span className="text-monks-black">{practice}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help with Compliance?</h2>
          <p className="text-xl text-white/80 mb-8">
            Our affiliate platform includes built-in compliance tools and automated disclosure management.
          </p>
          <Link
            to="/affiliate"
            className="inline-flex items-center gap-2 bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300 group"
          >
            Explore Affiliate Hub
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}