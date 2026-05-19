"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import MagnetButton from "./MagnetButton";
import { useZoom } from "./ZoomStage";

const links = [
  { name: "Home",         jump: 0 },
  { name: "The Society",  jump: 2 },
  { name: "Projects",     jump: 3 },
  { name: "Amenities",    jump: 4 },
  { name: "Services",     jump: 5 },
  { name: "3D Tour",      jump: 6 },
  { name: "Gallery",      jump: 7 },
  { name: "Testimonials", jump: 8 },
  { name: "Membership",   jump: 9 },
];

export default function Header() {
  const { current } = useZoom();
  const [open, setOpen] = useState(false);
  const onHero = current === 0;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        onHero
          ? "bg-transparent py-5"
          : "py-3 border-b border-pearl/8"
      }`}
      style={
        onHero
          ? {}
          : { background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }
      }
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        {/* Logo */}
        <button data-jump="0" className="flex items-center gap-3 group cursor-pointer shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.bmihousing.com/wp-content/uploads/2023/07/11111-1024x1024.png"
            alt="BMI Housing"
            className="w-10 h-10 rounded-full object-contain shrink-0 drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
          <div className="leading-none text-left">
            <div
              className={`font-serif text-[15px] tracking-wide font-semibold transition-colors ${
                onHero ? "text-white" : "text-pearl"
              }`}
            >
              BMI Housing
            </div>
            <div
              className={`text-[8px] tracking-[0.3em] uppercase mt-0.5 transition-colors ${
                onHero ? "text-white/45" : "text-pearl/40"
              }`}
            >
              Co-Operative Society · Est. 2022
            </div>
          </div>
        </button>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
          {links.map((l, i) => (
            <motion.button
              key={l.name}
              data-jump={l.jump}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
              className={`relative text-[10.5px] tracking-[0.2em] uppercase transition-colors duration-300 py-1 cursor-pointer ${
                current === l.jump
                  ? "text-gold"
                  : onHero
                  ? "text-white/60 hover:text-white"
                  : "text-pearl/55 hover:text-pearl"
              }`}
            >
              {l.name}
              {current === l.jump && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold rounded-full"
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <MagnetButton small data-jump="9">Join the Society</MagnetButton>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className={`lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg transition-colors ${
              onHero ? "text-white hover:bg-white/10" : "text-pearl hover:bg-pearl/5"
            }`}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              className="block w-5 h-px bg-current rounded-full"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="block w-5 h-px bg-current rounded-full"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              className="block w-5 h-px bg-current rounded-full"
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden mx-4 mt-2 rounded-xl border border-pearl/10 bg-white/95 shadow-lg"
            style={{ backdropFilter: "blur(16px)" }}
          >
            <div className="py-2">
              {links.map((l) => (
                <button
                  key={l.name}
                  data-jump={l.jump}
                  onClick={() => setOpen(false)}
                  className={`w-full flex items-center gap-3 px-5 py-3 text-left tracking-[0.2em] uppercase text-[11px] transition-colors cursor-pointer ${
                    current === l.jump
                      ? "text-gold"
                      : "text-pearl/65 hover:text-pearl"
                  }`}
                >
                  {current === l.jump && (
                    <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                  )}
                  {l.name}
                </button>
              ))}
              <div className="px-5 pt-2 pb-4">
                <button
                  data-jump="9"
                  onClick={() => setOpen(false)}
                  className="w-full py-3 rounded-xl bg-gold text-slate text-[11px] font-medium tracking-[0.3em] uppercase cursor-pointer"
                >
                  Join the Society →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
