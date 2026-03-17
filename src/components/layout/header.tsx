"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "История", href: "#timeline" },
  { label: "Цифры", href: "#stats" },
  { label: "Люди", href: "#people" },
  { label: "Структура", href: "#structure" },
  { label: "Сегодня", href: "#today" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--navy)]/95 backdrop-blur-xl border-b border-[var(--border)] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between"
        aria-label="Главная навигация"
      >
        <a href="#" className="group flex-shrink-0" aria-label="КГУ — на главную">
          <Image
            src="/images/logo.svg"
            alt="Логотип КГУ"
            width={200}
            height={56}
            className="h-14 w-auto brightness-0 invert opacity-90 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_var(--gold-glow)] transition-all duration-300"
            priority
          />
        </a>

        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 lg:px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--gold)] text-sm font-medium rounded-lg hover:bg-[var(--gold-glow)] transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center">
          <a
            href="#cta"
            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[var(--navy)] text-sm font-semibold rounded-lg hover:shadow-[0_0_24px_var(--gold-glow)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Поступить
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--gold)] hover:bg-[var(--gold-glow)] transition-colors"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--navy)]/98 backdrop-blur-xl border-b border-[var(--border)] overflow-hidden"
          >
            <ul className="px-4 py-3 space-y-1" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--gold)] text-sm font-medium rounded-lg hover:bg-[var(--gold-glow)] transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#cta"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-[var(--navy)] text-sm font-semibold rounded-lg text-center mt-2"
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
