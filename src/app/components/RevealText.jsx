"use client";

import { motion } from "framer-motion";

/**
 * RevealText — single line wiped up from below.
 * Stack multiple <RevealText> elements with increasing `delay`
 * to get the cinematic line-by-line stagger from the prompt.
 */
export default function RevealText({
  children,
  text,
  delay = 0,
  duration = 1,
  ease = [0.25, 1, 0.5, 1],
  className = "",
  as = "span"
}) {
  const Tag = motion[as] || motion.span;
  const content = children ?? text;

  return (
    <span className={`block overflow-hidden leading-[1.05] ${className}`}>
      <Tag
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration, ease, delay: 0.15 + delay }}
        className="block"
      >
        {content}
      </Tag>
    </span>
  );
}
