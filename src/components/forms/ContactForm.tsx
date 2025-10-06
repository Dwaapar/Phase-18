import React, { useState } from 'react';
import { useToast } from '../ui/Toast';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  type: 'general' | 'sales' | 'support' | 'partnership';
}

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      addToast({
        type: 'success',
        title: 'Message sent!',
        description: 'We\'ll get back to you within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Failed to send message',
        description: 'Please try again or contact us directly.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-monks-black mb-2">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-monks-black mb-2">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300"
              placeholder="you@company.com"
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
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300"
            placeholder="Your company"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-monks-black mb-2">
            Inquiry Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value as ContactFormData['type'])}
            className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300"
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
            onChange={(e) => handleInputChange('subject', e.target.value)}
            required
            className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300"
            placeholder="What can we help you with?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-monks-black mb-2">
            Message *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-2xl bg-monks-light-gray border-0 text-monks-black focus:ring-2 focus:ring-monks-accent transition-all duration-300 resize-none"
            placeholder="Tell us more about your needs..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </form>
  );
};