import Hero from '@/components/Hero';
import FeaturedPropertiesCarousel from '@/components/FeaturedPropertiesCarousel';
import SellerCTA from '@/components/sections/SellerCTA';
import StatsBar from '@/components/sections/StatsBar';
import Agents from '@/components/sections/Agents';
import TrustStrip from '@/components/sections/TrustStrip';
import CommunicationPillars from '@/components/sections/CommunicationPillars';
import ReviewsSection from '@/components/ReviewsSection';
import Clients from '@/components/Clients';
import ScrollReveal from '@/components/shared/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { getSiteConfig } from '@/utils/getSiteConfig';
import { getLots } from '@/utils/getLots';
import InteractiveMasterplan from '@/components/sections/InteractiveMasterplan';
import polygonsData from '@/data/lotes_geo.json';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Inicio',
  description: 'Roggero & Roma — Agencia inmobiliaria en Alta Gracia, Córdoba. Compra, venta y alquiler de propiedades con más de 10 años de experiencia.',
};

const HomePage = async () => {
  const properties = await getLots();
  const siteConfig = await getSiteConfig();

  // Filter out any unpublished if we had that flag, and format
  const serializedProperties = properties.filter(p => p.status !== 'Oculto');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://lamontana-two.vercel.app/#organization',
        name: 'La Montaña',
        url: 'https://lamontana-two.vercel.app',
        logo: 'https://lamontana-two.vercel.app/logolamontaña.png',
        sameAs: [
          'https://www.facebook.com/roggeroyroma',
          'https://www.instagram.com/roggeroyroma',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+54-9-3571-54-1588',
          contactType: 'sales',
          areaServed: 'AR',
          availableLanguage: 'Spanish',
        },
      },
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://lamontana-two.vercel.app/#realestateagent',
        name: 'La Montaña',
        image: 'https://lamontana-two.vercel.app/logolamontaña.png',
        url: 'https://lamontana-two.vercel.app',
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
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        priceRange: '$$$',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://lamontana-two.vercel.app/#website',
        url: 'https://lamontana-two.vercel.app',
        name: 'La Montaña',
        publisher: { '@id': 'https://lamontana-two.vercel.app/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://lamontana-two.vercel.app/properties?term={search_term_string}',
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
          title="Un Proyecto de Vida" 
          subtitle="La Montaña"
          text="Loteo de campo ubicado en zona serrana, con acceso por Yacanto y El Durazno, a aproximadamente 6 km de este último.

El predio combina naturaleza, privacidad y condiciones ideales para desarrollar una vivienda, casa de descanso o refugio de montaña. Los lotes son aptos para vivienda o construcción, poseen agua de vertiente y, en su mayoría, cuentan con costa directa al arroyo.

El campo cuenta con alambrado perimetral, pircas, caminos internos de acceso a cada sector, forestación variada y añosa, además de casero permanente para seguridad y mantenimiento.

Una propuesta para quienes buscan invertir en tierra con valor natural, en un entorno de tranquilidad, agua y paisaje serrano.

Títulos perfectos para escrituración inmediata." 
        />
      </div>

      {/* 2.5 Pilares de Comunicación */}
      <CommunicationPillars />

      {/* 3. Mapa Interactivo */}
      <InteractiveMasterplan polygonsData={polygonsData} />

      {/* 4. Lotes destacados */}
      <div id="propiedades-destacadas">
        <FeaturedPropertiesCarousel 
          properties={serializedProperties
            .filter(p => p.is_featured)
            .slice(0, 6)
            .map((p, index) => {
              if (index === 0) return { ...p, images: [{ id: 'test1', file_name: 'Lote 1', url: '/Lote 1.jpeg', type: 'image' }] };
              if (index === 1) return { ...p, images: [{ id: 'test2', file_name: 'lote 2', url: '/lote 2.jpeg', type: 'image' }] };
              return p;
            })
            .filter(p => (p.images || []).length > 0)
          } 
        />
      </div>

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