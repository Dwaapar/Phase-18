/*
  # Create Content Tables

  1. New Tables
    - `case_studies` - Customer success stories
      - `id` (uuid, primary key)
      - `title` (text) - Case study title
      - `company` (text) - Company name
      - `industry` (text) - Industry vertical
      - `challenge` (text) - Problem description
      - `solution` (text) - Solution description
      - `results` (jsonb) - Array of metrics/results
      - `image` (text) - Image URL
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `blog_posts` - Blog articles
      - `id` (uuid, primary key)
      - `title` (text) - Post title
      - `excerpt` (text) - Short excerpt
      - `content` (text) - Full content
      - `category` (text) - Category
      - `author` (text) - Author name
      - `published_at` (timestamptz) - Publication date
      - `read_time` (text) - Estimated read time
      - `image` (text) - Featured image URL
      - `tags` (text[]) - Post tags
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `testimonials` - Customer testimonials
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `role` (text) - Job title
      - `company` (text) - Company name
      - `quote` (text) - Testimonial text
      - `avatar` (text) - Avatar URL
      - `rating` (integer) - Rating 1-5
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `guides` - How-to guides
      - `id` (uuid, primary key)
      - `title` (text) - Guide title
      - `description` (text) - Guide description
      - `category` (text) - Category
      - `pages` (integer) - Number of pages
      - `read_time` (text) - Estimated read time
      - `rating` (numeric) - Average rating
      - `downloads` (integer) - Download count
      - `image` (text) - Cover image URL
      - `content` (text) - Full guide content
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `faqs` - Frequently asked questions
      - `id` (uuid, primary key)
      - `question` (text) - Question text
      - `answer` (text) - Answer text
      - `category` (text) - FAQ category
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access
    - Admin-only write access
*/

-- Case Studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  industry text NOT NULL,
  challenge text NOT NULL,
  solution text NOT NULL,
  results jsonb DEFAULT '[]',
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view case studies"
  ON case_studies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert case studies"
  ON case_studies FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update case studies"
  ON case_studies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete case studies"
  ON case_studies FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  author text NOT NULL,
  published_at timestamptz DEFAULT now(),
  read_time text NOT NULL DEFAULT '5 min read',
  image text NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  quote text NOT NULL,
  avatar text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Guides table
CREATE TABLE IF NOT EXISTS guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  pages integer DEFAULT 1,
  read_time text NOT NULL DEFAULT '10 min read',
  rating numeric(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  downloads integer DEFAULT 0,
  image text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view guides"
  ON guides FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert guides"
  ON guides FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update guides"
  ON guides FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete guides"
  ON guides FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view faqs"
  ON faqs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert faqs"
  ON faqs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update faqs"
  ON faqs FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete faqs"
  ON faqs FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS case_studies_industry_idx ON case_studies(industry);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts(category);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS guides_category_idx ON guides(category);
CREATE INDEX IF NOT EXISTS faqs_category_idx ON faqs(category);
CREATE INDEX IF NOT EXISTS faqs_order_idx ON faqs(order_index);