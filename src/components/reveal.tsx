"use client";

import { m } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/**
 * Fades content in once it enters the viewport.
 * Content stays visible without JS or with reduced motion (see globals.css).
 */
/** A connector line that draws once (scale from 0) when it enters the viewport. */
export function DrawLine({
  className,
  axis = "x",
}: {
  className?: string;
  axis?: "x" | "y";
}) {
  const from = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const to = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };
  return (
    <m.span
      aria-hidden
      data-reveal
      className={className}
      style={{ originX: 0, originY: 0 }}
      initial={from}
      whileInView={to}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
