"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

/* ── Color tokens ── */
const C = {
  green:       "#16a34a",
  greenDark:   "#14532d",
  greenLight:  "#dcfce7",
  greenMid:    "#22c55e",
  greenGlow:   "rgba(34,197,94,0.12)",
  gold:        "#d97706",
  bg:          "#030d07",
  bgCard:      "rgba(16,40,20,0.7)",
  border:      "rgba(34,197,94,0.14)",
  borderHover: "rgba(34,197,94,0.35)",
  text:        "#f0fdf4",
  muted:       "rgba(240,253,244,0.5)",
};

/* ── Document registry ── */
const DOCUMENTS = [
  {
    id:       "site-advance-receipt",
    title:    "Site Advance Receipt",
    desc:     "Official advance payment receipt for your booked site — Garden City",
    category: "Payment",
    pdf:      "/documents/site-advance-receipt.pdf",
    badge:    "Original",
    badgeColor: C.gold,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <path d="M9 7h6M9 11h6M9 15h4"/>
        <path d="M16 17l2 2 4-4" strokeWidth={2}/>
      </svg>
    ),
  },
  {
    id:       "booking-confirmation",
    title:    "Site Booking Confirmation",
    desc:     "Confirmation letter with full site details, conditions, and booking terms",
    category: "Booking",
    pdf:      "/documents/site-booking-confirmation.pdf",
    badge:    "Important",
    badgeColor: "#dc2626",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <polyline points="9 15 11 17 15 13"/>
      </svg>
    ),
  },
  {
    id:       "booking-receipt",
    title:    "Booking Confirmation Receipt",
    desc:     "Official receipt with site dimensions, amount paid, and preferences",
    category: "Payment",
    pdf:      "/documents/booking-receipt.pdf",
    badge:    null,
    badgeColor: C.green,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M21 5H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z"/>
        <path d="M1 10h22"/>
        <path d="M7 15h2M12 15h5"/>
      </svg>
    ),
  },
  {
    id:       "terms-conditions",
    title:    "Terms & Conditions",
    desc:     "Complete booking conditions, allotment rules, and site regulations",
    category: "Legal",
    pdf:      "/documents/terms-conditions.pdf",
    badge:    null,
    badgeColor: C.green,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    id:       "affidavit-estamp",
    title:    "e-Stamp Affidavit",
    desc:     "Government of Karnataka non-judicial e-stamp — Article 4 Affidavit",
    category: "Government",
    pdf:      "/documents/affidavit-estamp.pdf",
    badge:    "Certified",
    badgeColor: "#7c3aed",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
        <path d="M9.5 9.5A4.5 4.5 0 1 1 12 16.5"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────
   PDF Viewer Modal
───────────────────────────────────────────────────────────── */
function PDFModal({ doc, onClose }) {
  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ background: "rgba(0,0,0,0.95)" }}
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between px-5 py-3 shrink-0"
            style={{ background: "#061009", borderBottom: "1px solid rgba(34,197,94,0.2)" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ background: "rgba(34,197,94,0.12)", color: C.greenMid }}>
                {doc.icon}
              </div>
              <div>
                <div className="font-bold text-white text-sm">{doc.title}</div>
                <div className="text-[11px]" style={{ color: C.muted }}>{doc.category}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={doc.pdf}
                download
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download
              </a>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </motion.div>

          {/* PDF frame */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src={`${doc.pdf}#toolbar=1&navpanes=0`}
              className="w-full h-full border-0"
              title={doc.title}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Document Card
───────────────────────────────────────────────────────────── */
function DocCard({ doc, index, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(doc)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-start p-6 rounded-2xl text-left w-full overflow-hidden group transition-all duration-300"
      style={{
        background: hovered ? "rgba(16,45,20,0.9)" : C.bgCard,
        border: `1px solid ${hovered ? C.borderHover : C.border}`,
        backdropFilter: "blur(16px)",
        boxShadow: hovered ? `0 16px 48px rgba(22,163,74,0.14)` : "0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      {/* Category line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${C.greenMid}, transparent)`, opacity: hovered ? 1 : 0.3 }}
      />

      {/* Badge */}
      {doc.badge && (
        <div
          className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-white"
          style={{ background: doc.badgeColor }}
        >
          {doc.badge}
        </div>
      )}

      {/* Icon */}
      <div
        className="p-3 rounded-xl mb-4 transition-colors duration-300"
        style={{
          background: hovered ? "rgba(34,197,94,0.18)" : "rgba(34,197,94,0.09)",
          color: C.greenMid,
        }}
      >
        {doc.icon}
      </div>

      {/* Category */}
      <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: C.gold }}>
        {doc.category}
      </div>

      {/* Title */}
      <div className="font-bold text-[15px] mb-1.5 leading-snug" style={{ color: C.text }}>
        {doc.title}
      </div>

      {/* Description */}
      <div className="text-[12px] leading-relaxed mb-5 flex-1" style={{ color: C.muted }}>
        {doc.desc}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 text-[12px] font-semibold transition-colors duration-300"
        style={{ color: hovered ? C.greenMid : "rgba(34,197,94,0.65)" }}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        Open Document
        <motion.span animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.2 }}>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </motion.span>
      </div>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   Dashboard preview — rendered inside ContainerScroll card
───────────────────────────────────────────────────────────── */
function DashboardPreview({ name }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#061009" }}>
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 shrink-0"
        style={{ background: "#030d07", borderBottom: "1px solid rgba(34,197,94,0.1)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div
          className="flex-1 flex items-center gap-1.5 px-3 py-1 mx-4 rounded-md text-[10px]"
          style={{ background: "rgba(34,197,94,0.06)", color: "rgba(240,253,244,0.35)", border: "1px solid rgba(34,197,94,0.1)" }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-2.5 h-2.5">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          portal.bmihousing.com/member-portal
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 shrink-0 p-3 flex flex-col gap-1"
          style={{ background: "#030d07", borderRight: "1px solid rgba(34,197,94,0.08)" }}>
          <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bmi-logo.png" className="w-5 h-5 rounded-full object-contain" alt="BMI" />
            <span className="text-[9px] font-bold" style={{ color: C.greenMid }}>BMI Housing</span>
          </div>
          {["Dashboard", "My Documents", "Payment History", "Site Details", "Support"].map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[9px] font-medium"
              style={{
                background: i === 1 ? "rgba(34,197,94,0.12)" : "transparent",
                color: i === 1 ? C.greenMid : "rgba(240,253,244,0.35)",
                borderLeft: i === 1 ? `2px solid ${C.greenMid}` : "2px solid transparent",
              }}
            >
              {item}
            </div>
          ))}
          <div className="mt-auto px-2 py-1.5">
            <div className="text-[8px] mb-1" style={{ color: C.muted }}>Member Status</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] text-green-400 font-semibold">Active</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* Welcome bar */}
          <div
            className="rounded-xl p-3 mb-3 flex items-center justify-between"
            style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(34,197,94,0.15)" }}
          >
            <div>
              <div className="text-[8px]" style={{ color: C.muted }}>Welcome back</div>
              <div className="text-[11px] font-bold" style={{ color: C.text }}>{name}</div>
            </div>
            <div className="text-[8px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "rgba(34,197,94,0.15)", color: C.greenMid }}>
              Verified Member
            </div>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="relative rounded-xl overflow-hidden" style={{ height: "80px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/garden-overview.png" alt="GC" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-1.5 left-2 text-[8px] font-bold text-white">Garden City</div>
              <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[7px] text-white font-bold"
                style={{ background: "rgba(22,163,74,0.9)" }}>
                Active
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ height: "80px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/north-metro-overview.png" alt="NMC" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-1.5 left-2 text-[8px] font-bold text-white">North Metro City</div>
            </div>
          </div>

          {/* Documents mini list */}
          <div className="text-[8px] font-semibold mb-1.5 uppercase tracking-wider" style={{ color: C.muted }}>
            Documents ({DOCUMENTS.length})
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {DOCUMENTS.slice(0, 4).map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg"
                style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.1)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 shrink-0" style={{ color: C.greenMid }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span className="text-[8px] truncate" style={{ color: "rgba(240,253,244,0.6)" }}>{d.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────── */
export default function MemberPortalClient({ name, phone }) {
  const router       = useRouter();
  const [openDoc, setOpenDoc]     = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      <PDFModal doc={openDoc} onClose={() => setOpenDoc(null)} />

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 px-6 py-3 flex items-center justify-between"
        style={{
          background: "rgba(3,13,7,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(34,197,94,0.1)",
        }}
      >
        <a href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
            style={{ border: "1.5px solid rgba(34,197,94,0.3)" }}>
            <img src="/bmi-logo.png" alt="BMI" className="w-7 h-7 object-contain" />
          </div>
          <div className="leading-none hidden sm:block">
            <div className="font-bold text-[13px]" style={{ color: C.greenMid }}>BMI Housing</div>
            <div className="text-[9px] tracking-widest uppercase" style={{ color: C.muted }}>Member Portal</div>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium"
            style={{ background: "rgba(34,197,94,0.1)", color: C.greenMid, border: "1px solid rgba(34,197,94,0.2)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Verified Member
          </div>

          <motion.button
            onClick={handleLogout}
            disabled={loggingOut}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold"
            style={{ background: "rgba(220,38,38,0.12)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)" }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            {loggingOut ? "Signing out..." : "Sign Out"}
          </motion.button>
        </div>
      </header>

      {/* ── Hero ContainerScroll ── */}
      <div style={{ background: `linear-gradient(to bottom, ${C.bg}, #061209 60%, ${C.bg})` }}>
        <ContainerScroll
          titleComponent={
            <div className="mb-4">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5"
                style={{
                  background: "rgba(34,197,94,0.1)",
                  color: C.greenMid,
                  border: "1px solid rgba(34,197,94,0.25)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Secure Member Access
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-extrabold text-4xl md:text-6xl leading-[1.1] mb-4"
                style={{ color: C.text }}
              >
                Welcome back,{" "}
                <span
                  style={{
                    background: `linear-gradient(90deg, ${C.greenMid}, #86efac)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {name}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[15px] max-w-xl mx-auto"
                style={{ color: C.muted }}
              >
                Your exclusive access to official BMI Housing receipts, booking confirmations, and certified legal documents.
              </motion.p>

              {/* Member info pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap items-center justify-center gap-3 mt-6"
              >
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold"
                  style={{ background: "rgba(34,197,94,0.1)", color: C.greenMid, border: "1px solid rgba(34,197,94,0.2)" }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  +91 {phone.slice(0, 5)}·····
                </div>
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold"
                  style={{ background: "rgba(215,119,6,0.1)", color: C.gold, border: "1px solid rgba(215,119,6,0.2)" }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Reg. No: JRB/RGN/CR-13/51578/2022-23
                </div>
              </motion.div>
            </div>
          }
        >
          <DashboardPreview name={name} />
        </ContainerScroll>
      </div>

      {/* ── Documents section ── */}
      <section className="max-w-5xl mx-auto px-6 pb-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ background: "rgba(34,197,94,0.08)", color: C.greenMid, border: "1px solid rgba(34,197,94,0.15)" }}
          >
            Member Documents
          </div>
          <h2 className="font-extrabold text-2xl md:text-3xl" style={{ color: C.text }}>
            Your Official Records
          </h2>
          <p className="text-[13px] mt-1.5" style={{ color: C.muted }}>
            Tap any document to view or download. All records are secured and accessible only to you.
          </p>
        </motion.div>

        {/* Document grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOCUMENTS.map((doc, i) => (
            <DocCard key={doc.id} doc={doc} index={i} onOpen={setOpenDoc} />
          ))}
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 rounded-2xl p-6"
          style={{ background: "rgba(16,40,20,0.5)", border: "1px solid rgba(34,197,94,0.12)" }}
        >
          {[
            { label: "Documents Available", value: DOCUMENTS.length.toString(), icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            )},
            { label: "Active Projects", value: "2", icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
            )},
            { label: "Membership Status", value: "Active", icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            )},
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <div className="p-2 rounded-lg" style={{ background: "rgba(34,197,94,0.1)", color: C.greenMid }}>
                {icon}
              </div>
              <div className="font-extrabold text-xl md:text-2xl" style={{ color: C.text }}>{value}</div>
              <div className="text-[11px]" style={{ color: C.muted }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 p-6 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, rgba(20,83,45,0.5), rgba(22,163,74,0.15))`,
            border: "1px solid rgba(34,197,94,0.2)",
          }}
        >
          <div>
            <div className="font-bold text-[15px] mb-1" style={{ color: C.text }}>
              Need assistance with your booking?
            </div>
            <div className="text-[13px]" style={{ color: C.muted }}>
              Our relationship managers are available for site visits, payment queries, and allotment updates.
            </div>
          </div>
          <a
            href="tel:+917710556677"
            className="shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-white text-[13px]"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, boxShadow: `0 8px 24px rgba(22,163,74,0.3)` }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call: 77105 56677
          </a>
        </motion.div>
      </section>
    </div>
  );
}
