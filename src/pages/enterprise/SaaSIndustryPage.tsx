import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Users, TrendingUp, Zap, Target, BarChart, Repeat, Globe, Shield, Rocket } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";
import { FeatureGrid } from "../../components/ui/FeatureGrid";
import { StatsGrid } from "../../components/ui/StatsGrid";
import { TestimonialCard } from "../../components/ui/TestimonialCard";
import { CallToAction } from "../../components/ui/CallToAction";

const useCases = [
  {
    title: "Lead Qualification & Routing",
    description: "Automatically score and route leads to the right sales rep based on ICP criteria, territory, and availability for maximum conversion.",
    icon: Target,
    features: ["Real-time scoring", "Territory routing", "CRM integration", "Performance tracking"]
  },
  {
    title: "Customer Onboarding",
    description: "Streamline new customer setup and activation with automated workflows that reduce time-to-value.",
    icon: Rocket,
    features: ["Account provisioning", "Feature activation", "Training delivery", "Success tracking"]
  },
  {
    title: "Churn Prevention",
    description: "Identify at-risk customers and trigger retention workflows before they consider leaving.",
    icon: Shield,
    features: ["Risk scoring", "Engagement tracking", "Intervention workflows", "Success metrics"]
  },
  {
    title: "Product-Led Growth",
    description: "Automate user activation, feature adoption, and expansion revenue opportunities.",
    icon: TrendingUp,
    features: ["Usage analytics", "Feature adoption", "Expansion triggers", "Revenue optimization"]
  },
  {
    title: "Customer Success",
    description: "Scale customer success operations with automated health scoring and proactive outreach.",
    icon: Users,
    features: ["Health scoring", "Automated outreach", "Renewal workflows", "Expansion identification"]
  },
  {
    title: "Revenue Operations",
    description: "Align sales, marketing, and customer success with unified revenue workflows and analytics.",
    icon: BarChart,
    features: ["Pipeline automation", "Attribution tracking", "Forecasting", "Performance optimization"]
  }
];

const saasMetrics = [
  { title: "MRR Growth", description: "Average monthly recurring revenue increase", value: "40%" },
  { title: "Churn Reduction", description: "Decrease in customer churn rate", value: "25%" },
  { title: "Time to Value", description: "Faster customer onboarding", value: "60%" },
  { title: "Sales Efficiency", description: "Improvement in sales productivity", value: "50%" }
];

const stats = [
  { label: "SaaS Companies", value: 500, suffix: "+" },
  { label: "Average Growth", value: 40, suffix: "%" },
  { label: "Time Savings", value: 60, suffix: "%" },
  { label: "Revenue Generated", value: 2000000, prefix: "$", suffix: "+" }
];

const caseStudy = {
  title: "SaaS Startup Scales from $100K to $1M ARR in 8 Months",
  company: "CloudFlow Analytics",
  challenge: "Manual sales and onboarding processes limiting growth and causing customer friction",
  solution: "End-to-end automation of lead qualification, sales processes, and customer onboarding",
  results: [
    { metric: "ARR Growth", value: "+900%", description: "Annual recurring revenue increase" },
    { metric: "Sales Cycle", value: "-50%", description: "Reduction in average sales cycle" },
    { metric: "Onboarding Time", value: "-75%", description: "Faster customer activation" },
    { metric: "Team Efficiency", value: "+200%", description: "Productivity improvement" }
  ]
};

const testimonial = {
  name: "Maria Santos",
  role: "VP of Revenue Operations",
  company: "CloudFlow Analytics",
  quote: "Findawise didn't just automate our processes—it transformed our entire go-to-market strategy. We went from manual chaos to predictable, scalable growth. The ROI was immediate and continues to compound.",
  avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  rating: 5
};

export default function SaaSIndustryPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="SaaS Solutions"
        description="Scale your software business with intelligent automation that grows with you, from startup to enterprise."
        variant="dark"
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Rocket size={16} className="text-green-400" />
            <span>Growth Focused</span>
          </div>
          <div className="flex items-center gap-2">
            <Repeat size={16} className="text-green-400" />
            <span>Recurring Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-green-400" />
            <span>Global Scale</span>
          </div>
        </div>
      </PageHeader>

      <ContentSection
        title="Built for SaaS Growth"
        description="From lead generation to customer success, automate every stage of your SaaS journey with purpose-built workflows."
        variant="default"
      >
        <FeatureGrid features={useCases} columns={3} />
      </ContentSection>

      <ContentSection
        title="SaaS Success Metrics"
        description="Our automation solutions are designed to impact the metrics that matter most for SaaS businesses."
        variant="gray"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {saasMetrics.map((metric, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp size={24} className="text-monks-accent" />
              </div>
              <div className="text-3xl font-bold text-monks-accent mb-2">{metric.value}</div>
              <h3 className="font-semibold text-monks-black mb-2">{metric.title}</h3>
              <p className="text-sm text-monks-gray">{metric.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Featured Success Story"
        variant="default"
      >
        <div className="bg-gradient-to-br from-monks-accent/5 to-monks-accent/10 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl text-monks-accent font-semibold">{caseStudy.title}</h3>
            <p className="text-monks-gray mt-2">{caseStudy.company}</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-monks-black mb-2">Challenge</h4>
                <p className="text-monks-gray">{caseStudy.challenge}</p>
              </div>
              <div>
                <h4 className="font-semibold text-monks-black mb-2">Solution</h4>
                <p className="text-monks-gray">{caseStudy.solution}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {caseStudy.results.map((result, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-monks-accent mb-2">{result.value}</div>
                  <div className="font-medium text-monks-black mb-1">{result.metric}</div>
                  <div className="text-xs text-monks-gray">{result.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <Link
              to="/case-studies/saas-startup-scale"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Read Full Case Study
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Trusted by SaaS Leaders"
        variant="gray"
      >
        <div className="max-w-3xl mx-auto">
          <TestimonialCard {...testimonial} />
        </div>
      </ContentSection>

      <ContentSection variant="gray">
        <StatsGrid stats={stats} columns={4} />
      </ContentSection>

      <CallToAction
        title="Ready to Scale Your SaaS?"
        description="Join 500+ SaaS companies already growing with Findawise automation solutions."
        buttons={[
          { label: "Book SaaS Pilot", href: "/automation/pilot", variant: "primary" },
          { label: "View SaaS Workflows", href: "/workflows?category=saas", variant: "outline" }
        ]}
        variant="dark"
      />
    </div>
  );
}