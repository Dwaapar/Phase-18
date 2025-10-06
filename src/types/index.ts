export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  runtime: string;
  downloads: string;
  rating: number;
  reviews: number;
  tags: string[];
  pricing: 'Free' | 'Premium';
  lastUpdated: string;
  steps: string[];
  envVars: EnvVar[];
  integrations: string[];
  patchNotes: PatchNote[];
}

export interface EnvVar {
  name: string;
  description: string;
  required: boolean;
  default?: string;
}

export interface PatchNote {
  version: string;
  date: string;
  changes: string[];
}

export interface Agent {
  id: string;
  name: string;
  type: 'SDR' | 'Support' | 'Operations';
  description: string;
  features: string[];
  status: 'Popular' | 'New' | 'Featured';
  deployment: 'Managed' | 'Self-hosted' | 'Hybrid';
}

export interface Asset {
  id: string;
  name: string;
  type: 'Prompt Pack' | 'Dataset' | 'Playbook' | 'Creative Bundle';
  description: string;
  category: string;
  downloads: string;
  rating: number;
  pricing: 'Free' | 'Premium';
  fileSize?: string;
  format?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: Result[];
  image: string;
}

export interface Result {
  metric: string;
  value: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: Date;
  readTime: string;
  image: string;
  tags: string[];
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  pages: number;
  readTime: string;
  rating: number;
  downloads: string;
  image: string;
  content: string;
}

export interface Comparison {
  id: string;
  title: string;
  category: string;
  description: string;
  winner: string;
  tools: ComparisonTool[];
  rating: number;
  views: string;
}

export interface ComparisonTool {
  name: string;
  pros: string[];
  cons: string[];
  pricing: string;
  bestFor: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  type: 'general' | 'sales' | 'support' | 'partnership';
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: string;
  category: string;
}

export interface PilotForm {
  useCase: string;
  stack: string;
  dataAccess: string;
  timeline: string;
  company: string;
  email: string;
  name: string;
}

export interface PricingTier {
  id: string;
  name: string;
  slug: string;
  priceMonthly: number;
  priceAnnual: number;
  features: {
    workflows: number | 'unlimited';
    agents: number | 'unlimited';
    assets: number | 'unlimited';
    toolUses: number | 'unlimited';
    support: string;
    apiAccess: boolean;
    customDevelopment: boolean;
    whiteLabel: boolean;
    sso: boolean;
    sla: boolean;
  };
  sortOrder: number;
  isActive: boolean;
}

export interface Product {
  id: string;
  type: 'workflow' | 'agent' | 'asset' | 'service' | 'tool';
  categoryId: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  pricingModel: 'free' | 'one_time' | 'subscription' | 'custom';
  price: number;
  tierRequired: 'free' | 'starter' | 'professional' | 'enterprise';
  isFeatured: boolean;
  isPopular: boolean;
  status: 'draft' | 'active' | 'archived';
  metadata: Record<string, any>;
  viewCount: number;
  installCount: number;
  purchaseCount: number;
  ratingAverage: number;
  ratingCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId?: string;
  icon: string;
  sortOrder: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ProductMedia {
  id: string;
  productId: string;
  type: 'image' | 'video' | 'file' | 'demo';
  url: string;
  title?: string;
  description?: string;
  sortOrder: number;
  metadata: Record<string, any>;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductBundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  discountPercentage: number;
  price: number;
  isActive: boolean;
  products: Product[];
}

export interface Subscription {
  id: string;
  userId: string;
  tierId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  stripePaymentIntentId?: string;
  createdAt: Date;
}

export interface UserProduct {
  id: string;
  userId: string;
  productId: string;
  activatedAt: Date;
  expiresAt?: Date;
  usageCount: number;
  usageLimit?: number;
}

export interface AffiliateProgram {
  id: string;
  name: string;
  slug: string;
  description: string;
  commissionType: 'percentage' | 'fixed';
  commissionValue: number;
  cookieWindow: number;
  isActive: boolean;
}

export interface AffiliatePartner {
  id: string;
  userId: string;
  status: 'pending' | 'active' | 'suspended';
  code: string;
  totalEarnings: number;
  pendingEarnings: number;
  clicks: number;
  conversions: number;
  joinedAt: Date;
}

export interface AffiliateCommission {
  id: string;
  affiliateId: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'approved' | 'paid';
  paidAt?: Date;
  createdAt: Date;
}

export interface AutomationService {
  id: string;
  name: string;
  slug: string;
  description: string;
  tier: 'quick_start' | 'professional' | 'enterprise';
  price: number;
  estimatedDelivery: string;
  features: string[];
  deliveryPhases: string[];
  isActive: boolean;
}

export interface ServiceRequest {
  id: string;
  userId: string;
  serviceId: string;
  requirements: string;
  techStack: string[];
  timeline: string;
  budget: string;
  status: 'pending' | 'in_progress' | 'completed' | 'canceled';
  createdAt: Date;
}

export interface DecisionQuiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: QuizQuestion[];
  estimatedTime: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'single' | 'multiple' | 'scale';
  options: QuizOption[];
  nextQuestionLogic?: Record<string, string>;
}

export interface QuizOption {
  id: string;
  text: string;
  value: string;
}

export interface QuizResult {
  recommendedProducts: Product[];
  reasoning: string;
  score: number;
}

export interface Integration {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  authType: 'oauth' | 'api_key' | 'webhook';
  isPopular: boolean;
  setupGuideUrl: string;
}

export interface UserIntegration {
  id: string;
  userId: string;
  integrationId: string;
  status: 'connected' | 'disconnected' | 'error';
  credentials: Record<string, any>;
  lastSyncAt?: Date;
  errorMessage?: string;
}

export interface ToolSubmission {
  id: string;
  userId: string;
  toolType: string;
  inputData: Record<string, any>;
  outputData: Record<string, any>;
  createdAt: Date;
}

export interface UsageMetric {
  userId: string;
  period: string;
  workflowRuns: number;
  agentInteractions: number;
  assetDownloads: number;
  toolUses: number;
  apiCalls: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata: Record<string, any>;
  createdAt: Date;
}