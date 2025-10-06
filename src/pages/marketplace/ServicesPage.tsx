import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { CheckCircle, Clock, Users, Zap, ArrowRight, Star, Shield, Award, TrendingUp } from 'lucide-react';

const serviceTiers = [
  {
    id: 'quick-start',
    name: 'Quick Start',
    priceRange: '$500 - $2,000',
    duration: '1-2 weeks',
    description: 'Pre-configured automation templates ready for deployment',
    features: [
      'Pre-built workflow templates',
      'Standard configuration',
      'Email support',
      'Basic documentation',
      'Single integration setup'
    ],
    ideal: 'Small teams getting started with automation'
  },
  {
    id: 'professional',
    name: 'Professional',
    priceRange: '$5,000 - $15,000',
    duration: '4-8 weeks',
    description: 'Custom automation solutions tailored to your specific needs',
    features: [
      'Custom workflow development',
      'Advanced customization',
      'Priority support',
      'Complete documentation',
      'Multiple integration setup',
      'Testing & QA',
      'Training sessions'
    ],
    ideal: 'Growing businesses with specific requirements',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceRange: 'Custom Quote',
    duration: '8-16+ weeks',
    description: 'Full-service automation transformation with dedicated team',
    features: [
      'Enterprise architecture design',
      'Unlimited customization',
      'Dedicated success manager',
      'Comprehensive documentation',
      'Full integration suite',
      'Extensive testing & QA',
      'On-site training',
      'Ongoing maintenance & support',
      'SLA guarantees'
    ],
    ideal: 'Large organizations with complex needs'
  }
];

const services = [
  {
    id: 'lead-management',
    name: 'Lead Management Automation',
    category: 'Sales',
    description: 'Complete lead capture, scoring, routing, and nurture automation connecting your forms, CRM, and communication tools',
    basePrice: '$2,500',
    duration: '2-4 weeks',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliverables: [
      'Multi-channel lead capture setup',
      'Intelligent scoring algorithm',
      'Round-robin routing rules',
      'Automated nurture campaigns',
      'CRM integration & sync'
    ],
    technologies: ['Salesforce', 'HubSpot', 'Zapier', 'Segment'],
    tier: 'professional'
  },
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding Suite',
    category: 'Operations',
    description: 'Automated onboarding workflows from signup to activation, including account provisioning, welcome sequences, and progress tracking',
    basePrice: '$3,500',
    duration: '3-5 weeks',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliverables: [
      'Automated account provisioning',
      'Multi-step onboarding flow',
      'Email & in-app messaging',
      'Progress tracking dashboard',
      'Integration with product analytics'
    ],
    technologies: ['Intercom', 'Mixpanel', 'Stripe', 'SendGrid'],
    tier: 'professional'
  },
  {
    id: 'invoice-processing',
    name: 'Invoice Processing & AP Automation',
    category: 'Finance',
    description: 'End-to-end accounts payable automation with OCR, approval workflows, payment scheduling, and accounting sync',
    basePrice: '$4,000',
    duration: '4-6 weeks',
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliverables: [
      'OCR invoice data extraction',
      'PO matching automation',
      'Multi-level approval workflow',
      'Payment scheduling',
      'QuickBooks/Xero integration'
    ],
    technologies: ['QuickBooks', 'Xero', 'Bill.com', 'Stampli'],
    tier: 'professional'
  },
  {
    id: 'support-automation',
    name: 'Customer Support Automation',
    category: 'Support',
    description: 'Intelligent ticket triage, auto-response, escalation, and routing system integrated with your help desk',
    basePrice: '$3,000',
    duration: '3-5 weeks',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliverables: [
      'AI-powered ticket categorization',
      'Automated response templates',
      'Smart escalation rules',
      'SLA monitoring & alerts',
      'Multi-channel support integration'
    ],
    technologies: ['Zendesk', 'Intercom', 'Help Scout', 'Front'],
    tier: 'professional'
  },
  {
    id: 'marketing-automation',
    name: 'Marketing Automation Suite',
    category: 'Marketing',
    description: 'Complete marketing automation including campaign management, lead nurturing, scoring, and analytics',
    basePrice: '$5,000',
    duration: '5-8 weeks',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliverables: [
      'Campaign workflow automation',
      'Lead scoring & grading',
      'Email & social automation',
      'Landing page integration',
      'Attribution reporting'
    ],
    technologies: ['HubSpot', 'Marketo', 'Pardot', 'ActiveCampaign'],
    tier: 'enterprise'
  },
  {
    id: 'data-pipeline',
    name: 'Custom Data Pipeline & ETL',
    category: 'Analytics',
    description: 'Build robust data pipelines connecting multiple sources to your warehouse with transformation and validation',
    basePrice: '$6,000',
    duration: '6-10 weeks',
    image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliverables: [
      'Multi-source data connectors',
      'Data transformation logic',
      'Validation & quality checks',
      'Scheduling & monitoring',
      'Warehouse optimization'
    ],
    technologies: ['Snowflake', 'BigQuery', 'Fivetran', 'dbt'],
    tier: 'enterprise'
  },
  {
    id: 'reporting-dashboard',
    name: 'Executive Reporting & Dashboards',
    category: 'Analytics',
    description: 'Automated data collection, aggregation, and visualization for executive-level business insights',
    basePrice: '$4,500',
    duration: '4-6 weeks',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliverables: [
      'Data aggregation automation',
      'Custom dashboard creation',
      'Scheduled report generation',
      'Alert & notification system',
      'Mobile-responsive design'
    ],
    technologies: ['Tableau', 'Power BI', 'Looker', 'Mode'],
    tier: 'professional'
  },
  {
    id: 'compliance-automation',
    name: 'Compliance & Audit Automation',
    category: 'Compliance',
    description: 'Automate compliance workflows, documentation, audit trails, and regulatory reporting',
    basePrice: '$8,000',
    duration: '8-12 weeks',
    image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
    deliverables: [
      'Automated compliance checks',
      'Documentation generation',
      'Audit trail creation',
      'Regulatory report automation',
      'Risk monitoring dashboard'
    ],
    technologies: ['ServiceNow', 'OneTrust', 'LogicGate', 'AuditBoard'],
    tier: 'enterprise'
  }
];

const benefits = [
  {
    icon: Clock,
    title: 'Accelerated Delivery',
    description: 'Pre-built components and proven methodologies ensure fast implementation'
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Quality',
    description: 'Built by automation experts following best practices and security standards'
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Work with experienced automation engineers throughout the project'
  },
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    description: 'Architected to grow with your business and adapt to changing needs'
  }
];

export default function ServicesPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(services.map(s => s.category)));
  const filteredServices = selectedCategory
    ? services.filter(s => s.category === selectedCategory)
    : services;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzRmNjA3OCIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-400/30">
              Professional Automation Services
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Expert Automation Services
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              From quick-start templates to enterprise transformations. Our automation experts
              <br />design, build, and deploy custom solutions tailored to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100">
                Request a Quote
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Case Studies
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Service Tiers */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Service Level</h2>
            <p className="text-xl text-slate-600">
              Flexible engagement models to match your budget and timeline
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {serviceTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`relative ${tier.popular ? 'border-blue-500 border-2 shadow-xl' : 'border-2 hover:border-slate-300'} transition-all`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{tier.priceRange}</div>
                  <div className="text-sm text-slate-600 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {tier.duration}
                  </div>
                  <p className="text-slate-600 mb-6">{tier.description}</p>

                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <div className="text-xs font-semibold text-slate-500 mb-1">IDEAL FOR</div>
                    <div className="text-sm text-slate-700">{tier.ideal}</div>
                  </div>

                  <Button className="w-full" variant={tier.popular ? 'primary' : 'outline'}>
                    Get Started
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Services</h2>
            <p className="text-xl text-slate-600">
              Partner with automation experts who understand your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Services Catalog */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Popular Automation Services</h2>
            <p className="text-xl text-slate-600">
              Pre-scoped services ready for immediate engagement
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Button
              variant={selectedCategory === null ? 'primary' : 'outline'}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'primary' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-xl transition-all overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-slate-900">
                      {service.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors flex-1">
                      {service.name}
                    </h3>
                  </div>

                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-semibold text-slate-700">Key Deliverables:</div>
                    {service.deliverables.slice(0, 3).map((deliverable, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{deliverable}</span>
                      </div>
                    ))}
                    {service.deliverables.length > 3 && (
                      <div className="text-sm text-slate-500">
                        +{service.deliverables.length - 3} more
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </span>
                      <span className="font-bold text-blue-600 text-lg">{service.basePrice}</span>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-blue-700 transition-colors">
                    Request Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Delivery Process</h2>
            <p className="text-xl text-slate-600">
              Proven methodology from discovery to deployment
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Discovery', desc: 'Understand requirements & tech stack' },
              { step: '2', title: 'Design', desc: 'Create solution architecture' },
              { step: '3', title: 'Build', desc: 'Develop & configure workflows' },
              { step: '4', title: 'Test', desc: 'QA testing & validation' },
              { step: '5', title: 'Deploy', desc: 'Launch & training' }
            ].map((phase) => (
              <div key={phase.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {phase.step}
                </div>
                <h3 className="font-bold mb-2">{phase.title}</h3>
                <p className="text-sm text-slate-600">{phase.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Schedule a free consultation to discuss your automation needs
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100">
              Schedule Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
