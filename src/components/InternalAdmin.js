import React, { useEffect, useRef, useState } from 'react';
import './InternalAdmin.css';

const InternalAdmin = () => {
  const calendarRef = useRef(null);
  const adminRef = useRef(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    const adminEl = adminRef.current;
    if (!calendarEl || !adminEl) return;

    const updateSizing = () => {
      const calendarHeight = calendarEl.offsetHeight;
      if (calendarHeight > 0) {
        adminEl.style.setProperty('--calendar-height', `${calendarHeight}px`);
      }
    };

    updateSizing();
    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(() => updateSizing());
      ro.observe(calendarEl);
    } else {
      window.addEventListener('resize', updateSizing);
    }

    return () => {
      if (ro) {
        try { ro.unobserve(calendarEl); } catch (_) {}
      }
      window.removeEventListener('resize', updateSizing);
    };
  }, []);
  const adminFeatures = [
    { id: 'yellow', color: '#FFE5B3', label: 'Pago de Expensas y Personal', range: [1, 10] },
    { id: 'blue', color: '#BFD0EA', label: 'Gestión de Vencimientos', range: [11, 20] },
    { id: 'green', color: '#B2D788', label: 'Inspecciones y Revisión', range: [21, 25] },
    { id: 'purple', color: '#e6d4e6', label: 'Cierre Contable', range: [26, 31] }
  ];

  const getDateClass = (day) => {
    // Determine the natural color for this day
    if (day >= 1 && day <= 10) {
      if (!selectedFeature || selectedFeature === 'yellow') return 'date-yellow';
    } else if (day >= 11 && day <= 20) {
      if (!selectedFeature || selectedFeature === 'blue') return 'date-blue';
    } else if (day >= 21 && day <= 25) {
      if (!selectedFeature || selectedFeature === 'green') return 'date-green';
    } else if (day >= 26 && day <= 31) {
      if (!selectedFeature || selectedFeature === 'purple') return 'date-purple';
    }
    return '';
  };

  return (
    <section className="internal-admin" ref={adminRef}>
      <div className="admin-container">
        <h2>Gestión Interna</h2>
        <img src="/images/Calendar-Building.png" alt="Calendar Building" className="calendar-image-bg" />
        
        <div className="admin-content">
          <div className="calendar-section">
            <div className="calendar-widget" ref={calendarRef}>
              <div className="calendar-grid">
                <div className="calendar-day">L</div>
                <div className="calendar-day">M</div>
                <div className="calendar-day">X</div>
                <div className="calendar-day">J</div>
                <div className="calendar-day">V</div>
                <div className="calendar-day">S</div>
                <div className="calendar-day">D</div>
                
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={`calendar-date ${getDateClass(i + 1)}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="admin-features-wrapper">
            <div className="admin-features">
              {adminFeatures.map((feature) => (
                <button
                  key={feature.id}
                  className={`admin-feature ${selectedFeature === feature.id ? 'active' : ''}`}
                  onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
                >
                  <div className="feature-indicator" style={{ backgroundColor: feature.color }}></div>
                  <span>{feature.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternalAdmin;
