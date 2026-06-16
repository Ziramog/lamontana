import connectDB from '@/config/database';
import SiteConfig from '@/models/SiteConfig';

export const getSiteConfig = async () => {
  // Always return static default config directly to avoid MongoDB dependency on Vercel
  return {
    heroTitle: 'Naturaleza, altura y privacidad.',
    heroSubtitle: 'a 7 km del Durazno de Yacanto',
    aboutTitle: 'La Montaña',
    aboutSubtitle: 'Loteo de montaña',
    aboutText: 'Aprendimos que vender tierra no es solamente ofrecer metros cuadrados. Es acompañar una decisión importante: elegir un lugar donde proyectar, invertir, descansar o construir una nueva etapa de vida.\n\nLa Montaña nace con esa mirada.\n\nUbicado 7 km arriba de El Durazno, en un entorno natural privilegiado, este loteo fue pensado para quienes buscan algo distinto: tranquilidad, paisaje serrano, aire puro y privacidad, sin resignar seguridad en la operación ni información clara sobre lo que están comprando.\n\nCada lote representa una oportunidad de conectar con la naturaleza y, al mismo tiempo, resguardar valor en una zona con identidad propia y alta proyección. No se trata de un loteo masivo, sino de una propuesta más reservada, para quienes entienden que ciertos lugares no se eligen solo por ubicación, sino por lo que transmiten.',
    footerDescription: 'En La Montaña te acompañamos en cada paso.',
    contactEmail: 'info@lamontana.com.ar',
    contactPhone: '+54 9 3547 563911',
    contactAddress: 'El Durazno, Córdoba',
    whatsappGroupLink: '',
    whatsappDefaultMessage: 'Hola, vengo desde la web...',
    analyticsId: 'G-PW4FH9WHQB',
    facebookPixelId: '',
  };
};
