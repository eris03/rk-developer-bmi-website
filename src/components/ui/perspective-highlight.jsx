"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

/**
 * Perspective — 3D tilt container driven by mouse position.
 *
 * Sets CSS custom properties --rx, --ry, --lift on the outer wrapper so that
 * any <Highlight> descendant can read them and float forward.
 *
 * Props:
 *  maxRotateX   – max tilt on X axis (deg).  Default 14.
 *  maxRotateY   – max tilt on Y axis (deg).  Default 30.
 *  smoothing    – lerp factor 0–1.           Default 0.12.
 *  className    – outer perspective wrapper classes.
 *  cardClassName – rotating inner card div classes.
 */
export const Perspective = ({
  maxRotateX  = 14,
  maxRotateY  = 30,
  smoothing   = 0.12,
  className,
  cardClassName,
  children,
  ...props
}) => {
  const containerRef = useRef(null);
  const cardRef      = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const card      = cardRef.current;
    if (!container || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0, targetY = 0;
    let rotX    = 0, rotY    = 0;
    let raf     = 0;

    const onMove = (e) => {
      const r       = card.getBoundingClientRect();
      const dx      = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
      const dy      = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
      const dist    = Math.hypot(dx, dy);
      const falloff = dist <= 1 ? 1 : Math.max(0, 1 - (dist - 1) / 2);

      targetX = clamp(dy, -1, 1) * maxRotateX * falloff;
      targetY = -clamp(dx, -1, 1) * maxRotateY * falloff;
    };

    const onLeave = () => { targetX = 0; targetY = 0; };

    const tick = () => {
      rotX += (targetX - rotX) * smoothing;
      rotY += (targetY - rotY) * smoothing;

      const lift = Math.min(1, Math.hypot(rotX / maxRotateX, rotY / maxRotateY));

      container.style.setProperty("--rx",   `${rotX.toFixed(2)}deg`);
      container.style.setProperty("--ry",   `${rotY.toFixed(2)}deg`);
      container.style.setProperty("--lift", lift.toFixed(3));

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    tick();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [maxRotateX, maxRotateY, smoothing]);

  return (
    <div
      ref={containerRef}
      className={cn("[perspective:1200px]", className)}
      {...props}
    >
      {/* preserve-3d passthrough — must fill parent */}
      <div className="[transform-style:preserve-3d] w-full h-full">
        <div
          ref={cardRef}
          className={cn("will-change-transform", cardClassName ?? "max-w-[480px] p-10")}
          style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Highlight — inline badge that floats toward the viewer when the card tilts.
 *
 * Reads --lift from the nearest Perspective ancestor.
 * color: "green" | "orange" | "yellow" | "red" | "purple"
 */
export const Highlight = ({
  color     = "green",
  className,
  style,
  children,
  ...props
}) => (
  <span
    className={cn(
      "inline-block rounded-[4px] px-1.5 py-0.5 text-white will-change-[transform,box-shadow]",
      className,
    )}
    style={{
      background : `var(--perspective-${color}-bg)`,
      transform  : "translate(calc(-7px * var(--lift, 0)), calc(-5px * var(--lift, 0)))",
      boxShadow  : `rgba(var(--perspective-${color}-ring), calc(0.85 * var(--lift, 0))) 2px 1.5px 0px 0.75px,
                    rgba(var(--perspective-${color}-ring), calc(0.28 * var(--lift, 0))) 10px 5px 6px 0px`,
      ...style,
    }}
    {...props}
  >
    {children}
  </span>
);

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
