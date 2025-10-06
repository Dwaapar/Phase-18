import React from "react";
import { CheckCircle, AlertCircle, Clock, TrendingUp } from "lucide-react";

const services = [
  {
    name: "Workflow Engine",
    status: "operational",
    uptime: "99.98%",
    responseTime: "45ms"
  },
  {
    name: "AI Agents Platform",
    status: "operational", 
    uptime: "99.95%",
    responseTime: "120ms"
  },
  {
    name: "API Gateway",
    status: "operational",
    uptime: "99.99%",
    responseTime: "25ms"
  },
  {
    name: "Decision Platform",
    status: "operational",
    uptime: "99.97%",
    responseTime: "80ms"
  },
  {
    name: "Asset Storage",
    status: "operational",
    uptime: "99.96%",
    responseTime: "35ms"
  },
  {
    name: "Authentication Service",
    status: "operational",
    uptime: "99.99%",
    responseTime: "15ms"
  }
];

const incidents = [
  {
    title: "Scheduled Maintenance - Database Optimization",
    status: "completed",
    date: "Dec 10, 2024",
    duration: "2 hours",
    description: "Routine database maintenance to improve performance"
  },
  {
    title: "API Rate Limiting Issues",
    status: "resolved",
    date: "Dec 5, 2024", 
    duration: "45 minutes",
    description: "Some users experienced rate limiting errors. Issue has been resolved."
  },
  {
    title: "Workflow Deployment Delays",
    status: "resolved",
    date: "Nov 28, 2024",
    duration: "1.5 hours", 
    description: "Workflow deployments were experiencing delays. Root cause identified and fixed."
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "operational":
      return <CheckCircle size={20} className="text-green-500" />;
    case "degraded":
      return <AlertCircle size={20} className="text-yellow-500" />;
    case "outage":
      return <AlertCircle size={20} className="text-red-500" />;
    default:
      return <Clock size={20} className="text-monks-gray" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "operational":
      return "text-green-600";
    case "degraded":
      return "text-yellow-600";
    case "outage":
      return "text-red-600";
    default:
      return "text-monks-gray";
  }
};

export default function StatusPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">System Status</h1>
            <p className="text-xl text-white/80">
              Real-time status and uptime information for all Findawise services.
            </p>
            
            <div className="flex items-center justify-center gap-3 text-green-400">
              <CheckCircle size={24} />
              <span className="text-xl font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overall Stats */}
      <section className="py-16 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">99.98%</div>
              <div className="text-monks-gray">Overall Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-monks-accent mb-2">45ms</div>
              <div className="text-monks-gray">Average Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-monks-black mb-2">0</div>
              <div className="text-monks-gray">Active Incidents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Status */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-monks-black mb-12 text-center">
            Service Status
          </h2>
          
          <div className="space-y-4">
            {services.map((service, i) => (
              <div key={i} className="bg-monks-light-gray rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="font-semibold text-monks-black">{service.name}</h3>
                      <p className={`text-sm capitalize ${getStatusColor(service.status)}`}>
                        {service.status}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8 text-sm text-monks-gray">
                    <div className="text-center">
                      <div className="font-semibold text-monks-black">{service.uptime}</div>
                      <div>Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-monks-black">{service.responseTime}</div>
                      <div>Response Time</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident History */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-monks-black mb-12 text-center">
            Recent Incidents
          </h2>
          
          <div className="space-y-6">
            {incidents.map((incident, i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-monks-black mb-2">{incident.title}</h3>
                    <p className="text-monks-gray">{incident.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {incident.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-monks-gray">
                  <span>{incident.date}</span>
                  <span>Duration: {incident.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-monks-black mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-monks-gray mb-8">
            Get notified about service updates and maintenance windows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
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