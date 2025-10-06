import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Zap, Bot, Package, Wrench, FileText, ArrowRight, Star, Download, TrendingUp } from 'lucide-react';

const categories = [
  {
    id: 'workflows',
    name: 'Workflows',
    icon: Zap,
    count: '350+',
    description: 'Pre-built automation workflows',
    color: 'from-blue-500 to-cyan-500',
    link: '/marketplace/workflows',
    featured: 'Lead scoring & routing'
  },
  {
    id: 'agents',
    name: 'AI Agents',
    icon: Bot,
    count: '50+',
    description: 'Intelligent business agents',
    color: 'from-purple-500 to-pink-500',
    link: '/marketplace/agents',
    featured: 'Customer support AI'
  },
  {
    id: 'assets',
    name: 'Digital Assets',
    icon: Package,
    count: '200+',
    description: 'Templates & playbooks',
    color: 'from-orange-500 to-red-500',
    link: '/marketplace/assets',
    featured: 'SaaS growth playbook'
  },
  {
    id: 'services',
    name: 'Services',
    icon: Wrench,
    count: '20+',
    description: 'Expert automation services',
    color: 'from-green-500 to-emerald-500',
    link: '/marketplace/services',
    featured: 'Custom integrations'
  }
];

const stats = [
  { label: 'Total Products', value: '600+', icon: Package },
  { label: 'Active Users', value: '10K+', icon: TrendingUp },
  { label: 'Avg Rating', value: '4.8★', icon: Star },
  { label: 'Deployments', value: '50K+', icon: Download }
];

export default function MarketplaceFeature() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
            600+ Products Available
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Complete Automation Marketplace
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to automate your business in one place. From ready-to-deploy workflows
            to AI agents, premium assets, and professional services.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} to={category.link}>
                <Card className="group hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-blue-300">
                  <div className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="mb-3">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <div className="text-2xl font-bold text-blue-600">{category.count}</div>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="text-xs text-slate-500 mb-4">
                      Featured: {category.featured}
                    </div>
                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                      Explore
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Featured Products Preview */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-blue-500/20 text-blue-200 border-blue-400/30">
                Featured This Week
              </Badge>
              <h3 className="text-3xl font-bold mb-4">
                Lead Scoring & Routing Engine
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Automatically score leads based on 20+ signals and route to the right sales rep.
                Includes CRM sync, Slack notifications, and real-time analytics dashboard.
              </p>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">4.9</span>
                  <span className="text-slate-400">(234 reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-5 h-5" />
                  <span>1,200+ installs</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100">
                  View Details
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Try Free
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Lead Scoring Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                FREE
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/marketplace">
            <Button size="lg" className="group">
              Explore Full Marketplace
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-sm text-slate-600 mt-4">
            Start with our free tier • No credit card required • Deploy in minutes
          </p>
        </div>
      </Container>
    </section>
  );
}
