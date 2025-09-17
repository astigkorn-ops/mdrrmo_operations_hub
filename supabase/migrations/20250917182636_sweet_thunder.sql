/*
  # Create Navigation Menu System

  1. New Tables
    - `navigation_menus`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `navigation_items`
      - `id` (uuid, primary key)
      - `menu_id` (uuid, foreign key)
      - `parent_id` (uuid, foreign key, nullable)
      - `title` (text)
      - `path` (text)
      - `icon` (text)
      - `order_index` (integer)
      - `is_active` (boolean)
      - `target` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for staff management
*/

-- Create navigation_menus table
CREATE TABLE IF NOT EXISTS navigation_menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create navigation_items table
CREATE TABLE IF NOT EXISTS navigation_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id uuid NOT NULL REFERENCES navigation_menus(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES navigation_items(id) ON DELETE CASCADE,
  title text NOT NULL,
  path text,
  icon text,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  target text DEFAULT '_self',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE navigation_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

-- Create policies for navigation_menus
CREATE POLICY "Navigation menus are viewable by everyone"
  ON navigation_menus
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Staff can manage navigation menus"
  ON navigation_menus
  FOR ALL
  TO public
  USING (
    uid() IN (
      SELECT id FROM profiles 
      WHERE role IN ('super_admin', 'admin', 'editor')
    )
  );

-- Create policies for navigation_items
CREATE POLICY "Navigation items are viewable by everyone"
  ON navigation_items
  FOR SELECT
  TO public
  USING (
    is_active = true AND 
    menu_id IN (
      SELECT id FROM navigation_menus WHERE is_active = true
    )
  );

CREATE POLICY "Staff can manage navigation items"
  ON navigation_items
  FOR ALL
  TO public
  USING (
    uid() IN (
      SELECT id FROM profiles 
      WHERE role IN ('super_admin', 'admin', 'editor')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_navigation_items_menu_id ON navigation_items(menu_id);
CREATE INDEX IF NOT EXISTS idx_navigation_items_parent_id ON navigation_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_navigation_items_order ON navigation_items(order_index);
CREATE INDEX IF NOT EXISTS idx_navigation_items_active ON navigation_items(is_active) WHERE is_active = true;

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_navigation_menus_updated_at'
  ) THEN
    CREATE TRIGGER update_navigation_menus_updated_at
      BEFORE UPDATE ON navigation_menus
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.triggers 
    WHERE trigger_name = 'update_navigation_items_updated_at'
  ) THEN
    CREATE TRIGGER update_navigation_items_updated_at
      BEFORE UPDATE ON navigation_items
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;