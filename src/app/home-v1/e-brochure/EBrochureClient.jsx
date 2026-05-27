"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

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
  "Bank loan information up to 90%",
];

/* ─── NAV MENUS ─── */
const NAV_MENUS = {
  projects: [
    { label: "BMI Garden City",      sub: "Off NH 207, Devanahalli" },
    { label: "BMI North Metro City", sub: "Adjacent to Amity University" },
    { label: "Upcoming Projects",    sub: "Coming soon — North Bengaluru" },
  ],
};

function DropdownPanel({ items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.16 }}
      className="absolute top-full left-0 mt-2 w-64 rounded-xl overflow-hidden z-50"
      style={{ background: C.bgWhite, border: `1px solid ${C.border}`, boxShadow: C.shadowLg }}
    >
      {items.map((item) => (
        <button key={item.label}
          className="w-full flex flex-col gap-0.5 px-4 py-3.5 text-left hover:bg-green-50 transition-colors group border-b last:border-b-0"
          style={{ borderColor: C.border }}>
          <span className="text-[13px] font-semibold group-hover:text-green-700 transition-colors" style={{ color: C.text }}>{item.label}</span>
          <span className="text-[11px]" style={{ color: C.muted }}>{item.sub}</span>
        </button>
      ))}
    </motion.div>
  );
}

export default function EBrochureClient() {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }} onClick={() => setOpenMenu(null)}>

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
          NAVIGATION
      ════════════════════════════════════ */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: "rgba(255,255,255,0.93)", backdropFilter: "blur(16px)", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
      >
        <div className="px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
          <a href="/home-v1" className="flex items-center gap-2.5 shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="https://www.bmihousing.com/wp-content/uploads/2023/07/11111-1024x1024.png"
              alt="BMI" className="w-10 h-10 rounded-full object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="hidden sm:block leading-none">
              <div className="font-bold text-[14px]" style={{ color: C.greenDark }}>BMI Housing</div>
              <div className="text-[8px] tracking-[0.3em] uppercase mt-0.5" style={{ color: C.muted }}>Co-Op Society · Est. 2022</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-0.5">
            {[
              { label: "Home",         href: "/home-v1" },
              { label: "E Brochure",   href: "/home-v1/e-brochure", active: true },
              { label: "Our Projects", href: "/home-v1/our-projects", menu: "projects" },
            ].map((lk) => (
              <div key={lk.label} className="relative" onClick={lk.menu ? (e) => e.stopPropagation() : undefined}>
                {lk.menu ? (
                  <motion.button
                    onClick={() => setOpenMenu(openMenu === lk.menu ? null : lk.menu)}
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors hover:text-green-700"
                    style={{ color: C.text }}
                  >
                    {lk.label}
                    <motion.svg
                      animate={{ rotate: openMenu === lk.menu ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </motion.svg>
                  </motion.button>
                ) : (
                  <motion.a
                    href={lk.href}
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors"
                    style={{ color: lk.active ? C.green : C.text }}
                  >
                    {lk.label}
                    {lk.active && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.green }} />
                    )}
                  </motion.a>
                )}
                <AnimatePresence>
                  {lk.menu && openMenu === lk.menu && <DropdownPanel items={NAV_MENUS[lk.menu]} />}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.04, boxShadow: `0 8px 24px ${C.green}55` }}
            whileTap={{ scale: 0.96 }}
            className="shrink-0 px-6 py-2.5 rounded-lg text-[13px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, boxShadow: `0 2px 10px ${C.green}33` }}
          >
            Contact Us
          </motion.button>
        </div>
        {/* Sub-row */}
        <div className="px-6 lg:px-10 py-1.5 flex items-center gap-1 text-[11px]"
          style={{ borderTop: `1px solid ${C.border}`, background: C.bgSection }}>
          <a href="#" className="hover:underline" style={{ color: C.green }}>Disclaimer</a>
          <span style={{ color: C.muted }}>/</span>
          <a href="#" className="hover:underline" style={{ color: C.green }}>Privacy Policy</a>
          <span className="ml-auto text-[10px] tracking-[0.2em] uppercase" style={{ color: C.muted }}>
            Reg. No: JRB/RGN/CR-13/51578/2022-23
          </span>
        </div>
      </motion.header>

      {/* ════════════════════════════════════
          HERO — full screen two-column
      ════════════════════════════════════ */}
      <section
        className="relative z-10"
        style={{ paddingTop: "88px" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start py-16 lg:py-20">

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
                className="font-extrabold text-3xl md:text-4xl lg:text-5xl leading-snug mb-3"
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

            {/* RIGHT — clip-path image reveal */}
            <div className="relative">
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 20px 80px rgba(0,0,0,0.55)", border: "1px solid rgba(34,197,94,0.15)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bmi-happy.png"
                  alt="BMI Housing E-Brochure"
                  className="w-full h-auto"
                  style={{ display: "block" }}
                />
              </motion.div>

              {/* Floating badge slides up after image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 -left-4 flex items-center gap-3 px-5 py-3.5 rounded-2xl"
                style={{
                  background: "rgba(3,13,7,0.85)",
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${C.greenMid}35`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${C.greenMid}15`,
                }}
              >
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${C.greenMid}20`, border: `1px solid ${C.greenMid}40`, color: C.greenMid }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[16px]" style={{ color: C.greenMid }}>1,000+</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>Happy Members</div>
                </div>
              </motion.div>

              {/* Decorative corner glow */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: C.greenMid, opacity: 0.06, filter: "blur(40px)" }} />
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          COMPANY INFO SECTION
      ════════════════════════════════════ */}
      <section className="relative z-10 py-24 px-6 lg:px-10" style={{ background: "#ffffff" }}>
        {/* Top accent line */}
        <div className="w-16 h-1 rounded-full mx-auto mb-10" style={{ background: `linear-gradient(90deg, ${C.green}, ${C.greenMid})` }} />

        <div className="max-w-3xl mx-auto text-center">
          {/* Kannada — large, first */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-extrabold text-3xl md:text-4xl leading-snug mb-3"
            style={{ color: C.green }}
          >
            ಬೆಂಗಳೂರು ಮೆಟ್ರೋ ಸಿಟಿ ಇನ್‌ಫ್ರಾಸ್ಟ್ರಕ್ಚರ್ ಹೌಸಿಂಗ್<br />
            ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ ಲಿ.
          </motion.h2>

          {/* English — smaller, below */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg md:text-xl font-semibold leading-snug mb-8"
            style={{ color: "#374151" }}
          >
            Bengaluru Metro City Infrastructure Housing<br />
            Co-Operative Society Ltd
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.7 }}
            className="text-[15px] leading-relaxed mb-10"
            style={{ color: "#374151" }}
          >
            Imagine owning a dream piece of land in the area of Bengaluru that is growing the quickest.
            It&apos;s the kind of life on which you may base your future. Our guiding philosophy in reaching
            the objective and offering value for money is quality. Located in the rapidly developing
            Bangalore region, with a sizable township to be built.
          </motion.p>

          {/* Reg No */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl mb-8"
            style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={2} className="w-4 h-4 shrink-0">
              <circle cx="12" cy="8" r="5"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
            </svg>
            <span className="text-[13px] font-semibold" style={{ color: C.greenDark }}>
              Reg No. JRB/RGN/CR-13/51578/2022-23
            </span>
          </motion.div>

          {/* Read More button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.a
              href="/home-v1/our-projects#about"
              whileHover={{ scale: 1.05, boxShadow: `0 8px 24px ${C.green}44` }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[14px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${C.greenMid}, ${C.green})`, boxShadow: `0 4px 14px ${C.green}33` }}
            >
              → Read More
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════
          MINIMAL FOOTER
      ════════════════════════════════════ */}
      <footer className="relative z-10" style={{ borderTop: "1px solid rgba(34,197,94,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2024–2025 BMI Housing Co-Operative Society. All rights reserved.
          </div>
          <div className="flex items-center gap-5 text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>
            <a href="/home-v1" className="hover:text-white transition-colors">Home</a>
            <a href="/home-v1/our-projects" className="hover:text-white transition-colors">Our Projects</a>
            <a href="tel:+917710556677" className="hover:text-white transition-colors">7710556677</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
