import React from "react";
import { ArrowUpRight, Calendar } from "lucide-react";

const insights = [
  {
    title: "The Future of Digital Transformation",
    excerpt: "How emerging technologies are reshaping business strategies and customer experiences in 2024.",
    category: "Strategy",
    date: "Dec 15, 2024",
    readTime: "5 min read",
  },
  {
    title: "AI-Powered Creative Solutions",
    excerpt: "Exploring the intersection of artificial intelligence and creative content production.",
    category: "Technology",
    date: "Dec 12, 2024",
    readTime: "7 min read",
  },
  {
    title: "Data-Driven Media Performance",
    excerpt: "Maximizing ROI through advanced analytics and performance optimization strategies.",
    category: "Media",
    date: "Dec 10, 2024",
    readTime: "6 min read",
  },
];

export default function InsightsSection() {
  return (
    <section className="section-spacing bg-monks-black text-white">
      <div className="max-width-container">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-display font-bold mb-4">
              Insights & Thinking
            </h2>
            <p className="text-xl text-monks-gray max-w-2xl">
              Stay ahead with our latest perspectives on digital transformation, 
              technology trends, and industry insights.
            </p>
          </div>
          <button className="hidden lg:flex items-center gap-2 text-white hover:text-monks-gray transition-colors duration-300 font-medium">
            View All Insights
            <ArrowUpRight size={20} />
          </button>
        </div>
        
        <div className="grid-auto-fit-cards">
          {insights.map((insight, i) => (
            <article key={i} className="group cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="aspect-[4/3] bg-monks-medium-gray rounded-2xl mb-6 overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-monks-gray">
                    <div className="text-4xl mb-4">📰</div>
                    <p className="text-lg">Article Image</p>
                    <p className="text-sm mt-2">
                      IMAGE SPECS: 600x450px<br/>
                      Article hero image<br/>
                      Professional, relevant
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-monks-black/0 group-hover:bg-monks-black/20 transition-all duration-300"></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-monks-gray">
                  <span className="px-3 py-1 bg-monks-medium-gray rounded-full">
                    {insight.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {insight.date}
                  </div>
                  <span>{insight.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold group-hover:text-monks-gray transition-colors duration-300">
                  {insight.title}
                </h3>
                
                <p className="text-monks-gray leading-relaxed">
                  {insight.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-white group-hover:text-monks-gray transition-colors duration-300 font-medium pt-2">
                  Read More
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12 lg:hidden">
          <button className="flex items-center gap-2 text-white hover:text-monks-gray transition-colors duration-300 font-medium mx-auto">
            View All Insights
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}