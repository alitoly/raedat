import type { MetadataRoute } from 'next';
import { news } from '@/lib/data';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/about', '/program', '/impact', '/news'].map((p) => ({
    url: `${siteUrl}${p}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.8,
  }));
  const articles = news.map((n) => ({
    url: `${siteUrl}/news/${n.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  return [...pages, ...articles];
}
