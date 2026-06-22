import createIntlMiddleware from 'next-intl/middleware';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const locales = ['es', 'en'];

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'es'
});

const privatePages = [
  '/properties/add',
  '/properties/[^/]+/edit',
  '/admin.*',
  '/superadmin.*'
];
const privatePathnameRegex = new RegExp(
  `^(/(${locales.join('|')}))?(${privatePages.join('|')})/?$`,
  'i'
);

const authMiddleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    let path = req.nextUrl.pathname;
    
    // Remove locale prefix for role checking
    for (const locale of locales) {
      if (path.startsWith(`/${locale}/`)) {
        path = path.slice(locale.length + 1);
        break;
      } else if (path === `/${locale}`) {
        path = '/';
        break;
      }
    }

    if (req.method === 'POST' && req.headers.get('next-action')) {
      return intlMiddleware(req);
    }

    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (path.startsWith('/superadmin')) {
      if (token?.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    if (path.startsWith('/properties/add') || path.startsWith('/admin') || path.match(/\/properties\/[^/]+\/edit/)) {
      if (token?.role !== 'admin' && token?.role !== 'superadmin') {
        return NextResponse.redirect(new URL('/properties', req.url));
      }
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.method === 'POST' && req.headers.get('next-action')) return true;
        return !!token;
      },
    },
  }
);

export default function middleware(req) {
  const isPrivatePage = privatePathnameRegex.test(req.nextUrl.pathname);

  // If the user hasn't explicitly chosen a language (no NEXT_LOCALE cookie),
  // try to set the default language based on their IP country geolocation.
  if (!req.cookies.has('NEXT_LOCALE')) {
    const country = req.geo?.country || req.headers.get('x-vercel-ip-country');
    if (country) {
      const esCountries = ['AR', 'ES', 'MX', 'CO', 'PE', 'CL', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PR', 'PA', 'UY', 'GQ', 'VE'];
      // If country is in Latin America / Spain, use 'es', otherwise 'en'
      const geoLocale = esCountries.includes(country.toUpperCase()) ? 'es' : 'en';
      
      // Override Accept-Language so next-intl picks up the geolocation preference
      req.headers.set('Accept-Language', geoLocale);
    }
  }

  if (isPrivatePage) {
    return authMiddleware(req);
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
