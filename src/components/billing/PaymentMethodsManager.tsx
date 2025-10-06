import { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2, Check, Loader2 } from 'lucide-react';
import { stripeService } from '../../services/stripe.service';
import { useAuth } from '../../contexts/AuthContext';

interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  isDefault: boolean;
}

export default function PaymentMethodsManager() {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState<string>('');

  useEffect(() => {
    if (user) {
      loadPaymentMethods();
    }
  }, [user]);

  const loadPaymentMethods = async () => {
    try {
      setLoading(true);
      const methods = await stripeService.getPaymentMethods(customerId);
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Failed to load payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (paymentMethodId: string) => {
    try {
      await stripeService.setDefaultPaymentMethod({
        customerId,
        paymentMethodId,
      });
      await loadPaymentMethods();
    } catch (error) {
      console.error('Failed to set default payment method:', error);
      alert('Failed to update default payment method');
    }
  };

  const handleRemove = async (paymentMethodId: string) => {
    if (!confirm('Are you sure you want to remove this payment method?')) {
      return;
    }

    try {
      await stripeService.removePaymentMethod(paymentMethodId);
      await loadPaymentMethods();
    } catch (error) {
      console.error('Failed to remove payment method:', error);
      alert('Failed to remove payment method');
    }
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Payment Methods</h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </button>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`bg-white border-2 rounded-xl p-6 transition-all ${
              method.isDefault ? 'border-blue-500' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 capitalize">
                      {method.card?.brand} •••• {method.card?.last4}
                    </p>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">
                    Expires {method.card?.exp_month}/{method.card?.exp_year}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="px-3 py-1.5 text-sm border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleRemove(method.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {paymentMethods.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
            <CreditCard className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 mb-4">No payment methods added yet</p>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Add Your First Payment Method
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
