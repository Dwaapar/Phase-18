import React, { useState, useEffect } from "react";
import { Download, FileText, Save, Sparkles, Grid2x2 as Grid, Eye, Check, Lock } from "lucide-react";
import { resumeTemplates } from '../../data/resumeTemplates';
import { professionalToolsService } from '../../services/professional-tools.service';
import { useAuth } from '../../contexts/AuthContext';
import { ResumeData } from '../../types/tools.types';
import { Link } from 'react-router-dom';

export default function ResumeToolPage() {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(resumeTemplates[0]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [usageLimit, setUsageLimit] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Partial<ResumeData>>({
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: ""
    },
    experience: [{
      company: "",
      position: "",
      location: "",
      start_date: "",
      end_date: "",
      current: false,
      description: "",
      achievements: []
    }],
    education: [{
      school: "",
      degree: "",
      field: "",
      location: "",
      graduation_date: "",
      gpa: ""
    }],
    skills: {
      technical: [],
      soft: [],
      languages: []
    }
  });

  useEffect(() => {
    if (user) {
      loadUsageLimit();
    }
  }, [user]);

  const loadUsageLimit = async () => {
    if (!user) return;
    try {
      const limit = await professionalToolsService.checkUsageLimit(user.id, 'resume-builder');
      setUsageLimit(limit);
    } catch (error) {
      console.error('Error loading usage limit:', error);
    }
  };

  const handlePersonalChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value } as any
    }));
  };

  const handleSave = async () => {
    if (!user) {
      alert('Please sign in to save your resume');
      return;
    }

    if (!usageLimit?.has_unlimited && usageLimit?.remaining <= 0) {
      alert('You have reached your free usage limit. Upgrade to Professional for unlimited access.');
      return;
    }

    setSaving(true);
    try {
      await professionalToolsService.recordUsage(
        user.id,
        'resume-builder',
        'generate',
        { template: selectedTemplate.id },
        formData
      );

      await professionalToolsService.createUserCreation(
        user.id,
        'resume-builder',
        formData.personal?.name || 'My Resume',
        formData
      );

      alert('Resume saved successfully!');
      loadUsageLimit();
    } catch (error: any) {
      alert(error.message || 'Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    if (!user) {
      alert('Please sign in to download your resume');
      return;
    }
    alert('PDF export coming soon! Your resume has been saved.');
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            {resumeTemplates.length}+ Professional Templates
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Resume Builder</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Create a professional, ATS-optimized resume with AI-powered writing assistance and 20+ stunning templates.
          </p>

          {user && usageLimit && (
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border-2 border-slate-200 shadow-sm">
              {usageLimit.has_unlimited ? (
                <>
                  <Sparkles size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-slate-700">Unlimited uses available</span>
                </>
              ) : (
                <>
                  <span className="text-sm text-slate-600">Uses remaining:</span>
                  <span className={`font-bold ${usageLimit.remaining > 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                    {usageLimit.remaining} / {usageLimit.limit_count}
                  </span>
                  {usageLimit.remaining === 0 && (
                    <Link to="/pricing" className="text-blue-600 hover:text-blue-700 text-sm font-medium ml-2">
                      Upgrade
                    </Link>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Choose a Template</h2>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Grid size={16} />
              {showTemplates ? 'Hide Templates' : 'Browse Templates'}
            </button>
          </div>

          {showTemplates && (
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {resumeTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setShowTemplates(false);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                      selectedTemplate.id === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-2 flex items-center justify-center">
                      <FileText size={32} className="text-slate-400" />
                    </div>
                    <h3 className="font-medium text-sm text-slate-900 mb-1">{template.name}</h3>
                    <p className="text-xs text-slate-500 capitalize">{template.category}</p>
                    {template.is_premium && (
                      <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
                        <Lock size={10} />
                        Premium
                      </div>
                    )}
                    {selectedTemplate.id === template.id && (
                      <div className="mt-2 flex items-center justify-center gap-1 text-blue-600 text-xs font-medium">
                        <Check size={12} />
                        Selected
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-4 border-2 border-blue-200 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{selectedTemplate.name}</h3>
              <p className="text-sm text-slate-600 capitalize">{selectedTemplate.category} · {selectedTemplate.structure.layout}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border-2 border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Information</h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Sparkles size={16} className="text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.personal?.name || ''}
                      onChange={(e) => handlePersonalChange("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.personal?.email || ''}
                      onChange={(e) => handlePersonalChange("email", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.personal?.phone || ''}
                      onChange={(e) => handlePersonalChange("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={formData.personal?.location || ''}
                      onChange={(e) => handlePersonalChange("location", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-0 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">Professional Summary</h3>
                  <textarea
                    placeholder="Brief summary of your professional background and key achievements..."
                    value={formData.personal?.summary || ''}
                    onChange={(e) => handlePersonalChange("summary", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-0 resize-none transition-colors"
                  />
                  <p className="text-xs text-slate-500">Tip: Include your years of experience, key skills, and career goals</p>
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t border-slate-200">
                <button
                  onClick={handleSave}
                  disabled={saving || (!user)}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={16} />
                  {saving ? 'Saving...' : 'Save Resume'}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!user}
                  className="flex-1 border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:border-slate-400 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download size={16} />
                  Export PDF
                </button>
              </div>

              {!user && (
                <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900 text-center">
                    <Link to="/auth/sign-in" className="font-semibold underline">Sign in</Link> to save and export your resume
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Live Preview</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                <Eye size={16} />
                Preview
              </button>
            </div>
            <div className="bg-white border-2 border-slate-300 rounded-xl p-8 min-h-[600px] shadow-lg">
              {formData.personal?.name ? (
                <div className="space-y-6">
                  <div className="text-center pb-6 border-b-2 border-slate-200">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{formData.personal.name}</h1>
                    <div className="flex flex-wrap gap-3 justify-center text-sm text-slate-600">
                      {formData.personal.email && <span>{formData.personal.email}</span>}
                      {formData.personal.phone && <span>·</span>}
                      {formData.personal.phone && <span>{formData.personal.phone}</span>}
                      {formData.personal.location && <span>·</span>}
                      {formData.personal.location && <span>{formData.personal.location}</span>}
                    </div>
                  </div>

                  {formData.personal.summary && (
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 mb-2">Professional Summary</h2>
                      <p className="text-sm text-slate-600 leading-relaxed">{formData.personal.summary}</p>
                    </div>
                  )}

                  <div className="text-sm text-slate-500 italic">
                    Add more sections to see them here...
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                  <FileText size={64} className="mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Live Preview</p>
                  <p className="text-sm">Start filling out the form to see your resume take shape</p>
                </div>
              )}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-900 text-sm mb-2">ATS Optimization Score</h3>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{width: '75%'}}></div>
                </div>
                <span className="text-sm font-bold text-blue-900">75%</span>
              </div>
              <p className="text-xs text-blue-700 mt-2">Add more details to improve your score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}