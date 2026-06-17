import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Preloader from '@/components/Preloader';
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
  metadataBase: new URL('https://lamontana-two.vercel.app'),
  title: {
    template: '%s · La Montaña',
    default: 'La Montaña | Lotes de campo en entorno serrano',
  },
  description:
    'Loteo de campo ubicado en zona serrana, con acceso por Yacanto y El Durazno. Naturaleza, privacidad y lotes aptos para vivienda con costa de arroyo.',
  keywords:
    'loteo, lotes, campo, sierras, El Durazno, Yacanto, Córdoba, Argentina, venta, terrenos, La Montaña',
  authors: [{ name: 'La Montaña' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'La Montaña',
    images: [
      {
        url: '/lamontanafavicom.png',
        width: 1000,
        height: 1000,
        alt: 'La Montaña — Córdoba',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lamontana',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/lamontanafavicom.png',
    apple: '/lamontanafavicom.png',
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
                <Preloader />
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
