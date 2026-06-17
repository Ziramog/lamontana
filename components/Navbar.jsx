'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import { generateWhatsAppLink, PHONE_NUMBER, PHONE_DISPLAY } from '@/utils/whatsapp';
import logo from '@/assets/images/logo-white.png';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = ({ contactEmail = 'roggeroroma@hotmail.com', contactPhone = '+54 9 3547 563911' }) => {
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
  const showIso = isScrolled || isAdminPage;

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
              style={{ height: (!isScrolled && !isAdminPage) ? '180px' : '60px', width: 'auto' }}
            />
          </Link>

          {/* Main Nav — Senada .mainMenu */}
          <nav className="desktop-dropdown flex items-center gap-8 lg:gap-10 ml-auto">
            <Link href="/#propiedades-destacadas" className="text-white hover:text-[var(--color-brand)] transition-colors text-[15px] font-normal tracking-[0.02em] uppercase">
              LOTES DESTACADOS
            </Link>

              <div className="relative" onMouseEnter={() => openDropdown('props')} onMouseLeave={closeDropdown}>
                <button className="text-white hover:text-[var(--color-brand)] transition-colors text-[15px] font-normal tracking-[0.02em] uppercase">
                  VER LOTES
                </button>
                <svg className={`absolute left-1/2 -translate-x-1/2 w-[14px] h-[12px] transition-transform ${desktopDropdown === 'props' ? 'rotate-180' : ''}`}
                  style={{ top: 'calc(100% + 2px)', color: desktopDropdown === 'props' ? 'var(--color-brand)' : '#fff' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
                <div style={{
                  maxHeight: desktopDropdown === 'props' ? '500px' : '0',
                  opacity: desktopDropdown === 'props' ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease',
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', zIndex: 50,
                }}>
                  <ul className="bg-black rounded-[6px] min-w-[200px] text-center shadow-[0_8px_14px_-3px_rgba(255,255,255,0.1)] mt-2">
                    {[
                      { href: '/#masterplan', label: 'Sector Bosque' },
                      { href: '/#masterplan', label: 'Sector Altura' },
                      { href: '/#masterplan', label: 'Sector Arroyo' },
                      { href: '/#masterplan', label: 'Ver Masterplan Completo' },
                    ].map(item => (
                      <li key={item.label} className="border-b border-[#252525] last:border-b-0">
                        <Link href={item.href} className="block text-white text-[13px] px-5 py-[15px] font-normal uppercase tracking-wider hover:opacity-40">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            <Link href="/#nuestra-historia" className="text-white hover:text-[var(--color-brand)] transition-colors text-[15px] font-normal tracking-[0.02em] uppercase">
              NUESTRA HISTORIA
            </Link>

            {session && (
              <Link href="/admin" className="text-white hover:text-[var(--color-brand)] transition-colors text-[15px] font-normal tracking-[0.02em] uppercase">
                Panel de Control
              </Link>
            )}
          </nav>

          {/* Side Nav — Senada .sideMenu: Phone | Search | Show More */}
          <div className="desktop-dropdown flex items-center gap-4 ml-8">
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
          <div className={`transition-all duration-500 ${(!isScrolled && !isAdminPage) ? 'w-[40px]' : 'hidden'}`} />

          {/* Logo — isotipo */}
          <Link 
            className={`flex items-center flex-shrink-0 transition-all duration-500 z-10 ${
              (!isScrolled && !isAdminPage) 
                ? 'absolute left-1/2 -translate-x-1/2 top-[40px]' 
                : 'relative left-0 translate-x-0 top-0'
            }`} 
            href="/"
          >
            <Image
              className={`brightness-0 invert transition-all duration-500 ${(!isScrolled && !isAdminPage) ? 'origin-top' : 'origin-left'}`}
              src="/logolamontaña.png"
              alt="La Montaña"
              width={600}
              height={200}
              style={{ 
                height: (!isScrolled && !isAdminPage) ? '140px' : '40px', 
                width: 'auto',
                maxWidth: (!isScrolled && !isAdminPage) ? '85vw' : 'none',
                objectFit: 'contain'
              }}
            />
          </Link>

          {/* Hamburger / Close — senada style */}
          <div className="flex items-center gap-5">

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
          className="md:hidden fixed inset-x-0 z-[110] flex flex-col overflow-x-hidden"
          style={{
            background: 'var(--color-brand)',
            top: 'calc(env(safe-area-inset-top, 8px) + 60px)',
            height: 'calc(100dvh - env(safe-area-inset-top, 8px) - 60px)',
            padding: '40px 24px calc(20px + env(safe-area-inset-bottom, 0px))',
            overflowY: 'auto',
            clipPath: isMobileMenuOpen ? 'inset(0px 0px 0px 0px)' : 'inset(0px 0px 100% 100%)',
            transition: isMobileMenuOpen 
              ? 'clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1)' 
              : 'clip-path 0.65s cubic-bezier(0.77, 0, 0.175, 1)',
            pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
          }}
        >
          <nav className="flex-1 flex flex-col px-0 mt-4">
            {/* Destacadas */}
            <Link href="/#propiedades-destacadas" className={`block text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.2s' }} onClick={() => setIsMobileMenuOpen(false)}>
              <span className="opacity-50 mr-3 text-[22px]">/</span>Lotes Destacados
            </Link>

            {/* Propiedades — expandable */}
            <div className={`border-b border-black/[.08] ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ animationDelay: '0.25s' }}>
              <button
                  onClick={() => setMobileSubOpen(!mobileSubOpen)}
                  className="flex items-center justify-between w-full text-black text-[28px] uppercase tracking-wider py-[15px] hover:opacity-70 transition-opacity"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span><span className="opacity-50 mr-3 text-[22px]">/</span>Ver Lotes</span>
                <svg className={`w-6 h-6 text-black/60 transition-transform duration-300 ${mobileSubOpen ? 'rotate-90' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileSubOpen ? 'max-h-[300px] opacity-100 mb-3' : 'max-h-0 opacity-0'}`}>
                {[
                  { href: '/#masterplan', label: 'Sector Bosque' },
                  { href: '/#masterplan', label: 'Sector Altura' },
                  { href: '/#masterplan', label: 'Sector Arroyo' },
                  { href: '/#masterplan', label: 'Ver Masterplan Completo' },
                ].map(l => (
                    <Link key={l.label} href={l.href} className="block text-black/70 text-[18px] py-3 pl-8 hover:text-black transition-colors" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }} onClick={() => setIsMobileMenuOpen(false)}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* SOBRE NOSOTROS */}
            <Link href="/#nuestra-historia" className={`block text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.3s' }} onClick={() => setIsMobileMenuOpen(false)}>
              <span className="opacity-50 mr-3 text-[22px]">/</span>Nuestra Historia
            </Link>

            {/* PANEL DE CONTROL */}
            {session && (
              <Link href="/admin" className={`block text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.35s' }} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="opacity-50 mr-3 text-[22px]">/</span>Panel de control
              </Link>
            )}

            {session && (
              <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className={`block w-full text-left text-black text-[28px] uppercase tracking-wider py-[15px] border-b border-black/[.08] hover:opacity-70 transition-opacity ${isMobileMenuOpen ? 'mobile-item' : ''}`} style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.4s' }}>
                <span className="opacity-50 mr-3 text-[22px]">/</span>Salir
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
