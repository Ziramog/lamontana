'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher({ variant = 'minimal' }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    // router.replace will keep the current pathname but change the locale
    router.replace(pathname, { locale: nextLocale });
  };

  if (variant === 'minimal') {
    return (
      <button 
        onClick={toggleLanguage}
        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-[12px] font-normal tracking-[0.15em] uppercase"
      >
        <span className={locale === 'es' ? 'text-[var(--color-brand)] font-medium' : 'opacity-50 transition-opacity'}>ES</span>
        <span className="w-[1px] h-3 bg-white/30"></span>
        <span className={locale === 'en' ? 'text-[var(--color-brand)] font-medium' : 'opacity-50 transition-opacity'}>EN</span>
      </button>
    );
  }

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center gap-2 bg-[#1a1a1a]/60 hover:bg-[#252525]/80 backdrop-blur-md border border-white/10 rounded-[6px] p-1 transition-colors"
      aria-label="Cambiar idioma"
    >
      <svg className="w-4 h-4 ml-1.5 text-[var(--color-brand)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
        <path d="M2 12H22"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"/>
      </svg>
      <div className="relative flex items-center bg-black/40 rounded-[4px] p-0.5">
        <span className={`relative z-10 w-[26px] py-1 text-center text-[10px] font-bold tracking-widest transition-colors duration-300 ${locale === 'es' ? 'text-[var(--color-brand)]' : 'text-white/40'}`}>ES</span>
        <span className={`relative z-10 w-[26px] py-1 text-center text-[10px] font-bold tracking-widest transition-colors duration-300 ${locale === 'en' ? 'text-[var(--color-brand)]' : 'text-white/40'}`}>EN</span>
      </div>
    </button>
  );
}
