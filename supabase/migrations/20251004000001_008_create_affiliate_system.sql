/*
  # Affiliate System - Dual Model

  ## Overview
  Creates tables for both YOUR affiliate program (partners promoting Findawise products)
  and external affiliate partnerships (YOU promoting other products).

  ## New Tables

  ### `affiliate_programs`
  Defines YOUR products that affiliates can promote
  - `id` (uuid, primary key)
  - `product_id` (uuid) - Reference to products table
  - `commission_type` (text) - percentage, fixed, tiered
  - `commission_value` (numeric) - Commission amount/percentage
  - `commission_duration` (integer) - For subscriptions, how many months
  - `cookie_duration` (integer) - Cookie window in days
  - `is_active` (boolean) - Program active status
  - `terms` (text) - Program terms and conditions

  ### `affiliate_partners`
  External products YOU promote as an affiliate
  - `id` (uuid, primary key)
  - `partner_name` (text) - Partner/company name
  - `partner_url` (text) - Partner website
  - `product_name` (text) - Product being promoted
  - `affiliate_link` (text) - Your affiliate link
  - `commission_structure` (jsonb) - Commission details
  - `tracking_method` (text) - How conversions are tracked
  - `is_active` (boolean) - Active status

  ### `affiliates`
  People who promote YOUR products
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users
  - `status` (text) - pending, approved, suspended, rejected
  - `referral_code` (text) - Unique referral code
  - `company_name` (text) - Optional company name
  - `website` (text) - Optional website
  - `promotional_methods` (text[]) - How they'll promote
  - `stripe_account_id` (text) - For payouts
  - `payment_method` (jsonb) - Payment details

  ### `affiliate_links`
  Generated tracking links for affiliates
  - `id` (uuid, primary key)
  - `affiliate_id` (uuid) - Reference to affiliates
  - `product_id` (uuid) - Reference to products (nullable for general links)
  - `link_code` (text) - Unique tracking code
  - `destination_url` (text) - Where link points
  - `campaign_name` (text) - Optional campaign identifier
  - `click_count` (integer) - Number of clicks
  - `conversion_count` (integer) - Number of conversions

  ### `affiliate_clicks`
  Track all affiliate link clicks
  - `id` (uuid, primary key)
  - `link_id` (uuid) - Reference to affiliate_links
  - `affiliate_id` (uuid) - Reference to affiliates
  - `ip_address` (text) - Visitor IP
  - `user_agent` (text) - Browser info
  - `referrer` (text) - Where they came from
  - `converted` (boolean) - Whether click led to conversion

  ### `affiliate_commissions`
  Records both incoming and outgoing commission transactions
  - `id` (uuid, primary key)
  - `direction` (text) - incoming (we pay affiliates), outgoing (partners pay us)
  - `affiliate_id` (uuid) - Reference to affiliates (for incoming)
  - `partner_id` (uuid) - Reference to affiliate_partners (for outgoing)
  - `order_id` (uuid) - Reference to orders
  - `subscription_id` (uuid) - Reference to subscriptions
  - `amount` (numeric) - Commission amount in cents
  - `status` (text) - pending, approved, paid, rejected
  - `paid_at` (timestamptz) - When commission was paid
  - `stripe_transfer_id` (text) - Stripe transfer ID

  ### `affiliate_payouts`
  Batch payouts to affiliates
  - `id` (uuid, primary key)
  - `affiliate_id` (uuid) - Reference to affiliates
  - `amount` (numeric) - Total payout amount
  - `commission_ids` (uuid[]) - Array of commission IDs included
  - `status` (text) - pending, processing, completed, failed
  - `method` (text) - paypal, stripe, bank_transfer
  - `transaction_id` (text) - External transaction ID
  - `processed_at` (timestamptz) - When payout was processed

  ## Security
  - Enable RLS on all tables
  - Affiliates can view their own data
  - Only authenticated users can apply to be affiliates
  - Admin approval required for affiliate applications
*/

-- Create affiliate_programs table
CREATE TABLE IF NOT EXISTS affiliate_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  commission_type text NOT NULL DEFAULT 'percentage' CHECK (commission_type IN ('percentage', 'fixed', 'tiered')),
  commission_value numeric NOT NULL,
  commission_duration integer DEFAULT 1,
  cookie_duration integer DEFAULT 30,
  is_active boolean DEFAULT true,
  terms text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create affiliate_partners table
CREATE TABLE IF NOT EXISTS affiliate_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name text NOT NULL,
  partner_url text,
  product_name text NOT NULL,
  affiliate_link text NOT NULL,
  commission_structure jsonb DEFAULT '{}'::jsonb,
  tracking_method text,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create affiliates table
CREATE TABLE IF NOT EXISTS affiliates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended', 'rejected')),
  referral_code text UNIQUE NOT NULL,
  company_name text,
  website text,
  promotional_methods text[] DEFAULT ARRAY[]::text[],
  stripe_account_id text,
  payment_method jsonb DEFAULT '{}'::jsonb,
  total_earnings numeric DEFAULT 0,
  total_conversions integer DEFAULT 0,
  applied_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create affiliate_links table
CREATE TABLE IF NOT EXISTS affiliate_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  link_code text UNIQUE NOT NULL,
  destination_url text NOT NULL,
  campaign_name text,
  click_count integer DEFAULT 0,
  conversion_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create affiliate_clicks table
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES affiliate_links(id) ON DELETE CASCADE NOT NULL,
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE NOT NULL,
  ip_address inet,
  user_agent text,
  referrer text,
  converted boolean DEFAULT false,
  conversion_id uuid,
  clicked_at timestamptz DEFAULT now()
);

-- Create affiliate_commissions table
CREATE TABLE IF NOT EXISTS affiliate_commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  direction text NOT NULL CHECK (direction IN ('incoming', 'outgoing')),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE SET NULL,
  partner_id uuid REFERENCES affiliate_partners(id) ON DELETE SET NULL,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected', 'reversed')),
  paid_at timestamptz,
  stripe_transfer_id text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create affiliate_payouts table
CREATE TABLE IF NOT EXISTS affiliate_payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid REFERENCES affiliates(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  commission_ids uuid[] DEFAULT ARRAY[]::uuid[],
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  method text NOT NULL CHECK (method IN ('paypal', 'stripe', 'bank_transfer')),
  transaction_id text,
  error_message text,
  processed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_affiliate_programs_product ON affiliate_programs(product_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_user ON affiliates(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_status ON affiliates(status);
CREATE INDEX IF NOT EXISTS idx_affiliates_referral_code ON affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_links_affiliate ON affiliate_links(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_links_code ON affiliate_links(link_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_link ON affiliate_clicks(link_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_affiliate ON affiliate_clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_commissions_affiliate ON affiliate_commissions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_commissions_status ON affiliate_commissions(status);
CREATE INDEX IF NOT EXISTS idx_affiliate_payouts_affiliate ON affiliate_payouts(affiliate_id);

-- Enable RLS
ALTER TABLE affiliate_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_payouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for affiliate_programs
CREATE POLICY "Anyone can view active affiliate programs"
  ON affiliate_programs FOR SELECT
  TO public
  USING (is_active = true);

-- RLS Policies for affiliates
CREATE POLICY "Users can view own affiliate profile"
  ON affiliates FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own affiliate application"
  ON affiliates FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own affiliate profile"
  ON affiliates FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for affiliate_links
CREATE POLICY "Affiliates can view own links"
  ON affiliate_links FOR SELECT
  TO authenticated
  USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

CREATE POLICY "Affiliates can insert own links"
  ON affiliate_links FOR INSERT
  TO authenticated
  WITH CHECK (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

CREATE POLICY "Affiliates can update own links"
  ON affiliate_links FOR UPDATE
  TO authenticated
  USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()))
  WITH CHECK (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

-- RLS Policies for affiliate_clicks
CREATE POLICY "Affiliates can view own clicks"
  ON affiliate_clicks FOR SELECT
  TO authenticated
  USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

-- RLS Policies for affiliate_commissions
CREATE POLICY "Affiliates can view own commissions"
  ON affiliate_commissions FOR SELECT
  TO authenticated
  USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

-- RLS Policies for affiliate_payouts
CREATE POLICY "Affiliates can view own payouts"
  ON affiliate_payouts FOR SELECT
  TO authenticated
  USING (affiliate_id IN (SELECT id FROM affiliates WHERE user_id = auth.uid()));

-- Add updated_at triggers
CREATE TRIGGER update_affiliate_programs_updated_at BEFORE UPDATE ON affiliate_programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_partners_updated_at BEFORE UPDATE ON affiliate_partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliates_updated_at BEFORE UPDATE ON affiliates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_links_updated_at BEFORE UPDATE ON affiliate_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_commissions_updated_at BEFORE UPDATE ON affiliate_commissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_affiliate_payouts_updated_at BEFORE UPDATE ON affiliate_payouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
