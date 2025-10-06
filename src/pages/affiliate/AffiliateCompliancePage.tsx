import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Shield, FileText, AlertCircle, CheckCircle, ExternalLink } from "lucide-react";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/ui/Accordion";

const complianceTopics = [
  {
    title: "FTC Guidelines",
    description: "Understanding federal disclosure requirements for affiliate marketing",
    icon: Shield,
    details: ["Truth in advertising", "Material connection disclosure", "Clear and conspicuous requirements"]
  },
  {
    title: "Disclosure Best Practices",
    description: "How to properly disclose affiliate relationships across all channels",
    icon: FileText,
    details: ["Placement guidelines", "Language requirements", "Platform-specific rules"]
  },
  {
    title: "Legal Requirements",
    description: "State and federal regulations governing affiliate marketing",
    icon: AlertCircle,
    details: ["Consumer protection laws", "Advertising standards", "International regulations"]
  },
];

const disclosureExamples = {
  basic: `<!-- Basic Website Disclosure -->
<div class="affiliate-disclosure" style="background: #f8f9fa; padding: 15px; margin: 20px 0; border-left: 4px solid #007cba; border-radius: 5px;">
  <p><strong>Disclosure:</strong> This post contains affiliate links. If you click through and make a purchase, I may receive a commission at no additional cost to you.</p>
</div>`,
  
  detailed: `<!-- Comprehensive Disclosure -->
<div class="affiliate-disclosure" style="background: #f0f0f0; padding: 20px; margin: 25px 0; border: 2px solid #007cba; border-radius: 10px;">
  <h4 style="margin-top: 0; color: #007cba;">🔗 Affiliate Disclosure</h4>
  <p>This post contains affiliate links, which means I may receive a small commission if you click through and make a purchase. This comes at no additional cost to you and helps support the creation of free content.</p>
  <p><strong>Important:</strong> I only recommend products and services I personally use and believe will add value to my readers. My opinions are my own and are not influenced by affiliate partnerships.</p>
</div>`,
  
  social: `🔗 Affiliate Link Disclosure: This post contains affiliate links. I may earn a commission if you purchase through these links at no extra cost to you. I only recommend products I personally use and trust. #ad #affiliate #disclosure`,

  email: `Subject: [AD] Amazing Tool That Will Transform Your Business

Hi [Name],

**AFFILIATE DISCLOSURE:** This email contains affiliate links. I may earn a commission if you purchase through these links at no extra cost to you.

I wanted to share an incredible tool that has completely transformed how I manage my business...

[Rest of email content]

Best regards,
[Your Name]

P.S. Remember, I only recommend tools I personally use and believe in.`,

  youtube: `📢 AFFILIATE DISCLOSURE (Please Read)

This video contains affiliate links. If you purchase through these links, I may earn a commission at no extra cost to you. This helps support the channel and allows me to continue creating free content.

I only promote products I personally use and genuinely recommend. My opinions are honest and not influenced by potential commissions.

Thank you for your support! 🙏`
};

const bestPractices = [
  {
    title: "Placement",
    practices: [
      "Place disclosures BEFORE affiliate links",
      "Make them visible without scrolling",
      "Include on every page with affiliate content",
      "Use consistent placement across your site"
    ]
  },
  {
    title: "Language",
    practices: [
      "Use clear, unambiguous language",
      "Avoid legal jargon or complex terms",
      "Be specific about the relationship",
      "Explain the benefit to the reader"
    ]
  },
  {
    title: "Visibility",
    practices: [
      "Use contrasting colors for visibility",
      "Make text large enough to read easily",
      "Don't hide in fine print or footers",
      "Ensure mobile visibility"
    ]
  },
  {
    title: "Consistency",
    practices: [
      "Use the same disclosure language everywhere",
      "Update all platforms when relationships change",
      "Train team members on requirements",
      "Document your disclosure policies"
    ]
  }
];

const platformGuidelines = [
  {
    platform: "Instagram",
    requirements: [
      "Use #ad or #affiliate hashtags",
      "Place disclosure at the beginning of captions",
      "Include in Stories with clear visibility",
      "Use built-in 'Paid Partnership' feature when available"
    ]
  },
  {
    platform: "YouTube",
    requirements: [
      "Verbal disclosure at video beginning",
      "Written disclosure in description",
      "Use YouTube's disclosure features",
      "Include in video title if space allows"
    ]
  },
  {
    platform: "TikTok",
    requirements: [
      "Use #ad hashtag prominently",
      "Verbal disclosure in video",
      "Include in caption text",
      "Use platform disclosure tools"
    ]
  },
  {
    platform: "Email",
    requirements: [
      "Include in subject line when possible",
      "Clear disclosure at email beginning",
      "Repeat before each affiliate link",
      "Include in email signature"
    ]
  }
];

export default function AffiliateCompliancePage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Affiliate Compliance Guide</h1>
            <p className="text-xl text-white/80">
              Complete guide to staying compliant with FTC guidelines and legal requirements 
              for affiliate marketing across all platforms and channels.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-400" />
                <span>FTC Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-green-400" />
                <span>Legal Guidelines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>Best Practices</span>
              </div>
            </div>
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
                <div key={i} className="bg-monks-light-gray rounded-3xl p-8">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
                      <Icon size={24} className="text-monks-accent" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-monks-black">{topic.title}</h3>
                      <p className="text-monks-gray">{topic.description}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {topic.details.map((detail, j) => (
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

      {/* Key Requirements */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-monks-black mb-6">Key Compliance Requirements</h2>
              <p className="text-xl text-monks-gray">
                Essential guidelines every affiliate marketer must follow to stay compliant.
              </p>
            </div>

            <Accordion type="single">
              <AccordionItem value="clear-disclosure" className="bg-white">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-left font-semibold text-monks-black">Clear and Conspicuous Disclosures</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-monks-gray">
                      All affiliate relationships must be disclosed clearly and prominently. The FTC requires that 
                      disclosures be "clear and conspicuous," meaning they should be easily noticed and understood.
                    </p>
                    <div className="bg-monks-light-gray rounded-2xl p-6">
                      <h4 className="font-semibold text-monks-black mb-3">Requirements:</h4>
                      <ul className="space-y-2 text-monks-gray">
                        <li className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                          <span>Placed before affiliate links, not after</span>
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
                          <span>Close to the affiliate links they relate to</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="honest-reviews" className="bg-white">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-left font-semibold text-monks-black">Honest Reviews and Recommendations</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-monks-gray">
                      All reviews and recommendations must be honest and based on actual experience. 
                      Misleading claims or false testimonials are prohibited and can result in FTC penalties.
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-red-800 mb-3">Prohibited Practices:</h4>
                      <ul className="space-y-2 text-red-700">
                        <li>• Making false or unsubstantiated claims</li>
                        <li>• Recommending products you haven't used</li>
                        <li>• Hiding negative aspects of products</li>
                        <li>• Using fake testimonials or reviews</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="material-connection" className="bg-white">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500" />
                    <span className="text-left font-semibold text-monks-black">Material Connection Disclosure</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-monks-gray">
                      Any material connection between you and the merchant must be disclosed, including 
                      financial relationships, free products, or other compensation.
                    </p>
                    <div className="bg-monks-light-gray rounded-2xl p-6">
                      <h4 className="font-semibold text-monks-black mb-3">Types of Material Connections:</h4>
                      <ul className="space-y-2 text-monks-gray">
                        <li>• Commission-based affiliate relationships</li>
                        <li>• Free products or services received</li>
                        <li>• Sponsored content or paid partnerships</li>
                        <li>• Employment or business relationships</li>
                        <li>• Family or personal relationships</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Disclosure Examples */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-monks-black mb-12 text-center">
              Disclosure Examples by Platform
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-monks-black mb-4">Website/Blog Disclosure</h3>
                <CodeBlock
                  code={disclosureExamples.basic}
                  language="html"
                  title="Basic website affiliate disclosure"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-monks-black mb-4">Comprehensive Disclosure</h3>
                <CodeBlock
                  code={disclosureExamples.detailed}
                  language="html"
                  title="Detailed affiliate disclosure with styling"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-monks-black mb-4">Social Media Disclosure</h3>
                <CodeBlock
                  code={disclosureExamples.social}
                  language="text"
                  title="Instagram/Twitter/Facebook post disclosure"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-monks-black mb-4">Email Marketing Disclosure</h3>
                <CodeBlock
                  code={disclosureExamples.email}
                  language="text"
                  title="Email newsletter affiliate disclosure"
                />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-monks-black mb-4">YouTube Video Disclosure</h3>
                <CodeBlock
                  code={disclosureExamples.youtube}
                  language="text"
                  title="YouTube video description disclosure"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Guidelines */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-monks-black mb-6">
              Platform-Specific Guidelines
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Each platform has its own requirements and best practices for affiliate disclosures.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {platformGuidelines.map((platform, i) => (
              <div key={i} className="bg-white rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-monks-black mb-6">{platform.platform}</h3>
                <ul className="space-y-3">
                  {platform.requirements.map((requirement, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-green-500 mt-1" />
                      <span className="text-monks-gray">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-monks-black mb-6">
              Best Practices Checklist
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Follow these best practices to ensure your affiliate marketing stays compliant and effective.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {bestPractices.map((category, i) => (
              <div key={i} className="bg-monks-light-gray rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-monks-black mb-6">{category.title}</h3>
                <div className="space-y-3">
                  {category.practices.map((practice, j) => (
                    <div key={j} className="flex items-start gap-3 p-4 bg-white rounded-2xl">
                      <CheckCircle size={16} className="text-green-500 mt-0.5" />
                      <span className="text-monks-black">{practice}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Resources */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-monks-black mb-6">
              Legal Resources & References
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Official resources and guidelines from regulatory bodies.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="https://www.ftc.gov/tips-advice/business-center/guidance/ftcs-endorsement-guides-what-people-are-asking"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 hover:shadow-card transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <ExternalLink size={20} className="text-monks-accent" />
                <h3 className="font-semibold text-monks-black">FTC Endorsement Guides</h3>
              </div>
              <p className="text-sm text-monks-gray">
                Official FTC guidelines for endorsements and testimonials in advertising
              </p>
            </a>

            <a
              href="https://www.ftc.gov/business-guidance/resources/native-advertising-guide-businesses"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 hover:shadow-card transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <ExternalLink size={20} className="text-monks-accent" />
                <h3 className="font-semibold text-monks-black">Native Advertising Guide</h3>
              </div>
              <p className="text-sm text-monks-gray">
                FTC guidance on native advertising and sponsored content disclosure
              </p>
            </a>

            <a
              href="https://www.ftc.gov/business-guidance/blog/2019/11/ftc-releases-new-endorsement-guides-faqs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 hover:shadow-card transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <ExternalLink size={20} className="text-monks-accent" />
                <h3 className="font-semibold text-monks-black">Endorsement FAQs</h3>
              </div>
              <p className="text-sm text-monks-gray">
                Frequently asked questions about endorsement and disclosure requirements
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Compliance Tools */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-monks-accent/5 to-monks-accent/10 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-monks-black mb-6">
                Built-in Compliance Tools
              </h2>
              <p className="text-xl text-monks-gray max-w-3xl mx-auto">
                Our affiliate platform includes automated compliance features to help you stay compliant effortlessly.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield size={20} className="text-monks-accent" />
                </div>
                <h3 className="font-semibold text-monks-black mb-2">Auto-Disclosure</h3>
                <p className="text-sm text-monks-gray">
                  Automatic disclosure insertion for all affiliate links
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText size={20} className="text-monks-accent" />
                </div>
                <h3 className="font-semibold text-monks-black mb-2">Compliance Tracking</h3>
                <p className="text-sm text-monks-gray">
                  Monitor disclosure compliance across all your content
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={20} className="text-monks-accent" />
                </div>
                <h3 className="font-semibold text-monks-black mb-2">Compliance Alerts</h3>
                <p className="text-sm text-monks-gray">
                  Get notified when content needs disclosure updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Compliant with Confidence</h2>
          <p className="text-xl text-white/80 mb-8">
            Our affiliate platform includes built-in compliance tools and automated disclosure management 
            to keep you compliant without the hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/affiliate"
              className="inline-flex items-center gap-2 bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300 group"
            >
              Explore Affiliate Hub
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
            <Link
              to="/contact?type=compliance"
              className="border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-monks-black transition-all duration-300"
            >
              Get Compliance Help
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}