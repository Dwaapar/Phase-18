import React from "react";

export default function TermsPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Terms of Service</h1>
            <p className="text-xl text-white/80">
              Last updated: December 15, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">1. Acceptance of Terms</h2>
                <p className="text-monks-gray leading-relaxed">
                  By accessing and using Findawise's services, you accept and agree to be bound by the 
                  terms and provision of this agreement. If you do not agree to abide by the above, 
                  please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">2. Description of Service</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  Findawise provides automation, workflow management, AI agents, and related services 
                  to help businesses optimize their operations.
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Workflow automation platform</li>
                  <li>• AI agent deployment and management</li>
                  <li>• Decision support tools</li>
                  <li>• Digital asset marketplace</li>
                  <li>• Professional services and consulting</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">3. User Accounts</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  To access certain features of our service, you must create an account. You are responsible for:
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Maintaining the confidentiality of your account credentials</li>
                  <li>• All activities that occur under your account</li>
                  <li>• Providing accurate and complete information</li>
                  <li>• Promptly updating your account information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">4. Acceptable Use</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  You agree not to use our services for any unlawful purpose or in any way that could 
                  damage, disable, or impair our services. Prohibited activities include:
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Violating any applicable laws or regulations</li>
                  <li>• Infringing on intellectual property rights</li>
                  <li>• Transmitting malicious code or content</li>
                  <li>• Attempting to gain unauthorized access</li>
                  <li>• Interfering with other users' use of the service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">5. Payment Terms</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  For paid services:
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Fees are charged in advance on a monthly or annual basis</li>
                  <li>• All fees are non-refundable except as required by law</li>
                  <li>• We may change our fees with 30 days' notice</li>
                  <li>• Failure to pay may result in service suspension</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">6. Intellectual Property</h2>
                <p className="text-monks-gray leading-relaxed">
                  The service and its original content, features, and functionality are and will remain 
                  the exclusive property of Findawise and its licensors. The service is protected by 
                  copyright, trademark, and other laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">7. Privacy</h2>
                <p className="text-monks-gray leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs 
                  your use of the service, to understand our practices.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">8. Termination</h2>
                <p className="text-monks-gray leading-relaxed">
                  We may terminate or suspend your account and bar access to the service immediately, 
                  without prior notice or liability, under our sole discretion, for any reason whatsoever 
                  and without limitation, including but not limited to a breach of the Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">9. Limitation of Liability</h2>
                <p className="text-monks-gray leading-relaxed">
                  In no event shall Findawise, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">10. Changes to Terms</h2>
                <p className="text-monks-gray leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">11. Contact Information</h2>
                <p className="text-monks-gray leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-monks-light-gray rounded-lg">
                  <p className="text-monks-black">
                    <strong>Email:</strong> legal@findawise.com<br />
                    <strong>Address:</strong> 123 Legal Street, San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}