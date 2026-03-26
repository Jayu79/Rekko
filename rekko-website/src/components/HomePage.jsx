import Navbar from './Navbar'
import Hero from './Hero'
import Problem from './Problem'
import DashboardShowcase from './DashboardShowcase'
import HowItWorks from './HowItWorks'
import Features from './Features'
import CTA from './CTA'
import Footer from './Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Problem />
      <DashboardShowcase />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}
