import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Process from '@/components/Process'
import WhyUs from '@/components/WhyUs'
import Story from '@/components/Story'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <Features />
      <Process />
      <WhyUs />
      <Story />
      <Contact />
      <Footer />
    </main>
  )
}
