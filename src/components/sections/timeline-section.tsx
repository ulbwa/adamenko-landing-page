"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import type { TimelineItem } from "@/types/content";

const INITIAL_VISIBLE = 4;

interface TimelineSectionProps {
    items: TimelineItem[];
    subtitle?: string;
}

function TimelineItemComponent({ item, index, isRight }: { item: TimelineItem; index: number; isRight: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isRight ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 40 : -40 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.25, 0.4, 0.25, 1] }}
            className={`relative flex items-start gap-6 md:gap-0 ${isRight ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
            {/* Card */}
            <div
                className={`w-full md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${isRight ? "md:ml-8" : "md:mr-8"}`}
                style={{ perspective: "800px" }}
            >
                <motion.div
                    whileHover={{
                        y: -6,
                        rotateY: isRight ? -3 : 3,
                        rotateX: -2,
                        boxShadow: "0 12px 50px rgba(200,168,75,0.22)",
                        transition: { duration: 0.3 },
                    }}
                    className="glass-card rounded-2xl p-6 border-[rgba(200,168,75,0.15)] hover:border-[rgba(200,168,75,0.45)] transition-colors duration-300 group cursor-default"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="inline-block text-[#c8a84b] text-xs font-bold tracking-wider uppercase mb-2 border border-[rgba(200,168,75,0.3)] px-2.5 py-0.5 rounded-md"
                    >
                        {item.period}
                    </motion.span>
                    <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.45, delay: 0.22 }}
                        className="text-[var(--kgu-text)] font-bold text-2xl sm:text-3xl mb-3 font-[family-name:var(--font-playfair)] group-hover:text-[#c8a84b] transition-colors"
                    >
                        {item.title}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-[var(--kgu-muted)] leading-relaxed text-base"
                    >
                        {item.description}
                    </motion.p>
                </motion.div>
            </div>

            {/* Center dot with pulse ring */}
            <div className="absolute left-8 md:left-1/2 top-6 -translate-x-1/2 z-10" aria-hidden="true">
                <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full bg-[#c8a84b] -z-10"
                />
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 300 }}
                    className="w-4 h-4 rounded-full bg-gradient-to-br from-[#c8a84b] to-[#8a6a20] shadow-[0_0_16px_rgba(200,168,75,0.7)]"
                />
            </div>

            {/* Empty right side for alignment */}
            <div className="hidden md:block w-[calc(50%-2rem)]" aria-hidden="true" />
        </motion.div>
    );
}

export function TimelineSection({ items, subtitle }: TimelineSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.9", "end 0.1"],
    });
    const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const hiddenCount = items.length - INITIAL_VISIBLE;

    return (
        <section
            id="timeline"
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
            aria-labelledby="timeline-heading"
        >
            <div className="absolute inset-0 bg-[var(--kgu-navy)]" aria-hidden="true" />
            <div className="timeline-grid-pattern absolute inset-0" aria-hidden="true" />
            <FloatingShapes />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="inline-block text-[#c8a84b] text-sm font-bold tracking-widest uppercase mb-6">
                            История
                        </span>
                        <h2
                            id="timeline-heading"
                            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--kgu-text)] mb-6"
                        >
                            От института до университета
                            <br />
                            <span className="gradient-text">75 лет истории КГУ</span>
                        </h2>
                        {subtitle && (
                            <p className="text-[var(--kgu-muted)] text-xl max-w-2xl mx-auto leading-relaxed mt-4">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </FadeIn>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Faint background line */}
                    <div
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(200,168,75,0.1)] -translate-x-1/2"
                        aria-hidden="true"
                    />
                    {/* Animated scroll-driven line */}
                    <motion.div
                        style={{ scaleY: lineScaleY, originY: 0 }}
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#c8a84b] via-[rgba(200,168,75,0.7)] to-[rgba(200,168,75,0.1)] -translate-x-1/2"
                        aria-hidden="true"
                    />

                    <div className="space-y-12">
                        {/* Always visible first items */}
                        {items.slice(0, INITIAL_VISIBLE).map((item, index) => (
                            <TimelineItemComponent
                                key={item.period}
                                item={item}
                                index={index}
                                isRight={index % 2 !== 0}
                            />
                        ))}

                        {/* Expandable remaining items */}
                        <AnimatePresence>
                            {isExpanded &&
                                items.slice(INITIAL_VISIBLE).map((item, i) => {
                                    const index = INITIAL_VISIBLE + i;
                                    return (
                                        <motion.div
                                            key={item.period}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 20 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: i * 0.1,
                                                ease: [0.25, 0.4, 0.25, 1],
                                            }}
                                        >
                                            <TimelineItemComponent
                                                item={item}
                                                index={index}
                                                isRight={index % 2 !== 0}
                                            />
                                        </motion.div>
                                    );
                                })}
                        </AnimatePresence>
                    </div>

                    {/* Expand / collapse control */}
                    {hiddenCount > 0 && (
                        <div className="mt-10 flex flex-col items-center relative z-20">
                            {/* Gradient fade hint shown when collapsed */}
                            {!isExpanded && (
                                <div
                                    className="w-full h-20 bg-gradient-to-t from-[var(--kgu-navy)] to-transparent -mt-20 pointer-events-none"
                                    aria-hidden="true"
                                />
                            )}
                            <motion.button
                                onClick={() => setIsExpanded((v) => !v)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="mt-6 inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[rgba(200,168,75,0.4)] text-[#c8a84b] font-semibold text-sm tracking-wide hover:border-[#c8a84b] hover:bg-[rgba(200,168,75,0.08)] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c8a84b] focus-visible:outline-offset-2"
                            >
                                <span>
                                    {isExpanded
                                        ? "Свернуть"
                                        : `Показать все ${items.length} события`}
                                </span>
                                <motion.svg
                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                    transition={{ duration: 0.35 }}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M3 5.5L8 10.5L13 5.5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </motion.svg>
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
