import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('anfil.dev@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-layer ${isOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close dialog" />

      <article className="modal-card" tabIndex={-1}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close dialog">
          Close ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.2rem' }}>
          <img
            src="/assets/images/anfil.png"
            alt="Anfil"
            style={{
              width: '4.5rem',
              height: '4.5rem',
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              border: '1.5px solid rgba(255, 255, 255, 0.35)',
              filter: 'grayscale(1) contrast(1.1) brightness(0.9)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
            }}
          />
          <div>
            <p className="modal-kicker" style={{ margin: 0 }}>05 Communication</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80' }} />
              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>Available for select collaborations</span>
            </div>
          </div>
        </div>

        <h2 id="contact-modal-title">Let's Build Together</h2>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem', lineHeight: '1.6' }}>
          Have a vision for a cinematic digital platform, an interactive product, or high-performance engineering? Drop a note below or reach out directly.
        </p>

        {/* Quick Email Copy Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.85rem 1.25rem',
          margin: '1.4rem 0',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.06)'
        }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.88rem', color: '#fff' }}>anfil.dev@gmail.com</span>
          <button
            type="button"
            onClick={handleCopyEmail}
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.25)',
              background: copied ? '#fff' : 'rgba(255,255,255,0.1)',
              color: copied ? '#000' : '#fff',
              fontSize: '0.72rem',
              fontWeight: 650,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              transition: 'all 200ms ease'
            }}
          >
            {copied ? 'Copied ✓' : 'Copy Email'}
          </button>
        </div>

        {submitted ? (
          <div style={{
            padding: '2.5rem 1rem',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '1rem',
            background: 'rgba(255,255,255,0.05)'
          }}>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>Transmission Received</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Thank you. I will review your message and reply within 24 hours.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="e.g. Alex Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Project Brief / Inquiry</label>
              <textarea
                id="contact-message"
                rows={4}
                required
                placeholder="Tell me about your timeline, technical goals, and scope..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button type="submit" className="form-submit-btn">
              Dispatch Message →
            </button>
          </form>
        )}

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '1.2rem', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '1.2rem' }}>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', letterSpacing: '0.04em' }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </article>
    </div>
  );
};
