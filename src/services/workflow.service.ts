import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Workflow = Database['public']['Tables']['workflows']['Row'];
type WorkflowInsert = Database['public']['Tables']['workflows']['Insert'];
type WorkflowUpdate = Database['public']['Tables']['workflows']['Update'];

export const workflowService = {
  async getAllWorkflows() {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getWorkflowById(id: string) {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getWorkflowsByCategory(category: string) {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .eq('category', category)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data;
  },

  async searchWorkflows(query: string) {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createWorkflow(workflow: WorkflowInsert) {
    const { data, error } = await supabase
      .from('workflows')
      .insert(workflow)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateWorkflow(id: string, updates: WorkflowUpdate) {
    const { data, error } = await supabase
      .from('workflows')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteWorkflow(id: string) {
    const { error } = await supabase
      .from('workflows')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async incrementDownloads(id: string) {
    const { data, error } = await supabase.rpc('increment_workflow_downloads', {
      workflow_id: id,
    });

    if (error) {
      const { data: workflow } = await supabase
        .from('workflows')
        .select('downloads')
        .eq('id', id)
        .single();

      if (workflow) {
        await supabase
          .from('workflows')
          .update({ downloads: workflow.downloads + 1 })
          .eq('id', id);
      }
    }

    return data;
  },
};
