import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const industries = [
  {
    name: "SaaS",
    description: "Scale your software business with intelligent automation",
    href: "/industries/saas",
    stats: { customers: "500+", growth: "40%" }
  },
  {
    name: "E-commerce",
    description: "Optimize your online retail operations",
    href: "/industries/ecommerce", 
    stats: { customers: "300+", growth: "60%" }
  },
  {
    name: "Fintech",
    description: "Streamline financial services with compliance-ready automation",
    href: "/industries/fintech",
    stats: { customers: "200+", growth: "80%" }
  },
  {
    name: "Healthcare",
    description: "Improve patient outcomes with secure, HIPAA-compliant workflows",
    href: "/industries/healthcare",
    stats: { customers: "150+", growth: "45%" }
  },
  {
    name: "Education",
    description: "Enhance learning experiences with automated administrative tasks",
    href: "/industries/education",
    stats: { customers: "250+", growth: "35%" }
  },
  {
    name: "Professional Services",
    description: "Scale your service delivery with intelligent automation",
    href: "/industries/services",
    stats: { customers: "400+", growth: "50%" }
  }
];

export default function IndustriesPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Industry Solutions</h1>
            <p className="text-xl text-white/80">
              Tailored automation solutions for your industry's unique challenges and requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Link
                key={i}
                to={industry.href}
                className="group bg-monks-light-gray rounded-3xl p-8 hover:shadow-card transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-monks-accent/20 transition-colors duration-300">
                    <div className="w-8 h-8 bg-monks-accent rounded-xl"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
                      {industry.name}
                    </h3>
                    <p className="text-monks-gray">{industry.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <div className="space-y-1">
                      <div className="text-sm text-monks-gray">Customers</div>
                      <div className="font-semibold text-monks-black">{industry.stats.customers}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-monks-gray">Avg Growth</div>
                      <div className="font-semibold text-monks-accent">{industry.stats.growth}</div>
                    </div>
                    <ArrowUpRight size={20} className="text-monks-gray group-hover:text-monks-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-display font-bold text-monks-black">
              Don't See Your Industry?
            </h2>
            <p className="text-xl text-monks-gray">
              We work with businesses across all sectors. Let's discuss your specific needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Contact Us
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}