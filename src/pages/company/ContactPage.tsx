import React, { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";

const contactMethods = [
  {
    title: "General Inquiries",
    description: "Questions about our platform or services",
    icon: Mail,
    contact: "hello@findawise.com",
    response: "24 hours"
  },
  {
    title: "Sales",
    description: "Interested in our enterprise solutions",
    icon: Phone,
    contact: "+1 (555) 123-4567",
    response: "Same day"
  },
  {
    title: "Support",
    description: "Technical support and customer success",
    icon: MessageSquare,
    contact: "support@findawise.com",
    response: "2 hours"
  },
  {
    title: "Partnerships",
    description: "Integration and partnership opportunities",
    icon: MapPin,
    contact: "partnerships@findawise.com",
    response: "48 hours"
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    type: "general"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Contact Us</h1>
            <p className="text-xl text-white/80">
              Ready to transform your business operations? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white border-b border-monks-gray/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <div key={i} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-monks-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Icon size={24} className="text-monks-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-monks-black mb-2">{method.title}</h3>
                    <p className="text-sm text-monks-gray mb-3">{method.description}</p>
                    <div className="space-y-1">
                      <p className="font-medium text-monks-black">{method.contact}</p>
                      <p className="text-xs text-monks-gray">Response: {method.response}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="bg-monks-light-gray rounded-3xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-monks-black mb-4">Send us a message</h2>
                <p className="text-monks-gray">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-monks-black mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-monks-black mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales</option>
                    <option value="support">Support</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-2xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-monks-black mb-6">Get in Touch</h3>
                <p className="text-xl text-monks-gray leading-relaxed">
                  Whether you're looking to automate your first workflow or scale enterprise 
                  operations, we're here to help you succeed.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-monks-black mb-1">Email</h4>
                    <p className="text-monks-gray">hello@findawise.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-monks-black mb-1">Phone</h4>
                    <p className="text-monks-gray">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-monks-accent mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-monks-black mb-1">Headquarters</h4>
                    <p className="text-monks-gray">
                      San Francisco, CA<br />
                      New York, NY<br />
                      London, UK
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-monks-light-gray rounded-2xl p-6">
                <h4 className="font-semibold text-monks-black mb-3">Enterprise Sales</h4>
                <p className="text-monks-gray mb-4">
                  Looking for a custom solution? Our enterprise team can help design 
                  the perfect automation strategy for your organization.
                </p>
                <button className="bg-monks-black text-white px-6 py-3 rounded-full font-medium hover:bg-monks-accent transition-all duration-300">
                  Contact Enterprise Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}