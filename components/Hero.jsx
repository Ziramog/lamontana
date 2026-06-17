'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSearch, FaWhatsapp } from 'react-icons/fa';
import logSearch from '@/app/actions/logSearch';
import getTopSearches from '@/app/actions/getTopSearches';

const fullDesktopLabel = 'Ciudad, Localidad, Tipo de Inmueble y Palabra Clave';
const fullMobileLabel = 'Ciudad, Localidad, Tipo de Inmueble y Palabra Clave';

const Hero = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    operation: 'Venta',
    type: 'Todos',
    price: 'Cualquiera',
    term: '',
    bedrooms: '',
    baths: '',
  });
  const [showMore, setShowMore] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [maxH, setMaxH] = useState('0px');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [desktopFilterOpen, setDesktopFilterOpen] = useState(null);
  const [desktopFocus, setDesktopFocus] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);
  const [mobileValue, setMobileValue] = useState('');
  const [topSearches, setTopSearches] = useState([]);
  
  // Typewriter effect states
  const [desktopLabelText, setDesktopLabelText] = useState('');
  const [mobileLabelText, setMobileLabelText] = useState('');

  const filtersRef = useRef(null);
  const measuredRef = useRef(false);
  const videoRefs = useRef([]);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    getTopSearches().then(setTopSearches);
  }, []);

  // Control video playback for crossfading
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (idx === currentVideo) {
          vid.currentTime = 0;
          const playPromise = vid.play();
          if (playPromise !== undefined) {
            playPromise.catch(e => console.log('Autoplay prevented:', e));
          }
        } else {
          // Pause the inactive video after the crossfade transition finishes
          setTimeout(() => {
            if (vid) vid.pause();
          }, 1000);
        }
      }
    });
  }, [currentVideo]);

  // Typewriter effect for search labels
  useEffect(() => {
    let dIndex = 0;
    const dInterval = setInterval(() => {
      setDesktopLabelText(fullDesktopLabel.slice(0, dIndex));
      dIndex++;
      if (dIndex > fullDesktopLabel.length) clearInterval(dInterval);
    }, 40);

    let mIndex = 0;
    const mInterval = setInterval(() => {
      setMobileLabelText(fullMobileLabel.slice(0, mIndex));
      mIndex++;
      if (mIndex > fullMobileLabel.length) clearInterval(mInterval);
    }, 40);

    return () => {
      clearInterval(dInterval);
      clearInterval(mInterval);
    };
  }, []);

  // Mobile scroll lock when overlay is open
  useEffect(() => {
    if (showMore && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showMore]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (measuredRef.current) return;
    measuredRef.current = true;
    if (filtersRef.current) {
      setMaxH(`${filtersRef.current.scrollHeight}px`);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!openDropdown && !desktopFilterOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('[data-dropdown]') && !e.target.closest('.desktop-filter-drop')) {
        setOpenDropdown(null);
        setDesktopFilterOpen(null);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [openDropdown, desktopFilterOpen]);

  // Close expanded filters on Escape key (mobile)
  useEffect(() => {
    if (!showMore) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowMore(false);
        setDesktopFilterOpen(null);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [showMore]);

  const handleShowMoreToggle = () => {
    if (showMore) {
      setMaxH('0px');
      setShowMore(false);
    } else {
      if (filtersRef.current) {
        setMaxH(`${filtersRef.current.scrollHeight}px`);
      }
      setShowMore(true);
      // Smooth scroll to reveal expanded filters (Senada-style)
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        const searchContainer = filtersRef.current?.parentElement;
        if (searchContainer) {
          const offset = window.innerHeight * 0.55;
          const top = searchContainer.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.term && filters.term.trim()) {
      params.set('term', filters.term.trim());
      logSearch(filters.term.trim());
    }
    if (filters.type && filters.type !== 'Todos') {
      const typeMap = { 'Casas': 'Casa', 'Departamentos': 'Departamento', 'Terrenos': 'Terreno', 'Campos': 'Campo', 'Inmuebles Comerciales': 'Inmueble Comercial', 'Grandes Inversiones': 'Gran Inversión' };
      params.set('type', typeMap[filters.type] || filters.type);
    }
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms);
    if (filters.baths) params.set('baths', filters.baths);
    if (filters.price && filters.price !== 'Cualquiera') {
      const priceMap = { 'Hasta 150k': { min: 0, max: 150000 }, '150k-300k': { min: 150000, max: 300000 }, '+300k': { min: 300000, max: 999999999 } };
      const range = priceMap[filters.price];
      if (range) { params.set('minPrice', range.min); params.set('maxPrice', range.max); }
    }
    if (filters.operation && filters.operation !== 'Todos') params.set('operation', filters.operation === 'Venta' ? 'venta' : filters.operation === 'Alquiler' ? 'alquiler' : filters.operation);
    router.push(`/properties${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section className='relative h-[100dvh] min-h-[100dvh]'>
      {/* Background Video */}
      <div className='absolute inset-0 z-0 bg-black'>
        {['/hero0-trim.mp4', '/videohero.mp4', '/video_hero2.mp4'].map((src, idx) => (
          <video
            key={src}
            ref={el => videoRefs.current[idx] = el}
            src={src}
            muted
            playsInline
            onEnded={() => setCurrentVideo((prev) => (prev === 2 ? 1 : prev + 1))}
            className={`absolute w-full h-full object-cover block transition-opacity duration-1000 ${currentVideo === idx ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
            style={{ transitionDelay: currentVideo === idx ? '0ms' : '1000ms' }}
          />
        ))}
        <div
          className='absolute inset-0 z-10'
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 60%)',
          }}
        />
        <div className='absolute inset-0 z-10 pointer-events-none opacity-50' style={{ backgroundImage: 'url(/senada/images/overlay-pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '4px' }} />
      </div>

      {/* Content structured with Flexbox */}
      <div className='relative z-10 h-full flex flex-col justify-center items-center px-0'>
        
        {/* Mobile overlay: fixed, covers entire viewport (moved inside z-10 context) */}
        {showMore && (
          <div
            className='md:hidden fixed -inset-[100px] bg-black/60 transition-opacity duration-300 z-[40]'
            onClick={() => { setShowMore(false); setOpenDropdown(null); }}
            aria-hidden='true'
          />
        )}
          {/* Commercial Funnel Area */}
          <div className='w-full px-4 md:px-8 text-center flex flex-col items-center transition-all duration-500 shrink-0 translate-y-[8vh] md:translate-y-[15vh] relative z-[30] max-w-5xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex flex-col items-center w-full"
            >
              {/* Microcopy Context */}
              <span className="hidden md:flex text-white/80 text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] mb-4 md:mb-6 items-center gap-3">
                <span className="w-8 h-px bg-white/30" />
                A 7 km de El Durazno
                <span className="w-8 h-px bg-white/30" />
              </span>

              {/* H1 Principal */}
              <h1 className='font-display font-normal text-white leading-[1.1] mb-5 md:mb-6 tracking-tight' style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
                Lotes de campo <br className="block md:hidden"/> en entorno serrano
              </h1>

              {/* Subtítulo Diferenciales */}
              <p className="text-white/90 font-light text-[15px] md:text-xl max-w-3xl leading-relaxed mb-10 md:mb-12 px-4 md:px-0">
                Agua de vertiente, costa de arroyo y forestación añosa<span className="hidden md:inline">, acceso interno a cada sector</span>.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6 w-full sm:w-auto mt-2 md:mt-0">
                <a href="#masterplan" className="bg-[var(--color-brand)] hover:bg-[#a37d36] text-white font-medium text-[13px] md:text-sm uppercase tracking-[0.15em] px-8 py-4 rounded-[2px] transition-all flex items-center justify-center w-full sm:w-auto shadow-lg shadow-black/20">
                  Ver lotes disponibles
                </a>
                <a href="https://wa.me/5493547563911" target="_blank" rel="noopener noreferrer" className="md:border border-white/20 hover:border-white/50 text-white/80 hover:text-white font-light text-[12px] md:text-[13px] uppercase tracking-[0.15em] px-4 md:px-8 py-3 md:py-4 rounded-[2px] transition-all flex items-center justify-center gap-3 w-full sm:w-auto mt-2 md:mt-0">
                  <FaWhatsapp className="text-[18px] text-white/60 md:text-white/70" />
                  Consultar por WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
          {/* Search Bar - Oculto por pedido del usuario */}
          <div className='hidden relative w-full z-[50] shrink-0 translate-y-[12vh] md:translate-y-[20vh]'>
            {/* Search form commented out */}
          </div>
          
          {/* Scroll indicator moving to absolute bottom */}
          {!scrolled && (
            <div className='absolute left-0 right-0 z-[50] bottom-[40px] flex justify-center scroll-indicator-container cursor-pointer' onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
              <div className="flex flex-col items-center gap-3">
                <span className="hidden md:block text-white/70 text-[11px] font-semibold uppercase tracking-[0.18em]">Descubrí La Montaña</span>
                <img
                  src='/senada/images/icons/ico_arrow-down.svg'
                  alt='scroll'
                  className='w-[30px] h-[30px] opacity-80'
                />
              </div>
            </div>
          )}
        {/* Old absolute scroll indicator removed */}
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .scroll-indicator-container {
          animation: scrollBounce 2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: no-preference) {
          .scroll-indicator-container {
            animation: scrollBounce 2s ease-in-out infinite;
          }
        }
      `}</style>

    </section>
  );
};

export default Hero;
