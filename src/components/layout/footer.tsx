import { GraduationCap } from "lucide-react";

const footerLinks = [
  { label: "История", href: "#timeline" },
  { label: "Цифры", href: "#stats" },
  { label: "Люди", href: "#people" },
  { label: "Структура", href: "#structure" },
  { label: "Сегодня", href: "#today" },
];

export function Footer() {
  return (
    <footer
      className="relative border-t border-[var(--border)] bg-[var(--navy)]"
      role="contentinfo"
    >
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-light)] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[var(--navy)]" />
              </div>
              <div>
                <p className="text-[var(--text-primary)] font-semibold text-base">
                  Курганский государственный университет
                </p>
                <p className="text-[var(--text-muted)] text-xs">Основан в 1951 году</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <nav aria-label="Ссылки в подвале">
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2" role="list">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-[var(--text-muted)] hover:text-[var(--gold)] text-xs transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href="https://vk.com/kgsu_ru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                aria-label="КГУ ВКонтакте"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.364 1.259 2.177 1.815.615.42 1.082.328 1.082.328l2.175-.03s1.14-.07.599-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.264-1.183-1.06.462-3.246.998-1.329 1.398-2.14 1.273-2.487-.12-.331-.854-.244-.854-.244l-2.45.015s-.182-.025-.316.056c-.132.079-.217.263-.217.263s-.39 1.038-.909 1.92c-1.096 1.86-1.535 1.96-1.714 1.843-.417-.272-.313-1.095-.313-1.678 0-1.826.277-2.588-.538-2.785-.27-.066-.47-.109-1.163-.116-.888-.01-1.64.003-2.065.211-.283.138-.502.447-.369.465.165.022.537.1.735.37.256.347.247 1.127.247 1.127s.147 2.15-.343 2.415c-.336.183-.798-.19-1.788-1.893-.507-.872-.89-1.836-.89-1.836s-.074-.18-.206-.278c-.16-.117-.382-.155-.382-.155l-2.328.015s-.35.01-.478.162c-.114.135-.009.414-.009.414s1.838 4.3 3.92 6.467c1.907 1.987 4.073 1.856 4.073 1.856h.981z" />
                </svg>
              </a>
            </div>

            <p className="text-[var(--text-muted)] text-xs text-center md:text-right">
              © {new Date().getFullYear()} КГУ
              <br />
              <span className="text-[var(--gold)]/60">Зауралье · Образование · Будущее</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
