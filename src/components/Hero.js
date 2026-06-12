import React from 'react';
import './Hero.css';

const Hero = () => {
  const scrollToContact = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdP9J9ehahi79D4cPwHddA5mWfnd73uRigHBuUnoRbJslc6Sw/viewform?usp=dialog', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="inicio" className="hero">
      {/* Hero Image con Overlay */}
      <div className="hero-image-bg">
        <img src="/images/hero-jya.jpg" alt="Jara y Asociados" className="hero-building-img" />
        <div className="hero-overlay"></div>
      </div>

      {/* Contenido del Hero */}
      <div className="hero-container">
        <div className="hero-content">
          <h3 className="hero-subtitle">Jara y Asociados S.R.L</h3>
          <h1 className="hero-title">
            Administración de<br />
            bienes inmuebles
          </h1>
          <p className="hero-tagline">
            Gestionamos sus activos inmobiliarios con profesionalidad,
            transparencia y responsabilidad.
          </p>
          <button className="hero-cta" onClick={scrollToContact}>
            Solicitar Presupuesto
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
