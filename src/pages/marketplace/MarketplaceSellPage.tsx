import React from "react";
import { ArrowUpRight, DollarSign, TrendingUp, Users } from "lucide-react";
import { PageHeader } from "../../components/layout/PageHeader";
import { ContentSection } from "../../components/ui/ContentSection";

export default function MarketplaceSellPage() {
  return (
    <div className="pt-20 min-h-screen">
      <PageHeader
        title="Sell Workflows & Assets on Findawise"
        description="Reach teams who deploy — list once, get production customers. Flexible pricing, licensing, and payout options."
        variant="dark"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-2 group">
            Create Your First Listing
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
        <p className="text-white/60 text-sm pt-4">
          70% of our creators set up their first listing in under 45 minutes.
        </p>
      </PageHeader>

      <ContentSection
        title="Why Sell on Findawise?"
        description="Join a marketplace designed for creators who build production-ready automation solutions."
        variant="default"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users size={24} className="text-monks-accent" />
            </div>
            <h3 className="font-semibold text-monks-black mb-2">Real buyers</h3>
            <p className="text-sm text-monks-gray">Enterprise & SMB pipelines</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-monks-accent" />
            </div>
            <h3 className="font-semibold text-monks-black mb-2">Flexible pricing</h3>
            <p className="text-sm text-monks-gray">One-time, subscription, usage-based</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-monks-accent" />
            </div>
            <h3 className="font-semibold text-monks-black mb-2">Built-in analytics</h3>
            <p className="text-sm text-monks-gray">Views, installs, revenue, conversion</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ArrowUpRight size={24} className="text-monks-accent" />
            </div>
            <h3 className="font-semibold text-monks-black mb-2">Payouts</h3>
            <p className="text-sm text-monks-gray">Stripe / Wise integration; weekly / monthly</p>
          </div>
        </div>
      </ContentSection>

      <ContentSection
        title="Creator Success"
        description="Join creators already earning revenue on our platform."
        variant="gray"
      >
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold text-monks-black mb-4">Marketplace Opening Soon</h3>
          <p className="text-monks-gray mb-8 max-w-md mx-auto">
            Be among the first creators when we launch. Join our creator waitlist for early access.
          </p>
          <button className="bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
            Join Creator Waitlist
          </button>
        </div>
      </ContentSection>
    </div>
  );
}