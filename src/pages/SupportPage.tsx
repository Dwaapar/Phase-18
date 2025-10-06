import React, { useState } from "react";
import { MessageSquare, Book, Video, Mail, Phone, Search } from "lucide-react";
import { ContactForm } from "../components/forms/ContactForm";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/Accordion";
import { SearchInput } from "../components/ui/SearchInput";

const supportOptions = [
  {
    title: "Live Chat",
    description: "Get instant help from our support team",
    icon: MessageSquare,
    availability: "24/7",
    responseTime: "< 2 minutes"
  },
  {
    title: "Documentation",
    description: "Comprehensive guides and tutorials",
    icon: Book,
    availability: "Always",
    responseTime: "Instant"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    icon: Video,
    availability: "Always",
    responseTime: "Instant"
  },
  {
    title: "Email Support",
    description: "Detailed support via email",
    icon: Mail,
    availability: "Business hours",
    responseTime: "< 4 hours"
  },
  {
    title: "Phone Support",
    description: "Direct phone support for urgent issues",
    icon: Phone,
    availability: "Business hours",
    responseTime: "< 15 minutes"
  }
];

const faqs = [
  {
    question: "How do I deploy my first workflow?",
    answer: "Browse our workflow library, select a workflow that fits your needs, configure the required environment variables, and click 'Deploy'. The workflow will be live within minutes."
  },
  {
    question: "What's the difference between managed and self-hosted agents?",
    answer: "Managed agents run on our infrastructure with automatic scaling and maintenance. Self-hosted agents run on your infrastructure, giving you full control over data and customization."
  },
  {
    question: "How do I integrate with my existing tools?",
    answer: "Most workflows support popular integrations like Salesforce, HubSpot, Slack, and more. Check the workflow requirements and follow our integration guides in the documentation."
  },
  {
    question: "What happens if a workflow fails?",
    answer: "Failed workflows trigger automatic alerts, and our system provides detailed error logs. Most issues can be resolved by updating environment variables or checking integration permissions."
  },
  {
    question: "Can I customize existing workflows?",
    answer: "Yes! You can fork any workflow and modify it to fit your specific needs. Our visual workflow editor makes customization easy even for non-technical users."
  },
  {
    question: "How is my data protected?",
    answer: "We use bank-grade encryption, SOC 2 Type II compliance, and follow strict data protection protocols. Your data is encrypted at rest and in transit."
  },
  {
    question: "What's included in the free plan?",
    answer: "The free plan includes 5 workflow deployments, basic AI agents, community support, and access to our standard template library."
  },
  {
    question: "How do I upgrade my plan?",
    answer: "You can upgrade your plan anytime from your dashboard settings. Upgrades take effect immediately with prorated billing."
  }
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Support Center</h1>
            <p className="text-xl text-white/80">
              Get help when you need it. Our support team and resources are here 24/7.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <SearchInput
                placeholder="Search for help..."
                value={searchQuery}
                onChange={setSearchQuery}
                size="lg"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-monks-black mb-6">
              How Can We Help?
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Choose the support option that works best for you.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {supportOptions.map((option, i) => {
              const Icon = option.icon;
              return (
                <div key={i} className="bg-monks-light-gray rounded-3xl p-8 text-center hover:shadow-card transition-all duration-300">
                  <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon size={24} className="text-monks-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-monks-black mb-4">{option.title}</h3>
                  <p className="text-monks-gray mb-6">{option.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-monks-gray">Availability:</span>
                      <span className="text-monks-black font-medium">{option.availability}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-monks-gray">Response Time:</span>
                      <span className="text-monks-accent font-medium">{option.responseTime}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                    Get Help
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-monks-black mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-monks-gray">
              Find quick answers to common questions.
            </p>
          </div>

          <Accordion type="single">
            {filteredFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white">
                <AccordionTrigger>
                  <span className="text-left font-semibold text-monks-black">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-monks-gray leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-monks-gray">No FAQs found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-display font-bold text-monks-black mb-6">
                  Still Need Help?
                </h2>
                <p className="text-xl text-monks-gray leading-relaxed">
                  Can't find what you're looking for? Our support team is here to help you succeed.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-monks-accent/10 rounded-full flex items-center justify-center">
                    <MessageSquare size={20} className="text-monks-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-monks-black">24/7 Support</h3>
                    <p className="text-monks-gray text-sm">Always available when you need us</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-monks-accent/10 rounded-full flex items-center justify-center">
                    <Book size={20} className="text-monks-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-monks-black">Comprehensive Docs</h3>
                    <p className="text-monks-gray text-sm">Detailed guides and tutorials</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-monks-accent/10 rounded-full flex items-center justify-center">
                    <Video size={20} className="text-monks-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-monks-black">Video Tutorials</h3>
                    <p className="text-monks-gray text-sm">Learn with step-by-step videos</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-monks-light-gray rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-monks-black mb-6">Contact Support</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}