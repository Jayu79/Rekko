import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, Megaphone, Users, Calculator, Wallet, ShieldCheck,
  ArrowRight, TrendingUp, CheckCircle2, AlertTriangle, Eye
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const tabs = [
  {
    id: 'overview',
    label: 'Dashboard',
    icon: LayoutDashboard,
    title: 'Your entire operation at a glance',
    description: 'GMV trends, active campaigns, creator stats, TDS deposits, and real-time alerts — all on one screen.',
    content: () => (
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'GMV This Month', value: '₹34.2L', trend: '+21%', color: 'text-indigo' },
            { label: 'Active Campaigns', value: '3', sub: '2 wrapping', color: 'text-foreground' },
            { label: 'Active Creators', value: '42', sub: '38 verified', color: 'text-foreground' },
            { label: 'TDS Deposited', value: '₹3.42L', sub: 'Q4 FY26', color: 'text-emerald' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-2.5">
              <p className="text-[9px] text-muted">{s.label}</p>
              <p className={`font-mono font-bold text-sm ${s.color}`}>{s.value}</p>
              <p className="text-[9px] text-emerald font-medium">{s.trend || s.sub}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-[2] bg-gray-50 rounded-lg p-3">
            <p className="text-[10px] font-semibold text-foreground mb-2">GMV Processed (6 mo)</p>
            <div className="flex items-end gap-1 h-16">
              {[30, 45, 38, 60, 70, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-indigo/20 rounded-t" style={{ height: `${h}%` }}>
                  <div className="w-full bg-indigo rounded-t" style={{ height: `${h * 0.7}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map(m => (
                <span key={m} className="text-[8px] text-muted flex-1 text-center">{m}</span>
              ))}
            </div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-lg p-3">
            <p className="text-[10px] font-semibold text-foreground mb-1">Alerts</p>
            <div className="space-y-1.5">
              {[
                { icon: AlertTriangle, text: '1 creator overdue', color: 'text-danger' },
                { icon: TrendingUp, text: 'GST threshold alert', color: 'text-saffron' },
                { icon: CheckCircle2, text: 'Form 16A Q3 sent', color: 'text-emerald' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <a.icon size={10} className={a.color} />
                  <span className="text-[9px] text-muted">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    icon: Megaphone,
    title: 'Manage every campaign from one place',
    description: 'Launch campaigns, set budgets, assign creators, and track deliverable progress in real time.',
    content: () => (
      <div className="space-y-2">
        {[
          { name: 'Summer Glow Collection', brand: 'Nykaa', creators: 12, delivered: '8/15', spent: '₹6.1L', budget: '₹8.5L', progress: 53, status: 'Active' },
          { name: 'Fitness March Challenge', brand: 'HealthifyMe', creators: 8, delivered: '10/10', spent: '₹4.2L', budget: '₹4.2L', progress: 100, status: 'Complete' },
          { name: 'Tech Unboxing Series', brand: 'boAt', creators: 15, delivered: '3/20', spent: '₹1.8L', budget: '₹12L', progress: 15, status: 'Active' },
        ].map((c, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-foreground">{c.name}</div>
              <div className="text-[10px] text-muted">{c.brand} · {c.creators} creators · {c.delivered} delivered</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-mono text-muted">{c.spent} / {c.budget}</span>
                <div className="w-20 h-1.5 rounded bg-gray-200 mt-1">
                  <div className={`h-full rounded ${c.progress === 100 ? 'bg-emerald' : 'bg-indigo'}`} style={{ width: `${c.progress}%` }} />
                </div>
              </div>
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-light text-emerald' : 'bg-indigo-light text-indigo'}`}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'creators',
    label: 'Creators',
    icon: Users,
    title: 'Your entire creator roster, verified',
    description: 'KYC status, GST tracking, cumulative payouts, and TDS deducted — for every creator across all campaigns.',
    content: () => (
      <div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {[
            { label: 'Total Creators', value: '10' },
            { label: 'KYC Verified', value: '8', color: 'text-emerald' },
            { label: 'GST Registered', value: '5' },
            { label: 'Needs Attention', value: '2', color: 'text-danger' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-2 text-center">
              <p className={`font-mono font-bold text-sm ${s.color || 'text-foreground'}`}>{s.value}</p>
              <p className="text-[8px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-1 px-2.5 py-1.5 text-[8px] font-semibold text-muted uppercase border-b border-gray-200">
            <span>Creator</span><span>Category</span><span>KYC</span><span>Paid (FY)</span><span>TDS</span>
          </div>
          {[
            { name: 'Priya Sharma', cat: 'Beauty', kyc: 'Verified', paid: '₹2.25L', tds: '₹22.5K' },
            { name: 'Meera Nair', cat: 'Fashion', kyc: 'Verified', paid: '₹3.80L', tds: '₹38K' },
            { name: 'Rohit Verma', cat: 'Tech', kyc: 'Pending', paid: '₹0', tds: '₹0' },
            { name: 'Tanvi Agarwal', cat: 'Fashion', kyc: 'Verified', paid: '₹7.50L', tds: '₹75K' },
          ].map((c, i) => (
            <div key={i} className={`grid grid-cols-5 gap-1 px-2.5 py-1.5 text-[10px] ${i % 2 ? 'bg-white' : ''}`}>
              <span className="font-medium text-foreground truncate">{c.name}</span>
              <span className="text-muted">{c.cat}</span>
              <span className={c.kyc === 'Verified' ? 'text-emerald font-medium' : 'text-saffron font-medium'}>{c.kyc}</span>
              <span className="font-mono text-foreground">{c.paid}</span>
              <span className="font-mono text-muted">{c.tds}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'payouts',
    label: 'Payouts',
    icon: Wallet,
    title: 'Pay creators, track every rupee',
    description: 'Bulk UPI payouts with auto TDS deduction. See settlement status, UTR numbers, and complete audit trail.',
    content: () => (
      <div>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {[
            { label: 'Settled', value: '₹3.01L', color: 'text-emerald' },
            { label: 'Processing', value: '₹54K', color: 'text-indigo' },
            { label: 'Pending', value: '₹85.5K', color: 'text-saffron' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-2 text-center">
              <p className={`font-mono font-bold text-sm ${s.color}`}>{s.value}</p>
              <p className="text-[8px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-1 px-2.5 py-1.5 text-[8px] font-semibold text-muted uppercase border-b border-gray-200">
            <span>Creator</span><span>Gross</span><span>TDS</span><span>Net</span><span>Status</span>
          </div>
          {[
            { name: 'Priya Sharma', gross: '₹75K', tds: '₹7.5K', net: '₹67.5K', status: 'Settled' },
            { name: 'Ananya Desai', gross: '₹85K', tds: '₹8.5K', net: '₹76.5K', status: 'Settled' },
            { name: 'Arjun Kapoor', gross: '₹60K', tds: '₹6K', net: '₹54K', status: 'Processing' },
            { name: 'Meera Nair', gross: '₹95K', tds: '₹9.5K', net: '₹85.5K', status: 'Pending' },
          ].map((p, i) => (
            <div key={i} className={`grid grid-cols-5 gap-1 px-2.5 py-1.5 text-[10px] ${i % 2 ? 'bg-white' : ''}`}>
              <span className="font-medium text-foreground truncate">{p.name}</span>
              <span className="font-mono">{p.gross}</span>
              <span className="font-mono text-muted">{p.tds}</span>
              <span className="font-mono font-medium">{p.net}</span>
              <span className={`font-medium ${p.status === 'Settled' ? 'text-emerald' : p.status === 'Processing' ? 'text-indigo' : 'text-saffron'}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'compliance',
    label: 'Compliance',
    icon: ShieldCheck,
    title: 'Compliance runs itself',
    description: '26Q filing data, Form 16A certificates, TDS challans — auto-generated, tracked, and ready for your CA.',
    content: () => (
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: '26Q Filed', value: '1', sub: 'Q3 — on time', color: 'text-emerald' },
            { label: 'Form 16A Issued', value: '4', sub: 'Q3 certificates' },
            { label: 'Challans Verified', value: '5/6', sub: '1 pending', color: 'text-indigo' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-2.5">
              <p className={`font-mono font-bold text-sm ${s.color || 'text-foreground'}`}>{s.value}</p>
              <p className="text-[9px] text-muted">{s.label}</p>
              <p className="text-[8px] text-muted">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="bg-emerald-light/50 rounded-lg p-2.5 flex items-center gap-2">
          <CheckCircle2 size={12} className="text-emerald shrink-0" />
          <span className="text-[10px] text-emerald font-medium">Q3 FY26 filed on 28 Jan 2026 — all 24 entries verified</span>
        </div>
        <div className="bg-gray-50 rounded-lg p-2.5">
          <p className="text-[10px] font-semibold text-foreground mb-1.5">TDS Challans</p>
          {['Oct ₹62K', 'Nov ₹58K', 'Dec ₹66K', 'Jan ₹48K', 'Feb ₹52K'].map((c, i) => (
            <div key={i} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
              <span className="text-[9px] font-mono text-muted">{c}</span>
              <span className="text-[8px] font-semibold text-emerald">Verified</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState('overview')
  const sectionRef = useScrollReveal()
  const active = tabs.find(t => t.id === activeTab)

  return (
    <section id="dashboard" ref={sectionRef} className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            See the dashboard{' '}
            <span className="text-indigo">in action.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            One platform for campaigns, creators, payments, and compliance. Here's what your command centre looks like.
          </p>
        </div>

        <div className="reveal bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden max-w-4xl mx-auto">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50/80">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-[10px] text-muted font-mono">dashboard.rekko.in</span>
            </div>
          </div>

          {/* Tab navigation */}
          <div className="flex border-b border-gray-100 px-1 bg-white overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'border-indigo text-indigo'
                      : 'border-transparent text-muted hover:text-foreground'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content area */}
          <div className="p-5 min-h-[280px]">
            {active && (
              <div key={active.id} className="animate-fadeIn">
                {active.content()}
              </div>
            )}
          </div>
        </div>

        {/* Description below */}
        {active && (
          <div className="text-center mt-8 max-w-2xl mx-auto">
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">{active.title}</h3>
            <p className="text-sm text-muted mb-4">{active.description}</p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 bg-indigo hover:bg-indigo/90 text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors shadow-lg shadow-indigo/25"
            >
              <Eye size={15} />
              Try the Live Dashboard
              <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
