/*
  # Fix Public Access for Content Tables

  1. Changes
    - Allow public (unauthenticated) read access to workflows, agents, and assets
    - Keep existing authenticated and admin policies
    - Enable public users to browse the platform content

  2. Security
    - Only read access for public
    - Write access still requires admin role
    - User profiles remain private to the user only
*/

-- Drop existing restrictive SELECT policies
DROP POLICY IF EXISTS "Anyone can view workflows" ON workflows;
DROP POLICY IF EXISTS "Anyone can view agents" ON agents;
DROP POLICY IF EXISTS "Anyone can view assets" ON assets;

-- Create new public SELECT policies for workflows
CREATE POLICY "Public can view workflows"
  ON workflows FOR SELECT
  TO public
  USING (true);

-- Create new public SELECT policies for agents
CREATE POLICY "Public can view agents"
  ON agents FOR SELECT
  TO public
  USING (true);

-- Create new public SELECT policies for assets
CREATE POLICY "Public can view assets"
  ON assets FOR SELECT
  TO public
  USING (true);
