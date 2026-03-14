import React from 'react';
import './Skills.css';

const skillsRows = [
  ['C++', 'Java', 'Python', 'Kotlin', 'SQL'],
  ['Scikit-Learn', 'Jetpack Compose', 'Matplotlib', 'OOP', 'DSA'],
  ['MySQL', 'Android Studio', 'GitHub', 'JDBC', 'Jupyter']
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section section-container">
      <div className="section-header">
        <span className="mono-text">01 // SKILLS</span>
        <h2 className="section-title">CAPABILITIES</h2>
      </div>

      <div className="marquee-container">
        {skillsRows.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`marquee-row ${rowIndex % 2 !== 0 ? 'reverse' : ''}`}
          >
            <div className="marquee-content">
              {row.map((skill, index) => (
                <span key={index} className="skill-item">{skill}</span>
              ))}
              {/* Duplicate for seamless infinite scrolling */}
              {row.map((skill, index) => (
                <span key={`dup-${index}`} className="skill-item">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="fade-overlay left"></div>
      <div className="fade-overlay right"></div>
    </section>
  );
};

export default Skills;
