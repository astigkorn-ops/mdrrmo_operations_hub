import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database helper functions
export const db = {
  // Navigation functions
  async getNavigationMenu(menuName = 'main_navigation') {
    const { data: menu, error: menuError } = await supabase
      .from('navigation_menus')
      .select('id')
      .eq('name', menuName)
      .eq('is_active', true)
      .single();

    if (menuError) throw menuError;

    const { data: items, error: itemsError } = await supabase
      .from('navigation_items')
      .select('*')
      .eq('menu_id', menu.id)
      .eq('is_active', true)
      .order('order_index');

    if (itemsError) throw itemsError;

    // Build hierarchical structure
    const buildHierarchy = (items, parentId = null) => {
      return items
        .filter(item => item.parent_id === parentId)
        .map(item => ({
          ...item,
          children: buildHierarchy(items, item.id)
        }));
    };

    return buildHierarchy(items);
  },

  // Profiles functions
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Advisories functions
  async getAdvisories(filters = {}) {
    let query = supabase
      .from('advisories')
      .select(`
        *,
        profiles!advisories_created_by_fkey(first_name, last_name, full_name)
      `);

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.is_public !== undefined) {
      query = query.eq('is_public', filters.is_public);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createAdvisory(advisory) {
    const { data, error } = await supabase
      .from('advisories')
      .insert([advisory])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateAdvisory(id, updates) {
    const { data, error } = await supabase
      .from('advisories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteAdvisory(id) {
    const { error } = await supabase
      .from('advisories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Incident Reports functions
  async getIncidentReports(filters = {}) {
    let query = supabase
      .from('incident_reports')
      .select(`
        *,
        assigned_profile:profiles!incident_reports_assigned_to_fkey(first_name, last_name, full_name)
      `);

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createIncidentReport(incident) {
    const { data, error } = await supabase
      .from('incident_reports')
      .insert([incident])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateIncidentReport(id, updates) {
    const { data, error } = await supabase
      .from('incident_reports')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Evacuation Centers functions
  async getEvacuationCenters(filters = {}) {
    let query = supabase
      .from('evacuation_centers')
      .select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    query = query.order('name');

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createEvacuationCenter(center) {
    const { data, error } = await supabase
      .from('evacuation_centers')
      .insert([center])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEvacuationCenter(id, updates) {
    const { data, error } = await supabase
      .from('evacuation_centers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Resources functions
  async getResources(filters = {}) {
    let query = supabase
      .from('resources')
      .select('*');

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    query = query.order('name');

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createResource(resource) {
    const { data, error } = await supabase
      .from('resources')
      .insert([resource])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateResource(id, updates) {
    const { data, error } = await supabase
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Site Pages functions
  async getSitePages(filters = {}) {
    let query = supabase
      .from('site_pages')
      .select(`
        *,
        profiles!site_pages_created_by_fkey(first_name, last_name, full_name)
      `);

    if (filters.is_published !== undefined) {
      query = query.eq('is_published', filters.is_published);
    }

    if (filters.slug) {
      query = query.eq('slug', filters.slug);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createSitePage(page) {
    const { data, error } = await supabase
      .from('site_pages')
      .insert([page])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSitePage(id, updates) {
    const { data, error } = await supabase
      .from('site_pages')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// Auth helper functions
export const auth = {
  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) throw error;
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

export default supabase;