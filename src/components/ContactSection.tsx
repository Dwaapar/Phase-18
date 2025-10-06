import React from "react";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="section-spacing bg-white">
      <div className="max-width-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-display font-bold text-monks-black mb-6">
                Let's Work Together
              </h2>
              <p className="text-xl text-monks-text-gray leading-relaxed">
                Ready to transform your digital presence? Get in touch with our team 
                to discuss your next project and discover how we can help you achieve 
                your business goals.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-monks-light-gray rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-monks-black" />
                </div>
                <div>
                  <p className="font-medium text-monks-black">Email Us</p>
                  <p className="text-monks-text-gray">hello@monks.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-monks-light-gray rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-monks-black" />
                </div>
                <div>
                  <p className="font-medium text-monks-black">Call Us</p>
                  <p className="text-monks-text-gray">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-monks-light-gray rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-monks-black" />
                </div>
                <div>
                  <p className="font-medium text-monks-black">Visit Us</p>
                  <p className="text-monks-text-gray">New York, London, Singapore</p>
                </div>
              </div>
            </div>
            
            <button className="group bg-monks-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-monks-text-gray transition-all duration-300 flex items-center gap-3">
              Start a Project
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
          
          <div className="bg-monks-light-gray rounded-3xl p-8">
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-black transition-all duration-300"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-monks-black mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-black transition-all duration-300"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-black transition-all duration-300"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-black transition-all duration-300"
                  placeholder="Your Company"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-monks-black mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white border-0 text-monks-black focus:ring-2 focus:ring-monks-black transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-monks-black text-white px-6 py-3 rounded-xl font-medium hover:bg-monks-text-gray transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}