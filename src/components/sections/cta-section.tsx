"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import type { LandingContent } from "@/types/content";

interface CtaSectionProps {
    title: string;
    subtitle: string;
    links: LandingContent["ctaLinks"];
}

export function CtaSection({ title, subtitle, links }: CtaSectionProps) {
    return (
        <section
            id="cta"
            className="relative py-32 overflow-hidden"
            aria-labelledby="cta-heading"
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--kgu-navy)] via-[var(--kgu-deep-alt)] to-[var(--kgu-navy)]" aria-hidden="true" />
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(200,168,75,0.12) 0%, transparent 100%)",
                }}
                aria-hidden="true"
            />

            {/* Decorative circles */}
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[rgba(200,168,75,0.05)]" />
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-[rgba(200,168,75,0.08)]" />
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[rgba(200,168,75,0.05)]" />
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-[rgba(200,168,75,0.08)]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <FadeIn>
                    <span className="inline-block text-[#c8a84b] text-xs font-bold tracking-widest uppercase mb-6">
                        Присоединяйся
                    </span>

                    <h2
                        id="cta-heading"
                        className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--kgu-text)] mb-6 leading-[1.1]"
                    >
                        {title}
                    </h2>

                    <p className="text-[var(--kgu-muted)] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                        {subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {links.map((link, index) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className={
                                    index === 0
                                        ? "inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#c8a84b] to-[#a8882b] text-[#0a0e1a] font-bold text-sm rounded-xl shadow-lg hover:shadow-[0_0_40px_rgba(200,168,75,0.5)] transition-shadow duration-300"
                                        : "inline-flex items-center justify-center px-8 py-4 glass-card text-[var(--kgu-text)] font-semibold text-sm rounded-xl hover:border-[rgba(200,168,75,0.5)] hover:text-[#c8a84b] transition-all duration-300"
                                }
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </div>

                    {/* Stats strip */}
                    <div className="mt-16 pt-10 border-t border-[rgba(200,168,75,0.15)]">
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { value: "70+", label: "лет образования" },
                                { value: "8 000+", label: "студентов" },
                                { value: "6", label: "институтов" },
                            ].map((item) => (
                                <div key={item.label} className="text-center">
                                    <p className="gradient-text font-bold text-2xl sm:text-3xl font-[family-name:var(--font-playfair)]">
                                        {item.value}
                                    </p>
                                    <p className="text-[var(--kgu-muted)] text-xs sm:text-sm mt-1">{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
