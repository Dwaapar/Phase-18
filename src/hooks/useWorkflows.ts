import { useState, useEffect } from 'react';
import { workflowService } from '../services';
import type { Database } from '../lib/database.types';

type Workflow = Database['public']['Tables']['workflows']['Row'];

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      setLoading(true);
      const data = await workflowService.getAllWorkflows();
      setWorkflows(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const searchWorkflows = async (query: string) => {
    try {
      setLoading(true);
      const data = await workflowService.searchWorkflows(query);
      setWorkflows(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const getWorkflowsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const data = await workflowService.getWorkflowsByCategory(category);
      setWorkflows(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    workflows,
    loading,
    error,
    refresh: loadWorkflows,
    search: searchWorkflows,
    getByCategory: getWorkflowsByCategory,
  };
}

export function useWorkflow(id: string) {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadWorkflow();
  }, [id]);

  const loadWorkflow = async () => {
    try {
      setLoading(true);
      const data = await workflowService.getWorkflowById(id);
      setWorkflow(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return {
    workflow,
    loading,
    error,
    refresh: loadWorkflow,
  };
}
