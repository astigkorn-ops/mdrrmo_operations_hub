import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, db } from '../../lib/supabase';

const SupabaseContext = createContext({});

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

export const SupabaseProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Test connection by fetching a simple query
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1);

        if (error) {
          throw error;
        }

        setIsConnected(true);
        setConnectionError(null);
      } catch (error) {
        console.error('Supabase connection error:', error);
        setConnectionError(error.message);
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  const value = {
    supabase,
    db,
    isConnected,
    connectionError,
    // Expose commonly used database functions
    getAdvisories: db.getAdvisories,
    createAdvisory: db.createAdvisory,
    updateAdvisory: db.updateAdvisory,
    deleteAdvisory: db.deleteAdvisory,
    getIncidentReports: db.getIncidentReports,
    createIncidentReport: db.createIncidentReport,
    updateIncidentReport: db.updateIncidentReport,
    getEvacuationCenters: db.getEvacuationCenters,
    createEvacuationCenter: db.createEvacuationCenter,
    updateEvacuationCenter: db.updateEvacuationCenter,
    getResources: db.getResources,
    createResource: db.createResource,
    updateResource: db.updateResource,
    getSitePages: db.getSitePages,
    createSitePage: db.createSitePage,
    updateSitePage: db.updateSitePage
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};