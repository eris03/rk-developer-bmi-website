"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";

/* ─── COLOR TOKENS ─── */
const C = {
  bg:         "#030d07",
  bgWhite:    "#ffffff",
  bgSection:  "#f8fef8",
  bgGray:     "#f3f4f6",
  bgDark:     "#071a0e",
  bgDark2:    "#0a1628",
  green:      "#16a34a",
  greenDark:  "#14532d",
  greenLight: "#dcfce7",
  greenMid:   "#22c55e",
  greenFoot:  "#a8d5a2",
  yellow:     "#d97706",
  yellowLight:"#fef9c3",
  red:        "#dc2626",
  redLight:   "#fee2e2",
  blue:       "#1e3a8a",
  blueLight:  "#dbeafe",
  text:       "#1c3a1c",
  body:       "#374151",
  muted:      "#6b7280",
  border:     "#d1fae5",
  borderGray: "#e5e7eb",
  shadow:     "0 1px 3px rgba(0,0,0,0.08)",
  shadowMd:   "0 4px 12px rgba(0,0,0,0.08)",
  shadowLg:   "0 10px 30px rgba(0,0,0,0.12)",
};

const CHECKLIST = [
  "Project layout maps & plot details",
  "DTCP & BMRDA approvals",
  "Pricing & 4-EMI payment plan",
  "Amenities & infrastructure highlights",
  "Payment modes & bank account details",
];

export default function EBrochureClient() {
  const [openPage, setOpenPage] = useState(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setOpenPage(null); };
    if (openPage) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openPage]);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>

      {/* ── Floating animated background blobs ── */}
      {[
        { top: "-10%", left: "-5%",  size: 600, color: C.greenMid, dur: 16 },
        { top: "30%",  left: "70%",  size: 500, color: C.yellow,   dur: 20 },
        { top: "65%",  left: "5%",   size: 450, color: C.blue,     dur: 14 },
        { top: "80%",  left: "55%",  size: 400, color: C.greenMid, dur: 22 },
        { top: "15%",  left: "40%",  size: 350, color: C.red,      dur: 18 },
        { top: "50%",  left: "25%",  size: 300, color: C.yellow,   dur: 24 },
      ].map((b, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 30 * (i % 2 === 0 ? 1 : -1), -20 * (i % 3 === 0 ? 1 : -1), 0],
            y: [0, -25 * (i % 2 === 0 ? 1 : -1), 18, 0],
          }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          style={{
            position: "fixed",
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: "50%",
            background: b.color,
            opacity: 0.06,
            filter: "blur(80px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* ════════════════════════════════════
          NAVIGATION — shared NavBar
      ════════════════════════════════════ */}
      <NavBar activePage="e-brochure" />

      {/* ════════════════════════════════════
          HERO — full screen two-column
      ════════════════════════════════════ */}
      <section
        className="relative z-10"
        style={{ paddingTop: "88px" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-10 w-full">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-start py-16 lg:py-20">

            {/* LEFT — animated text content (sticky while image scrolls) */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky"
              style={{ top: "110px" }}
            >
              {/* Badge tag */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.3)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke={C.greenMid} strokeWidth={2} className="w-3.5 h-3.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span className="text-[11px] font-bold tracking-[0.35em] uppercase" style={{ color: C.greenMid }}>
                  E-BROCHURE
                </span>
              </motion.div>

              {/* Kannada heading — large */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-extrabold text-2xl md:text-3xl lg:text-4xl leading-snug mb-3"
                style={{ color: "#86efac" }}
              >
                ಬೆಂಗಳೂರು ಮೆಟ್ರೋ ಸಿಟಿ ಇನ್‌ಫ್ರಾಸ್ಟ್ರಕ್ಚರ್ ಹೌಸಿಂಗ್<br />
                ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ ಲಿ.
              </motion.h1>

              {/* English sub-heading — smaller */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="text-[17px] md:text-[19px] font-semibold leading-snug mb-3"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Bengaluru Metro City Infrastructure Housing<br />
                Co-Operative Society Ltd
              </motion.p>

              {/* Reg No */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-8"
                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke={C.greenMid} strokeWidth={2} className="w-4 h-4 shrink-0">
                  <circle cx="12" cy="8" r="5"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
                </svg>
                <span className="text-[12px] font-semibold" style={{ color: C.greenMid }}>
                  Reg No. JRB/RGN/CR-13/51578/2022-23
                </span>
              </motion.div>

              {/* Download button */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: `0 12px 36px ${C.green}55` }}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex items-center gap-3 px-9 py-4 rounded-xl text-[14px] font-bold text-white overflow-hidden group"
                  style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, boxShadow: `0 4px 20px ${C.green}44` }}
                >
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)" }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.4 }}
                  />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 shrink-0">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download E-Brochure — Free
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT — both brochure pages side by side */}
            <div className="relative">
              {/* Open-book two-page spread */}
              <div className="flex gap-3 sm:gap-4 items-start">

                {/* Front page */}
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)", rotateY: -8 }}
                  animate={{ clipPath: "inset(0 0% 0 0)", rotateY: 0 }}
                  whileHover={{ scale: 1.025, boxShadow: `0 24px 70px rgba(0,0,0,0.65), 0 0 0 2px rgba(34,197,94,0.5)` }}
                  transition={{ duration: 1.1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                  onClick={() => setOpenPage("front")}
                  className="flex-1 rounded-xl overflow-hidden cursor-pointer group"
                  style={{
                    boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    transformOrigin: "right center",
                  }}
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5"
                    style={{ background: "rgba(34,197,94,0.15)", borderBottom: "1px solid rgba(34,197,94,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.greenMid }} />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: C.greenMid }}>Front Page</span>
                  </div>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/bmi-happy.png"
                      alt="BMI Housing E-Brochure Front Page"
                      className="w-full h-auto"
                      style={{ display: "block" }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(3,13,7,0.45)" }}>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{ background: "rgba(34,197,94,0.25)", border: "1px solid rgba(34,197,94,0.5)", backdropFilter: "blur(8px)" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={C.greenMid} strokeWidth={2} className="w-4 h-4">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                        <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: C.greenMid }}>View Full</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Spine divider */}
                <div className="shrink-0 self-stretch w-px opacity-30" style={{ background: C.greenMid }} />

                {/* Back page */}
                <motion.div
                  initial={{ clipPath: "inset(0 0% 0 100%)", rotateY: 8 }}
                  animate={{ clipPath: "inset(0 0% 0 0%)", rotateY: 0 }}
                  whileHover={{ scale: 1.025, boxShadow: `0 24px 70px rgba(0,0,0,0.65), 0 0 0 2px rgba(34,197,94,0.5)` }}
                  transition={{ duration: 1.1, delay: 0.65, ease: [0.76, 0, 0.24, 1] }}
                  onClick={() => setOpenPage("back")}
                  className="flex-1 rounded-xl overflow-hidden cursor-pointer group"
                  style={{
                    boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    transformOrigin: "left center",
                  }}
                >
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5"
                    style={{ background: "rgba(34,197,94,0.15)", borderBottom: "1px solid rgba(34,197,94,0.2)" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.greenMid }} />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: C.greenMid }}>Back Page</span>
                  </div>
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/ebrochure-back.jpg"
                      alt="BMI Housing E-Brochure Back Page"
                      className="w-full h-auto"
                      style={{ display: "block" }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(3,13,7,0.45)" }}>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{ background: "rgba(34,197,94,0.25)", border: "1px solid rgba(34,197,94,0.5)", backdropFilter: "blur(8px)" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={C.greenMid} strokeWidth={2} className="w-4 h-4">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                        <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: C.greenMid }}>View Full</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-2xl whitespace-nowrap"
                style={{
                  background: "rgba(3,13,7,0.88)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${C.greenMid}35`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.5)`,
                }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${C.greenMid}20`, border: `1px solid ${C.greenMid}40`, color: C.greenMid }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[15px]" style={{ color: C.greenMid }}>2,500+ Happy Members</div>
                  <div className="text-[9px] tracking-[0.15em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>Trusted across Karnataka</div>
                </div>
              </motion.div>

              {/* Decorative glow */}
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: C.greenMid, opacity: 0.05, filter: "blur(50px)" }} />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          FOOTER — shared SiteFooter
      ════════════════════════════════════ */}
      <SiteFooter />

      {/* ════════════════════════════════════
          BROCHURE LIGHTBOX
      ════════════════════════════════════ */}
      <AnimatePresence>
        {openPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(14px)" }}
            onClick={() => setOpenPage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.87, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.greenMid }} />
                  <span className="text-[11px] font-bold tracking-[0.28em] uppercase" style={{ color: C.greenMid }}>
                    {openPage === "front" ? "Front Page" : "Back Page"}
                  </span>
                </div>
                <button
                  onClick={() => setOpenPage(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Full image */}
              <motion.div
                key={openPage}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden"
                style={{
                  boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
                  border: `1px solid rgba(34,197,94,0.4)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={openPage === "front" ? "/bmi-happy.png" : "/ebrochure-back.jpg"}
                  alt={openPage === "front" ? "BMI E-Brochure Front Page" : "BMI E-Brochure Back Page"}
                  className="w-full h-auto block"
                />
              </motion.div>

              {/* Page switcher pills */}
              <div className="flex items-center justify-center gap-3 mt-5">
                {[
                  { key: "front", label: "Front Page" },
                  { key: "back",  label: "Back Page"  },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setOpenPage(key)}
                    className="px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-200"
                    style={{
                      background: openPage === key ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.07)",
                      border:     openPage === key ? `1px solid ${C.greenMid}70` : "1px solid rgba(255,255,255,0.15)",
                      color:      openPage === key ? C.greenMid : "rgba(255,255,255,0.38)",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* ESC hint */}
              <p className="text-center text-[10px] mt-3 tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.2)" }}>
                Press ESC or click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
