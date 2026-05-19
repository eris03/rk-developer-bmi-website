"use client";

import { motion } from "framer-motion";
import { useZoom } from "./ZoomStage";

export default function ProgressRail({ labels = [] }) {
  const { goTo, current, total } = useZoom();
  const count = total || labels.length || 6;
  const pct = total > 1 ? (current / (total - 1)) * 100 : 0;

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-5">
      {/* Vertical rule */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-pearl/15">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gold to-gold-dark"
          style={{ height: pct + "%" }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
      </div>

      {/* Dots */}
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          data-jump={i}
          aria-label={labels[i] || `Section ${i + 1}`}
          className="group relative z-10"
        >
          <span
            className={`block w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
              i === current
                ? "bg-gold border-gold scale-150 shadow-[0_0_0_5px_rgba(197,160,89,0.18)]"
                : "bg-slate/80 border-pearl/30 group-hover:border-gold"
            }`}
          />
          {labels[i] && (
            <span className="absolute left-5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-sm bg-slate-deep text-pearl text-[9px] tracking-[0.3em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-gold/20">
              {labels[i]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
