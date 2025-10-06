import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  MousePointer,
  ShoppingCart,
  DollarSign,
  Clock,
  Copy,
  ExternalLink,
  Download,
  Calendar,
  Award,
  AlertCircle
} from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { affiliateService } from '../../services/affiliate.service';
import type { Affiliate, AffiliateStats } from '../../types/affiliate.types';

export default function AffiliateDashboardPage() {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year' | 'all'>('month');
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [period]);

  const loadData = async () => {
    try {
      const affiliateData = await affiliateService.getMyAffiliateAccount();
      if (!affiliateData) {
        window.location.href = '/affiliate/apply';
        return;
      }

      setAffiliate(affiliateData);

      const statsData = await affiliateService.getAffiliateStats(affiliateData.id, period);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading affiliate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyAffiliateLink = (url: string) => {
    if (!affiliate) return;

    const affiliateUrl = affiliateService.generateAffiliateLink(affiliate.affiliate_code, url);
    navigator.clipboard.writeText(affiliateUrl);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-gradient-to-r from-slate-400 to-slate-600 text-white';
      case 'gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'silver': return 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge variant="success">Approved</Badge>;
      case 'pending': return <Badge variant="warning">Pending Review</Badge>;
      case 'suspended': return <Badge variant="error">Suspended</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your affiliate dashboard...</p>
        </div>
      </div>
    );
  }

  if (!affiliate) return null;

  if (affiliate.status === 'pending') {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <Container>
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Application Under Review</h1>
            <p className="text-slate-600 mb-6">
              Thank you for applying to the Findawise Affiliate Program. Your application is currently
              being reviewed by our team. We'll notify you via email once a decision has been made.
            </p>
            <p className="text-sm text-slate-500">
              Expected review time: 2-3 business days
            </p>
          </Card>
        </Container>
      </div>
    );
  }

  const quickLinks = [
    { name: 'Homepage', url: '/' },
    { name: 'Workflows', url: '/workflows' },
    { name: 'Agents', url: '/agents' },
    { name: 'Digital Assets', url: '/assets' },
    { name: 'Pricing', url: '/pricing' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Affiliate Dashboard</h1>
              <p className="text-slate-600">Welcome back, {affiliate.company_name || 'Affiliate'}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg font-semibold ${getTierColor(affiliate.tier)}`}>
                {affiliate.tier.toUpperCase()} TIER
              </div>
              {getStatusBadge(affiliate.status)}
            </div>
          </div>

          <div className="flex items-center gap-6 p-4 bg-white rounded-lg border border-slate-200">
            <div className="flex-1">
              <p className="text-sm text-slate-600 mb-1">Your Affiliate Code</p>
              <div className="flex items-center gap-2">
                <code className="text-lg font-mono font-semibold text-blue-600">
                  {affiliate.affiliate_code}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(affiliate.affiliate_code);
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to="/affiliate/campaigns">
                <Button variant="outline">Campaigns</Button>
              </Link>
              <Link to="/affiliate/creatives">
                <Button variant="outline">Marketing Assets</Button>
              </Link>
              <Link to="/affiliate/payouts">
                <Button>Payouts</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={period === 'day' ? 'primary' : 'outline'}
              onClick={() => setPeriod('day')}
            >
              Today
            </Button>
            <Button
              size="sm"
              variant={period === 'week' ? 'primary' : 'outline'}
              onClick={() => setPeriod('week')}
            >
              Week
            </Button>
            <Button
              size="sm"
              variant={period === 'month' ? 'primary' : 'outline'}
              onClick={() => setPeriod('month')}
            >
              Month
            </Button>
            <Button
              size="sm"
              variant={period === 'year' ? 'primary' : 'outline'}
              onClick={() => setPeriod('year')}
            >
              Year
            </Button>
            <Button
              size="sm"
              variant={period === 'all' ? 'primary' : 'outline'}
              onClick={() => setPeriod('all')}
            >
              All Time
            </Button>
          </div>
        </div>

        {stats && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Total Clicks</p>
                <MousePointer className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.clicks.toLocaleString()}</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Conversions</p>
                <ShoppingCart className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">{stats.conversions.toLocaleString()}</p>
              <p className="text-sm text-slate-600 mt-1">
                {stats.conversionRate.toFixed(2)}% conversion rate
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Total Revenue</p>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">
                ${stats.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Commission Earned</p>
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900">
                ${stats.commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-green-600 mt-1">
                ${stats.pendingCommission.toFixed(2)} pending
              </p>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Link Generator</h2>
              <p className="text-slate-600 mb-4">
                Generate affiliate links for any Findawise page to start earning commissions
              </p>

              <div className="space-y-3">
                {quickLinks.map(link => (
                  <div
                    key={link.url}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-900">{link.name}</p>
                        <p className="text-sm text-slate-500">{link.url}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyAffiliateLink(link.url)}
                    >
                      {copiedLink === link.url ? (
                        <>Copied!</>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Your affiliate links include a 30-day cookie. Conversions within 30 days of the
                  initial click will be credited to you.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <Link to="/affiliate/analytics">
                  <Button size="sm" variant="outline">View All</Button>
                </Link>
              </div>

              <div className="text-center py-8 text-slate-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm mt-1">Start promoting to see your clicks and conversions here</p>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Commission Summary</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">Pending Approval</span>
                    <span className="font-semibold text-yellow-600">
                      ${stats?.pendingCommission.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500" style={{ width: '0%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">Paid Out</span>
                    <span className="font-semibold text-green-600">
                      ${stats?.paidCommission.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-2">Next Payout</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${stats?.pendingCommission.toFixed(2) || '0.00'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Minimum payout: $100.00
                </p>
              </div>

              <Link to="/affiliate/payouts" className="block mt-4">
                <Button className="w-full">View Payout History</Button>
              </Link>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Performance Bonus</h2>
              </div>

              <p className="text-sm text-slate-600 mb-4">
                Earn bonus commissions when you reach revenue milestones
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">$10,000+</span>
                  <span className="font-semibold text-slate-900">+2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">$25,000+</span>
                  <span className="font-semibold text-slate-900">+5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">$50,000+</span>
                  <span className="font-semibold text-slate-900">+10%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Marketing Resources</h2>

              <div className="space-y-3">
                <Link to="/affiliate/creatives" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Banners
                  </Button>
                </Link>

                <Link to="/affiliate/creatives?type=email" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Email Templates
                  </Button>
                </Link>

                <Link to="/affiliate/creatives?type=social" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Social Media Posts
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
