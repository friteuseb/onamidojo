export const metadata = {
  title: 'Politique de Confidentialité | Onami Dojo Amiens',
  description: 'Politique de confidentialité et protection des données personnelles du site Onami Dojo.',
  alternates: {
    canonical: 'https://www.onamidojo.fr/confidentialite',
  },
};

export default function Confidentialite() {
  return (
    <div className="min-h-screen bg-[#faf9f6] pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-black text-indigo-950 mb-8">Politique de Confidentialité</h1>

        <p className="text-slate-600 mb-8 leading-relaxed">
          Dernière mise à jour : mars 2026
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              L&apos;association Onami Dojo s&apos;engage à protéger la vie privée des utilisateurs de son site internet.
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons
              vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">2. Responsable du traitement</h2>
            <p className="text-slate-600 leading-relaxed">
              Le responsable du traitement des données personnelles est :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2">
              <li><strong>Association Onami Dojo</strong></li>
              <li>Amiens, France</li>
              <li>Email : contact@onamidojo.fr</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">3. Données collectées</h2>
            <p className="text-slate-600 leading-relaxed">
              Nous pouvons collecter les données suivantes :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li><strong>Données d&apos;identification :</strong> nom, prénom, adresse email</li>
              <li><strong>Données de contact :</strong> numéro de téléphone, adresse postale</li>
              <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées</li>
              <li><strong>Données sportives :</strong> niveau de pratique, certificat médical (pour les adhérents)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">4. Finalités du traitement</h2>
            <p className="text-slate-600 leading-relaxed">
              Vos données sont collectées pour les finalités suivantes :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li>Gestion des demandes de contact et d&apos;information</li>
              <li>Traitement des inscriptions et adhésions au club</li>
              <li>Organisation des cours et événements</li>
              <li>Communication sur les activités du club</li>
              <li>Respect des obligations légales et fédérales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">5. Base légale</h2>
            <p className="text-slate-600 leading-relaxed">
              Le traitement de vos données repose sur :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li><strong>Votre consentement</strong> pour les formulaires de contact</li>
              <li><strong>L&apos;exécution du contrat</strong> pour la gestion des adhésions</li>
              <li><strong>L&apos;intérêt légitime</strong> pour l&apos;amélioration de nos services</li>
              <li><strong>L&apos;obligation légale</strong> pour les déclarations fédérales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">6. Durée de conservation</h2>
            <p className="text-slate-600 leading-relaxed">
              Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles
              elles ont été collectées :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
              <li><strong>Données d&apos;adhésion :</strong> durée de l&apos;adhésion + 5 ans</li>
              <li><strong>Données comptables :</strong> 10 ans (obligation légale)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">7. Destinataires des données</h2>
            <p className="text-slate-600 leading-relaxed">
              Vos données peuvent être transmises à :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li>Les membres du bureau de l&apos;association</li>
              <li>La fédération concernée (WKB France pour le Kyokushin) pour les licences</li>
              <li>Notre hébergeur (Vercel) pour le fonctionnement technique du site</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Nous ne vendons ni ne louons vos données personnelles à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">8. Vos droits</h2>
            <p className="text-slate-600 leading-relaxed">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2 list-disc list-inside">
              <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@onamidojo.fr" className="text-red-700 hover:underline">contact@onamidojo.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">9. Sécurité</h2>
            <p className="text-slate-600 leading-relaxed">
              Nous mettons en oeuvre des mesures techniques et organisationnelles appropriées pour
              protéger vos données contre tout accès non autorisé, modification, divulgation ou
              destruction. Le site utilise le protocole HTTPS pour sécuriser les échanges de données.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">10. Cookies</h2>
            <p className="text-slate-600 leading-relaxed">
              Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement.
              Aucun cookie de tracking ou publicitaire n&apos;est utilisé. Vous pouvez configurer
              votre navigateur pour refuser les cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">11. Réclamation</h2>
            <p className="text-slate-600 leading-relaxed">
              Si vous estimez que le traitement de vos données constitue une violation du RGPD,
              vous pouvez introduire une réclamation auprès de la CNIL :
            </p>
            <ul className="text-slate-600 mt-4 space-y-2">
              <li><strong>Commission Nationale de l&apos;Informatique et des Libertés</strong></li>
              <li>3 Place de Fontenoy - TSA 80715</li>
              <li>75334 Paris Cedex 07</li>
              <li>Site web : <a href="https://www.cnil.fr" className="text-red-700 hover:underline" target="_blank" rel="noopener noreferrer">www.cnil.fr</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-indigo-950 mb-4">12. Modifications</h2>
            <p className="text-slate-600 leading-relaxed">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
              Les modifications prennent effet dès leur publication sur cette page. Nous vous encourageons
              à consulter régulièrement cette page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
