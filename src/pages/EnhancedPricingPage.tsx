import { useState, useEffect } from 'react';
import { Check, X, Zap, Shield, Users, Sparkles } from 'lucide-react';
import { subscriptionService } from '../services/subscription.service';
import type { PricingTier } from '../types/platform.types';

export default function EnhancedPricingPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTiers();
  }, []);

  const loadTiers = async () => {
    try {
      const data = await subscriptionService.getPricingTiers();
      setTiers(data);
    } catch (error) {
      console.error('Failed to load pricing tiers:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (tier: PricingTier) => {
    const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceYearly;
    if (price === 0) return 'Free';

    const monthlyPrice = billingCycle === 'yearly' ? price / 12 : price;
    return `$${(monthlyPrice / 100).toFixed(0)}`;
  };

  const formatFeatureValue = (value: number | 'unlimited') => {
    return value === 'unlimited' ? 'Unlimited' : value.toLocaleString();
  };

  const tierIcons = {
    free: Sparkles,
    starter: Zap,
    professional: Shield,
    enterprise: Users
  };

  const tierColors = {
    free: 'from-slate-500 to-slate-600',
    starter: 'from-blue-500 to-blue-600',
    professional: 'from-emerald-500 to-emerald-600',
    enterprise: 'from-violet-500 to-violet-600'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All plans include access to our core platform features.
          </p>

          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'text-white hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-full font-medium transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'text-white hover:text-slate-200'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tiers.map((tier) => {
            const Icon = tierIcons[tier.slug as keyof typeof tierIcons] || Sparkles;
            const gradientClass = tierColors[tier.slug as keyof typeof tierColors];
            const isPopular = tier.slug === 'professional';

            return (
              <div
                key={tier.id}
                className={`bg-white rounded-2xl shadow-xl border-2 transition-all hover:scale-105 ${
                  isPopular
                    ? 'border-emerald-500 relative'
                    : 'border-slate-200'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`bg-gradient-to-br ${gradientClass} text-white p-8 rounded-t-2xl`}>
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2 capitalize">{tier.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{formatPrice(tier)}</span>
                    {tier.priceMonthly > 0 && (
                      <span className="text-white/80">/month</span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && tier.priceYearly > 0 && (
                    <p className="text-sm text-white/80 mt-2">
                      ${(tier.priceYearly / 100).toFixed(0)} billed annually
                    </p>
                  )}
                </div>

                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">
                        <span className="font-semibold text-slate-900">
                          {formatFeatureValue(tier.features.workflowDeployments)}
                        </span>{' '}
                        workflow deployments
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">
                        <span className="font-semibold text-slate-900">
                          {formatFeatureValue(tier.features.agentInstances)}
                        </span>{' '}
                        AI agent instances
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">
                        <span className="font-semibold text-slate-900">
                          {formatFeatureValue(tier.features.assetDownloads)}
                        </span>{' '}
                        asset downloads
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">
                        <span className="font-semibold text-slate-900">
                          {formatFeatureValue(tier.features.toolUsesPerMonth)}
                        </span>{' '}
                        tool uses/month
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">
                        <span className="font-semibold text-slate-900">
                          {tier.features.support}
                        </span>{' '}
                        support
                      </span>
                    </li>
                    {tier.features.advancedFeatures?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      isPopular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {tier.priceMonthly === 0 ? 'Get Started Free' : 'Start Free Trial'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Need a custom solution?</h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Enterprise plans include custom integrations, dedicated support, white-label options, and SLA guarantees.
          </p>
          <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors">
            Contact Sales
          </button>
        </div>

        <div className="mt-20 bg-white rounded-2xl shadow-sm border border-slate-200 p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Can I change plans later?</h3>
              <p className="text-slate-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-slate-600">
                We accept all major credit cards, PayPal, and wire transfers for annual plans.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Is there a free trial?</h3>
              <p className="text-slate-600">
                Yes, all paid plans include a 14-day free trial. No credit card required.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">What about refunds?</h3>
              <p className="text-slate-600">
                We offer a 30-day money-back guarantee on all annual plans. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
