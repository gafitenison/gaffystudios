"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Ring follows with spring lag
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springCfg = { damping: 28, stiffness: 220, mass: 0.5 };
  const ringX = useSpring(mouseX, springCfg);
  const ringY = useSpring(mouseY, springCfg);

  // Dot follows instantly
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
      if (!isVisible) setIsVisible(true);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    const attachHover = () => {
      document
        .querySelectorAll("a, button, [role='button'], [data-cursor]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Attach once DOM is ready, re-attach on navigation
    attachHover();
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      observer.disconnect();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Outer ring — spring-lagged */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99998]"
        style={{ x: ringX, y: ringY, opacity: isVisible ? 1 : 0 }}
        animate={{
          width: isHovering ? 56 : isClicking ? 28 : 40,
          height: isHovering ? 56 : isClicking ? 28 : 40,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <div
          className="h-full w-full rounded-full border transition-colors duration-200"
          style={{
            borderColor: isHovering ? "#c8a96e" : "rgba(255,255,255,0.5)",
            backgroundColor: isHovering
              ? "rgba(200,169,110,0.08)"
              : "transparent",
          }}
        />
      </motion.div>

      {/* Inner dot — instant */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[99999] h-1.5 w-1.5 rounded-full bg-[#c8a96e]"
        style={{ x: dotX, y: dotY, opacity: isVisible ? 1 : 0 }}
        animate={{ scale: isClicking ? 1.8 : 1 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
}
