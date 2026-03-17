"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion";
import type { HistoryEvent } from "@/types/content";

interface HistorySectionProps {
    context: string;
    events: HistoryEvent[];
}

export function HistorySection({ context, events }: HistorySectionProps) {
    return (
        <section
            id="history"
            className="relative py-24 overflow-hidden"
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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="inline-block text-[#c8a84b] text-xs font-bold tracking-widest uppercase mb-4">
                            Предыстория КГУ
                        </span>
                        <h2
                            id="history-heading"
                            className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--kgu-text)] mb-6"
                        >
                            История высшего образования
                            <br />
                            <span className="gradient-text">в Курганской области</span>
                        </h2>
                        <p className="text-[var(--kgu-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
                            {context}
                        </p>
                    </div>
                </FadeIn>

                {/* History event cards */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {events.map((event) => (
                        <motion.div
                            key={event.year}
                            variants={staggerItem}
                            className="glass-card rounded-2xl p-8 hover:border-[rgba(200,168,75,0.4)] transition-colors duration-300 group"
                        >
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c8a84b] to-[#8a6a20] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(200,168,75,0.4)] transition-shadow duration-300">
                                        <span className="text-[#0a0e1a] font-bold text-sm leading-tight text-center">
                                            {event.year}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[var(--kgu-text)] font-semibold text-lg mb-2 group-hover:text-[#c8a84b] transition-colors">
                                        {event.year} год
                                    </h3>
                                    <p className="text-[var(--kgu-muted)] leading-relaxed">{event.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </StaggerContainer>

                {/* Decorative line */}
                <FadeIn delay={0.4}>
                    <div className="mt-16 flex items-center gap-6 max-w-4xl mx-auto" aria-hidden="true">
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
