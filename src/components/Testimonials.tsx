import React from "react";

const testimonials = [
  {
    name: "Alice Johnson",
    role: "Marketing Head, SaaS Co",
    quote: "Findawise transformed our operations completely. We now run 10x faster with half the manual work.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    name: "Robert Lee",
    role: "Founder, eCommerce",
    quote: "The automation platform saved me 30 hours a week. It's been a complete game changer for our business.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    name: "Maya Singh",
    role: "Product Lead, Fintech",
    quote: "The AI agents are incredibly sophisticated. They handle complex tasks that used to take our team hours.",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-display font-bold text-monks-black mb-6">
            Trusted by Innovators
          </h2>
          <p className="text-xl text-monks-gray max-w-2xl mx-auto">
            Join thousands of teams already scaling with Findawise
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div 
              key={i} 
              className="bg-monks-light-gray rounded-3xl p-8 space-y-6 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="space-y-4">
                <p className="text-lg text-monks-black leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-monks-black">{testimonial.name}</p>
                  <p className="text-monks-gray text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}