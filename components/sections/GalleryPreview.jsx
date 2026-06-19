import Link from 'next/link';
import Image from 'next/image';

const GalleryPreview = ({ items = [] }) => {
  // Prioritize some known good images if possible, otherwise just take the first 3 images
  const images = items.filter(i => i.type === 'image');
  
  // Try to pick specific images for a better preview if they exist
  let selected = [];
  const findImg = (name) => images.find(i => i.filename === name);
  
  const preferred = [
    findImg('presa.jpeg'),
    findImg('perorio .jpeg'),
    findImg('entrada.jpeg')
  ];

  if (preferred[0] && preferred[1] && preferred[2]) {
    selected = preferred;
  } else {
    selected = images.slice(0, 3);
  }

  if (selected.length < 3) return null; // Not enough images to render the grid

  return (
    <section className="py-16 md:py-24 bg-[#0a0a09]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-[50px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <h2 className="text-[28px] md:text-[40px] font-normal text-heading leading-tight mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Entorno y Paisajes
            </h2>
            <div className="flex items-center gap-3">
              <span className="w-7 h-px bg-[var(--color-brand)] flex-shrink-0" />
              <p className="text-[13px] md:text-[15px] font-medium text-[var(--color-brand)] uppercase tracking-[0.15em]">
                LA NATURALEZA EN SU MÁXIMA EXPRESIÓN
              </p>
            </div>
          </div>
          <Link 
            href="/galeria" 
            className="inline-block text-[var(--color-brand)] text-[13px] font-bold uppercase tracking-wider transition-all duration-200 hover:underline underline-offset-4 decoration-[var(--color-brand)] pb-1"
          >
            EXPLORAR GALERÍA COMPLETA
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
          {/* Main Large Image */}
          <Link href="/galeria" className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl block">
            <Image 
              src={selected[0].src} 
              alt="La Montaña" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
          </Link>

          {/* Top Right Image */}
          <Link href="/galeria" className="relative group overflow-hidden rounded-xl block">
            <Image 
              src={selected[1].src} 
              alt="La Montaña" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
          </Link>

          {/* Bottom Right Image */}
          <Link href="/galeria" className="relative group overflow-hidden rounded-xl block">
            <Image 
              src={selected[2].src} 
              alt="La Montaña" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="bg-[var(--color-brand)] text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                 Ver más
               </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
