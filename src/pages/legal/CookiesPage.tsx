import React from "react";

export default function CookiesPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-monks-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-hero font-bold">Cookie Policy</h1>
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
                <h2 className="text-2xl font-bold text-monks-black mb-4">What Are Cookies?</h2>
                <p className="text-monks-gray leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you 
                  visit a website. They are widely used to make websites work more efficiently and provide 
                  information to website owners.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">How We Use Cookies</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  We use cookies for several purposes:
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Essential cookies for website functionality</li>
                  <li>• Analytics cookies to understand how you use our site</li>
                  <li>• Preference cookies to remember your settings</li>
                  <li>• Marketing cookies to show relevant advertisements</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-6">
                  <div className="bg-monks-light-gray rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-monks-black mb-3">Essential Cookies</h3>
                    <p className="text-monks-gray mb-3">
                      These cookies are necessary for the website to function properly. They enable basic 
                      functions like page navigation and access to secure areas.
                    </p>
                    <ul className="space-y-1 text-sm text-monks-gray">
                      <li>• Session management</li>
                      <li>• Authentication</li>
                      <li>• Security features</li>
                    </ul>
                  </div>

                  <div className="bg-monks-light-gray rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-monks-black mb-3">Analytics Cookies</h3>
                    <p className="text-monks-gray mb-3">
                      These cookies help us understand how visitors interact with our website by collecting 
                      and reporting information anonymously.
                    </p>
                    <ul className="space-y-1 text-sm text-monks-gray">
                      <li>• Google Analytics</li>
                      <li>• Page views and traffic sources</li>
                      <li>• User behavior patterns</li>
                    </ul>
                  </div>

                  <div className="bg-monks-light-gray rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-monks-black mb-3">Functional Cookies</h3>
                    <p className="text-monks-gray mb-3">
                      These cookies enable enhanced functionality and personalization, such as remembering 
                      your preferences and settings.
                    </p>
                    <ul className="space-y-1 text-sm text-monks-gray">
                      <li>• Language preferences</li>
                      <li>• Theme settings</li>
                      <li>• Form data</li>
                    </ul>
                  </div>

                  <div className="bg-monks-light-gray rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-monks-black mb-3">Marketing Cookies</h3>
                    <p className="text-monks-gray mb-3">
                      These cookies are used to track visitors across websites to display relevant 
                      advertisements and measure campaign effectiveness.
                    </p>
                    <ul className="space-y-1 text-sm text-monks-gray">
                      <li>• Advertising networks</li>
                      <li>• Social media integration</li>
                      <li>• Conversion tracking</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">Managing Cookies</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  You can control and manage cookies in several ways:
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Browser settings: Most browsers allow you to control cookies through their settings</li>
                  <li>• Cookie consent banner: Use our cookie preferences center</li>
                  <li>• Opt-out tools: Use industry opt-out tools for advertising cookies</li>
                  <li>• Delete cookies: Clear existing cookies from your browser</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">Third-Party Cookies</h2>
                <p className="text-monks-gray leading-relaxed mb-4">
                  We may use third-party services that set their own cookies. These include:
                </p>
                <ul className="space-y-2 text-monks-gray">
                  <li>• Google Analytics for website analytics</li>
                  <li>• Social media platforms for sharing features</li>
                  <li>• Customer support tools</li>
                  <li>• Payment processors</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">Cookie Retention</h2>
                <p className="text-monks-gray leading-relaxed">
                  Different cookies have different retention periods:
                </p>
                <ul className="space-y-2 text-monks-gray mt-4">
                  <li>• Session cookies: Deleted when you close your browser</li>
                  <li>• Persistent cookies: Remain until they expire or you delete them</li>
                  <li>• Analytics cookies: Typically expire after 2 years</li>
                  <li>• Marketing cookies: Usually expire after 30 days to 2 years</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">Updates to This Policy</h2>
                <p className="text-monks-gray leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. Please check this page periodically 
                  for updates.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-monks-black mb-4">Contact Us</h2>
                <p className="text-monks-gray leading-relaxed">
                  If you have any questions about our use of cookies, please contact us at:
                </p>
                <div className="mt-4 p-4 bg-monks-light-gray rounded-lg">
                  <p className="text-monks-black">
                    <strong>Email:</strong> privacy@findawise.com<br />
                    <strong>Address:</strong> 123 Cookie Street, San Francisco, CA 94105
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