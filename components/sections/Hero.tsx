"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import * as THREE from "three";

// ─── Lazy-load R3F (no SSR) ──────────────────────────────────────────────────
const Canvas = dynamic(
  () => import("@react-three/fiber").then((m) => m.Canvas),
  { ssr: false }
);

// ─── Text scramble hook ──────────────────────────────────────────────────────
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

function useScramble(text: string, started: boolean, delay = 0): string {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!started) return;

    timer.current = setTimeout(() => {
      frame.current = 0;
      const total = text.length * 3;

      interval.current = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < frame.current / 3) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        frame.current++;
        if (frame.current >= total) {
          clearInterval(interval.current!);
          setDisplay(text);
        }
      }, 28);
    }, delay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (interval.current) clearInterval(interval.current);
    };
  }, [text, started, delay]);

  return display;
}

// ─── WebGL scene ─────────────────────────────────────────────────────────────
import { useFrame } from "@react-three/fiber";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 1800;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.018;
    ref.current.rotation.x = Math.sin(t * 0.009) * 0.08;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#c8a96e"
        size={0.032}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Grid() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.055 + Math.sin(t * 0.4) * 0.012;
  });

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3.5, 0]}
    >
      <planeGeometry args={[40, 40, 28, 28]} />
      <meshBasicMaterial
        color="#c8a96e"
        wireframe
        transparent
        opacity={0.055}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <Particles />
      <Grid />
      <fog attach="fog" args={["#080808", 6, 22]} />
    </>
  );
}

// ─── Hero component ───────────────────────────────────────────────────────────
export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, []);

  const line1 = useScramble("CINEMATIC", ready, 0);
  const line2 = useScramble("VISUALS", ready, 220);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* ── WebGL canvas ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 70 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#080808" }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </div>

      {/* ── Vignette / depth overlay ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #080808 75%)",
        }}
      />
      {/* bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 h-40"
        style={{
          background: "linear-gradient(to top, #080808, transparent)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          className="mb-6 text-xs tracking-[0.45em] text-gold uppercase font-inter"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          London — Photography &amp; Film
        </motion.p>

        {/* Heading */}
        <h1
          className="text-[clamp(3.8rem,11vw,9.5rem)] font-black leading-none tracking-[-0.02em] text-white font-syne"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 55 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {line1}
          </motion.span>
          <motion.span
            className="block text-gold"
            initial={{ opacity: 0, y: 55 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
          >
            {line2}
          </motion.span>
        </h1>

        {/* Sub */}
        <motion.p
          className="mt-8 max-w-sm text-base leading-relaxed text-white/45 font-inter"
          style={{ fontWeight: 300 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          Crafting visual stories through the lens.
          <br />
          Based in London, shooting worldwide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Link
            href="/work"
            className="group flex items-center gap-3 rounded-full bg-gold px-8 py-3.5 text-sm tracking-wider text-black font-inter font-medium transition-all duration-300 hover:bg-[#d4b97a] hover:scale-[1.03]"
          >
            View Work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/shop"
            className="flex items-center gap-3 rounded-full border border-white/10 px-8 py-3.5 text-sm tracking-wider text-white/65 font-inter transition-all duration-300 hover:border-white/25 hover:text-white"
          >
            Shop LUTs
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <span className="text-[10px] tracking-[0.35em] text-white/25 uppercase font-inter">
          Scroll
        </span>
        <motion.div
          className="h-9 w-px bg-gradient-to-b from-white/25 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
