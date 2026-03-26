import { Mail, Sparkles } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CTA() {
  const sectionRef = useScrollReveal()

  return (
    <section id="cta" ref={sectionRef} className="py-20 md:py-28 px-6 bg-saffron relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-saffron-dark/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="reveal">
          <Sparkles size={32} className="text-white/60 mx-auto mb-4" />

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
            Stop filing TDS on spreadsheets.
          </h2>

          <p className="text-lg text-white/80 mb-10">
            Let's talk about how Rekko can automate your creator payments and compliance.
          </p>

          <a
            href="mailto:hello@rekko.in"
            className="ripple inline-flex items-center gap-3 bg-white text-saffron-dark font-semibold px-10 py-4 rounded-full text-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            <Mail size={20} />
            hello@rekko.in
          </a>

          <p className="text-sm text-white/60 mt-6">
            We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  )
}
