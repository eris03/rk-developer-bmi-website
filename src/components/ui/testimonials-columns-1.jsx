"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => {
  return (
    <div className={className} style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5 pb-5"
      >
        {[0, 1].map((copyIndex) => (
          <React.Fragment key={copyIndex}>
            {testimonials.map(({ text, image, name, role, accent }, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden max-w-xs w-full"
                style={{
                  background: "#ffffff",
                  border: "1px solid #d1fae5",
                  boxShadow: "0 4px 20px rgba(22,163,74,0.08)",
                }}
              >
                {/* Image */}
                <div style={{ height: "140px", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    style={{ display: "block" }}
                  />
                </div>
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: accent || "#22c55e" }}
                    />
                    <span
                      className="text-[11px] font-bold tracking-[0.2em] uppercase"
                      style={{ color: accent || "#16a34a" }}
                    >
                      {role}
                    </span>
                  </div>
                  <div
                    className="font-extrabold text-[15px] mb-1.5 leading-tight"
                    style={{ color: "#1c3a1c" }}
                  >
                    {name}
                  </div>
                  <div
                    className="text-[12px] leading-relaxed"
                    style={{ color: "#6b7280" }}
                  >
                    {text}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialsColumn;
