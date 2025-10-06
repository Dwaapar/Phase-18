import { useState, useEffect } from 'react';
import type {
  DigitalAsset,
  AssetCategory,
  AssetSubcategory,
  AssetFilters,
  AssetStats,
  AssetReview,
} from '../types/asset.types';
import { digitalAssetService } from '../services/digital-asset.service';

export function useAssets(filters?: AssetFilters) {
  const [assets, setAssets] = useState<DigitalAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setLoading(true);
        const data = await digitalAssetService.getAssets(filters);
        setAssets(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [JSON.stringify(filters)]);

  return { assets, loading, error };
}

export function useAsset(slugOrId: string) {
  const [asset, setAsset] = useState<DigitalAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        const data = await digitalAssetService.getAssetBySlug(slugOrId);
        setAsset(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [slugOrId]);

  return { asset, loading, error };
}

export function useAssetCategories() {
  const [categories, setCategories] = useState<AssetCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await digitalAssetService.getCategories();
      setCategories(data);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading };
}

export function useAssetSubcategories(categoryId?: string) {
  const [subcategories, setSubcategories] = useState<AssetSubcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      const data = await digitalAssetService.getSubcategories(categoryId);
      setSubcategories(data);
      setLoading(false);
    };

    fetchSubcategories();
  }, [categoryId]);

  return { subcategories, loading };
}

export function useAssetStats() {
  const [stats, setStats] = useState<AssetStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await digitalAssetService.getStats();
      setStats(data);
      setLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, loading };
}

export function useAssetReviews(assetId: string) {
  const [reviews, setReviews] = useState<AssetReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await digitalAssetService.getAssetReviews(assetId);
      setReviews(data);
      setLoading(false);
    };

    fetchReviews();
  }, [assetId]);

  return { reviews, loading };
}

export function useFeaturedAssets(limit: number = 6) {
  const [assets, setAssets] = useState<DigitalAsset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      const data = await digitalAssetService.getFeaturedAssets(limit);
      setAssets(data);
      setLoading(false);
    };

    fetchAssets();
  }, [limit]);

  return { assets, loading };
}
