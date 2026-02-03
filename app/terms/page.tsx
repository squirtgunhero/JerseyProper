import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Jersey Proper, a trade name of Michael Ehrlich Consulting LLC.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-jp-black">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
              Terms of Service
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
              <h2 className="text-xl font-semibold text-gold mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/70 leading-relaxed">
                By accessing or using the website located at jerseyproper.com (the &quot;Site&quot;) or any services, features, 
                content, or applications offered by Jersey Proper, a trade name of MICHAEL EHRLICH CONSULTING 
                LLC, a New Jersey limited liability company (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you (&quot;User,&quot; &quot;you,&quot; or 
                &quot;your&quot;) agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, 
                you are prohibited from using or accessing this Site and must discontinue use immediately.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">2. Description of Services</h2>
              <p className="text-white/70 leading-relaxed">
                Jersey Proper provides web design, graphic design, user interface and user experience (UI/UX) design, 
                lead generation services, custom application development, and related digital services for small 
                businesses (collectively, the &quot;Services&quot;). Additionally, the Site may offer tools, including but not limited 
                to the Property Analyzer tool, which provides informational data and analysis (the &quot;Tools&quot;).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">3. Eligibility</h2>
              <p className="text-white/70 leading-relaxed">
                You must be at least eighteen (18) years of age and possess the legal authority to enter into these Terms to 
                use our Services. By using the Site, you represent and warrant that you meet these eligibility 
                requirements. If you are entering into these Terms on behalf of a business entity, you represent that you 
                have the authority to bind such entity to these Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">4. User Accounts</h2>
              <p className="text-white/70 leading-relaxed">
                Certain features of the Site may require you to create an account. You agree to provide accurate, current, 
                and complete information during registration and to update such information as necessary. You are solely 
                responsible for maintaining the confidentiality of your account credentials and for all activities that occur 
                under your account. You agree to notify us immediately of any unauthorized use of your account. We 
                reserve the right to suspend or terminate accounts that violate these Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">5. Intellectual Property Rights</h2>
              
              <h3 className="text-lg font-medium text-white mb-3">5.1 Company Intellectual Property</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                All content, features, and functionality on the Site, including but not limited to text, graphics, logos, 
                icons, images, audio clips, digital downloads, data compilations, software, and the compilation thereof 
                (collectively, &quot;Site Content&quot;), are the exclusive property of the Company or its licensors and are protected 
                by United States and international copyright, trademark, patent, trade secret, and other intellectual 
                property or proprietary rights laws.
              </p>

              <h3 className="text-lg font-medium text-white mb-3">5.2 Limited License</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to 
                access and use the Site for your personal or internal business purposes. This license does not include the 
                right to: (a) modify or copy the Site Content; (b) use the Site Content for any commercial purpose without 
                our prior written consent; (c) attempt to reverse engineer any software contained on the Site; (d) remove 
                any copyright or other proprietary notations; or (e) transfer the materials to another person or mirror the 
                materials on any other server.
              </p>

              <h3 className="text-lg font-medium text-white mb-3">5.3 User Content</h3>
              <p className="text-white/70 leading-relaxed">
                If you submit, upload, or otherwise provide any content to the Site (&quot;User Content&quot;), you grant us a 
                non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such User Content 
                in connection with providing our Services. You represent and warrant that you own or have the necessary 
                rights to grant this license.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">6. Prohibited Conduct</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                <li>Use the Site for any unlawful purpose or in violation of these Terms</li>
                <li>Attempt to gain unauthorized access to any portion of the Site or any systems or networks connected to the Site</li>
                <li>Use any robot, spider, scraper, or other automated means to access the Site</li>
                <li>Interfere with or disrupt the Site or servers or networks connected to the Site</li>
                <li>Transmit any viruses, worms, or other malicious code</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                <li>Collect or store personal data about other users without their consent</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">7. Third-Party Links</h2>
              <p className="text-white/70 leading-relaxed">
                The Site may contain links to third-party websites or services that are not owned or controlled by us. We 
                have no control over, and assume no responsibility for, the content, privacy policies, or practices of any 
                third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for 
                any damage or loss caused by your use of any such third-party websites or services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-white/70 leading-relaxed">
                THE SITE AND SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT 
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY 
                LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF 
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT 
                WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">9. Limitation of Liability</h2>
              <p className="text-white/70 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE COMPANY, ITS OFFICERS, 
                DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE 
                OR SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, 
                EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">10. Indemnification</h2>
              <p className="text-white/70 leading-relaxed">
                You agree to indemnify, defend, and hold harmless the Company and its officers, directors, employees, 
                agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses 
                (including reasonable attorneys&apos; fees) arising out of or related to: (a) your use of the Site or Services; 
                (b) your violation of these Terms; (c) your violation of any rights of another party; or (d) your User Content.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">11. Governing Law and Dispute Resolution</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of New Jersey, 
                without regard to its conflict of law principles. Any dispute arising out of or relating to these Terms or the 
                Site shall be resolved exclusively in the state or federal courts located in New Jersey, and you consent to 
                the personal jurisdiction of such courts.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">12. Changes to Terms</h2>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the 
                updated Terms on this page and updating the &quot;Last Updated&quot; date. Your continued use of the Site after 
                any changes constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">13. Severability</h2>
              <p className="text-white/70 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or 
                eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and 
                effect.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">14. Entire Agreement</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between 
                you and the Company regarding the use of the Site and supersede all prior agreements and understandings.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">15. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
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
