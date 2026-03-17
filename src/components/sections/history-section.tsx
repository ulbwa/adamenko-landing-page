"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeIn } from "@/components/ui/motion";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import type { HistoryEvent } from "@/types/content";

interface TimelineItemProps {
    event: HistoryEvent;
    index: number;
}

function TimelineItem({ event, index }: TimelineItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const isLeft = index % 2 === 0;

    return (
        <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-0 min-h-[120px]">
            {/* Left content */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`pr-8 sm:pr-12 ${isLeft ? "flex flex-col items-end text-right" : "invisible"}`}
            >
                {isLeft && (
                    <>
                        <span
                            className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl font-bold gradient-text leading-none mb-3"
                        >
                            {event.year}
                        </span>
                        <p className="text-[var(--kgu-muted)] text-sm sm:text-base leading-relaxed max-w-[280px]">
                            {event.description}
                        </p>
                    </>
                )}
            </motion.div>

            {/* Center dot + line */}
            <div className="flex flex-col items-center self-stretch">
                <div className="flex-1 w-px bg-gradient-to-b from-transparent to-[rgba(200,168,75,0.35)]" />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.12 + 0.2, type: "spring", stiffness: 260, damping: 18 }}
                    className="relative flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-[#c8a84b] to-[#8a6a20] shadow-[0_0_18px_rgba(200,168,75,0.55)] z-10 my-1"
                >
                    <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.4 }}
                        className="absolute inset-0 rounded-full bg-[rgba(200,168,75,0.4)]"
                    />
                </motion.div>
                <div className="flex-1 w-px bg-gradient-to-b from-[rgba(200,168,75,0.35)] to-transparent" />
            </div>

            {/* Right content */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`pl-8 sm:pl-12 ${!isLeft ? "flex flex-col items-start text-left" : "invisible"}`}
            >
                {!isLeft && (
                    <>
                        <span
                            className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl font-bold gradient-text leading-none mb-3"
                        >
                            {event.year}
                        </span>
                        <p className="text-[var(--kgu-muted)] text-sm sm:text-base leading-relaxed max-w-[280px]">
                            {event.description}
                        </p>
                    </>
                )}
            </motion.div>
        </div>
    );
}

interface HistorySectionProps {
    context: string;
    events: HistoryEvent[];
}

export function HistorySection({ context, events }: HistorySectionProps) {
    return (
        <section
            id="history"
            className="relative py-32 overflow-hidden"
            aria-labelledby="history-heading"
        >
            {/* Background decoration */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-[var(--kgu-navy)] via-[var(--kgu-deep)] to-[var(--kgu-navy)]"
                aria-hidden="true"
            />
            <div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(200,168,75,0.3)] to-transparent"
                aria-hidden="true"
            />

            {/* Floating shapes */}
            <FloatingShapes />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="inline-block text-[#c8a84b] text-sm font-bold tracking-widest uppercase mb-6">
                            Предыстория КГУ
                        </span>
                        <h2
                            id="history-heading"
                            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--kgu-text)] mb-8"
                        >
                            История высшего образования
                            <br />
                            <span className="gradient-text">в Курганской области</span>
                        </h2>
                        <p className="text-[var(--kgu-muted)] text-xl max-w-2xl mx-auto leading-relaxed">
                            {context}
                        </p>
                    </div>
                </FadeIn>

                {/* Vertical timeline */}
                <div className="max-w-3xl mx-auto">
                    {events.map((event, i) => (
                        <TimelineItem key={event.year} event={event} index={i} />
                    ))}
                </div>

                {/* Decorative line */}
                <FadeIn delay={0.4}>
                    <div className="mt-16 flex items-center gap-6 max-w-3xl mx-auto" aria-hidden="true">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[rgba(200,168,75,0.3)]" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#c8a84b]" />
                            <span className="text-[#c8a84b] text-sm font-semibold">1951 – настоящее время</span>
                            <div className="w-2 h-2 rounded-full bg-[#c8a84b]" />
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[rgba(200,168,75,0.3)]" />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
