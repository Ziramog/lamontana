'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function GoogleAnalytics({ analyticsId, facebookPixelId }) {
  const pathname = usePathname();

  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const hostname = window.location.hostname;
    // Permitimos dominios de vercel para que no explote en las vistas previas, y dominios reales
    const allowedHosts = ['localhost', 'lamontaña.lat', 'www.lamontaña.lat', 'xn--lamontaa-j3a.lat', 'www.xn--lamontaa-j3a.lat'];
    
    // Si queremos habilitarlo también en vercel:
    if (hostname.includes('vercel.app') || allowedHosts.includes(hostname)) {
      setIsAllowed(true);
      
      // Track Google Analytics page views
      if (analyticsId && window.gtag) {
        window.gtag('config', analyticsId, {
          page_path: pathname,
        });
      }

      // Track Facebook Pixel page views
      if (facebookPixelId && window.fbq) {
        window.fbq('track', 'PageView');
      }
    }
  }, [pathname, analyticsId, facebookPixelId]);

  if (!isAllowed) return null;

  return (
    <>
      {/* Google Analytics */}
      {analyticsId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analyticsId}', {
                  page_path: window.location.pathname,
                  send_page_view: true,
                });
              `,
            }}
          />
        </>
      )}

      {/* Facebook Pixel */}
      {facebookPixelId && (
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${facebookPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </>
  );
}
