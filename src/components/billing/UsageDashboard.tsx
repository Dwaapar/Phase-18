import { AlertCircle, TrendingUp, Activity } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Alert } from '../ui/Alert';
import { Button } from '../ui/Button';
import type { UsageLimit, UserAddon } from '../../types/platform.types';

interface UsageDashboardProps {
  usageLimits: UsageLimit[];
  userAddons: UserAddon[];
  onUpgrade?: () => void;
  onPurchaseAddon?: (limitType: string) => void;
}

export function UsageDashboard({
  usageLimits,
  userAddons,
  onUpgrade,
  onPurchaseAddon,
}: UsageDashboardProps) {
  const calculateUsagePercentage = (limit: UsageLimit): number => {
    if (limit.limitValue === -1) return 0;

    const addonCapacity = userAddons
      .filter((addon) => addon.addon?.addonType === `${limit.limitType}_capacity`)
      .reduce((sum, addon) => sum + (addon.usageLimit - addon.usageCurrent), 0);

    const totalLimit = limit.limitValue + addonCapacity;
    return (limit.currentValue / totalLimit) * 100;
  };

  const getStatusColor = (percentage: number): string => {
    if (percentage >= 90) return 'error';
    if (percentage >= 80) return 'warning';
    return 'primary';
  };

  const getLimitLabel = (limitType: string): string => {
    const labels: Record<string, string> = {
      workflow_deployments: 'Workflow Deployments',
      agents: 'Active Agents',
      asset_downloads: 'Asset Downloads',
      tool_uses: 'Professional Tool Uses',
      api_calls: 'API Calls',
    };
    return labels[limitType] || limitType;
  };

  const getAddonCapacity = (limitType: string): number => {
    return userAddons
      .filter((addon) => addon.addon?.addonType === `${limitType}_capacity`)
      .reduce((sum, addon) => sum + (addon.usageLimit - addon.usageCurrent), 0);
  };

  const warnings = usageLimits.filter((limit) => {
    if (limit.limitValue === -1) return false;
    const percentage = calculateUsagePercentage(limit);
    return percentage >= limit.softCapThreshold * 100;
  });

  return (
    <div className="space-y-6">
      {warnings.length > 0 && (
        <Alert variant="warning">
          <AlertCircle className="w-5 h-5" />
          <div className="ml-3">
            <h4 className="font-semibold mb-1">Usage Alert</h4>
            <p className="text-sm">
              You're approaching the limit for {warnings.length} resource
              {warnings.length > 1 ? 's' : ''}. Consider upgrading your plan or purchasing add-ons.
            </p>
          </div>
        </Alert>
      )}

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Resource Usage
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Track your current usage across all resources
            </p>
          </div>
          {onUpgrade && (
            <Button onClick={onUpgrade} size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Upgrade Plan
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {usageLimits.map((limit) => {
            const percentage = calculateUsagePercentage(limit);
            const isUnlimited = limit.limitValue === -1;
            const addonCapacity = getAddonCapacity(limit.limitType);
            const totalCapacity = isUnlimited ? Infinity : limit.limitValue + addonCapacity;

            return (
              <div key={limit.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{getLimitLabel(limit.limitType)}</p>
                    <p className="text-sm text-gray-500">
                      {isUnlimited ? (
                        <span className="text-green-600 font-medium">Unlimited</span>
                      ) : (
                        <>
                          {limit.currentValue} of {totalCapacity} used
                          {addonCapacity > 0 && (
                            <span className="text-blue-600 ml-1">
                              (+{addonCapacity} from add-ons)
                            </span>
                          )}
                        </>
                      )}
                    </p>
                  </div>

                  {!isUnlimited && percentage >= 80 && onPurchaseAddon && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onPurchaseAddon(limit.limitType)}
                    >
                      Add Capacity
                    </Button>
                  )}
                </div>

                {!isUnlimited && (
                  <ProgressBar
                    value={percentage}
                    variant={getStatusColor(percentage)}
                    showPercentage
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {userAddons.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Active Add-ons</h3>
          <div className="space-y-4">
            {userAddons.map((addon) => (
              <div
                key={addon.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{addon.addon?.name}</p>
                  <p className="text-sm text-gray-600">
                    {addon.usageCurrent} of {addon.usageLimit} used
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    ${((addon.addon?.price || 0) / 100).toFixed(2)}/
                    {addon.addon?.billingType === 'recurring' ? 'month' : 'one-time'}
                  </p>
                  {addon.expiresAt && (
                    <p className="text-xs text-gray-500">
                      Expires {new Date(addon.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
