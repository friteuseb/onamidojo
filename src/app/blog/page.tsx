import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { articles, categories } from '@/data/articles';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Conseils Karaté, Kempo & Kyokushin',
  description:
    'Articles et conseils sur le karaté Kempo et Kyokushin : techniques, entraînement, compétition, enfants et bien-être. Par les instructeurs de l\'Onami Dojo Amiens.',
  alternates: {
    canonical: 'https://onamidojo.fr/blog',
  },
  openGraph: {
    title: 'Blog | Onami Dojo - Karaté Kempo & Kyokushin',
    description:
      'Articles et conseils sur le karaté Kempo et Kyokushin : techniques, entraînement, compétition et bien-être.',
    url: 'https://onamidojo.fr/blog',
  },
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  return <BlogContent searchParamsPromise={searchParams} />;
}

async function BlogContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ categorie?: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const activeCategory = searchParams.categorie || 'all';
  const filtered =
    activeCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="text-red-700 font-medium tracking-widest uppercase text-sm mb-2 block">
            Notre Blog
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Articles & Conseils
          </h1>
          <div className="w-24 h-1 bg-red-700 mb-6"></div>
          <p className="text-slate-600 max-w-2xl text-lg">
            Techniques, entraînement, philosophie et conseils pratiques pour progresser en
            Kempo Karaté et Kyokushin.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id === 'all' ? '/blog' : `/blog?categorie=${cat.id}`}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                activeCategory === cat.id
                  ? 'bg-indigo-950 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-950 hover:text-indigo-950'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 to-indigo-800 flex items-center justify-center">
                    <span className="text-white/20 font-serif text-6xl font-black select-none">
                      大波
                    </span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full ${
                      article.category === 'kyokushin'
                        ? 'bg-slate-800 text-white'
                        : article.category === 'kempo'
                          ? 'bg-red-700 text-white'
                          : article.category === 'enfants'
                            ? 'bg-purple-700 text-white'
                            : article.category === 'competition'
                              ? 'bg-orange-600 text-white'
                              : 'bg-indigo-900 text-white'
                    }`}
                  >
                    {article.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h2 className="text-lg font-serif font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {article.description}
                </p>
                <span className="text-red-700 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Lire l&apos;article
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">
              Aucun article dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
