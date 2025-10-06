import React from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, ArrowUpRight } from "lucide-react";
import { Badge } from "../../components/ui/Badge";

export default function BlogPostPage() {
  const { slug } = useParams();

  // Mock blog post data - in real app, fetch based on slug
  const post = {
    title: "The Future of Business Automation in 2025",
    excerpt: "Explore the latest trends and technologies shaping the automation landscape and how businesses can prepare for the next wave of intelligent automation.",
    content: `
      <p class="lead">Business automation is evolving at an unprecedented pace. As we move into 2025, several key trends are reshaping how organizations approach process automation and digital transformation.</p>
      
      <h2>The Rise of Intelligent Automation</h2>
      <p>Traditional automation focused on rule-based processes and simple task execution. Today's intelligent automation combines artificial intelligence, machine learning, and process automation to create systems that can adapt, learn, and make decisions autonomously.</p>
      
      <blockquote>
        <p>"The future belongs to organizations that can seamlessly blend human creativity with machine intelligence to create unprecedented value."</p>
        <cite>— Sarah Chen, VP of Operations at TechFlow</cite>
      </blockquote>
      
      <h3>Key Benefits of Intelligent Automation:</h3>
      <ul>
        <li><strong>Reduced manual intervention:</strong> AI-powered systems can handle complex scenarios without human oversight</li>
        <li><strong>Improved accuracy and consistency:</strong> Machine learning reduces errors and ensures consistent outcomes</li>
        <li><strong>Faster processing times:</strong> Automated workflows execute in seconds rather than hours or days</li>
        <li><strong>Better customer experiences:</strong> Instant responses and personalized interactions at scale</li>
        <li><strong>Scalable operations:</strong> Handle increasing workloads without proportional staff increases</li>
      </ul>
      
      <h2>AI-Powered Decision Making</h2>
      <p>The integration of AI into business processes is enabling automated decision-making at scale. From lead scoring to inventory management, AI is helping businesses make smarter decisions faster than ever before.</p>
      
      <h2>Getting Started with Intelligent Automation</h2>
      <p>The key to successful automation implementation is starting small and scaling gradually. Begin with high-impact, low-complexity processes and build your automation capabilities over time.</p>
      
      <h2>Conclusion</h2>
      <p>The future of business automation is bright, with intelligent systems that can think, learn, and adapt becoming the norm rather than the exception. Organizations that embrace this transformation today will be the leaders of tomorrow.</p>
    `,
    category: "Automation",
    author: "Sarah Chen",
    authorBio: "Sarah is VP of Operations at TechFlow and a leading expert in business process automation. She has helped hundreds of companies transform their operations with intelligent automation.",
    authorAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    publishedAt: new Date("2024-12-15"),
    readTime: "8 min read",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    tags: ["automation", "AI", "trends", "business", "digital transformation", "machine learning"]
  };

  const relatedPosts = [
    {
      title: "How AI Agents Are Transforming Customer Support",
      href: "/blog/ai-agents-customer-support",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      category: "AI Agents",
      readTime: "6 min read"
    },
    {
      title: "Building Scalable Workflows: Best Practices",
      href: "/blog/scalable-workflows-best-practices",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      category: "Workflows",
      readTime: "7 min read"
    },
    {
      title: "ROI of Automation: Measuring Success",
      href: "/blog/roi-automation-measuring-success",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      category: "Business",
      readTime: "5 min read"
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Badge variant="accent">{post.category}</Badge>
              <div className="flex items-center gap-4 text-sm text-monks-gray">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.publishedAt.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {post.author}
                </div>
              </div>
            </div>
            
            <h1 className="text-display font-bold text-monks-black">
              {post.title}
            </h1>
            
            <p className="text-xl text-monks-gray leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-monks-light-gray rounded-full hover:bg-monks-gray hover:text-white transition-all duration-300">
                <Share2 size={16} />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-monks-light-gray rounded-full hover:bg-monks-gray hover:text-white transition-all duration-300">
                <Bookmark size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="aspect-[2/1] rounded-3xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-monks-black prose-p:text-monks-gray prose-li:text-monks-gray prose-strong:text-monks-black prose-blockquote:border-l-monks-accent prose-blockquote:bg-monks-light-gray prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-code:text-monks-accent prose-code:bg-monks-light-gray prose-code:px-2 prose-code:py-1 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Author Bio */}
              <div className="mt-16 pt-8 border-t border-monks-gray/10">
                <div className="bg-monks-light-gray rounded-3xl p-8">
                  <div className="flex items-start gap-6">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-monks-black mb-2">About {post.author}</h3>
                      <p className="text-monks-gray leading-relaxed">{post.authorBio}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-monks-gray/10">
                <h3 className="font-semibold text-monks-black mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter */}
              <div className="bg-monks-accent/5 rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Stay Updated</h3>
                <p className="text-sm text-monks-gray mb-4">
                  Get the latest insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-full bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent text-sm"
                  />
                  <button className="w-full bg-monks-accent text-white px-4 py-2 rounded-full font-medium hover:bg-monks-hover transition-all duration-300 text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-monks-black mb-12 text-center">
            Related Articles
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {relatedPosts.map((relatedPost, i) => (
              <Link
                key={i}
                to={relatedPost.href}
                className="group bg-white rounded-3xl overflow-hidden hover:shadow-card transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <Badge variant="accent" size="sm">{relatedPost.category}</Badge>
                  <h3 className="font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300">
                    {relatedPost.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-monks-gray">
                    <Clock size={12} />
                    {relatedPost.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Automation Journey?</h2>
          <p className="text-xl text-white/80 mb-8">
            Transform your business operations with intelligent automation. Get started in minutes.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300 group"
          >
            Get Started Free
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}