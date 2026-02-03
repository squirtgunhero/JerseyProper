import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for Jersey Proper and the AEO Analyzer tool, a trade name of Michael Ehrlich Consulting LLC.',
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-jp-black">
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">
              Disclaimer
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
              <h2 className="text-xl font-semibold text-gold mb-4">1. General Disclaimer</h2>
              <p className="text-white/70 leading-relaxed">
                The information provided on the website located at jerseyproper.com (the &quot;Site&quot;), including but not 
                limited to text, graphics, images, and other materials, is for general informational purposes only. All 
                information on the Site is provided in good faith; however, Jersey Proper, a trade name of MICHAEL 
                EHRLICH CONSULTING LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), makes no representation or warranty 
                of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or 
                completeness of any information on the Site.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">2. AEO Analyzer Tool Disclaimer</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                The AEO (Answer Engine Optimization) Analyzer tool (the &quot;Tool&quot;) and any data, scores, 
                recommendations, audit results, or analysis provided thereby (collectively, &quot;Tool Output&quot;) are provided 
                solely for general informational and educational purposes. The Tool analyzes web page content to assess 
                its potential optimization for citation by artificial intelligence systems and large language models.
              </p>

              <p className="text-white/70 leading-relaxed mb-4">
                The Tool Output is not intended to constitute, and should not be construed as:
              </p>
              <ul className="list-none text-white/70 space-y-3 ml-4">
                <li>
                  <span className="text-gold">(a)</span> A guarantee or prediction that any content will be cited, referenced, or featured by any artificial 
                  intelligence system, search engine, or answer engine;
                </li>
                <li>
                  <span className="text-gold">(b)</span> Professional marketing, search engine optimization (SEO), or digital strategy advice;
                </li>
                <li>
                  <span className="text-gold">(c)</span> A comprehensive or exhaustive analysis of all factors that may influence AI citation or search engine 
                  performance; or
                </li>
                <li>
                  <span className="text-gold">(d)</span> A warranty that implementation of any recommendations will result in increased visibility, traffic, or 
                  business outcomes.
                </li>
              </ul>

              <p className="text-white/70 leading-relaxed mt-6 mb-6">
                The Tool Output is based on algorithmic analysis, heuristics, and assumptions about how artificial 
                intelligence systems may evaluate and cite web content. The Company does not have access to, control 
                over, or special knowledge of the proprietary algorithms, ranking factors, or citation methodologies used 
                by any third-party artificial intelligence systems, including but not limited to OpenAI, Anthropic, Google, 
                Microsoft, Perplexity, or any other AI providers. The actual behavior of such systems may differ 
                materially from the assumptions underlying the Tool.
              </p>

              <div className="bg-gold/10 border border-gold/20 rounded-lg p-5 my-6">
                <p className="text-white/80 leading-relaxed font-medium">
                  YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT YOUR USE OF THE AEO ANALYZER 
                  TOOL AND RELIANCE ON ANY TOOL OUTPUT IS AT YOUR SOLE RISK. Results may vary, and 
                  there is no guarantee that any optimization efforts will achieve the desired outcomes. The Company 
                  strongly recommends that you consult with qualified digital marketing professionals before making 
                  significant business decisions based on Tool Output.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">3. No Professional Advice</h2>
              <p className="text-white/70 leading-relaxed">
                The information and Tool Output provided on the Site do not constitute professional advice of any kind, 
                including but not limited to legal, financial, marketing, or technical advice. You should consult with 
                appropriate professionals before taking any action based on information obtained from the Site or the Tool.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">4. Third-Party Information</h2>
              <p className="text-white/70 leading-relaxed">
                The Site may contain references to third-party products, services, or information. Such references are 
                provided for informational purposes only and do not constitute an endorsement or recommendation. We 
                are not responsible for the accuracy or reliability of any third-party information.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">5. Limitation of Liability</h2>
              <p className="text-white/70 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, 
                ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY DIRECT, INDIRECT, 
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED 
                TO YOUR USE OF THE SITE, THE TOOL, OR ANY TOOL OUTPUT, INCLUDING BUT NOT LIMITED TO 
                LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS, OR LOSS OF DATA.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">6. Changes to This Disclaimer</h2>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to modify this Disclaimer at any time. We will notify you of any changes by posting 
                the updated Disclaimer on this page and updating the &quot;Last Updated&quot; date. Your continued use of the 
                Site or Tool after any changes constitutes your acceptance of the revised Disclaimer.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gold mb-4">7. Contact Us</h2>
              <p className="text-white/70 leading-relaxed">
                If you have any questions about this Disclaimer, please contact us at:
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
