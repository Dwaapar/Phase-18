import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Asset = Database['public']['Tables']['assets']['Row'];
type AssetInsert = Database['public']['Tables']['assets']['Insert'];
type AssetUpdate = Database['public']['Tables']['assets']['Update'];

export const assetService = {
  async getAllAssets() {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getAssetById(id: string) {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getAssetsByCategory(category: string) {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('category', category)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createAsset(asset: AssetInsert) {
    const { data, error } = await supabase
      .from('assets')
      .insert(asset)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateAsset(id: string, updates: AssetUpdate) {
    const { data, error } = await supabase
      .from('assets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteAsset(id: string) {
    const { error } = await supabase
      .from('assets')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
