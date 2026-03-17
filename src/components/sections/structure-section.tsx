"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FadeIn, StaggerContainer, staggerItem } from "@/components/ui/motion";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import type { InstituteItem } from "@/types/content";
import type { MouseEvent } from "react";

const ICONS = [
    // Gear/cog for Polytechnic
    (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true" key="polytechnic">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    ),
    // Scale for Law/Economics
    (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true" key="law">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97Z" />
        </svg>
    ),
    // Book for Humanities
    (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true" key="humanities">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
    ),
    // Heart for Pedagogy
    (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true" key="pedagogy">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342m-7.482 0c-.342.059-.68.122-1.02.186m-1.41.247c.286.24.576.469.87.688M12 13.489v-.001m0 .001c1.23-.92 2.404-1.922 3.52-2.993A34.9 34.9 0 0 0 12 9.5a34.9 34.9 0 0 0-3.52 1.002A34.858 34.858 0 0 0 12 13.489Z" />
        </svg>
    ),
    // Beaker for Natural Sciences
    (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true" key="science">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 0 1 .45 2.811l-1.68 2.835a2.25 2.25 0 0 1-1.93 1.1H7.36a2.25 2.25 0 0 1-1.93-1.1L3.75 17.81a2.25 2.25 0 0 1 .45-2.811M19.8 15H4.2" />
        </svg>
    ),
    // CPU for Math/IT
    (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true" key="math">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
        </svg>
    ),
];

interface TiltCardProps {
    institute: InstituteItem;
    index: number;
}

function TiltCard({ institute, index }: TiltCardProps) {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const springCfg = { stiffness: 180, damping: 22 };
    const rotateX = useSpring(useTransform(my, [-1, 1], [10, -10]), springCfg);
    const rotateY = useSpring(useTransform(mx, [-1, 1], [-10, 10]), springCfg);
    const glowX = useTransform(mx, [-1, 1], ["0%", "100%"]);
    const glowY = useTransform(my, [-1, 1], ["0%", "100%"]);
    const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(200,168,75,0.12) 0%, transparent 60%)`;

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
        my.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
    }
    function handleMouseLeave() { mx.set(0); my.set(0); }

    return (
        <div
            style={{ perspective: "900px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="h-full"
        >
            <motion.div
                variants={staggerItem}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="glass-card rounded-2xl p-6 h-full flex flex-col hover:border-[rgba(200,168,75,0.4)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(200,168,75,0.18)] group cursor-default relative overflow-hidden"
            >
                {/* Inner moving glow */}
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: glowBg }}
                    aria-hidden="true"
                />
                <div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(200,168,75,0.2)] to-[rgba(200,168,75,0.05)] border border-[rgba(200,168,75,0.2)] flex items-center justify-center text-[#c8a84b] mb-4 group-hover:border-[rgba(200,168,75,0.5)] group-hover:shadow-[0_0_15px_rgba(200,168,75,0.25)] transition-all duration-300 overflow-hidden"
                    aria-hidden="true"
                >
                    {institute.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={institute.image} alt="" className="w-10 h-10 object-contain" />
                    ) : (
                        ICONS[index % ICONS.length]
                    )}
                </div>
                <h3 className="text-[var(--kgu-text)] font-bold text-lg mb-3 leading-snug group-hover:text-[#c8a84b] transition-colors relative z-10">
                    {institute.name}
                </h3>
                <p className="text-[var(--kgu-muted)] text-base leading-relaxed relative z-10 mt-auto">{institute.description}</p>
            </motion.div>
        </div>
    );
}

interface StructureSectionProps {
    institutes: InstituteItem[];
}

export function StructureSection({ institutes }: StructureSectionProps) {
    return (
        <section
            id="structure"
            className="relative py-32 overflow-hidden"
            aria-labelledby="structure-heading"
        >
            <div className="absolute inset-0 bg-[var(--kgu-deep)]" aria-hidden="true" />

            {/* Floating geometric shapes */}
            <FloatingShapes />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="inline-block text-[#c8a84b] text-sm font-bold tracking-widest uppercase mb-6">
                            Структура университета
                        </span>
                        <h2
                            id="structure-heading"
                            className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--kgu-text)] mb-6"
                        >
                            Институты
                            <span className="gradient-text"> сегодня</span>
                        </h2>
                        <p className="text-[var(--kgu-muted)] text-xl max-w-xl mx-auto">
                            КГУ — многопрофильный вуз, объединяющий шесть институтов
                        </p>
                    </div>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr items-stretch">
                    {institutes.map((institute, index) => (
                        <TiltCard key={institute.name} institute={institute} index={index} />
                    ))}
                </StaggerContainer>

                {/* Historical note */}
                <FadeIn delay={0.4}>
                    <div className="mt-10 glass-card rounded-xl p-5 max-w-2xl mx-auto border border-[rgba(200,168,75,0.15)]">
                        <p className="text-[var(--kgu-muted)] text-sm text-center leading-relaxed">
                            <span className="text-[#c8a84b] font-semibold">Примечание: </span>
                            Старейший исторический факультет (основан в 1952 году) сегодня входит в состав
                            Гуманитарного института и продолжает традиции фундаментального образования.
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
