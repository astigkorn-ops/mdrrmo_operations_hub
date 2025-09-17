import { useState, useEffect } from 'react';
import { useSupabase } from '../components/ui/SupabaseProvider';

export const useIncidents = (filters = {}) => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getIncidentReports, createIncidentReport, updateIncidentReport } = useSupabase();

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getIncidentReports(filters);
      setIncidents(data);
    } catch (err) {
      console.error('Error fetching incidents:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [JSON.stringify(filters)]);

  const create = async (incidentData) => {
    try {
      const newIncident = await createIncidentReport(incidentData);
      setIncidents(prev => [newIncident, ...prev]);
      return { success: true, data: newIncident };
    } catch (err) {
      console.error('Error creating incident:', err);
      return { success: false, error: err.message };
    }
  };

  const update = async (id, updates) => {
    try {
      const updatedIncident = await updateIncidentReport(id, updates);
      setIncidents(prev => prev.map(item => 
        item.id === id ? updatedIncident : item
      ));
      return { success: true, data: updatedIncident };
    } catch (err) {
      console.error('Error updating incident:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    incidents,
    loading,
    error,
    create,
    update,
    refetch: fetchIncidents
  };
};