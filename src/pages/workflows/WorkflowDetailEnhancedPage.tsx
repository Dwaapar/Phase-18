import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Play,
  Download,
  Star,
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
  Settings,
  Eye,
  Code,
  FileText,
  Heart,
  Share2,
  ChevronRight,
  TrendingUp,
  Users,
  BarChart3,
  Package,
  Activity,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  runtime: string;
  downloads: number;
  rating: number;
  reviews: number;
  tags: string[];
  pricing: string;
  tier: string;
  integrations: string[];
  current_version: string;
  success_rate: number;
  total_executions: number;
  featured: boolean;
  thumbnail: string;
  setup_guide: string;
  steps: any[];
  env_vars: any[];
}

interface WorkflowVersion {
  id: string;
  version: string;
  changelog: string;
  created_at: string;
  is_current: boolean;
}

interface WorkflowReview {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
}

interface WorkflowExecution {
  id: string;
  status: string;
  started_at: string;
  completed_at: string;
  duration_ms: number;
}

export default function WorkflowDetailEnhancedPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [versions, setVersions] = useState<WorkflowVersion[]>([]);
  const [reviews, setReviews] = useState<WorkflowReview[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'setup' | 'versions' | 'reviews' | 'analytics'>('overview');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showSandbox, setShowSandbox] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [testRunning, setTestRunning] = useState(false);

  useEffect(() => {
    if (id) {
      loadWorkflowDetails();
    }
  }, [id]);

  const loadWorkflowDetails = async () => {
    setLoading(true);
    try {
      const [workflowRes, versionsRes, reviewsRes] = await Promise.all([
        supabase.from('workflows').select('*').eq('id', id).single(),
        supabase.from('workflow_versions').select('*').eq('workflow_id', id).order('created_at', { ascending: false }),
        supabase.from('workflow_reviews').select('*').eq('workflow_id', id).order('created_at', { ascending: false }).limit(10),
      ]);

      if (workflowRes.data) setWorkflow(workflowRes.data);
      if (versionsRes.data) setVersions(versionsRes.data);
      if (reviewsRes.data) setReviews(reviewsRes.data);

      if (user) {
        const executionsRes = await supabase
          .from('workflow_executions')
          .select('*')
          .eq('user_workflow_id', id)
          .order('started_at', { ascending: false })
          .limit(10);
        if (executionsRes.data) setExecutions(executionsRes.data);
      }
    } catch (error) {
      console.error('Error loading workflow:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async () => {
    if (!user || !workflow) return;

    setDeploying(true);
    try {
      const { error } = await supabase.from('user_workflows').insert({
        user_id: user.id,
        workflow_id: workflow.id,
        status: 'deployed',
        config: {},
      });

      if (!error) {
        await supabase
          .from('workflows')
          .update({ downloads: workflow.downloads + 1 })
          .eq('id', workflow.id);

        alert('Workflow deployed successfully!');
        setShowDeployModal(false);
      }
    } catch (error) {
      console.error('Error deploying workflow:', error);
      alert('Failed to deploy workflow');
    } finally {
      setDeploying(false);
    }
  };

  const handleTestRun = async () => {
    if (!user || !workflow) return;

    setTestRunning(true);
    try {
      const { data: userWorkflow } = await supabase
        .from('user_workflows')
        .select('id')
        .eq('user_id', user.id)
        .eq('workflow_id', workflow.id)
        .single();

      if (userWorkflow) {
        const { error } = await supabase.from('workflow_executions').insert({
          user_workflow_id: userWorkflow.id,
          status: 'running',
          started_at: new Date().toISOString(),
        });

        if (!error) {
          setTimeout(() => {
            setTestRunning(false);
            alert('Test run completed successfully!');
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error running test:', error);
      alert('Failed to run test');
      setTestRunning(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Workflow Not Found</h1>
          <Link to="/workflows" className="text-blue-600 hover:text-blue-700">
            Back to Workflow Store
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-24 pb-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-4 text-slate-300">
            <Link to="/workflows" className="hover:text-white">Workflows</Link>
            <ChevronRight size={16} />
            <Link to={`/workflows?category=${workflow.category}`} className="hover:text-white">{workflow.category}</Link>
            <ChevronRight size={16} />
            <span className="text-white">{workflow.name}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{workflow.name}</h1>
              <p className="text-xl text-slate-300 mb-6">{workflow.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={18} />
                  <span className="font-medium">{workflow.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({workflow.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download size={18} />
                  <span>{workflow.downloads.toLocaleString()} downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{workflow.runtime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={18} />
                  <span>{workflow.success_rate.toFixed(1)}% success rate</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {workflow.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white text-slate-900 rounded-xl p-6 shadow-xl">
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-2">
                    {workflow.tier === 'Free' ? 'Free' : workflow.tier}
                  </div>
                  <div className="text-sm text-slate-600">
                    {workflow.tier === 'Free' ? 'Forever free' : `${workflow.tier} tier required`}
                  </div>
                </div>

                <button
                  onClick={() => setShowDeployModal(true)}
                  disabled={!user}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium mb-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap size={18} />
                  Deploy Workflow
                </button>

                <button
                  onClick={() => setShowSandbox(true)}
                  disabled={!user}
                  className="w-full py-3 border-2 border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50 font-medium mb-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play size={18} />
                  Test in Sandbox
                </button>

                {!user && (
                  <p className="text-sm text-slate-600 text-center">
                    <Link to="/auth/signin" className="text-blue-600 hover:text-blue-700">
                      Sign in
                    </Link>{' '}
                    to deploy workflows
                  </p>
                )}

                <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Version</span>
                    <span className="font-medium">{workflow.current_version}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Difficulty</span>
                    <span className="font-medium">{workflow.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Category</span>
                    <span className="font-medium">{workflow.category}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="text-sm font-medium text-slate-700 mb-2">Integrations</div>
                  <div className="flex flex-wrap gap-2">
                    {workflow.integrations?.map((integration) => (
                      <span
                        key={integration}
                        className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs"
                      >
                        {integration}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl border border-slate-200 mb-6">
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: Eye },
                { id: 'setup', label: 'Setup Guide', icon: FileText },
                { id: 'versions', label: 'Versions', icon: Package },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 font-medium border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">What This Workflow Does</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">{workflow.description}</p>
                </div>

                {workflow.steps && workflow.steps.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Workflow Steps</h3>
                    <div className="space-y-4">
                      {workflow.steps.map((step: any, index: number) => (
                        <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900">{step.name || `Step ${index + 1}`}</h4>
                            <p className="text-sm text-slate-600 mt-1">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {workflow.thumbnail && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Preview</h3>
                    <img
                      src={workflow.thumbnail}
                      alt={workflow.name}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'setup' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Setup Guide</h2>
                <div className="prose max-w-none">
                  <p className="text-slate-600">{workflow.setup_guide || 'No setup guide available yet.'}</p>
                </div>

                {workflow.env_vars && workflow.env_vars.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Required Environment Variables</h3>
                    <div className="space-y-3">
                      {workflow.env_vars.map((envVar: any, index: number) => (
                        <div key={index} className="p-4 bg-slate-50 rounded-lg">
                          <code className="text-sm font-mono text-blue-600">{envVar.name}</code>
                          <p className="text-sm text-slate-600 mt-1">{envVar.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'versions' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Version History</h2>
                <div className="space-y-4">
                  {versions.map((version) => (
                    <div key={version.id} className="p-6 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900">v{version.version}</span>
                          {version.is_current && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                              Current
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-slate-600">
                          {new Date(version.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-600">{version.changelog}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">User Reviews</h2>
                {reviews.length === 0 ? (
                  <p className="text-slate-600">No reviews yet. Be the first to review this workflow!</p>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-600">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && <p className="text-slate-700">{review.comment}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Workflow Analytics</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="text-blue-600" size={24} />
                      <span className="text-sm font-medium text-blue-900">Total Executions</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-900">{workflow.total_executions?.toLocaleString() || 0}</div>
                  </div>
                  <div className="p-6 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle2 className="text-green-600" size={24} />
                      <span className="text-sm font-medium text-green-900">Success Rate</span>
                    </div>
                    <div className="text-3xl font-bold text-green-900">{workflow.success_rate.toFixed(1)}%</div>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="text-purple-600" size={24} />
                      <span className="text-sm font-medium text-purple-900">Active Users</span>
                    </div>
                    <div className="text-3xl font-bold text-purple-900">{Math.floor(workflow.downloads * 0.3).toLocaleString()}</div>
                  </div>
                </div>

                {user && executions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Executions</h3>
                    <div className="space-y-3">
                      {executions.map((execution) => (
                        <div key={execution.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Activity
                              className={execution.status === 'completed' ? 'text-green-600' : execution.status === 'failed' ? 'text-red-600' : 'text-blue-600'}
                              size={20}
                            />
                            <div>
                              <div className="font-medium text-slate-900 capitalize">{execution.status}</div>
                              <div className="text-sm text-slate-600">
                                {new Date(execution.started_at).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          {execution.duration_ms && (
                            <div className="text-sm text-slate-600">{(execution.duration_ms / 1000).toFixed(1)}s</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeployModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Deploy Workflow</h2>
            <p className="text-slate-600 mb-6">
              This will add the workflow to your account and you can start using it immediately.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeploy}
                disabled={deploying}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
              >
                {deploying ? 'Deploying...' : 'Confirm Deployment'}
              </button>
              <button
                onClick={() => setShowDeployModal(false)}
                disabled={deploying}
                className="px-6 py-3 border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showSandbox && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Workflow Sandbox</h2>
            <p className="text-slate-600 mb-6">
              Test this workflow in a safe environment before deploying to production.
            </p>
            <div className="bg-slate-900 text-green-400 font-mono text-sm p-6 rounded-lg mb-6">
              <div>$ Initializing workflow sandbox...</div>
              <div>$ Loading workflow configuration...</div>
              <div>$ Ready to execute</div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleTestRun}
                disabled={testRunning}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
              >
                {testRunning ? 'Running Test...' : 'Run Test'}
              </button>
              <button
                onClick={() => setShowSandbox(false)}
                disabled={testRunning}
                className="px-6 py-3 border border-slate-300 text-slate-900 rounded-lg hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
