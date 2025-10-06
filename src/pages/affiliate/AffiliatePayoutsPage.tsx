import React from "react";
import { DollarSign, Calendar, Download, TrendingUp } from "lucide-react";
import { Badge } from "../../components/ui/Badge";

const payouts = [
  {
    id: "1",
    amount: 2450,
    period: "November 2024",
    status: "paid",
    paidDate: "Dec 15, 2024",
    method: "Bank Transfer"
  },
  {
    id: "2",
    amount: 1850,
    period: "October 2024", 
    status: "paid",
    paidDate: "Nov 15, 2024",
    method: "PayPal"
  },
  {
    id: "3",
    amount: 3200,
    period: "September 2024",
    status: "paid", 
    paidDate: "Oct 15, 2024",
    method: "Bank Transfer"
  },
  {
    id: "4",
    amount: 1650,
    period: "December 2024",
    status: "pending",
    paidDate: "Jan 15, 2025",
    method: "Bank Transfer"
  }
];

const paymentMethods = [
  {
    type: "Bank Transfer",
    details: "•••• •••• •••• 4242",
    primary: true
  },
  {
    type: "PayPal",
    details: "sarah@techflow.com",
    primary: false
  }
];

export default function AffiliatePayoutsPage() {
  const totalEarnings = payouts.reduce((sum, payout) => sum + payout.amount, 0);
  const paidEarnings = payouts.filter(p => p.status === 'paid').reduce((sum, payout) => sum + payout.amount, 0);
  const pendingEarnings = payouts.filter(p => p.status === 'pending').reduce((sum, payout) => sum + payout.amount, 0);

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-monks-black mb-2">Payouts</h1>
          <p className="text-monks-gray">Track your affiliate earnings and payment history</p>
        </div>

        {/* Earnings Summary */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="bg-white rounded-3xl p-8 text-center">
            <DollarSign size={32} className="text-monks-accent mx-auto mb-4" />
            <div className="text-3xl font-bold text-monks-black mb-2">${totalEarnings.toLocaleString()}</div>
            <div className="text-monks-gray">Total Earnings</div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 text-center">
            <TrendingUp size={32} className="text-green-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-monks-black mb-2">${paidEarnings.toLocaleString()}</div>
            <div className="text-monks-gray">Paid Out</div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 text-center">
            <Calendar size={32} className="text-yellow-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-monks-black mb-2">${pendingEarnings.toLocaleString()}</div>
            <div className="text-monks-gray">Pending</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payout History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-monks-black">Payout History</h2>
                <button className="text-monks-accent hover:text-monks-black transition-colors duration-300 font-medium flex items-center gap-2">
                  <Download size={16} />
                  Export
                </button>
              </div>
              
              <div className="space-y-4">
                {payouts.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-6 bg-monks-light-gray rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-monks-accent/10 rounded-full flex items-center justify-center">
                        <DollarSign size={20} className="text-monks-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-monks-black">{payout.period}</div>
                        <div className="text-sm text-monks-gray">{payout.method}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold text-monks-black">${payout.amount.toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant={payout.status === 'paid' ? 'success' : 'warning'} size="sm">
                          {payout.status}
                        </Badge>
                        <span className="text-sm text-monks-gray">{payout.paidDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-6">Payment Methods</h3>
              <div className="space-y-4">
                {paymentMethods.map((method, i) => (
                  <div key={i} className="p-4 bg-monks-light-gray rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-monks-black">{method.type}</h4>
                      {method.primary && (
                        <Badge variant="accent" size="sm">Primary</Badge>
                      )}
                    </div>
                    <p className="text-sm text-monks-gray">{method.details}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
                Add Payment Method
              </button>
            </div>

            {/* Payout Schedule */}
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-6">Payout Schedule</h3>
              <div className="space-y-4">
                <div className="p-4 bg-monks-light-gray rounded-2xl">
                  <h4 className="font-medium text-monks-black mb-2">Monthly Payouts</h4>
                  <p className="text-sm text-monks-gray">
                    Payouts are processed on the 15th of each month for the previous month's earnings.
                  </p>
                </div>
                
                <div className="p-4 bg-monks-light-gray rounded-2xl">
                  <h4 className="font-medium text-monks-black mb-2">Minimum Payout</h4>
                  <p className="text-sm text-monks-gray">
                    $100 minimum required for payout processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}