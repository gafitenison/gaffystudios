"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";

// ─── Text reveal animation ─────────────────────────────────────────────────
function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%", rotate: 3 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{
          duration: 1.2,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ─── Rotating badge ────────────────────────────────────────────────────────
function RotatingBadge() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotate: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, []);

  const text = "CREATIVE AGENCY • LONDON • EST. 2024 • ";

  return (
    <motion.div
      className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
      initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative w-32 h-32">
        <svg
          ref={ref}
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            className="fill-gold/60"
            style={{
              fontSize: "8.5px",
              letterSpacing: "0.15em",
              fontFamily: "var(--font-inter)",
              textTransform: "uppercase",
            }}
          >
            <textPath href="#circlePath">{text}</textPath>
          </text>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-gold text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            ✦
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Video preview on hover ─────────────────────────────────────────────────
function ShowreelPreview() {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-sm"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Placeholder gradient */}
      <div
        className="absolute inset-0 transition-transform duration-700"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a150d 40%, #0f0d08 100%)",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Video layer */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        {/* Add your showreel video source here */}
      </video>

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.2) 50%, transparent 100%)",
          opacity: isHovered ? 0.6 : 0.8,
        }}
      />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="absolute w-24 h-24 rounded-full transition-all duration-500"
            style={{
              background: isHovered
                ? "rgba(200,169,110,0.15)"
                : "rgba(255,255,255,0.05)",
              border: isHovered
                ? "1px solid rgba(200,169,110,0.4)"
                : "1px solid rgba(255,255,255,0.1)",
            }}
          />
          <motion.span
            className="relative z-10 text-white text-3xl"
            animate={{ x: isHovered ? 2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▶
          </motion.span>
        </motion.div>
      </div>

      {/* Corner label */}
      <div className="absolute bottom-4 left-4">
        <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-inter">
          Watch Showreel
        </p>
        <p className="text-xs text-white/20 font-inter mt-1">2:34</p>
      </div>

      {/* Year badge */}
      <div className="absolute top-4 right-4">
        <span
          className="px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase font-inter rounded-full"
          style={{
            background: "rgba(200,169,110,0.1)",
            border: "1px solid rgba(200,169,110,0.25)",
            color: "#c8a96e",
          }}
        >
          2024 Reel
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Hero Component ────────────────────────────────────────────────────
export default function HeroAgency() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Diagonal line accent */}
      <motion.div
        className="absolute top-0 right-0 w-px h-[120vh] origin-top hidden lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(200,169,110,0.3) 30%, rgba(200,169,110,0.3) 70%, transparent)",
          transform: "rotate(15deg) translateX(200px)",
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div style={{ y, opacity }} className="relative">
        {/* Main content */}
        <div className="mx-auto max-w-7xl px-5 md:px-10 pt-40 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left column — Typography */}
            <div className="relative">
              {/* Eyebrow */}
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="w-12 h-px bg-gold/50" />
                <span className="text-[11px] tracking-[0.4em] text-gold uppercase font-inter">
                  Creative Studio
                </span>
              </motion.div>

              {/* Main headline */}
              <h1 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.03em] text-white font-syne">
                <RevealText delay={0.3}>We craft</RevealText>
                <br />
                <RevealText delay={0.45}>visual</RevealText>
                <br />
                <span className="relative inline-block">
                  <RevealText delay={0.6} className="text-gold">
                    stories
                  </RevealText>
                  <motion.span
                    className="absolute -right-8 top-0 text-gold/30 text-[0.4em]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    ™
                  </motion.span>
                </span>
              </h1>

              {/* Description */}
              <motion.p
                className="mt-10 max-w-md text-base leading-relaxed text-white/40 font-inter"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                London-based creative agency specializing in cinematography,
                photography, and visual storytelling. We transform brands into
                unforgettable experiences.
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="mt-10 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Link
                  href="/work"
                  className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-sm tracking-wider text-black font-inter font-medium"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    View Our Work
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                    style={{ background: "#d4b97a" }}
                  />
                </Link>

                <Link
                  href="/contact"
                  className="group flex items-center gap-3 px-6 py-4 text-sm tracking-wider text-white/50 font-inter transition-colors duration-300 hover:text-white"
                >
                  <span
                    className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                    style={{ boxShadow: "0 0 8px rgba(74,222,128,0.5)" }}
                  />
                  Available for projects
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                className="mt-16 pt-8 border-t border-white/5 grid grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                {[
                  { value: "150+", label: "Projects" },
                  { value: "8+", label: "Years" },
                  { value: "40+", label: "Clients" },
                ].map((stat, i) => (
                  <div key={stat.label}>
                    <motion.p
                      className="text-3xl font-bold text-white font-syne"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs text-white/30 font-inter mt-1 tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right column — Showreel preview */}
            <div className="relative lg:pl-8">
              <ShowreelPreview />
              <RotatingBadge />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <span className="text-[10px] tracking-[0.35em] text-white/25 uppercase font-inter">
            Scroll to explore
          </span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 5%, rgba(200,169,110,0.3) 50%, transparent 95%)",
        }}
      />
    </section>
  );
}
