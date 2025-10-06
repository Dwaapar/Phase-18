import React from "react";
import { Search, Star, Download } from "lucide-react";

const guides = [
  {
    title: "Best CRM for Startups 2024",
    description: "Compare HubSpot, Pipedrive, Salesforce, and more for growing businesses",
    category: "Sales Tools",
    rating: 4.9,
    downloads: "2.1k",
    lastUpdated: "Dec 2024",
    comparison: ["HubSpot", "Pipedrive", "Salesforce", "Zoho CRM"]
  },
  {
    title: "Marketing Automation Platforms",
    description: "Mailchimp vs ActiveCampaign vs ConvertKit vs Klaviyo",
    category: "Marketing",
    rating: 4.8,
    downloads: "1.8k", 
    lastUpdated: "Dec 2024",
    comparison: ["Mailchimp", "ActiveCampaign", "ConvertKit", "Klaviyo"]
  },
  {
    title: "Project Management Solutions",
    description: "Asana vs Monday.com vs ClickUp vs Notion for team productivity",
    category: "Productivity",
    rating: 4.7,
    downloads: "1.5k",
    lastUpdated: "Nov 2024",
    comparison: ["Asana", "Monday.com", "ClickUp", "Notion"]
  },
  {
    title: "E-commerce Platforms Comparison",
    description: "Shopify vs WooCommerce vs BigCommerce for online stores",
    category: "E-commerce",
    rating: 4.8,
    downloads: "1.3k",
    lastUpdated: "Nov 2024",
    comparison: ["Shopify", "WooCommerce", "BigCommerce", "Squarespace"]
  },
  {
    title: "Customer Support Software",
    description: "Zendesk vs Intercom vs Freshdesk vs Help Scout",
    category: "Support",
    rating: 4.6,
    downloads: "1.1k",
    lastUpdated: "Nov 2024",
    comparison: ["Zendesk", "Intercom", "Freshdesk", "Help Scout"]
  },
  {
    title: "Accounting Software for SMBs",
    description: "QuickBooks vs Xero vs FreshBooks vs Wave",
    category: "Finance",
    rating: 4.7,
    downloads: "980",
    lastUpdated: "Oct 2024",
    comparison: ["QuickBooks", "Xero", "FreshBooks", "Wave"]
  }
];

const categories = ["All", "Sales Tools", "Marketing", "Productivity", "E-commerce", "Support", "Finance"];

export default function DecisionGuidesPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Decision Guides</h1>
            <p className="text-xl text-white/80">
              Comprehensive "Best X for Y" guides to help you make informed software decisions.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 text-white/60" size={20} />
                <input
                  type="text"
                  placeholder="Search guides..."
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:border-white/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  i === 0
                    ? "bg-monks-black text-white"
                    : "bg-monks-light-gray text-monks-gray hover:bg-monks-gray hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, i) => (
              <div key={i} className="group bg-white rounded-3xl border border-monks-gray/10 overflow-hidden hover:shadow-card transition-all duration-300">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-sm font-medium">
                      {guide.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-monks-gray">
                      <Star className="text-yellow-500 fill-yellow-500" size={14} />
                      {guide.rating}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
                    {guide.title}
                  </h3>
                  
                  <p className="text-monks-gray">
                    {guide.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-monks-black mb-2">Compares:</h4>
                      <div className="flex flex-wrap gap-2">
                        {guide.comparison.map((tool, j) => (
                          <span key={j} className="px-2 py-1 bg-monks-light-gray text-monks-gray rounded text-xs">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-monks-gray pt-4 border-t border-monks-gray/10">
                    <div className="space-y-1">
                      <div>{guide.downloads} downloads</div>
                      <div>Updated {guide.lastUpdated}</div>
                    </div>
                    <button className="bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center gap-2">
                      <Download size={14} />
                      Read Guide
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-monks-black mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-monks-gray mb-8">
            Take our 2-minute quiz to get personalized recommendations for your specific needs.
          </p>
          <button className="bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
            Take the Quiz
          </button>
        </div>
      </section>
    </div>
  );
}