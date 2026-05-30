"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

/* ── Light colour tokens ── */
const C = {
  green:       "#16a34a",
  greenDark:   "#14532d",
  greenLight:  "#dcfce7",
  greenMid:    "#22c55e",
  gold:        "#d97706",
  bg:          "#f5faf5",          // very light mint
  bgCard:      "#ffffff",          // white cards
  border:      "#d1fae5",          // soft green border
  borderHover: "#86efac",          // brighter green on hover
  text:        "#1c3a1c",          // dark green text
  muted:       "#6b7280",          // grey
  heading:     "#14532d",
};

/* ── Document registry ── */
const DOCUMENTS = [
  {
    id:         "site-advance-receipt",
    title:      "Site Advance Receipt",
    desc:       "Official advance payment receipt for your booked site — Garden City",
    category:   "Payment",
    pdf:        "/documents/site-advance-receipt.pdf",
    badge:      "Original",
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
    id:         "booking-confirmation",
    title:      "Site Booking Confirmation",
    desc:       "Confirmation letter with full site details, conditions, and booking terms",
    category:   "Booking",
    pdf:        "/documents/site-booking-confirmation.pdf",
    badge:      "Important",
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
    id:         "booking-receipt",
    title:      "Booking Confirmation Receipt",
    desc:       "Official receipt with site dimensions, amount paid, and preferences",
    category:   "Payment",
    pdf:        "/documents/booking-receipt.pdf",
    badge:      null,
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
    id:         "terms-conditions",
    title:      "Terms & Conditions",
    desc:       "Complete booking conditions, allotment rules, and site regulations",
    category:   "Legal",
    pdf:        "/documents/terms-conditions.pdf",
    badge:      null,
    badgeColor: C.green,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    id:         "affidavit-estamp",
    title:      "e-Stamp Affidavit",
    desc:       "Government of Karnataka non-judicial e-stamp — Article 4 Affidavit",
    category:   "Government",
    pdf:        "/documents/affidavit-estamp.pdf",
    badge:      "Certified",
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
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between px-5 py-3 shrink-0"
            style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ background: C.greenLight, color: C.green }}>
                {doc.icon}
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: C.text }}>{doc.title}</div>
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
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
                style={{ color: C.muted }}
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(doc)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-start p-6 rounded-2xl text-left w-full overflow-hidden transition-all duration-300"
      style={{
        background: hovered ? "#f0fdf4" : C.bgCard,
        border: `1.5px solid ${hovered ? C.borderHover : C.border}`,
        boxShadow: hovered
          ? "0 12px 36px rgba(22,163,74,0.12), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 1px 6px rgba(0,0,0,0.05)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${C.greenMid}, #86efac, ${C.green})`,
          opacity: hovered ? 1 : 0,
        }}
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
          background: hovered ? C.greenLight : "#f0fdf4",
          color: C.green,
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
      <div
        className="flex items-center gap-2 text-[12px] font-semibold transition-colors duration-300"
        style={{ color: hovered ? C.green : C.muted }}
      >
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
   Main Component
───────────────────────────────────────────────────────────── */
export default function MemberPortalClient({ name, phone }) {
  const router = useRouter();
  const [openDoc, setOpenDoc]       = useState(null);
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
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 12px rgba(0,0,0,0.07)",
        }}
      >
        <a href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
            style={{ border: "1.5px solid #d1fae5", background: "#f0fdf4" }}>
            <img src="/bmi-logo.png" alt="BMI" className="w-full h-full object-contain scale-[1.28]" />
          </div>
          <div className="leading-none hidden sm:block">
            <div className="font-bold text-[13px]" style={{ color: C.greenDark }}>BMI Housing</div>
            <div className="text-[9px] tracking-widest uppercase" style={{ color: C.muted }}>Member Portal</div>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold"
            style={{ background: C.greenLight, color: C.green, border: "1px solid #bbf7d0" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Verified Member
          </div>

          <motion.button
            onClick={handleLogout}
            disabled={loggingOut}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-bold"
            style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
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

      {/* ── Welcome Banner ── */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl px-7 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{
            background: `linear-gradient(135deg, ${C.greenDark}, ${C.green})`,
            boxShadow: "0 8px 32px rgba(22,163,74,0.22)",
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-green-200">
                Secure Member Access
              </span>
            </div>
            <h1 className="font-extrabold text-2xl md:text-3xl text-white leading-tight">
              Welcome back,{" "}
              <span className="text-green-200">{name}</span>
            </h1>
            <p className="text-[13px] mt-1 text-green-100">
              Your official BMI Housing documents are ready to view and download.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +91 {phone.slice(0, 5)}·····
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fde68a", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Verified Member
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Documents section ── */}
      <section className="max-w-5xl mx-auto px-6 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ background: C.greenLight, color: C.green, border: "1px solid #bbf7d0" }}
          >
            Member Documents
          </div>
          <h2 className="font-extrabold text-2xl md:text-3xl" style={{ color: C.heading }}>
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
      <section className="max-w-5xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 rounded-2xl p-6"
          style={{ background: "#ffffff", border: "1.5px solid #d1fae5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
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
              <div className="p-2.5 rounded-xl" style={{ background: C.greenLight, color: C.green }}>
                {icon}
              </div>
              <div className="font-extrabold text-xl md:text-2xl" style={{ color: C.heading }}>{value}</div>
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
            background: "#ffffff",
            border: "1.5px solid #d1fae5",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div>
            <div className="font-bold text-[15px] mb-1" style={{ color: C.heading }}>
              Need assistance with your booking?
            </div>
            <div className="text-[13px]" style={{ color: C.muted }}>
              Our relationship managers are available for site visits, payment queries, and allotment updates.
            </div>
          </div>
          <a
            href="tel:+917710556677"
            className="shrink-0 flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-white text-[13px]"
            style={{
              background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
              boxShadow: "0 6px 20px rgba(22,163,74,0.28)",
            }}
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
