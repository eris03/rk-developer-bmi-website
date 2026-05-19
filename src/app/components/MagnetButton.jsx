"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function MagnetButton({
  children,
  href,
  small = false,
  variant = "gold",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });

  const handleMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sizeCls = small ? "px-5 py-2.5 text-[11px]" : "px-7 py-4 text-xs";
  const palette =
    variant === "ghost"
      ? "bg-transparent text-pearl border border-pearl/25 hover:border-gold hover:text-gold"
      : "bg-gold text-slate hover:bg-gold-light";

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      type={href ? undefined : "button"}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex items-center gap-3 ${sizeCls} ${palette} font-medium tracking-[0.2em] uppercase rounded-full transition-colors duration-300 cursor-pointer ${className}`}
      {...props}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="text-base leading-none">→</span>
    </Tag>
  );
}
