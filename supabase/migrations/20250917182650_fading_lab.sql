/*
  # Seed Navigation Data

  1. Insert main navigation menu
  2. Insert navigation items for MDRRMO website structure
  3. Create hierarchical menu structure with proper ordering
*/

-- Insert main navigation menu
INSERT INTO navigation_menus (name, description, is_active) 
VALUES ('main_navigation', 'Main navigation menu for MDRRMO website', true)
ON CONFLICT (name) DO NOTHING;

-- Get the menu ID for reference
DO $$
DECLARE
  menu_uuid uuid;
BEGIN
  SELECT id INTO menu_uuid FROM navigation_menus WHERE name = 'main_navigation';

  -- Insert main navigation items
  INSERT INTO navigation_items (menu_id, title, path, icon, order_index, is_active) VALUES
  (menu_uuid, 'HOME', '/public-homepage', 'Home', 1, true),
  (menu_uuid, 'ABOUT US', '/about', 'Info', 2, true),
  (menu_uuid, 'PREPAREDNESS', '/preparedness', 'Shield', 3, true),
  (menu_uuid, 'WARNINGS & ADVISORIES', '/public-advisories', 'AlertTriangle', 4, true),
  (menu_uuid, 'RESPONSE & RECOVERY', '/response', 'Truck', 5, true),
  (menu_uuid, 'RESOURCES', '/resources', 'BookOpen', 6, true),
  (menu_uuid, 'GET INVOLVED', '/get-involved', 'Users', 7, true),
  (menu_uuid, 'CONTACT US', '/contact', 'Phone', 8, true)
  ON CONFLICT DO NOTHING;

  -- Insert ABOUT US sub-menu items
  INSERT INTO navigation_items (menu_id, parent_id, title, path, icon, order_index, is_active)
  SELECT 
    menu_uuid,
    ni.id,
    sub_item.title,
    sub_item.path,
    sub_item.icon,
    sub_item.order_index,
    true
  FROM navigation_items ni,
  (VALUES
    ('Mission and Vision', '/about/mission', 'Target', 1),
    ('Mandate & Legal Basis', '/about/mandate', 'Scale', 2),
    ('Our Team / Officials', '/about/team', 'Users', 3),
    ('Organizational Structure', '/about/organization', 'Sitemap', 4)
  ) AS sub_item(title, path, icon, order_index)
  WHERE ni.menu_id = menu_uuid AND ni.title = 'ABOUT US'
  ON CONFLICT DO NOTHING;

  -- Insert PREPAREDNESS sub-menu items
  INSERT INTO navigation_items (menu_id, parent_id, title, path, icon, order_index, is_active)
  SELECT 
    menu_uuid,
    ni.id,
    sub_item.title,
    sub_item.path,
    sub_item.icon,
    sub_item.order_index,
    true
  FROM navigation_items ni,
  (VALUES
    ('Family Emergency Plan', '/preparedness/plans', 'Users', 1),
    ('What''s in your Go-Bag?', '/preparedness/kits', 'Backpack', 2),
    ('Hazard Maps', '/preparedness/maps', 'Map', 3),
    ('IEC Materials', '/preparedness/materials', 'FileText', 4),
    ('Trainings & Drills', '/preparedness/training', 'GraduationCap', 5)
  ) AS sub_item(title, path, icon, order_index)
  WHERE ni.menu_id = menu_uuid AND ni.title = 'PREPAREDNESS'
  ON CONFLICT DO NOTHING;

  -- Insert WARNINGS & ADVISORIES sub-menu items
  INSERT INTO navigation_items (menu_id, parent_id, title, path, icon, order_index, is_active)
  SELECT 
    menu_uuid,
    ni.id,
    sub_item.title,
    sub_item.path,
    sub_item.icon,
    sub_item.order_index,
    true
  FROM navigation_items ni,
  (VALUES
    ('Latest Weather Bulletin', '/public-advisories/weather', 'Cloud', 1),
    ('Emergency Alerts', '/public-advisories/alerts', 'AlertTriangle', 2),
    ('Suspension of Classes/Work', '/public-advisories/suspension', 'Calendar', 3),
    ('Road & Infrastructure Status', '/public-advisories/infrastructure', 'Construction', 4)
  ) AS sub_item(title, path, icon, order_index)
  WHERE ni.menu_id = menu_uuid AND ni.title = 'WARNINGS & ADVISORIES'
  ON CONFLICT DO NOTHING;

  -- Insert RESPONSE & RECOVERY sub-menu items
  INSERT INTO navigation_items (menu_id, parent_id, title, path, icon, order_index, is_active)
  SELECT 
    menu_uuid,
    ni.id,
    sub_item.title,
    sub_item.path,
    sub_item.icon,
    sub_item.order_index,
    true
  FROM navigation_items ni,
  (VALUES
    ('Emergency Hotlines', '/response/hotlines', 'Phone', 1),
    ('List of Evacuation Centers', '/response/centers', 'Shield', 2),
    ('How to Report an Incident', '/response/report', 'MessageSquare', 3),
    ('Donations & Relief Operations', '/response/relief', 'Heart', 4)
  ) AS sub_item(title, path, icon, order_index)
  WHERE ni.menu_id = menu_uuid AND ni.title = 'RESPONSE & RECOVERY'
  ON CONFLICT DO NOTHING;

  -- Insert RESOURCES sub-menu items
  INSERT INTO navigation_items (menu_id, parent_id, title, path, icon, order_index, is_active)
  SELECT 
    menu_uuid,
    ni.id,
    sub_item.title,
    sub_item.path,
    sub_item.icon,
    sub_item.order_index,
    true
  FROM navigation_items ni,
  (VALUES
    ('Downloads', '/resources/downloads', 'Download', 1),
    ('Photo & Video Gallery', '/resources/gallery', 'Image', 2),
    ('Frequently Asked Questions (FAQ)', '/resources/faq', 'HelpCircle', 3)
  ) AS sub_item(title, path, icon, order_index)
  WHERE ni.menu_id = menu_uuid AND ni.title = 'RESOURCES'
  ON CONFLICT DO NOTHING;

  -- Insert GET INVOLVED sub-menu items
  INSERT INTO navigation_items (menu_id, parent_id, title, path, icon, order_index, is_active)
  SELECT 
    menu_uuid,
    ni.id,
    sub_item.title,
    sub_item.path,
    sub_item.icon,
    sub_item.order_index,
    true
  FROM navigation_items ni,
  (VALUES
    ('Become a Volunteer', '/get-involved/volunteer', 'UserPlus', 1),
    ('Partnerships', '/get-involved/partnerships', 'Handshake', 2)
  ) AS sub_item(title, path, icon, order_index)
  WHERE ni.menu_id = menu_uuid AND ni.title = 'GET INVOLVED'
  ON CONFLICT DO NOTHING;

  -- Insert CONTACT US sub-menu items
  INSERT INTO navigation_items (menu_id, parent_id, title, path, icon, order_index, is_active)
  SELECT 
    menu_uuid,
    ni.id,
    sub_item.title,
    sub_item.path,
    sub_item.icon,
    sub_item.order_index,
    true
  FROM navigation_items ni,
  (VALUES
    ('Contact Information', '/contact/info', 'Phone', 1),
    ('Location Map', '/contact/map', 'MapPin', 2),
    ('Directory', '/contact/directory', 'Book', 3)
  ) AS sub_item(title, path, icon, order_index)
  WHERE ni.menu_id = menu_uuid AND ni.title = 'CONTACT US'
  ON CONFLICT DO NOTHING;

END $$;