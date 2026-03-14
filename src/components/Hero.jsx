import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section section-container">
      <div className="hero-content">
        <motion.div 
          className="hero-name-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="hero-name" style={{ fontSize: '6rem' }}>Satvic<br/>Reddy</h1>
        </motion.div>



        <div className="hero-right-content">
          <motion.div 
            className="hero-titles"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="title-group hover-magnetic">
              <h2 className="title-outline">ANDROID</h2>
              <h2 className="title-outline text-dim">DEVELOPER</h2>
            </div>
            <div className="ampersand">&</div>
            <div className="title-group hover-magnetic">
              <h2 className="title-filled">ML/AI</h2>
              <h2 className="title-outline text-dim">ENGINEER</h2>
            </div>
          </motion.div>

          <motion.div 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="mono-text desc-text">
              Crafting immersive digital experiences with<br/>
              precision and performant code.
            </p>
            <div className="desc-line"></div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
