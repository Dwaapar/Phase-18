import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, Star, Eye, Share2, FileText, Database, BookOpen, Package } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/Tabs";
import { TestimonialCard } from "../../components/ui/TestimonialCard";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

export default function AssetDetailPage() {
  const { slug } = useParams();
  const [isDownloading, setIsDownloading] = useState(false);
  const { addToast } = useToast();

  // Mock asset data - in real app, fetch based on slug
  const asset = {
    name: "Sales Prompt Pack",
    type: "Prompt Pack",
    description: "A comprehensive collection of 50+ AI prompts specifically designed for sales professionals to improve conversion rates and customer engagement.",
    category: "Sales",
    downloads: "2,100",
    rating: 4.9,
    reviews: 156,
    pricing: "Free",
    fileSize: "2.5 MB",
    format: "JSON",
    lastUpdated: "December 2024",
    author: "Findawise Team",
    tags: ["sales", "prompts", "ai", "conversion", "outreach"],
    preview: `{
  "lead_qualification": {
    "prompt": "You are a sales qualification expert. Analyze this lead and provide a score from 1-10 based on: company size, industry fit, budget indicators, and urgency signals. Lead details: {{lead_info}}",
    "use_case": "Qualify inbound leads automatically",
    "expected_output": "Qualification score with reasoning"
  },
  "email_outreach": {
    "prompt": "Write a personalized sales email for {{prospect_name}} at {{company}}. Focus on {{pain_point}} and how our {{solution}} can help. Keep it under 150 words and include a clear call-to-action.",
    "use_case": "Generate personalized outreach emails",
    "expected_output": "Professional sales email"
  }
}`,
    contents: [
      "Lead qualification prompts (10)",
      "Email outreach templates (15)",
      "Objection handling responses (12)",
      "Follow-up sequences (8)",
      "Discovery question frameworks (5)"
    ],
    relatedAssets: [
      {
        name: "Marketing Prompt Pack",
        type: "Prompt Pack",
        href: "/assets/marketing-prompt-pack"
      },
      {
        name: "Sales Playbook",
        type: "Playbook", 
        href: "/assets/sales-playbook"
      },
      {
        name: "Customer Data Dataset",
        type: "Dataset",
        href: "/assets/customer-data-dataset"
      }
    ]
  };

  const reviews = [
    {
      name: "Marcus Johnson",
      role: "Sales Manager",
      company: "TechCorp",
      quote: "These prompts have transformed our sales process. Our conversion rates increased by 35% in the first month.",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5
    },
    {
      name: "Sarah Williams",
      role: "VP Sales",
      company: "GrowthLabs",
      quote: "Incredible value. The email templates alone saved us weeks of copywriting work.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      rating: 5
    }
  ];

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addToast({
        type: 'success',
        title: 'Download started!',
        description: 'Your asset is being downloaded to your device.'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Download failed',
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Prompt Pack": return FileText;
      case "Dataset": return Database;
      case "Playbook": return BookOpen;
      case "Creative Bundle": return Package;
      default: return FileText;
    }
  };

  const TypeIcon = getTypeIcon(asset.type);

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            to="/assets"
            className="inline-flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={16} />
            Back to Assets
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="accent">{asset.category}</Badge>
                <Badge variant="secondary">{asset.type}</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="text-yellow-500 fill-yellow-500" size={14} />
                  <span className="text-monks-black">{asset.rating}</span>
                  <span className="text-monks-gray">({asset.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-display font-bold text-monks-black">
                {asset.name}
              </h1>
              
              <p className="text-xl text-monks-gray leading-relaxed">
                {asset.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-monks-gray">
                <div className="flex items-center gap-1">
                  <Download size={14} />
                  <span>{asset.downloads} downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <TypeIcon size={14} />
                  <span>{asset.format}</span>
                </div>
                <div>By {asset.author}</div>
              </div>
            </div>
            
            <div className="bg-monks-light-gray rounded-3xl p-8 space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-monks-black mb-2">{asset.pricing}</div>
                <p className="text-monks-gray">Download instantly</p>
              </div>
              
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isDownloading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download Asset
                  </>
                )}
              </button>
              
              <div className="flex items-center gap-3">
                <button className="flex-1 border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300 flex items-center justify-center gap-2">
                  <Eye size={14} />
                  Preview
                </button>
                <button className="flex-1 border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300 flex items-center justify-center gap-2">
                  <Share2 size={14} />
                  Share
                </button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-monks-gray">File Size:</span>
                  <span className="text-monks-black">{asset.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-monks-gray">Format:</span>
                  <span className="text-monks-black">{asset.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-monks-gray">Last Updated:</span>
                  <span className="text-monks-black">{asset.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="contents">Contents</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="bg-white rounded-3xl border border-monks-gray/10 p-8">
                    <h2 className="text-2xl font-bold text-monks-black mb-6">What's Included</h2>
                    <div className="space-y-4">
                      {asset.contents.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-monks-light-gray rounded-2xl">
                          <CheckCircle size={16} className="text-green-500" />
                          <span className="text-monks-black">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contents">
                  <div className="bg-white rounded-3xl border border-monks-gray/10 p-8">
                    <h2 className="text-2xl font-bold text-monks-black mb-6">Detailed Contents</h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-monks-gray leading-relaxed">
                        This comprehensive sales prompt pack includes carefully crafted prompts for every stage 
                        of the sales process. Each prompt has been tested and optimized for maximum effectiveness.
                      </p>
                      
                      <h3 className="text-xl font-bold text-monks-black mt-8 mb-4">What You'll Get:</h3>
                      <ul className="space-y-2">
                        <li><strong>Lead Qualification Prompts:</strong> 10 prompts for scoring and qualifying leads</li>
                        <li><strong>Email Outreach Templates:</strong> 15 proven email templates for different scenarios</li>
                        <li><strong>Objection Handling:</strong> 12 prompts for overcoming common objections</li>
                        <li><strong>Follow-up Sequences:</strong> 8 automated follow-up prompt chains</li>
                        <li><strong>Discovery Questions:</strong> 5 frameworks for effective discovery calls</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <div className="bg-white rounded-3xl border border-monks-gray/10 p-8">
                    <h2 className="text-2xl font-bold text-monks-black mb-6">Preview</h2>
                    <div className="bg-monks-dark-gray rounded-2xl p-6">
                      <pre className="text-white/90 text-sm overflow-x-auto">
                        <code>{asset.preview}</code>
                      </pre>
                    </div>
                    <p className="text-sm text-monks-gray mt-4">
                      This is a sample of the prompts included in this pack. Download to access all 50+ prompts.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="reviews">
                  <div className="space-y-8">
                    {reviews.map((review, i) => (
                      <TestimonialCard key={i} {...review} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tags */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {asset.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Related Assets */}
              <div className="bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Related Assets</h3>
                <div className="space-y-3">
                  {asset.relatedAssets.map((related, i) => (
                    <Link
                      key={i}
                      to={related.href}
                      className="block p-3 bg-monks-light-gray rounded-lg hover:bg-monks-gray/10 transition-colors duration-300"
                    >
                      <h4 className="font-medium text-monks-black text-sm">{related.name}</h4>
                      <p className="text-monks-gray text-xs">{related.type}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="bg-monks-light-gray rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Share this Asset</h3>
                <div className="space-y-3">
                  <button className="w-full bg-white px-4 py-2 rounded-lg font-medium hover:bg-monks-gray hover:text-white transition-all duration-300">
                    Share on LinkedIn
                  </button>
                  <button className="w-full bg-white px-4 py-2 rounded-lg font-medium hover:bg-monks-gray hover:text-white transition-all duration-300">
                    Share on Twitter
                  </button>
                  <button className="w-full bg-white px-4 py-2 rounded-lg font-medium hover:bg-monks-gray hover:text-white transition-all duration-300">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}