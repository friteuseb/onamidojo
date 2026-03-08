import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '@/data/articles';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.pageTitle,
    description: article.description,
    alternates: {
      canonical: `https://onamidojo.fr/blog/${article.slug}`,
    },
    openGraph: {
      title: article.pageTitle,
      description: article.description,
      url: `https://onamidojo.fr/blog/${article.slug}`,
      type: 'article',
      ...(article.image && {
        images: [
          {
            url: article.image,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.pageTitle,
      description: article.description,
      ...(article.image && { images: [article.image] }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  // Get related articles (same category, excluding current)
  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-28 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-900 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-indigo-900 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 truncate max-w-[200px]">{article.title}</span>
        </nav>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="mb-10">
          <span
            className={`text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full inline-block mb-4 ${
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
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
            {article.title}
          </h1>
          <div className="w-20 h-1 bg-red-700"></div>
        </header>

        {/* Hero Image */}
        {article.image && (
          <div className="aspect-[16/9] relative overflow-hidden rounded-sm mb-10 shadow-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 bg-indigo-950 text-white rounded-sm">
          <h3 className="text-xl md:text-2xl font-serif font-bold mb-3">
            Envie de pratiquer ?
          </h3>
          <p className="text-indigo-200 mb-6 max-w-xl">
            Rejoignez l&apos;Onami Dojo à Amiens et bénéficiez de 2 cours d&apos;essai gratuits en
            Kempo Karaté ou Kyokushin.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-700 text-white font-bold rounded-sm hover:bg-red-800 transition-colors"
          >
            Réserver un essai gratuit
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">
            Articles similaires
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  {rel.image ? (
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 to-indigo-800 flex items-center justify-center">
                      <span className="text-white/20 font-serif text-5xl font-black select-none">
                        大波
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-indigo-950 font-bold hover:text-red-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Voir tous les articles
            </Link>
          </div>
        </section>
      )}

      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.description,
            ...(article.image && {
              image: `https://onamidojo.fr${article.image}`,
            }),
            author: {
              '@type': 'Organization',
              name: 'Onami Dojo',
              url: 'https://onamidojo.fr',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Onami Dojo',
              url: 'https://onamidojo.fr',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://onamidojo.fr/blog/${article.slug}`,
            },
          }),
        }}
      />
    </div>
  );
}
