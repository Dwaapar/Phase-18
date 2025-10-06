import React, { useState } from "react";
import { Download, FileText, Briefcase } from "lucide-react";

export default function CoverLetterToolPage() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    hiringManager: "",
    yourName: "",
    experience: "",
    motivation: "",
    skills: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-monks-black mb-6">Cover Letter Generator</h1>
          <p className="text-xl text-monks-gray max-w-3xl mx-auto">
            Create personalized cover letters that get you noticed by hiring managers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6">Job Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                />
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                />
              </div>

              <input
                type="text"
                placeholder="Hiring Manager Name (optional)"
                value={formData.hiringManager}
                onChange={(e) => handleInputChange("hiringManager", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
              />

              <input
                type="text"
                placeholder="Your Name"
                value={formData.yourName}
                onChange={(e) => handleInputChange("yourName", e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
              />

              <textarea
                placeholder="Relevant experience and achievements..."
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
              />

              <textarea
                placeholder="Why you want to work at this company..."
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
              />

              <textarea
                placeholder="Key skills relevant to this role..."
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
              />
            </div>

            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2">
                <Download size={16} />
                Generate Letter
              </button>
              <button className="flex-1 border border-monks-gray text-monks-gray px-6 py-3 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
                Save Draft
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-monks-black mb-6">Preview</h2>
            <div className="bg-monks-light-gray rounded-2xl p-6 min-h-96">
              <div className="text-center text-monks-gray">
                <Briefcase size={48} className="mx-auto mb-4" />
                <p>Cover letter preview will appear here as you fill out the form</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}