import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import SellerCTA from '@/components/sections/SellerCTA';
import StatsBar from '@/components/sections/StatsBar';
import Agents from '@/components/sections/Agents';
import TrustStrip from '@/components/sections/TrustStrip';
import CommunicationPillars from '@/components/sections/CommunicationPillars';
import ReviewsSection from '@/components/ReviewsSection';
import Clients from '@/components/Clients';
import ScrollReveal from '@/components/shared/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { getTranslations } from 'next-intl/server';
import { getSiteConfig } from '@/utils/getSiteConfig';
import { getLots } from '@/utils/getLots';
import { getGalleryMedia } from '@/utils/getGallery';
import GalleryPreview from '@/components/sections/GalleryPreview';
import polygonsData from '@/data/lotes_geo.json';

const InteractiveMasterplan = dynamic(() => import('@/components/sections/InteractiveMasterplan'), { ssr: false });
const FeaturedPropertiesCarousel = dynamic(() => import('@/components/FeaturedPropertiesCarousel'));

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  };
}

const HomePage = async ({ params: { locale } }) => {
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  const properties = await getLots();
  const siteConfig = await getSiteConfig();
  const galleryItems = await getGalleryMedia();

  // Filter out any unpublished if we had that flag, and format
  const serializedProperties = properties.filter(p => p.status !== 'Oculto');

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lamontana-two.vercel.app';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'La Montaña',
        url: baseUrl,
        logo: `${baseUrl}/logolamontaña.png`,
        sameAs: [
          'https://www.facebook.com/roggeroyroma',
          'https://www.instagram.com/roggeroyroma',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteConfig.contactPhone || '+54-9-3571-54-1588',
          contactType: 'sales',
          areaServed: 'AR',
          availableLanguage: locale === 'es' ? 'Spanish' : 'English',
        },
      },
      {
        '@type': 'RealEstateAgent',
        '@id': `${baseUrl}/#realestateagent`,
        name: 'La Montaña',
        image: `${baseUrl}/logolamontaña.png`,
        url: baseUrl,
        telephone: siteConfig.contactPhone || '+54 9 3571 54-1588',
        email: siteConfig.contactEmail || 'info@roggeroyroma.com.ar',
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.contactAddress || '',
          addressLocality: 'El Durazno',
          addressRegion: 'Córdoba',
          postalCode: 'X5186',
          addressCountry: 'AR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -32.179297,
          longitude: -64.809725,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '18:00',
        },
        priceRange: '$$$',
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'La Montaña',
        publisher: { '@id': `${baseUrl}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/${locale}/properties?term={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <div>
      <JsonLd data={jsonLd} />
      {/* 1. Hero — emotional hook + search + trust strip */}
      <Hero />
      <TrustStrip />

      {/* 2. Nuestra Historia */}
      <div id="nuestra-historia">
        <Agents 
          title={t('historiaTitle')} 
          subtitle={t('historiaSubtitle')}
          text={t('historiaText')} 
          sectionTag={t('historiaTag')}
        />
      </div>

      {/* 2.5 Pilares de Comunicación */}
      <CommunicationPillars />

      {/* 3. Mapa Interactivo */}
      <InteractiveMasterplan polygonsData={polygonsData} />

      {/* 3.5 Lotes destacados */}
      <div id="propiedades-destacadas">
        <FeaturedPropertiesCarousel 
          properties={serializedProperties
            .filter(p => p.is_featured)
            .slice(0, 6)
            .map((p, index) => {
              if (index === 0) return { ...p, images: [{ id: 'test1', file_name: 'Lote 1', url: '/Lote 1.jpeg', type: 'image' }] };
              if (index === 1) return { ...p, images: [{ id: 'test2', file_name: 'lote 2', url: '/lote 2.jpeg', type: 'image' }] };
              if (index === 2) return { ...p, images: [{ id: 'test3', file_name: 'Lote 10', url: '/Lote 10.jpeg', type: 'image' }] };
              return p;
            })
            .filter(p => (p.images || []).length > 0)
          } 
        />
      </div>

      {/* 4. Preview de Galería */}
      <GalleryPreview items={galleryItems} />

      {/* SECCIONES OCULTAS 
      <StatsBar />
      <SellerCTA />
      <ScrollReveal variant="fadeScale">
        <ReviewsSection />
      </ScrollReveal>
      <Clients />
      */}
    </div>
  );
};

export default HomePage;