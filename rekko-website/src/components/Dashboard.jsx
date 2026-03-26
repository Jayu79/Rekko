import { useState } from "react";
import {
  LayoutDashboard, Megaphone, Users, Calculator, Wallet, ShieldCheck,
  ChevronRight, Search, Bell, Plus, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle2, AlertTriangle, Download, Filter,
  TrendingUp, IndianRupee, UserCheck, FileCheck,
  CalendarDays, Building2, AlertCircle, Zap,
  Receipt, Upload, FileText, Send, RefreshCw, Video, Eye,
  MoreHorizontal, LogOut
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart as RechartsPie, Pie, Cell
} from "recharts";

// ─── Rekko Design Tokens — Indigo blue system, amber logo only ───
const R = {
  // Logo accent (amber — matches rekko.in logo only)
  amber:        "#F59E0B",
  amberDark:    "#D97706",
  amberLight:   "#FEF3C7",
  amberXLight:  "#FFFBEB",

  // Brand (indigo — primary interactive color throughout UI)
  indigo:       "#4F46E5",   // primary brand
  indigoDark:   "#3730A3",   // hover / pressed
  indigoLight:  "#EEF2FF",   // badge bg, card tint
  indigoXLight: "#F5F3FF",   // very subtle tint

  // Status
  emerald:      "#059669",   // success / paid
  emeraldLight: "#D1FAE5",
  rose:         "#F43F5E",   // danger / overdue
  roseLight:    "#FFF1F2",
  sky:          "#0EA5E9",   // info / processing
  skyLight:     "#F0F9FF",

  // Neutrals (cool gray — matches the blue design system)
  bg:           "#F9FAFB",   // page background
  white:        "#FFFFFF",
  stone50:      "#F9FAFB",
  stone100:     "#F3F4F6",
  stone150:     "#EAECF0",
  stone200:     "#E5E7EB",
  stone300:     "#D1D5DB",
  stone400:     "#9CA3AF",
  stone500:     "#6B7280",
  stone600:     "#4B5563",
  stone700:     "#374151",
  stone800:     "#1F2937",
  stone900:     "#111827",

  // Typography
  fontHeading:  "'Fraunces', Georgia, serif",
  fontBody:     "'DM Sans', system-ui, sans-serif",
};

// ─── Mock Data ────────────────────────────────────────────────────
const gmvData = [
  { month: "Oct", value: 12 }, { month: "Nov", value: 18 },
  { month: "Dec", value: 15 }, { month: "Jan", value: 24 },
  { month: "Feb", value: 28 }, { month: "Mar", value: 34 },
];

const tdsBreakdown = [
  { name: "194J", value: 65, color: R.amber },
  { name: "194C", value: 20, color: R.indigo },
  { name: "194R", value: 15, color: R.emerald },
];

const campaigns = [
  { id: 1, name: "Summer Glow Collection", brand: "Nykaa", budget: 850000, spent: 612000, status: "active", creators: 12, completedDeliverables: 8, totalDeliverables: 15, startDate: "01 Mar", endDate: "15 Apr", platform: "Instagram" },
  { id: 2, name: "Fitness March Challenge", brand: "HealthifyMe", budget: 420000, spent: 420000, status: "completed", creators: 8, completedDeliverables: 10, totalDeliverables: 10, startDate: "15 Feb", endDate: "15 Mar", platform: "YouTube" },
  { id: 3, name: "Tech Unboxing Series", brand: "boAt", budget: 1200000, spent: 180000, status: "active", creators: 15, completedDeliverables: 3, totalDeliverables: 20, startDate: "10 Mar", endDate: "01 May", platform: "YouTube" },
  { id: 4, name: "Street Food Stories", brand: "Swiggy", budget: 650000, spent: 0, status: "draft", creators: 10, completedDeliverables: 0, totalDeliverables: 12, startDate: "01 Apr", endDate: "15 May", platform: "Instagram" },
  { id: 5, name: "Monsoon Fashion Lookbook", brand: "Myntra", budget: 975000, spent: 340000, status: "active", creators: 18, completedDeliverables: 6, totalDeliverables: 22, startDate: "05 Mar", endDate: "30 Apr", platform: "Instagram" },
];

const campaignCreators = [
  { id: 1, name: "Priya Sharma",  handle: "@priyasharma",   followers: "1.2M", deliverable: "Reel",         status: "approved",     dueDate: "20 Mar", amount: 75000,  tdsSection: "194J", tdsAmount: 7500 },
  { id: 2, name: "Arjun Kapoor",  handle: "@arjunlifestyle", followers: "890K", deliverable: "Reel + Story", status: "submitted",    dueDate: "22 Mar", amount: 60000,  tdsSection: "194J", tdsAmount: 6000 },
  { id: 3, name: "Meera Nair",    handle: "@meeraaesthetic", followers: "2.1M", deliverable: "Reel",         status: "in_production",dueDate: "25 Mar", amount: 95000,  tdsSection: "194J", tdsAmount: 9500 },
  { id: 4, name: "Rohit Verma",   handle: "@rohitverma_",   followers: "650K", deliverable: "Carousel + Reel",status:"overdue",     dueDate: "18 Mar", amount: 45000,  tdsSection: "194J", tdsAmount: 4500 },
  { id: 5, name: "Ananya Desai",  handle: "@ananyavibes",   followers: "1.8M", deliverable: "Reel",         status: "approved",     dueDate: "15 Mar", amount: 85000,  tdsSection: "194J", tdsAmount: 8500 },
  { id: 6, name: "Karthik Iyer",  handle: "@karthikreviews", followers: "430K", deliverable: "Reel + Story", status: "brief_sent",   dueDate: "28 Mar", amount: 35000,  tdsSection: "194J", tdsAmount: 3500 },
  { id: 7, name: "Sneha Patil",   handle: "@snehapatil",    followers: "1.5M", deliverable: "Reel",         status: "revision",     dueDate: "24 Mar", amount: 70000,  tdsSection: "194J", tdsAmount: 7000 },
  { id: 8, name: "Vikram Reddy",  handle: "@vikramcreates", followers: "780K", deliverable: "Reel",         status: "approved",     dueDate: "12 Mar", amount: 55000,  tdsSection: "194J", tdsAmount: 5500 },
];

const creators = [
  { id: 1,  name: "Priya Sharma",  handle: "@priyasharma",    platform: "Instagram", followers: "1.2M", category: "Beauty",    kyc: "verified",    gst: "registered",      cumulativePaid: 225000, tdsDeducted: 22500, campaigns: 4 },
  { id: 2,  name: "Arjun Kapoor",  handle: "@arjunlifestyle",  platform: "Instagram", followers: "890K", category: "Lifestyle", kyc: "verified",    gst: "not_required",    cumulativePaid: 148000, tdsDeducted: 14800, campaigns: 3 },
  { id: 3,  name: "Meera Nair",    handle: "@meeraaesthetic",  platform: "Instagram", followers: "2.1M", category: "Fashion",   kyc: "verified",    gst: "registered",      cumulativePaid: 380000, tdsDeducted: 38000, campaigns: 6 },
  { id: 4,  name: "Rohit Verma",   handle: "@rohitverma_",    platform: "YouTube",   followers: "650K", category: "Tech",      kyc: "pending",     gst: "not_registered",  cumulativePaid: 0,      tdsDeducted: 0,     campaigns: 0 },
  { id: 5,  name: "Ananya Desai",  handle: "@ananyavibes",    platform: "Instagram", followers: "1.8M", category: "Lifestyle", kyc: "verified",    gst: "registered",      cumulativePaid: 520000, tdsDeducted: 52000, campaigns: 8 },
  { id: 6,  name: "Karthik Iyer",  handle: "@karthikreviews",  platform: "YouTube",   followers: "430K", category: "Tech",      kyc: "verified",    gst: "not_required",    cumulativePaid: 92000,  tdsDeducted: 9200,  campaigns: 2 },
  { id: 7,  name: "Sneha Patil",   handle: "@snehapatil",     platform: "Instagram", followers: "1.5M", category: "Food",      kyc: "verified",    gst: "threshold_alert", cumulativePaid: 185000, tdsDeducted: 18500, campaigns: 3 },
  { id: 8,  name: "Vikram Reddy",  handle: "@vikramcreates",  platform: "YouTube",   followers: "780K", category: "Vlog",      kyc: "in_progress", gst: "not_required",    cumulativePaid: 28000,  tdsDeducted: 0,     campaigns: 1 },
  { id: 9,  name: "Tanvi Agarwal", handle: "@tanvistyle",     platform: "Instagram", followers: "3.2M", category: "Fashion",   kyc: "verified",    gst: "registered",      cumulativePaid: 750000, tdsDeducted: 75000, campaigns: 10 },
  { id: 10, name: "Aditya Menon",  handle: "@adityamenon",    platform: "YouTube",   followers: "1.1M", category: "Finance",   kyc: "verified",    gst: "registered",      cumulativePaid: 460000, tdsDeducted: 46000, campaigns: 7 },
];

const tdsRecords = [
  { id: 1, creator: "Priya Sharma",  pan: "ABCPS1234K", section: "194J", grossAmount: 75000,  tdsAmount: 7500,  netAmount: 67500,  cumulativeFY: 225000, threshold: "crossed", status: "deposited" },
  { id: 2, creator: "Arjun Kapoor",  pan: "BCDPK5678L", section: "194J", grossAmount: 60000,  tdsAmount: 6000,  netAmount: 54000,  cumulativeFY: 148000, threshold: "crossed", status: "pending"   },
  { id: 3, creator: "Meera Nair",    pan: "CDEMN9012M", section: "194J", grossAmount: 95000,  tdsAmount: 9500,  netAmount: 85500,  cumulativeFY: 380000, threshold: "crossed", status: "deposited" },
  { id: 4, creator: "Karthik Iyer",  pan: "FGHKI1234Q", section: "194J", grossAmount: 35000,  tdsAmount: 3500,  netAmount: 31500,  cumulativeFY: 92000,  threshold: "crossed", status: "deposited" },
  { id: 5, creator: "Sneha Patil",   pan: "GHISP5678R", section: "194R", grossAmount: 25000,  tdsAmount: 2500,  netAmount: 22500,  cumulativeFY: 185000, threshold: "crossed", status: "pending"   },
  { id: 6, creator: "Ananya Desai",  pan: "EFGAD7890P", section: "194J", grossAmount: 85000,  tdsAmount: 8500,  netAmount: 76500,  cumulativeFY: 520000, threshold: "crossed", status: "deposited" },
  { id: 7, creator: "Vikram Reddy",  pan: "HIJVR9012S", section: "194J", grossAmount: 28000,  tdsAmount: 0,     netAmount: 28000,  cumulativeFY: 28000,  threshold: "below",   status: "n/a"       },
  { id: 8, creator: "Tanvi Agarwal", pan: "IJKTA3456T", section: "194J", grossAmount: 120000, tdsAmount: 12000, netAmount: 108000, cumulativeFY: 750000, threshold: "crossed", status: "deposited" },
];

const payoutRecords = [
  { id: "PAY-001", creator: "Priya Sharma",  campaign: "Summer Glow",        grossAmount: 75000,  tds: 7500,  netAmount: 67500,  status: "settled",    date: "18 Mar 2026", utr: "UTR928374650" },
  { id: "PAY-002", creator: "Ananya Desai",  campaign: "Summer Glow",        grossAmount: 85000,  tds: 8500,  netAmount: 76500,  status: "settled",    date: "15 Mar 2026", utr: "UTR928374651" },
  { id: "PAY-003", creator: "Vikram Reddy",  campaign: "Tech Unboxing",      grossAmount: 55000,  tds: 5500,  netAmount: 49500,  status: "settled",    date: "12 Mar 2026", utr: "UTR928374652" },
  { id: "PAY-004", creator: "Arjun Kapoor",  campaign: "Summer Glow",        grossAmount: 60000,  tds: 6000,  netAmount: 54000,  status: "processing", date: "21 Mar 2026", utr: "—"            },
  { id: "PAY-005", creator: "Meera Nair",    campaign: "Summer Glow",        grossAmount: 95000,  tds: 9500,  netAmount: 85500,  status: "pending",    date: "—",           utr: "—"            },
  { id: "PAY-006", creator: "Tanvi Agarwal", campaign: "Monsoon Fashion",    grossAmount: 120000, tds: 12000, netAmount: 108000, status: "settled",    date: "10 Mar 2026", utr: "UTR928374653" },
];

const complianceData = {
  quarters: [
    { quarter: "Q3 FY26 (Oct–Dec)", status: "filed",       dueDate: "31 Jan 2026", filedDate: "28 Jan 2026", entries: 24, tdsTotal: 186000 },
    { quarter: "Q4 FY26 (Jan–Mar)", status: "in_progress", dueDate: "31 May 2026", filedDate: null,          entries: 18, tdsTotal: 142000 },
  ],
  challans: [
    { id: "CHL-001", period: "Oct 2025", amount: 62000, bsrCode: "0510123", depositDate: "07 Nov 2025", status: "verified" },
    { id: "CHL-002", period: "Nov 2025", amount: 58000, bsrCode: "0510124", depositDate: "07 Dec 2025", status: "verified" },
    { id: "CHL-003", period: "Dec 2025", amount: 66000, bsrCode: "0510125", depositDate: "07 Jan 2026", status: "verified" },
    { id: "CHL-004", period: "Jan 2026", amount: 48000, bsrCode: "0510126", depositDate: "07 Feb 2026", status: "verified" },
    { id: "CHL-005", period: "Feb 2026", amount: 52000, bsrCode: "0510127", depositDate: "07 Mar 2026", status: "verified" },
    { id: "CHL-006", period: "Mar 2026", amount: 42000, bsrCode: "—",       depositDate: "—",           status: "pending"  },
  ],
  form16a: [
    { creator: "Priya Sharma",  quarter: "Q3 FY26", tdsAmount: 22500, status: "issued",  issuedDate: "05 Feb 2026" },
    { creator: "Meera Nair",    quarter: "Q3 FY26", tdsAmount: 38000, status: "issued",  issuedDate: "05 Feb 2026" },
    { creator: "Ananya Desai",  quarter: "Q3 FY26", tdsAmount: 52000, status: "issued",  issuedDate: "05 Feb 2026" },
    { creator: "Tanvi Agarwal", quarter: "Q3 FY26", tdsAmount: 75000, status: "issued",  issuedDate: "05 Feb 2026" },
    { creator: "Priya Sharma",  quarter: "Q4 FY26", tdsAmount: 7500,  status: "pending", issuedDate: null },
    { creator: "Arjun Kapoor",  quarter: "Q4 FY26", tdsAmount: 6000,  status: "pending", issuedDate: null },
  ],
};

// ─── Status configs ───────────────────────────────────────────────
const deliverableStatus = {
  brief_sent:    { label: "Brief Sent",      color: R.sky,     bg: R.skyLight,    icon: Send,         step: 1 },
  confirmed:     { label: "Confirmed",       color: R.indigo,    bg: R.indigoLight,  icon: CheckCircle2, step: 2 },
  in_production: { label: "In Production",   color: R.indigo,    bg: R.indigoXLight, icon: Video,        step: 3 },
  submitted:     { label: "Submitted",       color: R.sky,       bg: R.skyLight,     icon: Upload,       step: 4 },
  revision:      { label: "Revision Needed", color: R.indigoDark,bg: R.indigoLight,  icon: RefreshCw,    step: 4 },
  approved:      { label: "Approved",        color: R.emerald, bg: R.emeraldLight,icon: CheckCircle2, step: 5 },
  overdue:       { label: "Overdue",         color: R.rose,    bg: R.roseLight,   icon: AlertTriangle,step: 0 },
};

// ─── Helpers ──────────────────────────────────────────────────────
const fmt = (n) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)     return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n.toLocaleString("en-IN")}`;
};

const Avatar = ({ name, size = 34 }) => {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const hue = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: `hsl(${hue}, 45%, 88%)`, color: `hsl(${hue}, 45%, 35%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, fontFamily: R.fontBody,
    }}>{initials}</div>
  );
};

// Rekko pill badge
const Pill = ({ children, variant = "stone", dot = false }) => {
  const map = {
    amber:   { bg: R.amberLight,   text: R.amberDark   },   // keep for TDS section labels
    emerald: { bg: R.emeraldLight, text: "#047857"      },
    rose:    { bg: R.roseLight,    text: "#BE123C"      },
    sky:     { bg: R.skyLight,     text: "#0369A1"      },
    indigo:  { bg: R.indigoLight,  text: R.indigo       },
    stone:   { bg: R.stone100,     text: R.stone600     },
  };
  const s = map[variant] || map.stone;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 100, fontSize: 12, fontWeight: 600,
      backgroundColor: s.bg, color: s.text, whiteSpace: "nowrap",
      fontFamily: R.fontBody,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: s.text }} />}
      {children}
    </span>
  );
};

// Stat card — matches site's clean card aesthetic
const StatCard = ({ icon: Icon, label, value, sub, trend, trendUp, accent }) => (
  <div style={{
    flex: 1, minWidth: 180, backgroundColor: R.white, borderRadius: 14,
    border: `1px solid ${R.stone200}`, padding: "20px 22px",
    display: "flex", flexDirection: "column", gap: 14,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, backgroundColor: R.indigoLight,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={18} color={R.indigo} />
      </div>
      {trend && (
        <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: trendUp ? R.emerald : R.rose }}>
          {trendUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{trend}
        </span>
      )}
    </div>
    <div>
      <div style={{ fontSize: 24, fontWeight: 600, color: accent || R.stone900, fontFamily: R.fontHeading, letterSpacing: -0.5 }}>{value}</div>
      <div style={{ fontSize: 13, color: R.stone500, marginTop: 2, fontFamily: R.fontBody }}>{label}</div>
    </div>
    {sub && <div style={{ fontSize: 12, color: R.stone400, fontFamily: R.fontBody }}>{sub}</div>}
  </div>
);

const TH = ({ children }) => (
  <th style={{
    padding: "10px 16px", fontSize: 11, fontWeight: 600, color: R.stone500,
    textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "left",
    borderBottom: `1px solid ${R.stone150}`, backgroundColor: R.stone50,
    fontFamily: R.fontBody,
  }}>{children}</th>
);

const TD = ({ children, bold, mono, color }) => (
  <td style={{
    padding: "13px 16px", fontSize: 13, borderBottom: `1px solid ${R.stone100}`,
    color: color || (bold ? R.stone900 : R.stone600),
    fontWeight: bold ? 600 : 400,
    fontFamily: mono ? "'SF Mono', 'Cascadia Mono', monospace" : R.fontBody,
  }}>{children}</td>
);

const SectionTitle = ({ title, sub }) => (
  <div style={{ marginBottom: 22 }}>
    <h2 style={{ fontSize: 22, fontWeight: 600, color: R.stone900, margin: 0, fontFamily: R.fontHeading, letterSpacing: -0.3 }}>{title}</h2>
    {sub && <p style={{ fontSize: 13, color: R.stone500, margin: "4px 0 0", fontFamily: R.fontBody }}>{sub}</p>}
  </div>
);

const ActionBtn = ({ children, onClick, secondary }) => (
  <button onClick={onClick} style={{
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: secondary ? "7px 16px" : "8px 18px",
    backgroundColor: secondary ? R.white : R.indigo,
    color: secondary ? R.stone700 : R.white,
    border: `1px solid ${secondary ? R.stone200 : R.indigo}`,
    borderRadius: 100, fontSize: 13, fontWeight: 600,
    cursor: "pointer", fontFamily: R.fontBody,
    transition: "all 0.15s",
  }}>{children}</button>
);

const Tab = ({ active, children, onClick }) => (
  <button onClick={onClick} style={{
    padding: "8px 16px", fontSize: 13, fontWeight: active ? 600 : 400,
    color: active ? R.indigo : R.stone500,
    backgroundColor: "transparent", border: "none",
    borderBottom: `2px solid ${active ? R.indigo : "transparent"}`,
    cursor: "pointer", fontFamily: R.fontBody, transition: "all 0.15s",
  }}>{children}</button>
);

// Deal pipeline tracker
const Pipeline = ({ status }) => {
  const steps = ["Brief", "Confirmed", "In Prod", "Review", "Approved", "Paid"];
  const activeStep = deliverableStatus[status]?.step || 1;
  const isOverdue = status === "overdue";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, flex: 1, minWidth: 160 }}>
      {steps.map((_, i) => {
        const done = i + 1 < activeStep;
        const active = i + 1 === activeStep;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
              backgroundColor: isOverdue ? R.rose : done ? R.emerald : active ? R.indigo : R.stone300,
              boxShadow: active ? `0 0 0 3px ${isOverdue ? R.roseLight : R.indigoLight}` : "none",
            }} />
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, backgroundColor: done ? R.emerald : R.stone150 }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Pages ────────────────────────────────────────────────────────

const OverviewPage = ({ setActivePage, setSelectedCampaign }) => (
  <div>
    <SectionTitle title="Dashboard" sub="Your creator payment operations at a glance" />
    <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
      <StatCard icon={IndianRupee} label="GMV This Month" value="₹34.2L" trend="+21%" trendUp accent={R.indigo} />
      <StatCard icon={Megaphone}   label="Active Campaigns" value="3" sub="2 wrapping this week" />
      <StatCard icon={Users}       label="Active Creators" value="42" sub="38 KYC verified" />
      <StatCard icon={ShieldCheck} label="TDS Deposited" value="₹3.42L" sub="Q4 FY26 to date" accent={R.emerald} />
    </div>

    <div style={{ display: "flex", gap: 18, marginBottom: 24, flexWrap: "wrap" }}>
      {/* GMV chart */}
      <div style={{ flex: 2, minWidth: 360, backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, padding: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: R.stone900, margin: 0, fontFamily: R.fontHeading }}>GMV Processed</h3>
            <p style={{ fontSize: 12, color: R.stone400, margin: "2px 0 0", fontFamily: R.fontBody }}>Last 6 months · ₹ Lakhs</p>
          </div>
          <Pill variant="emerald" dot>Trending up</Pill>
        </div>
        <ResponsiveContainer width="100%" height={210}>
          <AreaChart data={gmvData}>
            <defs>
              <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={R.indigo} stopOpacity={0.15} />
                <stop offset="100%" stopColor={R.indigo} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={R.stone100} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: R.stone400, fontFamily: R.fontBody }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: R.stone400, fontFamily: R.fontBody }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${R.stone200}`, fontSize: 13, fontFamily: R.fontBody }} />
            <Area type="monotone" dataKey="value" stroke={R.indigo} strokeWidth={2.5} fill="url(#indigoGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* TDS pie */}
      <div style={{ flex: 1, minWidth: 240, backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, padding: 22 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: R.stone900, margin: "0 0 2px", fontFamily: R.fontHeading }}>TDS by Section</h3>
        <p style={{ fontSize: 12, color: R.stone400, margin: "0 0 8px", fontFamily: R.fontBody }}>Current FY breakdown</p>
        <ResponsiveContainer width="100%" height={160}>
          <RechartsPie>
            <Pie data={tdsBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={44} outerRadius={68} paddingAngle={3}>
              {tdsBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${R.stone200}`, fontSize: 13, fontFamily: R.fontBody }} />
          </RechartsPie>
        </ResponsiveContainer>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 6 }}>
          {tdsBreakdown.map(t => (
            <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: R.stone600, fontFamily: R.fontBody }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: t.color }} />
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Active campaigns */}
    <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, padding: 22, marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: R.stone900, margin: 0, fontFamily: R.fontHeading }}>Active Campaigns</h3>
        <button onClick={() => setActivePage("campaigns")} style={{
          display: "flex", alignItems: "center", gap: 3, fontSize: 13, color: R.indigo,
          fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: R.fontBody,
        }}>View all <ChevronRight size={14} /></button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {campaigns.filter(c => c.status === "active").map(c => (
          <div key={c.id}
            onClick={() => { setSelectedCampaign(c); setActivePage("campaign_detail"); }}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 16px", borderRadius: 10, border: `1px solid ${R.stone150}`,
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = R.indigo; e.currentTarget.style.backgroundColor = R.indigoXLight; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = R.stone150; e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: R.indigoLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Megaphone size={17} color={R.indigo} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: R.stone900, fontFamily: R.fontBody }}>{c.name}</div>
                <div style={{ fontSize: 12, color: R.stone400, fontFamily: R.fontBody }}>{c.brand} · {c.creators} creators</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: R.stone800, fontFamily: R.fontBody }}>{fmt(c.spent)} / {fmt(c.budget)}</div>
                <div style={{ width: 100, height: 4, borderRadius: 2, backgroundColor: R.stone100, marginTop: 5 }}>
                  <div style={{ width: `${(c.spent / c.budget) * 100}%`, height: "100%", borderRadius: 2, backgroundColor: R.indigo }} />
                </div>
              </div>
              <div style={{ textAlign: "right", minWidth: 60 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: R.stone900, fontFamily: R.fontHeading }}>{c.completedDeliverables}/{c.totalDeliverables}</div>
                <div style={{ fontSize: 11, color: R.stone400, fontFamily: R.fontBody }}>delivered</div>
              </div>
              <ChevronRight size={15} color={R.stone400} />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Alerts + Quick Actions */}
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 280, backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, padding: 22 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: R.stone900, margin: "0 0 14px", fontFamily: R.fontHeading }}>Alerts</h3>
        {[
          { v: "rose",    icon: AlertTriangle, title: "Rohit Verma is overdue",        desc: "Summer Glow · 8 days past due" },
          { v: "amber",   icon: AlertCircle,   title: "GST threshold alert",           desc: "Sneha Patil approaching ₹20L limit" },
          { v: "sky",     icon: Clock,         title: "26Q Q4 due in 66 days",         desc: "Deadline: 31 May 2026" },
          { v: "emerald", icon: CheckCircle2,  title: "Form 16A Q3 issued",            desc: "4 certificates sent to creators" },
        ].map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 14px",
            borderRadius: 8, marginBottom: 8,
            backgroundColor: a.v === "rose" ? R.roseLight : a.v === "amber" ? R.indigoXLight : a.v === "sky" ? R.skyLight : R.emeraldLight,
          }}>
            <a.icon size={15} color={a.v === "rose" ? R.rose : a.v === "amber" ? R.indigo : a.v === "sky" ? R.sky : R.emerald} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: R.stone800, fontFamily: R.fontBody }}>{a.title}</div>
              <div style={{ fontSize: 12, color: R.stone500, fontFamily: R.fontBody }}>{a.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, minWidth: 280, backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, padding: 22 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: R.stone900, margin: "0 0 14px", fontFamily: R.fontHeading }}>Quick Actions</h3>
        {[
          { icon: Upload,    label: "New Campaign Payout",  desc: "Upload creator list and pay" },
          { icon: Users,     label: "Invite Creator",       desc: "Send KYC onboarding link" },
          { icon: Download,  label: "Download 26Q Data",    desc: "Q4 FY26 compilation ready" },
          { icon: FileText,  label: "Generate Form 16A",    desc: "Issue TDS certificates" },
        ].map((a, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
            borderRadius: 8, border: `1px solid ${R.stone150}`, marginBottom: 8, cursor: "pointer",
            transition: "all 0.15s",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = R.indigo; e.currentTarget.style.backgroundColor = R.indigoXLight; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = R.stone150; e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: R.indigoLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <a.icon size={15} color={R.indigo} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: R.stone900, fontFamily: R.fontBody }}>{a.label}</div>
              <div style={{ fontSize: 12, color: R.stone400, fontFamily: R.fontBody }}>{a.desc}</div>
            </div>
            <ChevronRight size={14} color={R.stone300} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CampaignsPage = ({ setActivePage, setSelectedCampaign }) => {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? campaigns : campaigns.filter(c => c.status === filter);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <SectionTitle title="Campaigns" sub="Manage all your creator campaigns" />
        <ActionBtn><Plus size={15} /> New Campaign</ActionBtn>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {["all", "active", "completed", "draft"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 600,
            border: `1px solid ${filter === f ? R.indigo : R.stone200}`,
            backgroundColor: filter === f ? R.indigoLight : R.white,
            color: filter === f ? R.indigoDark : R.stone600,
            cursor: "pointer", fontFamily: R.fontBody, textTransform: "capitalize",
          }}>{f === "all" ? "All" : f}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {list.map(c => {
          const sv = c.status === "active" ? "emerald" : c.status === "completed" ? "amber" : "stone";
          return (
            <div key={c.id}
              onClick={() => { setSelectedCampaign(c); setActivePage("campaign_detail"); }}
              style={{
                backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`,
                padding: "20px 22px", cursor: "pointer", transition: "all 0.15s",
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = R.indigo; e.currentTarget.style.boxShadow = `0 0 0 1px ${R.indigo}`; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = R.stone200; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: R.indigoLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Megaphone size={20} color={R.indigo} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: R.stone900, fontFamily: R.fontHeading }}>{c.name}</div>
                    <div style={{ display: "flex", gap: 12, marginTop: 4, fontSize: 13, color: R.stone500, fontFamily: R.fontBody }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Building2 size={13} /> {c.brand}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={13} /> {c.creators} creators</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><CalendarDays size={13} /> {c.startDate} → {c.endDate}</span>
                    </div>
                  </div>
                </div>
                <Pill variant={sv} dot>{c.status}</Pill>
              </div>
              <div style={{ display: "flex", gap: 28, marginTop: 16, alignItems: "center" }}>
                {[["Budget", fmt(c.budget)], ["Spent", fmt(c.spent)], ["Deliverables", `${c.completedDeliverables}/${c.totalDeliverables}`]].map(([l, v]) => (
                  <div key={l}>
                    <div style={{ fontSize: 11, color: R.stone400, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: R.fontBody }}>{l}</div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: R.stone900, fontFamily: R.fontHeading }}>{v}</div>
                  </div>
                ))}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: R.stone400, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6, fontFamily: R.fontBody }}>Progress</div>
                  <div style={{ maxWidth: 200, height: 5, borderRadius: 3, backgroundColor: R.stone100 }}>
                    <div style={{
                      width: `${(c.completedDeliverables / c.totalDeliverables) * 100}%`,
                      height: "100%", borderRadius: 3,
                      backgroundColor: c.status === "completed" ? R.emerald : R.indigo,
                    }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CampaignDetailPage = ({ campaign, setActivePage }) => {
  const [tab, setTab] = useState("deliverables");
  if (!campaign) return null;
  return (
    <div>
      <button onClick={() => setActivePage("campaigns")} style={{
        display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: R.stone500,
        background: "none", border: "none", cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: R.fontBody,
      }}>← Back to Campaigns</button>

      <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, padding: 26, marginBottom: 22 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ fontSize: 22, fontWeight: 600, color: R.stone900, margin: 0, fontFamily: R.fontHeading }}>{campaign.name}</h2>
              <Pill variant="emerald" dot>Active</Pill>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 13, color: R.stone500, fontFamily: R.fontBody }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Building2 size={14} /> {campaign.brand}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><CalendarDays size={14} /> {campaign.startDate} → {campaign.endDate}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={14} /> {campaign.creators} creators</span>
            </div>
          </div>
          <ActionBtn><Wallet size={15} /> Process Payout</ActionBtn>
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 22, flexWrap: "wrap" }}>
          {[["Budget", fmt(campaign.budget)], ["Spent", fmt(campaign.spent)], ["TDS Deducted", fmt(campaign.spent * 0.1)], ["Deliverables", `${campaign.completedDeliverables}/${campaign.totalDeliverables}`]].map(([l, v]) => (
            <div key={l} style={{ padding: "12px 20px", backgroundColor: R.stone50, borderRadius: 10, border: `1px solid ${R.stone150}` }}>
              <div style={{ fontSize: 11, color: R.stone400, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: R.fontBody }}>{l}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: R.stone900, marginTop: 2, fontFamily: R.fontHeading }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderBottom: `1px solid ${R.stone200}`, marginBottom: 18, display: "flex", gap: 2 }}>
        <Tab active={tab === "deliverables"} onClick={() => setTab("deliverables")}>Deliverables & Status</Tab>
        <Tab active={tab === "payouts"} onClick={() => setTab("payouts")}>Payouts</Tab>
        <Tab active={tab === "tds"} onClick={() => setTab("tds")}>TDS Summary</Tab>
      </div>

      {tab === "deliverables" && (
        <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${R.stone150}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: R.stone800, fontFamily: R.fontBody }}>Creator Deliverables</span>
            <Pill variant="amber">8 of 15 approved</Pill>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>
              <TH>Creator</TH><TH>Deliverable</TH><TH>Due</TH><TH>Status</TH><TH>Pipeline</TH><TH>Amount</TH><TH></TH>
            </tr></thead>
            <tbody>
              {campaignCreators.map(cr => {
                const sc = deliverableStatus[cr.status] || deliverableStatus.brief_sent;
                const Ic = sc.icon;
                return (
                  <tr key={cr.id}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = R.stone50}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                    <TD>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Avatar name={cr.name} size={30} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: R.stone900, fontFamily: R.fontBody }}>{cr.name}</div>
                          <div style={{ fontSize: 12, color: R.stone400, fontFamily: R.fontBody }}>{cr.handle}</div>
                        </div>
                      </div>
                    </TD>
                    <TD><span style={{ fontSize: 13, color: R.stone600, fontFamily: R.fontBody }}>{cr.deliverable}</span></TD>
                    <TD color={cr.status === "overdue" ? R.rose : R.stone600}><span style={{ fontWeight: cr.status === "overdue" ? 700 : 400, fontFamily: R.fontBody }}>{cr.dueDate}</span></TD>
                    <TD>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        padding: "3px 10px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                        backgroundColor: sc.bg, color: sc.color, fontFamily: R.fontBody,
                      }}><Ic size={11} /> {sc.label}</span>
                    </TD>
                    <TD><Pipeline status={cr.status} /></TD>
                    <TD bold mono>{fmt(cr.amount)}</TD>
                    <TD>
                      <div style={{ display: "flex", gap: 6 }}>
                        {(cr.status === "submitted" || cr.status === "revision") && (
                          <button style={{
                            padding: "4px 10px", fontSize: 12, fontWeight: 600,
                            backgroundColor: R.indigo, color: R.white,
                            border: "none", borderRadius: 100, cursor: "pointer", fontFamily: R.fontBody,
                          }}>Approve</button>
                        )}
                        <button style={{
                          padding: "4px 8px", backgroundColor: "transparent",
                          border: `1px solid ${R.stone200}`, borderRadius: 8, cursor: "pointer",
                        }}><Eye size={13} color={R.stone500} /></button>
                      </div>
                    </TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "payouts" && (
        <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><TH>Creator</TH><TH>Gross</TH><TH>TDS (10%)</TH><TH>Net Payout</TH><TH>Status</TH><TH>UTR</TH></tr></thead>
            <tbody>
              {campaignCreators.slice(0, 6).map(cr => (
                <tr key={cr.id} onMouseOver={e => e.currentTarget.style.backgroundColor = R.stone50} onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                  <TD bold>{cr.name}</TD>
                  <TD mono>{fmt(cr.amount)}</TD>
                  <TD mono>{fmt(cr.tdsAmount)}</TD>
                  <TD bold mono>{fmt(cr.amount - cr.tdsAmount)}</TD>
                  <TD><Pill variant={cr.status === "approved" ? "emerald" : "amber"} dot>{cr.status === "approved" ? "Settled" : "Pending"}</Pill></TD>
                  <TD mono>—</TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "tds" && (
        <div>
          <div style={{ backgroundColor: R.indigoXLight, border: `1px solid ${R.indigoLight}`, borderRadius: 10, padding: "12px 18px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <Zap size={16} color={R.indigo} />
            <span style={{ fontSize: 13, color: R.stone700, fontFamily: R.fontBody }}><strong>Auto-classified:</strong> All creator payments under Sec 194J (10%). Barter/gifting flagged under Sec 194R.</span>
          </div>
          <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><TH>Creator</TH><TH>Section</TH><TH>Gross</TH><TH>TDS</TH><TH>Net</TH><TH>FY Total</TH><TH>Threshold</TH></tr></thead>
              <tbody>
                {campaignCreators.map(cr => (
                  <tr key={cr.id} onMouseOver={e => e.currentTarget.style.backgroundColor = R.stone50} onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                    <TD bold>{cr.name}</TD>
                    <TD><Pill variant="amber">{cr.tdsSection}</Pill></TD>
                    <TD mono>{fmt(cr.amount)}</TD>
                    <TD mono>{fmt(cr.tdsAmount)}</TD>
                    <TD bold mono>{fmt(cr.amount - cr.tdsAmount)}</TD>
                    <TD mono>—</TD>
                    <TD><Pill variant="emerald" dot>Crossed ₹30K</Pill></TD>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const CreatorsPage = () => {
  const [search, setSearch] = useState("");
  const list = creators.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.handle.includes(search));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
        <SectionTitle title="Creator Roster" sub="KYC status, GST tracking, and compliance overview" />
        <ActionBtn><Plus size={15} /> Invite Creator</ActionBtn>
      </div>
      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        <StatCard icon={Users}       label="Total Creators"  value="10" />
        <StatCard icon={UserCheck}   label="KYC Verified"    value="8"  accent={R.emerald} />
        <StatCard icon={Receipt}     label="GST Registered"  value="5"  />
        <StatCard icon={AlertCircle} label="Needs Attention" value="2"  accent={R.rose} />
      </div>
      <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${R.stone150}`, display: "flex", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", border: `1px solid ${R.stone200}`, borderRadius: 100, flex: 1, maxWidth: 340 }}>
            <Search size={15} color={R.stone400} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search creators..." style={{ border: "none", outline: "none", fontSize: 13, width: "100%", color: R.stone800, fontFamily: R.fontBody, backgroundColor: "transparent" }} />
          </div>
          <ActionBtn secondary><Filter size={13} /> Filter</ActionBtn>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>
            <TH>Creator</TH><TH>Category</TH><TH>KYC</TH><TH>GST Status</TH><TH>Cumulative Paid (FY)</TH><TH>TDS Deducted</TH><TH>Campaigns</TH>
          </tr></thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id}
                onMouseOver={e => e.currentTarget.style.backgroundColor = R.stone50}
                onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}
                style={{ cursor: "pointer" }}>
                <TD>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar name={c.name} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: R.stone900, fontFamily: R.fontBody }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: R.stone400, fontFamily: R.fontBody }}>{c.handle} · {c.followers}</div>
                    </div>
                  </div>
                </TD>
                <TD><Pill>{c.category}</Pill></TD>
                <TD><Pill variant={c.kyc === "verified" ? "emerald" : c.kyc === "pending" ? "amber" : "sky"} dot>{c.kyc === "verified" ? "Verified" : c.kyc === "pending" ? "Pending" : "In Progress"}</Pill></TD>
                <TD><Pill variant={c.gst === "registered" ? "emerald" : c.gst === "threshold_alert" ? "amber" : c.gst === "not_registered" ? "rose" : "stone"}>
                  {c.gst === "registered" ? "GST Registered" : c.gst === "threshold_alert" ? "⚠ Near ₹20L" : c.gst === "not_registered" ? "Not Registered" : "Below ₹20L"}
                </Pill></TD>
                <TD bold mono>{fmt(c.cumulativePaid)}</TD>
                <TD mono>{fmt(c.tdsDeducted)}</TD>
                <TD><span style={{ fontFamily: R.fontBody, color: R.stone600 }}>{c.campaigns}</span></TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TDSPage = () => (
  <div>
    <SectionTitle title="TDS Engine" sub="Auto-classified deductions across all campaigns this financial year" />
    <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
      <StatCard icon={Calculator}   label="Total TDS Deducted" value="₹3.42L" accent={R.indigo} />
      <StatCard icon={ShieldCheck}  label="Deposited to Govt"  value="₹2.86L" accent={R.emerald} />
      <StatCard icon={Clock}        label="Pending Deposit"    value="₹56K"   accent={R.indigoDark} />
      <StatCard icon={AlertTriangle} label="Below Threshold"   value="1 creator" />
    </div>
    <div style={{ backgroundColor: R.indigoXLight, border: `1px solid ${R.indigoLight}`, borderRadius: 10, padding: "13px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
      <Zap size={16} color={R.indigo} />
      <span style={{ fontSize: 13, color: R.stone700, fontFamily: R.fontBody }}>
        <strong>Auto-classification active:</strong> Creator payments → 194J (10%). Agency contracts → 194C (2%). Barter & gifting → 194R (10%).
      </span>
    </div>
    <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>
          <TH>Creator</TH><TH>PAN</TH><TH>Section</TH><TH>Rate</TH><TH>Gross</TH><TH>TDS</TH><TH>Net Payable</TH><TH>Cumul. FY</TH><TH>Threshold</TH><TH>Challan</TH>
        </tr></thead>
        <tbody>
          {tdsRecords.map(r => (
            <tr key={r.id}
              onMouseOver={e => e.currentTarget.style.backgroundColor = R.stone50}
              onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
              <TD bold>{r.creator}</TD>
              <TD mono>{r.pan}</TD>
              <TD><Pill variant={r.section === "194J" ? "amber" : r.section === "194R" ? "sky" : "indigo"}>{r.section}</Pill></TD>
              <TD>10%</TD>
              <TD mono>{fmt(r.grossAmount)}</TD>
              <TD mono>{fmt(r.tdsAmount)}</TD>
              <TD bold mono>{fmt(r.netAmount)}</TD>
              <TD mono>{fmt(r.cumulativeFY)}</TD>
              <TD><Pill variant={r.threshold === "crossed" ? "emerald" : "amber"} dot>{r.threshold === "crossed" ? "Crossed ₹30K" : "Below ₹30K"}</Pill></TD>
              <TD><Pill variant={r.status === "deposited" ? "emerald" : r.status === "pending" ? "amber" : "stone"} dot>{r.status === "deposited" ? "Deposited" : r.status === "pending" ? "Pending" : "N/A"}</Pill></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PayoutsPage = () => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
      <SectionTitle title="Payout Ledger" sub="All creator payments and UPI settlement records" />
      <ActionBtn><Plus size={15} /> New Payout</ActionBtn>
    </div>
    <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
      <StatCard icon={Wallet}      label="Settled This Month" value="₹3.01L" accent={R.emerald} />
      <StatCard icon={Clock}       label="Processing"          value="₹54K"   accent={R.indigo} />
      <StatCard icon={IndianRupee} label="Pending"             value="₹85.5K" />
    </div>
    <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>
          <TH>Payout ID</TH><TH>Creator</TH><TH>Campaign</TH><TH>Gross</TH><TH>TDS</TH><TH>Net Paid</TH><TH>Status</TH><TH>Date</TH><TH>UTR</TH>
        </tr></thead>
        <tbody>
          {payoutRecords.map(p => (
            <tr key={p.id}
              onMouseOver={e => e.currentTarget.style.backgroundColor = R.stone50}
              onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
              <TD mono>{p.id}</TD>
              <TD bold>{p.creator}</TD>
              <TD>{p.campaign}</TD>
              <TD mono>{fmt(p.grossAmount)}</TD>
              <TD mono>{fmt(p.tds)}</TD>
              <TD bold mono>{fmt(p.netAmount)}</TD>
              <TD><Pill variant={p.status === "settled" ? "emerald" : p.status === "processing" ? "sky" : "amber"} dot>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</Pill></TD>
              <TD>{p.date}</TD>
              <TD mono>{p.utr}</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CompliancePage = () => {
  const [tab, setTab] = useState("26q");
  return (
    <div>
      <SectionTitle title="Compliance Centre" sub="26Q filing data, Form 16A certificates, and TDS challans" />
      <div style={{ display: "flex", gap: 14, marginBottom: 22, flexWrap: "wrap" }}>
        <StatCard icon={FileCheck}  label="26Q Returns Filed" value="1"  sub="Q3 FY26 — on time" accent={R.emerald} />
        <StatCard icon={FileText}   label="Form 16A Issued"   value="4"  sub="Q3 FY26 certificates" />
        <StatCard icon={ShieldCheck} label="Challans Verified" value="5/6" sub="1 pending for Mar 2026" accent={R.indigo} />
      </div>
      <div style={{ borderBottom: `1px solid ${R.stone200}`, marginBottom: 18, display: "flex", gap: 2 }}>
        <Tab active={tab === "26q"} onClick={() => setTab("26q")}>26Q Returns</Tab>
        <Tab active={tab === "form16a"} onClick={() => setTab("form16a")}>Form 16A</Tab>
        <Tab active={tab === "challans"} onClick={() => setTab("challans")}>Challans</Tab>
      </div>

      {tab === "26q" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {complianceData.quarters.map((q, i) => (
            <div key={i} style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, padding: "20px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: R.stone900, fontFamily: R.fontHeading }}>{q.quarter}</div>
                  <div style={{ fontSize: 13, color: R.stone500, marginTop: 4, fontFamily: R.fontBody }}>
                    {q.entries} deductees · TDS: {fmt(q.tdsTotal)} · Due: {q.dueDate}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Pill variant={q.status === "filed" ? "emerald" : "amber"} dot>{q.status === "filed" ? "Filed" : "In Progress"}</Pill>
                  <ActionBtn secondary><Download size={13} /> Download</ActionBtn>
                </div>
              </div>
              {q.status === "filed" && (
                <div style={{ marginTop: 12, padding: "10px 14px", backgroundColor: R.emeraldLight, borderRadius: 8, fontSize: 13, color: "#047857", display: "flex", alignItems: "center", gap: 6, fontFamily: R.fontBody }}>
                  <CheckCircle2 size={14} /> Filed on {q.filedDate} — all entries verified
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "form16a" && (
        <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><TH>Creator</TH><TH>Quarter</TH><TH>TDS Amount</TH><TH>Status</TH><TH>Issued Date</TH><TH></TH></tr></thead>
            <tbody>
              {complianceData.form16a.map((f, i) => (
                <tr key={i} onMouseOver={e => e.currentTarget.style.backgroundColor = R.stone50} onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                  <TD bold>{f.creator}</TD>
                  <TD>{f.quarter}</TD>
                  <TD bold mono>{fmt(f.tdsAmount)}</TD>
                  <TD><Pill variant={f.status === "issued" ? "emerald" : "amber"} dot>{f.status === "issued" ? "Issued" : "Pending"}</Pill></TD>
                  <TD>{f.issuedDate || "—"}</TD>
                  <TD>{f.status === "issued" && <ActionBtn secondary>View PDF</ActionBtn>}</TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "challans" && (
        <div style={{ backgroundColor: R.white, borderRadius: 14, border: `1px solid ${R.stone200}`, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><TH>Challan ID</TH><TH>Period</TH><TH>Amount</TH><TH>BSR Code</TH><TH>Deposit Date</TH><TH>Status</TH></tr></thead>
            <tbody>
              {complianceData.challans.map(c => (
                <tr key={c.id} onMouseOver={e => e.currentTarget.style.backgroundColor = R.stone50} onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                  <TD mono>{c.id}</TD>
                  <TD bold>{c.period}</TD>
                  <TD bold mono>{fmt(c.amount)}</TD>
                  <TD mono>{c.bsrCode}</TD>
                  <TD>{c.depositDate}</TD>
                  <TD><Pill variant={c.status === "verified" ? "emerald" : "amber"} dot>{c.status === "verified" ? "Verified" : "Pending"}</Pill></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── Shell ────────────────────────────────────────────────────────
const nav = [
  { id: "overview",   label: "Overview",    icon: LayoutDashboard },
  { id: "campaigns",  label: "Campaigns",   icon: Megaphone       },
  { id: "creators",   label: "Creators",    icon: Users           },
  { id: "tds",        label: "TDS Engine",  icon: Calculator      },
  { id: "payouts",    label: "Payouts",     icon: Wallet          },
  { id: "compliance", label: "Compliance",  icon: ShieldCheck     },
];

export default function RekkoDashboard({ onLogout }) {
  const [page, setPage] = useState("overview");
  const [campaign, setCampaign] = useState(null);

  const render = () => {
    switch (page) {
      case "overview":         return <OverviewPage setActivePage={setPage} setSelectedCampaign={setCampaign} />;
      case "campaigns":        return <CampaignsPage setActivePage={setPage} setSelectedCampaign={setCampaign} />;
      case "campaign_detail":  return <CampaignDetailPage campaign={campaign} setActivePage={setPage} />;
      case "creators":         return <CreatorsPage />;
      case "tds":              return <TDSPage />;
      case "payouts":          return <PayoutsPage />;
      case "compliance":       return <CompliancePage />;
      default:                 return <OverviewPage setActivePage={setPage} setSelectedCampaign={setCampaign} />;
    }
  };

  return (
    <>
      {/* Load Rekko fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ display: "flex", minHeight: "100vh", fontFamily: R.fontBody, backgroundColor: R.bg }}>

        {/* Sidebar */}
        <div style={{
          width: 232, backgroundColor: R.white, borderRight: `1px solid ${R.stone200}`,
          display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 10,
        }}>
          {/* Logo */}
          <div style={{ padding: "22px 18px 18px", borderBottom: `1px solid ${R.stone100}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9, backgroundColor: R.amber,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: R.white, fontWeight: 800, fontSize: 15, fontFamily: R.fontHeading,
                boxShadow: `0 2px 8px ${R.amber}55`,
              }}>R</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: R.stone900, fontFamily: R.fontHeading, letterSpacing: -0.3 }}>Rekko</div>
                <div style={{ fontSize: 10, color: R.stone400, fontFamily: R.fontBody, fontWeight: 500 }}>Pay Infrastructure</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div style={{ padding: "14px 10px", flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: R.stone400, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 8px", marginBottom: 6, fontFamily: R.fontBody }}>
              Navigation
            </div>
            {nav.map(item => {
              const active = page === item.id || (item.id === "campaigns" && page === "campaign_detail");
              return (
                <button key={item.id} onClick={() => setPage(item.id)} style={{
                  display: "flex", alignItems: "center", gap: 9, width: "100%",
                  padding: "9px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                  backgroundColor: active ? R.indigoLight : "transparent",
                  color: active ? R.indigo : R.stone500,
                  fontSize: 13, fontWeight: active ? 600 : 500, textAlign: "left",
                  fontFamily: R.fontBody, transition: "all 0.15s", marginBottom: 1,
                }}>
                  <item.icon size={17} />
                  {item.label}
                  {item.id === "campaigns" && <span style={{ marginLeft: "auto", backgroundColor: R.indigoLight, color: R.indigo, fontSize: 11, fontWeight: 700, padding: "1px 7px", borderRadius: 100 }}>3</span>}
                </button>
              );
            })}
          </div>

          {/* Agency badge + Logout */}
          <div style={{ padding: "14px 10px", borderTop: `1px solid ${R.stone100}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, backgroundColor: R.stone50 }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", backgroundColor: R.indigoLight,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: R.indigo, fontFamily: R.fontBody,
              }}>VB</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: R.stone800, fontFamily: R.fontBody }}>ViralBridge Media</div>
                <div style={{ fontSize: 11, color: R.stone400, fontFamily: R.fontBody }}>Agency · Pro Plan</div>
              </div>
            </div>
            <button onClick={onLogout} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              width: "100%", marginTop: 8, padding: "8px 12px", borderRadius: 8,
              border: `1px solid ${R.stone200}`, backgroundColor: "transparent",
              color: R.stone500, fontSize: 12, fontWeight: 600, cursor: "pointer",
              fontFamily: R.fontBody, transition: "all 0.15s",
            }}
              onMouseOver={e => { e.currentTarget.style.backgroundColor = R.roseLight; e.currentTarget.style.color = R.rose; e.currentTarget.style.borderColor = R.rose; }}
              onMouseOut={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = R.stone500; e.currentTarget.style.borderColor = R.stone200; }}
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, marginLeft: 232 }}>
          {/* Top bar */}
          <div style={{
            height: 58, backgroundColor: R.white, borderBottom: `1px solid ${R.stone200}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 30px", position: "sticky", top: 0, zIndex: 5,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", border: `1px solid ${R.stone200}`, borderRadius: 100, width: 300 }}>
              <Search size={15} color={R.stone400} />
              <input placeholder="Search campaigns, creators, payouts..." style={{
                border: "none", outline: "none", fontSize: 13, width: "100%",
                color: R.stone800, fontFamily: R.fontBody, backgroundColor: "transparent",
              }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ position: "relative", cursor: "pointer" }}>
                <Bell size={19} color={R.stone500} />
                <div style={{ position: "absolute", top: -1, right: -1, width: 7, height: 7, borderRadius: "50%", backgroundColor: R.rose, border: `2px solid ${R.white}` }} />
              </div>
              <div style={{ width: 1, height: 22, backgroundColor: R.stone200 }} />
              <span style={{ fontSize: 12, color: R.stone500, fontFamily: R.fontBody, fontWeight: 500 }}>FY 2025–26 · Q4</span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "26px 30px" }}>
            {render()}
          </div>
        </div>
      </div>
    </>
  );
}
