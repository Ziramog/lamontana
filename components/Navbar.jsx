'use client';
import { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { usePathname } from '@/i18n/routing';
import { FaWhatsapp } from 'react-icons/fa';
import { generateWhatsAppLink, PHONE_NUMBER, PHONE_DISPLAY } from '@/utils/whatsapp';
import logo from '@/assets/images/logo-white.png';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Navbar = ({ contactEmail = 'roggeroroma@hotmail.com', contactPhone = '+54 9 3571 54-1588' }) => {
  const t = useTranslations('Navbar');
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [providers, setProviders] = useState(null);
  const [desktopDropdown, setDesktopDropdown] = useState(null);
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [mobileAdminOpen, setMobileAdminOpen] = useState(false);
  const dropdownTimeout = useRef(null);
  const pathname = usePathname();

  const openDropdown = (name) => {
    clearTimeout(dropdownTimeout.current);
    setDesktopDropdown(name);
  };
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDesktopDropdown(null), 200);
  };

  const isHomepage = pathname === '/';
  const isAdminPage = pathname.startsWith('/admin');
  const isGlassMode = isHomepage ? (isScrolled || isMobileMenuOpen) : true;
  const showIso = isScrolled || !isHomepage;

  if (pathname.startsWith('/p/')) return null;

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();

    const handleResize = () => setIsMobileMenuOpen(false);
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!desktopDropdown) return;
    const close = (e) => {
      if (!e.target.closest('.desktop-dropdown')) setDesktopDropdown(null);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [desktopDropdown]);

  return (
    <>
      {/* Desktop Nav — Senada-style */}
      <header
        className={`hidden md:block fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isGlassMode ? 'bg-[#141412] shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 8px) + 15px)', paddingBottom: '15px' }}
      >
        <div className="flex items-center px-4 md:px-[50px] h-full w-full">
          {/* Logo */}
          <Link className="flex items-center flex-shrink-0 group" href="/">
            <Image
              className="brightness-0 invert transition-all duration-500 group-hover:opacity-70"
              src='/logolamontaña.png'
              alt='La Montaña'
              width={400}
              height={120}
              style={{ height: (!isScrolled && isHomepage) ? '180px' : '60px', width: 'auto' }}
            />
          </Link>

          {/* Main Nav — Senada .mainMenu */}
          <nav className="desktop-dropdown flex items-center gap-8 lg:gap-10 ml-auto">
            <Link href="/#propiedades-destacadas" className="text-white hover:text-[var(--color-brand)] transition-colors text-[15px] font-normal tracking-[0.02em] uppercase">
              {t('destacados')}
            </Link>

            <Link href="/galeria" className="text-white hover:text-[var(--color-brand)] transition-colors text-[15px] font-normal tracking-[0.02em] uppercase">
              {t('galeria')}
            </Link>

            <Link href="/#masterplan" className="text-white hover:text-[var(--color-brand)] transition-colors text-[15px] font-normal tracking-[0.02em] uppercase">
              {t('verLotes')}
            </Link>

            <Link href="/#nuestra-historia" className="text-white hover:text-[var(--color-brand)] transition-colors text-[15px] font-normal tracking-[0.02em] uppercase">
              {t('historia')}
            </Link>

            {session && (
              <Link href="/admin" className="text-white hover:text-[var(--color-brand)] transition-colors text-[15px] font-normal tracking-[0.02em] uppercase">
                {t('panel')}
              </Link>
            )}
          </nav>

          {/* Side Nav — Senada .sideMenu: Phone | Search | Show More */}
          <div className="desktop-dropdown flex items-center gap-4 ml-8">
            <LanguageSwitcher variant={isGlassMode ? 'switch' : 'minimal'} />
            
            {/* Phone → WhatsApp */}
            <a href={`https://wa.me/${contactPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors" aria-label="WhatsApp">
              <img src="/senada/images/icons/ico_phone.svg" alt="Teléfono" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
            </a>

          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isGlassMode ? 'bg-[#141412]' : 'bg-transparent'
        }`}
        style={{ height: 'calc(env(safe-area-inset-top, 8px) + 60px)' }}
      >
        <div className="flex items-center justify-between px-4 h-full relative">
          
          {/* Spacer to maintain flex layout when logo is absolute */}
          <div className={`transition-all duration-500 ${(!isScrolled && isHomepage) ? 'w-[40px]' : 'hidden'}`} />

          {/* Logo — isotipo */}
          <Link 
            className={`flex items-center flex-shrink-0 transition-all duration-500 z-10 ${
              (!isScrolled && isHomepage) 
                ? 'absolute left-1/2 -translate-x-1/2 top-[40px]' 
                : 'relative left-0 translate-x-0 top-0'
            }`} 
            href="/"
          >
            <Image
              className={`brightness-0 invert transition-all duration-500 ${(!isScrolled && isHomepage) ? 'origin-top' : 'origin-left'}`}
              src="/logolamontaña.png"
              alt="La Montaña"
              width={600}
              height={200}
              style={{ 
                height: (!isScrolled && isHomepage) ? 'clamp(80px, 15vh, 154px)' : '44px', 
                width: 'auto',
                maxWidth: (!isScrolled && isHomepage) ? '85vw' : 'none',
                objectFit: 'contain'
              }}
            />
          </Link>

          {/* Hamburger / Close — senada style */}
          <div className="flex items-center gap-5">
            <LanguageSwitcher variant={isGlassMode ? 'switch' : 'minimal'} />

            {/* Hamburger / Close — senada style */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`rButton w-8 h-8 flex items-center justify-center ${isMobileMenuOpen ? 'active' : ''}`}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile fullscreen overlay — Wolfim style */}
        <div
          className="md:hidden fixed inset-0 z-[120] flex flex-col overflow-x-hidden"
          style={{
            background: 'var(--color-brand)',
            padding: 'calc(env(safe-area-inset-top, 8px) + 80px) 24px calc(20px + env(safe-area-inset-bottom, 0px))',
            overflowY: 'auto',
            clipPath: isMobileMenuOpen ? 'inset(0px 0px 0px 0px)' : 'inset(0px 0px 100% 100%)',
            transition: isMobileMenuOpen 
              ? 'clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1)' 
              : 'clip-path 0.65s cubic-bezier(0.77, 0, 0.175, 1)',
            pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          }}
        >
          {/* Close button inside overlay */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-[calc(env(safe-area-inset-top,8px)+20px)] right-[20px] w-10 h-10 flex items-center justify-center text-black/60 hover:text-black hover:rotate-90 transition-all duration-300 z-10"
            aria-label="Cerrar menú"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-8 h-8">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <nav className="flex-1 flex flex-col px-0 mt-4">
            {/* Destacadas */}
            <Link href="/#propiedades-destacadas" className={`block text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.2s' }} onClick={() => setIsMobileMenuOpen(false)}>
              <span className="opacity-50 mr-3 text-[22px]">/</span>{t('destacados')}
            </Link>

            {/* Galería */}
            <Link href="/galeria" className={`block text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.22s' }} onClick={() => setIsMobileMenuOpen(false)}>
              <span className="opacity-50 mr-3 text-[22px]">/</span>{t('galeria')}
            </Link>

            {/* Ver Lotes */}
            <Link href="/#masterplan" className={`block text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.25s' }} onClick={() => setIsMobileMenuOpen(false)}>
              <span className="opacity-50 mr-3 text-[22px]">/</span>{t('verLotes')}
            </Link>

            {/* SOBRE NOSOTROS */}
            <Link href="/#nuestra-historia" className={`block text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.3s' }} onClick={() => setIsMobileMenuOpen(false)}>
              <span className="opacity-50 mr-3 text-[22px]">/</span>{t('historia')}
            </Link>

            {/* PANEL DE CONTROL */}
            {session && (
              <Link href="/admin" className={`block text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.35s' }} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="opacity-50 mr-3 text-[22px]">/</span>{t('panel')}
              </Link>
            )}

            {session && (
              <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className={`block w-full text-left text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.4s' }}>
                <span className="opacity-50 mr-3 text-[22px]">/</span>{t('salir')}
              </button>
            )}
          </nav>

          {/* Social icons at bottom */}
          <div className={`flex-shrink-0 pt-8 pb-4 ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ animationDelay: '0.5s' }}>
            <ul className="flex items-center justify-center gap-3 flex-wrap max-w-full mx-auto px-2">
              <li>
                <a href={`tel:${contactPhone.replace(/\D/g, '')}`} className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/10 hover:bg-black/20 transition-colors duration-300" aria-label="Llamar">
                  <img src="/senada/images/icons/ico_phone.svg" alt="phone" className="w-5 h-5" style={{ filter: 'brightness(0)' }} />
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`} className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/10 hover:bg-black/20 transition-colors duration-300" aria-label="Email">
                  <img src="/senada/images/icons/ico_mail.svg" alt="email" className="w-5 h-5" style={{ filter: 'brightness(0)' }} />
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${contactPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/10 hover:bg-black/20 transition-colors duration-300" aria-label="WhatsApp">
                  <FaWhatsapp className="text-black text-[22px]" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/roggeroyroma" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/10 hover:bg-black/20 transition-colors duration-300" aria-label="Instagram">
                  <img src="/senada/images/icons/ico_instagram.svg" alt="instagram" className="w-5 h-5" style={{ filter: 'brightness(0)' }} />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/roggeroyroma" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/10 hover:bg-black/20 transition-colors duration-300" aria-label="Facebook">
                  <img src="/senada/images/icons/ico_facebook.svg" alt="facebook" className="w-5 h-5" style={{ filter: 'brightness(0)' }} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    {/* CSS for hamburger animation — senada style */}
      <style jsx>{`
        .rButton .hamburger span {
          display: block;
          width: 25px;
          height: 3px;
          background: #fff;
          border-radius: 3px;
          margin: 5px 0;
          position: relative;
          transition: all 0.3s ease;
        }
        .rButton.active .hamburger span:nth-child(1) {
          top: 8px;
          transform: rotate(135deg);
        }
        .rButton.active .hamburger span:nth-child(2) {
          opacity: 0;
          transform: translateX(-30px);
        }
        .rButton.active .hamburger span:nth-child(3) {
          width: 25px;
          margin: unset;
          top: -8px;
          transform: rotate(-135deg);
        }
        .mobile-item {
          opacity: 0;
          transform: translateY(20px);
          animation: mobileFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes mobileFadeIn {
          to { opacity: 1; transform: translateY(0); }
        }
        /* Desktop dropdown animation — Senada .top_level */
        .desktop-dropdown ul {
          animation: dropdownFade 0.2s ease-out;
        }
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
