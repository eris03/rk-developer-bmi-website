"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";

const C = {
  bg:         "#f0fdf4",
  bgWhite:    "#ffffff",
  bgSection:  "#f8fef8",
  green:      "#16a34a",
  greenDark:  "#14532d",
  greenLight: "#dcfce7",
  greenMid:   "#22c55e",
  yellow:     "#d97706",
  yellowLight:"#fef9c3",
  text:       "#1c3a1c",
  body:       "#374151",
  muted:      "#6b7280",
  border:     "#d1fae5",
  borderGray: "#e5e7eb",
  red:        "#dc2626",
  blue:       "#1d4ed8",
  blueLight:  "#dbeafe",
  shadowMd:   "0 4px 12px rgba(0,0,0,0.08)",
  shadowLg:   "0 12px 36px rgba(0,0,0,0.10)",
};

/* ─── Input style helpers ─── */
const baseInput = {
  background: C.bgWhite,
  border: `1.5px solid ${C.borderGray}`,
  color: C.text,
  borderRadius: "10px",
  padding: "11px 14px",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  transition: "all 0.2s",
};

function focus(e) { e.target.style.border = `1.5px solid ${C.green}`; e.target.style.boxShadow = `0 0 0 3px ${C.greenLight}`; }
function blur(e)  { e.target.style.border = `1.5px solid ${C.borderGray}`; e.target.style.boxShadow = "none"; }

function Label({ children, required }) {
  return (
    <label className="block text-[11px] font-extrabold tracking-[0.15em] uppercase mb-1.5" style={{ color: C.text }}>
      {children}{required && <span className="ml-1" style={{ color: C.red }}>*</span>}
    </label>
  );
}

function Input({ label, required, type = "text", placeholder = "", className = "" }) {
  return (
    <div className={className}>
      <Label required={required}>{label}</Label>
      <input type={type} placeholder={placeholder} style={baseInput} onFocus={focus} onBlur={blur} />
    </div>
  );
}

function Select({ label, required, options, className = "" }) {
  return (
    <div className={className}>
      <Label required={required}>{label}</Label>
      <select style={{ ...baseInput, appearance: "none", cursor: "pointer" }} onFocus={focus} onBlur={blur}>
        <option value="">Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Textarea({ label, required, placeholder = "", rows = 3, className = "" }) {
  return (
    <div className={className}>
      <Label required={required}>{label}</Label>
      <textarea
        rows={rows} placeholder={placeholder}
        style={{ ...baseInput, resize: "vertical" }}
        onFocus={focus} onBlur={blur}
      />
    </div>
  );
}

/* ─── Section card ─── */
function Card({ number, title, accent = C.green, icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{ background: C.bgWhite, boxShadow: C.shadowLg, border: `1px solid ${C.borderGray}` }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 px-7 py-4"
        style={{ background: `linear-gradient(135deg, ${accent}12, ${accent}06)`, borderBottom: `2px solid ${accent}30` }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-white text-[14px] shrink-0"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
          {number}
        </div>
        <div className="flex items-center gap-2">
          {icon && <span style={{ color: accent }}>{icon}</span>}
          <h3 className="font-bold text-[15px]" style={{ color: C.text }}>{title}</h3>
        </div>
      </div>
      <div className="p-7">{children}</div>
    </motion.div>
  );
}

/* ─── Table rows for nominee / family ─── */
function TableRows({ columns, rows, setRows, accentColor }) {
  const addRow = () => setRows(r => [...r, Object.fromEntries(columns.map(c => [c.key, ""]))]);
  const removeRow = (i) => setRows(r => r.filter((_, idx) => idx !== i));
  const update = (i, key, val) => setRows(r => r.map((row, idx) => idx === i ? { ...row, [key]: val } : row));

  return (
    <div>
      <div className="overflow-x-auto rounded-xl" style={{ border: `1px solid ${C.borderGray}` }}>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: `${accentColor}10` }}>
              <th className="px-3 py-2.5 text-left font-bold text-[11px] uppercase tracking-wider w-12" style={{ color: C.muted }}>Sl.</th>
              {columns.map(c => (
                <th key={c.key} className="px-3 py-2.5 text-left font-bold text-[11px] uppercase tracking-wider" style={{ color: C.muted }}>{c.label}</th>
              ))}
              <th className="px-3 py-2.5 w-10" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderTop: `1px solid ${C.borderGray}` }}>
                <td className="px-3 py-2 font-bold" style={{ color: C.muted }}>{i + 1}</td>
                {columns.map(c => (
                  <td key={c.key} className="px-2 py-1.5">
                    <input
                      type={c.type || "text"}
                      value={row[c.key]}
                      onChange={e => update(i, c.key, e.target.value)}
                      placeholder={c.placeholder || c.label}
                      style={{ ...baseInput, padding: "7px 10px", fontSize: "13px" }}
                      onFocus={focus} onBlur={blur}
                    />
                  </td>
                ))}
                <td className="px-2 py-1.5">
                  <button onClick={() => removeRow(i)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[16px] transition-colors hover:bg-red-50"
                    style={{ color: C.red }} type="button">×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold transition-colors hover:bg-green-100"
        style={{ color: accentColor, border: `1.5px dashed ${accentColor}60` }}
      >
        <span className="text-[16px] leading-none">+</span> Add Row
      </button>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function PurchaseSiteClient() {
  const [scSt, setScSt]           = useState("");
  const [karnataka, setKarnataka] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const [nomineeRows, setNomineeRows] = useState([{ name: "", relationship: "", age: "", dob: "" }]);
  const [familyRows, setFamilyRows]   = useState([{ name: "", relationship: "", age: "", occupation: "" }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form   = e.target;
    const name   = form.querySelector('input[placeholder="As in official records (Block Letters)"]')?.value || "";
    const mobile = form.querySelector('input[placeholder="+91 xxxxx xxxxx"]')?.value || "";
    const email  = form.querySelector('input[type="email"]')?.value || "";
    try {
      await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "purchase",
          applicantName: name,
          mobile,
          email,
          fields: { "Name": name, "Mobile": mobile, "Email": email, "SC/ST": scSt || "No", "Karnataka": karnataka || "Not specified" },
        }),
      });
    } catch (_) { /* show popup regardless */ }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar activePage="purchase-site" />
      <div style={{ height: "88px" }} />

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden py-16"
        style={{ background: "linear-gradient(135deg, #071a0e 0%, #0d2818 50%, #071a0e 100%)" }}>
        <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[24rem] h-[24rem] rounded-full pointer-events-none"
          style={{ background: C.green, opacity: 0.1, filter: "blur(80px)" }} />
        <motion.div animate={{ x: [0, -40, 30, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -right-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{ background: C.yellow, opacity: 0.07, filter: "blur(90px)" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-[12px] mb-5"
            style={{ color: "rgba(255,255,255,0.45)" }}>
            <a href="/" className="hover:text-green-400 transition-colors">Home</a>
            <span>/</span>
            <span style={{ color: C.greenMid }}>Purchase of Site</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold mb-5"
            style={{ background: "rgba(34,197,94,0.14)", border: "1px solid rgba(34,197,94,0.35)", color: C.greenMid }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.greenMid }} />
            BMI Housing Co-Op Society
          </motion.div>

          {/* Kannada — large, on top */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-extrabold text-3xl md:text-4xl tracking-tight mb-2 leading-snug"
            style={{ color: "#86efac" }}>
            ನಿವೇಶನ ಖರೀದಿಗಾಗಿ ಅರ್ಜಿ
          </motion.h1>
          {/* English — smaller, below */}
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
            className="font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight mb-5 text-white leading-tight">
            Application for{" "}
            <span style={{ background: `linear-gradient(90deg, ${C.greenMid}, #86efac)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Purchase of Site
            </span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[15px] max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.58)" }}>
            Fill in the form below to apply for a residential plot with Bengaluru Metro City
            Infrastructure Housing Co-Operative Society Ltd.
          </motion.p>

          {/* Quick info chips */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-2">
            {["₹100 Form Fee", "DTCP & BMRDA Approved", "Bank Loan Available", "Govt. Registered"].map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-white"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Intro Letter strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-10 mb-2 px-6 lg:px-0">
        <div className="rounded-2xl px-7 py-5 flex flex-col gap-1"
          style={{ background: C.greenLight, border: `1px solid ${C.border}` }}>
          <p className="text-[13px] font-bold" style={{ color: C.greenDark }}>To,</p>
          <p className="text-[13px] font-bold" style={{ color: C.greenDark }}>The President,</p>
          <p className="text-[14px] font-extrabold tracking-wide" style={{ color: C.greenDark }}>
            Bengaluru Metro City Infrastructure Housing Co-Operative Society Ltd.
          </p>
          <p className="text-[12px] mt-1" style={{ color: C.muted }}>
            1st Cross, 15th Main E Block, Beside Nandana Palace, Sahakarnagar, Bengaluru – 560 092
          </p>
          <p className="text-[13px] mt-3 leading-relaxed" style={{ color: C.body }}>
            <strong>Dear Sir/Madam,</strong><br />
            I wish to apply for a site/plot in the layout being formed by The Bengaluru Metro City
            Infrastructure Housing Co-Operative Society Ltd. I hereby furnish the following particulars
            for your consideration.
          </p>
        </div>
      </motion.div>

      {/* ── FORM ── */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 lg:px-0 py-8 flex flex-col gap-6">

        {/* ── THANK YOU POPUP MODAL ── */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center p-6"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="relative max-w-md w-full rounded-3xl overflow-hidden text-center"
                style={{ background: "#ffffff", boxShadow: "0 32px 80px rgba(0,0,0,0.35)" }}
              >
                <div className="px-8 pt-10 pb-8"
                  style={{ background: "linear-gradient(135deg, #071a0e, #0d2818)" }}>
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(34,197,94,0.2)", border: "3px solid rgba(134,239,172,0.5)" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth={2.5} className="w-10 h-10">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </motion.div>
                  <h2 className="font-extrabold text-2xl text-white mb-2">
                    Thank You for Registering!
                  </h2>
                  <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.65)" }}>
                    Your application for purchase of site has been received.
                  </p>
                </div>
                <div className="px-8 py-7">
                  <div className="p-5 rounded-2xl mb-6"
                    style={{ background: C.bgSection, border: `1.5px solid ${C.border}` }}>
                    <p className="text-[14px] leading-relaxed font-medium" style={{ color: C.body }}>
                      For further steps or to process your application, please contact our
                      <span className="font-bold" style={{ color: C.greenDark }}> Sales Executive</span>.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href="tel:7710556677"
                      className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                      Call: 7710556677
                    </a>
                    <a href="mailto:info@bmihousing.com"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold"
                      style={{ background: C.greenLight, color: C.greenDark, border: `1px solid ${C.border}` }}>
                      info@bmihousing.com
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="py-3 rounded-xl text-[13px] font-medium"
                      style={{ background: "#f3f4f6", color: C.muted }}>
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CARD 1 — Personal Details */}
        <Card number="1" title="Applicant Details" accent={C.green}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}>

          <div className="grid md:grid-cols-2 gap-5">
            <Input label="Full Name of Applicant" required placeholder="As in official records (Block Letters)" className="md:col-span-2" />
            <Input label="Father's / Husband's Name" required placeholder="Full name" />
            <Input label="Date of Birth" required type="date" />
            <Input label="Age" required placeholder="Years" />
            <Input label="Place of Birth" placeholder="City, State" />
          </div>

          {/* Photo Upload Box */}
          <div className="mt-6 flex flex-col sm:flex-row items-start gap-5">
            <div className="flex flex-col items-center gap-2">
              <div className="w-28 h-32 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-green-50 transition-colors"
                style={{ border: `2px dashed ${C.border}`, background: C.bgSection }}>
                <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={1.5} className="w-8 h-8">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="text-[10px] text-center font-semibold" style={{ color: C.muted }}>Applicant<br/>Photo</span>
              </div>
              <span className="text-[10px]" style={{ color: C.muted }}>PP / SS Size (4 copies)</span>
            </div>
            <div className="flex-1 grid md:grid-cols-2 gap-4">
              <div>
                <Label>Gender</Label>
                <div className="flex gap-3 mt-1">
                  {["Male", "Female", "Other"].map(g => (
                    <label key={g} className="flex items-center gap-1.5 cursor-pointer text-[13px]" style={{ color: C.body }}>
                      <input type="radio" name="gender" value={g} className="accent-green-600" />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <Label>Marital Status</Label>
                <div className="flex gap-3 mt-1">
                  {["Single", "Married", "Widowed"].map(s => (
                    <label key={s} className="flex items-center gap-1.5 cursor-pointer text-[13px]" style={{ color: C.body }}>
                      <input type="radio" name="marital" value={s} className="accent-green-600" />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <Input label="Phone (Residential)" placeholder="Landline number" />
              <Input label="Mobile Number" required placeholder="+91 xxxxx xxxxx" />
              <Input label="E-Mail Address" required type="email" placeholder="your@email.com" className="md:col-span-2" />
            </div>
          </div>

          {/* SC/ST */}
          <div className="mt-5 p-4 rounded-xl" style={{ background: C.bgSection, border: `1px solid ${C.border}` }}>
            <Label>Belongs to SC / ST Category?</Label>
            <div className="flex gap-5 mt-2">
              {["Yes — Enclosing Certificate", "No"].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-[13px] font-medium" style={{ color: C.body }}>
                  <input type="radio" name="scst" value={opt} checked={scSt === opt} onChange={() => setScSt(opt)} className="accent-green-600 w-4 h-4" />
                  {opt}
                </label>
              ))}
            </div>
            <AnimatePresence>
              {scSt === "Yes — Enclosing Certificate" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                  className="mt-3">
                  <Label>Certificate Details / Reference Number</Label>
                  <input type="text" placeholder="Certificate reference number" style={baseInput} onFocus={focus} onBlur={blur} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>

        {/* CARD 2 — Address for Correspondence */}
        <Card number="2" title="Address for Correspondence" accent={C.blue}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}>
          <div className="grid md:grid-cols-2 gap-5">
            <Textarea label="Address Line 1" required placeholder="Door No., Street, Area" rows={2} className="md:col-span-2" />
            <Input label="City" required placeholder="City / Town" />
            <Input label="District" placeholder="District" />
            <Input label="State" required placeholder="State" />
            <Input label="PIN Code" required placeholder="560 001" />
          </div>
        </Card>

        {/* CARD 3 — Employment Particulars */}
        <Card number="3" title="Employment Particulars" accent={C.yellow}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>}>
          <div className="grid md:grid-cols-2 gap-5">
            <Input label="Employer / Organization Name" placeholder="Name of employer" className="md:col-span-2" />
            <Textarea label="Place of Employment & Full Address" placeholder="Full address of workplace" rows={3} className="md:col-span-2" />
            <Input label="Designation / Occupation" placeholder="Your designation or trade" />
            <Input label="Monthly Income (Approx.)" placeholder="₹ Amount" />
          </div>

          {/* Karnataka Residency */}
          <div className="mt-5 p-4 rounded-xl" style={{ background: "#fefce8", border: "1px solid #fde68a" }}>
            <Label>Residency / Native Status</Label>
            <p className="text-[12px] mb-3" style={{ color: C.muted }}>Whether the applicant is an ordinary resident or native of Karnataka?</p>
            <div className="flex flex-wrap gap-4">
              {["Ordinary Resident of Karnataka", "Native of Karnataka", "Neither"].map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-[13px] font-medium" style={{ color: C.body }}>
                  <input type="radio" name="karnataka" value={opt} checked={karnataka === opt}
                    onChange={() => setKarnataka(opt)} className="accent-yellow-600 w-4 h-4" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </Card>

        {/* CARD 4 — Nominee Particulars */}
        <Card number="4" title="Nominee Particulars" accent="#9333ea"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}>
          <p className="text-[13px] mb-5" style={{ color: C.muted }}>
            Please provide details of your nominee(s) for this site application.
          </p>
          <TableRows
            columns={[
              { key: "name",         label: "Full Name",     placeholder: "Nominee name" },
              { key: "relationship", label: "Relationship",  placeholder: "e.g. Spouse, Son" },
              { key: "age",          label: "Age",           placeholder: "Age", type: "number" },
              { key: "dob",          label: "Date of Birth", type: "date" },
            ]}
            rows={nomineeRows}
            setRows={setNomineeRows}
            accentColor="#9333ea"
          />
          {/* Nominee photo box */}
          <div className="mt-5 flex items-center gap-4">
            <div className="w-24 h-28 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer"
              style={{ border: "2px dashed #d8b4fe", background: "#faf5ff" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth={1.5} className="w-7 h-7">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span className="text-[10px] text-center font-semibold" style={{ color: "#9333ea" }}>Nominee<br/>Photo</span>
            </div>
            <p className="text-[12px]" style={{ color: C.muted }}>Affix Nominee's PP/SS size photograph here</p>
          </div>
        </Card>

        {/* CARD 5 — Family Members */}
        <Card number="5" title="Family Members Residing with Applicant" accent={C.red}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}>
          <p className="text-[13px] mb-5" style={{ color: C.muted }}>
            Details / Particulars of family members staying with you.
          </p>
          <TableRows
            columns={[
              { key: "name",         label: "Full Name",   placeholder: "Member name" },
              { key: "relationship", label: "Relation",    placeholder: "e.g. Spouse, Son" },
              { key: "age",          label: "Age",         type: "number", placeholder: "Age" },
              { key: "occupation",   label: "Occupation",  placeholder: "Job / Student" },
            ]}
            rows={familyRows}
            setRows={setFamilyRows}
            accentColor={C.red}
          />
        </Card>

        {/* CARD 6 — Plot Preference */}
        <Card number="6" title="Plot / Site Preference" accent={C.greenMid}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>}>
          <div className="grid md:grid-cols-3 gap-5">
            <Select label="Preferred Project" required options={["BMI Garden City", "BMI North Metro City"]} />
            <Select label="Plot Size Preference" options={["30×40 (1200 sqft)", "30×50 (1500 sqft)", "40×60 (2400 sqft)", "50×80 (4000 sqft)"]} />
            <Select label="Payment Plan" options={["Full Payment", "4-EMI Plan", "Bank Loan"]} />
            <Textarea label="Any Special Requirements / Remarks" placeholder="Additional requirements…" rows={3} className="md:col-span-3" />
          </div>
        </Card>

        {/* ── Terms & Conditions ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: C.shadowMd, border: `1px solid ${C.borderGray}` }}>
          <div className="px-7 py-4 flex items-center gap-2"
            style={{ background: `linear-gradient(135deg, ${C.greenDark}, #0d2818)` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth={2} className="w-5 h-5 shrink-0">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9c0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <h3 className="font-bold text-white text-[15px]">Terms &amp; Conditions</h3>
          </div>
          <div className="px-7 py-5" style={{ background: "#f9fafb" }}>
            <ol className="flex flex-col gap-3">
              {[
                "The applicant must be a citizen of India and above 18 years of age.",
                "The application form must be accompanied by the prescribed fee of ₹100.",
                "All information provided in this form must be true and correct. Any false information will result in disqualification.",
                "The Society reserves the right to accept or reject any application without assigning reasons.",
                "Allotment of sites is subject to availability and at the sole discretion of the Board of Directors.",
                "The applicant agrees to abide by the bye-laws and rules of Bengaluru Metro City Infrastructure Housing Co-Operative Society Ltd.",
                "SC/ST category applicants must enclose the certificate issued by the competent authority.",
              ].map((t, i) => (
                <li key={i} className="flex gap-3 text-[13px] leading-relaxed" style={{ color: C.body }}>
                  <span className="w-6 h-6 rounded-full text-[11px] font-bold text-white flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: C.green }}>{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* ── Declaration ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl p-7"
          style={{ background: C.bgWhite, border: `1px solid ${C.border}`, boxShadow: C.shadowMd }}>
          <h3 className="font-bold text-[15px] mb-4" style={{ color: C.text }}>Declaration by Applicant</h3>
          <p className="text-[13px] leading-relaxed mb-6" style={{ color: C.body }}>
            I hereby declare that the information furnished above is true, complete and correct to the
            best of my knowledge and belief. I agree to abide by the rules, bye-laws and regulations of
            Bengaluru Metro City Infrastructure Housing Co-Operative Society Ltd. and any decision taken
            by the Board of Directors shall be binding on me.
          </p>

          {/* Checkboxes */}
          <div className="flex flex-col gap-3 mb-8">
            {[
              "I have read and agree to all the Terms & Conditions stated above.",
              "I confirm that all the details provided are accurate and truthful.",
              "I understand that the ₹100 application form fee is non-refundable.",
            ].map((text, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded accent-green-600" />
                <span className="text-[13px] leading-relaxed" style={{ color: C.body }}>{text}</span>
              </label>
            ))}
          </div>

          {/* Signature row */}
          <div className="grid md:grid-cols-3 gap-5">
            <Input label="Place" required placeholder="Bengaluru" />
            <Input label="Date" required type="date" />
            <div>
              <Label>Signature</Label>
              <div className="h-[46px] rounded-xl flex items-center justify-center text-[12px] font-semibold"
                style={{ border: `1.5px dashed ${C.border}`, background: C.bgSection, color: C.muted }}>
                Applicant&apos;s Signature
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Submit ── */}
        <motion.div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03, boxShadow: `0 14px 40px ${C.green}50` }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-[15px] font-bold text-white relative overflow-hidden group"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, opacity: loading ? 0.75 : 1 }}
          >
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)" }}
              animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.8 }} />
            {loading ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="32" style={{ opacity: 0.3 }}/>
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5 shrink-0">
                <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
              </svg>
            )}
            {loading ? "Submitting…" : "Submit Application for Purchase of Site"}
          </motion.button>
          <motion.a href="/membership"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-[14px] font-bold"
            style={{ background: C.bgWhite, border: `2px solid ${C.border}`, color: C.green }}>
            Apply for Membership →
          </motion.a>
        </motion.div>

        {/* Office reference */}
        <div className="text-center pb-4">
          <p className="text-[12px]" style={{ color: C.muted }}>
            Reg. No: JRB/RGN/CR-13/51578/2022-23 &nbsp;·&nbsp; Ph: 080 66469061 &nbsp;·&nbsp;
            <a href="mailto:info@bmihousing.com" className="hover:underline" style={{ color: C.green }}>info@bmihousing.com</a>
          </p>
        </div>
      </form>

      <SiteFooter />
    </div>
  );
}
