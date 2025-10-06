import React, { useState } from "react";
import { Handshake, Users, Globe, TrendingUp, Star, ArrowUpRight, CheckCircle } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";
import { ContentSection } from "../components/ui/ContentSection";
import { FeatureGrid } from "../components/ui/FeatureGrid";
import { TestimonialCard } from "../components/ui/TestimonialCard";
import { Link } from "react-router-dom";

const partnershipTypes = [
  {
    title: "Technology Partners",
    description: "Integrate your platform with Findawise to offer automation capabilities to your customers",
    icon: Globe,
    features: ["API integration", "Co-marketing opportunities", "Technical support", "Revenue sharing"]
  },
  {
    title: "Channel Partners",
    description: "Resell Findawise solutions to your customer base with dedicated support and training",
    icon: Users,
    features: ["Reseller program", "Sales training", "Marketing materials", "Commission structure"]
  },
  {
    title: "Solution Partners",
    description: "Build specialized solutions on top of Findawise for specific industries or use cases",
    icon: TrendingUp,
    features: ["Solution development", "Go-to-market support", "Joint sales efforts", "Technical resources"]
  }
];

const partnerBenefits = [
  "Access to comprehensive partner portal",
  "Dedicated partner success manager",
  "Co-marketing and lead sharing opportunities",
  "Technical training and certification programs",
  "Priority support and escalation",
  "Revenue sharing and incentive programs",
  "Joint go-to-market strategies",
  "Access to product roadmap and beta features"
];

const existingPartners = [
  {
    name: "TechCorp Solutions",
    type: "Technology Partner",
    description: "Leading provider of enterprise software solutions",
    logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    name: "Global Consulting Group",
    type: "Solution Partner", 
    description: "Management consulting and digital transformation",
    logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    name: "CloudFirst Technologies",
    type: "Channel Partner",
    description: "Cloud infrastructure and automation specialists",
    logo: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  },
  {
    name: "DataFlow Analytics",
    type: "Technology Partner",
    description: "Business intelligence and analytics platform",
    logo: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
  }
];

const testimonial = {
  name: "Jennifer Walsh",
  role: "VP of Partnerships",
  company: "TechCorp Solutions",
  quote: "Our partnership with Findawise has opened up new revenue streams and allowed us to offer comprehensive automation solutions to our clients. The support team is exceptional and the technology is world-class.",
  avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  rating: 5
};

export default function PartnershipsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    partnershipType: "",
    description: ""
  });

  const handleSubmit = async (data: any) => {
    console.log("Partnership inquiry:", data);
    // Handle form submission
  };

  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Partner with Findawise"
        description="Join our growing ecosystem of technology, channel, and solution partners to deliver automation excellence to customers worldwide."
        variant="dark"
      />

      <ContentSection
        title="Partnership Opportunities"
        description="Choose the partnership model that best fits your business goals and customer needs."
        variant="default"
      >
        <FeatureGrid features={partnershipTypes} columns={3} />
      </ContentSection>

      <ContentSection
        title="Partner Benefits"
        description="Our partners enjoy comprehensive support, resources, and opportunities for mutual growth."
        variant="gray"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-monks-black mb-6">What You Get</h3>
            <ul className="space-y-3">
              {partnerBenefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-monks-gray">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-monks-black mb-6">Success Metrics</h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-monks-accent mb-2">150+</div>
                <div className="text-monks-gray">Active Partners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-monks-accent mb-2">$50M+</div>
                <div className="text-monks-gray">Partner Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-monks-accent mb-2">95%</div>
                <div className="text-monks-gray">Partner Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Our Partners"
        description="We work with leading companies across industries to deliver exceptional automation solutions."
        variant="default"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {existingPartners.map((partner, i) => (
            <div key={i} className="bg-monks-light-gray rounded-3xl p-6 text-center">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-16 h-16 rounded-2xl object-cover mx-auto mb-4"
              />
              <h3 className="font-semibold text-monks-black mb-2">{partner.name}</h3>
              <div className="text-sm text-monks-accent font-medium mb-2">{partner.type}</div>
              <p className="text-xs text-monks-gray">{partner.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection
        title="Partner Success Story"
        variant="gray"
      >
        <div className="max-w-3xl mx-auto">
          <TestimonialCard {...testimonial} />
        </div>
      </ContentSection>

      <ContentSection
        title="Become a Partner"
        description="Ready to join our partner ecosystem? Tell us about your business and how we can work together."
        variant="default"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-monks-light-gray rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-monks-black mb-6">Partnership Inquiry</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    placeholder="you@company.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Company *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  placeholder="Your company"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Partnership Type *</label>
                <select
                  value={formData.partnershipType}
                  onChange={(e) => setFormData(prev => ({ ...prev, partnershipType: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                >
                  <option value="">Select partnership type</option>
                  <option value="technology">Technology Partner</option>
                  <option value="channel">Channel Partner</option>
                  <option value="solution">Solution Partner</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
                  placeholder="Tell us about your business and how you'd like to partner with us..."
                />
              </div>
              
              <button
                onClick={() => handleSubmit(formData)}
                className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
              >
                Submit Partnership Inquiry
              </button>
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  );
}