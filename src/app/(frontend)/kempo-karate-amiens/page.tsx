import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Clock,
  Users,
  Swords,
  Shield,
  Target,
  Dumbbell,
  Award,
  Trophy,
  Medal,
  Star,
} from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Kempo Karaté à Amiens | Cours Adultes, Ados & Enfants | Onami Dojo',
  description:
    "Découvrez le Kempo Karaté à Amiens au Onami Dojo. Art martial japonais complet : frappes, projections, self-défense. Cours pour enfants dès 6 ans, ados et adultes. 2 cours d'essai gratuits.",
  alternates: {
    canonical: 'https://www.onamidojo.fr/kempo-karate-amiens',
  },
  openGraph: {
    title: 'Kempo Karaté à Amiens | Onami Dojo',
    description:
      "Art martial japonais complet : frappes, projections, self-défense. Cours pour enfants dès 6 ans, ados et adultes. 2 cours d'essai gratuits.",
    url: 'https://www.onamidojo.fr/kempo-karate-amiens',
    siteName: 'Onami Dojo',
    locale: 'fr_FR',
    type: 'website',
  },
};

// --- Custom Components (reprenant le design system de la homepage) ---

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

// --- Data ---

const AUDIENCE_CARDS = [
  {
    icon: <Star className="w-8 h-8" />,
    title: 'Enfants (6-13 ans)',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
    schedule: [
      { day: 'Mercredi', time: '16h45 - 18h15', detail: 'Groupe 1 (petits)' },
      { day: 'Mercredi', time: '18h30 - 20h00', detail: 'Groupe 2 (grands & gradés)' },
      { day: 'Dimanche', time: '10h00 - 11h30', detail: 'Enfants & Ados' },
    ],
    description:
      'Développement de la motricité, de la discipline et de la confiance en soi dans un cadre bienveillant et structuré. Les enfants apprennent les bases du Kempo tout en s\'amusant.',
  },
  {
    icon: <Swords className="w-8 h-8" />,
    title: 'Ados (13+ ans)',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    schedule: [
      { day: 'Lundi', time: '19h30 - 21h00', detail: 'Adultes & Ados' },
      { day: 'Jeudi', time: '20h30 - 22h00', detail: 'Adultes & Ados' },
    ],
    description:
      'Canaliser l\'énergie, se dépasser et apprendre la self-défense. Le Kempo offre aux adolescents un cadre exigeant pour développer leur mental et leur condition physique.',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Adultes',
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    schedule: [
      { day: 'Lundi', time: '19h30 - 21h00', detail: 'Adultes & Ados' },
      { day: 'Jeudi', time: '20h30 - 22h00', detail: 'Adultes & Ados' },
    ],
    description:
      'Remise en forme, self-défense et compétition pour ceux qui le souhaitent. Que vous soyez débutant ou confirmé, le Kempo vous permettra de progresser à votre rythme.',
  },
];

const SKILLS = [
  { icon: <Target className="w-5 h-5" />, label: 'Techniques de frappes pieds-poings' },
  { icon: <Swords className="w-5 h-5" />, label: 'Projections et balayages' },
  { icon: <Shield className="w-5 h-5" />, label: 'Self-défense réaliste' },
  { icon: <Swords className="w-5 h-5" />, label: 'Combat libre (Kumite)' },
  { icon: <Star className="w-5 h-5" />, label: 'Katas et formes techniques' },
  { icon: <Dumbbell className="w-5 h-5" />, label: 'Conditionnement physique' },
];

const RESULTS = [
  { icon: <Trophy className="w-6 h-6" />, label: '3ème au Championnat du Monde WKB' },
  { icon: <Medal className="w-6 h-6" />, label: '5x Podium Européen' },
  { icon: <Award className="w-6 h-6" />, label: 'Vice-Champion d\'Europe 2023 & 2024' },
  { icon: <Star className="w-6 h-6" />, label: 'Encadrement par Senseï Olivier Leclercq' },
];

// --- Page Component ---

export default function KempoKarateAmiensPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">

      {/* Hero Section */}
      <header className="relative flex items-center pt-20 pb-16 md:pb-24 overflow-hidden bg-indigo-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950"></div>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-24 fill-[#faf9f6]"
            >
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-700/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-red-100 text-xs font-bold uppercase tracking-widest">
                Art Martial Japonais
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-serif font-black text-white leading-[0.9] mb-4 drop-shadow-2xl">
              KEMPO <br />
              <span className="text-red-600">KARATÉ</span>
            </h1>

            <div className="flex items-center gap-4 md:gap-6 mb-8 flex-wrap">
              <div className="h-[1px] w-16 md:w-20 bg-red-600"></div>
              <p className="text-lg md:text-2xl text-indigo-100 font-light italic font-serif">
                L&apos;art du combat libre japonais à Amiens
              </p>
              <span
                className="text-3xl md:text-4xl text-white/20 font-serif hidden sm:block"
                aria-hidden="true"
              >
                拳法空手
              </span>
            </div>

            <p className="text-indigo-200 text-base md:text-lg max-w-xl leading-relaxed">
              Découvrez un art martial complet au cœur d&apos;Amiens. Frappes, projections,
              self-défense : le Kempo Karaté développe le corps et l&apos;esprit.
            </p>
          </div>
        </div>

        {/* Vertical Text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden="true">
          <p className="[writing-mode:vertical-rl] text-white/10 font-serif text-7xl font-black select-none tracking-tighter">
            KEMPO
          </p>
        </div>
      </header>

      {/* Qu'est-ce que le Kempo Karaté ? */}
      <section className="py-24 relative overflow-hidden">
        <SeigaihaPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Qu'est-ce que le Kempo Karaté ?"
            subtitle="Découvrir la discipline"
            japanese="拳法"
          />

          <div className="max-w-4xl mt-12">
            <div className="bg-white border border-slate-200 p-6 md:p-10 shadow-sm">
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                Le <strong className="text-slate-900">Kempo Karaté</strong> est un système martial
                polyvalent intégrant <strong className="text-slate-900">frappes pieds-poings</strong>,{' '}
                <strong className="text-slate-900">projections</strong>,{' '}
                <strong className="text-slate-900">balayages</strong> et{' '}
                <strong className="text-slate-900">travail au sol</strong>. Issu de la tradition
                martiale japonaise, le Kempo est un art martial complet qui développe à la fois
                l&apos;efficacité en combat réel et les qualités physiques et mentales du pratiquant.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
                À l&apos;<strong className="text-slate-900">Onami Dojo</strong>, situé au{' '}
                <strong className="text-slate-900">24 rue des Cordeliers à Amiens</strong>, nous
                pratiquons un Kempo orienté{' '}
                <strong className="text-slate-900">combat libre (Kumite)</strong>, tout en préservant
                l&apos;esprit martial et le respect des traditions. Chaque cours allie travail
                technique, conditionnement physique et application en combat.
              </p>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                Que vous cherchiez une discipline pour vous défendre, vous remettre en forme ou
                repousser vos limites en compétition, le Kempo Karaté s&apos;adapte à tous les
                objectifs et à tous les niveaux.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui ? */}
      <section className="py-24 bg-[#efede8] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Pour qui ?"
            subtitle="Sections adaptées à chaque âge"
            japanese="対象"
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-16">
            {AUDIENCE_CARDS.map((card) => (
              <div
                key={card.title}
                className={`bg-white border ${card.color} p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div className={`${card.iconColor} mb-4`}>{card.icon}</div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-4">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{card.description}</p>
                <div className="space-y-2">
                  {card.schedule.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-sm"
                    >
                      <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="font-bold">{slot.day}</span>
                      <span className="text-slate-400">|</span>
                      <span>{slot.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que vous apprendrez */}
      <section className="py-24 relative overflow-hidden">
        <SeigaihaPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Ce que vous apprendrez"
            subtitle="Programme technique"
            japanese="技術"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-16">
            {SKILLS.map((skill) => (
              <div
                key={skill.label}
                className="flex items-center gap-4 p-5 md:p-6 bg-white border border-slate-200 hover:border-red-700 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-900 flex items-center justify-center rounded-sm group-hover:bg-red-700 group-hover:text-white transition-colors flex-shrink-0">
                  {skill.icon}
                </div>
                <span className="text-slate-800 font-medium">{skill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos résultats */}
      <section className="py-24 bg-indigo-950 text-white relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-[#faf9f6] [clip-path:polygon(0_0,100%_0,100%_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-16">
            <span className="text-red-500 font-medium tracking-widest uppercase text-sm mb-2 block">
              Palmarès
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Nos Résultats</h2>
            <p className="text-indigo-200 text-base md:text-lg max-w-2xl mx-auto">
              Le Kempo de l&apos;Onami Dojo brille sur la scène nationale et internationale.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {RESULTS.map((result) => (
              <div
                key={result.label}
                className="p-6 md:p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-center group"
              >
                <div className="text-red-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {result.icon}
                </div>
                <p className="font-serif font-bold text-lg">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-indigo-950 mb-6 leading-tight">
              Prêt à découvrir le <br />
              <span className="text-red-700">Kempo Karaté</span> ?
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-4 leading-relaxed">
              Bénéficiez de <strong>2 cours d&apos;essai gratuits</strong> et sans engagement.
              Prévoyez une tenue de sport et de l&apos;eau, nous nous occupons du reste.
            </p>
            <p className="text-slate-500 text-sm mb-10 flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Enfants dès 6 ans, adolescents et adultes
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
                className="px-8 py-4 bg-indigo-950 text-white font-bold rounded-sm hover:bg-indigo-900 transition-all flex items-center justify-center gap-2"
              >
                Voir le planning complet
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
