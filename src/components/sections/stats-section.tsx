"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItemScale } from "@/components/ui/motion";
import { Calendar, Users, BookUser, Award, GraduationCap, Building2 } from "lucide-react";
import type { StatItem } from "@/types/content";
import type { ReactNode } from "react";

const CARD_THEMES: { icon: ReactNode; accent: string; glow: string; gradient: string }[] = [
  { icon: <Calendar className="w-5 h-5" />, accent: "var(--gold)", glow: "rgba(212,168,69,0.12)", gradient: "from-[rgba(212,168,69,0.08)] to-transparent" },
  { icon: <Users className="w-5 h-5" />, accent: "var(--sky)", glow: "rgba(74,159,217,0.12)", gradient: "from-[rgba(74,159,217,0.08)] to-transparent" },
  { icon: <BookUser className="w-5 h-5" />, accent: "var(--crimson)", glow: "rgba(139,47,63,0.15)", gradient: "from-[rgba(139,47,63,0.08)] to-transparent" },
  { icon: <Award className="w-5 h-5" />, accent: "#7c6ff5", glow: "rgba(124,111,245,0.12)", gradient: "from-[rgba(124,111,245,0.08)] to-transparent" },
  { icon: <GraduationCap className="w-5 h-5" />, accent: "#4ade80", glow: "rgba(74,222,128,0.12)", gradient: "from-[rgba(74,222,128,0.08)] to-transparent" },
  { icon: <Building2 className="w-5 h-5" />, accent: "#f59e0b", glow: "rgba(245,158,11,0.12)", gradient: "from-[rgba(245,158,11,0.08)] to-transparent" },
];

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("0");

  const strippedValue = value.replace(/\s/g, "");
  const numericMatch = strippedValue.match(/^(\d+)/);
  const numericPart = numericMatch ? parseInt(numericMatch[1], 10) : null;
  const suffix = numericPart !== null ? strippedValue.replace(String(numericPart), "") : strippedValue;
  const displayFallback = numericPart === null ? value : undefined;

  useEffect(() => {
    if (!isInView || numericPart === null) return;
    const duration = 2400;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    let startTime: number | null = null;
    let rafId: number;
    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const t = Math.min((timestamp - startTime) / duration, 1);
      const current = Math.round(easeOutQuart(t) * numericPart);
      const formatted = current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      setDisplayed(formatted + suffix);
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, numericPart, suffix, value]);

  return <span ref={ref}>{displayFallback ?? displayed}</span>;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const theme = CARD_THEMES[index % CARD_THEMES.length];

  return (
    <motion.div
      variants={staggerItemScale}
      whileHover={{ y: -6, boxShadow: `0 12px 50px ${theme.glow}` }}
      className="glass-card rounded-2xl p-6 sm:p-8 group relative overflow-hidden hover:border-[var(--border-hover)] transition-colors duration-300"
    >
      {/* Unique gradient background per card */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} rounded-2xl pointer-events-none`} aria-hidden="true" />

      {/* Decorative shapes — different per card */}
      {index % 3 === 0 && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-8 -right-8 w-24 h-24 border border-[var(--border)] rounded-full opacity-30"
          aria-hidden="true"
        />
      )}
      {index % 3 === 1 && (
        <motion.div
          animate={{ rotate: -45, scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-4 -right-4 w-20 h-20 border border-[var(--border)] rounded-lg opacity-20"
          aria-hidden="true"
        />
      )}
      {index % 3 === 2 && (
        <>
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-40"
            style={{ backgroundColor: theme.accent }}
            aria-hidden="true"
          />
          <motion.div
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full opacity-30"
            style={{ backgroundColor: theme.accent }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 30%, ${theme.glow}, transparent 70%)` }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Icon badge */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border transition-all duration-300 group-hover:scale-110"
          style={{
            color: theme.accent,
            borderColor: `color-mix(in srgb, ${theme.accent} 30%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${theme.accent} 8%, transparent)`,
          }}
        >
          {theme.icon}
        </div>

        <div
          className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-playfair)] mb-3 leading-tight group-hover:scale-105 transition-transform duration-300 origin-center whitespace-nowrap"
          style={{ color: theme.accent }}
        >
          <AnimatedNumber value={stat.value} />
        </div>
        {stat.suffix && (
          <div className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">
            {stat.suffix}
          </div>
        )}
        <div className="text-[var(--text-primary)] font-medium text-sm sm:text-base">
          {stat.label}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function StatsSection({ stats }: { stats: StatItem[] }) {
  return (
    <section id="stats" className="relative section-padding overflow-hidden" aria-labelledby="stats-heading">
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)] to-[var(--navy-light)]" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(212,168,69,0.04) 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[var(--gold)] text-sm font-bold tracking-widest uppercase mb-4">
              Цифры и факты
            </span>
            <h2
              id="stats-heading"
              className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)]"
            >
              Университет<span className="gradient-text"> в цифрах</span>
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
