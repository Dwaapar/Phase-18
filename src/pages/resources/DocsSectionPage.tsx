import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Book, ExternalLink, Search, ChevronRight } from "lucide-react";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { Badge } from "../../components/ui/Badge";
import { Breadcrumb } from "../../components/ui/Breadcrumb";

export default function DocsSectionPage() {
  const { section } = useParams();

  // Mock documentation content
  const docContent = {
    "getting-started": {
      title: "Getting Started",
      description: "Quick start guide to get you up and running with Findawise in minutes",
      content: `
        <h2>Welcome to Findawise</h2>
        <p>This guide will help you get started with the Findawise platform in just a few minutes. Whether you're looking to automate workflows, deploy AI agents, or access our digital assets, this guide covers everything you need to know.</p>
        
        <h3>Prerequisites</h3>
        <p>Before you begin, make sure you have:</p>
        <ul>
          <li>A Findawise account (sign up for free at <a href="/signup">findawise.com/signup</a>)</li>
          <li>Basic understanding of your business processes</li>
          <li>Access to the systems you want to automate (CRM, email, etc.)</li>
          <li>Admin permissions for integrations (if applicable)</li>
        </ul>
        
        <h3>Your First Workflow in 5 Minutes</h3>
        <p>Let's deploy your first workflow in 3 simple steps:</p>
        
        <ol>
          <li><strong>Browse the Workflow Store:</strong> Visit our workflow library at <a href="/workflows">/workflows</a> and find a workflow that matches your needs. Use filters to narrow down by department, complexity, or integration requirements.</li>
          <li><strong>Configure Environment:</strong> Set up the required API keys and environment variables. Our guided setup will walk you through each integration step-by-step.</li>
          <li><strong>Deploy:</strong> Click the deploy button and watch your automation go live. Most workflows are operational within 2-3 minutes.</li>
        </ol>
        
        <h3>Popular First Workflows</h3>
        <p>New users typically start with these workflows:</p>
        <ul>
          <li><strong>Lead Qualification Pipeline:</strong> Automatically score and route leads</li>
          <li><strong>Customer Onboarding Flow:</strong> Streamline new customer setup</li>
          <li><strong>Support Ticket Triage:</strong> Intelligently categorize and route support requests</li>
          <li><strong>Invoice Processing:</strong> Automate invoice handling and approval</li>
        </ul>
        
        <h3>Next Steps</h3>
        <p>Once you've deployed your first workflow:</p>
        <ol>
          <li>Monitor performance in your dashboard</li>
          <li>Explore our AI Agents for more advanced automation</li>
          <li>Join our community for tips and best practices</li>
          <li>Consider booking a consultation for custom solutions</li>
        </ol>
      `,
      codeExample: `// Example: Simple webhook workflow configuration
{
  "name": "Lead Capture Workflow",
  "description": "Capture leads from website forms and route to sales team",
  "trigger": {
    "type": "webhook",
    "endpoint": "/webhooks/leads",
    "method": "POST"
  },
  "steps": [
    {
      "id": "validate_data",
      "action": "data_validation",
      "required_fields": ["email", "name", "company"],
      "validation_rules": {
        "email": "valid_email_format",
        "name": "min_length:2",
        "company": "not_empty"
      }
    },
    {
      "id": "enrich_lead",
      "action": "data_enrichment",
      "provider": "clearbit",
      "fields": ["company_size", "industry", "revenue"],
      "fallback_provider": "zoominfo"
    },
    {
      "id": "score_lead",
      "action": "lead_scoring",
      "criteria": {
        "company_size": {"weight": 0.3, "min_employees": 50},
        "industry": {"weight": 0.2, "target": ["saas", "fintech"]},
        "revenue": {"weight": 0.5, "min_revenue": 1000000}
      }
    },
    {
      "id": "route_lead",
      "action": "conditional_routing",
      "conditions": [
        {"if": "score >= 80", "then": "assign_to_senior_rep"},
        {"if": "score >= 60", "then": "assign_to_junior_rep"},
        {"else": "add_to_nurture_campaign"}
      ]
    },
    {
      "id": "notify_team",
      "action": "notification",
      "channels": ["slack", "email"],
      "template": "new_qualified_lead"
    }
  ],
  "error_handling": {
    "retry_attempts": 3,
    "fallback_action": "manual_review",
    "notification_channels": ["slack"]
  }
}`
    },
    "api-reference": {
      title: "API Reference",
      description: "Complete API documentation for the Findawise platform with examples and best practices",
      content: `
        <h2>Authentication</h2>
        <p>All API requests require authentication using your API key. You can find your API key in your dashboard under Settings > API Keys.</p>
        
        <h3>API Key Authentication</h3>
        <p>Include your API key in the Authorization header of every request:</p>
        
        <h3>Base URL</h3>
        <p>All API requests should be made to: <code>https://api.findawise.com/v1</code></p>
        
        <h3>Rate Limits</h3>
        <p>API requests are limited based on your plan:</p>
        <ul>
          <li><strong>Free Plan:</strong> 1,000 requests per hour</li>
          <li><strong>Professional Plan:</strong> 10,000 requests per hour</li>
          <li><strong>Enterprise Plan:</strong> Custom limits based on agreement</li>
        </ul>
        
        <p>Rate limit information is included in response headers:</p>
        <ul>
          <li><code>X-RateLimit-Limit</code>: Your rate limit ceiling for that given request</li>
          <li><code>X-RateLimit-Remaining</code>: Number of requests left for the time window</li>
          <li><code>X-RateLimit-Reset</code>: UTC epoch seconds when the rate limit resets</li>
        </ul>
        
        <h2>Workflows API</h2>
        <p>Manage your workflows programmatically with full CRUD operations.</p>
        
        <h3>List Workflows</h3>
        <p>Retrieve a paginated list of all your workflows with optional filtering.</p>
        
        <h4>Parameters:</h4>
        <ul>
          <li><code>page</code> (optional): Page number for pagination (default: 1)</li>
          <li><code>per_page</code> (optional): Number of results per page (default: 20, max: 100)</li>
          <li><code>status</code> (optional): Filter by status (active, paused, error)</li>
          <li><code>category</code> (optional): Filter by category (sales, marketing, support, etc.)</li>
        </ul>
        
        <h3>Deploy Workflow</h3>
        <p>Deploy a workflow from the store or create a custom workflow.</p>
        
        <h4>Request Body:</h4>
        <ul>
          <li><code>workflow_id</code> (required): ID of the workflow to deploy</li>
          <li><code>environment</code> (required): Target environment (development, staging, production)</li>
          <li><code>config</code> (required): Environment variables and configuration</li>
          <li><code>name</code> (optional): Custom name for this deployment</li>
        </ul>
      `,
      codeExample: `# List all workflows
curl -X GET "https://api.findawise.com/v1/workflows" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"

# Response
{
  "workflows": [
    {
      "id": "wf_123",
      "name": "Lead Qualification Pipeline",
      "status": "active",
      "category": "sales",
      "created_at": "2024-12-15T10:00:00Z",
      "last_run": "2024-12-15T14:30:00Z",
      "executions": 1247,
      "success_rate": 98.5
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "per_page": 20,
    "total_pages": 1
  }
}

# Deploy a workflow
curl -X POST "https://api.findawise.com/v1/workflows/deploy" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workflow_id": "wf_lead_qualification",
    "environment": "production",
    "name": "My Lead Qualification",
    "config": {
      "SALESFORCE_API_KEY": "your_sf_key",
      "SLACK_WEBHOOK_URL": "https://hooks.slack.com/...",
      "SCORING_THRESHOLD": "75"
    }
  }'

# Response
{
  "deployment_id": "dep_456",
  "status": "deploying",
  "estimated_completion": "2024-12-15T15:05:00Z",
  "webhook_url": "https://api.findawise.com/webhooks/dep_456",
  "dashboard_url": "https://app.findawise.com/workflows/dep_456"
}`
    },
    "workflows": {
      title: "Workflows",
      description: "Learn how to create, customize, and manage automated workflows",
      content: `
        <h2>Understanding Workflows</h2>
        <p>Workflows are the backbone of automation in Findawise. They define a series of steps that execute automatically when triggered by events, schedules, or manual actions.</p>
        
        <h3>Workflow Components</h3>
        <p>Every workflow consists of these key components:</p>
        
        <ul>
          <li><strong>Triggers:</strong> Events that start the workflow (webhooks, schedules, manual)</li>
          <li><strong>Steps:</strong> Individual actions that process data or interact with systems</li>
          <li><strong>Conditions:</strong> Logic that determines which path the workflow takes</li>
          <li><strong>Integrations:</strong> Connections to external systems and APIs</li>
          <li><strong>Error Handling:</strong> How the workflow responds to failures</li>
        </ul>
        
        <h3>Workflow Types</h3>
        <p>Findawise supports several types of workflows:</p>
        
        <h4>Event-Driven Workflows</h4>
        <p>Triggered by external events like form submissions, API calls, or system notifications.</p>
        
        <h4>Scheduled Workflows</h4>
        <p>Run on a schedule (hourly, daily, weekly, or custom cron expressions).</p>
        
        <h4>Manual Workflows</h4>
        <p>Triggered manually by users or other workflows.</p>
        
        <h4>Conditional Workflows</h4>
        <p>Execute different paths based on data conditions or business rules.</p>
        
        <h3>Best Practices</h3>
        <ul>
          <li>Start simple and add complexity gradually</li>
          <li>Include comprehensive error handling</li>
          <li>Use descriptive names and documentation</li>
          <li>Test thoroughly before production deployment</li>
          <li>Monitor performance and optimize regularly</li>
          <li>Implement proper logging for debugging</li>
        </ul>
      `,
      codeExample: `// Advanced workflow with error handling and conditions
{
  "name": "Customer Onboarding Automation",
  "description": "Complete customer onboarding with personalized sequences",
  "trigger": {
    "type": "webhook",
    "endpoint": "/webhooks/new-customer"
  },
  "steps": [
    {
      "id": "validate_customer",
      "action": "data_validation",
      "schema": {
        "email": {"type": "email", "required": true},
        "plan": {"type": "string", "enum": ["starter", "pro", "enterprise"]},
        "company": {"type": "string", "required": true}
      },
      "on_error": "terminate_with_notification"
    },
    {
      "id": "create_accounts",
      "action": "parallel_execution",
      "steps": [
        {
          "action": "create_crm_contact",
          "system": "salesforce",
          "mapping": {
            "Email": "{{email}}",
            "Company": "{{company}}",
            "Lead_Source": "Website"
          }
        },
        {
          "action": "create_support_ticket",
          "system": "zendesk",
          "template": "welcome_onboarding",
          "priority": "normal"
        },
        {
          "action": "provision_account",
          "system": "internal_api",
          "endpoint": "/api/accounts",
          "plan": "{{plan}}"
        }
      ]
    },
    {
      "id": "personalized_sequence",
      "action": "conditional_execution",
      "conditions": [
        {
          "if": "plan == 'enterprise'",
          "then": {
            "action": "trigger_workflow",
            "workflow_id": "enterprise_onboarding",
            "data": "{{customer_data}}"
          }
        },
        {
          "if": "plan == 'pro'",
          "then": {
            "action": "send_email_sequence",
            "template": "pro_onboarding_sequence",
            "schedule": ["immediate", "+1day", "+3days", "+7days"]
          }
        },
        {
          "else": {
            "action": "send_email_sequence",
            "template": "starter_onboarding_sequence",
            "schedule": ["immediate", "+2days", "+7days"]
          }
        }
      ]
    }
  ],
  "error_handling": {
    "global_retry": {
      "attempts": 3,
      "backoff": "exponential",
      "max_delay": "5m"
    },
    "notifications": {
      "on_failure": ["slack://ops-alerts", "email://ops@company.com"],
      "on_success": ["slack://sales-notifications"]
    }
  },
  "monitoring": {
    "metrics": ["execution_time", "success_rate", "error_rate"],
    "alerts": [
      {"condition": "error_rate > 5%", "action": "notify_ops"},
      {"condition": "execution_time > 30s", "action": "performance_alert"}
    ]
  }
}`
    },
    "agents": {
      title: "AI Agents",
      description: "Build, deploy, and manage intelligent AI agents that act autonomously",
      content: `
        <h2>Understanding AI Agents</h2>
        <p>AI Agents in Findawise are autonomous software entities that can perceive their environment, make decisions, and take actions to achieve specific goals. Unlike traditional chatbots, our agents can:</p>
        
        <ul>
          <li>Understand context and maintain conversation state</li>
          <li>Access external systems and APIs</li>
          <li>Make decisions based on business rules</li>
          <li>Learn from interactions and improve over time</li>
          <li>Escalate to humans when appropriate</li>
        </ul>
        
        <h3>Agent Types</h3>
        
        <h4>SDR (Sales Development Representative) Agents</h4>
        <p>Automate lead qualification, outreach, and meeting booking:</p>
        <ul>
          <li>Lead research and qualification</li>
          <li>Personalized email sequences</li>
          <li>Meeting scheduling and calendar management</li>
          <li>CRM updates and activity logging</li>
        </ul>
        
        <h4>Support Agents</h4>
        <p>Handle customer inquiries and support tickets 24/7:</p>
        <ul>
          <li>Instant response to common questions</li>
          <li>Ticket routing and prioritization</li>
          <li>Knowledge base integration</li>
          <li>Escalation to human agents</li>
        </ul>
        
        <h4>Operations Agents</h4>
        <p>Automate business processes and operational tasks:</p>
        <ul>
          <li>Process monitoring and alerts</li>
          <li>Data processing and transformation</li>
          <li>System integration and synchronization</li>
          <li>Report generation and distribution</li>
        </ul>
        
        <h3>Agent Configuration</h3>
        <p>Agents are configured using YAML files that define their behavior, integrations, and capabilities.</p>
        
        <h3>Deployment Options</h3>
        <p>Choose between managed hosting (we handle everything) or self-hosted deployment (you control the infrastructure).</p>
      `,
      codeExample: `# AI Agent Configuration Example
agent:
  name: "Customer Support Agent"
  type: "support"
  description: "Handles customer inquiries and support tickets"
  
  # Core Configuration
  model:
    provider: "openai"
    model: "gpt-4"
    temperature: 0.7
    max_tokens: 500
  
  # Behavior Settings
  behavior:
    response_tone: "professional_friendly"
    escalation_threshold: 0.8
    max_conversation_length: 50
    greeting_message: "Hi! I'm here to help with any questions you have."
    
  # Knowledge Base
  knowledge_base:
    sources:
      - type: "url"
        url: "https://docs.yourcompany.com"
        crawl_depth: 3
      - type: "file"
        path: "./knowledge/faq.md"
      - type: "api"
        endpoint: "https://api.yourcompany.com/kb"
    
    update_frequency: "daily"
    
  # Integrations
  integrations:
    slack:
      webhook_url: "\${SLACK_WEBHOOK_URL}"
      channel: "#support"
      escalation_channel: "#support-escalation"
    
    zendesk:
      api_token: "\${ZENDESK_API_TOKEN}"
      subdomain: "yourcompany"
      auto_create_tickets: true
      
    crm:
      provider: "salesforce"
      api_key: "\${SALESFORCE_API_KEY}"
      update_contact_activity: true
    
  # Security & Compliance
  security:
    rate_limiting:
      requests_per_minute: 60
      burst_limit: 10
    
    allowed_origins:
      - "https://yourcompany.com"
      - "https://app.yourcompany.com"
      
    data_retention:
      conversation_history: "90_days"
      analytics_data: "2_years"
      
  # Monitoring & Analytics
  monitoring:
    metrics:
      - "response_time"
      - "resolution_rate"
      - "escalation_rate"
      - "customer_satisfaction"
    
    alerts:
      - condition: "escalation_rate > 20%"
        action: "notify_team"
      - condition: "response_time > 5s"
        action: "performance_alert"`
    }
  };

  const currentDoc = docContent[section as keyof typeof docContent];

  if (!currentDoc) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-monks-black mb-4">Documentation Not Found</h1>
          <p className="text-monks-gray mb-6">The requested documentation section could not be found.</p>
          <Link
            to="/docs"
            className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
          >
            Back to Documentation
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Documentation", href: "/docs" },
    { label: currentDoc.title }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          
          <div className="space-y-4">
            <h1 className="text-display font-bold text-monks-black">
              {currentDoc.title}
            </h1>
            <p className="text-xl text-monks-gray leading-relaxed">
              {currentDoc.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-monks-gray/10 p-8">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-monks-black prose-p:text-monks-gray prose-li:text-monks-gray prose-strong:text-monks-black prose-code:text-monks-accent prose-code:bg-monks-light-gray prose-code:px-2 prose-code:py-1 prose-code:rounded prose-a:text-monks-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-monks-accent prose-blockquote:bg-monks-light-gray prose-blockquote:p-6 prose-blockquote:rounded-r-2xl"
                  dangerouslySetInnerHTML={{ __html: currentDoc.content }}
                />
                
                {currentDoc.codeExample && (
                  <div className="mt-12">
                    <h3 className="text-xl font-bold text-monks-black mb-6">Code Example</h3>
                    <CodeBlock
                      code={currentDoc.codeExample}
                      language={section === 'api-reference' ? 'bash' : section === 'agents' ? 'yaml' : 'javascript'}
                      title={
                        section === 'api-reference' ? 'API Request Examples' : 
                        section === 'agents' ? 'Agent Configuration' :
                        'Workflow Configuration'
                      }
                    />
                  </div>
                )}
                
                {/* Navigation */}
                <div className="mt-12 pt-8 border-t border-monks-gray/10">
                  <div className="flex items-center justify-between">
                    <div>
                      {section !== 'getting-started' && (
                        <Link
                          to="/docs/getting-started"
                          className="flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
                        >
                          <ArrowLeft size={16} />
                          Previous: Getting Started
                        </Link>
                      )}
                    </div>
                    <div>
                      {section === 'getting-started' && (
                        <Link
                          to="/docs/api-reference"
                          className="flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
                        >
                          Next: API Reference
                          <ChevronRight size={16} />
                        </Link>
                      )}
                      {section === 'api-reference' && (
                        <Link
                          to="/docs/workflows"
                          className="flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
                        >
                          Next: Workflows
                          <ChevronRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Navigation */}
              <div className="bg-monks-light-gray rounded-2xl p-6 sticky top-24">
                <h3 className="font-semibold text-monks-black mb-4">Documentation</h3>
                <nav className="space-y-2">
                  <Link
                    to="/docs/getting-started"
                    className={`block p-3 rounded-lg transition-colors duration-300 ${
                      section === 'getting-started' 
                        ? 'bg-monks-accent text-white' 
                        : 'text-monks-gray hover:text-monks-black hover:bg-white'
                    }`}
                  >
                    Getting Started
                  </Link>
                  <Link
                    to="/docs/api-reference"
                    className={`block p-3 rounded-lg transition-colors duration-300 ${
                      section === 'api-reference' 
                        ? 'bg-monks-accent text-white' 
                        : 'text-monks-gray hover:text-monks-black hover:bg-white'
                    }`}
                  >
                    API Reference
                  </Link>
                  <Link
                    to="/docs/workflows"
                    className={`block p-3 rounded-lg transition-colors duration-300 ${
                      section === 'workflows' 
                        ? 'bg-monks-accent text-white' 
                        : 'text-monks-gray hover:text-monks-black hover:bg-white'
                    }`}
                  >
                    Workflows
                  </Link>
                  <Link
                    to="/docs/agents"
                    className={`block p-3 rounded-lg transition-colors duration-300 ${
                      section === 'agents' 
                        ? 'bg-monks-accent text-white' 
                        : 'text-monks-gray hover:text-monks-black hover:bg-white'
                    }`}
                  >
                    AI Agents
                  </Link>
                  <Link
                    to="/docs/integrations"
                    className="block p-3 rounded-lg text-monks-gray hover:text-monks-black hover:bg-white transition-colors duration-300"
                  >
                    Integrations
                  </Link>
                  <Link
                    to="/docs/security"
                    className="block p-3 rounded-lg text-monks-gray hover:text-monks-black hover:bg-white transition-colors duration-300"
                  >
                    Security
                  </Link>
                </nav>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <a
                    href="https://github.com/findawise/examples"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
                  >
                    <ExternalLink size={14} />
                    <span className="text-sm">Code Examples</span>
                  </a>
                  <Link
                    to="/support"
                    className="flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
                  >
                    <Book size={14} />
                    <span className="text-sm">Get Support</span>
                  </Link>
                  <Link
                    to="/changelog"
                    className="flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
                  >
                    <Book size={14} />
                    <span className="text-sm">Changelog</span>
                  </Link>
                  <Link
                    to="/api"
                    className="flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
                  >
                    <ExternalLink size={14} />
                    <span className="text-sm">API Playground</span>
                  </Link>
                </div>
              </div>

              {/* Search */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Search Docs</h3>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-3 text-monks-gray" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-monks-accent/5 rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Was this helpful?</h3>
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 bg-green-100 text-green-800 px-3 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors duration-300">
                    👍 Yes
                  </button>
                  <button className="flex-1 bg-red-100 text-red-800 px-3 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors duration-300">
                    👎 No
                  </button>
                </div>
                <p className="text-xs text-monks-gray">
                  Help us improve our documentation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}