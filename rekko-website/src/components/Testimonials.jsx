import { Quote, ShieldCheck, FileCheck2, Landmark, CreditCard } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const testimonials = [
  {
    quote: "We were filing 194C for influencer payments when it should have been 194J. Rekko caught the mismatch on day one and saved us from an ₹8L back-TDS notice.",
    name: 'Meera Krishnamurthy',
    role: 'Finance Head, Vibe Digital Agency',
    tag: 'Early Access Partner',
  },
  {
    quote: "We didn't even know 194R applied to our gifting campaigns. Rekko flagged ₹40L worth of untracked product gifting in our first quarter. That's real compliance, not lip service.",
    name: 'Ankit Mehta',
    role: 'Brand Marketing Manager, StyleCo',
    tag: 'Early Access Partner',
  },
  {
    quote: "For the first time, my TDS actually showed up in my 26AS before I filed my ITR. I've been chasing agencies for Form 16A for three years — Rekko just sent it automatically.",
    name: 'Neha Rajput',
    role: 'Content Creator, 450K followers',
    tag: 'Early Access Partner',
  },
]

const trustBadges = [
  { icon: Landmark, label: 'IT Department Compliant' },
  { icon: FileCheck2, label: 'GSTN Verified' },
  { icon: CreditCard, label: 'NPCI / UPI Rails' },
]

const complianceTags = [
  'Aadhaar eKYC Verified',
  '26Q Ready',
  '194J Automated',
  'RBI Compliant Rails',
]

export default function Testimonials() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Built for the people{' '}
            <span className="text-indigo">doing the work</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="reveal bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Quote size={24} className="text-saffron/40 mb-3" />
              <p className="text-sm text-foreground leading-relaxed mb-6 flex-1">
                "{t.quote}"
              </p>
              <div className="border-t border-gray-100 pt-4">
                <span className="inline-block bg-saffron/10 text-saffron-dark text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2">
                  {t.tag}
                </span>
                <p className="font-medium text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust logos */}
        <div className="reveal text-center mb-8">
          <p className="text-xs font-medium text-muted uppercase tracking-wider mb-6">Compliant with</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {trustBadges.map((badge, i) => {
              const Icon = badge.icon
              return (
                <div key={i} className="flex items-center gap-2 text-muted/60">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Icon size={20} className="text-muted" />
                  </div>
                  <span className="text-sm font-medium text-muted">{badge.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Compliance tags */}
        <div className="reveal flex flex-wrap items-center justify-center gap-3">
          {complianceTags.map((tag, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 bg-emerald-light/50 text-emerald px-3 py-1.5 rounded-full"
            >
              <ShieldCheck size={14} />
              <span className="text-xs font-medium">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
