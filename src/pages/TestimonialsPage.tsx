import React from "react";
import { Star, Quote } from "lucide-react";
import { TestimonialCard } from "../components/ui/TestimonialCard";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP Operations",
    company: "TechFlow",
    quote: "Findawise transformed our operations completely. We now run 10x faster with half the manual work. The 72h pilot delivered immediate results that exceeded our expectations.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder & CEO",
    company: "GrowthLabs",
    quote: "The automation platform is incredible. Our MQL conversion jumped 23% in the first week, and the AI agents handle complex tasks that used to take our team hours.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Head of Revenue",
    company: "ScaleUp Inc",
    quote: "Finally, a platform that connects decision-making with execution. The workflow store saved us months of development time, and the results speak for themselves.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    name: "David Kim",
    role: "CTO",
    company: "DataDriven",
    quote: "The technical depth and reliability of Findawise is outstanding. We've deployed 15+ workflows with 99.9% uptime. Game-changing for our engineering team.",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "Director of Operations",
    company: "CloudFirst",
    quote: "The workflow store is incredible. We deployed 5 automations in our first day and saw immediate productivity gains. The support team is also fantastic.",
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    name: "Alex Johnson",
    role: "CEO",
    company: "InnovateCorp",
    quote: "Findawise doesn't just automate—it makes us smarter about every decision we make. The decision platform has become essential to our strategic planning.",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    name: "Rachel Green",
    role: "VP Marketing",
    company: "GrowthCo",
    quote: "The affiliate hub transformed our partner program. Smart links and real-time analytics helped us increase affiliate revenue by 40% in just two months.",
    avatar: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    name: "Michael Brown",
    role: "Head of Customer Success",
    company: "ServicePro",
    quote: "The support automation reduced our ticket response time by 60%. Our customer satisfaction scores have never been higher, and our team can focus on complex issues.",
    avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  },
  {
    name: "Jennifer Lee",
    role: "CFO",
    company: "FinanceFirst",
    quote: "The finance automation workflows saved us 40 hours per month on invoice processing. ROI was immediate, and the accuracy is better than manual processing.",
    avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5
  }
];

const stats = [
  { label: "Customer Satisfaction", value: "99.2%", description: "Based on 1,000+ reviews" },
  { label: "Average Rating", value: "4.9/5", description: "Across all platforms" },
  { label: "Support Response", value: "< 2 hours", description: "Average first response time" },
  { label: "Success Rate", value: "98.5%", description: "Customer success rate" }
];

export default function TestimonialsPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Customer Stories</h1>
            <p className="text-xl text-white/80">
              See how businesses like yours are transforming with Findawise.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-monks-accent mb-2">{stat.value}</div>
                <div className="text-monks-black font-medium mb-1">{stat.label}</div>
                <div className="text-sm text-monks-gray">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard
                key={i}
                {...testimonial}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="bg-monks-light-gray rounded-3xl p-12">
            <Quote size={48} className="text-monks-accent mx-auto mb-8" />
            <blockquote className="text-2xl font-medium text-monks-black mb-8 leading-relaxed">
              "Findawise is the missing piece we didn't know we needed. It's not just automation—it's intelligent automation that learns and adapts with our business."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                alt="Sarah Chen"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-monks-black">Sarah Chen</p>
                <p className="text-monks-gray">VP Operations, TechFlow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Them?</h2>
          <p className="text-xl text-white/80 mb-8">
            Start your transformation today and see why thousands of teams trust Findawise.
          </p>
          <button className="bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300">
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  );
}