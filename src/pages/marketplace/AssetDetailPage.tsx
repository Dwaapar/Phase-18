import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Download,
  Star,
  Eye,
  Check,
  Shield,
  RefreshCw,
  FileText,
  Package,
  ChevronLeft,
  Heart,
  Share2,
  Clock,
  Users,
} from 'lucide-react';
import { useAsset, useAssetReviews } from '../../hooks/useAssets';
import { digitalAssetService } from '../../services/digital-asset.service';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import type { AssetTier } from '../../types/asset.types';

export default function AssetDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { asset, loading } = useAsset(slug!);
  const { reviews } = useAssetReviews(asset?.id || '');
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = async () => {
    if (!asset || !user) return;

    setDownloading(true);
    try {
      const download = await digitalAssetService.createDownload(asset.id, user.id);
      setTimeout(() => {
        setDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }, 1500);
    } catch (error) {
      setDownloading(false);
      alert('Download failed. Please try again.');
    }
  };

  const getTierColor = (tier: AssetTier) => {
    switch (tier) {
      case 'free':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'professional':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'enterprise':
        return 'bg-purple-100 text-purple-700 border-purple-200';
    }
  };

  const formatPrice = (price: number) => {
    return price === 0 ? 'Free' : `$${price}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading asset...</p>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Asset not found</h2>
          <Link to="/marketplace/assets" className="text-blue-600 hover:text-blue-700">
            Browse all assets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/marketplace/assets"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back to marketplace
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 relative">
                <img
                  src={asset.previewImages[0]}
                  alt={asset.title}
                  className="w-full h-full object-cover"
                />
                {asset.isFeatured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{asset.title}</h1>
                  <p className="text-lg text-slate-600">{asset.shortDescription}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-50 rounded-lg transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(asset.ratingAverage)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-900">
                    {asset.ratingAverage.toFixed(1)}
                  </span>
                  <span className="text-sm text-slate-500">({asset.ratingCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Download className="w-4 h-4" />
                  {asset.downloadCount.toLocaleString()} downloads
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Eye className="w-4 h-4" />
                  {asset.viewCount.toLocaleString()} views
                </div>
              </div>

              <div className="prose prose-slate max-w-none mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">About this asset</h2>
                <p className="text-slate-700 leading-relaxed">{asset.description}</p>
              </div>

              {asset.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">Key Features</h2>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {asset.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {asset.includedItems.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">What's Included</h2>
                  <ul className="space-y-2">
                    {asset.includedItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {asset.previewContent && (
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Preview
                  </h3>
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">
                    {asset.previewContent}
                  </pre>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Customer Reviews ({reviews.length})
              </h2>

              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-slate-200 pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-slate-900">{review.userName}</h4>
                          {review.isVerifiedPurchase && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h5 className="font-medium text-slate-900 mb-1">{review.title}</h5>
                        <p className="text-slate-700 mb-3">{review.content}</p>
                        <button className="text-sm text-slate-500 hover:text-slate-700">
                          Helpful ({review.helpfulCount})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 sticky top-8">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-slate-900">
                    {formatPrice(asset.price)}
                  </span>
                  {asset.price > 0 && (
                    <span className="text-sm text-slate-600">one-time payment</span>
                  )}
                </div>
                <Badge className={`${getTierColor(asset.tier)} border`}>
                  {asset.tier} tier
                </Badge>
              </div>

              {user ? (
                <Button
                  onClick={handleDownload}
                  disabled={downloading || downloadSuccess}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 mb-4"
                >
                  {downloading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Preparing Download...
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Download Ready!
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      {asset.price === 0 ? 'Download Free' : 'Purchase & Download'}
                    </>
                  )}
                </Button>
              ) : (
                <Link to="/sign-in" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 mb-4">
                    Sign in to Download
                  </Button>
                </Link>
              )}

              {downloadSuccess && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Download link expires in 24 hours
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3 text-sm">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="font-medium text-slate-900">Format</div>
                    <div className="text-slate-600">{asset.fileFormat}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Package className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="font-medium text-slate-900">File Size</div>
                    <div className="text-slate-600">{asset.fileSize}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RefreshCw className="w-5 h-5 text-slate-400" />
                  <div>
                    <div className="font-medium text-slate-900">Version</div>
                    <div className="text-slate-600">{asset.version}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-semibold text-slate-900">License Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">Free updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">Commercial use</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-slate-700">Email support</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <div className="font-semibold mb-1">Secure Download</div>
                    <div className="text-blue-700">
                      Your download link expires after 24 hours for security. All transactions are encrypted.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
