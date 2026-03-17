import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

