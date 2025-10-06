import React from "react";
import { Search, ArrowUpRight, Star, TrendingUp } from "lucide-react";

const comparisons = [
  {
    title: "HubSpot vs Salesforce",
    category: "CRM",
    description: "Compare features, pricing, and use cases for these leading CRM platforms",
    winner: "Depends on size",
    pros: {
      hubspot: ["Better for SMBs", "Easier to use", "Free tier available"],
      salesforce: ["More customizable", "Better for enterprise", "Advanced features"]
    },
    pricing: {
      hubspot: "Free - $1,200/mo",
      salesforce: "$25 - $300/user/mo"
    },
    rating: 4.8,
    views: "12.5k"
  },
  {
    title: "Slack vs Microsoft Teams",
    category: "Communication",
    description: "Team communication platform comparison for modern workplaces",
    winner: "Teams for Office users",
    pros: {
      slack: ["Better UX", "More integrations", "Superior search"],
      teams: ["Office integration", "Better video calls", "Lower cost"]
    },
    pricing: {
      slack: "$6.67 - $12.50/user/mo",
      teams: "$4 - $22/user/mo"
    },
    rating: 4.7,
    views: "8.9k"
  },
  {
    title: "Shopify vs WooCommerce",
    category: "E-commerce",
    description: "E-commerce platform comparison for online stores",
    winner: "Shopify for beginners",
    pros: {
      shopify: ["Hosted solution", "Easy setup", "Great support"],
      woocommerce: ["More flexible", "Lower costs", "WordPress integration"]
    },
    pricing: {
      shopify: "$29 - $299/mo",
      woocommerce: "Free + hosting costs"
    },
    rating: 4.9,
    views: "15.2k"
  },
  {
    title: "Asana vs Monday.com",
    category: "Project Management",
    description: "Project management tool comparison for team productivity",
    winner: "Asana for simplicity",
    pros: {
      asana: ["Cleaner interface", "Better free plan", "Task dependencies"],
      monday: ["More visual", "Better automation", "Custom workflows"]
    },
    pricing: {
      asana: "Free - $24.99/user/mo",
      monday: "$8 - $16/user/mo"
    },
    rating: 4.6,
    views: "7.3k"
  },
  {
    title: "Mailchimp vs ConvertKit",
    category: "Email Marketing",
    description: "Email marketing platform comparison for creators and businesses",
    winner: "ConvertKit for creators",
    pros: {
      mailchimp: ["More templates", "Better analytics", "Broader features"],
      convertkit: ["Creator-focused", "Better automation", "Simpler pricing"]
    },
    pricing: {
      mailchimp: "Free - $350/mo",
      convertkit: "$29 - $79/mo"
    },
    rating: 4.5,
    views: "6.1k"
  },
  {
    title: "Zoom vs Google Meet",
    category: "Video Conferencing",
    description: "Video conferencing platform comparison for remote teams",
    winner: "Zoom for features",
    pros: {
      zoom: ["Better quality", "More features", "Breakout rooms"],
      meet: ["Google integration", "Simpler", "No time limits"]
    },
    pricing: {
      zoom: "Free - $19.99/user/mo",
      meet: "Free with Google Workspace"
    },
    rating: 4.4,
    views: "9.8k"
  }
];

const categories = ["All", "CRM", "Communication", "E-commerce", "Project Management", "Email Marketing", "Video Conferencing"];

export default function DecisionComparisonsPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Tool Comparisons</h1>
            <p className="text-xl text-white/80">
              Side-by-side comparisons of popular business tools to help you make the right choice.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-4 text-white/60" size={20} />
                <input
                  type="text"
                  placeholder="Search comparisons..."
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

      {/* Comparisons Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {comparisons.map((comparison, i) => (
              <div key={i} className="group bg-white rounded-3xl border border-monks-gray/10 p-8 hover:shadow-card transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-sm font-medium">
                      {comparison.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-monks-gray">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-yellow-500" size={14} />
                        {comparison.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={14} />
                        {comparison.views} views
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300 mb-2">
                      {comparison.title}
                    </h3>
                    <p className="text-monks-gray">{comparison.description}</p>
                  </div>
                  
                  <div className="bg-monks-light-gray rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-monks-black">Winner:</span>
                      <span className="text-sm text-monks-accent font-medium">{comparison.winner}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(comparison.pros).map(([tool, pros], j) => (
                      <div key={j} className="space-y-2">
                        <h4 className="font-semibold text-monks-black capitalize">{tool}</h4>
                        <ul className="space-y-1">
                          {pros.map((pro, k) => (
                            <li key={k} className="text-sm text-monks-gray flex items-center gap-2">
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-monks-gray/10">
                    {Object.entries(comparison.pricing).map(([tool, price], j) => (
                      <div key={j} className="text-center">
                        <div className="text-sm text-monks-gray capitalize">{tool}</div>
                        <div className="font-semibold text-monks-black">{price}</div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    Read Full Comparison
                    <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                  </button>
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
            Need a Custom Comparison?
          </h2>
          <p className="text-xl text-monks-gray mb-8">
            Can't find the comparison you need? Let us know what tools you'd like us to compare.
          </p>
          <button className="bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
            Request Comparison
          </button>
        </div>
      </section>
    </div>
  );
}