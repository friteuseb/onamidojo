import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPostBySlug } from '@/lib/payload-helpers';
import RichText from '@/components/RichText';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  try {
    const posts = await getPosts(200);
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const imagePath = (post.featuredImagePath as string) || null;
  const featuredImage = post.featuredImage as { url?: string } | null;
  const imageUrl = featuredImage?.url || imagePath;

  return {
    title: post.pageTitle || post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://onamidojo.fr/blog/${post.slug}`,
    },
    openGraph: {
      title: post.pageTitle || post.title,
      description: post.excerpt || '',
      url: `https://onamidojo.fr/blog/${post.slug}`,
      type: 'article',
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.pageTitle || post.title,
      description: post.excerpt || '',
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const category = post.category as { slug?: string; name?: string; color?: string; id?: string } | null;
  const imagePath = (post.featuredImagePath as string) || null;
  const featuredImage = post.featuredImage as { url?: string; alt?: string } | null;
  const imageUrl = featuredImage?.url || imagePath;
  const htmlContent = post.htmlContent as string | null;

  // Get related articles (same category)
  const allPosts = await getPosts(200);
  const related = allPosts
    .filter((p) => {
      if (p.slug === post.slug) return false;
      const pCat = p.category as { id?: string } | null;
      return pCat?.id === category?.id;
    })
    .slice(0, 3);

  const publishedDate = post.publishedDate || '2026-03-08';
  const categoryName = category?.name || '';

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-28 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-900 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-indigo-900 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="mb-10">
          {category && (
            <span
              className={`text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full inline-block mb-4 ${getCategoryBadgeClass(category.color)}`}
            >
              {category.name}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>
          <div className="w-20 h-1 bg-red-700"></div>
        </header>

        {/* Hero Image */}
        {imageUrl && (
          <div className="aspect-[16/9] relative overflow-hidden rounded-sm mb-10 shadow-lg">
            <Image
              src={imageUrl}
              alt={featuredImage?.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        {htmlContent ? (
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        ) : (
          <div className="article-content">
            <RichText data={post.content} />
          </div>
        )}

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
            {related.map((rel) => {
              const relImagePath = rel.featuredImagePath as string | null;
              const relFeaturedImage = rel.featuredImage as { url?: string; alt?: string } | null;
              const relImageUrl = relFeaturedImage?.url || relImagePath;

              return (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                    {relImageUrl ? (
                      <Image
                        src={relImageUrl}
                        alt={relFeaturedImage?.alt || rel.title}
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
              );
            })}
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

      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://onamidojo.fr' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://onamidojo.fr/blog' },
              { '@type': 'ListItem', position: 3, name: post.title },
            ],
          }),
        }}
      />
      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            inLanguage: 'fr',
            articleSection: categoryName,
            datePublished: publishedDate,
            dateModified: publishedDate,
            ...(imageUrl && {
              image: imageUrl.startsWith('/') ? `https://onamidojo.fr${imageUrl}` : imageUrl,
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
              logo: {
                '@type': 'ImageObject',
                url: 'https://onamidojo.fr/images/og-image.jpg',
                width: 1200,
                height: 630,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://onamidojo.fr/blog/${post.slug}`,
            },
          }),
        }}
      />
    </div>
  );
}
