import { supabase } from '../lib/supabase';
import type { Subscription, PricingTier, UsageLimit, SubscriptionProrationCredit } from '../types/platform.types';
import { usageTrackingService } from './usage-tracking.service';

export const subscriptionService = {
  async getPricingTiers() {
    const { data, error } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data as PricingTier[];
  },

  async getTierBySlug(slug: string) {
    const { data, error } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data as PricingTier | null;
  },

  async getCurrentSubscription(userId: string) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select(`
        *,
        tier:pricing_tiers(*)
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (error) throw error;
    return data as (Subscription & { tier: PricingTier }) | null;
  },

  async getUsageLimits(userId: string) {
    const { data, error } = await supabase
      .from('usage_limits')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data as UsageLimit[];
  },

  async checkUsageLimit(userId: string, limitType: UsageLimit['limitType']) {
    const { data, error } = await supabase
      .from('usage_limits')
      .select('*')
      .eq('user_id', userId)
      .eq('limit_type', limitType)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return { canProceed: true, limit: null };
    }

    const canProceed = data.current_value < data.limit_value;
    return { canProceed, limit: data as UsageLimit };
  },

  async incrementUsage(userId: string, limitType: UsageLimit['limitType']) {
    const { error } = await supabase.rpc('increment_usage_limit', {
      p_user_id: userId,
      p_limit_type: limitType
    });

    if (error) throw error;
  },

  async createSubscription(userId: string, tierId: string, billingCycle: 'monthly' | 'yearly') {
    const tier = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('id', tierId)
      .maybeSingle();

    if (!tier.data) throw new Error('Tier not found');

    const currentPeriodStart = new Date();
    const currentPeriodEnd = new Date();

    if (billingCycle === 'monthly') {
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    } else {
      currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        tier_id: tierId,
        billing_cycle: billingCycle,
        current_period_start: currentPeriodStart.toISOString(),
        current_period_end: currentPeriodEnd.toISOString(),
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;
    return data as Subscription;
  },

  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true) {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        cancel_at_period_end: cancelAtPeriodEnd,
        status: cancelAtPeriodEnd ? 'active' : 'canceled'
      })
      .eq('id', subscriptionId)
      .select()
      .single();

    if (error) throw error;
    return data as Subscription;
  },

  async upgradeSubscription(subscriptionId: string, newTierId: string) {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        tier_id: newTierId,
        cancel_at_period_end: false
      })
      .eq('id', subscriptionId)
      .select()
      .single();

    if (error) throw error;
    return data as Subscription;
  },

  async getUserTier(userId: string) {
    const subscription = await this.getCurrentSubscription(userId);

    if (!subscription || !subscription.tier) {
      const freeTier = await this.getTierBySlug('free');
      return freeTier;
    }

    return subscription.tier;
  },

  async canAccessProduct(userId: string, productTierRequired: string) {
    const userTier = await this.getUserTier(userId);

    if (!userTier) return false;

    const tierHierarchy = ['free', 'starter', 'professional', 'enterprise'];
    const userTierIndex = tierHierarchy.indexOf(userTier.slug);
    const requiredTierIndex = tierHierarchy.indexOf(productTierRequired);

    return userTierIndex >= requiredTierIndex;
  },

  async upgradeSubscriptionWithProration(
    subscriptionId: string,
    newTierId: string
  ): Promise<{ subscription: Subscription; credit: SubscriptionProrationCredit | null }> {
    const { data: currentSub } = await supabase
      .from('subscriptions')
      .select('*, tier:pricing_tiers(*)')
      .eq('id', subscriptionId)
      .single();

    if (!currentSub) throw new Error('Subscription not found');

    const { data: newTier } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('id', newTierId)
      .single();

    if (!newTier) throw new Error('New tier not found');

    const now = new Date();
    const periodEnd = new Date(currentSub.current_period_end);
    const periodStart = new Date(currentSub.current_period_start);
    const remainingDays = Math.ceil((periodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((periodEnd.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24));

    const currentPrice =
      currentSub.billing_cycle === 'annual'
        ? currentSub.tier.price_annual
        : currentSub.tier.price_monthly;

    const newPrice =
      currentSub.billing_cycle === 'annual' ? newTier.price_annual : newTier.price_monthly;

    const unusedAmount = Math.round((currentPrice / totalDays) * remainingDays);
    const creditAmount = Math.max(0, unusedAmount);

    let credit = null;

    if (creditAmount > 0) {
      const { data: creditData } = await supabase
        .from('subscription_proration_credits')
        .insert({
          user_id: currentSub.user_id,
          subscription_id: subscriptionId,
          credit_amount: creditAmount,
          reason: `Prorated credit from ${currentSub.tier.name} to ${newTier.name}`,
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .select()
        .single();

      credit = creditData as SubscriptionProrationCredit;
    }

    const updatedSubscription = await this.upgradeSubscription(subscriptionId, newTierId);

    await usageTrackingService.initializeUsageLimits(currentSub.user_id, newTierId);

    return { subscription: updatedSubscription, credit };
  },

  async downgradeSubscriptionWithProration(
    subscriptionId: string,
    newTierId: string
  ): Promise<Subscription> {
    const { data: currentSub } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('id', subscriptionId)
      .single();

    if (!currentSub) throw new Error('Subscription not found');

    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        tier_id: newTierId,
        cancel_at_period_end: false,
      })
      .eq('id', subscriptionId)
      .select()
      .single();

    if (error) throw error;

    await usageTrackingService.initializeUsageLimits(currentSub.user_id, newTierId);

    return data as Subscription;
  },

  async getProrationCredits(userId: string): Promise<SubscriptionProrationCredit[]> {
    const { data, error } = await supabase
      .from('subscription_proration_credits')
      .select('*')
      .eq('user_id', userId)
      .eq('is_applied', false)
      .gt('expires_at', new Date().toISOString());

    if (error) throw error;
    return data as SubscriptionProrationCredit[];
  },

  async calculateSubscriptionPrice(
    tierId: string,
    billingCycle: 'monthly' | 'annual'
  ): Promise<{
    price: number;
    discount: number;
    total: number;
    savings?: number;
  }> {
    const tier = await supabase.from('pricing_tiers').select('*').eq('id', tierId).single();

    if (!tier.data) throw new Error('Tier not found');

    if (billingCycle === 'annual') {
      const monthlyTotal = tier.data.price_monthly * 12;
      const annualPrice = tier.data.price_annual;
      const savings = monthlyTotal - annualPrice;

      return {
        price: annualPrice,
        discount: savings,
        total: annualPrice,
        savings,
      };
    }

    return {
      price: tier.data.price_monthly,
      discount: 0,
      total: tier.data.price_monthly,
    };
  },
};
