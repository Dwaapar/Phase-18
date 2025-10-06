import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, Calendar, DollarSign } from "lucide-react";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

const availableOffers = [
  {
    id: "1",
    name: "SaaS Platform Pro",
    category: "Software",
    commission: "30%",
    epc: "$2.50",
    description: "All-in-one business management platform"
  },
  {
    id: "2",
    name: "E-commerce Builder",
    category: "E-commerce", 
    commission: "25%",
    epc: "$1.80",
    description: "Drag-and-drop online store builder"
  },
  {
    id: "3",
    name: "Marketing Automation Suite",
    category: "Marketing",
    commission: "35%", 
    epc: "$3.20",
    description: "Complete marketing automation platform"
  }
];

export default function NewCampaignPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const [campaignData, setCampaignData] = useState({
    name: "",
    offer: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addToast({
        type: 'success',
        title: 'Campaign created!',
        description: 'Your affiliate campaign has been created successfully.'
      });
      // Redirect to campaigns page
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Creation failed',
        description: 'Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <Link
          to="/affiliate/campaigns"
          className="inline-flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300 mb-8"
        >
          <ArrowLeft size={16} />
          Back to Campaigns
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-monks-black mb-2">Create New Campaign</h1>
          <p className="text-monks-gray">Set up a new affiliate marketing campaign</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6">Campaign Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Campaign Name</label>
                <input
                  type="text"
                  value={campaignData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  placeholder="e.g., Holiday SaaS Promotion"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Select Offer</label>
                <select
                  value={campaignData.offer}
                  onChange={(e) => handleInputChange("offer", e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                >
                  <option value="">Choose an offer</option>
                  {availableOffers.map((offer) => (
                    <option key={offer.id} value={offer.id}>
                      {offer.name} - {offer.commission} commission
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">Start Date</label>
                  <input
                    type="date"
                    value={campaignData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">End Date</label>
                  <input
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Budget (Optional)</label>
                <input
                  type="number"
                  value={campaignData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  placeholder="Monthly budget in USD"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Description</label>
                <textarea
                  value={campaignData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
                  placeholder="Describe your campaign strategy..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Creating Campaign...
                  </>
                ) : (
                  'Create Campaign'
                )}
              </button>
            </form>
          </div>

          {/* Available Offers */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6">Available Offers</h2>
            
            <div className="space-y-4">
              {availableOffers.map((offer) => (
                <div key={offer.id} className="p-6 bg-monks-light-gray rounded-2xl">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-monks-black">{offer.name}</h3>
                      <Badge variant="accent" size="sm">{offer.category}</Badge>
                    </div>
                    
                    <p className="text-sm text-monks-gray">{offer.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-monks-gray">Commission: </span>
                          <span className="font-medium text-monks-black">{offer.commission}</span>
                        </div>
                        <div>
                          <span className="text-monks-gray">EPC: </span>
                          <span className="font-medium text-monks-accent">{offer.epc}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleInputChange("offer", offer.id)}
                        className="text-monks-accent hover:text-monks-black transition-colors duration-300 font-medium"
                      >
                        Select
                      </button>
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