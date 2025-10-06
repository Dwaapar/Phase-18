/*
  # Professional Tools System

  1. New Tables
    - `professional_tools`
      - `id` (uuid, primary key) - Unique tool identifier
      - `slug` (text, unique) - URL-friendly tool identifier
      - `name` (text) - Tool display name
      - `description` (text) - Tool description
      - `category` (text) - Tool category (career, business, creative)
      - `tool_type` (text) - Specific tool type
      - `features` (jsonb) - Tool features and capabilities
      - `templates_count` (integer) - Number of available templates
      - `pricing_tier` (text) - Minimum tier required
      - `free_uses_per_month` (integer) - Free usage limit
      - `is_active` (boolean) - Tool availability status
      - `metadata` (jsonb) - Additional tool configuration
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `tool_usage`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - References auth.users
      - `tool_id` (uuid, foreign key) - References professional_tools
      - `usage_type` (text) - Type of usage (generate, analyze, export)
      - `usage_data` (jsonb) - Usage details and inputs
      - `result_data` (jsonb) - Generated results
      - `session_id` (text) - Session tracking
      - `ip_address` (text) - User IP for rate limiting
      - `user_agent` (text) - Browser/device info
      - `duration_ms` (integer) - Processing duration
      - `success` (boolean) - Operation success status
      - `error_message` (text) - Error details if failed
      - `created_at` (timestamptz)

    - `tool_templates`
      - `id` (uuid, primary key)
      - `tool_id` (uuid, foreign key) - References professional_tools
      - `name` (text) - Template name
      - `description` (text) - Template description
      - `category` (text) - Template category
      - `industry` (text) - Target industry
      - `template_data` (jsonb) - Template structure and content
      - `preview_image` (text) - Preview image URL
      - `is_premium` (boolean) - Premium template flag
      - `usage_count` (integer) - Times used
      - `rating` (numeric) - Average rating
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_tool_creations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - References auth.users
      - `tool_id` (uuid, foreign key) - References professional_tools
      - `template_id` (uuid, foreign key, nullable) - References tool_templates
      - `name` (text) - Creation name
      - `content` (jsonb) - Creation content
      - `status` (text) - draft, published, archived
      - `version` (integer) - Version number
      - `share_token` (text, unique, nullable) - Public sharing token
      - `metadata` (jsonb) - Additional metadata
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `tool_usage_limits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key) - References auth.users
      - `tool_id` (uuid, foreign key) - References professional_tools
      - `period_start` (timestamptz) - Current period start
      - `period_end` (timestamptz) - Current period end
      - `usage_count` (integer) - Uses in current period
      - `limit_count` (integer) - Maximum allowed uses
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users to read tools
    - Policies for users to manage their own usage and creations
    - Policies for tracking and limiting tool usage

  3. Important Notes
    - Free tier: 3 uses per tool per month
    - Professional tier: Unlimited tool usage
    - Enterprise tier: Advanced features and team collaboration
    - Usage tracking for analytics and rate limiting
    - Template system for quick starts
*/

-- Create professional_tools table
CREATE TABLE IF NOT EXISTS professional_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'career',
  tool_type text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  templates_count integer DEFAULT 0,
  pricing_tier text DEFAULT 'free',
  free_uses_per_month integer DEFAULT 3,
  is_active boolean DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tool_usage table
CREATE TABLE IF NOT EXISTS tool_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id uuid REFERENCES professional_tools(id) ON DELETE CASCADE,
  usage_type text NOT NULL DEFAULT 'generate',
  usage_data jsonb DEFAULT '{}'::jsonb,
  result_data jsonb DEFAULT '{}'::jsonb,
  session_id text,
  ip_address text,
  user_agent text,
  duration_ms integer,
  success boolean DEFAULT true,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Create tool_templates table
CREATE TABLE IF NOT EXISTS tool_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES professional_tools(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  category text,
  industry text,
  template_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  preview_image text,
  is_premium boolean DEFAULT false,
  usage_count integer DEFAULT 0,
  rating numeric(3, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_tool_creations table
CREATE TABLE IF NOT EXISTS user_tool_creations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id uuid REFERENCES professional_tools(id) ON DELETE CASCADE,
  template_id uuid REFERENCES tool_templates(id) ON DELETE SET NULL,
  name text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text DEFAULT 'draft',
  version integer DEFAULT 1,
  share_token text UNIQUE,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tool_usage_limits table
CREATE TABLE IF NOT EXISTS tool_usage_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id uuid REFERENCES professional_tools(id) ON DELETE CASCADE,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  usage_count integer DEFAULT 0,
  limit_count integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tool_id, period_start)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tool_usage_user_id ON tool_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_id ON tool_usage(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_created_at ON tool_usage(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tool_templates_tool_id ON tool_templates(tool_id);
CREATE INDEX IF NOT EXISTS idx_user_tool_creations_user_id ON user_tool_creations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tool_creations_tool_id ON user_tool_creations(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_usage_limits_user_tool ON tool_usage_limits(user_id, tool_id);

-- Enable Row Level Security
ALTER TABLE professional_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tool_creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_usage_limits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for professional_tools
CREATE POLICY "Anyone can view active tools"
  ON professional_tools FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage tools"
  ON professional_tools FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for tool_usage
CREATE POLICY "Users can view own tool usage"
  ON tool_usage FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tool usage records"
  ON tool_usage FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for tool_templates
CREATE POLICY "Anyone can view templates"
  ON tool_templates FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage templates"
  ON tool_templates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for user_tool_creations
CREATE POLICY "Users can view own creations"
  ON user_tool_creations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view shared creations"
  ON user_tool_creations FOR SELECT
  USING (share_token IS NOT NULL);

CREATE POLICY "Users can create own creations"
  ON user_tool_creations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own creations"
  ON user_tool_creations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own creations"
  ON user_tool_creations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for tool_usage_limits
CREATE POLICY "Users can view own usage limits"
  ON tool_usage_limits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can manage usage limits"
  ON tool_usage_limits FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert default professional tools
INSERT INTO professional_tools (slug, name, description, category, tool_type, features, templates_count, pricing_tier, free_uses_per_month) VALUES
  ('resume-builder', 'Resume Builder', 'Create professional, ATS-optimized resumes with 20+ templates and AI writing assistance', 'career', 'resume',
   '["ATS-optimized templates", "AI writing assistance", "Real-time preview", "PDF/DOCX export", "Multiple formats", "Industry-specific templates"]'::jsonb,
   20, 'free', 3),

  ('cover-letter-generator', 'Cover Letter Generator', 'Generate personalized cover letters with industry-specific templates', 'career', 'cover_letter',
   '["Industry-specific templates", "AI personalization", "Job matching", "Tone analysis", "Multiple formats", "Quick customization"]'::jsonb,
   15, 'free', 3),

  ('portfolio-builder', 'Portfolio Builder', 'Build stunning portfolios with drag-drop layouts and custom domain support', 'career', 'portfolio',
   '["Drag-drop builder", "Custom domains", "Responsive design", "Project showcase", "Analytics", "SEO optimization"]'::jsonb,
   12, 'free', 3),

  ('email-optimizer', 'Email Optimizer', 'Analyze and optimize email campaigns for better deliverability and engagement', 'business', 'email',
   '["Subject line analysis", "Content tone detection", "Deliverability score", "Spam checker", "A/B testing suggestions", "Performance prediction"]'::jsonb,
   8, 'free', 3),

  ('pitch-deck-builder', 'Pitch Deck Builder', 'Create investor-ready pitch decks with storytelling frameworks', 'business', 'pitch',
   '["Investor-ready templates", "Storytelling framework", "Financial slides", "Market analysis", "Design themes", "Export options"]'::jsonb,
   10, 'free', 3),

  ('interview-prep', 'Interview Prep Tool', 'Practice with 500+ common interview questions and answer frameworks', 'career', 'interview',
   '["500+ questions database", "Answer frameworks", "Industry-specific prep", "Mock interviews", "Feedback system", "STAR method guide"]'::jsonb,
   0, 'free', 3),

  ('salary-calculator', 'Salary Negotiation Calculator', 'Calculate fair compensation with market data and negotiation scripts', 'career', 'salary',
   '["Market data analysis", "Negotiation scripts", "Total compensation calculator", "Industry benchmarks", "Location adjustment", "Equity calculator"]'::jsonb,
   0, 'free', 3),

  ('brand-audit', 'Personal Brand Audit', 'Analyze your online presence across LinkedIn, portfolio, and social media', 'career', 'brand',
   '["LinkedIn analysis", "Portfolio review", "Social media audit", "SEO scoring", "Improvement suggestions", "Competitor analysis"]'::jsonb,
   0, 'free', 3)
ON CONFLICT (slug) DO NOTHING;
