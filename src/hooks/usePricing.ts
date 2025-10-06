import { useState, useEffect } from 'react';
import { subscriptionService } from '../services/subscription.service';
import { addonService } from '../services/addon.service';
import type { PricingTier, AddonProduct } from '../types/platform.types';

export function usePricing() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [addons, setAddons] = useState<AddonProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPricingData();
  }, []);

  const loadPricingData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [tiersData, addonsData] = await Promise.all([
        subscriptionService.getPricingTiers(),
        addonService.getAvailableAddons(),
      ]);

      setTiers(tiersData);
      setAddons(addonsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pricing data');
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = (
    tierId: string,
    billingCycle: 'monthly' | 'annual'
  ): {
    price: number;
    discount: number;
    total: number;
    savings?: number;
  } => {
    const tier = tiers.find((t) => t.id === tierId);

    if (!tier) {
      return { price: 0, discount: 0, total: 0 };
    }

    if (billingCycle === 'annual') {
      const monthlyTotal = tier.priceMonthly * 12;
      const annualPrice = tier.priceYearly;
      const savings = monthlyTotal - annualPrice;

      return {
        price: annualPrice,
        discount: savings,
        total: annualPrice,
        savings,
      };
    }

    return {
      price: tier.priceMonthly,
      discount: 0,
      total: tier.priceMonthly,
    };
  };

  const calculateAddonPrice = (
    addonId: string,
    quantity: number,
    billingCycle: 'monthly' | 'annual'
  ): {
    subtotal: number;
    discount: number;
    total: number;
    savings?: number;
  } => {
    const addon = addons.find((a) => a.id === addonId);

    if (!addon) {
      return { subtotal: 0, discount: 0, total: 0 };
    }

    const subtotal = addon.price * quantity;

    if (billingCycle === 'annual') {
      const annualSubtotal = subtotal * 12;
      const discount = Math.round(annualSubtotal * 0.2);

      return {
        subtotal: annualSubtotal,
        discount,
        total: annualSubtotal - discount,
        savings: discount,
      };
    }

    return {
      subtotal,
      discount: 0,
      total: subtotal,
    };
  };

  const formatPrice = (cents: number): string => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getAnnualSavings = (tierId: string): number => {
    const tier = tiers.find((t) => t.id === tierId);
    if (!tier) return 0;

    const monthlyTotal = tier.priceMonthly * 12;
    const annualPrice = tier.priceYearly;
    return monthlyTotal - annualPrice;
  };

  const getAddonsByType = (addonType: AddonProduct['addonType']): AddonProduct[] => {
    return addons.filter((addon) => addon.addonType === addonType);
  };

  return {
    tiers,
    addons,
    loading,
    error,
    calculatePrice,
    calculateAddonPrice,
    formatPrice,
    getAnnualSavings,
    getAddonsByType,
    refresh: loadPricingData,
  };
}
