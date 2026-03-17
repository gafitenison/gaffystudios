"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-5 pt-5 md:px-10"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      {/* Main bar */}
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-6 py-3.5 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,8,8,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
          border: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-base font-bold tracking-[0.18em] text-white font-syne uppercase"
        >
          Gaffy<span className="text-gold">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-sm tracking-[0.08em] text-white/55 transition-colors duration-300 hover:text-white font-inter"
              >
                {link.label}
                <span className="absolute -bottom-px left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA — desktop */}
        <Link
          href="/contact"
          className="hidden items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm tracking-wider text-white/70 transition-all duration-300 hover:border-gold hover:text-gold font-inter md:flex"
        >
          Book a shoot
        </Link>

        {/* Hamburger — mobile */}
        <button
          className="flex flex-col gap-1.5 p-1 md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-px w-6 bg-white origin-left"
            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : 0, scaleX: isOpen ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block h-px w-6 bg-white"
            animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 8 : 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block h-px w-6 bg-white origin-left"
            animate={{ rotate: isOpen ? -45 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mx-auto mt-2 overflow-hidden rounded-2xl max-w-7xl"
            style={{
              background: "rgba(8,8,8,0.96)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col px-6 py-5 gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -16, opacity: 0 }}
                  transition={{ delay: i * 0.06 + 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-xl text-white/60 hover:text-white font-syne transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -16, opacity: 0 }}
                transition={{ delay: navLinks.length * 0.06 + 0.1 }}
                className="mt-3 pt-3 border-t border-white/5"
              >
                <Link
                  href="/contact"
                  className="inline-block rounded-full border border-gold/40 px-6 py-2.5 text-sm tracking-wider text-gold font-inter"
                  onClick={() => setIsOpen(false)}
                >
                  Book a shoot
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
