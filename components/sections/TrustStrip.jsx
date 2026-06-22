'use client';
import { CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

import { useTranslations } from 'next-intl';

const TrustStrip = () => {
  const t = useTranslations('TrustStrip');
  return (
    <div className="w-full bg-[#141412] py-16 md:py-20 px-4 relative z-40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
        
        {/* Item 1 */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="flex flex-col items-center px-4 group">
            <div className="mb-4 transition-transform duration-500 group-hover:-translate-y-1">
              <CheckCircle2 className="w-7 h-7 text-[var(--color-brand)]/80" strokeWidth={1} />
            </div>
            <h3 className="text-white/90 text-[13px] md:text-[14px] font-light mb-3 uppercase tracking-[0.2em]">{t('item1Title')}</h3>
            <p className="text-white/50 text-[13px] font-light leading-relaxed max-w-[260px]">
              {t('item1Text')}
            </p>
          </div>
        </ScrollReveal>

        {/* Item 2 */}
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="flex flex-col items-center px-4 group">
            <div className="mb-4 transition-transform duration-500 group-hover:-translate-y-1">
              <ShieldCheck className="w-7 h-7 text-[var(--color-brand)]/80" strokeWidth={1} />
            </div>
            <h3 className="text-white/90 text-[13px] md:text-[14px] font-light mb-3 uppercase tracking-[0.2em]">{t('item2Title')}</h3>
            <p className="text-white/50 text-[13px] font-light leading-relaxed max-w-[260px]">
              {t('item2Text')}
            </p>
          </div>
        </ScrollReveal>

        {/* Item 3 */}
        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="flex flex-col items-center px-4 group">
            <div className="mb-4 transition-transform duration-500 group-hover:-translate-y-1">
              <FileCheck className="w-7 h-7 text-[var(--color-brand)]/80" strokeWidth={1} />
            </div>
            <h3 className="text-white/90 text-[13px] md:text-[14px] font-light mb-3 uppercase tracking-[0.2em]">{t('item3Title')}</h3>
            <p className="text-white/50 text-[13px] font-light leading-relaxed max-w-[260px]">
              {t('item3Text')}
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default TrustStrip;
