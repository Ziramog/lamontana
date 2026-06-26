import { getGalleryMedia } from '@/utils/getGallery';
import { Link } from '@/i18n/routing';
import GeneralGallery from '@/components/GeneralGallery';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('galeriaTitle'),
    description: t('galeriaDescription'),
  };
}

const GaleriaPage = async ({ params: { locale } }) => {
  const t = await getTranslations({ locale, namespace: 'GaleriaPage' });
  const items = await getGalleryMedia();

  return (
    <div className="min-h-screen bg-[#0a0a09] pt-[100px] md:pt-[120px] pb-24">
      <div className="max-w-[1200px] mx-auto px-4 md:px-[50px]">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-[var(--color-brand)] text-sm font-bold uppercase tracking-wider mb-6 hover:underline underline-offset-4 decoration-[var(--color-brand)]">
            {t('backToHome')}
          </Link>
          <h1 className="text-[32px] md:text-[48px] font-normal text-heading leading-tight mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('title')}
          </h1>
          <div className="flex items-center gap-3">
            <span className="w-10 md:w-16 h-[2px] bg-[var(--color-brand)] flex-shrink-0 [clip-path:polygon(0_50%,100%_0,100%_100%)]" />
            <p className="text-[14px] md:text-[16px] font-medium text-[var(--color-brand)] uppercase tracking-[0.15em]">
              {t('subtitle')}
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
