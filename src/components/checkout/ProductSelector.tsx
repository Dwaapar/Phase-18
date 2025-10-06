import { useState, useEffect } from 'react';
import { Check, ShoppingCart, Loader2 } from 'lucide-react';
import { productService } from '../../services/product.service';

interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  productType: string;
  pricingModel: string;
  media: any;
}

interface ProductSelectorProps {
  onProductsSelected: (products: Array<{ id: string; quantity: number }>) => void;
  productType?: string;
}

export default function ProductSelector({ onProductsSelected, productType }: ProductSelectorProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [productType]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts({ type: productType });
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    const newSelected = new Map(selectedProducts);
    if (quantity > 0) {
      newSelected.set(productId, quantity);
    } else {
      newSelected.delete(productId);
    }
    setSelectedProducts(newSelected);
    onProductsSelected(Array.from(newSelected.entries()).map(([id, qty]) => ({ id, quantity: qty })));
  };

  const getTotalPrice = () => {
    let total = 0;
    selectedProducts.forEach((quantity, productId) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        total += product.basePrice * quantity;
      }
    });
    return total;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const quantity = selectedProducts.get(product.id) || 0;
          const isSelected = quantity > 0;

          return (
            <div
              key={product.id}
              className={`bg-white rounded-xl border-2 transition-all ${
                isSelected
                  ? 'border-blue-500 shadow-lg'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {product.media?.images?.[0] && (
                <img
                  src={product.media.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                  {isSelected && (
                    <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-slate-900">
                    ${(product.basePrice / 100).toFixed(2)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(product.id, Math.max(0, quantity - 1))}
                      className="w-8 h-8 rounded-lg border border-slate-300 hover:bg-slate-50 flex items-center justify-center"
                      disabled={quantity === 0}
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(product.id, quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-slate-300 hover:bg-slate-50 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProducts.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-slate-900">
                  {selectedProducts.size} {selectedProducts.size === 1 ? 'product' : 'products'} selected
                </p>
                <p className="text-sm text-slate-600">
                  Total: ${(getTotalPrice() / 100).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
