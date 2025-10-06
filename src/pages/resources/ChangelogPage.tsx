import React from "react";
import { Calendar, Plus, Wrench, Bug, Zap } from "lucide-react";

const releases = [
  {
    version: "2.4.0",
    date: "December 15, 2024",
    type: "major",
    changes: [
      { type: "feature", text: "New AI Agent deployment wizard with guided setup" },
      { type: "feature", text: "Advanced workflow analytics and performance insights" },
      { type: "improvement", text: "Enhanced security with SOC 2 Type II compliance" },
      { type: "improvement", text: "Improved workflow editor with drag-and-drop interface" },
      { type: "fix", text: "Fixed issue with webhook timeout handling" }
    ]
  },
  {
    version: "2.3.2",
    date: "December 8, 2024",
    type: "minor",
    changes: [
      { type: "improvement", text: "Faster workflow execution with optimized runtime" },
      { type: "improvement", text: "Better error messages and debugging information" },
      { type: "fix", text: "Resolved memory leak in long-running workflows" },
      { type: "fix", text: "Fixed authentication issues with certain integrations" }
    ]
  },
  {
    version: "2.3.1",
    date: "December 1, 2024",
    type: "patch",
    changes: [
      { type: "fix", text: "Fixed critical bug in workflow scheduling" },
      { type: "fix", text: "Resolved UI issues in the agent configuration panel" },
      { type: "improvement", text: "Updated documentation with new examples" }
    ]
  },
  {
    version: "2.3.0",
    date: "November 24, 2024",
    type: "major",
    changes: [
      { type: "feature", text: "Introduced Decision Platform with adaptive quizzes" },
      { type: "feature", text: "New affiliate management system with smart links" },
      { type: "feature", text: "Real-time collaboration in workflow editor" },
      { type: "improvement", text: "Enhanced API rate limiting and throttling" },
      { type: "improvement", text: "Better mobile responsiveness across all pages" },
      { type: "fix", text: "Fixed edge cases in conditional workflow logic" }
    ]
  },
  {
    version: "2.2.1",
    date: "November 17, 2024",
    type: "patch",
    changes: [
      { type: "fix", text: "Hotfix for workflow deployment failures" },
      { type: "fix", text: "Resolved issues with environment variable encryption" },
      { type: "improvement", text: "Performance optimizations for large workflows" }
    ]
  }
];

const getChangeIcon = (type: string) => {
  switch (type) {
    case "feature":
      return <Plus size={16} className="text-green-500" />;
    case "improvement":
      return <Zap size={16} className="text-blue-500" />;
    case "fix":
      return <Bug size={16} className="text-red-500" />;
    default:
      return <Wrench size={16} className="text-monks-gray" />;
  }
};

const getVersionBadgeColor = (type: string) => {
  switch (type) {
    case "major":
      return "bg-green-100 text-green-800";
    case "minor":
      return "bg-blue-100 text-blue-800";
    case "patch":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-monks-light-gray text-monks-gray";
  }
};

export default function ChangelogPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Changelog</h1>
            <p className="text-xl text-white/80">
              Stay up to date with new features, improvements, and bug fixes.
            </p>
          </div>
        </div>
      </section>

      {/* Releases */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            {releases.map((release, i) => (
              <div key={i} className="relative">
                {i !== releases.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-px bg-monks-gray/20"></div>
                )}
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-monks-accent rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-2xl font-bold text-monks-black">
                        Version {release.version}
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getVersionBadgeColor(release.type)}`}>
                        {release.type}
                      </span>
                    </div>
                    
                    <p className="text-monks-gray">{release.date}</p>
                    
                    <div className="bg-monks-light-gray rounded-2xl p-6">
                      <ul className="space-y-3">
                        {release.changes.map((change, j) => (
                          <li key={j} className="flex items-start gap-3">
                            {getChangeIcon(change.type)}
                            <span className="text-monks-black">{change.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-monks-black mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-monks-gray mb-8">
            Get notified about new releases and important updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
            />
            <button className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}