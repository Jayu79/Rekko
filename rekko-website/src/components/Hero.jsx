import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, LayoutDashboard, ShieldCheck, Megaphone, Users, IndianRupee } from 'lucide-react'

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
              { label: 'Active Campaigns', value: '5', change: '3 live', color: 'text-indigo' },
              { label: 'Creators Managed', value: '42', change: '38 KYC verified', color: 'text-emerald' },
              { label: 'GMV This Month', value: '₹34.2L', change: '+21%', color: 'text-saffron' },
              { label: 'TDS Compliant', value: '100%', change: 'Auto-filed', color: 'text-emerald' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] md:text-xs text-muted mb-1">{stat.label}</p>
                <p className={`font-mono font-bold text-sm md:text-lg ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-emerald font-medium">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Campaign cards preview */}
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-3 py-2 flex items-center justify-between">
              <span className="text-[10px] md:text-xs font-semibold text-foreground">Active Campaigns</span>
              <span className="text-[10px] text-indigo font-medium">View all →</span>
            </div>
            {[
              { name: 'Summer Glow Collection', brand: 'Nykaa', creators: 12, progress: 53, spent: '₹6.1L / ₹8.5L' },
              { name: 'Tech Unboxing Series', brand: 'boAt', creators: 15, progress: 15, spent: '₹1.8L / ₹12L' },
              { name: 'Monsoon Fashion Lookbook', brand: 'Myntra', creators: 18, progress: 27, spent: '₹3.4L / ₹9.7L' },
            ].map((c, i) => (
              <div
                key={i}
                className={`px-3 py-2.5 flex items-center justify-between gap-3 text-[10px] md:text-xs ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <div className="min-w-0">
                  <span className="font-medium text-foreground block truncate">{c.name}</span>
                  <span className="text-muted">{c.brand} · {c.creators} creators</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-muted hidden sm:block">{c.spent}</span>
                  <div className="w-16 h-1.5 rounded bg-gray-100">
                    <div className="h-full rounded bg-indigo" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Glow effect behind dashboard */}
      <div className="absolute -inset-4 -z-10 bg-gradient-to-b from-indigo/10 via-saffron/5 to-transparent rounded-3xl blur-2xl" />
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-8 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <div className={`inline-flex items-center gap-2 bg-indigo/10 text-indigo text-sm font-medium px-4 py-1.5 rounded-full mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <Megaphone size={16} />
          The Campaign Command Centre for Creator Agencies
        </div>

        <h1 className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Run Campaigns.{' '}
          <span className="text-indigo">Pay Creators.</span>{' '}
          <span className="text-saffron">Stay Compliant.</span>
        </h1>

        <p className={`text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          Rekko is the all-in-one platform where agencies manage campaigns, track deliverables, pay creators, and automate TDS compliance — from brief to Form 16A.
        </p>

        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a
            href="#cta"
            className="ripple bg-saffron hover:bg-saffron-dark text-white font-medium px-8 py-3.5 rounded-full text-base transition-colors flex items-center gap-2 shadow-lg shadow-saffron/25"
          >
            Request Early Access
            <ArrowRight size={18} />
          </a>
          <Link
            to="/login"
            className="bg-indigo hover:bg-indigo/90 text-white font-medium px-8 py-3.5 rounded-full text-base transition-colors flex items-center gap-2 shadow-lg shadow-indigo/25"
          >
            <LayoutDashboard size={16} />
            View Live Dashboard
          </Link>
        </div>

        {/* Floating stat cards */}
        <div className={`flex flex-wrap items-center justify-center gap-4 mb-4 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <FloatingCard>
            <span className="font-mono font-bold text-indigo text-sm">5</span>
            <span className="text-xs text-muted ml-2">campaigns managed</span>
          </FloatingCard>
          <FloatingCard>
            <span className="font-mono font-bold text-emerald text-sm">42</span>
            <span className="text-xs text-muted ml-2">active creators</span>
          </FloatingCard>
          <FloatingCard>
            <span className="font-mono font-bold text-saffron text-sm">100%</span>
            <span className="text-xs text-muted ml-2">TDS compliant</span>
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
