import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, ChevronRight, MapPin } from 'lucide-react';
import { CAMP, isCampUpcoming } from '@/data/camp-automne-2026';

// Bandeau promotionnel du camp d'automne — disparaît automatiquement après l'événement
export default function CampAutomneBanner() {
  if (!isCampUpcoming()) return null;

  return (
    <section aria-labelledby="camp-automne-banner-title" className="bg-indigo-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
          <Link
            href={CAMP.path}
            className="flex-shrink-0 block w-36 md:w-44 rotate-[-2deg] hover:rotate-0 transition-transform border-4 border-white shadow-2xl"
          >
            <Image
              src={CAMP.poster}
              alt="Affiche du camp d'automne WKB France avec Shihan Sanchez et Kancho Roïz"
              width={526}
              height={686}
              sizes="176px"
              className="w-full h-auto"
            />
          </Link>
          <div className="flex-1 text-center sm:text-left">
            <span className="inline-block bg-red-700 text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full mb-3">
              Stage Kyokushin · {CAMP.edition}
            </span>
            <h2 id="camp-automne-banner-title" className="text-2xl md:text-4xl font-serif font-bold leading-tight">
              {CAMP.title}
            </h2>
            <p className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-indigo-100 font-medium">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" aria-hidden="true" /> {CAMP.dates}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" aria-hidden="true" /> Amiens
              </span>
            </p>
            <p className="text-indigo-200 text-sm md:text-base mt-3 max-w-2xl">
              Avec Kancho Pedro Roïz (9ème Dan) et Shihan Daniel Sanchez (6ème Dan). Ouvert aux
              dojos adhérents WKB comme aux non-adhérents — 90&nbsp;€ les 3&nbsp;jours, 65&nbsp;€ la
              journée, places limitées.
            </p>
          </div>
          <Link
            href={`${CAMP.path}#inscription`}
            className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-3 rounded-sm font-bold hover:bg-red-800 transition-colors shadow-xl"
          >
            Infos &amp; inscription <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
