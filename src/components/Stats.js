import React, { useState, useEffect, useRef } from 'react';
import './Stats.css';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    metros: 0,
    unidades: 0,
    edificios: 0,
    fideicomisos: 0,
    barrios: 0
  });
  const sectionRef = useRef(null);

  const stats = [
    { 
      icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="12" y="12" width="16" height="16" stroke="currentColor" strokeWidth="2"/><path d="M10 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M10 30V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M30 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M30 30V26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M8 20H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M32 20H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M20 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M20 32V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
      key: 'metros',
      target: 750000,
      label: 'Metros Cuadrados (m2)',
      format: (val) => val.toLocaleString('es-AR')
    },
    { 
      icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="10" y="9" width="20" height="22" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="14" y="13" width="4" height="4" fill="currentColor"/><rect x="22" y="13" width="4" height="4" fill="currentColor"/><rect x="14" y="19" width="4" height="4" fill="currentColor"/><rect x="22" y="19" width="4" height="4" fill="currentColor"/><rect x="17" y="24" width="6" height="7" fill="currentColor"/></svg>,
      key: 'unidades',
      target: 5000,
      label: 'Unidades Funcionales',
      format: (val) => val.toLocaleString('es-AR')
    },
    { 
      icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="14" width="9" height="16" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="20" y="9" width="12" height="21" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="11" y="17" width="2" height="2" fill="currentColor"/><rect x="11" y="21" width="2" height="2" fill="currentColor"/><rect x="23" y="13" width="2" height="2" fill="currentColor"/><rect x="27" y="13" width="2" height="2" fill="currentColor"/><rect x="23" y="17" width="2" height="2" fill="currentColor"/><rect x="27" y="17" width="2" height="2" fill="currentColor"/><path d="M7 30H33" stroke="currentColor" strokeWidth="2"/></svg>,
      key: 'edificios',
      target: 32,
      label: 'Edificios Administrados',
      format: (val) => val.toString()
    },
    { 
      icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M13 7H25L30 12V30H13V7Z" stroke="currentColor" strokeWidth="2"/><path d="M25 7V12H30" stroke="currentColor" strokeWidth="2"/><path d="M17 20L20 23L26 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="16" y="25" width="11" height="2" fill="currentColor"/></svg>,
      key: 'fideicomisos',
      target: 5,
      label: 'Fideicomisos Administrados',
      format: (val) => val.toString()
    },
    { 
      icon: <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 34C20 34 30 25.5 30 18.5C30 12.7 25.5 8 20 8C14.5 8 10 12.7 10 18.5C10 25.5 20 34 20 34Z" stroke="currentColor" strokeWidth="2"/><path d="M15 20H25V26H15V20Z" stroke="currentColor" strokeWidth="2"/><path d="M14 20L20 15L26 20" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>,
      key: 'barrios',
      target: 3,
      label: 'Barrios Administrados',
      format: (val) => val.toString()
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800;
    let rafId = 0;
    let startTime = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);

      setCounts({
        metros: Math.floor(750000 * easedProgress),
        unidades: Math.floor(5000 * easedProgress),
        edificios: Math.floor(32 * easedProgress),
        fideicomisos: Math.floor(5 * easedProgress),
        barrios: Math.floor(3 * easedProgress)
      });

      if (rawProgress < 1) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [isVisible]);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-wrapper">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.format(counts[stat.key])}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="blue-divider-stats"></div>
    </section>
  );
};

export default Stats;
