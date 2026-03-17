"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import type { TimelineItem } from "@/types/content";

interface TimelineSectionProps {
    items: TimelineItem[];
}

export function TimelineSection({ items }: TimelineSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.9", "end 0.1"],
    });
    const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section
            id="timeline"
            ref={sectionRef}
            className="relative py-24 overflow-hidden"
            aria-labelledby="timeline-heading"
        >
            <div className="absolute inset-0 bg-[var(--kgu-navy)]" aria-hidden="true" />
            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="inline-block text-[#c8a84b] text-xs font-bold tracking-widest uppercase mb-4">
                            Хронология
                        </span>
                        <h2
                            id="timeline-heading"
                            className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--kgu-text)] mb-4"
                        >
                            Основные вехи
                            <br />
                            <span className="gradient-text">истории КГУ</span>
                        </h2>
                    </div>
                </FadeIn>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Static faint background line */}
                    <div
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(200,168,75,0.1)] -translate-x-1/2"
                        aria-hidden="true"
                    />
                    {/* Animated scroll-driven draw line */}
                    <motion.div
                        style={{ scaleY: lineScaleY, originY: 0 }}
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#c8a84b] via-[rgba(200,168,75,0.7)] to-[rgba(200,168,75,0.1)] -translate-x-1/2"
                        aria-hidden="true"
                    />

                    <div className="space-y-12">
                        {items.map((item, index) => (
                            <TimelineItemComponent
                                key={index}
                                item={item}
                                index={index}
                                isRight={index % 2 !== 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface TimelineItemComponentProps {
    item: TimelineItem;
    index: number;
    isRight: boolean;
}

function TimelineItemComponent({ item, index, isRight }: TimelineItemComponentProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isRight ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 40 : -40 }}
            transition={{ duration: 0.65, delay: 0.05, ease: [0.25, 0.4, 0.25, 1] }}
            className={`relative flex items-start gap-6 md:gap-0 ${
                isRight ? "md:flex-row-reverse" : "md:flex-row"
            }`}
        >
            {/* Card */}
            <div
                className={`w-full md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${
                    isRight ? "md:ml-8" : "md:mr-8"
                }`}
            >
                <motion.div
                    whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(200,168,75,0.18)" }}
                    transition={{ duration: 0.25 }}
                    className="glass-card rounded-2xl p-6 border-[rgba(200,168,75,0.15)] hover:border-[rgba(200,168,75,0.45)] transition-colors duration-300 group cursor-default"
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
                        className="text-[var(--kgu-text)] font-bold text-xl mb-2 font-[family-name:var(--font-playfair)] group-hover:text-[#c8a84b] transition-colors"
                    >
                        {item.title}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-[var(--kgu-muted)] leading-relaxed text-sm"
                    >
                        {item.description}
                    </motion.p>
                </motion.div>
            </div>

            {/* Center dot with pulse ring */}
            <div
                className="absolute left-8 md:left-1/2 top-6 -translate-x-1/2 z-10"
                aria-hidden="true"
            >
                {/* Pulsing ring */}
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
