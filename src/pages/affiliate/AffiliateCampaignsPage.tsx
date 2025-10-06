import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Play, Pause, BarChart, Settings, TrendingUp } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { SearchInput } from "../../components/ui/SearchInput";

const campaigns = [
  {
    id: "1",
    name: "SaaS Platform Holiday Promo",
    status: "active",
    clicks: 1247,
    conversions: 89,
    revenue: 2250,
    epc: 1.81,
    startDate: "Dec 1, 2024",
    endDate: "Dec 31, 2024"
  },
  {
    id: "2",
    name: "E-commerce Tool Black Friday",
    status: "active",
    clicks: 890,
    conversions: 45,
    revenue: 1350,
    epc: 1.52,
    startDate: "Nov 25, 2024",
    endDate: "Nov 30, 2024"
  },
  {
    id: "3",
    name: "Marketing Suite Q4 Push",
    status: "paused",
    clicks: 2156,
    conversions: 156,
    revenue: 4680,
    epc: 2.17,
    startDate: "Oct 1, 2024",
    endDate: "Dec 31, 2024"
  }
];

export default function AffiliateCampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-monks-black mb-2">My Campaigns</h1>
            <p className="text-monks-gray">Manage and track your affiliate campaigns</p>
          </div>
          
          <Link
            to="/affiliate/campaigns/new"
            className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={16} />
            Create Campaign
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchInput
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="max-w-md"
          />
        </div>

        {/* Campaigns Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-3xl p-8 hover:shadow-card transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-monks-black">{campaign.name}</h3>
                    <Badge variant={campaign.status === 'active' ? 'success' : 'warning'}>
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300">
                      <Settings size={16} />
                    </button>
                    <button className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300">
                      <BarChart size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-monks-black">{campaign.clicks}</div>
                    <div className="text-sm text-monks-gray">Clicks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-monks-accent">{campaign.conversions}</div>
                    <div className="text-sm text-monks-gray">Conversions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">${campaign.revenue}</div>
                    <div className="text-sm text-monks-gray">Revenue</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-monks-black">${campaign.epc}</div>
                    <div className="text-sm text-monks-gray">EPC</div>
                  </div>
                </div>

                <div className="text-sm text-monks-gray">
                  <div>Start: {campaign.startDate}</div>
                  <div>End: {campaign.endDate}</div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex-1 bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2">
                    {campaign.status === 'active' ? (
                      <>
                        <Pause size={14} />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        Resume
                      </>
                    )}
                  </button>
                  <Link
                    to={`/affiliate/campaigns/${campaign.id}`}
                    className="flex-1 border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300 text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Summary */}
        <div className="mt-12 bg-white rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-monks-black mb-6">Performance Summary</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 bg-monks-light-gray rounded-2xl">
              <TrendingUp size={24} className="text-monks-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-monks-black">7.4%</div>
              <div className="text-sm text-monks-gray">Average Conversion Rate</div>
            </div>
            
            <div className="text-center p-6 bg-monks-light-gray rounded-2xl">
              <DollarSign size={24} className="text-green-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-monks-black">$1.83</div>
              <div className="text-sm text-monks-gray">Average EPC</div>
            </div>
            
            <div className="text-center p-6 bg-monks-light-gray rounded-2xl">
              <Users size={24} className="text-blue-500 mx-auto mb-3" />
              <div className="text-2xl font-bold text-monks-black">3</div>
              <div className="text-sm text-monks-gray">Active Campaigns</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}