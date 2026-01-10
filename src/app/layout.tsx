import type { Metadata } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onami Dojo | Karaté Kempo & Kyokushin à Amiens",
  description: "Club de karaté à Amiens proposant Kempo Karaté et Kyokushin. Cours pour enfants, adolescents et adultes. 2 cours d'essai gratuits. Rejoignez le dojo de la Grande Vague !",
  keywords: ["karaté", "kempo", "kyokushin", "amiens", "arts martiaux", "dojo", "onami", "combat", "self-défense", "enfants", "adultes"],
  authors: [{ name: "Onami Dojo" }],
  openGraph: {
    title: "Onami Dojo | Karaté Kempo & Kyokushin à Amiens",
    description: "Club de karaté à Amiens proposant Kempo Karaté et Kyokushin. Cours pour enfants, adolescents et adultes.",
    url: "https://onamidojo.fr",
    siteName: "Onami Dojo",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onami Dojo | Karaté à Amiens",
    description: "Club de karaté Kempo & Kyokushin à Amiens. Rejoignez-nous !",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${notoSerifJP.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
