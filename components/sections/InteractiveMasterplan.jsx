'use client';
import { useEffect, useState, useMemo } from 'react';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import SectionBox from '@/components/sections/SectionBox';
import ScrollReveal from '@/components/shared/ScrollReveal';

// Reusable Polygon component for @vis.gl/react-google-maps
const Polygon = ({ paths, options, onClick, onMouseOver, onMouseOut }) => {
  const map = useMap();
  const [polygon, setPolygon] = useState(null);

  useEffect(() => {
    if (!map || !window.google) return;
    const poly = new window.google.maps.Polygon({
      paths,
      ...options,
      map
    });

    if (onClick) poly.addListener('click', (e) => onClick(e, poly));
    if (onMouseOver) poly.addListener('mouseover', (e) => onMouseOver(e, poly));
    if (onMouseOut) poly.addListener('mouseout', (e) => onMouseOut(e, poly));

    setPolygon(poly);

    return () => {
      poly.setMap(null);
    };
  }, [map, paths]);

  useEffect(() => {
    if (polygon) {
      polygon.setOptions(options);
    }
  }, [polygon, options]);

  return null;
};

const InteractiveMasterplan = ({ polygonsData }) => {
  const [hoveredPoly, setHoveredPoly] = useState(null);
  const [selectedPoly, setSelectedPoly] = useState(null);
  const [infoWindowPos, setInfoWindowPos] = useState(null);

  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Center roughly around the polygons (based on Córdoba)
  const defaultCenter = { lat: -32.1818, lng: -64.8093 };

  // Generate map-ready polygons
  const mapPolygons = useMemo(() => {
    if (!polygonsData) return [];
    return polygonsData.map((item, index) => {
      const isHovered = hoveredPoly === index;
      const isSelected = selectedPoly === index;
      
      let fillColor = '#ffffff'; // Default whiteish fill
      let fillOpacity = 0.2;
      let strokeColor = '#db7340'; // Brand color
      let strokeOpacity = 0.8;
      let strokeWeight = 2;

      if (isHovered || isSelected) {
        fillColor = '#db7340';
        fillOpacity = 0.5;
        strokeWeight = 4;
        strokeOpacity = 1;
      }

      // If it's the "Campo" master boundary, we might want to style it differently
      if (item.name.toLowerCase().includes('campo')) {
        fillOpacity = 0;
        strokeColor = '#ffffff';
        strokeWeight = 3;
        if (isHovered) fillOpacity = 0.1;
      }

      return {
        ...item,
        index,
        options: {
          fillColor,
          fillOpacity,
          strokeColor,
          strokeOpacity,
          strokeWeight,
          clickable: true,
          zIndex: isHovered ? 2 : 1,
        }
      };
    });
  }, [polygonsData, hoveredPoly, selectedPoly]);

  const handlePolyClick = (e, poly, item) => {
    setSelectedPoly(item.index);
    setInfoWindowPos({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      name: item.name
    });
  };

  if (!API_KEY) {
    return (
      <section className="pt-[12px] pb-[12px]" id="masterplan">
        <SectionBox className="px-4 md:px-[50px] py-16 md:py-24">
          <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-gray-100" style={{ height: '70vh', minHeight: '500px' }}>
            <div className="text-center p-8">
              <h3 className="text-xl font-bold text-red-600 mb-2">Error de Configuración</h3>
              <p className="text-gray-700">Falta la variable de entorno <code className="bg-gray-200 px-2 py-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> en Vercel.</p>
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
            <h2 className="text-[28px] md:text-[40px] font-normal text-[#0F172A] leading-tight mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Masterplan Interactivo
            </h2>
          </ScrollReveal>
          <div className="flex items-center justify-center gap-3">
            <span className="w-7 h-px bg-[var(--color-brand)] flex-shrink-0" />
            <p className="text-[13px] md:text-[15px] font-medium text-[var(--color-brand)] uppercase tracking-[0.15em]">
              Explorá Tu Próximo Lote
            </p>
            <span className="w-7 h-px bg-[var(--color-brand)] flex-shrink-0" />
          </div>
        </div>

        <ScrollReveal>
          <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl" style={{ height: '70vh', minHeight: '500px' }}>
            <APIProvider apiKey={API_KEY}>
              <Map
                defaultZoom={16}
                defaultCenter={defaultCenter}
                mapTypeId="satellite"
                mapId="masterplan_map"
                disableDefaultUI={true}
                zoomControl={true}
                fullscreenControl={true}
                gestureHandling="greedy"
              >
                {mapPolygons.map((p) => (
                  <Polygon
                    key={p.name}
                    paths={p.coords}
                    options={p.options}
                    onMouseOver={() => setHoveredPoly(p.index)}
                    onMouseOut={() => setHoveredPoly(null)}
                    onClick={(e, poly) => handlePolyClick(e, poly, p)}
                  />
                ))}
              </Map>
            </APIProvider>

            {/* Custom Info Window UI overlaid on the map */}
            {infoWindowPos && (
              <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-xl p-5 shadow-2xl min-w-[280px] border border-gray-100">
                <button 
                  onClick={() => { setInfoWindowPos(null); setSelectedPoly(null); }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-black transition"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h3 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {infoWindowPos.name}
                </h3>
                <p className="text-sm text-[var(--color-brand)] font-medium mb-4">
                  Estado: Consultar Disponibilidad
                </p>
                <a href="/contacto" className="block w-full text-center bg-black text-white text-sm font-semibold py-3 rounded-lg hover:bg-gray-800 transition">
                  Consultar Precio
                </a>
              </div>
            )}
            
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm flex gap-4 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white opacity-40 border border-white"></span>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#db7340]"></span>
                <span>Seleccionado</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </SectionBox>
    </section>
  );
};

export default InteractiveMasterplan;
