'use client';
import { CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const TrustStrip = () => {
  return (
    <div className="w-full bg-[#141412] py-16 md:py-20 px-4 relative z-40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
        
        {/* Item 1 */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="flex flex-col items-center px-4 group">
            <div className="mb-4 transition-transform duration-500 group-hover:-translate-y-1">
              <CheckCircle2 className="w-7 h-7 text-[var(--color-brand)]/80" strokeWidth={1} />
            </div>
            <h3 className="text-white/90 text-[13px] md:text-[14px] font-light mb-3 uppercase tracking-[0.2em]">Aptos para vivienda</h3>
            <p className="text-white/50 text-[13px] font-light leading-relaxed max-w-[260px]">
              Todos los lotes son aptos para construir vivienda o casa de descanso.
            </p>
          </div>
        </ScrollReveal>

        {/* Item 2 */}
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="flex flex-col items-center px-4 group">
            <div className="mb-4 transition-transform duration-500 group-hover:-translate-y-1">
              <ShieldCheck className="w-7 h-7 text-[var(--color-brand)]/80" strokeWidth={1} />
            </div>
            <h3 className="text-white/90 text-[13px] md:text-[14px] font-light mb-3 uppercase tracking-[0.2em]">Títulos perfectos</h3>
            <p className="text-white/50 text-[13px] font-light leading-relaxed max-w-[260px]">
              Seguridad documental para avanzar con total tranquilidad.
            </p>
          </div>
        </ScrollReveal>

        {/* Item 3 */}
        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="flex flex-col items-center px-4 group">
            <div className="mb-4 transition-transform duration-500 group-hover:-translate-y-1">
              <FileCheck className="w-7 h-7 text-[var(--color-brand)]/80" strokeWidth={1} />
            </div>
            <h3 className="text-white/90 text-[13px] md:text-[14px] font-light mb-3 uppercase tracking-[0.2em]">Escrituración inmediata</h3>
            <p className="text-white/50 text-[13px] font-light leading-relaxed max-w-[260px]">
              Documentación lista para concretar la operación.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default TrustStrip;
