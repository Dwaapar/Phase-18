import React from "react";
import CinematicHero from "../components/homepage/CinematicHero";
import WisdomLayer from "../components/homepage/WisdomLayer";
import SevenEngines from "../components/homepage/SevenEngines";
import LivePreviewTabs from "../components/homepage/LivePreviewTabs";
import HowItWorks from "../components/homepage/HowItWorks";
import EnterpriseOutcomes from "../components/homepage/EnterpriseOutcomes";
import { PremiumTestimonials } from "../components/ui/PremiumTestimonials";
import TrustSection from "../components/homepage/TrustSection";
import FinalCTA from "../components/homepage/FinalCTA";
import ClientsSection from "../components/homepage/ClientsSection";
import WorkShowcase from "../components/homepage/WorkShowcase";
import InsightsSection from "../components/homepage/InsightsSection";
import MarketplaceFeature from "../components/homepage/MarketplaceFeature";

const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "VP Operations",
    company: "TechFlow",
    quote: "Findawise transformed our operations completely. We now run 10x faster with half the manual work. The 72h pilot delivered immediate results that exceeded our expectations.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    results: [
      { metric: "MQL Uplift", value: "+23%" },
      { metric: "Response Time", value: "-67%" },
      { metric: "Efficiency", value: "+40%" }
    ]
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "Founder & CEO",
    company: "GrowthLabs",
    quote: "The automation platform is incredible. Our MQL conversion jumped 23% in the first week, and the AI agents handle complex tasks that used to take our team hours.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    results: [
      { metric: "Revenue Growth", value: "+150%" },
      { metric: "Time Savings", value: "40h/week" },
      { metric: "Team Productivity", value: "+85%" }
    ]
  },
  {
    id: "3",
    name: "Emily Watson",
    role: "Head of Revenue",
    company: "ScaleUp Inc",
    quote: "Finally, a platform that connects decision-making with execution. The workflow store saved us months of development time, and the results speak for themselves.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    results: [
      { metric: "Development Time", value: "-80%" },
      { metric: "ROI", value: "450%" },
      { metric: "Deployment Speed", value: "10x faster" }
    ]
  }
];

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <ClientsSection />
      <MarketplaceFeature />
      <WisdomLayer />
      <SevenEngines />
      <WorkShowcase />
      <LivePreviewTabs />
      <HowItWorks />
      <EnterpriseOutcomes />
      <PremiumTestimonials testimonials={testimonials} />
      <InsightsSection />
      <TrustSection />
      <FinalCTA />
    </>
  );
}