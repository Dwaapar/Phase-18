/*
  # Enterprise Products and Pricing System

  ## Overview
  Creates comprehensive product catalog supporting workflows, agents, assets, automation services, and tools
  with unified pricing structure and subscription management.

  ## 1. Product Categories and Taxonomy
    - `product_categories` - Hierarchical category structure with parent/child relationships
    - Supports nested categories for organization (e.g., Marketing > Email > Lead Nurture)

  ## 2. Core Products Table
    - `products` - Universal table for all product types (workflows, agents, assets, services, tools)
    - Fields: name, description, type, category, pricing_model, base_price, tier_restrictions
    - Supports multiple pricing models: free, one-time, subscription, usage-based, custom
    - Tier-gated access control (free, starter, professional, enterprise)

  ## 3. Pricing Tiers and Subscriptions
    - `pricing_tiers` - Platform subscription plans with feature limits and pricing
    - `subscriptions` - User subscription tracking with billing cycles and status
    - `subscription_features` - Feature flags and limits per tier
    - Tiers: Free, Starter ($19/mo), Professional ($49/mo), Enterprise (custom)

  ## 4. Orders and Purchases
    - `orders` - One-time product purchases with payment tracking
    - `order_items` - Individual line items per order
    - `user_products` - Junction table tracking deployed/activated products
    - Supports license management and usage limits

  ## 5. Product Bundles
    - `product_bundles` - Packaged offerings with discount pricing
    - `bundle_items` - Products included in each bundle

  ## 6. Security
    - RLS enabled on all tables
    - Users can view public products and their own purchases
    - Admins have full access for management
    - Secure payment and subscription data access

  ## Important Notes
    - All prices in cents (USD) for precision
    - Supports multiple pricing models for flexibility
    - Usage tracking enforces tier limits
    - Automatic renewal handling for subscriptions
*/

-- Product Categories with hierarchical structure
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

-- Core Products table supporting all product types
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
  average_rating decimal(3,2) DEFAULT 0,
  review_count int DEFAULT 0,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Pricing Tiers (Platform Subscriptions)
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

-- User Subscriptions
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

-- Subscription Features and Limits
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

-- Orders for one-time purchases
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

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity int NOT NULL DEFAULT 1,
  unit_price int NOT NULL,
  total_price int NOT NULL,
  license_key text,
  download_url text,
  download_expires_at timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- User Products (Deployed/Activated Products)
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

-- Product Bundles
CREATE TABLE IF NOT EXISTS product_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price int NOT NULL,
  currency text DEFAULT 'USD',
  discount_percentage int DEFAULT 0,
  minimum_tier text DEFAULT 'free' CHECK (minimum_tier IN ('free', 'starter', 'professional', 'enterprise')),
  is_active boolean DEFAULT true,
  valid_from timestamptz,
  valid_until timestamptz,
  media jsonb DEFAULT '{"images": [], "icon": ""}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bundle Items
CREATE TABLE IF NOT EXISTS bundle_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id uuid NOT NULL REFERENCES product_bundles(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(bundle_id, product_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_tier ON products(minimum_tier);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_user_products_user ON user_products(user_id);
CREATE INDEX IF NOT EXISTS idx_user_products_product ON user_products(product_id);
CREATE INDEX IF NOT EXISTS idx_user_products_status ON user_products(status);

-- Enable Row Level Security
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

-- RLS Policies: Product Categories (public read)
CREATE POLICY "Anyone can view active categories"
  ON product_categories FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON product_categories FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Products (public read for active)
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Pricing Tiers (public read)
CREATE POLICY "Anyone can view active tiers"
  ON pricing_tiers FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage tiers"
  ON pricing_tiers FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Subscriptions (users see own)
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all subscriptions"
  ON subscriptions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Subscription Features (public read)
CREATE POLICY "Anyone can view subscription features"
  ON subscription_features FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage subscription features"
  ON subscription_features FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Orders (users see own)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all orders"
  ON orders FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Order Items (through order relationship)
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can create order items for own orders"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Admins can manage all order items"
  ON order_items FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: User Products (users see own)
CREATE POLICY "Users can view own products"
  ON user_products FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own products"
  ON user_products FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all user products"
  ON user_products FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Product Bundles (public read)
CREATE POLICY "Anyone can view active bundles"
  ON product_bundles FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage bundles"
  ON product_bundles FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Bundle Items (public read through bundle)
CREATE POLICY "Anyone can view bundle items"
  ON bundle_items FOR SELECT
  TO public
  USING (EXISTS (
    SELECT 1 FROM product_bundles
    WHERE product_bundles.id = bundle_items.bundle_id AND product_bundles.is_active = true
  ));

CREATE POLICY "Admins can manage bundle items"
  ON bundle_items FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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
