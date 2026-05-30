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
  text:       "#1c3a1c",
  body:       "#374151",
  muted:      "#6b7280",
  border:     "#d1fae5",
  borderGray: "#e5e7eb",
  red:        "#dc2626",
  shadowLg:   "0 12px 36px rgba(0,0,0,0.10)",
};

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

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-[11px] font-extrabold tracking-[0.15em] uppercase mb-1.5" style={{ color: C.text }}>
        {label}{required && <span className="ml-1" style={{ color: C.red }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const INFO_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Head Office",
    value: "1st Cross, 15th Main E Block, Beside Nandana Palace, Sahakarnagar, Bengaluru-560092",
    href: "https://maps.app.goo.gl/uSXL9N2KSsUHkz5o7",
    external: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "Mobile",
    value: "7710556677",
    href: "tel:7710556677",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "Landline",
    value: "080 66469061",
    href: "tel:08066469061",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "info@bmihousing.com",
    href: "mailto:info@bmihousing.com",
  },
];

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [project, setProject]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const f = e.target;
    const data = {
      name:    f.querySelector('[name="name"]')?.value || "",
      phone:   f.querySelector('[name="phone"]')?.value || "",
      email:   f.querySelector('[name="email"]')?.value || "",
      subject: f.querySelector('[name="subject"]')?.value || "",
      message: f.querySelector('[name="message"]')?.value || "",
      project,
    };
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (_) {}
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <NavBar activePage="contact" />
      <div style={{ height: "88px" }} />

      {/* ── Hero ── */}
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
            <span style={{ color: C.greenMid }}>Contact Us</span>
          </motion.div>

          {/* Logo */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden"
              style={{ border: "3px solid rgba(255,255,255,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bmi-logo.png" alt="BMI Housing" className="w-full h-full object-contain scale-[1.28]" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold mb-5"
            style={{ background: "rgba(34,197,94,0.14)", border: "1px solid rgba(34,197,94,0.35)", color: C.greenMid }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.greenMid }} />
            BMI Housing Co-Op Society
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-3 text-white">
            Get in{" "}
            <span style={{ background: `linear-gradient(90deg, ${C.greenMid}, #86efac)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Touch
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[15px] max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.58)" }}>
            Interested in a site visit or have a question? Fill in the form and our team will reach out to you shortly.
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ── Left: Info panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65 }}
          className="lg:col-span-2 flex flex-col gap-6">

          {/* Company card */}
          <div className="rounded-2xl overflow-hidden" style={{ background: C.bgWhite, boxShadow: C.shadowLg, border: `1px solid ${C.borderGray}` }}>
            <div className="px-6 py-5 flex items-center gap-4"
              style={{ background: `linear-gradient(135deg, ${C.greenDark}, #0d2818)` }}>
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"
                style={{ border: "2px solid rgba(255,255,255,0.25)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/bmi-logo.png" alt="BMI Housing" className="w-full h-full object-contain scale-[1.28]" />
              </div>
              <div>
                <div className="font-extrabold text-[15px] text-white leading-tight">
                  Bengaluru Metro City Infrastructure
                </div>
                <div className="text-[11px] font-semibold tracking-wide mt-0.5" style={{ color: "#86efac" }}>
                  Housing Co-Operative Society Ltd.
                </div>
              </div>
            </div>

            <div className="divide-y" style={{ divideColor: C.borderGray }}>
              {INFO_ITEMS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex items-start gap-4 px-6 py-4"
                  style={{ borderBottom: i < INFO_ITEMS.length - 1 ? `1px solid ${C.borderGray}` : "none" }}
                >
                  <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                    style={{ background: C.greenLight, color: C.green }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold tracking-[0.2em] uppercase mb-0.5" style={{ color: C.muted }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="text-[13px] font-semibold leading-snug hover:underline"
                        style={{ color: C.text }}>
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-[13px] font-semibold leading-snug" style={{ color: C.text }}>{item.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>

        {/* ── Right: Contact form ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65 }}
          className="lg:col-span-3">

          <div className="rounded-2xl overflow-hidden" style={{ background: C.bgWhite, boxShadow: C.shadowLg, border: `1px solid ${C.borderGray}` }}>
            <div className="flex items-center gap-3 px-7 py-5"
              style={{ background: `linear-gradient(135deg, ${C.green}12, ${C.green}06)`, borderBottom: `2px solid ${C.green}30` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-[16px]" style={{ color: C.text }}>Send us a Message</h2>
                <p className="text-[12px]" style={{ color: C.muted }}>We&apos;ll get back to you within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-7 flex flex-col gap-5">

              {/* Thank you modal */}
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
                          style={{ background: "rgba(34,197,94,0.2)", border: "3px solid rgba(134,239,172,0.5)" }}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth={2.5} className="w-10 h-10">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </motion.div>
                        <h2 className="font-extrabold text-2xl text-white mb-2">Message Sent!</h2>
                        <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.65)" }}>
                          Our team will get back to you shortly.
                        </p>
                      </div>
                      <div className="px-8 py-7">
                        <div className="flex flex-col gap-3">
                          <a href="tel:7710556677"
                            className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-bold text-white"
                            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            Call: 7710556677
                          </a>
                          <button onClick={() => setSubmitted(false)}
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

              {/* Name + Phone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Your Name" required>
                  <input name="name" type="text" required placeholder="Full name"
                    style={baseInput} onFocus={focus} onBlur={blur} />
                </Field>
                <Field label="Phone Number" required>
                  <input name="phone" type="tel" required placeholder="+91 XXXXX XXXXX"
                    style={baseInput} onFocus={focus} onBlur={blur} />
                </Field>
              </div>

              {/* Email */}
              <Field label="Email Address">
                <input name="email" type="email" placeholder="your@email.com"
                  style={baseInput} onFocus={focus} onBlur={blur} />
              </Field>

              {/* Project Interest */}
              <Field label="Project Interest">
                <select
                  value={project} onChange={e => setProject(e.target.value)}
                  style={{ ...baseInput, appearance: "none", cursor: "pointer" }}
                  onFocus={focus} onBlur={blur}>
                  <option value="">Select a project…</option>
                  <option>BMI North Metro City</option>
                  <option>BMI Garden City</option>
                  <option>Both Projects</option>
                  <option>General Enquiry</option>
                </select>
              </Field>

              {/* Subject */}
              <Field label="Subject" required>
                <select name="subject" required
                  style={{ ...baseInput, appearance: "none", cursor: "pointer" }}
                  onFocus={focus} onBlur={blur}>
                  <option value="">Select subject…</option>
                  <option>Site Visit Request</option>
                  <option>Plot Pricing Enquiry</option>
                  <option>Membership Application</option>
                  <option>Payment / EMI Enquiry</option>
                  <option>Documents / Legal Enquiry</option>
                  <option>Other</option>
                </select>
              </Field>

              {/* Message */}
              <Field label="Message">
                <textarea name="message" rows={4} placeholder="Write your message or any specific questions here…"
                  style={{ ...baseInput, resize: "vertical" }}
                  onFocus={focus} onBlur={blur} />
              </Field>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.03, boxShadow: `0 14px 40px ${C.green}50` }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 py-4 rounded-xl text-[15px] font-bold text-white relative overflow-hidden group"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, opacity: loading ? 0.75 : 1 }}>
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
                {loading ? "Sending…" : "Send Message"}
              </motion.button>

              <p className="text-center text-[12px]" style={{ color: C.muted }}>
                Or call us directly at{" "}
                <a href="tel:7710556677" className="font-bold hover:underline" style={{ color: C.green }}>7710556677</a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      <SiteFooter />
    </div>
  );
}
