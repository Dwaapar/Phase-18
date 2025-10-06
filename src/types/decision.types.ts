export interface DecisionCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DecisionQuiz {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string;
  estimated_time: number;
  total_questions: number;
  version: string;
  is_active: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  category?: DecisionCategory;
}

export type QuestionType = 'single_choice' | 'multiple_choice' | 'range' | 'text';

export interface DecisionQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_order: number;
  question_type: QuestionType;
  branching_logic: Record<string, any>;
  weight_config: Record<string, any>;
  is_required: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  options?: DecisionQuestionOption[];
}

export interface DecisionQuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  option_value: string;
  option_order: number;
  weight_scores: Record<string, number>;
  next_question_id: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export interface DecisionProduct {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  vendor: string;
  logo_url: string;
  description: string;
  website_url: string;
  pricing: PricingInfo;
  features: Record<string, any>;
  pros: string[];
  cons: string[];
  target_audience: string[];
  technical_level: 'low' | 'medium' | 'high';
  rating: number;
  review_count: number;
  metadata: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: DecisionCategory;
}

export interface PricingInfo {
  currency?: string;
  tiers?: PricingTier[];
  pricing_model?: string;
  free_tier?: boolean;
  custom_pricing?: boolean;
}

export interface PricingTier {
  name: string;
  price: number | string;
  billing_period?: 'monthly' | 'annual' | 'one-time';
  features?: string[];
}

export interface DecisionComparison {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string;
  product_ids: string[];
  winner_context: string;
  feature_matrix: Record<string, any>;
  pricing_breakdown: Record<string, any>;
  recommendation: string;
  view_count: number;
  helpful_count: number;
  last_updated: string;
  metadata: Record<string, any>;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  products?: DecisionProduct[];
  category?: DecisionCategory;
}

export interface DecisionGuide {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string;
  content: string;
  product_ids: string[];
  reading_time: number;
  download_count: number;
  rating: number;
  author: string;
  last_updated: string;
  metadata: Record<string, any>;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  products?: DecisionProduct[];
  category?: DecisionCategory;
}

export interface DecisionROICalculator {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string;
  input_fields: ROIInputField[];
  calculation_formula: Record<string, any>;
  output_metrics: ROIOutputMetric[];
  usage_count: number;
  metadata: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: DecisionCategory;
}

export interface ROIInputField {
  id: string;
  label: string;
  type: 'number' | 'currency' | 'percentage' | 'select';
  default_value?: any;
  min?: number;
  max?: number;
  options?: string[];
  help_text?: string;
  required?: boolean;
}

export interface ROIOutputMetric {
  id: string;
  label: string;
  format: 'currency' | 'percentage' | 'number' | 'time';
  description?: string;
}

export interface UserQuizResponse {
  id: string;
  user_id: string | null;
  quiz_id: string;
  session_id: string;
  answers: Record<string, any>;
  calculated_scores: Record<string, number>;
  recommended_products: string[];
  completed_at: string;
  quiz_version: string;
  time_taken_seconds: number;
  metadata: Record<string, any>;
  created_at: string;
  quiz?: DecisionQuiz;
  products?: DecisionProduct[];
}

export type DecisionType = 'quiz' | 'comparison' | 'guide' | 'direct';

export interface UserDecisionHistory {
  id: string;
  user_id: string;
  quiz_response_id: string | null;
  comparison_id: string | null;
  guide_id: string | null;
  selected_product_id: string | null;
  decision_type: DecisionType;
  notes: string;
  is_bookmarked: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  quiz_response?: UserQuizResponse;
  comparison?: DecisionComparison;
  guide?: DecisionGuide;
  selected_product?: DecisionProduct;
}

export type AnalyticsEventType =
  | 'view'
  | 'start'
  | 'complete'
  | 'abandon'
  | 'helpful'
  | 'unhelpful'
  | 'bookmark'
  | 'share';

export type AnalyticsEntityType =
  | 'quiz'
  | 'question'
  | 'comparison'
  | 'guide'
  | 'product'
  | 'calculator';

export interface DecisionAnalytics {
  id: string;
  entity_type: AnalyticsEntityType;
  entity_id: string;
  event_type: AnalyticsEventType;
  user_id: string | null;
  session_id: string;
  variant: string | null;
  metadata: Record<string, any>;
  created_at: string;
}

export interface QuizRecommendation {
  product: DecisionProduct;
  score: number;
  reasons: string[];
  confidence: number;
}

export interface QuizSession {
  sessionId: string;
  quizId: string;
  startedAt: Date;
  currentQuestionIndex: number;
  answers: Record<string, any>;
  timeElapsed: number;
}
