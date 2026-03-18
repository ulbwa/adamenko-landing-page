"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { ChevronDown } from "lucide-react";
import type { TimelineItem } from "@/types/content";

const INITIAL_VISIBLE = 4;

function DesktopTimelineItem({ item, isRight }: { item: TimelineItem; index: number; isRight: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 40 : -40 }}
      transition={{ duration: 0.65, delay: 0.05, ease: [0.25, 0.4, 0.25, 1] }}
      className={`relative flex items-start ${isRight ? "md:flex-row-reverse" : "md:flex-row"}`}
    >
      {/* Card — on mobile always right of the line, on desktop alternating */}
      <div className={`w-[calc(100%-2rem)] ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${isRight ? "md:ml-8" : "md:mr-8"}`} style={{ perspective: 800 }}>
        <motion.div
          whileHover={{ rotateY: isRight ? -3 : 3, rotateX: -1.5 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
          style={{ transformStyle: "preserve-3d" }}
          className="glass-card rounded-2xl p-5 sm:p-6 group cursor-default relative overflow-hidden"
        >
          {/* Accent border glow on the timeline side */}
          <div
            className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[var(--gold)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 left-0 ${isRight ? "md:left-auto md:right-0" : ""}`}
            aria-hidden="true"
          />
          <span className="inline-block text-[var(--gold)] text-xs font-bold tracking-wider uppercase mb-2 border border-[var(--border-hover)] px-2.5 py-0.5 rounded-md">
            {item.period}
          </span>
          <h3 className="text-[var(--text-primary)] font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 font-[family-name:var(--font-playfair)] group-hover:text-[var(--gold)] transition-colors">
            {item.title}
          </h3>
          <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Dot — left on mobile, center on desktop */}
      <button
        onClick={() => ref.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
        aria-label={`Перейти к событию: ${item.title}`}
        className="absolute left-[7px] md:left-1/2 top-6 -translate-x-1/2 z-10 cursor-pointer p-3 -m-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2 rounded-full"
      >
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[var(--gold)] -z-10"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.2 }}
          transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-3.5 h-3.5 md:w-4 md:h-4 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] shadow-[0_0_16px_var(--gold-glow)]"
        />
      </button>

      <div className="hidden md:block w-[calc(50%-2rem)]" aria-hidden="true" />
    </motion.div>
  );
}

export function TimelineSection({ items, subtitle }: { items: TimelineItem[]; subtitle?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);

  const handleToggle = () => {
    if (isExpanded) {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - 80;
      const distance = Math.abs(window.scrollY - targetY);

      if (distance < 10) {
        // Already near the top — collapse right away
        setIsCollapsing(true);
        setIsExpanded(false);
        setTimeout(() => setIsCollapsing(false), 400);
      } else {
        // Scroll to section top first, then collapse after scroll settles
        window.scrollTo({ top: targetY, behavior: "smooth" });

        let lastY = window.scrollY;
        let stable = 0;
        const poll = setInterval(() => {
          if (Math.abs(window.scrollY - lastY) < 1) {
            stable++;
            if (stable >= 3) {
              clearInterval(poll);
              setIsCollapsing(true);
              setIsExpanded(false);
              // Keep scroll pinned to section top while items collapse
              const pinY = window.scrollY;
              const pinFrame = () => {
                window.scrollTo(0, pinY);
              };
              const pinId = setInterval(pinFrame, 16);
              setTimeout(() => {
                clearInterval(pinId);
                setIsCollapsing(false);
              }, 450);
            }
          } else {
            stable = 0;
            lastY = window.scrollY;
          }
        }, 50);
        setTimeout(() => {
          clearInterval(poll);
          setIsCollapsing(true);
          setIsExpanded(false);
          setTimeout(() => setIsCollapsing(false), 400);
        }, 2000);
      }
    } else {
      setIsExpanded(true);
    }
  };

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.9", "end 0.1"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const hiddenCount = items.length - INITIAL_VISIBLE;

  return (
    <section id="timeline" ref={sectionRef} className="relative section-padding overflow-hidden" aria-labelledby="timeline-heading">
      <div className="absolute inset-0 bg-[var(--navy)]" aria-hidden="true" />
      <div className="grid-pattern absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-block text-[var(--gold)] text-sm font-bold tracking-widest uppercase mb-4">
              История
            </span>
            <h2
              id="timeline-heading"
              className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6"
            >
              От института до университета
              <br />
              <span className="gradient-text">75 лет истории КГУ</span>
            </h2>
            {subtitle && (
              <p className="text-[var(--text-secondary)] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mt-4">
                {subtitle}
              </p>
            )}
          </div>
        </FadeIn>

        {/* Timeline — single-sided on mobile (line left), zigzag on desktop (line center) */}
        <div className="max-w-4xl mx-auto">
          {/* Items container — line is scoped here */}
          <div ref={timelineRef} className="relative">
            <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-[var(--border)] -translate-x-1/2" aria-hidden="true" />
            <motion.div
              style={{ scaleY: lineScaleY, originY: 0 }}
              className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--gold)] via-[var(--gold)]/70 to-[var(--gold)]/10 -translate-x-1/2"
              aria-hidden="true"
            />

            <div className="space-y-12">
              {items.slice(0, INITIAL_VISIBLE).map((item, index) => (
                <DesktopTimelineItem key={item.period} item={item} index={index} isRight={index % 2 !== 0} />
              ))}

              <AnimatePresence initial={false}>
                {isExpanded &&
                  items.slice(INITIAL_VISIBLE).map((item, i) => {
                    const index = INITIAL_VISIBLE + i;
                    return (
                      <motion.div
                        key={item.period}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 48, overflow: "visible", transitionEnd: { overflow: "visible" } }}
                        exit={{ opacity: 0, height: 0, marginTop: 0, overflow: "hidden" }}
                        transition={{
                          height: { duration: 0.4, delay: isExpanded && !isCollapsing ? i * 0.06 : 0, ease: [0.25, 0.4, 0.25, 1] },
                          marginTop: { duration: 0.4, delay: isExpanded && !isCollapsing ? i * 0.06 : 0, ease: [0.25, 0.4, 0.25, 1] },
                          opacity: { duration: isCollapsing ? 0.15 : 0.3, delay: isExpanded && !isCollapsing ? i * 0.06 + 0.1 : 0, ease: "easeOut" },
                        }}
                      >
                        <DesktopTimelineItem item={item} index={index} isRight={index % 2 !== 0} />
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          </div>

          {hiddenCount > 0 && (
            <div className="mt-10 flex justify-center relative z-20">
              {!isExpanded && (
                <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-t from-[var(--navy)] to-transparent pointer-events-none" aria-hidden="true" />
              )}
              <motion.button
                onClick={handleToggle}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[var(--border-hover)] text-[var(--gold)] font-semibold text-sm tracking-wide hover:border-[var(--gold)] hover:bg-[var(--gold-glow)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold)] focus-visible:outline-offset-2"
              >
                <span>{isExpanded ? "Свернуть" : `Показать все ${items.length} событий`}</span>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.35 }}>
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
