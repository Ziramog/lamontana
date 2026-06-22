import { getLots } from '@/utils/getLots';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lamontana-two.vercel.app';
const locales = ['es', 'en'];

function getUrl(path, locale) {
  // Since we use /[locale]/ routing natively:
  return `${baseUrl}/${locale}${path === '/' ? '' : path}`;
}

export default async function sitemap() {
  const properties = await getLots();

  // Define static core routes (without locale prefix)
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' },
    { path: '/galeria', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/properties', priority: 0.8, changeFrequency: 'daily' },
    { path: '/properties/map-all', priority: 0.7, changeFrequency: 'weekly' },
  ];

  const now = new Date().toISOString();
  const entries = [];

  // 1. Generate Static Pages
  for (const page of staticPages) {
    for (const locale of locales) {
      const alternates = { languages: {} };
      locales.forEach(loc => {
        alternates.languages[loc] = getUrl(page.path, loc);
      });
      // x-default is fallback
      alternates.languages['x-default'] = getUrl(page.path, 'es');

      entries.push({
        url: getUrl(page.path, locale),
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates,
      });
    }
  }

  // 2. Generate Dynamic Property Pages
  for (const p of properties) {
    const path = `/properties/${p.id}`;
    for (const locale of locales) {
      const alternates = { languages: {} };
      locales.forEach(loc => {
        alternates.languages[loc] = getUrl(path, loc);
      });
      alternates.languages['x-default'] = getUrl(path, 'es');

      entries.push({
        url: getUrl(path, locale),
        lastModified: p.updatedAt ? new Date(p.updatedAt.seconds * 1000).toISOString() : now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates,
      });
    }
  }

  return entries;
}
