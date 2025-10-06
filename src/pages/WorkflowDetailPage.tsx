import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowUpRight, Download, Star, Clock, Users } from "lucide-react";

export default function WorkflowDetailPage() {
  const { slug } = useParams();

  // Mock workflow data - in real app, fetch based on slug
  const workflow = {
    name: "Lead Qualification Pipeline",
    description: "Automatically qualify and route leads based on custom criteria with intelligent scoring and assignment.",
    category: "Sales",
    difficulty: "Intermediate",
    runtime: "~5 minutes",
    downloads: "1,240",
    rating: 4.8,
    reviews: 156,
    tags: ["CRM", "Lead Gen", "Automation", "Salesforce"],
    pricing: "Free",
    lastUpdated: "2024-12-10",
    steps: [
      "Lead data captured from form submission",
      "Enrichment with company and contact data",
      "Scoring based on ICP criteria",
      "Territory and rep assignment",
      "Automated notification and task creation"
    ],
    envVars: [
      { name: "SALESFORCE_API_KEY", description: "Your Salesforce API key", required: true },
      { name: "SLACK_WEBHOOK_URL", description: "Slack webhook for notifications", required: false },
      { name: "SCORING_THRESHOLD", description: "Minimum score for qualified leads", required: true, default: "75" }
    ],
    integrations: ["Salesforce", "HubSpot", "Slack", "Zapier"],
    patchNotes: [
      { version: "1.2.0", date: "2024-12-10", changes: ["Added Slack integration", "Improved scoring algorithm"] },
      { version: "1.1.0", date: "2024-11-28", changes: ["Territory assignment logic", "Bug fixes"] },
      { version: "1.0.0", date: "2024-11-15", changes: ["Initial release"] }
    ]
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-sm font-medium">
                  {workflow.category}
                </span>
                <span className="px-3 py-1 bg-monks-gray/10 text-monks-gray rounded-full text-sm">
                  {workflow.difficulty}
                </span>
              </div>
              
              <h1 className="text-display font-bold text-monks-black">
                {workflow.name}
              </h1>
              
              <p className="text-xl text-monks-gray leading-relaxed">
                {workflow.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-monks-gray">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={16} />
                  <span>{workflow.rating} ({workflow.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download size={16} />
                  <span>{workflow.downloads} downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{workflow.runtime}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-monks-light-gray rounded-3xl p-8 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-monks-black mb-2">{workflow.pricing}</div>
                <p className="text-monks-gray">One-click deploy</p>
              </div>
              
              <button className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                Deploy Workflow
              </button>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-monks-gray">Last updated:</span>
                  <span className="text-monks-black">{workflow.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-monks-gray">Runtime:</span>
                  <span className="text-monks-black">{workflow.runtime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Steps */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">Workflow Steps</h2>
                <div className="space-y-4">
                  {workflow.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-monks-gray pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Environment Variables */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">Environment Variables</h2>
                <div className="space-y-4">
                  {workflow.envVars.map((envVar, i) => (
                    <div key={i} className="bg-monks-light-gray rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <code className="font-mono text-sm bg-white px-2 py-1 rounded">
                          {envVar.name}
                        </code>
                        {envVar.required && (
                          <span className="text-red-500 text-xs">Required</span>
                        )}
                      </div>
                      <p className="text-monks-gray text-sm">{envVar.description}</p>
                      {envVar.default && (
                        <p className="text-monks-gray text-xs mt-1">Default: {envVar.default}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Patch Notes */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">Patch Notes</h2>
                <div className="space-y-4">
                  {workflow.patchNotes.map((patch, i) => (
                    <div key={i} className="border-l-4 border-monks-accent pl-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-monks-black">v{patch.version}</span>
                        <span className="text-monks-gray text-sm">{patch.date}</span>
                      </div>
                      <ul className="space-y-1">
                        {patch.changes.map((change, j) => (
                          <li key={j} className="text-monks-gray text-sm">• {change}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tags */}
              <div>
                <h3 className="font-semibold text-monks-black mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {workflow.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-monks-gray/10 text-monks-gray rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div>
                <h3 className="font-semibold text-monks-black mb-3">Integrations</h3>
                <div className="space-y-2">
                  {workflow.integrations.map((integration, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-monks-light-gray rounded-lg">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold">{integration[0]}</span>
                      </div>
                      <span className="text-monks-black text-sm">{integration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related */}
              <div>
                <h3 className="font-semibold text-monks-black mb-3">Related Workflows</h3>
                <div className="space-y-3">
                  <Link to="/workflows/customer-onboarding" className="block p-3 bg-monks-light-gray rounded-lg hover:bg-monks-gray/10 transition-colors">
                    <h4 className="font-medium text-monks-black text-sm">Customer Onboarding Flow</h4>
                    <p className="text-monks-gray text-xs">Success • 890 downloads</p>
                  </Link>
                  <Link to="/workflows/support-triage" className="block p-3 bg-monks-light-gray rounded-lg hover:bg-monks-gray/10 transition-colors">
                    <h4 className="font-medium text-monks-black text-sm">Support Ticket Triage</h4>
                    <p className="text-monks-gray text-xs">Support • 1.1k downloads</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}