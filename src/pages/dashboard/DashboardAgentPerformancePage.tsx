import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  TrendingUp,
  MessageSquare,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { AgentsService } from '../../services/agents.service';
import { AgentPerformanceMetrics } from '../../types/agent.types';

export default function DashboardAgentPerformancePage() {
  const { deploymentId } = useParams<{ deploymentId: string }>();
  const [metrics, setMetrics] = useState<AgentPerformanceMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, [deploymentId]);

  const loadMetrics = async () => {
    if (!deploymentId) return;

    setLoading(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const data = await AgentsService.getPerformanceMetrics(
        deploymentId,
        startDate.toISOString(),
        endDate.toISOString()
      );
      setMetrics(data);
    } finally {
      setLoading(false);
    }
  };

  const latestMetrics = metrics[metrics.length - 1];
  const totalConversations = metrics.reduce((sum, m) => sum + m.conversationCount, 0);
  const avgResolutionRate =
    metrics.reduce((sum, m) => sum + m.resolutionRate, 0) / metrics.length || 0;
  const avgResponseTime =
    metrics.reduce((sum, m) => sum + m.avgResponseTime, 0) / metrics.length || 0;
  const avgSatisfaction =
    metrics.reduce((sum, m) => sum + m.customerSatisfaction, 0) / metrics.length || 0;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Agent Performance</h1>
        <p className="text-slate-600">Monitor key metrics and performance indicators</p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-24 mb-4" />
              <div className="h-8 bg-slate-200 rounded w-16 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-20" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">Total Conversations</h3>
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">
                {totalConversations.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Last 30 days
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">Resolution Rate</h3>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">
                {avgResolutionRate.toFixed(1)}%
              </p>
              <p className="text-sm text-slate-500">Average across all conversations</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">Avg Response Time</h3>
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">
                {avgResponseTime.toFixed(1)}s
              </p>
              <p className="text-sm text-slate-500">Per message</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-slate-600">Customer Satisfaction</h3>
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">
                {avgSatisfaction.toFixed(1)}/5
              </p>
              <p className="text-sm text-slate-500">Average rating</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Daily Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Date</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">
                      Conversations
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">
                      Messages
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">
                      Resolution
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-600">
                      CSAT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.slice(-10).reverse().map((metric) => (
                    <tr key={metric.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm text-slate-900">
                        {new Date(metric.date).toLocaleDateString()}
                      </td>
                      <td className="text-right py-3 px-4 text-sm text-slate-900">
                        {metric.conversationCount}
                      </td>
                      <td className="text-right py-3 px-4 text-sm text-slate-900">
                        {metric.messageCount}
                      </td>
                      <td className="text-right py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            metric.resolutionRate >= 80
                              ? 'bg-green-100 text-green-700'
                              : metric.resolutionRate >= 60
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {metric.resolutionRate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="text-right py-3 px-4 text-sm text-slate-900">
                        {metric.customerSatisfaction.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
