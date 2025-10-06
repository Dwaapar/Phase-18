import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bot, Save, Upload, Plus, X, Settings as SettingsIcon } from 'lucide-react';
import { AgentsService } from '../../services/agents.service';
import { AgentConfiguration } from '../../types/agent.types';

export default function DashboardAgentConfigPage() {
  const { deploymentId } = useParams<{ deploymentId: string }>();
  const [config, setConfig] = useState<AgentConfiguration | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfiguration();
  }, [deploymentId]);

  const loadConfiguration = async () => {
    if (!deploymentId) return;
    const configData = await AgentsService.getAgentConfiguration(deploymentId);
    setConfig(configData);
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      await AgentsService.updateAgentConfiguration(config.id, config);
    } finally {
      setSaving(false);
    }
  };

  if (!config) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Agent Configuration</h1>
            <p className="text-slate-600">Customize personality, knowledge, and behavior</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Personality Settings</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tone</label>
                <select
                  value={config.personalitySettings.tone || 'professional'}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      personalitySettings: { ...config.personalitySettings, tone: e.target.value as any }
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Style</label>
                <select
                  value={config.personalitySettings.style || 'balanced'}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      personalitySettings: { ...config.personalitySettings, style: e.target.value as any }
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="concise">Concise</option>
                  <option value="balanced">Balanced</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Formality</label>
                <select
                  value={config.personalitySettings.formality || 'medium'}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      personalitySettings: { ...config.personalitySettings, formality: e.target.value as any }
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Knowledge Base</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Source
              </button>
            </div>
            <div className="space-y-3">
              {config.knowledgeBase.map((kb, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                  <Upload className="w-5 h-5 text-slate-400" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{kb.name}</p>
                    <p className="text-sm text-slate-600">{kb.type}: {kb.content}</p>
                  </div>
                  <button className="text-slate-400 hover:text-red-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-200">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
