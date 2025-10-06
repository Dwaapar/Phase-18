import React from "react";
import { Search, TrendingUp, Star, Download } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";

export default function MarketplacePage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Marketplace"
        description="Build, sell, and buy proven automations, workflows, and creative assets. Creators earn revenue — buyers get production-ready pieces with docs, patches, and support."
        variant="dark"
      />

      <ContentSection
        title="Featured Collections"
        description="Curated bundles and trending items from our creator community."
        variant="default"
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-monks-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <TrendingUp size={32} className="text-monks-accent" />
          </div>
          <h3 className="text-2xl font-bold text-monks-black mb-4">Marketplace Coming Soon</h3>
          <p className="text-monks-gray mb-8 max-w-md mx-auto">
            We're building an amazing marketplace for creators and buyers. Join the waitlist to be notified when it launches.
          </p>
          <button className="bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
            Join Waitlist
          </button>
        </div>
      </ContentSection>
    </div>
  );
}