"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

const focusStyle = (e) => { e.target.style.borderColor = C.green; e.target.style.boxShadow = `0 0 0 3px ${C.greenLight}`; };
const blurStyle  = (e) => { e.target.style.borderColor = C.borderGray; e.target.style.boxShadow = "none"; };

function Label({ children, required, optional }) {
  return (
    <label className="text-[11px] font-extrabold tracking-[0.15em] uppercase mb-1 block" style={{ color: C.text }}>
      {children}
      {required && <span className="ml-1" style={{ color: C.red }}>*</span>}
      {optional && <span className="ml-1.5 text-[10px] font-semibold normal-case tracking-normal" style={{ color: C.muted }}>(Optional)</span>}
    </label>
  );
}

function Input({ label, required, optional, type = "text", placeholder = "", className = "", readOnly = false, ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <Label required={required} optional={optional}>{label}</Label>}
      <input
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required && !readOnly}
        className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all"
        style={{
          background: readOnly ? C.bgSection : C.bgWhite,
          border: `1.5px solid ${C.borderGray}`,
          color: C.text,
          cursor: readOnly ? "default" : "text",
        }}
        onFocus={readOnly ? undefined : focusStyle}
        onBlur={readOnly ? undefined : blurStyle}
        {...props}
      />
    </div>
  );
}

function Select({ label, required, optional, children, className = "", value, onChange }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <Label required={required} optional={optional}>{label}</Label>}
      <select
        value={value}
        onChange={onChange}
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

function Textarea({ label, required, optional, rows = 3, placeholder = "" }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <Label required={required} optional={optional}>{label}</Label>}
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
      className={`rounded-3xl p-5 sm:p-8 mb-8 ${className}`}
      style={{ background: C.bgWhite, boxShadow: C.shadowLg, border: `1px solid ${C.border}` }}
    >
      {children}
    </motion.div>
  );
}

/* ─── FEE TABLE ROW — read-only ─── */
function FeeRow({ serial, item, rs = "", ps = "", highlight = false }) {
  return (
    <tr style={{ background: highlight ? C.greenLight : "transparent" }}>
      <td className="px-4 py-3 text-center text-[13px] font-bold" style={{ color: C.greenDark, borderBottom: `1px solid ${C.border}` }}>{serial}</td>
      <td className="px-4 py-3 text-[13px]" style={{ color: C.body, borderBottom: `1px solid ${C.border}` }}>{item}</td>
      <td className="px-4 py-3 text-right text-[13px] font-bold" style={{ color: C.text, borderBottom: `1px solid ${C.border}` }}>{rs}</td>
      <td className="px-4 py-3 text-right text-[13px] font-bold" style={{ color: C.text, borderBottom: `1px solid ${C.border}` }}>{ps}</td>
    </tr>
  );
}

/* ══════════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                                */
/* ══════════════════════════════════════════════════════════════ */
export default function MembershipClient() {
  const [tcOpen, setTcOpen]           = useState(false);
  const [checks, setChecks]           = useState({ c1: false });
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [relationship, setRelationship]       = useState("");
  const [otherRelationship, setOtherRelationship] = useState("");
  const [nomineeAddrSame, setNomineeAddrSame] = useState(""); // "" | "permanent" | "correspondence"
  const [sigMode, setSigMode]         = useState("draw"); // "draw" | "upload"
  const [sigDataUrl, setSigDataUrl]   = useState("");
  const [isDrawing, setIsDrawing]     = useState(false);
  const sigCanvasRef                  = useRef(null);
  const lastPosRef                    = useRef(null);

  const [corrAddrM, setCorrAddrM] = useState({ line1: "", line2: "", city: "", district: "", state: "", pin: "", country: "India" });
  const [permAddrM, setPermAddrM] = useState({ line1: "", line2: "", city: "", district: "", state: "", pin: "", country: "India" });
  const [permSameAsCorr, setPermSameAsCorr] = useState(false);
  const [nomineeAddrValueM, setNomineeAddrValueM] = useState("");

  const toggleCheck = (k) => setChecks((p) => ({ ...p, [k]: !p[k] }));

  /* ─── Canvas signature ─── */
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
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const pos = getPos(e, canvas);
    lastPosRef.current = pos;
    setIsDrawing(true);
  }, [getPos]);

  const drawLine = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1c3a1c";
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPosRef.current = pos;
  }, [isDrawing, getPos]);

  const stopDraw = useCallback(() => setIsDrawing(false), []);

  const clearSig = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    setSigDataUrl("");
  };

  const saveSig = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    setSigDataUrl(canvas.toDataURL());
  };

  const handleUploadSig = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setSigDataUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  /* ─── Submit ─── */
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
    const mobile = form.querySelector('input[placeholder="+91 XXXXX XXXXX"]')?.value?.trim() || "";
    const email  = form.querySelector('input[type="email"]')?.value?.trim() || "";
    const dob    = form.querySelector('input[type="date"]')?.value || "";

    if (!checks.c1) {
      alert("Please read and confirm the Declaration before submitting.");
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/submit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "membership",
          applicantName: name,
          mobile,
          email,
          fields: {
            "Name": name,
            "Mobile": mobile,
            "Email": email || "Not provided",
            "Date of Birth": dob || "Not provided",
            "Nominee Relationship": relationship === "Other" ? otherRelationship : (relationship || "Not provided"),
            "Shares Required": "10 (minimum)",
          },
        }),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  };

  /* ─────────────────────────────────────────── */
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar activePage="membership" />
      <div style={{ height: "88px" }} />

      {/* ══ HERO BANNER ══ */}
      <section className="relative overflow-hidden py-16"
        style={{ background: `linear-gradient(135deg, ${C.greenDark} 0%, #0d2818 50%, #071a0e 100%)` }}>
        <motion.div animate={{ x: [0,40,-20,0], y: [0,-30,20,0] }} transition={{ duration: 14, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: C.green, opacity: 0.1, filter: "blur(80px)" }} />
        <motion.div animate={{ x: [0,-40,30,0], y: [0,30,-20,0] }} transition={{ duration: 18, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -right-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{ background: C.yellow, opacity: 0.07, filter: "blur(90px)" }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-[12px] mb-5"
            style={{ color: "rgba(255,255,255,0.45)" }}>
            <a href="/" className="hover:text-green-400 transition-colors">Home</a>
            <span>/</span>
            <span style={{ color: C.greenMid }}>Membership Application</span>
          </motion.div>

          {/* Kannada heading — first */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="font-extrabold text-2xl md:text-3xl tracking-tight mb-4 leading-snug"
            style={{ color: "#86efac" }}>
            ಬಿಎಂಐ ಹೌಸಿಂಗ್ ಸೊಸೈಟಿಗೆ ಸೇರಿ
          </motion.h1>

          {/* badge — below Kannada */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.12 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold mb-4"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: C.greenMid }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Join BMI Housing Society
          </motion.div>

          {/* English heading */}
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
            className="font-extrabold text-xl md:text-2xl tracking-tight text-white mb-4">
            Application for{" "}
            <span style={{ background: `linear-gradient(90deg,${C.greenMid},#86efac)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Membership
            </span>
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[15px] max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.55)" }}>
            Fill in the details below to apply for membership in the BMI Housing Co-operative Society Ltd.
            Fields marked <span style={{ color: C.red }}>*</span> are required.
          </motion.p>
        </div>
      </section>

      {/* ══ FORM ══ */}
      <section className="px-4 md:px-6 lg:px-10 py-14">
        <div className="max-w-5xl mx-auto">

          {/* ── SUCCESS MODAL ── */}
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
                    style={{ background: `linear-gradient(135deg, ${C.greenDark}, #0d2818)` }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "rgba(34,197,94,0.2)", border: "3px solid rgba(134,239,172,0.5)" }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth={2.5} className="w-10 h-10">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </motion.div>
                    <h2 className="font-extrabold text-2xl text-white mb-2">Thank You for Registering!</h2>
                    <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.65)" }}>
                      Your membership application has been received successfully.
                    </p>
                  </div>
                  <div className="px-8 py-7">
                    <div className="flex flex-col gap-3">
                      <a href="tel:7710556677"
                        className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
                        Call: 7710556677
                      </a>
                      <button onClick={() => { window.location.href = "/"; }}
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

          {/* ₹100 note */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3 px-5 py-4 rounded-2xl"
            style={{ background: "#fef9c3", border: `1.5px solid #fbbf24` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth={2} className="w-5 h-5 shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-[13px] font-semibold" style={{ color: "#92400e" }}>
              Application Form Charges: <strong>₹ 100/-</strong> (Non-refundable)
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>

            {/* ══ CARD 1 — APPLICANT DETAILS ══ */}
            <Card delay={0}>
              <CardHeader
                title="Applicant Details"
                subtitle="Personal information as per official records"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
              />

              <div className="mb-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Name of the Applicant" required placeholder="CAPITAL LETTERS AS PER AADHAAR CARD" className="md:col-span-2" />

                  {/* Place of Birth FIRST (swapped) */}
                  <Input label="Place of Birth" required placeholder="City, State" />

                  {/* Father's / Husband's Name SECOND (swapped) */}
                  <Input label="Father's / Husband's Name" required placeholder="Full name" />

                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Date of Birth" required type="date" />
                    <Input label="Age" type="number" placeholder="e.g. 32" />
                  </div>

                  {/* Contact */}
                  <Input label="Phone No. (Residence)" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Input label="Mobile No." required type="tel" placeholder="+91 XXXXX XXXXX" />
                <Input label="E-mail ID" required type="email" placeholder="you@example.com" />
              </div>
            </Card>

            {/* ══ CARD 2 — ADDRESS FOR CORRESPONDENCE ══ */}
            <Card delay={0.05}>
              <CardHeader
                title="Address for Correspondence"
                subtitle="Where you'd like to receive all communications"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
                accent="#dbeafe" iconColor={C.blue}
              />
              <div className="grid gap-5">
                <Input label="Address Line 1" required placeholder="House / Flat / Building name, Street" value={corrAddrM.line1} onChange={e => setCorrAddrM(p => ({...p, line1: e.target.value}))} />
                <Input label="Address Line 2" placeholder="Area / Locality / Landmark" value={corrAddrM.line2} onChange={e => setCorrAddrM(p => ({...p, line2: e.target.value}))} />
                <div className="grid md:grid-cols-3 gap-5">
                  <Input label="City" required placeholder="City" value={corrAddrM.city} onChange={e => setCorrAddrM(p => ({...p, city: e.target.value}))} />
                  <Input label="District" placeholder="District" value={corrAddrM.district} onChange={e => setCorrAddrM(p => ({...p, district: e.target.value}))} />
                  <Input label="State" required placeholder="State" value={corrAddrM.state} onChange={e => setCorrAddrM(p => ({...p, state: e.target.value}))} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="PIN Code" type="text" placeholder="560 001" value={corrAddrM.pin} onChange={e => setCorrAddrM(p => ({...p, pin: e.target.value}))} />
                  <Input label="Country" value={corrAddrM.country} onChange={e => setCorrAddrM(p => ({...p, country: e.target.value}))} readOnly />
                </div>
              </div>
            </Card>

            {/* ══ CARD 3 — PERMANENT ADDRESS ══ */}
            <Card delay={0.08}>
              <CardHeader
                title="Permanent Address"
                subtitle="Your permanent / native address"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                accent="#fef9c3" iconColor={C.yellow}
              />
              <label className="flex items-center gap-2 mb-5 cursor-pointer text-[13px]" style={{ color: C.body }}>
                <input type="checkbox" className="accent-green-600 w-4 h-4" checked={permSameAsCorr} onChange={e => setPermSameAsCorr(e.target.checked)} />
                Same as Correspondence Address
              </label>
              <div className="grid gap-5">
                <Input label="Address Line 1" placeholder="House / Flat / Building name, Street"
                  readOnly={permSameAsCorr}
                  value={permSameAsCorr ? corrAddrM.line1 : permAddrM.line1}
                  onChange={permSameAsCorr ? undefined : e => setPermAddrM(p => ({...p, line1: e.target.value}))} />
                <Input label="Address Line 2" placeholder="Area / Locality / Landmark"
                  readOnly={permSameAsCorr}
                  value={permSameAsCorr ? corrAddrM.line2 : permAddrM.line2}
                  onChange={permSameAsCorr ? undefined : e => setPermAddrM(p => ({...p, line2: e.target.value}))} />
                <div className="grid md:grid-cols-3 gap-5">
                  <Input label="City" placeholder="City"
                    readOnly={permSameAsCorr}
                    value={permSameAsCorr ? corrAddrM.city : permAddrM.city}
                    onChange={permSameAsCorr ? undefined : e => setPermAddrM(p => ({...p, city: e.target.value}))} />
                  <Input label="District" placeholder="District"
                    readOnly={permSameAsCorr}
                    value={permSameAsCorr ? corrAddrM.district : permAddrM.district}
                    onChange={permSameAsCorr ? undefined : e => setPermAddrM(p => ({...p, district: e.target.value}))} />
                  <Input label="State" placeholder="State"
                    readOnly={permSameAsCorr}
                    value={permSameAsCorr ? corrAddrM.state : permAddrM.state}
                    onChange={permSameAsCorr ? undefined : e => setPermAddrM(p => ({...p, state: e.target.value}))} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="PIN Code" placeholder="560 001"
                    readOnly={permSameAsCorr}
                    value={permSameAsCorr ? corrAddrM.pin : permAddrM.pin}
                    onChange={permSameAsCorr ? undefined : e => setPermAddrM(p => ({...p, pin: e.target.value}))} />
                  <Input label="Country" readOnly
                    value={permSameAsCorr ? corrAddrM.country : permAddrM.country} />
                </div>
              </div>
            </Card>

            {/* ══ CARD 4 — DESIGNATION & OFFICE (OPTIONAL) ══ */}
            <Card delay={0.1}>
              <CardHeader
                title="Designation & Full Address of Office"
                subtitle="Employment / business details — Optional"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
                accent="#fce7f3" iconColor="#db2777"
              />
              <div className="mb-3 px-4 py-2 rounded-xl text-[12px] font-semibold inline-flex items-center gap-2"
                style={{ background: "#fce7f3", color: "#db2777", border: "1px solid #fbcfe8" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                This section is optional — fill only if applicable
              </div>
              <div className="grid gap-5 mt-4">
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Employer / Organization Name" optional placeholder="Name of employer or business" />
                  <Input label="Designation / Occupation" optional placeholder="e.g. Software Engineer, Business" />
                </div>
                <Input label="Office / Business Address" optional placeholder="Full office or business address" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                  <Input label="City" optional placeholder="City" />
                  <Input label="State" optional placeholder="State" />
                  <Input label="PIN Code" optional placeholder="PIN" />
                  <Input label="Country" optional placeholder="India" defaultValue="India" readOnly />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Input label="Office Phone No." optional type="tel" placeholder="+91 XXXXX XXXXX" />
                  <Input label="Monthly Income (₹)" optional type="number" placeholder="e.g. 50000" />
                </div>
              </div>
            </Card>

            {/* ══ CARD 5 — NOMINEE PARTICULARS ══ */}
            <Card delay={0.12}>
              <CardHeader
                title="Nominee Particulars"
                subtitle="Details of the person nominated for the membership"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                accent="#fde8d8" iconColor="#ea580c"
              />

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <Input label="Nominee Name" required placeholder="Full name" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Age" type="number" placeholder="e.g. 40" />
                  <Input label="Date of Birth" type="date" />
                </div>

                {/* Relationship — "Other" shows text input */}
                <div className="flex flex-col gap-1">
                  <Select label="Relationship with Applicant" required
                    value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                    <option value="">Select relationship</option>
                    <option>Spouse</option>
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Father</option>
                    <option>Mother</option>
                    <option>Brother</option>
                    <option>Sister</option>
                    <option value="Other">Other</option>
                  </Select>
                  <AnimatePresence>
                    {relationship === "Other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-2">
                        <input
                          type="text"
                          value={otherRelationship}
                          onChange={(e) => setOtherRelationship(e.target.value)}
                          placeholder="Please specify relationship…"
                          className="w-full px-4 py-3 rounded-xl text-[14px] outline-none transition-all"
                          style={{ background: C.bgWhite, border: `1.5px solid ${C.green}`, color: C.text,
                            boxShadow: `0 0 0 3px ${C.greenLight}` }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Input label="Nominee Phone / Mobile" type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>

              {/* Nominee Address with quick-fill buttons */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <Label>Nominee Address</Label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:ml-auto">
                    <motion.button type="button"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        const addr = permSameAsCorr ? corrAddrM : permAddrM;
                        setNomineeAddrSame("permanent");
                        const parts = [addr.line1, addr.line2, addr.city, addr.district, addr.state, addr.pin, addr.country].filter(Boolean);
                        setNomineeAddrValueM(parts.join(", "));
                      }}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all"
                      style={{
                        background: nomineeAddrSame === "permanent" ? C.greenLight : C.bgSection,
                        border: `1.5px solid ${nomineeAddrSame === "permanent" ? C.green : C.borderGray}`,
                        color: nomineeAddrSame === "permanent" ? C.greenDark : C.muted,
                      }}>
                      ✓ Same as Permanent Address
                    </motion.button>
                    <motion.button type="button"
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setNomineeAddrSame("correspondence");
                        const parts = [corrAddrM.line1, corrAddrM.line2, corrAddrM.city, corrAddrM.district, corrAddrM.state, corrAddrM.pin, corrAddrM.country].filter(Boolean);
                        setNomineeAddrValueM(parts.join(", "));
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
                <textarea
                  rows={3}
                  placeholder={
                    nomineeAddrSame === "permanent"
                      ? "Same as Permanent Address (filled automatically)"
                      : nomineeAddrSame === "correspondence"
                      ? "Same as Correspondence Address (filled automatically)"
                      : "Full address of nominee"
                  }
                  readOnly={nomineeAddrSame !== ""}
                  value={nomineeAddrSame !== "" ? nomineeAddrValueM : undefined}
                  className="w-full px-4 py-3 rounded-xl text-[14px] outline-none resize-y transition-all"
                  style={{
                    background: nomineeAddrSame !== "" ? C.bgSection : C.bgWhite,
                    border: `1.5px solid ${nomineeAddrSame !== "" ? C.green : C.borderGray}`,
                    color: nomineeAddrSame !== "" ? C.muted : C.text,
                  }}
                  onFocus={nomineeAddrSame === "" ? focusStyle : undefined}
                  onBlur={nomineeAddrSame === "" ? blurStyle : undefined}
                />
                {nomineeAddrSame !== "" && (
                  <button type="button" onClick={() => { setNomineeAddrSame(""); setNomineeAddrValueM(""); }}
                    className="text-[11px] self-start font-semibold underline" style={{ color: C.muted }}>
                    Clear & enter manually
                  </button>
                )}
              </div>
            </Card>

            {/* ══ CARD 6 — SHARES & FEE DETAILS ══ */}
            <Card delay={0.14}>
              <CardHeader
                title="Shares &amp; Fee Details"
                subtitle="Share application and fee structure"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
                accent="#d1fae5" iconColor={C.green}
              />

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Input label="No. of Shares Required (Minimum 10 = TEN)" required
                    type="number" defaultValue={10} min={10} placeholder="Minimum 10 shares" />
                  <p className="text-[11px] mt-1.5" style={{ color: C.muted }}>
                    Each share value as per Society bye-laws. Minimum 10 shares mandatory.
                  </p>
                </div>
                <Textarea label="Remarks, if any" optional rows={3} placeholder="Any additional information or remarks…" />
              </div>

              {/* FEE TABLE — read-only, preset values */}
              <div>
                <p className="text-[12px] font-extrabold tracking-[0.12em] uppercase mb-3" style={{ color: C.text }}>
                  Fee Details
                </p>
                <div className="overflow-x-auto rounded-2xl" style={{ border: `1.5px solid ${C.border}` }}>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr style={{ background: `linear-gradient(135deg, ${C.greenDark}, #0d2818)` }}>
                        <th className="px-4 py-3 text-[11px] font-bold text-center text-white w-12">Sl.</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-left text-white">Particulars</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-right text-white w-28">Rs.</th>
                        <th className="px-4 py-3 text-[11px] font-bold text-right text-white w-24">Ps.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <FeeRow serial="1" item="Membership Fee" rs="300" ps="00" />
                      <FeeRow serial="2" item="Share Fee" rs="100" ps="00" />
                      <FeeRow serial="3" item="Share Amount (Min. 10 Shares)" rs="2,000" ps="00" />
                      <FeeRow serial="4" item="Admission Fee" rs="100" ps="00" />
                      <FeeRow serial="" item="TOTAL" rs="2,500" ps="00" highlight />
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* ══ CARD 7 — DECLARATION ══ */}
            <Card delay={0.16}>
              <CardHeader
                title="Declaration"
                subtitle="Please read and confirm before submitting"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>}
                accent="#f3e8ff" iconColor="#9333ea"
              />

              {/* Declaration */}
              <div className="p-6 rounded-2xl mb-8" style={{ background: C.bgSection, border: `1.5px solid ${C.border}` }}>
                <p className="text-[13px] font-extrabold mb-4" style={{ color: C.text }}>Declaration</p>
                <div className="text-[13px] leading-relaxed mb-5" style={{ color: C.body }}>
                  <p className="mb-3">
                    I wish to become a member of the <strong style={{ color: C.greenDark }}>BENGALURU METRO CITY INFRASTRUCTURE HOUSING CO-OPERATIVE SOCIETY LTD.</strong>
                  </p>
                  <p className="mb-3">
                    I have read the above conditions and hereby irrevocably undertake to abide by these conditions, the bye-laws of the society and the decisions taken by the Board from time to time, which shall be final and binding on me.
                  </p>
                  <p>
                    I declare that the particulars furnished by me are correct and true to the best of my knowledge.
                  </p>
                </div>
                <motion.div whileHover={{ x: 2 }} className="flex items-start gap-3 cursor-pointer"
                  onClick={() => toggleCheck("c1")}>
                  <div className="mt-0.5 w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all"
                    style={{
                      background: checks.c1 ? C.green : C.bgWhite,
                      border: `2px solid ${checks.c1 ? C.green : C.borderGray}`,
                      boxShadow: checks.c1 ? `0 0 0 3px ${C.greenLight}` : "none",
                    }}>
                    {checks.c1 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-[13px] leading-relaxed select-none font-semibold" style={{ color: C.text }}>
                    I agree to all the above terms, conditions, and the declaration stated above.
                  </span>
                </motion.div>
              </div>

              {/* Place / Date — locked until declaration confirmed */}
              <div className={`grid md:grid-cols-2 gap-5 mt-4 transition-opacity duration-300 ${checks.c1 ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                <Input label="Place" required={checks.c1} placeholder="e.g. Bengaluru" />
                <Input label="Date" type="date" required={checks.c1} />
              </div>
              {!checks.c1 && (
                <p className="text-[11px] mt-2" style={{ color: C.muted }}>↑ Confirm the declaration above to fill in Place &amp; Date</p>
              )}
            </Card>

            {/* ══ CARD 8 — SIGNATURE ══ */}
            <Card delay={0.18}>
              <CardHeader
                title="Signature"
                subtitle="Draw your signature or upload an image of your signature"
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>}
                accent="#e0e7ff" iconColor="#4f46e5"
              />

              {/* Mode tabs */}
              <div className="flex gap-3 mb-5">
                {[{ id: "draw", label: "✍️ Draw Signature" }, { id: "upload", label: "📤 Upload Signature" }].map((m) => (
                  <motion.button key={m.id} type="button"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setSigMode(m.id); setSigDataUrl(""); clearSig(); }}
                    className="px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all"
                    style={{
                      background: sigMode === m.id ? C.greenLight : C.bgSection,
                      border: `2px solid ${sigMode === m.id ? C.green : C.borderGray}`,
                      color: sigMode === m.id ? C.greenDark : C.body,
                    }}>
                    {m.label}
                  </motion.button>
                ))}
              </div>

              {sigMode === "draw" ? (
                <div>
                  <div className="relative rounded-2xl overflow-hidden"
                    style={{ border: `2px solid ${C.border}`, background: "#fff", touchAction: "none" }}>
                    <canvas
                      ref={sigCanvasRef}
                      width={800}
                      height={200}
                      className="w-full"
                      style={{ cursor: "crosshair", display: "block" }}
                      onMouseDown={startDraw}
                      onMouseMove={drawLine}
                      onMouseUp={stopDraw}
                      onMouseLeave={stopDraw}
                      onTouchStart={startDraw}
                      onTouchMove={drawLine}
                      onTouchEnd={stopDraw}
                    />
                    <div className="absolute inset-x-0 bottom-2 text-center pointer-events-none">
                      <span className="text-[11px]" style={{ color: C.borderGray }}>Sign above this line</span>
                    </div>
                    {/* horizontal guide line */}
                    <div className="absolute inset-x-4 bottom-8 h-px pointer-events-none"
                      style={{ background: C.borderGray }} />
                  </div>
                  <div className="flex gap-3 mt-3">
                    <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={clearSig}
                      className="px-4 py-2 rounded-xl text-[12px] font-bold"
                      style={{ background: "#fee2e2", color: "#dc2626", border: "1.5px solid #fecaca" }}>
                      🗑 Clear
                    </motion.button>
                    <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={saveSig}
                      className="px-4 py-2 rounded-xl text-[12px] font-bold"
                      style={{ background: C.greenLight, color: C.greenDark, border: `1.5px solid ${C.border}` }}>
                      ✓ Save Signature
                    </motion.button>
                  </div>
                  {sigDataUrl && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className="mt-3 flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ background: C.greenLight, border: `1px solid ${C.border}` }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={2.5} className="w-4 h-4">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      <span className="text-[12px] font-semibold" style={{ color: C.greenDark }}>Signature saved!</span>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="flex flex-col items-center justify-center rounded-2xl p-8 cursor-pointer transition-all"
                    style={{ border: `2px dashed ${C.green}`, background: C.bgSection, minHeight: "140px" }}>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUploadSig} />
                    {sigDataUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={sigDataUrl} alt="Uploaded signature" className="max-h-24 object-contain" />
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={1.5} className="w-10 h-10 mb-3">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p className="text-[13px] font-bold" style={{ color: C.green }}>Click to upload signature image</p>
                        <p className="text-[11px] mt-1" style={{ color: C.muted }}>PNG, JPG or GIF — max 2MB</p>
                      </>
                    )}
                  </label>
                  {sigDataUrl && (
                    <button type="button" onClick={() => setSigDataUrl("")}
                      className="mt-2 text-[11px] font-semibold underline" style={{ color: C.muted }}>
                      Remove & re-upload
                    </button>
                  )}
                </div>
              )}
            </Card>

            {/* ══ T&C Modal ══ */}
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
                        Application for Membership
                      </p>
                      <ol className="flex flex-col gap-1.5" style={{ listStyleType: "none", padding: 0 }}>
                        {[
                          "Members shall be governed by the Bye-Law of Society, rules and regulations framed by the board from time to time.",
                          "The Board may reject any application without assigning any reason.",
                          "Board shall reserve Right of admission to Members.",
                          "The membership amount is strictly non-refundable, and a separate membership is mandatory for each booking. A single membership cannot be used for multiple bookings.",
                          "Only one booking is permitted under a single individual's name. Any additional booking requests must be made under a different membership and name.",
                          "Further installments of site deposits shall be payable by the applicant as per the installment structure provided and informed. In case of belated remittances, a 10% interest shall be charged, if not complied with, the Board shall have the right to reject the application for site purchase.",
                          "Member shall visit the society periodically and update the addresses & telephone Nos. Non-receipt of communication shall not be considered as a valid reason, for belated payments.",
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

            {/* T&C asterisk link */}
            <div className="flex justify-end mb-1">
              <button type="button" onClick={() => setTcOpen(true)}
                className="text-[11px] font-semibold hover:underline transition-colors"
                style={{ color: C.muted }}>
                <span style={{ color: C.red }}>*</span> Terms &amp; Conditions
              </button>
            </div>

            {/* ══ SUBMIT ══ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <p className="text-[13px]" style={{ color: C.muted }}>
                Ensure all required fields are filled before submitting.
              </p>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04, boxShadow: `0 12px 32px ${C.green}55` }}
                whileTap={{ scale: 0.97 }}
                className="relative px-14 py-4 rounded-2xl text-[15px] font-extrabold text-white overflow-hidden group"
                style={{ background: `linear-gradient(135deg,${C.green},${C.greenDark})`, boxShadow: `0 4px 16px ${C.green}44` }}>
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{ background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.2) 50%,transparent 65%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }} />
                <span className="relative flex items-center gap-2">
                  {loading ? (
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="32" style={{ opacity: 0.4 }}/>
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                      <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
                    </svg>
                  )}
                  {loading ? "Submitting…" : "Submit Membership Application"}
                </span>
              </motion.button>
            </motion.div>

          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
