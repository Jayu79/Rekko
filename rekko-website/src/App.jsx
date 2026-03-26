import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}
