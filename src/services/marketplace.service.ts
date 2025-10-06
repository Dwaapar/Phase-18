import type {
  MarketplaceProduct,
  MarketplaceCategory,
  ProductReview,
  WishlistItem,
  ProductCollection,
  ProductFilters,
  ProductComparison,
  ProductRecommendation,
  TrendingProduct,
  PopularProduct,
  AnalyticsEventType
} from '../types/marketplace.types';

class MarketplaceService {
  private mockProducts: MarketplaceProduct[] = [
    {
      id: '1',
      name: 'Lead Qualification Workflow',
      slug: 'lead-qualification-workflow',
      description: 'Automatically qualify and route leads based on custom criteria',
      long_description: '# Lead Qualification Workflow\n\nStreamline your sales process with intelligent lead qualification. This workflow automatically scores leads based on engagement, demographics, and behavior, then routes them to the appropriate sales team.\n\n## Features\n- Multi-criteria scoring\n- Automatic routing\n- CRM integration\n- Real-time notifications',
      product_type: 'workflow',
      category_id: 'cat-sales',
      price: 49.99,
      pricing_type: 'one_time',
      currency: 'USD',
      is_featured: true,
      is_published: true,
      seller_id: 'seller1',
      seller: { id: 'seller1', name: 'AutomateX', verified: true },
      rating_average: 4.8,
      rating_count: 124,
      install_count: 1250,
      view_count: 5400,
      difficulty_level: 'intermediate',
      tags: ['sales', 'leads', 'automation', 'crm'],
      images: ['https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg'],
      demo_url: 'https://demo.example.com/lead-qualification',
      documentation_url: 'https://docs.example.com/workflows/lead-qualification',
      metadata: { duration: '5 minutes', steps: 12, integrations: ['Salesforce', 'HubSpot'] },
      created_at: '2025-09-15T10:00:00Z',
      updated_at: '2025-10-01T14:30:00Z',
      integrations: [
        { id: 'int1', product_id: '1', integration_name: 'Salesforce', integration_type: 'native' },
        { id: 'int2', product_id: '1', integration_name: 'HubSpot', integration_type: 'api' }
      ]
    },
    {
      id: '2',
      name: 'Customer Support AI Agent',
      slug: 'customer-support-ai-agent',
      description: 'AI-powered agent that handles customer inquiries 24/7',
      long_description: '# Customer Support AI Agent\n\nProvide exceptional customer service around the clock with our intelligent AI agent. Handles common inquiries, escalates complex issues, and learns from every interaction.\n\n## Capabilities\n- Natural language understanding\n- Multi-language support\n- Sentiment analysis\n- Smart escalation',
      product_type: 'agent',
      category_id: 'cat-support',
      price: 299.00,
      pricing_type: 'subscription',
      currency: 'USD',
      is_featured: true,
      is_published: true,
      seller_id: 'seller2',
      seller: { id: 'seller2', name: 'AI Solutions Inc', verified: true },
      rating_average: 4.9,
      rating_count: 89,
      install_count: 450,
      view_count: 3200,
      difficulty_level: 'beginner',
      tags: ['ai', 'support', 'chatbot', 'customer-service'],
      images: ['https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg'],
      demo_url: 'https://demo.example.com/support-agent',
      metadata: { languages: 12, response_time: '< 2s', accuracy: '95%' },
      created_at: '2025-08-20T10:00:00Z',
      updated_at: '2025-09-28T14:30:00Z',
      integrations: [
        { id: 'int3', product_id: '2', integration_name: 'Zendesk', integration_type: 'native' },
        { id: 'int4', product_id: '2', integration_name: 'Intercom', integration_type: 'api' }
      ]
    },
    {
      id: '3',
      name: 'Professional Resume Templates',
      slug: 'professional-resume-templates',
      description: 'Collection of 50+ ATS-optimized resume templates',
      long_description: '# Professional Resume Templates\n\nStand out with our professionally designed, ATS-optimized resume templates. Perfect for any industry and experience level.\n\n## Includes\n- 50+ unique designs\n- Multiple file formats\n- Easy customization\n- Free updates',
      product_type: 'asset',
      category_id: 'cat-assets',
      price: 29.99,
      pricing_type: 'one_time',
      currency: 'USD',
      is_featured: false,
      is_published: true,
      seller_id: 'seller3',
      seller: { id: 'seller3', name: 'Design Studio', verified: true },
      rating_average: 4.7,
      rating_count: 342,
      install_count: 3400,
      view_count: 12000,
      difficulty_level: 'beginner',
      tags: ['resume', 'templates', 'career', 'design'],
      images: ['https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg'],
      metadata: { templates: 50, formats: ['PDF', 'DOCX', 'INDD'], updates: 'lifetime' },
      created_at: '2025-07-10T10:00:00Z',
      updated_at: '2025-09-15T14:30:00Z'
    },
    {
      id: '4',
      name: 'Email Marketing Automation',
      slug: 'email-marketing-automation',
      description: 'Complete email marketing automation workflow with segmentation',
      long_description: '# Email Marketing Automation\n\nMaximize your email marketing ROI with our comprehensive automation workflow. Segment audiences, personalize content, and optimize send times.\n\n## Features\n- Smart segmentation\n- A/B testing\n- Behavioral triggers\n- Analytics dashboard',
      product_type: 'workflow',
      category_id: 'cat-marketing',
      price: 79.99,
      pricing_type: 'one_time',
      currency: 'USD',
      is_featured: true,
      is_published: true,
      seller_id: 'seller1',
      seller: { id: 'seller1', name: 'AutomateX', verified: true },
      rating_average: 4.6,
      rating_count: 156,
      install_count: 890,
      view_count: 4100,
      difficulty_level: 'intermediate',
      tags: ['email', 'marketing', 'automation', 'campaigns'],
      images: ['https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg'],
      demo_url: 'https://demo.example.com/email-automation',
      metadata: { deliverability: '98%', open_rate_improvement: '35%' },
      created_at: '2025-08-05T10:00:00Z',
      updated_at: '2025-09-22T14:30:00Z',
      integrations: [
        { id: 'int5', product_id: '4', integration_name: 'Mailchimp', integration_type: 'api' },
        { id: 'int6', product_id: '4', integration_name: 'SendGrid', integration_type: 'api' }
      ]
    },
    {
      id: '5',
      name: 'Data Analytics Consulting',
      slug: 'data-analytics-consulting',
      description: 'Expert data analytics and strategy consulting services',
      long_description: '# Data Analytics Consulting\n\nTransform your data into actionable insights with our expert consulting services. We help you build analytics capabilities and make data-driven decisions.\n\n## Services Include\n- Data strategy development\n- Tool selection and implementation\n- Dashboard design\n- Training and enablement',
      product_type: 'service',
      category_id: 'cat-services',
      price: 2500.00,
      pricing_type: 'one_time',
      currency: 'USD',
      is_featured: false,
      is_published: true,
      seller_id: 'seller4',
      seller: { id: 'seller4', name: 'Data Experts', verified: true },
      rating_average: 5.0,
      rating_count: 23,
      install_count: 45,
      view_count: 890,
      difficulty_level: 'expert',
      tags: ['consulting', 'analytics', 'data', 'strategy'],
      images: ['https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg'],
      metadata: { duration: '4 weeks', deliverables: 'Full analytics framework' },
      created_at: '2025-06-15T10:00:00Z',
      updated_at: '2025-09-10T14:30:00Z'
    },
    {
      id: '6',
      name: 'Invoice Generator Pro',
      slug: 'invoice-generator-pro',
      description: 'Professional invoice generator with multi-currency support',
      long_description: '# Invoice Generator Pro\n\nCreate professional invoices in seconds. Supports multiple currencies, tax calculations, and automatic payment reminders.\n\n## Features\n- Beautiful templates\n- Multi-currency support\n- Automatic tax calculation\n- Payment tracking\n- Client portal',
      product_type: 'tool',
      category_id: 'cat-tools',
      price: 49.00,
      pricing_type: 'subscription',
      currency: 'USD',
      is_featured: true,
      is_published: true,
      seller_id: 'seller5',
      seller: { id: 'seller5', name: 'FinTools', verified: true },
      rating_average: 4.8,
      rating_count: 267,
      install_count: 1890,
      view_count: 7600,
      difficulty_level: 'beginner',
      tags: ['invoicing', 'billing', 'finance', 'accounting'],
      images: ['https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg'],
      demo_url: 'https://demo.example.com/invoice-generator',
      metadata: { currencies: 150, templates: 20, integrations: ['QuickBooks', 'Xero'] },
      created_at: '2025-07-25T10:00:00Z',
      updated_at: '2025-09-30T14:30:00Z',
      integrations: [
        { id: 'int7', product_id: '6', integration_name: 'QuickBooks', integration_type: 'api' },
        { id: 'int8', product_id: '6', integration_name: 'Xero', integration_type: 'api' }
      ]
    }
  ];

  private mockCategories: MarketplaceCategory[] = [
    { id: 'cat-all', name: 'All Products', slug: 'all', description: 'Browse all marketplace products', icon: 'grid', display_order: 0, is_active: true },
    { id: 'cat-workflows', name: 'Workflows', slug: 'workflows', description: 'Pre-built automation workflows', icon: 'workflow', display_order: 1, is_active: true, product_count: 2 },
    { id: 'cat-agents', name: 'AI Agents', slug: 'agents', description: 'Intelligent AI agents', icon: 'bot', display_order: 2, is_active: true, product_count: 1 },
    { id: 'cat-assets', name: 'Digital Assets', slug: 'assets', description: 'Templates and resources', icon: 'package', display_order: 3, is_active: true, product_count: 1 },
    { id: 'cat-services', name: 'Services', slug: 'services', description: 'Professional services', icon: 'briefcase', display_order: 4, is_active: true, product_count: 1 },
    { id: 'cat-tools', name: 'Tools', slug: 'tools', description: 'Productivity tools', icon: 'wrench', display_order: 5, is_active: true, product_count: 1 },
    { id: 'cat-marketing', name: 'Marketing', slug: 'marketing', description: 'Marketing automation', icon: 'megaphone', display_order: 6, is_active: true },
    { id: 'cat-sales', name: 'Sales', slug: 'sales', description: 'Sales enablement', icon: 'trending-up', display_order: 7, is_active: true },
    { id: 'cat-support', name: 'Customer Support', slug: 'customer-support', description: 'Support automation', icon: 'headphones', display_order: 8, is_active: true }
  ];

  private mockCollections: ProductCollection[] = [
    {
      id: 'col1',
      name: 'Startup Essentials',
      slug: 'startup-essentials',
      description: 'Everything you need to launch your startup - workflows, tools, and templates',
      image_url: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg',
      is_featured: true,
      display_order: 1,
      product_count: 4,
      created_at: '2025-09-01T10:00:00Z'
    },
    {
      id: 'col2',
      name: 'Enterprise Pack',
      slug: 'enterprise-pack',
      description: 'Enterprise-grade solutions for large organizations',
      image_url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      is_featured: true,
      display_order: 2,
      product_count: 3,
      created_at: '2025-09-01T10:00:00Z'
    },
    {
      id: 'col3',
      name: 'Marketing Suite',
      slug: 'marketing-suite',
      description: 'Complete marketing automation toolkit',
      image_url: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg',
      is_featured: true,
      display_order: 3,
      product_count: 2,
      created_at: '2025-09-01T10:00:00Z'
    }
  ];

  async getProducts(filters?: ProductFilters): Promise<MarketplaceProduct[]> {
    let products = [...this.mockProducts];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.tags.some(t => t.toLowerCase().includes(search))
      );
    }

    if (filters?.category && filters.category !== 'all') {
      products = products.filter(p => p.category_id === filters.category);
    }

    if (filters?.product_type) {
      products = products.filter(p => p.product_type === filters.product_type);
    }

    if (filters?.pricing_type) {
      products = products.filter(p => p.pricing_type === filters.pricing_type);
    }

    if (filters?.difficulty_level) {
      products = products.filter(p => p.difficulty_level === filters.difficulty_level);
    }

    if (filters?.min_price !== undefined) {
      products = products.filter(p => p.price >= filters.min_price!);
    }

    if (filters?.max_price !== undefined) {
      products = products.filter(p => p.price <= filters.max_price!);
    }

    if (filters?.min_rating !== undefined) {
      products = products.filter(p => p.rating_average >= filters.min_rating!);
    }

    if (filters?.tags && filters.tags.length > 0) {
      products = products.filter(p =>
        filters.tags!.some(tag => p.tags.includes(tag))
      );
    }

    if (filters?.integrations && filters.integrations.length > 0) {
      products = products.filter(p =>
        p.integrations?.some(int =>
          filters.integrations!.includes(int.integration_name)
        )
      );
    }

    if (filters?.is_featured !== undefined) {
      products = products.filter(p => p.is_featured === filters.is_featured);
    }

    if (filters?.sort_by) {
      products = this.sortProducts(products, filters.sort_by);
    }

    return products;
  }

  async getProductBySlug(slug: string): Promise<MarketplaceProduct | null> {
    return this.mockProducts.find(p => p.slug === slug) || null;
  }

  async getCategories(): Promise<MarketplaceCategory[]> {
    return this.mockCategories;
  }

  async getCollections(featuredOnly = false): Promise<ProductCollection[]> {
    if (featuredOnly) {
      return this.mockCollections.filter(c => c.is_featured);
    }
    return this.mockCollections;
  }

  async getCollectionBySlug(slug: string): Promise<ProductCollection | null> {
    const collection = this.mockCollections.find(c => c.slug === slug);
    if (!collection) return null;

    const products = this.mockProducts.slice(0, collection.product_count || 3);
    return { ...collection, products };
  }

  async getFeaturedProducts(limit = 6): Promise<MarketplaceProduct[]> {
    return this.mockProducts.filter(p => p.is_featured).slice(0, limit);
  }

  async getTrendingProducts(limit = 6): Promise<TrendingProduct[]> {
    return this.mockProducts
      .slice(0, limit)
      .map(p => ({
        ...p,
        trend_score: Math.random() * 100,
        weekly_views: Math.floor(Math.random() * 1000),
        weekly_installs: Math.floor(Math.random() * 100)
      }))
      .sort((a, b) => b.trend_score - a.trend_score);
  }

  async getPopularProducts(limit = 6): Promise<PopularProduct[]> {
    return this.mockProducts
      .map(p => ({
        ...p,
        popularity_score: p.install_count * 0.7 + p.view_count * 0.2 + p.rating_average * p.rating_count * 0.1
      }))
      .sort((a, b) => b.popularity_score - a.popularity_score)
      .slice(0, limit);
  }

  async getRecommendations(productId: string, limit = 4): Promise<ProductRecommendation[]> {
    const product = this.mockProducts.find(p => p.id === productId);
    if (!product) return [];

    const recommendations = this.mockProducts
      .filter(p => p.id !== productId)
      .map(p => {
        let score = 0;
        if (p.category_id === product.category_id) score += 40;
        if (p.product_type === product.product_type) score += 30;
        const commonTags = p.tags.filter(t => product.tags.includes(t)).length;
        score += commonTags * 5;
        if (Math.abs(p.price - product.price) < 50) score += 10;

        let reason = '';
        if (p.category_id === product.category_id) reason = 'Same category';
        else if (commonTags > 0) reason = 'Similar tags';
        else reason = 'Popular choice';

        return { product: p, score, reason };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return recommendations;
  }

  async getProductReviews(productId: string): Promise<ProductReview[]> {
    return [
      {
        id: 'rev1',
        product_id: productId,
        user_id: 'user1',
        user: { id: 'user1', name: 'Sarah Johnson' },
        rating: 5,
        title: 'Excellent product!',
        content: 'This has transformed our workflow. Highly recommended!',
        is_verified_purchase: true,
        helpful_count: 12,
        created_at: '2025-09-20T10:00:00Z',
        updated_at: '2025-09-20T10:00:00Z'
      },
      {
        id: 'rev2',
        product_id: productId,
        user_id: 'user2',
        user: { id: 'user2', name: 'Mike Chen' },
        rating: 4,
        title: 'Great value',
        content: 'Works as advertised. Setup was straightforward.',
        is_verified_purchase: true,
        helpful_count: 8,
        created_at: '2025-09-18T10:00:00Z',
        updated_at: '2025-09-18T10:00:00Z'
      }
    ];
  }

  async trackAnalytics(productId: string, eventType: AnalyticsEventType, metadata?: Record<string, any>): Promise<void> {
    console.log('Analytics tracked:', { productId, eventType, metadata });
  }

  async compareProducts(productIds: string[]): Promise<ProductComparison> {
    const products = this.mockProducts.filter(p => productIds.includes(p.id));

    const features = [
      {
        name: 'Price',
        category: 'Pricing',
        values: products.reduce((acc, p) => ({ ...acc, [p.id]: `$${p.price}` }), {})
      },
      {
        name: 'Rating',
        category: 'Reviews',
        values: products.reduce((acc, p) => ({ ...acc, [p.id]: `${p.rating_average} (${p.rating_count} reviews)` }), {})
      },
      {
        name: 'Installs',
        category: 'Popularity',
        values: products.reduce((acc, p) => ({ ...acc, [p.id]: p.install_count.toLocaleString() }), {})
      },
      {
        name: 'Difficulty',
        category: 'Usage',
        values: products.reduce((acc, p) => ({ ...acc, [p.id]: p.difficulty_level }), {})
      }
    ];

    return { products, features };
  }

  async getAllTags(): Promise<string[]> {
    const tags = new Set<string>();
    this.mockProducts.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }

  async getAllIntegrations(): Promise<string[]> {
    const integrations = new Set<string>();
    this.mockProducts.forEach(p =>
      p.integrations?.forEach(i => integrations.add(i.integration_name))
    );
    return Array.from(integrations).sort();
  }

  private sortProducts(products: MarketplaceProduct[], sortBy: string): MarketplaceProduct[] {
    switch (sortBy) {
      case 'popular':
        return products.sort((a, b) => b.install_count - a.install_count);
      case 'newest':
        return products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      case 'price_asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => b.rating_average - a.rating_average);
      case 'trending':
        return products.sort((a, b) => b.view_count - a.view_count);
      default:
        return products;
    }
  }
}

export const marketplaceService = new MarketplaceService();
