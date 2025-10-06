/*
  # Products and Pricing System

  ## Overview
  Comprehensive e-commerce system supporting multiple product types (workflows, agents, assets,
  services, tools) with flexible pricing models and subscription management.

  ## 1. Product Catalog

  ### `product_categories`
  Hierarchical category structure with parent/child relationships
  - Supports nested categories (e.g., Marketing → Email → Lead Nurture)
  - Fields: name, slug, description, parent_id, icon, display_order, is_active

  ### `products`
  Universal product table supporting all marketplace offerings
  - Product types: workflow, agent, asset, service, tool
  - Pricing models: free, one_time, subscription, usage_based, custom
  - Tier restrictions: free, starter, professional, enterprise
  - Fields: name, slug, description, type, category_id, pricing_model, base_price, 
    minimum_tier, features, specifications, media, deployment_model, integrations, tags,
    difficulty_level, setup_time_minutes, is_featured, install_count, ratings

  ## 2. Subscription Management

  ### `pricing_tiers`
  Platform subscription tiers (Free, Starter, Professional, Enterprise)
  - Fields: name, slug, price_monthly, price_annual, features (jsonb), limits (jsonb),
    display_order, is_active, is_custom

  ### `subscriptions`
  User subscription tracking with billing cycles
  - Fields: user_id, tier_id, status (active/trialing/past_due/canceled/paused),
    billing_cycle (monthly/annual), current_period_start, current_period_end,
    cancel_at_period_end, stripe_subscription_id, stripe_customer_id, trial_ends_at

  ### `subscription_features`
  Feature flags and limits per tier
  - Fields: tier_id, feature_key, feature_name, feature_value (jsonb), description

  ## 3. Orders and Purchases

  ### `orders`
  One-time product purchases with payment tracking
  - Fields: user_id, order_number, status (pending/processing/completed/failed/refunded),
    subtotal, tax, discount, total, currency, payment_method, stripe_payment_intent_id,
    invoice_url, receipt_url, billing_details, paid_at, refunded_at

  ### `order_items`
  Individual line items per order
  - Fields: order_id, product_id, quantity, unit_price, total_price, license_key,
    download_url, download_expires_at

  ### `user_products`
  Junction table tracking deployed/activated products
  - Fields: user_id, product_id, order_id, subscription_id, status (active/inactive/suspended/expired),
    deployment_config, usage_stats, activated_at, expires_at, last_used_at

  ## 4. Product Bundles

  ### `product_bundles`
  Packaged offerings with discount pricing
  - Fields: name, slug, description, price, discount_percentage, minimum_tier,
    is_active, valid_from, valid_until, media

  ### `bundle_items`
  Products included in each bundle
  - Fields: bundle_id, product_id, display_order

  ## 5. Security
  - RLS enabled on all tables
  - Public read access for products, categories, and pricing tiers
  - Users can view their own subscriptions, orders, and products
  - Admin full access for product management
*/

-- Product Categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  parent_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  icon text,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  long_description text,
  product_type text NOT NULL CHECK (product_type IN ('workflow', 'agent', 'asset', 'service', 'tool')),
  category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  pricing_model text NOT NULL CHECK (pricing_model IN ('free', 'one_time', 'subscription', 'usage_based', 'custom')),
  base_price int DEFAULT 0,
  currency text DEFAULT 'USD',
  minimum_tier text DEFAULT 'free' CHECK (minimum_tier IN ('free', 'starter', 'professional', 'enterprise')),
  features jsonb DEFAULT '[]'::jsonb,
  specifications jsonb DEFAULT '{}'::jsonb,
  media jsonb DEFAULT '{"images": [], "videos": [], "demos": []}'::jsonb,
  deployment_model text CHECK (deployment_model IN ('managed', 'self_hosted', 'hybrid', 'download', 'saas')),
  integrations text[] DEFAULT ARRAY[]::text[],
  tags text[] DEFAULT ARRAY[]::text[],
  difficulty_level text CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  setup_time_minutes int,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  install_count int DEFAULT 0,
  view_count int DEFAULT 0,
  average_rating decimal(3,2) DEFAULT 0 CHECK (average_rating >= 0 AND average_rating <= 5),
  review_count int DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Pricing Tiers table
CREATE TABLE IF NOT EXISTS pricing_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text UNIQUE NOT NULL,
  description text,
  price_monthly int NOT NULL DEFAULT 0,
  price_annual int NOT NULL DEFAULT 0,
  features jsonb DEFAULT '[]'::jsonb,
  limits jsonb DEFAULT '{}'::jsonb,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  is_custom boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier_id uuid NOT NULL REFERENCES pricing_tiers(id),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'paused')),
  billing_cycle text NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
  current_period_start timestamptz NOT NULL DEFAULT now(),
  current_period_end timestamptz NOT NULL,
  cancel_at_period_end boolean DEFAULT false,
  canceled_at timestamptz,
  stripe_subscription_id text UNIQUE,
  stripe_customer_id text,
  trial_ends_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tier_id, status)
);

-- Subscription Features table
CREATE TABLE IF NOT EXISTS subscription_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_id uuid NOT NULL REFERENCES pricing_tiers(id) ON DELETE CASCADE,
  feature_key text NOT NULL,
  feature_name text NOT NULL,
  feature_value jsonb NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tier_id, feature_key)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  subtotal int NOT NULL DEFAULT 0,
  tax int DEFAULT 0,
  discount int DEFAULT 0,
  total int NOT NULL DEFAULT 0,
  currency text DEFAULT 'USD',
  payment_method text,
  stripe_payment_intent_id text UNIQUE,
  stripe_charge_id text,
  invoice_url text,
  receipt_url text,
  billing_details jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  paid_at timestamptz,
  refunded_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order Items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity int NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price int NOT NULL,
  total_price int NOT NULL,
  license_key text,
  download_url text,
  download_expires_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- User Products table
CREATE TABLE IF NOT EXISTS user_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'expired')),
  deployment_config jsonb DEFAULT '{}'::jsonb,
  usage_stats jsonb DEFAULT '{}'::jsonb,
  activated_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Product Bundles table
CREATE TABLE IF NOT EXISTS product_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price int NOT NULL,
  currency text DEFAULT 'USD',
  discount_percentage int DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  minimum_tier text DEFAULT 'free' CHECK (minimum_tier IN ('free', 'starter', 'professional', 'enterprise')),
  is_active boolean DEFAULT true,
  valid_from timestamptz,
  valid_until timestamptz,
  media jsonb DEFAULT '{"images": [], "icon": ""}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bundle Items table
CREATE TABLE IF NOT EXISTS bundle_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id uuid NOT NULL REFERENCES product_bundles(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(bundle_id, product_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_tier ON products(minimum_tier);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_user_products_user ON user_products(user_id);
CREATE INDEX IF NOT EXISTS idx_user_products_product ON user_products(product_id);
CREATE INDEX IF NOT EXISTS idx_user_products_status ON user_products(status);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON product_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON product_categories(slug);
CREATE INDEX IF NOT EXISTS idx_bundles_slug ON product_bundles(slug);

-- Enable RLS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bundle_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for product_categories (public read)
CREATE POLICY "Anyone can view active categories"
  ON product_categories FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON product_categories FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for products (public read for active)
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for pricing_tiers (public read)
CREATE POLICY "Anyone can view active tiers"
  ON pricing_tiers FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Admins can manage tiers"
  ON pricing_tiers FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for subscriptions (users see own)
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create own subscriptions"
  ON subscriptions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all subscriptions"
  ON subscriptions FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for subscription_features (public read)
CREATE POLICY "Anyone can view subscription features"
  ON subscription_features FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage subscription features"
  ON subscription_features FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for orders (users see own)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders"
  ON orders FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for order_items (through order relationship)
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

CREATE POLICY "Users can create order items for own orders"
  ON order_items FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

CREATE POLICY "Admins can manage all order items"
  ON order_items FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for user_products (users see own)
CREATE POLICY "Users can view own products"
  ON user_products FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own products"
  ON user_products FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all user products"
  ON user_products FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for product_bundles (public read)
CREATE POLICY "Anyone can view active bundles"
  ON product_bundles FOR SELECT TO public USING (is_active = true);

CREATE POLICY "Admins can manage bundles"
  ON product_bundles FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for bundle_items (public read through bundle)
CREATE POLICY "Anyone can view bundle items"
  ON bundle_items FOR SELECT TO public
  USING (EXISTS (SELECT 1 FROM product_bundles WHERE product_bundles.id = bundle_items.bundle_id AND product_bundles.is_active = true));

CREATE POLICY "Admins can manage bundle items"
  ON bundle_items FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Add updated_at triggers
CREATE TRIGGER update_product_categories_updated_at BEFORE UPDATE ON product_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_tiers_updated_at BEFORE UPDATE ON pricing_tiers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_products_updated_at BEFORE UPDATE ON user_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_bundles_updated_at BEFORE UPDATE ON product_bundles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();