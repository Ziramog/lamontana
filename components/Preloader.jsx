'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for document to be fully loaded, plus a small delay for visual effect
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 1s minimum delay to show the "Cargando experiencia"
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#141412] transition-opacity duration-700 ${
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="animate-pulse flex flex-col items-center">
        <Image
          src="/logolamontaña.png"
          alt="La Montaña"
          width={400}
          height={150}
          className="brightness-0 invert mb-6"
          style={{ width: 'auto', height: '120px', objectFit: 'contain' }}
          priority
        />
        <p
          className="text-[#C49A4A] text-[13px] font-bold uppercase tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Cargando experiencia...
        </p>
      </div>
    </div>
  );
};

export default Preloader;
