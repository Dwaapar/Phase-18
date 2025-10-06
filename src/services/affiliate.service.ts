import { supabase } from '../lib/supabase';
import type {
  Affiliate,
  AffiliateProgram,
  AffiliateClick,
  AffiliateConversion,
  AffiliatePayout,
  AffiliateStats
} from '../types/affiliate.types';

export const affiliateService = {
  async getPrograms(): Promise<AffiliateProgram[]> {
    const { data, error } = await supabase
      .from('affiliate_programs')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async getProgram(slug: string): Promise<AffiliateProgram | null> {
    const { data, error } = await supabase
      .from('affiliate_programs')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async applyAsAffiliate(application: {
    company_name?: string;
    website_url?: string;
    promotional_methods: string[];
    audience_size?: number;
    application_notes?: string;
  }): Promise<Affiliate> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const affiliateCode = `FW-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const { data, error } = await supabase
      .from('affiliates')
      .insert({
        user_id: user.id,
        affiliate_code: affiliateCode,
        status: 'pending',
        ...application
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMyAffiliateAccount(): Promise<Affiliate | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('affiliates')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAffiliateStats(affiliateId: string, period: 'day' | 'week' | 'month' | 'year' | 'all' = 'all'): Promise<AffiliateStats> {
    let dateFilter = '';
    const now = new Date();

    switch (period) {
      case 'day':
        dateFilter = new Date(now.setDate(now.getDate() - 1)).toISOString();
        break;
      case 'week':
        dateFilter = new Date(now.setDate(now.getDate() - 7)).toISOString();
        break;
      case 'month':
        dateFilter = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
        break;
      case 'year':
        dateFilter = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();
        break;
    }

    const clicksQuery = supabase
      .from('affiliate_clicks')
      .select('*', { count: 'exact', head: true })
      .eq('affiliate_id', affiliateId);

    const conversionsQuery = supabase
      .from('affiliate_conversions')
      .select('order_value_cents, commission_cents, commission_status')
      .eq('affiliate_id', affiliateId);

    if (dateFilter) {
      clicksQuery.gte('created_at', dateFilter);
      conversionsQuery.gte('created_at', dateFilter);
    }

    const [clicksResult, conversionsResult] = await Promise.all([
      clicksQuery,
      conversionsQuery
    ]);

    if (clicksResult.error) throw clicksResult.error;
    if (conversionsResult.error) throw conversionsResult.error;

    const clicks = clicksResult.count || 0;
    const conversions = conversionsResult.data || [];

    const revenue = conversions.reduce((sum, c) => sum + c.order_value_cents, 0);
    const commission = conversions.reduce((sum, c) => sum + c.commission_cents, 0);
    const pendingCommission = conversions
      .filter(c => c.commission_status === 'pending' || c.commission_status === 'approved')
      .reduce((sum, c) => sum + c.commission_cents, 0);
    const paidCommission = conversions
      .filter(c => c.commission_status === 'paid')
      .reduce((sum, c) => sum + c.commission_cents, 0);

    return {
      clicks,
      conversions: conversions.length,
      conversionRate: clicks > 0 ? (conversions.length / clicks) * 100 : 0,
      revenue: revenue / 100,
      commission: commission / 100,
      pendingCommission: pendingCommission / 100,
      paidCommission: paidCommission / 100
    };
  },

  async getMyClicks(limit = 100): Promise<AffiliateClick[]> {
    const affiliate = await this.getMyAffiliateAccount();
    if (!affiliate) throw new Error('Not an affiliate');

    const { data, error } = await supabase
      .from('affiliate_clicks')
      .select('*')
      .eq('affiliate_id', affiliate.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getMyConversions(limit = 100): Promise<AffiliateConversion[]> {
    const affiliate = await this.getMyAffiliateAccount();
    if (!affiliate) throw new Error('Not an affiliate');

    const { data, error } = await supabase
      .from('affiliate_conversions')
      .select('*')
      .eq('affiliate_id', affiliate.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async getMyPayouts(limit = 50): Promise<AffiliatePayout[]> {
    const affiliate = await this.getMyAffiliateAccount();
    if (!affiliate) throw new Error('Not an affiliate');

    const { data, error } = await supabase
      .from('affiliate_payouts')
      .select('*')
      .eq('affiliate_id', affiliate.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  generateAffiliateLink(affiliateCode: string, targetUrl: string, campaignCode?: string): string {
    const url = new URL(targetUrl, window.location.origin);
    url.searchParams.set('ref', affiliateCode);
    if (campaignCode) {
      url.searchParams.set('campaign', campaignCode);
    }
    return url.toString();
  },

  async trackClick(affiliateCode: string, programId: string, referrer?: string) {
    const clickId = `CLK-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const { error } = await supabase
      .from('affiliate_clicks')
      .insert({
        affiliate_id: affiliateCode,
        program_id: programId,
        click_id: clickId,
        referrer_url: referrer,
        landing_page: window.location.href,
        user_agent: navigator.userAgent,
        device_type: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
      });

    if (error) console.error('Error tracking click:', error);

    localStorage.setItem('fw_affiliate_click', JSON.stringify({
      clickId,
      affiliateCode,
      programId,
      timestamp: Date.now()
    }));
  }
};
