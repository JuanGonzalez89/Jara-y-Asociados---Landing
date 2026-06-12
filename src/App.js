import React from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Services from './components/Services';
import InternalAdmin from './components/InternalAdmin';
import Buildings from './components/Buildings';
import SloganCarousel from './components/SloganCarousel';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Stats />
      <Services />
      <InternalAdmin />
      <Buildings />
      <SloganCarousel />
      <ContactForm />
      <Footer />
      <WhatsAppButton />
      <SpeedInsights />
    </div>
  );
}

export default App;
