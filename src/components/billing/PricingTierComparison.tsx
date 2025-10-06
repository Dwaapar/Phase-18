import { Check, X, Zap, Star, Crown } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { PricingTier } from '../../types/platform.types';

interface PricingTierComparisonProps {
  tiers: PricingTier[];
  currentTierSlug?: string;
  billingCycle: 'monthly' | 'annual';
  onSelectTier: (tier: PricingTier) => void;
  onToggleBilling: (cycle: 'monthly' | 'annual') => void;
}

export function PricingTierComparison({
  tiers,
  currentTierSlug,
  billingCycle,
  onSelectTier,
  onToggleBilling,
}: PricingTierComparisonProps) {
  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(0);
  };

  const getAnnualSavings = (tier: PricingTier) => {
    const monthlyTotal = tier.priceMonthly * 12;
    const annualPrice = tier.priceYearly;
    const savings = monthlyTotal - annualPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { savings, percentage };
  };

  const getTierIcon = (slug: string) => {
    switch (slug) {
      case 'free':
        return null;
      case 'starter':
        return <Zap className="w-5 h-5" />;
      case 'professional':
        return <Star className="w-5 h-5" />;
      case 'enterprise':
        return <Crown className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const isCurrentTier = (slug: string) => slug === currentTierSlug;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => onToggleBilling('monthly')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            billingCycle === 'monthly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onToggleBilling('annual')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            billingCycle === 'annual'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Annual
          <Badge className="ml-2 bg-green-100 text-green-700 border-0">Save 20%</Badge>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => {
          const price =
            billingCycle === 'annual' ? tier.priceYearly / 12 : tier.priceMonthly;
          const fullPrice = billingCycle === 'annual' ? tier.priceYearly : tier.priceMonthly;
          const { savings, percentage } = getAnnualSavings(tier);
          const isCurrent = isCurrentTier(tier.slug);
          const isPopular = tier.slug === 'professional';
          const features = tier.features as any;
          const limits = tier.limits as any;

          return (
            <Card
              key={tier.id}
              className={`relative p-6 ${
                isPopular ? 'border-2 border-blue-600 shadow-lg' : ''
              } ${isCurrent ? 'ring-2 ring-blue-300' : ''}`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}

              {isCurrent && (
                <div className="absolute -top-3 right-4">
                  <Badge variant="success">Current Plan</Badge>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  {getTierIcon(tier.slug)}
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{tier.description}</p>
              </div>

              <div className="mb-6">
                {tier.slug === 'enterprise' ? (
                  <div>
                    <p className="text-4xl font-bold">Custom</p>
                    <p className="text-sm text-gray-500 mt-1">Contact sales for pricing</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">${formatPrice(price)}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          ${formatPrice(fullPrice)} billed annually
                        </p>
                        <p className="text-sm text-green-600 font-medium">
                          Save ${formatPrice(savings)} ({percentage}%)
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>
                    {limits.workflow_deployments === -1
                      ? 'Unlimited'
                      : limits.workflow_deployments}{' '}
                    workflows
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>
                    {limits.agents === -1 ? 'Unlimited' : limits.agents} agents
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>
                    {limits.asset_downloads === -1
                      ? 'Unlimited'
                      : limits.asset_downloads}{' '}
                    assets/month
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>
                    {limits.tool_uses === -1 ? 'Unlimited' : limits.tool_uses} tool
                    uses/month
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {limits.api_access ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <span>API access</span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 text-gray-300" />
                      <span className="text-gray-400">No API access</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="capitalize">{limits.support} support</span>
                </div>
                {limits.white_label && (
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>White-label options</span>
                  </div>
                )}
                {limits.sso && (
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>SSO/SAML</span>
                  </div>
                )}
                {limits.sla && (
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>99.9% SLA</span>
                  </div>
                )}
              </div>

              <Button
                onClick={() => onSelectTier(tier)}
                variant={isPopular ? 'primary' : 'outline'}
                className="w-full"
                disabled={isCurrent}
              >
                {isCurrent
                  ? 'Current Plan'
                  : tier.slug === 'enterprise'
                  ? 'Contact Sales'
                  : currentTierSlug
                  ? 'Switch Plan'
                  : 'Get Started'}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
