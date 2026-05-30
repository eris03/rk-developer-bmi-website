"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

const C = {
  green:      "#16a34a",
  greenDark:  "#14532d",
  greenLight: "#dcfce7",
  greenMid:   "#22c55e",
  text:       "#1c3a1c",
  muted:      "#6b7280",
  border:     "#d1fae5",
  bgSection:  "#f8fef8",
  bgWhite:    "#ffffff",
  shadowLg:   "0 10px 30px rgba(0,0,0,0.12)",
};

const NAV_MENUS = {
  projects: [
    { label: "BMI Garden City",      sub: "Off NH 648, Devanahalli",       href: "/our-projects/garden-city" },
    { label: "BMI North Metro City", sub: "Adjacent to Amity University",  href: "/our-projects/north-metro-city" },
    { label: "Upcoming Projects",      sub: "New launches coming soon",       href: null },
  ],
  apply: [
    { label: "Application for Membership",       sub: "Join the co-operative society",      href: "/membership" },
    { label: "Application for Purchase of Site", sub: "Apply for a residential plot",       href: "/purchase-site" },
  ],
};

function DropdownPanel({ items, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.16 }}
      className={`absolute top-full ${align === "right" ? "right-0" : "left-0"} mt-2 w-64 rounded-xl overflow-hidden z-50`}
      style={{ background: C.bgWhite, border: `1px solid ${C.border}`, boxShadow: C.shadowLg }}
    >
      {items.map((item) =>
        item.href ? (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col gap-0.5 px-4 py-3.5 hover:bg-green-50 transition-colors group border-b last:border-b-0"
            style={{ borderColor: C.border }}
          >
            <span className="text-[13px] font-semibold group-hover:text-green-700 transition-colors" style={{ color: C.text }}>{item.label}</span>
            <span className="text-[11px]" style={{ color: C.muted }}>{item.sub}</span>
          </a>
        ) : (
          <div
            key={item.label}
            className="flex flex-col gap-0.5 px-4 py-3.5 border-b last:border-b-0 cursor-default select-none"
            style={{ borderColor: C.border, opacity: 0.55 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold" style={{ color: C.text }}>{item.label}</span>
              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full text-white"
                style={{ background: C.green, letterSpacing: "0.12em" }}>
                Soon
              </span>
            </div>
            <span className="text-[11px]" style={{ color: C.muted }}>{item.sub}</span>
          </div>
        )
      )}
    </motion.div>
  );
}

const TICKER_ITEMS = [
  { text: "Bengaluru Metro City Infrastructure Housing Co-operative Society Ltd. accepts payments only through: Cheque, Money Order, RTGS Transfer, NEFT Transfer, or Electronic Money Transfer (IMPS).", color: "#86efac", dot: "#22c55e" },
  { text: "⚠️ All payments must be made to the Society's official accounts. If anyone insists on cash, blank cheque, or any unauthorized method — refrain and contact the Society immediately.", color: "#fde68a", dot: "#f59e0b" },
  { text: "We are a licensed housing society officially recognized by the State of Karnataka. · Reg. No: JRB/RGN/CR-13/51578/2022-23", color: "#86efac", dot: "#22c55e" },
];

export default function NavBar({ activePage = "", showTicker = false }) {
  const [openMenu, setOpenMenu]     = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [loginOpen, setLoginOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-open if redirected with ?login=1
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("login=1")) {
      setLoginOpen(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const navLinks = [
    { label: "Home",         href: "/" },
    { label: "Our Projects", href: "/our-projects", menu: "projects" },
    { label: "E-Brochure",   href: "/e-brochure" },
    { label: "About Us",     href: "/our-projects#about" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        id="site-navbar"
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(18px)",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.10)" : "0 2px 20px rgba(0,0,0,0.06)",
        }}
        onClick={() => setOpenMenu(null)}
      >
        {/* ── Main Row ── */}
        <div className="px-5 lg:px-10 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.div
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"
              style={{ border: "1.5px solid #d1fae5" }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bmi-logo.png" alt="BMI Housing" className="w-full h-full object-contain scale-[1.28]" />
            </motion.div>
            <div className="leading-none">
              <div className="font-bold text-[14px]" style={{ color: C.greenDark }}>BMI Housing</div>
              <div className="text-[8px] tracking-[0.28em] uppercase mt-0.5" style={{ color: C.muted }}>Co-Op Society</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((lk) => (
              <div key={lk.label} className="relative">
                {lk.menu ? (
                  <motion.button
                    onClick={() => setOpenMenu(openMenu === lk.menu ? null : lk.menu)}
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors"
                    style={{ color: activePage === lk.menu || activePage === lk.label.toLowerCase().replace(" ", "-") ? C.green : C.text }}
                  >
                    {lk.label}
                    {(activePage === lk.menu || activePage === "garden-city" || activePage === "north-metro-city") && (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.green }} />
                    )}
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
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors hover:text-green-700"
                    style={{ color: activePage === lk.label.toLowerCase() ? C.green : C.text }}
                  >
                    {lk.label}
                  </motion.a>
                )}
                <AnimatePresence>
                  {lk.menu && openMenu === lk.menu && <DropdownPanel items={NAV_MENUS[lk.menu]} />}
                </AnimatePresence>
              </div>
            ))}

            {/* Apply Now Dropdown */}
            <div className="relative ml-2" onClick={(e) => e.stopPropagation()}>
              <motion.button
                onClick={() => setOpenMenu(openMenu === "apply" ? null : "apply")}
                whileHover={{ scale: 1.03, boxShadow: `0 6px 20px ${C.green}45` }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-bold text-white relative overflow-hidden group"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.7 }}
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 shrink-0">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
                Apply Now
                <motion.svg
                  animate={{ rotate: openMenu === "apply" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </motion.button>
              <AnimatePresence>
                {openMenu === "apply" && <DropdownPanel items={NAV_MENUS.apply} align="right" />}
              </AnimatePresence>
            </div>

            {/* Sign In button */}
            <motion.button
              onClick={() => setLoginOpen(true)}
              whileHover={{ scale: 1.04, boxShadow: `0 4px 16px rgba(22,163,74,0.25)` }}
              whileTap={{ scale: 0.96 }}
              className="ml-1 flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-bold border-2 transition-colors"
              style={{ borderColor: C.green, color: C.green, background: "transparent" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 shrink-0">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Sign In
            </motion.button>
          </nav>

          {/* Desktop Contact */}
          <motion.a
            href="/home-v1/contact"
            whileHover={{ scale: 1.04, boxShadow: `0 8px 24px ${C.green}50` }}
            whileTap={{ scale: 0.96 }}
            className="hidden lg:flex items-center gap-2 shrink-0 px-5 py-2.5 rounded-lg text-[13px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, boxShadow: `0 2px 10px ${C.green}30` }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 shrink-0">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Contact Us
          </motion.a>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg"
            style={{ background: "#f0fdf4" }}
            onClick={(e) => { e.stopPropagation(); setMobileOpen(!mobileOpen); }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 rounded-full"
              style={{ background: C.green }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
              className="block w-5 h-0.5 rounded-full"
              style={{ background: C.green }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-0.5 rounded-full"
              style={{ background: C.green }}
            />
          </button>
        </div>

        {/* ── Sub-Row ── */}
        <div
          className="px-5 lg:px-10 py-1.5 flex items-center text-[11px]"
          style={{ borderTop: `1px solid ${C.border}`, background: C.bgSection }}
        >
          <span className="ml-auto text-[10px] tracking-[0.18em] uppercase hidden sm:block" style={{ color: C.muted }}>
            Reg. No: JRB/RGN/CR-13/51578/2022-23
          </span>
        </div>

        {/* ── Ticker Row (home page only) ── */}
        {showTicker && (
          <div style={{ overflow: "hidden", background: "#071a0e", borderTop: "2px solid #22c55e" }}>
            {/* bmi-ticker-track uses CSS @keyframes — no Framer Motion percentage quirks */}
            <div className="bmi-ticker-track" style={{ paddingTop: "7px", paddingBottom: "7px" }}>
              {/* Duplicate 3× to ensure seamless fill on any screen width */}
              {[0, 1, 2].map((copy) => (
                <div key={copy} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  {TICKER_ITEMS.map((item, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        fontSize: "12px", fontWeight: 600,
                        whiteSpace: "nowrap", paddingLeft: "48px", paddingRight: "48px",
                        color: item.color, flexShrink: 0,
                      }}
                    >
                      <span style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: item.dot, flexShrink: 0,
                        animation: "pulse 2s ease-in-out infinite",
                      }} />
                      {item.text}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.header>

      {/* ── Mobile Slide-In Panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }} />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="absolute top-0 right-0 h-full w-[280px] flex flex-col overflow-y-auto"
              style={{ background: C.bgWhite, boxShadow: "-8px 0 32px rgba(0,0,0,0.18)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: `1px solid ${C.border}`, background: C.bgSection }}>
                <div className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/bmi-logo.png"
                    alt="BMI" className="w-8 h-8 rounded-full object-contain scale-[1.28]"
                  />
                  <span className="font-bold text-[14px]" style={{ color: C.greenDark }}>BMI Housing</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg"
                  style={{ background: "#f0fdf4" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={2.5} className="w-4 h-4">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Nav Links */}
              <div className="flex-1 px-4 py-5 flex flex-col gap-1">
                {[
                  { label: "Home",         href: "/" },
                  { label: "Our Projects", href: "/our-projects" },
                  { label: "About Us",     href: "/our-projects#about" },
                ].map((lk, i) => (
                  <motion.a
                    key={lk.label}
                    href={lk.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors hover:bg-green-50"
                    style={{ color: C.text }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.green }} />
                    {lk.label}
                  </motion.a>
                ))}

                {/* Divider */}
                <div className="my-3 h-px" style={{ background: C.border }} />

                {/* Projects sub-links */}
                <p className="px-4 text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: C.muted }}>Projects</p>
                {[
                  { label: "BMI Garden City",      href: "/our-projects/garden-city" },
                  { label: "BMI North Metro City",  href: "/our-projects/north-metro-city" },
                ].map((lk, i) => (
                  <motion.a
                    key={lk.label}
                    href={lk.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.26 + i * 0.06 }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] transition-colors hover:bg-green-50"
                    style={{ color: C.text }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 opacity-50" style={{ background: C.green }} />
                    {lk.label}
                  </motion.a>
                ))}

                {/* Divider */}
                <div className="my-3 h-px" style={{ background: C.border }} />

                {/* Apply Now links */}
                <p className="px-4 text-[10px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: C.muted }}>Apply Now</p>
                {NAV_MENUS.apply.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.38 + i * 0.06 }}
                    className="flex flex-col gap-0.5 px-4 py-3 rounded-xl transition-colors hover:bg-green-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-[13px] font-semibold" style={{ color: C.text }}>{item.label}</span>
                    <span className="text-[11px]" style={{ color: C.muted }}>{item.sub}</span>
                  </motion.a>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="px-4 py-5 flex flex-col gap-3" style={{ borderTop: `1px solid ${C.border}` }}>
                {/* Sign In */}
                <button
                  onClick={() => { setMobileOpen(false); setLoginOpen(true); }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[14px] font-bold border-2"
                  style={{ borderColor: C.green, color: C.green, background: C.greenLight }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Member Sign In
                </button>
                <a
                  href="tel:7710556677"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[14px] font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.91 19.79 19.79 0 0 1 1.61 4.28 2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call: 7710556677
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
