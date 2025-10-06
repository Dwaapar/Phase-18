import { supabase } from '../lib/supabase';

export interface StripeCheckoutSession {
  id: string;
  url: string;
  sessionId: string;
}

export interface StripeSubscription {
  id: string;
  customerId: string;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date;
}

export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export interface StripeInvoice {
  id: string;
  number: string;
  status: string;
  amountDue: number;
  amountPaid: number;
  currency: string;
  dueDate?: Date;
  pdfUrl?: string;
}

export interface StripeCoupon {
  id: string;
  name: string;
  percentOff?: number;
  amountOff?: number;
  duration: 'once' | 'repeating' | 'forever';
  durationInMonths?: number;
}

export const stripeService = {
  async createCheckoutSession(params: {
    userId: string;
    priceId?: string;
    tierId?: string;
    billingCycle: 'monthly' | 'annual';
    trialDays?: number;
    couponCode?: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<StripeCheckoutSession> {
    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async createProductCheckoutSession(params: {
    userId: string;
    productIds: string[];
    quantities: number[];
    couponCode?: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<StripeCheckoutSession> {
    const { data, error } = await supabase.functions.invoke('stripe-product-checkout', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async createSubscription(params: {
    userId: string;
    tierId: string;
    billingCycle: 'monthly' | 'annual';
    paymentMethodId: string;
    trialDays?: number;
    couponCode?: string;
  }): Promise<StripeSubscription> {
    const { data, error } = await supabase.functions.invoke('stripe-create-subscription', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true): Promise<void> {
    const { error } = await supabase.functions.invoke('stripe-cancel-subscription', {
      body: { subscriptionId, cancelAtPeriodEnd },
    });

    if (error) throw error;
  },

  async reactivateSubscription(subscriptionId: string): Promise<void> {
    const { error } = await supabase.functions.invoke('stripe-reactivate-subscription', {
      body: { subscriptionId },
    });

    if (error) throw error;
  },

  async upgradeSubscription(params: {
    subscriptionId: string;
    newTierId: string;
    prorate?: boolean;
  }): Promise<StripeSubscription> {
    const { data, error } = await supabase.functions.invoke('stripe-upgrade-subscription', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async downgradeSubscription(params: {
    subscriptionId: string;
    newTierId: string;
    applyAtPeriodEnd?: boolean;
  }): Promise<StripeSubscription> {
    const { data, error } = await supabase.functions.invoke('stripe-downgrade-subscription', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async getSubscription(subscriptionId: string): Promise<StripeSubscription> {
    const { data, error } = await supabase.functions.invoke('stripe-get-subscription', {
      body: { subscriptionId },
    });

    if (error) throw error;
    return data;
  },

  async addPaymentMethod(params: {
    userId: string;
    paymentMethodId: string;
    setAsDefault?: boolean;
  }): Promise<void> {
    const { error } = await supabase.functions.invoke('stripe-add-payment-method', {
      body: params,
    });

    if (error) throw error;
  },

  async removePaymentMethod(paymentMethodId: string): Promise<void> {
    const { error } = await supabase.functions.invoke('stripe-remove-payment-method', {
      body: { paymentMethodId },
    });

    if (error) throw error;
  },

  async setDefaultPaymentMethod(params: {
    customerId: string;
    paymentMethodId: string;
  }): Promise<void> {
    const { error } = await supabase.functions.invoke('stripe-set-default-payment-method', {
      body: params,
    });

    if (error) throw error;
  },

  async getPaymentMethods(customerId: string): Promise<any[]> {
    const { data, error } = await supabase.functions.invoke('stripe-get-payment-methods', {
      body: { customerId },
    });

    if (error) throw error;
    return data;
  },

  async createPaymentIntent(params: {
    amount: number;
    currency: string;
    customerId?: string;
    description?: string;
    metadata?: Record<string, string>;
  }): Promise<StripePaymentIntent> {
    const { data, error } = await supabase.functions.invoke('stripe-create-payment-intent', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async refundPayment(params: {
    paymentIntentId: string;
    amount?: number;
    reason?: string;
    refundApplicationFee?: boolean;
  }): Promise<void> {
    const { error } = await supabase.functions.invoke('stripe-refund-payment', {
      body: params,
    });

    if (error) throw error;
  },

  async getInvoices(customerId: string): Promise<StripeInvoice[]> {
    const { data, error } = await supabase.functions.invoke('stripe-get-invoices', {
      body: { customerId },
    });

    if (error) throw error;
    return data;
  },

  async getInvoice(invoiceId: string): Promise<StripeInvoice> {
    const { data, error } = await supabase.functions.invoke('stripe-get-invoice', {
      body: { invoiceId },
    });

    if (error) throw error;
    return data;
  },

  async createInvoice(params: {
    customerId: string;
    items: Array<{
      price?: string;
      quantity?: number;
      amount?: number;
      description?: string;
    }>;
    dueDate?: Date;
    autoAdvance?: boolean;
  }): Promise<StripeInvoice> {
    const { data, error } = await supabase.functions.invoke('stripe-create-invoice', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async createCoupon(params: {
    id?: string;
    name: string;
    percentOff?: number;
    amountOff?: number;
    currency?: string;
    duration: 'once' | 'repeating' | 'forever';
    durationInMonths?: number;
    maxRedemptions?: number;
    redeemBy?: Date;
  }): Promise<StripeCoupon> {
    const { data, error } = await supabase.functions.invoke('stripe-create-coupon', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async getCoupon(couponId: string): Promise<StripeCoupon> {
    const { data, error } = await supabase.functions.invoke('stripe-get-coupon', {
      body: { couponId },
    });

    if (error) throw error;
    return data;
  },

  async applyCoupon(params: {
    subscriptionId: string;
    couponId: string;
  }): Promise<void> {
    const { error } = await supabase.functions.invoke('stripe-apply-coupon', {
      body: params,
    });

    if (error) throw error;
  },

  async getRevenueAnalytics(params: {
    startDate: Date;
    endDate: Date;
  }): Promise<{
    mrr: number;
    arr: number;
    churnRate: number;
    ltv: number;
    cohortData: any[];
  }> {
    const { data, error } = await supabase.functions.invoke('stripe-revenue-analytics', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  async retryFailedPayment(invoiceId: string): Promise<void> {
    const { error } = await supabase.functions.invoke('stripe-retry-payment', {
      body: { invoiceId },
    });

    if (error) throw error;
  },

  async updateSubscriptionPaymentMethod(params: {
    subscriptionId: string;
    paymentMethodId: string;
  }): Promise<void> {
    const { error } = await supabase.functions.invoke('stripe-update-subscription-payment', {
      body: params,
    });

    if (error) throw error;
  },

  async calculateTax(params: {
    amount: number;
    currency: string;
    customerId?: string;
    address?: {
      line1: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  }): Promise<{
    taxAmount: number;
    taxRate: number;
    breakdown: any[];
  }> {
    const { data, error } = await supabase.functions.invoke('stripe-calculate-tax', {
      body: params,
    });

    if (error) throw error;
    return data;
  },

  getPublishableKey(): string {
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
  },
};
