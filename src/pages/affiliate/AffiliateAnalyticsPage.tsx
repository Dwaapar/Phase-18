import React from "react";
import { TrendingUp, DollarSign, MousePointer, Users, Calendar, Download } from "lucide-react";
import { StatsCard } from "../../components/ui/StatsCard";
import { LineChart, BarChart } from "../../components/ui/Chart";
import { DatePicker } from "../../components/ui/DatePicker";

const performanceData = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1800 },
  { label: "Mar", value: 1600 },
  { label: "Apr", value: 2200 },
  { label: "May", value: 2800 },
  { label: "Jun", value: 3200 }
];

const topCampaigns = [
  { name: "SaaS Platform", revenue: 2450, clicks: 1200, conversions: 89 },
  { name: "E-commerce Tool", revenue: 1850, clicks: 950, conversions: 67 },
  { name: "Marketing Suite", revenue: 3200, clicks: 1500, conversions: 120 },
  { name: "Design Software", revenue: 1650, clicks: 800, conversions: 55 }
];

export default function AffiliateAnalyticsPage() {
  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-monks-black mb-2">Affiliate Analytics</h1>
            <p className="text-monks-gray">Track your affiliate performance and optimize campaigns</p>
          </div>
          
          <div className="flex items-center gap-4">
            <DatePicker placeholder="Select date range" />
            <button className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center gap-2">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatsCard
            title="Total Revenue"
            value={9150}
            prefix="$"
            icon={DollarSign}
            trend={{ value: 18, isPositive: true }}
          />
          <StatsCard
            title="Total Clicks"
            value={4450}
            icon={MousePointer}
            trend={{ value: 25, isPositive: true }}
          />
          <StatsCard
            title="Conversions"
            value={331}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Conversion Rate"
            value={7.4}
            suffix="%"
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6">Revenue Trend</h2>
            <LineChart data={performanceData} />
          </div>

          {/* Top Campaigns */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6">Top Performing Campaigns</h2>
            <div className="space-y-4">
              {topCampaigns.map((campaign, i) => (
                <div key={i} className="p-4 bg-monks-light-gray rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-monks-black">{campaign.name}</h3>
                    <span className="text-lg font-bold text-green-600">${campaign.revenue}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-monks-gray">Clicks</div>
                      <div className="font-medium text-monks-black">{campaign.clicks}</div>
                    </div>
                    <div>
                      <div className="text-monks-gray">Conversions</div>
                      <div className="font-medium text-monks-black">{campaign.conversions}</div>
                    </div>
                    <div>
                      <div className="text-monks-gray">CVR</div>
                      <div className="font-medium text-monks-accent">
                        {((campaign.conversions / campaign.clicks) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}