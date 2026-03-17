import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CursorFollower } from "@/components/ui/cursor-follower";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "КГУ — 70 лет развития высшего образования в Зауралье",
  description:
    "Курганский государственный университет — крупнейший вуз Курганской области. История, достижения, структура и выдающиеся выпускники с 1951 года.",
  keywords: "КГУ, Курганский государственный университет, вуз Кургана, высшее образование, Зауралье",
  openGraph: {
    title: "КГУ — 70 лет развития высшего образования в Зауралье",
    description:
      "От педагогического института до современного научно-образовательного центра — история КГУ неразрывно связана с историей региона.",
    type: "website",
    locale: "ru_RU",
  },
};

const themeInitScript = `(function(){try{var s=localStorage.getItem('kgu-theme');var p=window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';var t=s||p;if(t==='light'){document.documentElement.setAttribute('data-theme','light');var m=document.querySelector('meta[name="theme-color"]');if(m)m.content='#f4f7ff'}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0a0e1a" />
        {/* Prevent flash of wrong theme before React hydration */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}

