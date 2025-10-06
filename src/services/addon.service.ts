import { supabase } from '../lib/supabase';
import type { AddonProduct, UserAddon } from '../types/platform.types';

export const addonService = {
  async getAvailableAddons(minimumTier?: string): Promise<AddonProduct[]> {
    let query = supabase
      .from('addon_products')
      .select('*')
      .eq('is_active', true)
      .order('addon_type', { ascending: true });

    if (minimumTier) {
      query = query.eq('minimum_tier', minimumTier);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as AddonProduct[];
  },

  async getAddonBySlug(slug: string): Promise<AddonProduct | null> {
    const { data, error } = await supabase
      .from('addon_products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data as AddonProduct | null;
  },

  async getUserAddons(userId: string): Promise<UserAddon[]> {
    const { data, error } = await supabase
      .from('user_addons')
      .select(
        `
        *,
        addon:addon_products(*)
      `
      )
      .eq('user_id', userId)
      .eq('status', 'active')
      .or('expires_at.is.null,expires_at.gt.' + new Date().toISOString());

    if (error) throw error;
    return data as UserAddon[];
  },

  async purchaseAddon(
    userId: string,
    addonId: string,
    quantity: number = 1,
    autoRenew: boolean = false
  ): Promise<UserAddon> {
    const addon = await supabase
      .from('addon_products')
      .select('*')
      .eq('id', addonId)
      .maybeSingle();

    if (!addon.data) {
      throw new Error('Add-on not found');
    }

    if (!addon.data.is_stackable) {
      const existing = await supabase
        .from('user_addons')
        .select('*')
        .eq('user_id', userId)
        .eq('addon_id', addonId)
        .eq('status', 'active')
        .maybeSingle();

      if (existing.data) {
        throw new Error('This add-on is already active and cannot be stacked');
      }
    }

    if (addon.data.max_quantity && quantity > addon.data.max_quantity) {
      throw new Error(`Maximum quantity for this add-on is ${addon.data.max_quantity}`);
    }

    const expiresAt =
      addon.data.billing_type === 'recurring'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        : null;

    const { data, error } = await supabase
      .from('user_addons')
      .insert({
        user_id: userId,
        addon_id: addonId,
        quantity,
        status: 'active',
        expires_at: expiresAt,
        auto_renew: autoRenew,
        usage_current: 0,
        usage_limit: addon.data.quantity * quantity,
      })
      .select(
        `
        *,
        addon:addon_products(*)
      `
      )
      .single();

    if (error) throw error;
    return data as UserAddon;
  },

  async cancelAddon(userAddonId: string): Promise<void> {
    const { error } = await supabase
      .from('user_addons')
      .update({
        status: 'canceled',
        auto_renew: false,
      })
      .eq('id', userAddonId);

    if (error) throw error;
  },

  async getAddonUsage(userAddonId: string): Promise<{
    current: number;
    limit: number;
    percentage: number;
  }> {
    const { data, error } = await supabase
      .from('user_addons')
      .select('usage_current, usage_limit')
      .eq('id', userAddonId)
      .single();

    if (error) throw error;

    return {
      current: data.usage_current,
      limit: data.usage_limit,
      percentage: (data.usage_current / data.usage_limit) * 100,
    };
  },

  async incrementAddonUsage(userId: string, addonType: string): Promise<void> {
    const { data: activeAddons } = await supabase
      .from('user_addons')
      .select(
        `
        *,
        addon:addon_products!inner(*)
      `
      )
      .eq('user_id', userId)
      .eq('status', 'active')
      .eq('addon.addon_type', addonType)
      .lt('usage_current', supabase.rpc('usage_limit'))
      .order('purchased_at', { ascending: true })
      .limit(1);

    if (!activeAddons || activeAddons.length === 0) {
      return;
    }

    const { error } = await supabase
      .from('user_addons')
      .update({
        usage_current: supabase.rpc('usage_current + 1'),
      })
      .eq('id', activeAddons[0].id);

    if (error) throw error;
  },

  async calculateAddonPricing(
    addonId: string,
    quantity: number,
    billingCycle: 'monthly' | 'annual'
  ): Promise<{
    subtotal: number;
    discount: number;
    total: number;
    savings?: number;
  }> {
    const addon = await this.getAddonBySlug(addonId);

    if (!addon) {
      throw new Error('Add-on not found');
    }

    const subtotal = addon.price * quantity;
    let discount = 0;
    let savings = 0;

    if (billingCycle === 'annual') {
      const annualSubtotal = subtotal * 12;
      discount = Math.round(annualSubtotal * 0.2);
      savings = discount;
      return {
        subtotal: annualSubtotal,
        discount,
        total: annualSubtotal - discount,
        savings,
      };
    }

    return {
      subtotal,
      discount,
      total: subtotal,
    };
  },

  async getRecommendedAddons(userId: string): Promise<
    Array<{
      addon: AddonProduct;
      reason: string;
      priority: 'high' | 'medium' | 'low';
    }>
  > {
    const { data: limits } = await supabase
      .from('usage_limits')
      .select('*')
      .eq('user_id', userId)
      .gte('period_end', new Date().toISOString());

    if (!limits) return [];

    const recommendations: Array<{
      addon: AddonProduct;
      reason: string;
      priority: 'high' | 'medium' | 'low';
    }> = [];

    const addonTypeMap: Record<string, string> = {
      workflow_deployments: 'workflow_capacity',
      agents: 'agent_capacity',
      asset_downloads: 'asset_capacity',
      tool_uses: 'tool_capacity',
      api_calls: 'api_capacity',
    };

    for (const limit of limits) {
      if (limit.limitValue === -1) continue;

      const usagePercentage = (limit.currentValue / limit.limitValue) * 100;

      if (usagePercentage >= 80) {
        const addonType = addonTypeMap[limit.limitType];

        const { data: addon } = await supabase
          .from('addon_products')
          .select('*')
          .eq('addon_type', addonType)
          .eq('is_active', true)
          .order('price', { ascending: true })
          .limit(1)
          .maybeSingle();

        if (addon) {
          recommendations.push({
            addon: addon as AddonProduct,
            reason: `You've used ${limit.currentValue} of ${limit.limitValue} ${limit.limitType.replace('_', ' ')}`,
            priority: usagePercentage >= 95 ? 'high' : usagePercentage >= 90 ? 'medium' : 'low',
          });
        }
      }
    }

    return recommendations;
  },
};
