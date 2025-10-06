# Pricing Tiers and Feature Access Control Implementation

## Overview
Comprehensive subscription management system with usage tracking, feature gating, and add-on pricing capabilities.

## Pricing Tiers

### Free Tier ($0/month)
- 5 workflow deployments
- 3 managed agents
- 10 asset downloads per month
- 3 professional tool uses per month
- Community support
- Basic analytics

### Starter Tier ($19/month, $182.40/year)
- 25 workflow deployments
- 5 managed agents
- 50 asset downloads per month
- 25 professional tool uses per month
- Email support (24h response)
- Advanced analytics
- API access (1,000 calls/month)

### Professional Tier ($49/month, $470.40/year)
- Unlimited workflow deployments
- Unlimited managed agents
- Unlimited asset downloads
- Unlimited professional tool uses
- Priority support (4h response)
- Advanced analytics & reporting
- API access (100,000 calls/month)
- Custom integrations
- Early access to new features

### Enterprise Tier (Custom Pricing)
- Everything in Professional
- Custom development and automation
- Dedicated success manager
- 99.9% SLA guarantee
- White-label options
- SSO/SAML integration
- Advanced security features
- 24/7 phone support
- On-premise deployment options

## Annual Billing Discount
- **20% discount on all plans** when choosing annual billing
- Starter Annual: $182.40/year (save $45.60)
- Professional Annual: $470.40/year (save $117.60)

## Add-on Products

### Available Add-ons
1. **Additional Workflows (10 pack)** - $9/month
2. **Additional Agents (5 pack)** - $15/month
3. **Professional Tool Uses (50 pack)** - $10/month
4. **Asset Download Bundle (100 pack)** - $5/month
5. **API Call Pack (10k calls)** - $20/month

### Add-on Features
- Stack multiple add-ons of the same type
- Recurring or one-time billing options
- Auto-renew capability
- Proration support
- 20% discount on annual billing for recurring add-ons

## Implementation Components

### Services
1. **subscription.service.ts** - Subscription management with proration
2. **usage-tracking.service.ts** - Usage limit enforcement and tracking
3. **addon.service.ts** - Add-on product management

### Hooks
1. **useSubscription.ts** - React hook for subscription state
2. **usePricing.ts** - React hook for pricing data

### UI Components

#### Billing Components
- **SubscriptionCard** - Display current subscription details
- **UsageDashboard** - Visual usage metrics with progress bars
- **PricingTierComparison** - Side-by-side tier comparison
- **AddonMarketplace** - Browse and purchase add-ons
- **UpgradePrompt** - Context-aware upgrade suggestions

### Pages
- **DashboardBillingPage** - Comprehensive billing dashboard with tabs:
  - Overview: Current subscription and quick actions
  - Usage: Detailed usage metrics and limits
  - Plans: Tier comparison and switching
  - Add-ons: Browse and purchase capacity add-ons
  - History: Billing and invoice history

## Key Features

### Usage Tracking
- Real-time usage monitoring
- Soft caps (80% threshold) trigger warnings
- Hard caps enforce limits
- Monthly reset based on billing cycle
- Audit log of all usage events

### Feature Gating
- Tier-based feature access control
- Hierarchical tier system (Free < Starter < Professional < Enterprise)
- Dynamic feature flags per tier
- Automatic enforcement in services

### Proration Support
- Automatic credit calculation on upgrades
- Credits applied to future invoices
- 365-day credit expiration
- Transparent proration logic

### Subscription Management
- Upgrade/downgrade flows with confirmation
- Cancel at period end option
- Immediate cancellation support
- Reactivation capability
- Billing cycle changes

### Usage Limits Enforcement
```typescript
// Example usage in a service
await usageTrackingService.incrementUsage(
  userId,
  'workflow_deployments',
  'workflow',
  workflowId,
  { name: 'My Workflow' }
);
```

### Feature Access Check
```typescript
// Check if user can access a feature
const canAccess = subscription.canAccessFeature('api_access');
```

### Usage Limit Check
```typescript
// Check before creating resource
const check = await checkLimit('workflow_deployments');
if (!check.canProceed) {
  // Show upgrade prompt or add-on suggestion
}
```

## Database Schema

### Core Tables
- `pricing_tiers` - Subscription tier definitions
- `subscriptions` - User subscription records
- `usage_limits` - Current usage tracking per user
- `usage_events` - Audit log of all usage events
- `addon_products` - Available add-on products
- `user_addons` - Active user add-ons
- `subscription_proration_credits` - Proration credit tracking
- `feature_flags` - Feature access control per tier

### Security
- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Public read access for pricing and product info
- Admin role for management operations

## Usage Tracking Flow

1. **User Action** → Check usage limit
2. **Limit Check** → Validate against tier + add-ons
3. **Increment Usage** → Update current value
4. **Log Event** → Record in usage_events
5. **Soft Cap Check** → Warn user at 80%
6. **Hard Cap Enforcement** → Block at 100%

## Upgrade/Downgrade Flow

1. **User Selects New Tier**
2. **Calculate Proration** → Unused time credit
3. **Create Credit Record** → Store for future use
4. **Update Subscription** → Change tier_id
5. **Reset Usage Limits** → Initialize new limits
6. **Notify User** → Confirmation with credit details

## Add-on Purchase Flow

1. **Browse Add-ons** → Filter by type
2. **Select Quantity** → Check max limits
3. **Calculate Price** → Apply discounts
4. **Process Payment** → Stripe integration ready
5. **Activate Add-on** → Update usage_limits
6. **Track Usage** → Separate from base limits

## Best Practices

### Performance
- Cache pricing tiers data
- Batch usage checks where possible
- Async usage event logging
- Indexed database queries

### User Experience
- Clear usage visualization
- Proactive upgrade prompts
- Transparent pricing display
- Easy add-on discovery

### Business Logic
- Fail gracefully on limit exceeded
- Suggest appropriate upgrades
- Highlight cost savings
- Track conversion metrics

## Future Enhancements
- Stripe payment integration
- Invoice generation
- Usage analytics dashboard
- Custom tier creation for Enterprise
- Team/organization subscriptions
- Usage-based pricing models
- Commitment discounts
- Referral credits
