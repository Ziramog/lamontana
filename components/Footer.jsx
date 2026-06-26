'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { generateWhatsAppLink, PHONE_NUMBER, PHONE_DISPLAY } from '@/utils/whatsapp';

const Footer = ({ 
  footerDescription = 'En Roggero & Roma te acompañamos en cada paso. Nuestra experiencia asegura las mejores oportunidades del mercado inmobiliario.',
  contactEmail = 'roggeroroma@hotmail.com',
  contactPhone = '+54 9 3571 54-1588',
  contactAddress = 'Blvd. Carlos Pellegrini 710'
}) => {
  const currentYear = new Date().getFullYear();
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [groupLink, setGroupLink] = useState('#');
  const pathname = usePathname();
  const t = useTranslations('Navbar');

  if (pathname.startsWith('/p/')) {
    return null;
  }

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!whatsappNumber) return;
    if (typeof window !== 'undefined' && window.gtag) window.gtag('event', 'form_submit');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsappNumber }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.link) setGroupLink(data.link);
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="text-white" style={{ background: '#141412' }}>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="max-w-[1430px] mx-auto px-4 py-[35px]">
          {/* Top — 2-column */}
          <div className="flex justify-between flex-wrap">
            {/* Left: Logo + Address + Contact */}
            <div className="flex flex-col gap-1">
              <Link href="/" className="inline-block mb-10">
                <Image
                  src="/logolamontaña.png"
                  alt="La Montaña"
                  width={200}
                  height={100}
                  style={{ height: '100px', width: 'auto' }}
                  className="brightness-0 invert transition-opacity hover:opacity-80"
                />
              </Link>
                  <ul>
                    <li className="py-[5px]">
                      <a href={`https://maps.google.com/?q=${encodeURIComponent('32°10\'45.47"S 64°48\'35.01"W')}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-[5px] text-[13px] text-white/70 font-light hover:text-white transition-colors group" onClick={() => typeof window !== 'undefined' && window.gtag && window.gtag('event', 'click_maps', { component: 'footer', type: 'office_address' })}>
                        <MapPin className="w-4 h-4 text-[#C49A4A] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                        <span>
                          32°10&apos;45.47&quot;S 64°48&apos;35.01&quot;W
                        </span>
                      </a>
                    </li>
                  </ul>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-[5px] text-[13px] text-white font-light py-[5px] hover:text-white/70 transition-colors">
                <img src="/senada/images/icons/ico_mail.svg" alt="email" className="w-[17px] h-[17px]" style={{ filter: 'brightness(0) invert(1)' }} />
                {contactEmail}
              </a>
              <a href={`https://wa.me/${contactPhone.replace(/\D/g, '')}`} className="flex items-center gap-[5px] text-[13px] text-white font-light py-[5px] hover:text-white/70 transition-colors" onClick={() => typeof window !== 'undefined' && window.gtag && window.gtag('event', 'click_whatsapp', { component: 'footer' })}>
                <img src="/senada/images/icons/ico_phone.svg" alt="phone" className="w-[17px] h-[17px]" style={{ filter: 'brightness(0) invert(1)' }} />
                {contactPhone}
              </a>
            </div>

            {/* Right: Nav + Newsletter */}
            <div className="flex">
              {/* Footer nav — 3 columns */}
              <nav className="pr-[35px] md:pr-[75px]">
                <ul className="flex gap-[50px] md:gap-[100px]">
                  {/* GALERIA */}
                  <li>
                    <span className="block text-[15px] text-white uppercase font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      Galería
                    </span>
                    <ul>
                      <li>
                        <Link href="/#galeria" className="block text-[13px] text-white/70 font-light py-[5px] pr-[10px] hover:text-white transition-colors">
                          Ver Galería
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* EMPRESA */}
                  <li>
                    <span className="block text-[15px] text-white uppercase font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      LA MONTAÑA
                    </span>
                    <ul>
                      {[
                        { href: '/#nuestra-historia', label: 'Nuestra Historia' },
                      ].map(l => (
                        <li key={l.href}>
                          <Link href={l.href} className="block text-[13px] text-white/70 font-light py-[5px] pr-[10px] hover:text-white transition-colors">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  {/* DESTACADAS */}
                  <li>
                    <span className="block text-[15px] text-white uppercase font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      Destacados
                    </span>
                    <ul>
                      <li>
                        <Link href="/#propiedades-destacadas" className="block text-[13px] text-white/70 font-light py-[5px] pr-[10px] hover:text-white transition-colors">
                          Nuestra Selección
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>


            </div>
          </div>

          {/* Bottom — Border top + Copyright + Social + Wolfim */}
          <div className="flex items-center justify-between mt-[35px] pt-[35px] md:mt-[50px] md:pt-[50px] border-t-2 border-white/[0.1]">
            <p className="text-white text-[14px] uppercase font-bold">
              &copy; {currentYear} La Montaña <sup>TM</sup>
            </p>
            <ul className="flex items-center gap-[25px]">
              <li>
                <a href={`mailto:${contactEmail}`} className="flex items-center justify-center w-[40px] h-[40px] rounded-[9px] bg-white/[0.15] hover:bg-[var(--color-brand)] transition-all duration-300" aria-label="Email">
                  <img src="/senada/images/icons/ico_mail.svg" alt="email" className="w-[20px] h-[20px]" style={{ filter: 'brightness(0) invert(1)' }} />
                </a>
              </li>
              <li>
                <a href={generateWhatsAppLink({ context: 'general' })} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-[40px] h-[40px] rounded-[9px] bg-white/[0.15] hover:bg-[var(--color-brand)] transition-all duration-300" aria-label="WhatsApp" onClick={() => typeof window !== 'undefined' && window.gtag && window.gtag('event', 'click_whatsapp', { component: 'footer', context: 'general' })}>
                  <FaWhatsapp className="text-xl" />
                </a>
              </li>
            </ul>
            <p className="text-white/50 text-[14px] uppercase font-bold">
              Powered by{' '}
              <a href="https://www.wolfim.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white transition-colors">
                <Image
                  src="/images/wolfim studio white-Photoroom.png"
                  alt="Wolfim Studio"
                  width={80}
                  height={30}
                  style={{ height: '22px', width: 'auto' }}
                  className="opacity-50 hover:opacity-80 transition-opacity"
                />
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile — matches desktop structure, stacked */}
      <div className="block md:hidden">
        <div className="px-5 py-8">
          {/* Logo + Company info */}
          <div className="flex flex-col gap-2 mb-8">
            <Link href="/" className="inline-block">
              <Image
                src="/logolamontaña.png"
                alt="La Montaña"
                width={200}
                height={100}
                style={{ height: '55px', width: 'auto' }}
                className="brightness-0 invert transition-opacity hover:opacity-80"
              />
            </Link>
            <a href={`https://maps.google.com/?q=${encodeURIComponent('32°10\'45.47"S 64°48\'35.01"W')}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-[13px] text-white/60 font-light mt-3 hover:text-white transition-colors" onClick={() => typeof window !== 'undefined' && window.gtag && window.gtag('event', 'click_maps', { component: 'footer_mobile' })}>
              <MapPin className="w-4 h-4 text-[#C49A4A] mt-0.5 shrink-0" />
              <span>
                32°10&apos;45.47&quot;S 64°48&apos;35.01&quot;W
              </span>
            </a>
            <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-[13px] text-white font-light">
              <img src="/senada/images/icons/ico_mail.svg" alt="email" className="w-[17px] h-[17px]" style={{ filter: 'brightness(0) invert(1)' }} />
              {contactEmail}
            </a>
            <a href={`https://wa.me/${contactPhone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-[13px] text-white font-light">
              <img src="/senada/images/icons/ico_phone.svg" alt="phone" className="w-[17px] h-[17px]" style={{ filter: 'brightness(0) invert(1)' }} />
              {contactPhone}
            </a>
          </div>

          {/* Nav columns — stacked with headings */}
          <div className="flex flex-col gap-6 mb-8">
            {/* Galería */}
            <div>
              <span className="block text-[15px] text-white uppercase font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Galería</span>
              <div className="flex flex-col gap-y-1">
                <Link href="/#galeria" className="text-[13px] text-white/60 font-light py-[3px] hover:text-white transition-colors">
                  Ver Galería
                </Link>
              </div>
            </div>
            {/* Empresa */}
            <div>
              <span className="block text-[15px] text-white uppercase font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>LA MONTAÑA</span>
              <div className="grid grid-cols-2 gap-y-1">
                {[
                  { href: '/#nuestra-historia', label: 'Nuestra Historia' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="text-[13px] text-white/60 font-light py-[3px] hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
            {/* DESTACADAS */}
            <div>
              <span className="block text-[15px] text-white uppercase font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Destacados</span>
              <Link href="/#propiedades-destacadas" className="text-[13px] text-white/60 font-light py-[3px] hover:text-white transition-colors">
                Nuestra Selección
              </Link>
            </div>

          </div>

          {/* Copyright + Social + Powered by */}
          <div className="border-t border-white/[0.08] pt-6 flex flex-col items-center gap-4">
            <p className="text-[14px] text-white uppercase font-bold mb-2">
              &copy; {currentYear} La Montaña <sup>TM</sup>
            </p>
            <ul className="flex items-center gap-[25px]">
              <li>
                <a href={`mailto:${contactEmail}`} className="flex items-center justify-center w-[40px] h-[40px] rounded-[9px] bg-white/[0.15] hover:bg-[var(--color-brand)] transition-all duration-300" aria-label="Email">
                  <img src="/senada/images/icons/ico_mail.svg" alt="email" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
                </a>
              </li>
              <li>
                <a href={generateWhatsAppLink({ context: 'general' })} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-[40px] h-[40px] rounded-[9px] bg-white/[0.15] hover:bg-[var(--color-brand)] transition-all duration-300" aria-label="WhatsApp" onClick={() => typeof window !== 'undefined' && window.gtag && window.gtag('event', 'click_whatsapp', { component: 'footer', context: 'general' })}>
                  <FaWhatsapp className="text-xl" />
                </a>
              </li>
            </ul>
            <p className="text-[14px] text-white/40">
              Powered by{' '}
              <a href="https://www.wolfim.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                <Image
                  src="/images/wolfim studio white-Photoroom.png"
                  alt="Wolfim Studio"
                  width={80}
                  height={22}
                  style={{ height: '18px', width: 'auto' }}
                  className="opacity-60 inline-block align-middle"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
