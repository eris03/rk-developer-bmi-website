"use client";

import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "All payments must be made payable to the Society's official accounts listed on this page. If anyone insists on making a payment in cash, through a blank cheque, or by any other unauthorised method, please report it immediately.",
  "Price of sites in North Metro City Layout will be revised to ₹1,399 per Sqft, effective from 1st January 2026.",
  "BMI Housing is a Government-registered Co-operative Society — Reg. No: JRB/RGN/CR-13/51578/2022-23. Beware of impostors.",
  "RERA · DTCP · BMRDA approved layouts in Devanahalli & North Bengaluru. Bank loans available up to 90%.",
];

export default function MarqueeStrip({ visible = true }) {
  // Duplicate messages for seamless loop
  const track = [...messages, ...messages];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{    y: -40, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-[62px] left-0 right-0 z-40 overflow-hidden"
          style={{ background: "linear-gradient(90deg, #4ade80, #22c55e 40%, #16a34a)" }}
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />

          <div className="flex items-center">
            {/* Label badge */}
            <div
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 z-10"
              style={{ background: "rgba(0,0,0,0.18)" }}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
              <span className="text-white font-bold text-[11px] tracking-[0.3em] uppercase whitespace-nowrap">
                Notice
              </span>
            </div>

            {/* Scrolling track */}
            <div className="relative flex-1 overflow-hidden">
              {/* Left fade */}
              <div
                className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{ background: "linear-gradient(90deg, #22c55e, transparent)" }}
              />
              {/* Right fade */}
              <div
                className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
                style={{ background: "linear-gradient(-90deg, #16a34a, transparent)" }}
              />

              <motion.div
                className="flex items-center gap-0 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 38,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
              >
                {track.map((msg, i) => (
                  <span key={i} className="flex items-center">
                    <span className="text-white font-semibold text-[12.5px] leading-none py-2.5 px-2">
                      {msg}
                    </span>
                    {/* Separator dot */}
                    <span className="mx-6 text-white/50 text-lg select-none">◆</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
