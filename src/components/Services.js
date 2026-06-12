import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    { title: 'Gestión de Consorcios', image: 'service1', description: 'Administración integral conforme a la normativa vigente. Control de expensas, gastos, mantenimiento y optimización de recursos.' },
    { title: 'Locaciones', image: 'service2', description: 'Gestión administrativa y comercial de unidades civiles y comerciales. Cobro de alquileres, pago de servicios y rendiciones claras a propietarios.' },
    { title: 'Fideicomisos Inmobiliarios', image: 'service3', description: 'Gerenciamiento de desarrollos y edificios nuevos. Administración fiduciaria, control de gastos y coordinación operativa.' },
    { title: 'Asesoramiento', image: 'service4', description: 'Asistencia legal y técnica especializada. Redacción de reglamentos, seguros y cumplimiento normativo.' }
  ];

  return (
    <section className="services" id="servicios">
      <div className="services-container">
        <h2 className="services-subtitle">Servicios</h2>
        <h3 className="services-title">40 años de experiencia al servicio de su patrimonio<br />inmobiliario.</h3>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className={`service-image ${service.image}`}>
                <img src={`/images/${service.image}.jpg`} alt={service.title} />
              </div>
              <div className="service-overlay">
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
