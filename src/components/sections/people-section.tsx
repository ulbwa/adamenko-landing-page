"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion";
import { X, ExternalLink } from "lucide-react";
import type { Rector, AlumnusItem, ScientistItem } from "@/types/content";

function SectionDivider({ label }: { label: string }) {
    return (
        <h3 className="text-[var(--gold)] font-semibold text-sm uppercase tracking-widest mb-8 flex items-center gap-3">
            <span className="flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
            {label}
            <span className="flex-1 h-px bg-[var(--border)]" aria-hidden="true" />
        </h3>
    );
}

function RectorCard({ rector }: { rector: Rector }) {
    const [imgError, setImgError] = useState(false);
    return (
        <motion.div
            variants={staggerItem}
            whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(212,168,69,0.12)" }}
            className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-5 hover:border-[var(--border-hover)] transition-all duration-300 group cursor-default"
        >
            <div className="flex-shrink-0">
                {rector.photo && !imgError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={rector.photo}
                        alt={rector.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover object-center border-2 border-[var(--border)] transition-colors"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-gradient-to-br from-[var(--navy-mid)] to-[var(--navy-light)] border-2 border-[var(--border)] flex items-center justify-center transition-colors">
                        <span className="text-[var(--gold)] font-bold text-2xl font-[family-name:var(--font-playfair)]" aria-hidden="true">
                            {rector.name.split(" ")[0][0]}
                            {rector.name.split(" ")[1]?.[0]}
                        </span>
                    </div>
                )}
            </div>
            <div className="text-center sm:text-left min-w-0">
                <p className="text-[var(--text-primary)] font-bold text-lg leading-snug mb-1 group-hover:text-[var(--gold)] transition-colors">
                    {rector.name}
                </p>
                <p className="text-[var(--gold)] text-sm font-semibold mb-1">{rector.period}</p>
                {rector.note && (
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-[var(--gold-glow)] text-[var(--gold)] border border-[var(--gold-dim)] mb-2">
                        {rector.note}
                    </span>
                )}
                {rector.bio && (
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-1">{rector.bio}</p>
                )}
            </div>
        </motion.div>
    );
}

function AlumnusCard({ person, onClick }: { person: AlumnusItem; onClick: () => void }) {
    const [imgError, setImgError] = useState(false);
    return (
        <motion.button
            variants={staggerItem}
            whileHover={{ y: -4, boxShadow: "0 8px 40px rgba(212,168,69,0.12)" }}
            onClick={onClick}
            className="glass-card rounded-2xl p-5 sm:p-6 text-left hover:border-[var(--border-hover)] transition-all duration-300 group cursor-pointer w-full"
        >
            <div className="flex items-start gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 border-[var(--border)] transition-colors">
                    {person.photo && !imgError ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={person.photo} alt="" className="w-full h-full object-cover object-center" onError={() => setImgError(true)} />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--navy-mid)] to-[var(--navy-light)] flex items-center justify-center text-[var(--gold)] font-bold text-2xl">
                            {person.name[0]}
                        </div>
                    )}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[var(--text-primary)] font-bold text-lg mb-1 group-hover:text-[var(--gold)] transition-colors">{person.name}</p>
                    <p className="text-[var(--text-muted)] text-xs mb-2">{person.graduation}</p>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3 line-clamp-2">{person.achievement}</p>
                    {person.tags && (
                        <div className="flex flex-wrap gap-1.5">
                            {person.tags.map((t) => (
                                <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--gold-glow)] text-[var(--gold)] border border-[var(--gold-dim)]">{t}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.button>
    );
}

function AlumnusModal({ person, onClose }: { person: AlumnusItem; onClose: () => void }) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring" as const, stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
            >
                <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:text-[var(--gold)] hover:bg-black/70 transition-colors z-10 backdrop-blur-sm" aria-label="Закрыть">
                    <X className="w-5 h-5" />
                </button>
                {person.photo && (
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-5 -mt-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={person.photo} alt={person.name} className="w-full h-full object-cover object-center" />
                    </div>
                )}
                <h3 className="text-[var(--text-primary)] font-bold text-xl mb-1">{person.name}</h3>
                <p className="text-[var(--text-muted)] text-xs mb-3">{person.graduation}</p>
                {person.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {person.tags.map((t) => (
                            <span key={t} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--gold-glow)] text-[var(--gold)] border border-[var(--gold-dim)]">{t}</span>
                        ))}
                    </div>
                )}
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">{person.bioExtended || person.achievement}</p>
                {person.wikiUrl && (
                    <a href={person.wikiUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[var(--sky)] text-sm font-medium hover:underline">
                        Подробнее в Википедии <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                )}
            </motion.div>
        </motion.div>
    );
}

function ScientistCard({ scientist }: { scientist: ScientistItem }) {
    return (
        <motion.div
            variants={staggerItem}
            className="glass-card rounded-2xl p-6 hover:border-[var(--border-hover)] transition-all duration-300 group"
        >
            <p className="text-[var(--gold)] font-bold text-base mb-3 group-hover:text-[var(--gold-light)] transition-colors">{scientist.names}</p>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{scientist.description}</p>
        </motion.div>
    );
}

export function PeopleSection({ rectors, alumni, scientists }: { rectors: Rector[]; alumni: AlumnusItem[]; scientists: ScientistItem[] }) {
    const [selected, setSelected] = useState<AlumnusItem | null>(null);

    return (
        <section id="people" className="relative section-padding overflow-hidden" aria-labelledby="people-heading">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)] via-[var(--navy-light)] to-[var(--navy)]" aria-hidden="true" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="inline-block text-[var(--gold)] text-sm font-bold tracking-widest uppercase mb-4">Люди и имена</span>
                        <h2 id="people-heading" className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4">
                            Историю делают<span className="gradient-text"> люди</span>
                        </h2>
                        <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl mx-auto">Руководители, выдающиеся выпускники и основатели научных школ КГУ</p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.1}>
                    <div className="mb-20">
                        <SectionDivider label="Ректоры КГУ" />
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {rectors.map((r) => <RectorCard key={r.name} rector={r} />)}
                        </StaggerContainer>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="mb-20">
                        <SectionDivider label="Знаменитые выпускники" />
                        <p className="text-center text-[var(--text-muted)] text-sm mb-8 -mt-4">Нажмите на карточку, чтобы узнать больше</p>
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {alumni.map((person) => (
                                <AlumnusCard key={person.name} person={person} onClick={() => setSelected(person)} />
                            ))}
                        </StaggerContainer>
                    </div>
                </FadeIn>

                <FadeIn delay={0.3}>
                    <div>
                        <SectionDivider label="Основатели научных школ" />
                        <StaggerContainer className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
                            {scientists.map((sc, i) => (
                                <ScientistCard key={i} scientist={sc} />
                            ))}
                        </StaggerContainer>
                    </div>
                </FadeIn>
            </div>

            <AnimatePresence>
                {selected && <AlumnusModal person={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </section>
    );
}
