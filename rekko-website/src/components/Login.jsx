import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react'

const TEMP_CREDENTIALS = {
  email: 'demo@rekko.in',
  password: 'rekko2026',
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (email === TEMP_CREDENTIALS.email && password === TEMP_CREDENTIALS.password) {
        sessionStorage.setItem('rekko_auth', 'true')
        navigate('/dashboard')
      } else {
        setError('Invalid email or password')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient -z-10 opacity-50" />

      {/* Back to home */}
      <div className="p-6">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate('/') }}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Back to home
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-saffron rounded-xl flex items-center justify-center shadow-lg shadow-saffron/25">
              <span className="text-white font-bold font-display text-xl">R</span>
            </div>
            <span className="font-display font-semibold text-2xl text-foreground">Rekko</span>
          </div>

          {/* Login card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 p-8">
            <div className="text-center mb-6">
              <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
                Welcome back
              </h1>
              <p className="text-sm text-muted">
                Sign in to your campaign dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron/30 focus:border-saffron transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-danger-light text-danger text-sm font-medium px-4 py-2.5 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-saffron hover:bg-saffron-dark disabled:opacity-60 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-saffron/25"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    Sign In
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
