import React, { useRef, useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const targetRef = useRef(null);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/projects');
        if (res.ok) {
          const data = await res.json();
          setProjectsData(data);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      }
    };
    fetchProjects();
  }, []);
  
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
                    style={{ backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop'})` }}
                  ></div>
                  <div className="project-overlay"></div>
                  
                  <div className="project-content">
                    <div className="project-top">
                      <div className="project-id">{index < 9 ? `0${index + 1}` : index + 1}</div>
                    </div>
                    
                    <div className="project-bottom">
                      <p className="project-category mono-text">{project.category || 'PROJECT'}</p>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-description text-dim">{project.description}</p>
                      
                      <div className="project-tags">
                        {project.tech && project.tech.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="project-links">
                        {project.githubLink && (
                          <a href={project.githubLink} className="project-link" target="_blank" rel="noreferrer">
                            SOURCE <ExternalLink size={14} />
                          </a>
                        )}
                        {project.liveLink && (
                          <a href={project.liveLink} className="project-link primary" target="_blank" rel="noreferrer">
                            LIVE DEMO <ExternalLink size={14} />
                          </a>
                        )}
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
