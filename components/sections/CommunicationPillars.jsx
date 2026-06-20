'use client';
import { Leaf, Shield, Droplets, Map, FileCheck } from 'lucide-react';
import SectionBox from '@/components/sections/SectionBox';
import ScrollReveal from '@/components/shared/ScrollReveal';

const PILLARS = [
  { 
    id: 'naturaleza',
    icon: Leaf, 
    title: 'Naturaleza Real', 
    description: 'Campo serrano, vertientes, árboles añosos y paisaje inigualable.' 
  },
  { 
    id: 'privacidad',
    icon: Shield, 
    title: 'Privacidad y Seguridad', 
    description: 'Lotes en entorno natural, con acceso controlado, casero y mantenimiento permanente.' 
  },
  { 
    id: 'agua',
    icon: Droplets, 
    title: 'Agua y Arroyo', 
    description: 'Agua de vertiente y costa al arroyo en todos los lotes.' 
  },
  { 
    id: 'proyecto',
    icon: Map, 
    title: 'Acceso Estratégico', 
    description: 'A 40 minutos de Santa Rosa de Calamuchita y a 2 horas de Córdoba Capital.' 
  },
  { 
    id: 'seguridad',
    icon: FileCheck, 
    title: 'Seguridad Jurídica', 
    description: 'Títulos perfectos y listos para escrituración inmediata.' 
  },
];

const CommunicationPillars = () => {
  return (
    <section className="pb-[30px] pt-[30px] px-4">
      <SectionBox className="max-w-[92vw] mx-auto px-4 md:px-[50px] py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-brand)] block mb-3">
            PILARES DEL DESARROLLO
          </span>
          <ScrollReveal variant="fadeLeft">
            <h2 className="text-2xl md:text-[32px] font-medium text-heading leading-tight tracking-[-0.01em] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              ¿Por qué elegir La Montaña?
            </h2>
          </ScrollReveal>
          <p className="text-[14px] md:text-[17px] font-light text-body leading-[1.7]">
            Más que un loteo, es una oportunidad de conectar con la naturaleza con total seguridad.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
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
