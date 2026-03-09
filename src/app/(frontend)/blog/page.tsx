import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getCategories } from '@/lib/payload-helpers';
import { ChevronRight } from 'lucide-react';

export const revalidate = 3600; // ISR : revalider toutes les heures

export const metadata: Metadata = {
  title: 'Blog | Conseils Karaté, Kempo & Kyokushin',
  description:
    'Articles et conseils sur le karaté Kempo et Kyokushin : techniques, entraînement, compétition, enfants et bien-être. Par les instructeurs de l\'Onami Dojo Amiens.',
  alternates: {
    canonical: 'https://www.onamidojo.fr/blog',
  },
  openGraph: {
    title: 'Blog | Onami Dojo - Karaté Kempo & Kyokushin',
    description:
      'Articles et conseils sur le karaté Kempo et Kyokushin : techniques, entraînement, compétition et bien-être.',
    url: 'https://www.onamidojo.fr/blog',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'bg-slate-800': 'bg-slate-800 text-white',
  'bg-red-700': 'bg-red-700 text-white',
  'bg-purple-700': 'bg-purple-700 text-white',
  'bg-orange-600': 'bg-orange-600 text-white',
  'bg-indigo-900': 'bg-indigo-900 text-white',
};

function getCategoryBadgeClass(color?: string | null): string {
  if (color && CATEGORY_COLORS[color]) return CATEGORY_COLORS[color];
  return 'bg-indigo-900 text-white';
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.categorie || 'all';

  const [posts, categories] = await Promise.all([
    getPosts(100),
    getCategories(),
  ]);

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter((post) => {
        const cat = post.category as { slug?: string } | null;
        return cat?.slug === activeCategory;
      });

  const allCategories = [
    { slug: 'all', name: 'Tous les articles' },
    ...categories.map((c) => ({ slug: c.slug || '', name: c.name })),
  ];

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
          {allCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === 'all' ? '/blog' : `/blog?categorie=${cat.slug}`}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-indigo-950 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-950 hover:text-indigo-950'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((post) => {
            const category = post.category as { slug?: string; name?: string; color?: string } | null;
            const imagePath = post.featuredImagePath as string | null;
            const featuredImage = post.featuredImage as { url?: string; alt?: string } | null;
            const imageUrl = featuredImage?.url || imagePath;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={featuredImage?.alt || post.title}
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
                  {category && (
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full ${getCategoryBadgeClass(category.color)}`}
                      >
                        {category.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <h2 className="text-lg font-serif font-bold text-slate-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-red-700 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lire l&apos;article
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
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
