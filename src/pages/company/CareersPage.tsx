import React from "react";
import { MapPin, Clock, Users, ArrowUpRight } from "lucide-react";

const openings = [
  {
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    description: "Build the next generation of automation tools and AI agents",
    requirements: ["5+ years full-stack experience", "React/Node.js expertise", "Experience with AI/ML"]
  },
  {
    title: "Product Manager - AI Agents",
    department: "Product",
    location: "New York, NY / Remote", 
    type: "Full-time",
    description: "Lead product strategy for our AI agents platform",
    requirements: ["3+ years PM experience", "AI/ML product background", "Enterprise software experience"]
  },
  {
    title: "Senior DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time", 
    description: "Scale our infrastructure to support millions of workflows",
    requirements: ["Kubernetes expertise", "AWS/GCP experience", "Infrastructure as code"]
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Austin, TX / Remote",
    type: "Full-time",
    description: "Help enterprise customers succeed with automation",
    requirements: ["B2B SaaS experience", "Technical background", "Customer-first mindset"]
  },
  {
    title: "Marketing Manager - Content",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Create compelling content about automation and AI",
    requirements: ["Content marketing experience", "Technical writing skills", "B2B SaaS background"]
  },
  {
    title: "Sales Development Representative",
    department: "Sales",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Generate and qualify leads for our enterprise sales team",
    requirements: ["1+ years SDR experience", "B2B SaaS background", "Excellent communication"]
  }
];

const benefits = [
  "Competitive salary and equity",
  "Comprehensive health, dental, and vision insurance",
  "Unlimited PTO and flexible working hours",
  "Remote-first culture with optional office access",
  "Professional development budget",
  "Top-tier equipment and home office setup",
  "Team retreats and company events",
  "Parental leave and family support"
];

export default function CareersPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Join Our Team</h1>
            <p className="text-xl text-white/80">
              Help us build the future of business automation. Work with cutting-edge AI and 
              automation technologies while making a real impact on businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-display font-bold text-monks-black">Our Culture</h2>
              <p className="text-xl text-monks-gray leading-relaxed">
                We're a remote-first company that values autonomy, creativity, and impact. 
                Our team is passionate about solving complex problems and building products 
                that make a real difference.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users size={20} className="text-monks-accent" />
                  <span className="text-monks-black">Collaborative and inclusive environment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-monks-accent" />
                  <span className="text-monks-black">Flexible hours and work-life balance</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-monks-accent" />
                  <span className="text-monks-black">Remote-first with global team</span>
                </div>
              </div>
            </div>
            
            <div className="bg-monks-light-gray rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-monks-black mb-6">Why Findawise?</h3>
              <ul className="space-y-3">
                {benefits.slice(0, 4).map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-monks-gray">
                    <div className="w-1.5 h-1.5 bg-monks-accent rounded-full"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-monks-black mb-6">Open Positions</h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              We're growing fast and looking for talented people to join our mission.
            </p>
          </div>

          <div className="space-y-6">
            {openings.map((job, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 hover:shadow-card transition-all duration-300">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-monks-black">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-monks-gray">
                        <span className="px-3 py-1 bg-monks-accent/10 text-monks-accent rounded-full">
                          {job.department}
                        </span>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-monks-gray">{job.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-monks-black mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-monks-gray">
                            <div className="w-1 h-1 bg-monks-accent rounded-full"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <button className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300 flex items-center gap-2 group">
                      Apply Now
                      <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-monks-black mb-6">Benefits & Perks</h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              We believe in taking care of our team so they can do their best work.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-monks-light-gray rounded-2xl p-6 text-center">
                <p className="text-monks-black">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Don't See the Right Role?</h2>
          <p className="text-xl text-white/80 mb-8">
            We're always interested in hearing from talented people. Send us your resume!
          </p>
          <button className="bg-white text-monks-black px-8 py-4 rounded-full font-medium hover:bg-monks-accent hover:text-white transition-all duration-300">
            Send Resume
          </button>
        </div>
      </section>
    </div>
  );
}