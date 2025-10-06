/*
  # Core Database Schema - Foundation Tables

  ## Overview
  Creates the foundational tables for user profiles, workflows, agents, and assets.

  ## 1. New Tables

  ### `profiles`
  User profile information linked to auth.users
  - `id` (uuid, primary key) - References auth.users
  - `name` (text) - User's full name
  - `email` (text, unique) - User's email address
  - `avatar_url` (text, nullable) - Profile picture URL
  - `role` (text) - User role: user, admin
  - `company` (text, nullable) - Company name
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `workflows`
  Automation workflow templates available in the marketplace
  - `id` (uuid, primary key)
  - `name` (text) - Workflow name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Short description
  - `long_description` (text) - Detailed description
  - `category` (text) - Workflow category
  - `difficulty` (text) - Beginner, Intermediate, Advanced
  - `runtime` (text) - Estimated runtime
  - `downloads` (integer) - Download count
  - `rating` (numeric) - Average rating 0-5
  - `reviews` (integer) - Number of reviews
  - `tags` (text[]) - Array of tags
  - `pricing` (text) - Free, Premium
  - `steps` (jsonb) - Workflow steps configuration
  - `env_vars` (jsonb) - Required environment variables
  - `integrations` (text[]) - Integration names
  - `patch_notes` (jsonb) - Version history
  - `tier` (text) - Free, Professional, Enterprise
  - `current_version` (text) - Current version number
  - `setup_guide` (text) - Setup instructions
  - `success_rate` (numeric) - Success rate percentage
  - `total_executions` (integer) - Total execution count
  - `featured` (boolean) - Featured workflow flag
  - `thumbnail` (text) - Thumbnail image URL
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `agents`
  AI agent templates available in the marketplace
  - `id` (uuid, primary key)
  - `name` (text) - Agent name
  - `slug` (text, unique) - URL-friendly identifier
  - `type` (text) - SDR, Support, Operations
  - `description` (text) - Agent description
  - `features` (text[]) - Feature list
  - `status` (text) - Popular, New, Featured
  - `deployment` (text) - Managed, Self-hosted, Hybrid
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `assets`
  Downloadable digital assets (templates, datasets, etc.)
  - `id` (uuid, primary key)
  - `name` (text) - Asset name
  - `slug` (text, unique) - URL-friendly identifier
  - `type` (text) - Prompt Pack, Dataset, Playbook, Creative Bundle
  - `description` (text) - Asset description
  - `category` (text) - Category
  - `downloads` (integer) - Download count
  - `rating` (numeric) - Average rating 0-5
  - `pricing` (text) - Free, Premium
  - `file_size` (text) - File size
  - `format` (text) - File format
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## 2. Security
  - Enable RLS on all tables
  - Public read access for workflows, agents, and assets
  - Users can manage their own profiles
  - Admin-only write access for content tables
*/

-- Create profiles table
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

-- Create workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text,
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
  tier text NOT NULL DEFAULT 'Free' CHECK (tier IN ('Free', 'Professional', 'Enterprise')),
  current_version text DEFAULT '1.0.0',
  setup_guide text,
  success_rate numeric(5,2) DEFAULT 0 CHECK (success_rate >= 0 AND success_rate <= 100),
  total_executions integer DEFAULT 0,
  featured boolean DEFAULT false,
  thumbnail text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('SDR', 'Support', 'Operations')),
  description text NOT NULL,
  features text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'New' CHECK (status IN ('Popular', 'New', 'Featured')),
  deployment text NOT NULL DEFAULT 'Managed' CHECK (deployment IN ('Managed', 'Self-hosted', 'Hybrid')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
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

-- Create indexes
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);
CREATE INDEX IF NOT EXISTS workflows_category_idx ON workflows(category);
CREATE INDEX IF NOT EXISTS workflows_pricing_idx ON workflows(pricing);
CREATE INDEX IF NOT EXISTS workflows_slug_idx ON workflows(slug);
CREATE INDEX IF NOT EXISTS workflows_tier_idx ON workflows(tier);
CREATE INDEX IF NOT EXISTS workflows_featured_idx ON workflows(featured);
CREATE INDEX IF NOT EXISTS agents_type_idx ON agents(type);
CREATE INDEX IF NOT EXISTS agents_slug_idx ON agents(slug);
CREATE INDEX IF NOT EXISTS assets_category_idx ON assets(category);
CREATE INDEX IF NOT EXISTS assets_slug_idx ON assets(slug);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
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

-- RLS Policies for workflows
CREATE POLICY "Anyone can view workflows"
  ON workflows FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage workflows"
  ON workflows FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for agents
CREATE POLICY "Anyone can view agents"
  ON agents FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage agents"
  ON agents FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for assets
CREATE POLICY "Anyone can view assets"
  ON assets FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage assets"
  ON assets FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();