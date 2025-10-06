/*
  # Create User Activity Tables

  1. New Tables
    - `contact_submissions` - Contact form submissions
      - `id` (uuid, primary key)
      - `name` (text) - Submitter name
      - `email` (text) - Submitter email
      - `company` (text, nullable) - Company name
      - `subject` (text) - Message subject
      - `message` (text) - Message content
      - `type` (text) - general/sales/support/partnership
      - `status` (text) - pending/in_progress/resolved
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `pilot_applications` - Automation pilot applications
      - `id` (uuid, primary key)
      - `use_case` (text) - Use case description
      - `stack` (text) - Technology stack
      - `data_access` (text) - Data access requirements
      - `timeline` (text) - Expected timeline
      - `company` (text) - Company name
      - `email` (text) - Contact email
      - `name` (text) - Contact name
      - `status` (text) - pending/approved/rejected
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_workflows` - User's saved/deployed workflows
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References profiles
      - `workflow_id` (uuid) - References workflows
      - `status` (text) - deployed/paused/draft
      - `config` (jsonb) - User configuration
      - `last_run` (timestamptz, nullable) - Last execution time
      - `runs_count` (integer) - Total runs
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `workflow_reviews` - User reviews for workflows
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References profiles
      - `workflow_id` (uuid) - References workflows
      - `rating` (integer) - Rating 1-5
      - `comment` (text, nullable) - Review text
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can view and manage their own data
    - Admins can view all data
*/

-- Contact Submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  subject text NOT NULL,
  message text NOT NULL,
  type text NOT NULL DEFAULT 'general' CHECK (type IN ('general', 'sales', 'support', 'partnership')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Pilot Applications table
CREATE TABLE IF NOT EXISTS pilot_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  use_case text NOT NULL,
  stack text NOT NULL,
  data_access text NOT NULL,
  timeline text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pilot_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert pilot applications"
  ON pilot_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view pilot applications"
  ON pilot_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update pilot applications"
  ON pilot_applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- User Workflows table
CREATE TABLE IF NOT EXISTS user_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  workflow_id uuid NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('deployed', 'paused', 'draft')),
  config jsonb DEFAULT '{}',
  last_run timestamptz,
  runs_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, workflow_id)
);

ALTER TABLE user_workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own workflows"
  ON user_workflows FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workflows"
  ON user_workflows FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workflows"
  ON user_workflows FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own workflows"
  ON user_workflows FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all user workflows"
  ON user_workflows FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Workflow Reviews table
CREATE TABLE IF NOT EXISTS workflow_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  workflow_id uuid NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, workflow_id)
);

ALTER TABLE workflow_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workflow reviews"
  ON workflow_reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own reviews"
  ON workflow_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON workflow_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON workflow_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS pilot_applications_status_idx ON pilot_applications(status);
CREATE INDEX IF NOT EXISTS pilot_applications_created_at_idx ON pilot_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS user_workflows_user_id_idx ON user_workflows(user_id);
CREATE INDEX IF NOT EXISTS user_workflows_workflow_id_idx ON user_workflows(workflow_id);
CREATE INDEX IF NOT EXISTS workflow_reviews_workflow_id_idx ON workflow_reviews(workflow_id);