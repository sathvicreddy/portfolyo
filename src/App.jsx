import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ResumeSections from './components/ResumeSections';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="app-container">
      {/* Backgrounds */}
      <div className="grid-background"></div>
      <ParticleBackground />

      {/* Interactive Elements */}
      <CustomCursor />

      {/* Content */}
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <ResumeSections />
      </main>
      <Contact />
    </div>
  );
}

export default App;
