import React, { useState } from "react";
import { Search, Filter, ExternalLink, CheckCircle, Clock, Star } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ContentSection } from "../components/ui/ContentSection";
import { SearchInput } from "../components/ui/SearchInput";
import { FilterDropdown } from "../components/ui/FilterDropdown";
import { Badge } from "../components/ui/Badge";
import { Link } from "react-router-dom";

const integrations = [
  {
    name: "Salesforce",
    category: "CRM",
    description: "Complete CRM integration with lead routing, opportunity management, and reporting",
    logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "high",
    features: ["Lead sync", "Opportunity tracking", "Custom fields", "Real-time updates"],
    setupTime: "5 minutes",
    rating: 4.9,
    reviews: 1250
  },
  {
    name: "HubSpot",
    category: "CRM",
    description: "Marketing and sales automation with contact management and pipeline tracking",
    logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "high",
    features: ["Contact sync", "Deal tracking", "Email automation", "Analytics"],
    setupTime: "3 minutes",
    rating: 4.8,
    reviews: 980
  },
  {
    name: "Slack",
    category: "Communication",
    description: "Team notifications and workflow updates directly in your Slack channels",
    logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "high",
    features: ["Channel notifications", "Direct messages", "Custom commands", "Bot integration"],
    setupTime: "2 minutes",
    rating: 4.9,
    reviews: 2100
  },
  {
    name: "Microsoft Teams",
    category: "Communication",
    description: "Enterprise communication with workflow notifications and team collaboration",
    logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "medium",
    features: ["Team notifications", "Channel integration", "File sharing", "Meeting automation"],
    setupTime: "4 minutes",
    rating: 4.7,
    reviews: 750
  },
  {
    name: "Zapier",
    category: "Automation",
    description: "Connect with 5000+ apps through Zapier's automation platform",
    logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "high",
    features: ["Multi-step workflows", "App connections", "Data transformation", "Error handling"],
    setupTime: "10 minutes",
    rating: 4.6,
    reviews: 1800
  },
  {
    name: "Google Workspace",
    category: "Productivity",
    description: "Gmail, Drive, Sheets, and Calendar automation for productivity workflows",
    logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "high",
    features: ["Email automation", "Calendar sync", "Document creation", "Drive integration"],
    setupTime: "5 minutes",
    rating: 4.8,
    reviews: 1650
  },
  {
    name: "Stripe",
    category: "Payments",
    description: "Payment processing automation with subscription and invoice management",
    logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "high",
    features: ["Payment processing", "Subscription billing", "Invoice automation", "Webhook handling"],
    setupTime: "8 minutes",
    rating: 4.9,
    reviews: 890
  },
  {
    name: "Shopify",
    category: "E-commerce",
    description: "E-commerce automation for order processing, inventory, and customer management",
    logo: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "medium",
    features: ["Order sync", "Inventory tracking", "Customer data", "Product management"],
    setupTime: "6 minutes",
    rating: 4.7,
    reviews: 650
  },
  {
    name: "Airtable",
    category: "Database",
    description: "Database automation with record creation, updates, and data synchronization",
    logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "medium",
    features: ["Record automation", "Data sync", "View updates", "Formula calculations"],
    setupTime: "4 minutes",
    rating: 4.5,
    reviews: 420
  },
  {
    name: "Notion",
    category: "Productivity",
    description: "Workspace automation with page creation, database updates, and team collaboration",
    logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "beta",
    popularity: "medium",
    features: ["Page automation", "Database sync", "Template creation", "Team updates"],
    setupTime: "7 minutes",
    rating: 4.4,
    reviews: 320
  },
  {
    name: "Discord",
    category: "Communication",
    description: "Community and team communication with automated notifications and bot integration",
    logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "low",
    features: ["Server notifications", "Bot commands", "Role automation", "Channel management"],
    setupTime: "5 minutes",
    rating: 4.3,
    reviews: 280
  },
  {
    name: "Twilio",
    category: "Communication",
    description: "SMS and voice automation for customer communication and notifications",
    logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    status: "verified",
    popularity: "medium",
    features: ["SMS automation", "Voice calls", "WhatsApp integration", "Phone verification"],
    setupTime: "10 minutes",
    rating: 4.6,
    reviews: 540
  }
];

const categories = [
  { label: "All Categories", value: "all", count: integrations.length },
  { label: "CRM", value: "crm", count: integrations.filter(i => i.category === "CRM").length },
  { label: "Communication", value: "communication", count: integrations.filter(i => i.category === "Communication").length },
  { label: "Productivity", value: "productivity", count: integrations.filter(i => i.category === "Productivity").length },
  { label: "E-commerce", value: "ecommerce", count: integrations.filter(i => i.category === "E-commerce").length },
  { label: "Payments", value: "payments", count: integrations.filter(i => i.category === "Payments").length },
  { label: "Database", value: "database", count: integrations.filter(i => i.category === "Database").length },
  { label: "Automation", value: "automation", count: integrations.filter(i => i.category === "Automation").length }
];

const popularIntegrations = integrations.filter(i => i.popularity === "high").slice(0, 6);

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           integration.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge variant="success">Verified</Badge>;
      case "beta":
        return <Badge variant="warning">Beta</Badge>;
      default:
        return <Badge variant="secondary">Available</Badge>;
    }
  };

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "high":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      default:
        return "text-monks-gray";
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Integrations"
        description="Connect Findawise with your favorite tools and platforms. Over 100+ integrations available with more added weekly."
        variant="dark"
      />

      {/* Popular Integrations */}
      <ContentSection
        title="Popular Integrations"
        description="The most commonly used integrations by our customers."
        variant="default"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularIntegrations.map((integration, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-monks-gray/10 hover:shadow-card transition-all duration-300 group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                  {getStatusBadge(integration.status)}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
                    {integration.name}
                  </h3>
                  <p className="text-monks-gray">{integration.description}</p>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={14} />
                    <span className="text-monks-black">{integration.rating}</span>
                    <span className="text-monks-gray">({integration.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-monks-gray" />
                    <span className="text-monks-gray">{integration.setupTime}</span>
                  </div>
                </div>
                
                <button className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* All Integrations */}
      <ContentSection
        title="All Integrations"
        description="Browse our complete library of integrations and connect your favorite tools."
        variant="gray"
      >
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchInput
            placeholder="Search integrations..."
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
        </div>

        {/* Integrations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((integration, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-monks-gray/10 hover:shadow-card transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={integration.logo}
                      alt={integration.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-monks-black">{integration.name}</h3>
                      <Badge variant="secondary" size="sm">{integration.category}</Badge>
                    </div>
                  </div>
                  {getStatusBadge(integration.status)}
                </div>
                
                <p className="text-sm text-monks-gray">{integration.description}</p>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-monks-black">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.slice(0, 3).map((feature, j) => (
                      <span key={j} className="px-2 py-1 bg-monks-light-gray text-monks-gray rounded text-xs">
                        {feature}
                      </span>
                    ))}
                    {integration.features.length > 3 && (
                      <span className="px-2 py-1 bg-monks-light-gray text-monks-gray rounded text-xs">
                        +{integration.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-monks-gray">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-yellow-500" size={12} />
                    <span>{integration.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{integration.setupTime} setup</span>
                  </div>
                  <div className={getPopularityColor(integration.popularity)}>
                    {integration.popularity} demand
                  </div>
                </div>
                
                <button className="w-full bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 text-sm">
                  Connect {integration.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-monks-gray">No integrations found matching your criteria.</p>
          </div>
        )}
      </ContentSection>

      {/* Request Integration */}
      <ContentSection
        title="Don't See Your Tool?"
        description="We're constantly adding new integrations. Request the tools you need and we'll prioritize them."
        variant="default"
      >
        <div className="max-w-2xl mx-auto bg-monks-light-gray rounded-3xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-monks-black mb-2">
                Tool or Platform Name
              </label>
              <input
                type="text"
                placeholder="e.g., Notion, Airtable, Custom API"
                className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-monks-black mb-2">
                Use Case Description
              </label>
              <textarea
                placeholder="Describe how you'd like to use this integration..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-monks-black mb-2">
                Your Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
              />
            </div>
            
            <button className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
              Request Integration
            </button>
          </div>
        </div>
      </ContentSection>

      {/* Enterprise */}
      <ContentSection
        title="Enterprise Integrations"
        description="Need custom integrations or enterprise-specific connections? Our team can build them for you."
        variant="gray"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-monks-black mb-4">Custom API Integrations</h3>
            <p className="text-monks-gray mb-6">
              Our team can build custom integrations with your proprietary systems, legacy software, 
              or specialized industry tools.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Custom API development</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Legacy system connections</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Real-time data synchronization</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Enterprise security standards</span>
              </li>
            </ul>
            <Link
              to="/contact?type=enterprise"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
            >
              Contact Enterprise Team
              <ExternalLink size={16} />
            </Link>
          </div>
          
          <div className="bg-white rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-monks-black mb-4">Integration Support</h3>
            <p className="text-monks-gray mb-6">
              Get help setting up integrations, troubleshooting connections, or optimizing 
              your automation workflows.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Setup assistance</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Troubleshooting support</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Workflow optimization</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Best practices guidance</span>
              </li>
            </ul>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300"
            >
              Get Support
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}