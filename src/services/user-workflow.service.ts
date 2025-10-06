import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type UserWorkflow = Database['public']['Tables']['user_workflows']['Row'];
type UserWorkflowInsert = Database['public']['Tables']['user_workflows']['Insert'];
type UserWorkflowUpdate = Database['public']['Tables']['user_workflows']['Update'];
type WorkflowReview = Database['public']['Tables']['workflow_reviews']['Insert'];

export const userWorkflowService = {
  async getUserWorkflows(userId: string) {
    const { data, error } = await supabase
      .from('user_workflows')
      .select(`
        *,
        workflow:workflows(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getUserWorkflow(userId: string, workflowId: string) {
    const { data, error } = await supabase
      .from('user_workflows')
      .select(`
        *,
        workflow:workflows(*)
      `)
      .eq('user_id', userId)
      .eq('workflow_id', workflowId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createUserWorkflow(userWorkflow: UserWorkflowInsert) {
    const { data, error } = await supabase
      .from('user_workflows')
      .insert(userWorkflow)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateUserWorkflow(id: string, updates: UserWorkflowUpdate) {
    const { data, error } = await supabase
      .from('user_workflows')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteUserWorkflow(id: string) {
    const { error } = await supabase
      .from('user_workflows')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateWorkflowStatus(
    id: string,
    status: 'deployed' | 'paused' | 'draft'
  ) {
    const { data, error } = await supabase
      .from('user_workflows')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async recordWorkflowRun(id: string) {
    const { data: workflow } = await supabase
      .from('user_workflows')
      .select('runs_count')
      .eq('id', id)
      .single();

    if (workflow) {
      const { data, error } = await supabase
        .from('user_workflows')
        .update({
          last_run: new Date().toISOString(),
          runs_count: workflow.runs_count + 1,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  async submitWorkflowReview(review: WorkflowReview) {
    const { data, error } = await supabase
      .from('workflow_reviews')
      .insert(review)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getWorkflowReviews(workflowId: string) {
    const { data, error } = await supabase
      .from('workflow_reviews')
      .select(`
        *,
        user:profiles(name, avatar_url)
      `)
      .eq('workflow_id', workflowId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateWorkflowReview(id: string, rating: number, comment?: string) {
    const { data, error } = await supabase
      .from('workflow_reviews')
      .update({ rating, comment })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteWorkflowReview(id: string) {
    const { error } = await supabase
      .from('workflow_reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
