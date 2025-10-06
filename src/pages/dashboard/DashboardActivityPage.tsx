import React from "react";
import { ActivityFeed } from "../../components/ui/ActivityFeed";
import { FilterDropdown } from "../../components/ui/FilterDropdown";
import { SearchInput } from "../../components/ui/SearchInput";
import { useState } from "react";

const activities = [
  {
    id: "1",
    type: "workflow" as const,
    title: "Lead Qualification Pipeline deployed",
    description: "Successfully deployed to production environment",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    user: { name: "Sarah Chen", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" },
    metadata: { environment: "production", workflow_id: "wf_123" }
  },
  {
    id: "2",
    type: "agent" as const,
    title: "SDR Agent started processing leads",
    description: "Agent successfully initialized and began lead qualification",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    user: { name: "Sarah Chen", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" },
    metadata: { agent_type: "sdr", conversations: 15 }
  },
  {
    id: "3",
    type: "workflow" as const,
    title: "Invoice Processing workflow updated",
    description: "Updated configuration and redeployed with new validation rules",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    user: { name: "Sarah Chen", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" },
    metadata: { version: "1.2.0", changes: 3 }
  },
  {
    id: "4",
    type: "asset" as const,
    title: "Sales Prompt Pack downloaded",
    description: "Downloaded and added to personal library",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    user: { name: "Sarah Chen", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop" },
    metadata: { asset_type: "prompt_pack", file_size: "2.5MB" }
  }
];

const filterOptions = [
  { label: "All Activities", value: "all", count: activities.length },
  { label: "Workflows", value: "workflow", count: activities.filter(a => a.type === "workflow").length },
  { label: "Agents", value: "agent", count: activities.filter(a => a.type === "agent").length },
  { label: "Assets", value: "asset", count: activities.filter(a => a.type === "asset").length }
];

export default function DashboardActivityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || activity.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-monks-black mb-2">Activity Feed</h1>
          <p className="text-monks-gray">Track all your automation activities and system events</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchInput
            placeholder="Search activities..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="flex-1"
          />
          <FilterDropdown
            label="Activity Type"
            options={filterOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
          />
        </div>

        {/* Activity Feed */}
        <ActivityFeed
          activities={filteredActivities}
          showAvatars={true}
          groupByDate={true}
        />

        {filteredActivities.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center">
            <p className="text-monks-gray">No activities found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}