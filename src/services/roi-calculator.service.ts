import type { ROIInputField, ROIOutputMetric } from '../types/decision.types';

export interface ROIScenario {
  id: string;
  name: string;
  description: string;
  inputs: Record<string, any>;
}

export interface ROIComparison {
  baseline: Record<string, number>;
  withProduct: Record<string, number>;
  improvement: Record<string, number>;
}

export interface ROIVisualization {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: Array<{ label: string; value: number }>;
  title: string;
}

export class ROICalculatorService {
  static evaluateFormula(
    formula: string,
    inputs: Record<string, any>
  ): number {
    let expression = formula;

    Object.entries(inputs).forEach(([key, value]) => {
      const numValue = Number(value) || 0;
      expression = expression.replace(new RegExp(`\\{${key}\\}`, 'g'), String(numValue));
    });

    try {
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
      const result = Function(`'use strict'; return (${sanitized})`)();
      return isFinite(result) ? result : 0;
    } catch (error) {
      console.error('Formula evaluation error:', error);
      return 0;
    }
  }

  static calculateROI(
    inputFields: ROIInputField[],
    formulaConfig: Record<string, any>,
    inputValues: Record<string, any>
  ): Record<string, number> {
    const results: Record<string, number> = {};

    Object.entries(formulaConfig).forEach(([metricId, formula]) => {
      if (typeof formula === 'string') {
        results[metricId] = this.evaluateFormula(formula, inputValues);
      }
    });

    return results;
  }

  static generateScenarios(
    baseInputs: Record<string, any>,
    variableField: string,
    range: number[]
  ): ROIScenario[] {
    return range.map((value, index) => ({
      id: `scenario_${index}`,
      name: `Scenario ${index + 1}`,
      description: `With ${variableField} = ${value}`,
      inputs: {
        ...baseInputs,
        [variableField]: value,
      },
    }));
  }

  static compareScenarios(
    scenarios: ROIScenario[],
    formulaConfig: Record<string, any>,
    inputFields: ROIInputField[]
  ): Array<{ scenario: ROIScenario; results: Record<string, number> }> {
    return scenarios.map(scenario => ({
      scenario,
      results: this.calculateROI(inputFields, formulaConfig, scenario.inputs),
    }));
  }

  static calculateBreakEvenPoint(
    initialInvestment: number,
    monthlyBenefit: number,
    monthlyCost: number
  ): number {
    const netMonthlyBenefit = monthlyBenefit - monthlyCost;

    if (netMonthlyBenefit <= 0) {
      return Infinity;
    }

    return Math.ceil(initialInvestment / netMonthlyBenefit);
  }

  static calculateTCO(
    initialCost: number,
    monthlyCost: number,
    implementationCost: number,
    trainingCost: number,
    maintenanceCost: number,
    yearsToCalculate: number
  ): {
    totalCost: number;
    breakdown: Record<string, number>;
    yearlyProjection: Array<{ year: number; cumulativeCost: number }>;
  } {
    const monthlyTotal = monthlyCost + maintenanceCost / 12;
    const totalMonthly = monthlyTotal * 12 * yearsToCalculate;
    const totalCost = initialCost + implementationCost + trainingCost + totalMonthly;

    const breakdown = {
      initial: initialCost,
      implementation: implementationCost,
      training: trainingCost,
      subscription: monthlyCost * 12 * yearsToCalculate,
      maintenance: maintenanceCost * yearsToCalculate,
    };

    const yearlyProjection = [];
    let cumulative = initialCost + implementationCost + trainingCost;

    for (let year = 1; year <= yearsToCalculate; year++) {
      cumulative += monthlyTotal * 12;
      yearlyProjection.push({ year, cumulativeCost: cumulative });
    }

    return { totalCost, breakdown, yearlyProjection };
  }

  static calculateProductivityGains(
    teamSize: number,
    hoursPerWeek: number,
    timeSavingsPercentage: number,
    hourlyRate: number
  ): {
    weeklyHoursSaved: number;
    monthlyHoursSaved: number;
    annualHoursSaved: number;
    annualCostSavings: number;
  } {
    const weeklyHours = teamSize * hoursPerWeek;
    const weeklyHoursSaved = (weeklyHours * timeSavingsPercentage) / 100;
    const monthlyHoursSaved = weeklyHoursSaved * 4.33;
    const annualHoursSaved = weeklyHoursSaved * 52;
    const annualCostSavings = annualHoursSaved * hourlyRate;

    return {
      weeklyHoursSaved,
      monthlyHoursSaved,
      annualHoursSaved,
      annualCostSavings,
    };
  }

  static calculateRevenueImpact(
    currentRevenue: number,
    revenueGrowthPercentage: number,
    conversionRateImprovement: number,
    averageDealSize: number,
    dealsPerMonth: number
  ): {
    projectedRevenue: number;
    revenueIncrease: number;
    additionalDealsPerMonth: number;
    annualRevenueIncrease: number;
  } {
    const baseIncrease = (currentRevenue * revenueGrowthPercentage) / 100;

    const currentMonthlyDeals = dealsPerMonth;
    const improvedConversionRate = 1 + conversionRateImprovement / 100;
    const additionalDealsPerMonth = currentMonthlyDeals * improvedConversionRate - currentMonthlyDeals;
    const conversionRevenue = additionalDealsPerMonth * averageDealSize;

    const monthlyRevenueIncrease = baseIncrease / 12 + conversionRevenue;
    const annualRevenueIncrease = monthlyRevenueIncrease * 12;
    const projectedRevenue = currentRevenue + annualRevenueIncrease;
    const revenueIncrease = annualRevenueIncrease;

    return {
      projectedRevenue,
      revenueIncrease,
      additionalDealsPerMonth,
      annualRevenueIncrease,
    };
  }

  static generateROIVisualizations(
    results: Record<string, number>,
    outputs: ROIOutputMetric[],
    inputs: Record<string, any>
  ): ROIVisualization[] {
    const visualizations: ROIVisualization[] = [];

    const roiPercentage = results.roi_percentage || 0;
    if (roiPercentage > 0) {
      visualizations.push({
        type: 'bar',
        data: [
          { label: 'Investment', value: results.annual_crm_cost || 0 },
          { label: 'Return', value: results.annual_revenue_increase || 0 },
        ],
        title: 'Investment vs Return',
      });
    }

    if (results.annual_revenue_increase && results.annual_crm_cost) {
      const benefit = results.annual_revenue_increase;
      const cost = results.annual_crm_cost;
      visualizations.push({
        type: 'pie',
        data: [
          { label: 'Net Benefit', value: Math.max(benefit - cost, 0) },
          { label: 'Cost', value: cost },
        ],
        title: 'Cost-Benefit Breakdown',
      });
    }

    if (results.payback_period !== undefined) {
      const months = Math.ceil(results.payback_period / 30);
      const monthlyData = [];

      for (let i = 1; i <= Math.min(months + 3, 24); i++) {
        const investment = results.annual_crm_cost ? (results.annual_crm_cost / 12) * i : 0;
        const returns = results.annual_revenue_increase ? (results.annual_revenue_increase / 12) * i : 0;

        monthlyData.push({ label: `Month ${i}`, value: returns - investment });
      }

      visualizations.push({
        type: 'line',
        data: monthlyData,
        title: 'Cumulative ROI Over Time',
      });
    }

    return visualizations;
  }

  static generateComparisonReport(
    product1Results: Record<string, number>,
    product2Results: Record<string, number>,
    product1Name: string,
    product2Name: string
  ): {
    winner: string;
    differences: Record<string, { product1: number; product2: number; difference: number }>;
    recommendation: string;
  } {
    const differences: Record<string, { product1: number; product2: number; difference: number }> = {};

    const allMetrics = new Set([
      ...Object.keys(product1Results),
      ...Object.keys(product2Results),
    ]);

    allMetrics.forEach(metric => {
      const val1 = product1Results[metric] || 0;
      const val2 = product2Results[metric] || 0;

      differences[metric] = {
        product1: val1,
        product2: val2,
        difference: val1 - val2,
      };
    });

    const roi1 = product1Results.roi_percentage || 0;
    const roi2 = product2Results.roi_percentage || 0;

    const winner = roi1 > roi2 ? product1Name : roi2 > roi1 ? product2Name : 'Tie';

    let recommendation = '';
    if (winner === 'Tie') {
      recommendation = `Both ${product1Name} and ${product2Name} offer similar ROI. Consider other factors like features, ease of use, and support.`;
    } else {
      const betterROI = Math.max(roi1, roi2);
      const lowerROI = Math.min(roi1, roi2);
      const difference = betterROI - lowerROI;

      recommendation = `${winner} offers ${difference.toFixed(1)}% better ROI, making it the financially superior choice based on your inputs.`;
    }

    return { winner, differences, recommendation };
  }

  static formatMetricValue(value: number, format: string): string {
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
        if (value < 30) {
          return `${Math.ceil(value)} days`;
        } else if (value < 365) {
          const months = Math.ceil(value / 30);
          return `${months} month${months !== 1 ? 's' : ''}`;
        } else {
          const years = (value / 365).toFixed(1);
          return `${years} year${years !== '1.0' ? 's' : ''}`;
        }

      case 'number':
        return new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(value);

      default:
        return String(value);
    }
  }

  static generateSensitivityAnalysis(
    baseInputs: Record<string, any>,
    variableField: string,
    formulaConfig: Record<string, any>,
    inputFields: ROIInputField[],
    variationPercentage: number = 20
  ): Array<{
    label: string;
    inputs: Record<string, any>;
    results: Record<string, number>;
  }> {
    const baseValue = Number(baseInputs[variableField]) || 0;
    const variations = [
      -variationPercentage,
      -variationPercentage / 2,
      0,
      variationPercentage / 2,
      variationPercentage,
    ];

    return variations.map(variation => {
      const adjustedValue = baseValue * (1 + variation / 100);
      const inputs = {
        ...baseInputs,
        [variableField]: adjustedValue,
      };

      return {
        label: `${variation >= 0 ? '+' : ''}${variation}%`,
        inputs,
        results: this.calculateROI(inputFields, formulaConfig, inputs),
      };
    });
  }
}
