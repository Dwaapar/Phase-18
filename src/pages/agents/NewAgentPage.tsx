import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, Zap, MessageSquare, Settings, ArrowUpRight, CheckCircle } from "lucide-react";
import { FormWizard } from "../../components/ui/FormWizard";
import { Badge } from "../../components/ui/Badge";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

const agentTypes = [
  {
    id: "sdr",
    name: "SDR Agent",
    description: "Automated sales development and lead qualification",
    icon: Zap,
    capabilities: ["Lead outreach", "Email sequences", "Meeting booking", "CRM integration"],
    pricing: "$299/month",
    setupTime: "< 5 minutes",
    popular: true
  },
  {
    id: "support",
    name: "Support Agent", 
    description: "24/7 customer support with intelligent escalation",
    icon: MessageSquare,
    capabilities: ["Instant responses", "Ticket routing", "Knowledge base", "Escalation workflows"],
    pricing: "$199/month",
    setupTime: "< 5 minutes",
    popular: false
  },
  {
    id: "operations",
    name: "Operations Agent",
    description: "Process automation and workflow management",
    icon: Settings,
    capabilities: ["Task automation", "Process monitoring", "Alert management", "Reporting"],
    pricing: "$399/month", 
    setupTime: "< 10 minutes",
    popular: false
  }
];

const integrationOptions = [
  { id: "salesforce", name: "Salesforce", category: "CRM" },
  { id: "hubspot", name: "HubSpot", category: "CRM" },
  { id: "slack", name: "Slack", category: "Communication" },
  { id: "teams", name: "Microsoft Teams", category: "Communication" },
  { id: "zendesk", name: "Zendesk", category: "Support" },
  { id: "intercom", name: "Intercom", category: "Support" },
  { id: "gmail", name: "Gmail", category: "Email" },
  { id: "outlook", name: "Outlook", category: "Email" }
];

export default function NewAgentPage() {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [isDeploying, setIsDeploying] = useState(false);
  const { addToast } = useToast();

  const wizardSteps = [
    {
      id: "select-type",
      title: "Choose Agent Type",
      description: "Select the type of AI agent that best fits your needs",
      content: (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {agentTypes.map((agent) => {
              const Icon = agent.icon;
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`relative p-8 rounded-3xl border-2 transition-all duration-300 text-left ${
                    selectedAgent === agent.id
                      ? "border-monks-accent bg-monks-accent/5"
                      : "border-monks-gray/20 hover:border-monks-accent/50"
                  }`}
                >
                  {agent.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge variant="accent">Most Popular</Badge>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-monks-black">{agent.name}</h3>
                      <p className="text-monks-gray">{agent.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-monks-gray">Capabilities:</div>
                      <ul className="space-y-1">
                        {agent.capabilities.slice(0, 3).map((capability, i) => (
                          <li key={i} className="text-sm text-monks-gray flex items-center gap-2">
                            <div className="w-1 h-1 bg-monks-accent rounded-full"></div>
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t border-monks-gray/10">
                      <div className="flex justify-between text-sm">
                        <span className="text-monks-gray">Pricing:</span>
                        <span className="text-monks-black font-medium">{agent.pricing}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-monks-gray">Setup:</span>
                        <span className="text-monks-accent">{agent.setupTime}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ),
      validation: () => selectedAgent !== ""
    },
    {
      id: "configure",
      title: "Configure Agent",
      description: "Set up your agent's behavior and integrations",
      content: (
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-monks-black mb-2">Agent Name</label>
            <input
              type="text"
              placeholder="e.g., Sales Development Agent"
              className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-monks-black mb-4">Select Integrations</label>
            <div className="grid gap-4 md:grid-cols-2">
              {integrationOptions.map((integration) => (
                <label key={integration.id} className="flex items-center gap-3 p-4 bg-monks-light-gray rounded-2xl cursor-pointer hover:bg-monks-gray/10 transition-colors duration-300">
                  <input
                    type="checkbox"
                    className="rounded border-monks-gray/30 text-monks-accent focus:ring-monks-accent"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-monks-black">{integration.name}</div>
                    <div className="text-sm text-monks-gray">{integration.category}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-monks-black mb-2">Agent Personality</label>
            <select className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent">
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
            </select>
          </div>
        </div>
      ),
      validation: () => true
    },
    {
      id: "deploy",
      title: "Deploy Agent",
      description: "Review settings and deploy your AI agent",
      content: (
        <div className="space-y-8">
          <div className="bg-monks-light-gray rounded-2xl p-6">
            <h3 className="text-xl font-bold text-monks-black mb-4">Deployment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-monks-gray">Agent Type:</span>
                <span className="text-monks-black font-medium">
                  {agentTypes.find(a => a.id === selectedAgent)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-monks-gray">Deployment:</span>
                <span className="text-monks-black font-medium">Managed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-monks-gray">Monthly Cost:</span>
                <span className="text-monks-accent font-medium">
                  {agentTypes.find(a => a.id === selectedAgent)?.pricing}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={async () => {
                setIsDeploying(true);
                try {
                  await new Promise(resolve => setTimeout(resolve, 3000));
                  addToast({
                    type: 'success',
                    title: 'Agent deployed successfully!',
                    description: 'Your AI agent is now live and ready to start working.'
                  });
                } catch (error) {
                  addToast({
                    type: 'error',
                    title: 'Deployment failed',
                    description: 'Please try again or contact support.'
                  });
                } finally {
                  setIsDeploying(false);
                }
              }}
              disabled={isDeploying}
              className="bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              {isDeploying ? (
                <>
                  <LoadingSpinner size="sm" />
                  Deploying Agent...
                </>
              ) : (
                <>
                  <Bot size={16} />
                  Deploy Agent
                </>
              )}
            </button>
          </div>
        </div>
      ),
      validation: () => true
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <Link
          to="/agents"
          className="inline-flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={16} />
          Back to AI Agents
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-monks-black mb-6">Deploy New AI Agent</h1>
          <p className="text-xl text-monks-gray max-w-3xl mx-auto">
            Choose, configure, and deploy your AI agent in minutes. No technical expertise required.
          </p>
        </div>

        <FormWizard
          steps={wizardSteps}
          onComplete={(data) => {
            console.log("Agent deployment data:", data);
            // Handle successful deployment
          }}
        />
      </div>
    </div>
  );
}