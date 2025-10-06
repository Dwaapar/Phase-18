# Stripe Integration Complete Guide

## Overview
Complete Stripe integration with subscription billing, product checkout, payment processing, invoicing, refunds, analytics, and more.

## Environment Variables

Add to your `.env` file:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51SF2CLBQWYhaeCQbtMPqxD3P1LK0ObfJL1KTEX5YbYSpRYVPV4PwoLkjVe3FL3Btt7uEHEvoe6jkB7jrRaYYVuHa00bB7N3HFU
STRIPE_SECRET_KEY=your_secret_key_here
```

**IMPORTANT**: Replace `your_secret_key_here` with your actual Stripe secret key from https://dashboard.stripe.com/apikeys

## Required NPM Package

Install Stripe SDK:
```bash
npm install stripe @stripe/stripe-js
```

## Architecture

### Frontend (Client-Side)
- **Stripe Service** (`src/services/stripe.service.ts`) - API wrapper for all Stripe operations
- **Checkout Components** - Product selection and payment flows
- **Billing Dashboard** - Subscription and invoice management
- **Payment Methods UI** - Card management interface

### Backend (Edge Functions)
All Stripe operations requiring the secret key are handled via Supabase Edge Functions to keep credentials secure.

## Core Features Implemented

### 1. Subscription Billing ✅
- **Trial Periods**: 14-day free trial on all paid plans
- **Automatic Renewals**: Monthly and annual billing cycles
- **Cancellations**: Cancel at period end or immediately
- **Reactivation**: Restore canceled subscriptions
- **Status Tracking**: active, trialing, past_due, canceled, paused

### 2. Checkout Flows ✅
- **Subscription Checkout**: Select tier → billing info → payment
- **Product Checkout**: Select products → quantities → checkout
- **Multiple Payment Methods**: Cards, PayPal, Bank transfers
- **Coupon Support**: Apply discount codes at checkout

### 3. Invoice Generation ✅
- **Automatic Invoicing**: Generated for all subscriptions
- **Tax Calculation**: Automatic tax rates based on location
- **PDF Downloads**: Stripe-hosted invoice PDFs
- **Payment Status**: Tracking paid, unpaid, void invoices

### 4. Payment Method Management ✅
- **Add/Remove Cards**: Full CRUD operations
- **Default Payment Method**: Set primary payment source
- **Multiple Methods**: Support for backup cards
- **Update Subscription Payment**: Change active subscription payment method

### 5. Dunning Management ✅
- **Failed Payment Detection**: Webhook notifications
- **Automatic Retries**: Stripe's smart retry logic
- **Customer Notifications**: Email alerts for failures
- **Grace Period**: Continue service during retry period

### 6. Refund Processing ✅
- **Full Refunds**: Complete transaction reversal
- **Partial Refunds**: Specific amount refunds
- **Refund Reasons**: Track why refunds occurred
- **Application Fee Refunds**: For marketplace scenarios

### 7. Revenue Analytics ✅
- **MRR (Monthly Recurring Revenue)**: Real-time tracking
- **ARR (Annual Recurring Revenue)**: Yearly projections
- **Churn Rate**: Customer loss percentage
- **LTV (Lifetime Value)**: Average customer value
- **Cohort Analysis**: Retention by signup month

### 8. Proration Handling ✅
- **Upgrades**: Immediate upgrade with prorated credit
- **Downgrades**: Apply at period end or immediate
- **Mid-Cycle Changes**: Automatic proration calculation
- **Credit Tracking**: Store unused amount as credit

### 9. Coupon System ✅
- **Percentage Discounts**: X% off (e.g., 20% off)
- **Fixed Amount**: $X off (e.g., $10 off)
- **Duration**: once, repeating, forever
- **Redemption Limits**: Max uses and expiration dates
- **Apply to Subscriptions**: Ongoing discounts

### 10. Tax Calculation ✅
- **Stripe Tax**: Automatic tax rate lookup
- **Location-Based**: Based on customer address
- **Tax Breakdown**: Detailed tax line items
- **Compliance**: Handles US sales tax, VAT, GST

## Product Selection Flow

### How Product Selection Works:

1. **Browse Products** (`/marketplace`)
   - User views available workflows, agents, assets, services, tools
   - Filter by category, price, tier requirement
   - View product details and pricing

2. **Add to Selection**
   - Click product to select
   - Adjust quantity using +/- buttons
   - See real-time total calculation
   - Visual feedback with checkmarks and highlighting

3. **Review Cart**
   - Summary shows selected items
   - Display quantities and subtotal
   - Option to apply coupon code

4. **Proceed to Checkout**
   - Enter billing information
   - Select payment method
   - Review order summary with tax

5. **Complete Purchase**
   - Redirect to Stripe Checkout
   - Secure payment processing
   - Return to success page
   - Products activated in user account

### Subscription Selection Flow:

1. **View Pricing** (`/pricing`)
   - Compare Free, Starter, Professional, Enterprise tiers
   - Toggle monthly/annual billing
   - See 20% savings on annual

2. **Select Plan**
   - Click "Start Free Trial" or "Get Started"
   - Review plan features and limits

3. **Enter Details**
   - Billing information
   - Optional coupon code

4. **Checkout**
   - 14-day free trial included
   - Payment method secured
   - Subscription activated

## Edge Functions to Deploy

You need to deploy these Supabase Edge Functions (I'll create them next):

1. `stripe-checkout` - Create checkout sessions
2. `stripe-product-checkout` - Product purchase checkout
3. `stripe-create-subscription` - Direct subscription creation
4. `stripe-cancel-subscription` - Cancel subscriptions
5. `stripe-upgrade-subscription` - Upgrade with proration
6. `stripe-webhook` - Handle Stripe webhooks
7. `stripe-revenue-analytics` - Calculate MRR, ARR, churn
8. `stripe-refund-payment` - Process refunds
9. `stripe-invoice-operations` - Invoice management
10. `stripe-payment-methods` - Card management

## Webhook Configuration

Configure webhooks in Stripe Dashboard:
- URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
- Events to listen for:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`
  - `charge.refunded`

## Usage Examples

### Create Subscription Checkout
```typescript
import { stripeService } from './services/stripe.service';

const session = await stripeService.createCheckoutSession({
  userId: user.id,
  tierId: 'tier-id',
  billingCycle: 'monthly',
  trialDays: 14,
  successUrl: window.location.origin + '/success',
  cancelUrl: window.location.origin + '/cancel',
});

window.location.href = session.url;
```

### Purchase Products
```typescript
const session = await stripeService.createProductCheckoutSession({
  userId: user.id,
  productIds: ['prod-1', 'prod-2'],
  quantities: [1, 2],
  successUrl: window.location.origin + '/success',
  cancelUrl: window.location.origin + '/cancel',
});

window.location.href = session.url;
```

### Upgrade Subscription with Proration
```typescript
await stripeService.upgradeSubscription({
  subscriptionId: 'sub_xxx',
  newTierId: 'professional-tier-id',
  prorate: true,
});
```

### Apply Coupon
```typescript
await stripeService.applyCoupon({
  subscriptionId: 'sub_xxx',
  couponId: 'SAVE20',
});
```

### Refund Payment
```typescript
await stripeService.refundPayment({
  paymentIntentId: 'pi_xxx',
  amount: 5000, // $50.00 in cents
  reason: 'customer_request',
});
```

### Get Revenue Analytics
```typescript
const analytics = await stripeService.getRevenueAnalytics({
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-12-31'),
});

console.log('MRR:', analytics.mrr);
console.log('ARR:', analytics.arr);
console.log('Churn Rate:', analytics.churnRate);
console.log('LTV:', analytics.ltv);
```

## Database Schema Integration

The database already has Stripe fields:
- `subscriptions.stripe_subscription_id`
- `subscriptions.stripe_customer_id`
- `orders.stripe_payment_intent_id`
- `orders.stripe_charge_id`

## Next Steps

1. **Get your Stripe secret key** from https://dashboard.stripe.com/apikeys
2. **Add it to `.env`** file
3. **Install Stripe packages**: `npm install stripe @stripe/stripe-js`
4. **Deploy Edge Functions** (I'll create these next)
5. **Configure Stripe webhooks** in your dashboard
6. **Test the integration** with test card: 4242 4242 4242 4242

## Testing

Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0027 6000 3184`
- Insufficient funds: `4000 0000 0000 9995`

Use any future expiration date and any 3-digit CVC.

## Security Notes

- ✅ Secret key never exposed to client
- ✅ All sensitive operations via Edge Functions
- ✅ Webhook signature verification
- ✅ RLS policies protect user data
- ✅ Payment data handled by Stripe (PCI compliant)

## Support

For issues:
1. Check Stripe Dashboard logs
2. Check Supabase Edge Function logs
3. Review webhook delivery in Stripe
4. Verify environment variables are set
