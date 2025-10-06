import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useROICalculator } from '../../hooks/useDecision';
import { DecisionService } from '../../services/decision.service';
import ROICalculator from '../../components/decision/ROICalculator';
import { Loader } from 'lucide-react';

export default function ROICalculatorPage() {
  const { slug } = useParams<{ slug: string }>();
  const { calculator, loading, error } = useROICalculator(slug || '');

  useEffect(() => {
    if (calculator) {
      const sessionId = `session_${Date.now()}`;
      DecisionService.trackAnalyticsEvent(
        'calculator',
        calculator.id,
        'view',
        sessionId
      );
    }
  }, [calculator]);

  const handleCalculate = (inputs: Record<string, any>, results: Record<string, any>) => {
    if (calculator) {
      const sessionId = `session_${Date.now()}`;
      DecisionService.trackAnalyticsEvent(
        'calculator',
        calculator.id,
        'complete',
        sessionId,
        { inputs, results }
      );
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (error || !calculator) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculator Not Found</h2>
          <p className="text-gray-600">The ROI calculator you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <ROICalculator calculator={calculator} onCalculate={handleCalculate} />

        <div className="mt-12 bg-white rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Calculator</h3>
          <p className="text-gray-700 mb-6">
            This ROI calculator helps you understand the potential return on investment for your business decisions.
            Enter your data above to see customized results based on your specific situation.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Accurate Estimates</h4>
              <p className="text-sm text-gray-700">
                Our formulas are based on industry benchmarks and real-world data to provide accurate projections.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Instant Results</h4>
              <p className="text-sm text-gray-700">
                Get your ROI calculations immediately with detailed breakdowns of each metric.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Make Better Decisions</h4>
              <p className="text-sm text-gray-700">
                Use data-driven insights to justify your investments and make confident business decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
