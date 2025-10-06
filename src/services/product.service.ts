import { supabase } from '../lib/supabase';
import type { Product, ProductCategory, ProductType, TierLevel } from '../types/platform.types';

export interface ProductFilters {
  type?: ProductType;
  category?: string;
  tierRequired?: TierLevel;
  pricingModel?: string;
  search?: string;
  isFeatured?: boolean;
  integrations?: string[];
  minRating?: number;
  sortBy?: 'popular' | 'newest' | 'rating' | 'price_low' | 'price_high';
  limit?: number;
  offset?: number;
}

export const productService = {
  async getProducts(filters: ProductFilters = {}) {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:product_categories(*)
      `)
      .eq('is_active', true);

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    if (filters.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters.tierRequired) {
      query = query.eq('tier_required', filters.tierRequired);
    }

    if (filters.pricingModel) {
      query = query.eq('pricing_model', filters.pricingModel);
    }

    if (filters.isFeatured) {
      query = query.eq('is_featured', true);
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters.minRating) {
      query = query.gte('rating_average', filters.minRating);
    }

    if (filters.integrations && filters.integrations.length > 0) {
      query = query.contains('integrations', filters.integrations);
    }

    switch (filters.sortBy) {
      case 'popular':
        query = query.order('install_count', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating_average', { ascending: false });
        break;
      case 'price_low':
        query = query.order('price', { ascending: true });
        break;
      case 'price_high':
        query = query.order('price', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Product[];
  },

  async getProductBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:product_categories(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data as Product | null;
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:product_categories(*)
      `)
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data as Product | null;
  },

  async getFeaturedProducts(type?: ProductType, limit = 6) {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:product_categories(*)
      `)
      .eq('is_featured', true)
      .eq('is_active', true);

    if (type) {
      query = query.eq('type', type);
    }

    query = query.order('rating_average', { ascending: false }).limit(limit);

    const { data, error } = await query;

    if (error) throw error;
    return data as Product[];
  },

  async getCategories(type?: ProductType) {
    let query = supabase
      .from('product_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    const { data, error } = await query;

    if (error) throw error;
    return data as ProductCategory[];
  },

  async getCategoryBySlug(slug: string) {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data as ProductCategory | null;
  },

  async getRelatedProducts(productId: string, limit = 4) {
    const product = await this.getProductById(productId);
    if (!product) return [];

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:product_categories(*)
      `)
      .eq('type', product.type)
      .eq('is_active', true)
      .neq('id', productId)
      .limit(limit);

    if (error) throw error;
    return data as Product[];
  },

  async incrementInstallCount(productId: string) {
    const { error } = await supabase.rpc('increment_product_install_count', {
      product_id: productId
    });

    if (error) throw error;
  },

  async searchProducts(searchTerm: string, filters: Partial<ProductFilters> = {}) {
    return this.getProducts({
      ...filters,
      search: searchTerm
    });
  }
};
