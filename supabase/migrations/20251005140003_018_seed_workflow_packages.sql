/*
  # Seed Workflow Packages

  Create industry-specific workflow bundles with appropriate pricing tiers
*/

-- Insert Workflow Packages for different industries
INSERT INTO workflow_packages (name, slug, industry, description, pricing_tier, discount_percentage) VALUES
('SaaS Starter Pack', 'saas-starter', 'SaaS', 'Essential workflows for early-stage SaaS companies including lead management, onboarding, and customer success', 'Free', 0),
('SaaS Growth Bundle', 'saas-growth', 'SaaS', 'Scale your SaaS business with advanced workflows for sales, marketing, customer success, and analytics', 'Professional', 15),
('SaaS Enterprise Suite', 'saas-enterprise', 'SaaS', 'Complete enterprise solution with advanced automation for all departments and custom integrations', 'Enterprise', 20),

('E-commerce Essentials', 'ecommerce-essentials', 'E-commerce', 'Core e-commerce workflows including order processing, inventory management, and customer communication', 'Free', 0),
('E-commerce Pro Package', 'ecommerce-pro', 'E-commerce', 'Professional e-commerce automation with abandoned cart recovery, personalization, and loyalty programs', 'Professional', 15),
('E-commerce Enterprise', 'ecommerce-enterprise', 'E-commerce', 'Enterprise e-commerce suite with advanced analytics, multi-channel sync, and AI-powered optimization', 'Enterprise', 25),

('Fintech Foundation', 'fintech-foundation', 'Fintech', 'Essential financial workflows including payments, compliance, and reporting automation', 'Free', 0),
('Fintech Advanced', 'fintech-advanced', 'Fintech', 'Advanced fintech workflows with fraud detection, risk management, and regulatory compliance', 'Professional', 20),
('Fintech Enterprise', 'fintech-enterprise', 'Fintech', 'Complete fintech automation with AI-powered analytics, advanced security, and custom integrations', 'Enterprise', 25),

('Healthcare Basics', 'healthcare-basics', 'Healthcare', 'HIPAA-compliant workflows for patient management, scheduling, and communication', 'Free', 0),
('Healthcare Professional', 'healthcare-professional', 'Healthcare', 'Advanced healthcare workflows including telemedicine, records management, and billing automation', 'Professional', 15),
('Healthcare Enterprise', 'healthcare-enterprise', 'Healthcare', 'Enterprise healthcare suite with advanced compliance, analytics, and system integrations', 'Enterprise', 20),

('Education Starter', 'education-starter', 'Education', 'Basic education workflows for student management, course automation, and communication', 'Free', 0),
('Education Pro', 'education-pro', 'Education', 'Professional education automation with LMS integration, assessment workflows, and analytics', 'Professional', 15),
('Education Enterprise', 'education-enterprise', 'Education', 'Complete education platform with advanced analytics, custom integrations, and multi-campus support', 'Enterprise', 20),

('Real Estate Essentials', 'real-estate-essentials', 'Real Estate', 'Core real estate workflows for lead management, property listings, and client communication', 'Free', 0),
('Real Estate Pro', 'real-estate-pro', 'Real Estate', 'Professional real estate automation with CRM integration, document management, and marketing tools', 'Professional', 15),
('Real Estate Enterprise', 'real-estate-enterprise', 'Real Estate', 'Enterprise real estate solution with portfolio management, advanced analytics, and custom workflows', 'Enterprise', 20),

('Manufacturing Basics', 'manufacturing-basics', 'Manufacturing', 'Essential manufacturing workflows for production tracking, inventory, and quality control', 'Free', 0),
('Manufacturing Advanced', 'manufacturing-advanced', 'Manufacturing', 'Advanced manufacturing automation with supply chain integration, predictive maintenance, and analytics', 'Professional', 20),
('Manufacturing Enterprise', 'manufacturing-enterprise', 'Manufacturing', 'Complete manufacturing suite with IoT integration, advanced planning, and enterprise systems', 'Enterprise', 25),

('Professional Services Starter', 'services-starter', 'Services', 'Basic workflows for project management, time tracking, and client communication', 'Free', 0),
('Professional Services Pro', 'services-pro', 'Services', 'Professional services automation with resource planning, billing, and project analytics', 'Professional', 15),
('Professional Services Enterprise', 'services-enterprise', 'Services', 'Enterprise services solution with advanced resource management, forecasting, and integrations', 'Enterprise', 20),

('Sales Acceleration Pack', 'sales-acceleration', 'Cross-Industry', 'Comprehensive sales workflows for lead generation, qualification, and deal management', 'Professional', 10),
('Marketing Automation Suite', 'marketing-suite', 'Cross-Industry', 'Complete marketing automation including campaigns, analytics, and content management', 'Professional', 10),
('Customer Success Bundle', 'cs-bundle', 'Cross-Industry', 'Full customer success automation with onboarding, health scoring, and retention workflows', 'Professional', 10),
('Finance & Operations Pack', 'finance-ops', 'Cross-Industry', 'Financial and operational workflows including invoicing, reporting, and process automation', 'Professional', 15),
('Complete Business Suite', 'complete-suite', 'Cross-Industry', 'All-in-one business automation covering sales, marketing, finance, operations, and support', 'Enterprise', 30);

