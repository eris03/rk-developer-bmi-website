"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  Children,
  isValidElement,
} from "react";

const ZoomCtx = createContext({ goTo: () => {}, current: 0, total: 0 });
export const useZoom = () => useContext(ZoomCtx);

/* ─────────────────────────────────────────────────────────────────
   PINCH-ZOOM TRANSITION  (sections 0↔1 and 1↔2)

   Replicates exactly what happens when you spread two fingers on
   Google Maps to zoom in:

   • The current section SCALES UP from center — content explodes
     outward past the edges, blurs and vanishes (you flew through it)

   • Simultaneously the next section GROWS from a smaller state to
     fill the screen — like the next zoom-level tiles resolving into
     sharp focus beneath your fingers

   Forward (zoom in):
     exit:  scale 1 → 2.8,  fades out             (things rush past)
     enter: scale 0.55 → 1, fades in + sharpens    (ground approaches)

   Backward (zoom out):
     exit:  scale 1 → 0.38, fades out             (pulling away)
     enter: scale 1.6 → 1,  fades in + sharpens   (wider view settles)
───────────────────────────────────────────────────────────────── */
const pinchZoom = {
  enter: (dir) => ({
    opacity: 0,
    scale:   dir > 0 ? 0.55 : 1.6,
    filter:  dir > 0 ? "blur(10px) brightness(1.5)" : "blur(8px) brightness(0.7)",
  }),
  center: {
    opacity: 1,
    scale:   1,
    filter:  "blur(0px) brightness(1)",
    transition: {
      opacity: { duration: 0.9,  ease: "easeOut", delay: 0.1 },
      scale:   { duration: 1.6,  ease: [0.22, 1, 0.36, 1]   },
      filter:  { duration: 1.1,  ease: "easeOut"              },
    },
  },
  exit: (dir) => ({
    opacity: 0,
    scale:   dir > 0 ? 2.8 : 0.38,
    filter:  dir > 0 ? "blur(16px) brightness(2)" : "blur(12px) brightness(0.5)",
    transition: {
      opacity: { duration: 0.6,  ease: "easeIn"  },
      scale:   { duration: 1.1,  ease: dir > 0
                   ? [0.4, 0, 1, 0.5]
                   : [0, 0.5, 0.6, 1]            },
      filter:  { duration: 0.7,  ease: "easeIn"  },
    },
  }),
};

/* ─────────────────────────────────────────────────────────────────
   STANDARD TRANSITION  (all other sections)
   3-D Y-axis flip — unchanged from before
───────────────────────────────────────────────────────────────── */
const standard = {
  enter: (dir) => ({
    opacity:  0,
    rotateY:  dir > 0 ? 65 : -65,
    scale:    0.88,
    z:        -180,
  }),
  center: {
    opacity:  1,
    rotateY:  0,
    scale:    1,
    z:        0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir) => ({
    opacity:  0,
    rotateY:  dir > 0 ? -360 : 360,
    scale:    0.55,
    z:        -400,
    transition: { duration: 1.1, ease: [0.55, 0, 1, 0.45] },
  }),
};

/* ─────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────── */
const SCROLL_THRESHOLD = 80;
const SWIPE_THRESHOLD  = 50;
const COOLDOWN_MS      = 2000;

const isPinch = (from, to) =>
  (from === 0 && to === 1) ||
  (from === 1 && to === 0) ||
  (from === 1 && to === 2) ||
  (from === 2 && to === 1);

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function ZoomStage({ children, onSectionChange }) {
  const items = Children.toArray(children).filter(isValidElement);
  const total = items.length;

  const [current,   setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [usePinch,  setUsePinch]  = useState(false);

  const currentRef    = useRef(0);
  const lastChangeRef = useRef(0);
  const accumRef      = useRef(0);

  const goTo = (idx) => {
    const now = Date.now();
    if (now - lastChangeRef.current < COOLDOWN_MS) return;

    const clamped = Math.max(0, Math.min(total - 1, idx));
    if (clamped === currentRef.current) return;

    const dir   = clamped > currentRef.current ? 1 : -1;
    const pinch = isPinch(currentRef.current, clamped);

    lastChangeRef.current = now;
    currentRef.current    = clamped;
    accumRef.current      = 0;

    setUsePinch(pinch);
    setDirection(dir);
    setCurrent(clamped);
    onSectionChange?.(clamped);
  };

  // ── Wheel ──
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      accumRef.current += e.deltaY;
      if (accumRef.current > SCROLL_THRESHOLD) {
        accumRef.current = 0;
        goTo(currentRef.current + 1);
      } else if (accumRef.current < -SCROLL_THRESHOLD) {
        accumRef.current = 0;
        goTo(currentRef.current - 1);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // ── Touch swipe ──
  useEffect(() => {
    let startY = null;
    const onStart = (e) => { startY = e.touches[0].clientY; };
    const onEnd   = (e) => {
      if (startY == null) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (dy >  SWIPE_THRESHOLD) goTo(currentRef.current + 1);
      if (dy < -SWIPE_THRESHOLD) goTo(currentRef.current - 1);
      startY = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // ── Keyboard ──
  useEffect(() => {
    const onKey = (e) => {
      if (["ArrowDown","PageDown","Space"].includes(e.code)) { e.preventDefault(); goTo(currentRef.current + 1); }
      if (["ArrowUp","PageUp"].includes(e.code))             { e.preventDefault(); goTo(currentRef.current - 1); }
      if (e.code === "Home") { e.preventDefault(); goTo(0); }
      if (e.code === "End")  { e.preventDefault(); goTo(total - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // ── data-jump clicks ──
  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest("[data-jump]");
      if (!el) return;
      const idx = parseInt(el.getAttribute("data-jump"), 10);
      if (!isNaN(idx)) { e.preventDefault(); goTo(idx); }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const variants = usePinch ? pinchZoom : standard;

  return (
    <ZoomCtx.Provider value={{ goTo, current, total }}>
      {/*
        zoom-stage has perspective set in CSS.
        For pinch transitions we don't want perspective distortion,
        so we neutralise it per-scene via style when pinch is active.
      */}
      <div className="zoom-stage">
        {/*
          mode="sync" lets both the exiting and entering elements
          animate at the same time — essential for the pinch-zoom
          feel where the old content "flies past" while the new
          content rises up simultaneously.
        */}
        <AnimatePresence mode="sync" custom={direction}>
          <motion.div
            key={current}
            className="zoom-scene"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={usePinch ? { transformStyle: "flat", perspective: "none" } : undefined}
          >
            {items[current]}
          </motion.div>
        </AnimatePresence>
      </div>
    </ZoomCtx.Provider>
  );
}
