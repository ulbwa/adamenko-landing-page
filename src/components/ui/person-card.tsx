"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Easing } from "framer-motion";
import type { AlumnusItem } from "@/types/content";

const ease: Easing = [0.25, 0.4, 0.25, 1];

function AvatarSvg({ name, size = 200 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
  const id = `av-${initials}-${size}`;
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className="w-full h-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1e3060" />
          <stop offset="100%" stopColor="#070c18" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
      <text
        x="100"
        y="107"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size <= 120 ? "68" : "72"}
        fontWeight="700"
        fill="#c8a84b"
        fontFamily="Georgia, serif"
        letterSpacing="2"
      >
        {initials}
      </text>
      {/* Decorative ring */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="rgba(200,168,75,0.15)"
        strokeWidth="1"
      />
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="rgba(200,168,75,0.06)"
        strokeWidth="1"
      />
    </svg>
  );
}

interface PersonCardProps {
  person: AlumnusItem;
  index: number;
}

export function PersonCard({ person, index }: PersonCardProps) {
  const [imgErr, setImgErr] = useState(false);
  const [open, setOpen] = useState(false);

  const close = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setOpen(false);
  }, []);

  const hasPhoto = !!person.photo && !imgErr;

  return (
    <>
      {/* ── Card ─────────────────────────────────────────────── */}
      <motion.article
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, delay: index * 0.1, ease }}
        onClick={() => setOpen(true)}
        whileHover={{ y: -6, transition: { duration: 0.22 } }}
        data-hover
        className="glass-card rounded-2xl overflow-hidden cursor-pointer group relative select-none"
        aria-label={`Открыть профиль: ${person.name}`}
      >
        {/* Photo / avatar */}
        <div className="relative h-56 overflow-hidden bg-[var(--kgu-deep)]">
          {hasPhoto ? (
            <img
              src={person.photo}
              alt={person.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              onError={() => setImgErr(true)}
            />
          ) : (
            <AvatarSvg name={person.name} />
          )}
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--kgu-deep)] via-[var(--kgu-deep-mid)] to-transparent" />

          {/* Tags layered on photo */}
          {person.tags && person.tags.length > 0 && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {person.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-[#c8a84b] border border-[rgba(200,168,75,0.3)] tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="p-5">
          <h3 className="text-[var(--kgu-text)] font-bold text-base leading-snug mb-1 group-hover:text-[#c8a84b] transition-colors font-[family-name:var(--font-playfair)]">
            {person.name}
          </h3>
          <p className="text-[#c8a84b] text-xs font-semibold mb-2.5">
            {person.graduation}
          </p>
          <p className="text-[var(--kgu-muted)] text-xs leading-relaxed line-clamp-2">
            {person.achievement}
          </p>

          {/* "More" indicator */}
          <div className="mt-4 flex items-center gap-1.5 text-[#c8a84b] text-xs font-semibold">
            <span>Подробнее</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              →
            </motion.span>
          </div>
        </div>

        {/* Hover glow border */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-[rgba(200,168,75,0.45)] shadow-[0_0_35px_rgba(200,168,75,0.08)]" />
      </motion.article>

      {/* ── Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/78 backdrop-blur-md z-[200] flex items-center justify-center p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`Профиль: ${person.name}`}
          >
            <motion.div
              key="panel"
              initial={{ scale: 0.82, opacity: 0, y: 36 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 18 }}
              transition={{ duration: 0.38, ease }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--kgu-deep)] border border-[rgba(200,168,75,0.22)] rounded-3xl max-w-md w-full overflow-hidden shadow-[0_0_80px_rgba(200,168,75,0.18)]"
            >
              {/* Modal photo */}
              <div className="relative h-64 bg-[var(--kgu-deep)] overflow-hidden">
                {hasPhoto ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgErr(true)}
                  />
                ) : (
                  <AvatarSvg name={person.name} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--kgu-deep)] via-[var(--kgu-deep-mid)] to-transparent" />

                {/* Close */}
                <button
                  onClick={close}
                  data-hover
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-[var(--kgu-muted)] hover:text-white hover:bg-black/75 transition-colors"
                  aria-label="Закрыть"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path
                      d="M1 1l11 11M12 1L1 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal content */}
              <div className="p-6">
                {/* Tags */}
                {person.tags && person.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {person.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[rgba(200,168,75,0.1)] text-[#c8a84b] border border-[rgba(200,168,75,0.25)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-[var(--kgu-text)] font-bold text-xl font-[family-name:var(--font-playfair)] mb-0.5">
                  {person.name}
                </h2>
                <p className="text-[#c8a84b] text-sm font-semibold mb-4">
                  {person.graduation}
                </p>
                <p className="text-[var(--kgu-muted)] text-sm leading-relaxed mb-5">
                  {person.bioExtended ?? person.achievement}
                </p>

                {person.wikiUrl && (
                  <a
                    href={person.wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 text-[#c8a84b] text-sm font-semibold hover:text-[#e4c97a] transition-colors"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                    Читать в Википедии
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
