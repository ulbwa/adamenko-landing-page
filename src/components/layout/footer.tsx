export function Footer() {
    return (
        <footer
            className="relative border-t border-[rgba(200,168,75,0.15)] bg-[var(--kgu-navy)] py-10"
            role="contentinfo"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8a84b] to-[#8a6a20] flex items-center justify-center text-white font-bold text-xs">
                            КГУ
                        </div>
                        <div>
                            <p className="text-[var(--kgu-text)] font-semibold text-sm">
                                Курганский государственный университет
                            </p>
                            <p className="text-[var(--kgu-muted)] text-xs">Основан в 1951 году</p>
                        </div>
                    </div>

                    <nav aria-label="Ссылки в нижней части страницы">
                        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2" role="list">
                            {[
                                { label: "История", href: "#history" },
                                { label: "Вехи", href: "#timeline" },
                                { label: "Цифры", href: "#stats" },
                                { label: "Люди", href: "#people" },
                                { label: "Структура", href: "#structure" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-[var(--kgu-muted)] hover:text-[#c8a84b] text-xs transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <p className="text-[var(--kgu-muted)] text-xs text-center md:text-right">
                        © {new Date().getFullYear()} КГУ
                        <br />
                        <span className="text-[rgba(200,168,75,0.6)]">Зауралье. Образование. Будущее.</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
