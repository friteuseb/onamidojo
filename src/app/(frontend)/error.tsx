'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
      <div className="text-center px-4">
        <p className="text-red-700 font-bold tracking-widest uppercase text-sm mb-4">Erreur</p>
        <h1 className="text-5xl md:text-7xl font-serif font-black text-indigo-950 mb-4">
          問<span className="text-red-700">題</span>
        </h1>
        <p className="text-xl font-serif text-slate-700 mb-2">Une erreur est survenue</p>
        <p className="text-slate-500 mb-10 max-w-md mx-auto">
          Nous nous excusons pour la gêne occasionnée. Veuillez réessayer.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-indigo-950 text-white px-8 py-4 font-bold rounded-sm shadow-lg hover:bg-red-700 transition-all cursor-pointer"
        >
          Réessayer
        </button>
      </div>
    </main>
  );
}
