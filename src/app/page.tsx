import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  Award,
  Flame,
  Phone,
  Mail,
  Download
} from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { articles } from '@/data/articles';

// --- Custom Components ---

const SeigaihaPattern = () => (
  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'%3E%3Cpath d='M0 40c0-11.046 8.954-20 20-20s20 8.954 20 20M0 30c0-5.523 4.477-10 10-10s10 4.477 10 10m20 10c0-11.046 8.954-20 20-20s20 8.954 20 20m-20-10c0-5.523 4.477-10 10-10s10 4.477 10 10' fill='none' stroke='%231e3a8a' stroke-width='1.5'/%3E%3C/svg%3E")` }} />
);

const HankoSeal = ({ text }: { text: string }) => (
  <div className="inline-flex items-center justify-center w-10 h-10 border-2 border-red-700 bg-red-50 rotate-[-5deg] shadow-sm">
    <span className="text-red-700 font-serif font-bold text-[10px] leading-none text-center">
      {text.split('').map((char, i) => <span key={i} className="block">{char}</span>)}
    </span>
  </div>
);

const SectionHeading = ({ title, subtitle, japanese }: { title: string, subtitle: string, japanese: string }) => (
  <div className="relative mb-12 text-center md:text-left">
    <span className="text-red-700 font-medium tracking-widest uppercase text-sm mb-2 block">{subtitle}</span>
    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 flex items-baseline gap-4 justify-center md:justify-start flex-wrap">
      {title}
      <span className="text-slate-300 font-serif text-4xl md:text-5xl opacity-50 select-none hidden md:block">{japanese}</span>
    </h2>
    <div className="w-24 h-1 bg-red-700 mt-4 mx-auto md:mx-0"></div>
  </div>
);

// --- Schedule Data ---
const scheduleData = [
  {
    day: 'Lundi',
    courses: [
      { time: '19h30 - 21h00', name: 'Kempo Adultes & Ados', location: '24 rue des Cordeliers', color: 'red' }
    ]
  },
  {
    day: 'Mardi',
    courses: [
      { time: '19h00 - 20h30', name: 'Kyokushin Adultes & Ados', location: '24 rue des Cordeliers', color: 'slate' }
    ]
  },
  {
    day: 'Mercredi',
    courses: [
      { time: '16h45 - 18h15', name: 'Kempo Enfants - Groupe 1 (petits)', location: '24 rue des Cordeliers', color: 'purple' },
      { time: '18h30 - 20h00', name: 'Kempo Enfants - Groupe 2 (grands & gradés)', location: '24 rue des Cordeliers', color: 'blue' }
    ]
  },
  {
    day: 'Jeudi',
    courses: [
      { time: '20h30 - 22h00', name: 'Kempo Adultes & Ados', location: '24 rue des Cordeliers', color: 'red' }
    ]
  },
  {
    day: 'Vendredi',
    courses: [
      { time: '19h00 - 20h30', name: 'Kyokushin Adultes & Ados', location: '24 rue des Cordeliers', color: 'slate' }
    ]
  },
  {
    day: 'Samedi',
    courses: [
      { time: '19h00 - 20h15', name: 'Prépa Physique Kumite', location: '24 rue des Cordeliers', color: 'orange' }
    ]
  },
  {
    day: 'Dimanche',
    courses: [
      { time: '10h00 - 11h30', name: 'Kempo Enfants & Ados', location: '24 rue des Cordeliers', color: 'indigo' }
    ]
  }
];

// --- Instructors Data ---
const instructors = [
  {
    name: "Senseï Olivier Leclerc",
    role: "Directeur Technique - Kempo",
    rank: "Ceinture Noire",
    achievements: ["3ème au Championnat du Monde WKB", "5x Podium Européen", "Vice-Champion d'Europe 2023 & 2024"],
    image: "/images/instructors/olivier.jpg",
  },
  {
    name: "Senseï Xavier Gadoux",
    role: "Responsable Kyokushin",
    rank: "3ème Dan",
    achievements: ["Champion de France", "WKB Branch Chief", "World Kyokushin Budokai France"],
    image: "/images/instructors/xavier.jpg",
  },
  {
    name: "Marc Yeu",
    role: "Instructeur Kempo",
    rank: "2ème Dan",
    achievements: ["Instructeur certifié", "Spécialiste Kumite"],
    image: "/images/instructors/marc.jpg",
  },
  {
    name: "Anibal Barreira",
    role: "Instructeur Kempo",
    rank: "1er Dan",
    achievements: ["Instructeur certifié", "Formation continue"],
    image: "/images/instructors/anibal.jpg",
  },
];

// --- Main Page Component ---
export default function OnamiDojoHome() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans overflow-x-hidden">

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-indigo-950">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/great-wave-kanagawa.jpg"
            alt="La Grande Vague de Kanagawa"
            fill
            className="object-cover opacity-30 mix-blend-overlay"
            priority
          />
          {/* Wave SVG Overlay */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-48 fill-[#faf9f6]">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-700/20 backdrop-blur-sm border border-red-500/30 rounded-full mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-red-100 text-xs font-bold uppercase tracking-widest">Inscriptions ouvertes 2025-2026</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-serif font-black text-white leading-[0.9] mb-4 drop-shadow-2xl">
              ONAMI <br />
              <span className="text-red-600">DOJO</span>
            </h1>

            <div className="flex items-center gap-4 md:gap-6 mb-8 flex-wrap">
              <div className="h-[1px] w-16 md:w-20 bg-red-600"></div>
              <p className="text-lg md:text-2xl text-indigo-100 font-light italic font-serif">
                L&apos;Art du Karaté Traditionnel à Amiens
              </p>
              <span className="text-3xl md:text-4xl text-white/20 font-serif hidden sm:block">大波道場</span>
            </div>

            <p className="text-indigo-200 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
              Découvrez la puissance du <strong className="text-white">Kyokushin</strong> et la fluidité du <strong className="text-white">Kempo</strong> dans un environnement dédié à l&apos;excellence, au respect et au dépassement de soi.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#disciplines" className="px-8 py-4 bg-red-700 text-white font-bold rounded-sm shadow-xl hover:bg-red-800 transition-all flex items-center justify-center gap-2 group">
                Découvrir nos cours
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#contact" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-sm hover:bg-white/20 transition-all flex items-center justify-center">
                Essai gratuit
              </Link>
            </div>
          </div>
        </div>

        {/* Vertical Text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <p className="[writing-mode:vertical-rl] text-white/10 font-serif text-8xl font-black select-none tracking-tighter">
            SPIRIT & DISCIPLINE
          </p>
        </div>
      </header>

      {/* Introduction Styles Section */}
      <section id="disciplines" className="py-24 relative overflow-hidden">
        <SeigaihaPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Nos Disciplines"
            subtitle="Choisissez votre voie"
            japanese="武道"
          />

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-16">
            {/* Style 1: Kempo */}
            <div className="group relative bg-white border border-slate-200 p-1 rounded-sm shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image
                  src="/images/kempo-training.jpg"
                  alt="Entraînement Kempo Karaté"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="bg-red-700 text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full mb-2 inline-block">Combat Libre Japonais</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white uppercase tracking-tight">Kempo Karaté</h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Une approche moderne et complète intégrant frappes, projections et travail au sol. Le Kempo à l&apos;Onami Dojo privilégie l&apos;efficacité en combat réel tout en conservant l&apos;esprit martial japonais.
                </p>
                <ul className="space-y-3 mb-6">
                  {['Système polyvalent pieds-poings', 'Self-défense réaliste', 'Combat libre (Kumite)', 'Technique et fluidité'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                      <div className="w-1.5 h-1.5 bg-red-700 rounded-full flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Enfants, Ados, Adultes</span>
                </div>
              </div>
            </div>

            {/* Style 2: Kyokushin */}
            <div className="group relative bg-white border border-slate-200 p-1 rounded-sm shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden relative">
                <Image
                  src="/images/kyokushin-training.jpg"
                  alt="Entraînement Kyokushin Karaté"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="bg-slate-800 text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full mb-2 inline-block">Full Contact Traditionnel</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white uppercase tracking-tight">Kyokushinkai</h3>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  L&apos;école de l&apos;ultime vérité. Un style à frappes réelles, réputé pour sa rigueur physique. Forgez un corps de fer et un mental d&apos;acier à travers la tradition de Sosai Mas Oyama.
                </p>
                <ul className="space-y-3 mb-6">
                  {['Conditionnement physique intensif', 'Technique traditionnelle (Kihon)', 'Katas et Bunkai', 'Kumite plein contact'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                      <div className="w-1.5 h-1.5 bg-indigo-900 rounded-full flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Ados & Adultes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Features */}
      <section className="py-24 bg-indigo-950 text-white relative">
        <div className="absolute top-0 left-0 w-full h-24 bg-[#faf9f6] [clip-path:polygon(0_0,100%_0,100%_100%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Pourquoi choisir Onami Dojo ?</h2>
            <p className="text-indigo-200 text-base md:text-lg max-w-2xl mx-auto">Plus qu&apos;un simple club de sport, un centre de formation humaine et martiale au cœur d&apos;Amiens.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Award className="w-8 h-8" />, title: "Champions Internationaux", desc: "Encadrement par des experts titrés : podiums européens et championnats nationaux." },
              { icon: <Users className="w-8 h-8" />, title: "Tous les Publics", desc: "Sections dédiées aux enfants dès 6 ans, adolescents et adultes de tous niveaux." },
              { icon: <Flame className="w-8 h-8" />, title: "2 Cours d'Essai Gratuits", desc: "Venez tester gratuitement nos deux disciplines sans aucun engagement." },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Équipement Disponible", desc: "Matériel de frappe et protections de qualité disponibles sur place et à la vente." },
              { icon: <MapPin className="w-8 h-8" />, title: "Dojo en Centre-Ville", desc: "Notre dojo au 24 rue des Cordeliers à Amiens, facilement accessible pour tous." },
              { icon: <Users className="w-8 h-8" />, title: "Esprit de Famille", desc: "Une ambiance bienveillante où l'entraide et le respect sont les règles d'or." },
            ].map((feature, idx) => (
              <div key={idx} className="p-6 md:p-8 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group">
                <div className="text-red-500 mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h4 className="text-lg md:text-xl font-serif font-bold mb-3">{feature.title}</h4>
                <p className="text-indigo-200 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section id="instructeurs" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Nos Enseignants"
            subtitle="L'expertise au service de votre progression"
            japanese="先生"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16">
            {instructors.map((inst, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center bg-white p-6 border border-slate-200 hover:shadow-xl transition-all duration-300">
                <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6 rounded-full border-2 border-slate-200 group-hover:border-red-700 transition-colors duration-500 overflow-hidden bg-slate-100">
                  <Image
                    src={inst.image}
                    alt={inst.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute -bottom-1 -right-1 z-10">
                    <HankoSeal text="大波" />
                  </div>
                </div>
                <h4 className="text-lg md:text-xl font-serif font-bold text-slate-900">{inst.name}</h4>
                <p className="text-red-700 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 mb-1">{inst.role}</p>
                <p className="text-indigo-900 text-sm font-medium mb-3">{inst.rank}</p>
                <div className="h-[1px] w-12 bg-slate-200 mb-3"></div>
                <ul className="text-slate-500 text-xs space-y-1">
                  {inst.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="horaires" className="py-24 bg-[#efede8] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Planning des Cours"
            subtitle="Saison 2025-2026"
            japanese="時間"
          />

          <div className="bg-white p-4 md:p-10 shadow-xl border border-slate-200 relative overflow-hidden mt-12">
            {/* Mobile: Stack view */}
            <div className="block lg:hidden space-y-4">
              {scheduleData.map((day, idx) => (
                <div key={idx} className="border border-slate-200 rounded-sm overflow-hidden">
                  <div className="bg-indigo-950 text-white py-3 px-4 font-serif font-bold">
                    {day.day}
                  </div>
                  <div className="p-4 space-y-3">
                    {day.courses.map((course, i) => (
                      <div key={i} className={`p-3 rounded-sm ${
                        course.color === 'red' ? 'bg-red-50 border-l-4 border-red-600' :
                        course.color === 'slate' ? 'bg-slate-100 border-l-4 border-slate-700' :
                        course.color === 'purple' ? 'bg-purple-50 border-l-4 border-purple-600' :
                        course.color === 'blue' ? 'bg-blue-50 border-l-4 border-blue-600' :
                        course.color === 'orange' ? 'bg-orange-50 border-l-4 border-orange-600' :
                        'bg-indigo-50 border-l-4 border-indigo-600'
                      }`}>
                        <p className="text-xs font-bold text-slate-500 mb-1">{course.time}</p>
                        <p className="font-bold text-slate-800 text-sm leading-tight">{course.name}</p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {course.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Grid view */}
            <div className="hidden lg:grid grid-cols-7 gap-4">
              {scheduleData.map((day, idx) => (
                <div key={idx} className="border border-slate-200 rounded-sm overflow-hidden">
                  <div className="bg-indigo-950 text-white py-3 px-4 font-serif font-bold text-center">
                    {day.day}
                  </div>
                  <div className="p-4 space-y-4 min-h-[180px]">
                    {day.courses.map((course, i) => (
                      <div key={i} className={`p-3 rounded-sm ${
                        course.color === 'red' ? 'bg-red-50 border-l-4 border-red-600' :
                        course.color === 'slate' ? 'bg-slate-100 border-l-4 border-slate-700' :
                        course.color === 'purple' ? 'bg-purple-50 border-l-4 border-purple-600' :
                        course.color === 'blue' ? 'bg-blue-50 border-l-4 border-blue-600' :
                        course.color === 'orange' ? 'bg-orange-50 border-l-4 border-orange-600' :
                        'bg-indigo-50 border-l-4 border-indigo-600'
                      }`}>
                        <p className="text-xs font-bold text-slate-500 mb-1">{course.time}</p>
                        <p className="font-bold text-slate-800 text-sm leading-tight">{course.name}</p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {course.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-indigo-50 border-l-4 border-indigo-900 text-sm text-indigo-900 flex items-start gap-3">
              <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Note :</strong> Les cours du samedi sont sur autorisation selon l&apos;assiduité et le niveau.
                Reprise des cours : <strong>16 septembre 2025</strong>.
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: "Licence FFK", desc: "Demande de licence 2025/2026", file: "/documents/licence-ffk-2025-2026.pdf" },
              { title: "Inscription Onami", desc: "Formulaire d'inscription club", file: "/documents/inscription-onami-2025-2026.pdf" },
              { title: "Équipements", desc: "Catalogue protections & dogis", file: "/documents/equipements-protection-onami.pdf" },
              { title: "Broderies", desc: "Personnalisations & broderies", file: "/documents/personnalisations-broderies-onami.pdf" },
            ].map((doc, idx) => (
              <a
                key={idx}
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white border border-slate-200 hover:border-red-700 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-red-50 text-red-700 flex items-center justify-center rounded-sm group-hover:bg-red-700 group-hover:text-white transition-colors flex-shrink-0">
                  <Download className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 truncate">{doc.title}</p>
                  <p className="text-sm text-slate-500 truncate">{doc.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Dojo Section */}
      <section id="dojos" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Notre Dojo"
            subtitle="Lieu d'entraînement"
            japanese="道場"
          />

          <div className="max-w-2xl mx-auto md:mx-0 mt-12">
            <div className="bg-white border border-slate-200 p-6 md:p-8 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-950 text-white flex items-center justify-center rounded-full flex-shrink-0">
                  <MapPin className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">Dojo Onami</h3>
                  <p className="text-red-700 font-medium">Tous les cours</p>
                </div>
              </div>
              <div className="space-y-2 text-slate-600 text-sm md:text-base">
                <p><strong>Adresse :</strong> 24 rue des Cordeliers</p>
                <p><strong>Code postal :</strong> 80000 Amiens</p>
                <p><strong>Téléphone :</strong> <a href="tel:0766222745" className="text-red-700 hover:underline">07 66 22 27 45</a></p>
                <p><strong>Email :</strong> <a href="mailto:contact@onamidojo.fr" className="text-red-700 hover:underline">contact@onamidojo.fr</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-[#efede8] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Nos Articles"
            subtitle="Conseils & Techniques"
            japanese="記事"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
            {articles.filter(a => a.image).slice(0, 6).map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full ${
                      article.category === 'kyokushin' ? 'bg-slate-800 text-white' :
                      article.category === 'kempo' ? 'bg-red-700 text-white' :
                      article.category === 'enfants' ? 'bg-purple-700 text-white' :
                      article.category === 'competition' ? 'bg-orange-600 text-white' :
                      'bg-indigo-900 text-white'
                    }`}>
                      {article.categoryLabel}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-3">
                    {article.description}
                  </p>
                  <span className="text-red-700 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lire la suite
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-950 text-white font-bold rounded-sm hover:bg-red-700 transition-all shadow-lg"
            >
              Voir tous les articles
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA / Contact */}
      <section id="contact" className="py-24 relative overflow-hidden bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-indigo-950 mb-6 leading-tight">
                Commencez votre <br />
                <span className="text-red-700">parcours martial</span> dès aujourd&apos;hui.
              </h2>
              <p className="text-slate-600 text-base md:text-lg mb-10 leading-relaxed">
                Le karaté est une quête de vie. Que vous cherchiez la forme physique, la self-défense ou une discipline mentale, l&apos;Onami Dojo vous accompagne à chaque étape.
              </p>

              <div className="p-6 bg-indigo-50 border border-indigo-100 mb-8">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-600" />
                  2 cours d&apos;essai gratuits !
                </h4>
                <p className="text-indigo-700 text-sm">
                  Venez découvrir nos disciplines sans engagement. Prévoyez une tenue de sport et de l&apos;eau.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Téléphone</h5>
                    <p className="text-slate-600"><a href="tel:0766222745" className="hover:text-red-700">07 66 22 27 45</a></p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Email</h5>
                    <p className="text-slate-600"><a href="mailto:contact@onamidojo.fr" className="hover:text-red-700">contact@onamidojo.fr</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-red-700/5 -rotate-2 rounded-2xl hidden md:block"></div>
              <div className="relative bg-white p-6 md:p-10 shadow-2xl border border-slate-100 rounded-sm">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-indigo-950 mb-8">Réserver un cours d&apos;essai</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
