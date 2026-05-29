"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ── helper: darken a hex color ── */
function darken(hex, amount = 40) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - amount);
  const g = Math.max(0, ((n >> 8) & 0xff) - amount);
  const b = Math.max(0, (n & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

const items = [
  {
    name: "WhatsApp",
    href: "https://wa.me/917710556677",
    external: true,
    color: "#22c55e",
    dark:  "#15803d",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-sm">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "Call Us",
    href: "tel:+917710556677",
    color: "#f59e0b",
    dark:  "#b45309",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-sm">
        <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C9.61 21 3 14.39 3 6c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>
    ),
  },
  {
    name: "Email Us",
    href: "mailto:info@bmihousing.com",
    color: "#6366f1",
    dark:  "#4338ca",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-sm">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
  {
    name: "Location",
    href: "https://maps.app.goo.gl/qN62fCVttpLS3egV7",
    external: true,
    color: "#ef4444",
    dark:  "#b91c1c",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-sm">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    ),
  },
];

function Btn3D({ item, index }) {
  const [pressed, setPressed] = useState(false);

  const shadow = pressed
    ? `
        0 1px 0 rgba(255,255,255,0.25) inset,
        0 2px 0 ${item.dark},
        0 4px 10px ${item.color}50
      `
    : `
        0 1px 0 rgba(255,255,255,0.35) inset,
        0 5px 0 ${item.dark},
        0 8px 24px ${item.color}55,
        0 2px 6px rgba(0,0,0,0.25)
      `;

  const motionProps = {
    initial:   { opacity: 0, x: 20 },
    animate:   { opacity: 1, x: 0 },
    transition: { delay: 1.2 + index * 0.1, duration: 0.5, type: "spring", stiffness: 260, damping: 22 },
    whileHover: { scale: 1.12, y: -2 },
    whileTap:   { scale: 0.93, y: 2 },
    onMouseDown:  () => setPressed(true),
    onMouseUp:    () => setPressed(false),
    onMouseLeave: () => setPressed(false),
    className: "group relative w-11 h-11 rounded-2xl flex items-center justify-center text-white overflow-hidden cursor-pointer transition-shadow duration-150",
    style: {
      background: `linear-gradient(160deg, ${item.color}ee 0%, ${item.color} 50%, ${item.dark} 100%)`,
      boxShadow: shadow,
    },
    "aria-label": item.name,
  };

  const inner = (
    <>
      {/* Gloss overlay */}
      <span
        className="pointer-events-none absolute top-0 left-0 right-0 h-[52%] rounded-t-2xl"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.04) 100%)" }}
      />
      {/* Rim highlight (left+top edge) */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.4), inset -1px -1px 0 rgba(0,0,0,0.15)" }}
      />
      {/* Icon */}
      <span className="relative z-10">{item.icon}</span>
      {/* Tooltip */}
      <span className="pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg text-white text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0"
        style={{ background: "rgba(10,10,20,0.88)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: `0 4px 14px ${item.color}40` }}>
        {item.name}
        <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
          style={{ background: "rgba(10,10,20,0.88)", borderRight: "1px solid rgba(255,255,255,0.1)", borderTop: "1px solid rgba(255,255,255,0.1)" }} />
      </span>
    </>
  );

  if (item.external) return <motion.a href={item.href} target="_blank" rel="noopener" {...motionProps}>{inner}</motion.a>;
  if (item.href)     return <motion.a href={item.href} {...motionProps}>{inner}</motion.a>;
  return <motion.button data-jump={item.jump} {...motionProps}>{inner}</motion.button>;
}

export default function SideActions() {
  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {items.map((item, i) => (
        <Btn3D key={item.name} item={item} index={i} />
      ))}
    </aside>
  );
}
