import React from 'react';
import './About.css';

const About = () => {
  return (
    <>
      <section className="about" id="nosotros">
        <div className="about-container">
          <div className="about-images">
            <div className="single-image-container">
              <img src="/images/sobre-nosotros-luis.JPG" alt="Luis Jara - Socio Gerente" className="about-main-image" />
            </div>
            <a href="https://www.linkedin.com/in/luis-jara-678745b" target="_blank" rel="noopener noreferrer" className="linkedin-badge" aria-label="LinkedIn de Luis Jara">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.824 0-9.744h3.554v1.379l-.022.033h.022v-.033c.43-.664 1.199-1.61 2.920-1.61 2.135 0 3.735 1.395 3.735 4.397v5.578zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.951.771-1.71 1.915-1.71 1.144 0 1.915.759 1.915 1.71 0 .951-.771 1.71-1.915 1.71zm1.575 11.597H3.762V8.108h3.150v12.344zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
              </svg>
            </a>
            <div className="stats-badge">
              <h2>+40</h2>
              <p>Años de<br />Experiencia</p>
              <div className="decorative-dots">
                <div className="dot-row">
                  <span></span><span></span><span></span><span></span>
                </div>
                <div className="dot-row">
                  <span></span><span></span><span></span><span></span>
                </div>
                <div className="dot-row">
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="about-content">
            <h2>Sobre Nosotros</h2>
            <h3>Jara y Asociados se especializa en la gestión integral de consorcios, fideicomisos inmobiliarios y locaciones civiles y comerciales.</h3>
            <p>
             Con más de 40 años de trayectoria en Propiedad Horizontal, trabajamos con procesos administrativos mensuales que garantizan control, 
             transparencia y eficiencia en cada gestión. Somos miembros activos de entidades profesionales y contamos con un equipo multidisciplinario de abogados,
             ingenieros, arquitectos y contadores.
             Nuestro compromiso es proteger y optimizar sus activos inmobiliarios con profesionalidad y responsabilidad.
            </p>
          </div>
          <div className="logos-container">
            <img src="/images/LogoDefensoriaPueblo.png" alt="Logo Defensoría del Pueblo" className="defensoria-logo" />
            <img src="/images/LogoCamara.png" alt="Logo Cámara" className="camara-logo" />
            <img src="/images/LogoDGuPC.png" alt="Logo DGDuPC" className="dgdupc-logo" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
