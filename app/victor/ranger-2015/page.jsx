'use client';

export default function Ranger2015Page() {
  const whatsappUrl = "https://wa.me/5493571541588?text=Hola%20Victor%2C%20quiero%20consultar%20por%20la%20Ford%20Ranger%20XLT%204x4%20AT%203.2%20modelo%202015";

  const handleWhatsappClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'whatsapp_click_victor_ranger_2015');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-24 md:pb-0 font-sans">
      {/* Header / Hero */}
      <header className="w-full max-w-4xl mx-auto bg-white shadow-sm overflow-hidden md:mt-10 md:rounded-2xl">
        <div className="relative w-full bg-black">
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10 bg-green-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-md shadow-lg">
            Oportunidad
          </div>
          
          {/* Main Image */}
          <div className="w-full relative flex justify-center items-center bg-gray-900">
            <img 
              src="/victor/ranger-2015.png" 
              alt="Ford Ranger XLT 4x4 AT 3.2 2015"
              className="w-full h-auto object-contain max-h-[60vh] md:max-h-[75vh]"
            />
          </div>
        </div>

        <div className="p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-heading font-bold text-gray-900 leading-tight mb-2">
            Ford Ranger XLT 4x4 AT 3.2 — Modelo 2015
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium mb-6">
            194.541 km reales · Automática · 4x4 · Lista para transferir
          </p>
          
          <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
            Camioneta robusta, confiable y en excelente estado general. Ideal para trabajo y familia. Consultas directas por WhatsApp con Victor.
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 border-t border-gray-200 pt-8">
            <div className="flex items-start">
              <span className="font-semibold text-gray-900 w-36 shrink-0">Modelo:</span>
              <span className="text-gray-700">2015</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-gray-900 w-36 shrink-0">Versión:</span>
              <span className="text-gray-700">Ford Ranger XLT 4x4 AT 3.2</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-gray-900 w-36 shrink-0">Kilometraje:</span>
              <span className="text-gray-700">194.541 km reales</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-gray-900 w-36 shrink-0">Motor:</span>
              <span className="text-gray-700">3.2 Diesel</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-gray-900 w-36 shrink-0">Transmisión:</span>
              <span className="text-gray-700">Automática</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-gray-900 w-36 shrink-0">Tracción:</span>
              <span className="text-gray-700">4x4</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-gray-900 w-36 shrink-0">Estado:</span>
              <span className="text-gray-700">Excelente estado general</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-gray-900 w-36 shrink-0">Documentación:</span>
              <span className="text-gray-700">Lista para transferir</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-gray-900 w-36 shrink-0">Modalidad:</span>
              <span className="text-gray-700 font-medium text-green-700">Trato directo con dueño</span>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex flex-col sm:flex-row gap-4 mt-8">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsappClick}
              data-cta="whatsapp-victor-ranger"
              data-campaign="victor-ranger-2015"
              className="flex-1 bg-[#25D366] hover:bg-[#20b858] text-white text-center font-bold py-4 px-6 rounded-xl shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center text-lg gap-2"
            >
              {/* WhatsApp Icon */}
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Consultar por WhatsApp
            </a>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 text-center font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center text-lg gap-2"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Coordinar para verla
            </a>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto p-6 text-center text-sm text-gray-500 mt-4 md:mb-12">
        Publicación gestionada por Wolfim. Operación y consultas directas con el dueño.
      </footer>

      {/* Mobile Sticky Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)] z-50">
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsappClick}
          data-cta="whatsapp-victor-ranger"
          data-campaign="victor-ranger-2015"
          className="w-full bg-[#25D366] text-white text-center font-bold py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center text-[17px] active:scale-[0.98] transition-transform gap-2"
        >
          {/* WhatsApp Icon */}
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
