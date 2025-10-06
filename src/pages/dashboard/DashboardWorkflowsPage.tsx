import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Play, Pause, Settings, BarChart, Search } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { SearchInput } from "../../components/ui/SearchInput";
import { FilterDropdown } from "../../components/ui/FilterDropdown";

const workflows = [
  {
    id: "1",
    name: "Lead Qualification Pipeline",
    status: "active",
    lastRun: "2 hours ago",
    executions: 1247,
    successRate: 98.5,
    category: "Sales"
  },
  {
    id: "2", 
    name: "Customer Onboarding Flow",
    status: "active",
    lastRun: "5 hours ago",
    executions: 890,
    successRate: 97.2,
    category: "Success"
  },
  {
    id: "3",
    name: "Invoice Processing Bot",
    status: "paused",
    lastRun: "1 day ago", 
    executions: 650,
    successRate: 99.1,
    category: "Finance"
  },
  {
    id: "4",
    name: "Support Ticket Triage",
    status: "active",
    lastRun: "30 minutes ago",
    executions: 2156,
    successRate: 96.8,
    category: "Support"
  }
];

const filterOptions = [
  { label: "All Categories", value: "all", count: 4 },
  { label: "Sales", value: "sales", count: 1 },
  { label: "Success", value: "success", count: 1 },
  { label: "Finance", value: "finance", count: 1 },
  { label: "Support", value: "support", count: 1 }
];

export default function DashboardWorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-monks-black mb-2">My Workflows</h1>
            <p className="text-monks-gray">Manage and monitor your deployed workflows</p>
          </div>
          
          <Link
            to="/workflows"
            className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={16} />
            Deploy New Workflow
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchInput
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="flex-1"
          />
          <FilterDropdown
            label="Category"
            options={filterOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        {/* Workflows Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((workflow) => (
            <div key={workflow.id} className="bg-white rounded-3xl p-8 hover:shadow-card transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-monks-black">{workflow.name}</h3>
                    <Badge variant={workflow.status === 'active' ? 'success' : 'warning'}>
                      {workflow.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300">
                      <Settings size={16} />
                    </button>
                    <button className="p-2 text-monks-gray hover:text-monks-black transition-colors duration-300">
                      <BarChart size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-monks-black">{workflow.executions}</div>
                      <div className="text-sm text-monks-gray">Executions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-monks-accent">{workflow.successRate}%</div>
                      <div className="text-sm text-monks-gray">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-monks-gray">
                    Last run: {workflow.lastRun}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex-1 bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2">
                    {workflow.status === 'active' ? (
                      <>
                        <Pause size={14} />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={14} />
                        Resume
                      </>
                    )}
                  </button>
                  <Link
                    to={`/workflows/${workflow.id}`}
                    className="flex-1 border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300 text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {workflows.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center">
            <div className="w-24 h-24 bg-monks-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Workflow size={32} className="text-monks-accent" />
            </div>
            <h3 className="text-2xl font-bold text-monks-black mb-4">No Workflows Yet</h3>
            <p className="text-monks-gray mb-8 max-w-md mx-auto">
              Deploy your first workflow from our library of 350+ pre-built automations.
            </p>
            <Link
              to="/workflows"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Browse Workflows
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}