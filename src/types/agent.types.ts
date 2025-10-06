export interface AgentCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export interface DeploymentModel {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  pricingType: 'subscription' | 'license' | 'usage_based';
}

export interface AIAgent {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  detailedDescription: string;
  icon: string;
  capabilities: string[];
  useCases: string[];
  supportedLanguages: string[];
  industries: string[];
  deploymentModels: string[];
  basePrice: number;
  pricingModel: string;
  popularityScore: number;
  rating: number;
  totalDeployments: number;
  isFeatured: boolean;
  isActive: boolean;
}

export interface AgentIntegration {
  id: string;
  name: string;
  slug: string;
  category: 'crm' | 'helpdesk' | 'communication' | 'analytics' | 'other';
  description: string;
  icon: string;
  isActive: boolean;
}

export interface UserAgentDeployment {
  id: string;
  userId: string;
  agentId: string;
  deploymentModelId: string;
  name: string;
  status: 'active' | 'paused' | 'stopped';
  deploymentDate: string;
  lastActive: string;
  apiKey: string;
  webhookUrl?: string;
  settings: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface AgentConfiguration {
  id: string;
  userId: string;
  agentId: string;
  deploymentId?: string;
  personalitySettings: {
    tone?: 'professional' | 'friendly' | 'casual' | 'formal';
    style?: 'concise' | 'detailed' | 'balanced';
    formality?: 'high' | 'medium' | 'low';
  };
  knowledgeBase: Array<{
    type: 'url' | 'document' | 'text';
    content: string;
    name: string;
  }>;
  responseRules: Array<{
    trigger: string;
    response: string;
    priority: number;
  }>;
  integrationSettings: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface AgentTrainingData {
  id: string;
  configurationId: string;
  userId: string;
  dataType: 'document' | 'conversation' | 'faq' | 'custom';
  content: string;
  metadata: Record<string, any>;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  processedAt?: string;
}

export interface AgentPerformanceMetrics {
  id: string;
  deploymentId: string;
  date: string;
  conversationCount: number;
  messageCount: number;
  resolutionRate: number;
  avgResponseTime: number;
  customerSatisfaction: number;
  escalationRate: number;
  createdAt: string;
}

export interface UserAgentIntegration {
  id: string;
  deploymentId: string;
  integrationId: string;
  userId: string;
  config: Record<string, any>;
  status: 'active' | 'inactive' | 'error';
  lastSync?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentConversation {
  id: string;
  agentId: string;
  title: string;
  messages: Array<{
    role: 'user' | 'agent';
    content: string;
    timestamp: string;
  }>;
  useCase: string;
  isFeatured: boolean;
  createdAt: string;
}

export interface AgentFilters {
  categories?: string[];
  deploymentModels?: string[];
  industries?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  search?: string;
  sortBy?: 'popularity' | 'rating' | 'price' | 'name' | 'deployments';
  sortOrder?: 'asc' | 'desc';
}

export interface AgentDeploymentRequest {
  agentId: string;
  deploymentModelId: string;
  name: string;
  configuration?: Partial<AgentConfiguration>;
}

export interface AgentTestRequest {
  agentId: string;
  messages: Array<{
    role: 'user' | 'agent';
    content: string;
  }>;
  configuration?: Partial<AgentConfiguration>;
}

export interface AgentTestResponse {
  messages: Array<{
    role: 'user' | 'agent';
    content: string;
    timestamp: string;
  }>;
  performance: {
    responseTime: number;
    confidence: number;
  };
}
