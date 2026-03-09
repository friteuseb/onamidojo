import type { Metadata } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";

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
    url: "https://www.onamidojo.fr",
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16' },
      { url: '/images/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
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
    canonical: "https://www.onamidojo.fr",
  },
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${notoSerifJP.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-indigo-950 focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:font-bold"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <GoogleAnalytics />
        <CookieConsent />
      </body>
    </html>
  );
}
