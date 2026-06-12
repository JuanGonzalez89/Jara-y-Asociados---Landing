import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import './Buildings.css';

const fallbackCenter = { lat: -34.603722, lng: -58.381592 }; // Obelisco-ish fallback

const Buildings = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const geoJsonLayerRef = useRef(null);
  const geoJsonDataRef = useRef(null);

  const [barrioOptions, setBarrioOptions] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const loadGeoJsonData = async () => {
    if (geoJsonDataRef.current) return geoJsonDataRef.current;
    try {
      const res = await fetch('/data/barrios.json');
      if (res.ok) {
        const data = await res.json();
        geoJsonDataRef.current = data;
        return data;
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      try {
        const mod = await import('../data/barrios.json');
        const data = mod.default || mod;
        geoJsonDataRef.current = data;
        return data;
      } catch (impErr) {
        console.error('No se pudo cargar barrios.json', err, impErr);
        return null;
      }
    }
  };

  useEffect(() => {
    (async () => {
      const data = await loadGeoJsonData();
      if (!data) return;

      // Lista de barrios permitidos (normalizado sin tildes)
      const barriosPermitidos = [
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

      const options = [];
      L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
          const props = feature?.properties || {};
          const name = props.BARRIO ?? props.nombre ?? props.name ?? props.NOM_BARRIO;
          if (!name) return;
          
          // Filtrar solo los barrios permitidos
          const nombreNormalizado = normalizarNombre(name);
          if (!barriosPermitidos.includes(nombreNormalizado)) return;
          
          const bounds = layer.getBounds();
          const center = bounds && bounds.isValid() ? bounds.getCenter() : null;
          options.push({
            id: props.id ?? name,
            name,
            bounds,
            center,
            zoom: 14,
            buildings: [],
          });
        },
      });

      options.sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
      setBarrioOptions(options);
      if (options.length > 0) {
        setSelectedNeighborhood((prev) => prev || options[0]);
      }
    })();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !selectedNeighborhood) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const centerLatLng = selectedNeighborhood.center
      ? [selectedNeighborhood.center.lat, selectedNeighborhood.center.lng]
      : [fallbackCenter.lat, fallbackCenter.lng];

    const map = L.map(mapRef.current, {
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
    }).setView(
      centerLatLng,
      selectedNeighborhood.zoom ?? 14,
    );

    // En producción, el layout puede terminar de ajustar después del mount.
    // Forzamos un recálculo para evitar tiles estirados.
    const resizeHandler = () => {
      try {
        map.invalidateSize({ animate: false });
      } catch (_) {}
    };
    const rafId = window.requestAnimationFrame(resizeHandler);
    const timeoutId = window.setTimeout(resizeHandler, 200);
    window.addEventListener('resize', resizeHandler);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    const invisibleStyle = {
      color: 'transparent',
      weight: 1,
      fillColor: 'transparent',
      fillOpacity: 0,
    };

    const highlightStyle = {
      color: '#3b82f6',
      weight: 2,
      fillColor: 'rgba(59, 130, 246, 0.3)',
      fillOpacity: 0.6,
    };

    const applySelectionHighlight = (layerGroup, barrioName) => {
      if (!layerGroup) return;
      const target = (barrioName || '').toUpperCase();
      layerGroup.eachLayer((layer) => {
        const props = (layer.feature && layer.feature.properties) || {};
        const name = (props.BARRIO ?? props.nombre ?? props.name ?? props.NOM_BARRIO ?? '').toUpperCase();
        if (name === target && target) {
          layer.setStyle(highlightStyle);
          try {
            layer.bringToFront();
          } catch (_) {}
          try {
            const bounds = layer.getBounds();
            if (bounds && bounds.isValid()) {
              map.flyToBounds(bounds, { padding: [24, 24], duration: 0.6 });
            }
          } catch (_) {}
        } else {
          layerGroup.resetStyle(layer);
        }
      });
    };

    (async () => {
      const data = await loadGeoJsonData();
      if (data) {
        geoJsonLayerRef.current = L.geoJSON(data, {
          style: () => invisibleStyle,
        }).addTo(map);
        applySelectionHighlight(geoJsonLayerRef.current, selectedNeighborhood.name);
      }

      const buildings = selectedNeighborhood.buildings ?? [];
      const markerCenter = selectedNeighborhood.center || { lat: centerLatLng[0], lng: centerLatLng[1] };
      buildings.forEach((building) => {
        const lat = markerCenter.lat + (Math.random() - 0.5) * 0.02;
        const lng = markerCenter.lng + (Math.random() - 0.5) * 0.02;

        L.circleMarker([lat, lng], {
          radius: 8,
          fillColor: '#FFE5B3',
          color: '#fffaf2',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        })
          .bindPopup(building)
          .addTo(map);
      });
    })();

    mapInstanceRef.current = map;

    return () => {
      window.removeEventListener('resize', resizeHandler);
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      if (geoJsonLayerRef.current) {
        try {
          geoJsonLayerRef.current.remove();
        } catch (_) {}
        geoJsonLayerRef.current = null;
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedNeighborhood]);

  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedNeighborhood(neighborhood);
    setIsDropdownOpen(false);
  };

  const buildingList = selectedNeighborhood?.buildings ?? [];

  return (
    <section className="buildings" id="edificios-administrados">
      <div className="buildings-shell">
        <div className="buildings-panel">
          <header className="buildings-header">
            <h2>Edificios Administrados</h2>
            <p className="buildings-subtitle">Selecciona un barrio y explora sus direcciones destacadas.</p>
          </header>

          <div className="buildings-body">
            <div className="buildings-map-col">
              <div className="buildings-selector-container">
                <label className="selector-title" htmlFor="barrio-select">Selecciona una localidad</label>
                <div className="neighborhood-selector">
                  <button
                    id="barrio-select"
                    className="dropdown-btn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="dropdown-label">{selectedNeighborhood?.name || 'Cargando barrios...'}</span>
                    <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown-menu">
                      {barrioOptions.map((neighborhood) => (
                        <div
                          key={neighborhood.id}
                          className={`dropdown-item ${
                            selectedNeighborhood?.id === neighborhood.id ? 'active' : ''
                          }`}
                          onClick={() => handleNeighborhoodSelect(neighborhood)}
                        >
                          {neighborhood.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div ref={mapRef} className="neighborhood-map"></div>
            </div>

            <div className="buildings-sidebar">
              <div className="buildings-list cards">
                {buildingList.map((building, index) => (
                  <div key={index} className="building-card">
                    <div className="card-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" fill="#5b6a86"/>
                      </svg>
                    </div>
                    <div className="card-text">{building}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buildings;
