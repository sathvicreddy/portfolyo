import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Rocket, Mail, Github, Code, Download, BookOpen, Award, FileBadge } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-logo">
        <a href="#home">A</a>
      </div>
      
      <div className="nav-links">
        <a href="#skills" className="nav-link">
          <Cpu className="nav-icon" /> SKILLS
        </a>
        <a href="#education" className="nav-link">
          <BookOpen className="nav-icon" /> EDU
        </a>
        <a href="#training" className="nav-link">
          <Code className="nav-icon" /> TRAIN
        </a>
        <a href="#achievements" className="nav-link">
          <Award className="nav-icon" /> ACHV
        </a>
        <a href="#certificates" className="nav-link">
          <FileBadge className="nav-icon" /> CERT
        </a>
        <a href="#projects" className="nav-link">
          <Rocket className="nav-icon" /> PROJ
        </a>
        <a href="#contact" className="nav-link">
          <Mail className="nav-icon" /> CONTACT
        </a>
      </div>

      <div className="nav-socials">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
          <Github className="social-icon" />
        </a>
        <a href="#" className="social-link">
          <Code className="social-icon" />
        </a>
        <a href="#" className="social-link" title="Resume">
          <Download className="social-icon" />
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
