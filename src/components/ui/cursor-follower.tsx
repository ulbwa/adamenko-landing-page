"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CursorFollower() {
  const [rawPos, setRawPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cfg = { stiffness: 380, damping: 28, mass: 0.45 };
  const x = useSpring(rawPos.x, cfg);
  const y = useSpring(rawPos.y, cfg);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setRawPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const hide = () => setVisible(false);
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", hide);

    const updateListeners = () => {
      document
        .querySelectorAll("a, button, [role='button'], [data-hover]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };
    updateListeners();
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.15 } }}
    >
      {/* Glow halo */}
      <motion.div
        animate={{
          width: hovering ? 56 : 24,
          height: hovering ? 56 : 24,
          marginLeft: hovering ? -28 : -12,
          marginTop: hovering ? -28 : -12,
          backgroundColor: hovering
            ? "rgba(200,168,75,0.12)"
            : "rgba(200,168,75,0.0)",
          borderColor: hovering
            ? "rgba(200,168,75,0.9)"
            : "rgba(200,168,75,0.55)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="rounded-full border"
      />
      {/* Center dot */}
      <div
        className="absolute top-0 left-0 w-1.5 h-1.5 -mt-[3px] -ml-[3px] rounded-full bg-[#c8a84b]"
        style={{ opacity: hovering ? 0 : 0.9 }}
      />
    </motion.div>
  );
}
