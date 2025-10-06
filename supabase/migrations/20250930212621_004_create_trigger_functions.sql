/*
  # Create Trigger Functions

  1. Functions
    - `handle_updated_at` - Automatically update updated_at timestamp
    - `handle_new_user` - Create profile for new auth user
    - `update_workflow_stats` - Update workflow rating/review counts

  2. Triggers
    - Add updated_at triggers to all tables
    - Add new user profile creation trigger
    - Add workflow stats update trigger
*/

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update workflow stats
CREATE OR REPLACE FUNCTION update_workflow_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE workflows
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM workflow_reviews
      WHERE workflow_id = COALESCE(NEW.workflow_id, OLD.workflow_id)
    ),
    reviews = (
      SELECT COUNT(*)
      FROM workflow_reviews
      WHERE workflow_id = COALESCE(NEW.workflow_id, OLD.workflow_id)
    )
  WHERE id = COALESCE(NEW.workflow_id, OLD.workflow_id);
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create updated_at triggers for all tables
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN 
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    AND table_name NOT IN ('spatial_ref_sys', 'geography_columns', 'geometry_columns', 'raster_columns', 'raster_overviews')
  LOOP
    IF EXISTS (
      SELECT 1 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = t 
      AND column_name = 'updated_at'
    ) THEN
      EXECUTE format('
        DROP TRIGGER IF EXISTS set_updated_at ON %I;
        CREATE TRIGGER set_updated_at
        BEFORE UPDATE ON %I
        FOR EACH ROW
        EXECUTE FUNCTION handle_updated_at();
      ', t, t);
    END IF;
  END LOOP;
END;
$$;

-- Trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Trigger for workflow stats update
DROP TRIGGER IF EXISTS on_workflow_review_change ON workflow_reviews;
CREATE TRIGGER on_workflow_review_change
  AFTER INSERT OR UPDATE OR DELETE ON workflow_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_workflow_stats();