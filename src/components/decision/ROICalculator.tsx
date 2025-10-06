import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Clock, BarChart } from 'lucide-react';
import type { DecisionROICalculator, ROIInputField } from '../../types/decision.types';

interface ROICalculatorProps {
  calculator: DecisionROICalculator;
  onCalculate?: (inputs: Record<string, any>, results: Record<string, any>) => void;
}

export default function ROICalculator({ calculator, onCalculate }: ROICalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [results, setResults] = useState<Record<string, any> | null>(null);

  const handleInputChange = (fieldId: string, value: any) => {
    setInputs((prev) => ({ ...prev, [fieldId]: value }));
  };

  const calculateResults = () => {
    const calculatedResults: Record<string, any> = {};

    calculator.output_metrics.forEach((metric) => {
      const formula = calculator.calculation_formula[metric.id];
      if (formula) {
        try {
          const result = evaluateFormula(formula, inputs);
          calculatedResults[metric.id] = result;
        } catch (error) {
          console.error(`Error calculating ${metric.id}:`, error);
          calculatedResults[metric.id] = 0;
        }
      }
    });

    setResults(calculatedResults);
    onCalculate?.(inputs, calculatedResults);
  };

  const evaluateFormula = (formula: any, data: Record<string, any>): number => {
    if (typeof formula === 'string') {
      let expression = formula;
      Object.keys(data).forEach((key) => {
        expression = expression.replace(new RegExp(`{${key}}`, 'g'), String(data[key] || 0));
      });

      try {
        return eval(expression);
      } catch {
        return 0;
      }
    }
    return 0;
  };

  const formatValue = (value: number, format: string): string => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'time':
        if (value < 60) return `${Math.round(value)} mins`;
        if (value < 1440) return `${Math.round(value / 60)} hours`;
        return `${Math.round(value / 1440)} days`;
      default:
        return value.toLocaleString();
    }
  };

  const getIcon = (format: string) => {
    switch (format) {
      case 'currency':
        return <DollarSign className="text-green-500" size={24} />;
      case 'percentage':
        return <TrendingUp className="text-blue-500" size={24} />;
      case 'time':
        return <Clock className="text-orange-500" size={24} />;
      default:
        return <BarChart className="text-purple-500" size={24} />;
    }
  };

  const renderInputField = (field: ROIInputField) => {
    const value = inputs[field.id] ?? field.default_value ?? '';

    if (field.type === 'select' && field.options) {
      return (
        <select
          value={value}
          onChange={(e) => handleInputChange(field.id, e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={field.required}
        >
          <option value="">Select...</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="number"
        value={value}
        onChange={(e) => handleInputChange(field.id, parseFloat(e.target.value) || 0)}
        min={field.min}
        max={field.max}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        required={field.required}
        placeholder={field.type === 'currency' ? '$0' : '0'}
      />
    );
  };

  const isFormValid = calculator.input_fields
    .filter((f) => f.required)
    .every((f) => inputs[f.id] !== undefined && inputs[f.id] !== '');

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Calculator size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{calculator.title}</h2>
            <p className="text-white/90 mt-2">{calculator.description}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Input Your Data</h3>
            {calculator.input_fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderInputField(field)}
                {field.help_text && (
                  <p className="text-sm text-gray-500 mt-1">{field.help_text}</p>
                )}
              </div>
            ))}

            <button
              onClick={calculateResults}
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Calculator size={20} />
              Calculate ROI
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Results</h3>
            {!results ? (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <BarChart className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">
                  Fill in the fields and click Calculate to see your ROI
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {calculator.output_metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        {getIcon(metric.format)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">
                          {metric.label}
                        </h4>
                        <p className="text-3xl font-bold text-gray-900">
                          {formatValue(results[metric.id] || 0, metric.format)}
                        </p>
                        {metric.description && (
                          <p className="text-sm text-gray-500 mt-2">{metric.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> These calculations are estimates based on your inputs.
                    Actual results may vary depending on your specific circumstances.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
