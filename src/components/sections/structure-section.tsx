"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion";
import { Cog, Scale, BookOpen, GraduationCap, FlaskConical, Cpu, ExternalLink } from "lucide-react";
import type { InstituteItem } from "@/types/content";
import type { MouseEvent, ReactNode } from "react";

const ICONS: ReactNode[] = [
  <Cog key="poly" className="w-6 h-6" />,
  <Scale key="law" className="w-6 h-6" />,
  <BookOpen key="hum" className="w-6 h-6" />,
  <GraduationCap key="ped" className="w-6 h-6" />,
  <FlaskConical key="sci" className="w-6 h-6" />,
  <Cpu key="math" className="w-6 h-6" />,
];

function TiltCard({ institute, index }: { institute: InstituteItem; index: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 22 };
  const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), springCfg);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), springCfg);
  const glowX = useTransform(mx, [-1, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [-1, 1], ["0%", "100%"]);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(212,168,69,0.1) 0%, transparent 60%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    my.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  }
  function handleMouseLeave() { mx.set(0); my.set(0); }

  return (
    <div style={{ perspective: "900px" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="h-full">
      <motion.div
        variants={staggerItem}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-card rounded-2xl p-6 h-full flex flex-col group cursor-default relative overflow-hidden"
      >
        <motion.div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: glowBg }} aria-hidden="true" />
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--gold-glow)] to-[var(--gold-dim)] border border-[var(--border)] flex items-center justify-center text-[var(--gold)] mb-4 group-hover:border-[var(--border-hover)] group-hover:shadow-[0_0_15px_var(--gold-glow)] transition-all duration-300 overflow-hidden" aria-hidden="true">
          {institute.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={institute.image} alt="" className="w-10 h-10 object-contain" />
          ) : (
            ICONS[index % ICONS.length]
          )}
        </div>
        <h3 className="text-[var(--text-primary)] font-bold text-lg mb-3 leading-snug group-hover:text-[var(--gold)] transition-colors relative z-10">
          {institute.name}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed relative z-10">
          {institute.description}
        </p>
        {institute.vkUrl && (
          <div className="mt-auto pt-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 text-[var(--gold)] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Группа ВКонтакте <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        )}
        {institute.vkUrl && (
          <a href={institute.vkUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20" aria-label={`${institute.name} — группа ВКонтакте`} />
        )}
      </motion.div>
    </div>
  );
}

export function StructureSection({ institutes }: { institutes: InstituteItem[] }) {
  return (
    <section id="structure" className="relative section-padding overflow-hidden" aria-labelledby="structure-heading">
      <div className="absolute inset-0 bg-[var(--navy-light)]" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[var(--gold)] text-sm font-bold tracking-widest uppercase mb-4">Структура</span>
            <h2
              id="structure-heading"
              className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4"
            >
              Институты<span className="gradient-text"> сегодня</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl mx-auto">
              КГУ — многопрофильный вуз, объединяющий шесть институтов
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr items-stretch">
          {institutes.map((institute, index) => (
            <TiltCard key={institute.name} institute={institute} index={index} />
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4}>
          <div className="mt-10 glass-card rounded-xl p-5 max-w-2xl mx-auto">
            <p className="text-[var(--text-secondary)] text-sm text-center leading-relaxed">
              <span className="text-[var(--gold)] font-semibold">Примечание: </span>
              Старейший исторический факультет (основан в 1952 году) сегодня входит в состав Гуманитарного института и продолжает традиции фундаментального образования.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
