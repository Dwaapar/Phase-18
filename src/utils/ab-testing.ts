export type Variant = 'control' | 'variant_a' | 'variant_b' | 'variant_c';

export interface ABTestConfig {
  name: string;
  variants: {
    id: Variant;
    weight: number;
  }[];
  enabled: boolean;
}

export interface ABTestAssignment {
  testName: string;
  variant: Variant;
  assignedAt: Date;
}

class ABTestingService {
  private readonly STORAGE_KEY = 'ab_test_assignments';

  getAssignments(): Record<string, ABTestAssignment> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return {};

    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }

  saveAssignment(assignment: ABTestAssignment): void {
    const assignments = this.getAssignments();
    assignments[assignment.testName] = assignment;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assignments));
  }

  assignVariant(config: ABTestConfig): Variant {
    if (!config.enabled) {
      return 'control';
    }

    const existing = this.getAssignments()[config.name];
    if (existing) {
      return existing.variant;
    }

    const totalWeight = config.variants.reduce((sum, v) => sum + v.weight, 0);
    const random = Math.random() * totalWeight;

    let cumulative = 0;
    for (const variant of config.variants) {
      cumulative += variant.weight;
      if (random <= cumulative) {
        const assignment: ABTestAssignment = {
          testName: config.name,
          variant: variant.id,
          assignedAt: new Date(),
        };
        this.saveAssignment(assignment);
        return variant.id;
      }
    }

    return 'control';
  }

  getVariant(testName: string): Variant | null {
    const assignments = this.getAssignments();
    return assignments[testName]?.variant || null;
  }

  clearAssignments(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export const abTesting = new ABTestingService();

export const QUIZ_TESTS: Record<string, ABTestConfig> = {
  quiz_question_order: {
    name: 'quiz_question_order',
    variants: [
      { id: 'control', weight: 50 },
      { id: 'variant_a', weight: 50 },
    ],
    enabled: false,
  },
  quiz_ui_style: {
    name: 'quiz_ui_style',
    variants: [
      { id: 'control', weight: 34 },
      { id: 'variant_a', weight: 33 },
      { id: 'variant_b', weight: 33 },
    ],
    enabled: false,
  },
  recommendation_algorithm: {
    name: 'recommendation_algorithm',
    variants: [
      { id: 'control', weight: 50 },
      { id: 'variant_a', weight: 50 },
    ],
    enabled: false,
  },
};

export function useABTest(testName: string): Variant {
  const config = QUIZ_TESTS[testName];
  if (!config) {
    console.warn(`AB test "${testName}" not found`);
    return 'control';
  }

  return abTesting.assignVariant(config);
}

export function trackABTestEvent(
  testName: string,
  variant: Variant,
  event: 'view' | 'complete' | 'abandon' | 'convert',
  metadata?: Record<string, any>
): void {
  console.log('AB Test Event:', {
    testName,
    variant,
    event,
    metadata,
    timestamp: new Date().toISOString(),
  });
}
