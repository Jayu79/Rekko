import { Check } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const plans = [
  {
    name: 'Starter',
    price: '₹2,999',
    period: '/month',
    description: 'For agencies getting started with creator payments.',
    highlight: false,
    features: [
      'Up to ₹25L payout volume/month',
      'Auto TDS classification (194J/194C/194R)',
      'Form 16A auto-generation',
      '26Q data compilation',
      'Creator KYC (Aadhaar + PAN)',
      'First month free',
    ],
  },
  {
    name: 'Growth',
    price: '0.75%',
    period: ' per transaction',
    description: 'For scaling agencies with growing creator networks.',
    highlight: true,
    badge: 'Most Popular',
    features: [
      '₹25L – ₹2Cr/month volume',
      'Everything in Starter',
      'Dedicated onboarding manager',
      'Priority support',
      'Custom payout schedules',
      'Bulk creator invite flows',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large brands and networks processing at scale.',
    highlight: false,
    features: [
      '₹2Cr+/month volume',
      'Everything in Growth',
      'Full API access',
      'White-label dashboard',
      'Custom SLA & uptime guarantee',
      'Dedicated account manager',
    ],
  },
]

export default function Pricing() {
  const sectionRef = useScrollReveal()

  return (
    <section id="pricing" ref={sectionRef} className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Simpler than a spreadsheet.{' '}
            <span className="text-saffron">Cheaper than your CA.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Transparent pricing. No hidden fees. Start free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`reveal relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                plan.highlight
                  ? 'bg-indigo text-white shadow-2xl shadow-indigo/25 scale-[1.02] md:scale-105 z-10'
                  : 'bg-white border border-gray-100 shadow-sm hover:shadow-lg'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-saffron text-white text-xs font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className={`font-display text-lg font-semibold mb-1 ${plan.highlight ? 'text-white' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-white/70' : 'text-muted'}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`font-mono text-3xl font-bold ${plan.highlight ? 'text-white' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlight ? 'text-white/70' : 'text-muted'}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <Check size={16} className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-saffron' : 'text-emerald'}`} />
                    <span className={`text-sm ${plan.highlight ? 'text-white/90' : 'text-muted'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`block text-center font-medium py-3 rounded-full text-sm transition-colors ${
                  plan.highlight
                    ? 'bg-white text-indigo hover:bg-gray-100'
                    : 'bg-foreground text-white hover:bg-foreground/90'
                }`}
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started Free'}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted mt-8 reveal">
          First month free. No setup fee. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
