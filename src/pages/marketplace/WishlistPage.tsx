import React, { useState, useEffect } from 'react';
import { Heart, Trash2, ShoppingCart, Share2 } from 'lucide-react';
import { ProductCard } from '../../components/marketplace/ProductCard';
import { marketplaceService } from '../../services/marketplace.service';
import type { MarketplaceProduct } from '../../types/marketplace.types';
import { Button } from '../../components/ui/Button';

export const WishlistPage: React.FC = () => {
  const [wishlistProducts, setWishlistProducts] = useState<MarketplaceProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const products = await marketplaceService.getProducts();
      const wishlisted = products.slice(0, 3).map(p => ({ ...p, is_in_wishlist: true }));
      setWishlistProducts(wishlisted);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistProducts(prev => prev.filter(p => p.id !== productId));
  };

  const calculateTotalValue = () => {
    return wishlistProducts.reduce((sum, product) => {
      if (product.pricing_type === 'free' || product.pricing_type === 'freemium') {
        return sum;
      }
      return sum + product.price;
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-10 h-10 fill-current" />
            <h1 className="text-4xl md:text-5xl font-bold">My Wishlist</h1>
          </div>
          <p className="text-xl text-pink-100">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
            <p className="text-slate-600 mb-6">Start adding products you love to your wishlist</p>
            <Button onClick={() => window.location.href = '/marketplace'}>
              Browse Marketplace
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Total Value: ${calculateTotalValue().toFixed(2)}
                  </h3>
                  <p className="text-slate-600">
                    Save these items for later or add them to your cart
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Wishlist
                  </Button>
                  <Button variant="primary">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add All to Cart
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard
                    product={product}
                    onWishlistToggle={handleRemoveFromWishlist}
                  />
                  <button
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
