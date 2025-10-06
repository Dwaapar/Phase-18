/*
  # Product Analytics, Reviews, Bundles, and Feature Flags

  ## Overview
  Additional tables for product analytics tracking, user reviews, product bundles,
  and feature flags for tier-based access control.

  ## New Tables

  ### `product_analytics`
  Tracks product performance metrics
  - `id` (uuid, primary key)
  - `product_id` (uuid) - Reference to products
  - `metric_date` (date) - Date of metrics
  - `views` (integer) - Product page views
  - `installations` (integer) - New installations
  - `active_users` (integer) - Active users for the day
  - `revenue` (numeric) - Revenue generated
  - `conversion_rate` (numeric) - View to install conversion

  ### `product_reviews`
  User reviews and ratings for products
  - `id` (uuid, primary key)
  - `product_id` (uuid) - Reference to products
  - `user_id` (uuid) - Reference to auth.users
  - `rating` (integer) - 1-5 stars
  - `title` (text) - Review title
  - `content` (text) - Review text
  - `verified_purchase` (boolean) - Purchased by user
  - `helpful_count` (integer) - Helpful votes
  - `moderation_status` (text) - pending, approved, rejected
  - `moderator_notes` (text) - Internal notes

  ### `review_votes`
  Track helpful votes on reviews
  - `id` (uuid, primary key)
  - `review_id` (uuid) - Reference to product_reviews
  - `user_id` (uuid) - Reference to auth.users
  - `vote_type` (text) - helpful, not_helpful

  ### `product_bundles`
  Packaged product offerings with discounts
  - `id` (uuid, primary key)
  - `name` (text) - Bundle name
  - `slug` (text) - URL-friendly identifier
  - `description` (text) - Bundle description
  - `product_ids` (uuid[]) - Array of product IDs
  - `regular_price` (numeric) - Sum of individual prices
  - `bundle_price` (numeric) - Discounted bundle price
  - `discount_percentage` (numeric) - Calculated discount
  - `is_active` (boolean) - Active status

  ### `feature_flags`
  Control feature access by subscription tier
  - `id` (uuid, primary key)
  - `feature_key` (text) - Unique feature identifier
  - `name` (text) - Display name
  - `description` (text) - Feature description
  - `tiers_enabled` (text[]) - Which tiers have access
  - `is_active` (boolean) - Feature active status
  - `config` (jsonb) - Additional configuration

  ### `usage_limits`
  Track and enforce usage limits per user
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users
  - `limit_type` (text) - workflow_deployments, agent_instances, asset_downloads, tool_uses
  - `limit_value` (integer) - Maximum allowed
  - `current_value` (integer) - Current usage
  - `reset_at` (timestamptz) - When limit resets
  - `tier_slug` (text) - Tier providing this limit

  ### `integrations`
  Third-party tool integrations catalog
  - `id` (uuid, primary key)
  - `name` (text) - Integration name
  - `slug` (text) - URL-friendly identifier
  - `description` (text) - Integration description
  - `category` (text) - Integration category
  - `icon_url` (text) - Logo/icon
  - `auth_type` (text) - oauth2, api_key, webhook
  - `documentation_url` (text) - Setup docs
  - `is_active` (boolean) - Active status

  ### `user_integrations`
  User's connected integrations
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Reference to auth.users
  - `integration_id` (uuid) - Reference to integrations
  - `credentials` (jsonb) - Encrypted credentials
  - `status` (text) - connected, disconnected, error
  - `last_sync_at` (timestamptz) - Last successful sync
  - `error_message` (text) - Error details

  ## Security
  - Enable RLS on all tables
  - Users can view public reviews
  - Users can manage their own reviews
  - Public read access to bundles and integrations
  - Users can view/manage their own usage limits and integrations
*/

-- Create product_analytics table
CREATE TABLE IF NOT EXISTS product_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  metric_date date NOT NULL DEFAULT CURRENT_DATE,
  views integer DEFAULT 0,
  installations integer DEFAULT 0,
  active_users integer DEFAULT 0,
  revenue numeric DEFAULT 0,
  conversion_rate numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, metric_date)
);

-- Create product_reviews table
CREATE TABLE IF NOT EXISTS product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text NOT NULL,
  content text NOT NULL,
  verified_purchase boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  moderation_status text NOT NULL DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
  moderator_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, user_id)
);

-- Create review_votes table
CREATE TABLE IF NOT EXISTS review_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES product_reviews(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  vote_type text NOT NULL CHECK (vote_type IN ('helpful', 'not_helpful')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Create product_bundles table
CREATE TABLE IF NOT EXISTS product_bundles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  product_ids uuid[] NOT NULL DEFAULT ARRAY[]::uuid[],
  regular_price numeric NOT NULL,
  bundle_price numeric NOT NULL,
  discount_percentage numeric GENERATED ALWAYS AS (
    CASE WHEN regular_price > 0
    THEN ((regular_price - bundle_price) / regular_price * 100)
    ELSE 0 END
  ) STORED,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create feature_flags table
CREATE TABLE IF NOT EXISTS feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_key text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  tiers_enabled text[] DEFAULT ARRAY['free', 'starter', 'professional', 'enterprise']::text[],
  is_active boolean DEFAULT true,
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create usage_limits table
CREATE TABLE IF NOT EXISTS usage_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  limit_type text NOT NULL CHECK (limit_type IN ('workflow_deployments', 'agent_instances', 'asset_downloads', 'tool_uses', 'api_calls')),
  limit_value integer NOT NULL,
  current_value integer DEFAULT 0,
  reset_at timestamptz NOT NULL,
  tier_slug text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, limit_type)
);

-- Create integrations table
CREATE TABLE IF NOT EXISTS integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category text NOT NULL,
  icon_url text,
  auth_type text NOT NULL CHECK (auth_type IN ('oauth2', 'api_key', 'webhook', 'none')),
  documentation_url text,
  setup_guide text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_integrations table
CREATE TABLE IF NOT EXISTS user_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  integration_id uuid REFERENCES integrations(id) ON DELETE CASCADE NOT NULL,
  credentials jsonb DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'connected' CHECK (status IN ('connected', 'disconnected', 'error', 'pending')),
  last_sync_at timestamptz,
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, integration_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_product_analytics_product ON product_analytics(product_id);
CREATE INDEX IF NOT EXISTS idx_product_analytics_date ON product_analytics(metric_date);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_status ON product_reviews(moderation_status);
CREATE INDEX IF NOT EXISTS idx_review_votes_review ON review_votes(review_id);
CREATE INDEX IF NOT EXISTS idx_usage_limits_user ON usage_limits(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_limits_type ON usage_limits(limit_type);
CREATE INDEX IF NOT EXISTS idx_integrations_category ON integrations(category);
CREATE INDEX IF NOT EXISTS idx_user_integrations_user ON user_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_integrations_integration ON user_integrations(integration_id);

-- Enable RLS
ALTER TABLE product_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_integrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for product_reviews
CREATE POLICY "Anyone can view approved reviews"
  ON product_reviews FOR SELECT
  TO public
  USING (moderation_status = 'approved');

CREATE POLICY "Users can view own reviews"
  ON product_reviews FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reviews"
  ON product_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON product_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON product_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for review_votes
CREATE POLICY "Users can view review votes"
  ON review_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own votes"
  ON review_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own votes"
  ON review_votes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for product_bundles
CREATE POLICY "Anyone can view active bundles"
  ON product_bundles FOR SELECT
  TO public
  USING (is_active = true);

-- RLS Policies for feature_flags
CREATE POLICY "Anyone can view active feature flags"
  ON feature_flags FOR SELECT
  TO public
  USING (is_active = true);

-- RLS Policies for usage_limits
CREATE POLICY "Users can view own usage limits"
  ON usage_limits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for integrations
CREATE POLICY "Anyone can view active integrations"
  ON integrations FOR SELECT
  TO public
  USING (is_active = true);

-- RLS Policies for user_integrations
CREATE POLICY "Users can view own integrations"
  ON user_integrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own integrations"
  ON user_integrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own integrations"
  ON user_integrations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own integrations"
  ON user_integrations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_product_analytics_updated_at BEFORE UPDATE ON product_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON product_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_bundles_updated_at BEFORE UPDATE ON product_bundles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON feature_flags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usage_limits_updated_at BEFORE UPDATE ON usage_limits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_integrations_updated_at BEFORE UPDATE ON user_integrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update review helpful count
CREATE OR REPLACE FUNCTION update_review_helpful_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE product_reviews
  SET helpful_count = (
    SELECT COUNT(*)
    FROM review_votes
    WHERE review_id = COALESCE(NEW.review_id, OLD.review_id)
    AND vote_type = 'helpful'
  )
  WHERE id = COALESCE(NEW.review_id, OLD.review_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update review helpful count
CREATE TRIGGER update_review_helpful_count_trigger
AFTER INSERT OR UPDATE OR DELETE ON review_votes
FOR EACH ROW EXECUTE FUNCTION update_review_helpful_count();

-- Function to update product ratings
CREATE OR REPLACE FUNCTION update_product_ratings()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET
    rating_average = (
      SELECT COALESCE(AVG(rating), 0)
      FROM product_reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
      AND moderation_status = 'approved'
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM product_reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
      AND moderation_status = 'approved'
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to update product ratings
CREATE TRIGGER update_product_ratings_trigger
AFTER INSERT OR UPDATE OR DELETE ON product_reviews
FOR EACH ROW EXECUTE FUNCTION update_product_ratings();
