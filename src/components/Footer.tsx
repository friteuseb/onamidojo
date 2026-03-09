import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer aria-label="Pied de page" className="bg-indigo-950 text-white pt-16 md:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-950">
                <span className="font-serif font-bold text-lg">大</span>
              </div>
              <span className="text-2xl font-serif font-black tracking-tight">ONAMI DOJO</span>
            </div>
            <p className="text-indigo-200 max-w-sm mb-8 text-sm md:text-base">
              Le dojo de la &quot;Grande Vague&quot; (Onami - 大波) symbolise la force irrésistible et le rythme éternel de la mer, des valeurs fondamentales de notre pratique martiale à Amiens.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/wkb_amiens_karate/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Kyokushin WKB Amiens" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-red-700 transition-colors">
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="https://www.facebook.com/onamidojo" target="_blank" rel="noopener noreferrer" aria-label="Facebook Onami Dojo" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-red-700 transition-colors">
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Navigation</h4>
            <ul className="space-y-3 md:space-y-4 text-indigo-200 text-sm">
              <li><Link href="/#disciplines" className="hover:text-white transition-colors">Nos Disciplines</Link></li>
              <li><Link href="/#instructeurs" className="hover:text-white transition-colors">Les Instructeurs</Link></li>
              <li><Link href="/#horaires" className="hover:text-white transition-colors">Planning des Cours</Link></li>
              <li><Link href="/#dojos" className="hover:text-white transition-colors">Notre Dojo</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Informations</h4>
            <ul className="space-y-3 md:space-y-4 text-indigo-200 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-white transition-colors">Politique de Confidentialité</Link></li>
              <li><Link href="/reglement-interieur" className="hover:text-white transition-colors">Règlement Intérieur</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-indigo-400 text-xs">
            © {new Date().getFullYear()} Onami Dojo Amiens. Tous droits réservés.
          </p>
          <p className="text-indigo-400 text-xs">
            Club affilié à la Fédération Française de Karaté (FFK)
          </p>
        </div>
      </div>
    </footer>
  );
}
