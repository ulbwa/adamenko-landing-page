"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import type { TodayHighlight } from "@/types/content";

interface TodaySectionProps {
    highlights: TodayHighlight[];
}

function HighlightCard({ item, index }: { item: TodayHighlight; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-7 flex flex-col gap-4 group hover:border-[#c8a84b]/40 transition-colors duration-300"
        >
            {/* Icon + optional stat */}
            <div className="flex items-start justify-between gap-3">
                <span
                    className="text-3xl leading-none select-none"
                    role="img"
                    aria-hidden="true"
                >
                    {item.icon}
                </span>

                {item.stat && (
                    <div className="text-right shrink-0">
                        <div className="text-2xl font-extrabold leading-none gradient-text">
                            {item.stat}
                        </div>
                        {item.statLabel && (
                            <div className="text-[10px] font-semibold tracking-wider uppercase text-[var(--kgu-muted)] mt-0.5">
                                {item.statLabel}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#c8a84b] transition-colors duration-300">
                {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--kgu-muted)] leading-relaxed flex-1">
                {item.description}
            </p>

            {/* Bottom accent line */}
            <div
                className="h-px w-0 group-hover:w-full bg-gradient-to-r from-[#c8a84b] to-transparent transition-all duration-500 ease-out"
                aria-hidden="true"
            />
        </motion.div>
    );
}

export function TodaySection({ highlights }: TodaySectionProps) {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section
            id="today"
            className="relative py-32 overflow-hidden"
            aria-labelledby="today-heading"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-[var(--kgu-deep)] to-[var(--kgu-navy)]"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 80% 30%, rgba(200,168,75,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 70%, rgba(200,168,75,0.04) 0%, transparent 60%)",
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    <span className="inline-block text-[#c8a84b] text-sm font-bold tracking-widest uppercase mb-6">
                        КГУ сегодня
                    </span>
                    <h2
                        id="today-heading"
                        className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight"
                    >
                        Студенческий.{" "}
                        <span className="gradient-text">Научный. Живой.</span>
                    </h2>
                    <p className="text-lg text-[var(--kgu-muted)] max-w-2xl mx-auto leading-relaxed">
                        Курганский государственный университет — это не только страницы истории,
                        но и кипящая студенческая жизнь, прорывные научные проекты
                        и крепкие связи с промышленностью региона.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {highlights.map((item, index) => (
                        <HighlightCard key={item.title} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
