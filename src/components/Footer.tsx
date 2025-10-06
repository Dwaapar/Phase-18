import React from "react";
import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Automation", href: "/automation" },
      { label: "Workflows", href: "/workflows" },
      { label: "Assets", href: "/assets" },
      { label: "Agents", href: "/agents" },
      { label: "Affiliate", href: "/affiliate" },
      { label: "Decision", href: "/decision" },
      { label: "Tools", href: "/tools" },
    ]
  },
  {
    title: "Enterprise",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Solutions", href: "/solutions" },
      { label: "Platform", href: "/platform" },
      { label: "Security", href: "/security" },
      { label: "Compliance", href: "/compliance" },
      { label: "Pricing", href: "/pricing" },
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Guides", href: "/guides" },
      { label: "Docs", href: "/docs" },
      { label: "API", href: "/api" },
      { label: "Templates", href: "/templates" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "/status" },
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Community", href: "/community" },
      { label: "University", href: "/university" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-monks-dark-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="text-3xl font-bold text-white">
              <span className="font-light">Find</span><span className="italic">awise</span>
            </Link>
            <p className="text-white/60 leading-relaxed text-sm sm:text-base">
              The wisdom layer for execution. Turn every decision into momentum.
            </p>
          </div>
          
          {footerSections.map((section, i) => (
            <div key={i} className="space-y-4">
              <h4 className="font-semibold text-white text-sm sm:text-base">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      to={link.href} 
                      className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Findawise. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-end">
            <Link to="/legal/privacy" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Privacy Policy</Link>
            <Link to="/legal/terms" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Terms of Service</Link>
            <Link to="/legal/cookies" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Cookies</Link>
            <Link to="/legal/dpa" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">DPA</Link>
            <a href="https://linkedin.com/company/findawise" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">LinkedIn</a>
            <a href="https://twitter.com/findawise" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">X</a>
            <a href="https://youtube.com/@findawise" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}