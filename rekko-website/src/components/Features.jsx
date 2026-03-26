import { Scale, Zap, FileText, Database, Fingerprint, LayoutDashboard } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    icon: Scale,
    title: 'TDS Engine',
    description: 'Auto 194J/194C/194R classification with mid-year catch-up deduction. Never file under the wrong section again.',
    span: 'md:col-span-2',
  },
  {
    icon: Zap,
    title: 'Bulk UPI Payouts',
    description: 'Pay 500 creators in one click via Razorpay/Cashfree rails. Instant settlement, complete audit trail.',
    span: 'md:col-span-1',
  },
  {
    icon: FileText,
    title: 'Form 16A Auto-generation',
    description: 'Quarterly Form 16A auto-generated and emailed to every creator. No manual work, no missed deadlines.',
    span: 'md:col-span-1',
  },
  {
    icon: Database,
    title: '26Q Data Compilation',
    description: 'Quarterly return data compiled and ready for your CA to file. Accurate, formatted, on time.',
    span: 'md:col-span-2',
  },
  {
    icon: Fingerprint,
    title: 'Creator KYC',
    description: 'Aadhaar + PAN verification, GST registration status check — all in one automated onboarding flow.',
    span: 'md:col-span-1',
  },
  {
    icon: LayoutDashboard,
    title: 'Creator Dashboard',
    description: 'Payment history, TDS tracker, 26AS reconciliation, and advance tax alerts for every creator.',
    span: 'md:col-span-2',
  },
]

export default function Features() {
  const sectionRef = useScrollReveal()

  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Built for India's{' '}
            <span className="text-indigo">compliance reality</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Every feature designed around the tax and payment challenges that Indian brands, agencies, and creators face daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className={`reveal group ${feature.span} bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-saffron/30 transition-all duration-300 hover:-translate-y-1`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-11 h-11 bg-saffron/10 rounded-xl flex items-center justify-center group-hover:bg-saffron/20 transition-colors">
                    <Icon size={22} className="text-saffron" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
