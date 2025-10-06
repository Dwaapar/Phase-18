/*
  # Dual Affiliate System - Promote and Be Promoted

  ## Overview
  Complete affiliate system supporting both directions:
  1. YOUR products promoted BY affiliates (incoming commissions you pay)
  2. EXTERNAL products promoted BY you (outgoing commissions you earn)

  ## 1. Affiliate Programs (Your Products)
    - `affiliate_programs` - Define commission structures for your products
    - Commission types: percentage, fixed, tiered, recurring
    - Track performance metrics and conversion rates

  ## 2. Affiliate Partners (External Products)
    - `affiliate_partners` - External programs you're enrolled in
    - Track partner details, commission rates, and payment terms
    - Manage multiple affiliate relationships

  ## 3. Affiliates (People Promoting You)
    - `affiliates` - Partners promoting YOUR products
    - Application workflow with approval process
    - Performance tiers and bonus structures

  ## 4. Commission Tracking
    - `affiliate_commissions` - Unified table for all commissions (incoming/outgoing)
    - Tracks clicks, conversions, amounts, and payment status
    - Supports recurring commissions for subscription products

  ## 5. Tracking and Attribution
    - `affiliate_clicks` - Click tracking with 30-day cookie window
    - `affiliate_conversions` - Conversion tracking with attribution
    - Last-click attribution model with fraud detection

  ## 6. Payouts and Settlements
    - `affiliate_payouts` - Batch payouts to affiliates
    - Minimum payout threshold ($100)
    - Multiple payment methods (PayPal, Stripe, Wire)

  ## 7. Marketing Materials
    - `affiliate_creatives` - Banners, links, and promotional content
    - Performance tracking per creative
    - A/B testing support

  ## 8. Security
    - RLS enabled on all tables
    - Affiliates see own data and public programs
    - Commission data secured by user relationship
    - Admin full access for management
*/

-- Affiliate Programs (Your Products That Can Be Promoted)
CREATE TABLE IF NOT EXISTS affiliate_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  commission_type text NOT NULL CHECK (commission_type IN ('percentage', 'fixed', 'tiered', 'recurring')),
  commission_value decimal(10,2) NOT NULL,
  recurring_months int DEFAULT 0,
  cookie_duration_days int DEFAULT 30,
  minimum_payout_cents int DEFAULT 10000,
  payment_terms text DEFAULT 'Net 30',
  terms_url text,
  is_active boolean DEFAULT true,
  requires_approval boolean DEFAULT true,
  performance_bonus jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliate Partners (External Programs You Promote)
CREATE TABLE IF NOT EXISTS affiliate_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  website_url text NOT NULL,
  affiliate_network text,
  commission_structure jsonb NOT NULL,
  cookie_duration_days int DEFAULT 30,
  payment_terms text,
  payment_method text,
  minimum_payout_cents int,
  tracking_url text,
  affiliate_id text,
  api_key text,
  is_active boolean DEFAULT true,
  joined_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliates (Partners Promoting YOUR Products)
CREATE TABLE IF NOT EXISTS affiliates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  affiliate_code text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended', 'terminated')),
  tier text DEFAULT 'standard' CHECK (tier IN ('standard', 'silver', 'gold', 'platinum')),
  company_name text,
  website_url text,
  promotional_methods text[] DEFAULT ARRAY[]::text[],
  audience_size int,
  application_notes text,
  approved_at timestamptz,
  approved_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  suspension_reason text,
  total_clicks int DEFAULT 0,
  total_conversions int DEFAULT 0,
  total_revenue_cents int DEFAULT 0,
  total_commissions_cents int DEFAULT 0,
  total_paid_cents int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliate Clicks (Tracking)
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE,
  program_id uuid REFERENCES affiliate_programs(id) ON DELETE CASCADE,
  click_id text UNIQUE NOT NULL,
  referrer_url text,
  landing_page text,
  user_agent text,
  ip_address inet,
  country_code text,
  device_type text,
  converted boolean DEFAULT false,
  conversion_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Affiliate Conversions (Attribution)
CREATE TABLE IF NOT EXISTS affiliate_conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE,
  program_id uuid REFERENCES affiliate_programs(id) ON DELETE CASCADE,
  click_id uuid REFERENCES affiliate_clicks(id) ON DELETE SET NULL,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  conversion_type text NOT NULL CHECK (conversion_type IN ('sale', 'subscription', 'lead', 'signup')),
  order_value_cents int NOT NULL,
  commission_cents int NOT NULL,
  commission_status text NOT NULL DEFAULT 'pending' CHECK (commission_status IN ('pending', 'approved', 'paid', 'reversed')),
  approved_at timestamptz,
  paid_at timestamptz,
  reversed_at timestamptz,
  reversal_reason text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliate Commissions (Unified - Both Directions)
CREATE TABLE IF NOT EXISTS affiliate_commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  direction text NOT NULL CHECK (direction IN ('incoming', 'outgoing')),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE SET NULL,
  partner_id uuid REFERENCES affiliate_partners(id) ON DELETE SET NULL,
  conversion_id uuid REFERENCES affiliate_conversions(id) ON DELETE CASCADE,
  commission_type text NOT NULL CHECK (commission_type IN ('one_time', 'recurring')),
  amount_cents int NOT NULL,
  currency text DEFAULT 'USD',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'reversed')),
  period_start timestamptz,
  period_end timestamptz,
  paid_at timestamptz,
  payout_id uuid,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliate Payouts (Batch Payments)
CREATE TABLE IF NOT EXISTS affiliate_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE,
  payout_number text UNIQUE NOT NULL,
  amount_cents int NOT NULL,
  currency text DEFAULT 'USD',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payment_method text NOT NULL CHECK (payment_method IN ('paypal', 'stripe', 'wire', 'check')),
  payment_details jsonb DEFAULT '{}'::jsonb,
  commission_ids uuid[] DEFAULT ARRAY[]::uuid[],
  processed_at timestamptz,
  failed_reason text,
  receipt_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliate Creatives (Marketing Materials)
CREATE TABLE IF NOT EXISTS affiliate_creatives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid REFERENCES affiliate_programs(id) ON DELETE CASCADE,
  name text NOT NULL,
  creative_type text NOT NULL CHECK (creative_type IN ('banner', 'text_link', 'email', 'social', 'landing_page')),
  format text,
  dimensions text,
  file_url text,
  preview_url text,
  html_code text,
  click_url text,
  performance_score decimal(5,2) DEFAULT 0,
  click_count int DEFAULT 0,
  conversion_count int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliate Campaign Tracking
CREATE TABLE IF NOT EXISTS affiliate_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE,
  program_id uuid REFERENCES affiliate_programs(id) ON DELETE CASCADE,
  name text NOT NULL,
  campaign_code text UNIQUE NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  budget_cents int,
  target_conversions int,
  actual_clicks int DEFAULT 0,
  actual_conversions int DEFAULT 0,
  actual_revenue_cents int DEFAULT 0,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_affiliates_user ON affiliates(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_code ON affiliates(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_affiliates_status ON affiliates(status);
CREATE INDEX IF NOT EXISTS idx_clicks_affiliate ON affiliate_clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_clicks_program ON affiliate_clicks(program_id);
CREATE INDEX IF NOT EXISTS idx_clicks_created ON affiliate_clicks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversions_affiliate ON affiliate_conversions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_conversions_program ON affiliate_conversions(program_id);
CREATE INDEX IF NOT EXISTS idx_conversions_status ON affiliate_conversions(commission_status);
CREATE INDEX IF NOT EXISTS idx_commissions_affiliate ON affiliate_commissions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_commissions_partner ON affiliate_commissions(partner_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON affiliate_commissions(status);
CREATE INDEX IF NOT EXISTS idx_payouts_affiliate ON affiliate_payouts(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON affiliate_payouts(status);

-- Enable Row Level Security
ALTER TABLE affiliate_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_creatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Affiliate Programs (public read active)
CREATE POLICY "Anyone can view active affiliate programs"
  ON affiliate_programs FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage affiliate programs"
  ON affiliate_programs FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Affiliate Partners (admin only)
CREATE POLICY "Admins can view affiliate partners"
  ON affiliate_partners FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can manage affiliate partners"
  ON affiliate_partners FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Affiliates (users see own)
CREATE POLICY "Users can view own affiliate account"
  ON affiliates FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create affiliate account"
  ON affiliates FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all affiliates"
  ON affiliates FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Affiliate Clicks (affiliates see own, admins see all)
CREATE POLICY "Affiliates can view own clicks"
  ON affiliate_clicks FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM affiliates
    WHERE affiliates.id = affiliate_clicks.affiliate_id AND affiliates.user_id = auth.uid()
  ));

CREATE POLICY "System can create clicks"
  ON affiliate_clicks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can manage all clicks"
  ON affiliate_clicks FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Affiliate Conversions (affiliates see own)
CREATE POLICY "Affiliates can view own conversions"
  ON affiliate_conversions FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM affiliates
    WHERE affiliates.id = affiliate_conversions.affiliate_id AND affiliates.user_id = auth.uid()
  ));

CREATE POLICY "System can create conversions"
  ON affiliate_conversions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can manage all conversions"
  ON affiliate_conversions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Affiliate Commissions (affiliates see own)
CREATE POLICY "Affiliates can view own commissions"
  ON affiliate_commissions FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM affiliates
    WHERE affiliates.id = affiliate_commissions.affiliate_id AND affiliates.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all commissions"
  ON affiliate_commissions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Affiliate Payouts (affiliates see own)
CREATE POLICY "Affiliates can view own payouts"
  ON affiliate_payouts FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM affiliates
    WHERE affiliates.id = affiliate_payouts.affiliate_id AND affiliates.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all payouts"
  ON affiliate_payouts FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Affiliate Creatives (affiliates can view active)
CREATE POLICY "Affiliates can view active creatives"
  ON affiliate_creatives FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage creatives"
  ON affiliate_creatives FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Affiliate Campaigns (affiliates see own)
CREATE POLICY "Affiliates can view own campaigns"
  ON affiliate_campaigns FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM affiliates
    WHERE affiliates.id = affiliate_campaigns.affiliate_id AND affiliates.user_id = auth.uid()
  ));

CREATE POLICY "Affiliates can manage own campaigns"
  ON affiliate_campaigns FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM affiliates
    WHERE affiliates.id = affiliate_campaigns.affiliate_id AND affiliates.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM affiliates
    WHERE affiliates.id = affiliate_campaigns.affiliate_id AND affiliates.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all campaigns"
  ON affiliate_campaigns FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Triggers
CREATE TRIGGER update_affiliate_programs_updated_at BEFORE UPDATE ON affiliate_programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_partners_updated_at BEFORE UPDATE ON affiliate_partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliates_updated_at BEFORE UPDATE ON affiliates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_conversions_updated_at BEFORE UPDATE ON affiliate_conversions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_commissions_updated_at BEFORE UPDATE ON affiliate_commissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_payouts_updated_at BEFORE UPDATE ON affiliate_payouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_creatives_updated_at BEFORE UPDATE ON affiliate_creatives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_campaigns_updated_at BEFORE UPDATE ON affiliate_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
