import React from "react";

export default function PrivacyPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Privacy Policy</h1>
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
                <h2 className="text-2xl font-bold text-monks-black mb-4">1. Information We Collect</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support.
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Account information (name, email, company)</li>
                  <li>• Workflow and automation data</li>
                  <li>• Usage and analytics data</li>
                  <li>• Communication records</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">2. How We Use Your Information</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  We use the information we collect to provide, maintain, and improve our services.
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Provide and operate our services</li>
                  <li>• Process transactions and send notifications</li>
                  <li>• Improve and develop new features</li>
                  <li>• Provide customer support</li>
                  <li>• Ensure security and prevent fraud</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">3. Information Sharing</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy.
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Service providers who assist in our operations</li>
                  <li>• Legal compliance and protection of rights</li>
                  <li>• Business transfers (with notice)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">4. Data Security</h2>
                <p className="text-monks-gray leading-relaxed">
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. This includes encryption, 
                  access controls, and regular security assessments.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">5. Your Rights</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Access and update your information</li>
                  <li>• Request deletion of your data</li>
                  <li>• Data portability</li>
                  <li>• Opt-out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">6. Cookies and Tracking</h2>
                <p className="text-monks-gray leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, analyze usage, 
                  and provide personalized content. You can control cookie settings through your browser.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">7. International Transfers</h2>
                <p className="text-monks-gray leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place to protect your data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">8. Changes to This Policy</h2>
                <p className="text-monks-gray leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any 
                  material changes by posting the new policy on this page and updating the "last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">9. Contact Us</h2>
                <p className="text-monks-gray leading-relaxed">
                  If you have any questions about this privacy policy, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-monks-light-gray rounded-lg">
                  <p className="text-monks-black">
                    <strong>Email:</strong> privacy@findawise.com<br />
                    <strong>Address:</strong> 123 Privacy Street, San Francisco, CA 94105
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