import React, { useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import './Projects.css';

const projectsData = [
  {
    id: '01',
    title: 'Hostel Mess App',
    category: 'ANDROID / KOTLIN',
    description: 'A real-time Android application facilitating digital meal tokens and menu management with Firebase Cloud Messaging.',
    tags: ['Kotlin', 'Jetpack Compose', 'Firebase', 'NoSQL'],
    links: { source: '#', live: '#' },
    bgImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '02',
    title: 'Inventory System',
    category: 'JAVA / MYSQL',
    description: 'A comprehensive full-stack inventory suite automating supply chain workflows with high-performance JDBC bridge.',
    tags: ['Java', 'Swing', 'JDBC', 'MySQL'],
    links: { source: 'https://github.com/sathvicreddy', live: '#' },
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '03',
    title: 'Customer Segmentation',
    category: 'MACHINE LEARNING',
    description: 'An unsupervised ML pipeline using Scikit-Learn to transform raw consumer data into behavioral clusters.',
    tags: ['Python', 'Scikit-Learn', 'PCA', 'Matplotlib'],
    links: { source: 'https://github.com/sathvicreddy', live: '#' },
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'
  }
];

const Projects = () => {
  const targetRef = useRef(null);
  
  // Track scroll progress through the targetRef (the tall 300vh section)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map scroll progress (0 to 1) to horizontal translation (0% to roughly -60%)
  // -60% is calculated to show the 3rd card fully based on max-content width.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section id="projects" ref={targetRef} className="projects-scroll-section">
      <div className="projects-sticky-container">
        
        <div className="projects-header-wrapper">
          <div className="section-header-left">
            <span className="mono-text">02 // WORK</span>
            <h2 className="section-title">PROJECTS</h2>
          </div>
        </div>

        <div className="projects-carousel-wrapper">
          <motion.div style={{ x }} className="projects-grid">
            {projectsData.map((project, index) => (
              <Tilt 
                key={index}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={2500}
                className="project-card-wrapper"
              >
                <div className="project-card">
                  <div 
                    className="project-bg" 
                    style={{ backgroundImage: `url(${project.bgImage})` }}
                  ></div>
                  <div className="project-overlay"></div>
                  
                  <div className="project-content">
                    <div className="project-top">
                      <div className="project-id">{project.id}</div>
                    </div>
                    
                    <div className="project-bottom">
                      <p className="project-category mono-text">{project.category}</p>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description text-dim">{project.description}</p>
                      
                      <div className="project-tags">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="project-links">
                        <a href={project.links.source} className="project-link">
                          SOURCE <ExternalLink size={14} />
                        </a>
                        <a href={project.links.live} className="project-link primary">
                          LIVE DEMO <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
