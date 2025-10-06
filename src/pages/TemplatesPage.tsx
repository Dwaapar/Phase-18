import React, { useState } from "react";
import { Search, Download, Star, Clock, Copy, Eye } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ContentSection } from "../components/ui/ContentSection";
import { SearchInput } from "../components/ui/SearchInput";
import { FilterDropdown } from "../components/ui/FilterDropdown";
import { Badge } from "../components/ui/Badge";
import { Link } from "react-router-dom";

const templates = [
  {
    id: "1",
    name: "Lead Qualification Email Sequence",
    category: "Sales",
    type: "Email Template",
    description: "5-email sequence for qualifying and nurturing leads with personalization tokens",
    downloads: 2400,
    rating: 4.9,
    lastUpdated: "Dec 2024",
    preview: "Hi {{firstName}}, I noticed you downloaded our automation guide...",
    tags: ["sales", "email", "nurturing", "personalization"]
  },
  {
    id: "2", 
    name: "Customer Onboarding Checklist",
    category: "Success",
    type: "Process Template",
    description: "Complete onboarding checklist with automated task assignments and progress tracking",
    downloads: 1800,
    rating: 4.8,
    lastUpdated: "Dec 2024",
    preview: "Welcome to [Company]! Here's your personalized onboarding plan...",
    tags: ["onboarding", "checklist", "automation", "tracking"]
  },
  {
    id: "3",
    name: "Invoice Processing Workflow",
    category: "Finance", 
    type: "Workflow Template",
    description: "End-to-end invoice processing with OCR, validation, and approval routing",
    downloads: 1500,
    rating: 4.7,
    lastUpdated: "Nov 2024",
    preview: "Automated invoice processing workflow with 3-tier approval system...",
    tags: ["finance", "invoicing", "ocr", "approval"]
  },
  {
    id: "4",
    name: "Support Ticket Response Templates",
    category: "Support",
    type: "Response Template",
    description: "Professional response templates for common support scenarios with tone variations",
    downloads: 3200,
    rating: 4.9,
    lastUpdated: "Dec 2024",
    preview: "Thank you for contacting support. I understand you're experiencing...",
    tags: ["support", "templates", "responses", "customer service"]
  },
  {
    id: "5",
    name: "Marketing Campaign Automation",
    category: "Marketing",
    type: "Campaign Template",
    description: "Multi-channel marketing campaign with email, social, and retargeting automation",
    downloads: 2100,
    rating: 4.6,
    lastUpdated: "Nov 2024",
    preview: "Integrated campaign workflow across email, social media, and ads...",
    tags: ["marketing", "campaigns", "multi-channel", "automation"]
  },
  {
    id: "6",
    name: "Employee Onboarding Process",
    category: "HR",
    type: "Process Template", 
    description: "Complete employee onboarding workflow with document collection and training assignments",
    downloads: 1600,
    rating: 4.8,
    lastUpdated: "Dec 2024",
    preview: "Welcome to the team! Your onboarding journey starts here...",
    tags: ["hr", "onboarding", "employees", "training"]
  },
  {
    id: "7",
    name: "Project Status Update Template",
    category: "Operations",
    type: "Communication Template",
    description: "Standardized project status updates with automated stakeholder notifications",
    downloads: 1300,
    rating: 4.5,
    lastUpdated: "Nov 2024",
    preview: "Project Status Update - Week of {{date}}. Current progress: {{percentage}}%...",
    tags: ["project management", "updates", "communication", "stakeholders"]
  },
  {
    id: "8",
    name: "Sales Proposal Generator",
    category: "Sales",
    type: "Document Template",
    description: "Dynamic proposal template with pricing calculations and contract terms",
    downloads: 1900,
    rating: 4.7,
    lastUpdated: "Dec 2024",
    preview: "Proposal for {{clientName}} - {{projectTitle}}. Executive Summary...",
    tags: ["sales", "proposals", "contracts", "pricing"]
  }
];

const categories = [
  { label: "All Categories", value: "all", count: templates.length },
  { label: "Sales", value: "sales", count: templates.filter(t => t.category === "Sales").length },
  { label: "Marketing", value: "marketing", count: templates.filter(t => t.category === "Marketing").length },
  { label: "Support", value: "support", count: templates.filter(t => t.category === "Support").length },
  { label: "Finance", value: "finance", count: templates.filter(t => t.category === "Finance").length },
  { label: "HR", value: "hr", count: templates.filter(t => t.category === "HR").length },
  { label: "Operations", value: "operations", count: templates.filter(t => t.category === "Operations").length }
];

const templateTypes = [
  { label: "All Types", value: "all" },
  { label: "Email Templates", value: "email" },
  { label: "Workflow Templates", value: "workflow" },
  { label: "Process Templates", value: "process" },
  { label: "Document Templates", value: "document" }
];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || 
                           template.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesType = selectedType === "all" ||
                       template.type.toLowerCase().includes(selectedType.toLowerCase());
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Template Library"
        description="Ready-to-use templates for emails, workflows, documents, and processes. Customize and deploy in minutes."
        variant="dark"
      />

      <ContentSection
        title="Browse Templates"
        description="Find the perfect template for your automation needs with our comprehensive library."
        variant="default"
      >
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <SearchInput
            placeholder="Search templates..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="flex-1"
          />
          <FilterDropdown
            label="Category"
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <FilterDropdown
            label="Type"
            options={templateTypes}
            value={selectedType}
            onChange={setSelectedType}
          />
        </div>

        {/* Templates Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-3xl border border-monks-gray/10 overflow-hidden hover:shadow-card transition-all duration-300 group">
              <div className="p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="accent">{template.category}</Badge>
                    <h3 className="text-xl font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
                      {template.name}
                    </h3>
                    <p className="text-sm text-monks-gray">{template.type}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="text-yellow-500 fill-yellow-500" size={14} />
                    <span className="text-monks-black">{template.rating}</span>
                  </div>
                </div>
                
                <p className="text-monks-gray">{template.description}</p>
                
                <div className="bg-monks-light-gray rounded-2xl p-4">
                  <h4 className="text-sm font-medium text-monks-black mb-2">Preview:</h4>
                  <p className="text-sm text-monks-gray italic">"{template.preview}"</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {template.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-monks-gray/10 text-monks-gray rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {template.tags.length > 3 && (
                    <span className="px-2 py-1 bg-monks-gray/10 text-monks-gray rounded text-xs">
                      +{template.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-monks-gray">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Download size={14} />
                      <span>{template.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{template.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex-1 bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2">
                    <Download size={14} />
                    Use Template
                  </button>
                  <button className="p-2 border border-monks-gray text-monks-gray rounded-full hover:border-monks-black hover:text-monks-black transition-all duration-300">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 border border-monks-gray text-monks-gray rounded-full hover:border-monks-black hover:text-monks-black transition-all duration-300">
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-monks-gray">No templates found matching your criteria.</p>
          </div>
        )}
      </ContentSection>

      <ContentSection
        title="Template Categories"
        description="Explore templates organized by business function and use case."
        variant="gray"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.slice(1).map((category, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center hover:shadow-card transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">
                  {category.label === "Sales" && "💼"}
                  {category.label === "Marketing" && "📢"}
                  {category.label === "Support" && "🎧"}
                  {category.label === "Finance" && "💰"}
                  {category.label === "HR" && "👥"}
                  {category.label === "Operations" && "⚙️"}
                </span>
              </div>
              <h3 className="font-semibold text-monks-black mb-2">{category.label}</h3>
              <p className="text-sm text-monks-gray">{category.count} templates</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Create Custom Templates"
        description="Need a custom template? Our team can create specialized templates for your unique requirements."
        variant="default"
      >
        <div className="max-w-2xl mx-auto bg-monks-light-gray rounded-3xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-monks-black mb-2">Template Type</label>
              <select className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent">
                <option value="">Select template type</option>
                <option value="email">Email Template</option>
                <option value="workflow">Workflow Template</option>
                <option value="document">Document Template</option>
                <option value="process">Process Template</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-monks-black mb-2">Use Case Description</label>
              <textarea
                placeholder="Describe what you need the template for..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-monks-black mb-2">Your Email</label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
              />
            </div>
            
            <button className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
              Request Custom Template
            </button>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}