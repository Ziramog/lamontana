'use client';
import { CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';
import ScrollReveal from '@/components/shared/ScrollReveal';

const TrustStrip = () => {
  return (
    <div className="w-full bg-[#0a0a0a] border-b border-white/5 py-16 px-4 relative z-40">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
        
        {/* Item 1 */}
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <div className="flex flex-col items-center pt-4 md:pt-0 px-4 group">
            <div className="w-12 h-12 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110">
              <CheckCircle2 className="w-6 h-6 text-[var(--color-brand)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-white text-[15px] font-medium mb-3 uppercase tracking-[0.1em] font-display">Aptos para vivienda</h3>
            <p className="text-white/60 text-[14px] font-light leading-relaxed max-w-[280px]">
              Todos los lotes son aptos para construir vivienda o casa de descanso.
            </p>
          </div>
        </ScrollReveal>

        {/* Item 2 */}
        <ScrollReveal variant="fadeUp" delay={0.2}>
          <div className="flex flex-col items-center pt-8 md:pt-0 px-4 group">
            <div className="w-12 h-12 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110">
              <ShieldCheck className="w-6 h-6 text-[var(--color-brand)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-white text-[15px] font-medium mb-3 uppercase tracking-[0.1em] font-display">Títulos perfectos</h3>
            <p className="text-white/60 text-[14px] font-light leading-relaxed max-w-[280px]">
              Seguridad documental para avanzar con total tranquilidad.
            </p>
          </div>
        </ScrollReveal>

        {/* Item 3 */}
        <ScrollReveal variant="fadeUp" delay={0.3}>
          <div className="flex flex-col items-center pt-8 md:pt-0 px-4 group">
            <div className="w-12 h-12 rounded-full bg-[var(--color-brand)]/10 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110">
              <FileCheck className="w-6 h-6 text-[var(--color-brand)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-white text-[15px] font-medium mb-3 uppercase tracking-[0.1em] font-display">Escrituración inmediata</h3>
            <p className="text-white/60 text-[14px] font-light leading-relaxed max-w-[280px]">
              Documentación lista para concretar la operación.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default TrustStrip;
