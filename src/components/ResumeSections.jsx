import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, FileBadge, Code } from 'lucide-react';
import './ResumeSections.css';

const ResumeSections = () => {
  return (
    <>
      {/* Training Section */}
      <section id="training" className="resume-section section-container">
        <div className="section-header">
          <span className="mono-text">03 // UPSKILLING</span>
          <h2 className="section-title"><Code className="inline-icon" /> TRAINING</h2>
        </div>
        
        <div className="full-grid grid-1">
          <div className="card-item hover-magnetic highlight wide-card">
            <h4 className="card-title" style={{fontSize: '1.5rem'}}>Java and MySQL: Application Development</h4>
            <p className="card-date mono-text" style={{fontSize: '1rem', marginTop: '0.5rem'}}>Jul '25</p>
            <ul className="card-list text-dim" style={{marginTop: '1.5rem', fontSize: '1.1rem'}}>
              <li>Leveraged Core Java and RDBMS with JDBC to develop scalable application components and CRUD operations.</li>
              <li style={{marginTop: '1rem'}}>Designed functional UI prototypes and integrated secure authentication mechanisms with Java-MySQL back-end.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="resume-section section-container">
        <div className="section-header">
          <span className="mono-text">04 // RECOGNITION</span>
          <h2 className="section-title"><Award className="inline-icon" /> ACHIEVEMENTS</h2>
        </div>
        
        <div className="full-grid grid-1">
          <div className="card-item hover-magnetic highlight wide-card text-center">
            <Award size={48} className="center-icon" />
            <h4 className="card-title mt-2" style={{fontSize: '1.8rem'}}>Code-A-Hunt Hackathon</h4>
            <p className="card-date mono-text">Feb '24</p>
            <p className="text-dim mt-2" style={{fontSize: '1.2rem'}}>Ranked in Top 10 out of 2,500+ participants.</p>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="resume-section section-container">
        <div className="section-header">
          <span className="mono-text">05 // QUALIFICATIONS</span>
          <h2 className="section-title"><FileBadge className="inline-icon" /> CERTIFICATIONS</h2>
        </div>
        
        <div className="full-grid grid-3">
          <div className="card-item hover-magnetic cert-card">
            <div className="cert-image-wrapper">
              <img src="/cert1.png" alt="Iamneo Certificate" className="cert-image" />
            </div>
            <h4 className="cert-title mt-2">Java Programming</h4>
            <div className="desc-line" style={{width: '50px', margin: '1rem 0'}}></div>
            <p className="cert-issuer text-dim">I Am Neo | May '25</p>
          </div>
          
          <div className="card-item hover-magnetic cert-card">
            <div className="cert-image-wrapper">
              <img src="/cert2.png" alt="Coursera Certificate" className="cert-image" />
            </div>
            <h4 className="cert-title mt-2">Fundamentals of Network Communication</h4>
            <div className="desc-line" style={{width: '50px', margin: '1rem 0'}}></div>
            <p className="cert-issuer text-dim">Coursera | Sep '24</p>
          </div>
          
          <div className="card-item hover-magnetic cert-card">
            <div className="cert-image-wrapper">
              <img src="/cert3.png" alt="CSE Pathshala Certificate" className="cert-image" />
            </div>
            <h4 className="cert-title mt-2">Unraveling Basics towards ML/AI</h4>
            <div className="desc-line" style={{width: '50px', margin: '1rem 0'}}></div>
            <p className="cert-issuer text-dim">CSE Pathshala | Mar '24</p>
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section id="education" className="resume-section section-container">
        <div className="section-header">
          <span className="mono-text">06 // BACKGROUND</span>
          <h2 className="section-title"><BookOpen className="inline-icon" /> EDUCATION</h2>
        </div>
        
        <div className="full-grid grid-3">
          <div className="card-item hover-magnetic highlight">
            <h4 className="card-title">Lovely Professional University</h4>
            <p className="card-date mono-text">Aug '23 - Present</p>
            <p className="text-dim mt-2">B.Tech - Computer Science and Engineering</p>
            <p className="timeline-detail">CGPA: 7.5 | Phagwara, Punjab</p>
          </div>
          
          <div className="card-item hover-magnetic">
            <h4 className="card-title">Edify School</h4>
            <p className="card-date mono-text">Aug '21 - Mar '23</p>
            <p className="text-dim mt-2">Intermediate (81%)</p>
            <p className="timeline-detail">Tirupati, Andhra Pradesh</p>
          </div>
          
          <div className="card-item hover-magnetic">
            <h4 className="card-title">Sri Chaitanya School</h4>
            <p className="card-date mono-text">Apr '20 - Jun '21</p>
            <p className="text-dim mt-2">Matriculation (100%)</p>
            <p className="timeline-detail">Tirupati, Andhra Pradesh</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResumeSections;
