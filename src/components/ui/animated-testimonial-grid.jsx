"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const IMAGE_POSITIONS = [
  { top: "4%",  left: "12%",  size: "w-20 h-20",  hidden: "hidden lg:block" },
  { top: "12%", left: "32%",  size: "w-16 h-16",  hidden: "hidden md:block" },
  { top: "3%",  left: "53%",  size: "w-14 h-14",  hidden: "hidden md:block" },
  { top: "8%",  right: "12%", size: "w-24 h-24",  hidden: "hidden lg:block" },
  { top: "28%", right: "4%",  size: "w-18 h-18",  hidden: "hidden md:block" },
  { top: "48%", right: "8%",  size: "w-20 h-20",  hidden: "hidden lg:block" },
  { top: "48%", left: "4%",   size: "w-24 h-24",  hidden: "hidden md:block" },
  { bottom: "6%",  left: "18%",  size: "w-18 h-18", hidden: "hidden lg:block" },
  { bottom: "14%", left: "42%",  size: "w-14 h-14", hidden: "hidden md:block" },
  { bottom: "8%",  right: "28%", size: "w-20 h-20", hidden: "hidden md:block" },
  { bottom: "2%",  right: "12%", size: "w-18 h-18", hidden: "hidden lg:block" },
  /* mobile-only */
  { top: "8%",    left: "4%",   size: "w-16 h-16", hidden: "block md:hidden" },
  { top: "4%",    right: "8%",  size: "w-18 h-18", hidden: "block md:hidden" },
  { bottom: "4%", left: "8%",   size: "w-18 h-18", hidden: "block md:hidden" },
  { bottom: "8%", right: "4%",  size: "w-16 h-16", hidden: "block md:hidden" },
];

function FloatingImage({ src, alt, pos, index }) {
  const yRange = React.useMemo(() => -(Math.random() * 12 + 6), []);
  const dur    = React.useMemo(() => Math.random() * 4 + 5, []);
  return (
    <motion.div
      className={`absolute rounded-xl shadow-xl overflow-hidden ${pos.size} ${pos.hidden}`}
      style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 240, damping: 20, delay: index * 0.07 }}
      whileHover={{ scale: 1.12, zIndex: 20 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        animate={{ y: [0, yRange, 0] }}
        transition={{ duration: dur, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export function AnimatedTestimonialGrid({
  images = [],
  badgeText = "Amenities",
  title,
  description,
  items = [],
  ctaText,
  ctaHref,
  accentColor = "#22c55e",
  className = "",
}) {
  return (
    <section className={`relative w-full max-w-7xl mx-auto py-28 sm:py-36 px-4 ${className}`}>
      {/* Floating images */}
      {images.slice(0, IMAGE_POSITIONS.length).map((img, i) => (
        <FloatingImage key={i} src={img.src} alt={img.alt} pos={IMAGE_POSITIONS[i]} index={i} />
      ))}

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {badgeText && (
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.3em] uppercase"
            style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}40`, color: accentColor }}
          >
            {badgeText}
          </div>
        )}

        {title && (
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-2xl">
            {title}
          </h2>
        )}

        {description && (
          <p className="max-w-xl text-[15px] mb-8" style={{ color: "#6b7280" }}>
            {description}
          </p>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl text-left mb-8">
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-medium"
                style={{ background: "#ffffff", border: "1px solid #d1fae5", color: "#1c3a1c",
                         boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accentColor }} />
                {item}
              </div>
            ))}
          </div>
        )}

        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold text-white"
            style={{ background: accentColor, boxShadow: `0 4px 18px ${accentColor}55` }}
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </section>
  );
}

export default AnimatedTestimonialGrid;
