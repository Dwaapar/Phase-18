import { Plus, Package, Zap, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import type { AddonProduct } from '../../types/platform.types';

interface AddonMarketplaceProps {
  addons: AddonProduct[];
  purchasedAddons?: string[];
  onPurchase: (addon: AddonProduct) => void;
}

export function AddonMarketplace({ addons, purchasedAddons = [], onPurchase }: AddonMarketplaceProps) {
  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getAddonIcon = (type: string) => {
    switch (type) {
      case 'workflow_capacity':
        return <Zap className="w-5 h-5 text-blue-600" />;
      case 'agent_capacity':
        return <Package className="w-5 h-5 text-purple-600" />;
      case 'tool_capacity':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      default:
        return <Plus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAddonTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      workflow_capacity: 'Workflows',
      agent_capacity: 'Agents',
      asset_capacity: 'Assets',
      tool_capacity: 'Tools',
      api_capacity: 'API Calls',
      storage: 'Storage',
      bandwidth: 'Bandwidth',
    };
    return labels[type] || type;
  };

  const groupedAddons = addons.reduce((acc, addon) => {
    const type = addon.addonType;
    if (!acc[type]) acc[type] = [];
    acc[type].push(addon);
    return acc;
  }, {} as Record<string, AddonProduct[]>);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-3">Expand Your Capacity</h2>
        <p className="text-gray-600">
          Need more resources without upgrading your entire plan? Purchase add-ons to increase
          specific limits as needed.
        </p>
      </div>

      {Object.entries(groupedAddons).map(([type, typeAddons]) => (
        <div key={type}>
          <div className="flex items-center gap-3 mb-4">
            {getAddonIcon(type)}
            <h3 className="text-xl font-bold">{getAddonTypeLabel(type)}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {typeAddons.map((addon) => {
              const isPurchased = purchasedAddons.includes(addon.id);

              return (
                <Card key={addon.id} className="p-6 relative">
                  {addon.isStackable && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="text-xs">
                        Stackable
                      </Badge>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="font-bold text-lg mb-2">{addon.name}</h4>
                    <p className="text-sm text-gray-600">{addon.description}</p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{formatPrice(addon.price)}</span>
                      <span className="text-gray-500">
                        /{addon.billingType === 'recurring' ? 'month' : 'one-time'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Adds {addon.quantity.toLocaleString()}{' '}
                      {getAddonTypeLabel(addon.addonType).toLowerCase()}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {addon.maxQuantity && (
                      <p className="text-xs text-gray-500">
                        Maximum {addon.maxQuantity} per account
                      </p>
                    )}
                    {addon.billingType === 'recurring' && (
                      <p className="text-xs text-gray-500">Renews monthly, cancel anytime</p>
                    )}
                  </div>

                  <Button
                    onClick={() => onPurchase(addon)}
                    variant={isPurchased ? 'outline' : 'primary'}
                    className="w-full"
                    disabled={isPurchased && !addon.isStackable}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {isPurchased && !addon.isStackable
                      ? 'Already Purchased'
                      : isPurchased
                      ? 'Purchase More'
                      : 'Purchase Add-on'}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold mb-2">Annual Billing Discount</h4>
            <p className="text-sm text-gray-700 mb-3">
              Save 20% on all recurring add-ons when you choose annual billing. Plus, get better
              rates by upgrading your base plan first.
            </p>
            <p className="text-xs text-gray-600">
              Add-ons are prorated to your billing cycle and can be canceled anytime.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
