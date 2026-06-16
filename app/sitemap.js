import { getLots } from '@/utils/getLots';

export default async function sitemap() {
  const properties = await getLots();

  const propertyUrls = properties.map((p) => ({
    url: `https://lamontana-seven.vercel.app/properties/${p.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryUrls = [
    { url: 'https://properties-srs5.vercel.app/properties?type=Casa', priority: 0.7 },
    { url: 'https://properties-srs5.vercel.app/properties?type=Departamento', priority: 0.7 },
    { url: 'https://properties-srs5.vercel.app/properties?type=Campo', priority: 0.7 },
    { url: 'https://properties-srs5.vercel.app/properties?type=Terreno', priority: 0.7 },
    { url: 'https://properties-srs5.vercel.app/properties?type=Inmueble+Comercial', priority: 0.7 },
    { url: 'https://properties-srs5.vercel.app/properties?operation=venta', priority: 0.7 },
    { url: 'https://properties-srs5.vercel.app/properties?operation=alquiler', priority: 0.7 },
  ];

  const now = new Date().toISOString();

  return [
    {
      url: 'https://properties-srs5.vercel.app',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://properties-srs5.vercel.app/properties',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://properties-srs5.vercel.app/properties/map-all',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...categoryUrls.map((c) => ({
      url: c.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: c.priority,
    })),
    ...propertyUrls,
  ];
}
