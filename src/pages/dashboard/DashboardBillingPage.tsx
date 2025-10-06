import { useState } from 'react';
import {
  CreditCard,
  Download,
  FileText,
  TrendingUp,
  Settings,
  Package,
  Receipt,
} from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { SubscriptionCard } from '../../components/billing/SubscriptionCard';
import { UsageDashboard } from '../../components/billing/UsageDashboard';
import { PricingTierComparison } from '../../components/billing/PricingTierComparison';
import { AddonMarketplace } from '../../components/billing/AddonMarketplace';
import { UpgradePrompt } from '../../components/billing/UpgradePrompt';
import { useSubscription } from '../../hooks/useSubscription';
import { usePricing } from '../../hooks/usePricing';

export default function DashboardBillingPage() {
  const {
    subscription,
    usageLimits,
    userAddons,
    loading,
    upgradeSubscription,
    cancelSubscription,
    purchaseAddon,
    getUsageWarnings,
  } = useSubscription();

  const { tiers, addons, formatPrice } = usePricing();

  const [activeTab, setActiveTab] = useState('overview');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const warnings = getUsageWarnings();
  const hasWarnings = warnings.length > 0;

  const handleUpgrade = () => {
    setActiveTab('plans');
  };

  const handleSelectTier = async (tier: any) => {
    if (!subscription) return;

    try {
      if (tier.slug === 'enterprise') {
        window.location.href = '/contact?type=sales';
        return;
      }

      const tierHierarchy = ['free', 'starter', 'professional', 'enterprise'];
      const currentIndex = tierHierarchy.indexOf(subscription.tier.slug);
      const newIndex = tierHierarchy.indexOf(tier.slug);

      if (newIndex > currentIndex) {
        await upgradeSubscription(tier.id);
      } else {
        const confirmed = window.confirm(
          'Downgrading will reduce your limits. Are you sure you want to continue?'
        );
        if (confirmed) {
          await upgradeSubscription(tier.id);
        }
      }
    } catch (error) {
      console.error('Failed to change plan:', error);
      alert('Failed to change plan. Please try again.');
    }
  };

  const handlePurchaseAddon = async (addon: any) => {
    try {
      await purchaseAddon(addon.id);
      alert(`Successfully purchased ${addon.name}!`);
    } catch (error) {
      console.error('Failed to purchase add-on:', error);
      alert('Failed to purchase add-on. Please try again.');
    }
  };

  const handleCancelSubscription = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your billing period."
    );

    if (confirmed) {
      try {
        await cancelSubscription();
      } catch (error) {
        console.error('Failed to cancel subscription:', error);
        alert('Failed to cancel subscription. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <PageHeader
        title="Billing & Subscription"
        description="Manage your subscription, usage limits, and add-ons"
      />

      {hasWarnings && subscription && (
        <div className="mb-6">
          <UpgradePrompt
            title="Approaching Usage Limits"
            description="You're reaching your plan limits. Upgrade or purchase add-ons to continue without interruption."
            currentUsage={80}
            limit={100}
            resourceType="resources"
            onUpgrade={handleUpgrade}
            variant="warning"
          />
        </div>
      )}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        tabs={[
          { id: 'overview', label: 'Overview', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'usage', label: 'Usage', icon: <FileText className="w-4 h-4" /> },
          { id: 'plans', label: 'Plans', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'addons', label: 'Add-ons', icon: <Package className="w-4 h-4" /> },
          { id: 'history', label: 'History', icon: <Receipt className="w-4 h-4" /> },
        ]}
      />

      <div className="mt-6">
        {activeTab === 'overview' && subscription && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SubscriptionCard
                subscription={subscription}
                onUpgrade={handleUpgrade}
                onCancel={handleCancelSubscription}
              />

              {billingCycle === 'monthly' && subscription.tier.priceYearly > 0 && (
                <Card className="p-6 bg-green-50 border-green-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-2">Save 20% with Annual Billing</h4>
                      <p className="text-sm text-gray-700 mb-3">
                        Switch to annual billing and save{' '}
                        {formatPrice(
                          subscription.tier.priceMonthly * 12 - subscription.tier.priceYearly
                        )}{' '}
                        per year.
                      </p>
                      <Button size="sm" variant="outline">
                        Switch to Annual
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoices
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveTab('usage')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Usage Details
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <UsageDashboard
            usageLimits={usageLimits}
            userAddons={userAddons}
            onUpgrade={handleUpgrade}
            onPurchaseAddon={(limitType) => {
              setActiveTab('addons');
            }}
          />
        )}

        {activeTab === 'plans' && (
          <PricingTierComparison
            tiers={tiers}
            currentTierSlug={subscription?.tier.slug}
            billingCycle={billingCycle}
            onSelectTier={handleSelectTier}
            onToggleBilling={setBillingCycle}
          />
        )}

        {activeTab === 'addons' && (
          <AddonMarketplace
            addons={addons}
            purchasedAddons={userAddons.map((a) => a.addonId)}
            onPurchase={handlePurchaseAddon}
          />
        )}

        {activeTab === 'history' && (
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Billing History</h3>
            <div className="text-center py-12 text-gray-500">
              <Receipt className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No billing history available yet</p>
            </div>
          </Card>
        )}
      </div>
    </Container>
  );
}
