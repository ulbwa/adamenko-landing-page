"use client";

import { FadeIn } from "@/components/ui/motion";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

interface CtaSectionProps {
  title: string;
  subtitle: string;
  links: { label: string; href: string }[];
}

export function CtaSection({ title, subtitle, links }: CtaSectionProps) {
  return (
    <section id="cta" className="relative section-padding overflow-hidden" aria-labelledby="cta-heading">
      {/* background accents */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy)] via-[var(--navy-light)] to-[var(--navy)]" aria-hidden="true" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--gold-glow)] rounded-full blur-[200px] opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2
            id="cta-heading"
            className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6"
          >
            {title}
          </h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl mx-auto mb-10">
            {subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={
                  i === 0
                    ? "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-gradient-to-r from-[var(--gold)] to-[#e8c36a] text-[var(--navy)] shadow-[0_0_24px_var(--gold-glow)] hover:shadow-[0_0_40px_var(--gold-glow)] transition-shadow"
                    : "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                }
              >
                {link.label} <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Map */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <FadeIn delay={0.3}>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[var(--gold)]" />
            <span className="text-[var(--text-primary)] font-semibold text-sm">Административный корпус КГУ</span>
            <span className="text-[var(--text-muted)] text-xs hidden sm:inline">· г. Курган, ул. Советская, 63</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-[var(--border)] h-[280px] sm:h-[340px]">
            <iframe
              title="Карта КГУ"
              src="https://yandex.ru/map-widget/v1/?ll=65.345002%2C55.434992&z=16&pt=65.345002%2C55.434992%2Cpm2rdm&scroll=false"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
