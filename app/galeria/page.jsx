import { getGalleryMedia } from '@/utils/getGallery';
import Link from 'next/link';
import GeneralGallery from '@/components/GeneralGallery';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Galería y Entorno',
  description: 'Conocé el entorno natural, los arroyos y paisajes de La Montaña.',
};

const GaleriaPage = async () => {
  const items = await getGalleryMedia();

  return (
    <div className="min-h-screen bg-[#0a0a09] pt-[100px] md:pt-[120px] pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-[50px]">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-[var(--color-brand)] text-sm font-bold uppercase tracking-wider mb-6 hover:underline underline-offset-4 decoration-[var(--color-brand)]">
            ← Volver al Inicio
          </Link>
          <h1 className="text-[32px] md:text-[48px] font-normal text-heading leading-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            El Entorno
          </h1>
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-[var(--color-brand)] flex-shrink-0" />
            <p className="text-[14px] md:text-[16px] font-medium text-[var(--color-brand)] uppercase tracking-[0.15em]">
              VIVÍ LA EXPERIENCIA LA MONTAÑA
            </p>
          </div>
        </div>

        {/* Gallery Component */}
        <GeneralGallery items={items} />

      </div>
    </div>
  );
};

export default GaleriaPage;
