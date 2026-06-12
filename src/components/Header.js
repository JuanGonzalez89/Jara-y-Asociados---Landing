import React, { useState, useEffect } from 'react';
import './Header.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleQuoteClick = (e) => {
    e.preventDefault();
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdP9J9ehahi79D4cPwHddA5mWfnd73uRigHBuUnoRbJslc6Sw/viewform?usp=dialog', '_blank', 'noopener,noreferrer');
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <img src="/images/JarayAsociados_Logo.png" alt="Jara y Asociados" className="logo-image" />
          </div>
        </div>
        
        {/* Menú Hamburguesa */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Menú">
          <span className={menuOpen ? 'active' : ''}></span>
          <span className={menuOpen ? 'active' : ''}></span>
          <span className={menuOpen ? 'active' : ''}></span>
        </button>
        
        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#inicio" className="nav-link" onClick={closeMenu}>Inicio</a>
          <a href="#nosotros" className="nav-link" onClick={closeMenu}>Nosotros</a>
          <a href="#servicios" className="nav-link" onClick={closeMenu}>Servicios</a>
          <a href="#edificios-administrados" className="nav-link" onClick={closeMenu}>Edificios administrados</a>
          <a href="#contacto" className="nav-link" onClick={closeMenu}>Contacto</a>
        </nav>
        
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSdP9J9ehahi79D4cPwHddA5mWfnd73uRigHBuUnoRbJslc6Sw/viewform?usp=dialog" 
          target="_blank" 
          rel="noopener noreferrer"
          className="quote-btn"
          onClick={handleQuoteClick}
        >
          Solicitar Presupuesto
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
