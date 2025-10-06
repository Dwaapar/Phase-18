import { supabase } from '../lib/supabase';
import {
  AIAgent,
  AgentCategory,
  DeploymentModel,
  AgentIntegration,
  AgentFilters,
  UserAgentDeployment,
  AgentConfiguration,
  AgentPerformanceMetrics,
  AgentConversation
} from '../types/agent.types';
import { aiAgents, agentCategories, deploymentModels, agentIntegrations } from '../data/agentsData';

export class AgentsService {
  static async getCategories(): Promise<AgentCategory[]> {
    return agentCategories;
  }

  static async getDeploymentModels(): Promise<DeploymentModel[]> {
    return deploymentModels;
  }

  static async getAgents(filters?: AgentFilters): Promise<AIAgent[]> {
    let filtered = [...aiAgents];

    if (filters?.categories && filters.categories.length > 0) {
      filtered = filtered.filter(agent =>
        filters.categories!.includes(agent.categoryId)
      );
    }

    if (filters?.deploymentModels && filters.deploymentModels.length > 0) {
      filtered = filtered.filter(agent =>
        agent.deploymentModels.some(dm => filters.deploymentModels!.includes(dm))
      );
    }

    if (filters?.industries && filters.industries.length > 0) {
      filtered = filtered.filter(agent =>
        agent.industries.some(ind => filters.industries!.includes(ind))
      );
    }

    if (filters?.priceRange) {
      filtered = filtered.filter(agent =>
        agent.basePrice >= filters.priceRange!.min &&
        agent.basePrice <= filters.priceRange!.max
      );
    }

    if (filters?.rating) {
      filtered = filtered.filter(agent => agent.rating >= filters.rating!);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchLower) ||
        agent.description.toLowerCase().includes(searchLower) ||
        agent.capabilities.some(cap => cap.toLowerCase().includes(searchLower))
      );
    }

    if (filters?.sortBy) {
      const { sortBy, sortOrder = 'desc' } = filters;
      filtered.sort((a, b) => {
        let compareValue = 0;

        switch (sortBy) {
          case 'popularity':
            compareValue = a.popularityScore - b.popularityScore;
            break;
          case 'rating':
            compareValue = a.rating - b.rating;
            break;
          case 'price':
            compareValue = a.basePrice - b.basePrice;
            break;
          case 'name':
            compareValue = a.name.localeCompare(b.name);
            break;
          case 'deployments':
            compareValue = a.totalDeployments - b.totalDeployments;
            break;
        }

        return sortOrder === 'asc' ? compareValue : -compareValue;
      });
    }

    return filtered;
  }

  static async getAgentBySlug(slug: string): Promise<AIAgent | null> {
    const agent = aiAgents.find(a => a.slug === slug);
    return agent || null;
  }

  static async getAgentById(id: string): Promise<AIAgent | null> {
    const agent = aiAgents.find(a => a.id === id);
    return agent || null;
  }

  static async getFeaturedAgents(): Promise<AIAgent[]> {
    return aiAgents.filter(agent => agent.isFeatured);
  }

  static async getAgentsByCategory(categoryId: string): Promise<AIAgent[]> {
    return aiAgents.filter(agent => agent.categoryId === categoryId);
  }

  static async getIntegrations(): Promise<AgentIntegration[]> {
    return agentIntegrations;
  }

  static async getIntegrationsByCategory(category: string): Promise<AgentIntegration[]> {
    return agentIntegrations.filter(int => int.category === category);
  }

  static async getUserDeployments(userId: string): Promise<UserAgentDeployment[]> {
    const mockDeployments: UserAgentDeployment[] = [
      {
        id: '1',
        userId,
        agentId: '5',
        deploymentModelId: '1',
        name: 'Customer Support Bot',
        status: 'active',
        deploymentDate: '2025-09-15T10:00:00Z',
        lastActive: '2025-10-04T14:30:00Z',
        apiKey: 'sk_live_1234567890abcdef',
        webhookUrl: 'https://example.com/webhook',
        settings: { language: 'en', timezone: 'UTC' },
        createdAt: '2025-09-15T10:00:00Z',
        updatedAt: '2025-10-04T14:30:00Z'
      }
    ];
    return mockDeployments;
  }

  static async deployAgent(userId: string, agentId: string, deploymentModelId: string, name: string): Promise<UserAgentDeployment> {
    const deployment: UserAgentDeployment = {
      id: Math.random().toString(36).substring(7),
      userId,
      agentId,
      deploymentModelId,
      name,
      status: 'active',
      deploymentDate: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      apiKey: `sk_live_${Math.random().toString(36).substring(2)}`,
      settings: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return deployment;
  }

  static async getAgentConfiguration(deploymentId: string): Promise<AgentConfiguration | null> {
    const mockConfig: AgentConfiguration = {
      id: '1',
      userId: 'user-1',
      agentId: '5',
      deploymentId,
      personalitySettings: {
        tone: 'professional',
        style: 'balanced',
        formality: 'medium'
      },
      knowledgeBase: [
        {
          type: 'url',
          content: 'https://docs.example.com',
          name: 'Product Documentation'
        }
      ],
      responseRules: [
        {
          trigger: 'refund',
          response: 'I can help you with refunds. Let me check your order details.',
          priority: 1
        }
      ],
      integrationSettings: {},
      createdAt: '2025-09-15T10:00:00Z',
      updatedAt: '2025-10-04T14:30:00Z'
    };

    return mockConfig;
  }

  static async updateAgentConfiguration(
    configId: string,
    updates: Partial<AgentConfiguration>
  ): Promise<AgentConfiguration> {
    const mockConfig = await this.getAgentConfiguration('1');
    return {
      ...mockConfig!,
      ...updates,
      updatedAt: new Date().toISOString()
    };
  }

  static async getPerformanceMetrics(
    deploymentId: string,
    startDate: string,
    endDate: string
  ): Promise<AgentPerformanceMetrics[]> {
    const mockMetrics: AgentPerformanceMetrics[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      mockMetrics.push({
        id: Math.random().toString(36).substring(7),
        deploymentId,
        date: d.toISOString().split('T')[0],
        conversationCount: Math.floor(Math.random() * 100) + 50,
        messageCount: Math.floor(Math.random() * 500) + 200,
        resolutionRate: Math.random() * 20 + 75,
        avgResponseTime: Math.random() * 2 + 0.5,
        customerSatisfaction: Math.random() * 1 + 4,
        escalationRate: Math.random() * 10 + 5,
        createdAt: d.toISOString()
      });
    }

    return mockMetrics;
  }

  static async getAgentConversations(agentId: string): Promise<AgentConversation[]> {
    const mockConversations: AgentConversation[] = [
      {
        id: '1',
        agentId,
        title: 'Order Status Inquiry',
        messages: [
          {
            role: 'user',
            content: 'Hi, I need help tracking my order #12345',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString()
          },
          {
            role: 'agent',
            content: 'I\'d be happy to help you track your order! Let me look that up for you.',
            timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString()
          },
          {
            role: 'agent',
            content: 'I found your order #12345. It was shipped yesterday and should arrive within 2-3 business days. Your tracking number is 1Z999AA10123456784.',
            timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString()
          },
          {
            role: 'user',
            content: 'Great, thank you!',
            timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString()
          },
          {
            role: 'agent',
            content: 'You\'re welcome! Is there anything else I can help you with today?',
            timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString()
          }
        ],
        useCase: 'Order tracking and customer service',
        isFeatured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        agentId,
        title: 'Product Recommendation',
        messages: [
          {
            role: 'user',
            content: 'I\'m looking for a laptop for video editing. Any recommendations?',
            timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
          },
          {
            role: 'agent',
            content: 'I can help you find the perfect laptop for video editing! What\'s your budget range, and what video editing software do you primarily use?',
            timestamp: new Date(Date.now() - 9 * 60 * 1000).toISOString()
          },
          {
            role: 'user',
            content: 'Budget is around $2000-3000, and I use Adobe Premiere Pro',
            timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString()
          },
          {
            role: 'agent',
            content: 'Perfect! For Adobe Premiere Pro in that price range, I recommend the MacBook Pro 16" with M3 Pro chip or the Dell XPS 15 with RTX 4070. Both have excellent performance for video editing. Would you like more details on either option?',
            timestamp: new Date(Date.now() - 7 * 60 * 1000).toISOString()
          }
        ],
        useCase: 'Product recommendations and sales assistance',
        isFeatured: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        agentId,
        title: 'Refund Request',
        messages: [
          {
            role: 'user',
            content: 'I received a damaged product and would like a refund',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString()
          },
          {
            role: 'agent',
            content: 'I\'m sorry to hear about the damaged product. I\'ll be happy to process a refund for you. Could you please provide your order number?',
            timestamp: new Date(Date.now() - 14 * 60 * 1000).toISOString()
          },
          {
            role: 'user',
            content: 'Order #98765',
            timestamp: new Date(Date.now() - 13 * 60 * 1000).toISOString()
          },
          {
            role: 'agent',
            content: 'Thank you. I\'ve initiated a full refund for order #98765. You should see the refund in your account within 5-7 business days. Would you like me to send you a prepaid return label?',
            timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString()
          },
          {
            role: 'user',
            content: 'Yes please, that would be great',
            timestamp: new Date(Date.now() - 11 * 60 * 1000).toISOString()
          },
          {
            role: 'agent',
            content: 'Perfect! I\'ve sent a prepaid return label to your email. Simply attach it to the package and drop it off at any shipping location. Is there anything else I can help you with?',
            timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString()
          }
        ],
        useCase: 'Refund processing and returns management',
        isFeatured: true,
        createdAt: new Date().toISOString()
      }
    ];

    return mockConversations;
  }

  static async testAgent(agentId: string, message: string, conversationHistory: any[] = []): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = [
      "I understand your question. Let me help you with that.",
      "That's a great question! Based on the information provided, I recommend...",
      "I'd be happy to assist you with this. Here's what I found...",
      "Thank you for reaching out. I can definitely help you with that.",
      "I've looked into this for you. The best solution would be...",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  static getAllIndustries(): string[] {
    const industries = new Set<string>();
    aiAgents.forEach(agent => {
      agent.industries.forEach(industry => industries.add(industry));
    });
    return Array.from(industries).sort();
  }
}
