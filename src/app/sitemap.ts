import { MetadataRoute } from 'next';
import { articles } from '@/data/articles';

const SITE_URL = 'https://onamidojo.fr';

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: new Date('2026-03-08'),
  }));

  return [...staticPages, ...articlePages];
}
