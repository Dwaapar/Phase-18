import { useState } from 'react';
import { Plus, TrendingUp, MousePointer, DollarSign, Play, Pause, CreditCard as Edit, Trash2 } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';

interface Campaign {
  id: string;
  name: string;
  description: string;
  tracking_code: string;
  status: 'active' | 'paused' | 'completed';
  start_date: string;
  end_date?: string;
  clicks: number;
  conversions: number;
  revenue: number;
  commission: number;
  budget: number;
  spent: number;
}

export default function AffiliateCampaignManagerPage() {
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Q1 Workflow Promotion',
      description: 'Promoting workflow marketplace to enterprise audience',
      tracking_code: 'Q1-WORKFLOWS-2025',
      status: 'active',
      start_date: '2025-01-01',
      end_date: '2025-03-31',
      clicks: 1247,
      conversions: 23,
      revenue: 12450,
      commission: 2490,
      budget: 5000,
      spent: 1850
    },
    {
      id: '2',
      name: 'LinkedIn AI Agents Campaign',
      description: 'Targeting tech leaders on LinkedIn with AI agent content',
      tracking_code: 'LI-AGENTS-JAN',
      status: 'active',
      start_date: '2025-01-15',
      clicks: 892,
      conversions: 18,
      revenue: 8940,
      commission: 1341,
      budget: 3000,
      spent: 1200
    },
    {
      id: '3',
      name: 'Holiday Sale 2024',
      description: 'Year-end promotion across all channels',
      tracking_code: 'HOLIDAY-2024',
      status: 'completed',
      start_date: '2024-11-15',
      end_date: '2024-12-31',
      clicks: 3542,
      conversions: 67,
      revenue: 34280,
      commission: 6856,
      budget: 10000,
      spent: 8500
    }
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    tracking_code: '',
    budget: '',
    start_date: '',
    end_date: ''
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="success">Active</Badge>;
      case 'paused': return <Badge variant="warning">Paused</Badge>;
      case 'completed': return <Badge>Completed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const calculateConversionRate = (clicks: number, conversions: number) => {
    return clicks > 0 ? ((conversions / clicks) * 100).toFixed(2) : '0.00';
  };

  const calculateROI = (revenue: number, spent: number) => {
    return spent > 0 ? (((revenue - spent) / spent) * 100).toFixed(0) : '0';
  };

  const handleCreateCampaign = () => {
    console.log('Creating campaign:', newCampaign);
    setShowNewCampaign(false);
    setNewCampaign({
      name: '',
      description: '',
      tracking_code: '',
      budget: '',
      start_date: '',
      end_date: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Campaign Manager</h1>
            <p className="text-slate-600">
              Track and manage your affiliate marketing campaigns
            </p>
          </div>
          <Button onClick={() => setShowNewCampaign(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Total Campaigns</p>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">{campaigns.length}</p>
            <p className="text-sm text-green-600 mt-1">
              {campaigns.filter(c => c.status === 'active').length} active
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Total Clicks</p>
              <MousePointer className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {campaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Total Conversions</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-600">Total Commission</p>
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900">
              ${campaigns.reduce((sum, c) => sum + c.commission, 0).toLocaleString()}
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          {campaigns.map(campaign => (
            <Card key={campaign.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{campaign.name}</h3>
                    {getStatusBadge(campaign.status)}
                  </div>
                  <p className="text-slate-600 mb-2">{campaign.description}</p>
                  <div className="flex items-center gap-6 text-sm text-slate-500">
                    <span>Code: <code className="font-mono bg-slate-100 px-2 py-1 rounded">{campaign.tracking_code}</code></span>
                    <span>{campaign.start_date} {campaign.end_date && `- ${campaign.end_date}`}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {campaign.status === 'active' ? (
                    <Button size="sm" variant="outline">
                      <Pause className="w-4 h-4" />
                    </Button>
                  ) : campaign.status === 'paused' ? (
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4" />
                    </Button>
                  ) : null}
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-6 gap-6">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Clicks</p>
                  <p className="text-2xl font-bold text-slate-900">{campaign.clicks.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Conversions</p>
                  <p className="text-2xl font-bold text-slate-900">{campaign.conversions}</p>
                  <p className="text-xs text-green-600">
                    {calculateConversionRate(campaign.clicks, campaign.conversions)}% CVR
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Revenue</p>
                  <p className="text-2xl font-bold text-slate-900">${campaign.revenue.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Commission</p>
                  <p className="text-2xl font-bold text-slate-900">${campaign.commission.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">Budget</p>
                  <p className="text-2xl font-bold text-slate-900">${campaign.budget.toLocaleString()}</p>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    ${campaign.spent.toLocaleString()} spent
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">ROI</p>
                  <p className="text-2xl font-bold text-green-600">
                    {calculateROI(campaign.revenue, campaign.spent)}%
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Modal
          isOpen={showNewCampaign}
          onClose={() => setShowNewCampaign(false)}
          title="Create New Campaign"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Campaign Name
              </label>
              <Input
                value={newCampaign.name}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Q1 2025 Workflow Promotion"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <Textarea
                value={newCampaign.description}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your campaign goals and strategy..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tracking Code
              </label>
              <Input
                value={newCampaign.tracking_code}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, tracking_code: e.target.value }))}
                placeholder="e.g., Q1-PROMO-2025"
              />
              <p className="text-sm text-slate-500 mt-1">
                Use this code to track this campaign separately in your analytics
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={newCampaign.start_date}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, start_date: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  End Date (Optional)
                </label>
                <Input
                  type="date"
                  value={newCampaign.end_date}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, end_date: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Budget (Optional)
              </label>
              <Input
                type="number"
                value={newCampaign.budget}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: e.target.value }))}
                placeholder="5000"
              />
              <p className="text-sm text-slate-500 mt-1">
                Set a budget to track campaign spend
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowNewCampaign(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCampaign}
                className="flex-1"
                disabled={!newCampaign.name || !newCampaign.tracking_code}
              >
                Create Campaign
              </Button>
            </div>
          </div>
        </Modal>
      </Container>
    </div>
  );
}
