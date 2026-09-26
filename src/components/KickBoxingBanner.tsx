import Image from 'next/image';
import { CalendarDays, Clock, Euro } from 'lucide-react';

// Entraînement exceptionnel avec Quentin Duval — jeudi 1er octobre 2026, 20h30
const END_DATE = new Date('2026-10-01T22:30:00+02:00');

// Bandeau d'annonce — disparaît automatiquement après l'entraînement
export default function KickBoxingBanner() {
  if (new Date() >= END_DATE) return null;

  return (
    <section aria-labelledby="kick-boxing-banner-title" className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
          <div className="flex-shrink-0 w-36 md:w-44 rotate-[2deg] border-4 border-white shadow-2xl">
            <Image
              src="/images/evenements/quentin-duval-kick-boxing.jpg"
              alt="Quentin Duval, champion d'Europe de kick boxing poids lourd"
              width={285}
              height={380}
              sizes="176px"
              className="w-full h-auto"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <span className="inline-block bg-red-700 text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full mb-3">
              Entraînement exceptionnel
            </span>
            <h2 id="kick-boxing-banner-title" className="text-2xl md:text-4xl font-serif font-bold leading-tight">
              Entraînement avec Quentin Duval
            </h2>
            <p className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-slate-200 font-medium">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-4 h-4" aria-hidden="true" /> Jeudi 1er octobre
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" /> 20h30 au dojo
              </span>
              <span className="flex items-center gap-1.5">
                <Euro className="w-4 h-4" aria-hidden="true" /> 10&nbsp;€ la place
              </span>
            </p>
            <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
              Champion d&apos;Europe de kick boxing chez les poids «&nbsp;lourds&nbsp;», Quentin Duval
              vient partager son expérience le temps d&apos;un entraînement au dojo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
