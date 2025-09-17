export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: 'super_admin' | 'admin' | 'editor' | 'viewer';
          first_name: string;
          last_name: string;
          avatar_url: string | null;
          department: string | null;
          created_at: string | null;
          full_name: string | null;
        };
        Insert: {
          id?: string;
          role: 'super_admin' | 'admin' | 'editor' | 'viewer';
          first_name: string;
          last_name: string;
          avatar_url?: string | null;
          department?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          role?: 'super_admin' | 'admin' | 'editor' | 'viewer';
          first_name?: string;
          last_name?: string;
          avatar_url?: string | null;
          department?: string | null;
          created_at?: string | null;
        };
      };
      advisories: {
        Row: {
          id: string;
          title: string;
          slug: string;
          severity_level: string;
          type: string | null;
          status: 'Draft' | 'Published' | 'Archived';
          content: any;
          excerpt: string | null;
          affected_areas: string[] | null;
          effective_date: string;
          expiration_date: string | null;
          is_public: boolean;
          featured_image: string | null;
          created_by: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          severity_level: string;
          type?: string | null;
          status?: 'Draft' | 'Published' | 'Archived';
          content: any;
          excerpt?: string | null;
          affected_areas?: string[] | null;
          effective_date: string;
          expiration_date?: string | null;
          is_public?: boolean;
          featured_image?: string | null;
          created_by: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          severity_level?: string;
          type?: string | null;
          status?: 'Draft' | 'Published' | 'Archived';
          content?: any;
          excerpt?: string | null;
          affected_areas?: string[] | null;
          effective_date?: string;
          expiration_date?: string | null;
          is_public?: boolean;
          featured_image?: string | null;
          created_by?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      incident_reports: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: string | null;
          status: 'Reported' | 'Under Review' | 'Verified' | 'Assisting' | 'Resolved';
          location: string | null;
          reporter_name: string | null;
          reporter_contact: string | null;
          latitude: number | null;
          longitude: number | null;
          images: string[] | null;
          assigned_to: string | null;
          resolution_notes: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type?: string | null;
          status?: 'Reported' | 'Under Review' | 'Verified' | 'Assisting' | 'Resolved';
          location?: string | null;
          reporter_name?: string | null;
          reporter_contact?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          images?: string[] | null;
          assigned_to?: string | null;
          resolution_notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: string | null;
          status?: 'Reported' | 'Under Review' | 'Verified' | 'Assisting' | 'Resolved';
          location?: string | null;
          reporter_name?: string | null;
          reporter_contact?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          images?: string[] | null;
          assigned_to?: string | null;
          resolution_notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      evacuation_centers: {
        Row: {
          id: string;
          name: string;
          location: string;
          latitude: number | null;
          longitude: number | null;
          capacity: number;
          current_occupancy: number | null;
          contact_person: string | null;
          contact_number: string | null;
          status: string | null;
          amenities: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          location: string;
          latitude?: number | null;
          longitude?: number | null;
          capacity: number;
          current_occupancy?: number | null;
          contact_person?: string | null;
          contact_number?: string | null;
          status?: string | null;
          amenities?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          location?: string;
          latitude?: number | null;
          longitude?: number | null;
          capacity?: number;
          current_occupancy?: number | null;
          contact_person?: string | null;
          contact_number?: string | null;
          status?: string | null;
          amenities?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      resources: {
        Row: {
          id: string;
          name: string;
          type: string | null;
          status: string | null;
          quantity: number;
          unit: string | null;
          location: string | null;
          description: string | null;
          last_maintenance: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          type?: string | null;
          status?: string | null;
          quantity: number;
          unit?: string | null;
          location?: string | null;
          description?: string | null;
          last_maintenance?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          type?: string | null;
          status?: string | null;
          quantity?: number;
          unit?: string | null;
          location?: string | null;
          description?: string | null;
          last_maintenance?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      site_pages: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: any;
          meta_description: string | null;
          is_published: boolean | null;
          created_by: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: any;
          meta_description?: string | null;
          is_published?: boolean | null;
          created_by: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: any;
          meta_description?: string | null;
          is_published?: boolean | null;
          created_by?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      navigation_menus: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      navigation_items: {
        Row: {
          id: string;
          menu_id: string;
          parent_id: string | null;
          title: string;
          path: string | null;
          icon: string | null;
          order_index: number;
          is_active: boolean;
          target: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          menu_id: string;
          parent_id?: string | null;
          title: string;
          path?: string | null;
          icon?: string | null;
          order_index?: number;
          is_active?: boolean;
          target?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          menu_id?: string;
          parent_id?: string | null;
          title?: string;
          path?: string | null;
          icon?: string | null;
          order_index?: number;
          is_active?: boolean;
          target?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      user_role: 'super_admin' | 'admin' | 'editor' | 'viewer';
      advisory_status: 'Draft' | 'Published' | 'Archived';
      incident_status: 'Reported' | 'Under Review' | 'Verified' | 'Assisting' | 'Resolved';
    };
  };
}