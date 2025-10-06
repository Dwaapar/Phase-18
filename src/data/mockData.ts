import { Workflow, Agent, Asset, CaseStudy, BlogPost, Testimonial } from '../types';

export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Lead Qualification Pipeline',
    description: 'Automatically qualify and route leads based on custom criteria with intelligent scoring. Enriches lead data with firmographic information, scores against ICP criteria, assigns to territories, and notifies sales reps instantly.',
    category: 'Sales',
    difficulty: 'Intermediate',
    runtime: '~5 minutes',
    downloads: '12,847',
    rating: 4.8,
    reviews: 1156,
    tags: ['CRM', 'Lead Gen', 'Automation', 'Salesforce', 'HubSpot', 'Lead Scoring'],
    pricing: 'Free',
    lastUpdated: '2024-12-10',
    steps: [
      'Lead data captured from form submission or webhook',
      'Enrichment with company firmographic and contact data via Clearbit/ZoomInfo',
      'Intelligent scoring based on ICP fit, engagement, and intent signals',
      'Territory and rep assignment using round-robin or custom rules',
      'Automated notification via Slack/email and CRM task creation'
    ],
    envVars: [
      { name: 'SALESFORCE_API_KEY', description: 'Your Salesforce API key for CRM integration', required: true },
      { name: 'CLEARBIT_API_KEY', description: 'Clearbit API key for data enrichment', required: true },
      { name: 'SLACK_WEBHOOK_URL', description: 'Slack webhook for instant sales notifications', required: false },
      { name: 'SCORING_THRESHOLD', description: 'Minimum score for qualified leads (0-100)', required: true, default: '75' },
      { name: 'ASSIGNMENT_METHOD', description: 'Lead assignment method: round-robin, territory, or custom', required: false, default: 'round-robin' }
    ],
    integrations: ['Salesforce', 'HubSpot', 'Slack', 'Clearbit', 'ZoomInfo', 'Zapier', 'Webhooks'],
    patchNotes: [
      { version: '1.2.0', date: '2024-12-10', changes: ['Added Slack integration with rich formatting', 'Improved ML-based scoring algorithm', 'Added intent signal tracking'] },
      { version: '1.1.0', date: '2024-11-28', changes: ['Enhanced territory assignment logic', 'Bug fixes for duplicate lead handling', 'Added custom field mapping'] }
    ]
  },
  {
    id: '2',
    name: 'Customer Onboarding Flow',
    description: 'Complete end-to-end onboarding sequence with personalized emails, automated task creation, milestone tracking, and health score monitoring to ensure successful customer adoption.',
    category: 'Customer Success',
    difficulty: 'Beginner',
    runtime: '~3 minutes',
    downloads: '28,934',
    rating: 4.9,
    reviews: 2847,
    tags: ['Onboarding', 'Email', 'Tasks', 'CRM', 'Customer Success', 'Automation'],
    pricing: 'Free',
    lastUpdated: '2024-12-12',
    steps: [
      'Welcome email sent to new customer with personalized resources',
      'Schedule kickoff call automatically based on calendar availability',
      'Send setup resources, documentation, and video tutorials',
      'Create milestone check-in tasks for customer success team',
      'Track progress, calculate health score, and send automated reminders'
    ],
    envVars: [
      { name: 'EMAIL_API_KEY', description: 'Your email service API key (SendGrid, Mailgun, etc.)', required: true },
      { name: 'CALENDAR_API_KEY', description: 'Calendar integration key (Google Calendar, Calendly)', required: true },
      { name: 'CRM_API_KEY', description: 'CRM API key for customer data sync', required: true }
    ],
    integrations: ['Gmail', 'Google Calendar', 'HubSpot', 'Intercom', 'Calendly', 'SendGrid', 'Salesforce'],
    patchNotes: [
      { version: '2.1.0', date: '2024-12-12', changes: ['Added milestone tracking dashboard', 'Improved email templates with dynamic content', 'Added health score calculation'] }
    ]
  },
  {
    id: '3',
    name: 'Invoice Processing Bot',
    description: 'Extract, validate, and process invoices automatically with OCR technology, validation against purchase orders, approval workflows, and payment processing integration.',
    category: 'Finance',
    difficulty: 'Advanced',
    runtime: '~8 minutes',
    downloads: '6,521',
    rating: 4.7,
    reviews: 892,
    tags: ['Finance', 'OCR', 'Validation', 'Accounting', 'AP Automation', 'QuickBooks'],
    pricing: '$29',
    lastUpdated: '2024-12-08',
    steps: [
      'Extract invoice data using advanced OCR with 98% accuracy',
      'Validate against purchase orders and contract terms',
      'Check approval thresholds and compliance requirements',
      'Route for appropriate approvals via email or Slack',
      'Process payment through accounting system and update records'
    ],
    envVars: [
      { name: 'OCR_API_KEY', description: 'OCR service API key (Tesseract, AWS Textract)', required: true },
      { name: 'QUICKBOOKS_API_KEY', description: 'QuickBooks API key for accounting integration', required: true },
      { name: 'APPROVAL_THRESHOLD', description: 'Amount requiring manual approval (USD)', required: true, default: '1000' },
      { name: 'PAYMENT_GATEWAY_KEY', description: 'Payment gateway API key', required: false }
    ],
    integrations: ['QuickBooks', 'Xero', 'NetSuite', 'Stripe', 'AWS Textract', 'Bill.com', 'Slack'],
    patchNotes: [
      { version: '1.5.0', date: '2024-12-08', changes: ['Enhanced OCR accuracy to 98%', 'Added multi-currency support', 'Improved fraud detection'] }
    ]
  },
  {
    id: '4',
    name: 'Support Ticket Triage',
    description: 'Automatically categorize, prioritize, and route support tickets using AI-powered sentiment analysis and intent detection to ensure fast, accurate customer support.',
    category: 'Support',
    difficulty: 'Intermediate',
    runtime: '~2 minutes',
    downloads: '17,823',
    rating: 4.8,
    reviews: 1982,
    tags: ['Support', 'AI', 'Routing', 'Zendesk', 'Customer Service', 'Sentiment Analysis'],
    pricing: 'Free',
    lastUpdated: '2024-12-11',
    steps: [
      'Analyze ticket content with AI for intent and sentiment',
      'Determine urgency level and category automatically',
      'Route to appropriate team based on skills and availability',
      'Set SLA timers and escalation rules',
      'Send acknowledgment to customer with expected resolution time'
    ],
    envVars: [
      { name: 'ZENDESK_API_KEY', description: 'Zendesk API key for ticket management', required: true },
      { name: 'AI_API_KEY', description: 'AI service API key for classification', required: true }
    ],
    integrations: ['Zendesk', 'Intercom', 'Freshdesk', 'Help Scout', 'Front', 'OpenAI', 'Anthropic'],
    patchNotes: [
      { version: '1.3.0', date: '2024-12-11', changes: ['Improved AI categorization accuracy', 'Added SLA tracking', 'Multi-language support added'] }
    ]
  },
  {
    id: '5',
    name: 'Social Media Campaign Orchestrator',
    description: 'Schedule and publish content across all social platforms with AI-powered optimization, hashtag suggestions, best time posting, and comprehensive performance analytics.',
    category: 'Marketing',
    difficulty: 'Beginner',
    runtime: '~4 minutes',
    downloads: '31,247',
    rating: 4.9,
    reviews: 4128,
    tags: ['Social Media', 'Marketing', 'Content', 'Scheduling', 'Analytics', 'Multi-Channel'],
    pricing: '$19',
    lastUpdated: '2024-12-14',
    steps: [
      'Load content calendar with posts and media',
      'Optimize posts for each platform (character limits, hashtags, etc.)',
      'Schedule across channels at optimal posting times',
      'Monitor engagement metrics in real-time',
      'Generate comprehensive performance reports with insights'
    ],
    envVars: [
      { name: 'TWITTER_API_KEY', description: 'Twitter/X API credentials', required: true },
      { name: 'LINKEDIN_API_KEY', description: 'LinkedIn API credentials', required: true },
      { name: 'FACEBOOK_API_KEY', description: 'Facebook API credentials', required: false },
      { name: 'INSTAGRAM_API_KEY', description: 'Instagram API credentials', required: false }
    ],
    integrations: ['Twitter', 'LinkedIn', 'Facebook', 'Instagram', 'Buffer', 'Hootsuite', 'TikTok'],
    patchNotes: [
      { version: '2.0.0', date: '2024-12-14', changes: ['Added Instagram Reels and Stories support', 'Enhanced analytics dashboard', 'AI-powered hashtag suggestions'] }
    ]
  },
  {
    id: '6',
    name: 'Employee Offboarding Automation',
    description: 'Comprehensive offboarding workflow ensuring secure and compliant employee departures with access revocation, asset collection, and complete audit trail.',
    category: 'HR',
    difficulty: 'Intermediate',
    runtime: '~6 minutes',
    downloads: '8,934',
    rating: 4.6,
    reviews: 678,
    tags: ['HR', 'Security', 'Compliance', 'Access Management', 'Audit Trail', 'Offboarding'],
    pricing: 'Free',
    lastUpdated: '2024-12-09',
    steps: [
      'Revoke system access across all platforms (SSO, SaaS apps, VPN)',
      'Collect company assets and equipment with tracking',
      'Process final payroll, benefits, and equity calculations',
      'Schedule exit interview and collect feedback',
      'Archive employee records per compliance requirements'
    ],
    envVars: [
      { name: 'OKTA_API_KEY', description: 'Okta identity management API key', required: true },
      { name: 'HR_SYSTEM_API_KEY', description: 'HR system API key (BambooHR, Workday)', required: true },
      { name: 'IT_ASSET_TRACKER_KEY', description: 'IT asset management system API key', required: false }
    ],
    integrations: ['Okta', 'BambooHR', 'ADP', 'Google Workspace', 'Microsoft 365', 'Slack', 'Workday'],
    patchNotes: [
      { version: '1.1.0', date: '2024-12-09', changes: ['Added compliance checklist', 'Improved asset tracking', 'Enhanced audit logging'] }
    ]
  },
  {
    id: '7',
    name: 'Contract Renewal Reminder System',
    description: 'Track contract expiration dates and automate renewal workflows with multi-stage alerts, approval processes, and document generation.',
    category: 'Operations',
    difficulty: 'Beginner',
    runtime: '~3 minutes',
    downloads: '14,567',
    rating: 4.7,
    reviews: 1234,
    tags: ['Contracts', 'Reminders', 'Operations', 'Legal', 'Renewals', 'DocuSign'],
    pricing: 'Free',
    lastUpdated: '2024-12-13',
    steps: [
      'Monitor contract database for upcoming renewals',
      'Send alerts 90, 60, and 30 days before expiration',
      'Trigger renewal approval workflow with stakeholders',
      'Generate renewal documents with updated terms',
      'Update contract management system with new dates'
    ],
    envVars: [
      { name: 'CONTRACT_DB_URL', description: 'Contract database connection string', required: true },
      { name: 'DOCUSIGN_API_KEY', description: 'DocuSign API key for e-signatures', required: false },
      { name: 'APPROVAL_WORKFLOW_URL', description: 'Approval system webhook URL', required: true }
    ],
    integrations: ['DocuSign', 'Salesforce', 'PandaDoc', 'Slack', 'Monday.com', 'Airtable'],
    patchNotes: [
      { version: '1.2.0', date: '2024-12-13', changes: ['Added multi-stakeholder notifications', 'Custom alert timing', 'Contract value tracking'] }
    ]
  },
  {
    id: '8',
    name: 'Sales Forecast Generator',
    description: 'Automated sales forecasting using historical data, pipeline analysis, and machine learning models to predict future revenue with 95% confidence intervals.',
    category: 'Sales',
    difficulty: 'Advanced',
    runtime: '~10 minutes',
    downloads: '7,289',
    rating: 4.8,
    reviews: 945,
    tags: ['Analytics', 'Forecasting', 'Sales', 'BI', 'ML', 'Revenue Operations'],
    pricing: '$49',
    lastUpdated: '2024-12-07',
    steps: [
      'Extract pipeline data from CRM systems',
      'Apply ML models for deal probability and conversion prediction',
      'Generate forecast scenarios (conservative, realistic, optimistic)',
      'Create executive dashboards with visualizations',
      'Distribute reports to stakeholders via email and Slack'
    ],
    envVars: [
      { name: 'CRM_API_KEY', description: 'CRM system API key', required: true },
      { name: 'BI_TOOL_API_KEY', description: 'BI tool API key (Tableau, Power BI)', required: true },
      { name: 'ML_MODEL_ENDPOINT', description: 'Machine learning model API endpoint', required: false }
    ],
    integrations: ['Salesforce', 'HubSpot', 'Tableau', 'Power BI', 'Looker', 'Google Sheets'],
    patchNotes: [
      { version: '2.0.0', date: '2024-12-07', changes: ['Enhanced ML models with 95% accuracy', 'Added scenario planning', 'Improved data visualization'] }
    ]
  },
  {
    id: '9',
    name: 'Product Review Aggregator',
    description: 'Collect and analyze product reviews from multiple sources with sentiment analysis, theme extraction, and competitive benchmarking.',
    category: 'Marketing',
    difficulty: 'Intermediate',
    runtime: '~7 minutes',
    downloads: '11,234',
    rating: 4.6,
    reviews: 1567,
    tags: ['Reviews', 'Sentiment Analysis', 'Marketing', 'Analytics', 'Reputation', 'NLP'],
    pricing: '$29',
    lastUpdated: '2024-12-11',
    steps: [
      'Scrape reviews from multiple platforms (G2, Trustpilot, Amazon, etc.)',
      'Perform sentiment analysis and emotion detection',
      'Identify key themes, topics, and pain points using NLP',
      'Generate summary reports with actionable insights',
      'Alert team to urgent issues or negative trend spikes'
    ],
    envVars: [
      { name: 'REVIEW_PLATFORMS', description: 'Comma-separated list of platforms to monitor', required: true },
      { name: 'SENTIMENT_API_KEY', description: 'Sentiment analysis API key', required: true },
      { name: 'ALERT_THRESHOLD', description: 'Negative sentiment threshold for alerts', required: false, default: '30' }
    ],
    integrations: ['Trustpilot', 'Google Reviews', 'Yelp', 'Amazon', 'G2', 'Capterra', 'OpenAI'],
    patchNotes: [
      { version: '1.4.0', date: '2024-12-11', changes: ['Added competitive analysis', 'Improved sentiment accuracy to 92%', 'Theme extraction enhancement'] }
    ]
  },
  {
    id: '10',
    name: 'Compliance Audit Tracker',
    description: 'Automate compliance audits and maintain audit trails across systems with evidence collection, framework validation, and automated reporting.',
    category: 'Compliance',
    difficulty: 'Advanced',
    runtime: '~12 minutes',
    downloads: '5,423',
    rating: 4.9,
    reviews: 789,
    tags: ['Compliance', 'Audit', 'Security', 'Governance', 'SOC2', 'GDPR'],
    pricing: '$79',
    lastUpdated: '2024-12-06',
    steps: [
      'Schedule periodic compliance checks across all systems',
      'Collect audit evidence automatically from logs and systems',
      'Validate against compliance framework (SOC2, GDPR, HIPAA)',
      'Generate comprehensive audit reports with evidence',
      'Track remediation actions and maintain compliance dashboard'
    ],
    envVars: [
      { name: 'COMPLIANCE_FRAMEWORK', description: 'Framework to audit against (SOC2, GDPR, HIPAA)', required: true },
      { name: 'AUDIT_SYSTEMS', description: 'Comma-separated list of systems to audit', required: true },
      { name: 'EVIDENCE_STORAGE_URL', description: 'S3 bucket or storage URL for evidence', required: true }
    ],
    integrations: ['Vanta', 'Drata', 'OneTrust', 'Jira', 'AWS', 'Azure', 'Google Cloud'],
    patchNotes: [
      { version: '1.6.0', date: '2024-12-06', changes: ['Added GDPR framework', 'Automated evidence collection', 'Enhanced reporting'] }
    ]
  },
  {
    id: '11',
    name: 'Inventory Restocking Alert',
    description: 'Monitor inventory levels in real-time and trigger automated restocking workflows with supplier integration and predictive ordering.',
    category: 'Operations',
    difficulty: 'Beginner',
    runtime: '~4 minutes',
    downloads: '9,845',
    rating: 4.5,
    reviews: 1123,
    tags: ['Inventory', 'Supply Chain', 'Operations', 'Alerts', 'Procurement', 'E-commerce'],
    pricing: 'Free',
    lastUpdated: '2024-12-12',
    steps: [
      'Monitor inventory levels in real-time across warehouses',
      'Detect items below reorder threshold with safety stock calculations',
      'Generate purchase orders automatically with optimal quantities',
      'Send alerts to procurement team via email and Slack',
      'Track delivery status and update inventory system'
    ],
    envVars: [
      { name: 'INVENTORY_DB_URL', description: 'Inventory database connection string', required: true },
      { name: 'SUPPLIER_API_KEY', description: 'Supplier integration API key', required: false },
      { name: 'REORDER_THRESHOLD', description: 'Percentage threshold for reordering', required: true, default: '20' }
    ],
    integrations: ['ShipStation', 'TradeGecko', 'SAP', 'Oracle', 'Shopify', 'WooCommerce'],
    patchNotes: [
      { version: '1.0.5', date: '2024-12-12', changes: ['Added multi-supplier support', 'Improved threshold logic', 'Predictive ordering'] }
    ]
  },
  {
    id: '12',
    name: 'Meeting Notes Distributor',
    description: 'Automatically transcribe meetings, extract action items, and distribute formatted notes to attendees with task creation in project management tools.',
    category: 'Productivity',
    difficulty: 'Beginner',
    runtime: '~5 minutes',
    downloads: '23,456',
    rating: 4.7,
    reviews: 2897,
    tags: ['Meetings', 'Transcription', 'Productivity', 'Collaboration', 'AI', 'Action Items'],
    pricing: '$19',
    lastUpdated: '2024-12-14',
    steps: [
      'Join scheduled meetings automatically via Zoom/Meet/Teams',
      'Transcribe conversation in real-time with speaker identification',
      'Extract action items, decisions, and key discussion points using AI',
      'Generate formatted meeting notes with timestamps and sections',
      'Distribute to all attendees and create tasks in project management tools'
    ],
    envVars: [
      { name: 'ZOOM_API_KEY', description: 'Zoom API credentials for meeting access', required: true },
      { name: 'TRANSCRIPTION_API_KEY', description: 'Transcription service API key (Whisper, Rev)', required: true },
      { name: 'PROJECT_MGMT_KEY', description: 'Project management tool API key', required: false }
    ],
    integrations: ['Zoom', 'Google Meet', 'Microsoft Teams', 'Otter.ai', 'Asana', 'Jira', 'Notion'],
    patchNotes: [
      { version: '1.3.0', date: '2024-12-14', changes: ['Added action item extraction', 'Multi-language support (20+ languages)', 'Speaker diarization'] }
    ]
  },
  {
    id: '13',
    name: 'Churn Prediction & Prevention',
    description: 'Identify at-risk customers using ML models, trigger retention workflows, and track intervention effectiveness to reduce churn by 40%.',
    category: 'Customer Success',
    difficulty: 'Advanced',
    runtime: '~9 minutes',
    downloads: '6,789',
    rating: 4.9,
    reviews: 823,
    tags: ['Churn', 'ML', 'Customer Success', 'Retention', 'Predictive Analytics', 'Intervention'],
    pricing: '$59',
    lastUpdated: '2024-12-15',
    steps: [
      'Analyze customer behavior, usage patterns, and engagement metrics',
      'Apply ML models to calculate churn risk score',
      'Trigger personalized retention workflows based on risk level',
      'Alert customer success team with recommended interventions',
      'Track intervention effectiveness and model performance'
    ],
    envVars: [
      { name: 'CRM_API_KEY', description: 'CRM API key for customer data', required: true },
      { name: 'ANALYTICS_API_KEY', description: 'Product analytics API key', required: true },
      { name: 'ML_MODEL_URL', description: 'Churn prediction model endpoint', required: true },
      { name: 'RISK_THRESHOLD', description: 'Risk score threshold for alerts (0-100)', required: true, default: '70' }
    ],
    integrations: ['Salesforce', 'HubSpot', 'Mixpanel', 'Amplitude', 'Slack', 'Intercom'],
    patchNotes: [
      { version: '2.2.0', date: '2024-12-15', changes: ['Enhanced ML model accuracy to 89%', 'Added personalized intervention playbooks', 'ROI tracking'] }
    ]
  },
  {
    id: '14',
    name: 'Candidate Screening Pipeline',
    description: 'Automate resume screening, schedule interviews, and conduct initial assessments using AI to reduce time-to-hire by 65%.',
    category: 'HR',
    difficulty: 'Intermediate',
    runtime: '~6 minutes',
    downloads: '15,234',
    rating: 4.7,
    reviews: 1456,
    tags: ['Recruiting', 'HR', 'AI', 'Screening', 'Interviews', 'ATS'],
    pricing: '$39',
    lastUpdated: '2024-12-13',
    steps: [
      'Parse resumes and extract key information using NLP',
      'Score candidates against job requirements and culture fit',
      'Conduct initial screening via AI chatbot or video interview',
      'Schedule qualified candidates with hiring managers',
      'Send automated feedback to all candidates'
    ],
    envVars: [
      { name: 'ATS_API_KEY', description: 'Applicant tracking system API key', required: true },
      { name: 'RESUME_PARSER_KEY', description: 'Resume parsing service API key', required: true },
      { name: 'CALENDAR_API_KEY', description: 'Calendar integration for scheduling', required: true },
      { name: 'SCREENING_THRESHOLD', description: 'Minimum score for interview invitation', required: true, default: '75' }
    ],
    integrations: ['Lever', 'Greenhouse', 'Workable', 'Google Calendar', 'Calendly', 'BambooHR'],
    patchNotes: [
      { version: '1.8.0', date: '2024-12-13', changes: ['Added AI video screening', 'Bias detection and mitigation', 'Multi-stage scoring'] }
    ]
  },
  {
    id: '15',
    name: 'Expense Report Automation',
    description: 'Automatically extract expense data from receipts, validate against policy, route for approval, and sync to accounting with 99% accuracy.',
    category: 'Finance',
    difficulty: 'Beginner',
    runtime: '~3 minutes',
    downloads: '19,567',
    rating: 4.8,
    reviews: 2134,
    tags: ['Finance', 'Expenses', 'OCR', 'Accounting', 'Approval', 'Compliance'],
    pricing: 'Free',
    lastUpdated: '2024-12-14',
    steps: [
      'Extract expense data from receipt images using OCR',
      'Categorize expenses and validate against company policy',
      'Flag out-of-policy items and duplicate submissions',
      'Route for appropriate approval based on amount and type',
      'Sync approved expenses to accounting system and reimburse'
    ],
    envVars: [
      { name: 'OCR_API_KEY', description: 'OCR service API key for receipt scanning', required: true },
      { name: 'ACCOUNTING_API_KEY', description: 'Accounting system API key', required: true },
      { name: 'APPROVAL_THRESHOLD', description: 'Amount requiring manager approval', required: true, default: '250' }
    ],
    integrations: ['Expensify', 'Concur', 'QuickBooks', 'Xero', 'NetSuite', 'Slack'],
    patchNotes: [
      { version: '2.1.0', date: '2024-12-14', changes: ['Improved OCR accuracy to 99%', 'Added multi-currency support', 'Policy violation detection'] }
    ]
  },
  {
    id: '16',
    name: 'Security Incident Response',
    description: 'Automated incident detection, triage, notification, and remediation workflow to reduce security incident response time by 80%.',
    category: 'Security',
    difficulty: 'Advanced',
    runtime: '~5 minutes',
    downloads: '4,567',
    rating: 4.9,
    reviews: 567,
    tags: ['Security', 'Incident Response', 'SIEM', 'Automation', 'SOC', 'Threat Detection'],
    pricing: '$99',
    lastUpdated: '2024-12-11',
    steps: [
      'Monitor security events from SIEM and threat detection tools',
      'Analyze and triage incidents using threat intelligence',
      'Notify security team with incident details and severity',
      'Execute automated containment actions (block IP, quarantine user)',
      'Generate incident reports and track remediation progress'
    ],
    envVars: [
      { name: 'SIEM_API_KEY', description: 'SIEM platform API key', required: true },
      { name: 'THREAT_INTEL_KEY', description: 'Threat intelligence API key', required: true },
      { name: 'FIREWALL_API_KEY', description: 'Firewall API key for automated blocking', required: false },
      { name: 'SEVERITY_THRESHOLD', description: 'Minimum severity for alerts', required: true, default: 'medium' }
    ],
    integrations: ['Splunk', 'Datadog', 'PagerDuty', 'Slack', 'ServiceNow', 'AWS Security Hub'],
    patchNotes: [
      { version: '1.7.0', date: '2024-12-11', changes: ['Added automated containment', 'MITRE ATT&CK mapping', 'Playbook automation'] }
    ]
  },
  {
    id: '17',
    name: 'Content Approval Workflow',
    description: 'Multi-stage content review and approval process with version control, stakeholder routing, feedback consolidation, and automated publishing to multiple channels.',
    category: 'Marketing',
    difficulty: 'Beginner',
    runtime: '~4 minutes',
    downloads: '24,789',
    rating: 4.7,
    reviews: 2134,
    tags: ['Content', 'Approval', 'Marketing', 'Collaboration', 'Publishing', 'Version Control'],
    pricing: 'Free',
    lastUpdated: '2024-12-16',
    steps: [
      'Content submission triggers workflow with automatic routing',
      'Parallel review by stakeholders with deadline tracking',
      'Feedback consolidation and change request management',
      'Final approval from designated approvers',
      'Automated publishing to designated channels and platforms'
    ],
    envVars: [
      { name: 'CMS_API_KEY', description: 'Content management system API key', required: true },
      { name: 'APPROVAL_CHAIN', description: 'JSON array of approval stages and approvers', required: true },
      { name: 'AUTO_PUBLISH', description: 'Enable automatic publishing after approval', required: false, default: 'false' }
    ],
    integrations: ['WordPress', 'Contentful', 'HubSpot', 'Slack', 'Google Docs', 'Airtable', 'Medium'],
    patchNotes: [
      { version: '1.4.0', date: '2024-12-16', changes: ['Added parallel approval paths', 'Version history tracking', 'Conditional routing based on content type'] }
    ]
  },
  {
    id: '18',
    name: 'Event Registration & Follow-up',
    description: 'Complete event management automation including registration, confirmation emails, reminder sequences, check-in, and post-event nurture campaigns.',
    category: 'Marketing',
    difficulty: 'Intermediate',
    runtime: '~6 minutes',
    downloads: '13,456',
    rating: 4.6,
    reviews: 1087,
    tags: ['Events', 'Marketing', 'Registration', 'Email', 'Nurture', 'Eventbrite'],
    pricing: '$19',
    lastUpdated: '2024-12-14',
    steps: [
      'Capture registration from landing page or event platform',
      'Send confirmation email with calendar invite and event details',
      'Automated reminder sequence (7 days, 1 day, 1 hour before)',
      'Digital check-in and attendance tracking',
      'Post-event nurture sequence with resources and feedback survey'
    ],
    envVars: [
      { name: 'EVENTBRITE_API_KEY', description: 'Eventbrite API for registration sync', required: true },
      { name: 'EMAIL_SERVICE_KEY', description: 'Email service API key', required: true },
      { name: 'CRM_SYNC_KEY', description: 'CRM API key for attendee sync', required: false }
    ],
    integrations: ['Eventbrite', 'Zoom', 'SendGrid', 'Mailchimp', 'HubSpot', 'Salesforce', 'Google Calendar'],
    patchNotes: [
      { version: '1.2.0', date: '2024-12-14', changes: ['Added virtual event support', 'Enhanced reminder customization', 'Post-event analytics'] }
    ]
  },
  {
    id: '19',
    name: 'Data Backup & Recovery Automation',
    description: 'Automated backup orchestration across cloud providers with encryption, versioning, integrity checks, and disaster recovery testing.',
    category: 'Operations',
    difficulty: 'Advanced',
    runtime: '~15 minutes',
    downloads: '5,234',
    rating: 4.9,
    reviews: 678,
    tags: ['Backup', 'Recovery', 'DevOps', 'Security', 'Cloud', 'Disaster Recovery'],
    pricing: '$49',
    lastUpdated: '2024-12-09',
    steps: [
      'Schedule and execute backups across multiple data sources',
      'Encrypt backup data with enterprise-grade encryption',
      'Store backups in geo-redundant locations with versioning',
      'Perform automated integrity checks and validation',
      'Run periodic recovery tests and generate compliance reports'
    ],
    envVars: [
      { name: 'AWS_ACCESS_KEY', description: 'AWS credentials for S3 storage', required: true },
      { name: 'BACKUP_SCHEDULE', description: 'Cron expression for backup schedule', required: true, default: '0 2 * * *' },
      { name: 'RETENTION_DAYS', description: 'Number of days to retain backups', required: true, default: '90' },
      { name: 'ENCRYPTION_KEY', description: 'Encryption key for backup data', required: true }
    ],
    integrations: ['AWS S3', 'Azure Blob', 'Google Cloud Storage', 'Veeam', 'Commvault', 'PagerDuty'],
    patchNotes: [
      { version: '2.0.0', date: '2024-12-09', changes: ['Added multi-cloud support', 'Automated recovery testing', 'Compliance reporting'] }
    ]
  },
  {
    id: '20',
    name: 'Subscription Renewal Management',
    description: 'Automate subscription lifecycle management with renewal predictions, proactive outreach, payment processing, and churn prevention workflows.',
    category: 'Customer Success',
    difficulty: 'Intermediate',
    runtime: '~5 minutes',
    downloads: '16,890',
    rating: 4.8,
    reviews: 1456,
    tags: ['Subscriptions', 'Renewals', 'Billing', 'Churn Prevention', 'Revenue', 'SaaS'],
    pricing: '$39',
    lastUpdated: '2024-12-15',
    steps: [
      'Monitor subscription data and identify upcoming renewals',
      'Calculate renewal probability using engagement and usage data',
      'Trigger proactive outreach for at-risk accounts',
      'Process renewals with automated payment handling',
      'Update subscription records and trigger expansion opportunities'
    ],
    envVars: [
      { name: 'STRIPE_API_KEY', description: 'Stripe API key for payment processing', required: true },
      { name: 'CRM_API_KEY', description: 'CRM API for account data', required: true },
      { name: 'RENEWAL_WINDOW', description: 'Days before renewal to start outreach', required: true, default: '60' }
    ],
    integrations: ['Stripe', 'Chargebee', 'Recurly', 'Salesforce', 'HubSpot', 'Intercom', 'ChartMogul'],
    patchNotes: [
      { version: '1.5.0', date: '2024-12-15', changes: ['ML-based renewal prediction', 'Automated win-back campaigns', 'Expansion opportunity detection'] }
    ]
  }
];

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'SDR Agent',
    type: 'SDR',
    description: 'Autonomous sales development and lead qualification agent that researches prospects, personalizes outreach at scale, and books qualified meetings with decision-makers.',
    features: ['Intelligent lead research across LinkedIn, company websites, and databases', 'Personalized email sequences with A/B testing', 'Meeting booking with calendar integration', 'Follow-up automation with engagement tracking', 'CRM sync and data enrichment', 'Performance analytics and conversion tracking'],
    status: 'Popular',
    deployment: 'Managed'
  },
  {
    id: '2',
    name: 'Support Agent',
    type: 'Support',
    description: '24/7 customer support and ticket resolution with natural language understanding, knowledge base integration, and escalation handling to resolve 70% of tickets automatically.',
    features: ['Instant responses across email, chat, and social media', 'Smart ticket routing based on sentiment and complexity', 'Knowledge base search with semantic matching', 'Sentiment analysis and empathy detection', 'Escalation handling to human agents', 'Multi-channel support (email, chat, phone, social)'],
    status: 'New',
    deployment: 'Hybrid'
  },
  {
    id: '3',
    name: 'Operations Agent',
    type: 'Operations',
    description: 'Workflow automation and process optimization across your entire tech stack with intelligent monitoring, anomaly detection, and self-healing capabilities.',
    features: ['Task automation across 1000+ integrations', 'Process monitoring with real-time dashboards', 'Alert management and intelligent routing', 'Performance tracking and bottleneck detection', 'Resource optimization and cost reduction', 'Anomaly detection with ML-powered insights'],
    status: 'Featured',
    deployment: 'Self-Hosted'
  },
  {
    id: '4',
    name: 'Research Agent',
    type: 'Research',
    description: 'Market research and competitive intelligence gathering with AI-powered analysis, web scraping, trend identification, and automated report generation.',
    features: ['Web scraping from 10,000+ sources', 'Data analysis with statistical modeling', 'Automated report generation with visualizations', 'Trend identification and forecasting', 'Competitive monitoring and benchmarking', 'Market insights with actionable recommendations'],
    status: 'Popular',
    deployment: 'Managed'
  },
  {
    id: '5',
    name: 'Content Agent',
    type: 'Content',
    description: 'Content creation and optimization for multiple channels with SEO analysis, engagement tracking, A/B testing, and performance-driven recommendations.',
    features: ['Content generation for blogs, social, and email', 'SEO optimization with keyword research', 'Multi-platform adaptation (LinkedIn, Twitter, etc.)', 'Quality control and brand voice consistency', 'A/B testing with statistical significance', 'Performance tracking and optimization'],
    status: 'New',
    deployment: 'Managed'
  },
  {
    id: '6',
    name: 'Finance Agent',
    type: 'Operations',
    description: 'Automated financial operations including invoice processing, expense tracking, budget monitoring, and financial reporting with real-time insights.',
    features: ['Invoice processing with 99% OCR accuracy', 'Expense categorization and policy enforcement', 'Budget monitoring with variance alerts', 'Financial reporting and forecasting', 'Anomaly detection for fraud prevention', 'Reconciliation automation across accounts'],
    status: 'Featured',
    deployment: 'Hybrid'
  },
  {
    id: '7',
    name: 'HR Agent',
    type: 'Operations',
    description: 'Human resources automation for recruiting, onboarding, employee engagement, performance management, and compliance tracking.',
    features: ['Resume screening with bias detection', 'Interview scheduling and coordination', 'Onboarding workflows with milestone tracking', 'Employee surveys and sentiment analysis', 'Performance tracking and review automation', 'Compliance monitoring (EEOC, GDPR, etc.)'],
    status: 'Popular',
    deployment: 'Managed'
  },
  {
    id: '8',
    name: 'QA Agent',
    type: 'Operations',
    description: 'Automated quality assurance and testing across applications with intelligent test generation, bug detection, and continuous integration.',
    features: ['Automated testing (unit, integration, E2E)', 'Bug detection with root cause analysis', 'Performance monitoring and load testing', 'Regression testing with change detection', 'Test reporting with actionable insights', 'CI/CD integration with deployment gates'],
    status: 'New',
    deployment: 'Self-Hosted'
  },
  {
    id: '9',
    name: 'Data Analysis Agent',
    type: 'Research',
    description: 'Advanced data analysis and business intelligence with ML models, predictive analytics, and automated insights generation.',
    features: ['Data ingestion from multiple sources', 'Statistical analysis and modeling', 'ML model training and deployment', 'Predictive analytics and forecasting', 'Automated insight generation', 'Interactive dashboards and visualizations'],
    status: 'Featured',
    deployment: 'Managed'
  },
  {
    id: '10',
    name: 'Account Executive Agent',
    type: 'SDR',
    description: 'AI-powered account executive that handles discovery calls, demos, proposal generation, negotiation, and deal closing.',
    features: ['Discovery call facilitation with note-taking', 'Demo presentation with personalization', 'Proposal generation with pricing optimization', 'Negotiation assistance with win-loss analysis', 'Deal closing with contract management', 'Pipeline management and forecasting'],
    status: 'New',
    deployment: 'Hybrid'
  },
  {
    id: '11',
    name: 'DevOps Agent',
    type: 'Operations',
    description: 'Infrastructure management, deployment automation, monitoring, and incident response for modern cloud-native applications.',
    features: ['Infrastructure as code management', 'Deployment automation with rollback', 'Monitoring and alerting across stack', 'Incident response and root cause analysis', 'Cost optimization recommendations', 'Security scanning and compliance checks'],
    status: 'Popular',
    deployment: 'Self-Hosted'
  },
  {
    id: '12',
    name: 'Legal Agent',
    type: 'Operations',
    description: 'Contract review, legal research, compliance checking, and document automation to reduce legal workload by 60%.',
    features: ['Contract review and risk analysis', 'Legal research across case law and regulations', 'Compliance checking (GDPR, SOC2, etc.)', 'Document automation and template generation', 'Clause recommendations and negotiation', 'Legal workflow management'],
    status: 'Featured',
    deployment: 'Managed'
  },
  {
    id: '13',
    name: 'Product Manager Agent',
    type: 'Product',
    description: 'Product discovery, roadmap planning, feature prioritization, user research synthesis, and stakeholder communication automation.',
    features: ['User feedback aggregation and analysis', 'Feature prioritization with scoring frameworks', 'Roadmap generation and maintenance', 'Stakeholder update automation', 'Competitive analysis tracking', 'Requirements documentation'],
    status: 'New',
    deployment: 'Managed'
  },
  {
    id: '14',
    name: 'Marketing Analyst Agent',
    type: 'Research',
    description: 'Campaign performance tracking, attribution modeling, ROI analysis, and automated reporting with actionable recommendations.',
    features: ['Multi-channel attribution modeling', 'Campaign performance dashboards', 'ROI calculation and forecasting', 'A/B test analysis with statistical significance', 'Automated insight generation', 'Competitive spend analysis'],
    status: 'Popular',
    deployment: 'Hybrid'
  },
  {
    id: '15',
    name: 'Procurement Agent',
    type: 'Operations',
    description: 'Vendor management, purchase order automation, contract negotiations, and spend optimization to reduce procurement costs by 25%.',
    features: ['Automated RFP creation and distribution', 'Vendor evaluation and scoring', 'Purchase order generation and tracking', 'Contract negotiation assistance', 'Spend analysis and optimization', 'Supplier performance monitoring'],
    status: 'Featured',
    deployment: 'Self-Hosted'
  },
  {
    id: '16',
    name: 'Social Media Manager Agent',
    type: 'Content',
    description: 'Social media strategy, content creation, scheduling, community management, and performance analytics across all platforms.',
    features: ['Multi-platform content adaptation', 'Optimal posting time recommendations', 'Hashtag strategy and research', 'Community engagement automation', 'Influencer identification and outreach', 'Social listening and sentiment tracking'],
    status: 'Popular',
    deployment: 'Managed'
  },
  {
    id: '17',
    name: 'Compliance Officer Agent',
    type: 'Operations',
    description: 'Regulatory compliance monitoring, policy enforcement, audit preparation, and risk assessment automation.',
    features: ['Regulatory change monitoring', 'Policy compliance checking', 'Audit trail generation', 'Risk assessment automation', 'Employee training tracking', 'Incident reporting and investigation'],
    status: 'New',
    deployment: 'Hybrid'
  },
  {
    id: '18',
    name: 'Customer Onboarding Agent',
    type: 'Support',
    description: 'Personalized onboarding journeys, milestone tracking, resource delivery, and success metric monitoring to ensure customer adoption.',
    features: ['Personalized onboarding path creation', 'Milestone tracking and celebration', 'Contextual resource delivery', 'Progress monitoring and intervention', 'Health score calculation', 'Automated check-ins and surveys'],
    status: 'Featured',
    deployment: 'Managed'
  }
];

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Sales Prompt Pack',
    type: 'Prompt Pack',
    description: 'Ready-to-use prompts for sales conversations, objection handling, closing techniques, and discovery questions. 150+ proven prompts used by top-performing SDRs.',
    category: 'Sales',
    downloads: '21,234',
    rating: 4.9,
    pricing: 'Free',
    fileSize: '2.5 MB',
    format: 'JSON'
  },
  {
    id: '2',
    name: 'B2B Lead Database',
    type: 'Dataset',
    description: 'Curated dataset of 50,000+ verified B2B contacts with firmographic data, including company size, revenue, industry, tech stack, and decision-maker information.',
    category: 'Data',
    downloads: '8,923',
    rating: 4.8,
    pricing: '$99',
    fileSize: '45 MB',
    format: 'CSV'
  },
  {
    id: '3',
    name: 'Marketing Automation Playbook',
    type: 'Playbook',
    description: 'Complete guide to building effective marketing automation with 20+ proven workflows, campaign templates, and best practices from Fortune 500 marketers.',
    category: 'Marketing',
    downloads: '34,567',
    rating: 4.9,
    pricing: '$49',
    fileSize: '8.2 MB',
    format: 'PDF'
  },
  {
    id: '4',
    name: 'Customer Service Templates',
    type: 'Template Bundle',
    description: 'Email templates, chat scripts, and response frameworks for all common support scenarios. Includes empathy statements, de-escalation techniques, and resolution paths.',
    category: 'Support',
    downloads: '16,789',
    rating: 4.7,
    pricing: 'Free',
    fileSize: '3.1 MB',
    format: 'DOCX'
  },
  {
    id: '5',
    name: 'Financial Dashboard Templates',
    type: 'Template Bundle',
    description: 'Pre-built dashboard templates for financial reporting and KPI tracking. Includes P&L, cash flow, budget variance, and executive summaries.',
    category: 'Finance',
    downloads: '7,823',
    rating: 4.8,
    pricing: '$79',
    fileSize: '12 MB',
    format: 'XLSX'
  },
  {
    id: '6',
    name: 'Customer Success Prompt Library',
    type: 'Prompt Pack',
    description: 'AI prompts for customer onboarding, health scoring, retention strategies, upsell conversations, and renewal negotiations. 200+ battle-tested prompts.',
    category: 'Customer Success',
    downloads: '18,945',
    rating: 4.8,
    pricing: '$29',
    fileSize: '3.4 MB',
    format: 'JSON'
  },
  {
    id: '7',
    name: 'Industry Benchmark Dataset',
    type: 'Dataset',
    description: 'Comprehensive industry benchmarks across 15 verticals with 500+ metrics including CAC, LTV, churn rate, conversion rates, and operational KPIs.',
    category: 'Data',
    downloads: '12,456',
    rating: 4.6,
    pricing: '$149',
    fileSize: '28 MB',
    format: 'CSV'
  },
  {
    id: '8',
    name: 'Product Launch Playbook',
    type: 'Playbook',
    description: '90-day product launch framework with templates, checklists, automation workflows, and GTM strategies. Used by 500+ successful product launches.',
    category: 'Product',
    downloads: '26,789',
    rating: 4.9,
    pricing: '$79',
    fileSize: '15 MB',
    format: 'PDF'
  },
  {
    id: '9',
    name: 'Social Media Content Calendar',
    type: 'Template Bundle',
    description: 'Pre-filled 3-month content calendar with 200+ post templates, hashtag strategies, and engagement tactics for LinkedIn, Twitter, Facebook, and Instagram.',
    category: 'Marketing',
    downloads: '41,234',
    rating: 4.7,
    pricing: 'Free',
    fileSize: '5.6 MB',
    format: 'XLSX'
  },
  {
    id: '10',
    name: 'Engineering Prompt Collection',
    type: 'Prompt Pack',
    description: 'Code review, debugging, architecture design, and technical documentation prompts for development teams. Includes prompts for 10+ programming languages.',
    category: 'Engineering',
    downloads: '15,678',
    rating: 4.9,
    pricing: '$39',
    fileSize: '4.1 MB',
    format: 'JSON'
  },
  {
    id: '11',
    name: 'HR Compliance Checklist Bundle',
    type: 'Template Bundle',
    description: 'Complete compliance checklists for hiring, onboarding, offboarding, performance reviews, and terminations. Covers EEOC, GDPR, and state-specific requirements.',
    category: 'HR',
    downloads: '9,234',
    rating: 4.8,
    pricing: '$59',
    fileSize: '6.8 MB',
    format: 'DOCX'
  },
  {
    id: '12',
    name: 'E-commerce Product Data',
    type: 'Dataset',
    description: '100,000+ product listings with descriptions, pricing, performance metrics, customer reviews, and competitive intelligence from major marketplaces.',
    category: 'E-commerce',
    downloads: '6,834',
    rating: 4.7,
    pricing: '$199',
    fileSize: '85 MB',
    format: 'CSV'
  },
  {
    id: '13',
    name: 'Investor Pitch Deck Templates',
    type: 'Template Bundle',
    description: 'Proven pitch deck templates from 50+ funded startups. Includes seed, Series A, and growth stage decks with storytelling frameworks.',
    category: 'Fundraising',
    downloads: '19,567',
    rating: 4.9,
    pricing: '$89',
    fileSize: '25 MB',
    format: 'PPTX'
  },
  {
    id: '14',
    name: 'API Integration Cookbook',
    type: 'Playbook',
    description: 'Step-by-step integration guides for 100+ popular APIs including authentication, rate limiting, error handling, and best practices.',
    category: 'Engineering',
    downloads: '13,456',
    rating: 4.8,
    pricing: 'Free',
    fileSize: '7.3 MB',
    format: 'PDF'
  },
  {
    id: '15',
    name: 'Customer Interview Script Library',
    type: 'Template Bundle',
    description: 'Interview scripts for discovery, user research, feedback collection, churn analysis, and feature validation. Includes question frameworks and analysis templates.',
    category: 'Product',
    downloads: '22,345',
    rating: 4.7,
    pricing: '$29',
    fileSize: '4.5 MB',
    format: 'DOCX'
  },
  {
    id: '16',
    name: 'SEO Keyword Database',
    type: 'Dataset',
    description: '500,000+ SEO keywords with search volume, difficulty scores, CPC data, and SERP analysis across 20 industries.',
    category: 'Marketing',
    downloads: '11,234',
    rating: 4.6,
    pricing: '$129',
    fileSize: '62 MB',
    format: 'CSV'
  },
  {
    id: '17',
    name: 'Operations Playbook Collection',
    type: 'Playbook',
    description: 'Comprehensive operations management frameworks including process optimization, team scaling, vendor management, and efficiency improvement strategies.',
    category: 'Operations',
    downloads: '14,567',
    rating: 4.8,
    pricing: '$69',
    fileSize: '18 MB',
    format: 'PDF'
  },
  {
    id: '18',
    name: 'AI Prompt Engineering Guide',
    type: 'Playbook',
    description: 'Master prompt engineering with 300+ examples, frameworks, and best practices. Covers all major LLM providers and use cases.',
    category: 'AI',
    downloads: '42,890',
    rating: 4.9,
    pricing: 'Free',
    fileSize: '6.4 MB',
    format: 'PDF'
  },
  {
    id: '19',
    name: 'Customer Success Metrics Dashboard',
    type: 'Template Bundle',
    description: 'Pre-built dashboards for tracking NPS, CSAT, health scores, churn risk, expansion opportunities, and team performance metrics.',
    category: 'Customer Success',
    downloads: '9,876',
    rating: 4.7,
    pricing: '$59',
    fileSize: '8.9 MB',
    format: 'XLSX'
  },
  {
    id: '20',
    name: 'Security Policy Templates',
    type: 'Template Bundle',
    description: 'Complete security policy documentation including access control, incident response, data protection, and acceptable use policies.',
    category: 'Security',
    downloads: '7,654',
    rating: 4.8,
    pricing: '$89',
    fileSize: '5.2 MB',
    format: 'DOCX'
  },
  {
    id: '21',
    name: 'Sales Enablement Kit',
    type: 'Playbook',
    description: 'Battle cards, objection handlers, demo scripts, proposal templates, and closing techniques from top-performing sales teams.',
    category: 'Sales',
    downloads: '28,345',
    rating: 4.9,
    pricing: '$79',
    fileSize: '14 MB',
    format: 'PDF'
  },
  {
    id: '22',
    name: 'User Behavior Analytics Dataset',
    type: 'Dataset',
    description: 'Anonymized user behavior data with 10M+ sessions including clickstream, conversion funnels, and engagement patterns.',
    category: 'Data',
    downloads: '4,567',
    rating: 4.6,
    pricing: '$199',
    fileSize: '120 MB',
    format: 'CSV'
  },
  {
    id: '23',
    name: 'DevOps Automation Scripts',
    type: 'Template Bundle',
    description: 'Ready-to-use automation scripts for CI/CD, deployment, monitoring, backup, and infrastructure management across cloud providers.',
    category: 'Engineering',
    downloads: '19,234',
    rating: 4.8,
    pricing: 'Free',
    fileSize: '4.7 MB',
    format: 'ZIP'
  },
  {
    id: '24',
    name: 'Competitive Intelligence Prompts',
    type: 'Prompt Pack',
    description: 'AI prompts for competitive analysis, market research, feature comparison, pricing strategy, and positioning analysis.',
    category: 'Strategy',
    downloads: '12,678',
    rating: 4.7,
    pricing: '$39',
    fileSize: '2.8 MB',
    format: 'JSON'
  }
];

export const mockCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'SaaS Company Achieves 23% MQL Uplift in 72 Hours',
    company: 'TechFlow',
    industry: 'B2B SaaS',
    challenge: 'Manual lead routing causing 4-hour delays and 30% missed opportunities. Sales team spending 15 hours/week on lead qualification instead of selling.',
    solution: 'Automated lead scoring system with real-time enrichment, intelligent routing based on territory and rep availability, and instant Slack notifications with lead context.',
    results: [
      { metric: 'MQL Conversion', value: '+23%', icon: 'TrendingUp' },
      { metric: 'Response Time', value: '-67%', icon: 'Clock' },
      { metric: 'Sales Team Efficiency', value: '+40%', icon: 'Users' }
    ],
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'E-commerce Giant Reduces Support Costs by 60%',
    company: 'ShopNow',
    industry: 'E-commerce',
    challenge: 'Overwhelming support ticket volume of 10,000+/month with 24-hour average response time. Customer satisfaction scores dropping to 3.2/5.',
    solution: 'AI-powered support agent with automated ticket triage, sentiment analysis, knowledge base integration, and 24/7 availability across all channels.',
    results: [
      { metric: 'Support Costs', value: '-60%', icon: 'DollarSign' },
      { metric: 'Resolution Time', value: '-75%', icon: 'Clock' },
      { metric: 'Customer Satisfaction', value: '+45%', icon: 'Heart' }
    ],
    image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Fintech Startup Processes 10,000 Invoices Monthly',
    company: 'PayFast',
    industry: 'Financial Services',
    challenge: 'Manual invoice processing taking 2 days per invoice with 15% error rate. Finance team overwhelmed, causing vendor payment delays and relationship issues.',
    solution: 'Automated invoice processing workflow with OCR extraction, validation against POs, approval routing, and direct integration to accounting system.',
    results: [
      { metric: 'Processing Time', value: '-85%', icon: 'Zap' },
      { metric: 'Error Rate', value: '-92%', icon: 'ShieldCheck' },
      { metric: 'Cost Savings', value: '$180K/year', icon: 'DollarSign' }
    ],
    image: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: '4',
    title: 'Healthcare Provider Improves Patient Onboarding by 3x',
    company: 'HealthFirst',
    industry: 'Healthcare',
    challenge: 'Complex patient onboarding with 15+ touchpoints taking 45 days. 40% of patients abandoning process due to complexity and poor communication.',
    solution: 'End-to-end automated patient onboarding with personalized communication, document collection, insurance verification, and appointment scheduling.',
    results: [
      { metric: 'Onboarding Speed', value: '3x faster', icon: 'TrendingUp' },
      { metric: 'Patient Satisfaction', value: '+55%', icon: 'Heart' },
      { metric: 'Admin Time', value: '-70%', icon: 'Clock' }
    ],
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: '5',
    title: 'Manufacturing Firm Cuts Downtime by 80%',
    company: 'IndustryCo',
    industry: 'Manufacturing',
    challenge: 'Unplanned equipment downtime costing $2M annually. Reactive maintenance approach causing production delays and quality issues.',
    solution: 'Predictive maintenance automation with IoT integration, anomaly detection, automated work order creation, and spare parts inventory management.',
    results: [
      { metric: 'Downtime', value: '-80%', icon: 'Activity' },
      { metric: 'Maintenance Costs', value: '-45%', icon: 'DollarSign' },
      { metric: 'Equipment Lifespan', value: '+30%', icon: 'TrendingUp' }
    ],
    image: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: '6',
    title: 'Real Estate Platform Automates 95% of Lead Follow-ups',
    company: 'HomeMatch',
    industry: 'Real Estate',
    challenge: 'Sales team of 50 agents overwhelmed by 5,000+ leads/month. 60% of leads never contacted due to volume. Hot prospects going cold.',
    solution: 'AI-powered SDR agent with intelligent lead prioritization, personalized email sequences, automated follow-ups, and calendar booking.',
    results: [
      { metric: 'Response Rate', value: '+156%', icon: 'MessageSquare' },
      { metric: 'Qualified Leads', value: '+89%', icon: 'Target' },
      { metric: 'Deal Velocity', value: '2.5x faster', icon: 'Zap' }
    ],
    image: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: '7',
    title: 'Media Company Scales Content Production 10x',
    company: 'ContentPro',
    industry: 'Media & Publishing',
    challenge: 'Content team of 20 writers producing 100 articles/month. Demand for 1,000+/month to compete. Quality and SEO suffering.',
    solution: 'Content agent with AI-powered writing assistance, SEO optimization, fact-checking, multi-platform adaptation, and performance tracking.',
    results: [
      { metric: 'Content Output', value: '10x increase', icon: 'TrendingUp' },
      { metric: 'SEO Rankings', value: '+215%', icon: 'Search' },
      { metric: 'Production Cost', value: '-70%', icon: 'DollarSign' }
    ],
    image: 'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  },
  {
    id: '8',
    title: 'Logistics Company Optimizes Delivery Routes, Saves $2M',
    company: 'FastShip',
    industry: 'Logistics',
    challenge: 'Inefficient routing causing 15% excess fuel costs and late deliveries. Manual route planning taking 5 hours/day.',
    solution: 'Operations agent with AI-powered route optimization, real-time traffic integration, delivery time predictions, and driver coordination.',
    results: [
      { metric: 'Fuel Costs', value: '-22%', icon: 'DollarSign' },
      { metric: 'On-Time Delivery', value: '+34%', icon: 'Clock' },
      { metric: 'Annual Savings', value: '$2M', icon: 'TrendingUp' }
    ],
    image: 'https://images.pexels.com/photos/4246237/pexels-photo-4246237.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Business Automation in 2025',
    excerpt: 'Explore the latest trends and technologies shaping the automation landscape. From AI agents to no-code platforms, discover what every business leader needs to know about automation in 2025 and beyond.',
    content: 'Full blog post content here...',
    category: 'Automation',
    author: 'Sarah Chen',
    publishedAt: new Date('2024-12-15'),
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['automation', 'AI', 'trends']
  },
  {
    id: '2',
    title: 'How AI Agents Are Transforming Customer Support',
    excerpt: 'Discover how autonomous AI agents are revolutionizing customer service operations. Learn how companies are achieving 70% ticket auto-resolution rates while improving satisfaction scores.',
    content: 'Full blog post content here...',
    category: 'AI Agents',
    author: 'Marcus Rodriguez',
    publishedAt: new Date('2024-12-10'),
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['AI', 'customer-support', 'agents']
  },
  {
    id: '3',
    title: 'Building Scalable Workflows: Best Practices',
    excerpt: 'Learn the essential principles for creating workflows that grow with your business. Covers error handling, monitoring, versioning, and optimization strategies used by Fortune 500 companies.',
    content: 'Full blog post content here...',
    category: 'Workflows',
    author: 'Emily Watson',
    publishedAt: new Date('2024-12-05'),
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['workflows', 'best-practices', 'scalability']
  },
  {
    id: '4',
    title: 'The ROI of Marketing Automation: A Data-Driven Analysis',
    excerpt: 'Comprehensive breakdown of marketing automation ROI based on 500+ implementations. Includes benchmarks, payback periods, and hidden costs to consider.',
    content: 'Full blog post content here...',
    category: 'Marketing',
    author: 'David Kim',
    publishedAt: new Date('2024-11-28'),
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['marketing', 'ROI', 'analytics']
  },
  {
    id: '5',
    title: 'Security Best Practices for Enterprise Automation',
    excerpt: 'Essential security measures for implementing automation at enterprise scale. Covers access control, secrets management, audit logging, and compliance requirements.',
    content: 'Full blog post content here...',
    category: 'Security',
    author: 'Lisa Park',
    publishedAt: new Date('2024-11-20'),
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['security', 'enterprise', 'compliance']
  },
  {
    id: '6',
    title: 'From Manual to Automated: A Migration Guide',
    excerpt: 'Step-by-step guide for transitioning from manual processes to full automation. Includes change management strategies, success metrics, and common pitfalls to avoid.',
    content: 'Full blog post content here...',
    category: 'Guides',
    author: 'James Wilson',
    publishedAt: new Date('2024-11-15'),
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['migration', 'automation', 'implementation']
  },
  {
    id: '7',
    title: 'AI Agent Architecture: Behind the Scenes',
    excerpt: 'Deep dive into the technical architecture powering autonomous AI agents. Covers LLM orchestration, memory systems, tool use, and multi-agent coordination.',
    content: 'Full blog post content here...',
    category: 'Technical',
    author: 'Rachel Green',
    publishedAt: new Date('2024-11-10'),
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['architecture', 'AI', 'technical']
  },
  {
    id: '8',
    title: 'Measuring Automation Success: Key Metrics',
    excerpt: 'Essential KPIs and metrics to track your automation initiatives. Learn how to measure time savings, error reduction, ROI, and business impact.',
    content: 'Full blog post content here...',
    category: 'Analytics',
    author: 'Michael Brown',
    publishedAt: new Date('2024-11-05'),
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['metrics', 'analytics', 'KPIs']
  },
  {
    id: '9',
    title: 'No-Code vs Low-Code vs Full-Code: Choosing the Right Approach',
    excerpt: 'Compare automation approaches and learn when to use each. Includes decision framework, trade-offs, and real-world examples from various industries.',
    content: 'Full blog post content here...',
    category: 'Strategy',
    author: 'Jennifer Martinez',
    publishedAt: new Date('2024-10-30'),
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/3861951/pexels-photo-3861951.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['no-code', 'low-code', 'strategy']
  },
  {
    id: '10',
    title: 'The Ethics of AI Automation: A Framework for Responsible Deployment',
    excerpt: 'Explore ethical considerations in AI automation including bias, transparency, accountability, and human oversight. Practical framework for ethical AI deployment.',
    content: 'Full blog post content here...',
    category: 'Ethics',
    author: 'Dr. Amit Patel',
    publishedAt: new Date('2024-10-25'),
    readTime: '11 min read',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['ethics', 'AI', 'responsibility']
  },
  {
    id: '11',
    title: 'Integrating 1000+ Apps: The API Orchestration Challenge',
    excerpt: 'How to manage integrations at scale. Covers API design patterns, rate limiting, error handling, versioning, and maintaining reliability across complex systems.',
    content: 'Full blog post content here...',
    category: 'Technical',
    author: 'Robert Chang',
    publishedAt: new Date('2024-10-20'),
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['API', 'integrations', 'architecture']
  },
  {
    id: '12',
    title: 'Automating Sales: From Lead to Close in 48 Hours',
    excerpt: 'Case study on building a fully automated sales process. Includes lead qualification, nurturing, meeting booking, and deal closing workflows that convert 3x faster.',
    content: 'Full blog post content here...',
    category: 'Sales',
    author: 'Alex Thompson',
    publishedAt: new Date('2024-10-15'),
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    tags: ['sales', 'automation', 'conversion']
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'VP Operations',
    company: 'TechFlow',
    quote: 'Findawise transformed our operations completely. We now run 10x faster with half the manual work. The ROI was immediate and continues to compound monthly.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Founder & CEO',
    company: 'GrowthLabs',
    quote: 'The automation platform is incredible. Our MQL conversion jumped 23% in the first week. Best investment we made this year, hands down.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Watson',
    role: 'Head of Revenue',
    company: 'ScaleUp Inc',
    quote: 'Finally, a platform that connects decision-making with execution. The workflow store saved us months of development time and thousands in consulting fees.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'CTO',
    company: 'DataStream',
    quote: 'The platform architecture is solid, secure, and scales beautifully. Our team loves the developer experience. Self-hosting was seamless.',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '5',
    name: 'Lisa Park',
    role: 'Chief Marketing Officer',
    company: 'BrandBoost',
    quote: 'The marketing automation workflows have completely transformed our campaign execution. ROI increased by 300% and we reduced CAC by 40%.',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Director of Customer Success',
    company: 'SupportPro',
    quote: 'Our support team handles 3x more tickets with the same headcount. Customer satisfaction scores have never been higher. Resolution time down 75%.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '7',
    name: 'Jennifer Martinez',
    role: 'CFO',
    company: 'FinanceFirst',
    quote: 'The invoice processing automation alone saved us over $200K annually. The ROI was immediate and measurable. Every finance team needs this.',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '8',
    name: 'Robert Chang',
    role: 'VP Engineering',
    company: 'DevOps Pro',
    quote: 'Self-hosting our agents was seamless. The platform gives us full control while maintaining ease of use. Documentation is comprehensive and support is outstanding.',
    avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '9',
    name: 'Amanda Foster',
    role: 'VP of Sales',
    company: 'SalesForce Pro',
    quote: 'Our SDR team productivity increased 5x. The AI agent handles all the repetitive work so our reps focus on building relationships. Game changer.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '10',
    name: 'Michael Chen',
    role: 'Head of Product',
    company: 'ProductLab',
    quote: 'The platform enables us to ship features 3x faster. Automation workflows free up our team to focus on innovation instead of repetitive tasks.',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '11',
    name: 'Rachel Johnson',
    role: 'Chief People Officer',
    company: 'TalentHub',
    quote: 'HR automation reduced our time-to-hire by 65% and improved candidate experience scores by 50%. The recruiting workflow is brilliant.',
    avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  },
  {
    id: '12',
    name: 'Tom Anderson',
    role: 'Director of IT',
    company: 'SecureOps',
    quote: 'Security and compliance automation gave us peace of mind. Incident response time down 80%. The audit trail functionality is exactly what we needed.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    rating: 5
  }
];
