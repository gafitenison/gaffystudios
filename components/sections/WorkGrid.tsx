"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Category = "Photography" | "Videography" | "Cinematography";
type Span = "half" | "full";

interface Work {
  id: string;
  slug: string;
  title: string;
  category: Category;
  location: string;
  year: string;
  span: Span;
  bg: string; // CSS gradient string — replace with real image paths
  video?: string;
}

const WORKS: Work[] = [
  {
    id: "01",
    slug: "golden-hour-london",
    title: "Golden Hour",
    category: "Photography",
    location: "London, UK",
    year: "2024",
    span: "half",
    bg: "linear-gradient(135deg, #1a1208 0%, #3d2a0e 50%, #1a1208 100%)",
  },
  {
    id: "02",
    slug: "nocturne-campaign",
    title: "Nocturne",
    category: "Videography",
    location: "Paris, FR",
    year: "2024",
    span: "half",
    bg: "linear-gradient(135deg, #08080f 0%, #1a1a2e 60%, #08080f 100%)",
    video: "/videos/nocturne.mp4",
  },
  {
    id: "03",
    slug: "solstice-film",
    title: "Solstice",
    category: "Cinematography",
    location: "Iceland",
    year: "2023",
    span: "full",
    bg: "linear-gradient(135deg, #0d1a14 0%, #0f2d1e 40%, #1a3322 70%, #0d1a14 100%)",
    video: "/videos/solstice.mp4",
  },
  {
    id: "04",
    slug: "meridian-portraits",
    title: "Meridian",
    category: "Photography",
    location: "Dubai, UAE",
    year: "2024",
    span: "half",
    bg: "linear-gradient(135deg, #1a0d00 0%, #3d2000 50%, #1a0d00 100%)",
  },
  {
    id: "05",
    slug: "fabric-of-night",
    title: "Fabric of Night",
    category: "Videography",
    location: "Tokyo, JP",
    year: "2023",
    span: "half",
    bg: "linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 50%, #0a0a0a 100%)",
    video: "/videos/fabric.mp4",
  },
  {
    id: "06",
    slug: "atlas",
    title: "Atlas",
    category: "Cinematography",
    location: "Morocco",
    year: "2024",
    span: "full",
    bg: "linear-gradient(135deg, #1a1000 0%, #3d2a0e 30%, #2a1800 70%, #1a1000 100%)",
    video: "/videos/atlas.mp4",
  },
];

const FILTERS = ["All", "Photography", "Videography", "Cinematography"] as const;
type Filter = (typeof FILTERS)[number];

function WorkCard({ work }: { work: Work }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  const enter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };
  const leave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link href={`/work/${work.slug}`} className="block">
      <motion.article
        className="relative overflow-hidden rounded-sm"
        style={{
          gridColumn: work.span === "full" ? "1 / -1" : undefined,
          aspectRatio: work.span === "full" ? "21 / 9" : "4 / 5",
        }}
        onMouseEnter={enter}
        onMouseLeave={leave}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background gradient (placeholder for real image) */}
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{
            background: work.bg,
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Video layer */}
        {work.video && (
          <video
            ref={videoRef}
            src={work.video}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        )}

        {/* Gradient overlay — always present */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 50%, transparent 100%)",
            opacity: hovered ? 1 : 0.5,
          }}
        />

        {/* Number tag */}
        <span className="absolute top-5 left-5 text-xs tracking-[0.3em] text-white/30 font-inter">
          {work.id}
        </span>

        {/* Category tag */}
        <motion.span
          className="absolute top-5 right-5 text-[10px] tracking-[0.25em] uppercase font-inter px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(200,169,110,0.1)",
            border: "1px solid rgba(200,169,110,0.25)",
            color: "#c8a96e",
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          {work.category}
        </motion.span>

        {/* Title + location */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.p
            className="text-xs tracking-[0.2em] text-white/40 uppercase font-inter mb-2"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3 }}
          >
            {work.location} · {work.year}
          </motion.p>
          <h3 className="text-2xl font-bold text-white font-syne tracking-tight">
            {work.title}
          </h3>
          <motion.div
            className="mt-3 flex items-center gap-2 text-sm text-gold font-inter"
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            View project
            <span>→</span>
          </motion.div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered =
    activeFilter === "All"
      ? WORKS
      : WORKS.filter((w) => w.category === activeFilter);

  return (
    <section className="px-5 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-3 text-xs tracking-[0.4em] text-gold uppercase font-inter">
              Selected Work
            </p>
            <h2 className="text-5xl font-black text-white font-syne md:text-6xl">
              The Archive
            </h2>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="relative rounded-full px-5 py-2 text-sm tracking-wide font-inter transition-colors duration-300"
                style={{
                  color:
                    activeFilter === filter
                      ? "#080808"
                      : "rgba(240,237,232,0.45)",
                  background:
                    activeFilter === filter ? "#c8a96e" : "transparent",
                  border:
                    activeFilter === filter
                      ? "1px solid #c8a96e"
                      : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/work"
            className="group flex items-center gap-3 rounded-full border border-white/10 px-8 py-3.5 text-sm tracking-wider text-white/60 font-inter transition-all duration-300 hover:border-gold hover:text-gold"
          >
            View full archive
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
