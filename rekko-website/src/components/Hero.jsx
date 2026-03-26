import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, ShieldCheck } from 'lucide-react'

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-4xl mx-auto mt-12 md:mt-16">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-100 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-muted font-mono">dashboard.rekko.in</span>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {/* Top stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Total Payouts', value: '₹2.4 Cr', change: '+12.3%', color: 'text-emerald' },
              { label: 'Creators Paid', value: '1,847', change: '+89', color: 'text-indigo' },
              { label: 'TDS Filed', value: '₹18.6L', change: 'Q3 FY25', color: 'text-saffron' },
              { label: 'Form 16A', value: '1,203', change: 'Generated', color: 'text-coral' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] md:text-xs text-muted mb-1">{stat.label}</p>
                <p className={`font-mono font-bold text-sm md:text-lg ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-emerald font-medium">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-3 py-2 grid grid-cols-5 gap-2 text-[10px] md:text-xs font-medium text-muted">
              <span>Creator</span>
              <span>PAN</span>
              <span>Amount</span>
              <span>TDS Section</span>
              <span>Status</span>
            </div>
            {[
              { name: 'Priya Sharma', pan: 'ABCPS****K', amount: '₹45,000', section: '194J', status: 'Paid' },
              { name: 'Rahul Verma', pan: 'DEFPV****M', amount: '₹1,20,000', section: '194C', status: 'Paid' },
              { name: 'Sneha Iyer', pan: 'GHIPS****R', amount: '₹28,500', section: '194J', status: 'Processing' },
              { name: 'Arjun Patel', pan: 'JKLPP****T', amount: '₹3,200', section: '194R', status: 'Paid' },
            ].map((row, i) => (
              <div
                key={i}
                className={`px-3 py-2 grid grid-cols-5 gap-2 text-[10px] md:text-xs ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <span className="font-medium text-foreground truncate">{row.name}</span>
                <span className="font-mono text-muted">{row.pan}</span>
                <span className="font-mono font-medium text-foreground">{row.amount}</span>
                <span>
                  <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                    row.section === '194J' ? 'bg-indigo-light text-indigo' :
                    row.section === '194C' ? 'bg-saffron-light text-saffron-dark' :
                    'bg-emerald-light text-emerald'
                  }`}>
                    {row.section}
                  </span>
                </span>
                <span className={`font-medium ${
                  row.status === 'Paid' ? 'text-emerald' : 'text-saffron'
                }`}>
                  {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow effect behind dashboard */}
      <div className="absolute -inset-4 -z-10 bg-gradient-to-b from-saffron/10 via-indigo/5 to-transparent rounded-3xl blur-2xl" />
    </div>
  )
}

function FloatingCard({ children, className = '' }) {
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg shadow-black/5 border border-gray-100 px-4 py-3 ${className}`}>
      {children}
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const statsRef = useRef([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Stagger the reveal on mount
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const animateValue = (el, end, prefix = '', suffix = '') => {
      if (!el) return
      let start = 0
      const duration = 2000
      const startTime = performance.now()

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(eased * end)
        el.textContent = prefix + current.toLocaleString('en-IN') + suffix
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue(statsRef.current[0], 4500, '₹', ' Cr+')
            animateValue(statsRef.current[1], 25, '', 'L+ creators')
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statsRef.current[0]) observer.observe(statsRef.current[0])
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-8 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 bg-saffron/10 text-saffron-dark text-sm font-medium px-4 py-1.5 rounded-full mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <ShieldCheck size={16} />
          India's Creator Payment Infrastructure
        </div>

        <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Every Creator Payment.{' '}
          <span className="text-saffron">Compliant.</span>{' '}
          <span className="text-indigo">Instant.</span>{' '}
          Done.
        </h1>

        <p className={`text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Rekko automates TDS deduction, GST invoicing, Form 16A, and bulk UPI payouts for brands and agencies paying India's creators.
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a
            href="#cta"
            className="ripple bg-saffron hover:bg-saffron-dark text-white font-medium px-8 py-3.5 rounded-full text-base transition-colors flex items-center gap-2 shadow-lg shadow-saffron/25"
          >
            Request Early Access
            <ArrowRight size={18} />
          </a>
          <a
            href="#how-it-works"
            className="border border-gray-300 hover:border-gray-400 text-foreground font-medium px-8 py-3.5 rounded-full text-base transition-colors flex items-center gap-2"
          >
            <Play size={16} className="text-saffron" />
            See How It Works
          </a>
        </div>

        {/* Floating stat cards */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-4 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <FloatingCard>
            <span className="font-mono font-bold text-emerald text-sm">₹0</span>
            <span className="text-xs text-muted ml-2">manual TDS errors</span>
          </FloatingCard>
          <FloatingCard>
            <span className="font-mono font-bold text-indigo text-sm" ref={el => statsRef.current[1] = el}>2.5M+</span>
            <span className="text-xs text-muted ml-2">creators</span>
          </FloatingCard>
          <FloatingCard>
            <span className="font-mono font-bold text-saffron text-sm">194J / 194C / 194R</span>
            <span className="text-xs text-muted ml-2">automated</span>
          </FloatingCard>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div className={`w-full max-w-5xl transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <DashboardMockup />
      </div>
    </section>
  )
}
