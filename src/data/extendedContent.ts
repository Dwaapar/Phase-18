export const guides = [
  {
    id: '1',
    slug: 'getting-started-with-workflows',
    title: 'Getting Started with Workflows',
    description: 'Complete guide to deploying your first workflow in under 10 minutes',
    category: 'Workflows',
    difficulty: 'Beginner',
    readTime: '8 min read',
    publishedAt: new Date('2024-12-01'),
    author: 'Sarah Chen',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    content: `
## Introduction
Workflows are the backbone of automation. In this guide, you'll learn how to deploy your first workflow and start automating your business processes immediately.

## Prerequisites
- A Findawise account (free tier works)
- Basic understanding of your business process
- 10 minutes of your time

## Step 1: Browse the Workflow Store
Navigate to the Workflow Store and browse our 350+ pre-built workflows. Use filters to narrow down by category, industry, or integration.

## Step 2: Select Your Workflow
Choose a workflow that matches your needs. Review the description, required integrations, and environment variables.

## Step 3: Configure Environment Variables
Set up your API keys and configuration values. All secrets are encrypted and stored securely.

## Step 4: Deploy
Click the deploy button. Your workflow will be live in under 2 minutes.

## Next Steps
- Monitor your workflow performance in the dashboard
- Customize triggers and actions
- Scale up as needed
    `
  },
  {
    id: '2',
    slug: 'ai-agent-deployment-guide',
    title: 'AI Agent Deployment Guide',
    description: 'Deploy autonomous AI agents for sales, support, and operations',
    category: 'AI Agents',
    difficulty: 'Intermediate',
    readTime: '12 min read',
    publishedAt: new Date('2024-11-28'),
    author: 'Marcus Rodriguez',
    image: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    content: `
## What Are AI Agents?
AI agents are autonomous software entities that can perceive, reason, and act to achieve specific goals without continuous human supervision.

## Choosing Your Agent Type
- **SDR Agent**: Automates prospecting and outreach
- **Support Agent**: Handles customer inquiries 24/7
- **Operations Agent**: Manages workflows and processes

## Deployment Options
1. **Managed**: We host and maintain everything
2. **Self-Hosted**: Deploy on your infrastructure
3. **Hybrid**: Combine both approaches

## Configuration Best Practices
- Set clear boundaries for agent decision-making
- Implement approval workflows for critical actions
- Monitor agent performance continuously

## Security Considerations
All agents operate within defined guardrails and comply with your security policies.
    `
  },
  {
    id: '3',
    slug: 'enterprise-automation-playbook',
    title: 'Enterprise Automation Playbook',
    description: 'Strategic guide for implementing automation at enterprise scale',
    category: 'Enterprise',
    difficulty: 'Advanced',
    readTime: '20 min read',
    publishedAt: new Date('2024-11-20'),
    author: 'Emily Watson',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
    content: `
## Enterprise Automation Framework

### Phase 1: Assessment
Identify high-impact processes ripe for automation. Focus on repetitive, rule-based tasks with clear inputs and outputs.

### Phase 2: Pilot
Run 72-hour pilot builds to validate ROI before full deployment. This de-risks investment and builds internal momentum.

### Phase 3: Scale
Expand successful pilots across departments. Establish centers of excellence for automation best practices.

### Phase 4: Optimize
Continuously monitor and refine workflows. Use analytics to identify improvement opportunities.

## Governance Framework
- Establish clear ownership and accountability
- Define approval processes for production deployments
- Implement comprehensive audit trails
- Regular security and compliance reviews

## Change Management
Success requires organizational buy-in. Focus on demonstrating quick wins and continuous value delivery.
    `
  }
];

export const jobPostings = [
  {
    id: '1',
    slug: 'senior-full-stack-engineer',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Join our core platform team to build the future of business automation',
    responsibilities: [
      'Design and implement scalable features for our automation platform',
      'Work across the full stack from React frontends to Node.js backends',
      'Collaborate with product and design teams on new features',
      'Mentor junior engineers and contribute to technical decisions',
      'Participate in on-call rotation for production support'
    ],
    requirements: [
      '5+ years of full stack development experience',
      'Expert knowledge of React, TypeScript, and Node.js',
      'Experience with distributed systems and microservices',
      'Strong understanding of database design and optimization',
      'Excellent communication and collaboration skills'
    ],
    niceToHave: [
      'Experience with workflow automation platforms',
      'Knowledge of AI/ML systems',
      'Open source contributions',
      'Previous startup experience'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO',
      '401(k) matching',
      'Remote work flexibility',
      'Professional development budget'
    ]
  },
  {
    id: '2',
    slug: 'product-manager-ai-agents',
    title: 'Product Manager - AI Agents',
    department: 'Product',
    location: 'Remote (US) or San Francisco, CA',
    type: 'Full-time',
    description: 'Lead product strategy for our AI agent platform',
    responsibilities: [
      'Define product roadmap and strategy for AI agents',
      'Work with customers to understand needs and pain points',
      'Collaborate with engineering on feature specifications',
      'Analyze product metrics and drive continuous improvement',
      'Present product vision to stakeholders and leadership'
    ],
    requirements: [
      '4+ years of product management experience',
      'Strong understanding of AI/ML technologies',
      'Experience shipping B2B SaaS products',
      'Data-driven approach to decision making',
      'Excellent written and verbal communication'
    ],
    niceToHave: [
      'Technical background or CS degree',
      'Experience with automation or workflow tools',
      'Previous experience at high-growth startup',
      'Enterprise sales experience'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO',
      '401(k) matching',
      'Remote work flexibility',
      'Professional development budget'
    ]
  },
  {
    id: '3',
    slug: 'customer-success-manager',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Help our customers achieve their automation goals',
    responsibilities: [
      'Own customer relationships and drive product adoption',
      'Conduct onboarding and training sessions',
      'Identify expansion opportunities within accounts',
      'Gather customer feedback and advocate for improvements',
      'Monitor customer health metrics and take proactive action'
    ],
    requirements: [
      '3+ years of customer success or account management',
      'Experience with technical products and enterprise customers',
      'Strong problem-solving and analytical skills',
      'Excellent presentation and communication abilities',
      'Self-motivated and results-oriented'
    ],
    niceToHave: [
      'Experience with automation or workflow tools',
      'Technical background or ability to learn quickly',
      'Previous SaaS startup experience',
      'Account expansion and upselling experience'
    ],
    benefits: [
      'Competitive salary and equity',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO',
      '401(k) matching',
      'Remote work flexibility',
      'Professional development budget'
    ]
  }
];

export const changelogEntries = [
  {
    version: '2.5.0',
    date: '2024-12-15',
    title: 'AI Agent Performance Improvements',
    changes: [
      {
        type: 'feature',
        description: 'New conversational AI engine with 40% better accuracy'
      },
      {
        type: 'feature',
        description: 'Real-time agent performance analytics dashboard'
      },
      {
        type: 'improvement',
        description: 'Reduced agent response latency by 60%'
      },
      {
        type: 'improvement',
        description: 'Enhanced context retention across conversations'
      },
      {
        type: 'fix',
        description: 'Fixed edge case in agent fallback behavior'
      }
    ]
  },
  {
    version: '2.4.0',
    date: '2024-12-01',
    title: 'Workflow Store Enhancements',
    changes: [
      {
        type: 'feature',
        description: 'Added 50+ new pre-built workflows'
      },
      {
        type: 'feature',
        description: 'Workflow versioning and rollback capabilities'
      },
      {
        type: 'improvement',
        description: 'Improved search and filtering in workflow store'
      },
      {
        type: 'improvement',
        description: 'Enhanced workflow documentation and examples'
      },
      {
        type: 'fix',
        description: 'Fixed deployment issues with certain integrations'
      }
    ]
  },
  {
    version: '2.3.0',
    date: '2024-11-15',
    title: 'Enterprise Security & Compliance',
    changes: [
      {
        type: 'feature',
        description: 'SOC 2 Type II certification completed'
      },
      {
        type: 'feature',
        description: 'Enhanced audit logging and compliance reports'
      },
      {
        type: 'feature',
        description: 'SSO with SAML 2.0 support'
      },
      {
        type: 'improvement',
        description: 'Improved data encryption at rest and in transit'
      },
      {
        type: 'improvement',
        description: 'GDPR and CCPA compliance tools'
      }
    ]
  }
];

export const docsSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Everything you need to begin automating with Findawise',
    articles: [
      { title: 'Quick Start Guide', slug: 'quick-start' },
      { title: 'Platform Overview', slug: 'platform-overview' },
      { title: 'Your First Workflow', slug: 'first-workflow' },
      { title: 'Authentication Setup', slug: 'authentication' },
      { title: 'Best Practices', slug: 'best-practices' }
    ]
  },
  {
    id: 'workflows',
    title: 'Workflows',
    description: 'Build, deploy, and manage automated workflows',
    articles: [
      { title: 'Workflow Concepts', slug: 'concepts' },
      { title: 'Creating Workflows', slug: 'creating' },
      { title: 'Triggers & Actions', slug: 'triggers-actions' },
      { title: 'Environment Variables', slug: 'env-vars' },
      { title: 'Testing & Debugging', slug: 'testing' },
      { title: 'Deployment', slug: 'deployment' }
    ]
  },
  {
    id: 'agents',
    title: 'AI Agents',
    description: 'Deploy and manage autonomous AI agents',
    articles: [
      { title: 'Agent Architecture', slug: 'architecture' },
      { title: 'Agent Types', slug: 'types' },
      { title: 'Configuration', slug: 'configuration' },
      { title: 'Training & Customization', slug: 'training' },
      { title: 'Monitoring Performance', slug: 'monitoring' }
    ]
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Connect with your favorite tools and platforms',
    articles: [
      { title: 'Integration Overview', slug: 'overview' },
      { title: 'Salesforce', slug: 'salesforce' },
      { title: 'HubSpot', slug: 'hubspot' },
      { title: 'Slack', slug: 'slack' },
      { title: 'Zendesk', slug: 'zendesk' },
      { title: 'Custom Integrations', slug: 'custom' }
    ]
  },
  {
    id: 'api',
    title: 'API Reference',
    description: 'Comprehensive API documentation',
    articles: [
      { title: 'Authentication', slug: 'auth' },
      { title: 'Workflows API', slug: 'workflows' },
      { title: 'Agents API', slug: 'agents' },
      { title: 'Assets API', slug: 'assets' },
      { title: 'Webhooks', slug: 'webhooks' },
      { title: 'Rate Limits', slug: 'rate-limits' }
    ]
  }
];

export const comparisons = [
  {
    id: '1',
    title: 'Findawise vs. Zapier',
    subtitle: 'Comprehensive comparison for businesses choosing automation platforms',
    competitor: 'Zapier',
    categories: [
      {
        name: 'Capabilities',
        items: [
          { feature: 'Pre-built Workflows', findawise: '350+ enterprise-grade', competitor: '5,000+ simple zaps' },
          { feature: 'AI Agents', findawise: 'Fully autonomous agents', competitor: 'Not available' },
          { feature: 'Custom Development', findawise: '72h pilot builds included', competitor: 'Not available' },
          { feature: 'Decision Platform', findawise: 'Integrated guidance', competitor: 'Not available' }
        ]
      },
      {
        name: 'Enterprise Features',
        items: [
          { feature: 'SOC 2 Compliance', findawise: 'Yes', competitor: 'Yes' },
          { feature: 'SSO/SAML', findawise: 'Yes', competitor: 'Enterprise plan only' },
          { feature: 'Dedicated Support', findawise: 'All paid plans', competitor: 'Enterprise only' },
          { feature: 'SLA Guarantees', findawise: '99.9% uptime', competitor: '99.9% uptime' }
        ]
      },
      {
        name: 'Pricing',
        items: [
          { feature: 'Free Tier', findawise: '5 workflows', competitor: '100 tasks/month' },
          { feature: 'Pro Plan', findawise: '$49/month unlimited', competitor: '$19.99/month (750 tasks)' },
          { feature: 'Enterprise', findawise: 'Custom pricing', competitor: 'Custom pricing' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Findawise vs. Make',
    subtitle: 'Which visual automation platform is right for you?',
    competitor: 'Make (formerly Integromat)',
    categories: [
      {
        name: 'Ease of Use',
        items: [
          { feature: 'Learning Curve', findawise: 'Beginner friendly', competitor: 'Moderate complexity' },
          { feature: 'Visual Builder', findawise: 'Simplified interface', competitor: 'Advanced visual builder' },
          { feature: 'Pre-built Templates', findawise: '350+', competitor: '1,000+' },
          { feature: 'AI Assistance', findawise: 'Built-in', competitor: 'Limited' }
        ]
      },
      {
        name: 'Advanced Features',
        items: [
          { feature: 'Complex Logic', findawise: 'Yes', competitor: 'Yes' },
          { feature: 'Error Handling', findawise: 'Automatic retry + alerts', competitor: 'Manual configuration' },
          { feature: 'Data Transformation', findawise: 'Built-in helpers', competitor: 'Requires coding' }
        ]
      }
    ]
  }
];
