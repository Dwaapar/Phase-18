import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, TrendingUp, Star, Download, Users, Zap, Package, Bot, FileText, Wrench, ArrowRight, Grid3x3, List } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';

const categories = [
  {
    id: 'workflows',
    name: 'Workflows',
    icon: Zap,
    count: 350,
    description: 'Pre-built automation workflows ready to deploy',
    color: 'from-blue-500 to-cyan-500',
    link: '/marketplace/workflows'
  },
  {
    id: 'agents',
    name: 'AI Agents',
    icon: Bot,
    count: 50,
    description: 'Intelligent agents for every business function',
    color: 'from-purple-500 to-pink-500',
    link: '/marketplace/agents'
  },
  {
    id: 'assets',
    name: 'Digital Assets',
    icon: Package,
    count: 200,
    description: 'Premium templates, datasets, and playbooks',
    color: 'from-orange-500 to-red-500',
    link: '/marketplace/assets'
  },
  {
    id: 'services',
    name: 'Automation Services',
    icon: Wrench,
    count: 20,
    description: 'Custom automation solutions delivered by experts',
    color: 'from-green-500 to-emerald-500',
    link: '/marketplace/services'
  },
  {
    id: 'tools',
    name: 'Professional Tools',
    icon: FileText,
    count: 8,
    description: 'Career tools and productivity utilities',
    color: 'from-slate-500 to-gray-600',
    link: '/tools'
  }
];

const featuredProducts = [
  {
    id: '1',
    name: 'Lead Scoring & Routing Engine',
    type: 'workflow',
    category: 'Sales',
    description: 'Automatically score leads and route to the right sales rep based on fit and engagement',
    price: 'Free',
    rating: 4.9,
    reviews: 234,
    installs: 1200,
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Popular', 'Trending'],
    tier: 'free'
  },
  {
    id: '2',
    name: 'Customer Support AI Agent',
    type: 'agent',
    category: 'Support',
    description: 'AI-powered support agent that handles tier-1 inquiries across email, chat, and social',
    price: '$299/mo',
    rating: 4.8,
    reviews: 156,
    installs: 890,
    image: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Featured', 'New'],
    tier: 'professional'
  },
  {
    id: '3',
    name: 'SaaS Growth Playbook 2025',
    type: 'asset',
    category: 'Marketing',
    description: '150-page comprehensive guide with frameworks, templates, and strategies for scaling SaaS',
    price: '$49',
    rating: 5.0,
    reviews: 89,
    installs: 450,
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Bestseller'],
    tier: 'professional'
  },
  {
    id: '4',
    name: 'Invoice Processing Automation',
    type: 'workflow',
    category: 'Finance',
    description: 'Extract data from invoices, match POs, route for approval, and sync to accounting system',
    price: 'Free',
    rating: 4.7,
    reviews: 178,
    installs: 2100,
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Popular'],
    tier: 'free'
  },
  {
    id: '5',
    name: 'SDR Outreach Agent',
    type: 'agent',
    category: 'Sales',
    description: 'AI sales development rep that researches prospects, writes personalized emails, and books meetings',
    price: '$499/mo',
    rating: 4.9,
    reviews: 112,
    installs: 340,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Featured', 'Trending'],
    tier: 'enterprise'
  },
  {
    id: '6',
    name: 'Custom CRM Integration Suite',
    type: 'service',
    category: 'Operations',
    description: 'Full-service integration connecting your CRM with marketing, support, and analytics tools',
    price: 'From $5,000',
    rating: 5.0,
    reviews: 45,
    installs: 120,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Enterprise'],
    tier: 'enterprise'
  }
];

const trendingSearches = [
  'Lead routing', 'Customer onboarding', 'Invoice automation', 'Email campaigns',
  'Data enrichment', 'Support ticketing', 'Sales forecasting', 'Content moderation'
];

export default function UnifiedMarketplaceHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzRmNjA3OCIgc3Ryb2tlLXdpZHRoPSIuNSIgb3BhY2l0eT0iLjIiLz48L2c+PC9zdmc+')] opacity-20"></div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/10 text-white border-white/20">
              600+ Products | 10,000+ Active Users | 4.8★ Average Rating
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              The Complete Automation Marketplace
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Discover 350+ workflows, 50+ AI agents, 200+ premium assets, and professional services.
              <br />Everything you need to automate, optimize, and scale your business.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search workflows, agents, assets, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 shadow-xl bg-white"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <span className="text-sm text-slate-400">Trending:</span>
                {trendingSearches.slice(0, 4).map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="text-sm px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">600+</div>
                <div className="text-sm text-slate-400">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-sm text-slate-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">4.8★</div>
                <div className="text-sm text-slate-400">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-slate-400">Deployments</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-slate-600">
              Explore our complete catalog organized by product type
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} to={category.link}>
                  <Card className="group hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-slate-300">
                    <div className="p-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-slate-900">
                          {category.count}+ Products
                        </span>
                        <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
              <p className="text-xl text-slate-600">
                Hand-picked products trusted by thousands of businesses
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className={`${
                          tag === 'Featured' ? 'bg-blue-600' :
                          tag === 'Trending' ? 'bg-orange-600' :
                          tag === 'Popular' ? 'bg-green-600' :
                          tag === 'New' ? 'bg-purple-600' :
                          tag === 'Bestseller' ? 'bg-yellow-600' :
                          'bg-slate-600'
                        } text-white border-0`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <span className="text-lg font-bold text-slate-900">
                      {product.price}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-slate-900">{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{product.installs.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-blue-700 transition-colors">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <div className="text-left">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-slate-600">Customer Satisfaction</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="text-left">
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm text-slate-600">Active Users</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-8 h-8 text-orange-600" />
                <div className="text-left">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm text-slate-600">Deployments</div>
                </div>
              </div>
            </div>
            <p className="text-xl text-slate-600">
              Trusted by startups to enterprises across 50+ countries
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Start with our free tier and scale as you grow. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100">
                Browse Free Products
              </Button>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
