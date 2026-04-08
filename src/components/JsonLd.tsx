export default function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.onamidojo.fr/#organization',
    name: 'Onami Dojo',
    alternateName: '大波道場',
    url: 'https://www.onamidojo.fr',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.onamidojo.fr/images/logo-onami-dojo.png',
      width: 512,
      height: 512,
    },
    email: 'onamidojo@yahoo.com',
    telephone: '+33766222745',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '24 rue des Cordeliers',
      addressLocality: 'Amiens',
      postalCode: '80000',
      addressCountry: 'FR',
    },
    memberOf: {
      '@type': 'SportsOrganization',
      name: 'World Kyokushin Budokai France',
      alternateName: 'WKB France',
      url: 'https://karatekyokushin.fr/',
    },
  };

  const sportsLocation = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    '@id': 'https://www.onamidojo.fr/#sportslocation',
    name: 'Onami Dojo',
    alternateName: '大波道場',
    description: 'Club de karaté à Amiens proposant Kempo Karaté et Kyokushin. Cours pour enfants, adolescents et adultes.',
    url: 'https://www.onamidojo.fr',
    image: 'https://www.onamidojo.fr/images/og-image.jpg',
    telephone: '+33766222745',
    email: 'onamidojo@yahoo.com',
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
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '19:00', closes: '20:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '16:45', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '20:30', closes: '22:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '19:00', closes: '20:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '10:00', closes: '11:30' },
    ],
    priceRange: '€',
    currenciesAccepted: 'EUR',
    areaServed: {
      '@type': 'City',
      name: 'Amiens',
    },
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.onamidojo.fr/#website',
    name: 'Onami Dojo',
    alternateName: '大波道場',
    url: 'https://www.onamidojo.fr',
    inLanguage: 'fr',
    publisher: {
      '@id': 'https://www.onamidojo.fr/#organization',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsLocation) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}
