"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeIn } from "@/components/ui/motion";
import type { TimelineItem } from "@/types/content";

interface TimelineSectionProps {
    items: TimelineItem[];
}

export function TimelineSection({ items }: TimelineSectionProps) {
    return (
        <section
            id="timeline"
            className="relative py-24 overflow-hidden"
            aria-labelledby="timeline-heading"
        >
            <div
                className="absolute inset-0 bg-[#0a0e1a]"
                aria-hidden="true"
            />
            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(200,168,75,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,168,75,1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="inline-block text-[#c8a84b] text-xs font-bold tracking-widest uppercase mb-4">
                            Хронология
                        </span>
                        <h2
                            id="timeline-heading"
                            className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8eaf6] mb-4"
                        >
                            Основные вехи
                            <br />
                            <span className="gradient-text">истории КГУ</span>
                        </h2>
                    </div>
                </FadeIn>

                {/* Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical line */}
                    <div
                        className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(200,168,75,0.1)] via-[rgba(200,168,75,0.4)] to-[rgba(200,168,75,0.1)]"
                        aria-hidden="true"
                    />

                    <div className="space-y-12">
                        {items.map((item, index) => (
                            <TimelineItemComponent
                                key={index}
                                item={item}
                                index={index}
                                isRight={index % 2 !== 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface TimelineItemComponentProps {
    item: TimelineItem;
    index: number;
    isRight: boolean;
}

function TimelineItemComponent({ item, index, isRight }: TimelineItemComponentProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isRight ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 40 : -40 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className={`relative flex items-start gap-6 md:gap-0 ${isRight ? "md:flex-row-reverse" : "md:flex-row"
                }`}
        >
            {/* Card */}
            <div
                className={`w-full md:w-[calc(50%-2rem)] ml-16 md:ml-0 ${isRight ? "md:mr-8 md:ml-0" : "md:ml-0 md:mr-8"
                    }`}
            >
                <div className="glass-card rounded-2xl p-6 hover:border-[rgba(200,168,75,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,168,75,0.1)] group">
                    <span className="inline-block text-[#c8a84b] text-xs font-bold tracking-wider uppercase mb-2 border border-[rgba(200,168,75,0.3)] px-2.5 py-0.5 rounded-md">
                        {item.period}
                    </span>
                    <h3 className="text-[#e8eaf6] font-bold text-xl mb-2 font-[family-name:var(--font-playfair)] group-hover:text-[#c8a84b] transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-[#8892b0] leading-relaxed text-sm">{item.description}</p>
                </div>
            </div>

            {/* Center dot */}
            <div
                className="absolute left-8 md:left-1/2 top-6 -translate-x-1/2 z-10"
                aria-hidden="true"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    className="w-4 h-4 rounded-full bg-gradient-to-br from-[#c8a84b] to-[#8a6a20] shadow-[0_0_12px_rgba(200,168,75,0.6)]"
                />
            </div>

            {/* Empty right side for alignment */}
            <div className="hidden md:block w-[calc(50%-2rem)]" aria-hidden="true" />
        </motion.div>
    );
}
