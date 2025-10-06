import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Bot,
  Star,
  Users,
  Check,
  Globe,
  TrendingUp,
  MessageSquare,
  Settings,
  ExternalLink,
  Play,
  Send,
  Sparkles
} from 'lucide-react';
import { AgentsService } from '../../services/agents.service';
import { AIAgent, AgentCategory, DeploymentModel, AgentConversation } from '../../types/agent.types';
import { useAuth } from '../../contexts/AuthContext';

export default function AgentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [agent, setAgent] = useState<AIAgent | null>(null);
  const [category, setCategory] = useState<AgentCategory | null>(null);
  const [deploymentModels, setDeploymentModels] = useState<DeploymentModel[]>([]);
  const [selectedDeployment, setSelectedDeployment] = useState<string>('');
  const [conversations, setConversations] = useState<AgentConversation[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'playground' | 'conversations'>('overview');
  const [loading, setLoading] = useState(true);

  const [testMessages, setTestMessages] = useState<Array<{ role: 'user' | 'agent'; content: string }>>([]);
  const [testInput, setTestInput] = useState('');
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    loadAgentData();
  }, [slug]);

  const loadAgentData = async () => {
    if (!slug) return;

    setLoading(true);
    try {
      const [agentData, categoriesData, deploymentsData, conversationsData] = await Promise.all([
        AgentsService.getAgentBySlug(slug),
        AgentsService.getCategories(),
        AgentsService.getDeploymentModels(),
        AgentsService.getAgentConversations(slug)
      ]);

      if (agentData) {
        setAgent(agentData);
        const cat = categoriesData.find(c => c.id === agentData.categoryId);
        setCategory(cat || null);
        setDeploymentModels(deploymentsData);
        setSelectedDeployment(agentData.deploymentModels[0]);
        setConversations(conversationsData);
      }
    } catch (error) {
      console.error('Error loading agent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async () => {
    if (!user) {
      navigate('/auth/sign-in');
      return;
    }

    if (!agent || !selectedDeployment) return;

    try {
      await AgentsService.deployAgent(user.id, agent.id, selectedDeployment, agent.name);
      navigate('/dashboard/agents');
    } catch (error) {
      console.error('Error deploying agent:', error);
    }
  };

  const handleSendTestMessage = async () => {
    if (!testInput.trim() || !agent) return;

    const userMessage = { role: 'user' as const, content: testInput };
    setTestMessages([...testMessages, userMessage]);
    setTestInput('');
    setTesting(true);

    try {
      const response = await AgentsService.testAgent(agent.id, testInput, testMessages);
      const agentMessage = { role: 'agent' as const, content: response };
      setTestMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error testing agent:', error);
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-16 h-16 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-slate-600">Loading agent...</p>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Bot className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Agent not found</h2>
          <button
            onClick={() => navigate('/agents')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse agents
          </button>
        </div>
      </div>
    );
  }

  const selectedModel = deploymentModels.find(m => m.slug === selectedDeployment);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-white">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{agent.name}</h1>
                  {agent.isFeatured && (
                    <span className="px-3 py-1 bg-amber-400 text-amber-900 text-sm font-medium rounded-full flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Featured
                    </span>
                  )}
                </div>
                {category && (
                  <p className="text-blue-100 mb-4">{category.name}</p>
                )}
                <p className="text-lg text-blue-50 mb-6">{agent.description}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <span className="font-semibold">{agent.rating}</span>
                    <span className="text-blue-100">rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">{agent.totalDeployments.toLocaleString()}</span>
                    <span className="text-blue-100">deployments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">Top {Math.round((1 - agent.popularityScore / 100) * 10)}%</span>
                    <span className="text-blue-100">popularity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-slate-200">
            <div className="flex gap-1 px-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'playground', label: 'Test Playground' },
                { id: 'conversations', label: 'Sample Conversations' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`px-6 py-4 font-medium transition-colors relative ${
                    selectedTab === tab.id
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                  {selectedTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {selectedTab === 'overview' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">About this agent</h2>
                    <p className="text-slate-600 leading-relaxed">{agent.detailedDescription}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Capabilities</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {agent.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Use cases</h2>
                    <div className="space-y-2">
                      {agent.useCases.map((useCase, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {idx + 1}
                          </div>
                          <span className="text-slate-700">{useCase}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Supported languages</h2>
                    <div className="flex flex-wrap gap-2">
                      {agent.supportedLanguages.map((lang, idx) => (
                        <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Industries</h2>
                    <div className="flex flex-wrap gap-2">
                      {agent.industries.map((industry, idx) => (
                        <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg">
                          {industry}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="sticky top-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="mb-6">
                      <p className="text-3xl font-bold text-slate-900 mb-1">
                        ${agent.basePrice}
                        <span className="text-lg font-normal text-slate-500">/month</span>
                      </p>
                      <p className="text-sm text-slate-600">{agent.pricingModel}</p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Deployment model
                      </label>
                      <select
                        value={selectedDeployment}
                        onChange={(e) => setSelectedDeployment(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {agent.deploymentModels.map((dm) => {
                          const model = deploymentModels.find(m => m.slug === dm);
                          return model ? (
                            <option key={model.slug} value={model.slug}>
                              {model.name}
                            </option>
                          ) : null;
                        })}
                      </select>
                    </div>

                    {selectedModel && (
                      <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
                        <h3 className="font-semibold text-slate-900 mb-3">{selectedModel.name}</h3>
                        <p className="text-sm text-slate-600 mb-3">{selectedModel.description}</p>
                        <ul className="space-y-2">
                          {selectedModel.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                              <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={handleDeploy}
                      className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-3"
                    >
                      Deploy this agent
                    </button>
                    <button
                      onClick={() => setSelectedTab('playground')}
                      className="w-full px-6 py-4 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Try in playground
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'playground' && (
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Test Playground</h2>
                  <p className="text-slate-600">
                    Try out the agent with your own messages and see how it responds in real-time.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <div className="h-96 overflow-y-auto p-6 space-y-4">
                    {testMessages.length === 0 && (
                      <div className="text-center py-12">
                        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">Start a conversation to test the agent</p>
                      </div>
                    )}
                    {testMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] px-4 py-3 rounded-lg ${
                            msg.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-900'
                          }`}
                        >
                          <p>{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {testing && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 px-4 py-3 rounded-lg">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !testing && handleSendTestMessage()}
                        placeholder="Type your message..."
                        disabled={testing}
                        className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      />
                      <button
                        onClick={handleSendTestMessage}
                        disabled={!testInput.trim() || testing}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'conversations' && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Sample Conversations</h2>
                  <p className="text-slate-600">
                    See how this agent handles real-world scenarios and customer interactions.
                  </p>
                </div>

                {conversations.map((conv) => (
                  <div key={conv.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-900">{conv.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{conv.useCase}</p>
                    </div>
                    <div className="p-6 space-y-4">
                      {conv.messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] px-4 py-3 rounded-lg ${
                              msg.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-900'
                            }`}
                          >
                            <p>{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
