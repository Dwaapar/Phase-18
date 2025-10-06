import React from "react";
import { Search, Book, Code, Zap, Settings } from "lucide-react";

const docSections = [
  {
    title: "Getting Started",
    description: "Quick start guides and basic concepts",
    icon: Book,
    articles: [
      "Introduction to Findawise",
      "Setting up your first workflow",
      "Understanding the platform",
      "Basic automation concepts"
    ]
  },
  {
    title: "API Reference",
    description: "Complete API documentation and examples",
    icon: Code,
    articles: [
      "Authentication",
      "Workflows API",
      "Agents API",
      "Webhooks",
      "Rate limits"
    ]
  },
  {
    title: "Workflows",
    description: "Creating and managing automated workflows",
    icon: Zap,
    articles: [
      "Workflow builder guide",
      "Triggers and actions",
      "Conditional logic",
      "Error handling",
      "Testing workflows"
    ]
  },
  {
    title: "Configuration",
    description: "Platform settings and customization",
    icon: Settings,
    articles: [
      "Environment variables",
      "Security settings",
      "Team management",
      "Integrations setup",
      "Billing and usage"
    ]
  }
];

export default function DocsPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Documentation</h1>
            <p className="text-xl text-white/80">
              Everything you need to build, deploy, and scale with Findawise.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 text-white/60" size={20} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <a href="#getting-started" className="group p-6 bg-monks-light-gray rounded-2xl hover:bg-monks-accent hover:text-white transition-all duration-300">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-monks-accent/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors duration-300">
                  <Book size={20} className="text-monks-accent group-hover:text-white" />
                </div>
                <h3 className="font-semibold">Quick Start</h3>
                <p className="text-sm text-monks-gray group-hover:text-white/80">Get up and running in 5 minutes</p>
              </div>
            </a>
            
            <a href="#api" className="group p-6 bg-monks-light-gray rounded-2xl hover:bg-monks-accent hover:text-white transition-all duration-300">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-monks-accent/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors duration-300">
                  <Code size={20} className="text-monks-accent group-hover:text-white" />
                </div>
                <h3 className="font-semibold">API Reference</h3>
                <p className="text-sm text-monks-gray group-hover:text-white/80">Complete API documentation</p>
              </div>
            </a>
            
            <a href="#workflows" className="group p-6 bg-monks-light-gray rounded-2xl hover:bg-monks-accent hover:text-white transition-all duration-300">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-monks-accent/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors duration-300">
                  <Zap size={20} className="text-monks-accent group-hover:text-white" />
                </div>
                <h3 className="font-semibold">Workflows</h3>
                <p className="text-sm text-monks-gray group-hover:text-white/80">Build powerful automations</p>
              </div>
            </a>
            
            <a href="#examples" className="group p-6 bg-monks-light-gray rounded-2xl hover:bg-monks-accent hover:text-white transition-all duration-300">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-monks-accent/10 group-hover:bg-white/20 rounded-2xl flex items-center justify-center transition-colors duration-300">
                  <Settings size={20} className="text-monks-accent group-hover:text-white" />
                </div>
                <h3 className="font-semibold">Examples</h3>
                <p className="text-sm text-monks-gray group-hover:text-white/80">Real-world use cases</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {docSections.map((section, i) => {
              const Icon = section.icon;
              return (
                <div key={i} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
                      <Icon size={20} className="text-monks-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-monks-black">{section.title}</h2>
                      <p className="text-monks-gray">{section.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {section.articles.map((article, j) => (
                      <a
                        key={j}
                        href={`#${article.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block p-3 rounded-lg hover:bg-monks-light-gray transition-colors duration-300 text-monks-gray hover:text-monks-black"
                      >
                        {article}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-monks-black mb-6">
            Need Help?
          </h2>
          <p className="text-xl text-monks-gray mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
              Contact Support
            </button>
            <button className="border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
              Join Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}