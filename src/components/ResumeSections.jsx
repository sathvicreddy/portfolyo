import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Helper to convert Google Drive share links into direct image links
const getImageUrl = (url) => {
  if (!url) return null;
  const driveRegex = /drive\.google\.com\/file\/d\/([^\/]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/uc?id=${match[1]}`;
  }
  return url;
};
import { Award, BookOpen, FileBadge, Code } from 'lucide-react';
import './ResumeSections.css';

const ResumeSections = () => {
  const [trainings, setTrainings] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [socialPosts, setSocialPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainRes, achRes, certRes, socialRes] = await Promise.all([
          fetch('http://localhost:5000/api/public/trainings'),
          fetch('http://localhost:5000/api/public/achievements'),
          fetch('http://localhost:5000/api/public/certifications'),
          fetch('http://localhost:5000/api/public/socialposts')
        ]);
        
        if (trainRes.ok) setTrainings(await trainRes.json());
        if (achRes.ok) setAchievements(await achRes.json());
        if (certRes.ok) setCertifications(await certRes.json());
        if (socialRes.ok) setSocialPosts(await socialRes.json());
      } catch (err) {
        console.error('Failed to fetch resume data', err);
      }
    };
    fetchData();
  }, []);

  const handleLike = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/public/socialposts/${postId}/like`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        setSocialPosts(posts => posts.map(p => p._id === postId ? { ...p, likes: data.likes } : p));
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(prev => ({ ...prev, likes: data.likes }));
        }
      }
    } catch (err) {
      console.error('Failed to like post', err);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/public/socialposts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
      if (res.ok) {
        const updatedComments = await res.json();
        setSocialPosts(posts => posts.map(p => p._id === postId ? { ...p, comments: updatedComments } : p));
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(prev => ({ ...prev, comments: updatedComments }));
        }
        setCommentInputs(prev => ({ ...prev, [postId]: '' })); // clear input
      }
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  return (
    <>
      {/* Training & Experience Section */}
      <section id="training" className="training-section section-container">
        <div className="section-header">
          <span className="mono-text">03 // UPSKILLING</span>
          <h2 className="section-title"><Code className="inline-icon" /> TRAINING & EXPERIENCE</h2>
        </div>
        
        <div className="training-grid">
          {trainings.length > 0 ? trainings.map((training, index) => (
            <motion.div 
              key={training._id} 
              className="training-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="train-card-accent" />
              <div className="train-card-body">
                <div className="train-card-top">
                  <div className="train-icon-box">
                    <Code size={20} />
                  </div>
                  {training.date && (
                    <span className="train-date">{training.date}</span>
                  )}
                </div>
                <h4 className="train-title">{training.title}</h4>
                <span className="train-org">{training.organization}</span>
                <p className="train-desc">
                  {training.description && training.description.length > 120
                    ? training.description.substring(0, 120) + '...'
                    : training.description}
                </p>
              </div>
            </motion.div>
          )) : (
            <p className="text-dim">Loading trainings...</p>
          )}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="achievements-section section-container">
        <div className="section-header">
          <span className="mono-text">04 // RECOGNITION</span>
          <h2 className="section-title"><Award className="inline-icon" /> ACHIEVEMENTS</h2>
        </div>
        
        <div className="achievements-grid">
          {achievements.length > 0 ? achievements.map((achievement, index) => (
            <motion.div 
              key={achievement._id} 
              className="achievement-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="ach-glow" />
              <div className="ach-card-inner">
                <div className="ach-number">
                  <span>{index < 9 ? `0${index + 1}` : index + 1}</span>
                </div>
                <div className="ach-icon-ring">
                  <Award size={28} className="ach-icon" />
                </div>
                <h4 className="ach-title">{achievement.title}</h4>
                {achievement.date && (
                  <span className="ach-date">{achievement.date}</span>
                )}
                <div className="ach-divider" />
                <p className="ach-description">{achievement.description}</p>
              </div>
            </motion.div>
          )) : (
            <p className="text-dim text-center">Loading achievements...</p>
          )}
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="resume-section section-container">
        <div className="section-header">
          <span className="mono-text">05 // QUALIFICATIONS</span>
          <h2 className="section-title"><FileBadge className="inline-icon" /> CERTIFICATIONS</h2>
        </div>
        
        <div className="full-grid grid-3">
          {certifications.length > 0 ? certifications.map((cert) => (
            <div key={cert._id} className="card-item hover-magnetic cert-card">
              {cert.image && (
                <div className="cert-image-wrapper">
                  <img src={cert.image} alt={`${cert.issuer} Certificate`} className="cert-image" />
                </div>
              )}
              <h4 className="cert-title mt-2">{cert.title}</h4>
              <div className="desc-line" style={{width: '50px', margin: '1rem 0'}}></div>
              <p className="cert-issuer text-dim">{cert.issuer} {cert.date ? `| ${cert.date}` : ''}</p>
            </div>
          )) : (
            <p className="text-dim">Loading certifications...</p>
          )}
        </div>
      </section>
      
      {/* Education Section */}
      <section id="education" className="resume-section section-container">
        <div className="section-header">
          <span className="mono-text">06 // BACKGROUND</span>
          <h2 className="section-title"><BookOpen className="inline-icon" /> EDUCATION</h2>
        </div>
        
        <div className="edu-timeline">
          {/* Timeline Line */}
          <div className="edu-timeline-line" />

          {/* LPU */}
          <div className="edu-timeline-item">
            <div className="edu-dot-wrapper">
              <div className="edu-dot active" />
              <div className="edu-dot-ring" />
            </div>
            <div className="edu-card edu-card-active">
              <div className="edu-card-header">
                <div>
                  <h4 className="edu-institution">Lovely Professional University</h4>
                  <p className="edu-degree">Bachelor of Technology — Computer Science & Engineering</p>
                </div>
                <span className="edu-badge">CGPA: 7.5</span>
              </div>
              <div className="edu-card-footer">
                <span className="edu-date mono-text">Aug '23 — Present</span>
                <span className="edu-location">📍 Phagwara, Punjab</span>
              </div>
            </div>
          </div>

          {/* Edify */}
          <div className="edu-timeline-item">
            <div className="edu-dot-wrapper">
              <div className="edu-dot" />
            </div>
            <div className="edu-card">
              <div className="edu-card-header">
                <div>
                  <h4 className="edu-institution">Edify School</h4>
                  <p className="edu-degree">Intermediate (12th Grade)</p>
                </div>
                <span className="edu-badge">81%</span>
              </div>
              <div className="edu-card-footer">
                <span className="edu-date mono-text">Aug '21 — Mar '23</span>
                <span className="edu-location">📍 Tirupati, Andhra Pradesh</span>
              </div>
            </div>
          </div>

          {/* Sri Chaitanya */}
          <div className="edu-timeline-item">
            <div className="edu-dot-wrapper">
              <div className="edu-dot" />
            </div>
            <div className="edu-card">
              <div className="edu-card-header">
                <div>
                  <h4 className="edu-institution">Sri Chaitanya School</h4>
                  <p className="edu-degree">Matriculation (10th Grade)</p>
                </div>
                <span className="edu-badge gold">100%</span>
              </div>
              <div className="edu-card-footer">
                <span className="edu-date mono-text">Apr '20 — Jun '21</span>
                <span className="edu-location">📍 Tirupati, Andhra Pradesh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Footprints Section */}
      <section id="social" className="resume-section section-container">
        <div className="section-header">
          <span className="mono-text">07 // NETWORKING</span>
          <h2 className="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-icon" style={{color: '#0a66c2'}}>
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            SOCIAL POSTS
          </h2>
        </div>

        <div className="social-feed-container">
          <div className="social-scroll-wrapper">
            {socialPosts.length > 0 ? socialPosts.map((post, index) => (
              <motion.div 
                key={post._id}
                className="pro-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedPost(post)}
                style={{ cursor: 'pointer' }}
              >
                <div className="pro-header">
                  <div className="pro-avatar">
                    <img src="/assets/about-portrait.png" alt="Profile" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex';}} />
                    <div className="pro-fallback" style={{display: 'none'}}>{post.authorName ? post.authorName.charAt(0).toUpperCase() : 'U'}</div>
                  </div>
                  <div className="pro-meta">
                    <div className="pro-author-row">
                      <h4>{post.authorName}</h4>
                      <span className="pro-degree">• 1st</span>
                    </div>
                    <p className="pro-headline">{post.authorHeadline}</p>
                    <span className="pro-time">
                      2w • <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    </span>
                  </div>
                </div>

                <div className="pro-content">
                  <p>{post.content}</p>
                </div>

                {post.image && (
                  <div className="pro-image">
                    <img src={getImageUrl(post.image)} alt="Attachment" />
                  </div>
                )}

                <div className="pro-engagement">
                  <div className="pro-stats">
                    <div className="pro-reactions">
                      <span className="reaction-icon like">👍</span>
                      <span className="reaction-icon heart">❤️</span>
                      <span className="reaction-text">{post.likes || 0} Likes</span>
                    </div>
                    <span className="pro-comments">{post.comments ? post.comments.length : 0} comments</span>
                  </div>
                  
                  <div className="pro-actions">
                    <button onClick={(e) => { e.stopPropagation(); handleLike(post._id); }} className="pro-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                      Like
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedPost(post); }} className="pro-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                      Comment
                    </button>
                  </div>
                </div>
              </motion.div>
            )) : (
              <p className="text-dim" style={{textAlign: 'center', width: '100%'}}>No footprints shared yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* ===== POST DETAIL MODAL ===== */}
      {selectedPost && (
        <div className="post-modal-overlay" onClick={() => setSelectedPost(null)}>
          <motion.div 
            className="post-modal" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Modal Header */}
            <div className="post-modal-header">
              <div className="pro-avatar">
                <img src="/assets/about-portrait.png" alt="Profile" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex';}} />
                <div className="pro-fallback" style={{display: 'none'}}>{selectedPost.authorName ? selectedPost.authorName.charAt(0).toUpperCase() : 'U'}</div>
              </div>
              <div className="pro-meta">
                <div className="pro-author-row">
                  <h4>{selectedPost.authorName}</h4>
                  <span className="pro-degree">• 1st</span>
                </div>
                <p className="pro-headline">{selectedPost.authorHeadline}</p>
                <span className="pro-time">
                  {new Date(selectedPost.createdAt).toLocaleDateString()} • <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                </span>
              </div>
              <button className="post-modal-close" onClick={() => setSelectedPost(null)}>✕</button>
            </div>

            {/* Modal Body */}
            <div className="post-modal-body">
              <div className="pro-content">
                <p>{selectedPost.content}</p>
              </div>
              {selectedPost.image && (
                <div className="post-modal-image">
                  <img src={getImageUrl(selectedPost.image)} alt="Attachment" />
                </div>
              )}
            </div>

            {/* Stats Row */}
            <div className="post-modal-stats">
              <div className="pro-reactions">
                <span className="reaction-icon like">👍</span>
                <span className="reaction-icon heart">❤️</span>
                <span className="reaction-text">{selectedPost.likes || 0} Likes</span>
              </div>
              <span className="pro-comments">{selectedPost.comments ? selectedPost.comments.length : 0} comments</span>
            </div>

            {/* Actions Row */}
            <div className="post-modal-actions">
              <button onClick={() => handleLike(selectedPost._id)} className="pro-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                Like
              </button>
              <button className="pro-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                Comment
              </button>
            </div>

            {/* Comments Section */}
            <div className="post-modal-comments">
              <h4 className="modal-comments-title">Comments</h4>
              <div className="modal-comments-list">
                {selectedPost.comments && selectedPost.comments.length > 0 ? (
                  selectedPost.comments.map((c, idx) => (
                    <div key={idx} className="modal-comment-item">
                      <div className="pro-comment-avatar">U</div>
                      <div className="modal-comment-bubble">
                        <div className="modal-comment-author">User <span className="modal-comment-date">{new Date(c.createdAt).toLocaleDateString()}</span></div>
                        <p>{c.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-comments-text">No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>

            {/* Comment Input */}
            <form className="post-modal-input" onSubmit={(e) => handleCommentSubmit(e, selectedPost._id)}>
              <input 
                type="text" 
                placeholder="Write a comment..." 
                value={commentInputs[selectedPost._id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [selectedPost._id]: e.target.value })}
              />
              <button type="submit" disabled={!commentInputs[selectedPost._id]}>Post</button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ResumeSections;
