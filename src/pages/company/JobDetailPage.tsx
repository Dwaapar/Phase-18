import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, ArrowUpRight, DollarSign, Building } from "lucide-react";
import { Badge } from "../../components/ui/Badge";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useToast } from "../../components/ui/Toast";

export default function JobDetailPage() {
  const { slug } = useParams();
  const [isApplying, setIsApplying] = useState(false);
  const { addToast } = useToast();

  // Mock job data
  const job = {
    title: "Senior Full Stack Engineer",
    department: "Engineering",
    location: "San Francisco, CA / Remote",
    type: "Full-time",
    salary: "$150,000 - $200,000",
    equity: "0.1% - 0.5%",
    description: "We're looking for a Senior Full Stack Engineer to help build the next generation of automation tools and AI agents. You'll work on challenging problems at the intersection of AI, automation, and enterprise software, directly impacting how businesses operate worldwide.",
    responsibilities: [
      "Design and implement scalable web applications using React and Node.js",
      "Build and maintain APIs for workflow automation and AI agent management",
      "Collaborate with product and design teams to create exceptional user experiences",
      "Optimize application performance and ensure high availability",
      "Mentor junior engineers and contribute to technical decisions",
      "Work with AI/ML teams to integrate intelligent features into the platform",
      "Participate in code reviews and maintain high code quality standards",
      "Contribute to architectural decisions and technical strategy"
    ],
    requirements: [
      "5+ years of full-stack development experience",
      "Expert knowledge of React, TypeScript, and Node.js",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Understanding of microservices architecture and distributed systems",
      "Experience with databases (PostgreSQL, MongoDB, Redis)",
      "Knowledge of AI/ML concepts and integration patterns",
      "Strong communication and collaboration skills",
      "Experience with testing frameworks and CI/CD pipelines"
    ],
    niceToHave: [
      "Experience with automation platforms or workflow engines",
      "Background in AI/ML or data science",
      "Open source contributions and community involvement",
      "Experience with Docker, Kubernetes, and container orchestration",
      "Previous startup experience and fast-paced environments",
      "Knowledge of enterprise software and B2B SaaS",
      "Experience with real-time systems and event-driven architecture"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive health, dental, and vision insurance",
      "Unlimited PTO and flexible working hours",
      "Remote-first culture with optional office access",
      "$3,000 annual professional development budget",
      "Top-tier equipment and home office setup allowance",
      "Team retreats and company events",
      "Parental leave and family support programs",
      "Stock option plan with high growth potential",
      "Wellness stipend for gym, mental health, etc."
    ],
    team: {
      size: "15 engineers",
      culture: "Collaborative, innovative, and impact-driven",
      workStyle: "Remote-first with quarterly in-person gatherings",
      techStack: "React, Node.js, TypeScript, PostgreSQL, Redis, AWS"
    },
    hiringProcess: [
      "Application review (2-3 days)",
      "Initial phone screen (30 minutes)",
      "Technical interview (90 minutes)",
      "System design interview (60 minutes)",
      "Team fit interview (45 minutes)",
      "Reference checks and offer"
    ]
  };

  const handleApply = async () => {
    setIsApplying(true);
    try {
      // Simulate application submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast({
        type: 'success',
        title: 'Application submitted!',
        description: 'We\'ll review your application and get back to you within 2-3 days.'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Application failed',
        description: 'Please try again or contact us directly.'
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-monks-gray hover:text-monks-black transition-colors duration-300 mb-8"
          >
            <ArrowLeft size={16} />
            Back to Careers
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <Badge variant="accent">{job.department}</Badge>
                <div className="flex items-center gap-4 text-sm text-monks-gray">
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
              
              <h1 className="text-display font-bold text-monks-black">
                {job.title}
              </h1>
              
              <p className="text-xl text-monks-gray leading-relaxed">
                {job.description}
              </p>
            </div>
            
            <div className="bg-monks-light-gray rounded-3xl p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-monks-black mb-3">Compensation</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-monks-accent" />
                      <span className="text-2xl font-bold text-monks-black">{job.salary}</span>
                    </div>
                    <div className="text-sm text-monks-gray">
                      Plus equity: {job.equity}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-monks-black mb-3">Team Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-monks-gray">Team Size:</span>
                      <span className="text-monks-black">{job.team.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-monks-gray">Work Style:</span>
                      <span className="text-monks-black">Remote-first</span>
                    </div>
                    <div>
                      <span className="text-monks-gray">Tech Stack:</span>
                      <p className="text-monks-black mt-1">{job.team.techStack}</p>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isApplying ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Applying...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <ArrowUpRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">What You'll Do</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-monks-accent rounded-full mt-2"></div>
                      <span className="text-monks-gray">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-monks-accent rounded-full mt-2"></div>
                      <span className="text-monks-gray">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nice to Have */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">Nice to Have</h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-monks-gray rounded-full mt-2"></div>
                      <span className="text-monks-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">Benefits & Perks</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-monks-light-gray rounded-2xl">
                      <div className="w-1.5 h-1.5 bg-monks-accent rounded-full mt-2"></div>
                      <span className="text-monks-gray text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hiring Process */}
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-6">Hiring Process</h2>
                <div className="space-y-4">
                  {job.hiringProcess.map((step, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-monks-light-gray rounded-2xl">
                      <div className="w-8 h-8 bg-monks-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {i + 1}
                      </div>
                      <span className="text-monks-black">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Apply Again */}
              <div className="bg-monks-light-gray rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Ready to Apply?</h3>
                <p className="text-sm text-monks-gray mb-4">
                  Join our team and help build the future of business automation.
                </p>
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="w-full bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isApplying ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Applying...
                    </>
                  ) : (
                    <>
                      Apply Now
                      <ArrowUpRight size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Team Culture */}
              <div className="bg-monks-light-gray rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Team Culture</h3>
                <p className="text-sm text-monks-gray mb-4">{job.team.culture}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-monks-accent" />
                    <span className="text-monks-black">{job.team.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building size={14} className="text-monks-accent" />
                    <span className="text-monks-black">{job.team.workStyle}</span>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="bg-monks-light-gray rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Share this Job</h3>
                <div className="space-y-3">
                  <button className="w-full bg-white px-4 py-2 rounded-lg font-medium hover:bg-monks-gray hover:text-white transition-all duration-300">
                    Share on LinkedIn
                  </button>
                  <button className="w-full bg-white px-4 py-2 rounded-lg font-medium hover:bg-monks-gray hover:text-white transition-all duration-300">
                    Share on Twitter
                  </button>
                  <button className="w-full bg-white px-4 py-2 rounded-lg font-medium hover:bg-monks-gray hover:text-white transition-all duration-300">
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Other Openings */}
              <div className="bg-monks-light-gray rounded-2xl p-6">
                <h3 className="font-semibold text-monks-black mb-4">Other Openings</h3>
                <div className="space-y-3">
                  <Link
                    to="/careers/product-manager-ai"
                    className="block p-3 bg-white rounded-lg hover:bg-monks-gray/10 transition-colors duration-300"
                  >
                    <h4 className="font-medium text-monks-black text-sm">Product Manager - AI</h4>
                    <p className="text-monks-gray text-xs">Product • Remote</p>
                  </Link>
                  <Link
                    to="/careers/devops-engineer"
                    className="block p-3 bg-white rounded-lg hover:bg-monks-gray/10 transition-colors duration-300"
                  >
                    <h4 className="font-medium text-monks-black text-sm">DevOps Engineer</h4>
                    <p className="text-monks-gray text-xs">Engineering • Remote</p>
                  </Link>
                  <Link
                    to="/careers/customer-success-manager"
                    className="block p-3 bg-white rounded-lg hover:bg-monks-gray/10 transition-colors duration-300"
                  >
                    <h4 className="font-medium text-monks-black text-sm">Customer Success Manager</h4>
                    <p className="text-monks-gray text-xs">Customer Success • Austin, TX</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}