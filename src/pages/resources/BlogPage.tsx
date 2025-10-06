import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowUpRight, Search, X, TrendingUp } from "lucide-react";
import { mockBlogPosts } from "../../data/mockData";

const categories = ["All", "Automation", "AI Agents", "Workflows", "Marketing", "Analytics", "Security", "Technical", "Strategy", "Ethics", "Sales"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    let result = [...mockBlogPosts];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.author.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(post => post.category === selectedCategory);
    }

    return result.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }, [searchTerm, selectedCategory]);

  const featuredPost = mockBlogPosts[0];

  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="py-24 bg-gradient-to-b from-monks-black to-monks-gray text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
              <TrendingUp size={16} />
              <span>Insights & Thought Leadership</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              The Findawise Blog
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Deep dives into automation, AI agents, and business transformation.
              Learn from real-world implementations and industry experts.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-monks-accent" />
                <span>Updated Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-monks-accent" />
                <span>12+ Articles/Month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-monks-gray" size={20} />
              <input
                type="text"
                placeholder="Search articles by title, author, or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-xl bg-monks-light-gray border-0 text-monks-black placeholder-monks-gray focus:ring-2 focus:ring-monks-accent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-monks-gray hover:text-monks-black"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-monks-accent text-white"
                      : "bg-monks-light-gray text-monks-gray hover:bg-monks-gray/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="text-center text-sm text-monks-gray">
              Showing {filteredPosts.length} of {mockBlogPosts.length} articles
            </div>
          </div>
        </div>
      </section>

      {!searchTerm && selectedCategory === 'All' && (
        <section className="py-16 bg-monks-light-gray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full text-sm font-medium">
                  <TrendingUp size={14} />
                  <span>Featured Article</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-monks-black">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-monks-gray leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-monks-gray">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{featuredPost.publishedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <span>By {featuredPost.author}</span>
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-monks-accent text-white rounded-xl font-semibold hover:bg-monks-hover transition-colors"
                >
                  Read Article
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="py-24 text-center">
              <div className="w-16 h-16 bg-monks-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-monks-gray" />
              </div>
              <h3 className="text-xl font-semibold text-monks-black mb-2">No articles found</h3>
              <p className="text-monks-gray mb-6">
                Try adjusting your search or filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-3 bg-monks-accent text-white rounded-xl font-medium hover:bg-monks-hover transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group"
                >
                  <article className="space-y-4 h-full flex flex-col">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-3 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-monks-gray">
                        <span className="px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readTime}
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-monks-black group-hover:text-monks-accent transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-monks-gray leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-monks-gray/10">
                        <div className="flex flex-col text-sm">
                          <span className="text-monks-gray">{post.author}</span>
                          <span className="text-xs text-monks-gray/70">
                            {post.publishedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-monks-accent group-hover:text-monks-hover transition-colors duration-300 font-medium text-sm">
                          Read More
                          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </div>
                      </div>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-monks-light-gray text-monks-gray rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-monks-black">
            Never Miss an Update
          </h2>
          <p className="text-xl text-monks-gray leading-relaxed">
            Get the latest insights on automation, AI, and business transformation
            delivered straight to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
            />
            <button className="bg-monks-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-monks-hover transition-all duration-300 whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
          <p className="text-sm text-monks-gray">
            Join 10,000+ professionals already subscribed. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
