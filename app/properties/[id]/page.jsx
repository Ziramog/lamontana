export const dynamic = 'force-dynamic';

import PropertyDetails from '@/components/PropertyDetails';
import PropertyGallery from '@/components/PropertyGallery';
import PropertyMap from '@/components/PropertyMap';
import MapErrorBoundary from '@/components/shared/MapErrorBoundary';
import FullGallery from '@/components/FullGallery';
import ScrollReveal from '@/components/shared/ScrollReveal';
import SectionTitle from '@/components/shared/SectionTitle';
import JsonLd from '@/components/JsonLd';
import Link from 'next/link';
import { getLotById } from '@/utils/getLots';

export async function generateMetadata({ params }) {
  const propertyDoc = await getLotById(params.id);

  if (!propertyDoc) {
    return {
      title: 'Lote no encontrado',
    };
  }

  const property = propertyDoc;
  const title = `${property.name || 'Lote'} · ${property.location?.city || 'La Montaña'}`;
  const description = `${property.type || 'Lote'} en ${property.operation || 'venta'} · U$D ${property.price || 'Consultar'} · ${property.description?.slice(0, 150) || 'Loteo La Montaña'}`;
  const image = property.images?.[0] || '/images/og-default.jpg';

  return {
    title,
    description,
    openGraph: {
      title: `${property.name || 'Lote'} · La Montaña`,
      description,
      images: [image],
      type: 'article',
      locale: 'es_AR',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.name || 'Lote'} · La Montaña`,
      description,
      images: [image],
    },
    alternates: {
      canonical: `/properties/${params.id}`,
    },
  };
}

const PropertyPage = async ({ params }) => {
  try {
    const propertyDoc = await getLotById(params.id);

    if (!propertyDoc) {
      return (
        <h1 className='text-center text-2xl font-bold mt-10'>
          Lote No Encontrado
        </h1>
      );
    }

    const property = propertyDoc;

    const parsePrice = (priceStr) => {
      if (!priceStr) return null;
      const cleaned = String(priceStr).replace(/[^0-9]/g, '');
      return cleaned ? parseInt(cleaned, 10) : null;
    };

    const propertyImage = property.images?.[0] || 'https://properties-srs5.vercel.app/images/og-default.jpg';
    const propertyPrice = parsePrice(property.price);

    const realEstateJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: property.name || 'Propiedad',
      description: property.description || '',
      url: `https://properties-srs5.vercel.app/properties/${property._id}`,
      image: propertyImage,
      datePosted: property.createdAt,
      offers: {
        '@type': 'Offer',
        price: propertyPrice,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        businessFunction:
          property.operation === 'alquiler'
            ? 'http://purl.org/goodrelations/v1#LeaseOut'
            : 'http://purl.org/goodrelations/v1#Sell',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.location?.street || '',
        addressLocality: property.location?.city || 'Alta Gracia',
        addressRegion: property.location?.state || 'Córdoba',
        addressCountry: 'AR',
      },
      geo:
        property.coordinates?.lat && property.coordinates?.lng
          ? {
              '@type': 'GeoCoordinates',
              latitude: property.coordinates.lat,
              longitude: property.coordinates.lng,
            }
          : undefined,
      numberOfRooms: property.beds || undefined,
      numberOfBathroomsTotal: property.baths || undefined,
      floorSize: property.square_feet
        ? {
            '@type': 'QuantitativeValue',
            value: property.square_feet,
            unitCode: 'MTK',
          }
        : undefined,
    };

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://properties-srs5.vercel.app/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Propiedades',
          item: 'https://properties-srs5.vercel.app/properties',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: property.name || 'Propiedad',
          item: `https://properties-srs5.vercel.app/properties/${property._id}`,
        },
      ],
    };

    return (
      <div className="min-h-screen" style={{ background: '#F6F6F6' }}>
        <JsonLd data={realEstateJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
        <ScrollReveal variant="fadeScale">
          <PropertyGallery images={property.images} property={property} />
        </ScrollReveal>
        <section className="pb-16">
          <div className="mx-auto">
            <PropertyDetails property={property} />
            {property.images && property.images.length > 0 && (
              <div className="mt-8" id="full-gallery">
                <div className="bg-white rounded-none overflow-hidden">
                  <div className="mx-auto py-[30px] md:py-[80px] px-4 md:px-[50px] md:pb-[35px]">
                    <div className="pb-[30px]">
                      <SectionTitle size="normal">
                        {property.name
                          ? property.name.split(' ').slice(0, 4).join(' ') + (property.name.split(' ').length > 4 ? '...' : '')
                          : 'Fotos'}
                      </SectionTitle>
                    </div>
                    <ScrollReveal delay={100}>
                      <FullGallery images={property.images} propertyName={property.name} />
                    </ScrollReveal>
                  </div>
                </div>
              </div>
            )}

            {/* View on Map */}
            <div className="mt-8">
              <div className="bg-white rounded-none md:rounded-[30px] overflow-hidden">
                <div className="mx-auto px-4 md:px-[50px] py-[30px] md:py-[40px]">
                  <div className="pb-[30px]">
                    <div className="flex items-center justify-between">
                      <SectionTitle size="normal">Vista en Mapa</SectionTitle>
                      <Link
                        href="/properties/map-all"
                        className="hidden md:inline-flex items-center gap-2 text-[var(--color-brand)] text-[13px] font-bold uppercase tracking-wider transition-colors hover:text-[#0F172A]"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                          <line x1="8" y1="2" x2="8" y2="18"/>
                          <line x1="16" y1="6" x2="16" y2="22"/>
                        </svg>
                        Ver todas las propiedades en el mapa
                      </Link>
                    </div>
                    <Link
                      href="/properties/map-all"
                      className="md:hidden mt-4 w-full flex items-center justify-center gap-2 text-[13px] font-bold uppercase tracking-wider text-[var(--color-brand)] bg-white border border-[var(--color-brand)] rounded-[8px] py-3 px-6 transition-colors hover:bg-[var(--color-brand)] hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                        <line x1="8" y1="2" x2="8" y2="18"/>
                        <line x1="16" y1="6" x2="16" y2="22"/>
                      </svg>
                      Ver todas las propiedades en el mapa
                    </Link>
                  </div>
                  <ScrollReveal delay={100}>
                    <div className="rounded-[30px] overflow-hidden">
                      <MapErrorBoundary>
                        <PropertyMap property={property} />
                      </MapErrorBoundary>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (err) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F6F6F6' }}>
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="#E94560" strokeWidth="2" className="w-8 h-8">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[#0F172A] mb-2">Error al cargar la propiedad</h2>
          <p className="text-sm text-[#666] mb-2">{err.message}</p>
          <p className="text-[11px] text-[#bbb] mb-6 font-mono">Digest: {err.digest}</p>
          <Link href="/admin" className="text-[var(--color-brand)] font-medium text-sm hover:underline">
            Volver al panel admin
          </Link>
        </div>
      </div>
    );
  }
};
export default PropertyPage;
