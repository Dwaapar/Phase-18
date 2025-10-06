import { useState } from 'react';
import { Download, Image, Mail, Share2, FileText, Video, Copy, Check } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';

interface Creative {
  id: string;
  type: 'banner' | 'email' | 'social' | 'landing_page' | 'video' | 'copy';
  title: string;
  description: string;
  asset_url?: string;
  thumbnail_url?: string;
  dimensions?: string;
  format?: string;
  copy_text?: string;
  tags: string[];
}

export default function AffiliateCreativesPage() {
  const [activeTab, setActiveTab] = useState('banners');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const creatives: Creative[] = [
    {
      id: '1',
      type: 'banner',
      title: 'Hero Banner - Automation Platform',
      description: 'Full-width hero banner showcasing enterprise automation',
      asset_url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      thumbnail_url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
      dimensions: '1200x628',
      format: 'PNG',
      tags: ['hero', 'automation', 'enterprise']
    },
    {
      id: '2',
      type: 'banner',
      title: 'Leaderboard Banner - Workflow Store',
      description: 'Horizontal banner for promoting the workflow marketplace',
      asset_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      thumbnail_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      dimensions: '728x90',
      format: 'PNG',
      tags: ['workflows', 'marketplace', 'leaderboard']
    },
    {
      id: '3',
      type: 'banner',
      title: 'Square Banner - AI Agents',
      description: 'Square banner for social media and sidebar placement',
      asset_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      thumbnail_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      dimensions: '600x600',
      format: 'PNG',
      tags: ['ai', 'agents', 'square']
    },
    {
      id: '4',
      type: 'email',
      title: 'Product Launch Email',
      description: 'Announce new features and capabilities',
      copy_text: `Subject: Transform Your Business with AI-Powered Automation

Hi [Name],

Discover how Findawise is revolutionizing enterprise automation with our comprehensive platform featuring:

• 500+ Pre-built Workflows
• Custom AI Agents
• Digital Asset Marketplace
• Enterprise-grade Security

Get started with a 14-day free trial today!

[CTA Button]

Best regards,
The Findawise Team`,
      tags: ['launch', 'announcement', 'features']
    },
    {
      id: '5',
      type: 'email',
      title: 'Limited Time Offer',
      description: 'Promotional email for special pricing',
      copy_text: `Subject: 🎉 Exclusive Offer: Save 30% on Annual Plans

Hi [Name],

For a limited time, get 30% off Findawise annual plans!

✅ 500+ Pre-built Workflows
✅ Unlimited AI Agents
✅ Priority Support
✅ Advanced Analytics

Use code: FINDAWISE30

This offer ends soon. Don't miss out!

[CTA Button]

Cheers,
The Findawise Team`,
      tags: ['promotion', 'discount', 'limited']
    },
    {
      id: '6',
      type: 'social',
      title: 'LinkedIn Post - Case Study',
      description: 'Share success story and ROI metrics',
      copy_text: `🚀 How TechCorp Automated 10,000 Hours of Work with Findawise

Results after 3 months:
• 75% reduction in manual tasks
• $500K annual savings
• 95% employee satisfaction
• 3x faster project delivery

Ready to transform your operations?

Learn more: [Affiliate Link]

#Automation #AI #Productivity #Enterprise`,
      tags: ['case-study', 'linkedin', 'success']
    },
    {
      id: '7',
      type: 'social',
      title: 'Twitter Thread - Feature Highlight',
      description: 'Multi-tweet thread showcasing key features',
      copy_text: `🧵 7 Ways Findawise Transforms Enterprise Operations:

1/ Workflow Automation
Build and deploy custom workflows in minutes, not weeks. 500+ pre-built templates available.

2/ AI-Powered Agents
Deploy intelligent agents that learn from your processes and adapt to your needs.

3/ Digital Asset Marketplace
Access thousands of templates, integrations, and automation components.

4/ Enterprise Security
SOC2 certified, GDPR compliant, with enterprise-grade encryption and access controls.

5/ No-Code Platform
Empower your team to automate without coding. Drag, drop, done.

6/ Real-Time Analytics
Track performance, identify bottlenecks, and optimize continuously.

7/ Seamless Integrations
Connect with 100+ tools your team already uses.

Ready to get started? [Affiliate Link]`,
      tags: ['twitter', 'thread', 'features']
    },
    {
      id: '8',
      type: 'social',
      title: 'Instagram Story - Quick Tip',
      description: 'Visual story template with automation tip',
      copy_text: `💡 Automation Tip:

Automate your lead routing and save 10+ hours per week

With Findawise:
✓ Instant lead distribution
✓ Smart scoring & prioritization
✓ Auto-follow-ups
✓ CRM sync

Try it free → [Swipe Up]`,
      tags: ['instagram', 'story', 'tip']
    },
    {
      id: '9',
      type: 'video',
      title: 'Platform Overview - 90 seconds',
      description: 'Quick walkthrough of main features',
      asset_url: 'https://player.vimeo.com/video/example',
      thumbnail_url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      format: 'MP4',
      tags: ['demo', 'overview', 'tutorial']
    },
    {
      id: '10',
      type: 'landing_page',
      title: 'Dedicated Affiliate Landing Page',
      description: 'Pre-optimized landing page for conversions',
      copy_text: `# Automate Your Enterprise with Findawise

## Transform Operations in 3 Simple Steps

1. **Choose Your Workflows**
   Browse 500+ pre-built automation templates

2. **Deploy AI Agents**
   Set up intelligent assistants in minutes

3. **Watch Efficiency Soar**
   Track ROI with real-time analytics

## Trusted by Leading Enterprises

[Testimonials Section]

## Start Your Free Trial Today

✓ 14-day free trial
✓ No credit card required
✓ Cancel anytime

[CTA Button]`,
      tags: ['landing', 'conversion', 'trial']
    }
  ];

  const tabs = [
    { id: 'banners', label: 'Banners', icon: Image },
    { id: 'email', label: 'Email Templates', icon: Mail },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'landing_page', label: 'Landing Pages', icon: FileText },
    { id: 'video', label: 'Videos', icon: Video }
  ];

  const filteredCreatives = creatives.filter(c => c.type === activeTab);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderCreative = (creative: Creative) => {
    if (creative.asset_url) {
      return (
        <Card key={creative.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video bg-slate-100 overflow-hidden">
            <img
              src={creative.thumbnail_url || creative.asset_url}
              alt={creative.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-1">{creative.title}</h3>
            <p className="text-sm text-slate-600 mb-3">{creative.description}</p>

            {creative.dimensions && (
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span>{creative.dimensions}</span>
                <span>{creative.format}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {creative.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>

            <Button className="w-full" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </Card>
      );
    }

    return (
      <Card key={creative.id} className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">{creative.title}</h3>
            <p className="text-sm text-slate-600">{creative.description}</p>
          </div>
        </div>

        {creative.copy_text && (
          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans">
              {creative.copy_text}
            </pre>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {creative.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
              {tag}
            </span>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => creative.copy_text && handleCopy(creative.copy_text, creative.id)}
        >
          {copiedId === creative.id ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </>
          )}
        </Button>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Marketing Assets</h1>
          <p className="text-slate-600">
            Download ready-to-use marketing materials to promote Findawise products
          </p>
        </div>

        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <h2 className="font-semibold text-slate-900 mb-2">Guidelines for Using Marketing Assets</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Always include your affiliate disclosure when using these materials</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Replace [Affiliate Link] placeholders with your tracked URLs</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Do not modify logos or make false claims about products</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
              <span>Follow platform-specific guidelines for each channel</span>
            </li>
          </ul>
        </Card>

        <div className="mb-6">
          <Tabs
            tabs={tabs.map(tab => ({
              id: tab.id,
              label: tab.label,
              icon: tab.icon
            }))}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreatives.map(renderCreative)}
        </div>

        {filteredCreatives.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No assets available in this category yet.</p>
            <p className="text-sm text-slate-500 mt-2">Check back soon for new marketing materials!</p>
          </div>
        )}
      </Container>
    </div>
  );
}
