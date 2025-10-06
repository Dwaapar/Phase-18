export type ProductType = 'workflow' | 'agent' | 'asset' | 'service' | 'tool';
export type PricingType = 'one_time' | 'subscription' | 'free' | 'freemium';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type IntegrationType = 'native' | 'api' | 'webhook' | 'zapier';
export type AnalyticsEventType = 'view' | 'install' | 'purchase' | 'demo_click' | 'wishlist_add' | 'comparison_add';

export interface MarketplaceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  parent_id?: string;
  display_order: number;
  is_active: boolean;
  product_count?: number;
}

export interface MarketplaceProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description: string;
  product_type: ProductType;
  category_id: string;
  category?: MarketplaceCategory;
  price: number;
  pricing_type: PricingType;
  currency: string;
  is_featured: boolean;
  is_published: boolean;
  seller_id: string;
  seller?: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  rating_average: number;
  rating_count: number;
  install_count: number;
  view_count: number;
  difficulty_level: DifficultyLevel;
  tags: string[];
  images: string[];
  demo_url?: string;
  documentation_url?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  integrations?: ProductIntegration[];
  is_in_wishlist?: boolean;
}

export interface ProductReview {
  id: string;
  product_id: string;
  user_id: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  content: string;
  is_verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: MarketplaceProduct;
  created_at: string;
}

export interface ProductCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
  is_featured: boolean;
  display_order: number;
  products?: MarketplaceProduct[];
  product_count?: number;
  created_at: string;
}

export interface ProductIntegration {
  id: string;
  product_id: string;
  integration_name: string;
  integration_type: IntegrationType;
}

export interface ProductAnalytics {
  id: string;
  product_id: string;
  event_type: AnalyticsEventType;
  user_id?: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  product_type?: ProductType;
  pricing_type?: PricingType;
  difficulty_level?: DifficultyLevel;
  min_price?: number;
  max_price?: number;
  min_rating?: number;
  tags?: string[];
  integrations?: string[];
  is_featured?: boolean;
  sort_by?: 'popular' | 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'trending';
}

export interface ProductComparison {
  products: MarketplaceProduct[];
  features: ComparisonFeature[];
}

export interface ComparisonFeature {
  name: string;
  category: string;
  values: Record<string, any>;
}

export interface ProductRecommendation {
  product: MarketplaceProduct;
  score: number;
  reason: string;
}

export interface TrendingProduct extends MarketplaceProduct {
  trend_score: number;
  weekly_views: number;
  weekly_installs: number;
}

export interface PopularProduct extends MarketplaceProduct {
  popularity_score: number;
}
