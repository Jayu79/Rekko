import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Product', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#cta' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-saffron rounded-lg flex items-center justify-center">
            <span className="text-white font-bold font-display text-lg">R</span>
          </div>
          <span className="font-display font-semibold text-xl text-foreground">
            Rekko
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cta"
            className="bg-saffron hover:bg-saffron-dark text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            Request Access
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              className="bg-saffron hover:bg-saffron-dark text-white text-sm font-medium px-5 py-2 rounded-full text-center transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Request Access
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
