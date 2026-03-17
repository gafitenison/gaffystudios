"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  description: string;
  tags: string[];
  href: string;
  bg: string;
  accent: string;
}

const PRODUCTS: Product[] = [
  {
    id: "luts",
    title: "LUT Packs",
    subtitle: "Cinematic colour grading",
    price: "From £18",
    priceNote: "per pack",
    description:
      "Professional-grade LUTs crafted from real film shoots. Built for LOG footage — works with any major NLE.",
    tags: ["DaVinci", "Premiere", "FCPX", "Resolve"],
    href: "/shop/luts",
    bg: "linear-gradient(145deg, #0f0d08 0%, #1e1708 40%, #0f0d08 100%)",
    accent: "#c8a96e",
  },
  {
    id: "wallpapers",
    title: "Wallpapers",
    subtitle: "Phone & desktop",
    price: "From £5",
    priceNote: "per pack",
    description:
      "Cinematic stills from global shoots. Available in 4K for desktop and optimised for all phone sizes.",
    tags: ["4K Desktop", "iPhone", "Android", "Instant DL"],
    href: "/shop/wallpapers",
    bg: "linear-gradient(145deg, #08080f 0%, #10101e 40%, #08080f 100%)",
    accent: "#8a9ebb",
  },
];

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between min-h-[420px] md:min-h-[480px] transition-transform duration-500"
      style={{
        background: product.bg,
        border: hovered
          ? `1px solid ${product.accent}40`
          : "1px solid rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s",
      }}
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${product.accent}18, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Top — price badge */}
      <div className="flex items-start justify-between">
        <div>
          <p
            className="text-[10px] tracking-[0.35em] uppercase font-inter mb-1.5"
            style={{ color: `${product.accent}cc` }}
          >
            {product.subtitle}
          </p>
          <h3 className="text-3xl font-black text-white font-syne">
            {product.title}
          </h3>
        </div>
        <div className="text-right">
          <p
            className="text-xl font-bold font-syne"
            style={{ color: product.accent }}
          >
            {product.price}
          </p>
          <p className="text-[11px] text-white/30 font-inter">
            {product.priceNote}
          </p>
        </div>
      </div>

      {/* Middle — description (reveals on hover) */}
      <motion.p
        className="text-sm leading-relaxed text-white/50 font-inter"
        animate={{ opacity: hovered ? 1 : 0.4, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.4 }}
      >
        {product.description}
      </motion.p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 text-[11px] tracking-wide font-inter"
            style={{
              background: `${product.accent}12`,
              border: `1px solid ${product.accent}25`,
              color: `${product.accent}cc`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={product.href}
        className="group mt-2 flex items-center justify-between rounded-xl px-5 py-4 text-sm tracking-wide font-inter transition-all duration-300"
        style={{
          background: hovered ? `${product.accent}18` : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? product.accent + "40" : "rgba(255,255,255,0.08)"}`,
          color: hovered ? product.accent : "rgba(240,237,232,0.6)",
        }}
      >
        Browse {product.title}
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </motion.div>
  );
}

export default function ShopTeaser() {
  return (
    <section className="px-5 py-28 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-3 text-xs tracking-[0.4em] text-gold uppercase font-inter">
              The Shop
            </p>
            <h2 className="text-5xl font-black text-white font-syne md:text-6xl">
              Take the Aesthetic
              <br />
              <span className="text-gold">Home.</span>
            </h2>
          </motion.div>

          <motion.p
            className="max-w-xs text-sm leading-relaxed text-white/40 font-inter md:text-right"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Professional tools and assets from real shoots — built for creators
            who take their work seriously.
          </motion.p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Link
            href="/shop"
            className="group flex items-center gap-3 rounded-full border border-white/10 px-8 py-3.5 text-sm tracking-wider text-white/55 font-inter transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Visit the shop
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
