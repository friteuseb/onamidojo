import type { Metadata } from 'next';
import Image from 'next/image';
import {
  CalendarDays,
  MapPin,
  Euro,
  Phone,
  Mail,
  Download,
  ChevronRight,
  Clock,
  Hotel,
  Backpack,
  Award,
  ExternalLink,
  Info,
} from 'lucide-react';
import CampRegistrationForm from './CampRegistrationForm';
import { CAMP, isCampUpcoming } from '@/data/camp-automne-2026';

export const revalidate = 300;

const SITE_URL = 'https://www.onamidojo.fr';
const PAGE_URL = `${SITE_URL}${CAMP.path}`;

export const metadata: Metadata = {
  title: 'Camp d\'automne Kyokushin WKB France à Amiens | 16-18 octobre 2026',
  description:
    'Stage de karaté Kyokushin à Amiens du 16 au 18 octobre 2026 avec Kancho Pedro Roïz (9ème Dan) et Shihan Daniel Sanchez (6ème Dan). Programme, lieux, hébergement, tarifs et inscription en ligne.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: '6ème Camp d\'automne WKB France — Amiens, 16-18 octobre 2026',
    description:
      'Stage Kyokushin avec Kancho Pedro Roïz (9ème Dan) et Shihan Daniel Sanchez (6ème Dan). 90 € les 3 jours, 65 € la journée. Places limitées.',
    url: PAGE_URL,
    siteName: 'Onami Dojo',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: CAMP.poster,
        width: 526,
        height: 686,
        alt: 'Affiche du camp d\'automne WKB France 2026 à Amiens',
      },
    ],
  },
};

// --- Custom Components ---

const SeigaihaPattern = () => (
  <div
    className="absolute inset-0 opacity-5 pointer-events-none"
    aria-hidden="true"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'%3E%3Cpath d='M0 40c0-11.046 8.954-20 20-20s20 8.954 20 20M0 30c0-5.523 4.477-10 10-10s10 4.477 10 10m20 10c0-11.046 8.954-20 20-20s20 8.954 20 20m-20-10c0-5.523 4.477-10 10-10s10 4.477 10 10' fill='none' stroke='%231e3a8a' stroke-width='1.5'/%3E%3C/svg%3E")`,
    }}
  />
);

const SectionHeading = ({
  title,
  subtitle,
  japanese,
}: {
  title: string;
  subtitle: string;
  japanese: string;
}) => (
  <div className="relative mb-12 text-center md:text-left">
    <span className="text-red-700 font-medium tracking-widest uppercase text-sm mb-2 block">
      {subtitle}
    </span>
    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 flex items-baseline gap-4 justify-center md:justify-start flex-wrap">
      {title}
      <span className="text-slate-300 font-serif text-4xl md:text-5xl opacity-50 select-none hidden md:block">
        {japanese}
      </span>
    </h2>
    <div className="w-24 h-1 bg-red-700 mt-4 mx-auto md:mx-0"></div>
  </div>
);

// --- Données ---

const LIEUX = {
  onami: {
    name: 'Onami Dojo',
    detail: 'Dojo national WKB France',
    street: '24 rue des Cordeliers',
    city: '80000 Amiens',
    maps: 'https://www.google.com/maps/search/?api=1&query=24+rue+des+Cordeliers+80000+Amiens',
  },
  regional: {
    name: 'Dojo Régional d\'Amiens',
    detail: 'Dojo Régional Michel Bourgoin — Maison des Sports',
    street: '2 rue Lescouvé',
    city: '80000 Amiens',
    maps: 'https://www.google.com/maps/search/?api=1&query=Dojo+R%C3%A9gional+Michel+Bourgoin+2+rue+Lescouv%C3%A9+80000+Amiens',
  },
};

const PROGRAMME = [
  {
    day: 'Vendredi 16 octobre',
    sessions: [{ time: '20h00 - 22h00', title: 'Ouverture du camp' }],
    lieu: LIEUX.onami,
  },
  {
    day: 'Samedi 17 octobre',
    sessions: [
      { time: '10h00 - 12h00', title: 'Kihon / Ido et techniques de kumite' },
      { time: '15h00 - 18h00', title: 'Kihon / Ido et techniques de kumite' },
    ],
    lieu: LIEUX.regional,
  },
  {
    day: 'Dimanche 18 octobre',
    sessions: [{ time: '09h00 - 11h00', title: 'Kata et bunkai' }],
    lieu: LIEUX.regional,
  },
];

const EXPERTS = [
  {
    name: 'Kancho Pedro Roïz',
    rank: '9ème Dan',
    role: 'Dirigeant de World Kyokushin Budokai',
  },
  {
    name: 'Shihan Daniel Sanchez',
    rank: '6ème Dan',
    role: 'Multiple champion, il a réalisé avec succès la mythique épreuve des 100 combats.',
  },
];

const HOTELS = [
  {
    name: 'B&B Hotel Amiens Centre Cathédrale',
    distances: ['15 min à pied de la gare', 'Proximité immédiate de l\'Onami Dojo', '15/20 min à pied du Dojo régional'],
  },
  {
    name: 'Appart\'City Amiens Gare',
    distances: ['5 min à pied de la gare', '10/15 min à pied de l\'Onami Dojo', '25 min à pied du Dojo régional'],
  },
  {
    name: 'Moxy Hotel Amiens Gare',
    distances: ['5 min à pied de la gare', '10/15 min à pied de l\'Onami Dojo', '25 min à pied du Dojo régional'],
  },
  {
    name: 'Ibis Styles Amiens Centre',
    distances: ['5 min à pied de la gare', '10 min à pied de l\'Onami Dojo', '25 min à pied du Dojo régional'],
  },
];

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: '6ème Camp d\'automne World Kyokushin Budokai France',
  description:
    'Stage annuel de karaté Kyokushin organisé par WKB France à Amiens avec Kancho Pedro Roïz (9ème Dan) et Shihan Daniel Sanchez (6ème Dan), ouvert aux dojos adhérents comme aux non-adhérents.',
  startDate: CAMP.startDate,
  endDate: CAMP.endDate,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: [`${SITE_URL}${CAMP.poster}`, `${SITE_URL}${CAMP.photo}`],
  url: PAGE_URL,
  sport: 'Karaté Kyokushin',
  inLanguage: 'fr',
  location: [LIEUX.onami, LIEUX.regional].map((l) => ({
    '@type': 'Place',
    name: l.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: l.street,
      addressLocality: 'Amiens',
      postalCode: '80000',
      addressCountry: 'FR',
    },
  })),
  organizer: {
    '@type': 'SportsOrganization',
    name: 'World Kyokushin Budokai France',
    alternateName: 'WKB France',
    url: 'https://karatekyokushin.fr/',
    email: CAMP.email,
    telephone: '+33766222745',
  },
  performer: EXPERTS.map((e) => ({ '@type': 'Person', name: e.name })),
  offers: [
    { name: 'Camp complet (3 jours)', price: '90' },
    { name: 'Une journée', price: '65' },
  ].map((o) => ({
    '@type': 'Offer',
    ...o,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/LimitedAvailability',
    url: `${PAGE_URL}#inscription`,
    validFrom: '2026-09-12',
  })),
};

// --- Page Component ---

export default function CampAutomneKyokushin2026Page() {
  const upcoming = isCampUpcoming();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      {/* Hero Section */}
      <header className="relative flex items-center pt-20 overflow-hidden bg-indigo-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900"></div>
          <div
            className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-32 fill-[#faf9f6]"
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 pb-32 md:pt-20 md:pb-40">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-700/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-red-100 text-xs font-bold uppercase tracking-widest">
                  World Kyokushin Budokai France · {CAMP.edition}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-black text-white leading-[0.95] mb-6 drop-shadow-2xl">
                Camp d&apos;automne <span className="text-red-600">Kyokushin</span>
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-lg md:text-2xl text-indigo-100 font-serif">
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-6 h-6 text-red-500" aria-hidden="true" />
                  {CAMP.dates}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-red-500" aria-hidden="true" />
                  Amiens
                </span>
              </div>

              <p className="text-indigo-200 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
                Trois jours d&apos;entraînement avec les hauts gradés de l&apos;organisation&nbsp;:
                Kancho Pedro Roïz, 9ème Dan et dirigeant de WKB, et Shihan Daniel Sanchez, 6ème Dan,
                vainqueur de l&apos;épreuve des 100 combats.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#inscription"
                  className="px-8 py-4 bg-red-700 text-white font-bold rounded-sm shadow-xl hover:bg-red-800 transition-all flex items-center justify-center gap-2 group"
                >
                  S&apos;inscrire au camp
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={CAMP.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" aria-hidden="true" />
                  Fiche d&apos;information (PDF)
                </a>
              </div>
            </div>

            <div className="mx-auto lg:mx-0 w-full max-w-xs md:max-w-sm">
              <Image
                src={CAMP.poster}
                alt="Affiche du camp d'automne WKB France, 16-18 octobre à Amiens, avec Shihan Sanchez 6ème Dan et Kancho Roïz 9ème Dan"
                width={526}
                height={686}
                priority
                sizes="(max-width: 768px) 320px, 384px"
                className="w-full h-auto rotate-2 border-4 border-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Infos clés */}
      <section aria-label="Informations clés" className="relative z-10 -mt-16 md:-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-slate-200 shadow-xl divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {[
              { icon: <CalendarDays className="w-6 h-6" />, label: 'Dates', value: '16 - 18 octobre 2026' },
              { icon: <MapPin className="w-6 h-6" />, label: 'Lieux', value: 'Onami Dojo & Dojo régional' },
              { icon: <Euro className="w-6 h-6" />, label: 'Tarifs', value: '90 € (3 jours) · 65 € (1 jour)' },
              { icon: <Phone className="w-6 h-6" />, label: 'Contact', value: CAMP.phone },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-4 p-5 md:p-6">
                <div className="w-11 h-11 bg-red-50 text-red-700 flex items-center justify-center rounded-sm flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{item.label}</p>
                  <p className="font-bold text-slate-900 leading-tight">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Présentation & experts */}
      <section className="py-24 relative overflow-hidden">
        <SeigaihaPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Le camp" subtitle="Tradition & harmonisation" japanese="合宿" />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-12 items-start">
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 p-6 md:p-10 shadow-sm space-y-5 text-slate-700 text-base md:text-lg leading-relaxed">
                <p>
                  <strong className="text-indigo-950">WKB France</strong> a à cœur de développer le
                  karaté Kyokushinkai en France avec la fédération internationale{' '}
                  <strong className="text-indigo-950">World Kyokushin Budokai</strong>, en organisant
                  chaque année un stage avec les hauts gradés de l&apos;organisation.
                </p>
                <p>
                  Ce camp a pour mission essentielle la diffusion et l&apos;harmonisation des
                  techniques propres au Kyokushin, à travers les exigences, les valeurs et les
                  objectifs de World Kyokushin Budokai. Il s&apos;adresse aux{' '}
                  <strong>dojos adhérents comme aux non-adhérents</strong>, qui peuvent ainsi
                  découvrir notre univers de travail.
                </p>
                <div className="p-4 bg-indigo-50 border-l-4 border-indigo-900 text-sm md:text-base text-indigo-900">
                  <p>
                    <strong>Organisation&nbsp;:</strong> World Kyokushin Budokai France —{' '}
                    <strong>Senseï Xavier Gadoux</strong>, Branch Chief, et{' '}
                    <strong>Sempai Olivier Leclercq</strong>, Country Representative.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {EXPERTS.map((expert) => (
                  <div key={expert.name} className="bg-white border-t-4 border-t-red-700 border border-slate-200 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-6 h-6 text-red-700 flex-shrink-0" aria-hidden="true" />
                      <p className="text-indigo-900 text-sm font-bold uppercase tracking-widest">{expert.rank}</p>
                    </div>
                    <h3 className="font-serif font-bold text-xl text-slate-900">{expert.name}</h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">{expert.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <figure className="bg-white border border-slate-200 p-1 shadow-sm">
              <Image
                src={CAMP.photo}
                alt="Kancho Pedro Roïz et Senseï Xavier Gadoux en garde, en dogi Kyokushin"
                width={992}
                height={992}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-auto"
              />
              <figcaption className="px-4 py-3 text-sm text-slate-500">
                Kancho Pedro Roïz (9ème Dan) et Senseï Xavier Gadoux, Branch Chief WKB France.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="py-24 bg-indigo-950 text-white relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-[#faf9f6] [clip-path:polygon(0_0,100%_0,100%_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-16">
            <span className="text-red-500 font-medium tracking-widest uppercase text-sm mb-2 block">
              Dates et horaires
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Programme du camp</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {PROGRAMME.map((d) => (
              <div key={d.day} className="border border-white/10 bg-white/5 flex flex-col">
                <div className="bg-red-700 px-6 py-4 font-serif font-bold text-xl">{d.day}</div>
                <div className="p-6 space-y-4 flex-1">
                  {d.sessions.map((s, i) => (
                    <div key={i}>
                      <p className="flex items-center gap-2 text-red-400 font-bold text-sm">
                        <Clock className="w-4 h-4" aria-hidden="true" /> {s.time}
                      </p>
                      <p className="text-white font-medium mt-1">{s.title}</p>
                    </div>
                  ))}
                </div>
                <p className="px-6 py-4 border-t border-white/10 text-indigo-200 text-sm flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    {d.lieu.name}, {d.lieu.street}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lieux */}
      <section id="lieux" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Les lieux" subtitle="Adresses du camp" japanese="道場" />

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-12">
            {[
              { lieu: LIEUX.onami, when: 'Vendredi soir' },
              { lieu: LIEUX.regional, when: 'Samedi et dimanche' },
            ].map(({ lieu, when }) => (
              <div key={lieu.name} className="bg-white border border-slate-200 p-6 md:p-8 hover:shadow-xl transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-950 text-white flex items-center justify-center rounded-full flex-shrink-0">
                    <MapPin className="w-6 h-6 md:w-7 md:h-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">{lieu.name}</h3>
                    <p className="text-red-700 font-medium">{when}</p>
                  </div>
                </div>
                <div className="space-y-1 text-slate-600">
                  <p className="text-sm text-slate-500">{lieu.detail}</p>
                  <p className="font-medium text-slate-900">{lieu.street}</p>
                  <p>{lieu.city}</p>
                </div>
                <a
                  href={lieu.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-red-700 font-bold hover:text-red-800 transition-colors"
                >
                  Itinéraire Google Maps <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hébergement */}
      <section id="hebergement" className="py-24 bg-[#efede8] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Hébergement" subtitle="Où dormir à Amiens" japanese="宿泊" />

          <div className="mt-12 bg-indigo-950 text-white p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="w-14 h-14 bg-red-700 flex items-center justify-center rounded-full flex-shrink-0" aria-hidden="true">
              <Hotel className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">Hôtel officiel du camp</p>
              <h3 className="font-serif font-bold text-2xl md:text-3xl">Néméa Appart&apos;Hôtel Coliseum</h3>
              <p className="text-indigo-200 mt-2">25 rue Frédéric Petit, 80000 Amiens</p>
              <p className="text-indigo-200 mt-4 text-sm md:text-base">
                À proximité de l&apos;Onami Dojo (vendredi soir), à 15/20 minutes à pied du Dojo
                régional (samedi et dimanche).
              </p>
              <a
                href="mailto:amiens@nemea.fr"
                className="inline-flex items-center gap-2 mt-4 font-bold text-white underline hover:text-red-300"
              >
                <Mail className="w-4 h-4" aria-hidden="true" /> amiens@nemea.fr
              </a>
            </div>
          </div>

          <h3 className="font-serif font-bold text-xl text-slate-900 mt-12 mb-6">Autres hébergements</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {HOTELS.map((hotel) => (
              <div key={hotel.name} className="bg-white border border-slate-200 p-6">
                <p className="font-bold text-slate-900 leading-tight mb-3">{hotel.name}</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  {hotel.distances.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-indigo-50 border-l-4 border-indigo-900 text-sm text-indigo-900 flex items-start gap-3">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              Un hébergement de type auberge de jeunesse existe également pour les grands groupes.
              Pour les repas, chacun peut trouver en fonction de son budget, partout en ville&nbsp;:
              des propositions seront faites lors du camp.
            </p>
          </div>
        </div>
      </section>

      {/* Tarifs & inscription */}
      <section id="inscription" className="py-24 relative overflow-hidden">
        <SeigaihaPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Tarifs & Inscription" subtitle="Réservez votre place" japanese="申込" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mt-12 items-start">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border-t-4 border-t-red-600 border border-slate-200 p-6">
                  <p className="font-serif font-bold text-lg text-slate-900">Camp complet</p>
                  <p className="text-red-700 text-sm font-medium mt-1">3 jours</p>
                  <div className="h-[1px] w-12 bg-slate-200 my-4"></div>
                  <p className="text-4xl font-serif font-bold text-slate-900">90&nbsp;€</p>
                  <p className="text-xs text-slate-500 mt-1">par personne</p>
                </div>
                <div className="bg-white border-t-4 border-t-slate-700 border border-slate-200 p-6">
                  <p className="font-serif font-bold text-lg text-slate-900">À la journée</p>
                  <p className="text-red-700 text-sm font-medium mt-1">1 jour</p>
                  <div className="h-[1px] w-12 bg-slate-200 my-4"></div>
                  <p className="text-4xl font-serif font-bold text-slate-900">65&nbsp;€</p>
                  <p className="text-xs text-slate-500 mt-1">par personne</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 flex items-start gap-4">
                <div className="w-11 h-11 bg-red-50 text-red-700 flex items-center justify-center rounded-sm flex-shrink-0" aria-hidden="true">
                  <Euro className="w-5 h-5" />
                </div>
                <div className="text-sm text-slate-600 leading-relaxed space-y-2">
                  <p className="font-bold text-slate-900 text-base">Réservation</p>
                  <p>
                    <strong>Paiement par avance</strong> pour réserver votre place&nbsp;: le nombre de
                    places est limité.
                  </p>
                  <p>
                    Préférez la réservation groupée par dojo et par virement plutôt qu&apos;un
                    paiement individuel.
                  </p>
                  <p>Hébergement, frais annexes et repas non inclus.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 flex items-start gap-4">
                <div className="w-11 h-11 bg-red-50 text-red-700 flex items-center justify-center rounded-sm flex-shrink-0" aria-hidden="true">
                  <Backpack className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">À prévoir</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Boissons et en-cas, protège-tibias et gants, serviette et gel douche…
                  </p>
                </div>
              </div>

              <div className="bg-indigo-950 text-white p-6 space-y-4">
                <p className="font-serif font-bold text-xl">Contact WKB France</p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-500" aria-hidden="true" />
                  <a href={`tel:${CAMP.phoneLink}`} className="font-bold hover:text-red-300">{CAMP.phone}</a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-500" aria-hidden="true" />
                  <a href={`mailto:${CAMP.email}`} className="font-bold hover:text-red-300">{CAMP.email}</a>
                </p>
                <a
                  href={CAMP.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fiche d'information du camp d'automne 2026 (PDF, ouvre dans un nouvel onglet)"
                  className="flex items-center gap-4 p-4 bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Download className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block font-bold">Fiche d&apos;information</span>
                    <span className="block text-sm text-indigo-200">PDF · 6ème Camp d&apos;automne 2026</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-red-700/5 -rotate-2 rounded-2xl hidden md:block"></div>
              <div className="relative bg-white p-6 md:p-10 shadow-2xl border border-slate-100 rounded-sm">
                {upcoming ? (
                  <>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-indigo-950 mb-2">
                      Pré-inscription en ligne
                    </h3>
                    <p className="text-sm text-slate-500 mb-8">
                      Remplissez ce formulaire&nbsp;: WKB France vous recontacte pour confirmer
                      votre place et le règlement.
                    </p>
                    <CampRegistrationForm />
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-indigo-950 mb-2">
                      Le camp 2026 est terminé
                    </h3>
                    <p className="text-slate-600">
                      Merci à tous les participants&nbsp;! Rendez-vous l&apos;année prochaine pour la
                      7ème édition.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
