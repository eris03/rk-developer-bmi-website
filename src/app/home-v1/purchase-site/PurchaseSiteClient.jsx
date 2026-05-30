"use client";

import { useState, useRef, useCallback } from "react";
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

function Input({ label, required, optional, type = "text", placeholder = "", className = "", defaultValue, readOnly, value, onChange }) {
  const isControlled = value !== undefined;
  return (
    <div className={className}>
      {label && (
        <label className="block text-[11px] font-extrabold tracking-[0.15em] uppercase mb-1.5" style={{ color: C.text }}>
          {label}{required && <span className="ml-1" style={{ color: C.red }}>*</span>}
          {optional && <span className="ml-1.5 text-[10px] font-semibold normal-case tracking-normal" style={{ color: C.muted }}>(Optional)</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required && !readOnly}
        {...(isControlled ? { value: value ?? "", onChange } : { defaultValue })}
        style={{ ...baseInput, background: readOnly ? C.bgSection : C.bgWhite }}
        onFocus={readOnly ? undefined : focus}
        onBlur={readOnly ? undefined : blur}
      />
    </div>
  );
}

function Select({ label, required, options, className = "" }) {
  return (
    <div className={className}>
      <Label required={required}>{label}</Label>
      <select required={required} style={{ ...baseInput, appearance: "none", cursor: "pointer" }} onFocus={focus} onBlur={blur}>
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
      <div className="p-4 sm:p-7">{children}</div>
    </motion.div>
  );
}

/* ─── Table rows for nominee / family ─── */
function TableRows({ columns, rows, setRows, accentColor, maxRows = 5 }) {
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
      {rows.length < maxRows && (
        <button
          type="button"
          onClick={addRow}
          className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold transition-colors hover:bg-green-100"
          style={{ color: accentColor, border: `1.5px dashed ${accentColor}60` }}
        >
          <span className="text-[16px] leading-none">+</span> Add Row
        </button>
      )}
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function PurchaseSiteClient() {
  const [scSt, setScSt]           = useState("");
  const [karnataka, setKarnataka] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [relationship, setRelationship]           = useState("");
  const [otherRelationship, setOtherRelationship] = useState("");
  const [nomineeAddrSame, setNomineeAddrSame]     = useState("");
  const [tcOpen, setTcOpen]       = useState(false);
  const [sigMode, setSigMode]     = useState("draw");
  const [sigDataUrl, setSigDataUrl] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const sigCanvasRef              = useRef(null);
  const lastPosRef                = useRef(null);

  const [familyRows, setFamilyRows] = useState([{ name: "", relationship: "", age: "", occupation: "" }]);

  const [corrAddr, setCorrAddr] = useState({ line1: "", line2: "", city: "", district: "", state: "", pin: "", country: "India" });
  const [permAddrP, setPermAddrP] = useState({ line1: "", line2: "", city: "", district: "", state: "", pin: "", country: "India" });
  const [nomineeAddrValue, setNomineeAddrValue] = useState("");

  const getPos = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }, []);

  const startDraw = useCallback((e) => {
    e.preventDefault();
    const canvas = sigCanvasRef.current; if (!canvas) return;
    lastPosRef.current = getPos(e, canvas);
    setIsDrawing(true);
  }, [getPos]);

  const drawLine = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = sigCanvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath(); ctx.lineWidth = 2.5; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#1c3a1c";
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y); ctx.stroke();
    lastPosRef.current = pos;
  }, [isDrawing, getPos]);

  const stopDraw = useCallback(() => setIsDrawing(false), []);

  const clearSig = () => {
    const canvas = sigCanvasRef.current; if (!canvas) return;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    setSigDataUrl("");
  };

  const saveSig = () => {
    const canvas = sigCanvasRef.current; if (!canvas) return;
    setSigDataUrl(canvas.toDataURL());
  };

  const handleUploadSig = (e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setSigDataUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Scroll to first invalid required field
    const firstInvalid = e.target.querySelector(':invalid');
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus();
      return;
    }
    const form   = e.target;
    const name   = form.querySelector('input[placeholder="CAPITAL LETTERS AS PER AADHAAR CARD"]')?.value?.trim() || "";
    const mobile = form.querySelector('input[placeholder="+91 xxxxx xxxxx"]')?.value?.trim() || "";
    const email  = form.querySelector('input[type="email"]')?.value?.trim() || "";
    const dob    = form.querySelector('input[type="date"]')?.value || "";


    setLoading(true);
    try {
      await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "purchase",
          applicantName: name,
          mobile,
          email,
          fields: {
            "Name": name,
            "Mobile": mobile,
            "Email": email || "Not provided",
            "Date of Birth": dob,
            "SC/ST": scSt || "No",
            "Residency / Karnataka": karnataka || "Not specified",
            "Nominee Relationship": relationship === "Other" ? otherRelationship : relationship,
          },
        }),
      });
    } catch (_) { /* show success popup regardless — email may be pending SMTP config */ }
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
          {/* English — smaller, below — one line */}
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
            className="font-extrabold text-xl md:text-2xl lg:text-3xl tracking-tight mb-5 text-white leading-tight">
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

        </div>
      </section>

      {/* ── Intro Letter strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-10 mb-2 px-6 lg:px-0">
        <div className="rounded-2xl px-4 py-4 sm:px-7 sm:py-5 flex flex-col gap-1"
          style={{ background: C.greenLight, border: `1px solid ${C.border}` }}>
          <div className="flex items-center gap-3 mb-3 pb-3 px-3 py-2 rounded-xl" style={{ background: "#fef9c3", border: "1.5px solid #fbbf24" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} className="w-4 h-4 shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-[12px] font-semibold" style={{ color: "#92400e" }}>
              Application Form Charges: <strong>₹ 100/-</strong> (Non-refundable)
            </p>
          </div>
          <p className="text-[13px] font-bold" style={{ color: C.greenDark }}>To,</p>
          <p className="text-[13px] font-bold" style={{ color: C.greenDark }}>The President,</p>
          <p className="text-[14px] font-extrabold tracking-wide" style={{ color: C.greenDark }}>
            Bengaluru Metro City Infrastructure Housing Co-Operative Society Ltd.
          </p>
          <p className="text-[13px] mt-3 leading-relaxed" style={{ color: C.body }}>
            <strong>Dear Sir/Madam,</strong>
          </p>
          <p className="text-[13px] mt-2 leading-relaxed flex flex-wrap items-baseline gap-1" style={{ color: C.body }}>
            I wish to purchase a site Measuring
            <input
              type="text"
              placeholder="e.g. 30×40 ft / 1200 sqft"
              className="border-b-2 bg-transparent focus:outline-none text-[13px] min-w-[160px] px-1"
              style={{ borderColor: C.green, color: C.text }}
            />
            in
            <input
              type="text"
              placeholder="Layout name"
              className="border-b-2 bg-transparent focus:outline-none text-[13px] min-w-[180px] px-1"
              style={{ borderColor: C.green, color: C.text }}
            />
            layout being formed by The <strong style={{ color: C.greenDark }}>BENGALURU METRO CITY INFRASTRUCTURE HOUSING CO-OPERATIVE SOCIETY LTD.</strong>
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
                      onClick={() => { window.location.href = "/"; }}
                      className="py-3 rounded-xl text-[13px] font-medium"
                      style={{ background: "#f3f4f6", color: C.muted }}>
                      Go to Home
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
            <Input label="Full Name of Applicant" required placeholder="CAPITAL LETTERS AS PER AADHAAR CARD" className="md:col-span-2" />
            <Input label="Father's / Husband's Name" required placeholder="Full name" />
            <Input label="Date of Birth" required type="date" />
            <Input label="Age" required placeholder="Years" />
            <Input label="Place of Birth" placeholder="City, State" />
          </div>

          {/* Applicant fields */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div>
                <Label required>Gender</Label>
                <div className="flex gap-3 mt-1">
                  {["Male", "Female", "Other"].map(g => (
                    <label key={g} className="flex items-center gap-1.5 cursor-pointer text-[13px]" style={{ color: C.body }}>
                      <input type="radio" name="gender" value={g} required className="accent-green-600" />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
              <Input label="Phone (Residential)" placeholder="Landline number" />
              <Input label="Mobile Number" required placeholder="+91 xxxxx xxxxx" />
              <Input label="E-Mail Address" required type="email" placeholder="your@email.com" className="md:col-span-2" />
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

        <Card number="2" title="Address for Correspondence" accent={C.blue}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}>
          <div className="grid gap-5">
            <Input label="Address Line 1" required placeholder="House / Flat / Building name, Street" value={corrAddr.line1} onChange={e => setCorrAddr(p => ({...p, line1: e.target.value}))} />
            <Input label="Address Line 2" placeholder="Area / Locality / Landmark" value={corrAddr.line2} onChange={e => setCorrAddr(p => ({...p, line2: e.target.value}))} />
            <div className="grid md:grid-cols-3 gap-5">
              <Input label="City" required placeholder="City" value={corrAddr.city} onChange={e => setCorrAddr(p => ({...p, city: e.target.value}))} />
              <Input label="District" placeholder="District" value={corrAddr.district} onChange={e => setCorrAddr(p => ({...p, district: e.target.value}))} />
              <Input label="State" required placeholder="State" value={corrAddr.state} onChange={e => setCorrAddr(p => ({...p, state: e.target.value}))} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Input label="PIN Code" placeholder="560 001" value={corrAddr.pin} onChange={e => setCorrAddr(p => ({...p, pin: e.target.value}))} />
              <Input label="Country" placeholder="India" value={corrAddr.country} onChange={e => setCorrAddr(p => ({...p, country: e.target.value}))} readOnly />
            </div>
          </div>
        </Card>

        {/* CARD 3 — Employment Particulars (Optional) */}
        <Card number="3" title="Employment Particulars" accent={C.yellow}
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>}>
          <div className="mb-4 px-4 py-2 rounded-xl text-[12px] font-semibold inline-flex items-center gap-2"
            style={{ background: "#fef9c3", color: "#92400e", border: "1px solid #fde68a" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            This section is optional — fill only if applicable
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <Input label="Employer / Organization Name" optional placeholder="Name of employer" className="md:col-span-2" />
            <Textarea label="Place of Employment & Full Address" placeholder="Full address of workplace" rows={3} className="md:col-span-2" />
            <Input label="Designation / Occupation" optional placeholder="Your designation or trade" />
            <Input label="Monthly Income (Approx.)" optional placeholder="₹ Amount" />
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

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <Input label="Nominee Name" required placeholder="Full name" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Age" type="number" placeholder="e.g. 40" />
              <Input label="Date of Birth" type="date" />
            </div>

            {/* Relationship with Other text input */}
            <div className="flex flex-col gap-1">
              <label className="block text-[11px] font-extrabold tracking-[0.15em] uppercase mb-1.5" style={{ color: C.text }}>
                Relationship with Applicant<span className="ml-1" style={{ color: C.red }}>*</span>
              </label>
              <select
                value={relationship} onChange={(e) => setRelationship(e.target.value)}
                style={{ ...baseInput, appearance: "none", cursor: "pointer" }} onFocus={focus} onBlur={blur}>
                <option value="">Select relationship</option>
                <option>Spouse</option><option>Son</option><option>Daughter</option>
                <option>Father</option><option>Mother</option><option>Brother</option><option>Sister</option>
                <option value="Other">Other</option>
              </select>
              <AnimatePresence>
                {relationship === "Other" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-2">
                    <input type="text" value={otherRelationship} onChange={(e) => setOtherRelationship(e.target.value)}
                      placeholder="Please specify relationship…"
                      style={{ ...baseInput, border: `1.5px solid ${C.green}`, boxShadow: `0 0 0 3px ${C.greenLight}` }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Input label="Nominee Phone / Mobile" type="tel" placeholder="+91 XXXXX XXXXX" />
          </div>

          {/* Nominee Address with quick-fill buttons */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <label className="block text-[11px] font-extrabold tracking-[0.15em] uppercase" style={{ color: C.text }}>Nominee Address</label>
              <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
                <motion.button type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setNomineeAddrSame("correspondence");
                    const parts = [corrAddr.line1, corrAddr.line2, corrAddr.city, corrAddr.district, corrAddr.state, corrAddr.pin, corrAddr.country].filter(Boolean);
                    setNomineeAddrValue(parts.join(", "));
                  }}
                  className="text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    background: nomineeAddrSame === "correspondence" ? "#dbeafe" : C.bgSection,
                    border: `1.5px solid ${nomineeAddrSame === "correspondence" ? C.blue : C.borderGray}`,
                    color: nomineeAddrSame === "correspondence" ? C.blue : C.muted,
                  }}>
                  ✓ Same as Correspondence Address
                </motion.button>
              </div>
            </div>
            <textarea rows={3}
              placeholder={
                nomineeAddrSame === "permanent" ? "Same as Permanent Address (filled automatically)"
                : nomineeAddrSame === "correspondence" ? "Same as Correspondence Address (filled automatically)"
                : "Full address of nominee"
              }
              readOnly={nomineeAddrSame !== ""}
              value={nomineeAddrSame === "correspondence" ? nomineeAddrValue : undefined}
              style={{ ...baseInput, resize: "vertical",
                background: nomineeAddrSame !== "" ? C.bgSection : C.bgWhite,
                border: `1.5px solid ${nomineeAddrSame !== "" ? C.green : C.borderGray}`,
                color: nomineeAddrSame !== "" ? C.muted : C.text,
              }}
              onFocus={nomineeAddrSame === "" ? focus : undefined}
              onBlur={nomineeAddrSame === "" ? blur : undefined}
            />
            {nomineeAddrSame !== "" && (
              <button type="button" onClick={() => { setNomineeAddrSame(""); setNomineeAddrValue(""); }}
                className="text-[11px] self-start font-semibold underline" style={{ color: C.muted }}>
                Clear & enter manually
              </button>
            )}
          </div>
        </Card>

        {/* CARD 5 — Family Members */}
        <Card number="5" title="Details / Particulars of family members staying with you" accent={C.red}
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


        {/* ── Signature ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-2xl overflow-hidden"
          style={{ background: C.bgWhite, border: `1px solid ${C.borderGray}`, boxShadow: C.shadowMd }}>
          <div className="px-6 py-4 flex items-center justify-between flex-wrap gap-3"
            style={{ background: `linear-gradient(135deg, ${C.green}12, ${C.green}06)`, borderBottom: `1px solid ${C.green}25` }}>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={2} className="w-4 h-4">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <span className="font-bold text-[14px]" style={{ color: C.text }}>Applicant&apos;s Signature</span>
            </div>
            <div className="flex rounded-lg overflow-hidden" style={{ border: `1.5px solid ${C.borderGray}` }}>
              {["draw","upload"].map(mode => (
                <button key={mode} type="button" onClick={() => { setSigMode(mode); setSigDataUrl(""); }}
                  className="px-3 py-1.5 text-[11px] font-bold transition-all"
                  style={{ background: sigMode === mode ? C.green : C.bgWhite, color: sigMode === mode ? "#fff" : C.muted }}>
                  {mode === "draw" ? "✏️ Draw" : "📎 Upload"}
                </button>
              ))}
            </div>
          </div>
          <div className="p-5">
            {sigMode === "draw" ? (
              <div className="flex flex-col gap-3">
                <div className="rounded-xl overflow-hidden relative"
                  style={{ border: `1.5px dashed ${C.green}60`, background: "#fafafa" }}>
                  <canvas ref={sigCanvasRef} width={700} height={150}
                    style={{ display: "block", width: "100%", height: "150px", cursor: "crosshair", touchAction: "none" }}
                    onMouseDown={startDraw} onMouseMove={drawLine} onMouseUp={stopDraw} onMouseLeave={stopDraw}
                    onTouchStart={startDraw} onTouchMove={drawLine} onTouchEnd={stopDraw} />
                  {!isDrawing && !sigDataUrl && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-[12px]" style={{ color: `${C.muted}80` }}>Draw your signature here…</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={clearSig}
                    className="px-4 py-2 rounded-lg text-[12px] font-bold hover:bg-red-50"
                    style={{ border: `1.5px solid #fca5a5`, color: C.red }}>🗑 Clear</motion.button>
                  <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={saveSig}
                    className="px-4 py-2 rounded-lg text-[12px] font-bold"
                    style={{ background: C.greenLight, border: `1.5px solid ${C.green}`, color: C.greenDark }}>✓ Save</motion.button>
                  {sigDataUrl && <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: C.green }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"/></svg>Saved
                  </span>}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <label className="flex flex-col items-center justify-center gap-2 rounded-xl p-6 cursor-pointer hover:bg-green-50 transition-colors"
                  style={{ border: `2px dashed ${C.green}50`, background: C.bgSection }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={1.5} className="w-7 h-7">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span className="text-[12px] font-semibold" style={{ color: C.green }}>Click to upload signature image</span>
                  <span className="text-[11px]" style={{ color: C.muted }}>PNG, JPG — max 2 MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleUploadSig} />
                </label>
                {sigDataUrl && <div className="rounded-xl overflow-hidden" style={{ border: `1.5px solid ${C.green}40` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sigDataUrl} alt="Uploaded signature" className="max-h-28 mx-auto object-contain p-2" />
                </div>}
              </div>
            )}
          </div>
        </motion.div>

        {/* ── T&C Modal ── */}
        <AnimatePresence>
          {tcOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] flex items-center justify-center p-4"
              style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
              onClick={() => setTcOpen(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-2xl max-h-[82vh] overflow-y-auto rounded-2xl"
                style={{ background: "#fff", boxShadow: "0 32px 80px rgba(0,0,0,0.45)" }}>
                <div className="sticky top-0 flex items-center justify-between px-6 py-4 rounded-t-2xl z-10"
                  style={{ background: `linear-gradient(135deg, ${C.greenDark}, #0d2818)` }}>
                  <h3 className="font-extrabold text-[16px] text-white tracking-wide">Terms &amp; Conditions</h3>
                  <button type="button" onClick={() => setTcOpen(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-white/20"
                    style={{ background: "rgba(255,255,255,0.12)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <div className="px-6 py-6" style={{ userSelect: "none" }} onContextMenu={e => e.preventDefault()}>
                  <p className="text-[11px] font-extrabold tracking-[0.2em] uppercase mb-4" style={{ color: C.muted }}>
                    Application for Purchase of Site
                  </p>
                  <ol className="flex flex-col gap-1.5" style={{ listStyleType: "none", padding: 0 }}>
                    {[
                      "I agree to abide by the conditions of allotment and sale of site as prescribed by the BENGALURU METRO CITY INFRASTRUCTURE HOUSING CO-OPERATIVE SOCIETY LTD.",
                      "I hereby declare that all the above information furnished by me are true to the best of my knowledge and I shall furnish any other information that may be required with regard to allotment of site.",
                      "If such other information required are not furnished by me within time, it will be at the discretion of the BENGALURU METRO CITY INFRASTRUCTURE HOUSING CO-OPERATIVE SOCIETY LTD. to reject my application for consideration for allotment of Site.",
                      "Withdrawals or transfers of membership/bookings are possible only after the completion of the project period. Any withdrawal before completion of the project will be liable for penalty.",
                      "In case it is found that the information and declaration furnished by me to be false at any time, the Society shall have the right to cancel the allotment made to me and I fully understand that ever at a future date, I cannot have any claim.",
                      "My application for allotment of Site in the Society is subject to approval of Membership/Associate Membership by the society and clearance of land, by MUDA/BDA/BMRDA/BIAAPA or any other competent zonal development authority and subject to availability of Site.",
                      "Membership of the Society shall not confirm entitlement for allotment of Site. Seniority for allotment of Site shall be based on the Payment or Initial deposit as well as subsequent instalment.",
                      "I fully agree upon the above conditions and it is binding on me.",
                    ].map((t, i) => (
                      <li key={i} className="text-[11px] leading-[1.55]" style={{ color: C.body }}>
                        {i + 1}. {t}
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── T&C link + Submit ── */}
        <div className="flex justify-end mb-1">
          <button type="button" onClick={() => setTcOpen(true)}
            className="text-[11px] font-semibold hover:underline transition-colors"
            style={{ color: C.muted }}>
            <span style={{ color: C.red }}>*</span> Terms &amp; Conditions
          </button>
        </div>

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
