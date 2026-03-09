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
  metadataBase: new URL("https://onamidojo.fr"),
  title: {
    default: "Onami Dojo | Karaté Kempo & Kyokushin à Amiens",
    template: "%s | Onami Dojo",
  },
  description:
    "Club de karaté à Amiens proposant Kempo Karaté et Kyokushin. Cours pour enfants, adolescents et adultes. 2 cours d'essai gratuits. Rejoignez le dojo de la Grande Vague !",
  keywords: [
    "karaté",
    "kempo",
    "kyokushin",
    "amiens",
    "arts martiaux",
    "dojo",
    "onami",
    "combat",
    "self-défense",
    "enfants",
    "adultes",
    "cours karaté amiens",
    "club karaté somme",
  ],
  authors: [{ name: "Onami Dojo" }],
  openGraph: {
    title: "Onami Dojo | Karaté Kempo & Kyokushin à Amiens",
    description:
      "Club de karaté à Amiens proposant Kempo Karaté et Kyokushin. Cours pour enfants, adolescents et adultes. 2 cours d'essai gratuits.",
    url: "https://onamidojo.fr",
    siteName: "Onami Dojo",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Onami Dojo - Karaté Kempo & Kyokushin à Amiens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Onami Dojo | Karaté à Amiens",
    description:
      "Club de karaté Kempo & Kyokushin à Amiens. 2 cours d'essai gratuits. Rejoignez-nous !",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://onamidojo.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${notoSerifJP.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
