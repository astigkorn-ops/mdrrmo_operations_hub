import { useState, useEffect } from 'react';
import { useSupabase } from '../components/ui/SupabaseProvider';

export const useAdvisories = (filters = {}) => {
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAdvisories, createAdvisory, updateAdvisory, deleteAdvisory } = useSupabase();

  const fetchAdvisories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdvisories(filters);
      setAdvisories(data);
    } catch (err) {
      console.error('Error fetching advisories:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvisories();
  }, [JSON.stringify(filters)]);

  const create = async (advisoryData) => {
    try {
      const newAdvisory = await createAdvisory(advisoryData);
      setAdvisories(prev => [newAdvisory, ...prev]);
      return { success: true, data: newAdvisory };
    } catch (err) {
      console.error('Error creating advisory:', err);
      return { success: false, error: err.message };
    }
  };

  const update = async (id, updates) => {
    try {
      const updatedAdvisory = await updateAdvisory(id, updates);
      setAdvisories(prev => prev.map(item => 
        item.id === id ? updatedAdvisory : item
      ));
      return { success: true, data: updatedAdvisory };
    } catch (err) {
      console.error('Error updating advisory:', err);
      return { success: false, error: err.message };
    }
  };

  const remove = async (id) => {
    try {
      await deleteAdvisory(id);
      setAdvisories(prev => prev.filter(item => item.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting advisory:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    advisories,
    loading,
    error,
    create,
    update,
    remove,
    refetch: fetchAdvisories
  };
};