export default function JsonLd() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': 'https://onamidojo.fr/#organization',
    name: 'Onami Dojo',
    alternateName: '大波道場',
    description: 'Club de karaté à Amiens proposant Kempo Karaté et Kyokushin. Cours pour enfants, adolescents et adultes.',
    url: 'https://onamidojo.fr',
    telephone: '+33766222745',
    email: 'contact@onamidojo.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '24 rue des Cordeliers',
      addressLocality: 'Amiens',
      postalCode: '80000',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.8941,
      longitude: 2.2958,
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '19:30', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '20:30', closes: '22:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '16:00', closes: '19:15' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '20:30', closes: '22:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '20:30', closes: '22:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '19:00', closes: '20:15' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '10:00', closes: '11:30' },
    ],
    sport: ['Karaté', 'Kempo', 'Kyokushin'],
    memberOf: {
      '@type': 'SportsOrganization',
      name: 'Fédération Française de Karaté',
      alternateName: 'FFK',
    },
    priceRange: '€',
    currenciesAccepted: 'EUR',
    areaServed: {
      '@type': 'City',
      name: 'Amiens',
    },
    sameAs: [],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Peut-on essayer le karaté gratuitement à Onami Dojo ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, nous proposons 2 cours d\'essai gratuits sans engagement. Il suffit de venir avec une tenue de sport et de l\'eau.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelles disciplines sont enseignées à Onami Dojo ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nous enseignons le Kempo Karaté (combat libre japonais intégrant frappes, projections et travail au sol) et le Kyokushin Karaté (full contact traditionnel).',
        },
      },
      {
        '@type': 'Question',
        name: 'À partir de quel âge peut-on commencer le karaté ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les cours enfants sont ouverts dès 6 ans. Nous proposons des sections dédiées pour les enfants (-13 ans), les adolescents (13+ ans) et les adultes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Où se trouve le dojo d\'Onami Dojo à Amiens ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Notre dojo se situe au 24 rue des Cordeliers à Amiens (80000). Tous les cours y sont dispensés.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
