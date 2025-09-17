import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';

export const useNavigation = (menuName = 'main_navigation') => {
  const [navigationItems, setNavigationItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setLoading(true);
        setError(null);
        const items = await db.getNavigationMenu(menuName);
        setNavigationItems(items);
      } catch (err) {
        console.error('Error fetching navigation:', err);
        setError(err.message);
        // Fallback to static navigation if database fails
        setNavigationItems(getStaticNavigation());
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, [menuName]);

  const getStaticNavigation = () => {
    return [
      {
        id: 'home',
        title: 'HOME',
        path: '/public-homepage',
        icon: 'Home',
        order_index: 1,
        children: []
      },
      {
        id: 'about',
        title: 'ABOUT US',
        path: '/about',
        icon: 'Info',
        order_index: 2,
        children: [
          { id: 'mission', title: 'Mission and Vision', path: '/about/mission', icon: 'Target' },
          { id: 'mandate', title: 'Mandate & Legal Basis', path: '/about/mandate', icon: 'Scale' },
          { id: 'team', title: 'Our Team / Officials', path: '/about/team', icon: 'Users' },
          { id: 'organization', title: 'Organizational Structure', path: '/about/organization', icon: 'Sitemap' }
        ]
      },
      {
        id: 'preparedness',
        title: 'PREPAREDNESS',
        path: '/preparedness',
        icon: 'Shield',
        order_index: 3,
        children: [
          { id: 'plans', title: 'Family Emergency Plan', path: '/preparedness/plans', icon: 'Users' },
          { id: 'kits', title: 'What\'s in your Go-Bag?', path: '/preparedness/kits', icon: 'Backpack' },
          { id: 'maps', title: 'Hazard Maps', path: '/preparedness/maps', icon: 'Map' },
          { id: 'materials', title: 'IEC Materials', path: '/preparedness/materials', icon: 'FileText' },
          { id: 'training', title: 'Trainings & Drills', path: '/preparedness/training', icon: 'GraduationCap' }
        ]
      },
      {
        id: 'advisories',
        title: 'WARNINGS & ADVISORIES',
        path: '/public-advisories',
        icon: 'AlertTriangle',
        order_index: 4,
        children: [
          { id: 'weather', title: 'Latest Weather Bulletin', path: '/public-advisories/weather', icon: 'Cloud' },
          { id: 'alerts', title: 'Emergency Alerts', path: '/public-advisories/alerts', icon: 'AlertTriangle' },
          { id: 'suspension', title: 'Suspension of Classes/Work', path: '/public-advisories/suspension', icon: 'Calendar' },
          { id: 'infrastructure', title: 'Road & Infrastructure Status', path: '/public-advisories/infrastructure', icon: 'Construction' }
        ]
      },
      {
        id: 'response',
        title: 'RESPONSE & RECOVERY',
        path: '/response',
        icon: 'Truck',
        order_index: 5,
        children: [
          { id: 'hotlines', title: 'Emergency Hotlines', path: '/response/hotlines', icon: 'Phone' },
          { id: 'centers', title: 'List of Evacuation Centers', path: '/response/centers', icon: 'Shield' },
          { id: 'report', title: 'How to Report an Incident', path: '/response/report', icon: 'MessageSquare' },
          { id: 'relief', title: 'Donations & Relief Operations', path: '/response/relief', icon: 'Heart' }
        ]
      },
      {
        id: 'resources',
        title: 'RESOURCES',
        path: '/resources',
        icon: 'BookOpen',
        order_index: 6,
        children: [
          { id: 'downloads', title: 'Downloads', path: '/resources/downloads', icon: 'Download' },
          { id: 'gallery', title: 'Photo & Video Gallery', path: '/resources/gallery', icon: 'Image' },
          { id: 'faq', title: 'Frequently Asked Questions (FAQ)', path: '/resources/faq', icon: 'HelpCircle' }
        ]
      },
      {
        id: 'get-involved',
        title: 'GET INVOLVED',
        path: '/get-involved',
        icon: 'Users',
        order_index: 7,
        children: [
          { id: 'volunteer', title: 'Become a Volunteer', path: '/get-involved/volunteer', icon: 'UserPlus' },
          { id: 'partnerships', title: 'Partnerships', path: '/get-involved/partnerships', icon: 'Handshake' }
        ]
      },
      {
        id: 'contact',
        title: 'CONTACT US',
        path: '/contact',
        icon: 'Phone',
        order_index: 8,
        children: [
          { id: 'info', title: 'Contact Information', path: '/contact/info', icon: 'Phone' },
          { id: 'map', title: 'Location Map', path: '/contact/map', icon: 'MapPin' },
          { id: 'directory', title: 'Directory', path: '/contact/directory', icon: 'Book' }
        ]
      }
    ];
  };

  return {
    navigationItems,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      fetchNavigation();
    }
  };
};