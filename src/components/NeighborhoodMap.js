import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './NeighborhoodMap.css';

const NeighborhoodMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const geoJsonLayerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Limpiar el mapa anterior si existe
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Barrios disponibles para selección (normalizado sin tildes)
    const barriosDisponibles = [
      'PALERMO',
      'MONSERRAT',
      'SAN CRISTOBAL',
      'VILLA URQUIZA',
      'CONGRESO',
      'NUNEZ',
      'SAN NICOLAS',
      'SAN TELMO',
      'BELGRANO',
      'RECOLETA',
      'VILLA CRESPO',
      'VILLA DEVOTO',
      'BARRACAS',
      'PUERTO MADERO',
      'BERAZATEGUI',
      'HUDSON',
      'BRANDSEN'
    ];

    // Función para normalizar nombres (quitar tildes)
    const normalizarNombre = (nombre) => {
      return nombre
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    };

    // Crear mapa interactivo
    const map = L.map(mapRef.current).setView([-34.62, -58.42], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Estilo para zonas iluminadas
    const estiloIluminado = {
      fillColor: '#3388ff',
      fillOpacity: 0.5,
      color: '#2563eb',
      weight: 2,
      opacity: 1
    };

    // Estilo invisible
    const estiloInvisible = {
      fillOpacity: 0,
      opacity: 0
    };

    // Cargar GeoJSON
    let selectEl = null;
    let onSelectChange;
    
    import('../data/barrios.json')
      .then((mod) => mod.default || mod)
      .then((data) => {
        geoJsonLayerRef.current = L.geoJSON(data, {
          style: () => estiloInvisible,
        }).addTo(map);

        // Configurar selector
        selectEl = document.getElementById('selector-barrios');
        
        if (selectEl) {
          // Limpiar opciones existentes excepto la primera
          while (selectEl.options.length > 1) {
            selectEl.remove(1);
          }

          // Agregar solo los barrios disponibles
          const features = Array.isArray(data.features) ? data.features : [];
          const barriosEncontrados = [];
          
          features.forEach((f) => {
            const nombreOriginal = (f.properties.nombre || '').toString();
            const nombreNormalizado = normalizarNombre(nombreOriginal);
            
            if (barriosDisponibles.includes(nombreNormalizado) && !barriosEncontrados.includes(nombreOriginal)) {
              barriosEncontrados.push(nombreOriginal);
            }
          });

          // Ordenar alfabéticamente
          barriosEncontrados.sort((a, b) => a.localeCompare(b, 'es'));

          // Agregar opciones al selector
          barriosEncontrados.forEach((nombre) => {
            const opt = document.createElement('option');
            opt.value = nombre;
            opt.textContent = nombre;
            selectEl.appendChild(opt);
          });

          // Evento de cambio
          onSelectChange = (e) => {
            const value = e.target.value;

            if (!geoJsonLayerRef.current) return;

            // Si no hay selección, resetear
            if (!value) {
              geoJsonLayerRef.current.eachLayer((layer) => {
                layer.setStyle(estiloInvisible);
              });
              map.setView([-34.62, -58.42], 11);
              return;
            }

            const valorNormalizado = normalizarNombre(value);

            // Resaltar el barrio seleccionado
            geoJsonLayerRef.current.eachLayer((layer) => {
              const props = (layer.feature && layer.feature.properties) || {};
              const nombre = normalizarNombre(props.nombre || '');
              
              if (nombre === valorNormalizado) {
                layer.setStyle(estiloIluminado);
                try { layer.bringToFront(); } catch (_) {}
                
                // Hacer zoom al barrio
                try {
                  const bounds = layer.getBounds();
                  if (bounds && bounds.isValid()) {
                    map.fitBounds(bounds, { padding: [20, 20] });
                  }
                } catch (_) {}
              } else {
                layer.setStyle(estiloInvisible);
              }
            });
          };

          selectEl.addEventListener('change', onSelectChange);
        }
      })
      .catch((err) => {
        console.error('No se pudo importar ./data/barrios.json', err);
      });

    mapInstanceRef.current = map;

    return () => {
      if (selectEl && onSelectChange) {
        try { selectEl.removeEventListener('change', onSelectChange); } catch (_) {}
      }
      if (geoJsonLayerRef.current) {
        try { geoJsonLayerRef.current.remove(); } catch (_) {}
        geoJsonLayerRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="neighborhood-map-wrapper">
      <select 
        id="selector-barrios" 
        className="barrios-selector"
        aria-label="Selector de barrios" 
        defaultValue=""
      >
        <option value="">Selecciona una localidad</option>
      </select>
      <div ref={mapRef} className="neighborhood-map"></div>
    </div>
  );
};

export default NeighborhoodMap;


