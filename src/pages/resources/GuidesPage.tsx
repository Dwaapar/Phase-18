import React from "react";
import { Download, Clock, Star } from "lucide-react";

const guides = [
  {
    title: "Complete Guide to Business Process Automation",
    description: "Everything you need to know about automating your business processes",
    category: "Automation",
    pages: 45,
    readTime: "30 min",
    rating: 4.9,
    downloads: "2.1k",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    title: "AI Agents Implementation Playbook",
    description: "Step-by-step guide to deploying AI agents in your organization",
    category: "AI Agents",
    pages: 32,
    readTime: "25 min",
    rating: 4.8,
    downloads: "1.8k",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    title: "Workflow Design Best Practices",
    description: "Design scalable and maintainable workflows that grow with your business",
    category: "Workflows",
    pages: 28,
    readTime: "20 min",
    rating: 4.7,
    downloads: "1.5k",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    title: "ROI Calculator for Automation Projects",
    description: "Calculate and justify the return on investment for automation initiatives",
    category: "Business",
    pages: 15,
    readTime: "15 min",
    rating: 4.6,
    downloads: "1.2k",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    title: "Security Checklist for Automated Systems",
    description: "Ensure your automated processes meet security and compliance requirements",
    category: "Security",
    pages: 22,
    readTime: "18 min",
    rating: 4.8,
    downloads: "980",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  },
  {
    title: "Decision Tree Automation Guide",
    description: "Build intelligent decision-making systems for your business processes",
    category: "Decision Platform",
    pages: 35,
    readTime: "28 min",
    rating: 4.7,
    downloads: "850",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
  }
];

const categories = ["All", "Automation", "AI Agents", "Workflows", "Business", "Security", "Decision Platform"];

export default function GuidesPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Guides & Resources</h1>
            <p className="text-xl text-white/80">
              Comprehensive guides, playbooks, and resources to help you succeed with automation.
            </p>
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
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
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
                  
                  <div className="flex items-center justify-between text-sm text-monks-gray">
                    <div className="flex items-center gap-4">
                      <span>{guide.pages} pages</span>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {guide.readTime}
                      </div>
                    </div>
                    <span>{guide.downloads} downloads</span>
                  </div>
                  
                  <button className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-monks-black mb-6">
            Get New Guides First
          </h2>
          <p className="text-xl text-monks-gray mb-8">
            Be the first to access our latest guides and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
            />
            <button className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}