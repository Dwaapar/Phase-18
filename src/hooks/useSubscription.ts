import { useState, useEffect } from 'react';
import { subscriptionService } from '../services/subscription.service';
import { usageTrackingService } from '../services/usage-tracking.service';
import { addonService } from '../services/addon.service';
import type {
  Subscription,
  PricingTier,
  UsageLimit,
  UserAddon,
  AddonProduct,
} from '../types/platform.types';
import { useAuth } from '../contexts/AuthContext';

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<
    (Subscription & { tier: PricingTier }) | null
  >(null);
  const [usageLimits, setUsageLimits] = useState<UsageLimit[]>([]);
  const [userAddons, setUserAddons] = useState<UserAddon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubscriptionData = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const [subData, limitsData, addonsData] = await Promise.all([
        subscriptionService.getCurrentSubscription(user.id),
        usageTrackingService.getUserUsageLimits(user.id),
        addonService.getUserAddons(user.id),
      ]);

      setSubscription(subData);
      setUsageLimits(limitsData);
      setUserAddons(addonsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptionData();
  }, [user?.id]);

  const checkLimit = async (limitType: UsageLimit['limitType']) => {
    if (!user?.id) return { canProceed: false, reason: 'Not authenticated' };

    try {
      return await usageTrackingService.checkUsageLimit(user.id, limitType);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to check limit');
    }
  };

  const incrementUsage = async (
    limitType: UsageLimit['limitType'],
    resourceType: string,
    resourceId?: string,
    metadata?: Record<string, any>
  ) => {
    if (!user?.id) throw new Error('Not authenticated');

    await usageTrackingService.incrementUsage(
      user.id,
      limitType,
      resourceType,
      resourceId,
      metadata
    );

    await loadSubscriptionData();
  };

  const upgradeSubscription = async (newTierId: string) => {
    if (!user?.id || !subscription) throw new Error('No active subscription');

    const result = await subscriptionService.upgradeSubscriptionWithProration(
      subscription.id,
      newTierId
    );

    await loadSubscriptionData();
    return result;
  };

  const downgradeSubscription = async (newTierId: string) => {
    if (!user?.id || !subscription) throw new Error('No active subscription');

    await subscriptionService.downgradeSubscriptionWithProration(subscription.id, newTierId);
    await loadSubscriptionData();
  };

  const cancelSubscription = async (cancelAtPeriodEnd = true) => {
    if (!subscription) throw new Error('No active subscription');

    await subscriptionService.cancelSubscription(subscription.id, cancelAtPeriodEnd);
    await loadSubscriptionData();
  };

  const purchaseAddon = async (addonId: string, quantity: number = 1) => {
    if (!user?.id) throw new Error('Not authenticated');

    await addonService.purchaseAddon(user.id, addonId, quantity);
    await loadSubscriptionData();
  };

  const getUsagePercentage = (limitType: UsageLimit['limitType']): number => {
    const limit = usageLimits.find((l) => l.limitType === limitType);
    if (!limit) return 0;
    if (limit.limitValue === -1) return 0;

    const addonCapacity = userAddons
      .filter((addon) => addon.addon?.addonType === `${limitType.replace('s', '')}_capacity`)
      .reduce((sum, addon) => sum + (addon.usageLimit - addon.usageCurrent), 0);

    const totalLimit = limit.limitValue + addonCapacity;
    return (limit.currentValue / totalLimit) * 100;
  };

  const getUsageWarnings = (): string[] => {
    const warnings: string[] = [];

    for (const limit of usageLimits) {
      if (limit.limitValue === -1) continue;

      const percentage = getUsagePercentage(limit.limitType);

      if (percentage >= limit.softCapThreshold * 100) {
        warnings.push(
          `You've used ${Math.round(percentage)}% of your ${limit.limitType.replace('_', ' ')}`
        );
      }
    }

    return warnings;
  };

  const canAccessFeature = (feature: string): boolean => {
    if (!subscription?.tier) return false;

    const features = subscription.tier.features as any;
    return features[feature] !== false;
  };

  return {
    subscription,
    usageLimits,
    userAddons,
    loading,
    error,
    checkLimit,
    incrementUsage,
    upgradeSubscription,
    downgradeSubscription,
    cancelSubscription,
    purchaseAddon,
    getUsagePercentage,
    getUsageWarnings,
    canAccessFeature,
    refresh: loadSubscriptionData,
  };
}
