'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Gallery, Item } from 'react-photoswipe-gallery';

import { useTranslations } from 'next-intl';

const GeneralGallery = ({ items = [] }) => {
  const t = useTranslations('GaleriaPage');

  if (items.length === 0) return null;

  const images = items.filter(i => i.type === 'image');
  const videos = items.filter(i => i.type === 'video');

  // We chunk the images into groups to mix with videos and CTAs
  const IMAGES_PER_BLOCK = 12;
  const blocks = [];
  
  let imgIndex = 0;
  let vidIndex = 0;

  while(imgIndex < images.length || vidIndex < videos.length) {
      const blockImages = images.slice(imgIndex, imgIndex + IMAGES_PER_BLOCK);
      const blockVideo = videos[vidIndex] || null;
      
      blocks.push({ images: blockImages, video: blockVideo });
      
      imgIndex += IMAGES_PER_BLOCK;
      vidIndex += 1;
  }

  return (
    <div className="space-y-16">
      <Gallery options={{ bgOpacity: 0.95, padding: { top: 80, bottom: 80, left: 20, right: 20 } }}>
        {blocks.map((block, idx) => (
          <div key={idx} className="space-y-4 md:space-y-6">
            
            {/* 1. Bloque de Fotos */}
            {block.images.length > 0 && (
              <section className="rounded-none md:rounded-[20px] overflow-hidden mx-[-16px] md:mx-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[5px]">
                    {block.images.map((image, i) => (
                      <Item key={i} original={image.src} thumbnail={image.src} width="1920" height="1280">
                        {({ ref, open }) => (
                          <div
                            ref={ref}
                            onClick={open}
                            className="relative group cursor-pointer overflow-hidden bg-[#141412] h-[180px] sm:h-[220px]"
                          >
                            <Image
                              src={image.src}
                              alt={`La Montaña - foto`}
                              fill
                              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 ease-in-out pointer-events-none" />
                          </div>
                        )}
                      </Item>
                    ))}
                </div>
              </section>
            )}

            {/* 2. Bloque de Video (Separador dinámico) */}
            {block.video && (
              <div className="rounded-none md:rounded-[20px] overflow-hidden mx-[-16px] md:mx-0 bg-black shadow-2xl relative group">
                <video 
                  src={`${block.video.src}#t=0.001`} 
                  controls 
                  preload="metadata"
                  controlsList="nodownload"
                  className="w-full h-auto max-h-[70vh] object-contain md:object-cover aspect-video" 
                />
              </div>
            )}

            {/* 3. Bloque Call To Action (cada cierto intervalo) */}
            {(idx === 0 || idx === 2) && (
              <div className="bg-[#141412] border border-white/5 rounded-none md:rounded-[20px] p-10 md:p-16 my-8 mx-[-16px] md:mx-0 flex flex-col items-center justify-center text-center">
                  <span className="w-10 h-px bg-[var(--color-brand)] mb-6" />
                  <h3 className="text-2xl md:text-4xl font-normal text-heading leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {idx === 0 ? t('cta1Title') : t('cta2Title')}
                  </h3>
                  <p className="text-white/60 mb-8 max-w-lg">
                    {idx === 0 
                      ? t('cta1Text') 
                      : t('cta2Text')}
                  </p>
                  <a 
                    href="https://wa.me/5493547563911?text=Hola,%20vengo%20de%20la%20galer%C3%ADa%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20La%20Monta%C3%B1a" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[var(--color-brand)] text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                     {idx === 0 ? t('cta1Btn') : t('cta2Btn')}
                  </a>
              </div>
            )}

          </div>
        ))}
      </Gallery>
    </div>
  );
};

export default GeneralGallery;
