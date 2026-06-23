'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import ScrollReveal from '@/components/shared/ScrollReveal';

const FullLandingGallery = ({ items = [] }) => {
  if (items.length === 0) return null;

  const CTA_VARIANTS = [
    {
      title: 'Agendá una visita a La Montaña',
      description: 'Escribinos para coordinar una visita y experimentar la exclusividad de La Montaña, donde la naturaleza y la privacidad son protagonistas.',
      buttonText: 'Visitar La Montaña',
      whatsappMessage: 'Hola, me gustaría coordinar una visita para conocer La Montaña en persona.'
    },
    {
      title: 'Hablemos sobre tu inversión',
      description: 'Hay opciones de financiación para vos.',
      buttonText: 'Consultar formas de pago',
      whatsappMessage: 'Hola, quisiera consultar por las opciones de financiación y formas de pago.'
    },
    {
      title: 'Agendá una visita al predio',
      description: 'Experimentá en persona la exclusividad de La Montaña, donde la naturaleza y la privacidad son protagonistas.',
      buttonText: 'Coordinar visita',
      whatsappMessage: 'Hola, me gustaría coordinar una visita para experimentar La Montaña en persona.'
    }
  ];

  const images = items.filter(i => i.type === 'image');
  const videos = items.filter(i => i.type === 'video');

  const IMAGES_PER_BLOCK = 6;
  const blocks = [];
  
  let imgIndex = 0;
  let vidIndex = 0;
  let blockIndex = 0;

  while(imgIndex < images.length || vidIndex < videos.length) {
      const blockImages = images.slice(imgIndex, imgIndex + IMAGES_PER_BLOCK);
      
      let blockVideos = [];
      if (blockIndex === 0) {
        if (vidIndex < videos.length) {
            blockVideos.push(videos[vidIndex]);
            vidIndex += 1;
        }
      } else {
        if (vidIndex < videos.length) {
            blockVideos.push(videos[vidIndex]);
            vidIndex += 1;
        }
        if (vidIndex < videos.length) {
            blockVideos.push(videos[vidIndex]);
            vidIndex += 1;
        }
      }
      
      blocks.push({ images: blockImages, videos: blockVideos });
      
      imgIndex += IMAGES_PER_BLOCK;
      blockIndex += 1;
  }

  return (
    <section className="pt-[12px] pb-[12px]" id="galeria">
      <div className="bg-[#0a0a09] w-full py-16 md:py-24">
        <div className="w-full px-4 md:px-[5vw]">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <ScrollReveal variant="fadeUp">
              <h2 className="text-[32px] md:text-[48px] font-normal text-heading leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                Nuestra Galería
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="w-10 h-px bg-[var(--color-brand)] flex-shrink-0" />
                <p className="text-[14px] md:text-[16px] font-medium text-[var(--color-brand)] uppercase tracking-[0.15em]">
                  Explora La Montaña
                </p>
                <span className="w-10 h-px bg-[var(--color-brand)] flex-shrink-0" />
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-16">
            <Gallery options={{ bgOpacity: 0.95, padding: { top: 80, bottom: 80, left: 20, right: 20 } }}>
              {blocks.map((block, idx) => (
                <div key={idx} className="space-y-8 md:space-y-12">
                  
                  {/* 1. Bloque de Fotos (6 por bloque) */}
                  {block.images.length > 0 && (
                    <ScrollReveal variant="fadeUp">
                      <div className="rounded-none md:rounded-[20px] overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[5px]">
                            {block.images.map((image, i) => (
                              <Item key={i} original={image.src} thumbnail={image.src} width="1920" height="1280">
                                {({ ref, open }) => (
                                  <div
                                    ref={ref}
                                    onClick={open}
                                    className="relative group cursor-pointer overflow-hidden bg-[#141412] aspect-[3/2]"
                                  >
                                    <Image
                                      src={image.src}
                                      alt={`La Montaña - foto`}
                                      fill
                                      quality={95}
                                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                      loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 ease-in-out pointer-events-none" />
                                  </div>
                                )}
                              </Item>
                            ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  )}

                  {/* 2. Bloque de Video */}
                  {block.videos && block.videos.length > 0 && (
                    <ScrollReveal variant="fadeUp">
                      <div className={`grid gap-4 md:gap-5 ${block.videos.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                        {block.videos.map((vid, vIdx) => (
                          <div key={vIdx} className="rounded-none md:rounded-[20px] overflow-hidden bg-black shadow-2xl relative group">
                            <video 
                              src={`${vid.src}#t=0.001`} 
                              controls 
                              preload="metadata"
                              controlsList="nodownload"
                              className="w-full h-auto max-h-[80vh] object-contain md:object-cover aspect-video" 
                            />
                          </div>
                        ))}
                      </div>
                    </ScrollReveal>
                  )}

                  {/* 3. CTA */}
                  {(() => {
                    const cta = CTA_VARIANTS[idx % CTA_VARIANTS.length];
                    const waUrl = `https://wa.me/5493571541588?text=${encodeURIComponent(cta.whatsappMessage)}`;
                    
                    return (
                      <ScrollReveal variant="fadeUp">
                        <div className="bg-[#141412] border border-white/5 rounded-none md:rounded-[20px] p-8 md:p-16 my-8 flex flex-col items-center justify-center text-center">
                            <span className="w-10 h-px bg-[var(--color-brand)] mb-6" />
                            <h3 className="text-2xl md:text-4xl font-normal text-heading leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                              {cta.title}
                            </h3>
                            <p className="text-white/60 mb-8 max-w-lg">
                              {cta.description}
                            </p>
                            <a 
                              href={waUrl} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center h-[52px] px-8 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white rounded-[6px] text-sm font-bold uppercase tracking-[0.06em] transition-all duration-200 shadow-lg shadow-[var(--color-brand)]/30 hover:-translate-y-1"
                            >
                               {cta.buttonText}
                            </a>
                        </div>
                      </ScrollReveal>
                    );
                  })()}

                </div>
              ))}
            </Gallery>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullLandingGallery;
