"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../../components/NavBar";
import SiteFooter from "../../components/SiteFooter";

const C = {
  bg:          "#fff7ed",
  bgWhite:     "#ffffff",
  bgSection:   "#fff4e6",
  green:       "#16a34a",
  greenDark:   "#14532d",
  greenLight:  "#dcfce7",
  greenMid:    "#22c55e",
  orange:      "#c2410c",
  orangeMid:   "#ea580c",
  orangeBright:"#f97316",
  orangeLight: "#ffedd5",
  yellow:      "#d97706",
  text:        "#1c1008",
  body:        "#374151",
  muted:       "#6b7280",
  border:      "#fed7aa",
  borderGray:  "#e5e7eb",
  shadowMd:    "0 4px 12px rgba(0,0,0,0.08)",
  shadowLg:    "0 10px 30px rgba(0,0,0,0.12)",
};

/* ── shared nav ── */
function Navbar() {
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
          <motion.img
            src="https://www.bmihousing.com/wp-content/uploads/2023/07/11111-1024x1024.png"
            alt="BMI" className="w-10 h-10 rounded-full object-contain"
            whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="hidden sm:block leading-none">
            <div className="font-bold text-[14px]" style={{ color: C.orange }}>BMI Housing</div>
            <div className="text-[8px] tracking-[0.3em] uppercase mt-0.5" style={{ color: C.muted }}>Co-Op Society · Est. 2022</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-0.5">
          {[
            { label: "Home",         href: "/" },
            { label: "E Brochure",   href: "/e-brochure" },
            { label: "Our Projects", href: "/our-projects", active: true },
            { label: "About Us",     href: "/our-projects#about" },
          ].map((lk) => (
            <motion.a
              key={lk.label}
              href={lk.href}
              whileHover={{ backgroundColor: "#fff7ed" }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors"
              style={{ color: lk.active ? C.orangeMid : C.text }}
            >
              {lk.label}
              {lk.active && <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.orangeBright }} />}
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="/membership"
          whileHover={{ scale: 1.05, boxShadow: `0 6px 20px ${C.orangeMid}50` }}
          whileTap={{ scale: 0.96 }}
          className="shrink-0 flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[13px] font-bold text-white relative overflow-hidden group"
          style={{ background: `linear-gradient(135deg, ${C.orangeMid}, ${C.orange})` }}
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
        <a href="#" className="hover:underline" style={{ color: C.orangeMid }}>Disclaimer</a>
        <span style={{ color: C.muted }}>/</span>
        <a href="#" className="hover:underline" style={{ color: C.orangeMid }}>Privacy Policy</a>
        <span className="ml-auto text-[10px] tracking-[0.2em] uppercase" style={{ color: C.muted }}>
          Reg. No: JRB/RGN/CR-13/51578/2022-23
        </span>
      </div>
    </motion.header>
  );
}

export default function NorthMetroCityClient() {
  return (
    <div style={{ background: C.bgWhite }}>
      <NavBar activePage="north-metro-city" />
      <div style={{ height: "88px" }} />

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden py-20"
        style={{ background: `linear-gradient(135deg, #431407 0%, #7c2d12 50%, #431407 100%)` }}>
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full pointer-events-none"
          style={{ background: C.orangeBright, opacity: 0.15, filter: "blur(90px)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -right-20 w-[32rem] h-[32rem] rounded-full pointer-events-none"
          style={{ background: C.yellow, opacity: 0.10, filter: "blur(100px)" }}
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
            <a href="/our-projects" className="hover:text-orange-300 transition-colors">Our Projects</a>
            <span>/</span>
            <span style={{ color: "#fdba74" }}>North Metro City</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold mb-5"
            style={{ background: "rgba(249,115,22,0.18)", border: "1px solid rgba(249,115,22,0.4)", color: "#fdba74" }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#fdba74" }} />
            Adjacent to Amity University
          </motion.div>

          {/* Kannada — large, on top */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-extrabold text-3xl md:text-4xl tracking-tight mb-2 leading-snug"
            style={{ color: "#fdba74" }}
          >
            ಬಿಎಂಐ ನಾರ್ತ್ ಮೆಟ್ರೋ ಸಿಟಿ
          </motion.h1>
          {/* English — smaller, below */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-white"
          >
            BMI{" "}
            <span style={{ background: `linear-gradient(90deg, #fdba74, ${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              North Metro City
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[16px] max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Premium residential plots adjacent to Amity University — surrounded by ITIR Tech Park,
            Harrow International School &amp; North Bengaluru's top landmarks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {["Govt. Registered", "Bank Loan 90%", "Amity University Nearby", "4-EMI Plan", "₹1,199/sqft"].map((tag) => (
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
            <video
              src="/north-metro-city.mp4"
              autoPlay loop muted playsInline
              poster="/north-metro-overview.png"
              className="w-full h-auto object-cover"
              style={{ minHeight: "320px", display: "block" }}
            />
            <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl text-[12px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${C.orangeMid}, ${C.orange})`, boxShadow: `0 4px 14px ${C.orangeMid}66` }}>
              Adjacent to Amity University
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px" style={{ background: C.orangeBright }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.orangeMid }}>Overview</span>
            </div>
            <h2 className="font-extrabold text-3xl mb-5" style={{ color: C.text }}>
              North Bengaluru's{" "}
              <span style={{ background: `linear-gradient(90deg,${C.orangeMid},${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Rising Star
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
                { label: "Price", value: "₹1,199/sqft" },
                { label: "Location", value: "Near Amity Univ." },
                { label: "Loan", value: "Up to 90%" },
                { label: "Payment", value: "4-EMI Plan" },
              ].map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl p-4"
                  style={{ background: "#fff7ed", border: `1px solid ${C.border}` }}>
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px" style={{ background: C.orangeBright }} />
              <span className="text-[10px] tracking-[0.6em] uppercase font-bold" style={{ color: C.orangeMid }}>Pricing</span>
              <span className="w-8 h-px" style={{ background: C.orangeBright }} />
            </div>
            <h2 className="font-extrabold text-3xl md:text-4xl" style={{ color: C.text }}>
              Plot Pricing &amp; Payment{" "}
              <span style={{ background: `linear-gradient(90deg,${C.orangeMid},${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Schedule
              </span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="overflow-x-auto rounded-2xl" style={{ boxShadow: C.shadowMd }}>
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr style={{ background: `linear-gradient(90deg, ${C.orange}, ${C.orangeBright})` }}>
                  {["DIMENSION", "PRICE PER SQFT", "TOTAL SALE VALUE", "DOWN PAYMENT", "1st INSTALMENT", "2nd INSTALMENT", "3rd INSTALMENT"].map((h) => (
                    <th key={h} className="px-4 py-4 text-left font-bold text-[11px] tracking-[0.08em] uppercase text-white whitespace-nowrap"
                      style={{ borderRight: "1px solid rgba(255,255,255,0.2)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { dim: "30×40", sqft: "1200sqft", price: "1199/-sqft", total: "14,38,800/-", down: "4,31,640",  i1: "3,35,720",  i2: "3,35,720",  i3: "3,35,720"  },
                  { dim: "30×50", sqft: "1500sqft", price: "1199/-sqft", total: "17,98,500/-", down: "5,39,550",  i1: "4,19,650",  i2: "4,19,650",  i3: "4,19,650"  },
                  { dim: "40×60", sqft: "2400sqft", price: "1199/-sqft", total: "28,77,600/-", down: "8,63,280",  i1: "6,71,440",  i2: "6,71,440",  i3: "6,71,440"  },
                  { dim: "50×80", sqft: "4000sqft", price: "1199/-sqft", total: "47,96,000/-", down: "14,38,800", i1: "11,19,067", i2: "11,19,067", i3: "11,19,067" },
                ].map((row, i) => (
                  <motion.tr key={row.dim}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    style={{ background: i % 2 === 0 ? "#fff7ed" : "#ffffff", borderBottom: `1px solid ${C.border}` }}>
                    <td className="px-4 py-4 font-extrabold" style={{ color: C.text }}>
                      {row.dim} <span className="font-normal text-[11px]" style={{ color: C.muted }}>({row.sqft})</span>
                    </td>
                    <td className="px-4 py-4 font-semibold" style={{ color: C.orangeMid }}>{row.price}</td>
                    <td className="px-4 py-4 font-bold" style={{ color: C.text }}>{row.total}</td>
                    <td className="px-4 py-4 font-semibold" style={{ color: C.body }}>{row.down}</td>
                    <td className="px-4 py-4" style={{ color: C.body }}>{row.i1}</td>
                    <td className="px-4 py-4" style={{ color: C.body }}>{row.i2}</td>
                    <td className="px-4 py-4" style={{ color: C.body }}>{row.i3}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── Documents Required ── */}
      <section className="px-6 lg:px-10 py-20" style={{ background: C.bgWhite }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-extrabold text-3xl md:text-4xl" style={{ color: C.text }}>
              Documents{" "}
              <span style={{ background: `linear-gradient(90deg,${C.orangeMid},${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Required
              </span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl p-8 grid md:grid-cols-2 gap-8"
            style={{ background: C.bgSection, border: `1px solid ${C.border}` }}>
            {/* English */}
            <div>
              <h4 className="font-bold text-[15px] mb-5 pb-2" style={{ color: C.orangeMid, borderBottom: `2px solid ${C.border}` }}>English</h4>
              <ol className="flex flex-col gap-3">
                {["Four (4) passport-size photographs","Address proof","Government ID Proof","Nominee ID Proof & 1 Passport Size photo","Payment Mode: Cheque, DD, NEFT, RTGS, or IMPS"].map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px]" style={{ color: C.body }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: C.orangeLight, color: C.orangeMid }}>{i + 1}</span>
                    {doc}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-[12px]" style={{ color: C.muted }}>
                In favor of: <strong style={{ color: C.text }}>"BENGALURU METRO CITY INFRASTRUCTURE HOUSING CO-OPERATIVE SOCIETY"</strong>
              </p>
            </div>
            {/* Kannada */}
            <div>
              <h4 className="kannada font-bold text-[15px] mb-5 pb-2" style={{ color: C.orangeMid, borderBottom: `2px solid ${C.border}` }}>
                ಅರ್ಜಿಗೆ ಸೇರಿಸಬೇಕಾದ ಆವಶ್ಯಕ ಆವೃತ್ತಿಗಳು:
              </h4>
              <ol className="flex flex-col gap-3">
                {["ನಾಲ್ಕು (4) ಪಾಸ್‌ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋಗಳು","ವಿಳಾಸ ಪ್ರಮಾಣಪತ್ರ","ಸರ್ಕಾರಿ ಗುರುತಿನ ಪ್ರೂಫ್","ನಾಮಿನಿ ಗುರುತಿನ ಪ್ರೂಫ್ ಮತ್ತು 1 ಪಾಸ್‌ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋ","ಪಾವತಿ ಮೂಡು: ಚೆಕ್, ಡಿಡಿ, ಎನ್‌ಇಎಫ್‌ಟಿ, ಆರ್‌ಟಿಜಿಎಸ್, ಅಥವಾ ಐಎಂಪಿಎಸ್"].map((doc, i) => (
                  <li key={i} className="kannada flex items-start gap-3 text-[13px]" style={{ color: C.body }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: C.orangeLight, color: C.orangeMid }}>{i + 1}</span>
                    {doc}
                  </li>
                ))}
              </ol>
              <p className="kannada mt-5 text-[12px]" style={{ color: C.muted }}>
                ಮುಖ್ಯ ವ್ಯಾಜ್ಯ: <strong style={{ color: C.text }}>"ಬೆಂಗಳೂರು ಮೆಟ್ರೋ ಸಿಟಿ ಇನ್‌ಫ್ರಾಸ್ಟ್ರಕ್ಚರ್ ಹೌಸಿಂಗ್ ಕೋ-ಆಪರೇಟಿವ್ ಸೊಸೈಟಿ"</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Developments & Amenities ── */}
      <section className="px-6 lg:px-10 py-20" style={{ background: C.bgSection }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-extrabold text-3xl md:text-4xl" style={{ color: C.text }}>
              Developments &amp;{" "}
              <span style={{ background: `linear-gradient(90deg,${C.orangeMid},${C.orangeBright})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Amenities
              </span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Developments */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl p-8" style={{ background: "#fff7ed", border: `1px solid ${C.border}` }}>
              <h4 className="font-extrabold text-[15px] mb-6 tracking-[0.12em] uppercase flex items-center gap-2" style={{ color: C.orange }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Developments
              </h4>
              <ol className="flex flex-col gap-2.5">
                {["Devanahalli DC Office","ITIR Tech park (12,000 Acres)","Amity University","Harrow International School","Gitam University","Doddaballapura Industrial Area","Padukone – Dravid Sport Academy","Vihaan Public School Cambridge University","Stonehill International School"].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 text-[13px]" style={{ color: C.body }}>
                    <span className="text-[11px] font-bold w-6 shrink-0" style={{ color: C.muted }}>{i + 1}.</span>
                    {item}
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            {/* Amenities */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl p-8" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <h4 className="font-extrabold text-[15px] mb-6 tracking-[0.12em] uppercase flex items-center gap-2" style={{ color: "#92400e" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Amenities
              </h4>
              <ol className="flex flex-col gap-2.5">
                {["60ft Main Road","Water Connection","Underground Sewage Connection","Drainage System","Underground Electricity","Entrance Arch","Sewage Treatment Plant","Street Lights","Amphitheater","Theme Parks","Club House","Swimming Pool"].map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-3 text-[13px]" style={{ color: C.body }}>
                    <span className="text-[11px] font-bold w-6 shrink-0" style={{ color: "#d97706" }}>{i + 1}.</span>
                    {item}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>

          {/* Notes */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl px-8 py-6" style={{ background: "#fef9c3", border: "1px solid #fde68a" }}>
            <h4 className="font-bold text-[12px] tracking-[0.25em] uppercase mb-3" style={{ color: "#92400e" }}>Note:</h4>
            <ul className="flex flex-col gap-2">
              {["Loan Facility will be available after layout plan approval from the Concerned Authorities.","Corner sites will be charged extra at the time of Allotment.","Registration Charges should be borne by Members.",'Allotment will be done on "FIRST COME FIRST SERVE BASES".'].map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px]" style={{ color: "#78350f" }}>
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#d97706" }} />
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 lg:px-10 py-16 text-center"
        style={{ background: `linear-gradient(135deg, #431407, #7c2d12)` }}>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="font-extrabold text-3xl text-white mb-4">
          Interested in North Metro City?
        </motion.h2>
        <p className="text-[15px] mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
          Contact us today or explore our other project.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a href="tel:+917710556677"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-xl text-[14px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${C.orangeMid}, ${C.orange})` }}>
            Call: 7710556677
          </motion.a>
          <motion.a href="/our-projects/garden-city"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="px-8 py-3.5 rounded-xl text-[14px] font-bold"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}>
            View Garden City →
          </motion.a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
