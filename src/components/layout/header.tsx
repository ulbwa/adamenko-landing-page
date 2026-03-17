"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
    { label: "История", href: "#history" },
    { label: "Вехи", href: "#timeline" },
    { label: "Цифры", href: "#stats" },
    { label: "Люди", href: "#people" },
    { label: "Структура", href: "#structure" },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-[var(--kgu-navy)]/90 backdrop-blur-xl border-b border-[rgba(200,168,75,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                    : "bg-transparent"
                }`}
            role="banner"
        >
            <nav
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
                aria-label="Главная навигация"
            >
                {/* Logo */}
                <a
                    href="#"
                    className="flex items-center gap-3 group"
                    aria-label="КГУ — на главную"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/logo.svg"
                        alt="КГУ логотип"
                        className="h-9 w-auto logo-img group-hover:opacity-80 transition-opacity duration-300"
                    />
                </a>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-1" role="list">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="px-4 py-2 text-[var(--kgu-muted)] hover:text-[#c8a84b] text-sm font-medium rounded-md hover:bg-[rgba(200,168,75,0.08)] transition-all duration-200"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Theme toggle + CTA Button desktop */}
                <div className="hidden md:flex items-center gap-2">
                    <ThemeToggle />
                    <a
                        href="#cta"
                        className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#c8a84b] to-[#a8882b] text-[#0a0e1a] text-sm font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(200,168,75,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Поступить
                    </a>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden p-2 rounded-md text-[var(--kgu-muted)] hover:text-[#c8a84b] hover:bg-[rgba(200,168,75,0.08)] transition-colors"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                    aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                >
                    <span className="sr-only">{menuOpen ? "Закрыть" : "Меню"}</span>
                    <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
                        <motion.span
                            animate={menuOpen ? { rotate: 45, translateY: 7 } : { rotate: 0, translateY: 0 }}
                            className="block w-full h-0.5 bg-current origin-center transition-transform"
                        />
                        <motion.span
                            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-full h-0.5 bg-current"
                        />
                        <motion.span
                            animate={menuOpen ? { rotate: -45, translateY: -7 } : { rotate: 0, translateY: 0 }}
                            className="block w-full h-0.5 bg-current origin-center transition-transform"
                        />
                    </div>
                </button>
            </nav>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[var(--kgu-deep)]/95 backdrop-blur-xl border-b border-[rgba(200,168,75,0.15)] overflow-hidden"
                    >
                        <ul className="px-4 py-3 space-y-1" role="list">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block px-4 py-2.5 text-[var(--kgu-muted)] hover:text-[#c8a84b] text-sm font-medium rounded-md hover:bg-[rgba(200,168,75,0.08)] transition-all"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            <li className="flex items-center justify-between px-4 py-1.5">
                                <span className="text-[var(--kgu-muted)] text-xs">Тема</span>
                                <ThemeToggle />
                            </li>
                            <li>
                                <a
                                    href="#cta"
                                    onClick={() => setMenuOpen(false)}
                                    className="block px-4 py-2.5 bg-gradient-to-r from-[#c8a84b] to-[#a8882b] text-[#0a0e1a] text-sm font-semibold rounded-md text-center mt-2"
                                >
                                    Поступить
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
