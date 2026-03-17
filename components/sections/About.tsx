"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// ─── Animated counter ───────────────────────────────────────────────────────
function AnimatedNumber({
  value,
  suffix = "",
  delay = 0,
}: {
  value: number;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay }}
        >
          <Counter from={0} to={value} duration={2} delay={delay} />
          {suffix}
        </motion.span>
      )}
    </motion.span>
  );
}

function Counter({
  from,
  to,
  duration,
  delay,
}: {
  from: number;
  to: number;
  duration: number;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        <CounterInner from={from} to={to} duration={duration} delay={delay} started={isInView} />
      </motion.span>
    </motion.span>
  );
}

function CounterInner({
  from,
  to,
  duration,
  delay,
  started,
}: {
  from: number;
  to: number;
  duration: number;
  delay: number;
  started: boolean;
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!started) return;

    const timeout = setTimeout(() => {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;

      const tick = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(from + (to - from) * eased));

        if (now < endTime) {
          requestAnimationFrame(tick);
        } else {
          setCount(to);
        }
      };

      requestAnimationFrame(tick);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [from, to, duration, delay, started]);

  return <>{count}</>;
}

import { useEffect, useState } from "react";

// ─── Main About Component ────────────────────────────────────────────────────
export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large background text */}
        <motion.span
          className="absolute -left-20 top-1/4 text-[20vw] font-black text-white/[0.02] font-syne leading-none select-none"
          style={{ y: textY }}
        >
          ABOUT
        </motion.span>

        {/* Diagonal accent line */}
        <div
          className="absolute top-0 left-1/3 w-px h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(200,169,110,0.1) 30%, rgba(200,169,110,0.1) 70%, transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Left column — Image stack */}
          <div className="lg:col-span-5 relative">
            <motion.div
              className="relative"
              style={{ y: imageY }}
            >
              {/* Main image */}
              <motion.div
                className="relative aspect-[3/4] rounded-sm overflow-hidden"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(145deg, #1a1208 0%, #2a1f0e 40%, #1a1208 100%)",
                  }}
                />
                {/* Overlay gradient */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 50%)",
                  }}
                />
              </motion.div>

              {/* Floating accent card */}
              <motion.div
                className="absolute -bottom-8 -right-8 md:-right-12 p-6 rounded-sm"
                style={{
                  background: "rgba(17,17,17,0.95)",
                  border: "1px solid rgba(200,169,110,0.2)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, x: 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[10px] tracking-[0.3em] text-gold/60 uppercase font-inter mb-2">
                  Founded
                </p>
                <p className="text-4xl font-bold text-white font-syne">2016</p>
                <p className="text-xs text-white/30 font-inter mt-1">
                  London, UK
                </p>
              </motion.div>

              {/* Corner decoration */}
              <motion.div
                className="absolute -top-4 -left-4 w-16 h-16"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gold/30" />
                <div className="absolute top-0 left-0 w-px h-full bg-gold/30" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right column — Content */}
          <div className="lg:col-span-7 lg:pl-12">
            {/* Section label */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] tracking-[0.4em] text-gold uppercase font-inter">
                About Us
              </span>
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[11px] tracking-[0.2em] text-white/20 font-inter">
                001
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-syne leading-[1.1] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Crafting visuals that
              <br />
              <span className="text-gold">demand attention</span>
            </motion.h2>

            {/* Description paragraphs */}
            <motion.div
              className="mt-8 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-lg leading-relaxed text-white/50 font-inter">
                We're a London-based creative studio obsessed with the art of
                visual storytelling. From cinematic brand films to striking
                photography, we create work that resonates.
              </p>
              <p className="text-base leading-relaxed text-white/35 font-inter">
                Our approach blends technical precision with creative intuition.
                Every frame is intentional, every edit purposeful. We don't just
                capture moments—we craft experiences that leave lasting impressions.
              </p>
            </motion.div>

            {/* Expertise tags */}
            <motion.div
              className="mt-10 flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                "Cinematography",
                "Photography",
                "Creative Direction",
                "Color Grading",
                "Motion Design",
                "Brand Strategy",
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 text-xs tracking-wide font-inter rounded-full"
                  style={{
                    background: "rgba(200,169,110,0.08)",
                    border: "1px solid rgba(200,169,110,0.15)",
                    color: "rgba(200,169,110,0.7)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats grid */}
            <motion.div
              className="mt-14 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { value: 150, suffix: "+", label: "Projects Delivered" },
                { value: 40, suffix: "+", label: "Global Clients" },
                { value: 12, suffix: "", label: "Industry Awards" },
                { value: 8, suffix: "", label: "Team Members" },
              ].map((stat, i) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-bold text-white font-syne">
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      delay={0.5 + i * 0.1}
                    />
                  </p>
                  <p className="text-xs text-white/30 font-inter mt-2 leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
