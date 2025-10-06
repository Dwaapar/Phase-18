import type {
  DigitalAsset,
  AssetCategory,
  AssetSubcategory,
  AssetLicense,
  AssetFilters,
  AssetStats,
  AssetReview,
  AssetDownload,
} from '../types/asset.types';
import {
  digitalAssets,
  assetCategories,
  assetSubcategories,
  assetLicenses,
} from '../data/assetsData';

class DigitalAssetService {
  async getCategories(): Promise<AssetCategory[]> {
    return assetCategories.filter(c => c.isActive);
  }

  async getSubcategories(categoryId?: string): Promise<AssetSubcategory[]> {
    let subcats = assetSubcategories.filter(s => s.isActive);
    if (categoryId) {
      subcats = subcats.filter(s => s.categoryId === categoryId);
    }
    return subcats;
  }

  async getLicenses(): Promise<AssetLicense[]> {
    return assetLicenses;
  }

  async getAssets(filters?: AssetFilters): Promise<DigitalAsset[]> {
    let filtered = [...digitalAssets].filter(a => a.isActive);

    if (filters?.category) {
      filtered = filtered.filter(a => a.categoryId === filters.category);
    }

    if (filters?.subcategory) {
      filtered = filtered.filter(a => a.subcategoryId === filters.subcategory);
    }

    if (filters?.tier) {
      filtered = filtered.filter(a => a.tier === filters.tier);
    }

    if (filters?.minPrice !== undefined) {
      filtered = filtered.filter(a => a.price >= filters.minPrice!);
    }

    if (filters?.maxPrice !== undefined) {
      filtered = filtered.filter(a => a.price <= filters.maxPrice!);
    }

    if (filters?.format) {
      filtered = filtered.filter(a => a.fileFormat === filters.format);
    }

    if (filters?.featured) {
      filtered = filtered.filter(a => a.isFeatured);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        a =>
          a.title.toLowerCase().includes(search) ||
          a.description.toLowerCase().includes(search) ||
          a.shortDescription.toLowerCase().includes(search)
      );
    }

    switch (filters?.sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.downloadCount - a.downloadCount);
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.ratingAverage - a.ratingAverage);
        break;
      default:
        filtered.sort((a, b) => b.downloadCount - a.downloadCount);
    }

    return filtered;
  }

  async getAssetBySlug(slug: string): Promise<DigitalAsset | null> {
    const asset = digitalAssets.find(a => a.slug === slug && a.isActive);
    if (asset) {
      asset.viewCount++;
    }
    return asset || null;
  }

  async getAssetById(id: string): Promise<DigitalAsset | null> {
    return digitalAssets.find(a => a.id === id && a.isActive) || null;
  }

  async getFeaturedAssets(limit: number = 6): Promise<DigitalAsset[]> {
    return digitalAssets
      .filter(a => a.isFeatured && a.isActive)
      .sort((a, b) => b.downloadCount - a.downloadCount)
      .slice(0, limit);
  }

  async getRelatedAssets(assetId: string, limit: number = 4): Promise<DigitalAsset[]> {
    const asset = await this.getAssetById(assetId);
    if (!asset) return [];

    return digitalAssets
      .filter(
        a =>
          a.id !== assetId &&
          a.isActive &&
          (a.categoryId === asset.categoryId || a.subcategoryId === asset.subcategoryId)
      )
      .sort((a, b) => b.ratingAverage - a.ratingAverage)
      .slice(0, limit);
  }

  async getStats(): Promise<AssetStats> {
    const active = digitalAssets.filter(a => a.isActive);
    return {
      totalAssets: active.length,
      freeAssets: active.filter(a => a.tier === 'free').length,
      professionalAssets: active.filter(a => a.tier === 'professional').length,
      enterpriseAssets: active.filter(a => a.tier === 'enterprise').length,
      totalDownloads: active.reduce((sum, a) => sum + a.downloadCount, 0),
      averageRating:
        active.reduce((sum, a) => sum + a.ratingAverage, 0) / active.length,
    };
  }

  async getCategoryBySlug(slug: string): Promise<AssetCategory | null> {
    return assetCategories.find(c => c.slug === slug && c.isActive) || null;
  }

  async getSubcategoryBySlug(slug: string): Promise<AssetSubcategory | null> {
    return assetSubcategories.find(s => s.slug === slug && s.isActive) || null;
  }

  async getLicenseById(id: string): Promise<AssetLicense | null> {
    return assetLicenses.find(l => l.id === id) || null;
  }

  async createDownload(assetId: string, userId: string): Promise<AssetDownload> {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const download: AssetDownload = {
      id: 'dl-' + Date.now(),
      assetId,
      userId,
      downloadToken: token,
      expiresAt: expiresAt.toISOString(),
      createdAt: new Date().toISOString(),
    };

    const asset = digitalAssets.find(a => a.id === assetId);
    if (asset) {
      asset.downloadCount++;
    }

    return download;
  }

  async getUniqueFormats(): Promise<string[]> {
    const formats = new Set(digitalAssets.map(a => a.fileFormat));
    return Array.from(formats).sort();
  }

  async getAssetReviews(assetId: string): Promise<AssetReview[]> {
    const mockReviews: AssetReview[] = [
      {
        id: 'rev-1',
        assetId,
        userId: 'user-1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
        rating: 5,
        title: 'Excellent resource!',
        content: 'This has been incredibly helpful for our team. The quality is outstanding and the templates are very professional.',
        isVerifiedPurchase: true,
        helpfulCount: 24,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'rev-2',
        assetId,
        userId: 'user-2',
        userName: 'Michael Chen',
        userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
        rating: 4,
        title: 'Great value',
        content: 'Very comprehensive and well-organized. Would recommend to anyone looking for quality assets.',
        isVerifiedPurchase: true,
        helpfulCount: 18,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'rev-3',
        assetId,
        userId: 'user-3',
        userName: 'Emily Rodriguez',
        userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
        rating: 5,
        title: 'Saved us hours of work',
        content: 'The templates are exactly what we needed. Easy to customize and professional results every time.',
        isVerifiedPurchase: false,
        helpfulCount: 12,
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    return mockReviews;
  }
}

export const digitalAssetService = new DigitalAssetService();
