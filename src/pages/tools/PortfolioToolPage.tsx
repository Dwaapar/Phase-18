import React, { useState } from "react";
import { Plus, Eye, Settings, Globe } from "lucide-react";

export default function PortfolioToolPage() {
  const [projects, setProjects] = useState([
    { id: 1, title: "", description: "", image: "", link: "", tech: [] }
  ]);

  const addProject = () => {
    setProjects(prev => [...prev, { 
      id: Date.now(), 
      title: "", 
      description: "", 
      image: "", 
      link: "", 
      tech: [] 
    }]);
  };

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-monks-black mb-6">Portfolio Builder</h1>
          <p className="text-xl text-monks-gray max-w-3xl mx-auto">
            Showcase your work with a professional portfolio that stands out.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6 flex items-center gap-2">
              <Settings size={20} />
              Settings
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Portfolio Title</label>
                <input
                  type="text"
                  placeholder="Your Name - Portfolio"
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Bio</label>
                <textarea
                  placeholder="Tell visitors about yourself..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Contact Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">Theme</label>
                <select className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent">
                  <option>Modern</option>
                  <option>Minimal</option>
                  <option>Creative</option>
                  <option>Professional</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-monks-black">Projects</h2>
              <button 
                onClick={addProject}
                className="bg-monks-accent text-white p-2 rounded-full hover:bg-monks-hover transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="space-y-6">
              {projects.map((project, i) => (
                <div key={project.id} className="bg-monks-light-gray rounded-2xl p-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Project Title"
                      className="w-full px-3 py-2 rounded-xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                    <textarea
                      placeholder="Project description..."
                      rows={3}
                      className="w-full px-3 py-2 rounded-xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
                    />
                    <input
                      type="url"
                      placeholder="Project URL"
                      className="w-full px-3 py-2 rounded-xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6 flex items-center gap-2">
              <Eye size={20} />
              Preview
            </h2>
            
            <div className="bg-monks-light-gray rounded-2xl p-6 min-h-96">
              <div className="text-center text-monks-gray">
                <Globe size={48} className="mx-auto mb-4" />
                <p>Portfolio preview will appear here</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                Publish Portfolio
              </button>
              <button className="w-full border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}