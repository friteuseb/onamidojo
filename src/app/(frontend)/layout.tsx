import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd />
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
    </>
  );
}
