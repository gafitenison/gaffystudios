"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  "PHOTOGRAPHY",
  "VIDEOGRAPHY",
  "CINEMATOGRAPHY",
  "LONDON",
  "AVAILABLE WORLDWIDE",
  "CREATIVE DIRECTION",
  "COLOR GRADING",
  "MOTION PICTURE",
];

// Duplicate for seamless infinite loop
const ROW = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

interface RowProps {
  direction?: "left" | "right";
  speed?: number;
  dim?: boolean;
}

function MarqueeRow({ direction = "left", speed = 35, dim = false }: RowProps) {
  return (
    <>
      <style>{`
        @keyframes scroll-left  { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
      <div className="overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: `${
              direction === "left" ? "scroll-left" : "scroll-right"
            } ${speed}s linear infinite`,
            willChange: "transform",
          }}
        >
          {ROW.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-4 font-inter"
              style={{
                color: dim
                  ? "rgba(240,237,232,0.12)"
                  : "rgba(240,237,232,0.32)",
                fontSize: "0.7rem",
                letterSpacing: "0.35em",
                fontWeight: 500,
              }}
            >
              {item}
              <span
                className="inline-block h-1 w-1 rounded-full flex-shrink-0"
                style={{ background: "#c8a96e", opacity: dim ? 0.3 : 0.7 }}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Marquee() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      className="py-10 overflow-hidden"
      style={{
        opacity,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex flex-col gap-4">
        {/* Row 1 — scrolls left */}
        <MarqueeRow direction="left" speed={38} />

        {/* Row 2 — scrolls right, dimmer */}
        <MarqueeRow direction="right" speed={30} dim />
      </div>
    </motion.section>
  );
}
