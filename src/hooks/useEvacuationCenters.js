import { useState, useEffect } from 'react';
import { useSupabase } from '../components/ui/SupabaseProvider';

export const useEvacuationCenters = (filters = {}) => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getEvacuationCenters, createEvacuationCenter, updateEvacuationCenter } = useSupabase();

  const fetchCenters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvacuationCenters(filters);
      setCenters(data);
    } catch (err) {
      console.error('Error fetching evacuation centers:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, [JSON.stringify(filters)]);

  const create = async (centerData) => {
    try {
      const newCenter = await createEvacuationCenter(centerData);
      setCenters(prev => [newCenter, ...prev]);
      return { success: true, data: newCenter };
    } catch (err) {
      console.error('Error creating evacuation center:', err);
      return { success: false, error: err.message };
    }
  };

  const update = async (id, updates) => {
    try {
      const updatedCenter = await updateEvacuationCenter(id, updates);
      setCenters(prev => prev.map(item => 
        item.id === id ? updatedCenter : item
      ));
      return { success: true, data: updatedCenter };
    } catch (err) {
      console.error('Error updating evacuation center:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    centers,
    loading,
    error,
    create,
    update,
    refetch: fetchCenters
  };
};