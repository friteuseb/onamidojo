import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Clock,
  Users,
  Award,
  Flame,
  Shield,
  Swords,
  Target,
  Brain,
  BookOpen,
  ExternalLink,
  Youtube,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Karaté Kyokushinkai à Amiens | Full Contact Traditionnel | Onami Dojo',
  description:
    "Pratiquez le Karaté Kyokushinkai à Amiens au Onami Dojo. L'école de l'ultime vérité : karaté full contact, conditionnement physique, mental d'acier. Ados et adultes. 2 cours d'essai gratuits.",
  alternates: {
    canonical: 'https://www.onamidojo.fr/kyokushin-karate-amiens',
  },
  openGraph: {
    title: 'Karaté Kyokushinkai à Amiens | Full Contact Traditionnel | Onami Dojo',
    description:
      "Pratiquez le Karaté Kyokushinkai à Amiens au Onami Dojo. L'école de l'ultime vérité : karaté full contact, conditionnement physique, mental d'acier.",
    url: 'https://www.onamidojo.fr/kyokushin-karate-amiens',
    siteName: 'Onami Dojo',
    locale: 'fr_FR',
    type: 'website',
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

const CURRICULUM = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Kihon',
    description: 'Techniques fondamentales : coups de poing, coups de pied, blocages et déplacements.',
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Kata',
    description: 'Formes traditionnelles codifiées transmettant l\'essence du style Kyokushin.',
  },
  {
    icon: <Swords className="w-6 h-6" />,
    title: 'Kumite',
    description: 'Combat full contact : affrontements à frappes réelles, le coeur du Karaté Kyokushinkai.',
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: 'Tanren',
    description: 'Conditionnement physique intensif : renforcement du corps et de la résistance.',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Bunkai',
    description: 'Applications martiales des katas : comprendre et utiliser chaque mouvement.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Philosophie du Budō',
    description: 'Esprit martial, respect du Bushido, discipline mentale et dépassement de soi.',
  },
];

// --- Page Component ---

export default function KyokushinKarateAmiensPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative flex items-center pt-20 overflow-hidden bg-indigo-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900"></div>
          {/* Wave SVG Overlay */}
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-700/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-red-100 text-xs font-bold uppercase tracking-widest">
                Full Contact Traditionnel
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-serif font-black text-white leading-[0.9] mb-4 drop-shadow-2xl">
              KYOKUSHINKAI
            </h1>

            <div className="flex items-center gap-4 md:gap-6 mb-8 flex-wrap">
              <div className="h-[1px] w-16 md:w-20 bg-red-600"></div>
              <p className="text-lg md:text-2xl text-indigo-100 font-light italic font-serif">
                L&apos;école de l&apos;ultime vérité à Amiens
              </p>
              <span
                className="text-3xl md:text-4xl text-white/20 font-serif hidden sm:block"
                aria-hidden="true"
              >
                極真会
              </span>
            </div>

            <p className="text-indigo-200 text-base md:text-lg max-w-xl leading-relaxed">
              Forgez un corps de fer et un mental d&apos;acier à travers la tradition de Sosai Mas
              Oyama. Rejoignez l&apos;Onami Dojo, affilié World Kyokushin Budokai.
            </p>
          </div>
        </div>

        {/* Vertical Text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden="true">
          <p className="[writing-mode:vertical-rl] text-white/10 font-serif text-8xl font-black select-none tracking-tighter">
            極真空手
          </p>
        </div>
      </header>

      {/* Qu'est-ce que le Kyokushin ? */}
      <section className="py-24 relative overflow-hidden">
        <SeigaihaPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Qu'est-ce que le Karaté Kyokushinkai ?"
            subtitle="L'ultime vérité"
            japanese="極真"
          />

          <div className="max-w-4xl mt-12">
            <div className="bg-white border border-slate-200 p-6 md:p-10 shadow-sm">
              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
                Fondé par <strong className="text-indigo-950">Sosai Masutatsu Oyama</strong>, le
                Karaté Kyokushinkai (<span className="font-serif">極真</span>) signifie{' '}
                <strong className="text-red-700">&laquo;&nbsp;l&apos;ultime vérité&nbsp;&raquo;</strong>.
                C&apos;est un style de karaté réputé pour son approche{' '}
                <strong>full contact</strong> : les combats se pratiquent à frappes réelles, sans
                protection aux poings. Cette rigueur forge des pratiquants au physique et au mental
                exceptionnels.
              </p>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-6">
                Contrairement à de nombreux styles de karaté, le Karaté Kyokushinkai met l&apos;accent sur le
                combat réel et le conditionnement du corps. Chaque entraînement est une épreuve qui
                repousse vos limites, tout en cultivant l&apos;humilité et le respect du partenaire.
              </p>
              <div className="p-4 bg-indigo-50 border-l-4 border-indigo-900 text-sm md:text-base text-indigo-900">
                <p>
                  À l&apos;Onami Dojo, nous suivons la lignée{' '}
                  <strong>World Kyokushin Budokai (WKB)</strong>, sous la direction de{' '}
                  <strong>Senseï Xavier Gadoux</strong>, Branch Chief WKB France. Notre pratique
                  reste fidèle aux enseignements originels tout en s&apos;adaptant aux exigences
                  modernes de la compétition et de la formation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui ? */}
      <section className="py-24 bg-[#efede8] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Pour qui ?" subtitle="Trouvez votre créneau" japanese="対象" />

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-12">
            {/* Enfants */}
            <div className="bg-white border border-indigo-200 p-6 md:p-8 hover:shadow-xl transition-all duration-300 md:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-500 text-white flex items-center justify-center rounded-full flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">
                      Enfants
                    </h3>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-widest rounded-sm">
                      Dès septembre 2026
                    </span>
                  </div>
                  <p className="text-indigo-600 font-medium text-sm">À partir de 5 ans</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Le Karaté Kyokushinkai pour les enfants dès 5 ans : une discipline qui développe
                la concentration, la motricité, la confiance en soi et le respect des autres.
                Des cours adaptés à leur âge, dans une ambiance bienveillante et structurée.
              </p>
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3 text-gray-400 text-sm opacity-60">
                  <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>
                    <strong>Mercredi</strong> 15h00 - 16h30 <span className="text-xs">(dès septembre 2026)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Ados */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-indigo-950 text-white flex items-center justify-center rounded-full flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">
                    Adolescents
                  </h3>
                  <p className="text-red-700 font-medium text-sm">À partir de 13 ans</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Le Karaté Kyokushinkai est une école de vie pour les adolescents. Développez force mentale,
                rigueur, confiance en soi et respect du Bushido. L&apos;entraînement forge le
                caractère et enseigne la persévérance face à l&apos;adversité.
              </p>
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <Clock className="w-4 h-4 text-indigo-900 flex-shrink-0" />
                  <span>
                    <strong>Mardi</strong> 19h00 - 20h30
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <Clock className="w-4 h-4 text-indigo-900 flex-shrink-0" />
                  <span>
                    <strong>Vendredi</strong> 19h00 - 20h30
                  </span>
                </div>
              </div>
            </div>

            {/* Adultes */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-red-700 text-white flex items-center justify-center rounded-full flex-shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">
                    Adultes
                  </h3>
                  <p className="text-red-700 font-medium text-sm">
                    Du débutant au compétiteur confirmé
                  </p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Que vous débutiez les arts martiaux ou que vous soyez un compétiteur aguerri,
                l&apos;Onami Dojo vous accueille. Progressez à votre rythme dans un cadre exigeant
                et bienveillant, encadré par des champions nationaux et internationaux.
              </p>
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <Clock className="w-4 h-4 text-indigo-900 flex-shrink-0" />
                  <span>
                    <strong>Mardi</strong> 19h00 - 20h30
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <Clock className="w-4 h-4 text-indigo-900 flex-shrink-0" />
                  <span>
                    <strong>Vendredi</strong> 19h00 - 20h30
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que vous apprendrez */}
      <section className="py-24 bg-indigo-950 text-white relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-[#efede8] [clip-path:polygon(0_0,100%_0,100%_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-16">
            <span className="text-red-500 font-medium tracking-widest uppercase text-sm mb-2 block">
              Programme d&apos;entraînement
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Ce que vous apprendrez
            </h2>
            <p className="text-indigo-200 text-base md:text-lg max-w-2xl mx-auto">
              Un programme complet alliant tradition martiale et préparation physique d&apos;élite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {CURRICULUM.map((item, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-serif font-bold mb-3">{item.title}</h3>
                <p className="text-indigo-200 leading-relaxed text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre affiliation */}
      <section className="py-24 relative overflow-hidden">
        <SeigaihaPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Notre Affiliation"
            subtitle="World Kyokushin Budokai"
            japanese="連盟"
          />

          <div className="max-w-3xl mt-12">
            <div className="bg-white border border-slate-200 p-6 md:p-10 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-indigo-950 text-white flex items-center justify-center rounded-full flex-shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">
                    WKB France
                  </h3>
                  <p className="text-red-700 font-medium">World Kyokushin Budokai</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  L&apos;Onami Dojo est affilié à la{' '}
                  <strong className="text-indigo-950">World Kyokushin Budokai (WKB)</strong>, une
                  organisation internationale qui perpétue l&apos;héritage de Sosai Mas Oyama à
                  travers le monde.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 py-4">
                  <div className="p-4 bg-indigo-50 border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-1">
                      Branch Chief WKB France
                    </p>
                    <p className="text-slate-900 font-serif font-bold text-lg">
                      Senseï Xavier Gadoux
                    </p>
                    <p className="text-indigo-700 text-sm font-medium">3ème Dan Karaté Kyokushinkai</p>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-100">
                    <p className="text-xs font-bold text-red-900 uppercase tracking-widest mb-1">
                      Palmarès
                    </p>
                    <p className="text-slate-900 font-serif font-bold text-lg">
                      Champion de France
                    </p>
                    <p className="text-red-700 text-sm font-medium">Karaté Kyokushinkai</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href="https://karatekyokushin.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-700 font-bold hover:text-red-800 transition-colors"
                  >
                    Visiter karatekyokushin.fr
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com/@xavier.gdx.wkbfrance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-700 font-bold hover:text-red-800 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                    Chaîne YouTube WKB France
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-indigo-950 text-white relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-[#faf9f6] [clip-path:polygon(0_0,100%_0,100%_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Prêt à relever le défi&nbsp;?
          </h2>
          <p className="text-indigo-200 text-base md:text-lg max-w-2xl mx-auto mb-4">
            Rejoignez l&apos;Onami Dojo et découvrez le Karaté Kyokushinkai à Amiens. Deux cours
            d&apos;essai gratuits, sans engagement.
          </p>
          <p className="text-indigo-300 text-sm mb-10">
            Prévoyez une tenue de sport et de l&apos;eau. Nous fournissons le reste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="px-8 py-4 bg-red-700 text-white font-bold rounded-sm shadow-xl hover:bg-red-800 transition-all flex items-center justify-center gap-2 group"
            >
              Réserver un cours d&apos;essai gratuit
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/#horaires"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-sm hover:bg-white/20 transition-all flex items-center justify-center"
            >
              Voir le planning complet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
