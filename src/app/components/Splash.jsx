"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LOGO = "https://www.bmihousing.com/wp-content/uploads/2023/07/11111-1024x1024.png";

export default function Splash() {
  const [show, setShow]   = useState(true);
  const [phase, setPhase] = useState(0);
  // 0 = logo reveal | 1 = name appear | 2 = bar done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 1900);
    const t3 = setTimeout(() => setShow(false), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[200] bg-slate-deep flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Soft radial backdrop */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(251,191,36,0.08) 0%, rgba(134,239,172,0.06) 50%, transparent 100%)"
            }}
          />

          {/* ── Logo ── */}
          <motion.div
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-14px] rounded-full pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, #fbbf24, #ef4444, #86efac, #fbbf24)",
                padding: "2px",
                borderRadius: "50%",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 3px), white calc(100% - 3px))"
              }}
            />

            {/* Glow pulse */}
            <motion.div
              className="absolute inset-[-20px] rounded-full pointer-events-none"
              animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(134,239,172,0.15) 50%, transparent 70%)"
              }}
            />

            {/* Actual logo image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO}
              alt="BMI Housing Logo"
              width={160}
              height={160}
              className="relative z-10 rounded-full drop-shadow-xl"
              style={{ width: 160, height: 160, objectFit: "contain" }}
            />
          </motion.div>

          {/* ── Company name ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 14 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-7 text-center px-8"
          >
            <p className="text-pearl font-serif text-base tracking-[0.12em] font-semibold">
              BMI Housing
            </p>
            <p className="text-pearl/55 text-[10px] tracking-[0.38em] uppercase mt-1">
              Bengaluru Metro City Infrastructure
            </p>
            <p className="text-pearl/35 text-[9px] tracking-[0.28em] uppercase mt-0.5">
              Co-Operative Society Ltd. · Est. 2022
            </p>
          </motion.div>

          {/* ── Tri-colour loading bar ── */}
          <div className="mt-8 w-40 h-[2px] bg-pearl/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #4ade80, #fbbf24, #ef4444)"
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.6, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* ── Reg number ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0.28 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 text-pearl/30 text-[8px] tracking-[0.28em] uppercase"
          >
            Reg. JRB/RGN/CR-13/51578/2022-23
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
