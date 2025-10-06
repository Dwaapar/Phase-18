import { useState } from 'react';
import { CreditCard, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { stripeService } from '../../services/stripe.service';
import { useAuth } from '../../contexts/AuthContext';
import ProductSelector from './ProductSelector';

interface CheckoutFlowProps {
  mode: 'subscription' | 'product';
  tierId?: string;
  billingCycle?: 'monthly' | 'annual';
  onComplete?: () => void;
}

export default function CheckoutFlow({ mode, tierId, billingCycle = 'monthly', onComplete }: CheckoutFlowProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Array<{ id: string; quantity: number }>>([]);
  const [couponCode, setCouponCode] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    name: '',
    email: user?.email || '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US',
    },
  });

  const handleProductsSelected = (products: Array<{ id: string; quantity: number }>) => {
    setSelectedProducts(products);
  };

  const handleProceedToCheckout = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const successUrl = `${window.location.origin}/checkout/success`;
      const cancelUrl = `${window.location.origin}/checkout/cancel`;

      if (mode === 'subscription' && tierId) {
        const session = await stripeService.createCheckoutSession({
          userId: user.id,
          tierId,
          billingCycle,
          trialDays: 14,
          couponCode: couponCode || undefined,
          successUrl,
          cancelUrl,
        });

        window.location.href = session.url;
      } else if (mode === 'product' && selectedProducts.length > 0) {
        const session = await stripeService.createProductCheckoutSession({
          userId: user.id,
          productIds: selectedProducts.map(p => p.id),
          quantities: selectedProducts.map(p => p.quantity),
          couponCode: couponCode || undefined,
          successUrl,
          cancelUrl,
        });

        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`w-24 h-1 mx-2 transition-all ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm font-medium text-slate-700">
            {mode === 'subscription' ? 'Select Plan' : 'Select Products'}
          </span>
          <span className="text-sm font-medium text-slate-700">Billing Info</span>
          <span className="text-sm font-medium text-slate-700">Payment</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {mode === 'subscription' ? 'Review Your Plan' : 'Select Products'}
            </h2>

            {mode === 'product' && (
              <ProductSelector onProductsSelected={handleProductsSelected} />
            )}

            {mode === 'subscription' && (
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Selected Plan</h3>
                <p className="text-slate-600">
                  {billingCycle === 'monthly' ? 'Monthly' : 'Annual'} billing
                </p>
                <p className="text-sm text-blue-600 mt-2">Includes 14-day free trial</p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Coupon Code (Optional)
              </label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={mode === 'product' && selectedProducts.length === 0}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Continue to Billing
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Billing Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={billingDetails.name}
                  onChange={(e) => setBillingDetails({ ...billingDetails, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={billingDetails.email}
                  onChange={(e) => setBillingDetails({ ...billingDetails, email: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={billingDetails.address.line1}
                  onChange={(e) => setBillingDetails({
                    ...billingDetails,
                    address: { ...billingDetails.address, line1: e.target.value }
                  })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={billingDetails.address.city}
                    onChange={(e) => setBillingDetails({
                      ...billingDetails,
                      address: { ...billingDetails.address, city: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={billingDetails.address.state}
                    onChange={(e) => setBillingDetails({
                      ...billingDetails,
                      address: { ...billingDetails.address, state: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={billingDetails.address.postal_code}
                    onChange={(e) => setBillingDetails({
                      ...billingDetails,
                      address: { ...billingDetails.address, postal_code: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Country
                  </label>
                  <select
                    value={billingDetails.address.country}
                    onChange={(e) => setBillingDetails({
                      ...billingDetails,
                      address: { ...billingDetails.address, country: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h2>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <p className="font-medium text-slate-900">Secure Payment</p>
              </div>
              <p className="text-sm text-slate-600">
                Your payment information is encrypted and secure
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-slate-600">
                You will be redirected to Stripe's secure checkout page to complete your payment.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button
                onClick={handleProceedToCheckout}
                disabled={loading}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Stripe Checkout
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
