import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onamidojo.fr"),
  title: {
    default: "Onami Dojo | Karaté Kempo & Kyokushin à Amiens",
    template: "%s | Onami Dojo",
  },
  description:
    "Club de karaté à Amiens proposant Kempo Karaté et Kyokushin. Cours pour enfants, adolescents et adultes. 2 cours d'essai gratuits. Rejoignez le dojo de la Grande Vague !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
