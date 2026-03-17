"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ShapeConfig {
    id: number;
    left: string;
    top: string;
    size: number;
    rotateDuration: number;
    rotateDir: 1 | -1;
    floatDuration: number;
    floatAmp: number;
    driftX: number;
    driftY: number;
    opacity: number;
    color: string;
    delay: number;
    type: "diamond" | "ring" | "cross" | "hexagon" | "dot" | "triangle";
}

const DEFAULT_SHAPES: ShapeConfig[] = [
    { id: 1, left: "5%", top: "15%", size: 30, rotateDuration: 12, rotateDir: 1, floatDuration: 6, floatAmp: 14, driftX: 10, driftY: -8, opacity: 0.18, color: "#c8a84b", delay: 0, type: "diamond" },
    { id: 2, left: "88%", top: "20%", size: 46, rotateDuration: 22, rotateDir: -1, floatDuration: 8, floatAmp: 18, driftX: -12, driftY: 10, opacity: 0.12, color: "#c8a84b", delay: 2, type: "ring" },
    { id: 3, left: "12%", top: "62%", size: 22, rotateDuration: 9, rotateDir: 1, floatDuration: 5, floatAmp: 10, driftX: 14, driftY: -16, opacity: 0.16, color: "#6a9fd8", delay: 1, type: "cross" },
    { id: 4, left: "80%", top: "65%", size: 38, rotateDuration: 18, rotateDir: -1, floatDuration: 7, floatAmp: 16, driftX: -8, driftY: -12, opacity: 0.14, color: "#c8a84b", delay: 3, type: "hexagon" },
    { id: 5, left: "2%", top: "40%", size: 56, rotateDuration: 30, rotateDir: 1, floatDuration: 11, floatAmp: 8, driftX: 6, driftY: 12, opacity: 0.07, color: "#c8a84b", delay: 0.5, type: "ring" },
    { id: 6, left: "52%", top: "6%", size: 28, rotateDuration: 14, rotateDir: -1, floatDuration: 6.5, floatAmp: 20, driftX: -14, driftY: 18, opacity: 0.1, color: "#6a9fd8", delay: 4, type: "diamond" },
    { id: 7, left: "94%", top: "48%", size: 24, rotateDuration: 10, rotateDir: 1, floatDuration: 5.5, floatAmp: 12, driftX: -16, driftY: -10, opacity: 0.16, color: "#c8a84b", delay: 1.5, type: "cross" },
    { id: 8, left: "40%", top: "84%", size: 18, rotateDuration: 8, rotateDir: -1, floatDuration: 4.5, floatAmp: 10, driftX: 12, driftY: -20, opacity: 0.2, color: "#c8a84b", delay: 2.5, type: "dot" },
    { id: 9, left: "28%", top: "22%", size: 14, rotateDuration: 7, rotateDir: 1, floatDuration: 4, floatAmp: 8, driftX: 18, driftY: 6, opacity: 0.22, color: "#c8a84b", delay: 3.5, type: "dot" },
    { id: 10, left: "63%", top: "43%", size: 42, rotateDuration: 24, rotateDir: -1, floatDuration: 10, floatAmp: 18, driftX: -6, driftY: -14, opacity: 0.08, color: "#c8a84b", delay: 1, type: "hexagon" },
    { id: 11, left: "18%", top: "88%", size: 20, rotateDuration: 11, rotateDir: 1, floatDuration: 6, floatAmp: 10, driftX: 16, driftY: -8, opacity: 0.15, color: "#6a9fd8", delay: 0, type: "triangle" },
    { id: 12, left: "74%", top: "82%", size: 32, rotateDuration: 17, rotateDir: -1, floatDuration: 7.5, floatAmp: 14, driftX: -10, driftY: -18, opacity: 0.12, color: "#c8a84b", delay: 2, type: "diamond" },
];

function Diamond({ size, color }: { size: number; color: string }) {
    const s = size;
    return (
        <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
            <rect x="3" y="3" width="34" height="34" rx="3" stroke={color} strokeWidth="1.5" transform="rotate(45 20 20)" />
        </svg>
    );
}

function Ring({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="1.5" />
            <circle cx="20" cy="20" r="8" stroke={color} strokeWidth="0.8" strokeDasharray="3.5 2.5" />
        </svg>
    );
}

function Cross({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
            <path d="M20 4v32M4 20h32" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 4v32M4 20h32" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.1" />
        </svg>
    );
}

function Hexagon({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
            <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" stroke={color} strokeWidth="1.5" fill="none" />
            <polygon points="20,8 30,14 30,26 20,32 10,26 10,14" stroke={color} strokeWidth="0.6" fill="none" strokeDasharray="3 2" />
        </svg>
    );
}

function Dot({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="5" fill={color} />
            <circle cx="20" cy="20" r="10" stroke={color} strokeWidth="0.8" />
        </svg>
    );
}

function Triangle({ size, color }: { size: number; color: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
            <polygon points="20,3 37,35 3,35" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
    );
}

const SHAPE_MAP = { diamond: Diamond, ring: Ring, cross: Cross, hexagon: Hexagon, dot: Dot, triangle: Triangle };

interface FloatingShapesProps {
    shapes?: ShapeConfig[];
    className?: string;
}

export function FloatingShapes({ shapes = DEFAULT_SHAPES, className = "" }: FloatingShapesProps) {
    const [isLightTheme, setIsLightTheme] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const updateTheme = () => setIsLightTheme(root.getAttribute("data-theme") === "light");
        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`floating-shapes-layer absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
            {shapes.map((shape) => {
                const ShapeComp = SHAPE_MAP[shape.type];
                const effectiveOpacity = Math.min(shape.opacity * (isLightTheme ? 1.9 : 1), 0.42);
                const effectiveColor = isLightTheme
                    ? (shape.color === "#c8a84b" ? "#9b7727" : "#3e6ea8")
                    : shape.color;
                return (
                    <motion.div
                        key={shape.id}
                        style={{
                            position: "absolute",
                            left: shape.left,
                            top: shape.top,
                            opacity: effectiveOpacity,
                        }}
                        animate={{
                            rotate: [0, shape.rotateDir * 360],
                            y: [0, -shape.floatAmp, shape.floatAmp * 0.5, 0],
                            x: [0, shape.driftX, -shape.driftX * 0.6, shape.driftX * 0.3, 0],
                        }}
                        transition={{
                            rotate: {
                                duration: shape.rotateDuration,
                                repeat: Infinity,
                                ease: "linear",
                            },
                            y: {
                                duration: shape.floatDuration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: shape.delay,
                            },
                            x: {
                                duration: shape.floatDuration * 1.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: shape.delay * 0.7,
                            },
                        }}
                    >
                        <ShapeComp size={shape.size} color={effectiveColor} />
                    </motion.div>
                );
            })}
        </div>
    );
}
