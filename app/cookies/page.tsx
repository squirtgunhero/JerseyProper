import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for Jersey Proper, a trade name of Michael Ehrlich Consulting LLC.',
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-jp-black">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
              Cookie Policy
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
                protecting your personal data. This Cookie Policy describes how we collect, use, disclose, and safeguard 
                your information when you visit our website at jerseyproper.com (the &quot;Site&quot;) or use our services. Please 
                read this Cookie Policy carefully. By accessing or using the Site, you acknowledge that you have read, 
                understood, and agree to be bound by this Cookie Policy.
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
              <h2 className="text-xl font-semibold text-gold mb-4">4. What Are Cookies</h2>
              <p className="text-white/70 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                They are widely used to make websites work more efficiently and to provide information to website owners. 
                Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies. Persistent cookies remain on your device when you go 
                offline, while session cookies are deleted as soon as you close your web browser.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">5. Types of Cookies We Use</h2>
              
              <h3 className="text-lg font-medium text-white mb-3">5.1 Essential Cookies</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                These cookies are necessary for the website to function properly. They enable basic functions like page 
                navigation and access to secure areas of the website. The website cannot function properly without these cookies.
              </p>

              <h3 className="text-lg font-medium text-white mb-3">5.2 Analytics Cookies</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                These cookies help us understand how visitors interact with our website by collecting and reporting 
                information anonymously. We use Google Analytics to analyze website traffic and improve our services.
              </p>

              <h3 className="text-lg font-medium text-white mb-3">5.3 Functional Cookies</h3>
              <p className="text-white/70 leading-relaxed">
                These cookies enable the website to provide enhanced functionality and personalization. They may be set 
                by us or by third-party providers whose services we have added to our pages.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">6. Managing Cookies</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings. You can typically find these settings 
                in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser. You can set your browser to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Block all cookies</li>
                <li>Accept all cookies</li>
                <li>Block third-party cookies</li>
                <li>Clear all cookies when you close your browser</li>
                <li>Open a &quot;private browsing&quot; / &quot;incognito&quot; session</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Please note that blocking or deleting cookies may impact your experience on our Site and limit certain functionality.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">7. Third-Party Cookies</h2>
              <p className="text-white/70 leading-relaxed">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of 
                the Site and deliver advertisements on and through the Site. These third parties may include Google Analytics 
                and other analytics providers.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">8. Changes to This Cookie Policy</h2>
              <p className="text-white/70 leading-relaxed">
                We may update this Cookie Policy from time to time. We will notify you of any changes by posting the 
                new Cookie Policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of the Site 
                after any changes constitutes your acceptance of the updated Cookie Policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">9. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about this Cookie Policy, please contact us at:
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
