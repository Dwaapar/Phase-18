/*
  # Core Products and Pricing Schema

  ## Overview
  Creates the foundation for the Findawise enterprise platform supporting workflows, agents,
  assets, automation services, and tools with a unified pricing structure.

  ## New Tables

  ### `pricing_tiers`
  Defines subscription tiers (Free, Starter, Professional, Enterprise) with feature limits
  - `id` (uuid, primary key)
  - `name` (text) - Tier name
  - `slug` (text) - URL-friendly identifier
  - `price_monthly` (numeric) - Monthly price in cents
  - `price_yearly` (numeric) - Yearly price in cents
  - `features` (jsonb) - Feature limits and capabilities
  - `is_active` (boolean) - Whether tier is available
  - `sort_order` (integer) - Display order

  ### `product_categories`
  Hierarchical category structure supporting nested categories
  - `id` (uuid, primary key)
  - `name` (text) - Category name
  - `slug` (text) - URL-friendly identifier
  - `description` (text) - Category description
  - `parent_id` (uuid) - Reference to parent category
  - `icon` (text) - Icon identifier
  - `sort_order` (integer) - Display order

  ### `products`
  Unified products table for all product types
  - `id` (uuid, primary key)
  - `type` (text) - Product type: workflow, agent, asset, service, tool
  - `name` (text) - Product name
  - `slug` (text) - URL-friendly identifier
  - `description` (text) - Short description
  - `long_description` (text) - Detailed description
  - `category_id` (uuid) - Reference to category
  - `pricing_model` (text) - free, one_time, subscription, custom_quote
  - `price` (numeric) - Base price in cents
  - `tier_required` (text) - Minimum tier needed (free, starter, professional, enterprise)
  - `metadata` (jsonb) - Product-specific data
  - `features` (jsonb) - Feature list
  - `integrations` (text[]) - Supported integrations
  - `screenshots` (text[]) - Image URLs
  - `demo_url` (text) - Demo video or interactive demo
  - `documentation_url` (text) - Docs link
  - `install_count` (integer) - Number of installations
  - `rating_average` (numeric) - Average rating
  - `rating_count` (integer) - Number of ratings
  - `is_featured` (boolean) - Featured product flag
  - `is_active` (boolean) - Active/archived status
  - `created_by` (uuid) - Reference to creator user

  ### `subscriptions`
  User subscription tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users
  - `tier_id` (uuid) - Reference to pricing_tiers
  - `status` (text) - active, canceled, past_due, trialing
  - `billing_cycle` (text) - monthly, yearly
  - `current_period_start` (timestamptz) - Current billing period start
  - `current_period_end` (timestamptz) - Current billing period end
  - `cancel_at_period_end` (boolean) - Scheduled cancellation
  - `stripe_subscription_id` (text) - Stripe subscription ID
  - `stripe_customer_id` (text) - Stripe customer ID

  ### `orders`
  One-time purchase tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users
  - `product_id` (uuid) - Reference to products
  - `amount` (numeric) - Purchase amount in cents
  - `status` (text) - pending, completed, failed, refunded
  - `payment_method` (text) - Payment method used
  - `stripe_payment_intent_id` (text) - Stripe payment intent ID
  - `receipt_url` (text) - Receipt URL

  ### `user_products`
  Junction table tracking user product ownership and usage
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users
  - `product_id` (uuid) - Reference to products
  - `source` (text) - How acquired: subscription, purchase, trial
  - `activated_at` (timestamptz) - Activation date
  - `expires_at` (timestamptz) - Expiration date (for trials)
  - `usage_count` (integer) - Usage tracking
  - `last_used_at` (timestamptz) - Last usage timestamp
  - `deployment_config` (jsonb) - Deployment configuration

  ## Security
  - Enable RLS on all tables
  - Users can view their own subscriptions, orders, and products
  - Public read access to products, categories, and pricing tiers
  - Admin-only write access to products and pricing tiers
*/

-- Create pricing_tiers table
CREATE TABLE IF NOT EXISTS pricing_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  price_monthly numeric NOT NULL DEFAULT 0,
  price_yearly numeric NOT NULL DEFAULT 0,
  features jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product_categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  icon text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('workflow', 'agent', 'asset', 'service', 'tool')),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text,
  category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  pricing_model text NOT NULL CHECK (pricing_model IN ('free', 'one_time', 'subscription', 'custom_quote')),
  price numeric DEFAULT 0,
  tier_required text DEFAULT 'free' CHECK (tier_required IN ('free', 'starter', 'professional', 'enterprise')),
  metadata jsonb DEFAULT '{}'::jsonb,
  features jsonb DEFAULT '[]'::jsonb,
  integrations text[] DEFAULT ARRAY[]::text[],
  screenshots text[] DEFAULT ARRAY[]::text[],
  demo_url text,
  documentation_url text,
  install_count integer DEFAULT 0,
  rating_average numeric DEFAULT 0 CHECK (rating_average >= 0 AND rating_average <= 5),
  rating_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tier_id uuid REFERENCES pricing_tiers(id) ON DELETE RESTRICT NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'incomplete')),
  billing_cycle text NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  current_period_start timestamptz NOT NULL DEFAULT now(),
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  stripe_subscription_id text UNIQUE,
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tier_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text,
  stripe_payment_intent_id text UNIQUE,
  receipt_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_products table
CREATE TABLE IF NOT EXISTS user_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  source text NOT NULL CHECK (source IN ('subscription', 'purchase', 'trial', 'admin_grant')),
  activated_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  usage_count integer DEFAULT 0,
  last_used_at timestamptz,
  deployment_config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_type ON products(type);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_tier ON products(tier_required);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_user_products_user ON user_products(user_id);
CREATE INDEX IF NOT EXISTS idx_user_products_product ON user_products(product_id);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON product_categories(parent_id);

-- Enable RLS
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pricing_tiers
CREATE POLICY "Anyone can view active pricing tiers"
  ON pricing_tiers FOR SELECT
  TO public
  USING (is_active = true);

-- RLS Policies for product_categories
CREATE POLICY "Anyone can view product categories"
  ON product_categories FOR SELECT
  TO public
  USING (true);

-- RLS Policies for products
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_products
CREATE POLICY "Users can view own products"
  ON user_products FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products"
  ON user_products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products"
  ON user_products FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_pricing_tiers_updated_at BEFORE UPDATE ON pricing_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_categories_updated_at BEFORE UPDATE ON product_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_products_updated_at BEFORE UPDATE ON user_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
