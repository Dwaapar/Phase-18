export type AssetTier = 'free' | 'professional' | 'enterprise';

export interface AssetCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
}

export interface AssetSubcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  isActive: boolean;
}

export interface AssetLicense {
  id: string;
  name: string;
  slug: string;
  description: string;
  allowsPersonalUse: boolean;
  allowsCommercialUse: boolean;
  allowsResale: boolean;
  allowsModification: boolean;
  maxTeamSize?: number;
  sortOrder: number;
}

export interface DigitalAsset {
  id: string;
  categoryId: string;
  subcategoryId?: string;
  licenseId: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  tier: AssetTier;
  price: number;
  fileFormat: string;
  fileSize: string;
  fileSizeBytes: number;
  version: string;
  previewImages: string[];
  previewContent?: string;
  downloadUrl: string;
  features: string[];
  specifications: Record<string, string>;
  includedItems: string[];
  downloadCount: number;
  viewCount: number;
  ratingAverage: number;
  ratingCount: number;
  isFeatured: boolean;
  isActive: boolean;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
}

export interface AssetDownload {
  id: string;
  assetId: string;
  userId: string;
  downloadToken: string;
  expiresAt: string;
  downloadedAt?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface AssetPurchase {
  id: string;
  assetId: string;
  userId: string;
  pricePaid: number;
  paymentMethod: string;
  transactionId: string;
  purchasedAt: string;
}

export interface AssetReview {
  id: string;
  assetId: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AssetUpdate {
  id: string;
  assetId: string;
  version: string;
  title: string;
  description: string;
  changes: string[];
  releasedAt: string;
}

export interface AssetFilters {
  category?: string;
  subcategory?: string;
  tier?: AssetTier;
  minPrice?: number;
  maxPrice?: number;
  format?: string;
  search?: string;
  featured?: boolean;
  sortBy?: 'popular' | 'recent' | 'price-low' | 'price-high' | 'rating';
}

export interface AssetStats {
  totalAssets: number;
  freeAssets: number;
  professionalAssets: number;
  enterpriseAssets: number;
  totalDownloads: number;
  averageRating: number;
}
