"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";

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
  shadowMd:   "0 4px 12px rgba(0,0,0,0.08)",
  shadowLg:   "0 10px 30px rgba(0,0,0,0.12)",
};

const inputBase = {
  background: "#ffffff",
  border: `1.5px solid #e5e7eb`,
  color: "#1c3a1c",
  borderRadius: "12px",
  padding: "12px 16px",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  transition: "all 0.2s",
};

function inp(ref) {
  return {
    onFocus: (e) => { e.target.style.border = `1.5px solid ${C.green}`; e.target.style.boxShadow = `0 0 0 3px ${C.greenLight}`; },
    onBlur:  (e) => { e.target.style.border = `1.5px solid ${C.borderGray}`; e.target.style.boxShadow = "none"; },
  };
}

/* ─── Label ─── */
function Lbl({ children, required }) {
  return (
    <label className="block text-[11px] font-extrabold tracking-[0.15em] uppercase mb-1.5" style={{ color: C.text }}>
      {children}{required && <span className="ml-1" style={{ color: C.red }}>*</span>}
    </label>
  );
}

/* ─── Address block ─── */
function Addr({ label }) {
  return (
    <div>
      <Lbl>{label}</Lbl>
      <input type="text" placeholder="Address Line 1" style={inputBase} {...inp()} className="mb-1" />
      <p className="text-[11px] mb-2" style={{ color: C.muted }}>Address Line 1</p>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <input type="text" placeholder="City" style={inputBase} {...inp()} />
          <p className="text-[11px] mt-1" style={{ color: C.muted }}>City</p>
        </div>
        <div>
          <input type="text" placeholder="State / Province / Region" style={inputBase} {...inp()} />
          <p className="text-[11px] mt-1" style={{ color: C.muted }}>State / Province / Region</p>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationClient() {
  const [payment, setPayment] = useState("online");
  const [checks, setChecks] = useState({ c1: false, c2: false, c3: false });
  const [submitted, setSubmitted] = useState(false);

  const toggle = (k) => setChecks((p) => ({ ...p, [k]: !p[k] }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar activePage="application-registration" />
      <div style={{ height: "88px" }} />

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden py-16"
        style={{ background: `linear-gradient(135deg, ${C.greenDark} 0%, #0d2818 50%, #071a0e 100%)` }}>
        <motion.div animate={{ x: [0,40,-20,0], y:[0,-30,20,0] }} transition={{ duration:14, repeat:Infinity, ease:"easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: C.greenMid, opacity:0.1, filter:"blur(80px)" }} />
        <motion.div animate={{ x:[0,-40,30,0], y:[0,30,-20,0] }} transition={{ duration:18, repeat:Infinity, ease:"easeInOut", delay:2 }}
          className="absolute -bottom-20 -right-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{ background: C.yellow, opacity:0.07, filter:"blur(90px)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="flex items-center justify-center gap-2 text-[12px] mb-5"
            style={{ color:"rgba(255,255,255,0.45)" }}>
            <a href="/home-v1" className="hover:text-green-400 transition-colors">Home</a>
            <span>/</span>
            <span style={{ color: C.greenMid }}>Application Registration</span>
          </motion.div>
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold mb-5"
            style={{ background:"rgba(34,197,94,0.12)", border:"1px solid rgba(34,197,94,0.3)", color:C.greenMid }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
            </svg>
            BMI Housing Co-Op Society
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
            className="font-extrabold text-4xl md:text-5xl tracking-tight text-white mb-4">
            Application{" "}
            <span style={{ background:`linear-gradient(90deg,${C.greenMid},#86efac)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Registration Form
            </span>
          </motion.h1>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
            className="text-[15px] max-w-xl mx-auto" style={{ color:"rgba(255,255,255,0.55)" }}>
            Submit your application to register with BMI Housing. Fields marked <span style={{ color:C.red }}>*</span> are required.
          </motion.p>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="px-4 md:px-6 lg:px-10 py-16">
        <div className="max-w-6xl mx-auto">

          <AnimatePresence>
            {submitted && (
              <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                className="mb-8 p-5 rounded-2xl flex items-center gap-4"
                style={{ background: C.greenLight, border:`1.5px solid ${C.green}` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: C.green }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-5 h-5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div className="font-bold text-[15px]" style={{ color: C.greenDark }}>Application Submitted Successfully!</div>
                  <div className="text-[13px]" style={{ color: C.body }}>Our team will contact you at 7710556677 shortly.</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">

            {/* ── Card 1: Applicant Info ── */}
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
              className="rounded-3xl overflow-hidden" style={{ boxShadow: C.shadowLg }}>
              {/* Card top bar */}
              <div className="px-8 py-5 flex items-center gap-3"
                style={{ background:`linear-gradient(90deg, ${C.green}, ${C.greenMid})` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-6 h-6 shrink-0">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <h2 className="font-extrabold text-[17px] text-white tracking-wide">Applicant Information</h2>
              </div>
              <div className="bg-white px-8 py-8">
                {/* Row 1 */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div><Lbl required>Name of the Applicant</Lbl><input type="text" style={inputBase} {...inp()} /></div>
                  <div><Lbl>Date of Birth</Lbl><input type="date" style={inputBase} {...inp()} /></div>
                  <div><Lbl>Place of Birth</Lbl><input type="text" placeholder="City, State" style={inputBase} {...inp()} /></div>
                </div>
                {/* Row 2 */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div><Lbl>Father / Husband Name</Lbl><input type="text" style={inputBase} {...inp()} /></div>
                  {/* Mobile */}
                  <div>
                    <Lbl>Mobile Number</Lbl>
                    <div className="flex gap-2">
                      <select style={{ ...inputBase, width:"90px", flexShrink:0 }} {...inp()}>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                      </select>
                      <input type="tel" placeholder="081234 56789" style={{ ...inputBase, flex:1 }} {...inp()} />
                    </div>
                  </div>
                  <div><Lbl required>Email ID</Lbl><input type="email" placeholder="you@example.com" style={inputBase} {...inp()} /></div>
                </div>
                {/* Row 3 — Addresses */}
                <div className="grid md:grid-cols-3 gap-8">
                  <Addr label="Correspondence Address" />
                  <Addr label="Permanent Address" />
                  <Addr label="Office Address" />
                </div>
              </div>
            </motion.div>

            {/* ── Card 2: Nominee Particulars ── */}
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.05 }}
              className="rounded-3xl overflow-hidden" style={{ boxShadow: C.shadowLg }}>
              <div className="px-8 py-5 flex items-center gap-3"
                style={{ background:`linear-gradient(90deg, #d97706, #f59e0b)` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-6 h-6 shrink-0">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <h2 className="font-extrabold text-[17px] text-white tracking-wide">Nominee Particulars</h2>
              </div>
              <div className="bg-white px-8 py-8">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div><Lbl required>Name</Lbl><input type="text" style={inputBase} {...inp()} /></div>
                  <div><Lbl>Age</Lbl><input type="number" placeholder="e.g. 35" style={inputBase} {...inp()} /></div>
                  <div><Lbl>Address</Lbl><input type="text" placeholder="Full address" style={inputBase} {...inp()} /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Lbl>No. of Shares Required (Min. 10)</Lbl>
                    <input type="number" placeholder="Minimum 10" min={10} style={inputBase} {...inp()} />
                  </div>
                  <div>
                    <Lbl>Remarks, if any</Lbl>
                    <textarea rows={4} placeholder="Any additional remarks..."
                      style={{ ...inputBase, resize:"vertical" }}
                      onFocus={(e)=>{ e.target.style.border=`1.5px solid ${C.green}`; e.target.style.boxShadow=`0 0 0 3px ${C.greenLight}`; }}
                      onBlur={(e)=>{ e.target.style.border=`1.5px solid ${C.borderGray}`; e.target.style.boxShadow="none"; }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Card 3: Payment & Terms ── */}
            <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }}
              className="rounded-3xl overflow-hidden" style={{ boxShadow: C.shadowLg }}>
              <div className="px-8 py-5 flex items-center gap-3"
                style={{ background:`linear-gradient(90deg, #dc2626, #ef4444)` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-6 h-6 shrink-0">
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                <h2 className="font-extrabold text-[17px] text-white tracking-wide">Payment &amp; Declaration</h2>
              </div>
              <div className="bg-white px-8 py-8">

                {/* Payment mode */}
                <p className="text-[12px] font-extrabold tracking-[0.15em] uppercase mb-4" style={{ color: C.text }}>
                  Amount Paid Along With The Membership Application
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {[
                    { id:"online",  label:"ONLINE",
                      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
                    { id:"cheque",  label:"CHEQUE",
                      icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
                  ].map((opt) => (
                    <motion.button key={opt.id} type="button"
                      onClick={() => setPayment(opt.id)}
                      whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                      className="flex items-center gap-3 px-7 py-3.5 rounded-2xl text-[13px] font-bold transition-all"
                      style={{
                        background: payment===opt.id ? C.greenLight : C.bgSection,
                        border:`2px solid ${payment===opt.id ? C.green : C.borderGray}`,
                        color: payment===opt.id ? C.greenDark : C.body,
                        boxShadow: payment===opt.id ? `0 0 0 3px ${C.greenLight}` : "none",
                      }}>
                      {/* radio dot */}
                      <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                        style={{ borderColor: payment===opt.id ? C.green : C.muted }}>
                        {payment===opt.id && <div className="w-2 h-2 rounded-full" style={{ background: C.green }} />}
                      </div>
                      <span style={{ color: payment===opt.id ? C.green : C.body }}>{opt.icon}</span>
                      {opt.label}
                    </motion.button>
                  ))}
                </div>

                {/* Terms checkboxes */}
                <p className="font-extrabold text-[14px] mb-5" style={{ color: C.text }}>Terms &amp; Conditions</p>
                <div className="flex flex-col gap-4 mb-8">
                  {[
                    { k:"c1", text:"I wish to become a member of the BMI Housing." },
                    { k:"c2", text:"I Have read the above conditions and hereby irrevocably undertake to abide by these conditions, the bye-laws of the society and the decisions taken by the Board from time to time, Which shall be final and binding on me." },
                    { k:"c3", text:"I declare that the particulars furnished by me are correct and true to best of my knowledge." },
                  ].map(({ k, text }) => (
                    <motion.label key={k} whileHover={{ x:2 }} className="flex items-start gap-3 cursor-pointer">
                      <div onClick={() => toggle(k)}
                        className="mt-0.5 w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all duration-200"
                        style={{
                          background: checks[k] ? C.green : C.bgWhite,
                          border:`2px solid ${checks[k] ? C.green : C.borderGray}`,
                          boxShadow: checks[k] ? `0 0 0 3px ${C.greenLight}` : "none",
                        }}>
                        {checks[k] && <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-3 h-3"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span className="text-[13px] leading-relaxed" style={{ color: C.body }}>{text}</span>
                    </motion.label>
                  ))}
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[13px]" style={{ color: C.muted }}>
                    By submitting, you confirm the above declaration.
                  </p>
                  <motion.button type="submit"
                    whileHover={{ scale:1.04, boxShadow:`0 12px 32px ${C.green}55` }}
                    whileTap={{ scale:0.97 }}
                    className="relative px-14 py-4 rounded-2xl text-[15px] font-extrabold text-white overflow-hidden group"
                    style={{ background:`linear-gradient(135deg, ${C.green}, ${C.greenDark})`, boxShadow:`0 4px 16px ${C.green}44` }}>
                    <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                      style={{ background:"linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)" }}
                      animate={{ x:["-100%","100%"] }} transition={{ duration:1.2, repeat:Infinity, repeatDelay:0.6 }} />
                    <span className="relative flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                        <path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/>
                      </svg>
                      Submit
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

          </form>

          {/* ── TERMS & CONDITIONS ── */}
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
            className="mt-10 rounded-3xl overflow-hidden" style={{ boxShadow: C.shadowLg }}>
            {/* Header */}
            <div className="px-8 py-10 text-center"
              style={{ background:`linear-gradient(135deg, ${C.greenDark}, #0d2818)` }}>
              <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold mb-4"
                style={{ background:"rgba(34,197,94,0.15)", border:"1px solid rgba(34,197,94,0.3)", color:C.greenMid }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                Legal
              </motion.div>
              <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight text-white">
                Terms &amp;{" "}
                <span style={{ background:`linear-gradient(90deg,${C.greenMid},#86efac)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                  Conditions
                </span>
              </h2>
            </div>
            {/* Conditions */}
            <div className="px-8 py-10" style={{ background: C.bgWhite }}>
              <div className="max-w-4xl mx-auto flex flex-col gap-4">
                {[
                  "Members shall be governed by the Bye-Law of Society, rules and regulations framed by the board from time to time.",
                  "The Board May reject any application without assigning any reason.",
                  "Board shall reserve Right of Admission to members.",
                  "Further installments of site deposits shall be payable by the applicants as an when demanded by society. 10% interest shall be charged on belated remittances.",
                  "Member shall visit the society periodically and update the addresses & telephone Nos. Non-receipt of communication shall not be considered as a valid reason, for belated payments.",
                ].map((term, i) => (
                  <motion.div key={i}
                    initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }} transition={{ delay: i*0.08 }}
                    className="flex items-start gap-5 p-5 rounded-2xl"
                    style={{ background: C.bgSection, border:`1px solid ${C.border}` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-extrabold shrink-0"
                      style={{ background: C.greenLight, color: C.greenDark }}>{i+1}</div>
                    <p className="text-[14px] leading-relaxed pt-1.5" style={{ color: C.body }}>{term}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
