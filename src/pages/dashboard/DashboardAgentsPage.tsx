import React from "react";
import { Link } from "react-router-dom";
import { Plus, Bot, Activity, Settings, ArrowUpRight } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { StatsCard } from "../../components/ui/StatsCard";

const agents = [
  {
    id: "1",
    name: "SDR Agent",
    type: "Sales Development",
    status: "active",
    deployment: "managed",
    conversations: 156,
    successRate: 87.5,
    lastActive: "5 minutes ago"
  },
  {
    id: "2",
    name: "Support Agent",
    type: "Customer Support", 
    status: "active",
    deployment: "managed",
    conversations: 89,
    successRate: 92.1,
    lastActive: "2 minutes ago"
  },
  {
    id: "3",
    name: "Operations Agent",
    type: "Process Automation",
    status: "paused",
    deployment: "self-hosted",
    conversations: 234,
    successRate: 95.3,
    lastActive: "2 hours ago"
  }
];

export default function DashboardAgentsPage() {
  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-monks-black mb-2">My AI Agents</h1>
            <p className="text-monks-gray">Monitor and manage your deployed AI agents</p>
          </div>
          
          <Link
            to="/agents/new"
            className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={16} />
            Deploy New Agent
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <StatsCard
            title="Total Conversations"
            value={479}
            icon={Bot}
            trend={{ value: 25, isPositive: true }}
          />
          <StatsCard
            title="Average Success Rate"
            value={91.6}
            suffix="%"
            icon={Activity}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Active Agents"
            value={2}
            icon={Bot}
          />
        </div>

        {/* Agents Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-3xl p-8 hover:shadow-card transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-monks-black">{agent.name}</h3>
                    <p className="text-sm text-monks-gray">{agent.type}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>
                        {agent.status}
                      </Badge>
                      <Badge variant="secondary">
                        {agent.deployment}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300">
                      <Settings size={16} />
                    </button>
                    <button className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300">
                      <Activity size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-monks-black">{agent.conversations}</div>
                      <div className="text-sm text-monks-gray">Conversations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-monks-accent">{agent.successRate}%</div>
                      <div className="text-sm text-monks-gray">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-monks-gray">
                    Last active: {agent.lastActive}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex-1 bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                    Manage
                  </button>
                  <Link
                    to={`/agents/${agent.id}/analytics`}
                    className="flex-1 border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300 text-center"
                  >
                    Analytics
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {agents.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center">
            <div className="w-24 h-24 bg-monks-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Bot size={32} className="text-monks-accent" />
            </div>
            <h3 className="text-2xl font-bold text-monks-black mb-4">No Agents Deployed</h3>
            <p className="text-monks-gray mb-8 max-w-md mx-auto">
              Deploy your first AI agent and start automating conversations and tasks.
            </p>
            <Link
              to="/agents/new"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Deploy Your First Agent
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}