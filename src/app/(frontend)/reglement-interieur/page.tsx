export const metadata = {
  title: 'Règlement Intérieur | Onami Dojo Amiens',
  description: 'Règlement intérieur de l\'Onami Dojo, club de karaté Kempo et Kyokushin à Amiens.',
  alternates: {
    canonical: 'https://www.onamidojo.fr/reglement-interieur',
  },
};

export default function ReglementInterieur() {
  return (
    <div className="min-h-screen bg-[#faf9f6] pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-black text-indigo-950 mb-8">Règlement Intérieur</h1>

        <div className="bg-indigo-950 text-white p-6 rounded-lg mb-8">
          <p className="text-lg font-serif italic">
            &quot;Le dojo est un lieu sacré où l&apos;on cultive le corps et l&apos;esprit.
            Chaque pratiquant s&apos;engage à respecter ce code d&apos;honneur.&quot;
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 1 - Adhésion</h2>
            <p className="text-slate-600 leading-relaxed">
              L&apos;adhésion à l&apos;Onami Dojo implique l&apos;acceptation du présent règlement intérieur.
              Tout membre doit :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li>Être à jour de sa cotisation annuelle</li>
              <li>Posséder une licence FFK valide</li>
              <li>Fournir un certificat médical de non contre-indication à la pratique du karaté</li>
              <li>Remplir et signer le formulaire d&apos;adhésion</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 2 - Tenue vestimentaire</h2>
            <p className="text-slate-600 leading-relaxed">
              La tenue réglementaire est obligatoire :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li><strong>Karategi (kimono) blanc</strong> propre et en bon état</li>
              <li><strong>Ceinture</strong> correspondant au grade obtenu</li>
              <li>Pieds nus sur le tatami</li>
              <li>Aucun bijou, montre ou accessoire métallique</li>
              <li>Ongles courts (mains et pieds)</li>
              <li>Protections obligatoires pour le combat : protège-tibias, gants, coquille (hommes)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 3 - Comportement au dojo</h2>
            <p className="text-slate-600 leading-relaxed">
              Le respect est la valeur fondamentale du dojo :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li><strong>Salut</strong> en entrant et en sortant du dojo</li>
              <li><strong>Ponctualité</strong> : arriver 10 minutes avant le cours</li>
              <li><strong>Silence</strong> pendant les explications de l&apos;instructeur</li>
              <li><strong>Respect</strong> envers les instructeurs, les anciens et tous les partenaires</li>
              <li>Pas de nourriture ni boisson (sauf eau) dans la zone de pratique</li>
              <li>Téléphones portables en mode silencieux ou éteints</li>
              <li>Vocabulaire correct et courtois en toutes circonstances</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 4 - Déroulement des cours</h2>
            <p className="text-slate-600 leading-relaxed">
              Organisation type d&apos;un cours :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li><strong>Salut collectif</strong> au début et à la fin de chaque séance (Seiza)</li>
              <li><strong>Échauffement</strong> obligatoire avant toute pratique</li>
              <li>Demander l&apos;autorisation pour quitter le tatami pendant le cours</li>
              <li>En cas de retard, attendre l&apos;autorisation de l&apos;instructeur pour rejoindre le groupe</li>
              <li>Aucune technique dangereuse sans contrôle de l&apos;instructeur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 5 - Hygiène et sécurité</h2>
            <p className="text-slate-600 leading-relaxed">
              Pour le bien-être de tous :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li>Hygiène corporelle irréprochable</li>
              <li>Karategi lavé régulièrement</li>
              <li>Signaler toute blessure ou problème de santé à l&apos;instructeur</li>
              <li>Ne pas pratiquer en cas de maladie contagieuse</li>
              <li>Les vestiaires doivent être laissés propres</li>
              <li>Ne pas marcher pieds nus en dehors du tatami</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 6 - Assurance et responsabilité</h2>
            <p className="text-slate-600 leading-relaxed">
              Chaque adhérent est couvert par l&apos;assurance de la Fédération Française de Karaté
              via sa licence. L&apos;association décline toute responsabilité :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li>Pour les objets personnels laissés dans les vestiaires</li>
              <li>Pour les accidents survenus en dehors des cours encadrés</li>
              <li>En cas de non-respect des consignes de sécurité</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 7 - Mineurs</h2>
            <p className="text-slate-600 leading-relaxed">
              Pour les pratiquants mineurs :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li>L&apos;adhésion doit être signée par le représentant légal</li>
              <li>Les parents ne sont pas autorisés sur le tatami pendant les cours</li>
              <li>L&apos;association n&apos;assure pas la surveillance avant et après les cours</li>
              <li>En cas de comportement inapproprié répété, l&apos;enfant pourra être exclu temporairement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 8 - Passages de grades</h2>
            <p className="text-slate-600 leading-relaxed">
              Les passages de grades sont organisés selon les règles fédérales :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li><strong>Ceintures de couleur</strong> : examen au sein du club</li>
              <li><strong>Ceinture noire</strong> : examen fédéral régional ou national</li>
              <li>L&apos;inscription aux examens est soumise à l&apos;approbation de l&apos;instructeur</li>
              <li>Assiduité et comportement sont pris en compte</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 9 - Compétitions</h2>
            <p className="text-slate-600 leading-relaxed">
              La participation aux compétitions :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li>Est volontaire et non obligatoire</li>
              <li>Nécessite l&apos;accord de l&apos;instructeur</li>
              <li>Requiert une licence compétition à jour</li>
              <li>Le karatéka représente son club et doit adopter un comportement exemplaire</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 10 - Sanctions</h2>
            <p className="text-slate-600 leading-relaxed">
              Le non-respect du présent règlement peut entraîner :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li><strong>Avertissement verbal</strong></li>
              <li><strong>Avertissement écrit</strong></li>
              <li><strong>Exclusion temporaire</strong></li>
              <li><strong>Exclusion définitive</strong> prononcée par le bureau</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Toute violence, propos discriminatoires ou comportement dangereux entraîne
              l&apos;exclusion immédiate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">Article 11 - Dojo Kun (Code du dojo)</h2>
            <div className="bg-slate-100 p-6 rounded-lg mt-4">
              <p className="text-slate-700 font-serif text-lg mb-4">Chaque pratiquant s&apos;engage à suivre les principes du Dojo Kun :</p>
              <ul className="text-slate-700 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-700 font-bold" aria-hidden="true">一</span>
                  <span><strong>Hitotsu, Jinkaku kansei ni tsutomuru koto</strong> - Chercher la perfection du caractère</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-700 font-bold" aria-hidden="true">一</span>
                  <span><strong>Hitotsu, Makoto no michi o mamoru koto</strong> - Être fidèle à la voie de la vérité</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-700 font-bold" aria-hidden="true">一</span>
                  <span><strong>Hitotsu, Doryoku no seishin o yashinau koto</strong> - Cultiver l&apos;esprit d&apos;effort</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-700 font-bold" aria-hidden="true">一</span>
                  <span><strong>Hitotsu, Reigi o omonzuru koto</strong> - Respecter les règles de l&apos;étiquette</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-700 font-bold" aria-hidden="true">一</span>
                  <span><strong>Hitotsu, Kekki no yu o imashimuru koto</strong> - Se garder de la violence</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="border-t border-slate-200 pt-8">
            <p className="text-slate-500 text-sm">
              Ce règlement a été approuvé par l&apos;assemblée générale de l&apos;association Onami Dojo.
              Tout adhérent reconnaît en avoir pris connaissance et s&apos;engage à le respecter.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
