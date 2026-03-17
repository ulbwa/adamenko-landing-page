"use client";

import { motion } from "framer-motion";
import { ParticleCanvas } from "@/components/ui/particle-canvas";
import type { HeroContent } from "@/types/content";

interface HeroSectionProps {
    content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            aria-label="Главная секция"
        >
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0d1528] to-[#0a1830]"
                aria-hidden="true"
            />

            {/* Radial glow accents */}
            <div
                className="absolute inset-0 overflow-hidden"
                aria-hidden="true"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse,rgba(200,168,75,0.12)_0%,transparent_70%)]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(ellipse,rgba(200,168,75,0.1)_0%,transparent_70%)]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute top-[40%] left-[40%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(ellipse,rgba(26,100,200,0.08)_0%,transparent_70%)]"
                />
            </div>

            {/* Particle canvas */}
            <ParticleCanvas />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(200,168,75,0.3)] bg-[rgba(200,168,75,0.08)] text-[#c8a84b] text-xs font-semibold tracking-widest uppercase mb-8"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a84b] animate-pulse" aria-hidden="true" />
                    С 1951 года · Зауралье
                </motion.div>

                {/* Main title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                    className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#e8eaf6] leading-[1.1] mb-6"
                >
                    Курганский
                    <br />
                    <span className="gradient-text">государственный</span>
                    <br />
                    университет
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                    className="text-[#8892b0] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
                >
                    {content.subtitle}
                </motion.p>

                {/* Body text */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="text-[#e8eaf6]/70 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-12"
                >
                    {content.body}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#timeline"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#c8a84b] to-[#a8882b] text-[#0a0e1a] font-bold text-sm rounded-xl hover:shadow-[0_0_30px_rgba(200,168,75,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Изучить историю
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M3 8h10M9 4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                    <a
                        href="#cta"
                        className="inline-flex items-center justify-center px-8 py-3.5 border border-[rgba(200,168,75,0.3)] text-[#c8a84b] font-semibold text-sm rounded-xl hover:bg-[rgba(200,168,75,0.08)] hover:border-[rgba(200,168,75,0.6)] transition-all duration-300"
                    >
                        Поступить в КГУ
                    </a>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                    aria-hidden="true"
                >
                    <span className="text-[#8892b0] text-xs tracking-widest uppercase">
                        Прокрутите
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-5 h-8 rounded-full border border-[rgba(200,168,75,0.3)] flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 rounded-full bg-[#c8a84b]" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
