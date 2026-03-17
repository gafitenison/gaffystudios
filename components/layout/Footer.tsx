"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

// Inline SVG icons — no icon library needed
function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <IconInstagram />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: <IconYouTube />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me",
    icon: <IconWhatsApp />,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid #c8a96e30" }}
    >
      {/* Subtle glow behind top border */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4"
        style={{
          background:
            "linear-gradient(90deg, transparent, #c8a96e50, transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10">
        {/* Main row */}
        <motion.div
          className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand */}
          <div className="flex flex-col gap-3 md:max-w-xs">
            <Link
              href="/"
              className="text-xl font-bold tracking-[0.15em] text-white uppercase font-syne"
            >
              Gaffy<span className="text-gold">.</span>
            </Link>
            <p className="text-sm leading-relaxed text-white/35 font-inter">
              London-based photographer, videographer and cinematographer.
              Available worldwide.
            </p>
            <a
              href="mailto:hello@gaffystudios.com"
              className="mt-1 text-sm text-gold/70 hover:text-gold font-inter transition-colors duration-200"
            >
              hello@gaffystudios.com
            </a>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase font-inter mb-1">
              Navigation
            </p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/45 hover:text-white font-inter transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase font-inter">
              Social
            </p>
            <div className="flex flex-col gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-white/40 hover:text-white font-inter transition-colors duration-200"
                >
                  <span className="text-white/25 group-hover:text-gold transition-colors duration-200">
                    {s.icon}
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-14 flex flex-col gap-3 pt-6 md:flex-row md:items-center md:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs text-white/20 font-inter">
            © {year} GaffyStudios. All rights reserved.
          </p>
          <div className="flex gap-5">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/20 hover:text-white/50 font-inter transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
