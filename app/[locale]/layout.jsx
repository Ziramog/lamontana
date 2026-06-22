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

export async function generateMetadata({ params: { locale } }) {
  // En caso de que se llame fuera del contexto del locale por error, o para cargar traducciones dinámicamente:
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://lamontana-two.vercel.app'),
    title: {
      template: `%s · ${t('siteName')}`,
      default: t('defaultTitle'),
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: t('siteName') }],
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_AR' : 'en_US',
      siteName: t('siteName'),
      images: [
        {
          url: '/lamontanafavicom.png',
          width: 1000,
          height: 1000,
          alt: t('siteName'),
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
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getSiteConfig } from '@/utils/getSiteConfig';

const MainLayout = async ({ children, params: { locale } }) => {
  const siteConfig = await getSiteConfig();

  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    notFound();
  }

  return (
        <html lang={locale} className={`${montserrat.variable} ${cinzel.variable}`}>
          <body className='font-sans antialiased text-body'>
            <NextIntlClientProvider messages={messages}>
              <AuthProvider>
                <GlobalProvider>
                  <Preloader />
                  <Navbar contactEmail={siteConfig.contactEmail} contactPhone={siteConfig.contactPhone} locale={locale} />
                  <main className="relative pb-[12px]">{children}</main>
                  <Footer footerDescription={siteConfig.footerDescription} contactEmail={siteConfig.contactEmail} contactPhone={siteConfig.contactPhone} contactAddress={siteConfig.contactAddress} />
                  <ToastContainer />
                  <GoogleAnalytics analyticsId={siteConfig.analyticsId} facebookPixelId={siteConfig.facebookPixelId} />
                </GlobalProvider>
              </AuthProvider>
            </NextIntlClientProvider>
          </body>
        </html>
  );
};

export default MainLayout;
