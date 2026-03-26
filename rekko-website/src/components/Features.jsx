import { Megaphone, Users, Eye, Zap, Scale, FileText, Database, Fingerprint, LayoutDashboard } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    icon: Megaphone,
    title: 'Campaign Management',
    description: 'Create, budget, and track campaigns end-to-end. See every campaign\'s spend, deliverables, and creator performance in one view.',
    span: 'md:col-span-2',
    accent: true,
  },
  {
    icon: Eye,
    title: 'Deliverable Tracking',
    description: 'Real-time pipeline from brief sent to approved. Know who\'s delivered, who\'s overdue, and who needs a nudge.',
    span: 'md:col-span-1',
  },
  {
    icon: Users,
    title: 'Creator Roster & KYC',
    description: 'Aadhaar + PAN verification, GST status tracking, and automated onboarding — all in one place.',
    span: 'md:col-span-1',
  },
  {
    icon: Zap,
    title: 'Bulk Creator Payouts',
    description: 'Pay 500 creators in one click via UPI rails. Instant settlement with complete audit trail.',
    span: 'md:col-span-1',
  },
  {
    icon: Scale,
    title: 'TDS Engine',
    description: 'Auto 194J/194C/194R classification with threshold tracking and mid-year catch-up. Never file wrong again.',
    span: 'md:col-span-1',
  },
  {
    icon: LayoutDashboard,
    title: 'Agency Dashboard',
    description: 'GMV charts, campaign health, creator stats, compliance status, and alerts — your entire operation at a glance.',
    span: 'md:col-span-2',
    accent: true,
  },
  {
    icon: FileText,
    title: 'Form 16A Auto-generation',
    description: 'Quarterly Form 16A auto-generated and emailed to every creator. No manual work, no missed deadlines.',
    span: 'md:col-span-1',
  },
  {
    icon: Database,
    title: '26Q + Challan Filing',
    description: 'Quarterly return data compiled, challans tracked, everything ready for your CA. Accurate, formatted, on time.',
    span: 'md:col-span-1',
  },
]

export default function Features() {
  const sectionRef = useScrollReveal()

  return (
    <section id="features" ref={sectionRef} className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Campaign management{' '}
            <span className="text-indigo">meets compliance.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Everything an agency needs to run creator campaigns — from brief to payout to Form 16A — in one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className={`reveal group ${feature.span} bg-white border ${feature.accent ? 'border-indigo/20' : 'border-gray-100'} rounded-2xl p-6 hover:shadow-xl hover:border-indigo/30 transition-all duration-300 hover:-translate-y-1`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-11 h-11 ${feature.accent ? 'bg-indigo/10 group-hover:bg-indigo/20' : 'bg-saffron/10 group-hover:bg-saffron/20'} rounded-xl flex items-center justify-center transition-colors`}>
                    <Icon size={22} className={feature.accent ? 'text-indigo' : 'text-saffron'} />
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
