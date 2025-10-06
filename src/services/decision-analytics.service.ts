import type {
  UserDecisionHistory,
  DecisionAnalytics,
  AnalyticsEventType,
  AnalyticsEntityType,
} from '../types/decision.types';

export interface DecisionInsight {
  type: 'trend' | 'pattern' | 'recommendation' | 'milestone';
  title: string;
  description: string;
  data?: Record<string, any>;
  actionable?: boolean;
  action?: string;
}

export interface DecisionMetrics {
  totalDecisions: number;
  quizzesCompleted: number;
  comparisonsViewed: number;
  guidesRead: number;
  bookmarkedItems: number;
  averageTimePerDecision: number;
  mostUsedCategory: string;
  decisionSuccessRate: number;
}

export interface CategoryAnalytics {
  categoryId: string;
  categoryName: string;
  visits: number;
  decisions: number;
  averageConfidence: number;
  popularProducts: Array<{ productId: string; count: number }>;
}

export interface TimeSeriesData {
  date: string;
  count: number;
  eventType?: string;
}

export class DecisionAnalyticsService {
  static calculateMetrics(history: UserDecisionHistory[]): DecisionMetrics {
    const quizzesCompleted = history.filter(h => h.decision_type === 'quiz').length;
    const comparisonsViewed = history.filter(h => h.decision_type === 'comparison').length;
    const guidesRead = history.filter(h => h.decision_type === 'guide').length;
    const bookmarkedItems = history.filter(h => h.is_bookmarked).length;

    const categoryCount: Record<string, number> = {};
    history.forEach(h => {
      const categoryId = h.quiz_response?.quiz?.category_id ||
                        h.comparison?.category_id ||
                        h.guide?.category_id;
      if (categoryId) {
        categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1;
      }
    });

    const mostUsedCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

    const decisionsWithProducts = history.filter(h => h.selected_product_id).length;
    const decisionSuccessRate = history.length > 0
      ? (decisionsWithProducts / history.length) * 100
      : 0;

    return {
      totalDecisions: history.length,
      quizzesCompleted,
      comparisonsViewed,
      guidesRead,
      bookmarkedItems,
      averageTimePerDecision: 0,
      mostUsedCategory,
      decisionSuccessRate,
    };
  }

  static generateInsights(
    history: UserDecisionHistory[],
    metrics: DecisionMetrics
  ): DecisionInsight[] {
    const insights: DecisionInsight[] = [];

    if (metrics.totalDecisions === 0) {
      insights.push({
        type: 'recommendation',
        title: 'Start Your Decision Journey',
        description: 'Take your first quiz to get personalized product recommendations.',
        actionable: true,
        action: 'Take a Quiz',
      });
      return insights;
    }

    if (metrics.totalDecisions >= 5) {
      insights.push({
        type: 'milestone',
        title: 'Decision Maker Achievement',
        description: `You've completed ${metrics.totalDecisions} decisions! You're building great decision-making habits.`,
      });
    }

    if (metrics.quizzesCompleted >= 3) {
      const categoryPreference = this.identifyCategoryPreference(history);
      if (categoryPreference) {
        insights.push({
          type: 'trend',
          title: 'Category Focus Detected',
          description: `You're exploring ${categoryPreference} solutions. We have more resources in this category.`,
          data: { category: categoryPreference },
          actionable: true,
          action: 'Explore More',
        });
      }
    }

    if (metrics.bookmarkedItems === 0 && metrics.totalDecisions >= 3) {
      insights.push({
        type: 'recommendation',
        title: 'Bookmark Your Favorites',
        description: 'Save important decisions for easy reference later by bookmarking them.',
        actionable: true,
        action: 'Learn How',
      });
    }

    const recentDecisions = history.slice(0, 5);
    const hasCompletedDecisions = recentDecisions.some(h => h.selected_product_id);
    if (!hasCompletedDecisions && metrics.totalDecisions >= 2) {
      insights.push({
        type: 'pattern',
        title: 'Complete Your Decisions',
        description: 'Select a product from your recommendations to track your decision outcomes.',
        actionable: true,
        action: 'Review Recommendations',
      });
    }

    if (metrics.decisionSuccessRate > 70) {
      insights.push({
        type: 'trend',
        title: 'Strong Decision Closure',
        description: `${metrics.decisionSuccessRate.toFixed(0)}% of your decisions result in a product selection. Great job!`,
      });
    }

    const daysSinceLastDecision = this.getDaysSinceLastDecision(history);
    if (daysSinceLastDecision > 14) {
      insights.push({
        type: 'recommendation',
        title: 'Come Back Soon',
        description: `It's been ${daysSinceLastDecision} days since your last decision. New products and guides are available!`,
        actionable: true,
        action: 'Browse New Content',
      });
    }

    return insights;
  }

  private static identifyCategoryPreference(history: UserDecisionHistory[]): string | null {
    const categoryCount: Record<string, number> = {};

    history.forEach(h => {
      const categoryName = h.quiz_response?.quiz?.category?.name ||
                          h.comparison?.category?.name ||
                          h.guide?.category?.name;
      if (categoryName) {
        categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
      }
    });

    const entries = Object.entries(categoryCount);
    if (entries.length === 0) return null;

    entries.sort((a, b) => b[1] - a[1]);
    const [topCategory, topCount] = entries[0];

    if (topCount >= 2) {
      return topCategory;
    }

    return null;
  }

  private static getDaysSinceLastDecision(history: UserDecisionHistory[]): number {
    if (history.length === 0) return 0;

    const sortedHistory = [...history].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const lastDecision = sortedHistory[0];
    const lastDate = new Date(lastDecision.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }

  static analyzeDecisionPatterns(history: UserDecisionHistory[]): {
    preferredDecisionType: string;
    averageDecisionTime: string;
    topProducts: Array<{ productId: string; productName: string; count: number }>;
    decisionsByDay: Record<string, number>;
  } {
    const typeCount: Record<string, number> = {};
    history.forEach(h => {
      typeCount[h.decision_type] = (typeCount[h.decision_type] || 0) + 1;
    });

    const preferredDecisionType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'quiz';

    const productCount: Record<string, { name: string; count: number }> = {};
    history.forEach(h => {
      if (h.selected_product_id && h.selected_product) {
        const id = h.selected_product_id;
        if (!productCount[id]) {
          productCount[id] = { name: h.selected_product.name, count: 0 };
        }
        productCount[id].count++;
      }
    });

    const topProducts = Object.entries(productCount)
      .map(([productId, data]) => ({
        productId,
        productName: data.name,
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const decisionsByDay: Record<string, number> = {};
    history.forEach(h => {
      const date = new Date(h.created_at).toISOString().split('T')[0];
      decisionsByDay[date] = (decisionsByDay[date] || 0) + 1;
    });

    return {
      preferredDecisionType,
      averageDecisionTime: 'N/A',
      topProducts,
      decisionsByDay,
    };
  }

  static generateTimeSeriesData(
    analytics: DecisionAnalytics[],
    days: number = 30
  ): TimeSeriesData[] {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const dateCounts: Record<string, number> = {};

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      dateCounts[dateStr] = 0;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    analytics.forEach(event => {
      const dateStr = new Date(event.created_at).toISOString().split('T')[0];
      if (dateCounts[dateStr] !== undefined) {
        dateCounts[dateStr]++;
      }
    });

    return Object.entries(dateCounts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  static calculateConversionFunnel(analytics: DecisionAnalytics[]): {
    views: number;
    starts: number;
    completes: number;
    viewToStartRate: number;
    startToCompleteRate: number;
    overallConversionRate: number;
  } {
    const views = analytics.filter(a => a.event_type === 'view').length;
    const starts = analytics.filter(a => a.event_type === 'start').length;
    const completes = analytics.filter(a => a.event_type === 'complete').length;

    const viewToStartRate = views > 0 ? (starts / views) * 100 : 0;
    const startToCompleteRate = starts > 0 ? (completes / starts) * 100 : 0;
    const overallConversionRate = views > 0 ? (completes / views) * 100 : 0;

    return {
      views,
      starts,
      completes,
      viewToStartRate,
      startToCompleteRate,
      overallConversionRate,
    };
  }

  static analyzeQuizPerformance(
    quizId: string,
    analytics: DecisionAnalytics[]
  ): {
    totalAttempts: number;
    completionRate: number;
    averageScore: number;
    dropOffPoints: Array<{ questionId: string; dropOffRate: number }>;
  } {
    const quizAnalytics = analytics.filter(
      a => a.entity_type === 'quiz' && a.entity_id === quizId
    );

    const starts = quizAnalytics.filter(a => a.event_type === 'start').length;
    const completes = quizAnalytics.filter(a => a.event_type === 'complete').length;
    const abandons = quizAnalytics.filter(a => a.event_type === 'abandon').length;

    const completionRate = starts > 0 ? (completes / starts) * 100 : 0;

    const scores = quizAnalytics
      .filter(a => a.event_type === 'complete' && a.metadata?.score)
      .map(a => a.metadata.score as number);

    const averageScore = scores.length > 0
      ? scores.reduce((sum, s) => sum + s, 0) / scores.length
      : 0;

    const questionAnalytics = analytics.filter(a => a.entity_type === 'question');
    const questionDropOffs: Record<string, { views: number; abandons: number }> = {};

    questionAnalytics.forEach(a => {
      if (!questionDropOffs[a.entity_id]) {
        questionDropOffs[a.entity_id] = { views: 0, abandons: 0 };
      }

      if (a.event_type === 'view') {
        questionDropOffs[a.entity_id].views++;
      } else if (a.event_type === 'abandon') {
        questionDropOffs[a.entity_id].abandons++;
      }
    });

    const dropOffPoints = Object.entries(questionDropOffs)
      .map(([questionId, data]) => ({
        questionId,
        dropOffRate: data.views > 0 ? (data.abandons / data.views) * 100 : 0,
      }))
      .filter(d => d.dropOffRate > 20)
      .sort((a, b) => b.dropOffRate - a.dropOffRate);

    return {
      totalAttempts: starts,
      completionRate,
      averageScore,
      dropOffPoints,
    };
  }

  static exportDecisionHistory(history: UserDecisionHistory[]): string {
    const lines: string[] = [];

    lines.push('Decision History Export');
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push(`Total Decisions: ${history.length}`);
    lines.push('');
    lines.push('Date,Type,Category,Selected Product,Bookmarked');
    lines.push('');

    history.forEach(decision => {
      const date = new Date(decision.created_at).toLocaleDateString();
      const type = decision.decision_type;
      const category = decision.quiz_response?.quiz?.category?.name ||
                       decision.comparison?.category?.name ||
                       decision.guide?.category?.name ||
                       'N/A';
      const product = decision.selected_product?.name || 'None';
      const bookmarked = decision.is_bookmarked ? 'Yes' : 'No';

      lines.push(`${date},${type},${category},${product},${bookmarked}`);
    });

    return lines.join('\n');
  }

  static generateComprehensiveReport(
    history: UserDecisionHistory[],
    analytics: DecisionAnalytics[]
  ): {
    summary: string;
    metrics: DecisionMetrics;
    insights: DecisionInsight[];
    patterns: ReturnType<typeof DecisionAnalyticsService.analyzeDecisionPatterns>;
    funnel: ReturnType<typeof DecisionAnalyticsService.calculateConversionFunnel>;
  } {
    const metrics = this.calculateMetrics(history);
    const insights = this.generateInsights(history, metrics);
    const patterns = this.analyzeDecisionPatterns(history);
    const funnel = this.calculateConversionFunnel(analytics);

    const summary = `
You have completed ${metrics.totalDecisions} decisions across ${metrics.quizzesCompleted} quizzes,
${metrics.comparisonsViewed} comparisons, and ${metrics.guidesRead} guides.
Your decision success rate is ${metrics.decisionSuccessRate.toFixed(1)}%,
and you've bookmarked ${metrics.bookmarkedItems} items for future reference.
    `.trim();

    return {
      summary,
      metrics,
      insights,
      patterns,
      funnel,
    };
  }
}
