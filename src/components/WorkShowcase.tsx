import React from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Global Brand Campaign",
    client: "Fortune 500 Company",
    category: "Digital Transformation",
    image: "project1",
  },
  {
    title: "E-commerce Platform",
    client: "Retail Leader",
    category: "Technology & Data",
    image: "project2",
  },
  {
    title: "Content Strategy",
    client: "Media Company",
    category: "Creative & Content",
    image: "project3",
  },
  {
    title: "Performance Marketing",
    client: "Startup Unicorn",
    category: "Media & Performance",
    image: "project4",
  },
];

export default function WorkShowcase() {
  return (
    <section className="section-spacing bg-monks-light-gray">
      <div className="max-width-container">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-display font-bold text-monks-black mb-4">
              Our Work
            </h2>
            <p className="text-xl text-monks-text-gray max-w-2xl">
              Discover how we've helped brands transform their digital presence 
              and achieve measurable results.
            </p>
          </div>
          <button className="hidden lg:flex items-center gap-2 text-monks-black hover:text-monks-text-gray transition-colors duration-300 font-medium">
            View All Projects
            <ArrowUpRight size={20} />
          </button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <div key={i} className="group cursor-pointer animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="aspect-[4/3] bg-monks-medium-gray rounded-2xl mb-6 overflow-hidden relative">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🖼️</div>
                    <p className="text-lg">Project Image Placeholder</p>
                    <p className="text-sm mt-2 text-monks-gray">
                      IMAGE SPECS: 800x600px, JPG/PNG<br/>
                      High-quality project screenshot or mockup<br/>
                      Professional, clean composition
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-monks-black/0 group-hover:bg-monks-black/20 transition-all duration-300"></div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-monks-text-gray uppercase tracking-wider">
                  {project.category}
                </p>
                <h3 className="text-2xl font-bold text-monks-black group-hover:text-monks-text-gray transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-monks-text-gray">
                  {project.client}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 lg:hidden">
          <button className="flex items-center gap-2 text-monks-black hover:text-monks-text-gray transition-colors duration-300 font-medium mx-auto">
            View All Projects
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}