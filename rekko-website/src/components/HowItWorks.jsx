import { useEffect, useRef } from 'react'
import { Megaphone, Users, Eye, Banknote, ShieldCheck } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    icon: Megaphone,
    title: 'Launch Campaign',
    description: 'Create a campaign, set budgets, timelines, and add creators — all from one dashboard.',
    color: 'bg-indigo',
  },
  {
    icon: Users,
    title: 'Manage Creators',
    description: 'KYC-verified creators onboarded. Briefs sent, deliverables tracked, approvals managed.',
    color: 'bg-saffron',
  },
  {
    icon: Eye,
    title: 'Track Deliverables',
    description: 'Real-time pipeline from brief sent → in production → submitted → approved. Nothing falls through.',
    color: 'bg-indigo',
  },
  {
    icon: Banknote,
    title: 'Pay Creators Instantly',
    description: 'Bulk UPI payouts with auto TDS deduction (194J/194C/194R). One click, full audit trail.',
    color: 'bg-emerald',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance on Autopilot',
    description: 'Challans deposited, 26Q compiled, Form 16A auto-generated and sent to every creator.',
    color: 'bg-saffron',
  },
]

export default function HowItWorks() {
  const sectionRef = useScrollReveal()
  const lineRef = useRef(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            line.classList.add('step-line-animate')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(line)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            From brief to Form 16A.{' '}
            <span className="text-saffron">One platform.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            The entire campaign lifecycle — managed, paid, and compliant — in five steps.
          </p>
        </div>

        {/* Desktop horizontal layout */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-200">
            <div ref={lineRef} className="h-full bg-gradient-to-r from-indigo via-saffron to-emerald w-0 step-line-animate" style={{ height: '100%', width: '100%' }} />
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={i}
                className="reveal relative flex flex-col items-center text-center w-1/5 px-2"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`relative z-10 w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon size={28} className="text-white" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full text-xs font-bold text-foreground flex items-center justify-center shadow-sm border border-gray-100">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Mobile vertical layout */}
        <div className="md:hidden flex flex-col gap-6 relative">
          <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gray-200" />
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={i}
                className="reveal relative flex items-start gap-4 pl-2"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`relative z-10 shrink-0 w-10 h-10 ${step.color} rounded-xl flex items-center justify-center shadow-md`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted">Step {i + 1}</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-base mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
