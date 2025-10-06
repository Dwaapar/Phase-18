import React, { useState } from "react";
import { Download, FileText, Database, BookOpen, Search } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { SearchInput } from "../../components/ui/SearchInput";
import { FilterDropdown } from "../../components/ui/FilterDropdown";

const assets = [
  {
    id: "1",
    name: "Sales Prompt Pack",
    type: "Prompt Pack",
    category: "Sales",
    downloadDate: "Dec 15, 2024",
    fileSize: "2.5 MB",
    format: "JSON"
  },
  {
    id: "2",
    name: "Customer Data Dataset",
    type: "Dataset", 
    category: "Analytics",
    downloadDate: "Dec 12, 2024",
    fileSize: "15.2 MB",
    format: "CSV"
  },
  {
    id: "3",
    name: "Onboarding Playbook",
    type: "Playbook",
    category: "HR",
    downloadDate: "Dec 10, 2024",
    fileSize: "8.7 MB",
    format: "PDF"
  },
  {
    id: "4",
    name: "Brand Design Kit",
    type: "Creative Bundle",
    category: "Design",
    downloadDate: "Dec 8, 2024",
    fileSize: "45.3 MB",
    format: "ZIP"
  }
];

const typeOptions = [
  { label: "All Types", value: "all", count: 4 },
  { label: "Prompt Packs", value: "prompt", count: 1 },
  { label: "Datasets", value: "dataset", count: 1 },
  { label: "Playbooks", value: "playbook", count: 1 },
  { label: "Creative Bundles", value: "creative", count: 1 }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Prompt Pack":
      return FileText;
    case "Dataset":
      return Database;
    case "Playbook":
      return BookOpen;
    case "Creative Bundle":
      return Download;
    default:
      return FileText;
  }
};

export default function DashboardLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  return (
    <div className="pt-20 min-h-screen bg-monks-light-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-monks-black mb-2">My Library</h1>
          <p className="text-monks-gray">Access your downloaded digital assets</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <SearchInput
            placeholder="Search your library..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="flex-1"
          />
          <FilterDropdown
            label="Asset Type"
            options={typeOptions}
            value={selectedType}
            onChange={setSelectedType}
          />
        </div>

        {/* Assets Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => {
            const Icon = getTypeIcon(asset.type);
            return (
              <div key={asset.id} className="bg-white rounded-3xl p-8 hover:shadow-card transition-all duration-300">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-monks-accent/10 rounded-2xl flex items-center justify-center">
                      <Icon size={20} className="text-monks-accent" />
                    </div>
                    <Badge variant="accent">{asset.type}</Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-monks-black">{asset.name}</h3>
                    <p className="text-sm text-monks-gray">Category: {asset.category}</p>
                  </div>

                  <div className="space-y-2 text-sm text-monks-gray">
                    <div className="flex justify-between">
                      <span>Downloaded:</span>
                      <span>{asset.downloadDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File Size:</span>
                      <span>{asset.fileSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span>{asset.format}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="flex-1 bg-monks-black text-white px-4 py-2 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center justify-center gap-2">
                      <Download size={14} />
                      Download
                    </button>
                    <button className="flex-1 border border-monks-gray text-monks-gray px-4 py-2 rounded-full font-medium hover:border-monks-black hover:text-monks-black transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {assets.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center">
            <div className="w-24 h-24 bg-monks-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Download size={32} className="text-monks-accent" />
            </div>
            <h3 className="text-2xl font-bold text-monks-black mb-4">No Assets Downloaded</h3>
            <p className="text-monks-gray mb-8 max-w-md mx-auto">
              Browse our digital asset library and download resources to accelerate your projects.
            </p>
            <Link
              to="/assets"
              className="inline-flex items-center gap-2 bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 group"
            >
              Browse Assets
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}