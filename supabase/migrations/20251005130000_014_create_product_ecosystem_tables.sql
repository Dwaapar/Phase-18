/*
  # Product Ecosystem Tables - Reviews, Analytics, and Feature Flags

  ## Overview
  Additional tables to support the complete product marketplace ecosystem:
  - Product reviews with verification and moderation
  - Product analytics tracking usage and performance
  - Feature flags for tier-based access control
  - Decision engine tables for quizzes and recommendations

  ## 1. Product Reviews
    - `product_reviews` - User reviews with ratings and verification
    - Support for helpful votes and moderation workflow

  ## 2. Product Analytics
    - `product_analytics` - Detailed tracking of views, installs, and usage
    - Time-series data for performance monitoring

  ## 3. Feature Flags
    - `feature_flags` - Control access to features by subscription tier
    - Support for beta testing and gradual rollout

  ## 4. Decision Engine
    - `decision_quizzes` - Interactive quizzes for product recommendations
    - `quiz_questions` - Questions with branching logic
    - `quiz_responses` - User responses and recommendations
    - `product_comparisons` - Side-by-side comparison data

  ## Security
    - RLS enabled on all tables
    - Users can create reviews for purchased products
    - Analytics data visible to product owners and admins
    - Feature flags readable by all, manageable by admins
*/

-- Product Reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  content text,
  is_verified_purchase boolean DEFAULT false,
  helpful_count int DEFAULT 0,
  status text NOT NULL DEFAULT 'published' CHECK (status IN ('pending', 'published', 'hidden', 'flagged')),
  moderation_notes text,
  moderated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  moderated_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, user_id)
);

-- Review Helpfulness Votes
CREATE TABLE IF NOT EXISTS review_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid NOT NULL REFERENCES product_reviews(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_helpful boolean NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Product Analytics (Time-series data)
CREATE TABLE IF NOT EXISTS product_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  metric_type text NOT NULL CHECK (metric_type IN ('view', 'install', 'activation', 'usage', 'error', 'uninstall')),
  metric_value numeric DEFAULT 1,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Feature Flags
CREATE TABLE IF NOT EXISTS feature_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_key text UNIQUE NOT NULL,
  feature_name text NOT NULL,
  description text,
  is_enabled boolean DEFAULT false,
  minimum_tier text DEFAULT 'free' CHECK (minimum_tier IN ('free', 'starter', 'professional', 'enterprise')),
  rollout_percentage int DEFAULT 100 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
  allowed_user_ids uuid[] DEFAULT ARRAY[]::uuid[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Decision Quizzes
CREATE TABLE IF NOT EXISTS decision_quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  category text NOT NULL,
  estimated_time_minutes int DEFAULT 5,
  completion_count int DEFAULT 0,
  average_satisfaction decimal(3,2) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES decision_quizzes(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text NOT NULL CHECK (question_type IN ('single_choice', 'multiple_choice', 'scale', 'text')),
  options jsonb DEFAULT '[]'::jsonb,
  display_order int DEFAULT 0,
  branching_logic jsonb DEFAULT '{}'::jsonb,
  is_required boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Quiz Responses
CREATE TABLE IF NOT EXISTS quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid NOT NULL REFERENCES decision_quizzes(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id text NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  recommended_products uuid[] DEFAULT ARRAY[]::uuid[],
  satisfaction_rating int CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Product Comparisons
CREATE TABLE IF NOT EXISTS product_comparisons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  product_ids uuid[] NOT NULL,
  comparison_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  category text,
  view_count int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Buying Guides
CREATE TABLE IF NOT EXISTS buying_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  content text NOT NULL,
  category text,
  recommended_products uuid[] DEFAULT ARRAY[]::uuid[],
  view_count int DEFAULT 0,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON product_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON product_reviews(status);
CREATE INDEX IF NOT EXISTS idx_review_votes_review ON review_votes(review_id);
CREATE INDEX IF NOT EXISTS idx_analytics_product ON product_analytics(product_id);
CREATE INDEX IF NOT EXISTS idx_analytics_type ON product_analytics(metric_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON product_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feature_flags_enabled ON feature_flags(is_enabled) WHERE is_enabled = true;
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_quiz ON quiz_responses(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_user ON quiz_responses(user_id);

-- Enable Row Level Security
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE decision_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE buying_guides ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Product Reviews
CREATE POLICY "Anyone can view published reviews"
  ON product_reviews FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Users can create reviews for purchased products"
  ON product_reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM user_products
      WHERE user_products.user_id = auth.uid()
      AND user_products.product_id = product_reviews.product_id
      AND user_products.status = 'active'
    )
  );

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

-- RLS Policies: Review Votes
CREATE POLICY "Users can view all votes"
  ON review_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can vote on reviews"
  ON review_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own votes"
  ON review_votes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies: Product Analytics
CREATE POLICY "System can create analytics"
  ON product_analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view analytics for own products"
  ON product_analytics FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies: Feature Flags
CREATE POLICY "Anyone can view enabled feature flags"
  ON feature_flags FOR SELECT
  TO public
  USING (is_enabled = true);

CREATE POLICY "Admins can manage feature flags"
  ON feature_flags FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Decision Quizzes
CREATE POLICY "Anyone can view active quizzes"
  ON decision_quizzes FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage quizzes"
  ON decision_quizzes FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Quiz Questions
CREATE POLICY "Anyone can view questions for active quizzes"
  ON quiz_questions FOR SELECT
  TO public
  USING (EXISTS (
    SELECT 1 FROM decision_quizzes
    WHERE decision_quizzes.id = quiz_questions.quiz_id
    AND decision_quizzes.is_active = true
  ));

CREATE POLICY "Admins can manage quiz questions"
  ON quiz_questions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Quiz Responses
CREATE POLICY "Users can view own responses"
  ON quiz_responses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create quiz responses"
  ON quiz_responses FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view all responses"
  ON quiz_responses FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Product Comparisons
CREATE POLICY "Anyone can view active comparisons"
  ON product_comparisons FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Admins can manage comparisons"
  ON product_comparisons FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  ));

-- RLS Policies: Buying Guides
CREATE POLICY "Anyone can view published guides"
  ON buying_guides FOR SELECT
  TO public
  USING (is_active = true AND published_at IS NOT NULL);

CREATE POLICY "Admins can manage guides"
  ON buying_guides FOR ALL
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
CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON product_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_feature_flags_updated_at BEFORE UPDATE ON feature_flags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_decision_quizzes_updated_at BEFORE UPDATE ON decision_quizzes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_comparisons_updated_at BEFORE UPDATE ON product_comparisons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_buying_guides_updated_at BEFORE UPDATE ON buying_guides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update review helpfulness count
CREATE OR REPLACE FUNCTION update_review_helpful_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE product_reviews
  SET helpful_count = (
    SELECT COUNT(*) FROM review_votes
    WHERE review_votes.review_id = NEW.review_id
    AND review_votes.is_helpful = true
  )
  WHERE id = NEW.review_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_review_helpful_count_trigger
  AFTER INSERT OR UPDATE OR DELETE ON review_votes
  FOR EACH ROW EXECUTE FUNCTION update_review_helpful_count();

-- Function to update product average rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET
    average_rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM product_reviews
      WHERE product_reviews.product_id = NEW.product_id
      AND product_reviews.status = 'published'
    ),
    review_count = (
      SELECT COUNT(*)
      FROM product_reviews
      WHERE product_reviews.product_id = NEW.product_id
      AND product_reviews.status = 'published'
    )
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_rating_trigger
  AFTER INSERT OR UPDATE ON product_reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();
