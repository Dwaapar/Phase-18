import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type ContactSubmission = Database['public']['Tables']['contact_submissions']['Insert'];
type PilotApplication = Database['public']['Tables']['pilot_applications']['Insert'];

export const submissionService = {
  async submitContactForm(submission: ContactSubmission) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(submission)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async submitPilotApplication(application: PilotApplication) {
    const { data, error } = await supabase
      .from('pilot_applications')
      .insert(application)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getContactSubmissions() {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPilotApplications() {
    const { data, error } = await supabase
      .from('pilot_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateContactSubmissionStatus(
    id: string,
    status: 'pending' | 'in_progress' | 'resolved'
  ) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePilotApplicationStatus(
    id: string,
    status: 'pending' | 'approved' | 'rejected'
  ) {
    const { data, error } = await supabase
      .from('pilot_applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
