import React from "react";
import { Link } from "react-router-dom";
import DomainCard from "./DomainCard";

const domains = [
  {
    title: "Automation Services",
    subtitle: "We do it for you.",
    bullets: ["Lead routing", "Finance ops", "Ticket triage", "KPI reporting"],
    mainCta: { label: "Book 72h Pilot", href: "/automation/pilot" },
    secondaryCta: { label: "Explore Services", href: "/automation" },
  },
  {
    title: "Workflow Store",
    subtitle: "Prebuilt flows, 1-click deploy.",
    bullets: ["1-click deploy", "Env/secrets", "Patch notes", "Evergreen guides"],
    mainCta: { label: "Browse 350+", href: "/workflows" },
    secondaryCta: { label: "My Workflows", href: "/dashboard/workflows" },
  },
  {
    title: "Digital Assets",
    subtitle: "Accelerators for growth.",
    bullets: ["Prompt packs", "Datasets", "Playbooks", "Creative bundles"],
    mainCta: { label: "Download & Go Live", href: "/assets" },
    secondaryCta: { label: "My Library", href: "/dashboard/library" },
  },
  {
    title: "AI Agents",
    subtitle: "Agents that act, not just chat.",
    bullets: ["SDR", "Support", "Ops", "Managed/self-host"],
    mainCta: { label: "Deploy Your First Agent", href: "/agents/new" },
    secondaryCta: { label: "Agent Gallery", href: "/agents" },
  },
  {
    title: "Affiliate Hub",
    subtitle: "Promote the best brands.",
    bullets: ["Smart links", "Creative rotation", "Real-time EPC/CVR"],
    mainCta: { label: "Open Affiliate Hub", href: "/affiliate" },
    secondaryCta: { label: "My Offers", href: "/dashboard/affiliate" },
  },
  {
    title: "Decision Platform",
    subtitle: "Clarity in the chaos.",
    bullets: ["Best-X-for-Y", "Comparisons", "Adaptive quizzes"],
    mainCta: { label: "Take the 2-Minute Quiz", href: "/decision/quiz" },
    secondaryCta: { label: "Explore Guides", href: "/decision/guides" },
  },
  {
    title: "Services & Tools",
    subtitle: "Practical utilities.",
    bullets: ["Resume Maker", "Cover Letter", "Portfolio", "Email Optimizer"],
    mainCta: { label: "Try Tools Now", href: "/tools" },
  },
];

export default function DomainsGrid() {
  return (
    <section id="domains" className="py-24 bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-monks-black mb-6">Seven Integrated Platforms</h2>
          <p className="text-xl text-monks-gray max-w-3xl mx-auto leading-relaxed">
            Each platform is a complete ecosystem designed to accelerate your business operations with precision and intelligence.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, i) => (
            <DomainCard key={i} {...domain} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

{/* Alternative minimal grid */}
export function MinimalDomainsGrid() {
  return (
    <section id="domains" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-display font-bold text-monks-black">
              Seven platforms.<br />One ecosystem.
            </h2>
            <p className="text-xl text-monks-gray leading-relaxed">
              From automation to decision-making, each platform works seamlessly together to accelerate your growth.
            </p>
          </div>
          <div className="grid gap-6">
            {domains.slice(0, 4).map((domain, i) => (
              <div key={i} className="border-b border-monks-gray/20 pb-6 last:border-b-0">
                <h3 className="text-xl font-semibold text-monks-black mb-2">{domain.title}</h3>
                <p className="text-monks-gray">{domain.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

{/* Grid with hover effects */}
export function InteractiveDomainsGrid() {
  return (
    <section id="domains" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-monks-black mb-6">Platform Overview</h2>
        </div>
        <div className="grid gap-1 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, i) => (
            <div key={i} className="group p-8 hover:bg-monks-light-gray transition-all duration-500 cursor-pointer">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-monks-accent/20 transition-colors duration-300">
                  <div className="w-6 h-6 bg-monks-accent rounded-lg"></div>
                </div>
                <h3 className="text-xl font-semibold text-monks-black">{domain.title}</h3>
                <p className="text-monks-gray">{domain.subtitle}</p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link 
                    to={domain.mainCta.href}
                    className="text-monks-accent font-medium hover:underline"
                  >
                    {domain.mainCta.label} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}