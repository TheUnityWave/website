import React from 'react';
import './App.css';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Vision from './components/Vision';
import Mission from './components/Mission';
import Values from './components/Values';
import Objectives from './components/Objectives';
import PanIndiaPresence from './components/PanIndiaPresence';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <Header />
      <AboutUs />
      <Vision />
      <Mission />
      <Values />
      <Objectives />
      <PanIndiaPresence />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
