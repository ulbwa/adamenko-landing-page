"use client";

import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion";
import { motion } from "framer-motion";
import { GraduationCap, FlaskConical, Trophy, HardHat, HeartHandshake, Factory } from "lucide-react";
import type { TodayHighlight } from "@/types/content";
import type { ReactNode } from "react";

const ICON_MAP: Record<string, ReactNode> = {
  "Масштаб": <GraduationCap className="w-6 h-6" />,
  "Наука и инновации": <FlaskConical className="w-6 h-6" />,
  "Студенческая жизнь": <Trophy className="w-6 h-6" />,
  "Студенческие отряды": <HardHat className="w-6 h-6" />,
  "Сообщество и поддержка": <HeartHandshake className="w-6 h-6" />,
  "Партнёрство с индустрией": <Factory className="w-6 h-6" />,
};

function HighlightCard({ highlight }: { highlight: TodayHighlight }) {
  return (
    <motion.div
      variants={staggerItem}
      className="glass-card rounded-2xl p-6 group hover:border-[var(--border-hover)] transition-all duration-300 relative overflow-hidden"
    >
      {/* glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--gold-glow)] rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold-glow)] to-[var(--gold-dim)] border border-[var(--border)] flex items-center justify-center text-[var(--gold)] mb-4 group-hover:border-[var(--border-hover)] transition-all duration-300">
          {ICON_MAP[highlight.title] || <GraduationCap className="w-6 h-6" />}
        </div>
        <h3 className="text-[var(--text-primary)] font-bold text-lg mb-2 group-hover:text-[var(--gold)] transition-colors">
          {highlight.title}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
          {highlight.description}
        </p>

        {highlight.stat && (
          <div className="flex items-baseline gap-2 mt-auto pt-3 border-t border-[var(--border)]">
            <span className="text-[var(--gold)] font-bold text-xl">{highlight.stat}</span>
            {highlight.statLabel && (
              <span className="text-[var(--text-muted)] text-xs uppercase tracking-wider">
                {highlight.statLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function TodaySection({ highlights }: { highlights: TodayHighlight[] }) {
  return (
    <section id="today" className="relative section-padding overflow-hidden" aria-labelledby="today-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[var(--gold)] text-sm font-bold tracking-widest uppercase mb-4">Университет сегодня</span>
            <h2
              id="today-heading"
              className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4"
            >
              КГУ <span className="gradient-text">сегодня</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl mx-auto">
              Наука, студенческое сообщество и партнёрство с индустрией
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {highlights.map((h) => (
            <HighlightCard key={h.title} highlight={h} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
