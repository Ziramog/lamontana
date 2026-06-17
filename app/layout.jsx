import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { GlobalProvider } from '@/context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/assets/styles/globals.css';
import 'photoswipe/dist/photoswipe.css';

import { Cinzel, Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://properties-srs5.vercel.app'),
  title: {
    template: '%s · Roggero & Roma',
    default: 'Roggero & Roma | Negocios Inmobiliarios en Alta Gracia, Córdoba',
  },
  description:
    'Agencia inmobiliaria en Alta Gracia, Córdoba. Más de 10 años de experiencia en compra, venta y alquiler de casas, departamentos, campos y locales comerciales.',
  keywords:
    'inmobiliaria, propiedades, casas, departamentos, campos, Alta Gracia, Córdoba, Argentina, venta, alquiler',
  authors: [{ name: 'Roggero & Roma' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Roggero & Roma Inmobiliaria',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Roggero & Roma Inmobiliaria — Alta Gracia, Córdoba',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@roggeroroma',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/favicon-square.png',
    apple: '/images/favicon-square.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { getSiteConfig } from '@/utils/getSiteConfig';

const MainLayout = async ({ children }) => {
  const siteConfig = await getSiteConfig();

  return (
        <html lang='es' className={`${montserrat.variable} ${cinzel.variable}`}>
          <body className='font-sans antialiased text-body'>
            <AuthProvider>
              <GlobalProvider>
                <Navbar contactEmail={siteConfig.contactEmail} contactPhone={siteConfig.contactPhone} />
                <main className="relative pb-[12px]">{children}</main>
                <Footer footerDescription={siteConfig.footerDescription} contactEmail={siteConfig.contactEmail} contactPhone={siteConfig.contactPhone} contactAddress={siteConfig.contactAddress} />
                <ToastContainer />
                <GoogleAnalytics analyticsId={siteConfig.analyticsId} facebookPixelId={siteConfig.facebookPixelId} />
              </GlobalProvider>
            </AuthProvider>
          </body>
        </html>
  );
};

export default MainLayout;
