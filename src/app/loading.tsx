export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-950 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-serif font-bold text-2xl">大</span>
        </div>
        <p className="text-slate-500 text-sm font-medium tracking-widest uppercase">Chargement...</p>
      </div>
    </div>
  );
}
