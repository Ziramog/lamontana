export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lamontana-two.vercel.app';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: [
          '/admin/',
          '/superadmin/',
          '/api/',
          '/profile/',
          '/properties/add',
          '/properties/*/edit',
          '/properties/saved',
          '/properties/search-results',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
