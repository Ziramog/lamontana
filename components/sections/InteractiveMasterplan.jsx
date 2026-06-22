'use client';
import { useEffect, useState, useMemo, useRef } from 'react';
import { APIProvider, Map, useMap, Marker } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';
import SectionBox from '@/components/sections/SectionBox';
import ScrollReveal from '@/components/shared/ScrollReveal';
import lotsData from '@/data/lots.json';

import { useTranslations } from 'next-intl';

// Reusable Geometry component for @vis.gl/react-google-maps (supports Polygon and Polyline)
const Geometry = ({ type = 'Polygon', paths, options, onClick, onMouseOver, onMouseOut }) => {
  const map = useMap();
  const [shape, setShape] = useState(null);

  useEffect(() => {
    if (!map || !window.google) return;
    
    let geom;
    if (type === 'LineString') {
      geom = new window.google.maps.Polyline({
        path: paths,
        ...options,
        map
      });
    } else {
      geom = new window.google.maps.Polygon({
        paths,
        ...options,
        map
      });
    }

    if (onClick) geom.addListener('click', (e) => onClick(e, geom));
    if (onMouseOver) geom.addListener('mouseover', (e) => onMouseOver(e, geom));
    if (onMouseOut) geom.addListener('mouseout', (e) => onMouseOut(e, geom));

    setShape(geom);

    return () => {
      geom.setMap(null);
    };
  }, [map, paths, type]);

  useEffect(() => {
    if (shape) {
      shape.setOptions(options);
    }
  }, [shape, options]);

  return null;
};

// Center roughly around the polygons (based on Córdoba)
const defaultCenter = { lat: -32.1818, lng: -64.8093 };

// Animator to perform a Google Earth like fly-in on mount
const MapAnimator = ({ targetCenter, targetZoom }) => {
  const map = useMap();
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    if (!map || hasAnimated.current) return;
    
    hasAnimated.current = true;
    
    // We start zoomed out further (zoom 6: state/province level)
    map.setZoom(6);
    
    // Animate to target
    setTimeout(() => {
      map.panTo(targetCenter);
      
      let currentZoom = 6;
      const zoomInterval = setInterval(() => {
        if (currentZoom >= targetZoom) {
          clearInterval(zoomInterval);
          map.setZoom(targetZoom);
        } else {
          currentZoom += 0.25;
          map.setZoom(currentZoom);
        }
      }, 40);
    }, 800);
  }, [map, targetCenter, targetZoom]);
  
  return null;
};

const InteractiveMasterplan = ({ polygonsData }) => {
  const t = useTranslations('Masterplan');
  const [hoveredPoly, setHoveredPoly] = useState(null);
  const [selectedPoly, setSelectedPoly] = useState(null);
  const [infoWindowPos, setInfoWindowPos] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Generate map-ready polygons
  const mapPolygons = useMemo(() => {
    if (!polygonsData) return [];
    return polygonsData.map((item, index) => {
      const isHovered = hoveredPoly === index;
      const isSelected = selectedPoly === index;
      
      let nameLower = item.name.toLowerCase();
      
      let fillColor = '#ffffff'; 
      let fillOpacity = 0.1;
      let strokeColor = '#db7340'; 
      let strokeOpacity = 0.8;
      let strokeWeight = 1;
      let isDashed = false;
      let icons = undefined;
      
      let label = null;
      let center = null;

      // "lote" -> color según estado
      if (nameLower.includes('lote')) {
        const lotInfo = lotsData.find(l => l.name.toLowerCase() === item.name.toLowerCase());
        const isSold = lotInfo?.status === 'Vendido';

        fillColor = isSold ? '#ef4444' : '#C49A4A'; // Red if sold, Gold if available
        fillOpacity = 0.15;
        strokeColor = isSold ? '#ef4444' : '#C49A4A';
        strokeWeight = 1.5;
        
        // Extract lot number for the label
        const match = nameLower.match(/lote\s*(\d+)/i);
        if (match && item.type === 'Polygon') {
          label = match[1];
          let latSum = 0;
          let lngSum = 0;
          item.coords.forEach(c => { latSum += c.lat; lngSum += c.lng; });
          center = { lat: latSum / item.coords.length, lng: lngSum / item.coords.length };
        }
      }
      
      // Caminos exteriores -> amarillo intercalado, mas cuerpo
      if (nameLower.includes('durazno') || nameLower.includes('campo arriba') || nameLower.includes('montaña arriba')) {
        fillColor = '#eab308'; 
        fillOpacity = 0.15;
        strokeColor = '#eab308';
        strokeWeight = 4;
        isDashed = true;
      }
      
      // Caminos internos -> amarillo simple continuo
      if (nameLower.includes('camino interno') || nameLower === 'camino') {
        fillColor = '#eab308'; 
        fillOpacity = 0.15;
        strokeColor = '#eab308';
        strokeWeight = 3;
        isDashed = false;
      }
      
      // Arroyo -> celeste intercalado, mas cuerpo
      if (nameLower.includes('ruta sin t') || nameLower.includes('river') || nameLower.includes('rio')) {
        fillColor = '#38bdf8'; 
        fillOpacity = 0.15;
        strokeColor = '#38bdf8';
        strokeWeight = 4;
        isDashed = true;
      }

      if (isHovered || isSelected) {
        fillOpacity = 0.5;
        strokeOpacity = 1;
        strokeWeight = isDashed ? 6 : 3;
      }

      if (isDashed && item.type === 'LineString') {
        strokeOpacity = 0;
        icons = [{
          icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: isHovered || isSelected ? 1 : 0.8,
            strokeWeight: strokeWeight,
            strokeColor: strokeColor,
            scale: 2
          },
          offset: '0',
          repeat: '20px'
        }];
      }

      return {
        ...item,
        index,
        label,
        center,
        options: {
          fillColor,
          fillOpacity,
          strokeColor,
          strokeOpacity,
          strokeWeight,
          clickable: true,
          zIndex: isHovered ? 2 : 1,
          ...(icons ? { icons } : {})
        }
      };
    });
  }, [polygonsData, hoveredPoly, selectedPoly]);

  const handlePolyClick = (e, poly, item) => {
    setSelectedPoly(item.index);
    const lotInfo = lotsData.find(l => l.name.toLowerCase() === item.name.toLowerCase());
    setInfoWindowPos({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      name: item.name,
      ...lotInfo
    });
  };

  if (!API_KEY) {
    return (
      <section className="pt-[12px] pb-[12px]" id="masterplan">
        <SectionBox className="px-4 md:px-[50px] py-16 md:py-24">
          <div className="w-full relative overflow-hidden shadow-2xl flex items-center justify-center bg-gray-100" style={{ height: '70vh', minHeight: '500px' }}>
            <div className="text-center p-8">
              <h3 className="text-xl font-bold text-red-600 mb-2">{t('configError')}</h3>
              <p className="text-gray-700">{t('missingKey')}</p>
            </div>
          </div>
        </SectionBox>
      </section>
    );
  }

  return (
    <section className="pt-[12px] pb-[12px]" id="masterplan">
      <SectionBox className="px-4 md:px-[50px] py-16 md:py-24">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <ScrollReveal variant="fadeLeft">
            <h2 className="text-[28px] md:text-[40px] font-normal text-heading leading-tight mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('title')}
            </h2>
          </ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-7 h-px bg-[var(--color-brand)] flex-shrink-0" />
            <p className="text-[13px] md:text-[15px] font-medium text-[var(--color-brand)] uppercase tracking-[0.15em]">
              {t('subtitle')}
            </p>
            <span className="w-7 h-px bg-[var(--color-brand)] flex-shrink-0" />
          </div>

          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="inline-flex items-center justify-center gap-2 px-2 py-1">
              <MapPin className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white/40 font-mono text-xs md:text-[13px] tracking-widest">
                32°10'45.47"S 64°48'35.01"W
              </span>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="w-full relative overflow-hidden shadow-2xl" style={{ height: '70vh', minHeight: '500px' }}>
            <APIProvider apiKey={API_KEY} language="es" region="AR">
              <Map
                defaultZoom={16}
                defaultCenter={defaultCenter}
                mapTypeId="hybrid"
                mapId="masterplan_map"
                disableDefaultUI={true}
                zoomControl={true}
                fullscreenControl={true}
                gestureHandling="cooperative"
              >
                <MapAnimator targetCenter={defaultCenter} targetZoom={16} />
                {mapPolygons.map((p) => (
                  <Geometry
                    key={p.name}
                    type={p.type}
                    paths={p.coords}
                    options={p.options}
                    onMouseOver={() => setHoveredPoly(p.index)}
                    onMouseOut={() => setHoveredPoly(null)}
                    onClick={(e, geom) => handlePolyClick(e, geom, p)}
                  />
                ))}
                
                {mapPolygons.map((p) => {
                  if (p.label && p.center) {
                    return (
                      <Marker 
                        key={`marker-${p.name}`}
                        position={p.center}
                        label={{
                          text: p.label,
                          color: 'white',
                          fontWeight: 'bold',
                          fontSize: '14px'
                        }}
                        icon={{
                          path: (typeof window !== 'undefined' && window.google?.maps?.SymbolPath?.CIRCLE) ? window.google.maps.SymbolPath.CIRCLE : 0,
                          scale: 0,
                        }}
                        zIndex={10}
                        onClick={(e) => handlePolyClick(e, null, p)}
                      />
                    );
                  }
                  return null;
                })}
              </Map>
            </APIProvider>

            {/* Custom Info Window UI overlaid on the map */}
            {infoWindowPos && (
              <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 bg-[#141412]/85 backdrop-blur-md p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] min-w-[320px] border border-white/10 rounded-[2px] text-white">
                <button 
                  onClick={() => { setInfoWindowPos(null); setSelectedPoly(null); }}
                  className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h3 className="text-xl font-medium text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {infoWindowPos.name}
                </h3>
                <div className="mb-4">
                  <span className={`text-[11px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded-[2px] ${infoWindowPos.status === 'Vendido' ? 'bg-red-500/20 text-red-400' : 'bg-[#C49A4A]/20 text-[#C49A4A]'}`}>
                    {infoWindowPos.status || t('availability')}
                  </span>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/60 font-light">{t('surface')}</span>
                    <span className="font-medium">{infoWindowPos.area_display || (infoWindowPos.area_sqm ? `${infoWindowPos.area_sqm.toLocaleString('es-AR')} m²` : 'N/D')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/60 font-light">{t('coast')}</span>
                    <span className="font-medium text-right ml-4">
                      {infoWindowPos.river_coast_display 
                        ? infoWindowPos.river_coast_display 
                        : (infoWindowPos.river_coast_m ? `${infoWindowPos.river_coast_m} m` : t('noCoast'))}
                    </span>
                  </div>
                  {infoWindowPos.extras && infoWindowPos.extras !== 'Sin extras informados' && (
                    <div className="flex justify-between items-start text-sm border-b border-white/5 pb-2 gap-4">
                      <span className="text-white/60 font-light whitespace-nowrap">{t('extras')}</span>
                      <span className="font-medium text-right text-[12px]">{infoWindowPos.extras}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-white/60 font-light text-sm">{t('price')}</span>
                    <span className="font-medium text-lg text-[#C49A4A]">
                      {infoWindowPos.price === 'Consultar' || infoWindowPos.price === 'Vendido' ? infoWindowPos.price : `USD ${Number(infoWindowPos.price).toLocaleString('es-AR')}`}
                    </span>
                  </div>
                </div>

                <a href={`https://wa.me/5493571541588?text=${encodeURIComponent(t('whatsappMsg', { lotName: infoWindowPos.name }))}`} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-[#C49A4A] text-white text-[13px] font-medium uppercase tracking-[0.1em] py-3 rounded-[2px] hover:bg-white hover:text-black transition-colors">
                  {t('inquire')}
                </a>
              </div>
            )}
            
            <div className="absolute top-4 left-4 bg-[#141412]/80 border border-white/10 backdrop-blur-md text-white px-5 py-3 rounded-[4px] text-[11px] font-bold uppercase tracking-[0.1em] flex gap-5 pointer-events-none z-10 shadow-xl">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-[2px] bg-[#C49A4A]/40 border border-[#C49A4A]"></span>
                <span>{t('available', { fallback: 'Disponible' })}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-[2px] bg-red-500/40 border border-red-500"></span>
                <span>{t('sold', { fallback: 'Vendido' })}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionBox>
    </section>
  );
};

export default InteractiveMasterplan;

