"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// Placeholder logos (text-based for now)
const CLIENTS = [
  { name: "Nike", industry: "Sportswear" },
  { name: "Sony", industry: "Electronics" },
  { name: "Vogue", industry: "Fashion" },
  { name: "Apple", industry: "Technology" },
  { name: "Netflix", industry: "Entertainment" },
  { name: "Gucci", industry: "Luxury" },
  { name: "BMW", industry: "Automotive" },
  { name: "Spotify", industry: "Music" },
];

const TESTIMONIALS = [
  {
    quote:
      "Their cinematic vision transformed our brand story. Every frame was intentional, every shot purposeful. The final film exceeded all expectations.",
    author: "Sarah Chen",
    role: "Brand Director",
    company: "Nike EMEA",
  },
  {
    quote:
      "Working with GaffyStudios was seamless. They understood our vision from day one and delivered something truly remarkable.",
    author: "Marcus Webb",
    role: "Creative Lead",
    company: "Sony Music",
  },
];

function ClientLogo({ name, index }: { name: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center p-8 rounded-sm transition-all duration-500 hover:bg-white/[0.02]"
      style={{ border: "1px solid rgba(255,255,255,0.04)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        borderColor: "rgba(200,169,110,0.2)",
        transition: { duration: 0.3 },
      }}
    >
      <span className="text-xl font-bold text-white/20 font-syne tracking-wider hover:text-white/40 transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative p-8 md:p-10 rounded-sm"
      style={{
        background:
          "linear-gradient(145deg, rgba(17,17,17,0.8) 0%, rgba(22,22,22,0.6) 100%)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Quote mark */}
      <span
        className="absolute -top-4 left-8 text-6xl font-serif leading-none"
        style={{ color: "rgba(200,169,110,0.2)" }}
      >
        "
      </span>

      {/* Quote */}
      <blockquote className="relative z-10">
        <p className="text-lg md:text-xl leading-relaxed text-white/60 font-inter">
          {testimonial.quote}
        </p>
      </blockquote>

      {/* Author */}
      <div className="mt-8 flex items-center gap-4">
        {/* Avatar placeholder */}
        <div
          className="w-12 h-12 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #c8a96e 0%, #8a7a4e 100%)",
          }}
        />
        <div>
          <p className="text-sm font-medium text-white font-inter">
            {testimonial.author}
          </p>
          <p className="text-xs text-white/30 font-inter mt-0.5">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-px h-full"
          style={{
            background:
              "linear-gradient(to top, rgba(200,169,110,0.3), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-full h-px"
          style={{
            background:
              "linear-gradient(to left, rgba(200,169,110,0.3), transparent)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Clients() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          y: bgY,
        }}
      />

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-px bg-white/10" />
            <span className="text-[11px] tracking-[0.4em] text-gold uppercase font-inter">
              Trusted By
            </span>
            <div className="w-12 h-px bg-white/10" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-syne leading-[1.1] tracking-[-0.02em]"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            World-class brands
            <br />
            <span className="text-gold">choose us</span>
          </motion.h2>

          <motion.p
            className="mt-6 max-w-lg mx-auto text-base leading-relaxed text-white/40 font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We've partnered with leading brands across fashion, tech,
            entertainment, and beyond to create visual content that resonates.
          </motion.p>
        </div>

        {/* Client logos grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-24">
          {CLIENTS.map((client, index) => (
            <ClientLogo key={client.name} name={client.name} index={index} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="relative">
          {/* Section divider */}
          <motion.div
            className="flex items-center gap-6 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[11px] tracking-[0.4em] text-white/20 uppercase font-inter">
              What They Say
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </motion.div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
