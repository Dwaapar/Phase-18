/*
  # Seed Platform Data

  1. Data
    - Sample workflows across different categories
    - Sample AI agents for different use cases
    - Sample digital assets for users

  2. Notes
    - All data is production-ready
    - Proper ratings and download counts included
    - Comprehensive descriptions and features
*/

-- Seed Workflows
INSERT INTO workflows (name, description, category, difficulty, runtime, downloads, rating, reviews, tags, pricing, integrations) VALUES
('Lead Qualification Pipeline', 'Automatically qualify and route leads based on engagement, company size, and buying signals. Integrates with your CRM and sales tools.', 'Sales & Marketing', 'Intermediate', '~5 minutes', 1247, 4.8, 156, ARRAY['sales', 'crm', 'automation', 'leads'], 'Free', ARRAY['Salesforce', 'HubSpot', 'Slack']),
('Customer Onboarding Flow', 'Complete customer onboarding automation with welcome emails, account setup, and training resource delivery. Ensures every customer gets started right.', 'Customer Success', 'Beginner', '~3 minutes', 2134, 4.9, 289, ARRAY['onboarding', 'customer-success', 'email'], 'Free', ARRAY['Intercom', 'Stripe', 'SendGrid']),
('Invoice Processing Bot', 'Extract data from invoices, validate against purchase orders, and route for approval. Reduces manual processing time by 80%.', 'Finance & Operations', 'Advanced', '~8 minutes', 891, 4.7, 112, ARRAY['finance', 'accounting', 'automation'], 'Premium', ARRAY['QuickBooks', 'Xero', 'DocuSign']),
('Social Media Scheduler', 'Schedule and publish content across multiple social media platforms. Track engagement and optimize posting times automatically.', 'Marketing', 'Beginner', '~4 minutes', 3421, 4.6, 445, ARRAY['social-media', 'marketing', 'content'], 'Free', ARRAY['Twitter', 'LinkedIn', 'Facebook']),
('Support Ticket Triage', 'Automatically categorize, prioritize, and route support tickets based on urgency and topic. Reduces response time by 60%.', 'Customer Support', 'Intermediate', '~6 minutes', 1567, 4.8, 201, ARRAY['support', 'helpdesk', 'automation'], 'Premium', ARRAY['Zendesk', 'Freshdesk', 'Slack']),
('E-commerce Order Fulfillment', 'Automate order processing from payment to shipping. Track inventory, generate shipping labels, and send customer updates.', 'E-commerce', 'Advanced', '~10 minutes', 743, 4.9, 98, ARRAY['ecommerce', 'fulfillment', 'inventory'], 'Premium', ARRAY['Shopify', 'WooCommerce', 'ShipStation']),
('Content Publication Pipeline', 'Streamline content creation from draft to publish. Includes review workflows, SEO optimization, and multi-channel distribution.', 'Content & Marketing', 'Intermediate', '~7 minutes', 1089, 4.7, 134, ARRAY['content', 'publishing', 'cms'], 'Free', ARRAY['WordPress', 'Contentful', 'Medium']),
('HR Onboarding Automation', 'Automate new hire paperwork, IT setup requests, and first-week task scheduling. Creates a consistent onboarding experience.', 'HR & Operations', 'Beginner', '~5 minutes', 654, 4.6, 87, ARRAY['hr', 'onboarding', 'employee'], 'Free', ARRAY['BambooHR', 'Workday', 'Slack']),
('Sales Report Generator', 'Automatically compile sales data from multiple sources and generate weekly/monthly reports with insights and trends.', 'Sales & Analytics', 'Intermediate', '~6 minutes', 1923, 4.8, 245, ARRAY['sales', 'reporting', 'analytics'], 'Premium', ARRAY['Salesforce', 'Google Sheets', 'Tableau']),
('Email Campaign Optimizer', 'A/B test email campaigns, analyze performance, and automatically optimize send times and content for better engagement.', 'Marketing', 'Advanced', '~9 minutes', 1345, 4.7, 178, ARRAY['email', 'marketing', 'optimization'], 'Premium', ARRAY['Mailchimp', 'SendGrid', 'HubSpot']),
('Inventory Reorder System', 'Monitor inventory levels and automatically create purchase orders when stock falls below thresholds. Prevents stockouts.', 'Operations', 'Intermediate', '~5 minutes', 567, 4.5, 71, ARRAY['inventory', 'purchasing', 'operations'], 'Free', ARRAY['QuickBooks', 'NetSuite', 'Slack']),
('Meeting Scheduler Bot', 'Automatically schedule meetings by checking participant availability, sending invites, and adding to calendars.', 'Productivity', 'Beginner', '~3 minutes', 4521, 4.9, 612, ARRAY['meetings', 'scheduling', 'calendar'], 'Free', ARRAY['Google Calendar', 'Outlook', 'Zoom']),
('Customer Feedback Loop', 'Collect, analyze, and route customer feedback to relevant teams. Track sentiment trends and identify improvement opportunities.', 'Customer Success', 'Intermediate', '~7 minutes', 1234, 4.8, 167, ARRAY['feedback', 'surveys', 'customer-success'], 'Premium', ARRAY['SurveyMonkey', 'Typeform', 'Slack']),
('Compliance Document Manager', 'Automate document collection, verification, and compliance reporting. Ensures regulatory requirements are met.', 'Legal & Compliance', 'Advanced', '~10 minutes', 423, 4.6, 54, ARRAY['compliance', 'legal', 'documents'], 'Premium', ARRAY['DocuSign', 'Box', 'SharePoint']),
('Lead Nurture Campaign', 'Multi-touch lead nurturing with personalized emails, content recommendations, and engagement tracking.', 'Sales & Marketing', 'Intermediate', '~8 minutes', 2156, 4.9, 301, ARRAY['leads', 'nurture', 'email'], 'Free', ARRAY['HubSpot', 'Marketo', 'Salesforce'])
ON CONFLICT DO NOTHING;

-- Seed AI Agents
INSERT INTO agents (name, type, description, features, status, deployment) VALUES
('Sales Development Agent', 'SDR', 'AI-powered SDR that qualifies leads, schedules meetings, and personalizes outreach. Handles first touchpoints automatically.', ARRAY['Lead qualification', 'Email outreach', 'Meeting scheduling', 'CRM integration', 'Performance analytics'], 'Popular', 'Managed'),
('Customer Support Agent', 'Support', 'Intelligent support agent that answers common questions, troubleshoots issues, and escalates complex cases to human agents.', ARRAY['Natural language understanding', 'Knowledge base integration', 'Multi-channel support', 'Sentiment analysis', 'Auto-escalation'], 'Popular', 'Managed'),
('Operations Coordinator', 'Operations', 'Streamlines internal operations by managing workflows, coordinating between teams, and automating routine tasks.', ARRAY['Workflow orchestration', 'Team coordination', 'Task automation', 'Status reporting', 'Integration management'], 'Featured', 'Managed'),
('Sales Insights Agent', 'SDR', 'Analyzes sales conversations and provides real-time insights, recommendations, and next-best actions for sales teams.', ARRAY['Conversation analysis', 'Deal insights', 'Risk identification', 'Coaching recommendations', 'Pipeline analytics'], 'New', 'Self-hosted'),
('Technical Support Agent', 'Support', 'Specialized agent for technical product support with debugging capabilities and integration with engineering tools.', ARRAY['Technical troubleshooting', 'Log analysis', 'Bug reporting', 'Documentation access', 'Engineering handoff'], 'Featured', 'Hybrid'),
('Account Management Agent', 'SDR', 'Manages existing customer relationships, identifies upsell opportunities, and ensures customer satisfaction.', ARRAY['Relationship tracking', 'Upsell detection', 'Health scoring', 'Renewal management', 'Success planning'], 'Popular', 'Managed'),
('IT Help Desk Agent', 'Support', 'Handles IT support requests, password resets, software issues, and hardware troubleshooting with integration to IT systems.', ARRAY['IT support', 'Ticket routing', 'Password resets', 'Software troubleshooting', 'Asset management'], 'New', 'Self-hosted'),
('Data Operations Agent', 'Operations', 'Manages data pipelines, monitors data quality, and ensures data compliance across systems.', ARRAY['Data pipeline management', 'Quality monitoring', 'Compliance checks', 'Error handling', 'Reporting'], 'Featured', 'Managed')
ON CONFLICT DO NOTHING;

-- Seed Assets
INSERT INTO assets (name, type, description, category, downloads, rating, pricing, file_size, format) VALUES
('AI Prompt Library - Sales', 'Prompt Pack', 'Collection of 50+ tested prompts for sales outreach, qualification, and objection handling. Includes templates for different industries.', 'Sales', 3421, 4.8, 'Free', '2.4 MB', 'PDF + JSON'),
('Customer Data Schema', 'Dataset', 'Comprehensive customer data schema with validation rules, normalization standards, and example data for CRM setup.', 'Data & Analytics', 1567, 4.7, 'Premium', '5.1 MB', 'CSV + SQL'),
('Go-to-Market Playbook', 'Playbook', 'Complete GTM strategy playbook covering market research, positioning, launch planning, and growth tactics for B2B SaaS.', 'Strategy', 2345, 4.9, 'Premium', '8.7 MB', 'PDF'),
('Social Media Templates', 'Creative Bundle', 'Ready-to-use social media templates for LinkedIn, Twitter, and Facebook. Includes post formats, image templates, and content calendars.', 'Marketing', 4532, 4.6, 'Free', '45.2 MB', 'Figma + PNG'),
('Sales Email Sequences', 'Prompt Pack', '15 proven email sequences for outbound sales with follow-up templates, personalization tips, and conversion optimization.', 'Sales', 2789, 4.8, 'Free', '1.8 MB', 'PDF + TXT'),
('Product Analytics Dataset', 'Dataset', 'Sample product usage data with user behavior patterns, feature adoption metrics, and churn indicators for analytics practice.', 'Data & Analytics', 891, 4.5, 'Premium', '12.3 MB', 'CSV'),
('Customer Success Playbook', 'Playbook', 'End-to-end customer success framework covering onboarding, adoption, expansion, and retention strategies.', 'Customer Success', 1678, 4.9, 'Premium', '6.4 MB', 'PDF'),
('Website Copy Templates', 'Creative Bundle', 'High-converting website copy templates for landing pages, pricing pages, about pages, and CTAs across different industries.', 'Marketing', 3245, 4.7, 'Free', '3.2 MB', 'DOCX + TXT'),
('Automation Workflow Prompts', 'Prompt Pack', '100+ prompts for building and optimizing automation workflows. Covers common use cases and troubleshooting scenarios.', 'Automation', 1456, 4.8, 'Premium', '3.1 MB', 'JSON + PDF'),
('User Research Dataset', 'Dataset', 'Anonymized user research data including survey responses, interview transcripts, and behavioral data for analysis practice.', 'Research', 634, 4.6, 'Premium', '8.9 MB', 'CSV + PDF'),
('Content Marketing Playbook', 'Playbook', 'Complete content marketing strategy including content planning, SEO optimization, distribution tactics, and measurement frameworks.', 'Marketing', 2134, 4.9, 'Premium', '7.8 MB', 'PDF'),
('Email Design Templates', 'Creative Bundle', 'Beautiful, responsive email templates for newsletters, announcements, and campaigns. Includes HTML and design files.', 'Design', 3567, 4.7, 'Free', '28.4 MB', 'HTML + Figma'),
('Support Response Library', 'Prompt Pack', '200+ support response templates covering common questions, technical issues, and escalation scenarios.', 'Support', 1923, 4.8, 'Free', '2.7 MB', 'TXT + JSON'),
('Market Research Dataset', 'Dataset', 'Comprehensive market data including industry trends, competitor analysis, and customer segments across multiple verticals.', 'Strategy', 745, 4.6, 'Premium', '15.6 MB', 'XLSX + CSV'),
('Onboarding Playbook', 'Playbook', 'Step-by-step employee onboarding framework covering first day to 90 days with checklists, templates, and best practices.', 'HR & Operations', 1234, 4.7, 'Premium', '5.3 MB', 'PDF + DOCX')
ON CONFLICT DO NOTHING;
