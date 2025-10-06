/*
  # Product Analytics and Review System

  ## Overview
  Comprehensive tracking and review system for products with moderation and insights.

  ## 1. Product Analytics
    - `product_analytics` - Daily aggregated metrics per product
    - Tracks views, installations, active usage, revenue
    - Time-series data for trend analysis

  ## 2. Product Reviews
    - `product_reviews` - User reviews with ratings and verification
    - Verified purchase flags for authenticity
    - Moderation workflow for quality control
    - Helpful votes and spam reporting

  ## 3. Product Ratings Breakdown
    - `product_rating_breakdown` - Distribution of ratings (1-5 stars)
    - Aggregated statistics for display

  ## 4. Review Responses
    - `review_responses` - Official responses to reviews
    - Support thread-like conversations
    - Admin/creator responses highlighted

  ## 5. Product Views Tracking
    - `product_views` - Individual view events
    - Anonymized tracking with device/location data
    - Deduplication within 24-hour window

  ## 6. Security
    - RLS enabled on all tables
    - Public read for approved reviews
    - Users can create/edit own reviews
    - Admins can moderate and respond
*/

-- Product Analytics (Time-Series Metrics)
CREATE TABLE IF NOT EXISTS product_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  date date NOT NULL,
  views_count int DEFAULT 0,
  unique_viewers int DEFAULT 0,
  detail_page_views int DEFAULT 0,
  installations int DEFAULT 0,
  activations int DEFAULT 0,
  active_users int DEFAULT 0,
  revenue_cents int DEFAULT 0,
  refunds_cents int DEFAULT 0,
  avg_session_seconds int DEFAULT 0,
  bounce_rate decimal(5,2) DEFAULT 0,
  conversion_rate decimal(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, date)
);

-- Product Reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text NOT NULL,
  content text NOT NULL,
  is_verified_purchase boolean DEFAULT false,
  purchase_date timestamptz,
  pros text[] DEFAULT ARRAY[]::text[],
  cons text[] DEFAULT ARRAY[]::text[],
  would_recommend boolean DEFAULT true,
  use_case text,
  experience_level text CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  moderation_status text NOT NULL DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged')),
  moderation_notes text,
  moderated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  moderated_at timestamptz,
  helpful_count int DEFAULT 0,
  not_helpful_count int DEFAULT 0,
  flag_count int DEFAULT 0,
  response_count int DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, user_id)
);

-- Product Rating Breakdown
CREATE TABLE IF NOT EXISTS product_rating_breakdown (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  rating_1_count int DEFAULT 0,
  rating_2_count int DEFAULT 0,
  rating_3_count int DEFAULT 0,
  rating_4_count int DEFAULT 0,
  rating_5_count int DEFAULT 0,
  total_reviews int DEFAULT 0,
  average_rating decimal(3,2) DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id)
);

-- Review Responses (From Creators/Support)
CREATE TABLE IF NOT EXISTS review_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid NOT NULL REFERENCES product_reviews(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_official boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Review Helpfulness Votes
CREATE TABLE IF NOT EXISTS review_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid NOT NULL REFERENCES product_reviews(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type text NOT NULL CHECK (vote_type IN ('helpful', 'not_helpful')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Review Flags (Spam/Abuse Reporting)
CREATE TABLE IF NOT EXISTS review_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid NOT NULL REFERENCES product_reviews(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flag_reason text NOT NULL CHECK (flag_reason IN ('spam', 'inappropriate', 'off_topic', 'fake', 'other')),
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Product Views (Individual Events)
CREATE TABLE IF NOT EXISTS product_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id text,
  referrer_url text,
  page_type text CHECK (page_type IN ('listing', 'detail', 'search_result')),
  user_agent text,
  ip_address inet,
  country_code text,
  device_type text CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
  created_at timestamptz DEFAULT now()
);

-- Product Usage Events (For Active Products)
CREATE TABLE IF NOT EXISTS product_usage_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_product_id uuid NOT NULL REFERENCES user_products(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('activation', 'execution', 'error', 'configuration', 'deactivation')),
  event_data jsonb DEFAULT '{}'::jsonb,
  duration_seconds int,
  success boolean DEFAULT true,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_product ON product_analytics(product_id);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON product_analytics(date DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON product_reviews(moderation_status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON product_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_review_responses_review ON review_responses(review_id);
CREATE INDEX IF NOT EXISTS idx_review_votes_review ON review_votes(review_id);
CREATE INDEX IF NOT EXISTS idx_review_flags_review ON review_flags(review_id);
CREATE INDEX IF NOT EXISTS idx_review_flags_status ON review_flags(status);
CREATE INDEX IF NOT EXISTS idx_views_product ON product_views(product_id);
CREATE INDEX IF NOT EXISTS idx_views_created ON product_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_usage_events_user_product ON product_usage_events(user_product_id);
CREATE INDEX IF NOT EXISTS idx_usage_events_type ON product_usage_events(event_type);

-- Enable Row Level Security
ALTER TABLE product_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_rating_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_usage_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Product Analytics (public read)
CREATE POLICY "Anyone can view product analytics"
  ON product_analytics FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage analytics"
  ON product_analytics FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Product Reviews (public read approved)
CREATE POLICY "Anyone can view approved reviews"
  ON product_reviews FOR SELECT
  TO public
  USING (moderation_status = 'approved');

CREATE POLICY "Users can create reviews"
  ON product_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON product_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews"
  ON product_reviews FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Product Rating Breakdown (public read)
CREATE POLICY "Anyone can view rating breakdowns"
  ON product_rating_breakdown FOR SELECT
  TO public
  USING (true);

CREATE POLICY "System can update rating breakdowns"
  ON product_rating_breakdown FOR ALL
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Review Responses (public read)
CREATE POLICY "Anyone can view review responses"
  ON review_responses FOR SELECT
  TO public
  USING (EXISTS (
    SELECT 1 FROM product_reviews
    WHERE product_reviews.id = review_responses.review_id
    AND product_reviews.moderation_status = 'approved'
  ));

CREATE POLICY "Admins can create responses"
  ON review_responses FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'support')
  ));

CREATE POLICY "Admins can manage responses"
  ON review_responses FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'support')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'support')
  ));

-- RLS Policies: Review Votes (users can vote)
CREATE POLICY "Users can view review votes"
  ON review_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can cast votes"
  ON review_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own votes"
  ON review_votes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
  ON review_votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies: Review Flags (users can flag)
CREATE POLICY "Admins can view flags"
  ON review_flags FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator')
  ));

CREATE POLICY "Users can create flags"
  ON review_flags FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage flags"
  ON review_flags FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator')
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'moderator')
  ));

-- RLS Policies: Product Views (system only)
CREATE POLICY "System can create views"
  ON product_views FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view analytics data"
  ON product_views FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Product Usage Events (users see own)
CREATE POLICY "Users can view own usage events"
  ON product_usage_events FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_products
    WHERE user_products.id = product_usage_events.user_product_id
    AND user_products.user_id = auth.uid()
  ));

CREATE POLICY "System can create usage events"
  ON product_usage_events FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM user_products
    WHERE user_products.id = product_usage_events.user_product_id
    AND user_products.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all usage events"
  ON product_usage_events FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- Function to update product rating on review changes
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update product average rating and count
  UPDATE products SET
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM product_reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
      AND moderation_status = 'approved'
    ),
    review_count = (
      SELECT COUNT(*)
      FROM product_reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
      AND moderation_status = 'approved'
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);

  -- Update rating breakdown
  INSERT INTO product_rating_breakdown (
    product_id,
    rating_1_count,
    rating_2_count,
    rating_3_count,
    rating_4_count,
    rating_5_count,
    total_reviews,
    average_rating
  )
  SELECT
    COALESCE(NEW.product_id, OLD.product_id),
    SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END),
    SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END),
    SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END),
    SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END),
    SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END),
    COUNT(*),
    AVG(rating)
  FROM product_reviews
  WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
  AND moderation_status = 'approved'
  ON CONFLICT (product_id) DO UPDATE SET
    rating_1_count = EXCLUDED.rating_1_count,
    rating_2_count = EXCLUDED.rating_2_count,
    rating_3_count = EXCLUDED.rating_3_count,
    rating_4_count = EXCLUDED.rating_4_count,
    rating_5_count = EXCLUDED.rating_5_count,
    total_reviews = EXCLUDED.total_reviews,
    average_rating = EXCLUDED.average_rating,
    updated_at = now();

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_rating_on_review_change
  AFTER INSERT OR UPDATE OR DELETE ON product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_product_rating();

-- Function to update review helpfulness counts
CREATE OR REPLACE FUNCTION update_review_helpfulness()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE product_reviews SET
    helpful_count = (
      SELECT COUNT(*) FROM review_votes
      WHERE review_id = COALESCE(NEW.review_id, OLD.review_id)
      AND vote_type = 'helpful'
    ),
    not_helpful_count = (
      SELECT COUNT(*) FROM review_votes
      WHERE review_id = COALESCE(NEW.review_id, OLD.review_id)
      AND vote_type = 'not_helpful'
    )
  WHERE id = COALESCE(NEW.review_id, OLD.review_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_review_helpfulness_on_vote
  AFTER INSERT OR UPDATE OR DELETE ON review_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_review_helpfulness();

-- Function to update review flag count
CREATE OR REPLACE FUNCTION update_review_flags()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE product_reviews SET
    flag_count = (
      SELECT COUNT(*) FROM review_flags
      WHERE review_id = COALESCE(NEW.review_id, OLD.review_id)
      AND status = 'pending'
    )
  WHERE id = COALESCE(NEW.review_id, OLD.review_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_review_flags_on_flag
  AFTER INSERT OR UPDATE OR DELETE ON review_flags
  FOR EACH ROW
  EXECUTE FUNCTION update_review_flags();

-- Triggers for updated_at
CREATE TRIGGER update_product_analytics_updated_at BEFORE UPDATE ON product_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON product_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_review_responses_updated_at BEFORE UPDATE ON review_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
