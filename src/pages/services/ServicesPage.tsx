import React, { useState } from 'react';
import { Check, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { services } from '../../data/productsData';
import { AutomationService } from '../../types';

export default function ServicesPage() {
  const [selectedTier, setSelectedTier] = useState<'all' | 'quick_start' | 'professional' | 'enterprise'>('all');

  const filteredServices = selectedTier === 'all'
    ? services
    : services.filter(s => s.tier === selectedTier);

  const formatPrice = (price: number) => {
    return `$${(price / 100).toLocaleString()}`;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'quick_start':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'professional':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'enterprise':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case 'quick_start':
        return 'Quick Start';
      case 'professional':
        return 'Professional';
      case 'enterprise':
        return 'Enterprise';
      default:
        return tier;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Custom Automation Services</span>
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Automation Services
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From quick deployments to enterprise transformations, we build automation solutions tailored to your business
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {[
            { value: 'all', label: 'All Services' },
            { value: 'quick_start', label: 'Quick Start' },
            { value: 'professional', label: 'Professional' },
            { value: 'enterprise', label: 'Enterprise' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedTier(option.value as any)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTier === option.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-8">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getTierColor(service.tier)}`}>
                  {getTierName(service.tier)}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-slate-600 mb-6">
                  {service.description}
                </p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-slate-900">
                    {formatPrice(service.price)}
                  </span>
                  <span className="text-slate-600">one-time</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                  <Clock className="w-4 h-4" />
                  <span>{service.estimatedDelivery}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="px-8 py-6 bg-slate-50 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Delivery Phases:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.deliveryPhases.map((phase, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-white border border-slate-200 text-slate-600 rounded"
                    >
                      {phase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Something Custom?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Have a unique automation challenge? Let's talk about building a custom solution for your business.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Schedule a Consultation
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Fast Delivery</h3>
            <p className="text-slate-600">
              Quick Start services deployed in 3-5 days, Professional in 2-4 weeks
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Proven Results</h3>
            <p className="text-slate-600">
              Average 40% time savings and 60% reduction in manual errors
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Expert Team</h3>
            <p className="text-slate-600">
              Certified automation experts with 10+ years of experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
