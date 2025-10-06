import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, ChevronDown, ArrowUpRight } from 'lucide-react';

interface MegaNavProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

// Navigation data structure based on your specifications
const navigationData = [
  {
    title: "Product",
    href: "/platform",
    items: [
      { label: "Platform", href: "/platform", description: "Seven engines. One motion. Architecture, orchestration, guardrails." },
      { label: "Features", href: "#features", description: "Orchestration, observability, deployments, guardrails." },
      { label: "Roadmap", href: "/platform/roadmap", description: "See what's coming next" },
      { label: "Integrations", href: "/platform/integrations", description: "Connect with your tools" },
      { label: "Pricing & Plans", href: "/pricing", description: "Simple, transparent pricing" }
    ],
    cta: { label: "Explore Platform", href: "/platform" }
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    description: "Build, sell, and buy proven automations, workflows, and creative assets. Creators earn revenue — buyers get production-ready pieces with docs, patches, and support.",
    columns: [
      {
        heading: "Discover",
        links: [
          { label: "Marketplace Home", href: "/marketplace", description: "Featured collections, trending creators, curated bundles" },
          { label: "Browse Workflows", href: "/marketplace/workflows", description: "Production-ready automations" },
          { label: "Browse Assets", href: "/marketplace/assets", description: "Digital assets and templates" },
          { label: "Top Sellers", href: "/marketplace/top-sellers", description: "Most popular items" },
          { label: "Collections", href: "/marketplace/collections", description: "Curated bundles" }
        ]
      },
      {
        heading: "Create & Sell",
        links: [
          { label: "Sell on Findawise", href: "/marketplace/sell", description: "Join creators selling workflows & digital assets" },
          { label: "Create listing", href: "/marketplace/sell/new", description: "List your first item" },
          { label: "Creator Hub", href: "/marketplace/creator-hub", description: "Resources for creators" },
          { label: "Creator Dashboard", href: "/dashboard/creator", description: "Manage your listings" }
        ]
      },
      {
        heading: "Commerce & Compliance",
        links: [
          { label: "Licensing & IP", href: "/marketplace/licensing", description: "License types & templates" },
          { label: "Revenue share & fees", href: "/marketplace/fees", description: "Transparent fee structure" },
          { label: "Payout schedule", href: "/marketplace/payouts", description: "When you get paid" },
          { label: "Refunds & disputes", href: "/marketplace/refunds", description: "Buyer protection" }
        ]
      },
      {
        heading: "Creator Tools",
        links: [
          { label: "Listing templates", href: "/marketplace/tools/listing-templates", description: "Templates to get started" },
          { label: "Upload guide", href: "/marketplace/tools/upload", description: "How to upload assets" },
          { label: "Webhooks & APIs", href: "/marketplace/tools/webhooks", description: "Integrate with your tools" },
          { label: "Community", href: "/marketplace/community", description: "Connect with creators" }
        ]
      }
    ],
    ctas: [
      { label: "Browse Marketplace", href: "/marketplace", style: "primary" },
      { label: "Create Your First Listing", href: "/marketplace/sell/new", style: "secondary" }
    ]
  },
  {
    title: "Workflows",
    href: "/workflows",
    items: [
      { label: "Workflow Library", href: "/workflows", description: "350+ ready-to-deploy workflows" },
      { label: "How deploy works", href: "/workflows/how-it-works", description: "One-click deployment process" },
      { label: "Submit a workflow", href: "/workflows/submit", description: "Share your automation" }
    ]
  },
  {
    title: "Automation Services",
    href: "/automation",
    items: [
      { label: "Automation Services", href: "/automation", description: "We build it for you" },
      { label: "72h Pilot", href: "/automation/pilot", description: "Custom automation in 72 hours" },
      { label: "Use cases", href: "/automation/use-cases", description: "Real-world examples" }
    ]
  },
  {
    title: "Digital Assets",
    href: "/assets",
    items: [
      { label: "Digital Assets", href: "/assets", description: "Accelerators for growth" },
      { label: "Prompt Packs", href: "/assets/prompt-packs", description: "AI prompts for every use case" },
      { label: "Design Kits", href: "/assets/design-kits", description: "Complete design systems" },
      { label: "Templates", href: "/assets/templates", description: "UI, docs, and email templates" }
    ]
  },
  {
    title: "Agents",
    href: "/agents",
    items: [
      { label: "Agent Gallery", href: "/agents", description: "Agents that act, not just chat" },
      { label: "Deploy an Agent", href: "/agents/new", description: "Create your first agent" },
      { label: "Managed vs Self-host", href: "/agents/managed", description: "Choose your deployment" }
    ]
  },
  {
    title: "Enterprise",
    href: "/industries",
    items: [
      { label: "Industries", href: "/industries", description: "Solutions by industry" },
      { label: "Solutions", href: "/solutions", description: "Enterprise automation" },
      { label: "Contact Sales", href: "/contact?type=enterprise", description: "Talk to our team" }
    ]
  },
  {
    title: "Resources",
    href: "/blog",
    items: [
      { label: "Blog", href: "/blog", description: "Latest insights and trends" },
      { label: "Case studies", href: "/case-studies", description: "Customer success stories" },
      { label: "Docs", href: "/docs", description: "Technical documentation" }
    ]
  }
];

export default function MegaNav({ onSignIn, onSignUp }: MegaNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleMegaMenuEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(title);
    }, 160);
  };

  const handleMegaMenuLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 160);
  };

  const handleAnalyticsClick = (section: string, item: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'nav_click',
        section,
        item
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-elevated' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-3xl font-bold text-monks-black hover:text-monks-accent transition-colors duration-300"
              onClick={() => handleAnalyticsClick('Brand', 'Logo')}
            >
              <span className="font-light">Find</span><span className="italic">awise</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationData.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => (item.items || item.columns) && handleMegaMenuEnter(item.title)}
                onMouseLeave={handleMegaMenuLeave}
              >
                <Link
                  to={item.href}
                  className="flex items-center space-x-1 text-monks-black hover:text-monks-accent px-3 py-2 text-sm font-medium transition-colors duration-300"
                  onClick={() => handleAnalyticsClick('Navigation', item.title)}
                  aria-haspopup={!!(item.items || item.columns)}
                  aria-expanded={activeDropdown === item.title}
                >
                  <span>{item.title}</span>
                  {(item.items || item.columns) && <ChevronDown size={14} />}
                </Link>
                
                {/* Mega Menu Dropdown */}
                {(item.items || item.columns) && activeDropdown === item.title && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-elevated rounded-2xl border border-monks-gray/10 py-8 z-50 animate-slide-up"
                    style={{ width: item.columns ? '1000px' : '400px' }}
                    onMouseEnter={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    }}
                    onMouseLeave={handleMegaMenuLeave}
                  >
                    {item.description && (
                      <div className="px-8 pb-6 border-b border-monks-gray/10">
                        <p className="text-monks-gray text-sm">{item.description}</p>
                      </div>
                    )}
                    
                    {/* Marketplace Special Layout */}
                    {item.columns ? (
                      <div className="px-8">
                        {/* Marketplace Search */}
                        {item.title === 'Marketplace' && (
                          <div className="mb-6">
                            <div className="relative">
                              <Search size={16} className="absolute left-3 top-3 text-monks-gray" />
                              <input
                                type="text"
                                placeholder="Search marketplace..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-full bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent text-sm"
                                aria-label="Search marketplace"
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-4 gap-8">
                          {item.columns.map((column, i) => (
                            <div key={i}>
                              <h4 className="font-semibold text-monks-black mb-4 text-sm uppercase tracking-wider">
                                {column.heading}
                              </h4>
                              <ul className="space-y-3">
                                {column.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      to={link.href}
                                      className="block text-monks-gray hover:text-monks-accent transition-colors duration-300 text-sm group"
                                      onClick={() => handleAnalyticsClick(item.title, link.label)}
                                      data-analytics={JSON.stringify({
                                        event: 'nav_click',
                                        section: item.title,
                                        item: link.label
                                      })}
                                    >
                                      <div className="font-medium">{link.label}</div>
                                      {link.description && (
                                        <div className="text-xs text-monks-gray/70 mt-1">{link.description}</div>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        {/* CTAs */}
                        {item.ctas && (
                          <div className="flex gap-4 mt-8 pt-6 border-t border-monks-gray/10">
                            {item.ctas.map((cta, i) => (
                              <Link
                                key={i}
                                to={cta.href}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                  cta.style === 'primary'
                                    ? 'bg-monks-black text-white hover:bg-monks-accent'
                                    : 'border border-monks-gray text-monks-gray hover:border-monks-black hover:text-monks-black'
                                }`}
                                onClick={() => handleAnalyticsClick('Marketplace', cta.label)}
                                data-analytics={JSON.stringify({
                                  event: 'marketplace_cta',
                                  cta: cta.label
                                })}
                              >
                                {cta.label}
                                <ArrowUpRight size={14} />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Standard Dropdown */
                      <div className="px-8">
                        <ul className="space-y-3">
                          {item.items?.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                to={subItem.href}
                                className="block text-monks-gray hover:text-monks-accent transition-colors duration-300 text-sm group"
                                onClick={() => handleAnalyticsClick(item.title, subItem.label)}
                                data-analytics={JSON.stringify({
                                  event: 'nav_click',
                                  section: item.title,
                                  item: subItem.label
                                })}
                              >
                                <div className="font-medium">{subItem.label}</div>
                                {subItem.description && (
                                  <div className="text-xs text-monks-gray/70 mt-1">{subItem.description}</div>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        
                        {item.cta && (
                          <div className="mt-6 pt-6 border-t border-monks-gray/10">
                            <Link
                              to={item.cta.href}
                              className="flex items-center gap-2 text-monks-accent hover:text-monks-black transition-colors duration-300 font-medium"
                              onClick={() => handleAnalyticsClick(item.title, item.cta.label)}
                            >
                              {item.cta.label}
                              <ArrowUpRight size={14} />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300"
              onClick={() => {
                // Trigger search modal or focus search
                const searchEvent = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                document.dispatchEvent(searchEvent);
              }}
            >
              <Search size={18} />
            </button>
            <button
              onClick={onSignIn}
              className="flex items-center space-x-1 text-monks-gray hover:text-monks-black transition-colors duration-300"
            >
              <User size={14} />
              <span className="text-sm">Sign In</span>
            </button>
            <button
              onClick={onSignUp}
              className="bg-monks-black hover:bg-monks-accent text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-monks-gray hover:text-monks-black hover:bg-monks-light-gray focus:outline-none transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open main menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
          <div className="px-6 py-6 space-y-6">
            {/* Mobile Search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-monks-gray" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 rounded-full bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
              />
            </div>
            
            {/* Mobile Navigation */}
            {navigationData.map((item) => (
              <div key={item.title}>
                <Link
                  to={item.href}
                  className="flex items-center justify-between text-monks-black hover:text-monks-accent py-3 text-base font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{item.title}</span>
                </Link>
              </div>
            ))}
            
            {/* Mobile Actions */}
            <div className="pt-6 border-t border-monks-gray/10 space-y-3">
              <button
                onClick={() => {
                  onSignIn();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-monks-black hover:text-monks-accent py-3 text-base font-medium transition-colors duration-300"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  onSignUp();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-monks-black hover:bg-monks-accent text-white px-6 py-3 rounded-full text-base font-medium transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}