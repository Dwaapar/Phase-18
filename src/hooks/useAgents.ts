import { useState, useEffect } from 'react';
import { agentService } from '../services';
import type { Database } from '../lib/database.types';

type Agent = Database['public']['Tables']['agents']['Row'];

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const data = await agentService.getAllAgents();
      setAgents(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    agents,
    loading,
    error,
    refresh: loadAgents,
  };
}
