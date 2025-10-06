/*
  # Create Core Database Schema

  1. New Tables
    - `profiles` - User profile information
      - `id` (uuid, primary key) - References auth.users
      - `name` (text) - User's full name
      - `email` (text) - User's email address
      - `avatar_url` (text, nullable) - Profile picture URL
      - `role` (text) - User role (user/admin)
      - `company` (text, nullable) - Company name
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `workflows` - Automation workflows
      - `id` (uuid, primary key)
      - `name` (text) - Workflow name
      - `description` (text) - Workflow description
      - `category` (text) - Workflow category
      - `difficulty` (text) - Beginner/Intermediate/Advanced
      - `runtime` (text) - Estimated runtime
      - `downloads` (integer) - Download count
      - `rating` (numeric) - Average rating
      - `reviews` (integer) - Number of reviews
      - `tags` (text[]) - Array of tags
      - `pricing` (text) - Free/Premium
      - `steps` (jsonb) - Workflow steps
      - `env_vars` (jsonb) - Required environment variables
      - `integrations` (text[]) - Integration names
      - `patch_notes` (jsonb) - Version history
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `agents` - AI agents
      - `id` (uuid, primary key)
      - `name` (text) - Agent name
      - `type` (text) - SDR/Support/Operations
      - `description` (text) - Agent description
      - `features` (text[]) - Feature list
      - `status` (text) - Popular/New/Featured
      - `deployment` (text) - Managed/Self-hosted/Hybrid
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `assets` - Downloadable assets
      - `id` (uuid, primary key)
      - `name` (text) - Asset name
      - `type` (text) - Asset type
      - `description` (text) - Asset description
      - `category` (text) - Category
      - `downloads` (integer) - Download count
      - `rating` (numeric) - Average rating
      - `pricing` (text) - Free/Premium
      - `file_size` (text, nullable) - File size
      - `format` (text, nullable) - File format
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  email text NOT NULL UNIQUE,
  avatar_url text,
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  runtime text NOT NULL DEFAULT '~5 minutes',
  downloads integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  pricing text NOT NULL DEFAULT 'Free' CHECK (pricing IN ('Free', 'Premium')),
  steps jsonb DEFAULT '[]',
  env_vars jsonb DEFAULT '[]',
  integrations text[] DEFAULT '{}',
  patch_notes jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view workflows"
  ON workflows FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert workflows"
  ON workflows FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update workflows"
  ON workflows FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete workflows"
  ON workflows FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('SDR', 'Support', 'Operations')),
  description text NOT NULL,
  features text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'New' CHECK (status IN ('Popular', 'New', 'Featured')),
  deployment text NOT NULL DEFAULT 'Managed' CHECK (deployment IN ('Managed', 'Self-hosted', 'Hybrid')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view agents"
  ON agents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert agents"
  ON agents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update agents"
  ON agents FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete agents"
  ON agents FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('Prompt Pack', 'Dataset', 'Playbook', 'Creative Bundle')),
  description text NOT NULL,
  category text NOT NULL,
  downloads integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  pricing text NOT NULL DEFAULT 'Free' CHECK (pricing IN ('Free', 'Premium')),
  file_size text,
  format text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view assets"
  ON assets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert assets"
  ON assets FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update assets"
  ON assets FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete assets"
  ON assets FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);
CREATE INDEX IF NOT EXISTS workflows_category_idx ON workflows(category);
CREATE INDEX IF NOT EXISTS workflows_pricing_idx ON workflows(pricing);
CREATE INDEX IF NOT EXISTS agents_type_idx ON agents(type);
CREATE INDEX IF NOT EXISTS assets_category_idx ON assets(category);