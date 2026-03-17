"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const theme = document.documentElement.getAttribute("data-theme");
        setIsDark(theme !== "light");
    }, []);

    const toggle = () => {
        const next = isDark ? "light" : "dark";
        if (next === "light") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        try {
            localStorage.setItem("kgu-theme", next);
        } catch {
            // ignore
        }
        const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
        if (meta) {
            meta.content = next === "light" ? "#f4f7ff" : "#0a0e1a";
        }
        setIsDark(next === "dark");
    };

    return (
        <button
            onClick={toggle}
            aria-label={isDark ? "Светлая тема" : "Тёмная тема"}
            title={isDark ? "Светлая тема" : "Тёмная тема"}
            className="p-2 rounded-md text-[var(--kgu-muted)] hover:text-[#c8a84b] hover:bg-[rgba(200,168,75,0.08)] transition-colors"
        >
            {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
            )}
        </button>
    );
}
