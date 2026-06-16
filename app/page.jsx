import Hero from '@/components/Hero';
import FeaturedPropertiesCarousel from '@/components/FeaturedPropertiesCarousel';
import SellerCTA from '@/components/sections/SellerCTA';
import StatsBar from '@/components/sections/StatsBar';
import Agents from '@/components/sections/Agents';
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
        '@id': 'https://properties-srs5.vercel.app/#organization',
        name: 'Roggero & Roma',
        url: 'https://properties-srs5.vercel.app',
        logo: 'https://properties-srs5.vercel.app/logolamontaña.png',
        sameAs: [
          'https://www.facebook.com/roggeroyroma',
          'https://www.instagram.com/roggeroyroma',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+54-9-3547-563911',
          contactType: 'sales',
          areaServed: 'AR',
          availableLanguage: 'Spanish',
        },
      },
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://properties-srs5.vercel.app/#realestateagent',
        name: 'Roggero & Roma',
        image: 'https://properties-srs5.vercel.app/logolamontaña.png',
        url: 'https://properties-srs5.vercel.app',
        telephone: siteConfig.contactPhone || '+54 9 9354 7563911',
        email: siteConfig.contactEmail || 'info@roggeroyroma.com.ar',
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.contactAddress || 'Blvd. Carlos Pellegrini 710',
          addressLocality: 'Alta Gracia',
          addressRegion: 'Córdoba',
          postalCode: 'X5186',
          addressCountry: 'AR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -31.6529,
          longitude: -64.4286,
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
        '@id': 'https://properties-srs5.vercel.app/#website',
        url: 'https://properties-srs5.vercel.app',
        name: 'Roggero & Roma Inmobiliaria',
        publisher: { '@id': 'https://properties-srs5.vercel.app/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://properties-srs5.vercel.app/properties?term={search_term_string}',
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
      <Hero title="Naturaleza, altura y privacidad." subtitle="a 7 km del Durazno de Yacanto" />

      {/* 2. Nuestra Historia */}
      <div id="nuestra-historia">
        <Agents 
          title="La Montaña" 
          subtitle="Loteo de montaña"
          text="Aprendimos que vender tierra no es solamente ofrecer metros cuadrados. Es acompañar una decisión importante: elegir un lugar donde proyectar, invertir, descansar o construir una nueva etapa de vida.

La Montaña nace con esa mirada.

Ubicado 7 km arriba de El Durazno, en un entorno natural privilegiado, este loteo fue pensado para quienes buscan algo distinto: tranquilidad, paisaje serrano, aire puro y privacidad, sin resignar seguridad en la operación ni información clara sobre lo que están comprando.

Cada lote representa una oportunidad de conectar con la naturaleza y, al mismo tiempo, resguardar valor en una zona con identidad propia y alta proyección. No se trata de un loteo masivo, sino de una propuesta más reservada, para quienes entienden que ciertos lugares no se eligen solo por ubicación, sino por lo que transmiten." 
        />
      </div>

      {/* 3. Mapa Interactivo */}
      <InteractiveMasterplan polygonsData={polygonsData} />

      {/* 4. Lotes destacados */}
      <div id="propiedades-destacadas">
        <FeaturedPropertiesCarousel 
          properties={serializedProperties
            .filter(p => p.is_featured)
            .slice(0, 6)
            .map((p, index) => {
              if (index === 0) return { ...p, images: [{ id: 'test1', file_name: 'Lote 1', file_path: '/Lote 1.jpeg', type: 'image' }] };
              if (index === 1) return { ...p, images: [{ id: 'test2', file_name: 'lote 2', file_path: '/lote 2.jpeg', type: 'image' }] };
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