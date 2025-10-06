import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Package,
  Search,
  Filter,
  Calendar,
  FileText,
  Star,
  ExternalLink,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

interface PurchasedAsset {
  id: string;
  title: string;
  category: string;
  price: number;
  purchasedAt: string;
  downloadUrl: string;
  fileFormat: string;
  fileSize: string;
  version: string;
  lastDownloaded?: string;
  downloadCount: number;
  thumbnail: string;
}

export default function DashboardAssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const purchasedAssets: PurchasedAsset[] = [
    {
      id: '1',
      title: 'Sales Email Mastery Pack',
      category: 'Prompt Packs',
      price: 29,
      purchasedAt: '2024-09-15T10:30:00Z',
      downloadUrl: '/download/asset-1',
      fileFormat: 'PDF',
      fileSize: '2.4 MB',
      version: '2.0',
      lastDownloaded: '2024-09-16T14:20:00Z',
      downloadCount: 3,
      thumbnail: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
    },
    {
      id: '2',
      title: 'Customer Sentiment Dataset',
      category: 'Datasets',
      price: 149,
      purchasedAt: '2024-08-20T15:45:00Z',
      downloadUrl: '/download/asset-2',
      fileFormat: 'CSV',
      fileSize: '125 MB',
      version: '3.1',
      lastDownloaded: '2024-09-01T09:15:00Z',
      downloadCount: 5,
      thumbnail: 'https://images.pexels.com/photos/7688465/pexels-photo-7688465.jpeg',
    },
    {
      id: '3',
      title: 'Product Launch Framework',
      category: 'Playbooks',
      price: 0,
      purchasedAt: '2024-09-10T08:00:00Z',
      downloadUrl: '/download/asset-3',
      fileFormat: 'PDF',
      fileSize: '15.8 MB',
      version: '4.0',
      downloadCount: 1,
      thumbnail: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
    },
    {
      id: '4',
      title: 'Instagram Stories Bundle',
      category: 'Creative Bundles',
      price: 49,
      purchasedAt: '2024-07-25T12:30:00Z',
      downloadUrl: '/download/asset-4',
      fileFormat: 'ZIP',
      fileSize: '245 MB',
      version: '2.5',
      lastDownloaded: '2024-08-05T16:45:00Z',
      downloadCount: 7,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    },
  ];

  const categories = ['all', ...new Set(purchasedAssets.map(a => a.category))];

  const filteredAssets = purchasedAssets.filter(asset => {
    const matchesSearch = asset.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || asset.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSpent = purchasedAssets.reduce((sum, asset) => sum + asset.price, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDownload = (asset: PurchasedAsset) => {
    console.log('Downloading:', asset.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Digital Assets</h1>
          <p className="text-slate-600">
            Manage and download your purchased assets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{purchasedAssets.length}</div>
            </div>
            <div className="text-sm text-slate-600">Total Assets</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Download className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {purchasedAssets.reduce((sum, a) => sum + a.downloadCount, 0)}
              </div>
            </div>
            <div className="text-sm text-slate-600">Total Downloads</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">${totalSpent}</div>
            </div>
            <div className="text-sm text-slate-600">Total Spent</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {purchasedAssets.filter(a => a.price === 0).length}
              </div>
            </div>
            <div className="text-sm text-slate-600">Free Assets</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your assets..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
              <Link to="/marketplace/assets">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  <Package className="w-4 h-4 mr-2" />
                  Browse More
                </Button>
              </Link>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {filteredAssets.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No assets found</h3>
                <p className="text-slate-600 mb-6">
                  {searchTerm
                    ? 'Try adjusting your search terms'
                    : "You haven't purchased any assets yet"}
                </p>
                <Link to="/marketplace/assets">
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    Browse Marketplace
                  </Button>
                </Link>
              </div>
            ) : (
              filteredAssets.map(asset => (
                <div key={asset.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={asset.thumbnail}
                        alt={asset.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {asset.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Badge className="bg-blue-100 text-blue-700">{asset.category}</Badge>
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {asset.fileFormat}
                            </span>
                            <span>{asset.fileSize}</span>
                            <span>v{asset.version}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-900">
                            {asset.price === 0 ? 'Free' : `$${asset.price}`}
                          </div>
                          <div className="text-xs text-slate-500">
                            Purchased {formatDate(asset.purchasedAt)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 mb-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {asset.downloadCount} downloads
                        </div>
                        {asset.lastDownloaded && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Last: {formatDate(asset.lastDownloaded)}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleDownload(asset)}
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Again
                        </Button>
                        <Link to={`/marketplace/assets/${asset.id}`}>
                          <Button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Need more assets?</h2>
              <p className="text-blue-100 mb-4">
                Explore our marketplace with 200+ premium digital assets
              </p>
            </div>
            <Link to="/marketplace/assets">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Browse Marketplace
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
