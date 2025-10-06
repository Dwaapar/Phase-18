import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play, CheckCircle, Star, Users, Building, Zap, Target, Shield, Clock, BarChart, MessageSquare, FileText, ChevronRight, ArrowDown } from "lucide-react";

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "Lead Qualification Pipeline",
      description: "Automatically score and route leads based on custom criteria with intelligent scoring and assignment.",
      stats: { conversion: "+23%", speed: "5x faster", accuracy: "89%" }
    },
    {
      title: "Customer Onboarding Flow", 
      description: "Complete onboarding sequence with emails, tasks, and check-ins that reduces time-to-value.",
      stats: { time: "-60%", satisfaction: "+40%", completion: "95%" }
    },
    {
      title: "Invoice Processing Bot",
      description: "Extract, validate, and process invoices automatically with OCR and intelligent validation.",
      stats: { processing: "75% faster", accuracy: "99.2%", savings: "$50k/year" }
    }
  ];

  const testimonials = [
    {
      quote: "Findawise transformed our operations completely. We now run 10x faster with half the manual work.",
      author: "Sarah Chen",
      role: "VP Operations",
      company: "TechFlow",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      quote: "The 72h pilot delivered results that exceeded our expectations. ROI was immediate.",
      author: "Marcus Rodriguez", 
      role: "CEO",
      company: "GrowthLabs",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const useCases = [
    {
      title: "Lead Routing",
      description: "Smart lead distribution and scoring",
      icon: Target,
      href: "/automation/use-cases/lead-routing"
    },
    {
      title: "Finance Ops",
      description: "Invoice processing and financial workflows", 
      icon: FileText,
      href: "/automation/use-cases/finance-ops"
    },
    {
      title: "Ticket Triage",
      description: "Intelligent support ticket routing",
      icon: MessageSquare,
      href: "/automation/use-cases/ticket-triage"
    },
    {
      title: "KPI Reporting",
      description: "Real-time dashboards and analytics",
      icon: BarChart,
      href: "/automation/use-cases/kpi-reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Exact Weavy.ai style */}
      <section className="relative pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Background Pattern - Weavy.ai style */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge - Weavy.ai style */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-2 mb-8 font-medium border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Automation Services
            </div>

            {/* Main Headline - Weavy.ai typography */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              We Build Your<br/>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Automations
              </span>
            </h1>

            {/* Subheadline - Weavy.ai style */}
            <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
              Custom automation built and maintained by our team. 
              From lead routing to finance ops — deployed in 72 hours with ongoing SLAs.
            </p>

            {/* CTA Buttons - Weavy.ai style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                to="/automation/pilot"
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                Book 72h Pilot
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
              <button className="group border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-slate-400 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2">
                <Play size={20} />
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators - Weavy.ai style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-slate-900">72h</div>
                <div className="text-slate-600 text-sm">Deployment</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-slate-900">99.9%</div>
                <div className="text-slate-600 text-sm">Uptime SLA</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-slate-900">1000+</div>
                <div className="text-slate-600 text-sm">Automations Built</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-slate-900">24/7</div>
                <div className="text-slate-600 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image/Video - Weavy.ai style */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-20">
          <div className="relative">
            <div className="aspect-video bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* 
                VIDEO PLACEMENT: /videos/automation-hero.mp4
                - 30-60 second overview video showing automation dashboard
                - Clean, professional interface shots
                - Should autoplay, muted, loop
                - Poster: /images/automation/hero-poster.jpg (dashboard screenshot)
              */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/automation/hero-poster.jpg"
              >
                <source src="/videos/automation-hero.mp4" type="video/mp4" />
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center text-slate-600">
                    <Play size={48} className="mx-auto mb-4" />
                    <p className="text-lg font-medium">Automation Platform Demo</p>
                    <p className="text-sm mt-2">
                      VIDEO SPECS:<br/>
                      • Format: MP4 (H.264)<br/>
                      • Resolution: 1920x1080<br/>
                      • Duration: 30-60 seconds<br/>
                      • Content: Dashboard overview, workflow creation<br/>
                      • Style: Clean, professional UI shots<br/>
                      • Autoplay, muted, seamless loop
                    </p>
                  </div>
                </div>
              </video>
            </div>
            
            {/* Floating Elements - Weavy.ai style */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-40"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16">
          <div className="animate-bounce">
            <ArrowDown size={24} className="text-slate-400" />
          </div>
        </div>
      </section>

      {/* Features Section - Weavy.ai interactive style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Automation That Actually Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how our custom automations transform real business processes with measurable results.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Feature Tabs - Weavy.ai style */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                    activeTab === i
                      ? "bg-blue-50 border-blue-200 shadow-lg"
                      : "bg-slate-50 hover:bg-slate-100 border-transparent hover:border-slate-200"
                  }`}
                  onClick={() => setActiveTab(i)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white transition-all duration-300 ${
                      activeTab === i ? "bg-blue-600 scale-110" : "bg-slate-400"
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 mb-4">{feature.description}</p>
                      
                      {activeTab === i && (
                        <div className="grid grid-cols-3 gap-4 animate-fade-in">
                          {Object.entries(feature.stats).map(([key, value]) => (
                            <div key={key} className="text-center p-3 bg-white rounded-lg border border-slate-200">
                              <div className="text-lg font-bold text-blue-600">{value}</div>
                              <div className="text-xs text-slate-500 capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Showcase - Weavy.ai style */}
            <div className="relative">
              <div className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                {/* 
                  IMAGE PLACEMENT: Dynamic based on activeTab
                  - /images/automation/lead-qualification.png (800x600px)
                  - /images/automation/customer-onboarding.png (800x600px)  
                  - /images/automation/invoice-processing.png (800x600px)
                  
                  CONTENT: High-quality screenshots of:
                  - Dashboard interfaces showing automation in action
                  - Workflow builders with visual flow diagrams
                  - Analytics screens with real data
                  - Clean, modern UI design matching Weavy.ai aesthetic
                */}
                <img
                  src={`/images/automation/${features[activeTab].title.toLowerCase().replace(/\s+/g, '-')}.png`}
                  alt={features[activeTab].title}
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center" style={{ display: 'none' }}>
                  <div className="text-center text-slate-600">
                    <BarChart size={64} className="mx-auto mb-4 text-blue-500" />
                    <p className="text-xl font-semibold text-slate-900">{features[activeTab].title}</p>
                    <p className="text-sm mt-2 max-w-xs">
                      <strong>IMAGE NEEDED:</strong><br/>
                      Dashboard screenshot showing {features[activeTab].title.toLowerCase()}<br/>
                      800x600px, clean UI, professional quality
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating UI Elements - Weavy.ai style */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-900">Live Automation</span>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-slate-900">Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Weavy.ai card style */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Why Teams Choose Our Automation Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built for enterprise demands with the agility your business needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "Deploy in 72 Hours",
                description: "From consultation to live automation in just 3 days",
                color: "bg-yellow-100 text-yellow-600"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-grade security with SOC 2 compliance",
                color: "bg-green-100 text-green-600"
              },
              {
                icon: BarChart,
                title: "Proven Results",
                description: "Average 40% efficiency improvement across clients",
                color: "bg-blue-100 text-blue-600"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Senior automation architects handle everything",
                color: "bg-purple-100 text-purple-600"
              }
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 border border-slate-100 group">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section - Weavy.ai grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Popular Use Cases
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From sales to support, we've automated processes across every department.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((useCase, i) => {
              const Icon = useCase.icon;
              return (
                <Link
                  key={i}
                  to={useCase.href}
                  className="group bg-slate-50 rounded-2xl p-8 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 border border-slate-100"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {useCase.title}
                  </h3>
                  <p className="text-slate-600 mb-4">{useCase.description}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    Learn More
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Demo Section - Weavy.ai style */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  See It In Action
                </h2>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Watch how our automation services transform business operations 
                  with real-world examples and measurable results.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>72-hour deployment guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Complete ownership handoff</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Ongoing monitoring and SLAs</span>
                </div>
              </div>

              <Link
                to="/automation/pilot"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 group"
              >
                Start Your Pilot
                <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </div>

            {/* Video Player - Weavy.ai style */}
            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                {/* 
                  VIDEO PLACEMENT: /videos/automation-demo.mp4
                  - 2-3 minute detailed demo video
                  - Show automation building process step-by-step
                  - Include before/after workflow comparisons
                  - Professional narration explaining benefits
                  - Poster: /images/automation/demo-poster.jpg
                */}
                <video
                  className="w-full h-full object-cover"
                  controls
                  poster="/images/automation/demo-poster.jpg"
                >
                  <source src="/videos/automation-demo.mp4" type="video/mp4" />
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-slate-400">
                      <Play size={64} className="mx-auto mb-4" />
                      <p className="text-xl font-semibold">Automation Demo</p>
                      <p className="text-sm mt-2 max-w-sm">
                        <strong>VIDEO SPECS:</strong><br/>
                        • Format: MP4 (H.264)<br/>
                        • Resolution: 1920x1080<br/>
                        • Duration: 2-3 minutes<br/>
                        • Content: Step-by-step automation building<br/>
                        • Include: Before/after comparisons<br/>
                        • Style: Professional narration + screen recording
                      </p>
                    </div>
                  </div>
                </video>
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play size={32} className="text-white ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Weavy.ai style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-600">
              See what our customers say about their automation journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                
                <blockquote className="text-lg text-slate-900 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  {/* 
                    IMAGE PLACEMENT: testimonial.avatar
                    - Professional headshots of customers
                    - 150x150px minimum resolution
                    - Clean, business-appropriate photos
                    - Should match the professional aesthetic
                  */}
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-slate-600 text-sm">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Weavy.ai process style */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              How We Build Your Automations
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our proven process ensures your automations are built right, deployed fast, and continuously optimized.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Discovery & Design",
                description: "We audit your processes, map data flows, and design the perfect automation blueprint.",
                icon: Target,
                image: "/images/automation/discovery.jpg"
              },
              {
                step: "02", 
                title: "Build & Deploy",
                description: "Our team codes, tests, and deploys your automation with comprehensive monitoring.",
                icon: Zap,
                image: "/images/automation/development.jpg"
              },
              {
                step: "03",
                title: "Monitor & Optimize",
                description: "You get dashboards, logs, and continuous optimization to maximize performance.",
                icon: BarChart,
                image: "/images/automation/monitoring.jpg"
              }
            ].map((phase, i) => {
              const Icon = phase.icon;
              return (
                <div key={i} className="text-center group">
                  <div className="relative mb-8">
                    <div className="aspect-square bg-white rounded-2xl p-8 shadow-lg border border-slate-200 group-hover:shadow-xl transition-all duration-300">
                      {/* 
                        IMAGE PLACEMENT: phase.image
                        - Professional photos showing each phase of work
                        - /images/automation/discovery.jpg: Team consultation/planning
                        - /images/automation/development.jpg: Developers coding/building
                        - /images/automation/monitoring.jpg: Dashboard/analytics screens
                        - Square aspect ratio, high quality, professional setting
                      */}
                      <img
                        src={phase.image}
                        alt={phase.title}
                        className="w-full h-full object-cover rounded-xl"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center" style={{ display: 'none' }}>
                        <div className="text-center text-slate-600">
                          <Icon size={48} className="mx-auto mb-4 text-blue-500" />
                          <p className="font-semibold">{phase.title}</p>
                          <p className="text-xs mt-2">
                            <strong>IMAGE NEEDED:</strong><br/>
                            Professional photo showing<br/>
                            {phase.title.toLowerCase()} phase
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {phase.step}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{phase.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{phase.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Weavy.ai style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Results That Speak for Themselves
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">1000+</div>
              <div className="text-slate-600">Automations Built</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">75%</div>
              <div className="text-slate-600">Avg Efficiency Gain</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">72h</div>
              <div className="text-slate-600">Deployment Time</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">99.9%</div>
              <div className="text-slate-600">Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Weavy.ai gradient style */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl font-bold leading-tight">
              Ready to Transform<br/>
              Your Operations?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Book a 72-hour pilot and see what custom automation can do for your business. 
              No commitment, just results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/automation/pilot"
                className="group bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl"
              >
                Book 72h Pilot
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/case-studies"
                className="group border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-xl hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
              >
                View Case Studies
                <ChevronRight size={24} />
              </Link>
            </div>

            <div className="pt-8 text-blue-200">
              <p>No credit card required • 72-hour delivery guarantee • Full ownership handoff</p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
      </section>
    </div>
  );
}