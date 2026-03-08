import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-[#faf9f6] pt-20">
        <div className="text-center px-4">
          <p className="text-red-700 font-bold tracking-widest uppercase text-sm mb-4">Erreur 404</p>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-indigo-950 mb-4">
            道<span className="text-red-700">迷</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif text-slate-700 mb-2">Page introuvable</p>
          <p className="text-slate-500 mb-10 max-w-md mx-auto">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            href="/"
            className="inline-block bg-indigo-950 text-white px-8 py-4 font-bold rounded-sm shadow-lg hover:bg-red-700 transition-all"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
