import React, { useState } from 'react';
import ratings from '../data/ratings.json';
import '../styles/HeroSection.scss';

const VIDEO_THUMB = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80'; // Riyadh skyline
const VIDEO_SRC = 'https://scth.scene7.com/is/content/scth/hero-video-summer'; // Official hero video

const ctaButtons = [
  'Step-by-Step Process',
  'Delivery Options',
  'Want Help Fast?',
  'Why Choose HRStride.com?',
  'FAQ',
  'Contact Us',
];

function StarRating({ rating }) {
  return (
    <span className="star-rating" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true">{i < rating ? '★' : '☆'}</span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  // JSON-LD structured data
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': 'Saudi PCC Service',
      'review': ratings.map(r => ({
        '@type': 'Review',
        'author': { '@type': 'Person', 'name': r.name },
        'reviewRating': { '@type': 'Rating', 'ratingValue': r.rating, 'bestRating': 5 },
        'reviewBody': r.comment
      }))
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  // Responsive: detect mobile
  const isMobile = window.innerWidth <= 768;

  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="pill" tabIndex={0}>Outside Saudi Arabia</span>
        <h1>Get Your Saudi PCC Online – Fast & Easy</h1>
        <p className="subheading">
          No need to travel. We do it all directly with the Saudi Police. <br />
          Hassle-free process – fast, secure, and fully remote.
        </p>
        <div className="cta-group" role="group" aria-label="Main actions">
          {ctaButtons.map((btn, i) => (
            <button key={btn} className="cta-btn" tabIndex={0}>{btn}</button>
          ))}
        </div>
        <div className="user-ratings" aria-label="User ratings">
          {ratings.map((user, idx) => (
            <div
              key={user.name}
              className="avatar-wrapper"
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(idx)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              aria-describedby={`user-card-${idx}`}
            >
              <img src={user.avatar} alt={user.name} className="avatar" />
              {hovered === idx && (
                <div className="user-card" id={`user-card-${idx}`} role="dialog">
                  <strong>{user.name}</strong>
                  <StarRating rating={user.rating} />
                  <span className="comment">{user.comment}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="hero-video-area">
        {/* Desktop: thumbnail with play button/modal */}
        {!isMobile ? (
          <>
            <div className="video-thumb" tabIndex={0} role="button" aria-label="Play video" onClick={() => setModalOpen(true)} onKeyPress={e => { if (e.key === 'Enter') setModalOpen(true); }}>
              <img src={VIDEO_THUMB} alt="Video thumbnail" />
              <span className="play-btn" aria-hidden="true">▶</span>
            </div>
            {modalOpen && (
              <div className="modal" role="dialog" aria-modal="true" tabIndex={-1}>
                <button className="close-modal" aria-label="Close video" onClick={() => setModalOpen(false)}>&times;</button>
                <video src={VIDEO_SRC} controls autoPlay style={{ width: '100%' }} />
              </div>
            )}
          </>
        ) : (
          // Mobile: video background
          <div className="video-bg-wrapper">
            <video
              src={VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              className="video-bg"
              poster={VIDEO_THUMB}
              aria-label="Background video"
            />
            <div className="mobile-overlay" />
          </div>
        )}
      </div>
    </section>
  );
}
