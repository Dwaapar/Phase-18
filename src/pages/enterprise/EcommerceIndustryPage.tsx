import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingCart, Package, MessageSquare, TrendingUp, Users, Truck, CreditCard, BarChart, Target } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";
import { FeatureGrid } from "../../components/ui/FeatureGrid";
import { StatsGrid } from "../../components/ui/StatsGrid";
import { TestimonialCard } from "../../components/ui/TestimonialCard";
import { CallToAction } from "../../components/ui/CallToAction";

const useCases = [
  {
    title: "Order Processing",
    description: "Automate order fulfillment from payment to shipping with intelligent routing and inventory management.",
    icon: ShoppingCart,
    features: ["Payment processing", "Order routing", "Inventory updates", "Shipping automation"]
  },
  {
    title: "Inventory Management",
    description: "Smart inventory tracking and reorder automation with demand forecasting and supplier integration.",
    icon: Package,
    features: ["Stock monitoring", "Reorder automation", "Demand forecasting", "Supplier integration"]
  },
  {
    title: "Customer Support",
    description: "AI-powered support for common customer inquiries with escalation to human agents when needed.",
    icon: MessageSquare,
    features: ["Automated responses", "Ticket routing", "Knowledge base", "Escalation workflows"]
  },
  {
    title: "Marketing Automation",
    description: "Personalized marketing campaigns based on customer behavior and purchase history.",
    icon: Target,
    features: ["Email campaigns", "Personalization", "Abandoned cart recovery", "Customer segmentation"]
  },
  {
    title: "Returns & Refunds",
    description: "Streamlined returns processing with automated refunds and inventory management.",
    icon: Truck,
    features: ["Return processing", "Refund automation", "Inventory updates", "Customer communication"]
  },
  {
    title: "Analytics & Reporting",
    description: "Real-time business intelligence with automated reporting and performance insights.",
    icon: BarChart,
    features: ["Sales analytics", "Performance dashboards", "Automated reports", "Trend analysis"]
  }
];

const platformIntegrations = [
  { name: "Shopify", description: "Native integration with Shopify stores" },
  { name: "WooCommerce", description: "WordPress e-commerce automation" },
  { name: "BigCommerce", description: "Enterprise e-commerce platform" },
  { name: "Magento", description: "Flexible e-commerce solutions" },
  { name: "Amazon", description: "Marketplace automation and FBA" },
  { name: "eBay", description: "Multi-channel selling automation" }
];

const stats = [
  { label: "E-commerce Stores", value: 300, suffix: "+" },
  { label: "Revenue Growth", value: 60, suffix: "%" },
  { label: "Cost Reduction", value: 45, suffix: "%" },
  { label: "System Uptime", value: 99.9, suffix: "%" }
];

const caseStudy = {
  title: "Online Retailer Increases Revenue by 85% with Automation",
  company: "StyleHub Fashion",
  challenge: "Manual processes limiting growth and causing customer service issues during peak seasons",
  solution: "Comprehensive e-commerce automation covering order processing, inventory management, and customer support",
  results: [
    { metric: "Revenue Growth", value: "+85%", description: "Year-over-year increase" },
    { metric: "Order Processing Time", value: "-70%", description: "Faster fulfillment" },
    { metric: "Customer Satisfaction", value: "+45%", description: "Improved service quality" },
    { metric: "Operational Costs", value: "-40%", description: "Reduced manual work" }
  ]
};

const testimonial = {
  name: "Alex Rodriguez",
  role: "CEO",
  company: "StyleHub Fashion",
  quote: "The automation platform transformed our entire operation. We went from struggling with manual processes to scaling effortlessly. Our customers are happier, our team is more productive, and our revenue has never been higher.",
  avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  rating: 5
};

export default function EcommerceIndustryPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="E-commerce Solutions"
        description="Optimize your online retail operations with intelligent automation that scales with your business growth."
        variant="dark"
      >
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <ShoppingCart size={16} className="text-green-400" />
            <span>Multi-Platform</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-green-400" />
            <span>Revenue Focused</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-green-400" />
            <span>Customer-Centric</span>
          </div>
        </div>
      </PageHeader>

      <ContentSection
        title="E-commerce Automation Solutions"
        description="From order processing to customer service, streamline every aspect of your online business with intelligent automation."
        variant="default"
      >
        <FeatureGrid features={useCases} columns={3} />
      </ContentSection>

      <ContentSection
        title="Platform Integrations"
        description="Seamlessly integrate with your existing e-commerce platform and tools."
        variant="gray"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {platformIntegrations.map((platform, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingCart size={20} className="text-monks-accent" />
              </div>
              <h3 className="font-semibold text-monks-black mb-2">{platform.name}</h3>
              <p className="text-sm text-monks-gray">{platform.description}</p>
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
              to="/case-studies/ecommerce-revenue-growth"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Read Full Case Study
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Trusted by E-commerce Leaders"
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
        title="Scale Your E-commerce Business"
        description="Join 300+ online retailers already growing with Findawise automation solutions."
        buttons={[
          { label: "Book E-commerce Pilot", href: "/automation/pilot", variant: "primary" },
          { label: "View Integrations", href: "/integrations", variant: "outline" }
        ]}
        variant="dark"
      />
    </div>
  );
}