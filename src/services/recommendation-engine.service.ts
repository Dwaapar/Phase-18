import type {
  DecisionProduct,
  DecisionQuestion,
  QuizRecommendation,
} from '../types/decision.types';

export interface ScoringWeight {
  category: string;
  weight: number;
}

export interface RecommendationConfig {
  minScore?: number;
  maxResults?: number;
  diversityBonus?: boolean;
  pricingWeight?: number;
  ratingWeight?: number;
  featureMatchWeight?: number;
}

export class RecommendationEngineService {
  static calculateProductScore(
    product: DecisionProduct,
    answers: Record<string, any>,
    questionScores: Record<string, number>,
    config: RecommendationConfig = {}
  ): { score: number; breakdown: Record<string, number>; reasons: string[] } {
    const breakdown: Record<string, number> = {};
    const reasons: string[] = [];
    let totalScore = 0;

    const featureWeight = config.featureMatchWeight || 1.0;
    const pricingWeight = config.pricingWeight || 0.8;
    const ratingWeight = config.ratingWeight || 0.6;

    const targetAudience = answers.target_audience || answers.company_size;
    if (targetAudience && product.target_audience.includes(targetAudience)) {
      const audienceScore = 25 * featureWeight;
      breakdown.target_audience = audienceScore;
      totalScore += audienceScore;
      reasons.push(`Perfect for ${targetAudience} businesses`);
    }

    const technicalLevel = answers.technical_level;
    if (technicalLevel && product.technical_level === technicalLevel) {
      const techScore = 15 * featureWeight;
      breakdown.technical_level = techScore;
      totalScore += techScore;
      reasons.push(`Matches your technical expertise level`);
    }

    const budget = answers.budget || answers.monthly_budget;
    if (budget && product.pricing?.tiers) {
      const affordableTiers = product.pricing.tiers.filter(
        tier => typeof tier.price === 'number' && tier.price <= Number(budget)
      );

      if (affordableTiers.length > 0) {
        const budgetScore = 20 * pricingWeight;
        breakdown.budget_match = budgetScore;
        totalScore += budgetScore;
        reasons.push('Fits within your budget');
      }
    }

    if (product.pricing?.free_tier && answers.budget_priority === 'low') {
      const freeScore = 15 * pricingWeight;
      breakdown.free_tier = freeScore;
      totalScore += freeScore;
      reasons.push('Includes a free tier to get started');
    }

    Object.entries(questionScores).forEach(([key, value]) => {
      const categoryScore = value * featureWeight;
      breakdown[`quiz_${key}`] = categoryScore;
      totalScore += categoryScore;
    });

    const ratingScore = (product.rating / 5) * 10 * ratingWeight;
    breakdown.rating = ratingScore;
    totalScore += ratingScore;

    if (product.review_count > 1000) {
      const popularityScore = 5 * ratingWeight;
      breakdown.popularity = popularityScore;
      totalScore += popularityScore;
      reasons.push('Highly reviewed and trusted');
    }

    const requiredFeatures = answers.required_features || [];
    if (Array.isArray(requiredFeatures) && requiredFeatures.length > 0) {
      const productFeatures = Object.keys(product.features || {});
      const matchedFeatures = requiredFeatures.filter(f =>
        productFeatures.some(pf => pf.toLowerCase().includes(f.toLowerCase()))
      );

      if (matchedFeatures.length > 0) {
        const featureMatchScore = (matchedFeatures.length / requiredFeatures.length) * 20 * featureWeight;
        breakdown.feature_match = featureMatchScore;
        totalScore += featureMatchScore;
        reasons.push(`Matches ${matchedFeatures.length}/${requiredFeatures.length} required features`);
      }
    }

    const integrations = answers.integrations || [];
    if (Array.isArray(integrations) && integrations.length > 0 && product.metadata?.integrations) {
      const productIntegrations = product.metadata.integrations as string[];
      const matchedIntegrations = integrations.filter(i =>
        productIntegrations.some(pi => pi.toLowerCase().includes(i.toLowerCase()))
      );

      if (matchedIntegrations.length > 0) {
        const integrationScore = matchedIntegrations.length * 3 * featureWeight;
        breakdown.integrations = integrationScore;
        totalScore += integrationScore;
        reasons.push('Integrates with your existing tools');
      }
    }

    return { score: totalScore, breakdown, reasons };
  }

  static calculateConfidence(
    score: number,
    maxPossibleScore: number,
    answersCount: number,
    totalQuestions: number
  ): number {
    const scoreRatio = Math.min(score / maxPossibleScore, 1);
    const completionRatio = answersCount / totalQuestions;

    const confidence = (scoreRatio * 0.7 + completionRatio * 0.3) * 100;

    return Math.round(Math.min(confidence, 100));
  }

  static generateRecommendations(
    products: DecisionProduct[],
    questions: DecisionQuestion[],
    answers: Record<string, any>,
    config: RecommendationConfig = {}
  ): QuizRecommendation[] {
    const questionScores: Record<string, number> = {};

    questions.forEach(question => {
      const answer = answers[question.id];
      if (!answer) return;

      const option = question.options?.find(opt => opt.option_value === answer);
      if (option?.weight_scores) {
        Object.entries(option.weight_scores).forEach(([key, value]) => {
          questionScores[key] = (questionScores[key] || 0) + value;
        });
      }
    });

    const recommendations: QuizRecommendation[] = [];
    const maxPossibleScore = 150;

    for (const product of products) {
      const { score, breakdown, reasons } = this.calculateProductScore(
        product,
        answers,
        questionScores,
        config
      );

      if (config.minScore && score < config.minScore) {
        continue;
      }

      const confidence = this.calculateConfidence(
        score,
        maxPossibleScore,
        Object.keys(answers).length,
        questions.length
      );

      recommendations.push({
        product,
        score,
        reasons,
        confidence,
      });
    }

    let sortedRecommendations = recommendations.sort((a, b) => b.score - a.score);

    if (config.diversityBonus) {
      sortedRecommendations = this.applyDiversityBonus(sortedRecommendations);
    }

    const maxResults = config.maxResults || 5;
    return sortedRecommendations.slice(0, maxResults);
  }

  static applyDiversityBonus(
    recommendations: QuizRecommendation[]
  ): QuizRecommendation[] {
    const seenVendors = new Set<string>();
    const seenPricingModels = new Set<string>();

    return recommendations.map(rec => {
      let diversityBonus = 0;

      if (!seenVendors.has(rec.product.vendor)) {
        diversityBonus += 2;
        seenVendors.add(rec.product.vendor);
      }

      const pricingModel = rec.product.pricing?.pricing_model || 'unknown';
      if (!seenPricingModels.has(pricingModel)) {
        diversityBonus += 1;
        seenPricingModels.add(pricingModel);
      }

      return {
        ...rec,
        score: rec.score + diversityBonus,
      };
    }).sort((a, b) => b.score - a.score);
  }

  static compareProducts(
    product1: DecisionProduct,
    product2: DecisionProduct,
    criteria: string[]
  ): {
    winner: string | null;
    scores: Record<string, { product1: number; product2: number }>;
    summary: string;
  } {
    const scores: Record<string, { product1: number; product2: number }> = {};

    criteria.forEach(criterion => {
      switch (criterion) {
        case 'pricing':
          scores.pricing = this.comparePricing(product1, product2);
          break;
        case 'features':
          scores.features = this.compareFeatures(product1, product2);
          break;
        case 'ease_of_use':
          scores.ease_of_use = this.compareEaseOfUse(product1, product2);
          break;
        case 'rating':
          scores.rating = {
            product1: product1.rating * 20,
            product2: product2.rating * 20,
          };
          break;
      }
    });

    const totalScore1 = Object.values(scores).reduce(
      (sum, s) => sum + s.product1,
      0
    );
    const totalScore2 = Object.values(scores).reduce(
      (sum, s) => sum + s.product2,
      0
    );

    let winner: string | null = null;
    if (totalScore1 > totalScore2 + 5) {
      winner = product1.id;
    } else if (totalScore2 > totalScore1 + 5) {
      winner = product2.id;
    }

    const summary = this.generateComparisonSummary(
      product1,
      product2,
      scores,
      winner
    );

    return { winner, scores, summary };
  }

  private static comparePricing(
    product1: DecisionProduct,
    product2: DecisionProduct
  ): { product1: number; product2: number } {
    const getLowestPrice = (product: DecisionProduct): number => {
      if (product.pricing?.free_tier) return 0;
      if (product.pricing?.tiers && product.pricing.tiers.length > 0) {
        const prices = product.pricing.tiers
          .map(t => typeof t.price === 'number' ? t.price : Infinity)
          .filter(p => p !== Infinity);
        return prices.length > 0 ? Math.min(...prices) : 1000;
      }
      return 1000;
    };

    const price1 = getLowestPrice(product1);
    const price2 = getLowestPrice(product2);

    if (price1 === price2) return { product1: 50, product2: 50 };

    const maxPrice = Math.max(price1, price2);
    if (maxPrice === 0) return { product1: 50, product2: 50 };

    return {
      product1: Math.round((1 - price1 / maxPrice) * 100),
      product2: Math.round((1 - price2 / maxPrice) * 100),
    };
  }

  private static compareFeatures(
    product1: DecisionProduct,
    product2: DecisionProduct
  ): { product1: number; product2: number } {
    const features1 = Object.keys(product1.features || {}).length;
    const features2 = Object.keys(product2.features || {}).length;

    if (features1 === features2) return { product1: 50, product2: 50 };

    const maxFeatures = Math.max(features1, features2);
    return {
      product1: Math.round((features1 / maxFeatures) * 100),
      product2: Math.round((features2 / maxFeatures) * 100),
    };
  }

  private static compareEaseOfUse(
    product1: DecisionProduct,
    product2: DecisionProduct
  ): { product1: number; product2: number } {
    const techLevelScore = (level: string) => {
      switch (level) {
        case 'low': return 100;
        case 'medium': return 60;
        case 'high': return 30;
        default: return 50;
      }
    };

    return {
      product1: techLevelScore(product1.technical_level),
      product2: techLevelScore(product2.technical_level),
    };
  }

  private static generateComparisonSummary(
    product1: DecisionProduct,
    product2: DecisionProduct,
    scores: Record<string, { product1: number; product2: number }>,
    winner: string | null
  ): string {
    const winnerProduct = winner === product1.id ? product1 : winner === product2.id ? product2 : null;

    if (!winnerProduct) {
      return `${product1.name} and ${product2.name} are closely matched overall. Your choice should depend on specific priorities.`;
    }

    return `${winnerProduct.name} is the recommended choice based on overall scoring. It excels in key areas while ${winnerProduct.id === product1.id ? product2.name : product1.name} has its own strengths in specific categories.`;
  }
}
