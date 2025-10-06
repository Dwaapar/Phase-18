export interface ABTestVariant {
  id: string;
  name: string;
  description: string;
  weight: number;
  isControl: boolean;
  config: Record<string, any>;
}

export interface ABTest {
  id: string;
  name: string;
  entityType: 'quiz' | 'question' | 'recommendation';
  entityId: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  variants: ABTestVariant[];
  startDate?: Date;
  endDate?: Date;
  targetSampleSize?: number;
  metrics: string[];
}

export interface ABTestResult {
  variantId: string;
  impressions: number;
  conversions: number;
  conversionRate: number;
  averageScore: number;
  completionRate: number;
  averageTimeSeconds: number;
}

export interface ABTestAnalysis {
  testId: string;
  results: Record<string, ABTestResult>;
  winner: string | null;
  confidence: number;
  recommendation: string;
}

export class ABTestingService {
  private static readonly STORAGE_KEY = 'ab_test_assignments';

  static assignVariant(test: ABTest, sessionId: string): ABTestVariant {
    const existingAssignment = this.getExistingAssignment(test.id, sessionId);
    if (existingAssignment) {
      const variant = test.variants.find(v => v.id === existingAssignment);
      if (variant) return variant;
    }

    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    const random = Math.random() * totalWeight;
    let cumulativeWeight = 0;

    for (const variant of test.variants) {
      cumulativeWeight += variant.weight;
      if (random <= cumulativeWeight) {
        this.saveAssignment(test.id, sessionId, variant.id);
        return variant;
      }
    }

    const defaultVariant = test.variants.find(v => v.isControl) || test.variants[0];
    this.saveAssignment(test.id, sessionId, defaultVariant.id);
    return defaultVariant;
  }

  private static getExistingAssignment(testId: string, sessionId: string): string | null {
    try {
      const assignments = localStorage.getItem(this.STORAGE_KEY);
      if (!assignments) return null;

      const parsed = JSON.parse(assignments);
      return parsed[`${testId}_${sessionId}`] || null;
    } catch {
      return null;
    }
  }

  private static saveAssignment(testId: string, sessionId: string, variantId: string): void {
    try {
      const assignments = localStorage.getItem(this.STORAGE_KEY);
      const parsed = assignments ? JSON.parse(assignments) : {};
      parsed[`${testId}_${sessionId}`] = variantId;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(parsed));
    } catch (error) {
      console.error('Failed to save A/B test assignment:', error);
    }
  }

  static trackImpression(testId: string, variantId: string, sessionId: string): void {
    const event = {
      testId,
      variantId,
      sessionId,
      eventType: 'impression',
      timestamp: Date.now(),
    };
    this.sendAnalyticsEvent(event);
  }

  static trackConversion(
    testId: string,
    variantId: string,
    sessionId: string,
    metadata?: Record<string, any>
  ): void {
    const event = {
      testId,
      variantId,
      sessionId,
      eventType: 'conversion',
      timestamp: Date.now(),
      metadata,
    };
    this.sendAnalyticsEvent(event);
  }

  static trackCompletion(
    testId: string,
    variantId: string,
    sessionId: string,
    timeSeconds: number,
    score?: number
  ): void {
    const event = {
      testId,
      variantId,
      sessionId,
      eventType: 'completion',
      timestamp: Date.now(),
      timeSeconds,
      score,
    };
    this.sendAnalyticsEvent(event);
  }

  private static sendAnalyticsEvent(event: Record<string, any>): void {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_event', event);
    }
  }

  static calculateResults(
    test: ABTest,
    eventData: Array<{
      variantId: string;
      eventType: string;
      timeSeconds?: number;
      score?: number;
    }>
  ): Record<string, ABTestResult> {
    const results: Record<string, ABTestResult> = {};

    test.variants.forEach(variant => {
      const variantEvents = eventData.filter(e => e.variantId === variant.id);

      const impressions = variantEvents.filter(e => e.eventType === 'impression').length;
      const conversions = variantEvents.filter(e => e.eventType === 'conversion').length;
      const completions = variantEvents.filter(e => e.eventType === 'completion');

      const conversionRate = impressions > 0 ? (conversions / impressions) * 100 : 0;
      const completionRate = impressions > 0 ? (completions.length / impressions) * 100 : 0;

      const totalTime = completions.reduce((sum, e) => sum + (e.timeSeconds || 0), 0);
      const averageTimeSeconds = completions.length > 0 ? totalTime / completions.length : 0;

      const scores = completions.map(e => e.score || 0).filter(s => s > 0);
      const averageScore = scores.length > 0
        ? scores.reduce((sum, s) => sum + s, 0) / scores.length
        : 0;

      results[variant.id] = {
        variantId: variant.id,
        impressions,
        conversions,
        conversionRate,
        averageScore,
        completionRate,
        averageTimeSeconds,
      };
    });

    return results;
  }

  static analyzeTest(
    test: ABTest,
    results: Record<string, ABTestResult>
  ): ABTestAnalysis {
    const controlVariant = test.variants.find(v => v.isControl);
    if (!controlVariant) {
      return {
        testId: test.id,
        results,
        winner: null,
        confidence: 0,
        recommendation: 'No control variant defined for this test.',
      };
    }

    const controlResults = results[controlVariant.id];
    let bestVariant = controlVariant;
    let bestScore = this.calculateVariantScore(controlResults);

    test.variants.forEach(variant => {
      if (variant.id === controlVariant.id) return;

      const variantResults = results[variant.id];
      const variantScore = this.calculateVariantScore(variantResults);

      if (variantScore > bestScore) {
        bestScore = variantScore;
        bestVariant = variant;
      }
    });

    const winner = bestVariant.id !== controlVariant.id ? bestVariant.id : null;

    const confidence = this.calculateStatisticalConfidence(
      results[controlVariant.id],
      results[bestVariant.id]
    );

    const recommendation = this.generateRecommendation(
      test,
      results,
      winner,
      confidence,
      controlVariant,
      bestVariant
    );

    return {
      testId: test.id,
      results,
      winner,
      confidence,
      recommendation,
    };
  }

  private static calculateVariantScore(result: ABTestResult): number {
    return (
      result.conversionRate * 0.4 +
      result.completionRate * 0.3 +
      result.averageScore * 0.3
    );
  }

  private static calculateStatisticalConfidence(
    controlResult: ABTestResult,
    variantResult: ABTestResult
  ): number {
    const minSampleSize = 30;

    if (
      controlResult.impressions < minSampleSize ||
      variantResult.impressions < minSampleSize
    ) {
      return 0;
    }

    const p1 = controlResult.conversionRate / 100;
    const p2 = variantResult.conversionRate / 100;
    const n1 = controlResult.impressions;
    const n2 = variantResult.impressions;

    const pooledP = (p1 * n1 + p2 * n2) / (n1 + n2);
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / n1 + 1 / n2));

    if (se === 0) return 0;

    const zScore = Math.abs(p2 - p1) / se;

    const confidence = this.zScoreToConfidence(zScore);
    return Math.round(confidence * 100);
  }

  private static zScoreToConfidence(zScore: number): number {
    if (zScore < 1.645) return 0.9;
    if (zScore < 1.96) return 0.95;
    if (zScore < 2.576) return 0.99;
    return 0.999;
  }

  private static generateRecommendation(
    test: ABTest,
    results: Record<string, ABTestResult>,
    winner: string | null,
    confidence: number,
    controlVariant: ABTestVariant,
    bestVariant: ABTestVariant
  ): string {
    if (!winner) {
      return 'The control variant is performing best. No changes recommended at this time.';
    }

    const winnerResults = results[bestVariant.id];
    const controlResults = results[controlVariant.id];

    const conversionImprovement =
      ((winnerResults.conversionRate - controlResults.conversionRate) /
        controlResults.conversionRate) *
      100;

    if (confidence < 90) {
      return `Variant "${bestVariant.name}" shows promise with ${conversionImprovement.toFixed(1)}% improvement, but needs more data for statistical significance (current confidence: ${confidence}%).`;
    }

    if (confidence >= 95) {
      return `Strong recommendation: Implement variant "${bestVariant.name}". It shows ${conversionImprovement.toFixed(1)}% improvement with ${confidence}% confidence.`;
    }

    return `Moderate recommendation: Consider implementing variant "${bestVariant.name}". It shows ${conversionImprovement.toFixed(1)}% improvement with ${confidence}% confidence.`;
  }

  static createQuestionVariant(
    questionText: string,
    options: Array<{ text: string; value: string }>,
    variantName: string
  ): ABTestVariant {
    return {
      id: `variant_${Date.now()}_${Math.random()}`,
      name: variantName,
      description: `Question variant: ${variantName}`,
      weight: 1,
      isControl: false,
      config: {
        questionText,
        options,
      },
    };
  }

  static createRecommendationVariant(
    algorithm: string,
    config: Record<string, any>,
    variantName: string
  ): ABTestVariant {
    return {
      id: `variant_${Date.now()}_${Math.random()}`,
      name: variantName,
      description: `Recommendation algorithm: ${algorithm}`,
      weight: 1,
      isControl: false,
      config: {
        algorithm,
        ...config,
      },
    };
  }

  static shouldStopTest(analysis: ABTestAnalysis, minSampleSize: number = 100): boolean {
    const totalImpressions = Object.values(analysis.results).reduce(
      (sum, r) => sum + r.impressions,
      0
    );

    if (totalImpressions < minSampleSize) {
      return false;
    }

    if (analysis.confidence >= 95 && analysis.winner) {
      return true;
    }

    if (totalImpressions > minSampleSize * 10 && analysis.confidence < 80) {
      return true;
    }

    return false;
  }

  static exportTestResults(test: ABTest, analysis: ABTestAnalysis): string {
    const lines: string[] = [];

    lines.push(`A/B Test Results: ${test.name}`);
    lines.push(`Test ID: ${test.id}`);
    lines.push(`Status: ${test.status}`);
    lines.push('');
    lines.push('Variant Performance:');
    lines.push('');

    test.variants.forEach(variant => {
      const result = analysis.results[variant.id];
      lines.push(`${variant.name}${variant.isControl ? ' (Control)' : ''}:`);
      lines.push(`  Impressions: ${result.impressions}`);
      lines.push(`  Conversions: ${result.conversions}`);
      lines.push(`  Conversion Rate: ${result.conversionRate.toFixed(2)}%`);
      lines.push(`  Completion Rate: ${result.completionRate.toFixed(2)}%`);
      lines.push(`  Average Score: ${result.averageScore.toFixed(2)}`);
      lines.push(`  Average Time: ${result.averageTimeSeconds.toFixed(0)}s`);
      lines.push('');
    });

    lines.push(`Winner: ${analysis.winner || 'None (control is best)'}`);
    lines.push(`Statistical Confidence: ${analysis.confidence}%`);
    lines.push('');
    lines.push('Recommendation:');
    lines.push(analysis.recommendation);

    return lines.join('\n');
  }
}
