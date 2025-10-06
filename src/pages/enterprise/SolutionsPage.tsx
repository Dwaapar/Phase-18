import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, TrendingUp, Users, DollarSign, Headphones } from "lucide-react";

const solutions = [
  {
    title: "Revenue Operations",
    description: "Align sales, marketing, and customer success for predictable growth",
    icon: TrendingUp,
    href: "/solutions?type=revenue",
    features: ["Lead scoring & routing", "Pipeline automation", "Revenue forecasting"]
  },
  {
    title: "Support Operations", 
    description: "Scale customer support with intelligent automation",
    icon: Headphones,
    href: "/solutions?type=support",
    features: ["Ticket triage", "Knowledge base automation", "Escalation workflows"]
  },
  {
    title: "Finance Operations",
    description: "Streamline financial processes and reporting",
    icon: DollarSign,
    href: "/solutions?type=finance",
    features: ["Invoice processing", "Expense automation", "Financial reporting"]
  },
  {
    title: "Marketing Operations",
    description: "Optimize campaigns and lead generation",
    icon: Users,
    href: "/solutions?type=marketing",
    features: ["Campaign automation", "Lead nurturing", "Attribution tracking"]
  }
];

export default function SolutionsPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Enterprise Solutions</h1>
            <p className="text-xl text-white/80">
              Comprehensive automation solutions designed for enterprise scale and complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-monks-black mb-6">
              Solutions by Department
            </h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Purpose-built automation solutions for every department in your organization.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {solutions.map((solution, i) => {
              const Icon = solution.icon;
              return (
                <Link
                  key={i}
                  to={solution.href}
                  className="group bg-monks-light-gray rounded-3xl p-8 hover:shadow-card transition-all duration-300"
                >
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-monks-accent/20 transition-colors duration-300">
                      <Icon size={24} className="text-monks-accent" />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
                        {solution.title}
                      </h3>
                      <p className="text-monks-gray">{solution.description}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {solution.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3 text-monks-gray">
                          <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center gap-2 text-monks-accent group-hover:text-monks-black transition-colors duration-300 font-medium pt-4">
                      Learn More
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-monks-black mb-6">
              Enterprise Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">75%</div>
              <div className="text-monks-gray">Reduction in Manual Work</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">3x</div>
              <div className="text-monks-gray">Faster Process Execution</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-monks-accent mb-2">99.9%</div>
              <div className="text-monks-gray">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Operations?</h2>
          <p className="text-xl text-white/80 mb-8">
            Let's discuss how our enterprise solutions can accelerate your business
          </p>
          <Link
            to="/contact?type=enterprise"
            className="inline-flex items-center gap-2 bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300 group"
          >
            Contact Enterprise Sales
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}