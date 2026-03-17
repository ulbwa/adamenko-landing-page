"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion";
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

        let start = 0;
        const duration = 4000;
        const step = duration / 60;
        const increment = numericPart / (duration / step);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericPart) {
                current = numericPart;
                clearInterval(timer);
            }
            // Format with spaces for thousands
            const formatted = Math.round(current)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            setDisplayed(formatted + suffix);
        }, step);

        return () => clearInterval(timer);
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
                <FadeIn>
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
                </FadeIn>

                <StaggerContainer
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={staggerItem}
                            className="glass-card rounded-2xl p-8 sm:p-10 text-center hover:border-[rgba(200,168,75,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,168,75,0.1)] group"
                        >
                            <div className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-playfair)] gradient-text mb-3 group-hover:scale-105 transition-transform duration-300 origin-center">
                                <AnimatedNumber value={stat.value} />
                            </div>
                            {stat.suffix && (
                                <div className="text-[var(--kgu-muted)] text-sm uppercase tracking-wider mb-1">
                                    {stat.suffix}
                                </div>
                            )}
                            <div className="text-[var(--kgu-text)] font-medium text-base sm:text-lg">{stat.label}</div>
                        </motion.div>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
