export interface AffiliateProgram {
  id: string;
  product_id?: string;
  name: string;
  slug: string;
  description?: string;
  commission_type: 'percentage' | 'fixed' | 'tiered' | 'recurring';
  commission_value: number;
  recurring_months?: number;
  cookie_duration_days: number;
  minimum_payout_cents: number;
  payment_terms: string;
  terms_url?: string;
  is_active: boolean;
  requires_approval: boolean;
  performance_bonus?: any;
  created_at: string;
  updated_at: string;
}

export interface Affiliate {
  id: string;
  user_id: string;
  affiliate_code: string;
  status: 'pending' | 'approved' | 'suspended' | 'terminated';
  tier: 'standard' | 'silver' | 'gold' | 'platinum';
  company_name?: string;
  website_url?: string;
  promotional_methods: string[];
  audience_size?: number;
  application_notes?: string;
  approved_at?: string;
  approved_by?: string;
  suspension_reason?: string;
  total_clicks: number;
  total_conversions: number;
  total_revenue_cents: number;
  total_commissions_cents: number;
  total_paid_cents: number;
  created_at: string;
  updated_at: string;
}

export interface AffiliateClick {
  id: string;
  affiliate_id: string;
  program_id: string;
  click_id: string;
  referrer_url?: string;
  landing_page?: string;
  user_agent?: string;
  ip_address?: string;
  country_code?: string;
  device_type?: string;
  converted: boolean;
  conversion_id?: string;
  created_at: string;
}

export interface AffiliateConversion {
  id: string;
  affiliate_id: string;
  program_id: string;
  click_id?: string;
  order_id?: string;
  subscription_id?: string;
  conversion_type: 'sale' | 'subscription' | 'lead' | 'signup';
  order_value_cents: number;
  commission_cents: number;
  commission_status: 'pending' | 'approved' | 'paid' | 'reversed';
  approved_at?: string;
  paid_at?: string;
  reversed_at?: string;
  reversal_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface AffiliatePayout {
  id: string;
  affiliate_id: string;
  amount_cents: number;
  commission_ids: string[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  payment_method: 'paypal' | 'stripe' | 'bank_transfer' | 'wire';
  transaction_id?: string;
  notes?: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AffiliateCreative {
  id: string;
  program_id: string;
  type: 'banner' | 'email' | 'social' | 'landing_page' | 'video' | 'copy';
  title: string;
  description?: string;
  asset_url?: string;
  thumbnail_url?: string;
  dimensions?: string;
  file_size_kb?: number;
  format?: string;
  copy_text?: string;
  download_count: number;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AffiliateCampaign {
  id: string;
  affiliate_id: string;
  name: string;
  description?: string;
  tracking_code: string;
  target_programs: string[];
  start_date?: string;
  end_date?: string;
  budget_cents: number;
  spent_cents: number;
  clicks: number;
  conversions: number;
  revenue_cents: number;
  commission_cents: number;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  goals?: any;
  created_at: string;
  updated_at: string;
}

export interface AffiliateComplianceCheck {
  id: string;
  affiliate_id: string;
  check_type: 'disclosure' | 'trademark' | 'claims' | 'content' | 'spam';
  url_checked?: string;
  status: 'pass' | 'warning' | 'violation';
  details?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  resolved_at?: string;
  notes?: string;
  checked_at: string;
  created_at: string;
}

export interface AffiliateStats {
  clicks: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  commission: number;
  pendingCommission: number;
  paidCommission: number;
}
