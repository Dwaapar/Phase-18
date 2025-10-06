import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type CaseStudy = Database['public']['Tables']['case_studies']['Row'];
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type Guide = Database['public']['Tables']['guides']['Row'];
type FAQ = Database['public']['Tables']['faqs']['Row'];

export const contentService = {
  async getAllCaseStudies() {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getCaseStudyById(id: string) {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAllBlogPosts() {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getBlogPostById(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getBlogPostsByCategory(category: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getAllTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getAllGuides() {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getGuideById(id: string) {
    const { data, error } = await supabase
      .from('guides')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAllFAQs() {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getFAQsByCategory(category: string) {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('category', category)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  },
};
