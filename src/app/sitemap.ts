import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/payload-helpers';

const SITE_URL = 'https://www.onamidojo.fr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date('2026-03-09'),
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date('2026-03-09'),
    },
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: new Date('2026-01-15'),
    },
    {
      url: `${SITE_URL}/confidentialite`,
      lastModified: new Date('2026-01-15'),
    },
    {
      url: `${SITE_URL}/reglement-interieur`,
      lastModified: new Date('2026-01-15'),
    },
    {
      url: `${SITE_URL}/kempo-karate-amiens`,
      lastModified: new Date('2026-03-10'),
    },
    {
      url: `${SITE_URL}/kyokushin-karate-amiens`,
      lastModified: new Date('2026-03-10'),
    },
  ];

  try {
    const posts = await getPosts(200);
    const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date('2026-03-08'),
    }));
    return [...staticPages, ...articlePages];
  } catch {
    return staticPages;
  }
}
