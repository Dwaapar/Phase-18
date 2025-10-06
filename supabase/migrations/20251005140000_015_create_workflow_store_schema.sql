/*
  # Create Workflow Store Schema

  1. New Tables
    - `workflow_categories` - Workflow category definitions
      - `id` (uuid, primary key)
      - `name` (text) - Category name (Sales, Marketing, etc.)
      - `slug` (text) - URL-friendly slug
      - `description` (text) - Category description
      - `icon` (text) - Icon identifier
      - `order_index` (integer) - Display order
      - `workflow_count` (integer) - Count of workflows in category
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `workflow_packages` - Industry-specific workflow bundles
      - `id` (uuid, primary key)
      - `name` (text) - Package name
      - `slug` (text) - URL-friendly slug
      - `industry` (text) - Target industry (SaaS, E-commerce, etc.)
      - `description` (text) - Package description
      - `workflow_ids` (uuid[]) - Array of workflow IDs
      - `pricing_tier` (text) - Free/Professional/Enterprise
      - `discount_percentage` (integer) - Bundle discount
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `workflow_versions` - Workflow version history
      - `id` (uuid, primary key)
      - `workflow_id` (uuid) - References workflows
      - `version` (text) - Version number (1.0.0, 1.1.0, etc.)
      - `changelog` (text) - What changed in this version
      - `steps` (jsonb) - Workflow steps for this version
      - `is_current` (boolean) - Is this the active version
      - `created_at` (timestamptz)

    - `workflow_executions` - Workflow execution logs
      - `id` (uuid, primary key)
      - `user_workflow_id` (uuid) - References user_workflows
      - `status` (text) - running/completed/failed
      - `started_at` (timestamptz) - Execution start time
      - `completed_at` (timestamptz, nullable) - Execution end time
      - `duration_ms` (integer, nullable) - Duration in milliseconds
      - `error_message` (text, nullable) - Error if failed
      - `output` (jsonb, nullable) - Execution output data
      - `created_at` (timestamptz)

    - `workflow_screenshots` - Workflow visual assets
      - `id` (uuid, primary key)
      - `workflow_id` (uuid) - References workflows
      - `url` (text) - Screenshot URL
      - `caption` (text, nullable) - Image caption
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)

    - `workflow_videos` - Workflow demo videos
      - `id` (uuid, primary key)
      - `workflow_id` (uuid) - References workflows
      - `title` (text) - Video title
      - `url` (text) - Video URL
      - `thumbnail` (text) - Thumbnail URL
      - `duration` (text) - Video duration
      - `created_at` (timestamptz)

  2. Enhancements to existing tables
    - Add columns to `workflows` table for enhanced functionality

  3. Security
    - Enable RLS on all tables
    - Public read access for categories, screenshots, videos
    - User access for executions
    - Admin-only write access
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

ALTER TABLE workflow_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workflow categories"
  ON workflow_categories FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage workflow categories"
  ON workflow_categories FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
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

ALTER TABLE workflow_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workflow packages"
  ON workflow_packages FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage workflow packages"
  ON workflow_packages FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
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

ALTER TABLE workflow_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workflow versions"
  ON workflow_versions FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage workflow versions"
  ON workflow_versions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
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

ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own workflow executions"
  ON workflow_executions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_workflows
      WHERE user_workflows.id = workflow_executions.user_workflow_id
      AND user_workflows.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert workflow executions"
  ON workflow_executions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_workflows
      WHERE user_workflows.id = workflow_executions.user_workflow_id
      AND user_workflows.user_id = auth.uid()
    )
  );

CREATE POLICY "System can update workflow executions"
  ON workflow_executions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_workflows
      WHERE user_workflows.id = workflow_executions.user_workflow_id
      AND user_workflows.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all workflow executions"
  ON workflow_executions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
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

ALTER TABLE workflow_screenshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workflow screenshots"
  ON workflow_screenshots FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage workflow screenshots"
  ON workflow_screenshots FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
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

ALTER TABLE workflow_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workflow videos"
  ON workflow_videos FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage workflow videos"
  ON workflow_videos FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Add new columns to workflows table for enhanced functionality
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'workflows' AND column_name = 'tier'
  ) THEN
    ALTER TABLE workflows ADD COLUMN tier text NOT NULL DEFAULT 'Free' CHECK (tier IN ('Free', 'Professional', 'Enterprise'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'workflows' AND column_name = 'current_version'
  ) THEN
    ALTER TABLE workflows ADD COLUMN current_version text DEFAULT '1.0.0';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'workflows' AND column_name = 'setup_guide'
  ) THEN
    ALTER TABLE workflows ADD COLUMN setup_guide text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'workflows' AND column_name = 'success_rate'
  ) THEN
    ALTER TABLE workflows ADD COLUMN success_rate numeric(5,2) DEFAULT 0 CHECK (success_rate >= 0 AND success_rate <= 100);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'workflows' AND column_name = 'total_executions'
  ) THEN
    ALTER TABLE workflows ADD COLUMN total_executions integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'workflows' AND column_name = 'featured'
  ) THEN
    ALTER TABLE workflows ADD COLUMN featured boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'workflows' AND column_name = 'thumbnail'
  ) THEN
    ALTER TABLE workflows ADD COLUMN thumbnail text;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS workflow_categories_slug_idx ON workflow_categories(slug);
CREATE INDEX IF NOT EXISTS workflow_packages_industry_idx ON workflow_packages(industry);
CREATE INDEX IF NOT EXISTS workflow_packages_pricing_tier_idx ON workflow_packages(pricing_tier);
CREATE INDEX IF NOT EXISTS workflow_versions_workflow_id_idx ON workflow_versions(workflow_id);
CREATE INDEX IF NOT EXISTS workflow_versions_is_current_idx ON workflow_versions(is_current);
CREATE INDEX IF NOT EXISTS workflow_executions_user_workflow_id_idx ON workflow_executions(user_workflow_id);
CREATE INDEX IF NOT EXISTS workflow_executions_status_idx ON workflow_executions(status);
CREATE INDEX IF NOT EXISTS workflow_executions_started_at_idx ON workflow_executions(started_at DESC);
CREATE INDEX IF NOT EXISTS workflow_screenshots_workflow_id_idx ON workflow_screenshots(workflow_id);
CREATE INDEX IF NOT EXISTS workflow_videos_workflow_id_idx ON workflow_videos(workflow_id);
CREATE INDEX IF NOT EXISTS workflows_tier_idx ON workflows(tier);
CREATE INDEX IF NOT EXISTS workflows_featured_idx ON workflows(featured);

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
