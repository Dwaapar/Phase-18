import type {
  DecisionCategory,
  DecisionQuiz,
  DecisionQuestion,
  DecisionProduct,
  DecisionComparison,
  DecisionGuide,
  DecisionROICalculator,
} from '../types/decision.types';

export const mockCategories: Partial<DecisionCategory>[] = [
  {
    name: 'CRM & Sales',
    slug: 'crm-sales',
    description: 'Customer relationship management and sales automation tools',
    icon: 'users',
    display_order: 1,
    is_active: true,
  },
  {
    name: 'Marketing Automation',
    slug: 'marketing-automation',
    description: 'Email marketing, campaigns, and marketing automation platforms',
    icon: 'megaphone',
    display_order: 2,
    is_active: true,
  },
  {
    name: 'Project Management',
    slug: 'project-management',
    description: 'Task management, collaboration, and project tracking tools',
    icon: 'kanban',
    display_order: 3,
    is_active: true,
  },
  {
    name: 'E-commerce',
    slug: 'ecommerce',
    description: 'Online store platforms and e-commerce solutions',
    icon: 'shopping-cart',
    display_order: 4,
    is_active: true,
  },
  {
    name: 'Communication',
    slug: 'communication',
    description: 'Team chat, video conferencing, and communication tools',
    icon: 'message-circle',
    display_order: 5,
    is_active: true,
  },
];

export const mockProducts: Partial<DecisionProduct>[] = [
  {
    name: 'HubSpot CRM',
    slug: 'hubspot-crm',
    vendor: 'HubSpot',
    description:
      'All-in-one CRM platform with marketing, sales, and service tools built for growing businesses.',
    pricing: {
      currency: 'USD',
      free_tier: true,
      tiers: [
        { name: 'Free', price: 0, billing_period: 'monthly' },
        { name: 'Starter', price: 50, billing_period: 'monthly' },
        { name: 'Professional', price: 500, billing_period: 'monthly' },
        { name: 'Enterprise', price: 1200, billing_period: 'monthly' },
      ],
    },
    pros: [
      'Free tier with robust features',
      'Easy to use interface',
      'Great for small to medium businesses',
      'All-in-one marketing and sales platform',
      'Excellent support and resources',
    ],
    cons: [
      'Can get expensive at scale',
      'Some features locked behind higher tiers',
      'Reporting could be more advanced',
    ],
    target_audience: ['startups', 'smb', 'agencies'],
    technical_level: 'low',
    rating: 4.5,
    review_count: 3847,
    is_active: true,
  },
  {
    name: 'Salesforce',
    slug: 'salesforce',
    vendor: 'Salesforce',
    description:
      'Enterprise-grade CRM with extensive customization and powerful automation capabilities.',
    pricing: {
      currency: 'USD',
      free_tier: false,
      tiers: [
        { name: 'Essentials', price: 25, billing_period: 'monthly' },
        { name: 'Professional', price: 75, billing_period: 'monthly' },
        { name: 'Enterprise', price: 150, billing_period: 'monthly' },
        { name: 'Unlimited', price: 300, billing_period: 'monthly' },
      ],
    },
    pros: [
      'Extremely powerful and customizable',
      'Best for enterprise companies',
      'Massive ecosystem and integrations',
      'Advanced reporting and analytics',
      'Industry-leading features',
    ],
    cons: [
      'Steep learning curve',
      'Expensive',
      'Requires technical expertise',
      'Can be overwhelming for small teams',
    ],
    target_audience: ['enterprise', 'large-business'],
    technical_level: 'high',
    rating: 4.3,
    review_count: 15234,
    is_active: true,
  },
  {
    name: 'Mailchimp',
    slug: 'mailchimp',
    vendor: 'Intuit',
    description:
      'Popular email marketing platform with easy-to-use templates and automation features.',
    pricing: {
      currency: 'USD',
      free_tier: true,
      tiers: [
        { name: 'Free', price: 0, billing_period: 'monthly' },
        { name: 'Essentials', price: 13, billing_period: 'monthly' },
        { name: 'Standard', price: 20, billing_period: 'monthly' },
        { name: 'Premium', price: 350, billing_period: 'monthly' },
      ],
    },
    pros: [
      'Generous free tier',
      'User-friendly interface',
      'Great email templates',
      'Good deliverability rates',
      'Integrated with many platforms',
    ],
    cons: [
      'Limited automation on lower tiers',
      'Can get pricey as list grows',
      'Support could be better',
    ],
    target_audience: ['startups', 'smb', 'creators'],
    technical_level: 'low',
    rating: 4.4,
    review_count: 8921,
    is_active: true,
  },
];

export const mockComparisons: Partial<DecisionComparison>[] = [
  {
    title: 'HubSpot vs Salesforce',
    slug: 'hubspot-vs-salesforce',
    description:
      'Compare the two leading CRM platforms to find the best fit for your business size and needs.',
    winner_context: 'HubSpot for SMBs, Salesforce for Enterprise',
    feature_matrix: {
      ease_of_use: { hubspot: 9, salesforce: 6 },
      customization: { hubspot: 7, salesforce: 10 },
      pricing: { hubspot: 8, salesforce: 5 },
      scalability: { hubspot: 7, salesforce: 10 },
      support: { hubspot: 9, salesforce: 8 },
    },
    pricing_breakdown: {
      hubspot: {
        entry_level: 'Free - $50/mo',
        mid_tier: '$500/mo',
        enterprise: '$1,200/mo',
      },
      salesforce: {
        entry_level: '$25/user/mo',
        mid_tier: '$75/user/mo',
        enterprise: '$150-300/user/mo',
      },
    },
    recommendation:
      'Choose HubSpot if you want an all-in-one platform that is easy to use and perfect for growing businesses. Choose Salesforce if you need advanced customization, have a large team, and require enterprise-grade features.',
    view_count: 12547,
    helpful_count: 9834,
    is_published: true,
  },
];

export const mockGuides: Partial<DecisionGuide>[] = [
  {
    title: 'Best CRM for Startups 2024',
    slug: 'best-crm-for-startups-2024',
    description:
      'Comprehensive guide comparing the top CRM solutions for startups, including pricing, features, and recommendations.',
    content: `# Best CRM for Startups 2024

## Introduction
Choosing the right CRM is crucial for startup success...

## Top Picks
1. HubSpot CRM - Best overall
2. Pipedrive - Best for sales teams
3. Zoho CRM - Best value

## Detailed Comparison
...`,
    reading_time: 12,
    download_count: 2134,
    rating: 4.8,
    author: 'Decision Platform Team',
    is_published: true,
  },
];

export const mockROICalculators: Partial<DecisionROICalculator>[] = [
  {
    title: 'CRM ROI Calculator',
    slug: 'crm-roi-calculator',
    description:
      'Calculate the return on investment for implementing a CRM system in your business.',
    input_fields: [
      {
        id: 'team_size',
        label: 'Sales Team Size',
        type: 'number',
        default_value: 5,
        min: 1,
        max: 1000,
        help_text: 'Number of people on your sales team',
        required: true,
      },
      {
        id: 'avg_deal_size',
        label: 'Average Deal Size',
        type: 'currency',
        default_value: 5000,
        min: 0,
        help_text: 'Average value of a closed deal',
        required: true,
      },
      {
        id: 'deals_per_month',
        label: 'Deals Closed Per Month',
        type: 'number',
        default_value: 10,
        min: 0,
        help_text: 'Current number of deals closed monthly',
        required: true,
      },
      {
        id: 'crm_cost',
        label: 'Monthly CRM Cost',
        type: 'currency',
        default_value: 500,
        min: 0,
        help_text: 'Total monthly cost for CRM subscription',
        required: true,
      },
      {
        id: 'expected_improvement',
        label: 'Expected Deal Improvement',
        type: 'percentage',
        default_value: 20,
        min: 0,
        max: 100,
        help_text: 'Expected % increase in closed deals with CRM',
        required: true,
      },
    ],
    calculation_formula: {
      annual_revenue_increase:
        '{avg_deal_size} * {deals_per_month} * 12 * ({expected_improvement} / 100)',
      annual_crm_cost: '{crm_cost} * 12',
      net_roi: '(({avg_deal_size} * {deals_per_month} * 12 * ({expected_improvement} / 100)) - ({crm_cost} * 12))',
      roi_percentage:
        '((({avg_deal_size} * {deals_per_month} * 12 * ({expected_improvement} / 100)) - ({crm_cost} * 12)) / ({crm_cost} * 12)) * 100',
      payback_period: '({crm_cost} * 12) / (({avg_deal_size} * {deals_per_month} * ({expected_improvement} / 100)))',
    },
    output_metrics: [
      {
        id: 'annual_revenue_increase',
        label: 'Annual Revenue Increase',
        format: 'currency',
        description: 'Expected additional revenue per year with CRM',
      },
      {
        id: 'annual_crm_cost',
        label: 'Annual CRM Cost',
        format: 'currency',
        description: 'Total yearly investment in CRM',
      },
      {
        id: 'net_roi',
        label: 'Net ROI',
        format: 'currency',
        description: 'Net return on investment after CRM costs',
      },
      {
        id: 'roi_percentage',
        label: 'ROI Percentage',
        format: 'percentage',
        description: 'Return on investment as a percentage',
      },
      {
        id: 'payback_period',
        label: 'Payback Period',
        format: 'time',
        description: 'Time to recover CRM investment (in days)',
      },
    ],
    usage_count: 4521,
    is_active: true,
  },
];
