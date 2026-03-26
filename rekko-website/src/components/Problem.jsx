import { AlertTriangle, FileWarning, Gift, Calculator } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const painPoints = [
  {
    icon: AlertTriangle,
    stat: 'TDS filed under the wrong section',
    description: '194C vs 194J mistake costs brands 8% back-TDS + interest penalties from the IT department.',
    color: 'text-danger',
    bg: 'bg-danger-light',
  },
  {
    icon: FileWarning,
    stat: 'Form 16A issued late or never',
    description: "Creators can't claim TDS credit in their ITR. They lose money — and trust in your brand.",
    color: 'text-danger',
    bg: 'bg-danger-light',
  },
  {
    icon: Gift,
    stat: '194R compliance at near zero',
    description: 'Gifted products worth ₹2,000+ Cr/year across the creator economy go completely untracked.',
    color: 'text-danger',
    bg: 'bg-danger-light',
  },
  {
    icon: Calculator,
    stat: 'Manual 26Q filing costs ₹3,000–8,000/quarter',
    description: 'Per agency client, per CA — and that still doesn\'t guarantee accuracy or timeliness.',
    color: 'text-danger',
    bg: 'bg-danger-light',
  },
]

export default function Problem() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            India's creator economy runs on{' '}
            <span className="text-danger">spreadsheets and prayer.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Brands and agencies are one wrong TDS section away from penalties, and creators are left chasing their own tax credits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {painPoints.map((point, i) => {
            const Icon = point.icon
            return (
              <div
                key={i}
                className="reveal group relative bg-white border border-red-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-danger-light/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-10 h-10 ${point.bg} rounded-xl mb-4`}>
                    <Icon size={20} className={point.color} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {point.stat}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {point.description}
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
