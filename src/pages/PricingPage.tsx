import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals and small teams getting started",
    features: [
      "5 workflow deployments",
      "Basic AI agents",
      "Community support",
      "Standard templates"
    ],
    cta: "Get Started Free",
    href: "/signup",
    popular: false
  },
  {
    name: "Professional",
    price: "$49",
    period: "/month",
    description: "For growing teams that need more power and flexibility",
    features: [
      "Unlimited workflows",
      "Advanced AI agents",
      "Priority support",
      "Custom integrations",
      "Analytics dashboard",
      "Team collaboration"
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with advanced requirements",
    features: [
      "Everything in Professional",
      "Custom AI agent development",
      "Dedicated success manager",
      "SLA guarantees",
      "Advanced security",
      "Custom integrations"
    ],
    cta: "Contact Sales",
    href: "/contact?type=enterprise",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-monks-black mb-4 sm:mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg sm:text-xl text-monks-gray max-w-3xl mx-auto px-4 sm:px-0">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 hover:shadow-card ${
                  plan.popular
                    ? "border-monks-accent shadow-card"
                    : "border-monks-gray/10 hover:border-monks-accent/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-monks-accent text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-monks-black">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl sm:text-4xl font-bold text-monks-black">{plan.price}</span>
                      {plan.period && (
                        <span className="text-monks-gray text-sm sm:text-base">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-monks-gray mt-2 text-sm sm:text-base">{plan.description}</p>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <Check size={14} className="sm:w-4 sm:h-4 text-monks-accent" />
                        <span className="text-monks-gray text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.href}
                    className={`block w-full text-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                      plan.popular
                        ? "bg-monks-accent text-white hover:bg-monks-hover"
                        : "bg-monks-black text-white hover:bg-monks-accent"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-monks-black mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                q: "What's included in the free plan?",
                a: "The free plan includes 5 workflow deployments, basic AI agents, and community support."
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, we offer a 30-day money-back guarantee for all paid plans."
              },
              {
                q: "Is there a setup fee?",
                a: "No setup fees. You only pay for your monthly or annual subscription."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="font-semibold text-monks-black mb-2 text-sm sm:text-base">{faq.q}</h3>
                <p className="text-monks-gray text-sm sm:text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl text-white/80 mb-6 sm:mb-8 px-4 sm:px-0">
            Join thousands of teams already scaling with Findawise
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-monks-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300 group text-sm sm:text-base"
          >
            Start Free Trial
            <ArrowUpRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}