"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { FadeIn, ScaleIn, StaggerContainer, staggerItemScale } from "@/components/ui/motion";
import { motion } from "framer-motion";
import type { StatItem } from "@/types/content";

interface StatsSectionProps {
    stats: StatItem[];
}

function AnimatedNumber({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });
    const [displayed, setDisplayed] = useState("0");

    // Extract numeric part for animation
    const strippedValue = value.replace(/\s/g, "");
    const numericMatch = strippedValue.match(/^(\d+)/);
    const numericPart = numericMatch ? parseInt(numericMatch[1], 10) : null;
    const suffix = numericPart !== null ? strippedValue.replace(String(numericPart), "") : strippedValue;

    useEffect(() => {
        if (!isInView || numericPart === null) {
            setDisplayed(value);
            return;
        }

        const duration = 2400;
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
        let startTime: number | null = null;
        let rafId: number;

        const tick = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const t = Math.min((timestamp - startTime) / duration, 1);
            const current = Math.round(easeOutQuart(t) * numericPart);
            const formatted = current
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            setDisplayed(formatted + suffix);
            if (t < 1) rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [isInView, numericPart, suffix, value]);

    return <span ref={ref}>{displayed}</span>;
}

export function StatsSection({ stats }: StatsSectionProps) {
    return (
        <section
            id="stats"
            className="relative py-32 overflow-hidden"
            aria-labelledby="stats-heading"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-[var(--kgu-navy)] to-[var(--kgu-deep)]"
                aria-hidden="true"
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 40% at 50% 50%, rgba(200,168,75,0.05) 0%, transparent 100%)",
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScaleIn delay={0.1}>
                    <div className="text-center mb-20">
                        <span className="inline-block text-[#c8a84b] text-sm font-bold tracking-widest uppercase mb-6">
                            Цифры и факты
                        </span>
                        <h2
                            id="stats-heading"
                            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--kgu-text)]"
                        >
                            Университет
                            <span className="gradient-text"> в цифрах</span>
                        </h2>
                    </div>
                </ScaleIn>

                <StaggerContainer
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            variants={staggerItemScale}
                            className="glass-card rounded-2xl p-8 sm:p-10 text-center hover:border-[rgba(200,168,75,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(200,168,75,0.15)] group relative overflow-hidden"
                        >
                            {/* Animated corner accent */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20 + i * 4, repeat: Infinity, ease: "linear" }}
                                className="absolute -top-6 -right-6 w-20 h-20 border border-[rgba(200,168,75,0.12)] rounded-full"
                                aria-hidden="true"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 28 + i * 4, repeat: Infinity, ease: "linear" }}
                                className="absolute -bottom-8 -left-8 w-28 h-28 border border-[rgba(200,168,75,0.08)] rounded-full"
                                aria-hidden="true"
                            />
                            <div className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-playfair)] gradient-text mb-3 group-hover:scale-110 transition-transform duration-300 origin-center relative z-10">
                                <AnimatedNumber value={stat.value} />
                            </div>
                            {stat.suffix && (
                                <div className="text-[var(--kgu-muted)] text-sm uppercase tracking-wider mb-1 relative z-10">
                                    {stat.suffix}
                                </div>
                            )}
                            <div className="text-[var(--kgu-text)] font-medium text-base sm:text-lg relative z-10">{stat.label}</div>
                        </motion.div>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
