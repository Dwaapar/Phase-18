import { supabase } from '../lib/supabase';
import type {
  DecisionCategory,
  DecisionQuiz,
  DecisionQuestion,
  DecisionProduct,
  DecisionComparison,
  DecisionGuide,
  DecisionROICalculator,
  UserQuizResponse,
  UserDecisionHistory,
  QuizRecommendation,
  AnalyticsEventType,
  AnalyticsEntityType,
} from '../types/decision.types';

export class DecisionService {
  static async getCategories(): Promise<DecisionCategory[]> {
    const { data, error } = await supabase
      .from('decision_categories')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (error) throw error;
    return data || [];
  }

  static async getQuizzesByCategory(categoryId: string): Promise<DecisionQuiz[]> {
    const { data, error } = await supabase
      .from('decision_quizzes')
      .select(`
        *,
        category:decision_categories(*)
      `)
      .eq('category_id', categoryId)
      .eq('is_active', true);

    if (error) throw error;
    return data || [];
  }

  static async getQuizBySlug(slug: string): Promise<DecisionQuiz | null> {
    const { data, error } = await supabase
      .from('decision_quizzes')
      .select(`
        *,
        category:decision_categories(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async getQuizQuestions(quizId: string): Promise<DecisionQuestion[]> {
    const { data, error } = await supabase
      .from('decision_questions')
      .select(`
        *,
        options:decision_question_options(*)
      `)
      .eq('quiz_id', quizId)
      .order('question_order');

    if (error) throw error;
    return data || [];
  }

  static async saveQuizResponse(
    quizId: string,
    sessionId: string,
    answers: Record<string, any>,
    calculatedScores: Record<string, number>,
    recommendedProducts: string[],
    timeTaken: number,
    userId?: string
  ): Promise<UserQuizResponse> {
    const { data, error } = await supabase
      .from('user_quiz_responses')
      .insert({
        quiz_id: quizId,
        user_id: userId || null,
        session_id: sessionId,
        answers,
        calculated_scores: calculatedScores,
        recommended_products: recommendedProducts,
        time_taken_seconds: timeTaken,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getProducts(filters?: {
    categoryId?: string;
    targetAudience?: string[];
    technicalLevel?: string;
  }): Promise<DecisionProduct[]> {
    let query = supabase
      .from('decision_products')
      .select(`
        *,
        category:decision_categories(*)
      `)
      .eq('is_active', true);

    if (filters?.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }

    if (filters?.targetAudience && filters.targetAudience.length > 0) {
      query = query.overlaps('target_audience', filters.targetAudience);
    }

    if (filters?.technicalLevel) {
      query = query.eq('technical_level', filters.technicalLevel);
    }

    const { data, error } = await query.order('rating', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getProductsByIds(productIds: string[]): Promise<DecisionProduct[]> {
    const { data, error } = await supabase
      .from('decision_products')
      .select('*')
      .in('id', productIds);

    if (error) throw error;
    return data || [];
  }

  static async getComparisons(categoryId?: string): Promise<DecisionComparison[]> {
    let query = supabase
      .from('decision_comparisons')
      .select(`
        *,
        category:decision_categories(*)
      `)
      .eq('is_published', true);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query.order('view_count', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getComparisonBySlug(slug: string): Promise<DecisionComparison | null> {
    const { data, error } = await supabase
      .from('decision_comparisons')
      .select(`
        *,
        category:decision_categories(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw error;

    if (data && data.product_ids?.length > 0) {
      const products = await this.getProductsByIds(data.product_ids);
      return { ...data, products };
    }

    return data;
  }

  static async incrementComparisonView(comparisonId: string): Promise<void> {
    const { error } = await supabase.rpc('increment_comparison_view', {
      comparison_id: comparisonId,
    });

    if (error) {
      const { data } = await supabase
        .from('decision_comparisons')
        .select('view_count')
        .eq('id', comparisonId)
        .single();

      if (data) {
        await supabase
          .from('decision_comparisons')
          .update({ view_count: (data.view_count || 0) + 1 })
          .eq('id', comparisonId);
      }
    }
  }

  static async getGuides(categoryId?: string): Promise<DecisionGuide[]> {
    let query = supabase
      .from('decision_guides')
      .select(`
        *,
        category:decision_categories(*)
      `)
      .eq('is_published', true);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query.order('download_count', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getGuideBySlug(slug: string): Promise<DecisionGuide | null> {
    const { data, error } = await supabase
      .from('decision_guides')
      .select(`
        *,
        category:decision_categories(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) throw error;

    if (data && data.product_ids?.length > 0) {
      const products = await this.getProductsByIds(data.product_ids);
      return { ...data, products };
    }

    return data;
  }

  static async getROICalculators(categoryId?: string): Promise<DecisionROICalculator[]> {
    let query = supabase
      .from('decision_roi_calculators')
      .select(`
        *,
        category:decision_categories(*)
      `)
      .eq('is_active', true);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query.order('usage_count', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getROICalculatorBySlug(
    slug: string
  ): Promise<DecisionROICalculator | null> {
    const { data, error } = await supabase
      .from('decision_roi_calculators')
      .select(`
        *,
        category:decision_categories(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async getUserDecisionHistory(userId: string): Promise<UserDecisionHistory[]> {
    const { data, error } = await supabase
      .from('user_decision_history')
      .select(`
        *,
        quiz_response:user_quiz_responses(*),
        comparison:decision_comparisons(*),
        guide:decision_guides(*),
        selected_product:decision_products(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async saveDecisionHistory(
    userId: string,
    decisionType: string,
    data: {
      quizResponseId?: string;
      comparisonId?: string;
      guideId?: string;
      selectedProductId?: string;
      notes?: string;
    }
  ): Promise<UserDecisionHistory> {
    const { data: result, error } = await supabase
      .from('user_decision_history')
      .insert({
        user_id: userId,
        decision_type: decisionType,
        quiz_response_id: data.quizResponseId || null,
        comparison_id: data.comparisonId || null,
        guide_id: data.guideId || null,
        selected_product_id: data.selectedProductId || null,
        notes: data.notes || '',
      })
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async toggleBookmark(
    historyId: string,
    isBookmarked: boolean
  ): Promise<void> {
    const { error } = await supabase
      .from('user_decision_history')
      .update({ is_bookmarked: isBookmarked })
      .eq('id', historyId);

    if (error) throw error;
  }

  static async trackAnalyticsEvent(
    entityType: AnalyticsEntityType,
    entityId: string,
    eventType: AnalyticsEventType,
    sessionId: string,
    metadata?: Record<string, any>,
    userId?: string,
    variant?: string
  ): Promise<void> {
    const { error } = await supabase.from('decision_analytics').insert({
      entity_type: entityType,
      entity_id: entityId,
      event_type: eventType,
      session_id: sessionId,
      user_id: userId || null,
      variant: variant || null,
      metadata: metadata || {},
    });

    if (error) console.error('Analytics tracking error:', error);
  }

  static calculateRecommendations(
    products: DecisionProduct[],
    scores: Record<string, number>,
    answers: Record<string, any>
  ): QuizRecommendation[] {
    const recommendations: QuizRecommendation[] = [];

    for (const product of products) {
      let score = 0;
      const reasons: string[] = [];

      const targetAudience = answers.target_audience || answers.company_size;
      if (targetAudience && product.target_audience.includes(targetAudience)) {
        score += 3;
        reasons.push(`Perfect for ${targetAudience}`);
      }

      const technicalLevel = answers.technical_level;
      if (technicalLevel && product.technical_level === technicalLevel) {
        score += 2;
        reasons.push(`Matches your technical level`);
      }

      Object.entries(scores).forEach(([key, value]) => {
        score += value;
      });

      const avgScore = score / Object.keys(scores).length;
      const confidence = Math.min(Math.round((avgScore / 5) * 100), 100);

      if (score > 0) {
        recommendations.push({
          product,
          score,
          reasons,
          confidence,
        });
      }
    }

    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }
}
