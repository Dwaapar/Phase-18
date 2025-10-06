import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bot, MessageSquare, Settings, Zap, Search, Sparkles, TrendingUp, CheckCircle, ArrowRight, Shield, Gauge, Cloud } from "lucide-react";
import { mockAgents } from "../data/mockData";

const deploymentTypes = [
  { id: 'all', name: 'All Agents', icon: Bot },
  { id: 'managed', name: 'Managed', icon: Cloud },
  { id: 'self-hosted', name: 'Self-Hosted', icon: Shield },
  { id: 'hybrid', name: 'Hybrid', icon: Gauge }
];

const agentFeatures = [
  {
    title: 'Always Learning',
    description: 'Agents improve continuously from every interaction',
    icon: TrendingUp
  },
  {
    title: 'Secure by Design',
    description: 'Enterprise-grade security and compliance built-in',
    icon: Shield
  },
  {
    title: 'Rapid Deployment',
    description: 'Deploy production-ready agents in under 10 minutes',
    icon: Zap
  },
  {
    title: 'Full Observability',
    description: 'Monitor performance with real-time dashboards',
    icon: Gauge
  }
];

export default function AgentsPage() {
  const [selectedDeployment, setSelectedDeployment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = searchTerm === '' ||
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDeployment = selectedDeployment === 'all' ||
      agent.deployment.toLowerCase() === selectedDeployment;

    return matchesSearch && matchesDeployment;
  });

  const getAgentIcon = (type: string) => {
    switch(type) {
      case 'SDR': return Zap;
      case 'Support': return MessageSquare;
      case 'Operations': return Settings;
      case 'Research': return Search;
      case 'Content': return Sparkles;
      default: return Bot;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      <section className="py-24 bg-gradient-to-b from-monks-black to-monks-gray text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
              <Sparkles size={16} />
              <span>Autonomous AI Agents</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Deploy AI Agents That Think and Act
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Choose from 8 specialized AI agents or build custom solutions.
              Deploy managed, self-hosted, or hybrid for complete flexibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/agents/new"
                className="px-8 py-4 bg-white text-monks-black rounded-xl font-semibold hover:bg-monks-light-gray transition-colors inline-flex items-center justify-center gap-2"
              >
                Deploy Your First Agent
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact?type=agents"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
              >
                Talk to Specialists
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {agentFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="text-center space-y-3">
                  <div className="w-12 h-12 bg-monks-accent/10 rounded-xl flex items-center justify-center mx-auto">
                    <Icon size={24} className="text-monks-accent" />
                  </div>
                  <h3 className="font-semibold text-monks-black">{feature.title}</h3>
                  <p className="text-sm text-monks-gray leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-monks-black mb-2">Available Agents</h2>
                <p className="text-monks-gray">Choose the perfect agent for your needs</p>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-monks-gray" size={20} />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-monks-light-gray border-0 text-monks-black placeholder-monks-gray focus:ring-2 focus:ring-monks-accent"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {deploymentTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedDeployment(type.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      selectedDeployment === type.id
                        ? 'bg-monks-accent text-white'
                        : 'bg-monks-light-gray text-monks-gray hover:bg-monks-gray/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{type.name}</span>
                  </button>
                );
              })}
            </div>

            {filteredAgents.length === 0 ? (
              <div className="py-24 text-center">
                <div className="w-16 h-16 bg-monks-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot size={24} className="text-monks-gray" />
                </div>
                <h3 className="text-xl font-semibold text-monks-black mb-2">No agents found</h3>
                <p className="text-monks-gray">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredAgents.map((agent) => {
                  const Icon = getAgentIcon(agent.type);
                  return (
                    <div
                      key={agent.id}
                      className="group bg-white rounded-2xl p-8 border border-monks-gray/10 hover:border-monks-accent/30 hover:shadow-card transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-monks-accent to-monks-hover rounded-xl flex items-center justify-center">
                          <Icon className="text-white" size={24} />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          agent.status === 'Popular' ? 'bg-emerald-500/10 text-emerald-600' :
                          agent.status === 'New' ? 'bg-blue-500/10 text-blue-600' :
                          'bg-amber-500/10 text-amber-600'
                        }`}>
                          {agent.status}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-monks-black mb-3 group-hover:text-monks-accent transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-monks-gray mb-6 leading-relaxed">
                        {agent.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {agent.features.map((feature, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <CheckCircle size={16} className="text-monks-accent mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-monks-gray">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-monks-gray/10 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-monks-gray">Deployment</span>
                          <span className="font-semibold text-monks-black">{agent.deployment}</span>
                        </div>

                        <Link
                          to={`/agents/${agent.id}/deploy`}
                          className="block w-full text-center px-6 py-3 bg-monks-accent text-white rounded-xl font-semibold hover:bg-monks-hover transition-colors"
                        >
                          Deploy Agent
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-monks-black to-monks-gray text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Need a Custom Agent?</h2>
          <p className="text-xl text-white/80 leading-relaxed">
            Our team can build specialized agents tailored to your unique workflows and requirements.
            From ideation to deployment, we handle everything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact?type=custom-agent"
              className="px-8 py-4 bg-white text-monks-black rounded-xl font-semibold hover:bg-monks-light-gray transition-colors inline-flex items-center justify-center gap-2"
            >
              Request Custom Agent
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/docs/agents"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
