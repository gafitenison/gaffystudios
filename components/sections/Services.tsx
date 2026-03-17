"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  accent: string;
  href: string;
}

const SERVICES: Service[] = [
  {
    id: "cinematography",
    number: "01",
    title: "Cinematography",
    description:
      "Cinematic brand films, commercials, and music videos that captivate audiences. From concept to final grade.",
    features: ["Brand Films", "Commercials", "Music Videos", "Documentaries"],
    accent: "#c8a96e",
    href: "/services/cinematography",
  },
  {
    id: "photography",
    number: "02",
    title: "Photography",
    description:
      "Editorial and commercial photography that tells your story. Bold compositions, intentional lighting, striking results.",
    features: ["Brand Campaigns", "Editorial", "Portraits", "Product"],
    accent: "#8a9ebb",
    href: "/services/photography",
  },
  {
    id: "direction",
    number: "03",
    title: "Creative Direction",
    description:
      "Strategic creative leadership from ideation to execution. We shape brands and campaigns that resonate.",
    features: ["Brand Strategy", "Art Direction", "Campaign Design", "Visual Identity"],
    accent: "#bb8a8a",
    href: "/services/direction",
  },
  {
    id: "post",
    number: "04",
    title: "Post Production",
    description:
      "Color grading, editing, and finishing that elevates your footage. Signature looks, cinematic polish.",
    features: ["Color Grading", "Video Editing", "Motion Graphics", "Sound Design"],
    accent: "#8abb9a",
    href: "/services/post-production",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={service.href} className="block">
        <div
          className="relative overflow-hidden rounded-sm p-8 md:p-10 min-h-[380px] flex flex-col justify-between transition-all duration-500"
          style={{
            background: isHovered
              ? `linear-gradient(145deg, rgba(17,17,17,0.98) 0%, rgba(22,22,22,0.98) 100%)`
              : "rgba(17,17,17,0.6)",
            border: isHovered
              ? `1px solid ${service.accent}40`
              : "1px solid rgba(255,255,255,0.04)",
            transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          }}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${service.accent}15, transparent)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Corner accent */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-20"
            animate={{
              opacity: isHovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute top-0 right-0 w-px h-full"
              style={{ background: `${service.accent}50` }}
            />
            <div
              className="absolute top-0 right-0 w-full h-px"
              style={{ background: `${service.accent}50` }}
            />
          </motion.div>

          {/* Top section */}
          <div>
            {/* Number */}
            <div className="flex items-center justify-between mb-8">
              <span
                className="text-xs tracking-[0.3em] font-inter"
                style={{ color: `${service.accent}80` }}
              >
                {service.number}
              </span>
              <motion.span
                className="text-lg transition-transform duration-300"
                style={{ color: service.accent }}
                animate={{ x: isHovered ? 4 : 0, rotate: isHovered ? -45 : 0 }}
              >
                ↗
              </motion.span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-4">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/40 font-inter">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {service.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 text-[11px] tracking-wide font-inter rounded-full transition-all duration-300"
                  style={{
                    background: isHovered
                      ? `${service.accent}15`
                      : "rgba(255,255,255,0.03)",
                    border: isHovered
                      ? `1px solid ${service.accent}30`
                      : "1px solid rgba(255,255,255,0.05)",
                    color: isHovered ? service.accent : "rgba(255,255,255,0.35)",
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Hover line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ background: service.accent }}
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.span
          className="absolute -right-20 top-1/3 text-[15vw] font-black text-white/[0.015] font-syne leading-none select-none"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          SERVICES
        </motion.span>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] tracking-[0.4em] text-gold uppercase font-inter">
              What We Do
            </span>
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[11px] tracking-[0.2em] text-white/20 font-inter">
              002
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-syne leading-[1.1] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Full-service
              <br />
              <span className="text-gold">creative studio</span>
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed text-white/40 font-inter lg:text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We handle every aspect of visual production—from initial concept
              through final delivery. No outsourcing, no compromises.
            </motion.p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 border-t border-white/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm text-white/30 font-inter">
            Have a project in mind?
          </p>
          <Link
            href="/contact"
            className="group flex items-center gap-3 rounded-full border border-gold/30 px-8 py-3.5 text-sm tracking-wider text-gold font-inter transition-all duration-300 hover:bg-gold hover:text-black hover:border-gold"
          >
            Let&apos;s Talk
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
