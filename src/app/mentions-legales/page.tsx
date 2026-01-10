import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Mentions Légales | Onami Dojo Amiens',
  description: 'Mentions légales du site Onami Dojo, club de karaté Kempo et Kyokushin à Amiens.',
};

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#faf9f6] pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-serif font-black text-indigo-950 mb-8">Mentions Légales</h1>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">1. Éditeur du site</h2>
              <p className="text-slate-600 leading-relaxed">
                Le site <strong>onamidojo.fr</strong> est édité par l&apos;association sportive Onami Dojo,
                association loi 1901 déclarée en préfecture de la Somme.
              </p>
              <ul className="text-slate-600 mt-4 space-y-2">
                <li><strong>Nom de l&apos;association :</strong> Onami Dojo</li>
                <li><strong>Siège social :</strong> Amiens, France</li>
                <li><strong>Email :</strong> contact@onamidojo.fr</li>
                <li><strong>Directeur de la publication :</strong> Olivier Leclercq</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">2. Hébergement</h2>
              <p className="text-slate-600 leading-relaxed">
                Ce site est hébergé par :
              </p>
              <ul className="text-slate-600 mt-4 space-y-2">
                <li><strong>Vercel Inc.</strong></li>
                <li>440 N Barranca Ave #4133</li>
                <li>Covina, CA 91723, États-Unis</li>
                <li>Site web : <a href="https://vercel.com" className="text-red-700 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">3. Propriété intellectuelle</h2>
              <p className="text-slate-600 leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes) est la propriété
                exclusive de l&apos;association Onami Dojo ou de ses partenaires. Toute reproduction, représentation,
                modification, publication ou adaptation de tout ou partie des éléments du site est interdite,
                sauf autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">4. Affiliation fédérale</h2>
              <p className="text-slate-600 leading-relaxed">
                L&apos;Onami Dojo est affilié à la <strong>Fédération Française de Karaté et Disciplines Associées (FFK)</strong>.
                Les instructeurs sont diplômés d&apos;État et/ou titulaires de grades reconnus par la fédération.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">5. Limitation de responsabilité</h2>
              <p className="text-slate-600 leading-relaxed">
                L&apos;association Onami Dojo s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
                diffusées sur ce site. Toutefois, elle ne peut garantir l&apos;exactitude, la précision ou
                l&apos;exhaustivité des informations mises à disposition. Les informations présentes sur le site
                sont données à titre indicatif et sont susceptibles d&apos;évoluer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">6. Liens hypertextes</h2>
              <p className="text-slate-600 leading-relaxed">
                Le site peut contenir des liens vers d&apos;autres sites internet. L&apos;association Onami Dojo
                n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">7. Droit applicable</h2>
              <p className="text-slate-600 leading-relaxed">
                Les présentes mentions légales sont régies par le droit français. En cas de litige,
                les tribunaux français seront seuls compétents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">8. Contact</h2>
              <p className="text-slate-600 leading-relaxed">
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter à
                l&apos;adresse : <a href="mailto:contact@onamidojo.fr" className="text-red-700 hover:underline">contact@onamidojo.fr</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
