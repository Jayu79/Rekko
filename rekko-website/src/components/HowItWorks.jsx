import { useScrollReveal } from '../hooks/useScrollReveal'
import { Upload, Settings, Banknote, ArrowDown, Check, Search, Scale, Calculator, FileText, Package } from 'lucide-react'

/* ── Step Data ── */
const creators = [
  { name: 'Priya Sharma', pan: 'ABCPS1234K', amount: '₹85,000', upi: 'priya@upi' },
  { name: 'Rohan Mehra', pan: 'DEFPM5678L', amount: '₹1,20,000', upi: 'rohan@ybl' },
  { name: 'Ananya Iyer', pan: 'GHIPI9012M', amount: '₹45,000', upi: 'ananya@paytm' },
]

const processSteps = [
  { icon: Search, label: 'PAN Verification', detail: '3 creators verified against NSDL' },
  { icon: Scale, label: 'TDS Classification', detail: '2x 194J (10%) · 1x 194C (1%)' },
  { icon: Calculator, label: 'TDS Calculated', detail: '₹8,500 + ₹12,000 + ₹450 = ₹20,950' },
  { icon: FileText, label: 'GST Invoices Generated', detail: '3 invoices ready for filing' },
  { icon: Package, label: '26Q Data Compiled', detail: 'Q4 FY26 · 3 deductees added' },
]

const payouts = [
  { initials: 'PS', name: 'Priya Sharma', detail: 'priya@upi · 194J', amount: '₹76,500', color: 'bg-violet-600' },
  { initials: 'RM', name: 'Rohan Mehra', detail: 'rohan@ybl · 194J', amount: '₹1,08,000', color: 'bg-blue-600' },
  { initials: 'AI', name: 'Ananya Iyer', detail: 'ananya@paytm · 194C', amount: '₹44,550', color: 'bg-emerald-600' },
]

/* ── Sub-components ── */
function StepNumber({ num }) {
  return (
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-saffron text-white font-display font-bold text-xl mb-5">
      {num}
    </div>
  )
}

function StepDetail({ children }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-muted">
      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-saffron/10 text-saffron flex items-center justify-center text-[10px] font-bold">
        ✓
      </span>
      {children}
    </li>
  )
}

function ConnectorArrow() {
  return (
    <div className="flex justify-center -my-6 relative z-10 reveal">
      <div className="w-11 h-11 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400">
        <ArrowDown size={20} />
      </div>
    </div>
  )
}

function DoneBadge() {
  return (
    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 whitespace-nowrap">
      Done
    </span>
  )
}

/* ── Visual Cards ── */
function UploadVisual() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 space-y-4">
      {/* Drag zone */}
      <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-7 text-center hover:border-saffron transition-colors">
        <div className="text-3xl mb-2">⇪</div>
        <p className="text-sm text-muted">
          Drag & drop your <span className="text-saffron font-medium">CSV or Excel</span> file here
        </p>
      </div>

      {/* File pills */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
          📄 creators_q4.csv
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
          📄 campaign_dec.xlsx
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
          ⚡ API Connected
        </span>
      </div>

      {/* Sample table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden text-xs">
        <table className="w-full">
          <thead>
            <tr className="bg-foreground text-white">
              <th className="px-3 py-2.5 text-left font-semibold uppercase tracking-wide text-[11px]">Creator</th>
              <th className="px-3 py-2.5 text-left font-semibold uppercase tracking-wide text-[11px]">PAN</th>
              <th className="px-3 py-2.5 text-left font-semibold uppercase tracking-wide text-[11px]">Amount</th>
              <th className="px-3 py-2.5 text-left font-semibold uppercase tracking-wide text-[11px]">UPI ID</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((c) => (
              <tr key={c.name} className="border-b border-gray-100 last:border-0">
                <td className="px-3 py-2.5 text-gray-600">{c.name}</td>
                <td className="px-3 py-2.5 text-gray-600 font-mono">{c.pan}</td>
                <td className="px-3 py-2.5 text-gray-600">{c.amount}</td>
                <td className="px-3 py-2.5 text-gray-600">{c.upi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProcessVisual() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 space-y-3">
      {processSteps.map((step) => {
        const Icon = step.icon
        return (
          <div
            key={step.label}
            className="flex items-center gap-3.5 bg-white border border-gray-200 rounded-xl px-4 py-3.5 hover:border-saffron transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-saffron/8 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-saffron" />
            </div>
            <div className="flex-1 min-w-0">
              <strong className="block text-sm text-foreground">{step.label}</strong>
              <span className="text-xs text-muted">{step.detail}</span>
            </div>
            <DoneBadge />
          </div>
        )
      })}
    </div>
  )
}

function PayoutVisual() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 space-y-3">
      {payouts.map((p) => (
        <div key={p.name} className="flex items-center gap-3.5 bg-white border border-gray-200 rounded-xl px-4 py-3.5">
          <div className={`w-9 h-9 rounded-full ${p.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {p.initials}
          </div>
          <div className="flex-1 min-w-0">
            <strong className="block text-sm text-foreground">{p.name}</strong>
            <span className="text-xs text-muted">{p.detail}</span>
          </div>
          <div className="text-right">
            <strong className="block text-sm text-foreground">{p.amount}</strong>
            <span className="text-[11px] text-emerald-600 font-semibold">✓ Paid via UPI</span>
          </div>
        </div>
      ))}

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-2.5 mt-1">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="font-display font-bold text-lg text-emerald-600">₹2,29,050</div>
          <div className="text-[11px] text-muted mt-1">Total Disbursed</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="font-display font-bold text-lg text-saffron">3 of 3</div>
          <div className="text-[11px] text-muted mt-1">Form 16A Issued</div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Component ── */
export default function HowItWorks() {
  const sectionRef = useScrollReveal()

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 md:py-28 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20 reveal">
          <span className="inline-block text-xs font-semibold uppercase tracking-[1.5px] text-saffron mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Three steps. Full compliance.{' '}
            <span className="text-saffron">Zero hassle.</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Upload your creator list, and Rekko handles TDS classification, GST invoices, UPI payouts, and Form 16A — automatically.
          </p>
        </div>

        {/* Step 1: Upload */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-24">
          <div>
            <StepNumber num={1} />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Upload your creator list
            </h3>
            <p className="text-muted text-base leading-relaxed mb-5 max-w-md">
              Add your creators and payment amounts — via CSV upload, direct API integration, or manually in the Rekko dashboard. That's all you need to do.
            </p>
            <ul className="space-y-2.5">
              <StepDetail>CSV / Excel upload with column auto-mapping</StepDetail>
              <StepDetail>REST API for programmatic integration</StepDetail>
              <StepDetail>Manual entry for one-off payments</StepDetail>
              <StepDetail>PAN auto-verified on upload</StepDetail>
            </ul>
          </div>
          <UploadVisual />
        </div>

        <ConnectorArrow />

        {/* Step 2: We Handle the Rest */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center my-20 md:my-24">
          <div className="md:order-2">
            <StepNumber num={2} />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              We handle the rest
            </h3>
            <p className="text-muted text-base leading-relaxed mb-5 max-w-md">
              Rekko's engine automatically classifies each payment under the correct TDS section, calculates the deduction, generates GST-compliant invoices, and prepares everything for 26Q filing.
            </p>
            <ul className="space-y-2.5">
              <StepDetail>Auto-classify: 194J (professional) / 194C (contractor) / 194R (gifts)</StepDetail>
              <StepDetail>Threshold tracking across the full financial year</StepDetail>
              <StepDetail>GST invoice generated per payout</StepDetail>
              <StepDetail>26Q quarterly data compiled and validated</StepDetail>
              <StepDetail>Challan 281 deposit handled on time</StepDetail>
            </ul>
          </div>
          <ProcessVisual />
        </div>

        <ConnectorArrow />

        {/* Step 3: Creators Get Paid */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mt-20 md:mt-24 mb-20 md:mb-24">
          <div>
            <StepNumber num={3} />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Creators get paid
            </h3>
            <p className="text-muted text-base leading-relaxed mb-5 max-w-md">
              Net-of-TDS amounts are disbursed instantly via UPI. Every creator automatically receives their Form 16A certificate — no manual PDFs, no chasing.
            </p>
            <ul className="space-y-2.5">
              <StepDetail>Instant UPI payouts to any VPA or bank account</StepDetail>
              <StepDetail>Form 16A auto-generated via TRACES</StepDetail>
              <StepDetail>Creator gets payment notification + TDS breakdown</StepDetail>
              <StepDetail>Full audit trail for every transaction</StepDetail>
            </ul>
          </div>
          <PayoutVisual />
        </div>

        {/* Summary Bar */}
        <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-10 text-center">
          <div>
            <div className="text-3xl mb-3">⏱</div>
            <h4 className="font-display font-bold text-lg text-foreground mb-1">Under 5 minutes</h4>
            <p className="text-sm text-muted">From CSV upload to creators getting paid. No spreadsheets, no CA calls.</p>
          </div>
          <div>
            <div className="text-3xl mb-3">⚖️</div>
            <h4 className="font-display font-bold text-lg text-foreground mb-1">100% compliant</h4>
            <p className="text-sm text-muted">Every payout is TDS-deducted, GST-invoiced, and Form 16A-certified.</p>
          </div>
          <div>
            <div className="text-3xl mb-3">🔒</div>
            <h4 className="font-display font-bold text-lg text-foreground mb-1">Full audit trail</h4>
            <p className="text-sm text-muted">PAN verification, challan deposits, 26Q data — all documented and downloadable.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
