import React from "react";
import { Users, Target, Award, Globe } from "lucide-react";

const values = [
  {
    title: "Innovation First",
    description: "We push the boundaries of what's possible with automation and AI",
    icon: Target
  },
  {
    title: "Customer Success",
    description: "Your success is our success. We're committed to your growth",
    icon: Users
  },
  {
    title: "Excellence",
    description: "We maintain the highest standards in everything we build",
    icon: Award
  },
  {
    title: "Global Impact",
    description: "Building solutions that scale across industries and borders",
    icon: Globe
  }
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    bio: "Former VP of Engineering at Stripe, 15+ years in automation",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO & Co-founder", 
    bio: "Ex-Google AI researcher, PhD in Machine Learning from Stanford",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  },
  {
    name: "Emily Watson",
    role: "VP of Product",
    bio: "Product leader from Salesforce, expert in enterprise automation",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "Former Principal Engineer at Uber, scaling systems expert",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
  }
];

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">About Findawise</h1>
            <p className="text-xl text-white/80">
              We're building the wisdom layer for execution—turning every decision into momentum 
              for businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-display font-bold text-monks-black">Our Mission</h2>
              <p className="text-xl text-monks-gray leading-relaxed">
                Choice overload slows teams down. We believe every business deserves clarity 
                and the tools to act on it immediately. That's why we built Findawise—to fuse 
                guidance with automation, helping teams decide, deploy, and scale without adding headcount.
              </p>
              <p className="text-lg text-monks-gray leading-relaxed">
                From our seven integrated engines to our 72-hour pilot builds, everything we create 
                is designed to turn complexity into momentum.
              </p>
            </div>
            
            <div className="bg-monks-light-gray rounded-3xl p-12 text-center">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-monks-accent/10 rounded-3xl flex items-center justify-center mx-auto">
                  <div className="w-12 h-12 bg-monks-accent rounded-2xl"></div>
                </div>
                <h3 className="text-2xl font-bold text-monks-black">
                  1,000+ Teams
                </h3>
                <p className="text-monks-gray">
                  Already transforming their operations with Findawise
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-monks-light-gray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-monks-black mb-6">Our Values</h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white rounded-3xl p-8 text-center">
                  <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon size={24} className="text-monks-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-monks-black mb-4">{value.title}</h3>
                  <p className="text-monks-gray">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-monks-black mb-6">Leadership Team</h2>
            <p className="text-xl text-monks-gray max-w-3xl mx-auto">
              Experienced leaders from top tech companies, united by a vision to democratize automation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-monks-black">{member.name}</h3>
                  <p className="text-monks-accent font-medium">{member.role}</p>
                  <p className="text-monks-gray text-sm mt-2">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2019</div>
              <div className="text-white/60">Founded</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-white/60">Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-white/60">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100M+</div>
              <div className="text-white/60">Workflows Executed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-monks-black mb-6">Join Our Mission</h2>
          <p className="text-xl text-monks-gray mb-8">
            We're always looking for talented people who share our vision of making automation accessible to everyone.
          </p>
          <button className="bg-monks-black text-white px-8 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
            View Open Positions
          </button>
        </div>
      </section>
    </div>
  );
}