"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function calculateGap(width) {
  const minWidth = 1024, maxWidth = 1456, minGap = 60, maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function CircularTestimonials({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  onImageClick,
}) {
  const colorName        = colors.name            ?? "#000";
  const colorDesig       = colors.designation     ?? "#6b7280";
  const colorTestimony   = colors.testimony       ?? "#4b5563";
  const colorArrowBg     = colors.arrowBackground ?? "#141414";
  const colorArrowFg     = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHover  = colors.arrowHoverBackground ?? "#00a6fb";
  const fsName           = fontSizes.name         ?? "1.5rem";
  const fsDesig          = fontSizes.designation  ?? "0.925rem";
  const fsQuote          = fontSizes.quote        ?? "1.125rem";

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev]     = useState(false);
  const [hoverNext, setHoverNext]     = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef(null);
  const autoplayRef       = useRef(null);
  const len               = useMemo(() => testimonials.length, [testimonials]);
  const active            = useMemo(() => testimonials[activeIndex], [activeIndex, testimonials]);

  useEffect(() => {
    const measure = () => {
      if (imageContainerRef.current) setContainerWidth(imageContainerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => setActiveIndex(p => (p + 1) % len), 5000);
    }
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [autoplay, len]);

  const handleNext = useCallback(() => {
    setActiveIndex(p => (p + 1) % len);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [len]);

  const handlePrev = useCallback(() => {
    setActiveIndex(p => (p - 1 + len) % len);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [len]);

  function getImageStyle(index) {
    const gap       = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive  = index === activeIndex;
    const isLeft    = (activeIndex - 1 + len) % len === index;
    const isRight   = (activeIndex + 1) % len === index;
    if (isActive) return {
      zIndex: 3, opacity: 1, pointerEvents: "auto",
      transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    if (isLeft) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto",
      transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    if (isRight) return {
      zIndex: 2, opacity: 1, pointerEvents: "auto",
      transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
    return { zIndex: 1, opacity: 0, pointerEvents: "none", transition: "all 0.8s cubic-bezier(.4,2,.3,1)" };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -20 },
  };

  return (
    <div style={{ width: "100%", maxWidth: "56rem", padding: "2rem" }}>
      <div style={{ display: "grid", gap: "5rem" }} className="md:grid-cols-2-auto">
        {/* Images */}
        <div
          ref={imageContainerRef}
          style={{ position: "relative", width: "100%", height: "24rem", perspective: "1000px" }}
        >
          {testimonials.map((t, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={t.src}
                onClick={isActive && onImageClick ? () => onImageClick(i) : undefined}
                style={{
                  position: "absolute", width: "100%", height: "100%",
                  borderRadius: "1.5rem", overflow: "hidden",
                  cursor: isActive && onImageClick ? "pointer" : "default",
                  ...getImageStyle(i),
                }}
              >
                <img
                  src={t.src}
                  alt={t.name}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  }}
                />
                {/* Expand hint overlay on active image */}
                {isActive && onImageClick && (
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)",
                    borderRadius: "1.5rem",
                    display: "flex", alignItems: "flex-end", justifyContent: "center",
                    paddingBottom: "16px",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0"}
                  >
                    <span style={{
                      background: "rgba(255,255,255,0.95)",
                      color: "#14532d",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "6px 16px",
                      borderRadius: "999px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                      View All
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            variants={quoteVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <h3 style={{ color: colorName, fontSize: fsName, fontWeight: "bold", marginBottom: "0.25rem" }}>
              {active.name}
            </h3>
            <p style={{ color: colorDesig, fontSize: fsDesig, marginBottom: "1.5rem" }}>
              {active.designation}
            </p>
            <motion.p style={{ color: colorTestimony, fontSize: fsQuote, lineHeight: "1.75" }}>
              {active.quote.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut", delay: 0.025 * i }}
                  style={{ display: "inline-block" }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>

            <div style={{ display: "flex", gap: "1.5rem", paddingTop: "2rem" }}>
              <button
                onClick={handlePrev}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                aria-label="Previous"
                style={{
                  width: "2.7rem", height: "2.7rem", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", border: "none",
                  backgroundColor: hoverPrev ? colorArrowHover : colorArrowBg,
                  transition: "background-color 0.3s",
                }}
              >
                <FaArrowLeft size={18} color={colorArrowFg} />
              </button>
              <button
                onClick={handleNext}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                aria-label="Next"
                style={{
                  width: "2.7rem", height: "2.7rem", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", border: "none",
                  backgroundColor: hoverNext ? colorArrowHover : colorArrowBg,
                  transition: "background-color 0.3s",
                }}
              >
                <FaArrowRight size={18} color={colorArrowFg} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .md\\:grid-cols-2-auto {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .md\\:grid-cols-2-auto {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default CircularTestimonials;
