"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../../components/NavBar";
import SiteFooter from "../../components/SiteFooter";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

/* ── Click-to-play video player ── */
function VideoPlayer({ src, poster }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
      {playing ? (
        /* eslint-disable-next-line jsx-a11y/media-has-caption */
        <video
          src={src}
          autoPlay
          playsInline
          controls
          className="absolute inset-0 w-full h-full object-contain"
          style={{ background: "#000" }}
        />
      ) : (
        <div
          className="absolute inset-0 cursor-pointer group"
          onClick={() => setPlaying(true)}
          role="button"
          aria-label="Play virtual tour"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="Virtual Tour Thumbnail" className="w-full h-full object-cover" />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          {/* play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center justify-center w-20 h-20 rounded-full"
              style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", border: "2px solid rgba(255,255,255,0.5)", boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 ml-1.5 drop-shadow">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </motion.div>
          </div>
          {/* label */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-[12px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            ▶ Play Virtual Tour
          </div>
        </div>
      )}
    </div>
  );
}

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
  shadowMd:   "0 4px 12px rgba(0,0,0,0.08)",
  shadowLg:   "0 10px 30px rgba(0,0,0,0.12)",
};

/* ── shared nav ── */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(255,255,255,0.93)", backdropFilter: "blur(16px)", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}
    >
      <div className="px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.div
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0"
            style={{ border: "1.5px solid #d1fae5" }}
            whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bmi-logo.png" alt="BMI" className="w-8 h-8 object-contain object-center" />
          </motion.div>
          <div className="hidden sm:block leading-none">
            <div className="font-bold text-[14px]" style={{ color: C.greenDark }}>BMI Housing</div>
            <div className="text-[8px] tracking-[0.3em] uppercase mt-0.5" style={{ color: C.muted }}>Co-Op Society</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-0.5">
          {[
            { label: "Home",         href: "/" },
            { label: "Our Projects", href: "/our-projects", active: true },
            { label: "About Us",     href: "/our-projects#about" },
          ].map((lk) => (
            <motion.a
              key={lk.label}
              href={lk.href}
              whileHover={{ backgroundColor: "#f0fdf4" }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors hover:text-green-700"
              style={{ color: lk.active ? C.green : C.text }}
            >
              {lk.label}
              {lk.active && <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.green }} />}
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="/membership"
          whileHover={{ scale: 1.05, boxShadow: `0 6px 20px ${C.green}40` }}
          whileTap={{ scale: 0.96 }}
          className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[13px] font-bold text-white relative overflow-hidden group"
          style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
        >
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 0.6 }}
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5 shrink-0">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
          </svg>
          Apply Now
        </motion.a>
      </div>
      <div className="px-6 lg:px-10 py-1.5 flex items-center gap-1 text-[11px]"
        style={{ borderTop: `1px solid ${C.border}`, background: C.bgSection }}>
        <a href="/disclaimer" className="hover:underline" style={{ color: C.green }}>Disclaimer</a>
        <span style={{ color: C.muted }}>/</span>
        <a href="/disclaimer" className="hover:underline" style={{ color: C.green }}>Privacy Policy</a>
        <span className="ml-auto text-[10px] tracking-[0.2em] uppercase" style={{ color: C.muted }}>
          Reg. No: JRB/RGN/CR-13/51578/2022-23
        </span>
      </div>
    </motion.header>
  );
}

export default function GardenCityClient() {
  const [activeDevIdx, setActiveDevIdx] = useState(null);
  const [activeRowIdx, setActiveRowIdx] = useState(null);
  return (
    <div style={{ background: C.bgWhite }}>
      <NavBar activePage="garden-city" />
      <div style={{ height: "88px" }} />

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden py-20"
        style={{ background: `linear-gradient(135deg, #071a0e 0%, #0d2818 50%, #071a0e 100%)` }}>
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{ background: C.green, opacity: 0.08, filter: "blur(90px)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -right-20 w-[32rem] h-[32rem] rounded-full pointer-events-none"
          style={{ background: C.yellow, opacity: 0.06, filter: "blur(100px)" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 text-[12px] mb-6"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <a href="/our-projects" className="hover:text-green-400 transition-colors">Our Projects</a>
            <span>/</span>
            <span style={{ color: C.greenMid }}>Garden City</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold mb-5"
            style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", color: C.greenMid }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.greenMid }} />
            Off NH 648, Devanahalli
          </motion.div>

          {/* English heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-white"
          >
            BMI{" "}
            <span style={{ background: `linear-gradient(90deg, ${C.greenMid}, #86efac)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Garden City
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[16px] max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Premium residential plots in North Bengaluru's fastest-growing zone — near Kempegowda Airport,
            ITIR Tech Park &amp; top universities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {["Govt. Registered", "Prime Location", "4-EMI Plan", "₹1,249/sqft"].map((tag, i) => (
              <span key={tag}
                className="px-4 py-1.5 rounded-full text-[12px] font-semibold text-white"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="px-6 lg:px-10 py-20" style={{ background: C.bgWhite }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ boxShadow: C.shadowLg }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/garden-overview.png"
              alt="BMI Garden City"
              className="w-full h-auto object-cover"
              style={{ minHeight: "320px", display: "block" }}
            />
            <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl text-[12px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, boxShadow: "0 4px 14px rgba(22,163,74,0.4)" }}>
              Off NH 648, Devanahalli
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Overview</span>
            </div>
            <h2 className="font-extrabold text-3xl mb-5" style={{ color: C.text }}>
              North Bengaluru's{" "}
              <span style={{ background: `linear-gradient(90deg,${C.green},${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Prime Zone
              </span>
            </h2>
            <p className="text-[15px] leading-relaxed mb-6" style={{ color: C.body }}>
              North Bangalore has become the prime zone and is in high demand with the rapid development in the area.
              Having the Bangalore International Airport in the north zone and other major Government offices like the
              DC (District Collector) office, government proposals for ITIR are contributing to this rapid growth.
              If you plan to invest on plot/land, now is the best time.
            </p>
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Price", value: "₹1,249/sqft" },
                { label: "Location", value: "Off NH 648" },
                { label: "Payment", value: "4-EMI Plan" },
              ].map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl p-4"
                  style={{ background: C.bgSection, border: `1px solid ${C.border}` }}>
                  <div className="text-[11px] uppercase tracking-[0.15em] font-semibold mb-1" style={{ color: C.muted }}>{s.label}</div>
                  <div className="font-extrabold text-[16px]" style={{ color: C.text }}>{s.value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Table ── */}
      <section className="px-6 lg:px-10 py-20" style={{ background: C.bgSection }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Pricing</span>
              <span className="w-8 h-px" style={{ background: C.green }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl" style={{ color: C.text }}>
              Plot Pricing &amp; Payment{" "}
              <span style={{ background: `linear-gradient(90deg,${C.green},${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Schedule
              </span>
            </h2>
          </motion.div>

          {/* ── 3D Card wrapper ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 6 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              position: "relative",
              boxShadow: `
                0 0 0 1px rgba(22,163,74,0.12),
                0 4px 8px rgba(0,0,0,0.06),
                0 16px 40px rgba(0,0,0,0.12),
                0 40px 80px rgba(22,163,74,0.10)
              `,
              background: "#fff",
            }}
          >
            {/* Surface gloss line at top */}
            <div style={{ height: "3px", background: `linear-gradient(90deg, transparent, ${C.greenMid}cc, ${C.green}, ${C.greenMid}cc, transparent)` }} />

            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr style={{ position: "relative" }}>
                    {/* Header gradient bg */}
                    <td colSpan={6} style={{ padding: 0, position: "absolute", inset: 0,
                      background: `linear-gradient(135deg, ${C.greenDark} 0%, ${C.green} 55%, ${C.greenMid} 100%)`,
                    }} />
                    {/* Header gloss overlay */}
                    <td colSpan={6} style={{ padding: 0, position: "absolute", top: 0, left: 0, right: 0, height: "55%",
                      background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)",
                      pointerEvents: "none",
                    }} />
                    {["DIMENSION", "PRICE PER SQFT", "TOTAL SALE VALUE", "DOWN PAYMENT", "1ST INSTALMENT", "2ND INSTALMENT"].map((h, hi) => (
                      <th key={h} className="px-5 py-4 text-left font-extrabold text-[10px] tracking-[0.12em] uppercase whitespace-nowrap relative"
                        style={{
                          color: "#fff",
                          borderRight: hi < 5 ? "1px solid rgba(255,255,255,0.15)" : "none",
                          textShadow: "0 1px 3px rgba(0,0,0,0.25)",
                          letterSpacing: "0.1em",
                        }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                  {/* Header bottom accent line */}
                  <tr>
                    <td colSpan={6} style={{ padding: 0, height: "2px",
                      background: `linear-gradient(90deg, ${C.greenDark}, ${C.greenMid}, ${C.greenDark})`,
                    }} />
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: "30×40", sqft: "1200sqft", price: "1249/-sqft", total: "14,98,800/-", down: "4,49,640",  i1: "3,49,720",  i2: "3,49,720",  popular: false },
                    { dim: "30×50", sqft: "1500sqft", price: "1249/-sqft", total: "18,73,500/-", down: "5,62,050",  i1: "4,37,150",  i2: "4,37,150",  popular: true  },
                    { dim: "40×60", sqft: "2400sqft", price: "1249/-sqft", total: "29,97,600/-", down: "8,99,280",  i1: "6,99,440",  i2: "6,99,440",  popular: false },
                    { dim: "50×80", sqft: "4000sqft", price: "1249/-sqft", total: "49,96,000/-", down: "14,98,800", i1: "11,65,774", i2: "11,65,774", popular: false },
                  ].map((row, i) => {
                    const isActive = activeRowIdx === i;
                    return (
                    <motion.tr key={row.dim}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.09, duration: 0.5 }}
                      animate={isActive
                        ? { scale: 1.02, y: -4, rotateX: -3 }
                        : { scale: 1,    y: 0,  rotateX: 0  }}
                      whileHover={!isActive ? { backgroundColor: "#f0fdf4", y: -2, scale: 1.01 } : {}}
                      onClick={() => setActiveRowIdx(isActive ? null : i)}
                      style={{
                        background: isActive ? "#dcfce7" : row.popular ? "#f0fdf4" : i % 2 === 0 ? "#fafffe" : "#ffffff",
                        borderBottom: `1px solid ${C.border}`,
                        borderLeft: isActive ? `3px solid ${C.greenMid}` : row.popular ? `3px solid ${C.green}` : "3px solid transparent",
                        boxShadow: isActive
                          ? `0 12px 32px rgba(22,163,74,0.22), 0 0 0 2px ${C.greenMid}40`
                          : row.popular ? `inset 3px 0 0 ${C.green}` : "none",
                        transformStyle: "preserve-3d",
                        cursor: "pointer",
                        transition: "background 0.25s, border 0.25s, box-shadow 0.25s",
                      }}>
                      <td className="px-5 py-4 font-extrabold" style={{ color: C.text }}>
                        <span className="text-[14px]">{row.dim}</span>
                        <span className="font-normal text-[11px] ml-1" style={{ color: C.muted }}>({row.sqft})</span>
                        {row.popular && (
                          <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold text-white"
                            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, verticalAlign: "middle" }}>
                            Popular
                          </span>
                        )}
                        {isActive && (
                          <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                            className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-bold text-white"
                            style={{ background: `linear-gradient(135deg, ${C.greenMid}, ${C.green})`, verticalAlign: "middle" }}>
                            Selected ✓
                          </motion.span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-[13px] px-2.5 py-1 rounded-lg"
                          style={{ color: "#fff", background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
                            boxShadow: `0 2px 6px ${C.green}50` }}>
                          ₹{row.price}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-bold text-[14px]" style={{ color: C.text }}>₹{row.total}</td>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-[13px] px-2 py-0.5 rounded-md"
                          style={{ color: C.greenDark, background: C.greenLight }}>
                          {row.down}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-medium" style={{ color: C.body }}>{row.i1}</td>
                      <td className="px-5 py-4 font-medium" style={{ color: C.body }}>{row.i2}</td>
                    </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom shadow bar — adds depth */}
            <div style={{ height: "4px", background: `linear-gradient(90deg, ${C.greenDark}30, ${C.green}20, ${C.greenDark}30)` }} />
          </motion.div>

          {/* Floating shadow layer under table */}
          <div style={{
            height: "20px", marginTop: "0",
            background: `radial-gradient(ellipse at center, rgba(22,163,74,0.12) 0%, transparent 70%)`,
            filter: "blur(8px)",
          }} />
        </div>
      </section>

      {/* ── Documents Required ── */}
      <section className="px-6 lg:px-10 py-20" style={{ background: C.bgWhite }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-extrabold text-3xl md:text-4xl" style={{ color: C.text }}>
              Documents{" "}
              <span style={{ background: `linear-gradient(90deg,${C.green},${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Required
              </span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-8 grid md:grid-cols-2 gap-8"
            style={{ background: C.bgSection, border: `1px solid ${C.border}` }}>
            {/* Kannada — first */}
            <div>
              <h4 className="kannada font-bold text-[15px] mb-5 pb-2" style={{ color: C.greenDark, borderBottom: `2px solid ${C.border}` }}>
                ಅರ್ಜಿಗೆ ಸೇರಿಸಬೇಕಾದ ಆವಶ್ಯಕ ಆವೃತ್ತಿಗಳು:
              </h4>
              <ol className="flex flex-col gap-3">
                {["ನಾಲ್ಕು (4) ಪಾಸ್‌ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋಗಳು","ವಿಳಾಸ ಪ್ರಮಾಣಪತ್ರ","ಸರ್ಕಾರಿ ಗುರುತಿನ ಪ್ರೂಫ್","ನಾಮಿನಿ ಗುರುತಿನ ಪ್ರೂಫ್ ಮತ್ತು 1 ಪಾಸ್‌ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋ","ಪಾವತಿ ಮೂಡು: ಚೆಕ್, ಡಿಡಿ, ಎನ್‌ಇಎಫ್‌ಟಿ, ಆರ್‌ಟಿಜಿಎಸ್, ಅಥವಾ ಐಎಂಪಿಎಸ್"].map((doc, i) => (
                  <li key={i} className="kannada flex items-start gap-3 text-[13px]" style={{ color: C.body }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: C.greenLight, color: C.greenDark }}>{i + 1}</span>
                    {doc}
                  </li>
                ))}
              </ol>
              <p className="kannada mt-5 text-[12px]" style={{ color: C.muted }}>
                ಮುಖ್ಯ ವ್ಯಾಜ್ಯ: <strong style={{ color: C.text }}>"ಬೆಂಗಳೂರು ಮೆಟ್ರೋ ಸಿಟಿ ಇನ್‌ಫ್ರಾಸ್ಟ್ರಕ್ಚರ್ ಹೌಸಿಂಗ್ ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ"</strong>
              </p>
            </div>
            {/* English — second */}
            <div>
              <ol className="flex flex-col gap-3">
                {["Four (4) passport-size photographs","Address proof","Government ID Proof","Nominee ID Proof & 1 Passport Size photo","Payment Mode: Cheque, DD, NEFT, RTGS, or IMPS"].map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px]" style={{ color: C.body }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: C.greenLight, color: C.greenDark }}>{i + 1}</span>
                    {doc}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[12px]" style={{ color: C.muted }}>
                In favor of: <strong style={{ color: C.text }}>"BENGALURU METRO CITY INFRASTRUCTURE HOUSING CO-OPERATIVE SOCIETY"</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Developments ── */}
      <section className="relative px-6 lg:px-10 py-20 overflow-hidden" style={{ background: C.bgWhite }}>

        {/* ── Left side decoration (xl+) ── */}
        <div className="absolute left-0 top-0 bottom-0 w-52 pointer-events-none overflow-hidden hidden xl:block" aria-hidden="true">
          <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, ${C.green}55 1.5px, transparent 1.5px)`, backgroundSize:"22px 22px" }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease:"linear" }}
            style={{ position:"absolute", top:"14%", left:"-28%", width:200, height:200, borderRadius:"50%", border:`2px dashed ${C.green}90` }} />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 28, repeat: Infinity, ease:"linear" }}
            style={{ position:"absolute", top:"55%", left:"-18%", width:140, height:140, borderRadius:"50%", border:`1.5px dashed ${C.greenMid}70` }} />
          <motion.div animate={{ scale:[1,1.3,1], opacity:[0.18,0.38,0.18] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
            style={{ position:"absolute", top:"50%", left:"0%", width:110, height:110, borderRadius:"50%", background:C.green, filter:"blur(24px)" }} />
          <motion.div animate={{ y:[0,-12,0] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
            style={{ position:"absolute", top:"34%", left:"22%" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.greenMid} strokeWidth={2} style={{ width:36, height:36, opacity:0.7 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </motion.div>
          {[0,1,2,3].map((i) => (
            <motion.div key={i}
              animate={{ y:[0,-(9+i*5),0], opacity:[0.35,0.75,0.35] }}
              transition={{ duration:3.2+i*0.9, repeat:Infinity, ease:"easeInOut", delay:i*0.7 }}
              style={{ position:"absolute", top:`${18+i*17}%`, left:`${10+(i%2)*28}%`, width:7+i*2, height:7+i*2, borderRadius:"50%", background:C.greenMid }} />
          ))}
        </div>

        {/* ── Right side decoration (xl+) ── */}
        <div className="absolute right-0 top-0 bottom-0 w-52 pointer-events-none overflow-hidden hidden xl:block" aria-hidden="true">
          <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle, ${C.green}55 1.5px, transparent 1.5px)`, backgroundSize:"22px 22px" }} />
          <motion.div animate={{ rotate:-360 }} transition={{ duration:32, repeat:Infinity, ease:"linear" }}
            style={{ position:"absolute", top:"20%", right:"-26%", width:175, height:175, borderRadius:"50%", border:`2px dashed ${C.green}85` }} />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease:"linear" }}
            style={{ position:"absolute", top:"58%", right:"-15%", width:130, height:130, borderRadius:"50%", border:`1.5px dashed ${C.greenMid}65` }} />
          <motion.div animate={{ scale:[1,1.25,1], opacity:[0.18,0.40,0.18] }} transition={{ duration:6, repeat:Infinity, ease:"easeInOut", delay:2 }}
            style={{ position:"absolute", top:"38%", right:"0%", width:120, height:120, borderRadius:"50%", background:C.greenMid, filter:"blur(26px)" }} />
          <motion.div animate={{ y:[0,-11,0] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut", delay:0.8 }}
            style={{ position:"absolute", top:"58%", right:"20%" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth={2} style={{ width:34, height:34, opacity:0.65 }}>
              <line x1="3" y1="22" x2="21" y2="22"/>
              <rect x="5" y="2" width="14" height="20" rx="1"/>
              <line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="13" x2="15" y2="13"/>
            </svg>
          </motion.div>
          {[0,1,2,3].map((i) => (
            <motion.div key={i}
              animate={{ y:[0,-(8+i*4),0], opacity:[0.35,0.72,0.35] }}
              transition={{ duration:3.8+i*0.6, repeat:Infinity, ease:"easeInOut", delay:i*0.5 }}
              style={{ position:"absolute", top:`${14+i*20}%`, right:`${14+(i%2)*22}%`, width:6+i*2, height:6+i*2, borderRadius:"50%", background:C.green }} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.green }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.green }}>Nearby</span>
              <span className="w-8 h-px" style={{ background: C.green }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl" style={{ color: C.text }}>
              Nearby{" "}
              <span style={{ background: `linear-gradient(90deg,${C.green},${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Developments
              </span>
            </h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-8 grid sm:grid-cols-2 gap-3"
            style={{ background: C.bgSection, border: `1px solid ${C.border}`, perspective: "1200px" }}>
            {[
              "135 Acres Brigade Orchards",
              "Chanakya University",
              "Sattva Park Cubix",
              "Airport T2 (Kempegowda Intl.)",
              "Ramaiah Hospital",
              "METRO Phase 2A",
              "KIADB Industrial Area",
              "Akash Medical Institute",
              "Devanahalli Business Park",
              "Devanahalli Railway Station",
              "Proposed Embassy IT Park",
            ].map((item, i) => {
              const isActive = activeDevIdx === i;
              return (
                /* outer wrapper handles entrance animation */
                <motion.div key={i}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  {/* inner handles 3-D click effect */}
                  <motion.div
                    animate={isActive
                      ? { scale: 1.07, rotateX: -10, rotateY: 2, y: -7 }
                      : { scale: 1,    rotateX: 0,   rotateY: 0, y: 0  }}
                    whileHover={!isActive ? { scale: 1.04, y: -4, rotateX: -5 } : {}}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    onClick={() => setActiveDevIdx(isActive ? null : i)}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl"
                    style={{
                      background: isActive ? C.greenLight : "#ffffff",
                      border: isActive ? `1.5px solid ${C.greenMid}` : `1px solid ${C.border}`,
                      boxShadow: isActive
                        ? `0 20px 45px rgba(22,163,74,0.28), 0 0 0 3px ${C.greenMid}30`
                        : "0 1px 4px rgba(0,0,0,0.05)",
                      transformStyle: "preserve-3d",
                      cursor: "pointer",
                      userSelect: "none",
                      transition: "background 0.25s, border 0.25s, box-shadow 0.25s",
                    }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{
                        background: isActive ? C.greenMid : C.greenLight,
                        color: isActive ? "#ffffff" : C.greenDark,
                        transition: "background 0.25s, color 0.25s",
                      }}>{i + 1}</span>
                    <span className="text-[13px] font-semibold flex-1"
                      style={{ color: isActive ? C.greenDark : C.text, transition: "color 0.25s" }}>
                      {item}
                    </span>
                    {isActive && (
                      <motion.svg
                        initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewBox="0 0 24 24" fill="none" stroke={C.greenMid} strokeWidth={2.5}
                        className="w-4 h-4 shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                      </motion.svg>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Amenities ── */}
      <section className="relative overflow-hidden py-24" style={{ background: "#f0fdf4" }}>
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center px-6 mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.3em] uppercase mb-5"
            style={{ background: `${C.green}18`, border: `1px solid ${C.green}40`, color: C.green }}
          >
            ಸೌಲಭ್ಯಗಳು · Amenities
          </div>
          <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight mb-4" style={{ color: C.text }}>
            Premium{" "}
            <span style={{ background: `linear-gradient(90deg,${C.green},${C.greenMid})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Amenities
            </span>
          </h2>
          <p className="text-[15px]" style={{ color: C.muted }}>
            Every BMI Garden City layout comes with world-class infrastructure and lifestyle amenities.
          </p>
        </div>

        {/* Scrolling columns */}
        <div
          className="flex justify-center gap-5 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            maxHeight: "700px",
          }}
        >
          <TestimonialsColumn duration={16} testimonials={[
            { name: "60ft Main Road",           role: "Infrastructure", text: "Wide 60-foot roads ensuring smooth traffic flow and easy accessibility throughout the layout.", image: "/amenities/road.jpg", accent: C.green },
            { name: "Water Connection",          role: "Utilities",      text: "24/7 freshwater supply with dedicated pipeline connections to every plot in the layout.", image: "/amenities/water.jpg", accent: C.green },
            { name: "Underground Electricity",   role: "Utilities",      text: "Safe underground electrical cabling eliminating overhead wires for a cleaner, safer environment.", image: "/amenities/electricity.jpg", accent: C.green },
            { name: "Entrance Arch",             role: "Infrastructure", text: "Grand entrance arch with 24/7 security, giving your home a prestigious and welcoming address.", image: "/gc-amenities-hero.png", accent: C.green },
          ]} />
          <TestimonialsColumn duration={20} className="hidden md:block" testimonials={[
            { name: "Swimming Pool",             role: "Recreation",     text: "Premium swimming pool for residents to relax, exercise, and enjoy leisure time with family.", image: "/amenities/swimming-pool.jpg", accent: C.greenMid },
            { name: "Club House",                role: "Recreation",     text: "Modern club house with premium facilities for community gatherings, events, and leisure.", image: "/amenities/clubhouse.jpg", accent: C.greenMid },
            { name: "Amphitheater",              role: "Community",      text: "Open-air amphitheater for community events, cultural programs, and outdoor entertainment.", image: "/amenities/amphitheater.jpg", accent: C.greenMid },
            { name: "Theme Park & Gardens",      role: "Recreation",     text: "Landscaped parks with seating, walking paths, and play areas for all ages.", image: "/amenities/park.jpg", accent: C.greenMid },
          ]} />
          <TestimonialsColumn duration={18} className="hidden lg:block" testimonials={[
            { name: "Street Lights",             role: "Infrastructure", text: "Solar-powered street lights ensuring safety and clear visibility throughout the night.", image: "/amenities/street-lights.jpg", accent: C.green },
            { name: "Underground Sewage",        role: "Sanitation",     text: "Modern underground sewage system ensuring a clean, hygienic, and odour-free environment.", image: "/amenities/sewage.jpg", accent: C.green },
            { name: "Outdoor Gym",               role: "Recreation",     text: "Open-air fitness station with modern equipment for a healthy and active lifestyle.", image: "/amenities/gym.jpg", accent: C.green },
            { name: "CCTV Surveillance",          role: "Security",       text: "24/7 CCTV surveillance across the entire layout for complete peace of mind.", image: "/amenities/cctv.jpg", accent: C.green },
          ]} />
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/purchase-site"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-bold text-white"
            style={{ background: `linear-gradient(135deg,${C.green},${C.greenDark})`, boxShadow: `0 6px 24px ${C.green}44` }}
          >
            Book Your Plot →
          </a>
        </div>

        {/* Notes */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 mt-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl px-8 py-6" style={{ background: "#fef9c3", border: "1px solid #fde68a" }}>
            <h4 className="font-bold text-[12px] tracking-[0.25em] uppercase mb-3" style={{ color: "#92400e" }}>Note:</h4>
            <ul className="flex flex-col gap-2">
              {["Corner sites will be charged extra at the time of Allotment.","Registration Charges should be borne by Members.",'Allotment will be done on "FIRST COME FIRST SERVE BASES".'].map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px]" style={{ color: "#78350f" }}>
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#d97706" }} />
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Project Video ── */}
      <section className="px-6 lg:px-10 py-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #050a1a 0%, #071a0e 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-px" style={{ background: "rgba(34,197,94,0.4)" }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.greenMid }}>
                ಯೋಜನಾ ವಿಡಿಯೋ · Project Video
              </span>
              <span className="w-10 h-px" style={{ background: "rgba(34,197,94,0.4)" }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl text-white mb-3">
              BMI{" "}
              <span style={{ background: `linear-gradient(90deg, ${C.greenMid}, #86efac)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Garden City
              </span>{" "}
              — Virtual Tour
            </h2>
            <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.4)" }}>
              Experience the layout, amenities and location of BMI Garden City
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.6)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "1rem", overflow: "hidden" }}
          >
            <VideoPlayer src="/garden-city.mp4" poster="/garden-overview.png" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-[11px] mt-5"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Off NH 648, Devanahalli · North Bengaluru · ₹1,249/sqft
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-10 py-16 text-center"
        style={{ background: `linear-gradient(135deg, #071a0e, #0d2818)` }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-extrabold text-3xl text-white mb-4">
          Interested in Garden City?
        </motion.h2>
        <p className="text-[15px] mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
          Contact us today or explore our other project.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a href="tel:+917710556677"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-xl text-[14px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
            Call: 7710556677
          </motion.a>
          <motion.a href="/our-projects/north-metro-city"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-xl text-[14px] font-bold"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}>
            View North Metro City →
          </motion.a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
