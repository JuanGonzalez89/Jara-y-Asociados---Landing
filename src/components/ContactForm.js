import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    consorcio: '',
    consulta: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact" id="contacto">
      <div className="contact-container">
        <div className="contact-image">
          <div className="building-visual">
            <img src="/images/building-contact.jpg" alt="Edificio moderno" />
          </div>
        </div>
        
        <div className="contact-form-wrapper">
          <h2>Contactanos</h2>
          
          <form 
            action="https://formsubmit.co/Gerencia@jarayasoc.com.ar"
            method="POST"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Juan García"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  id="telefono"
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej: +54 9 11 2345-6789"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ej: juan@ejemplo.com"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="consorcio">Consorcio</label>
                <input
                  id="consorcio"
                  type="text"
                  name="consorcio"
                  value={formData.consorcio}
                  onChange={handleChange}
                  placeholder="Ej: Consorcio Av. Belgrano 1500"
                  required
                />
              </div>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="consulta">Tu Consulta</label>
              <textarea
                id="consulta"
                name="consulta"
                value={formData.consulta}
                onChange={handleChange}
                placeholder="Ej: Quisiera solicitar información sobre servicios de administración y presupuesto anual..."
                rows="5"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Enviar Mensaje
            </button>
            
            {submitted && (
              <div className="success-message">
                ✓ Mensaje enviado exitosamente. Nos pondremos en contacto pronto.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
