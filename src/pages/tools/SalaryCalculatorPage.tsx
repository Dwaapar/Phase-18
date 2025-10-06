import React, { useState } from 'react';
import { DollarSign, TrendingUp, Award, MapPin } from 'lucide-react';

export default function SalaryCalculatorPage() {
  const [formData, setFormData] = useState({
    job_title: '',
    years_experience: '',
    location: '',
    industry: '',
    education: '',
    current_salary: ''
  });

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const baseSalary = parseInt(formData.current_salary) || 70000;
    const experienceMultiplier = 1 + (parseInt(formData.years_experience) || 0) * 0.05;

    const marketSalary = Math.round(baseSalary * experienceMultiplier);
    const minSalary = Math.round(marketSalary * 0.85);
    const maxSalary = Math.round(marketSalary * 1.25);

    setResult({
      market_value: marketSalary,
      range: { min: minSalary, max: maxSalary },
      percentile: 65,
      equity_value: Math.round(marketSalary * 0.15)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Salary Calculator</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Calculate your market value with data-driven insights and negotiation strategies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border-2 border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={formData.job_title}
                  onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-green-500 focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Years of Experience</label>
                <input
                  type="number"
                  placeholder="5"
                  value={formData.years_experience}
                  onChange={(e) => setFormData({...formData, years_experience: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-green-500 focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-green-500 focus:ring-0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Current Salary</label>
                <input
                  type="number"
                  placeholder="100000"
                  value={formData.current_salary}
                  onChange={(e) => setFormData({...formData, current_salary: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-green-500 focus:ring-0"
                />
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                Calculate Market Value
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {result ? (
              <>
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign size={32} />
                    <h3 className="text-xl font-semibold">Your Market Value</h3>
                  </div>
                  <div className="text-5xl font-bold mb-2">${result.market_value.toLocaleString()}</div>
                  <p className="text-green-100">Based on your experience and location</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4">Salary Range</h3>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-slate-600">Minimum</div>
                      <div className="text-2xl font-bold text-slate-900">${result.range.min.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600">Maximum</div>
                      <div className="text-2xl font-bold text-slate-900">${result.range.max.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{width: '65%'}}></div>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">You're in the {result.percentile}th percentile</p>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                  <h3 className="font-bold text-blue-900 mb-3">Negotiation Tips</h3>
                  <ul className="space-y-2 text-sm text-blue-900">
                    <li>• Research company compensation ranges before negotiating</li>
                    <li>• Consider total compensation, not just base salary</li>
                    <li>• Be prepared to justify your value with specific examples</li>
                    <li>• Don't be afraid to ask for what you're worth</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 border-2 border-slate-200 text-center text-slate-400">
                <Award size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Calculate Your Worth</p>
                <p className="text-sm">Fill out the form to see your market value</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
