import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, BarChart3 } from 'lucide-react';
import type { DecisionROICalculator, ROIInputField } from '../../types/decision.types';
import { ROICalculatorService } from '../../services/roi-calculator.service';

interface EnhancedROICalculatorProps {
  calculator: DecisionROICalculator;
  onCalculate?: (results: Record<string, number>) => void;
}

export function EnhancedROICalculator({ calculator, onCalculate }: EnhancedROICalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    calculator.input_fields.forEach(field => {
      initial[field.id] = field.default_value || '';
    });
    return initial;
  });

  const [showScenarios, setShowScenarios] = useState(false);
  const [showSensitivity, setShowSensitivity] = useState(false);

  const results = useMemo(() => {
    return ROICalculatorService.calculateROI(
      calculator.input_fields,
      calculator.calculation_formula,
      inputs
    );
  }, [calculator, inputs]);

  const visualizations = useMemo(() => {
    return ROICalculatorService.generateROIVisualizations(
      results,
      calculator.output_metrics,
      inputs
    );
  }, [results, calculator.output_metrics, inputs]);

  const scenarios = useMemo(() => {
    if (!showScenarios || !inputs.expected_improvement) return [];

    const improvementValues = [5, 10, 15, 20, 25, 30];
    return ROICalculatorService.generateScenarios(
      inputs,
      'expected_improvement',
      improvementValues
    );
  }, [inputs, showScenarios]);

  const scenarioResults = useMemo(() => {
    if (!showScenarios || scenarios.length === 0) return [];

    return ROICalculatorService.compareScenarios(
      scenarios,
      calculator.calculation_formula,
      calculator.input_fields
    );
  }, [scenarios, calculator, showScenarios]);

  const sensitivityAnalysis = useMemo(() => {
    if (!showSensitivity) return [];

    return ROICalculatorService.generateSensitivityAnalysis(
      inputs,
      'expected_improvement',
      calculator.calculation_formula,
      calculator.input_fields,
      20
    );
  }, [inputs, calculator, showSensitivity]);

  const handleInputChange = (fieldId: string, value: any) => {
    setInputs(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleCalculate = () => {
    if (onCalculate) {
      onCalculate(results);
    }
  };

  const renderInputField = (field: ROIInputField) => {
    const value = inputs[field.id];

    switch (field.type) {
      case 'number':
      case 'currency':
        return (
          <div className="relative">
            {field.type === 'currency' && (
              <DollarSign className="absolute left-3 top-3 text-monks-gray" size={18} />
            )}
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              min={field.min}
              max={field.max}
              className={`w-full ${field.type === 'currency' ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-lg border border-monks-gray/20 focus:ring-2 focus:ring-monks-accent focus:border-monks-accent transition-all duration-300`}
              placeholder={field.default_value ? String(field.default_value) : '0'}
            />
          </div>
        );

      case 'percentage':
        return (
          <div className="relative">
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              min={field.min || 0}
              max={field.max || 100}
              className="w-full pl-4 pr-10 py-3 rounded-lg border border-monks-gray/20 focus:ring-2 focus:ring-monks-accent focus:border-monks-accent transition-all duration-300"
              placeholder={field.default_value ? String(field.default_value) : '0'}
            />
            <span className="absolute right-3 top-3 text-monks-gray">%</span>
          </div>
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-monks-gray/20 focus:ring-2 focus:ring-monks-accent focus:border-monks-accent transition-all duration-300"
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  const formatMetric = (metricId: string, value: number) => {
    const metric = calculator.output_metrics.find(m => m.id === metricId);
    if (!metric) return String(value);
    return ROICalculatorService.formatMetricValue(value, metric.format);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-monks-gray/10 p-8">
        <h3 className="text-2xl font-bold text-monks-black mb-6">Input Values</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {calculator.input_fields.map(field => (
            <div key={field.id} className="space-y-2">
              <label className="block">
                <span className="text-sm font-medium text-monks-black">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
              {renderInputField(field)}
              {field.help_text && (
                <p className="text-xs text-monks-gray">{field.help_text}</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleCalculate}
          className="mt-6 bg-monks-accent text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent/90 transition-all duration-300 flex items-center gap-2"
        >
          <TrendingUp size={18} />
          Calculate ROI
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {calculator.output_metrics.map(metric => {
          const value = results[metric.id] || 0;
          const formatted = formatMetric(metric.id, value);

          return (
            <div
              key={metric.id}
              className="bg-gradient-to-br from-monks-accent to-monks-accent/80 text-white rounded-2xl p-6 space-y-2"
            >
              <div className="text-sm font-medium opacity-90">{metric.label}</div>
              <div className="text-3xl font-bold">{formatted}</div>
              {metric.description && (
                <div className="text-sm opacity-80">{metric.description}</div>
              )}
            </div>
          );
        })}
      </div>

      {visualizations.length > 0 && (
        <div className="bg-white rounded-2xl border border-monks-gray/10 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-monks-black">Visualizations</h3>
            <BarChart3 className="text-monks-accent" size={24} />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {visualizations.map((viz, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-lg font-semibold text-monks-black">{viz.title}</h4>
                <div className="space-y-2">
                  {viz.data.map((item, i) => {
                    const maxValue = Math.max(...viz.data.map(d => Math.abs(d.value)));
                    const percentage = maxValue > 0 ? (Math.abs(item.value) / maxValue) * 100 : 0;

                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-monks-gray">{item.label}</span>
                          <span className="font-semibold text-monks-black">
                            {formatMetric('currency', item.value)}
                          </span>
                        </div>
                        <div className="w-full bg-monks-light-gray rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.value >= 0 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={() => setShowScenarios(!showScenarios)}
          className="flex-1 bg-white text-monks-black border border-monks-gray/20 px-6 py-3 rounded-full font-medium hover:bg-monks-light-gray transition-all duration-300"
        >
          {showScenarios ? 'Hide' : 'Show'} Scenarios
        </button>
        <button
          onClick={() => setShowSensitivity(!showSensitivity)}
          className="flex-1 bg-white text-monks-black border border-monks-gray/20 px-6 py-3 rounded-full font-medium hover:bg-monks-light-gray transition-all duration-300"
        >
          {showSensitivity ? 'Hide' : 'Show'} Sensitivity Analysis
        </button>
      </div>

      {showScenarios && scenarioResults.length > 0 && (
        <div className="bg-white rounded-2xl border border-monks-gray/10 p-8">
          <h3 className="text-xl font-bold text-monks-black mb-6">Scenario Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-monks-gray/10">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-monks-black">
                    Scenario
                  </th>
                  {calculator.output_metrics.map(metric => (
                    <th
                      key={metric.id}
                      className="py-3 px-4 text-right text-sm font-semibold text-monks-black"
                    >
                      {metric.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-monks-gray/10">
                {scenarioResults.map((result, index) => (
                  <tr key={index} className="hover:bg-monks-light-gray/30 transition-colors duration-200">
                    <td className="py-3 px-4 text-sm text-monks-gray">
                      {result.scenario.description}
                    </td>
                    {calculator.output_metrics.map(metric => (
                      <td
                        key={metric.id}
                        className="py-3 px-4 text-sm font-medium text-monks-black text-right"
                      >
                        {formatMetric(metric.id, result.results[metric.id] || 0)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showSensitivity && sensitivityAnalysis.length > 0 && (
        <div className="bg-white rounded-2xl border border-monks-gray/10 p-8">
          <h3 className="text-xl font-bold text-monks-black mb-6">Sensitivity Analysis</h3>
          <div className="space-y-6">
            {calculator.output_metrics.map(metric => {
              const metricData = sensitivityAnalysis.map(item => ({
                label: item.label,
                value: item.results[metric.id] || 0,
              }));

              const maxValue = Math.max(...metricData.map(d => Math.abs(d.value)));

              return (
                <div key={metric.id} className="space-y-3">
                  <h4 className="text-sm font-semibold text-monks-black">{metric.label}</h4>
                  {metricData.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-16 text-sm text-monks-gray text-right">
                        {item.label}
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 bg-monks-light-gray rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-monks-accent rounded-full transition-all duration-500"
                            style={{
                              width: `${maxValue > 0 ? (Math.abs(item.value) / maxValue) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <div className="w-32 text-sm font-medium text-monks-black text-right">
                          {formatMetric(metric.id, item.value)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
