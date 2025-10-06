import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Server, Code, Shield, Settings, Download, Terminal, GitBranch, Database } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";
import { FeatureGrid } from "../../components/ui/FeatureGrid";
import { CodeBlock } from "../../components/ui/CodeBlock";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs";

const selfHostFeatures = [
  {
    title: "Complete Control",
    description: "Full control over your AI agents, data, and infrastructure with customizable deployment options",
    icon: Settings,
    features: ["Custom configurations", "Data sovereignty", "Infrastructure control", "Security policies"]
  },
  {
    title: "Open Source Foundation",
    description: "Built on open-source technologies with full source code access and modification rights",
    icon: Code,
    features: ["Source code access", "Custom modifications", "Community contributions", "Transparent development"]
  },
  {
    title: "Enterprise Security",
    description: "Deploy within your security perimeter with your own encryption keys and access controls",
    icon: Shield,
    features: ["Private deployment", "Custom encryption", "Network isolation", "Compliance controls"]
  },
  {
    title: "Scalable Architecture",
    description: "Horizontally scalable architecture that grows with your needs and infrastructure",
    icon: Server,
    features: ["Auto-scaling", "Load balancing", "Multi-region deployment", "High availability"]
  },
  {
    title: "Advanced Customization",
    description: "Deep customization capabilities for specialized use cases and industry requirements",
    icon: GitBranch,
    features: ["Custom models", "Workflow modifications", "Integration flexibility", "API extensions"]
  },
  {
    title: "Data Privacy",
    description: "Keep all data within your infrastructure with no external dependencies or data sharing",
    icon: Database,
    features: ["Data residency", "Private processing", "No external calls", "Audit compliance"]
  }
];

const deploymentOptions = [
  {
    title: "Docker Deployment",
    description: "Quick deployment using Docker containers",
    complexity: "Beginner",
    timeToSetup: "30 minutes"
  },
  {
    title: "Kubernetes Cluster",
    description: "Production-ready Kubernetes deployment",
    complexity: "Intermediate", 
    timeToSetup: "2-4 hours"
  },
  {
    title: "Cloud Native",
    description: "AWS/GCP/Azure native deployment",
    complexity: "Advanced",
    timeToSetup: "4-8 hours"
  },
  {
    title: "On-Premises",
    description: "Complete on-premises deployment",
    complexity: "Expert",
    timeToSetup: "1-2 days"
  }
];

const dockerCode = `# Quick Docker deployment
version: '3.8'
services:
  findawise-agent:
    image: findawise/agent:latest
    environment:
      - AGENT_TYPE=sdr
      - API_KEY=your_api_key
      - DATABASE_URL=postgresql://user:pass@db:5432/agents
    ports:
      - "8080:8080"
    depends_on:
      - database
      - redis
    
  database:
    image: postgres:15
    environment:
      POSTGRES_DB: agents
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      
  redis:
    image: redis:7-alpine
    
volumes:
  postgres_data:`;

const kubernetesCode = `# Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: findawise-agent
spec:
  replicas: 3
  selector:
    matchLabels:
      app: findawise-agent
  template:
    metadata:
      labels:
        app: findawise-agent
    spec:
      containers:
      - name: agent
        image: findawise/agent:latest
        env:
        - name: AGENT_TYPE
          value: "sdr"
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: agent-secrets
              key: database-url
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"`;

const configCode = `# Agent configuration
{
  "agent": {
    "type": "sdr",
    "name": "Sales Development Agent",
    "model": {
      "provider": "openai",
      "model": "gpt-4",
      "temperature": 0.7,
      "max_tokens": 1000
    },
    "capabilities": [
      "lead_qualification",
      "email_outreach", 
      "meeting_scheduling",
      "crm_updates"
    ],
    "integrations": {
      "crm": {
        "provider": "salesforce",
        "api_key": "YOUR_SALESFORCE_API_KEY",
        "instance_url": "YOUR_SALESFORCE_URL"
      },
      "calendar": {
        "provider": "google",
        "credentials": "YOUR_GOOGLE_CALENDAR_CREDS"
      }
    },
    "guardrails": {
      "max_emails_per_day": 50,
      "response_time_limit": 30,
      "escalation_keywords": ["angry", "frustrated", "cancel"]
    }
  }
}`;

const requirements = [
  {
    category: "Minimum Requirements",
    specs: [
      "4 CPU cores",
      "8 GB RAM", 
      "50 GB storage",
      "Docker or Kubernetes"
    ]
  },
  {
    category: "Recommended",
    specs: [
      "8 CPU cores",
      "16 GB RAM",
      "100 GB SSD storage",
      "Load balancer"
    ]
  },
  {
    category: "Enterprise",
    specs: [
      "16+ CPU cores",
      "32+ GB RAM",
      "500+ GB storage",
      "High availability setup"
    ]
  }
];

export default function SelfHostAgentsPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Self-Hosted AI Agents"
        description="Deploy AI agents on your own infrastructure with complete control, customization, and data sovereignty."
        variant="dark"
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Server size={16} className="text-green-400" />
            <span>Your Infrastructure</span>
          </div>
          <div className="flex items-center gap-2">
            <Code size={16} className="text-green-400" />
            <span>Full Source Access</span>
          </div>
          <div className="flex items-center gap-2">
            <Database size={16} className="text-green-400" />
            <span>Data Sovereignty</span>
          </div>
        </div>
      </PageHeader>

      <ContentSection
        title="Self-Hosting Benefits"
        description="Maximum control and customization for organizations with specific security, compliance, or customization requirements."
        variant="default"
      >
        <FeatureGrid features={selfHostFeatures} columns={3} />
      </ContentSection>

      <ContentSection
        title="Deployment Options"
        description="Multiple deployment methods to fit your infrastructure and expertise level."
        variant="gray"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {deploymentOptions.map((option, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Server size={24} className="text-monks-accent" />
              </div>
              <h3 className="text-xl font-bold text-monks-black mb-4">{option.title}</h3>
              <p className="text-monks-gray mb-4">{option.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-monks-gray">Complexity:</span>
                  <span className="text-monks-black">{option.complexity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-monks-gray">Setup Time:</span>
                  <span className="text-monks-accent">{option.timeToSetup}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Deployment Guide"
        description="Step-by-step instructions for deploying self-hosted agents on your infrastructure."
        variant="default"
      >
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="docker">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="docker">Docker</TabsTrigger>
              <TabsTrigger value="kubernetes">Kubernetes</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
            </TabsList>

            <TabsContent value="docker">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-monks-black mb-4">Docker Compose Deployment</h3>
                  <p className="text-monks-gray mb-6">
                    The fastest way to get started with self-hosted agents using Docker Compose.
                  </p>
                </div>
                <CodeBlock
                  code={dockerCode}
                  language="yaml"
                  title="docker-compose.yml"
                />
                <div className="bg-monks-light-gray rounded-2xl p-6">
                  <h4 className="font-semibold text-monks-black mb-3">Quick Start Commands:</h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-monks-gray">$</span> docker-compose up -d
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-monks-gray">$</span> docker-compose logs -f findawise-agent
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="kubernetes">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-monks-black mb-4">Kubernetes Deployment</h3>
                  <p className="text-monks-gray mb-6">
                    Production-ready Kubernetes deployment with auto-scaling and high availability.
                  </p>
                </div>
                <CodeBlock
                  code={kubernetesCode}
                  language="yaml"
                  title="agent-deployment.yaml"
                />
                <div className="bg-monks-light-gray rounded-2xl p-6">
                  <h4 className="font-semibold text-monks-black mb-3">Deployment Commands:</h4>
                  <div className="space-y-2 font-mono text-sm">
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-monks-gray">$</span> kubectl apply -f agent-deployment.yaml
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-monks-gray">$</span> kubectl get pods -l app=findawise-agent
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="config">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-monks-black mb-4">Agent Configuration</h3>
                  <p className="text-monks-gray mb-6">
                    Customize your agent's behavior, integrations, and guardrails.
                  </p>
                </div>
                <CodeBlock
                  code={configCode}
                  language="json"
                  title="agent-config.json"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ContentSection>

      <ContentSection
        title="System Requirements"
        description="Hardware and software requirements for optimal agent performance."
        variant="gray"
      >
        <div className="grid gap-8 md:grid-cols-3">
          {requirements.map((req, i) => (
            <div key={i} className="bg-white rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-6">{req.category}</h3>
              <ul className="space-y-3">
                {req.specs.map((spec, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-monks-accent rounded-full"></div>
                    <span className="text-monks-gray">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Get Started with Self-Hosting"
        description="Ready to deploy on your infrastructure? Download our deployment package or contact our technical team."
        variant="default"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-monks-light-gray rounded-3xl p-8">
            <Terminal size={48} className="text-monks-accent mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-monks-black mb-4">Download Deployment Package</h3>
            <p className="text-monks-gray mb-6">
              Get the complete self-hosting package with documentation, deployment scripts, and configuration examples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2">
                <Download size={16} />
                Download Package
              </button>
              <Link
                to="/contact?type=self-host"
                className="flex-1 border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300"
              >
                Technical Consultation
              </Link>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Need Help with Self-Hosting?"
        description="Our technical team can help with deployment, configuration, and ongoing support for your self-hosted agents."
        variant="gray"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-monks-black mb-4">Technical Support</h3>
            <p className="text-monks-gray mb-6">
              Get expert help with deployment, configuration, and troubleshooting from our technical team.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Deployment assistance</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Configuration optimization</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Performance tuning</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Security hardening</span>
              </li>
            </ul>
            <Link
              to="/contact?type=technical-support"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
            >
              Get Technical Support
              <ArrowUpRight size={16} />
            </Link>
          </div>
          
          <div className="bg-white rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-monks-black mb-4">Custom Development</h3>
            <p className="text-monks-gray mb-6">
              Need custom modifications or specialized features? Our development team can build exactly what you need.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Custom agent development</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Integration development</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Performance optimization</span>
              </li>
              <li className="flex items-center gap-3 text-monks-gray">
                <CheckCircle size={16} className="text-green-500" />
                <span>Ongoing maintenance</span>
              </li>
            </ul>
            <Link
              to="/contact?type=custom-development"
              className="inline-flex items-center gap-2 border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300"
            >
              Discuss Custom Development
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}