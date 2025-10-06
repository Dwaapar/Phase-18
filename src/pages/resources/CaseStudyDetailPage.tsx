import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, Clock, Users, Building, Download, Share2 } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { MetricDisplay } from "../../components/ui/MetricDisplay";
import { Timeline } from "../../components/ui/Timeline";
import { TestimonialCard } from "../../components/ui/TestimonialCard";

export default function CaseStudyDetailPage() {
  const { slug } = useParams();

  // Mock case study data
  const caseStudy = {
    title: "SaaS Company Achieves 23% MQL Uplift in 72 Hours",
    company: "TechFlow",
    industry: "B2B SaaS",
    companySize: "50-200 employees",
    location: "San Francisco, CA",
    challenge: "Manual lead routing was causing delays and missed opportunities. Sales reps were spending too much time on unqualified leads, and hot prospects were going cold while waiting for assignment.",
    solution: "Implemented an automated lead scoring and intelligent routing system using Findawise's workflow platform with real-time lead qualification and territory-based assignment.",
    results: [
      { metric: "MQL Conversion Rate", value: 23, suffix: "%", icon: TrendingUp, description: "Increase in qualified leads converting to opportunities" },
      { metric: "Response Time", value: 67, suffix: "%", icon: Clock, description: "Reduction in average lead response time" },
      { metric: "Sales Team Efficiency", value: 40, suffix: "%", icon: Users, description: "Improvement in sales rep productivity" },
      { metric: "Revenue Impact", value: 150000, prefix: "$", icon: Building, description: "Additional revenue generated in Q1" }
    ],
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    timeline: [
      {
        title: "Discovery & Planning",
        description: "Initial consultation to understand current processes and identify automation opportunities",
        date: "Day 1 - Morning"
      },
      {
        title: "Workflow Design",
        description: "Designed the lead scoring algorithm and routing logic based on TechFlow's criteria",
        date: "Day 1 - Afternoon"
      },
      {
        title: "Development & Testing",
        description: "Built and tested the automation workflow with sample data and edge cases",
        date: "Day 2"
      },
      {
        title: "Integration & Deployment",
        description: "Integrated with Salesforce and deployed to production environment",
        date: "Day 3 - Morning"
      },
      {
        title: "Training & Handoff",
        description: "Trained the sales team and provided documentation for ongoing management",
        date: "Day 3 - Afternoon"
      }
    ],
    testimonial: {
      quote: "The results exceeded our expectations. Not only did we see immediate improvements in lead conversion, but our sales team is now more focused and productive than ever.",
      name: "Sarah Chen",
      role: "VP Operations",
      company: "TechFlow",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={16} />
            Back to Case Studies
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="accent">{caseStudy.industry}</Badge>
                <Badge variant="secondary">{caseStudy.companySize}</Badge>
                <div className="flex items-center gap-2 text-sm text-monks-gray">
                  <Building size={14} />
                  <span>{caseStudy.location}</span>
                </div>
              </div>
              
              <h1 className="text-display font-bold text-monks-black">
                {caseStudy.title}
              </h1>
              
              <div className="flex items-center gap-6 text-monks-gray">
                <div className="flex items-center gap-2">
                  <Building size={16} />
                  <span>{caseStudy.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{caseStudy.companySize}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-monks-light-gray rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-6">Case Study Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-monks-gray">Industry</div>
                  <div className="font-medium text-monks-black">{caseStudy.industry}</div>
                </div>
                <div>
                  <div className="text-sm text-monks-gray">Company Size</div>
                  <div className="font-medium text-monks-black">{caseStudy.companySize}</div>
                </div>
                <div>
                  <div className="text-sm text-monks-gray">Implementation Time</div>
                  <div className="font-medium text-monks-black">72 hours</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-monks-gray/20">
                <div className="flex gap-3">
                  <button className="flex-1 bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2">
                    <Download size={14} />
                    Download PDF
                  </button>
                  <button className="p-2 border border-monks-gray text-monks-gray rounded-full hover:border-monks-black hover:text-monks-black transition-all duration-300">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="aspect-[2/1] rounded-3xl overflow-hidden">
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-monks-black mb-6">Results Achieved</h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Measurable impact delivered in just 72 hours with continued improvements over time.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {caseStudy.results.map((result, i) => {
              const Icon = result.icon;
              return (
                <div key={i} className="bg-white rounded-3xl p-8 text-center hover:shadow-card transition-all duration-300">
                  <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon size={24} className="text-monks-accent" />
                  </div>
                  <MetricDisplay
                    label={result.metric}
                    value={result.value}
                    prefix={result.prefix}
                    suffix={result.suffix}
                    size="md"
                  />
                  <p className="text-sm text-monks-gray mt-4">{result.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">The Challenge</h2>
                <p className="text-lg text-monks-gray leading-relaxed">
                  {caseStudy.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">The Solution</h2>
                <p className="text-lg text-monks-gray leading-relaxed mb-8">
                  {caseStudy.solution}
                </p>
              </div>

              {/* Implementation */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">Implementation Timeline</h2>
                <Timeline items={caseStudy.timeline} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Testimonial */}
              <TestimonialCard {...caseStudy.testimonial} />

              {/* CTA */}
              <div className="bg-monks-accent/5 rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Ready for Similar Results?</h3>
                <p className="text-sm text-monks-gray mb-4">
                  Book a 72h pilot and see what we can achieve for your business.
                </p>
                <Link
                  to="/automation/pilot"
                  className="block w-full bg-monks-black text-white px-4 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 text-center"
                >
                  Book Your Pilot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}