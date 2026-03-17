"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/types/content";

const HERO_IMAGES = Array.from({ length: 12 }, (_, i) => `/images/hero/${i + 1}.jpg`);

function HeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * HERO_IMAGES.length));
  const [isFirst, setIsFirst] = useState(true);

  const advance = useCallback(() => {
    setIsFirst(false);
    setCurrentIndex((prev) => {
      let next: number;
      do {
        next = Math.floor(Math.random() * HERO_IMAGES.length);
      } while (next === prev && HERO_IMAGES.length > 1);
      return next;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(advance, 7000);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <div className="absolute inset-0 hidden md:block" aria-hidden="true">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={HERO_IMAGES[currentIndex]}
          alt=""
          initial={{ opacity: isFirst ? 0.18 : 0, scale: isFirst ? 1 : 1.08 }}
          animate={{ opacity: 0.18, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: isFirst ? 0 : 2, ease: "easeInOut" }, scale: { duration: 8, ease: "linear" } }}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </AnimatePresence>
    </div>
  );
}

export function HeroSection({ content }: { content: HeroContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, -60]);
  const orb1Y = useTransform(scrollY, [0, 700], [0, -120]);
  const orb2Y = useTransform(scrollY, [0, 700], [0, -80]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Главная секция"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)] via-[var(--navy-light)] to-[var(--navy)]" aria-hidden="true" />

      <HeroBackground />

      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ y: orb1Y }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(212,168,69,0.1)_0%,transparent_70%)]"
        />
        <motion.div
          style={{ y: orb2Y }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse,rgba(74,159,217,0.08)_0%,transparent_70%)]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[30%] left-[50%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(ellipse,rgba(139,47,63,0.08)_0%,transparent_70%)]"
        />
      </div>

      <div className="absolute inset-0 grid-pattern md:hidden" aria-hidden="true" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:py-36 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--border-hover)] bg-[var(--gold-glow)] text-[var(--gold)] text-sm font-semibold tracking-widest uppercase mb-8 sm:mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" aria-hidden="true" />
          С 1951 года · Зауралье
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[var(--text-primary)] leading-[1.05] tracking-tight mb-6 sm:mb-8"
        >
          Курганский
          <br />
          <span className="gradient-text">государственный</span>
          <br />
          университет
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-[var(--text-secondary)] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-6"
        >
          {content.subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="hidden sm:block text-[var(--text-muted)] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-12"
        >
          {content.body}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.85 }}
          className="sm:hidden text-[var(--text-muted)] text-sm max-w-sm mx-auto mb-8"
        >
          Крупнейший вуз Курганской области с богатой историей и современными направлениями подготовки.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <a
            href="#timeline"
            className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[var(--navy)] font-bold text-sm sm:text-base rounded-xl hover:shadow-[0_0_30px_var(--gold-glow)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Изучить историю
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 border border-[var(--border-hover)] text-[var(--gold)] font-semibold text-sm sm:text-base rounded-xl hover:bg-[var(--gold-glow)] hover:border-[var(--gold)] transition-all duration-300"
          >
            Поступить в КГУ
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-[var(--text-muted)] text-xs tracking-widest uppercase">Прокрутите</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-[var(--border-hover)] flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[var(--gold)]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
