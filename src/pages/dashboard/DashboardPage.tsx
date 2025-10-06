import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Workflow, Bot, Download, TrendingUp } from "lucide-react";
import { StatsCard } from "../../components/ui/StatsCard";
import { MetricDisplay } from "../../components/ui/MetricDisplay";

const recentActivity = [
  {
    type: "workflow",
    title: "Lead Qualification Pipeline deployed",
    time: "2 hours ago",
    status: "success"
  },
  {
    type: "agent",
    title: "SDR Agent started processing leads",
    time: "4 hours ago", 
    status: "active"
  },
  {
    type: "workflow",
    title: "Invoice Processing workflow updated",
    time: "1 day ago",
    status: "success"
  },
  {
    type: "asset",
    title: "Sales Prompt Pack downloaded",
    time: "2 days ago",
    status: "completed"
  }
];

const quickActions = [
  {
    title: "Deploy Workflow",
    description: "Browse and deploy from 350+ workflows",
    href: "/workflows",
    icon: Workflow
  },
  {
    title: "Create Agent",
    description: "Deploy a new AI agent",
    href: "/agents/new",
    icon: Bot
  },
  {
    title: "Browse Assets",
    description: "Download digital assets",
    href: "/assets",
    icon: Download
  }
];

export default function DashboardPage() {
  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-monks-black mb-4">
            Welcome back, Sarah
          </h1>
          <p className="text-xl text-monks-gray">
            Here's what's happening with your automations today.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatsCard
            title="Active Workflows"
            value={12}
            icon={Workflow}
            trend={{ value: 20, isPositive: true }}
          />
          <StatsCard
            title="AI Agents"
            value={3}
            icon={Bot}
            trend={{ value: 50, isPositive: true }}
          />
          <StatsCard
            title="Hours Saved"
            value={156}
            suffix="h"
            icon={TrendingUp}
            trend={{ value: 35, isPositive: true }}
          />
          <StatsCard
            title="Cost Savings"
            value={12500}
            prefix="$"
            icon={TrendingUp}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-monks-black mb-6">Quick Actions</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {quickActions.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={i}
                      to={action.href}
                      className="group p-6 bg-monks-light-gray rounded-2xl hover:bg-monks-accent hover:text-white transition-all duration-300"
                    >
                      <div className="space-y-3">
                        <Icon size={24} className="text-monks-accent group-hover:text-white" />
                        <h3 className="font-semibold text-monks-black group-hover:text-white">
                          {action.title}
                        </h3>
                        <p className="text-sm text-monks-gray group-hover:text-white/80">
                          {action.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-monks-black">Recent Activity</h2>
                <Link
                  to="/dashboard/activity"
                  className="text-monks-accent hover:text-monks-black transition-colors duration-300 font-medium"
                >
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-monks-light-gray rounded-2xl">
                    <div className="w-10 h-10 bg-monks-accent/10 rounded-full flex items-center justify-center">
                      {activity.type === 'workflow' && <Workflow size={16} className="text-monks-accent" />}
                      {activity.type === 'agent' && <Bot size={16} className="text-monks-accent" />}
                      {activity.type === 'asset' && <Download size={16} className="text-monks-accent" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-monks-black">{activity.title}</p>
                      <p className="text-sm text-monks-gray">{activity.time}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'success' ? 'bg-green-100 text-green-800' :
                      activity.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-monks-gray/10 text-monks-gray'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Performance Summary */}
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-6">This Month</h3>
              <div className="space-y-6">
                <MetricDisplay
                  label="Workflows Executed"
                  value={1247}
                  size="sm"
                />
                <MetricDisplay
                  label="Success Rate"
                  value={98.5}
                  suffix="%"
                  size="sm"
                />
                <MetricDisplay
                  label="Avg Response Time"
                  value={45}
                  suffix="ms"
                  size="sm"
                />
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-3xl p-8">
              <h3 className="text-xl font-bold text-monks-black mb-6">Recommendations</h3>
              <div className="space-y-4">
                <div className="p-4 bg-monks-light-gray rounded-2xl">
                  <h4 className="font-semibold text-monks-black mb-2">
                    Optimize Lead Scoring
                  </h4>
                  <p className="text-sm text-monks-gray mb-3">
                    Your lead qualification could be 15% more accurate
                  </p>
                  <button className="text-monks-accent hover:text-monks-black transition-colors duration-300 text-sm font-medium">
                    Learn More →
                  </button>
                </div>
                
                <div className="p-4 bg-monks-light-gray rounded-2xl">
                  <h4 className="font-semibold text-monks-black mb-2">
                    Deploy Support Agent
                  </h4>
                  <p className="text-sm text-monks-gray mb-3">
                    Reduce ticket response time by 60%
                  </p>
                  <button className="text-monks-accent hover:text-monks-black transition-colors duration-300 text-sm font-medium">
                    Deploy Now →
                  </button>
                </div>
              </div>
            </div>

            {/* Upgrade Prompt */}
            <div className="bg-gradient-to-br from-monks-accent to-monks-hover rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Upgrade to Pro</h3>
              <p className="text-white/80 mb-6">
                Unlock unlimited workflows and advanced analytics
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 bg-white text-monks-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-all duration-300 group"
              >
                Upgrade Now
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}