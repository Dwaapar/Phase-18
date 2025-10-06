import type { DecisionQuestion, DecisionQuestionOption } from '../types/decision.types';

export interface BranchingCondition {
  type: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'in_range' | 'matches_regex';
  questionId: string;
  value: any;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
}

export interface BranchingRule {
  conditions: BranchingCondition[];
  operator: 'AND' | 'OR';
  nextQuestionId: string | null;
  skipToQuestionId?: string;
  endQuiz?: boolean;
}

export class QuizBranchingService {
  static evaluateCondition(
    condition: BranchingCondition,
    answers: Record<string, any>
  ): boolean {
    const answer = answers[condition.questionId];
    if (answer === undefined || answer === null) return false;

    switch (condition.type) {
      case 'equals':
        return answer === condition.value;

      case 'contains':
        if (Array.isArray(answer)) {
          return answer.includes(condition.value);
        }
        return String(answer).includes(String(condition.value));

      case 'greater_than':
        return Number(answer) > Number(condition.value);

      case 'less_than':
        return Number(answer) < Number(condition.value);

      case 'in_range':
        const numAnswer = Number(answer);
        return numAnswer >= (condition.minValue || 0) &&
               numAnswer <= (condition.maxValue || Infinity);

      case 'matches_regex':
        if (!condition.pattern) return false;
        const regex = new RegExp(condition.pattern);
        return regex.test(String(answer));

      default:
        return false;
    }
  }

  static evaluateBranchingRule(
    rule: BranchingRule,
    answers: Record<string, any>
  ): boolean {
    if (rule.operator === 'AND') {
      return rule.conditions.every(condition =>
        this.evaluateCondition(condition, answers)
      );
    } else {
      return rule.conditions.some(condition =>
        this.evaluateCondition(condition, answers)
      );
    }
  }

  static getNextQuestion(
    currentQuestion: DecisionQuestion,
    selectedOption: DecisionQuestionOption,
    allQuestions: DecisionQuestion[],
    answers: Record<string, any>
  ): DecisionQuestion | null {
    if (selectedOption.next_question_id) {
      return allQuestions.find(q => q.id === selectedOption.next_question_id) || null;
    }

    if (currentQuestion.branching_logic?.rules) {
      const rules = currentQuestion.branching_logic.rules as BranchingRule[];

      for (const rule of rules) {
        if (this.evaluateBranchingRule(rule, answers)) {
          if (rule.endQuiz) {
            return null;
          }
          if (rule.skipToQuestionId) {
            return allQuestions.find(q => q.id === rule.skipToQuestionId) || null;
          }
          if (rule.nextQuestionId) {
            return allQuestions.find(q => q.id === rule.nextQuestionId) || null;
          }
        }
      }
    }

    const currentIndex = allQuestions.findIndex(q => q.id === currentQuestion.id);
    return allQuestions[currentIndex + 1] || null;
  }

  static calculateQuestionPath(
    questions: DecisionQuestion[],
    answers: Record<string, any>
  ): DecisionQuestion[] {
    const path: DecisionQuestion[] = [];
    let currentQuestion = questions[0];

    while (currentQuestion && path.length < questions.length) {
      path.push(currentQuestion);

      const answer = answers[currentQuestion.id];
      if (!answer) break;

      const selectedOption = currentQuestion.options?.find(
        opt => opt.option_value === answer
      );

      if (!selectedOption) {
        const currentIndex = questions.findIndex(q => q.id === currentQuestion.id);
        currentQuestion = questions[currentIndex + 1];
        continue;
      }

      const nextQuestion = this.getNextQuestion(
        currentQuestion,
        selectedOption,
        questions,
        answers
      );

      if (!nextQuestion) break;
      currentQuestion = nextQuestion;
    }

    return path;
  }

  static shouldSkipQuestion(
    question: DecisionQuestion,
    answers: Record<string, any>
  ): boolean {
    if (!question.branching_logic?.skip_conditions) return false;

    const skipRules = question.branching_logic.skip_conditions as BranchingRule[];
    return skipRules.some(rule => this.evaluateBranchingRule(rule, answers));
  }

  static getQuestionWeight(
    question: DecisionQuestion,
    answer: any
  ): Record<string, number> {
    const selectedOption = question.options?.find(
      opt => opt.option_value === answer
    );

    if (!selectedOption?.weight_scores) return {};

    if (question.weight_config?.multiplier) {
      const multiplier = question.weight_config.multiplier as number;
      const weights: Record<string, number> = {};

      Object.entries(selectedOption.weight_scores).forEach(([key, value]) => {
        weights[key] = value * multiplier;
      });

      return weights;
    }

    return selectedOption.weight_scores;
  }

  static getDynamicQuestionText(
    question: DecisionQuestion,
    answers: Record<string, any>
  ): string {
    let text = question.question_text;

    const placeholderRegex = /\{\{(\w+)\}\}/g;
    text = text.replace(placeholderRegex, (match, key) => {
      return answers[key] || match;
    });

    return text;
  }
}
