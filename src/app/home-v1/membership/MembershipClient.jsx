"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";

/* ─── COLOR TOKENS ─── */
const C = {
  bg:         "#f0faf0",
  bgWhite:    "#ffffff",
  bgSection:  "#f8fef8",
  green:      "#16a34a",
  greenDark:  "#14532d",
  greenLight: "#dcfce7",
  greenMid:   "#22c55e",
  yellow:     "#d97706",
  text:       "#1c3a1c",
  body:       "#374151",
  muted:      "#6b7280",
  border:     "#d1fae5",
  borderGray: "#e5e7eb",
  red:        "#dc2626",
  blue:       "#2563eb",
  blueLight:  "#eff6ff",
  shadowMd:   "0 4px 12px rgba(0,0,0,0.08)",
  shadowLg:   "0 10px 30px rgba(0,0,0,0.12)",
};

/* ─── REUSABLE PRIMITIVES ─── */
const focusStyle = (e) => { e.target.style.borderColor = C.green; e.target.style.boxShadow = `0 0 0 3px ${C.greenLight}`; };
const blurStyle  = (e) => { e.target.style.borderColor = C.borderGray; e.target.style.boxShadow = "none"; };

function Label({ children, required }) {
  return (
    <label className="text-[11px] font-extrabold tracking-[0.15em] uppercase mb-1 block" style={{ color: C.text }}>
      {children}{required && <span className="ml-1" style={{ color: C.red }}>*</span>}
    </label>
  );
}

function Input({ label, required, type = "text", placeholder = "", className = "", ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <Label required={required}>{label}</Label>}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all"
        style={{ background: C.bgWhite, border: `1.5px solid ${C.borderGray}`, color: C.text }}
        onFocus={focusStyle}
        onBlur={blurStyle}
        {...props}
      />
    </div>
  );
}

function Select({ label, required, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <Label required={required}>{label}</Label>}
      <select
        className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all"
        style={{ background: C.bgWhite, border: `1.5px solid ${C.borderGray}`, color: C.text }}
        onFocus={focusStyle}
        onBlur={blurStyle}
      >
        {children}
      </select>
    </div>
  );
}

function Textarea({ label, required, rows = 3, placeholder = "" }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label required={required}>{label}</Label>}
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-[14px] outline-none resize-y transition-all"
        style={{ background: C.bgWhite, border: `1.5px solid ${C.borderGray}`, color: C.text }}
        onFocus={focusStyle}
        onBlur={blurStyle}
      />
    </div>
  );
}

function CardHeader({ icon, title, subtitle, accent = C.greenLight, iconColor = C.green }) {
  return (
    <div className="flex items-center gap-3 mb-8 pb-5" style={{ borderBottom: `2px solid ${C.greenLight}` }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: accent, color: iconColor }}>
        {icon}
      </div>
      <div>
        <h2 className="font-extrabold text-[18px]" style={{ color: C.text }}>{title}</h2>
        {subtitle && <p className="text-[12px]" style={{ color: C.muted }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function Card({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`rounded-3xl p-8 mb-8 ${className}`}
      style={{ background: C.bgWhite, boxShadow: C.shadowLg, border: `1px solid ${C.border}` }}
    >
      {children}
    </motion.div>
  );
}

/* ─── PHOTO UPLOAD BOX ─── */
function PhotoBox({ label = "Affix Photo", sub = "4 copies" }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl p-4 text-center cursor-pointer transition-all hover:border-green-500"
      style={{ border: `2px dashed ${C.green}`, background: C.bgSection, minHeight: "130px", width: "110px" }}>
      <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={1.5} className="w-8 h-8 mb-2">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <p className="text-[10px] font-bold" style={{ color: C.green }}>{label}</p>
      <p className="text-[9px] mt-0.5" style={{ color: C.muted }}>{sub}</p>
    </div>
  );
}

/* ─── FEE TABLE ROW ─── */
function FeeRow({ serial, item, rs, ps, highlight = false }) {
  return (
    <tr style={{ background: highlight ? C.greenLight : "transparent" }}>
      <td className="px-4 py-3 text-center text-[13px] font-bold" style={{ color: C.greenDark, borderBottom: `1px solid ${C.border}` }}>{serial}</td>
      <td className="px-4 py-3 text-[13px]" style={{ color: C.body, borderBottom: `1px solid ${C.border}` }}>{item}</td>
      <td className="px-4 py-3" style={{ borderBottom: `1px solid ${C.border}` }}>
        <input type="text" placeholder="0" defaultValue={rs}
          className="w-full px-3 py-1.5 rounded-lg text-[13px] text-right outline-none"
          style={{ border: `1.5px solid ${C.borderGray}`, background: highlight ? C.bgWhite : C.bgSection }}
          onFocus={focusStyle} onBlur={blurStyle}
        />
      </td>
      <td className="px-4 py-3" style={{ borderBottom: `1px solid ${C.border}` }}>
        <input type="text" placeholder="00" defaultValue={ps}
          className="w-full px-3 py-1.5 rounded-lg text-[13px] text-right outline-none"
          style={{ border: `1.5px solid ${C.borderGray}`, background: highlight ? C.bgWhite : C.bgSection }}
          onFocus={focusStyle} onBlur={blurStyle}
        />
      </td>
    </tr>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                */
/* ══════════════════════════════════════════════════════════════ */
export default function MembershipClient() {
  const [paymentMode, setPaymentMode] = useState("");
  const [checks, setChecks]           = useState({ c1: false, c2: false, c3: false });
  const [submitted, setSubmitted]     = useState(false);

  const toggleCheck = (k) => setChecks((p) => ({ ...p, [k]: !p[k] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  /* ──────────────────────────────────────────── */
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar activePage="membership" />
      <div style={{ height: "88px" }} />

      {/* ══ HERO BANNER ══ */}
      <section className="relative overflow-hidden py-16"
        style={{ background: `linear-gradient(135deg, ${C.greenDark} 0%, #0d2818 50%, #071a0e 100%)` }}>
        {/* blobs */}
        <motion.div animate={{ x: [0,40,-20,0], y: [0,-30,20,0] }} transition={{ duration: 14, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: C.green, opacity: 0.1, filter: "blur(80px)" }} />
        <motion.div animate={{ x: [0,-40,30,0], y: [0,30,-20,0] }} transition={{ duration: 18, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -right-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{ background: C.yellow, opacity: 0.07, filter: "blur(90px)" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-[12px] mb-5"
            style={{ color: "rgba(255,255,255,0.45)" }}>
            <a href="/home-v1" className="hover:text-green-400 transition-colors">Home</a>
            <span>/</span>
            <span style={{ color: C.greenMid }}>Membership Application</span>
          </motion.div>

          {/* badge */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold mb-5"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: C.greenMid }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Application for Membership
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-4">
            Join{" "}
            <span style={{ background: `linear-gradient(90deg,${C.greenMid},#86efac)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              BMI Housing
            </span>{" "}
            Society
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[15px] max-w-2xl mx-auto mb-6"
            style={{ color: "rgba(255,255,255,0.55)" }}>
            Fill in the details below to apply for membership in the BMI Housing Co-operative Society Ltd.
            Fields marked <span style={{ color: C.red }}>*</span> are required.
          </motion.p>

          {/* intro notice */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="inline-block px-6 py-3 rounded-2xl text-left text-[12px] max-w-xl"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}>
            <strong style={{ color: "rgba(255,255,255,0.85)" }}>To,</strong><br />
            The President,<br />
            BMI Housing Co-operative Society Ltd.<br />
            Bengaluru — 560 094.
          </motion.div>
        </div>
      </section>

      {/* ══ FORM ══ */}
      <section className="px-4 md:px-6 lg:px-10 py-14">
        <div className="max-w-5xl mx-auto">

          {/* success toast */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} className="mb-8 p-5 rounded-2xl flex items-center gap-4"
                style={{ background: C.greenLight, border: `1.5px solid ${C.green}` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: C.green }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-5 h-5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[15px]" style={{ color: C.greenDark }}>Membership Application Submitted!</div>
                  <div className="text-[13px]" style={{ color: C.body }}>
                    We will contact you at your registered mobile / email shortly.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ₹100 note */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3 px-5 py-4 rounded-2xl"
            style={{ background: "#fef9c3", border: `1.5px solid #fbbf24` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} className="w-5 h-5 shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-[13px] font-semibold" style={{ color: "#92400e" }}>
              Application Form Charges: <strong>₹ 100/-</strong> (Non-refundable, to be paid along with the application)
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>

            {/* ══════════════════════════════════════════
                CARD 1 — APPLICANT DETAILS
            ══════════════════════════════════════════ */}
            <Card delay={0}>
              <CardHeader
                title="Applicant Details"
                subtitle="Personal information as per official records"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              />

              {/* Photo + fields side by side */}
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                {/* left: photo */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <PhotoBox label="Applicant Photo" sub="Affix 4 PP/SS copies" />
                  <p className="text-[9px] text-center max-w-[110px]" style={{ color: C.muted }}>
                    Passport / stamp-size photograph (4 copies)
                  </p>
                </div>
                {/* right: fields */}
                <div className="flex-1 grid md:grid-cols-2 gap-5">
                  <Input label="Name of the Applicant (In Block Letters)" required placeholder="FULL NAME IN CAPITALS" className="md:col-span-2" />
                  <Input label="Father's / Husband's Name" placeholder="Full name" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Date of Birth" type="date" />
                    <Input label="Age" type="number" placeholder="e.g. 32" />
                  </div>
                  <Input label="Place of Birth" placeholder="City, State" />
                </div>
              </div>

              {/* Contact row */}
              <div className="grid md:grid-cols-3 gap-5 mb-6">
                <Input label="Phone No. (Residence)" type="tel" placeholder="+91 XXXXX XXXXX" />
                <Input label="Mobile No." required type="tel" placeholder="+91 XXXXX XXXXX" />
                <Input label="E-mail ID" required type="email" placeholder="you@example.com" />
              </div>

              {/* Gender + Marital */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Gender */}
                <div>
                  <Label>Gender</Label>
                  <div className="flex gap-4 mt-2">
                    {["Male","Female","Other"].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: C.body }}>
                        <input type="radio" name="gender" value={g}
                          className="accent-green-600 w-4 h-4" />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
                {/* Marital Status */}
                <div>
                  <Label>Marital Status</Label>
                  <div className="flex gap-4 mt-2">
                    {["Single","Married","Widowed","Divorced"].map((m) => (
                      <label key={m} className="flex items-center gap-2 cursor-pointer text-[13px]" style={{ color: C.body }}>
                        <input type="radio" name="marital" value={m}
                          className="accent-green-600 w-4 h-4" />
                        {m}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* ══════════════════════════════════════════
                CARD 2 — ADDRESS FOR CORRESPONDENCE
            ══════════════════════════════════════════ */}
            <Card delay={0.05}>
              <CardHeader
                title="Address for Correspondence"
                subtitle="Where you'd like to receive all communications"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                accent="#dbeafe" iconColor={C.blue}
              />
              <div className="grid gap-5">
                <Input label="Address Line 1" required placeholder="House / Flat / Building name, Street" />
                <Input label="Address Line 2" placeholder="Area / Locality / Landmark" />
                <div className="grid md:grid-cols-3 gap-5">
                  <Input label="City" required placeholder="City" />
                  <Input label="District" placeholder="District" />
                  <Input label="State" required placeholder="State" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="PIN Code" type="text" placeholder="560 001" />
                  <Input label="Country" placeholder="India" />
                </div>
              </div>
            </Card>

            {/* ══════════════════════════════════════════
                CARD 3 — PERMANENT ADDRESS
            ══════════════════════════════════════════ */}
            <Card delay={0.08}>
              <CardHeader
                title="Permanent Address"
                subtitle="Your permanent / native address"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                accent="#fef9c3" iconColor={C.yellow}
              />

              {/* same as above checkbox */}
              <label className="flex items-center gap-2 mb-5 cursor-pointer text-[13px]" style={{ color: C.body }}>
                <input type="checkbox" className="accent-green-600 w-4 h-4" />
                Same as Correspondence Address
              </label>

              <div className="grid gap-5">
                <Input label="Address Line 1" placeholder="House / Flat / Building name, Street" />
                <Input label="Address Line 2" placeholder="Area / Locality / Landmark" />
                <div className="grid md:grid-cols-3 gap-5">
                  <Input label="City" placeholder="City" />
                  <Input label="District" placeholder="District" />
                  <Input label="State" placeholder="State" />
                </div>
                <Input label="PIN Code" placeholder="560 001" />
              </div>
            </Card>

            {/* ══════════════════════════════════════════
                CARD 4 — DESIGNATION & OFFICE ADDRESS
            ══════════════════════════════════════════ */}
            <Card delay={0.1}>
              <CardHeader
                title="Designation & Full Address of Office"
                subtitle="Employment / business details"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                accent="#fce7f3" iconColor="#db2777"
              />
              <div className="grid gap-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Employer / Organization Name" placeholder="Name of employer or business" />
                  <Input label="Designation / Occupation" placeholder="e.g. Software Engineer, Business" />
                </div>
                <Input label="Office / Business Address" placeholder="Full office or business address" />
                <div className="grid md:grid-cols-3 gap-5">
                  <Input label="City" placeholder="City" />
                  <Input label="State" placeholder="State" />
                  <Input label="PIN Code" placeholder="PIN" />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Office Phone No." type="tel" placeholder="+91 XXXXX XXXXX" />
                  <Input label="Monthly Income (₹)" type="number" placeholder="e.g. 50000" />
                </div>
              </div>
            </Card>

            {/* ══════════════════════════════════════════
                CARD 5 — NOMINEE PARTICULARS
            ══════════════════════════════════════════ */}
            <Card delay={0.12}>
              <CardHeader
                title="Nominee Particulars"
                subtitle="Details of the person nominated for the membership"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                accent="#fde8d8" iconColor="#ea580c"
              />

              <div className="flex flex-col md:flex-row gap-6 mb-6">
                {/* Nominee photo */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <PhotoBox label="Nominee Photo" sub="Affix photo here" />
                  <p className="text-[9px] text-center max-w-[110px]" style={{ color: C.muted }}>
                    Passport / stamp-size photograph
                  </p>
                </div>
                {/* Nominee fields */}
                <div className="flex-1 grid md:grid-cols-2 gap-5">
                  <Input label="Nominee Name" required placeholder="Full name" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Age" type="number" placeholder="e.g. 40" />
                    <Input label="Date of Birth" type="date" />
                  </div>
                  <Select label="Relationship with Applicant" required>
                    <option value="">Select relationship</option>
                    <option>Spouse</option>
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Brother</option>
                    <option>Sister</option>
                    <option>Other</option>
                  </Select>
                  <Input label="Nominee Phone / Mobile" type="tel" placeholder="+91 XXXXX XXXXX" />
                  <Input label="Nominee Address" placeholder="Full address of nominee" className="md:col-span-2" />
                </div>
              </div>
            </Card>

            {/* ══════════════════════════════════════════
                CARD 6 — SHARES & PAYMENT
            ══════════════════════════════════════════ */}
            <Card delay={0.14}>
              <CardHeader
                title="Shares &amp; Payment Details"
                subtitle="Share application and amount remitted with this form"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
                accent="#d1fae5" iconColor={C.green}
              />

              {/* Shares */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Input label="No. of Shares Required (Minimum 10 = TEN)" required type="number" placeholder="Minimum 10 shares" />
                  <p className="text-[11px] mt-1.5" style={{ color: C.muted }}>
                    Each share value as per Society bye-laws. Min 10 shares mandatory.
                  </p>
                </div>
                <Textarea label="Remarks, if any" rows={3} placeholder="Any additional information or remarks..." />
              </div>

              {/* FEE TABLE */}
              <div className="mb-8">
                <p className="text-[12px] font-extrabold tracking-[0.12em] uppercase mb-3" style={{ color: C.text }}>
                  Fee Details
                </p>
                <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${C.border}` }}>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr style={{ background: `linear-gradient(135deg, ${C.greenDark}, #0d2818)` }}>
                        <th className="px-4 py-3 text-[11px] font-bold text-center text-white w-12">Sl.</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-left text-white">Particulars</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-center text-white w-28">Rs.</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-center text-white w-24">Ps.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <FeeRow serial="1" item="Membership Fee" />
                      <FeeRow serial="2" item="Share Fee" />
                      <FeeRow serial="3" item="Share Amount (Min. 10 Shares)" />
                      <FeeRow serial="4" item="Admission Fee" />
                      <FeeRow serial="" item="TOTAL" highlight />
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment mode */}
              <div className="mb-6">
                <p className="text-[12px] font-extrabold tracking-[0.12em] uppercase mb-4" style={{ color: C.text }}>
                  Amount Paid Along With Application — Mode of Payment
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "cash",   label: "Cash", icon: "💵" },
                    { id: "cheque", label: "Cheque / DD", icon: "🏦" },
                    { id: "online", label: "Online (UPI / NEFT / RTGS)", icon: "📲" },
                    { id: "others", label: "Others", icon: "📋" },
                  ].map((opt) => (
                    <motion.button
                      key={opt.id} type="button"
                      onClick={() => setPaymentMode(opt.id)}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl text-[13px] font-bold transition-all"
                      style={{
                        background: paymentMode === opt.id ? C.greenLight : C.bgSection,
                        border: `2px solid ${paymentMode === opt.id ? C.green : C.borderGray}`,
                        color: paymentMode === opt.id ? C.greenDark : C.body,
                        boxShadow: paymentMode === opt.id ? `0 0 0 3px ${C.greenLight}` : "none",
                      }}
                    >
                      <span>{opt.icon}</span>
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Cheque / DD fields */}
              <AnimatePresence>
                {paymentMode === "cheque" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
                    <div className="grid md:grid-cols-3 gap-5 pt-2">
                      <Input label="Cheque / DD No." placeholder="Enter cheque or DD number" />
                      <Input label="Date of Cheque / DD" type="date" />
                      <Input label="Amount (₹)" type="number" placeholder="Amount in ₹" />
                    </div>
                  </motion.div>
                )}
                {paymentMode === "online" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-6">
                    <div className="grid md:grid-cols-3 gap-5 pt-2">
                      <Input label="UTR / Transaction Reference No." placeholder="Reference number" />
                      <Input label="Payment Mode" placeholder="UPI / NEFT / RTGS" />
                      <Input label="Transaction Date" type="date" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bank & Branch */}
              <div className="grid md:grid-cols-2 gap-5">
                <Input label="Bank Name" placeholder="e.g. State Bank of India" />
                <Input label="Branch Name" placeholder="e.g. Yelahanka Branch" />
              </div>
            </Card>

            {/* ══════════════════════════════════════════
                TERMS & CONDITIONS + DECLARATION
            ══════════════════════════════════════════ */}
            <Card delay={0.16}>
              <CardHeader
                title="Terms &amp; Conditions"
                subtitle="Please read carefully before submitting"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>}
                accent="#f3e8ff" iconColor="#9333ea"
              />

              <div className="flex flex-col gap-3 mb-8">
                {[
                  "I wish to become a member of the BMI Housing Co-operative Society Ltd.",
                  "Members shall be governed by the Bye-Laws of the Society, rules and regulations framed by the Board from time to time.",
                  "The Board may reject any application without assigning any reason whatsoever.",
                  "The Board shall reserve the right of admission to members.",
                  "Further installments of site deposits shall be payable by the applicants as and when demanded by the Society. 10% interest shall be charged on belated remittances.",
                  "Member shall visit the Society periodically and update the address & telephone numbers. Non-receipt of communication shall not be considered as a valid reason for belated payments.",
                  "I have read the above conditions and hereby irrevocably undertake to abide by these conditions, the bye-laws of the Society and the decisions taken by the Board from time to time, which shall be final and binding on me.",
                ].map((term, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-4 p-4 rounded-2xl"
                    style={{ background: C.bgSection, border: `1px solid ${C.border}` }}
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-extrabold shrink-0"
                      style={{ background: C.greenLight, color: C.greenDark }}>
                      {i + 1}
                    </div>
                    <p className="text-[13px] leading-relaxed pt-0.5" style={{ color: C.body }}>{term}</p>
                  </motion.div>
                ))}
              </div>

              {/* Declaration checkboxes */}
              <div className="p-6 rounded-2xl mb-8" style={{ background: C.bgSection, border: `1.5px solid ${C.border}` }}>
                <p className="text-[13px] font-extrabold mb-4" style={{ color: C.text }}>Declaration</p>
                <div className="flex flex-col gap-4">
                  {[
                    { key: "c1", text: "I wish to become a member of BMI Housing Co-operative Society Ltd. and agree to abide by all its bye-laws, rules and regulations." },
                    { key: "c2", text: "I have read all the above conditions and hereby irrevocably undertake to abide by these conditions and all decisions taken by the Board, which shall be final and binding on me." },
                    { key: "c3", text: "I declare that all the particulars furnished by me in this application are true, correct and complete to the best of my knowledge and belief." },
                  ].map(({ key, text }) => (
                    <motion.div key={key} whileHover={{ x: 2 }} className="flex items-start gap-3 cursor-pointer"
                      onClick={() => toggleCheck(key)}>
                      <div className="mt-0.5 w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all"
                        style={{
                          background: checks[key] ? C.green : C.bgWhite,
                          border: `2px solid ${checks[key] ? C.green : C.borderGray}`,
                          boxShadow: checks[key] ? `0 0 0 3px ${C.greenLight}` : "none",
                        }}>
                        {checks[key] && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-[13px] leading-relaxed select-none" style={{ color: C.body }}>{text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Place / Date / Signature */}
              <div className="grid md:grid-cols-3 gap-5">
                <Input label="Place" placeholder="e.g. Bengaluru" />
                <Input label="Date" type="date" />
                <div className="flex flex-col gap-1">
                  <Label>Signature of Applicant</Label>
                  <div className="flex items-center justify-center rounded-xl"
                    style={{ height: "54px", border: `1.5px dashed ${C.green}`, background: C.bgSection }}>
                    <span className="text-[11px]" style={{ color: C.muted }}>Sign here</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* ══ SUBMIT BUTTON ══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4"
            >
              <p className="text-[13px]" style={{ color: C.muted }}>
                Ensure all required fields are filled before submitting.
              </p>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04, boxShadow: `0 12px 32px ${C.green}55` }}
                whileTap={{ scale: 0.97 }}
                className="relative px-14 py-4 rounded-2xl text-[15px] font-extrabold text-white overflow-hidden group"
                style={{ background: `linear-gradient(135deg,${C.green},${C.greenDark})`, boxShadow: `0 4px 16px ${C.green}44` }}
              >
                {/* shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.2) 50%,transparent 65%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }}
                />
                <span className="relative flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                    <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
                  </svg>
                  Submit Membership Application
                </span>
              </motion.button>
            </motion.div>

          </form>

          {/* ══ FOR THE USE OF THE SOCIETY ══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden mt-8"
            style={{ boxShadow: C.shadowLg }}
          >
            <div className="px-8 py-6 text-white"
              style={{ background: `linear-gradient(135deg, ${C.greenDark}, #0d2818)` }}>
              <h3 className="font-extrabold text-[16px] tracking-wide uppercase">
                For the Use of the Society / Decision of the Board
              </h3>
              <p className="text-[12px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                This section is to be filled by BMI Housing Society office only
              </p>
            </div>
            <div className="px-8 py-8" style={{ background: C.bgWhite }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <Label>Membership No. Allotted</Label>
                  <div className="px-4 py-3 rounded-xl text-[13px]"
                    style={{ background: C.bgSection, border: `1.5px dashed ${C.borderGray}`, color: C.muted, minHeight: "46px" }}>
                    — To be filled by Society —
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Date of Admission</Label>
                  <div className="px-4 py-3 rounded-xl text-[13px]"
                    style={{ background: C.bgSection, border: `1.5px dashed ${C.borderGray}`, color: C.muted, minHeight: "46px" }}>
                    — To be filled by Society —
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Share Certificate No.</Label>
                  <div className="px-4 py-3 rounded-xl text-[13px]"
                    style={{ background: C.bgSection, border: `1.5px dashed ${C.borderGray}`, color: C.muted, minHeight: "46px" }}>
                    — To be filled by Society —
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Receipt No. &amp; Date</Label>
                  <div className="px-4 py-3 rounded-xl text-[13px]"
                    style={{ background: C.bgSection, border: `1.5px dashed ${C.borderGray}`, color: C.muted, minHeight: "46px" }}>
                    — To be filled by Society —
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col gap-1">
                  <Label>Remarks / Board Decision</Label>
                  <div className="px-4 py-5 rounded-xl text-[13px]"
                    style={{ background: C.bgSection, border: `1.5px dashed ${C.borderGray}`, color: C.muted, minHeight: "80px" }}>
                    — To be filled by Society —
                  </div>
                </div>
              </div>
              {/* Society Seal + Signature */}
              <div className="flex gap-8 mt-8 pt-6" style={{ borderTop: `1.5px solid ${C.border}` }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ border: `2px dashed ${C.borderGray}`, background: C.bgSection }}>
                    <span className="text-[10px] text-center" style={{ color: C.muted }}>Society<br/>Seal</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <div className="h-16 rounded-xl mb-2" style={{ border: `1.5px dashed ${C.borderGray}`, background: C.bgSection }} />
                  <p className="text-[11px] text-center" style={{ color: C.muted }}>Authorised Signatory</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
