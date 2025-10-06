import { CheckCircle2, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Subscription, PricingTier } from '../../types/platform.types';

interface SubscriptionCardProps {
  subscription: Subscription & { tier: PricingTier };
  onUpgrade?: () => void;
  onCancel?: () => void;
  onReactivate?: () => void;
}

export function SubscriptionCard({
  subscription,
  onUpgrade,
  onCancel,
  onReactivate,
}: SubscriptionCardProps) {
  const isActive = subscription.status === 'active';
  const isCanceling = subscription.cancelAtPeriodEnd;
  const billingLabel = subscription.billingCycle === 'annual' ? 'Annual' : 'Monthly';

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(0)}`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold">{subscription.tier.name}</h3>
            <Badge variant={isActive ? 'success' : 'secondary'}>{subscription.status}</Badge>
          </div>
          <p className="text-gray-600 text-sm">{billingLabel} Billing</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">
            {formatPrice(
              subscription.billingCycle === 'annual'
                ? subscription.tier.priceYearly
                : subscription.tier.priceMonthly
            )}
          </p>
          <p className="text-sm text-gray-500">
            /{subscription.billingCycle === 'annual' ? 'year' : 'month'}
          </p>
        </div>
      </div>

      {isCanceling && (
        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-orange-900">Subscription Ending</p>
              <p className="text-sm text-orange-700 mt-1">
                Your subscription will end on {formatDate(subscription.currentPeriodEnd)}. You'll
                lose access to premium features after this date.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Current Period</span>
          </div>
          <span className="text-sm font-medium">
            {formatDate(subscription.currentPeriodStart)} -{' '}
            {formatDate(subscription.currentPeriodEnd)}
          </span>
        </div>

        {subscription.billingCycle === 'annual' && (
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">Annual Savings</span>
            </div>
            <span className="text-sm font-medium text-green-600">
              Save{' '}
              {formatPrice(
                subscription.tier.priceMonthly * 12 - subscription.tier.priceYearly
              )}{' '}
              /year
            </span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Plan Features</h4>
        <div className="space-y-2">
          {(subscription.tier.features as any[]).slice(0, 5).map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {!isCanceling && isActive && (
          <>
            {onUpgrade && subscription.tier.slug !== 'enterprise' && (
              <Button onClick={onUpgrade} className="flex-1">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            )}
            {onCancel && (
              <Button onClick={onCancel} variant="outline" className="flex-1">
                Cancel Subscription
              </Button>
            )}
          </>
        )}

        {isCanceling && onReactivate && (
          <Button onClick={onReactivate} className="w-full">
            Reactivate Subscription
          </Button>
        )}
      </div>
    </Card>
  );
}
