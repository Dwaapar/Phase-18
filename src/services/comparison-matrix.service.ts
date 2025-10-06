import type { DecisionProduct } from '../types/decision.types';

export interface ComparisonFeature {
  id: string;
  category: string;
  name: string;
  description?: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  type: 'boolean' | 'rating' | 'text' | 'number';
}

export interface ComparisonMatrix {
  features: ComparisonFeature[];
  products: DecisionProduct[];
  values: Record<string, Record<string, any>>;
  scores: Record<string, number>;
  winner: string | null;
}

export interface ComparisonTemplate {
  id: string;
  name: string;
  category: string;
  features: ComparisonFeature[];
}

export class ComparisonMatrixService {
  static templates: ComparisonTemplate[] = [
    {
      id: 'crm',
      name: 'CRM Comparison',
      category: 'crm-sales',
      features: [
        {
          id: 'contact_management',
          category: 'Core Features',
          name: 'Contact Management',
          importance: 'critical',
          type: 'boolean',
        },
        {
          id: 'pipeline_management',
          category: 'Core Features',
          name: 'Pipeline Management',
          importance: 'critical',
          type: 'boolean',
        },
        {
          id: 'email_integration',
          category: 'Core Features',
          name: 'Email Integration',
          importance: 'high',
          type: 'boolean',
        },
        {
          id: 'automation',
          category: 'Automation',
          name: 'Workflow Automation',
          importance: 'high',
          type: 'rating',
        },
        {
          id: 'reporting',
          category: 'Analytics',
          name: 'Reporting & Dashboards',
          importance: 'high',
          type: 'rating',
        },
        {
          id: 'mobile_app',
          category: 'Accessibility',
          name: 'Mobile App',
          importance: 'medium',
          type: 'boolean',
        },
        {
          id: 'api_access',
          category: 'Integration',
          name: 'API Access',
          importance: 'medium',
          type: 'boolean',
        },
        {
          id: 'custom_fields',
          category: 'Customization',
          name: 'Custom Fields',
          importance: 'medium',
          type: 'boolean',
        },
        {
          id: 'team_collaboration',
          category: 'Collaboration',
          name: 'Team Collaboration',
          importance: 'high',
          type: 'rating',
        },
        {
          id: 'support_quality',
          category: 'Support',
          name: 'Customer Support',
          importance: 'high',
          type: 'rating',
        },
      ],
    },
    {
      id: 'marketing_automation',
      name: 'Marketing Automation Comparison',
      category: 'marketing-automation',
      features: [
        {
          id: 'email_campaigns',
          category: 'Email Marketing',
          name: 'Email Campaigns',
          importance: 'critical',
          type: 'boolean',
        },
        {
          id: 'segmentation',
          category: 'Email Marketing',
          name: 'Audience Segmentation',
          importance: 'critical',
          type: 'rating',
        },
        {
          id: 'ab_testing',
          category: 'Optimization',
          name: 'A/B Testing',
          importance: 'high',
          type: 'boolean',
        },
        {
          id: 'landing_pages',
          category: 'Content',
          name: 'Landing Page Builder',
          importance: 'high',
          type: 'boolean',
        },
        {
          id: 'lead_scoring',
          category: 'Lead Management',
          name: 'Lead Scoring',
          importance: 'high',
          type: 'boolean',
        },
        {
          id: 'social_media',
          category: 'Social',
          name: 'Social Media Integration',
          importance: 'medium',
          type: 'boolean',
        },
        {
          id: 'analytics',
          category: 'Analytics',
          name: 'Advanced Analytics',
          importance: 'high',
          type: 'rating',
        },
        {
          id: 'crm_integration',
          category: 'Integration',
          name: 'CRM Integration',
          importance: 'high',
          type: 'boolean',
        },
      ],
    },
    {
      id: 'project_management',
      name: 'Project Management Comparison',
      category: 'project-management',
      features: [
        {
          id: 'task_management',
          category: 'Core',
          name: 'Task Management',
          importance: 'critical',
          type: 'boolean',
        },
        {
          id: 'gantt_charts',
          category: 'Planning',
          name: 'Gantt Charts',
          importance: 'high',
          type: 'boolean',
        },
        {
          id: 'kanban_boards',
          category: 'Views',
          name: 'Kanban Boards',
          importance: 'high',
          type: 'boolean',
        },
        {
          id: 'time_tracking',
          category: 'Productivity',
          name: 'Time Tracking',
          importance: 'medium',
          type: 'boolean',
        },
        {
          id: 'resource_management',
          category: 'Planning',
          name: 'Resource Management',
          importance: 'high',
          type: 'rating',
        },
        {
          id: 'file_storage',
          category: 'Storage',
          name: 'File Storage',
          importance: 'medium',
          type: 'text',
        },
        {
          id: 'collaboration',
          category: 'Collaboration',
          name: 'Team Collaboration',
          importance: 'high',
          type: 'rating',
        },
        {
          id: 'custom_workflows',
          category: 'Customization',
          name: 'Custom Workflows',
          importance: 'medium',
          type: 'boolean',
        },
      ],
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Platform Comparison',
      category: 'ecommerce',
      features: [
        {
          id: 'product_catalog',
          category: 'Core',
          name: 'Product Catalog',
          importance: 'critical',
          type: 'boolean',
        },
        {
          id: 'payment_gateways',
          category: 'Payments',
          name: 'Payment Gateway Options',
          importance: 'critical',
          type: 'number',
        },
        {
          id: 'inventory_management',
          category: 'Operations',
          name: 'Inventory Management',
          importance: 'high',
          type: 'rating',
        },
        {
          id: 'shipping_integration',
          category: 'Fulfillment',
          name: 'Shipping Integration',
          importance: 'high',
          type: 'rating',
        },
        {
          id: 'mobile_commerce',
          category: 'Mobile',
          name: 'Mobile Commerce',
          importance: 'high',
          type: 'boolean',
        },
        {
          id: 'seo_tools',
          category: 'Marketing',
          name: 'SEO Tools',
          importance: 'medium',
          type: 'rating',
        },
        {
          id: 'multi_currency',
          category: 'International',
          name: 'Multi-Currency Support',
          importance: 'medium',
          type: 'boolean',
        },
        {
          id: 'abandoned_cart',
          category: 'Marketing',
          name: 'Abandoned Cart Recovery',
          importance: 'high',
          type: 'boolean',
        },
      ],
    },
  ];

  static getTemplateByCategory(category: string): ComparisonTemplate | undefined {
    return this.templates.find(t => t.category === category);
  }

  static buildComparisonMatrix(
    products: DecisionProduct[],
    templateId: string
  ): ComparisonMatrix {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    const values: Record<string, Record<string, any>> = {};
    const scores: Record<string, number> = {};

    products.forEach(product => {
      values[product.id] = {};
      let totalScore = 0;
      let maxPossibleScore = 0;

      template.features.forEach(feature => {
        const value = this.extractFeatureValue(product, feature);
        values[product.id][feature.id] = value;

        const featureScore = this.scoreFeature(value, feature);
        totalScore += featureScore;
        maxPossibleScore += this.getMaxFeatureScore(feature);
      });

      scores[product.id] = maxPossibleScore > 0
        ? Math.round((totalScore / maxPossibleScore) * 100)
        : 0;
    });

    const winner = this.determineWinner(scores);

    return {
      features: template.features,
      products,
      values,
      scores,
      winner,
    };
  }

  private static extractFeatureValue(
    product: DecisionProduct,
    feature: ComparisonFeature
  ): any {
    if (product.features && feature.id in product.features) {
      return product.features[feature.id];
    }

    switch (feature.id) {
      case 'mobile_app':
        return product.metadata?.mobile_app || false;
      case 'api_access':
        return product.metadata?.api_access || false;
      case 'support_quality':
        return product.rating || 0;
      default:
        return null;
    }
  }

  private static scoreFeature(value: any, feature: ComparisonFeature): number {
    const importanceMultiplier = this.getImportanceMultiplier(feature.importance);

    switch (feature.type) {
      case 'boolean':
        return value ? 10 * importanceMultiplier : 0;

      case 'rating':
        const rating = Number(value) || 0;
        return (rating / 5) * 10 * importanceMultiplier;

      case 'number':
        const num = Number(value) || 0;
        return Math.min(num / 10, 10) * importanceMultiplier;

      case 'text':
        return value ? 5 * importanceMultiplier : 0;

      default:
        return 0;
    }
  }

  private static getMaxFeatureScore(feature: ComparisonFeature): number {
    return 10 * this.getImportanceMultiplier(feature.importance);
  }

  private static getImportanceMultiplier(importance: string): number {
    switch (importance) {
      case 'critical': return 2.0;
      case 'high': return 1.5;
      case 'medium': return 1.0;
      case 'low': return 0.5;
      default: return 1.0;
    }
  }

  private static determineWinner(scores: Record<string, number>): string | null {
    const entries = Object.entries(scores);
    if (entries.length === 0) return null;

    entries.sort((a, b) => b[1] - a[1]);

    if (entries.length < 2) return entries[0][0];

    const [first, second] = entries;
    if (first[1] - second[1] >= 5) {
      return first[0];
    }

    return null;
  }

  static generateComparisonSummary(matrix: ComparisonMatrix): string {
    const sortedProducts = matrix.products
      .map(p => ({ product: p, score: matrix.scores[p.id] || 0 }))
      .sort((a, b) => b.score - a.score);

    if (sortedProducts.length === 0) {
      return 'No products to compare.';
    }

    const winner = sortedProducts[0];
    const summary: string[] = [];

    summary.push(
      `Based on comprehensive feature analysis, ${winner.product.name} scores ${winner.score}/100.`
    );

    const strengths = this.findProductStrengths(
      winner.product,
      matrix.values[winner.product.id],
      matrix.features
    );

    if (strengths.length > 0) {
      summary.push(`It excels in: ${strengths.slice(0, 3).join(', ')}.`);
    }

    if (sortedProducts.length > 1) {
      const runnerUp = sortedProducts[1];
      summary.push(
        `${runnerUp.product.name} (${runnerUp.score}/100) is a strong alternative.`
      );
    }

    return summary.join(' ');
  }

  private static findProductStrengths(
    product: DecisionProduct,
    values: Record<string, any>,
    features: ComparisonFeature[]
  ): string[] {
    const strengths: string[] = [];

    features.forEach(feature => {
      const value = values[feature.id];
      const score = this.scoreFeature(value, feature);
      const maxScore = this.getMaxFeatureScore(feature);

      if (score >= maxScore * 0.8) {
        strengths.push(feature.name);
      }
    });

    return strengths;
  }

  static exportComparisonCSV(matrix: ComparisonMatrix): string {
    const headers = ['Feature', 'Category', ...matrix.products.map(p => p.name)];
    const rows: string[][] = [headers];

    const categorizedFeatures = this.groupFeaturesByCategory(matrix.features);

    Object.entries(categorizedFeatures).forEach(([category, features]) => {
      features.forEach(feature => {
        const row = [
          feature.name,
          category,
          ...matrix.products.map(p => {
            const value = matrix.values[p.id][feature.id];
            return this.formatValueForExport(value, feature.type);
          }),
        ];
        rows.push(row);
      });
    });

    rows.push([
      'Overall Score',
      '',
      ...matrix.products.map(p => `${matrix.scores[p.id]}/100`),
    ]);

    return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  }

  private static groupFeaturesByCategory(
    features: ComparisonFeature[]
  ): Record<string, ComparisonFeature[]> {
    const grouped: Record<string, ComparisonFeature[]> = {};

    features.forEach(feature => {
      if (!grouped[feature.category]) {
        grouped[feature.category] = [];
      }
      grouped[feature.category].push(feature);
    });

    return grouped;
  }

  private static formatValueForExport(value: any, type: string): string {
    if (value === null || value === undefined) return 'N/A';

    switch (type) {
      case 'boolean':
        return value ? 'Yes' : 'No';
      case 'rating':
        return `${value}/5`;
      case 'number':
        return String(value);
      case 'text':
        return String(value);
      default:
        return String(value);
    }
  }
}
