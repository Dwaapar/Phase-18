import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, DollarSign, Link2, BarChart, ArrowUpRight } from "lucide-react";
import { StatsCard } from "../../components/ui/StatsCard";
import { Badge } from "../../components/ui/Badge";

const campaigns = [
  {
    id: "1",
    name: "SaaS Platform Promotion",
    status: "active",
    clicks: 1247,
    conversions: 89,
    revenue: 2250,
    epc: 1.81
  },
  {
    id: "2",
    name: "E-commerce Tool Campaign",
    status: "active", 
    clicks: 890,
    conversions: 45,
    revenue: 1350,
    epc: 1.52
  },
  {
    id: "3",
    name: "Marketing Suite Promo",
    status: "paused",
    clicks: 2156,
    conversions: 156,
    revenue: 4680,
    epc: 2.17
  }
];

const topOffers = [
  { name: "SaaS Platform", epc: "$2.50", category: "Software" },
  { name: "E-commerce Tool", epc: "$1.80", category: "E-commerce" },
  { name: "Marketing Suite", epc: "$3.20", category: "Marketing" },
  { name: "Design Software", epc: "$2.10", category: "Design" }
];

export default function DashboardAffiliatePage() {
  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-monks-black mb-2">Affiliate Dashboard</h1>
            <p className="text-monks-gray">Track your affiliate performance and earnings</p>
          </div>
          
          <Link
            to="/affiliate"
            className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center gap-2"
          >
            <Link2 size={16} />
            Browse Offers
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatsCard
            title="Total Revenue"
            value={8280}
            prefix="$"
            icon={DollarSign}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Total Clicks"
            value={4293}
            icon={Link2}
            trend={{ value: 22, isPositive: true }}
          />
          <StatsCard
            title="Conversions"
            value={290}
            icon={TrendingUp}
            trend={{ value: 18, isPositive: true }}
          />
          <StatsCard
            title="Average EPC"
            value={1.93}
            prefix="$"
            icon={BarChart}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Campaigns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-monks-black">My Campaigns</h2>
                <Link
                  to="/affiliate/campaigns/new"
                  className="text-monks-accent hover:text-monks-black transition-colors duration-300 font-medium"
                >
                  Create Campaign
                </Link>
              </div>
              
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="p-6 bg-monks-light-gray rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-monks-black">{campaign.name}</h3>
                        <Badge variant={campaign.status === 'active' ? 'success' : 'warning'} size="sm">
                          {campaign.status}
                        </Badge>
                      </div>
                      <button className="text-monks-gray hover:text-monks-black transition-colors duration-300">
                        <BarChart size={16} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-monks-black">{campaign.clicks}</div>
                        <div className="text-xs text-monks-gray">Clicks</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-monks-accent">{campaign.conversions}</div>
                        <div className="text-xs text-monks-gray">Conversions</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">${campaign.revenue}</div>
                        <div className="text-xs text-monks-gray">Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-monks-black">${campaign.epc}</div>
                        <div className="text-xs text-monks-gray">EPC</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Offers */}
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-6">Top Performing Offers</h3>
              <div className="space-y-4">
                {topOffers.map((offer, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-monks-light-gray rounded-2xl">
                    <div>
                      <h4 className="font-medium text-monks-black">{offer.name}</h4>
                      <p className="text-sm text-monks-gray">{offer.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-monks-accent">{offer.epc}</div>
                      <div className="text-xs text-monks-gray">EPC</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/affiliate/campaigns/new"
                  className="block p-4 bg-monks-light-gray rounded-2xl hover:bg-monks-accent hover:text-white transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Create Campaign</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </Link>
                
                <Link
                  to="/affiliate/analytics"
                  className="block p-4 bg-monks-light-gray rounded-2xl hover:bg-monks-accent hover:text-white transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">View Analytics</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </Link>
                
                <Link
                  to="/affiliate/payouts"
                  className="block p-4 bg-monks-light-gray rounded-2xl hover:bg-monks-accent hover:text-white transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Payout History</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}