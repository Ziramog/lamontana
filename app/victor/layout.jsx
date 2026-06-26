import { Cinzel, Montserrat } from 'next/font/google';
import '@/assets/styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata = {
  title: 'Ford Ranger XLT 4x4 AT 3.2 2015 | Trato directo con dueño',
  description: 'Ford Ranger XLT 4x4 AT 3.2 modelo 2015. 194.541 km reales, automática, 4x4, motor 3.2 Diesel y lista para transferir. Consultas directas por WhatsApp con Victor.',
  openGraph: {
    title: 'Ford Ranger XLT 4x4 AT 3.2 2015',
    description: '194.541 km reales · Automática · 4x4 · Lista para transferir · Trato directo con dueño',
    images: ['/victor/ranger-2015.png'],
  },
};

export default function VictorLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased text-body bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
