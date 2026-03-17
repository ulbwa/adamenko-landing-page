"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import { PersonCard } from "@/components/ui/person-card";
import type { Rector, AlumnusItem, ScientistItem } from "@/types/content";

interface PeopleSectionProps {
    rectors: Rector[];
    alumni: AlumnusItem[];
    scientists: ScientistItem[];
}

function SectionDivider({ label }: { label: string }) {
    return (
        <h3 className="text-[#c8a84b] font-semibold text-sm uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="flex-1 h-px bg-[rgba(200,168,75,0.2)]" aria-hidden="true" />
            {label}
            <span className="flex-1 h-px bg-[rgba(200,168,75,0.2)]" aria-hidden="true" />
        </h3>
    );
}

function RectorCard({ rector, index }: { rector: Rector; index: number }) {
    const [imgError, setImgError] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.08, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
            whileHover={{ y: -6, boxShadow: "0 8px 40px rgba(200,168,75,0.18)" }}
            className="glass-card rounded-xl p-5 text-center hover:border-[rgba(200,168,75,0.4)] transition-colors duration-300 group cursor-default"
        >
            {/* Avatar */}
            <div className="relative w-16 h-16 mx-auto mb-3">
                {rector.photo && !imgError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={rector.photo}
                        alt={`Фото: ${rector.name}`}
                        className="w-16 h-16 rounded-full object-cover object-top border-2 border-[rgba(200,168,75,0.3)] group-hover:border-[rgba(200,168,75,0.6)] transition-colors"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a2744] to-[#0a1830] border-2 border-[rgba(200,168,75,0.3)] flex items-center justify-center group-hover:border-[rgba(200,168,75,0.6)] transition-colors">
                        <span className="text-[#c8a84b] font-bold text-lg font-[family-name:var(--font-playfair)]" aria-hidden="true">
                            {rector.name.split(" ")[0][0]}
                            {rector.name.split(" ")[1]?.[0]}
                        </span>
                    </div>
                )}
                {/* Glow ring on hover */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-[rgba(200,168,75,0.4)]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                    aria-hidden="true"
                />
            </div>
            <p className="text-[#e8eaf6] font-semibold text-sm leading-tight mb-1 group-hover:text-[#c8a84b] transition-colors">
                {rector.name}
            </p>
            <p className="text-[#c8a84b] text-xs font-medium mb-1">{rector.period}</p>
            {rector.note && (
                <p className="text-[#8892b0] text-xs">{rector.note}</p>
            )}
        </motion.div>
    );
}

export function PeopleSection({ rectors, alumni, scientists }: PeopleSectionProps) {
    return (
        <section
            id="people"
            className="relative py-24 overflow-hidden"
            aria-labelledby="people-heading"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1528] via-[#0a0e1a] to-[#0d1528]" aria-hidden="true" />

            {/* Decorative orbs */}
            <div className="absolute top-20 left-[-10%] w-80 h-80 rounded-full bg-[#c8a84b]/5 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-20 right-[-10%] w-96 h-96 rounded-full bg-[#c8a84b]/4 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1a2744]/20 blur-[120px] pointer-events-none" aria-hidden="true" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
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
                    <div className="mb-20">
                        <SectionDivider label="Ректоры КГУ" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {rectors.map((rector, i) => (
                                <RectorCard key={rector.name} rector={rector} index={i} />
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Alumni — PersonCard grid */}
                <FadeIn delay={0.2}>
                    <div className="mb-20">
                        <SectionDivider label="Знаменитые выпускники" />
                        <p className="text-center text-[#8892b0] text-sm mb-8 -mt-4">
                            Нажмите на карточку, чтобы узнать больше
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {alumni.map((person, i) => (
                                <PersonCard key={person.name} person={person} index={i} />
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Scientists */}
                <FadeIn delay={0.3}>
                    <div>
                        <SectionDivider label="Основатели научных школ" />
                        {scientists.map((scientist, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                                className="glass-card rounded-xl p-6 text-center max-w-2xl mx-auto"
                            >
                                <p className="text-[#c8a84b] font-semibold mb-2">{scientist.names}</p>
                                <p className="text-[#8892b0] text-sm leading-relaxed">{scientist.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

