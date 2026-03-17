"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

export default function ContactCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isHeadlineInView = useInView(headlineRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Split text animation
  const headline = "Let's create something extraordinary";
  const words = headline.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative py-40 md:py-52 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(200,169,110,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Animated lines */}
        <motion.div
          className="absolute top-0 left-1/4 w-px h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(200,169,110,0.15) 30%, rgba(200,169,110,0.15) 70%, transparent)",
            y,
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-px h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(200,169,110,0.1) 40%, rgba(200,169,110,0.1) 60%, transparent)",
            y,
          }}
        />

        {/* Corner decorations */}
        <div className="absolute top-20 left-10 w-24 h-24 hidden lg:block">
          <div className="absolute top-0 left-0 w-full h-px bg-gold/20" />
          <div className="absolute top-0 left-0 w-px h-full bg-gold/20" />
        </div>
        <div className="absolute bottom-20 right-10 w-24 h-24 hidden lg:block">
          <div className="absolute bottom-0 right-0 w-full h-px bg-gold/20" />
          <div className="absolute bottom-0 right-0 w-px h-full bg-gold/20" />
        </div>
      </div>

      <motion.div
        className="relative mx-auto max-w-5xl px-5 md:px-10 text-center"
        style={{ opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-8 h-px bg-gold/40" />
          <span
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.4em] text-gold uppercase font-inter"
          >
            <span
              className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
              style={{ boxShadow: "0 0 8px rgba(74,222,128,0.5)" }}
            />
            Available for Q1 2025
          </span>
          <div className="w-8 h-px bg-gold/40" />
        </motion.div>

        {/* Main headline */}
        <h2
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white font-syne leading-[1.05] tracking-[-0.03em]"
        >
          {words.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.3em]">
              <motion.span
                className="inline-block"
                initial={{ y: "100%", rotate: 3 }}
                animate={isHeadlineInView ? { y: 0, rotate: 0 } : {}}
                transition={{
                  duration: 0.9,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word === "extraordinary" ? (
                  <span className="text-gold">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Subtitle */}
        <motion.p
          className="mt-8 max-w-xl mx-auto text-lg leading-relaxed text-white/40 font-inter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Whether it's a brand film, campaign, or creative direction—we're
          ready to bring your vision to life.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {/* Primary CTA */}
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full px-10 py-5 text-sm tracking-wider font-inter font-medium"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: isHovered
                  ? "linear-gradient(135deg, #d4b97a 0%, #c8a96e 100%)"
                  : "linear-gradient(135deg, #c8a96e 0%, #a88d5a 100%)",
              }}
              animate={{
                scale: isHovered ? 1 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-3 text-black">
              Start a Project
              <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </span>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="mailto:hello@gaffystudios.com"
            className="group flex items-center gap-3 px-8 py-5 text-sm tracking-wider text-white/50 font-inter transition-colors duration-300 hover:text-white"
          >
            hello@gaffystudios.com
            <span className="text-gold group-hover:translate-x-1 transition-transform duration-300">
              ↗
            </span>
          </Link>
        </motion.div>

        {/* Decorative element */}
        <motion.div
          className="mt-20 flex items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {["London", "Paris", "Dubai", "Tokyo"].map((city, i) => (
            <span
              key={city}
              className="text-[10px] tracking-[0.3em] text-white/15 uppercase font-inter"
            >
              {city}
              {i < 3 && (
                <span className="ml-8 text-gold/30">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #080808, transparent)",
        }}
      />
    </section>
  );
}
