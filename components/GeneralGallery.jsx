'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const GeneralGallery = ({ items = [] }) => {
  if (items.length === 0) return null;

  const images = items.filter(i => i.type === 'image');
  const videos = items.filter(i => i.type === 'video');

  return (
    <div className="space-y-12">
      {images.length > 0 && (
        <Gallery options={{ bgOpacity: 0.95, padding: { top: 80, bottom: 80, left: 20, right: 20 } }}>
          <section className="rounded-none md:rounded-[30px] overflow-hidden mx-[-16px] md:mx-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[5px]">
                {images.map((image, index) => (
                  <Item key={index} original={image.src} thumbnail={image.src} width="1920" height="1280">
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="relative group cursor-pointer overflow-hidden bg-[#141412] h-[150px] sm:h-[200px]"
                      >
                        <Image
                          src={image.src}
                          alt={`La Montaña - foto ${index + 1}`}
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
        </Gallery>
      )}

      {videos.length > 0 && (
        <div>
          <h2 className="text-[24px] md:text-[32px] font-normal text-heading leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Videos del Entorno
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div key={index} className="rounded-xl overflow-hidden bg-[#141412] shadow-lg">
                <video 
                  src={video.src} 
                  controls 
                  className="w-full h-auto max-h-[300px] object-cover" 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralGallery;
