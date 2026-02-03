import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Jersey Proper, a trade name of Michael Ehrlich Consulting LLC.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-jp-black">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-gold italic">
              Jersey Proper (a trade name of MICHAEL EHRLICH CONSULTING LLC)
            </p>
          </div>

          <div className="prose prose-invert prose-gold max-w-none">
            <div className="text-white/60 text-sm mb-8">
              <p>Effective Date: February 3, 2026</p>
              <p>Last Updated: February 3, 2026</p>
            </div>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">1. Introduction</h2>
              <p className="text-white/70 leading-relaxed">
                Jersey Proper, a trade name of MICHAEL EHRLICH CONSULTING LLC, a New Jersey limited 
                liability company (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), respects your privacy and is committed to 
                protecting your personal data. This Privacy Policy describes how we collect, use, disclose, and safeguard 
                your information when you visit our website at jerseyproper.com (the &quot;Site&quot;) or use our services. Please 
                read this Privacy Policy carefully. By accessing or using the Site, you acknowledge that you have read, 
                understood, and agree to be bound by this Privacy Policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-lg font-medium text-white mb-3">2.1 Personal Information You Provide</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                We may collect personal information that you voluntarily provide to us when you: (a) fill out forms on the 
                Site, including contact forms and service inquiry forms; (b) correspond with us via email or other 
                communication channels; (c) subscribe to our newsletter or marketing communications; (d) request 
                information about our Services; or (e) otherwise interact with the Site. Such personal information may 
                include your name, email address, telephone number, company name, and any other information you 
                choose to provide.
              </p>

              <h3 className="text-lg font-medium text-white mb-3">2.2 Information Collected Automatically</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                When you access the Site, we may automatically collect certain information about your device and your 
                use of the Site, including your IP address, browser type and version, operating system, referring URLs, 
                pages viewed, links clicked, date and time of access, and other standard server log information. We 
                collect this information through the use of cookies and similar tracking technologies, as described in our 
                Cookie Policy.
              </p>

              <h3 className="text-lg font-medium text-white mb-3">2.3 Information from Third-Party Analytics Services</h3>
              <p className="text-white/70 leading-relaxed">
                We use Google Analytics, a web analytics service provided by Google, Inc. (&quot;Google&quot;), to collect and 
                analyze information about how users interact with the Site. Google Analytics uses cookies to collect 
                information such as how often users visit the Site, what pages they visit, and what other sites they used 
                prior to coming to our Site. We use this information to improve the Site and our Services. Google&apos;s ability 
                to use and share information collected by Google Analytics about your visits to the Site is restricted by 
                the Google Analytics Terms of Service and the Google Privacy Policy. You may opt out of Google 
                Analytics by installing the Google Analytics Opt-out Browser Add-on available at{' '}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  https://tools.google.com/dlpage/gaoptout
                </a>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">3. How We Use Your Information</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Provide, operate, and maintain our Site and Services</li>
                <li>Respond to your inquiries and fulfill your requests</li>
                <li>Send you marketing and promotional communications (with your consent)</li>
                <li>Improve and personalize your experience on the Site</li>
                <li>Analyze usage trends and measure the effectiveness of our content</li>
                <li>Protect against fraudulent, unauthorized, or illegal activity</li>
                <li>Comply with legal obligations and enforce our terms and policies</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">4. Sharing Your Information</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li><strong className="text-white">Service Providers:</strong> With third-party vendors who perform services on our behalf, such as email delivery, analytics, and hosting</li>
                <li><strong className="text-white">Legal Requirements:</strong> When required by law or to respond to legal process</li>
                <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong className="text-white">With Your Consent:</strong> When you have given us permission to share your information</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-white/70 leading-relaxed">
                We use cookies and similar tracking technologies to collect information about your browsing activities. 
                Cookies are small data files stored on your device. You can control cookies through your browser settings 
                and other tools. However, disabling cookies may limit your ability to use certain features of the Site.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">6. Data Security</h2>
              <p className="text-white/70 leading-relaxed">
                We implement reasonable administrative, technical, and physical security measures to protect your 
                personal information. However, no method of transmission over the Internet or electronic storage is 
                completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">7. Your Rights and Choices</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to opt out of marketing communications</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                To exercise these rights, please contact us at{' '}
                <a 
                  href="mailto:michael@jerseyproper.com"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  michael@jerseyproper.com
                </a>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">8. Third-Party Links</h2>
              <p className="text-white/70 leading-relaxed">
                The Site may contain links to third-party websites. We are not responsible for the privacy practices or 
                content of these third-party sites. We encourage you to review the privacy policies of any third-party 
                sites you visit.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">9. Children&apos;s Privacy</h2>
              <p className="text-white/70 leading-relaxed">
                The Site is not intended for children under the age of 13. We do not knowingly collect personal 
                information from children under 13. If we learn that we have collected personal information from a child 
                under 13, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-white/70 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of the Site 
                after any changes constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">11. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-white/70">
                <p>Jersey Proper</p>
                <p>A trade name of Michael Ehrlich Consulting LLC</p>
                <p>New Jersey, United States</p>
                <p>
                  Email:{' '}
                  <a 
                    href="mailto:michael@jerseyproper.com"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    michael@jerseyproper.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
