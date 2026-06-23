'use client';
import { Leaf, Shield, Droplets, Map, FileCheck } from 'lucide-react';
import SectionBox from '@/components/sections/SectionBox';
import ScrollReveal from '@/components/shared/ScrollReveal';

import { useTranslations } from 'next-intl';

const CommunicationPillars = () => {
  const t = useTranslations('Pillars');

  const PILLARS = [
    { 
      id: 'naturaleza',
      icon: Leaf, 
      title: t('item1Title'), 
      description: t('item1Text') 
    },
    { 
      id: 'privacidad',
      icon: Shield, 
      title: t('item2Title'), 
      description: t('item2Text') 
    },
    { 
      id: 'agua',
      icon: Droplets, 
      title: t('item3Title'), 
      description: t('item3Text') 
    },

    { 
      id: 'seguridad',
      icon: FileCheck, 
      title: t('item5Title'), 
      description: t('item5Text') 
    },
  ];

  return (
    <section className="pb-[30px] pt-[30px]">
      <SectionBox className="w-full px-4 md:px-[5vw] py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-brand)] block mb-3">
            {t('sectionSubtitle')}
          </span>
          <ScrollReveal variant="fadeLeft">
            <h2 className="text-2xl md:text-[32px] font-medium text-heading leading-tight tracking-[-0.01em] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('sectionTitle')}
            </h2>
          </ScrollReveal>
          <p className="text-[14px] md:text-[17px] font-light text-body leading-[1.7]">
            {t('sectionText')}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {PILLARS.map(({ id, title, description, icon: Icon }, index) => {
            return (
              <article
                key={id}
                className={`
                  group relative border rounded-2xl p-5 pb-6 md:p-8 md:pb-7
                  flex flex-col items-center gap-3 md:gap-4
                  border-white/5 bg-[#141412]/50
                  shadow-[0_2px_8px_rgba(0,0,0,0.5)]
                  transition-all duration-300
                  hover:border-[var(--color-brand)]
                  hover:shadow-[0_8px_32px_rgba(0,0,0,0.8)]
                  hover:-translate-y-1
                `}
              >
                {/* Icon */}
                <div
                  className={`
                    w-12 h-12 md:w-[60px] md:h-[60px] rounded-xl flex items-center justify-center
                    bg-[var(--color-surface)] border border-white/5
                    transition-colors duration-300
                    group-hover:bg-[#141412] group-hover:border-[var(--color-brand)]
                  `}
                >
                  <Icon
                    className="w-6 h-6 md:w-8 md:h-8 text-[var(--color-brand)]"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="text-center mt-2">
                  <h3 className="text-[16px] md:text-lg font-medium text-heading mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {title}
                  </h3>
                  <p className="text-[13px] md:text-sm font-light text-body leading-relaxed">
                    {description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </SectionBox>
    </section>
  );
};

export default CommunicationPillars;
