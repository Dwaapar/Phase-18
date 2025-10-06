import { Link } from "react-router-dom";
import { Link2, TrendingUp, DollarSign, Target, Award, Download, BarChart3, Shield, Users } from "lucide-react";
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export default function AffiliatePage() {
  const features = [
    {
      title: "High Commissions",
      description: "Earn up to 30% on digital assets and 20% recurring on subscriptions",
      icon: DollarSign
    },
    {
      title: "30-Day Cookies",
      description: "Get credit for conversions within 30 days of the click",
      icon: Target
    },
    {
      title: "Marketing Assets",
      description: "Access banners, email templates, and promotional content",
      icon: Download
    },
    {
      title: "Performance Tracking",
      description: "Real-time analytics and conversion tracking",
      icon: TrendingUp
    },
    {
      title: "Bonus Rewards",
      description: "Earn additional bonuses for reaching revenue milestones",
      icon: Award
    },
    {
      title: "Compliance Support",
      description: "Guidelines and monitoring to ensure compliant promotions",
      icon: Shield
    }
  ];

  const programs = [
    {
      name: "Workflows",
      commission: "20%",
      type: "Recurring",
      description: "Pro subscription revenue"
    },
    {
      name: "AI Agents",
      commission: "15%",
      type: "First Year",
      description: "Agent deployment revenue"
    },
    {
      name: "Digital Assets",
      commission: "30%",
      type: "One-time",
      description: "Template and asset sales"
    },
    {
      name: "Services",
      commission: "10%",
      type: "Project Value",
      description: "Consulting and implementation"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Container>
        <div className="text-center mb-16 py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
            Findawise Affiliate Program
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Partner with us to promote enterprise automation solutions and earn competitive
            commissions. Join hundreds of affiliates already earning with Findawise.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/affiliate/apply">
              <Button size="lg">
                Apply Now
              </Button>
            </Link>
            <Link to="/affiliate/dashboard">
              <Button size="lg" variant="outline">
                Affiliate Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card key={i} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Commission Structure</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Earn competitive commissions across all Findawise products and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-xl transition-shadow border-t-4 border-blue-600">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{program.name}</h3>
                <div className="mb-3">
                  <span className="text-4xl font-bold text-blue-600">{program.commission}</span>
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-2">{program.type}</p>
                <p className="text-sm text-slate-600">{program.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Link to="/affiliate/dashboard">
            <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer h-full">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900">Dashboard</h3>
              </div>
              <p className="text-slate-600">
                Track your clicks, conversions, and earnings in real-time
              </p>
            </Card>
          </Link>

          <Link to="/affiliate/creatives">
            <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer h-full">
              <div className="flex items-center gap-3 mb-4">
                <Download className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-bold text-slate-900">Creative Library</h3>
              </div>
              <p className="text-slate-600">
                Access banners, email templates, and promotional materials
              </p>
            </Card>
          </Link>

          <Link to="/affiliate/leaderboard">
            <Card className="p-8 hover:shadow-xl transition-shadow cursor-pointer h-full">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-orange-600" />
                <h3 className="text-xl font-bold text-slate-900">Leaderboard</h3>
              </div>
              <p className="text-slate-600">
                See top performers and earn bonus rewards
              </p>
            </Card>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">Why Partner with Findawise?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Enterprise Products</p>
                  <p className="text-sm text-slate-600">High-value products with strong conversion rates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Recurring Revenue</p>
                  <p className="text-sm text-slate-600">Earn ongoing commissions on subscription products</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Dedicated Support</p>
                  <p className="text-sm text-slate-600">Get help from our affiliate success team</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Performance Bonuses</p>
                  <p className="text-sm text-slate-600">Unlock additional earnings at revenue milestones</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <h3 className="text-2xl font-bold mb-4">Getting Started is Easy</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold">Apply to Join</p>
                  <p className="text-sm text-blue-100">Submit your application in minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold">Get Approved</p>
                  <p className="text-sm text-blue-100">We review applications within 2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold">Start Earning</p>
                  <p className="text-sm text-blue-100">Access your dashboard and begin promoting</p>
                </div>
              </div>
            </div>
            <Link to="/affiliate/apply">
              <Button className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50">
                Apply Now
              </Button>
            </Link>
          </Card>
        </div>

        <Card className="p-8 mb-16 text-center bg-slate-900 text-white">
          <h2 className="text-3xl font-bold mb-4">Join Hundreds of Successful Affiliates</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Our top affiliates earn over $10,000 per month promoting Findawise products
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <p className="text-4xl font-bold text-blue-400 mb-2">$2.5M+</p>
              <p className="text-slate-300">Total Commissions Paid</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-400 mb-2">500+</p>
              <p className="text-slate-300">Active Affiliates</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-green-400 mb-2">30%</p>
              <p className="text-slate-300">Avg. Commission Rate</p>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
}
