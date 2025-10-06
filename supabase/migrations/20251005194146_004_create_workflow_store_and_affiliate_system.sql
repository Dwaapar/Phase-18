/*
  # Workflow Store and Affiliate System

  ## Overview
  Creates enhanced workflow management tables and a comprehensive dual-direction
  affiliate system.

  ## 1. Workflow Store Enhancement

  ### `workflow_categories`
  Category definitions for workflows
  - Fields: name, slug, description, icon, order_index, workflow_count

  ### `workflow_packages`
  Industry-specific workflow bundles
  - Fields: name, slug, industry, description, workflow_ids, pricing_tier, discount_percentage

  ### `workflow_versions`
  Version history for workflows
  - Fields: workflow_id, version, changelog, steps, is_current

  ### `workflow_executions`
  Execution logs for user workflows
  - Fields: user_workflow_id, status (running/completed/failed), started_at, completed_at,
    duration_ms, error_message, output

  ### `workflow_screenshots`
  Visual assets for workflows
  - Fields: workflow_id, url, caption, order_index

  ### `workflow_videos`
  Demo videos for workflows
  - Fields: workflow_id, title, url, thumbnail, duration

  ## 2. Dual Affiliate System

  ### Direction 1: YOUR Products (Affiliates promoting you)

  #### `affiliate_programs`
  Define commission structures for your products
  - Fields: product_id, name, slug, description, commission_type (percentage/fixed/tiered/recurring),
    commission_value, recurring_months, cookie_duration_days, minimum_payout_cents,
    payment_terms, is_active, requires_approval, performance_bonus

  #### `affiliates`
  Partners promoting YOUR products
  - Fields: user_id, affiliate_code, status (pending/approved/suspended/terminated),
    tier (standard/silver/gold/platinum), company_name, website_url, promotional_methods,
    audience_size, total_clicks, total_conversions, total_revenue_cents, total_commissions_cents

  #### `affiliate_clicks`
  Click tracking with attribution
  - Fields: affiliate_id, program_id, click_id, referrer_url, landing_page, user_agent,
    ip_address, country_code, device_type, converted, conversion_id

  #### `affiliate_conversions`
  Conversion tracking and commission calculation
  - Fields: affiliate_id, program_id, click_id, order_id, subscription_id,
    conversion_type (sale/subscription/lead/signup), order_value_cents, commission_cents,
    commission_status (pending/approved/paid/reversed)

  #### `affiliate_payouts`
  Batch payouts to affiliates
  - Fields: affiliate_id, amount_cents, commission_ids, status (pending/processing/completed/failed),
    payment_method, transaction_id, processed_at

  ### Direction 2: EXTERNAL Products (You promoting others)

  #### `affiliate_partners`
  External programs you're enrolled in
  - Fields: name, slug, description, website_url, affiliate_network, commission_structure,
    cookie_duration_days, payment_terms, tracking_url, affiliate_id, api_key, is_active

  #### `partner_earnings`
  Track earnings from external affiliate programs
  - Fields: partner_id, period_start, period_end, clicks, conversions, revenue_cents,
    commission_cents, status (pending/confirmed/paid), paid_at

  ## 3. Security
  - RLS enabled on all tables
  - Public read for workflow categories, screenshots, videos
  - Affiliates can view their own data and public programs
  - Commission and payout data secured by user relationship
  - Admin full access for management
*/

-- Workflow Categories table
CREATE TABLE IF NOT EXISTS workflow_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text NOT NULL,
  order_index integer DEFAULT 0,
  workflow_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workflow Packages table
CREATE TABLE IF NOT EXISTS workflow_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  industry text NOT NULL,
  description text NOT NULL,
  workflow_ids uuid[] DEFAULT '{}',
  pricing_tier text NOT NULL DEFAULT 'Free' CHECK (pricing_tier IN ('Free', 'Professional', 'Enterprise')),
  discount_percentage integer DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Workflow Versions table
CREATE TABLE IF NOT EXISTS workflow_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  version text NOT NULL,
  changelog text NOT NULL,
  steps jsonb DEFAULT '[]',
  is_current boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(workflow_id, version)
);

-- Workflow Executions table
CREATE TABLE IF NOT EXISTS workflow_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_workflow_id uuid NOT NULL REFERENCES user_workflows(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'failed')),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  duration_ms integer,
  error_message text,
  output jsonb,
  created_at timestamptz DEFAULT now()
);

-- Workflow Screenshots table
CREATE TABLE IF NOT EXISTS workflow_screenshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  url text NOT NULL,
  caption text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Workflow Videos table
CREATE TABLE IF NOT EXISTS workflow_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  thumbnail text NOT NULL,
  duration text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Affiliate Programs table (YOUR products)
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

-- Affiliates table (partners promoting YOUR products)
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

-- Affiliate Clicks table
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

-- Affiliate Conversions table
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliate Payouts table
CREATE TABLE IF NOT EXISTS affiliate_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE,
  amount_cents int NOT NULL,
  commission_ids uuid[] DEFAULT ARRAY[]::uuid[],
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payment_method text NOT NULL CHECK (payment_method IN ('paypal', 'stripe', 'bank_transfer', 'wire')),
  transaction_id text,
  notes text,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Affiliate Partners table (external programs YOU promote)
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

-- Partner Earnings table (YOUR earnings from external programs)
CREATE TABLE IF NOT EXISTS partner_earnings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid REFERENCES affiliate_partners(id) ON DELETE CASCADE,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  clicks int DEFAULT 0,
  conversions int DEFAULT 0,
  revenue_cents int DEFAULT 0,
  commission_cents int DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid')),
  paid_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS workflow_categories_slug_idx ON workflow_categories(slug);
CREATE INDEX IF NOT EXISTS workflow_packages_industry_idx ON workflow_packages(industry);
CREATE INDEX IF NOT EXISTS workflow_packages_pricing_tier_idx ON workflow_packages(pricing_tier);
CREATE INDEX IF NOT EXISTS workflow_versions_workflow_id_idx ON workflow_versions(workflow_id);
CREATE INDEX IF NOT EXISTS workflow_versions_is_current_idx ON workflow_versions(is_current);
CREATE INDEX IF NOT EXISTS workflow_executions_user_workflow_id_idx ON workflow_executions(user_workflow_id);
CREATE INDEX IF NOT EXISTS workflow_executions_status_idx ON workflow_executions(status);
CREATE INDEX IF NOT EXISTS workflow_screenshots_workflow_id_idx ON workflow_screenshots(workflow_id);
CREATE INDEX IF NOT EXISTS workflow_videos_workflow_id_idx ON workflow_videos(workflow_id);
CREATE INDEX IF NOT EXISTS affiliate_programs_slug_idx ON affiliate_programs(slug);
CREATE INDEX IF NOT EXISTS affiliate_programs_product_id_idx ON affiliate_programs(product_id);
CREATE INDEX IF NOT EXISTS affiliates_user_id_idx ON affiliates(user_id);
CREATE INDEX IF NOT EXISTS affiliates_code_idx ON affiliates(affiliate_code);
CREATE INDEX IF NOT EXISTS affiliates_status_idx ON affiliates(status);
CREATE INDEX IF NOT EXISTS affiliate_clicks_affiliate_id_idx ON affiliate_clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS affiliate_clicks_program_id_idx ON affiliate_clicks(program_id);
CREATE INDEX IF NOT EXISTS affiliate_conversions_affiliate_id_idx ON affiliate_conversions(affiliate_id);
CREATE INDEX IF NOT EXISTS affiliate_conversions_status_idx ON affiliate_conversions(commission_status);
CREATE INDEX IF NOT EXISTS affiliate_payouts_affiliate_id_idx ON affiliate_payouts(affiliate_id);
CREATE INDEX IF NOT EXISTS affiliate_payouts_status_idx ON affiliate_payouts(status);
CREATE INDEX IF NOT EXISTS affiliate_partners_slug_idx ON affiliate_partners(slug);
CREATE INDEX IF NOT EXISTS partner_earnings_partner_id_idx ON partner_earnings(partner_id);

-- Enable RLS
ALTER TABLE workflow_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_earnings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for workflow tables (public read)
CREATE POLICY "Anyone can view workflow categories"
  ON workflow_categories FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage workflow categories"
  ON workflow_categories FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Anyone can view workflow packages"
  ON workflow_packages FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage workflow packages"
  ON workflow_packages FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Anyone can view workflow versions"
  ON workflow_versions FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage workflow versions"
  ON workflow_versions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Users can view own workflow executions"
  ON workflow_executions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM user_workflows WHERE user_workflows.id = workflow_executions.user_workflow_id AND user_workflows.user_id = auth.uid()));

CREATE POLICY "Users can manage own workflow executions"
  ON workflow_executions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM user_workflows WHERE user_workflows.id = workflow_executions.user_workflow_id AND user_workflows.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM user_workflows WHERE user_workflows.id = workflow_executions.user_workflow_id AND user_workflows.user_id = auth.uid()));

CREATE POLICY "Anyone can view workflow screenshots"
  ON workflow_screenshots FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage workflow screenshots"
  ON workflow_screenshots FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Anyone can view workflow videos"
  ON workflow_videos FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage workflow videos"
  ON workflow_videos FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for affiliate programs (public read for active)
CREATE POLICY "Anyone can view active affiliate programs"
  ON affiliate_programs FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Admins can manage affiliate programs"
  ON affiliate_programs FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for affiliates
CREATE POLICY "Affiliates can view own data"
  ON affiliates FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Users can create affiliate applications"
  ON affiliates FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Affiliates can update own data"
  ON affiliates FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all affiliates"
  ON affiliates FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for affiliate clicks
CREATE POLICY "Affiliates can view own clicks"
  ON affiliate_clicks FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM affiliates WHERE affiliates.id = affiliate_clicks.affiliate_id AND affiliates.user_id = auth.uid()));

CREATE POLICY "System can insert clicks"
  ON affiliate_clicks FOR INSERT TO authenticated, anon WITH CHECK (true);

CREATE POLICY "Admins can view all clicks"
  ON affiliate_clicks FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for affiliate conversions
CREATE POLICY "Affiliates can view own conversions"
  ON affiliate_conversions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM affiliates WHERE affiliates.id = affiliate_conversions.affiliate_id AND affiliates.user_id = auth.uid()));

CREATE POLICY "Admins can manage all conversions"
  ON affiliate_conversions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for affiliate payouts
CREATE POLICY "Affiliates can view own payouts"
  ON affiliate_payouts FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM affiliates WHERE affiliates.id = affiliate_payouts.affiliate_id AND affiliates.user_id = auth.uid()));

CREATE POLICY "Admins can manage all payouts"
  ON affiliate_payouts FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for affiliate partners (admin only)
CREATE POLICY "Admins can manage affiliate partners"
  ON affiliate_partners FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for partner earnings (admin only)
CREATE POLICY "Admins can manage partner earnings"
  ON partner_earnings FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Add updated_at triggers
CREATE TRIGGER update_workflow_categories_updated_at BEFORE UPDATE ON workflow_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflow_packages_updated_at BEFORE UPDATE ON workflow_packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_programs_updated_at BEFORE UPDATE ON affiliate_programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliates_updated_at BEFORE UPDATE ON affiliates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_conversions_updated_at BEFORE UPDATE ON affiliate_conversions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_payouts_updated_at BEFORE UPDATE ON affiliate_payouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_partners_updated_at BEFORE UPDATE ON affiliate_partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_earnings_updated_at BEFORE UPDATE ON partner_earnings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to update workflow category counts
CREATE OR REPLACE FUNCTION update_workflow_category_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE workflow_categories
  SET workflow_count = (
    SELECT COUNT(*)
    FROM workflows
    WHERE workflows.category = workflow_categories.name
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update category counts
DROP TRIGGER IF EXISTS trigger_update_workflow_category_count ON workflows;
CREATE TRIGGER trigger_update_workflow_category_count
  AFTER INSERT OR UPDATE OR DELETE ON workflows
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_workflow_category_count();