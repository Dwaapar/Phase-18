import { useState, useEffect } from 'react';
import { DecisionService } from '../services/decision.service';
import type {
  DecisionCategory,
  DecisionQuiz,
  DecisionQuestion,
  DecisionProduct,
  DecisionComparison,
  DecisionGuide,
  DecisionROICalculator,
  UserDecisionHistory,
  QuizRecommendation,
} from '../types/decision.types';

export function useCategories() {
  const [categories, setCategories] = useState<DecisionCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    DecisionService.getCategories()
      .then(setCategories)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}

export function useQuiz(slug: string) {
  const [quiz, setQuiz] = useState<DecisionQuiz | null>(null);
  const [questions, setQuestions] = useState<DecisionQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    DecisionService.getQuizBySlug(slug)
      .then((data) => {
        setQuiz(data);
        if (data) {
          return DecisionService.getQuizQuestions(data.id);
        }
        return [];
      })
      .then(setQuestions)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { quiz, questions, loading, error };
}

export function useComparisons(categoryId?: string) {
  const [comparisons, setComparisons] = useState<DecisionComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    DecisionService.getComparisons(categoryId)
      .then(setComparisons)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [categoryId]);

  return { comparisons, loading, error };
}

export function useComparison(slug: string) {
  const [comparison, setComparison] = useState<DecisionComparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    DecisionService.getComparisonBySlug(slug)
      .then((data) => {
        setComparison(data);
        if (data) {
          DecisionService.incrementComparisonView(data.id);
        }
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { comparison, loading, error };
}

export function useGuides(categoryId?: string) {
  const [guides, setGuides] = useState<DecisionGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    DecisionService.getGuides(categoryId)
      .then(setGuides)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [categoryId]);

  return { guides, loading, error };
}

export function useGuide(slug: string) {
  const [guide, setGuide] = useState<DecisionGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    DecisionService.getGuideBySlug(slug)
      .then(setGuide)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { guide, loading, error };
}

export function useROICalculators(categoryId?: string) {
  const [calculators, setCalculators] = useState<DecisionROICalculator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    DecisionService.getROICalculators(categoryId)
      .then(setCalculators)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [categoryId]);

  return { calculators, loading, error };
}

export function useROICalculator(slug: string) {
  const [calculator, setCalculator] = useState<DecisionROICalculator | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    DecisionService.getROICalculatorBySlug(slug)
      .then(setCalculator)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  return { calculator, loading, error };
}

export function useDecisionHistory(userId?: string) {
  const [history, setHistory] = useState<UserDecisionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    DecisionService.getUserDecisionHistory(userId)
      .then(setHistory)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  const refresh = () => {
    if (!userId) return;
    setLoading(true);
    DecisionService.getUserDecisionHistory(userId)
      .then(setHistory)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  return { history, loading, error, refresh };
}

export function useProducts(filters?: {
  categoryId?: string;
  targetAudience?: string[];
  technicalLevel?: string;
}) {
  const [products, setProducts] = useState<DecisionProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    DecisionService.getProducts(filters)
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [filters?.categoryId, filters?.targetAudience, filters?.technicalLevel]);

  return { products, loading, error };
}

export function useQuizSession() {
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random()}`);
  const [startTime] = useState(() => Date.now());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [recommendations, setRecommendations] = useState<QuizRecommendation[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const answerQuestion = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const calculateRecommendations = async (
    questions: DecisionQuestion[],
    products: DecisionProduct[]
  ) => {
    const scores: Record<string, number> = {};

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (!answer) return;

      const option = question.options?.find((opt) => opt.option_value === answer);
      if (option && option.weight_scores) {
        Object.entries(option.weight_scores).forEach(([key, value]) => {
          scores[key] = (scores[key] || 0) + value;
        });
      }
    });

    const recs = DecisionService.calculateRecommendations(products, scores, answers);
    setRecommendations(recs);
    return recs;
  };

  const completeQuiz = async (
    quizId: string,
    questions: DecisionQuestion[],
    products: DecisionProduct[],
    userId?: string
  ) => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const recs = await calculateRecommendations(questions, products);

    const scores: Record<string, number> = {};
    questions.forEach((question) => {
      const answer = answers[question.id];
      if (!answer) return;
      const option = question.options?.find((opt) => opt.option_value === answer);
      if (option?.weight_scores) {
        Object.entries(option.weight_scores).forEach(([key, value]) => {
          scores[key] = (scores[key] || 0) + value;
        });
      }
    });

    const recommendedProductIds = recs.map((r) => r.product.id);

    await DecisionService.saveQuizResponse(
      quizId,
      sessionId,
      answers,
      scores,
      recommendedProductIds,
      timeTaken,
      userId
    );

    setIsComplete(true);
    return recs;
  };

  const reset = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setRecommendations([]);
    setIsComplete(false);
  };

  return {
    sessionId,
    currentQuestionIndex,
    answers,
    recommendations,
    isComplete,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    calculateRecommendations,
    completeQuiz,
    reset,
  };
}
