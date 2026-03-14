import React from 'react';
import { ExternalLink, Mail, Linkedin, Twitter } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <footer id="contact" className="contact-section section-container">
      <div className="contact-header">
        <span className="mono-text">[ CONTACT ]</span>
        <h2 className="contact-title">
          Let's Build<br />
          <span className="text-dim">Something Cool</span><br />
          Together.
        </h2>
      </div>

      <div className="contact-grid">
        <div className="contact-column">
          <h4 className="column-title mono-text">CONNECT</h4>
          <div className="contact-links">
            <a href="mailto:satvicreddyc@gmail.com" className="contact-item">
              <Mail size={16} /> satvicreddyc@gmail.com
            </a>
            <a href="https://linkedin.com/in/chennamreddygnanasatvicreddy" target="_blank" rel="noopener noreferrer" className="contact-item">
              <Linkedin size={16} /> LinkedIn <ExternalLink size={12} />
            </a>
            <a href="https://github.com/sathvicreddy" target="_blank" rel="noopener noreferrer" className="contact-item">
              <Twitter size={16} /> GitHub <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="contact-column">
          <h4 className="column-title mono-text">MORE</h4>
          <div className="contact-info">
            <p><strong>Mobile:</strong><br/>+91-9398659814</p>
          </div>
        </div>

        <div className="contact-column">
          <h4 className="column-title mono-text">LOCATION</h4>
          <div className="contact-info">
            <p>India</p>
            <p className="remote-status">
              <span className="status-dot"></span> Remote Available
            </p>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <p className="copyright mono-text">© {new Date().getFullYear()} Anurag Kumar.</p>
        <button className="back-to-top mono-text" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          BACK TO START ↑
        </button>
      </div>
    </footer>
  );
};

export default Contact;
