import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Building2, Globe, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { Container } from '../../components/layout/Container';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Card } from '../../components/ui/Card';
import { affiliateService } from '../../services/affiliate.service';

export default function AffiliateOnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [formData, setFormData] = useState({
    company_name: '',
    website_url: '',
    promotional_methods: [] as string[],
    audience_size: '',
    application_notes: ''
  });

  const promotionalMethodOptions = [
    'Website/Blog',
    'Social Media',
    'Email Marketing',
    'YouTube/Video',
    'Podcast',
    'Paid Advertising',
    'SEO/Content Marketing',
    'Influencer Marketing',
    'Community Forums',
    'Other'
  ];

  const handleMethodToggle = (method: string) => {
    setFormData(prev => ({
      ...prev,
      promotional_methods: prev.promotional_methods.includes(method)
        ? prev.promotional_methods.filter(m => m !== method)
        : [...prev.promotional_methods, method]
    }));
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) {
      alert('Please agree to the affiliate terms and conditions');
      return;
    }

    setLoading(true);
    try {
      await affiliateService.applyAsAffiliate({
        company_name: formData.company_name || undefined,
        website_url: formData.website_url || undefined,
        promotional_methods: formData.promotional_methods,
        audience_size: formData.audience_size ? parseInt(formData.audience_size) : undefined,
        application_notes: formData.application_notes || undefined
      });

      setStep(4);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Join the Findawise Affiliate Program
        </h1>
        <p className="text-xl text-slate-600">
          Earn competitive commissions by promoting enterprise automation solutions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Up to 30% Commission</h3>
              <p className="text-slate-600 text-sm">
                Earn recurring revenue on Pro subscriptions and high commissions on assets and services
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">30-Day Cookie Window</h3>
              <p className="text-slate-600 text-sm">
                Get credited for conversions within 30 days of the initial click
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Marketing Resources</h3>
              <p className="text-slate-600 text-sm">
                Access banners, email templates, landing pages, and promotional content
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Dedicated Support</h3>
              <p className="text-slate-600 text-sm">
                Get help from our affiliate team and access performance insights
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-slate-50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Commission Structure</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <h3 className="font-semibold text-slate-900">Workflows</h3>
              <p className="text-sm text-slate-600">Pro subscriptions</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">20%</p>
              <p className="text-sm text-slate-600">Recurring</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <h3 className="font-semibold text-slate-900">Agents</h3>
              <p className="text-sm text-slate-600">First year revenue</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">15%</p>
              <p className="text-sm text-slate-600">First Year</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <h3 className="font-semibold text-slate-900">Digital Assets</h3>
              <p className="text-sm text-slate-600">One-time purchases</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-600">30%</p>
              <p className="text-sm text-slate-600">One-time</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-lg">
            <div>
              <h3 className="font-semibold text-slate-900">Services</h3>
              <p className="text-sm text-slate-600">Project value</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">10%</p>
              <p className="text-sm text-slate-600">Project Value</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button size="lg" onClick={() => setStep(2)}>
          Start Application
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">About You</h2>
        <p className="text-slate-600">Tell us about your business and audience</p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Building2 className="w-4 h-4 inline mr-2" />
              Company/Brand Name
            </label>
            <Input
              value={formData.company_name}
              onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
              placeholder="Your company or personal brand name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              Website URL
            </label>
            <Input
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Audience Size
            </label>
            <Input
              type="number"
              value={formData.audience_size}
              onChange={(e) => setFormData(prev => ({ ...prev, audience_size: e.target.value }))}
              placeholder="Total reach across all channels"
            />
            <p className="text-sm text-slate-500 mt-1">
              Approximate total followers, subscribers, or monthly visitors
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Promotional Methods
            </label>
            <div className="grid grid-cols-2 gap-3">
              {promotionalMethodOptions.map(method => (
                <label key={method} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.promotional_methods.includes(method)}
                    onChange={() => handleMethodToggle(method)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-slate-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Additional Information
            </label>
            <Textarea
              value={formData.application_notes}
              onChange={(e) => setFormData(prev => ({ ...prev, application_notes: e.target.value }))}
              placeholder="Tell us more about your audience and how you plan to promote Findawise products..."
              rows={4}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
            Back
          </Button>
          <Button
            onClick={() => setStep(3)}
            className="flex-1"
            disabled={formData.promotional_methods.length === 0}
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Terms & Conditions</h2>
        <p className="text-slate-600">Review and accept our affiliate agreement</p>
      </div>

      <Card className="p-8">
        <div className="prose prose-slate max-w-none mb-6 max-h-96 overflow-y-auto bg-slate-50 rounded-lg p-6">
          <h3>Findawise Affiliate Program Agreement</h3>

          <h4>1. Program Overview</h4>
          <p>
            The Findawise Affiliate Program allows approved affiliates to earn commissions by promoting
            Findawise products and services to potential customers.
          </p>

          <h4>2. Commission Structure</h4>
          <ul>
            <li>Workflows: 20% recurring commission on Pro subscriptions</li>
            <li>Agents: 15% commission on first-year revenue</li>
            <li>Digital Assets: 30% one-time commission</li>
            <li>Services: 10% commission on project value</li>
          </ul>

          <h4>3. Payment Terms</h4>
          <p>
            Commissions are paid monthly via PayPal or Stripe with a minimum payout threshold of $100.
            Payments are made Net 30 after the end of each month.
          </p>

          <h4>4. Cookie Duration</h4>
          <p>
            Affiliate referrals are tracked for 30 days from the initial click. Last-click attribution
            is used for commission assignment.
          </p>

          <h4>5. Promotional Guidelines</h4>
          <p>Affiliates must:</p>
          <ul>
            <li>Clearly disclose affiliate relationships in all promotional content</li>
            <li>Use only approved marketing materials and messaging</li>
            <li>Not engage in spam, trademark bidding, or misleading practices</li>
            <li>Not make unauthorized claims about product features or benefits</li>
          </ul>

          <h4>6. Compliance</h4>
          <p>
            Affiliates must comply with all applicable laws including FTC guidelines, GDPR, and other
            relevant regulations. Violations may result in account suspension or termination.
          </p>

          <h4>7. Termination</h4>
          <p>
            Either party may terminate this agreement at any time. Earned commissions will be paid out
            according to the standard payment schedule.
          </p>
        </div>

        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded mt-1"
          />
          <span className="text-slate-700">
            I have read and agree to the Findawise Affiliate Program Terms and Conditions
          </span>
        </label>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={!agreedToTerms || loading}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        Application Submitted!
      </h2>

      <p className="text-xl text-slate-600 mb-8">
        Thank you for applying to the Findawise Affiliate Program. Our team will review your
        application and get back to you within 2-3 business days.
      </p>

      <Card className="p-6 text-left mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">What happens next?</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-semibold text-blue-600">1</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Application Review</p>
              <p className="text-sm text-slate-600">Our team reviews your application and verifies your information</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-semibold text-blue-600">2</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Approval Notification</p>
              <p className="text-sm text-slate-600">You'll receive an email with your unique affiliate code and dashboard access</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm font-semibold text-blue-600">3</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Start Promoting</p>
              <p className="text-sm text-slate-600">Access marketing materials and generate affiliate links to start earning</p>
            </div>
          </div>
        </div>
      </Card>

      <Button onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <Container>
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${step >= i ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}
                `}>
                  {i}
                </div>
                {i < 4 && (
                  <div className={`w-16 h-1 mx-2 ${step > i ? 'bg-blue-600' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </Container>
    </div>
  );
}
