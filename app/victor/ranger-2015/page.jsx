'use client';
import { useState } from 'react';

export default function Ranger2015Page() {
  const whatsappUrl = "https://wa.me/5493571541588?text=Hola%20Victor%2C%20quiero%20consultar%20por%20la%20Ford%20Ranger%20XLT%204x4%20AT%203.2%20modelo%202015";

  const images = [
    { src: '/victor/costado.jpeg', alt: 'Lateral' },
    { src: '/victor/frente.jpeg', alt: 'Frente' },
    { src: '/victor/interior.jpeg', alt: 'Interior' },
    { src: '/victor/velocimetro.jpeg', alt: 'Tablero' },
    { src: '/victor/motor.jpeg', alt: 'Motor' },
    { src: '/victor/interior2.jpeg', alt: 'Interior plazas' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleWhatsappClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click_victor_ranger_2015');
    }
  };

  const WhatsappIcon = () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-gray-900 overflow-hidden font-sans">
      
      {/* LEFT / TOP: Image Gallery Area (Takes up majority of space) */}
      <div className="relative flex-1 flex flex-col bg-black overflow-hidden h-[47dvh] md:h-full">
        {/* Main Image Viewer */}
        <div 
          className="flex-1 relative flex items-center justify-center overflow-hidden cursor-pointer group bg-[#0a0a0a]"
          onClick={() => setIsZoomed(true)}
        >
          <img 
            src={images[activeIndex].src} 
            alt={images[activeIndex].alt}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
          {/* Enlarge Hint */}
          <div className="absolute top-4 right-4 bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="h-[90px] md:h-[110px] bg-gray-950 flex gap-2 p-3 overflow-x-auto items-center justify-start snap-x shrink-0" style={{ scrollbarWidth: 'none' }}>
          {images.map((img, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-full shrink-0 aspect-[4/3] rounded-md overflow-hidden snap-center transition-all duration-300 ${activeIndex === idx ? 'ring-2 ring-white opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'opacity-40 hover:opacity-100'}`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT / BOTTOM: Info & CTA Area (Compact design to avoid scroll) */}
      <div className="w-full md:w-[420px] lg:w-[480px] bg-white h-[53dvh] md:h-full flex flex-col shrink-0 relative shadow-[-10px_0_20px_rgba(0,0,0,0.1)]">
        
        {/* Content area configured to fit without scroll */}
        <div className="flex-1 overflow-y-hidden p-3 md:p-6 flex flex-col justify-center pb-[85px] md:pb-6">
          
          <div>
            <h1 className="text-[22px] md:text-2xl font-heading font-extrabold text-gray-900 leading-tight mb-0.5">
              Ford Ranger XLT 4x4 AT 3.2
            </h1>
            <h2 className="text-base md:text-xl font-semibold text-gray-600 mb-1.5">
              Modelo 2015
            </h2>
            <p className="text-[12.5px] md:text-sm font-medium text-gray-500 mb-3 md:mb-5">
              194.541 km · Automática · 4x4 · Lista para transferir
            </p>
          </div>

          {/* Quick Specs Grid (Ultra Compact) */}
          <div className="grid grid-cols-2 gap-1.5 md:gap-3 mb-3 md:mb-5 bg-gray-50 p-2.5 md:p-4 rounded-xl border border-gray-100 text-[13px] md:text-sm">
            <div>
              <p className="text-gray-500 text-[11px] md:text-xs uppercase tracking-wide font-semibold">Kilometraje</p>
              <p className="font-bold text-gray-900 text-sm md:text-base">194.541 km</p>
            </div>
            <div>
              <p className="text-gray-500 text-[11px] md:text-xs uppercase tracking-wide font-semibold">Transmisión</p>
              <p className="font-bold text-gray-900 text-sm md:text-base">Automática</p>
            </div>
            <div>
              <p className="text-gray-500 text-[11px] md:text-xs uppercase tracking-wide font-semibold">Motor</p>
              <p className="font-bold text-gray-900 text-sm md:text-base">3.2 Diesel</p>
            </div>
            <div>
              <p className="text-gray-500 text-[11px] md:text-xs uppercase tracking-wide font-semibold">Tracción</p>
              <p className="font-bold text-gray-900 text-sm md:text-base">4x4</p>
            </div>
          </div>

          {/* Trust points */}
          <ul className="space-y-1 md:space-y-2 mb-2 text-[12.5px] md:text-[14px] text-gray-700 font-medium leading-snug">
            <li className="flex items-start gap-2">
              <span className="flex items-center justify-center w-4 h-4 mt-0.5 rounded-full bg-green-100 text-green-600 text-[10px] shrink-0">✓</span> 
              Documentación al día, lista para transferir
            </li>
            <li className="flex items-start gap-2">
              <span className="flex items-center justify-center w-4 h-4 mt-0.5 rounded-full bg-green-100 text-green-600 text-[10px] shrink-0">✓</span> 
              Excelente estado general
            </li>
          </ul>
          <div className="text-[12.5px] md:text-[14px] text-gray-600 font-medium pb-1 mt-1 leading-tight">
            <p>Consultas directas con Victor</p>
            <p className="font-bold text-gray-800">WhatsApp: +54 9 3571 54-1588</p>
          </div>
        </div>

        {/* CTA Button Fixed at bottom of the info panel */}
        <div className="absolute bottom-0 left-0 right-0 md:relative p-4 md:p-6 bg-white border-t border-gray-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] z-10 shrink-0">
          <div className="flex items-center justify-center gap-1.5 mb-2.5 md:mb-3">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-blue-600"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
             <span className="text-[11px] md:text-xs font-bold text-blue-700 uppercase tracking-wider">Trato directo con el dueño</span>
          </div>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
            data-cta="whatsapp-victor-ranger"
            data-campaign="victor-ranger-2015"
            className="w-full bg-[#25D366] hover:bg-[#20b858] text-white text-center font-bold py-3.5 md:py-4 px-6 rounded-xl shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] transition-transform transform active:scale-[0.98] flex items-center justify-center text-base md:text-lg gap-2"
          >
            <WhatsappIcon />
            Consultar por WhatsApp
          </a>
          <p className="text-center text-[10px] md:text-xs text-gray-400 mt-2.5 hidden md:block">
            Gestión publicitaria por Wolfim
          </p>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col animate-in fade-in duration-200">
          {/* Top bar */}
          <div className="flex justify-between items-center p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
            <span className="text-white/70 text-sm font-medium">{activeIndex + 1} / {images.length}</span>
            <button 
              onClick={() => setIsZoomed(false)} 
              className="text-white hover:text-gray-300 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          
          {/* Big Image Viewer */}
          <div className="flex-1 flex items-center justify-center overflow-hidden p-2 md:p-8" onClick={() => setIsZoomed(false)}>
            <img 
              src={images[activeIndex].src} 
              alt={images[activeIndex].alt}
              className="max-w-full max-h-full object-contain select-none shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Modal Thumbnails */}
          <div className="h-24 md:h-32 flex justify-center gap-2 p-4 bg-gradient-to-t from-black/80 to-transparent overflow-x-auto shrink-0 pb-6">
            {images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-full aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 ${activeIndex === idx ? 'ring-2 ring-white opacity-100 scale-105' : 'opacity-50 hover:opacity-100'}`}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
