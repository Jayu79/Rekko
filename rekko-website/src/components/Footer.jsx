// Inline SVG icons for social (lucide-react removed brand icons)
function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-saffron rounded-lg flex items-center justify-center">
                <span className="text-white font-bold font-display text-lg">R</span>
              </div>
              <span className="font-display font-semibold text-xl">Rekko</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              India's Creator Payment Infrastructure. Compliant payouts, automated compliance, zero spreadsheets.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Product</h4>
            <ul className="space-y-2">
              {['TDS Engine', 'Bulk Payouts', 'Form 16A', 'Creator KYC', 'Dashboard'].map((item) => (
                <li key={item}>
                  <a href="#features" className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Compliance</h4>
            <ul className="space-y-2">
              {['194J / 194C / 194R', '26Q Filing', 'Form 16A', 'GST Invoicing', 'Aadhaar eKYC'].map((item) => (
                <li key={item}>
                  <a href="#how-it-works" className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white/80">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'Blog', href: '#', note: 'Coming Soon' },
                { label: 'Contact', href: '#cta' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-white/40 hover:text-white/70 transition-colors">
                    {item.label}
                    {item.note && <span className="ml-1 text-[10px] text-white/20">({item.note})</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; 2025 Rekko Technologies Pvt. Ltd. | rekko.in
          </p>

          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Terms of Service
            </a>
            <div className="flex items-center gap-3">
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors" aria-label="LinkedIn">
                <LinkedinIcon size={16} />
              </a>
              <a href="#" className="text-white/30 hover:text-white/60 transition-colors" aria-label="X / Twitter">
                <XIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
