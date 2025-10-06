import React, { useState } from "react";
import { Code, Key, Book, ExternalLink, Copy, CheckCircle, Terminal, Zap } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ContentSection } from "../components/ui/ContentSection";
import { CodeBlock } from "../components/ui/CodeBlock";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs";
import { FeatureGrid } from "../components/ui/FeatureGrid";

const apiFeatures = [
  {
    title: "RESTful API",
    description: "Clean, intuitive REST API with comprehensive endpoints for all platform features",
    icon: Code,
    features: ["REST architecture", "JSON responses", "HTTP status codes", "Rate limiting"]
  },
  {
    title: "Webhooks",
    description: "Real-time notifications for workflow events, agent activities, and system updates",
    icon: Zap,
    features: ["Event notifications", "Retry logic", "Signature verification", "Custom payloads"]
  },
  {
    title: "SDKs & Libraries",
    description: "Official SDKs for popular programming languages with comprehensive documentation",
    icon: Book,
    features: ["JavaScript/Node.js", "Python", "Go", "PHP"]
  },
  {
    title: "Authentication",
    description: "Secure API access with multiple authentication methods and fine-grained permissions",
    icon: Key,
    features: ["API keys", "OAuth 2.0", "JWT tokens", "Role-based access"]
  }
];

const codeExamples = {
  workflows: `// List all workflows
const response = await fetch('https://api.findawise.com/v1/workflows', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const workflows = await response.json();
console.log(workflows);

// Deploy a workflow
const deployment = await fetch('https://api.findawise.com/v1/workflows/deploy', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    workflow_id: 'wf_123',
    environment: 'production',
    config: {
      SLACK_WEBHOOK_URL: 'https://hooks.slack.com/...',
      SALESFORCE_API_KEY: 'your_sf_key'
    }
  })
});`,

  agents: `// Create an AI agent
const agent = await fetch('https://api.findawise.com/v1/agents', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Customer Support Agent',
    type: 'support',
    config: {
      knowledge_base_id: 'kb_456',
      escalation_threshold: 0.8,
      response_tone: 'professional'
    }
  })
});

// Get agent conversations
const conversations = await fetch('https://api.findawise.com/v1/agents/ag_789/conversations', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});`,

  webhooks: `// Webhook endpoint example (Node.js/Express)
app.post('/webhooks/findawise', (req, res) => {
  const signature = req.headers['x-findawise-signature'];
  const payload = JSON.stringify(req.body);
  
  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  if (signature !== expectedSignature) {
    return res.status(401).send('Unauthorized');
  }
  
  const { event, data } = req.body;
  
  switch (event) {
    case 'workflow.completed':
      console.log('Workflow completed:', data.workflow_id);
      break;
    case 'agent.message':
      console.log('Agent message:', data.message);
      break;
    default:
      console.log('Unknown event:', event);
  }
  
  res.status(200).send('OK');
});`,

  python: `import requests
import json

# Initialize the API client
class FindawiseAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://api.findawise.com/v1'
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def list_workflows(self):
        response = requests.get(f'{self.base_url}/workflows', headers=self.headers)
        return response.json()
    
    def deploy_workflow(self, workflow_id, config):
        payload = {
            'workflow_id': workflow_id,
            'environment': 'production',
            'config': config
        }
        response = requests.post(
            f'{self.base_url}/workflows/deploy',
            headers=self.headers,
            data=json.dumps(payload)
        )
        return response.json()

# Usage
api = FindawiseAPI('your_api_key_here')
workflows = api.list_workflows()
print(f"Found {len(workflows['data'])} workflows")`
};

const endpoints = [
  {
    method: "GET",
    path: "/workflows",
    description: "List all workflows",
    response: "Array of workflow objects"
  },
  {
    method: "POST", 
    path: "/workflows/deploy",
    description: "Deploy a workflow",
    response: "Deployment status and details"
  },
  {
    method: "GET",
    path: "/agents",
    description: "List all AI agents",
    response: "Array of agent objects"
  },
  {
    method: "POST",
    path: "/agents",
    description: "Create a new AI agent",
    response: "Created agent object"
  },
  {
    method: "GET",
    path: "/assets",
    description: "List digital assets",
    response: "Array of asset objects"
  },
  {
    method: "POST",
    path: "/webhooks",
    description: "Create webhook endpoint",
    response: "Webhook configuration"
  }
];

export default function APIPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="API Documentation"
        description="Integrate Findawise into your applications with our comprehensive REST API, webhooks, and SDKs."
        variant="dark"
      />

      <ContentSection
        title="API Features"
        description="Everything you need to build powerful integrations with the Findawise platform."
        variant="default"
      >
        <FeatureGrid features={apiFeatures} columns={2} />
      </ContentSection>

      <ContentSection
        title="Quick Start"
        description="Get started with the Findawise API in minutes with our comprehensive examples."
        variant="gray"
      >
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="workflows">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="workflows">Workflows</TabsTrigger>
              <TabsTrigger value="agents">AI Agents</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="python">Python SDK</TabsTrigger>
            </TabsList>

            <TabsContent value="workflows">
              <CodeBlock
                code={codeExamples.workflows}
                language="javascript"
                title="Workflow Management"
              />
            </TabsContent>

            <TabsContent value="agents">
              <CodeBlock
                code={codeExamples.agents}
                language="javascript"
                title="AI Agent Operations"
              />
            </TabsContent>

            <TabsContent value="webhooks">
              <CodeBlock
                code={codeExamples.webhooks}
                language="javascript"
                title="Webhook Handler"
              />
            </TabsContent>

            <TabsContent value="python">
              <CodeBlock
                code={codeExamples.python}
                language="python"
                title="Python SDK Usage"
              />
            </TabsContent>
          </Tabs>
        </div>
      </ContentSection>

      <ContentSection
        title="API Reference"
        description="Complete reference for all available endpoints and their parameters."
        variant="default"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-monks-gray/10 overflow-hidden">
            <div className="p-6 bg-monks-light-gray border-b border-monks-gray/10">
              <h3 className="text-xl font-bold text-monks-black">Base URL</h3>
              <code className="text-monks-accent">https://api.findawise.com/v1</code>
            </div>
            
            <div className="divide-y divide-monks-gray/10">
              {endpoints.map((endpoint, i) => (
                <div key={i} className="p-6 hover:bg-monks-light-gray/50 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                        endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-monks-black font-mono">{endpoint.path}</code>
                    </div>
                    <button className="text-monks-gray hover:text-monks-black transition-colors duration-300">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                  <p className="text-monks-gray text-sm mb-1">{endpoint.description}</p>
                  <p className="text-monks-gray text-xs">Returns: {endpoint.response}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Authentication"
        description="Secure your API requests with proper authentication methods."
        variant="gray"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-4">API Keys</h3>
              <p className="text-monks-gray mb-6">
                Use API keys for server-to-server authentication. Include your API key in the Authorization header.
              </p>
              <CodeBlock
                code={`curl -X GET "https://api.findawise.com/v1/workflows" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                language="bash"
                title="API Key Authentication"
              />
            </div>
            
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-4">Rate Limits</h3>
              <p className="text-monks-gray mb-6">
                API requests are limited to ensure fair usage and optimal performance for all users.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-monks-gray">Standard:</span>
                  <span className="text-monks-black">1,000 requests/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-monks-gray">Professional:</span>
                  <span className="text-monks-black">5,000 requests/hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-monks-gray">Enterprise:</span>
                  <span className="text-monks-black">Custom limits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Get Started"
        description="Ready to start building with the Findawise API? Get your API key and start integrating today."
        variant="default"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-monks-light-gray rounded-3xl p-8">
            <Terminal size={48} className="text-monks-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-monks-black mb-4">Start Building</h3>
            <p className="text-monks-gray mb-6">
              Get your API key from the dashboard and start integrating Findawise into your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                Get API Key
              </button>
              <button className="flex-1 border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
                View Full Docs
              </button>
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}