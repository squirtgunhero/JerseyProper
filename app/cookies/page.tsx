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
                This Cookie Policy explains how Jersey Proper, a trade name of MICHAEL EHRLICH CONSULTING 
                LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), uses cookies and similar tracking technologies on our website at 
                jerseyproper.com (the &quot;Site&quot;). This policy provides you with clear and comprehensive information about 
                the cookies we use and the purposes for using them.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">2. Your Consent</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                When you first visit the Site, you will be presented with a cookie consent banner that allows you to accept 
                or decline non-essential cookies. By clicking &quot;Accept&quot; or continuing to browse the Site after being 
                presented with the banner, you consent to the use of cookies as described in this policy. You may 
                withdraw your consent at any time by adjusting your cookie preferences through the cookie settings link 
                in the Site footer or by using the methods described in Section 6 below.
              </p>
              <p className="text-white/70 leading-relaxed">
                Please note that strictly necessary cookies cannot be disabled as they are essential for the Site to function 
                properly.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">3. What Are Cookies</h2>
              <p className="text-white/70 leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work, to work more efficiently, and to 
                provide reporting information. Cookies set by the website owner are called &quot;first-party cookies.&quot; Cookies 
                set by parties other than the website owner are called &quot;third-party cookies.&quot; Third-party cookies enable 
                third-party features or functionality to be provided on or through the Site, such as analytics.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">4. Types of Cookies We Use</h2>
              
              <h3 className="text-lg font-medium text-white mb-3">4.1 Strictly Necessary Cookies</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                These cookies are essential for the Site to function properly. They enable basic functions like page 
                navigation, access to secure areas of the Site, and remembering your cookie consent preferences. The Site 
                cannot function properly without these cookies, and they cannot be disabled. These cookies do not store 
                any personally identifiable information.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 text-sm">
                <p className="text-white/60">
                  <strong className="text-white">Cookie:</strong> cookie_consent | 
                  <strong className="text-white"> Provider:</strong> jerseyproper.com | 
                  <strong className="text-white"> Purpose:</strong> Stores your cookie consent preferences | 
                  <strong className="text-white"> Duration:</strong> 1 year | 
                  <strong className="text-white"> Type:</strong> First-party
                </p>
              </div>

              <h3 className="text-lg font-medium text-white mb-3">4.2 Analytics Cookies</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                These cookies allow us to count visits and traffic sources so we can measure and improve the performance 
                of our Site. They help us to know which pages are the most and least popular and see how visitors move 
                around the Site. All information these cookies collect is aggregated and therefore anonymous. If you do 
                not allow these cookies, we will not know when you have visited our Site and will not be able to monitor 
                its performance.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 text-sm">
                <p className="text-white/60">
                  <strong className="text-white">Cookie:</strong> _ga | 
                  <strong className="text-white"> Provider:</strong> Google Analytics | 
                  <strong className="text-white"> Purpose:</strong> Distinguishes unique users by assigning a randomly generated number | 
                  <strong className="text-white"> Duration:</strong> 2 years | 
                  <strong className="text-white"> Type:</strong> Third-party
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 text-sm">
                <p className="text-white/60">
                  <strong className="text-white">Cookie:</strong> _ga_* | 
                  <strong className="text-white"> Provider:</strong> Google Analytics | 
                  <strong className="text-white"> Purpose:</strong> Maintains session state | 
                  <strong className="text-white"> Duration:</strong> 2 years | 
                  <strong className="text-white"> Type:</strong> Third-party
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">5. Third-Party Cookies</h2>
              <p className="text-white/70 leading-relaxed">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of 
                the Site. The primary third-party service we use is Google Analytics. Google&apos;s ability to use and share 
                information collected by Google Analytics about your visits to this Site is restricted by the{' '}
                <a 
                  href="https://marketingplatform.google.com/about/analytics/terms/us/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  Google Analytics Terms of Service
                </a>{' '}
                and the{' '}
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  Google Privacy Policy
                </a>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">6. Managing Cookies</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences 
                in the following ways:
              </p>
              
              <h3 className="text-lg font-medium text-white mb-3">Browser Settings</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings preferences. To find out more about 
                cookies, including how to see what cookies have been set and how to manage and delete them, visit{' '}
                <a 
                  href="https://www.allaboutcookies.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  www.allaboutcookies.org
                </a>.
              </p>

              <h3 className="text-lg font-medium text-white mb-3">Google Analytics Opt-Out</h3>
              <p className="text-white/70 leading-relaxed">
                You may opt out of Google Analytics by installing the{' '}
                <a 
                  href="https://tools.google.com/dlpage/gaoptout" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">7. Changes to This Cookie Policy</h2>
              <p className="text-white/70 leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our 
                data practices. When we make changes, we will revise the &quot;Last Updated&quot; date at the top of this policy. 
                We encourage you to periodically review this page for the latest information on our cookie practices.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">8. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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
