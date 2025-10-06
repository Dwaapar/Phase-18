/*
  # Content and User Activity Tables

  ## Overview
  Creates tables for content (blog posts, case studies, testimonials, guides, FAQs)
  and user activity tracking (contact submissions, pilot applications, user workflows, reviews).

  ## 1. Content Tables

  ### `case_studies`
  Customer success stories showcasing platform results
  - Fields: title, company, industry, challenge, solution, results (jsonb), image

  ### `blog_posts`
  Platform blog articles and announcements
  - Fields: title, excerpt, content, category, author, published_at, read_time, image, tags

  ### `testimonials`
  Customer testimonials and feedback
  - Fields: name, role, company, quote, avatar, rating (1-5)

  ### `guides`
  How-to guides and documentation
  - Fields: title, description, category, pages, read_time, rating, downloads, image, content

  ### `faqs`
  Frequently asked questions organized by category
  - Fields: question, answer, category, order_index

  ## 2. User Activity Tables

  ### `contact_submissions`
  Contact form submissions from website visitors
  - Fields: name, email, company, subject, message, type (general/sales/support/partnership), status

  ### `pilot_applications`
  Automation pilot program applications
  - Fields: use_case, stack, data_access, timeline, company, email, name, status

  ### `user_workflows`
  User-deployed workflows with configuration and usage tracking
  - Fields: user_id, workflow_id, status (deployed/paused/draft), config, last_run, runs_count

  ### `workflow_reviews`
  User reviews and ratings for workflows
  - Fields: user_id, workflow_id, rating (1-5), comment

  ## 3. Security
  - Enable RLS on all tables
  - Public read access for content tables
  - Admin-only write access for content
  - Users manage their own activity data
  - Contact submissions: public insert, admin read
*/

-- Case Studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  company text NOT NULL,
  industry text NOT NULL,
  challenge text NOT NULL,
  solution text NOT NULL,
  results jsonb DEFAULT '[]',
  image text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
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

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  quote text NOT NULL,
  avatar text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Guides table
CREATE TABLE IF NOT EXISTS guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
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

-- Create indexes
CREATE INDEX IF NOT EXISTS case_studies_industry_idx ON case_studies(industry);
CREATE INDEX IF NOT EXISTS case_studies_slug_idx ON case_studies(slug);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts(category);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS guides_category_idx ON guides(category);
CREATE INDEX IF NOT EXISTS guides_slug_idx ON guides(slug);
CREATE INDEX IF NOT EXISTS faqs_category_idx ON faqs(category);
CREATE INDEX IF NOT EXISTS faqs_order_idx ON faqs(order_index);
CREATE INDEX IF NOT EXISTS contact_submissions_status_idx ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS pilot_applications_status_idx ON pilot_applications(status);
CREATE INDEX IF NOT EXISTS pilot_applications_created_at_idx ON pilot_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS user_workflows_user_id_idx ON user_workflows(user_id);
CREATE INDEX IF NOT EXISTS user_workflows_workflow_id_idx ON user_workflows(workflow_id);
CREATE INDEX IF NOT EXISTS workflow_reviews_workflow_id_idx ON workflow_reviews(workflow_id);

-- Enable RLS
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilot_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for content tables (public read, admin write)
CREATE POLICY "Anyone can view case studies"
  ON case_studies FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage case studies"
  ON case_studies FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Anyone can view blog posts"
  ON blog_posts FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage testimonials"
  ON testimonials FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Anyone can view guides"
  ON guides FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage guides"
  ON guides FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Anyone can view faqs"
  ON faqs FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Admins can manage faqs"
  ON faqs FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for contact submissions
CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON contact_submissions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Admins can update contact submissions"
  ON contact_submissions FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for pilot applications
CREATE POLICY "Anyone can insert pilot applications"
  ON pilot_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can view pilot applications"
  ON pilot_applications FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

CREATE POLICY "Admins can update pilot applications"
  ON pilot_applications FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for user_workflows
CREATE POLICY "Users can view own workflows"
  ON user_workflows FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own workflows"
  ON user_workflows FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all user workflows"
  ON user_workflows FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- RLS Policies for workflow_reviews
CREATE POLICY "Anyone can view workflow reviews"
  ON workflow_reviews FOR SELECT TO authenticated, anon USING (true);

CREATE POLICY "Users can manage own reviews"
  ON workflow_reviews FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guides_updated_at BEFORE UPDATE ON guides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pilot_applications_updated_at BEFORE UPDATE ON pilot_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_workflows_updated_at BEFORE UPDATE ON user_workflows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflow_reviews_updated_at BEFORE UPDATE ON workflow_reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();