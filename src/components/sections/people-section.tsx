"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion";
import type { Rector, AlumnusItem, ScientistItem } from "@/types/content";

interface PeopleSectionProps {
    rectors: Rector[];
    alumni: AlumnusItem[];
    scientists: ScientistItem[];
}

export function PeopleSection({ rectors, alumni, scientists }: PeopleSectionProps) {
    return (
        <section
            id="people"
            className="relative py-24 overflow-hidden"
            aria-labelledby="people-heading"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1528] via-[#0a0e1a] to-[#0d1528]" aria-hidden="true" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="inline-block text-[#c8a84b] text-xs font-bold tracking-widest uppercase mb-4">
                            Люди и имена
                        </span>
                        <h2
                            id="people-heading"
                            className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8eaf6] mb-4"
                        >
                            Историю делают
                            <span className="gradient-text"> люди</span>
                        </h2>
                        <p className="text-[#8892b0] text-lg max-w-xl mx-auto">
                            Руководители, выдающиеся выпускники и основатели научных школ КГУ
                        </p>
                    </div>
                </FadeIn>

                {/* Rectors */}
                <FadeIn delay={0.1}>
                    <div className="mb-16">
                        <h3 className="text-[#c8a84b] font-semibold text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="flex-1 h-px bg-[rgba(200,168,75,0.2)]" aria-hidden="true" />
                            Ректоры КГУ
                            <span className="flex-1 h-px bg-[rgba(200,168,75,0.2)]" aria-hidden="true" />
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {rectors.map((rector, i) => (
                                <motion.div
                                    key={rector.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="glass-card rounded-xl p-5 text-center hover:border-[rgba(200,168,75,0.4)] transition-colors group"
                                >
                                    {/* Avatar placeholder */}
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a2744] to-[#0a1830] border-2 border-[rgba(200,168,75,0.3)] mx-auto mb-3 flex items-center justify-center group-hover:border-[rgba(200,168,75,0.6)] transition-colors">
                                        <span className="text-[#c8a84b] font-bold text-lg" aria-hidden="true">
                                            {rector.name.split(" ")[0][0]}
                                            {rector.name.split(" ")[1]?.[0]}
                                        </span>
                                    </div>
                                    <p className="text-[#e8eaf6] font-semibold text-sm leading-tight mb-1">
                                        {rector.name}
                                    </p>
                                    <p className="text-[#c8a84b] text-xs font-medium mb-1">{rector.period}</p>
                                    {rector.note && (
                                        <p className="text-[#8892b0] text-xs">{rector.note}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Alumni */}
                <FadeIn delay={0.2}>
                    <div className="mb-16">
                        <h3 className="text-[#c8a84b] font-semibold text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="flex-1 h-px bg-[rgba(200,168,75,0.2)]" aria-hidden="true" />
                            Знаменитые выпускники
                            <span className="flex-1 h-px bg-[rgba(200,168,75,0.2)]" aria-hidden="true" />
                        </h3>
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {alumni.map((person) => (
                                <motion.div
                                    key={person.name}
                                    variants={staggerItem}
                                    className="glass-card rounded-xl p-5 hover:border-[rgba(200,168,75,0.4)] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(200,168,75,0.1)] group"
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#c8a84b]/20 to-[#c8a84b]/5 border border-[rgba(200,168,75,0.3)] flex items-center justify-center"
                                            aria-hidden="true"
                                        >
                                            <span className="text-[#c8a84b] font-bold text-sm">
                                                {person.name[0]}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[#e8eaf6] font-semibold text-sm leading-tight mb-0.5 group-hover:text-[#c8a84b] transition-colors">
                                                {person.name}
                                            </p>
                                            <p className="text-[#c8a84b] text-xs mb-1.5">{person.graduation}</p>
                                            <p className="text-[#8892b0] text-xs leading-relaxed">
                                                {person.achievement}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </StaggerContainer>
                    </div>
                </FadeIn>

                {/* Scientists */}
                <FadeIn delay={0.3}>
                    <div>
                        <h3 className="text-[#c8a84b] font-semibold text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                            <span className="flex-1 h-px bg-[rgba(200,168,75,0.2)]" aria-hidden="true" />
                            Основатели научных школ
                            <span className="flex-1 h-px bg-[rgba(200,168,75,0.2)]" aria-hidden="true" />
                        </h3>
                        {scientists.map((scientist, i) => (
                            <div
                                key={i}
                                className="glass-card rounded-xl p-6 text-center max-w-2xl mx-auto"
                            >
                                <p className="text-[#c8a84b] font-semibold mb-2">{scientist.names}</p>
                                <p className="text-[#8892b0] text-sm leading-relaxed">{scientist.description}</p>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
